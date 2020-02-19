---
layout: post
title: Jekyll中使用AngularJS
category: 碎笔
tag: [其他]
permalink: /notes/category/碎笔/Jekyll中使用AngularJS/
---
我们在 Jekyll 中使用 AngularJS 时，发现 AngularJS 不能使用。其原因是 Jekyll 和 AngularJS 都使用了 `{\{` 和 `}\}` 如 `{\{ name }\}`。

解决方法也很简单，就是把 AngularJS 的 `{\{` `}\}` 修改为其他符号即可。
```
angular.module("myapp", [],
            function($interpolateProvider){
                $interpolateProvider.startSymbol('$');
                $interpolateProvider.endSymbol('$');
            })
```

html 文件中这样使用：
```
$name$
```