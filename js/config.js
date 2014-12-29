require.config({
	baseUrl: './',
    paths: {
        "angular": 'bower_components/angular/angular',
        "angular-cookies":'bower_components/angular-cookies/angular-cookies',
        "angular-route":'bower_components/angular-route/angular-route',
        "angular-translate":'bower_components/angular-translate/angular-translate',
        "angular-translate-handler-log":'bower_components/angular-translate-handler-log/angular-translate-handler-log',
        "angular-translate-loader-static-files":'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
        "angular-translate-loader-url":'bower_components/angular-translate-loader-url/angular-translate-loader-url',
        "angular-translate-storage-cookie":'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie',
        "angular-translate-storage-local":'bower_components/angular-translate-storage-local/angular-translate-storage-local',
        "bootstrap":'bower_components/bootstrap/dist/js/bootstrap',
        "jquery":'bower_components/jquery/dist/jquery',
        "ng-grid":'bower_components/ng-grid/ng-grid-2.0.12.debug',
        "app":"js/app"
    },
    shim: {
    	"angular-cookies":{deps: ['angular']},
    	"angular-route":{deps: ['angular']},
    	"angular-translate":{deps: ['angular']},
    	"angular-translate-handler-log":{deps: ['angular-translate']},
    	"angular-translate-storage-local":{deps: ['angular-translate']},
    	"angular-translate-storage-cookie":{deps: ['angular-translate']},
    	"angular-translate-loader-url":{deps: ['angular-translate']},
    	"angular-translate-loader-static-files":{deps: ['angular-translate']},
    	"bootstrap":{deps: ['jquery']},
    	"ng-grid":{deps: ['angular']},
    	"angular":{exports:'angular',deps: ['jquery']},
        "jquery":{exports:'jquery'},
    	"app":{deps: ['angular']}
    }
});

require(['angular','jquery',
	'bootstrap','angular-cookies',
	'angular-route','angular-translate',
	'angular-translate-storage-local','angular-translate-storage-cookie',
	'angular-translate-loader-url','angular-translate-loader-static-files',
	'angular-translate-handler-log','ng-grid','app'], function(angular) {

		angular.bootstrap(document,["com.haxejs"]);
});