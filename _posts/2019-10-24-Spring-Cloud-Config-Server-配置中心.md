---
layout: post
title: Spring Cloud Config 配置中心
category: [Spring,微服务]
tag: [微服务]
permalink: /notes/category/Spring/Spring-Cloud-Config-配置中心
---
当我们的应用程序越来越庞大，服务实例将会成倍的增长，当服务实例的量增加到几千上万个的时候，那个时候就不适用于在服务实例中维护配置信息了，那个时候维护这些配置信息将是一个非常艰难的工作。为了避免这种问题，我们需要在一个地方统一管理这些配置信息。Spring Cloud 为我们提供了一种解决方案 Config Server 和 Config Client 。

顾名思意 Config Server 就是配置服务和 Config Client 配置客户端。我们要实现一个配置中心，我们需要使用 Config Server 来实现一个配置服务实例，用说从配置信息仓库或本地文件系统中获取配置信息，需要获取配置信息时我们需要使用 Config Client 来通过配置服务实例获取配置信息。
![](https://gitee.com/xiashuangxi/worknodes/raw/master/spring/%E5%BE%AE%E6%9C%8D%E5%8A%A1/Spring-Cloud-Config-Server%E9%85%8D%E7%BD%AE%E4%B8%AD%E5%BF%83-02.bmp)

#### 创建配置信息仓库
首先我们需要一个仓库来统一存放配置文件，这里使用的是基于 Github 的配置信息仓库（你也可以使用私有 GitLib 或本地文件系统）。

我们首先在 Github 上创建一个 repository 来存放配置文件，这里的配置文件的命名规则为 `${application}-${profile}.yml` 或  `${application}-${profile}.properties`  这里的 `application` 一般是服务实例名称，`profile` 则分为 4 种，分别是 `default` 默认环境、`dev` 开发环境、`test` 测试环境、`prod` 生产环境。如 `application.yml`，`application-dev.yml`,`application-test.yml`，`application-prod.yml`。
![](https://gitee.com/xiashuangxi/worknodes/raw/master/spring/%E5%BE%AE%E6%9C%8D%E5%8A%A1/spring-cloud-config-server%E9%85%8D%E7%BD%AE%E4%B8%AD%E5%BF%83-01.png)

#### Config Server 服务配置
这里我假设你已经有了 Spring Boot 和 Spring Cloud 有依赖。我们要想使用 Config Server 我们只需要在 pom.xml（这里我假设你是使用 Maven 来管理你的项目源码）文件中添加相应的依赖。
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```
此时我们已经添加了 Config Server 的依赖，现在我们需要在服务中使用它，使它能正常的工作。第一步，我们需要在 Spring Boot 程序入口  `ConfigApplication.java`（我在这里使用的是`ConfigApplication.java`）中添加一个 `@EnableConfigServer` 来启用 Config Sever 。
```
@EnableConfigServer
@SpringBootApplication
public class ConfigApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigApplication.class, args);
    }
}
``` 
第二次，我们需要将 Config Server 与配置信息仓库关联起来，使它能够多远程仓库中获取正确获取配置信息。我们需要在  `application.yml` 或 `bootstrap.yml` 中添加。
```
spring:
  profiles:
    active: git                                                             
  application:
    name: pinecones-config                                                  
  cloud:
    config:
      server:
        git:
          uri: https://github.com/xiashuangxi/pinecones-configuration-center 
          username: 
          password: 
          default-label: 
          search-paths: 
```
这里的 `spring.profiles.active: git` 是指我们使用 `Git` 作为仓库，这时也可以使用 `native` 则是使用本地文件系统。`spring.cloud.config.server.git.uri` 则是仓库的地址，这里需要使用 `HTTPS` 的地址。`default-label` 批是默认使用哪个分支，这里的值默认是 `master` 分支，`search-paths` 指默认搜索哪个文件夹，这里可以使用多个文件夹使用逗号隔开，如 `config,config-demo`。启动服务后在浏览器在输入 `http://localhost:8080/pinecones-config-dev.yml` （这里的地址可以换成你自己的服务 IP 端口和 YML 文件）如果可以显示 YML 配置信息则说明已经成功从仓库获取到配置信息。
```
name: pinecones-config
```
这里我们访问配置信息的格式有 4 种。如：
```
/{application}/{profile}[/{label}]
/{application}-{profile}.yml
/{label}/{application}-{profile}.yml
/{application}-{profile}.properties
/{label}/{application}-{profile}.properties
```
其中 `application` 指的是 Spring 应用程序在 `application.yml` 中配置的 `spring.config.name`（或配置文件名称中的 `${application}` 部分），`profile` 是一个简写（或使用分隔符隔开），`label` 指的是一个可选的 Git 分支（默认是 `master`）。

#### Config Client 配置客户端
如果需要在应用程序里使用这些功能，我们需要在 pom.xml 文件里添加 Config Client 的依赖。
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-client</artifactId>
</dependency>
```
然后，我们可以创建一个 Spring Boot 应用程序，如以下程序：
```
@SpringBootApplication
public class PaymentApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaymentApplication.class, args);
    }
}
```
当应用程序运行时，它将默认从本地配置服务器 `8080` 端口获取外部配置。如果需要获取其它位置的配置服务器，我们可以在 YML 文件`bootstrap.yml` 或 `application.yml` 中添加配置。如下：
```
spring:
  cloud:
    config:
      uri: http://localhost:8080
```
在默认的情况下，如果没有配置 `spring.application.name` 的时候，将默认使用 `application` 使用作为 `${application}` 的值，所以我们这里需要修改名称。
```
spring:
  application:
    name: pinecones-payment
```

#### 使用
要获取配置中心的对应配置文件中的信息，我们需要在类属性上使用 `@Value("${name}")` 就可以了，这里的 `${name}` 是对应 YML 文件中的 Key。
```
@Value("${name}")
String name;
```

以上为 Spring Cloud Config Server 配置中心的基础使用方法，想了解更多使用方法，请参阅参考文献。

#### 参考文献
[Spring Cloud Config](https://spring.io/projects/spring-cloud-config)