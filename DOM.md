#### 获取DOM节点

​		html是DOM树，每个标签都是DOM节点，标签中包含着文本和数据。javascript要想操作html上的数据，就要获取到对应的DOM节点。给节点赋值：xxx.innerText

​	**document.getElementById('idValue'):** 获取document中id值为idName的节点。可见节点的id必须独一无二

```
<div id="parent-id">
var parentDOM = document.getElementById('parent-id');
```

​	**document.getElementsByClassName('classValue')：**获取document中class值为className的节点，返回一个包含所有指定class类名的子元素的数组对象。一般通过[index]表示具体获取的节点。

​	**document.getElementsByName('nameValue')：**作用和Id/ClassName相同，只是name属性不常用。

​	**document.getElementsByTagName('tagName')：**获取document中符合条件的标签，返回一个包含所有指定标签名的子元素的数组对象。一般通过[index]表示具体获取的节点。一般不用这个。

```
<body style="border: solid green 3px">
  <p>Some outer text</p>
  <p>Some outer text</p>

  <div id="div1" style="border: solid blue 3px">
    <p>Some div1 text</p>
    <p>Some div1 text</p>
    <p>Some div1 text</p>

    <div id="div2" style="border: solid red 3px">
      <p>Some div2 text</p>
      <p>Some div2 text</p>
    </div>
  </div>
  
  var allParas = document.getElementsByTagName("p");  //7
  var div1 = document.getElementById("div1");
  var div1Paras = div1.getElementsByTagName("p");  //5
  var div2 = document.getElementById("div2");
  var div2Paras = div2.getElementsByTagName("p");  //2
```

   **element = document.querySelector(selectors);：**获取document中第一个selectors元素，如果找不到匹配项，则返回null。

```
//这个例子中，会返回当前文档中第一个类名为 "myclass" 的元素：
var el = document.querySelector(".myclass");
```

​	**elementList = parentNode.querySelectorAll(selectors);：**返回与指定的选择器组匹配的文档中的元素列表。返回的对象是列表。

```
//要获取文档中所有<p>元素的NodeList。
var matches = document.querySelectorAll("p");
//此示例返回文档中所有<div>元素的列表，其中class包含"note"或"alert"
var matches = document.querySelectorAll("div.note, div.alert");
//在这里，我们得到一个<p>元素的列表，其直接父元素是一个class为"highlighted"的div，并且位于ID为"test"的容器内。
var container = document.querySelector("#test");
var matches = container.querySelectorAll("div.highlighted > p");
```

​	**element.setAttribute(name, value)：**给element元素添加属性和属性值。如果属性已经存在，则更新该值；否则，使用指定的属性名和值添加一个新的属性。要获取element元素的属性的值，可使用**element.getAttribute(name)；**要删除element元素的属性，可以使用**element.removeAttribute(name)**。