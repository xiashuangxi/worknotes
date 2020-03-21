---
layout: post
title: Jekyll中生成Json数据
category: 碎笔
tag: [其他]
# permalink: /notes/category/碎笔/Jekyll中生成Json数据/
permalink: /Title::title
---
我们在使用 Jekyll 建站时，经常会用到 Json 数据。如将所有的文章（_posts文件下的文章） Json 化，以供 JavaScript 使用等。

这里我们使用菜单链接作为案例介绍两个生成 Json 的方法。第一种方式是自己拼接：
```
[{\% for tag in site.data.menu %\}
    {"name":"{\{ tag | first }\}"}
    {\% if forloop.last == false%\},{\% endif %\}
{\% endfor %\}]
```

第二种是一种更简单的方式，直接使用 `jsonify`：
```
{\{ site.data.menu | jsonify }\}
```

> 🚩 这里对 Jekyll 进行了转码处理。


