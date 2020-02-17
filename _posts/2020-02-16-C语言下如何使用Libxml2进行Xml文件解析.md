---
layout: post
title: C语言下如何使用Libxml2进行Xml文件解析
category: [C,编程语言]
tag: [C ,其他]
permalink: /notes/category/编程语言/C/C语言下如何使用Libxml2进行Xml文件解析/
---
Libxml2 是用于 C 语言下的一个 XML 解析器，它是属于 Gnome 项目的一个开发工具包，但
也可以在 Gome 平台之外使用。

在开发机上安装 libxml2。在基于 window10 平台的 msys 中:
```
pacman -S mingw-w64-x86_64-libxml2
```

示例 Xml 文件：
``` 
<root>
    <db_server>db_server</db_server>
    <db_user>db_user</db_user>
    <db_pass>db_pass</db_pass>
</root>
```

示例代码：
``` c
/* INCLUDE */ 
#include <libxml/parser.h>
#include <libxml/tree.h>
#include <stdio.h>
/* END_INCLUDE */

/* STATIC_FUNCTION */
static void print_element_names(xmlNode *node);
/* END_STATIC_FUNCTION */

/**
 * main funciton
 **/
int main()
{
   xmlDoc *doc = NULL;
   xmlNode *root_element = NULL;
   const char *file_name = "config.xml";

   if ( (doc = xmlReadFile(file_name , NULL, 0)) == NULL)
   {
      printf("error: Could not parse file %s \n", file_name);
      exit(-1);
   }

   root_element = xmlDocGetRootElement(doc);
   print_element_names(root_element);
   xmlFreeDoc(doc);
   xmlCleanupParser();

   return 0;
}

static void print_element_names(xmlNode *node)
{
   xmlNode *cur_node = NULL;

   for (cur_node = node; cur_node; cur_node = cur_node->next)
   {
      if(cur_node->type == XML_ELEMENT_NODE)
      {
         printf("Element Name: %s \t Element Content: %s \n", 
                        cur_node->name, 
                        xmlNodeGetContent(cur_node));
      }
      print_element_names(cur_node->children);
   }
}

```

编译：
```
gcc xmldemo1.c -o xmldemo1 `pkg-config --cflags --libs libxml-2.0`
```

运行：
```
xmldemo1.exe

output:
    Element Name: root       Element Content:
        db_server
        db_user
        db_pass

    Element Name: db_server          Element Content: db_server
    Element Name: db_user    Element Content: db_user
    Element Name: db_pass    Element Content: db_pass
```

更多使用方法请参考[libxml2的网站](http://xmlsoft.org/)。