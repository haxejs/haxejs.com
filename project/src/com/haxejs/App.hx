package com.haxejs;

import ng.Angular;
import ng.IConfigs;
import ng.NgRoute;


class App implements IConfigs
{
	public static function main(){
	}

	@:inject("$routeProvider")
	public static var runConfig:Dynamic = function(routeProvider:NgRouteProvider) {
		routeProvider.when("/home",new RouteMapping().set_templateUrl('partials/home.html'));
		routeProvider.when("/getstarted",new RouteMapping().set_templateUrl('partials/getstarted.html'));
		routeProvider.otherwise(new RouteMapping().set_redirectTo('/home'));
	}

	//IE is the only major browser that caches XHR requests. An efficient way to avoid this poor behavior is to set an HTTP response header of Cache-Control to be no-cache for every request.
	//This behavior is the default behavior for modern browsers and helps to provide a better experience for IE users.
	@:inject("$httpProvider")
	public static var ieAjaxConfig:Dynamic = function(httpProvider:NgHttpProvider){
		untyped httpProvider.defaults.headers.common["Cache-Control"] = 'no-cache';
	}
}