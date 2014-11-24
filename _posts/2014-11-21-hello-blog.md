---
layout: post_zh
title: 博客开通了
description: 我的博客需求、选项、与实施
date: "2014-11-21 15:12:52 +0800"
author: kmshi
categories: [zh]
---
一直想为这个网站加一个博客，今天终于有了我为这个网站发的第一篇文章了。

#我的需求
- 需要同www.haxejs.com网站集成在一起，风格也能类似，支持中、英文与各自讨论环境
- 最小的开发成本
- 最小的维护成本
- 能支持comments


#我的选项
- [博客园](http://www.cnblogs.com/)与[CSDN](http://blog.csdn.net/)
 -[*] 技术类博客网站（集贸），马上有流量，有读者，有关注，有交流，有推荐
 -[] 不支持自定义域名，不能有中、英文独立的讨论环境

- 国内的轻博客，如点点网，Lofter，国外的tumblr，支持自定义域名，但是偏文艺、艺术类（图片冲击）为主的社区，不太适合咱Geek style

- 国外的博客网站，如google blogger等，以及google app engine + micolog等，因咱们天朝的GFW，用户体验无法保障

- Wordpress
 -[*] 自己以前用过，安装简单，插件齐全
 -[] 需PHP运行环境与数据库环境，不管是用SAE还是云主机，都会有一定的费用

- NodeBB，定制一个页面，有些api通过HTTP RESTful，有些又通过websocket，而且数据又混杂style在其内，不喜。

- Jekyll on Github Pages
 -[*] 真正的免费，www.haxejs.com也在Github上
 -[*] 可直接在Github网页上使用markdown语法修改或写文章，且有版本管理之优势
 -[*] 静态化，可迁移部署到任何简单的web site上（比如github被咱们天朝的GFW封了）
 -[*] 基本支持中、英文与各自讨论环境（加上Disqus）
 -[] 流量靠内容、读者与时间积累了


#实施步骤
通过对以上选项的考虑，选择了Jekyll on Github Pages的方案。
具体实施步骤有朋友写了很好的文章，大家看看就明：
- http://greeensy.github.io/github-jekyll/
- http://beiyuu.com/github-pages/


#参考资料
- http://www.jekyllbootstrap.com
- https://github.com/jekyll/jekyll/tree/gh-pages
