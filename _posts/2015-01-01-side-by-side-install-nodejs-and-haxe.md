---
layout: post_en
title: Side by side install Nodejs and Haxe 
description: The simple way to manage multiple versions of Nodejs and Haxe
date: "2015-01-01 00:00:01 +0800"
author: kmshi
categories: [en]
keywords: haxe, javascript, js, html5, angular, cordova, openfl, nodejs, angularjs
---

Nodejs and Haxe are hotest technologies and they are envolving very quickly, sometimes you need stable version, othertimes you wanna to try latest developing version.

Is there a way to install different versions side by side?

The answer is YES.

##For nodejs, there is [n(node version manager)](https://www.npmjs.com/package/n):
* Install n
> $ sudo npm install -g n

* Install stable node version
> $ sudo n stable

* Install latest node version
> $ sudo n latest

* switch node to a specific version(Use the up / down arrow to navigate, and press enter to select, or ^C to cancel):
> $ sudo n
> $ node -v

##For Haxe, we have [hvm(Haxe Version Manager)](https://github.com/jasononeil/hvm):
* Setup Env to compile Haxe source (For Mac OSX)
- Install homebrew
> $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

- Install XQuartz (required by OCaml)
> $ brew install caskroom/cask/brew-cask && brew cask install xquartz

- Install OCaml
> $ brew install ocaml

* Install hvm
> haxelib install hvm

* Install and use stable haxe version(3.1.3)
> haxelib run hvm --use 3.1.3

* Install and use latest development haxe version
> haxelib run hvm --use development

* Switch haxe version
> haxelib run hvm --set <version>
