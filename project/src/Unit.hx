package;

import jasmine.BaseSuite;
import ng.NgMock;
import ng.Angular;

/**
* the code in new and main function should be generated automatically
* setup/teardown and test methods should all to be static public.
* _testXXX method to be pending spec
*/
//@:pending
class Unit extends BaseSuite{
	public static function main(){
		com.haxejs.App.main();	
	}
	
	public static function setup() {
		NgMock.module("com.haxejs");
		//NgMock.configProvider(function(xxProvider) { xxProvider.change(1000); } );
	}
	
	public static function teardown() {
		
	}	
}