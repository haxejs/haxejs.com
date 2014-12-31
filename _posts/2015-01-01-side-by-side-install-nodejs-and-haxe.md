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

###For nodejs, there is [n(node version manager)](https://www.npmjs.com/package/n):

####1. Install n
> $ sudo npm install -g n

####2. Install stable node version
> $ sudo n stable

####3. Install latest node version
> $ sudo n latest

####4. switch node to a specific version(Use the up / down arrow to navigate, and press enter to select, or ^C to cancel):
> $ sudo n
> $ node -v

###For Haxe, we have [hvm(Haxe Version Manager)](https://github.com/jasononeil/hvm):

####1. Setup Env to compile Haxe source (For Mac OSX)
- Install homebrew
> $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

- Install XQuartz (required by OCaml)
> $ brew install caskroom/cask/brew-cask && brew cask install xquartz

- Install OCaml
> $ brew install ocaml

####2. Install hvm
> haxelib install hvm

####3. Install and use stable haxe version(3.1.3)
> haxelib run hvm --use 3.1.3

####4. Install and use latest development haxe version
> haxelib run hvm --use development

####5. Switch haxe version

```
  haxelib run hvm --set <version>
```

That's all. Happy New Year! 2015!
