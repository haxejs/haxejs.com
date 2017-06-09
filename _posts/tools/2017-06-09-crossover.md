---
layout: post_zh
title: 连接，跨越平行的世界
description: 怎样使用亚马逊AWS免费套餐科学上网？怎样安装平行世界的安卓市场里的app?
date: "2017-06-09 22:35:52 +0800"
author: Sid
categories: [tools]
keywords: 科学上网,app,docker,vpn,shadowsocks
---



### 一、怎样使用亚马逊AWS免费套餐科学上网？

1. 注册亚马逊AWS免费账户 
http://www.itbulu.com/free-aws.html

2. 在亚马逊EC2上安装docker
http://wiki.jikexueyuan.com/project/docker/installation/amazon.html
http://www.bogotobogo.com/DevOps/Docker/Docker_Install_On_Amazon_Linux_AMI.php
[在 Amazon EC2 Container Service (Amazon ECS) 上部署 Docker 容器 
https://aws.amazon.com/cn/getting-started/tutorials/deploy-docker-containers/]

3. 安装与运行l2tp-ipsec-vpn-server docker image
https://hub.docker.com/r/fcojean/l2tp-ipsec-vpn-server/

4. 配置使用l2tp-ipsec-vpn客户端
https://github.com/hwdsl2/docker-ipsec-vpn-server/blob/master/README-zh.md

5. 还可以安装运行shadowsocks服务器 docker image 
https://hub.docker.com/r/oddrationale/docker-shadowsocks/
https://www.dwhd.org/20151118_163516.html

6. 配置使用shadowsocks客户端
http://shadowsocks.org/en/download/clients.html


### 二、怎样安装平行世界的安卓市场里的app?

1. 在手机应用市场搜索并安装谷歌安装器，或者从http://www.googleinstaller.org/，http://www.gugeanzhuangqi.com/等下载，进入google play store前要先连接VPN，才能完成全部过程.

2. 你可能发现即使连接了VPN，在google play store里根本下载不了任何应用，老是连接被重置。这样你就需要打开https://apkpure.com/下载一个apkpure,从apkpure市场里安装你需要的任何app了