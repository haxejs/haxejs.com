(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var XmlType = { __ename__ : true, __constructs__ : [] };
var Xml = function() {
};
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
};
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
};
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
};
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
};
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n = this.x[k1];
				k1 += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k1;
					return n;
				}
			}
			return null;
		}};
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n1 = this.x[k1];
				k1++;
				if(n1.nodeType == Xml.Element && n1._nodeName == name) {
					this.cur = k1;
					return n1;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,__class__: Xml
};
var ng = {};
ng.IRuns = function() { };
ng.IRuns.__name__ = ["ng","IRuns"];
var com = {};
com.haxejs = {};
com.haxejs.App = function() { };
com.haxejs.App.__name__ = ["com","haxejs","App"];
com.haxejs.App.__interfaces__ = [ng.IRuns];
com.haxejs.App.main = function() {
	try {
		ng.Angular.module("com.haxejs");
	} catch( e ) {
		var deps;
		if(window.hxdeps) deps = window.hxdeps; else deps = [];
		ng.Angular.module("com.haxejs",deps);
	}
	com.haxejs.App.appRun.$inject = ["$rootScope","$cookies","$location","feedServ"];
	com.haxejs.Configs.main();
	com.haxejs.Controllers.main();
	com.haxejs.Services.main();
	ng.Angular.module("com.haxejs").run(com.haxejs.App.appRun);
};
com.haxejs.App.appRun = function(rootScope,cookies,location,feedServ) {
	rootScope.loading = true;
	rootScope.$on("$locationChangeStart",function(event,newUrl,oldUrl) {
		rootScope.loading = true;
	});
	rootScope.$on("$locationChangeSuccess",function(event1,newUrl1,oldUrl1) {
		rootScope.loading = false;
	});
};
ng.IConfigs = function() { };
ng.IConfigs.__name__ = ["ng","IConfigs"];
com.haxejs.Configs = function() { };
com.haxejs.Configs.__name__ = ["com","haxejs","Configs"];
com.haxejs.Configs.__interfaces__ = [ng.IConfigs];
com.haxejs.Configs.main = function() {
	try {
		ng.Angular.module("com.haxejs");
	} catch( e ) {
		var deps;
		if(window.hxdeps) deps = window.hxdeps; else deps = [];
		ng.Angular.module("com.haxejs",deps);
	}
	com.haxejs.Configs.ieAjaxConfig.$inject = ["$httpProvider"];
	com.haxejs.Configs.translateConfig.$inject = ["$translateProvider"];
	com.haxejs.Configs.routeConfig.$inject = ["$routeProvider"];
	com.haxejs.Configs.locationConfig.$inject = ["$locationProvider"];
	ng.Angular.module("com.haxejs").config(com.haxejs.Configs.locationConfig);
	ng.Angular.module("com.haxejs").config(com.haxejs.Configs.routeConfig);
	ng.Angular.module("com.haxejs").config(com.haxejs.Configs.translateConfig);
	ng.Angular.module("com.haxejs").config(com.haxejs.Configs.ieAjaxConfig);
};
com.haxejs.Configs.locationConfig = function(locationProvider) {
	locationProvider.html5Mode(false);
	locationProvider.hashPrefix("!");
};
com.haxejs.Configs.routeConfig = function(routeProvider) {
	routeProvider.when("/home",new ng.RouteMapping().set_templateUrl("partials/home.html"));
	routeProvider.when("/understand",new ng.RouteMapping().set_templateUrl("partials/understand.html"));
	routeProvider.when("/getstarted",new ng.RouteMapping().set_templateUrl("partials/getstarted.html"));
	routeProvider.when("/kanduoduo",new ng.RouteMapping().set_templateUrl("partials/kanduoduo.html"));
	routeProvider.when("/showcase",new ng.RouteMapping().set_templateUrl("partials/showcase.html"));
	routeProvider.otherwise(new ng.RouteMapping().set_redirectTo("/home"));
};
com.haxejs.Configs.translateConfig = function(translateProvider) {
	translateProvider.useStaticFilesLoader({ prefix : "languages/", suffix : ".json"});
	translateProvider.registerAvailableLanguageKeys(["en","zh"],{ en_US : "en", en_UK : "en", zh_CN : "zh", zh_TW : "zh", '*' : "en"});
	translateProvider.determinePreferredLanguage();
};
com.haxejs.Configs.ieAjaxConfig = function(httpProvider) {
	httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
};
ng.IControllers = function() { };
ng.IControllers.__name__ = ["ng","IControllers"];
ng.BaseCtrl = function(scope) {
	var className = Type.getClassName(Type.getClass(this));
	var pos = className.lastIndexOf(".");
	className = className.charAt(pos + 1).toLowerCase() + HxOverrides.substr(className,pos + 2,null);
	scope[className] = this;
};
ng.BaseCtrl.__name__ = ["ng","BaseCtrl"];
ng.BaseCtrl.prototype = {
	__class__: ng.BaseCtrl
};
com.haxejs.AddressBookCtrl = function(scope) {
	this.diffs = [];
	this.myDataCopy = [];
	this.mySelectedItems = [];
	this.myData = [{ id : "501", name : "zhang san", location : "shanghai", office : "C-103", telephone : "x55778", cellphone : "650-353-1239"},{ id : "502", name : "peter", location : "shanghai", office : "C-104", telephone : "x55779", cellphone : "650-353-1238"}];
	this.myOptions = { data : "addressBookCtrl.myData", enableCellSelection : false, enableRowSelection : true, enableCellEdit : true, showSelectionCheckbox : true, checkboxHeaderTemplate : "<input class=\"ngSelectionHeader\" type=\"checkbox\" ng-model=\"allSelected\" ng-change=\"toggleSelectAll(allSelected)\"/>", columnDefs : [{ field : "id", displayName : "ID", enableCellEdit : false},{ field : "name", displayName : "Name", enableCellEdit : true},{ field : "location", displayName : "Location", enableCellEdit : true},{ field : "office", displayName : "Office", enableCellEdit : true},{ field : "telephone", displayName : "Telephone", enableCellEdit : true},{ field : "cellphone", displayName : "Cellphone", enableCellEdit : true}]};
	ng.BaseCtrl.call(this,scope);
	ng.Angular.copy(this.myData,this.myDataCopy);
	this.myOptions.selectedItems = this.mySelectedItems;
};
com.haxejs.AddressBookCtrl.__name__ = ["com","haxejs","AddressBookCtrl"];
com.haxejs.AddressBookCtrl.__super__ = ng.BaseCtrl;
com.haxejs.AddressBookCtrl.prototype = $extend(ng.BaseCtrl.prototype,{
	remove: function() {
		var _g = 0;
		var _g1 = this.mySelectedItems;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			HxOverrides.remove(this.myData,item);
		}
		this.mySelectedItems.splice(0,this.mySelectedItems.length);
	}
	,add: function() {
		this.myData.push({ id : "", name : "?", location : "?", office : "?", telephone : "?", cellphone : "?"});
	}
	,update: function() {
		this.diffs = [];
		var _g = 0;
		var _g1 = this.myData;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			if(item.id == "") {
				this.diffs.push(item);
				continue;
			}
			var _g2 = 0;
			var _g3 = this.myDataCopy;
			while(_g2 < _g3.length) {
				var old = _g3[_g2];
				++_g2;
				if(item.id == old.id) {
					if(ng.Angular.equals(item,old) == false) {
						this.diffs.push(item);
						continue;
					}
				}
			}
		}
	}
	,__class__: com.haxejs.AddressBookCtrl
});
com.haxejs.PhotoEssaysCtrl = function(scope,feedServ) {
	this.curItemIndex = 0;
	this.curChannelID = "0";
	var _g = this;
	ng.BaseCtrl.call(this,scope);
	this.feedServ = feedServ;
	this.channels = feedServ.sources;
	this.curItems = feedServ.getHotest(200);
	scope.$on("channelUpdated",function() {
		_g.channels = feedServ.sources;
		if(_g.curChannelID == "0") _g.curItems = feedServ.getHotest(200);
	});
};
com.haxejs.PhotoEssaysCtrl.__name__ = ["com","haxejs","PhotoEssaysCtrl"];
com.haxejs.PhotoEssaysCtrl.__super__ = ng.BaseCtrl;
com.haxejs.PhotoEssaysCtrl.prototype = $extend(ng.BaseCtrl.prototype,{
	getTotalUnreadNum: function() {
		return this.feedServ.getHotest(200).length;
	}
	,curItem: function() {
		if(this.curItems.length == 0) return null;
		return this.curItems[this.curItemIndex];
	}
	,title: function() {
		var item = this.curItem();
		if(item == null) return "亲，出错了，我们正在努力捉虫中...";
		return item.title;
	}
	,signal: function() {
		var item = this.curItem();
		if(item == null) return "";
		return "(" + (this.curItemIndex + 1) + "/" + this.curItems.length + ")";
	}
	,slides: function() {
		var item = this.curItem();
		if(item == null) return [];
		return JSON.parse(item.description);
	}
	,chooseChannel: function(id) {
		this.curChannelID = id;
		if(id == "0") this.curItems = this.feedServ.getHotest(200); else this.curItems = this.feedServ.findSourceByID(id).items;
		this.curItemIndex = 0;
	}
	,canPrev: function() {
		return this.curItemIndex > 0;
	}
	,canNext: function() {
		return this.curItemIndex < this.curItems.length - 1;
	}
	,doPrev: function() {
		if(this.canPrev()) this.curItemIndex--;
	}
	,doNext: function() {
		if(this.canNext()) this.curItemIndex++;
	}
	,__class__: com.haxejs.PhotoEssaysCtrl
});
com.haxejs.SwitchLangCtrl = function(scope,translate) {
	ng.BaseCtrl.call(this,scope);
	this.translate = translate;
};
com.haxejs.SwitchLangCtrl.__name__ = ["com","haxejs","SwitchLangCtrl"];
com.haxejs.SwitchLangCtrl.__super__ = ng.BaseCtrl;
com.haxejs.SwitchLangCtrl.prototype = $extend(ng.BaseCtrl.prototype,{
	changeLanguage: function(langKey) {
		this.translate["use"](langKey);
	}
	,__class__: com.haxejs.SwitchLangCtrl
});
com.haxejs.TwoWayBindingCtrl = function(scope) {
	ng.BaseCtrl.call(this,scope);
};
com.haxejs.TwoWayBindingCtrl.__name__ = ["com","haxejs","TwoWayBindingCtrl"];
com.haxejs.TwoWayBindingCtrl.__super__ = ng.BaseCtrl;
com.haxejs.TwoWayBindingCtrl.prototype = $extend(ng.BaseCtrl.prototype,{
	__class__: com.haxejs.TwoWayBindingCtrl
});
com.haxejs.Controllers = function() { };
com.haxejs.Controllers.__name__ = ["com","haxejs","Controllers"];
com.haxejs.Controllers.__interfaces__ = [ng.IControllers];
com.haxejs.Controllers.main = function() {
	try {
		ng.Angular.module("com.haxejs");
	} catch( e ) {
		var deps;
		if(window.hxdeps) deps = window.hxdeps; else deps = [];
		ng.Angular.module("com.haxejs",deps);
	}
	com.haxejs.Controllers.photoEssaysCtrl.$inject = ["$scope","feedServ"];
	com.haxejs.Controllers.addressBookCtrl.$inject = ["$scope"];
	com.haxejs.Controllers.twoWayBindingCtrl.$inject = ["$scope"];
	com.haxejs.Controllers.switchLangCtrl.$inject = ["$scope","$translate"];
	ng.Angular.module("com.haxejs").controller("switchLangCtrl",com.haxejs.Controllers.switchLangCtrl);
	ng.Angular.module("com.haxejs").controller("twoWayBindingCtrl",com.haxejs.Controllers.twoWayBindingCtrl);
	ng.Angular.module("com.haxejs").controller("addressBookCtrl",com.haxejs.Controllers.addressBookCtrl);
	ng.Angular.module("com.haxejs").controller("photoEssaysCtrl",com.haxejs.Controllers.photoEssaysCtrl);
};
com.haxejs.FeedServ = function(http,rootScope,location,window) {
	this.seeds = [];
	this.sources = [];
	this.http = http;
	this.rootScope = rootScope;
	this.window = window;
	if(window.localStorage.getItem("sources") != null) this.sources = JSON.parse(window.localStorage.getItem("sources")); else this.sources = [];
	this.getSourceSeeds();
	this.refreshFeeds();
};
com.haxejs.FeedServ.__name__ = ["com","haxejs","FeedServ"];
com.haxejs.FeedServ.prototype = {
	getSourceSeeds: function() {
		var _g = this;
		if(this.window.localStorage.getItem("lastSeedsUpdate") != null) this.lastSeedsUpdate = Std.parseFloat(this.window.localStorage.getItem("lastSeedsUpdate")); else this.lastSeedsUpdate = 0;
		if(this.lastSeedsUpdate != 0 && new Date().getTime() - this.lastSeedsUpdate < 3600000) {
			if(this.window.localStorage.getItem("seeds") != null) this.seeds = JSON.parse(this.window.localStorage.getItem("seeds")); else this.seeds = [];
			return;
		}
		this.http.get("http://picviewer.haxejs.com/data/sources.json",null).success(function(data) {
			_g.seeds = data;
			try {
				_g.window.localStorage.setItem("seeds",JSON.stringify(_g.seeds));
			} catch( e ) {
			}
			_g.rootScope.$broadcast("seedUpdated",[_g.seeds]);
			if(_g.lastSeedsUpdate == 0) {
				var _g1 = 0;
				var _g2 = _g.seeds;
				while(_g1 < _g2.length) {
					var seed = _g2[_g1];
					++_g1;
					_g.addSeedToSources(seed);
				}
			}
			_g.lastSeedsUpdate = new Date().getTime();
			try {
				_g.window.localStorage.setItem("lastSeedsUpdate",_g.lastSeedsUpdate == null?"null":"" + _g.lastSeedsUpdate);
			} catch( e1 ) {
			}
		});
	}
	,saveSourcesToLocalStorage: function() {
		try {
			this.window.localStorage.setItem("sources",JSON.stringify(this.sources));
		} catch( e ) {
		}
	}
	,refreshFeeds: function() {
		var _g = 0;
		var _g1 = this.sources;
		while(_g < _g1.length) {
			var source = _g1[_g];
			++_g;
			this.getFeedData(source);
		}
		haxe.Timer.delay($bind(this,this.refreshFeeds),3600000);
	}
	,addSeedToSources: function(seed) {
		var source = { title : seed.title, id : seed.id, url : seed.url, type : seed.type, lastUpdate : 0, items : [], description : "", image : ""};
		this.sources.push(source);
		this.saveSourcesToLocalStorage();
		this.rootScope.$broadcast("channelUpdated",[this.sources]);
		this.getFeedData(source);
	}
	,removeFromSources: function(source) {
		var id = source.id;
		HxOverrides.remove(this.sources,source);
		this.saveSourcesToLocalStorage();
		this.rootScope.$broadcast("channelUpdated",[this.sources]);
		this.rootScope.$broadcast("playlistDeleted",[id]);
	}
	,findSourceByID: function(fid) {
		return this.sources.filter(function(source) {
			if(source.id == fid) return true; else return false;
		})[0];
	}
	,findItemByVid: function(vid) {
		var all = this.getAllItems();
		return all.filter(function(item) {
			if(item.vid == vid) return true; else return false;
		})[0];
	}
	,getUnreadNum: function(source) {
		return source.items.filter(function(item) {
			if(item.unread == 1) return true; else return false;
		}).length;
	}
	,findExistOrReturnNew: function(arr,newItem) {
		var olds = arr.filter(function(obj) {
			if(obj.guid == newItem.guid) return true; else return false;
		});
		if(olds.length > 0) return olds[0]; else return newItem;
	}
	,isExist: function(arr,newItem) {
		var olds = arr.filter(function(obj) {
			if(obj.guid == newItem.guid) return true; else return false;
		});
		if(olds.length > 0) return true; else return false;
	}
	,getHotest: function(len) {
		var hots = [];
		var curTime = new Date().getTime() - 604800000;
		var _g = 0;
		var _g1 = this.sources;
		while(_g < _g1.length) {
			var source = _g1[_g];
			++_g;
			var unreads = source.items.filter(function(item) {
				if(item.unread == 1 && item.pubDate > curTime) return true; else return false;
			});
			hots = hots.concat(unreads.slice(0,Std["int"](Math.min(unreads.length,5))));
		}
		haxe.ds.ArraySort.sort(hots,function(x,y) {
			return Std["int"]((Math.isNaN(y.pubDate)?0:y.pubDate) - (Math.isNaN(x.pubDate)?0:x.pubDate));
		});
		return hots;
	}
	,getAllItems: function() {
		var all = [];
		var _g = 0;
		var _g1 = this.sources;
		while(_g < _g1.length) {
			var source = _g1[_g];
			++_g;
			all = all.concat(source.items);
		}
		return all;
	}
	,getFeedData: function(source) {
		if(source.lastUpdate != 0 && new Date().getTime() - source.lastUpdate < 3600000) return;
		if(source.type == "ifeng") this.parseIfeng(source);
	}
	,parseIfeng: function(source) {
		var _g = this;
		this.http.get("http://picviewer.haxejs.com/rss/" + source.id + ".xml",null).success(function(data) {
			var channel = Xml.parse(data).firstElement().firstElement();
			var $it0 = channel.elements();
			while( $it0.hasNext() ) {
				var child = $it0.next();
				if(child.get_nodeName() == "description") source.description = child.firstChild().get_nodeValue();
			}
			source.image = "img/" + source.id + ".jpg";
			var tempArr = source.items.splice(0,source.items.length);
			var $it1 = channel.elementsNamed("item");
			while( $it1.hasNext() ) {
				var item = $it1.next();
				var itemObj = { title : "", vid : "", thumbnail : "", guid : "", description : "", unread : 1, pubDate : 0};
				var $it2 = item.elements();
				while( $it2.hasNext() ) {
					var child1 = $it2.next();
					if(child1.get_nodeName() == "title") itemObj.title = child1.firstChild().get_nodeValue();
					if(child1.get_nodeName() == "guid") {
						var vid = child1.firstChild().get_nodeValue();
						itemObj.guid = vid;
						itemObj.vid = _g.window.btoa(vid);
					}
					if(child1.get_nodeName() == "pubDate") {
						itemObj.pubDate = child1.firstChild().get_nodeValue();
						try{itemObj.pubDate = new Date(itemObj.pubDate).getTime();}catch(e){itemObj.pubDate=0;}
					}
					if(child1.get_nodeName() == "description") itemObj.description = child1.firstChild().get_nodeValue();
					if(child1.get_nodeName() == "link") itemObj.thumbnail = child1.firstChild().get_nodeValue();
				}
				if(!_g.isExist(_g.getAllItems(),itemObj)) source.items.push(_g.findExistOrReturnNew(tempArr,itemObj));
			}
			source.lastUpdate = new Date().getTime();
			_g.rootScope.$broadcast("playlistUpdated",[source]);
			_g.saveSourcesToLocalStorage();
		});
	}
	,__class__: com.haxejs.FeedServ
};
ng.IServices = function() { };
ng.IServices.__name__ = ["ng","IServices"];
com.haxejs.Services = function() { };
com.haxejs.Services.__name__ = ["com","haxejs","Services"];
com.haxejs.Services.__interfaces__ = [ng.IServices];
com.haxejs.Services.main = function() {
	try {
		ng.Angular.module("com.haxejs");
	} catch( e ) {
		var deps;
		if(window.hxdeps) deps = window.hxdeps; else deps = [];
		ng.Angular.module("com.haxejs",deps);
	}
	com.haxejs.Services.feedServ.$inject = ["$http","$rootScope","$location","$window"];
	ng.Angular.module("com.haxejs").service("feedServ",com.haxejs.Services.feedServ);
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.ds = {};
haxe.ds.ArraySort = function() { };
haxe.ds.ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe.ds.ArraySort.sort = function(a,cmp) {
	haxe.ds.ArraySort.rec(a,cmp,0,a.length);
};
haxe.ds.ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe.ds.ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe.ds.ArraySort.rec(a,cmp,from,middle);
	haxe.ds.ArraySort.rec(a,cmp,middle,to);
	haxe.ds.ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe.ds.ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe.ds.ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe.ds.ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe.ds.ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe.ds.ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe.ds.ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe.ds.ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe.ds.ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe.ds.ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe.ds.ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe.ds.ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe.ds.ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe.ds.ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,__class__: haxe.ds.StringMap
};
haxe.xml = {};
haxe.xml.Parser = function() { };
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i;
					if(s.charCodeAt(1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
ng._Angular = {};
ng._Angular.NgAnchorScroll_Impl_ = function() { };
ng._Angular.NgAnchorScroll_Impl_.__name__ = ["ng","_Angular","NgAnchorScroll_Impl_"];
ng._Angular.NgAnchorScroll_Impl_.run = function(this1) {
	this1();
};
ng._Angular.NgScope_Impl_ = function() { };
ng._Angular.NgScope_Impl_.__name__ = ["ng","_Angular","NgScope_Impl_"];
ng._Angular.NgScope_Impl_.arrayAccess = function(this1,key) {
	return Reflect.field(this1,key);
};
ng._Angular.NgScope_Impl_.arrayWrite = function(this1,key,value) {
	this1[key] = value;
};
ng._Angular.NgScope_Impl_.setViewModel = function(this1,name,value) {
	this1[name] = value;
};
ng._Angular.NgScope_Impl_.getViewModel = function(this1,name) {
	return this1[name];
};
ng._Angular.NgScope_Impl_.newScope = function(this1,isolate) {
	if(isolate == null) isolate = false;
	return this1.$new(isolate);
};
ng._Angular.NgScope_Impl_.watch = function(this1,watchExpression,listener) {
	return this1.$watch(watchExpression,listener);
};
ng._Angular.NgScope_Impl_.watchCollection = function(this1,obj,listener) {
	return this1.$watchCollection(obj,listener);
};
ng._Angular.NgScope_Impl_.digest = function(this1) {
	this1.$digest();
};
ng._Angular.NgScope_Impl_.destroy = function(this1) {
	this1.$destroy();
};
ng._Angular.NgScope_Impl_["eval"] = function(this1,expr,locals) {
	return this1.$eval(expr,locals);
};
ng._Angular.NgScope_Impl_.evalAsync = function(this1,expr) {
	this1.$evalAsync(expr);
};
ng._Angular.NgScope_Impl_.apply = function(this1,expr) {
	return this1.$apply(expr);
};
ng._Angular.NgScope_Impl_.on = function(this1,name,listener) {
	return this1.$on(name,listener);
};
ng._Angular.NgScope_Impl_.emit = function(this1,name,args) {
	return this1.$emit(name,args);
};
ng._Angular.NgScope_Impl_.broadcast = function(this1,name,args) {
	return this1.$broadcast(name,args);
};
ng._Angular.NgHttp_Impl_ = function() { };
ng._Angular.NgHttp_Impl_.__name__ = ["ng","_Angular","NgHttp_Impl_"];
ng._Angular.NgHttp_Impl_.run = function(this1,requestConfig) {
	return this1(requestConfig);
};
ng._Angular.NgHttp_Impl_.get = function(this1,url,config) {
	return this1.get(url,config);
};
ng._Angular.NgHttp_Impl_["delete"] = function(this1,url,config) {
	return this1["delete"](url,config);
};
ng._Angular.NgHttp_Impl_.head = function(this1,url,config) {
	return this1.head(url,config);
};
ng._Angular.NgHttp_Impl_.jsonp = function(this1,url,config) {
	return this1.jsonp(url,config);
};
ng._Angular.NgHttp_Impl_.put = function(this1,url,data,config) {
	return this1.put(url,config);
};
ng._Angular.NgHttp_Impl_.post = function(this1,url,data,config) {
	return this1.post(url,config);
};
ng._Angular.NgHttp_Impl_.defaults = function(this1) {
	return this1.defaults;
};
ng._Angular.NgCompile_Impl_ = function() { };
ng._Angular.NgCompile_Impl_.__name__ = ["ng","_Angular","NgCompile_Impl_"];
ng._Angular.NgCompile_Impl_.runJ = function(this1,element) {
	return this1(element);
};
ng._Angular.NgCompile_Impl_.run = function(this1,element) {
	return this1(element);
};
ng._Angular.NgCacheFactory_Impl_ = function() { };
ng._Angular.NgCacheFactory_Impl_.__name__ = ["ng","_Angular","NgCacheFactory_Impl_"];
ng._Angular.NgCacheFactory_Impl_.newCache = function(this1,cacheId,options) {
	return this1(cacheId,options);
};
ng._Angular.NgCacheFactory_Impl_.info = function(this1) {
	return this1.info();
};
ng._Angular.NgCacheFactory_Impl_.get = function(this1,cacheId) {
	return this1.get(cacheId);
};
ng._Angular.NgExceptionHandler_Impl_ = function() { };
ng._Angular.NgExceptionHandler_Impl_.__name__ = ["ng","_Angular","NgExceptionHandler_Impl_"];
ng._Angular.NgExceptionHandler_Impl_.run = function(this1,exception,cause) {
	this1(exception,cause);
};
ng._Angular.NgInterpolate_Impl_ = function() { };
ng._Angular.NgInterpolate_Impl_.__name__ = ["ng","_Angular","NgInterpolate_Impl_"];
ng._Angular.NgInterpolate_Impl_.run = function(this1,text,mustHaveExpression,trustedContext) {
	return this1(text,mustHaveExpression,trustedContext);
};
ng._Angular.NgInterpolate_Impl_.startSymbol = function(this1) {
	return this1.startSymbol();
};
ng._Angular.NgInterpolate_Impl_.endSymbol = function(this1) {
	return this1.endSymbol();
};
ng._Angular.NgInterval_Impl_ = function() { };
ng._Angular.NgInterval_Impl_.__name__ = ["ng","_Angular","NgInterval_Impl_"];
ng._Angular.NgInterval_Impl_.run = function(this1,fn,delay,count,invokeApply) {
	if(invokeApply == null) invokeApply = true;
	if(count == null) count = 0;
	return this1(fn,delay,count,invokeApply);
};
ng._Angular.NgInterval_Impl_.cancel = function(this1,promise) {
	return this1.cancel(promise);
};
ng._Angular.NgInterval_Impl_.flush = function(this1,millis) {
	this1.flush(millis);
};
ng._Angular.NgExprFn_Impl_ = function() { };
ng._Angular.NgExprFn_Impl_.__name__ = ["ng","_Angular","NgExprFn_Impl_"];
ng._Angular.NgExprFn_Impl_.run = function(this1,context,locals) {
	return this1(context,locals);
};
ng._Angular.NgExprFn_Impl_.literal = function(this1) {
	return this1.literal;
};
ng._Angular.NgExprFn_Impl_.constant = function(this1) {
	return this1.constant;
};
ng._Angular.NgExprFn_Impl_.assign = function(this1) {
	return this1.assign;
};
ng._Angular.NgParse_Impl_ = function() { };
ng._Angular.NgParse_Impl_.__name__ = ["ng","_Angular","NgParse_Impl_"];
ng._Angular.NgParse_Impl_.run = function(this1,expression) {
	return this1(expression);
};
ng._Angular.NgTimeout_Impl_ = function() { };
ng._Angular.NgTimeout_Impl_.__name__ = ["ng","_Angular","NgTimeout_Impl_"];
ng._Angular.NgTimeout_Impl_.run = function(this1,fn,delay,invokeApply) {
	if(invokeApply == null) invokeApply = true;
	return this1(fn,delay,invokeApply);
};
ng._Angular.NgTimeout_Impl_.cancel = function(this1,promise) {
	return this1.cancel(promise);
};
ng._Angular.NgTimeout_Impl_.flush = function(this1,millis) {
	return this1.flush(millis);
};
ng._Angular.NgController_Impl_ = function() { };
ng._Angular.NgController_Impl_.__name__ = ["ng","_Angular","NgController_Impl_"];
ng._Angular.NgController_Impl_.run = function(this1,expression,locals) {
	if(locals != null && ng.Angular.isUndefined(locals.$scope)) {
		locals.$scope = { };
		if(ng.Angular.isDefined(locals.scope)) ng.Angular.copy(locals.scope,locals.$scope);
	}
	return this1(expression,locals);
};
ng.NgDirectiveDefinition = function() {
};
ng.NgDirectiveDefinition.__name__ = ["ng","NgDirectiveDefinition"];
ng.NgDirectiveDefinition.prototype = {
	set_priority: function(val) {
		this.priority = val;
		return this;
	}
	,get_priority: function() {
		return this.priority;
	}
	,set_template: function(val) {
		this.template = val;
		return this;
	}
	,get_template: function() {
		return this.template;
	}
	,set_templateUrl: function(val) {
		this.templateUrl = val;
		return this;
	}
	,get_templateUrl: function() {
		return this.templateUrl;
	}
	,set_replace: function(val) {
		this.replace = val;
		return this;
	}
	,get_replace: function() {
		return this.replace;
	}
	,set_transclude: function(val) {
		this.transclude = val;
		return this;
	}
	,get_transclude: function() {
		return this.transclude;
	}
	,set_restrict: function(val) {
		this.restrict = val;
		return this;
	}
	,get_restrict: function() {
		return this.restrict;
	}
	,set_scope: function(val) {
		this.scope = val;
		return this;
	}
	,get_scope: function() {
		return this.scope;
	}
	,set_controller: function(val) {
		this.controller = val;
		return this;
	}
	,get_controller: function() {
		return this.controller;
	}
	,set_controllerAs: function(val) {
		this.controllerAs = val;
		return this;
	}
	,get_controllerAs: function() {
		return this.controllerAs;
	}
	,set_require: function(val) {
		this.require = val;
		return this;
	}
	,get_require: function() {
		return this.require;
	}
	,set_compile: function(val) {
		this.compile = val;
		return this;
	}
	,get_compile: function() {
		return this.compile;
	}
	,set_link: function(val) {
		this.link = val;
		return this;
	}
	,get_link: function() {
		return this.link;
	}
	,__class__: ng.NgDirectiveDefinition
};
ng._Angular.NgAttributes_Impl_ = function() { };
ng._Angular.NgAttributes_Impl_.__name__ = ["ng","_Angular","NgAttributes_Impl_"];
ng._Angular.NgAttributes_Impl_.get = function(this1,attr) {
	return this1[attr];
};
ng._Angular.NgAttributes_Impl_.set = function(this1,attr,val) {
	this1.$set(attr,val);
};
ng._Angular.NgAttributes_Impl_.observe = function(this1,attr,fn) {
	this1.$observe(attr,fn);
};
ng._Angular.NgFormController_Impl_ = function() { };
ng._Angular.NgFormController_Impl_.__name__ = ["ng","_Angular","NgFormController_Impl_"];
ng._Angular.NgFormController_Impl_.get_pristine = function(this1) {
	return this1.$pristine;
};
ng._Angular.NgFormController_Impl_.set_pristine = function(this1,val) {
	this1.$pristine = val;
};
ng._Angular.NgFormController_Impl_.get_dirty = function(this1) {
	return this1.$dirty;
};
ng._Angular.NgFormController_Impl_.set_dirty = function(this1,val) {
	this1.$dirty = val;
};
ng._Angular.NgFormController_Impl_.get_valid = function(this1) {
	return this1.$valid;
};
ng._Angular.NgFormController_Impl_.set_valid = function(this1,val) {
	this1.$valid = val;
};
ng._Angular.NgFormController_Impl_.get_invalid = function(this1) {
	return this1.$invalid;
};
ng._Angular.NgFormController_Impl_.set_invalid = function(this1,val) {
	this1.$invalid = val;
};
ng._Angular.NgFormController_Impl_.get_error = function(this1) {
	return this1.$error;
};
ng._Angular.NgFilter_Impl_ = function() { };
ng._Angular.NgFilter_Impl_.__name__ = ["ng","_Angular","NgFilter_Impl_"];
ng._Angular.NgFilter_Impl_.run = function(this1,name) {
	return this1(name);
};
ng._NgCookies = {};
ng._NgCookies.NgCookies_Impl_ = function() { };
ng._NgCookies.NgCookies_Impl_.__name__ = ["ng","_NgCookies","NgCookies_Impl_"];
ng._NgCookies.NgCookies_Impl_.get = function(this1,key) {
	return Reflect.field(this1,key);
};
ng._NgCookies.NgCookies_Impl_.put = function(this1,key,value) {
	this1[key] = value;
};
ng._NgCookies.NgCookies_Impl_.remove = function(this1,key) {
	var self = this1;
	delete self[key];
};
ng._NgCookies.NgCookieStore_Impl_ = function() { };
ng._NgCookies.NgCookieStore_Impl_.__name__ = ["ng","_NgCookies","NgCookieStore_Impl_"];
ng._NgCookies.NgCookieStore_Impl_.get = function(this1,key) {
	return Reflect.field(this1,key);
};
ng._NgCookies.NgCookieStore_Impl_.put = function(this1,key,value) {
	this1[key] = value;
};
ng._NgCookies.NgCookieStore_Impl_.remove = function(this1,key) {
	var self = this1;
	delete self[key];
};
ng.RouteMapping = function() {
};
ng.RouteMapping.__name__ = ["ng","RouteMapping"];
ng.RouteMapping.prototype = {
	set_controller: function(val) {
		this.controller = val;
		return this;
	}
	,get_controller: function() {
		return this.controller;
	}
	,set_controllerAs: function(val) {
		this.controllerAs = val;
		return this;
	}
	,get_controllerAs: function() {
		return this.controllerAs;
	}
	,set_template: function(val) {
		this.template = val;
		return this;
	}
	,get_template: function() {
		return this.template;
	}
	,set_templateUrl: function(val) {
		this.templateUrl = val;
		return this;
	}
	,get_templateUrl: function() {
		return this.templateUrl;
	}
	,set_resolve: function(val) {
		this.resolve = val;
		return this;
	}
	,get_resolve: function() {
		return this.resolve;
	}
	,set_redirectTo: function(val) {
		this.redirectTo = val;
		return this;
	}
	,get_redirectTo: function() {
		return this.redirectTo;
	}
	,set_reloadOnSearch: function(val) {
		this.reloadOnSearch = val;
		return this;
	}
	,get_reloadOnSearch: function() {
		return this.reloadOnSearch;
	}
	,set_caseInsensitiveMatch: function(val) {
		this.caseInsensitiveMatch = val;
		return this;
	}
	,get_caseInsensitiveMatch: function() {
		return this.caseInsensitiveMatch;
	}
	,__class__: ng.RouteMapping
};
ng.macro = {};
ng.macro.InjectionBuilder = function() { };
ng.macro.InjectionBuilder.__name__ = ["ng","macro","InjectionBuilder"];
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
ng.Angular = window.angular;
if(ng.Angular.isUndefined(window.hxdeps)) window.hxdeps = [];
window.hxdeps.push("ngGrid");
var q = window.jQuery;
ng.JQuery = q;
if(ng.Angular.isUndefined(window.hxdeps)) window.hxdeps = [];
window.hxdeps.push("ngCookies");
if(ng.Angular.isUndefined(window.hxdeps)) window.hxdeps = [];
window.hxdeps.push("ngRoute");
if(ng.Angular.isUndefined(window.hxdeps)) window.hxdeps = [];
window.hxdeps.push("pascalprecht.translate");
com.haxejs.Controllers.switchLangCtrl = com.haxejs.SwitchLangCtrl;
com.haxejs.Controllers.twoWayBindingCtrl = com.haxejs.TwoWayBindingCtrl;
com.haxejs.Controllers.addressBookCtrl = com.haxejs.AddressBookCtrl;
com.haxejs.Controllers.photoEssaysCtrl = com.haxejs.PhotoEssaysCtrl;
com.haxejs.Services.feedServ = com.haxejs.FeedServ;
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
com.haxejs.App.main();
})();
