package com.haxejs;

import haxe.Json;
import ng.Angular;
import ng.IServices;
import Xml;


typedef Item = {
	title:String,
	vid:String,
	guid:String,
	description:String,
	thumbnail:String,
	pubDate:Float,
	unread:Int
}

typedef FeedSeed = {
	title:String,
	id:String,
	url:String,
	type:String
}

typedef Feed = {
	title:String,
	id:String,
	url:String,
	type:String,
	description:String,
	image:String,
	lastUpdate:Float,
	items:Array<Item>
}

class FeedServ {
	private var http:NgHttp;
	private var window:NgWindow;
	private var lastSeedsUpdate:Float;
	public var sources:Array<Feed> = [ ];
	public var seeds:Array<FeedSeed> = [ ];
	public var rootScope:NgRootScope;
	
	public function getSourceSeeds() {		
		lastSeedsUpdate = window.localStorage.getItem("lastSeedsUpdate")!=null?Std.parseFloat(window.localStorage.getItem("lastSeedsUpdate")):0;
		if (lastSeedsUpdate!=0 && Date.now().getTime() - lastSeedsUpdate < 3600000) {//1 hour
			seeds = window.localStorage.getItem("seeds")!=null?Json.parse(window.localStorage.getItem("seeds")):[];
			return;
		}
		http.get("data/sources.json").success(function(data) {
			seeds = data;
			try{window.localStorage.setItem("seeds",Json.stringify(seeds));}catch(e:Dynamic){}
			rootScope.broadcast("seedUpdated", [seeds]);	
			//if it is the first time, prefill one or two podcast feed
			if (lastSeedsUpdate == 0) {
				for (seed in seeds) {
					addSeedToSources(seed);
				}
			}
			lastSeedsUpdate = Date.now().getTime();
			try{window.localStorage.setItem("lastSeedsUpdate", Std.string(lastSeedsUpdate));}catch(e:Dynamic){}
		});
	}
	
	public function saveSourcesToLocalStorage() {
		try {
			window.localStorage.setItem("sources",Json.stringify(sources));
		}catch (e:Dynamic) {	
		}
	}
	
	public function refreshFeeds() {
		for (source in sources) {
			getFeedData(source);
		}
		haxe.Timer.delay(refreshFeeds, 3600000);//1 hours
	}

	public function addSeedToSources(seed:FeedSeed){
		var source:Feed = {title:seed.title,id:seed.id,url:seed.url,type:seed.type,lastUpdate:0,items:[],description:"",image:""};
		sources.push(source);
		saveSourcesToLocalStorage();
		rootScope.broadcast("channelUpdated",[sources]);
		getFeedData(source);
	}

	public function removeFromSources(source:Feed){
		var id:String = source.id;
		sources.remove(source);
		saveSourcesToLocalStorage();
		rootScope.broadcast("channelUpdated",[sources]);
		rootScope.broadcast("playlistDeleted",[id]);
	}

	public function findSourceByID(fid:String):Feed{
		return sources.filter(function(source:Feed) { return source.id == fid?true:false; } )[0];
	}

	public function findItemByVid(vid:String){
		var all = getAllItems();
		return all.filter(function(item:Item) { return item.vid == vid?true:false; } )[0];
	}
	
	public function getUnreadNum(source:Feed):Int {
		return source.items.filter(function(item:Item) { return item.unread==1?true:false; } ).length;
	}
	
	public function findExistOrReturnNew(arr:Array<Item>, newItem:Item):Item {
		var olds = arr.filter(function(obj:Item) { return obj.guid == newItem.guid?true:false; } );
		return olds.length>0?olds[0]:newItem;
	}

	public function isExist(arr:Array<Item>, newItem:Item):Bool{
		var olds = arr.filter(function(obj:Item) { return obj.guid == newItem.guid?true:false; } );
		return olds.length>0?true:false;
	}
	
	public function getHotest(len:Int):Array<Item> {
		var hots:Array<Item> = [];
		var curTime:Float = Date.now().getTime()-3600*24*7*1000;
		for (source in sources) {
			var unreads:Array<Item> = source.items.filter(function(item:Item) { return (item.unread == 1 && item.pubDate>curTime)?true:false; } );
			hots = hots.concat(unreads.slice(0,Std.int(Math.min(unreads.length,5))));
		}
		//hots.sort(function(x:Item, y:Item) { return Std.int((y.pubDate!=null?y.pubDate:0) - (x.pubDate!=null?x.pubDate:0)); } );
		haxe.ds.ArraySort.sort(hots,function(x:Item, y:Item) { return Std.int((Math.isNaN(y.pubDate)?0:y.pubDate) - (Math.isNaN(x.pubDate)?0:x.pubDate)); });
		return hots;//hots.splice(0,len);
	}

	public function getAllItems():Array<Item>{
		var all:Array<Item> = [];
		for (source in sources) {
			all = all.concat(source.items);
		}
		return all;
	}
	
	public function getFeedData(source:Feed) {
		if (source.lastUpdate != 0 && Date.now().getTime() - source.lastUpdate < 3600000) return;//1 hours
		if (source.type == "ifeng") parseIfeng(source);
	}
	
	private function parseIfeng(source:Feed) {
		http.get("rss/"+source.id + ".xml").success(function(data) {
			var channel = Xml.parse(data).firstElement().firstElement();
			for (child in channel.elements()) {
				if (child.nodeName == "description") source.description = child.firstChild().nodeValue;
			}
			source.image = "img/"+ source.id + ".jpg";
			var tempArr = source.items.splice(0, source.items.length);
			for (item in channel.elementsNamed("item")) {
				var itemObj:Item = {title:"",vid:"",thumbnail:"",guid:"",description:"",unread:1,pubDate:0};
				for (child in item.elements()) {
					if (child.nodeName == "title") itemObj.title = child.firstChild().nodeValue;
					if (child.nodeName == "guid") {
						var vid = child.firstChild().nodeValue;
						itemObj.guid = vid;
						itemObj.vid = untyped window.btoa(vid);	
					}
					if (child.nodeName == "pubDate") {
						untyped itemObj.pubDate = child.firstChild().nodeValue;
						untyped __js__("try{itemObj.pubDate = new Date(itemObj.pubDate).getTime();}catch(e){itemObj.pubDate=0;}");
					}
					if (child.nodeName == "description") { 
						itemObj.description = child.firstChild().nodeValue;
					}
					if (child.nodeName == "link"){
						itemObj.thumbnail = child.firstChild().nodeValue;
					} 
				}
				if (!isExist(getAllItems(),itemObj))
					source.items.push(findExistOrReturnNew(tempArr,itemObj));
				
			}
			source.lastUpdate = Date.now().getTime();
			rootScope.broadcast("playlistUpdated",[source]);
			saveSourcesToLocalStorage();
		} );		
	}
	
	
	public function new(http:NgHttp, rootScope:NgRootScope, location:NgLocation, window:NgWindow) {
		this.http = http;
		this.rootScope = rootScope;
		this.window = window;
		this.sources = window.localStorage.getItem("sources")!=null?Json.parse(window.localStorage.getItem("sources")):[];
		this.getSourceSeeds();	
		this.refreshFeeds();
	}	
}

class Services implements IServices{
	@:inject("$http","$rootScope","$location","$window")
	public static var feedServ:Dynamic = FeedServ;

    public static function main(){
    }	

}