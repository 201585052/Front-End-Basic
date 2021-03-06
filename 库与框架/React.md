# React 专题

<font color=#0099ff size=5 face="黑体">前言：</font>

React和Vue作为近几年前端大火面向未来的框架，基本属于必考，所以要学习一下啊

* snabbdom体验虚拟dom与diff算法

>snabbdom 基本使用，控制台查看更新部分

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="container"></div>
    <button id="btn-change">change</button>
    <script>
        var snabbdom = window.snabbdom;
        //定义patch
        var patch = snabbdom.init([
            snabbdom_class,
            snabbdom_props,
            snabbdom_style,
            snabbdom_eventlisteners
        ]);
        //定义h函数
        var h = snabbdom.h;

        var container = document.getElementById('container');
        //生成 vnode
        var vnode = h('ul#ist', {}, [
            h('li.item', {}, 'Item1'),
            h('li.item', {}, 'Item2')
        ]);
        patch(container, vnode);

        document.getElementById('btn-change').addEventListener('click', function () {
            var newVnode = h('ul#ist', {}, [
                h('li.item', {}, 'Item1'),
                h('li.item', {}, 'ItemB'),
                h('li.item', {}, 'Item3')
            ]);
            patch(vnode,newVnode);
        })
    </script>
</body>

</html>
```

>snabbdom 与jQuery效果对比（复杂建表）

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="container"></div>
    <button id="btn-change">change</button>
    <script>
        //要解释清除什么是virtualdom 和常见api和举例
        var snabbdom = window.snabbdom;
        //定义patch
        var patch = snabbdom.init([
            snabbdom_class,
            snabbdom_props,
            snabbdom_style,
            snabbdom_eventlisteners
        ]);
        //定义h函数
        var h = snabbdom.h;
        var data = [
            {
                name: '姓名',
                age: '年龄',
                address: '地址'
            },
            {
                name:'张三',
                age:'20',
                address:'北京'
            },
            {
                name:'李四',
                age:'21',
                address:'上海'
            },
            {
                name:'王五',
                age:'23',
                address:'广州'
            }
        ];
        var container = document.getElementById('container');
        //渲染函数
        var vnode;
        function render(data){
            var newVode = h('table', {},data.map(function(item) {
                var tds = [];
                for(var i in item){
                    if(item.hasOwnProperty(i)){
                        tds.push(h('td', {},item[i]+''));
                    }
                }
                return h('tr', {}, tds);
            }));

            if(vnode) {
                //re-render
                patch(vnode,newVode);
            }else {
                //初次渲染
                patch(container,newVode)
            }
            vnode = newVode;
        }
        render(data);
        var btnchange = document.getElementById('btn-change');
        btnchange.addEventListener('click',function() {
                data[1].age = 30;
                data[2].address = '深圳';
                render(data);
        })
    </script>
</body>

</html>
```

>patch初次渲染示意

```js
//将vnode添加到container中，也就是转换vnode为真实dom元素过程
// vdom:
// {
//     tag:'ul',
//     attrs: {
//         id: 'list'
//     },
//     children: [
//         {
//             tag: 'li',
//             attrs: {
//                 className: 'item'
//             },
//             children:['Item 1'];
//         }
//     ]
// }

// dom:
// <ul id='list'>
//     <li class='item'>Item 1</li>
// </ul>

function createElement(vnode){
    var tag = vnode.tag;
    var attrs = vnode.attrs || {};
    var children = vnode.children || [];
    if(!tag){
        return null;
    }

    //创建元素
    var elem = document.createElement(tag);
    //属性
    for(var i in attrs){
        if(attrs.hasOwnProperty(i)){
            elem.setAttribute(i,attrs[i]);
        }
    }
    //子元素
    children.forEach(function (childVnode) {
        //给elem添加子元素
        ele.append(createElement(childVnode));
    });
    //返回真实的DOM元素
    return elem;
}
```

>patch再次渲染示意

```js
vdom:
// {
//     tag:'ul',
//     attrs: {
//         id: 'list'
//     },
//     children: [
//         {
//             tag: 'li',
//             attrs: {
//                 className: 'item'
//             },
//             children:['Item 1'];
//         }
//     ]
// }
// newvdom:
// {
//     tag:'ul',
//     attrs: {
//         id: 'list'
//     },
//     children: [
//         {
//             tag: 'li',
//             attrs: {
//                 className: 'item1'
//             },
//             children:['Item 1'];
//         },
//         {
//             tag: 'li',
//             attrs: {
//                 className:'liao';
//             },
//             children:['bulaili'];
//         }

//     ]
// }
function updateChildren(vnode,newVnode){
    var children = vnode.children || [];
    var newChildren = newVnode.children || [];
    children.forEach(function (child,index) {
            var newChild = newchildren[index];
            if(child.tag == newChild.tag){
                 updateChildren(child,newChild);
            }else{
                replaceNode(child,newChild);
            }
    })
}
function replaceNode(vnode,newVode) {
    var elem = vnode.elem;
    var newelem = createElement(newVode);
}
```

