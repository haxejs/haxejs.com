package com.haxejs;

import ng.Angular;
import ng.IControllers;
import ng.NgTranslate;

class Controllers implements IControllers
{
    public static function main(){
    }

	@:inject("$scope","$translate")
	public static var switchLangCtrl:Dynamic = SwitchLangCtrl;
}

//use class/type as controller model
class SwitchLangCtrl extends BaseCtrl{
	private var translate:NgTranslate;

	public function new(scope:NgScope,translate:NgTranslate){
		super(scope);
		this.translate = translate;
	}

	public function changeLanguage(langKey:String):Void{
		translate.use(langKey);
	}
}