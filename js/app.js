(function () { "use strict";
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var ng = {};
ng.IConfigs = function() { };
var com = {};
com.haxejs = {};
com.haxejs.App = function() { };
com.haxejs.App.__interfaces__ = [ng.IConfigs];
com.haxejs.App.main = function() {
	try {
		ng.Angular.module("com.haxejs");
	} catch( e ) {
		var deps;
		if(window.hxdeps) deps = window.hxdeps; else deps = [];
		ng.Angular.module("com.haxejs",deps);
	}
	com.haxejs.App.runConfig.$inject = ["$logProvider"];
	ng.Angular.module("com.haxejs").config(com.haxejs.App.runConfig);
};
com.haxejs.App.runConfig = function(logProvider) {
	logProvider.debugEnabled(false);
};
ng._Angular = {};
ng._Angular.NgAnchorScroll_Impl_ = function() { };
ng._Angular.NgAnchorScroll_Impl_.run = function(this1) {
	this1();
};
ng._Angular.NgScope_Impl_ = function() { };
ng._Angular.NgScope_Impl_.arrayAccess = function(this1,key) {
	return Reflect.field(this1,key);
};
ng._Angular.NgScope_Impl_.arrayWrite = function(this1,key,value) {
	this1[key] = value;
};
ng._Angular.NgScope_Impl_.setViewModel = function(this1,name,value) {
	this1[name] = value;
};
ng._Angular.NgScope_Impl_.getViewModel = function(this1,name) {
	return this1[name];
};
ng._Angular.NgScope_Impl_.newScope = function(this1,isolate) {
	if(isolate == null) isolate = false;
	return this1.$new(isolate);
};
ng._Angular.NgScope_Impl_.watch = function(this1,watchExpression,listener) {
	return this1.$watch(watchExpression,listener);
};
ng._Angular.NgScope_Impl_.watchCollection = function(this1,obj,listener) {
	return this1.$watchCollection(obj,listener);
};
ng._Angular.NgScope_Impl_.digest = function(this1) {
	this1.$digest();
};
ng._Angular.NgScope_Impl_.destroy = function(this1) {
	this1.$destroy();
};
ng._Angular.NgScope_Impl_["eval"] = function(this1,expr,locals) {
	return this1.$eval(expr,locals);
};
ng._Angular.NgScope_Impl_.evalAsync = function(this1,expr) {
	this1.$evalAsync(expr);
};
ng._Angular.NgScope_Impl_.apply = function(this1,expr) {
	return this1.$apply(expr);
};
ng._Angular.NgScope_Impl_.on = function(this1,name,listener) {
	return this1.$on(name,listener);
};
ng._Angular.NgScope_Impl_.emit = function(this1,name,args) {
	return this1.$emit(name,args);
};
ng._Angular.NgScope_Impl_.broadcast = function(this1,name,args) {
	return this1.$broadcast(name,args);
};
ng._Angular.NgHttp_Impl_ = function() { };
ng._Angular.NgHttp_Impl_.run = function(this1,requestConfig) {
	return this1(requestConfig);
};
ng._Angular.NgHttp_Impl_.get = function(this1,url,config) {
	return this1.get(url,config);
};
ng._Angular.NgHttp_Impl_["delete"] = function(this1,url,config) {
	return this1["delete"](url,config);
};
ng._Angular.NgHttp_Impl_.head = function(this1,url,config) {
	return this1.head(url,config);
};
ng._Angular.NgHttp_Impl_.jsonp = function(this1,url,config) {
	return this1.jsonp(url,config);
};
ng._Angular.NgHttp_Impl_.put = function(this1,url,data,config) {
	return this1.put(url,config);
};
ng._Angular.NgHttp_Impl_.post = function(this1,url,data,config) {
	return this1.post(url,config);
};
ng._Angular.NgHttp_Impl_.defaults = function(this1) {
	return this1.defaults;
};
ng._Angular.NgCompile_Impl_ = function() { };
ng._Angular.NgCompile_Impl_.runJ = function(this1,element) {
	return this1(element);
};
ng._Angular.NgCompile_Impl_.run = function(this1,element) {
	return this1(element);
};
ng._Angular.NgCacheFactory_Impl_ = function() { };
ng._Angular.NgCacheFactory_Impl_.newCache = function(this1,cacheId,options) {
	return this1(cacheId,options);
};
ng._Angular.NgCacheFactory_Impl_.info = function(this1) {
	return this1.info();
};
ng._Angular.NgCacheFactory_Impl_.get = function(this1,cacheId) {
	return this1.get(cacheId);
};
ng._Angular.NgExceptionHandler_Impl_ = function() { };
ng._Angular.NgExceptionHandler_Impl_.run = function(this1,exception,cause) {
	this1(exception,cause);
};
ng._Angular.NgInterpolate_Impl_ = function() { };
ng._Angular.NgInterpolate_Impl_.run = function(this1,text,mustHaveExpression,trustedContext) {
	return this1(text,mustHaveExpression,trustedContext);
};
ng._Angular.NgInterpolate_Impl_.startSymbol = function(this1) {
	return this1.startSymbol();
};
ng._Angular.NgInterpolate_Impl_.endSymbol = function(this1) {
	return this1.endSymbol();
};
ng._Angular.NgInterval_Impl_ = function() { };
ng._Angular.NgInterval_Impl_.run = function(this1,fn,delay,count,invokeApply) {
	if(invokeApply == null) invokeApply = true;
	if(count == null) count = 0;
	return this1(fn,delay,count,invokeApply);
};
ng._Angular.NgInterval_Impl_.cancel = function(this1,promise) {
	return this1.cancel(promise);
};
ng._Angular.NgInterval_Impl_.flush = function(this1,millis) {
	this1.flush(millis);
};
ng._Angular.NgExprFn_Impl_ = function() { };
ng._Angular.NgExprFn_Impl_.run = function(this1,context,locals) {
	return this1(context,locals);
};
ng._Angular.NgExprFn_Impl_.literal = function(this1) {
	return this1.literal;
};
ng._Angular.NgExprFn_Impl_.constant = function(this1) {
	return this1.constant;
};
ng._Angular.NgExprFn_Impl_.assign = function(this1) {
	return this1.assign;
};
ng._Angular.NgParse_Impl_ = function() { };
ng._Angular.NgParse_Impl_.run = function(this1,expression) {
	return this1(expression);
};
ng._Angular.NgTimeout_Impl_ = function() { };
ng._Angular.NgTimeout_Impl_.run = function(this1,fn,delay,invokeApply) {
	if(invokeApply == null) invokeApply = true;
	return this1(fn,delay,invokeApply);
};
ng._Angular.NgTimeout_Impl_.cancel = function(this1,promise) {
	return this1.cancel(promise);
};
ng._Angular.NgTimeout_Impl_.flush = function(this1,millis) {
	return this1.flush(millis);
};
ng._Angular.NgController_Impl_ = function() { };
ng._Angular.NgController_Impl_.run = function(this1,expression,locals) {
	if(locals != null && ng.Angular.isUndefined(locals.$scope)) {
		locals.$scope = { };
		if(ng.Angular.isDefined(locals.scope)) ng.Angular.copy(locals.scope,locals.$scope);
	}
	return this1(expression,locals);
};
ng.NgDirectiveDefinition = function() {
};
ng.NgDirectiveDefinition.prototype = {
	set_priority: function(val) {
		this.priority = val;
		return this;
	}
	,get_priority: function() {
		return this.priority;
	}
	,set_template: function(val) {
		this.template = val;
		return this;
	}
	,get_template: function() {
		return this.template;
	}
	,set_templateUrl: function(val) {
		this.templateUrl = val;
		return this;
	}
	,get_templateUrl: function() {
		return this.templateUrl;
	}
	,set_replace: function(val) {
		this.replace = val;
		return this;
	}
	,get_replace: function() {
		return this.replace;
	}
	,set_transclude: function(val) {
		this.transclude = val;
		return this;
	}
	,get_transclude: function() {
		return this.transclude;
	}
	,set_restrict: function(val) {
		this.restrict = val;
		return this;
	}
	,get_restrict: function() {
		return this.restrict;
	}
	,set_scope: function(val) {
		this.scope = val;
		return this;
	}
	,get_scope: function() {
		return this.scope;
	}
	,set_controller: function(val) {
		this.controller = val;
		return this;
	}
	,get_controller: function() {
		return this.controller;
	}
	,set_controllerAs: function(val) {
		this.controllerAs = val;
		return this;
	}
	,get_controllerAs: function() {
		return this.controllerAs;
	}
	,set_require: function(val) {
		this.require = val;
		return this;
	}
	,get_require: function() {
		return this.require;
	}
	,set_compile: function(val) {
		this.compile = val;
		return this;
	}
	,get_compile: function() {
		return this.compile;
	}
	,set_link: function(val) {
		this.link = val;
		return this;
	}
	,get_link: function() {
		return this.link;
	}
};
ng._Angular.NgAttributes_Impl_ = function() { };
ng._Angular.NgAttributes_Impl_.get = function(this1,attr) {
	return this1[attr];
};
ng._Angular.NgAttributes_Impl_.set = function(this1,attr,val) {
	this1.$set(attr,val);
};
ng._Angular.NgAttributes_Impl_.observe = function(this1,attr,fn) {
	this1.$observe(attr,fn);
};
ng._Angular.NgFormController_Impl_ = function() { };
ng._Angular.NgFormController_Impl_.get_pristine = function(this1) {
	return this1.$pristine;
};
ng._Angular.NgFormController_Impl_.set_pristine = function(this1,val) {
	this1.$pristine = val;
};
ng._Angular.NgFormController_Impl_.get_dirty = function(this1) {
	return this1.$dirty;
};
ng._Angular.NgFormController_Impl_.set_dirty = function(this1,val) {
	this1.$dirty = val;
};
ng._Angular.NgFormController_Impl_.get_valid = function(this1) {
	return this1.$valid;
};
ng._Angular.NgFormController_Impl_.set_valid = function(this1,val) {
	this1.$valid = val;
};
ng._Angular.NgFormController_Impl_.get_invalid = function(this1) {
	return this1.$invalid;
};
ng._Angular.NgFormController_Impl_.set_invalid = function(this1,val) {
	this1.$invalid = val;
};
ng._Angular.NgFormController_Impl_.get_error = function(this1) {
	return this1.$error;
};
ng._Angular.NgFilter_Impl_ = function() { };
ng._Angular.NgFilter_Impl_.run = function(this1,name) {
	return this1(name);
};
ng.macro = {};
ng.macro.InjectionBuilder = function() { };
ng.Angular = window.angular;
var q = window.jQuery;
ng.JQuery = q;
com.haxejs.App.main();
})();
