package com.haxejs;

import ng.Angular;
import ng.IConfigs;
import ng.NgRoute;
import ng.NgTranslate;


class Configs implements IConfigs
{
	public static function main(){
	}

	@:inject("$locationProvider")
	public static var locationConfig:Dynamic = function(locationProvider:NgLocationProvider) {
		locationProvider.html5Mode(false);
	}

	@:inject("$routeProvider")
	public static var routeConfig:Dynamic = function(routeProvider:NgRouteProvider) {
		routeProvider.when("/home",new RouteMapping().set_templateUrl('partials/home.html'));
		routeProvider.when("/understand", new RouteMapping().set_templateUrl('partials/understand.html'));
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
		  //translateProvider.fallbackLanguage("en");
		  //translateProvider.preferredLanguage('zh');
		  //translateProvider.useMissingTranslationHandlerLog();

		  //combine registerAvailableLanguageKeys and determinePreferredLanguage to determine by browser default locale
		  translateProvider.registerAvailableLanguageKeys(["en","zh"],{
		  	'en_US': 'en',
    		'en_UK': 'en',
    		'zh_CN': 'zh',
    		'zh_TW': 'zh',
    		'*':'en'
		  	});
		  translateProvider.determinePreferredLanguage();
	}

	//IE is the only major browser that caches XHR requests. An efficient way to avoid this poor behavior is to set an HTTP response header of Cache-Control to be no-cache for every request.
	//This behavior is the default behavior for modern browsers and helps to provide a better experience for IE users.
	@:inject("$httpProvider")
	public static var ieAjaxConfig:Dynamic = function(httpProvider:NgHttpProvider){
		untyped httpProvider.defaults.headers.common["Cache-Control"] = 'no-cache';
	}
	
	//The minimum bar for $sce is IE8 in standards mode. IE7 standards mode is not supported. If you must support IE7, you should disable $sce completely.
	//angular-translate can not work well somewhere if we disable $sce, we can only support IE8 and above
	//@:inject("$sceProvider")
	//public static var sceConfig:Dynamic = function(sceProvider:NgSceProvider){
	//	sceProvider.enabled(false);
	//}
}