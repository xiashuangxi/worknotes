---
layout: post
title: Rust中self,Self,&self的区别
category: [Rust,编程语言]
tag: [Rust, 其他]
permalink: /Title::title
---
这里我们先来看一段Rust的代码：
``` rust
struct Person;
impl Person {
    fn new() -> Self {
        Person{}
    }

    fn xxx(&self) {
        ...
    }
}
```