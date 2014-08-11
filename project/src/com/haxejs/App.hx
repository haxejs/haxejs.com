package com.haxejs;

import ng.Angular;
import ng.IConfigs;
import ng.NgRoute;
import ng.NgTranslate;


class App implements IConfigs
{
	public static function main(){
		Controllers.main();
	}

	@:inject("$routeProvider")
	public static var routeConfig:Dynamic = function(routeProvider:NgRouteProvider) {
		routeProvider.when("/home",new RouteMapping().set_templateUrl('partials/home.html'));
		routeProvider.when("/getstarted",new RouteMapping().set_templateUrl('partials/getstarted.html'));
		routeProvider.otherwise(new RouteMapping().set_redirectTo('/home'));
	}

	@:inject("$translateProvider")
	public static var translateConfig:Dynamic = function(translateProvider:NgTranslateProvider) {
		  // translateProvider.translations('en', {
		  //   HEADLINE: 'Hello there, This is my awesome app!',
		  //   INTRO_TEXT: 'And it has i18n support!',
		  //   BUTTON_TEXT_EN: 'english',
		  //   BUTTON_TEXT_ZH: 'chinese'
		  // })
		  // .translations('zh', {
		  //   HEADLINE: 'Hey, 看看我的漂亮应用!',
		  //   INTRO_TEXT: '它还支持国际化!',
		  //   BUTTON_TEXT_EN: '英文',
		  //   BUTTON_TEXT_ZH: '中文'
		  // });
		  translateProvider.useStaticFilesLoader({
			prefix: 'languages/',
			suffix: '.json'
		  });
		  translateProvider.preferredLanguage('zh');
	}

	//IE is the only major browser that caches XHR requests. An efficient way to avoid this poor behavior is to set an HTTP response header of Cache-Control to be no-cache for every request.
	//This behavior is the default behavior for modern browsers and helps to provide a better experience for IE users.
	@:inject("$httpProvider")
	public static var ieAjaxConfig:Dynamic = function(httpProvider:NgHttpProvider){
		untyped httpProvider.defaults.headers.common["Cache-Control"] = 'no-cache';
	}
}