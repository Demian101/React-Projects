# DOM与document

DOM 是一项 W3C (World Wide Web Consortium) 标准。

DOM 定义了访问文档的标准：

> “W3C 文档对象模型（DOM）是中立于平台和语言的接口，它允许程序和脚本动态地访问、更新文档的内容、结构和样式。”

**HTML DOM 是关于如何获取、更改、添加或删除 HTML 元素的标准**。



1. DOM 中的最顶层是 Window对象，

2. Window对象下面是 Document（文档对象）、Navigator(浏览器对象)、Screen（屏幕对象）、History（浏览历史对象）、Location（URL对象）。



**Document** 即 HTML DOM Document 对象

每个载入浏览器的 HTML 文档都会成为 Document 对象。

Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

> **Tips：**Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。



# `<main>` 

`<main>` 标签指定文档的主要内容。

`<main>` 元素内的内容对于文档应该是唯一的。它不应包含在文档中重复的任何内容，例如侧边栏、导航链接、版权信息、站点徽标和搜索表单。 

注意：文档中的 `<main> `元素不得超过一个。 `<main>` 元素不能是  `<article>、<aside>、<footer>、<header> ` 或 `<nav>`  元素的后代。





# `<label>`

`<label>` 标签为 `<input>`元素定义标注（标记）。

label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。

比如下面这个 Male , Female 的单选框, 你不需要非得点击圆圈了 , 点击文本, 也可以达到选中效果, 这就是 `<label>` 的作用

`<label>` 标签的 for 属性应当与相关元素(如 `<input>`)的 id 属性相同。

```html
<p>点击其中一个文本标签选中选项：</p>

<form>
  <label for="male">Male</label>
  <input type="radio" name="sex" id="male" value="male"><br>
  <label for="female">Female</label>
  <input type="radio" name="sex" id="female" value="female"><br><br>
  <input type="submit" value="提交">
</form>
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-25-065800.png)



`<label>` 标签为 input 元素定义标注（标记）。 

label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。

`<label>` 标签的 for 属性应当与相关元素的 id 属性相同。  





# `<Select>`

下拉元素虽然超出了表单元素,但仍是表单的一部分。

```html
<!DOCTYPE html>
<html> <head>  <meta charset="utf-8">  </head> <body>

<form action="xxxx.asp" id="carform">
  Firstname: <input type="text" name="fname">
  <input type="submit">
</form>

<!-- 下拉选择列表 -->
<select name="carlist" form="carform">
  <option selected value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>

<p>下拉列表超出了表单元素,但仍是表单的一部分。</p>

</body>
</html>
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-04-25-071429.png)







# `<fieldset>`

`<fieldset> `标签可以将表单内的相关**元素分组。**

`<fieldset>` 标签会在相关表单元素**周围绘制边框**。



<form>
 <fieldset>
  <legend>Personalia:</legend>
  Name: <input type="text"><br>
  Email: <input type="text"><br>
  Date of birth: <input type="text">
 </fieldset>
</form>




# `<aside>`

`<aside>` 内容通常作为侧边栏放置在文档中。



![image-20220526105054879](/Users/soda/Library/Application Support/typora-user-images/image-20220526105054879.png)