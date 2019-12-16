---
layout: post
title: Go：Hello World
category: [Go, 编程语言]
tag: Go
permalink: /notes/category/编程语言/Go/Go-Hello-World/
---
这里我们开始 Go 的编程之旅。让我们开始编写我们的第一个程序。

这里我个人建议使用 Visual Studio Code 作为 IDE。它具有自动完成功能，代码样式和许多其他功能。

#### 设置 Go 的工作区
在开始编写代码之前，我们必须设置 Go 的工作区。

对于 Mac 或 Linux，Go 工作区应该位于 `$HOME/go` 中。

对于 Windows，工作空间应该位于 `C:\Users\YourName\go` 中。

我们可以通过设置 `GOPATH` 环境变量可以将其他目录用作工作空间。现在，我们为了方便，先使用默认的位置。

Go 的所有源文件都应位于工作空间内名为 `src` 的目录中。因此，我们在上面的 `go` 目录中创建目录 `src`。

每个 Go 项目都应在 `src` 中拥有自己的子目录。让我们在 `src` 中创建一个目录 `hello` 来保存 `hello world` 项目。

创建完成后，目录结构应该类似于以下结构。
```
go
|-- src
   |-- hello
```

将以下程序源码保存为  `Helloworld.go` 到我们刚刚创建的 `hello` 目录中。
```
package main
import "fmt"
func main(){
	fmt.Println("Hello World")
}
```

创建上面的程序后，目录结构如下所示
```
go
|-- src
   |-- hello
       |-- helloworld.go
```

#### 运行程序
我们有几种不同的方法来运行 Go 程序。让我们来一一看下。

1. 使用 `go run` 命令，在命令提示符下键入 `go run helloworld.go` 。您应该可以在控制台中看到输出 `Hello World` 。
2. 使用 `go install` 命令，运行 `go install hello` 命令。
当您输入 `go install hello` 时，Go 工具会在工作区中搜索 `hello` 软件包（`hello` 称为 `package`）。然后，在工作区的 `bin` 目录中创建一个名为 `hello` ( 在`Windows` 中为 `hello.exe` ) 的二进制文件。运行 `go install hello` 后，目录结构应该如下所示：

```
go
|-- bin
   |-- hello
|-- src
   |-- hello
       |-- helloworld.go
```
#### Hello World 程序的简单说明
这里是我们刚刚编写的 `Hello World` 程序。
```
package main //1
import "fmt" //2
func main(){ //3
	fmt.Println("Hello World") //4
}
```

这里我们将要简单介绍程序的每一行。

**package：** 没个 `go` 文件必须以 `package name` 开始。包用于提供代码分隔和可重用性。这里我们使用的包名称是 `main`。

**import "fmt"：**导入 `fmt` 包，它将在 `func main` 用于将文本打印到标准输出。

**func main：** `main` 是一个特殊的函数。程序从 `main` 函数开始执行。`main` 函数应该始终保留在主要包中，`{` 和 `}` 表示 `main` 函数的开始和结束。

**fmt.Println("Hello World")：** `fmt` 包的 `Println` 函数用于将文本输入标准输出。