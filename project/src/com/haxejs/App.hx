package com.haxejs;

import ng.Angular;
import ng.IRuns;
import ng.NgCookies;

class App implements IRuns
{
	private static function __init__() : Void untyped {
		//add "ngGrid" to global module dependencies
		if (Angular.isUndefined(window.hxdeps))window.hxdeps = [];
		window.hxdeps.push("ngGrid");
	}
		
	public static function main() {
		Configs.main();
		Controllers.main();
	}

	//$rootScope can only be resolved in module run here
	//$route events:(broadcast)
	//-- $routeChangeStart,$routeChangeSuccess,$routeChangeError,$routeUpdate
	//$location events:	(broadcast)
	//-- $locationChangeStart,$locationChangeSuccess
	//$translate events:(emit)
	//-- $translateLoadingStart,$translateLoadingEnd,$translateLoadingError,$translateLoadingSuccess,
	//-- $translateChangeSuccess,translateChangeEnd,$translateChangeError,$translateChangeStart
	//-- $translateRefreshStart,$translateRefreshEnd
	//ui.router events:(broadcast)
	//-- $stateNotFound,$stateChangeStart,$stateChangeSuccess,$stateChangeError,$viewContentLoading,
	//-- $routeChangeStart,$routeChangeSuccess,$routeChangeError	
	@:inject("$rootScope","$cookies","$location")
	public static var appRun:Dynamic = function(rootScope:NgRootScope,cookies:NgCookies,location:NgLocation){
		rootScope["loading"] = true;
		rootScope.on("$locationChangeStart",function(event,newUrl,oldUrl){
			rootScope["loading"] = true;
		});
		rootScope.on("$locationChangeSuccess",function(event,newUrl,oldUrl){
			//var index:Int = newUrl.indexOf("#/");
			//if(index>0) cookies.put("lastUrl",newUrl.substr(index+1));
			rootScope["loading"] = false;
		});
		//for cordova mobile app to remember last screen and show it next time
		// if (cookies.get("lastUrl")!= null && location.url()==""){
		// 	location.url(cookies.get("lastUrl"));
		// }
	};
}