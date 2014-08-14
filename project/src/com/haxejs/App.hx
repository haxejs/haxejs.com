package com.haxejs;

import ng.Angular;
import ng.IRuns;

class App implements IRuns
{
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
	@:inject("$rootScope")
	public static var appRun:Dynamic = function(rootScope:NgRootScope){
		rootScope["loading"] = true;
		rootScope.on("$locationChangeStart",function(event,newUrl,oldUrl){
			rootScope["loading"] = true;
		});
		rootScope.on("$locationChangeSuccess",function(event,newUrl,oldUrl){
			rootScope["loading"] = false;
		});
	};
}