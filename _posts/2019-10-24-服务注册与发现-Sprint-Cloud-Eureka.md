---
layout: post
title: 服务注册与发现：Sprint Cloud Eureka 
category: [Spring,微服务]
tag: [微服务,服务探索]
# permalink: /notes/category/Spring/服务注册与发现-Sprint-Cloud-Eureka/
permalink: /Title::title
---
Spring Cloud Netflix Eureka 是属于 Netflix 的开源软件一款提供服务注册与发现的产品，它提供了完整的服务注册与发现实现。

使用 Netflix Eureka 每个客户端都可以同时充当服务器，以将其状态复制到连接的对待方。简单的说，客户端检索服务注册中心的所有连接对等点的列表，并通过负载均衡算法向任何其他服务发出所有进一步的请求。要想获知客户端是存在，它们必须向注册表发送心跳信号。

#### 创建 Eureka Server 程序 
要想创建一个 Eureka Server 的 Spring Boot 的应用程序是非常简单的。我们先创建一个新的 Spring Boot 应用程序，在 `pom.xml`（这里我们假设使用的是 Maven 对项目源码进行管理）中添加 Spring Cloud Netflix Eurake Server 的依赖。
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```
此时，我们已经添加了 Netflix Eureka 的依赖，现在我们需要使用它，使它可以正常的工作。我们需要在 Spring Boot 程序的入口 `EurekaApplication`（这里我们使用的是 `EurekaApplication.java`）中添加一个 `@EnableEurekaServer` 来启用 Netflix Eureka。
```
@SpringBootApplication
@EnableEurekaServer
public class EurekaApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaApplication.class, args);
    }
}
```
然后在资源文件夹中的 `bootstrap.yml` 或 `application.yml` 文件中对 Netflix Eureka 进行配置。
```
eureka:
  instance:
    hostname: localhost
  client:
    fetch-registry: false
    register-with-eureka: false
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

#### 配置 Eureka Client 程序
当我们配置好了 Eureka Server 应用程序后，我们要想服务被 Eureka Server 发现，我们需要在服务中添加 Eureka Client。在 Eureka Client 分为服务提供者和服务消费者。

**服务提供者：**顾名思义，服务提供者是提供服务的应服务实例，此服务可以是一个 RESTful API 接口。

**服务消费者：**顾名思义，服务消费者就是使用和调用服务提供者服务的服务实例。

现在我们创建一个服务提供都的 Spring Boot 的应用程序。首先我们需要在 `pom.xml` （这里假设我们使用 Maven 对项目原码进行管理）中添加依赖。
```
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```
然后我们需要在 Spring Boot 应用程序 `xxxApplication.java`（这里是一个服务提供者或是消费者，所以这里的 Spring Boot 可以是任何名称的 Spring Boot 应用程序，如：`SsoApplication.java` 等） 中添加一个 `@EnableEurekaClient` 来记用。
```
@SpringBootApplication
@EnableEurekaClient
public class XxxApplication {
    public static void main(String[] args) {
        SpringApplication.run(XxxApplication.class, args);
    }
}
```
完成以上的配置后，我们需要在 `bootstrap.yml` 或 `application.yml` 中配置 Eureka Server 的服务地址，以便 Eureka Client 向 Eureka Server 注册服务。
```
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8000/eureka/
```
服务正常注册成功，我们这里注册的服务是 `PINECONES-CONFIG`，如下图所示:
![](https://gitee.com/xiashuangxi/worknodes/raw/master/spring/%E5%BE%AE%E6%9C%8D%E5%8A%A1/Sprint%20Cloud%20Eureka%20%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E4%B8%8E%E5%8F%91%E7%8E%B0.png)

#### 参考文献
[Spring Cloud Netflix](https://spring.io/projects/spring-cloud-netflix)