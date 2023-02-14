# 数据的双向绑定
      MVVM：Model-View-ViewMode
      逻辑 -> 数据 <-> 视图：逻辑改变了数据，视图就跟着改变。视图改变了，数据也跟着改变。数据和视图双向
流动。
      逻辑 -> data : _data <-> 视图
      步骤：
      1、普通数据 -> 响应式数据
      通过Object.defineProperty()将普通的数据变成响应式数据。_data是渲染到视图的数据对象，data是
input操作的数据对象。

      2、视图 -> 数据
      规定input标签中的v-model属性的值必须和源数据对象(_data)的属性名同名。获取input标签的DOM节点，
以及input标签中的v-model属性的值。如果input标签存在v-model属性，就给这个input标签绑定keyup事件。事件回调函数的功能就是将input标签的value值符给响应式数据对象(data)。由此实现视图中发生数据变化，源数据对象也会跟着发生相应的变化。

      3、数据 -> 视图
      递归遍历出根节点中所有的span标签，然后通过正则表达式匹配出{{x}}中的内容，这个内容就是响应式对象
(data)的属性名。创建domPool对象，将从{{}}中匹配出来的内容作为domPool的属性名，将对应的span标签作为属性值。然后将响应式数据对象(data)中属性的值符给domPool中同属性名的span标签的innerText。每当input输入框输入值时，就会触发响应式数据对象的set函数，就会将输入的值赋给domPool对应节点的innerHTML。

      domPool:
       {
           'name': span节点
       }

 
      