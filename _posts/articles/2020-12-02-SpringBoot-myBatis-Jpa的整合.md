---
layout: post
title: Spring+myBatis+Jpa的整合
category: [Spring,碎笔]
tag: [微服务]
permalink: /Title::title
---
# 说明
Jpa（Java Persistence API）[^Jpa]是Java持久化API（Jpa）是一个Java应用程序接口规范，描述了使用Java标准平台（Java SE）和Java企业版平台（Java EE）的应用中的关系数据的管理。这是维基百科中对Jpa的介绍。

其目的是为了适应行业的发展，提高开发人员的开发效率。

[^Jpa]: 维基百科：[https://zh.wikipedia.org/wiki/Java%E6%8C%81%E4%B9%85%E5%8C%96API（Java持久化API）](https://zh.wikipedia.org/wiki/Java%E6%8C%81%E4%B9%85%E5%8C%96API)

# 整合过程
这里我们使用gradle[^gradle]来进行项目组织和管理。

[^gradle]: 维基百科：[https://zh.m.wikipedia.org/zh-hans/Gradle（Gradle）](https://zh.m.wikipedia.org/zh-hans/Gradle)

## 创建Spring Boot应用
我们先创建项目的文件组织结构。
```
src
 |--main
     |--java
     |--resources
build.gradle
settings.gradle
```

我们先在settings.gradle文件里写入`rootProject.name="test"`如果你的项目叫test的话。

接下来，我们需要对build.gradle进行配置。
```
buildscript {
    repositories {
        mavenLocal()
        maven { url "http://maven.aliyun.com/nexus/content/groups/public/" }
        maven { url "https://oss.sonatype.org/content/groups/public/" }
        maven { url "https://repo.spring.io/libs-milestone/" }
        mavenCentral()
    }
    dependencies {
        classpath ("org.springframework.boot:spring-boot-gradle-plugin:2.0.5.RELEASE")
    }
}

plugins {
    id "java"
    id "org.springframework.boot"
    id "io.spring.dependency-management"
}

group "com.test"
version "1.0-SNAPSHOT"

sourceCompatibility = 1.8
targetCompatibility = 1.8

repositories {
    mavenLocal()
    maven { url "http://maven.aliyun.com/nexus/content/groups/public/" }
    maven { url "https://oss.sonatype.org/content/groups/public/" }
    maven { url "https://repo.spring.io/libs-milestone/" }
    mavenCentral()
}
dependencies {
    testCompile (group: "junit", name: "junit", version: "4.12")
}
```

## 整合myBatis
我们需要在build.gradle文件中的dependencies下添加下面的配置就可以添加myBatis的关联了。
``` 
compile("org.mybatis.spring.boot:mybatis-spring-boot-starter:2.1.2")
```

## 整合Jpa
整合Jpa的方法和整合myBatis的方法一样，同样在build.gradle文件的dependencies下添加下
面的配置就可以了。
```
compile("org.springframework.boot:spring-boot-starter-data-jpa")
```

<!-- # 测试 -->