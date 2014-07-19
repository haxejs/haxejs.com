package com.haxejs;

import ng.Angular;
import ng.IConfigs;


class App implements IConfigs
{
	public static function main(){
	}

	@:inject("$logProvider")
	public static var runConfig:Dynamic = function(logProvider:NgLogProvider) {
		logProvider.debugEnabled(false);
	}
}