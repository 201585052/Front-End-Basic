# Js-DOM艺术笔记

* BOM与DOM
```
BOM：浏览器对象模型，Browser Object Model。window.open,window.blur等；
DOM：把文档当成一棵树模型，将HTML节点转成js的变量；
```

* DOM 组成
```
元素节点，文本节点，属性节点,css层叠样式表
元素节点：p
文本节点：bulaililiaoliao
属性节点：title = "sth test"
```

* window.onload技巧
```js
假设有两个函数，firstFunction与secondFunction都在页面加载时执行，如果写作：
window.onload=firstFunction;
window.onload=secondFunction;
只会加载第二个函数指令，所以往往我们可以用匿名函数的小技巧绕过这个问题
window.onload=function() {
    firstFunction();
    secondFunction();
}
实际生产中我们可以封装如下：
function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof(oldonload) != "function") {
        window.onload = func;
    }else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
这样完成同样的效果只需：
addLoadEvent(firstFunction);
addLoadEvent(secondFunction);
```

* onkeypress与onclick
```
用tab切换光标到某链接上，按回车也会触发onclick事件，总体上说，附加onkeypress引来的问题比解决的问题多。
```

* DOM Core编写代码会简化些
```js
var source = whichpic.getAttribute("href");
var source = whichpic.href;
```
* DOM的一些操作
>属性：childNodes,parentNode,nextSibling

>方法：appendChild(),insertBefore()

>nodeType共有12种属性值，其中的3种有实用价值
```
1、元素节点
2、属性节点
3、文本节点（用nodeValue改变文本节点的值）
``` 
* DOM与CSS结构：
```
通常页面结构分为三层：
1、HTML搭建的结构层
2、CSS渲染的表示层
3、js和DOM主宰的的行为层
```
* DOM操作CSS须知：
```
DOM的style属性只能返回那些内嵌在HTML里的样式信息，不能用来检索在外部CSS文件里声明的样式,然而我们一般不会使用内联的方法去使用CSS样式，那么DOM会处理怎么样的CSS样式呢？
```

* DOM操作表示层场景：
```
1、根据元素之间的相对位置找出或修饰某特定元素
2、解决浏览器对CSS的兼容问题（感觉2018年的现在CSS支持很好了）
注：使用DOM该改变CSS可以考虑用自己用过的JS改变className如addClass
```
>addClass函数封装
```js
function addClass(element,value) {
    if(!element.className) {
        element.className = value;
    } else {
        element.className = element.className + " "+value;
    }
}
//DOM编程艺术上的代码感觉不太好，新引进变量，还是全局变量orz。。。
function addClass(element,value) {
    if(!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName+=" ";
        newClassName+= value;
        element.className = newClassName;
    }
}
```
* Ajax使用：循序渐进开发原则，先完成网站的整体层次和核心功能，再附加Ajax层作为优化，也就是传说中的（Hijax).
>Ajax 基础代码解析
```js
function getHTTPObject() {
    //IE
    if(window.ActiveXObject) {
        var waystation = new ActiveXObect("Microsoft.XMLHTTP");
    }else if(window.XMLHttpRequest) {
        var waystation = new XMLHttpRequest();
    }else {
        var waystation = false;
    }
    return waystation;
}

request = getHTTPObject();
request.open("GET","example.txt", true);
request.onreadystatechange = doSomething;
request.send(null);
/*
readyState属性值：
0: 尚未初始化
1: 正在加载
2: 加载完毕
3: 正在处理
4: 处理完毕
*/
function doSomething() {
    if(request.readyState == 4) {
        alert(request.responseText);
    }
}
```