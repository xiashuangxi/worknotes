---
layout: post
title: GLib编译时报警告[-Wimplicit-function-declaration]
category: [C,编程语言]
tag: [C, 其他, GLib]
permalink: /Title::title
update_date: 2020-02-24 23:57
---
在我们使用 `GLib` 编写的程序，在编译时如果出现以下警告。
```
implicit declaration of function 'xml_char_att_get_type'; did you mean 'xml_char_att_get_value'? [-Wimplicit-function-declaration]
```

你只需要在源码中定义相应的方法就可以了。
```
GType xml_char_att_get_type(void);
```

>具体是什么原因还不是很清楚。