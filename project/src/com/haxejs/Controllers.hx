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
	
	@:inject("$scope")
	public static var twoWayBindingCtrl:Dynamic = TwoWayBindingCtrl;

	@:inject("$scope")
	public static var addressBookCtrl:Dynamic = AddressBookCtrl;	
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

class TwoWayBindingCtrl extends BaseCtrl {
	public var name:String;
	public function new(scope:NgScope) {
		super(scope);
	}
}

class AddressBookCtrl extends BaseCtrl {
	public var myOptions = { data: 'addressBookCtrl.myData',		
		enableCellSelection: false,
        enableRowSelection: true,
        enableCellEdit: true,
		//multiSelect: false,
		//selectWithCheckboxOnly: true,
		showSelectionCheckbox:true,
		checkboxHeaderTemplate:'<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
        columnDefs: [ {field: 'id', displayName: 'ID', enableCellEdit: false}, 
                      {field:'name', displayName:'Name', enableCellEdit: true },
					  {field:'location', displayName:'Location', enableCellEdit: true },
					  {field:'office', displayName:'Office', enableCellEdit: true },
					  {field:'telephone', displayName:'Telephone', enableCellEdit: true },
					  {field:'cellphone', displayName:'Cellphone', enableCellEdit: true}
					]
	};	
		
	public var myData = [{id:"501",name:"zhang san",location:"shanghai",office:"C-103",telephone:"x55778",cellphone:"650-353-1239"},
                     {id:"502",name:"peter",location:"shanghai",office:"C-104",telephone:"x55779",cellphone:"650-353-1238"} ];
					 
	public function remove():Void untyped{
		//trace(mySelectedItems);
		for (item in mySelectedItems) {
			myData.remove(item);
		}
		mySelectedItems.splice(0, mySelectedItems.length);
	}
	
	public function add():Void {
		myData.push({id:"",name:"?",location:"?",office:"?",telephone:"?",cellphone:"?"});
	}
	
	public function update():Void {
		diffs = [];
		for (item in myData) {
			if (item.id == "") {
				diffs.push(item);
				continue;
			}
			for (old in myDataCopy) {
				if (item.id == old.id) {
					if (Angular.equals(item, old) == false) {
						diffs.push(item);
						continue;
					}
				}
			}
		}
		//trace(Angular.toJson(diffs));
	}
	
	public var mySelectedItems = [];
	
	private var myDataCopy = [];
	
	private var diffs = [];
	
					 
	public function new(scope:NgScope) {
		super(scope);
		Angular.copy(myData, myDataCopy);
		untyped myOptions.selectedItems = mySelectedItems;
	}
}