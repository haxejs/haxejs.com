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