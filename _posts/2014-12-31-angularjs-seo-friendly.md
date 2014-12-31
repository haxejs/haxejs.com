---
layout: post_en
title: angularjs seo friendly
description: How to make angularjs app SEO-friendly?
date: "2014-12-31 11:16:00 +0800"
author: kmshi
categories: [en]
keywords: haxe, javascript, js, html5, angular, cordova, openfl, nodejs,angularjs,SEO
---

Some people worry about the SEO friendness of SPA(single page application, like angularjs app). The good news is that open source community already has some solutions for it. [ng-newsletter](http://www.ng-newsletter.com) has a very good and detailed article about it:[serious-angular-seo](http://www.ng-newsletter.com/posts/serious-angular-seo.html)

Here are the steps to make [haxejs.com](http://haxejs.com) to be SEO-friendly:

* Tell spiders to use the new crawling spec(revisit the site using the ?_escaped_fragment_= tag) to crawl our site

 - Hashbang syntax
   ```
   	@:inject("$locationProvider")
	public static var locationConfig:Dynamic = function(locationProvider:NgLocationProvider) {
		locationProvider.html5Mode(false);
		locationProvider.hashPrefix("!");
	}
   ```

 - Add fragment meta to every page
   ```
   <meta name="fragment" content="!">
   ```

* Serve static html page from server-side when the query url with _escaped_fragment_
 We use Prerender.io service to provide cached static content to spiders, here is the nginx configuration to make it happen:
 ```
    location / {
        try_files $uri @prerender;
    }

    location @prerender {        
        proxy_set_header X-Prerender-Token yourprerendertoken;

        set $prerender 0;
        if ($http_user_agent ~* "baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest") {
            set $prerender 1;
        }
        if ($args ~ "_escaped_fragment_") {
            set $prerender 1;
        }
        if ($http_user_agent ~ "Prerender") {
            set $prerender 0;
        }
        if ($uri ~ "\.(json|js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent)") {
          set $prerender 0;
        }
 
        if ($prerender = 1) {
            rewrite .* /$scheme://www.haxejs.com$request_uri? break;
            proxy_pass http://service.prerender.io;	     
        }
        if ($prerender = 0) {
            #rewrite .* /index.html break;
	     proxy_pass http://www.haxejs.com;
        }
    }
 ```

Of cource you can take html snapshots of your site, store and serve them from your server, PhantomJS or zombie.js tools can help you.