package com.haxejs;

import ng.Angular;
import ng.IControllers;
import ng.NgTranslate;
import com.haxejs.Services.FeedServ;
import com.haxejs.Services.Feed;
import com.haxejs.Services.Item;
import haxe.Json;

class Controllers implements IControllers
{
    public static function main(){
    }

	@:inject("$scope","$translate")
	public static var switchLangCtrl:Dynamic = SwitchLangCtrl;
	
	@:inject("$scope")
	public static var twoWayBindingCtrl:Dynamic = TwoWayBindingCtrl;

	@:inject("$scope")
	public static var addressBookCtrl:Dynamic = AddressBookCtrl;
	
	@:inject("$scope","feedServ","$document")
	public static var photoEssaysCtrl:Dynamic = PhotoEssaysCtrl;
}

//use class/type as controller model
class SwitchLangCtrl extends BaseCtrl{
	private var translate:NgTranslate;
	public var blogPath:String;

	public function new(scope:NgScope,translate:NgTranslate){
		super(scope);
		this.translate = translate;
		blogPath = "/blog/" + translate.preferredLanguage() + "/";
	}

	public function changeLanguage(langKey:String):Void{
		translate.use(langKey);
		blogPath = "/blog/" + langKey + "/";
	}
}

class PhotoEssaysCtrl extends BaseCtrl {
	private var document:NgDocument;
	private var feedServ:FeedServ;
	public var channels:Array<Feed>;
	public var curChannelID:String;
	private var curItems:Array<Item>;
	public var curItemIndex:Int;
	public var title:String;
	public var slides:Array<{src:String,description:String}>;
	
	public function new(scope:NgScope,feedServ:FeedServ,document:NgDocument) {
		super(scope);
		this.document = document;
		this.feedServ = feedServ;
		this.channels = feedServ.sources;
		this.curChannelID = "0";
		this.curItemIndex = 0;
		this.curItems = feedServ.getHotest(200);
		this.refreshData();	
		// scope.on("channelUpdated", function() {
		// 	this.channels = feedServ.sources;
		// 	if (curChannelID=="0") this.curItems = feedServ.getHotest(200);
		// });
		scope.on("playlistUpdated",function(event,args){
			this.channels = feedServ.sources;

			if (args[0].id == channels[channels.length -1].id) {
				if (curChannelID=="0") this.curItems = feedServ.getHotest(200);
				title = curItems[curItemIndex].title;
				slides = Json.parse(curItems[curItemIndex].description);
				document.find("#description").attr("content", title+"--"+slides[0].description);
			}
		});
	}
	
	public function getTotalUnreadNum():Int {
		return feedServ.getHotest(200).length;
	}
	
	private function refreshData():Void {
		if (curItems.length == 0) {
			title = "请耐心等待，数据更新中...";
			slides = [];
			return;
		}
		title = curItems[curItemIndex].title;
		slides = Json.parse(curItems[curItemIndex].description);
		document.find("#description").attr("content", title+"--"+slides[0].description);
	}
	
	public function signal():String {
		if (curItems.length == 0) return "";
		return "("+(curItemIndex + 1) + "/" + curItems.length+")";
	}
	
	public function chooseChannel(id:String):Void {
		curChannelID = id;
		if (id == "0") 
			curItems = feedServ.getHotest(200);
		else
			curItems = feedServ.findSourceByID(id).items;
			
		curItemIndex = 0;
		refreshData();
	}
	
	public function canPrev():Bool {
		return (curItemIndex > 0);
	}
	
	public function canNext():Bool {
		return (curItemIndex < curItems.length -1 );
	}
	
	public function doPrev():Void {
		if (canPrev()) curItemIndex--;
		refreshData();
	}
	
	public function doNext():Void {
		if (canNext()) curItemIndex++;
		refreshData();
	}
}

class TwoWayBindingCtrl extends BaseCtrl {
	public var name:String;
	public function new(scope:NgScope) {
		super(scope);
	}
}

class AddressBookCtrl extends BaseCtrl {
	public var myOptions = { data: 'addressBookCtrl.myData',		
		enableCellSelection: false,
        enableRowSelection: true,
        enableCellEdit: true,
		//multiSelect: false,
		//selectWithCheckboxOnly: true,
		showSelectionCheckbox:true,
		checkboxHeaderTemplate:'<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
        columnDefs: [ {field: 'id', displayName: 'ID', enableCellEdit: false}, 
                      {field:'name', displayName:'Name', enableCellEdit: true },
					  {field:'location', displayName:'Location', enableCellEdit: true },
					  {field:'office', displayName:'Office', enableCellEdit: true },
					  {field:'telephone', displayName:'Telephone', enableCellEdit: true },
					  {field:'cellphone', displayName:'Cellphone', enableCellEdit: true}
					]
	};	
		
	public var myData = [{id:"501",name:"zhang san",location:"shanghai",office:"C-103",telephone:"x55778",cellphone:"650-353-1239"},
                     {id:"502",name:"peter",location:"shanghai",office:"C-104",telephone:"x55779",cellphone:"650-353-1238"} ];
					 
	public function remove():Void untyped{
		//trace(mySelectedItems);
		for (item in mySelectedItems) {
			myData.remove(item);
		}
		mySelectedItems.splice(0, mySelectedItems.length);
	}
	
	public function add():Void {
		myData.push({id:"",name:"?",location:"?",office:"?",telephone:"?",cellphone:"?"});
	}
	
	public function update():Void {
		diffs = [];
		for (item in myData) {
			if (item.id == "") {
				diffs.push(item);
				continue;
			}
			for (old in myDataCopy) {
				if (item.id == old.id) {
					if (Angular.equals(item, old) == false) {
						diffs.push(item);
						continue;
					}
				}
			}
		}
		//trace(Angular.toJson(diffs));
	}
	
	public var mySelectedItems = [];
	
	private var myDataCopy = [];
	
	private var diffs = [];
	
					 
	public function new(scope:NgScope) {
		super(scope);
		Angular.copy(myData, myDataCopy);
		untyped myOptions.selectedItems = mySelectedItems;
	}
}