* React的生命周期

* React的diff算法和虚拟Dom

>什么是diff算法

    就是一个比较不同的算法早在linux就有，在线也有，显示两个文本文件的差异
>vdom为何用diff算法

    因为dom操作是昂贵的，所以我们只需要找出必须修改的部分，找出就要用diff算法
>diff算法的实现流程

    patch(container,vnode)
    patch(vnode,newVnode)
>virtualdom是什么？为什么要用？

    虚拟DOM，用js来模拟dom结构；将dom对比操作放在js层，提高效率
>

* React和Vue的异同和特点

>不同点

    两者的本质区别：vue本质是MVVM框架，由MVC框架形成（React 可强行双向数据绑定）
             React本质是前端组件化框架，由后端组件化进化而来（php smarty)（vue可强行支持组件化）
    模版的区别：vue（最初由angular推出）
          React-使用JSX
    使用起来学习成本低，比较符合js，而vue要学v-if v-for 之类（虽然vue模版分离比较好吧）
>共同点

    1、都支持组件化
    2、数据驱动视图

>国内使用情况

    1、国内vue文档易读易学，滴滴专门vue，社区强大
    2、react适合团队水平高的
* React组件化
> 说一下对组件化的理解

    两点：封装与复用，很像面向对象，封装继承多态
         封装：封装视图与数据和变化逻辑即数据驱动视图变化
         复用：通过props值不同进行传递

>
>
>
>

* jsx相关

>特点总结

```txt
1、js可以调用html元素，html元素可以通过{}读取外面的值，就像父子关系
2、js的函数function 就像是一个xml，可以形成html标签,但注意此时返回的也是一个html标签
3、xml标签属性引入其他xml标签时也要加入{}
4、jsx引入css也是引用js对象
5、jsx中用classNmae代替class
6、jsx非react独有 已经独立（只是由react引入）
```

>JSX与vdom的关系

    vdom由react初次推广，结合JSX
    JSX是模版最终渲染成html
    初次渲染+修改state后的re-render正好符合vdom的使用场景
    简单说就是JSX-》js -》vnode(数据驱动视图)
>JSX本质是什么

    JSX语法（标签，js表达式，判断，循环事件绑定）
    语法糖，需要在本地被解析成js才行，自然无法在浏览器端运行（vue的模版也要被解析成js），
    解析后的形式是React.createElement(),和h函数的参数非常像
    一种独立标准，可被其他项目使用
* React状态

>说一下setState的过程

    setState即re-render即类似触发patch(vnode,newVnode)的过程，
    （render相当于patch(container,vnode);React.createElement->render~~patch(container,vnode)

>setState的异步

```js
setState类setTimeout 会加入事件队列，
addTitle(title) {
    const currentList = this.state.list;
    console.log(this.state.list);//['a','b']
    this.setState({
        list: currentList.concat(title);
    });
    console.log(this.state.list); //['a','b']
}
```

>使用异步的原因：

    1、可能会一次执行多个setState
    2、无法规定限制用户使用
    3、没必要每次setState都重新渲染，考虑性能
    4、即使是每次重新渲染，用户也看不到其中的效果
    所以多个setState在执行的时候直接最后一次赋值会覆盖前面的操作

>setState的过程：

    每个组件实例都有renderComponent方法
    执行renderComponent重新执行实例的render
    render函数返回newVnode 然后拿到preVnode
    执行patch（preNode,newVnode)
* 其他：

React.createElement相对于h增加了对自定义组件构造函数的考虑：解析过程：初始化实例后render

____

## 深入React心得

回头好好总结下，不要让知识点乱七八糟的

* react 生命周期

* React 使用场景

* 实现组件有哪些方式

* shouldComponentUpdate函数有什么作用？

* 当组件的setState函数被调用之后，发生了什么？

* 为什么循环产生的组件中要利用上key这个特殊的prop？

* React-router 路由的实现原理？

* 受控组件(Controlled Component)与非受控组件(Uncontrolled Component)的区别

* refs 是什么?