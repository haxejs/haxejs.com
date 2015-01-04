---
layout: post_zh
title: node-avos-client
description: 一个封装avos cloud的node module
date: "2015-01-04 15:00:00 +0800"
author: kmshi
categories: [zh]
keywords: haxe, javascript, js, node,nodejs,avos,leancloud
---

虽然leancloud提供了javascript sdk，号称支持nodejs与browser js的运行环境，但它毕竟主要的面向browser的客户端，比如currentUser之类不适合nodejs做为服务器应用来使用。
这里我们计划在[restler](https://github.com/danwrong/restler)(或者[node-rest-client](https://github.com/aacerox/node-rest-client))与[promhx](https://github.com/jdonaldson/promhx)的基础上来提供一个封装avos cloud的node module -- node-avos-client


它将包括一个公用的AVOS服务,原型代码:


```
// create a service constructor for very easy API wrappers a la HTTParty...
AVOS = rest.service(function(appid, appkey) {
  //this.defaults.username = u;
  //this.defaults.password = p;
}, {
  baseURL: 'https://api.leancloud.com'
}, {
  update: function(message) {
    return this.post('/statuses/update.json', { data: { status: message } });
  }
});

var client = new AVOS('danwrong', 'password');
client.update('Tweeting using a Restler service thingy').on('complete', function(data) {
  console.log(data);
});

```

以及一些基础类，原型代码如下：

```
class AVNodeObject<T>{
	private var localData:{};
	private var remoteData:{};
	public var dirty:Bool;

	public function get(attr:String):Dynamic{
		return localData[attr] || remoteData[attr];
	}

	public function set(attr:String,val:Dynamic):T{
		if (this.get(attr)==val) return this;
		localData[attr] = val;
		dirty = true;
		return this;
	}

	public function save():Promise<T>{
		var rest = require('./restler');
		var d = new Deferred<T>();
		var p = new Promise<T>(d);
		rest.get('http://twaud.io/api/v1/users/danwrong.json').on('success', function(data) {
  			//parse data and fill it to remoteData
  			dirty = false;
  			d.resolve(this);
		}).on("fail",function(data){
			d.reject(data);
		}).on("error",function(err){
			d.reject(err);
		});
		return p;
	}
}
```


它将会是一个haxe library for nodejs,也会是一个node module能够让js开发者使用(可行吗？？？)。
你若对它感兴趣，请关注我们，也欢迎大家的任何想法。