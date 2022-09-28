# **字体 / em**

- px，绝对长度单位，最常用
- em，相对长度单位，相对于父元素，不常用
- rem，相对长度单位，相对于根元素，常用于响应式布局



为了避免 Internet Explorer 中无法调整文本的问题，许多开发者使用 em 单位代替像素。

em 的尺寸单位由W3C建议。

1em和当前字体大小相等。在浏览器中默认的文字大小是16px。

因此，1em的默认大小是16px。可以通过下面这个公式将像素转换为em：**px/16=em**

```css
<style>
h1 {font-size:2.5em;}   /* 40px/16=2.5em */
h2 {font-size:1.875em;} /* 30px/16=1.875em */
p {font-size:0.875em;}  /* 14px/16=0.875em */
</style>
```









# Box 盒模型

- 盒模型就是把HTML页面中的元素看成是一个个矩形的盒子，里面装着内容的容器。每个矩形都由元素的内容（content）、内边距（padding）、边框（border）和外边距（margin）组成。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-19-070920.jpg" style="zoom:50%;" />

在网页中，每个盒子都是大小不等的矩形框，除了有自己大小和位置外，还影响着其他盒子的大小和位置。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-19-070951.jpg">

图例: 

- Content 是具体内容 { 文本/ 图片 / Box }
- Padding  是内边距
- Border 是这个盒子的边界
- Margin 是外边距, 控制当前盒子 和 另外盒子 的边距

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-19-071033.jpg)



## box-shadow  盒子阴影

box-shadow 参数 : 

- h-offset : 阴影向右的水平偏移
- v-offset : 阴影向下的竖直偏移
- blur : 模糊(程度) 
- spread : 阴影大小 , 正值增加阴影大小，负值减小阴影大小

```css
div {
    width: 200px; 
    height: 200px;
    background-color: pink;
    margin: 100px auto;
    /* box-shadow: 10px 10px; */
}

div:hover {
    box-shadow: 10px 30px 10px -4px rgba(0, 0, 0, .3);
}
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-20-160631.png)



blur 为 0 的效果 : 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-20-160819.png)



## Border

- border-radius : 属性允许您为元素添加圆角边框！

- box-shadow : 附加一个或多个下拉框的阴影
- border-image 属性允许你指定一个图片作为边框！



#### **圆角边框 :** 

```css
border-radius: 50%;
border-radius: 10px;

/* 如下图 - 左上 , 右上, 右下, 左下 */	
border-radius: 0 20px 40px 80px; 
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-20-155806.png)

## margin

非常常用 : 块级盒子水平居中 : 

- 上下 100 px
- 左右 auto 居中

```css
  margin: 100px auto;
```



想让 行内元素 / 行内块元素 居中 : 

- 给其父元素添加 `text-align:center` 即可 

```css
  .header {
    text-align: center;
  }

    <div class="header">
        <span>里面的文字</span>
        <img src="down.jpg" alt="">
    </div>

// 文字 和 图片 就都会居中了
```



## container

该类用于在元素的左侧和右侧添加 16px 填充 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-05-120125.png" style="zoom:50%;" />

如上可见 , 不用 container item 就贴着浏览器边缘 , 得自己调 padding 

container 会默认加 16px 的 padding

# 浮动

CSS 的 Float（浮动），会使元素向左或向右移动，其周围的元素也会重新排列。

Float（浮动），往往是用于图像，但它在布局时一样非常有用。

```css
.thumbnail {
	float:left;
}

<div>
  <img class="thumbnail" src="/images/1.jpg">
  <img class="thumbnail" src="/images/2.jpg">
</div>
```

图片会自动向 左 浮动 : 

<img src="/Users/soda/Library/Application Support/typora-user-images/image-20220621102839982.png" alt="image-20220621102839982" style="zoom:50%;" />

-----

## **标准流(普通流/文档流)**

所谓的标准流:就是标签按照规定好默认方式排列

1. 块级元素会独占一行, 从上向下顺序排列。
   1. 常用元素: `div、hr、 p、h1~h6、 ul、 ol、 dl、form、 table` 

2. 行内元素会按照顺序,从左到右顺序排列,碰到父元素边缘则自动换行。
   1. 常用元素:  `span、 a、i、 em ` 等

以上都是标准流布局, 我们前面学习的就是标准流, 标准流是最基本的布局方式。



但是只有标准流还不够 , 标准流无法处理以下问题 : 

1. 如何让 3 个 `<div>`  在一行里排列呢 ? 
2. 如何在一个行里处理  ,让  A 元素在左 , B 元素在右 ?  
3. 如何 Freeze 住一个元素让其始终显示在页面上方而不随着页面滚动呢 ? 



这些都可以通过浮动来解决 : 浮动可以改变元素标签默认的排列方式

float 属性用于创建浮动框,将其移动 left / right , 直到左边缘或右边缘触及包含块或另一个浮动框的边缘。



## 脱标

1. 脱离标准普通流的控制 (浮) 移动到指定位置 (动) ,  (俗称脱标)

2. 浮动的盒子不再保留原先的位置

如下图 , 红色块级元素浮起来, 不再保留其原来的位置 ;   绿色标准流元素随即正常显示

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-025644.png" style="zoom:50%;" />



布局练习 :

- left 是一个竖着的紫色长块 

- 右边是 6 个 左浮动的粉色块

  

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-031546.png" alt="image-20220621111542574" style="zoom:50%;" />

```css
  .box {    /* 定义整个 box 的长宽 */ 
      width: 1226px;
      height: 615px;
      margin: 0 auto;
      text-align: center;
  }

  .left {  
      float: left;
      background-color: purple;
      width: 234px;
      height: 615px;
  }

  .right {
      float: left;
      width: 992px;
      height: 615px;
      background-color: skyblue;
  }

  .right>div {  /* 子选择器, 它只会匹配那些作为第一个元素的直接后代 (子元素) 的第二元素。 */
      float: left;
      width: 234px;
      height: 300px;
      background-color: pink;
      margin-left: 14px;
      margin-bottom: 14px;
  }


<body>
    <div class="box">
        <div class="left">左青龙</div>
        <div class="right">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </div>
    </div>
</body>

```



## 清除浮动





# 定位 Position

定位 = 定位模式 + 边偏移

position 属性的五个值：

- [static](https://www.runoob.com/css/css-positioning.html#position-static)   没有定位，遵循正常的文档流对象。
- [relative](https://www.runoob.com/css/css-positioning.html#position-relative)  相对定位会按照元素的原始位置对该元素进行移动。( 相对于元素自己的原始位置 )
  - 原来在标准流的位置继续占有, 后面的盒子仍然以标准流的方式对待它。( 不脱标,继续保留原来位置)

- [fixed ](https://www.runoob.com/css/css-positioning.html#position-fixed) : 相对于浏览器窗口是固定位置。即使窗口是滚动的它也不会移动
- [absolute](https://www.runoob.com/css/css-positioning.html#position-absolute)  绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于 `<html>` :  absolute 定位使元素的位置与文档流无关，因此不占据空间。  absolute 定位的元素和其他元素重叠。
- [sticky](https://www.runoob.com/css/css-positioning.html#position-sticky) : 类似 Excel 的冻结首行, 粘性定位的元素是依赖于用户的滚动, 当页面滚动超出目标区域时，它的表现就像 **position:fixed;**  固定在目标位置。
  - 必须要设置 top / bottom / left / right , 否则不生效 




https://www.runoob.com/css/css-positioning.html



## relative

[relative](https://www.runoob.com/css/css-positioning.html#position-relative)  相对定位会按照元素的原始位置对该元素进行移动。( 相对于元素自己的原始位置 )

- 原来在标准流的位置继续占有, 后面的盒子仍然以标准流的方式对待它。( 不脱标,继续保留原来位置)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>相对定位</title>
    <style>
        .box1 {
            position: relative;
            top: 100px;
            left: 100px;
            width: 200px;
            height: 200px;
            background-color: pink;
        }
        .box2 {
            width: 200px;
            height: 200px;
            background-color: deeppink;
        }
    </style>
</head>
<body>
    <div class="box1"> </div>
    <div class="box2"> </div>
</body>
</html>
```

如图 : 分色块设置为 relative 模式后 , 

- 相对于自己原来的位置 , 距离 top 为 100 px , 距离 left 100 px , 整体向右下移动 ; 
- 但是红色色块仍然以标准流的方式对待它 , 没有僭越行为 ; 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-061229.png" style="zoom:50%;" />



## absolute 绝对定位

absolute 绝对定位的元素的位置相对于**最近的已定位父元素**，如果元素没有已定位的父元素，那么它的位置相对于 `<html>` :  

absolute 定位使元素的位置与文档流无关，因此不占据空间。  **absolute 定位的元素和其他元素重叠。**



父级无 position 的话, 指定子级的 position 是没用的 : 

如果父级没有定位, 但是爷爷有, 那么相对于爷爷进行定位 (**最近的已定位父元素**)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>绝对定位-父级有定位</title>
    <style>
        .grandpa {
            position: relative;
            width: 800px;
            height: 800px;
            background-color: hotpink;
            padding: 50px;
        }
        .father {
            width: 500px;
            height: 500px;
            background-color: skyblue;
        }
        .son {
            position: absolute;
            left: 30px;
            bottom: 10px;
            width: 200px;
            height: 200px;
            background-color: pink;
        }
    </style>
</head>
<body>
    <div class="grandpa">
            <div class="father">
                    <div class="son"></div>
            </div>
    </div>
   
   
</body>
</html>
```

如下 : son 是 absolute , 其相对于有 position 的 grandpa 进行子级的定位 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-062606.png)

绝对定位 absolute 不占有原来的位置 , son 会飘起来 , 其他 块元素会占据其空间



## 子绝父相

比如下面这个轮播图 , 标绿的 3 个标志都需要浮起来 , 且不能随着轮播图的变化而变化 ;  所以这 3 个组件需要用绝对定位

又因为父级需要占有位置, 因此需要是相对定位，子盒子不需要占有位置, 则是绝对定位

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-063339.png" style="zoom:50%;" />





## 叠放次序   z-index

如果把浏览器看做二维的 x-y 平面,  那么元素之间的叠放优先级就可以看做是 z-轴数值

出现盒子重叠的情况时, 可用 `z-index`  控制盒子的前后次序 (z轴)

默认是在平面上 ( z-index = 0 )

- 想压在她身上 , 就设置 z-index 大一点, 比如 10 
- 想被压在身下, 就设置 z-index 小一点, 比如 -2

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>定位的堆叠顺序</title>
    <style>
        .box {
            position: absolute;
        }
        .xiongda {
            background-color: red;
            left: 100px;
            top: 100px;
            z-index: 1;
            text-align: right;
        }
        .xionger {
            background-color: green;
            left: 50px;
            top: 50px;
            z-index: 2;
            text-align: right;
        }
        .qiang {
            background-color:yellow;
            left: 150px;
            top: 150px;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="box xiongda">熊大</div>
    <div class="box xionger">熊二</div>
    <div class="box qiang">光头强</div>
</body>
</html>
```

🐻二  压  🐻大   压   强子

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-064832.png" style="zoom:50%;" />



# display/visibility/overflow

**display: none:** 

1. 元素隐藏不见 , 而且
2. 不再占有之前的位置 , 其他元素自然递补其位置



**display:block :**

- 除了**转换为块级元素**之外, 同时还有显示元素的意思



**display: inline :** 

- 将元素显示为内联元素（如 <span>）



**display: flex** : 

- 将元素显示为块级弹性容器



**display: grid** :  

- 将元素显示为块级网格容器



----

**visibility** : CSS 属性 `visibility` 显示或隐藏元素而**不更改文档的布局** ( 相当于此元素变成透明) 。

直接点击链接查看 : https://developer.mozilla.org/zh-CN/docs/Web/CSS/visibility

- visibility: visible
- visibility: hidden
- visibility: collapse



----

**overflow** : 当一个元素的内容太大而无法适应 块级格式化上下文 时候该做什么。

- `overflow: visible;` 
  - 默认值。内容不会被修剪，可以呈现在元素框之外。
- `overflow: hidden;`
  - 内容将被剪裁以适合填充框。不提供滚动条。
- `overflow: scroll;` 
  - 内容将被剪裁以适合填充框。浏览器显示滚动条，无论是否实际剪切了任何内容。 （这可以防止滚动条在内容更改时出现或消失。）打印机仍可能打印溢出的内容。
- `overflow: auto;`
  - 取决于用户代理。如果内容适合填充框内部，则它看起来与可见内容相同，但仍会建立新的块格式化上下文。如果内容溢出，桌面浏览器会提供滚动条。



----



# 杂乱

## 伪元素

```
::before
::after
```

css 的 `伪元素`，之所以被称为伪元素，是因为他们不是真正的 html 页面元素

css 有一系列的伪元素，如` :before，:after，:first-line，:first-letter ` 等，本文就详述一下 :before 和 :after 元素的使用



###*div* 的嵌套规则

个人经验

先大致确定整个页面的区域划分：页眉（header），[页脚](https://www.zhihu.com/search?q=页脚&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A"13975900"})（footer），当中两栏、三栏（left，mid，right）。这几个 div 相互平级，统统归入一个大的 div（container）。

然后中间那几栏一般都会再分「标题」和「内容」，那就在里面各自再放两个 div（lc/lm，mc/mm，rc/rm）。内容里可能还会继续嵌套。。。

页眉里可能还有几个平级的 div：页面标题（title），导航栏（nav），快捷方式（shortcuts），搜索（search），等等

页脚里可能还有几个平级的 div：导航菜单（nav2），外部链接（links），版权信息（copyright），备案信息（wtf）

大致上就这些，这是一种很普通的结构

> 一般是div嵌套最好不要超过3层，嵌套太多会影响SEO







# 移动端常见布局: 流式 - flex

- 流式布局
- flex 弹性布局 ( 强烈推荐)
- less + rem + 媒体查询布局
- 混合布局

流式布局,就是百分比布局,也称非固定像素布局。

**根据屏幕的宽度来进行伸缩** (盒子的宽度设置成百分比),  而不是设置成固定像素, 内容向两侧填充。

```css
/* 如下例, div 占屏幕宽度的 20%, 而不是指定为写死的宽度 px  */
div {
      display: flex;
      width: 20%;

```



## 轴方向

主轴由 `flex-direction` 定义，可以取 4 个值：

- `row`
- `row-reverse`
- `column`
- `column-reverse`

如果你选择了 `row` 或者 `row-reverse`，你的主轴将沿着 **inline** 方向**左右**延伸。

选择 `column` 或者 `column-reverse` 时，你的主轴会沿着上下方向延伸 — 也就是 **block 排列的方向。**



交叉轴 : **交叉轴**垂直于**主轴**，所以如果你的`flex-direction` (主轴) 设成了 `row` 或者 `row-reverse` 的话，交叉轴的方向就是沿着列向下的。  **主轴 和 交叉轴 是垂直的**

> 理解主轴和交叉轴的概念对于对齐 flexbox 里面的元素是很重要的；flexbox 的特性是沿着主轴或者交叉轴对齐之中的元素。





## Flex 容器

文档中采用了 flexbox 的区域就叫做 flex 容器。为了创建 flex 容器，我们把一个容器的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性值改为 `flex` 或者 `inline-flex`。 完成这一步之后，容器中的直系子元素就会变为 **flex 元素**。 flex 容器中的所有 flex 元素都会有下列默认行为：

- 元素排列为一行 ( `flex-direction` 属性的初始值是 `row`)。
- 元素从主轴( row 横轴) 的起始线开始。
- 元素不会在主维度( row 横轴) 方向拉伸，但是可以缩小。
- 元素被拉伸来填充交叉轴 ( 填充竖轴) 大小。
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 属性为 `auto`。
- [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) 属性为 `nowrap`。

```html
      .box {
        display: flex;
      }

        <div class="box">
          <div>One</div>
          <div>Two</div>
          <div>Three
              <br> has
              <br> extra
              <br> text
          </div>
        </div>
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-144158.png" style="zoom:50%;" />

1. 元素被排列为一行  ;
2. `One` 从起始线开始排布 ;
3. 三个盒子没有在横轴拉伸, 而在交叉轴进行了拉伸



## 更改轴方向 ( flex-direction)

设置 `flex-direction: row-reverse`  设置 起始线 和 终止线 的位置交换。

`flex-direction: column` ，主轴 和 交叉轴 互换，元素沿**列**排列。改为 `column-reverse` ，起始线和终止线交换。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-144748.png" style="zoom:50%;" />



在 Tailwind 中 : 

使用 `flex-row` 用来沿与文本相同的方向水平放置 flex 子项。

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-135417.png)

```html
<div class="flex flex-row ...">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```



在 medium 尺寸及以上的屏幕上应用 `flex-row` 功能类

```html
  <div class="flex flex-col md:flex-row ...">
    <!-- ... -->
  </div>
```





## 用 flex-wrap 实现多行 Flex 容器

为了实现多行效果，请为属性flex-wrap添加一个属性值wrap。

现在，如果您的项目太大而无法全部显示在一行中，则会换行显示。



在 Tailwind 中 : 

### **常规换行**

使用 `flex-wrap` 允许 flex 项目换行：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-135725.png)

```css
<div class="flex flex-wrap">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```



### **不换行**

使用 `flex-nowrap` 来阻止 flex 项目换行，导致非弹性的项目在必要时溢出容器。

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-135658.png)

```html
<div class="flex flex-nowrap">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```



## flex-basis ( flex 基础)

先了解一下 **可用空间** available space 这个概念

假设在 1 个 500px 的容器中，我们有 3 个 100px 宽的元素，那么这 3 个元素需要占 300px 的宽，剩下 200px 的可用空间。在默认情况下，flexbox 的行为会把这 200px 的可用空间放在最后一个元素的后面。

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-151216.png" style="zoom:50%;" />

如果期望这些元素能自动地扩展去填充满剩下的空间，那么我们需要去控制可用空间在这几个元素间如何分配，这就那些 `flex` 属性要做的事。 

 `flex-basis` 定义了该元素的**空间大小（**the size of that item in terms of the space**）**，上例中，元素 width 为 100px，所以 `flex-basis` 的为 100px。

flex 容器里除了元素所占的空间以外的富余空间就是**可用空间** available space。 该属性的默认值是 `auto` 。

```
flex-bias: auto
```

这就解释了：我们给只要给 Flex 元素的父元素声明 `display: flex` ，所有子元素就会排成一行，且自动分配小大以充分展示元素的内容。

-----

**tailwind 应用 :** 

> 将空间填满

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-151635.png" style="zoom:50%;" />

```css
<div class="flex flex-row">
  <div class="basis-1/4">01</div>
  <div class="basis-1/4">02</div>
  <div class="basis-1/2">03</div>
</div>
```





## flex 放大缩小 (grow / shrink)

使用 `flex-grow` 允许一个 flex 项目放大，以填充任何可用空间。

> 其他的 div 得是固定的 ...

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-140327.png)

```html
<div class="flex ...">
  <div class="flex-none w-16 h-16 ...">
    <!-- This item will not grow -->
  </div>
  <div class="flex-grow h-16 ...">
    <!-- This item will grow -->
  </div>
  <div class="flex-none w-16 h-16 ...">
    <!-- This item will not grow -->
  </div>
</div>
```



使用 `flex-grow-0` 阻止一个 flex 项目放大:

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-140535.png)

```html
<div class="flex ...">
  <div class="flex-grow h-16 ...">
    <!-- This item will grow -->
  </div>
  <div class="flex-grow-0 h-16 ...">
    <!-- This item will not grow -->
  </div>
  <div class="flex-grow h-16 ...">
    <!-- This item will grow -->
  </div>
</div>
```



使用 `flex-shrink` 允许一个 flex 项目在必要的时候缩小

使用 `flex-shrink-0` 阻止一个 flex 项目缩小





## flex 放大缩小 ( auto/initial/none)

用于控制 flex 项目放大和缩小的功能类 :

| Class        | Properties      |
| ------------ | --------------- |
| flex-1       | flex: 1 1 0%;   |
| flex-auto    | flex: 1 1 auto; |
| flex-initial | flex: 0 1 auto; |
| flex-none    | flex: none;     |

flex-initial : 把 flex 元素重置为 Flexbox 的初始值

1. 对应的 Properties 是 :  `flex: 0 1 auto;` 
2. 默认 `flex-grow` 的值为 0 , 所以flex 元素不会超过 flex-bias , 所以不会自动放大
3. 默认 `flex-shrink` 的值为 1, 所以可以缩小 flex 元素来防止它们溢出。



使用 `flex-initial` 允许 flex 项目在考虑到其初始尺寸的情况下缩小但不放大：

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-135931.png" style="zoom:50%;" />

```html
<div class="flex">
  <div class="flex-initial ...">
    <!-- Won't grow, but will shrink if needed -->
  </div>
  <div class="flex-initial ...">
    <!-- Won't grow, but will shrink if needed -->
  </div>
  <div class="flex-initial ...">
    <!-- Won't grow, but will shrink if needed -->
  </div>
</div>
```



使用 `flex-1` 允许 flex 项目根据需要放大和缩小，忽略其初始尺寸。

> 想强调多个东西同等重要时 , 用这个

![image-20220518220013020](/Users/soda/Library/Application Support/typora-user-images/image-20220518220013020.png)

```css
<div class="flex">
  <div class="flex-1 ...">
    <!-- Will grow and shrink as needed without taking initial size into account -->
  </div>
  <div class="flex-1 ...">
    <!-- Will grow and shrink as needed without taking initial size into account -->
  </div>
  <div class="flex-1 ...">
    <!-- Will grow and shrink as needed without taking initial size into account -->
  </div>
</div>
```



使用 `flex-auto` 允许一个 flex 项目在考虑到其初始大小的情况下放大和缩小：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-140053.png)

```html
<div class="flex ...">
  <div class="flex-auto ...">
    <!-- Will grow and shrink as needed taking initial size into account -->
  </div>
  <div class="flex-auto ...">
    <!-- Will grow and shrink as needed taking initial size into account -->
  </div>
  <div class="flex-auto ...">
    <!-- Will grow and shrink as needed taking initial size into account -->
  </div>
</div>
```



使用 `flex-none` 来阻止一个 flex 项目的放大和缩小：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-140128.png)

```html
<div class="flex ...">
  <div class="flex-1 ...">
    <!-- Will grow and shrink as needed -->
  </div>
  <div class="flex-none ...">
    <!-- Will not grow or shrink -->
  </div>
  <div class="flex-1 ...">
    <!-- Will grow and shrink as needed -->
  </div>
</div>
```



## flex 对齐

Flexbox 的一个关键特性是能够设置 flex 元素沿主轴方向和交叉轴方向的对齐方式，以及它们之间的空间分配。



### align-items

`align-items ` 属性可以使元素在交叉轴 (垂直于主轴的是 交叉轴) 方向对齐。

```css
    .box {
      display: flex;
      align-items: flex-start;
    }
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-21-152508.png)



**tailwind 应用 :** 

| Class          | Properties               |
| -------------- | ------------------------ |
| items-start    | align-items: flex-start; |
| items-end      | align-items: flex-end;   |
| items-center   | align-items: center;     |
| items-baseline | align-items: baseline;   |
| items-stretch  | align-items: stretch;    |

```html
<body> <br /><br /><br />
  <div class="flex items-start bg-gray-300">
    <div class="py-4 bg-yellow-500">01</div>
    <div class="py-8 bg-green-200">02</div>
    <div class="py-0 bg-red-300">03</div>
  </div>
  <br />
  <div class="flex items-stretch bg-gray-300">
    <div class="py-2 bg-yellow-500">01</div>
    <div class="py-10 bg-green-200">02</div>
    <div class="py-0 bg-red-300">03</div>
  </div>
  <br />
  <div class="flex items-center bg-gray-300">
    <div class="py-3 bg-yellow-500">01</div>
    <div class="py-6 bg-green-200">02</div>
    <div class="py-0 bg-red-300">03</div>
  </div>
  <br />
  <div class="flex items-end bg-gray-300">
    <div class="py-2 bg-yellow-500">01</div>
    <div class="py-10 bg-green-200">02</div>
    <div class="py-0 bg-red-300">03</div>
  </div>

</body>
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-22-012925.png" style="zoom:50%;" />

>  py-4 意思是 沿 y 轴的 padding = 4 , px , pt pb pl pr 同理



### justify-content

justify-content属性用来使元素**在主轴方向上对齐**，主轴方向是通过 flex-direction 设置的方向。初始值是flex-start，元素从容器的起始线排列。但是你也可以把值设置为flex-end，从终止线开始排列，或者center，在中间排列。

( `align-items ` 属性可以使元素在交叉轴 (垂直于主轴的是 交叉轴) 方向对齐。 )

| Class           | Properties                      |
| --------------- | ------------------------------- |
| justify-start   | justify-content: flex-start;    |
| justify-end     | justify-content: flex-end;      |
| justify-center  | justify-content: center;        |
| justify-between | justify-content: space-between; |
| justify-around  | justify-content: space-around;  |
| justify-evenly  | justify-content: space-evenly;  |

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-22-014631.png" style="zoom:50%;" />



### justify-item

| Class                 | Properties              |
| --------------------- | ----------------------- |
| justify-items-start   | justify-items: start;   |
| justify-items-end     | justify-items: end;     |
| justify-items-center  | justify-items: center;  |
| justify-items-stretch | justify-items: stretch; |

**`justify-items-center`** 

上下分别是 无 `justify-items-center`  和 有 `justify-items-center`  的区别 : 

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-29-020406.png)





## Order

使用 order-{order} 以 : 不同于它们在 DOM 中出现的顺序呈现 flex 和 grid 项目 :

`order-last`  给我在最后 render !

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-18-141034.png)

```html
<div class="flex justify-between ...">
  <div class="order-last">1</div>
  <div>2</div>
  <div>3</div>
</div>
```



# grid-area (网格布局)

Flex 布局是轴线布局，只能指定“项目”针对轴线的位置，可以看作是一维布局，Grid 布局则是将容器划分 成“行”和“列”，产生单元格，然后指定“项目所在”的单元格，可以看作是二维布局，Grid 布局远比 Flex 布局强大

CSS Grid 是目前Web布局中唯一一种二维布局



基本概念1    容器 container , 项目 item

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-131936.png" width="67%;" />

基本概念2  

- row / columns / item 
- gap
- area
- content

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-132123.png)



## Grid Template Columns : `grid-cols-{}` 

你想要多少行或者列，就填写相应属性值的个数，不填写会自动分配

| Class         | Properties                                          |
| ------------- | --------------------------------------------------- |
| `grid-cols-1` | `grid-template-columns: repeat(1, minmax(0, 1fr));` |

```js
fr : 为了方便表示比例关系，网格布局提供了 fr 关键字（fraction 的缩写，意为"片段"）
- grid-template-columns: repeat(4, 1fr);    // 宽度平均分成4份, repeat 表示重复 4 次
```



```html
<br /> <br /> <br /><br /> 
<div class="w-4/5 bg-slate-100">
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-zinc-400">01</div>
    <div class="bg-zinc-400">02</div>
    <div class="bg-zinc-400">03</div>
  </div>   <br /> <br /> <br /> <br /> <br />

  <div class="grid grid-cols-5 gap-1">
    <div class="bg-zinc-400">01</div>
    <div class="bg-zinc-400">02</div>
    <div class="bg-zinc-400">03</div>
    <div class="bg-zinc-400">04</div>
  </div>
</div>
```



![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-134343.png)



----

**grid-rows-{}** 

原理是一样的 : 







## Grid Column Start / End : `col-span-{}` 

一句话解释，用来指定 item 的具体位置, 根据在哪根网格线

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-135100.png" style="zoom:77%;" />



```html
  <div class="grid grid-cols-6 gap-4">
    <div class="col-start-1 col-end-7 bg-zinc-400 text-center">00</div>
    <div class="col-start-2 col-span-2 bg-zinc-400 text-center">01</div>
    <div class="col-start-1 col-end-3 bg-zinc-400 text-center">02</div>
    <div class="col-end-7 col-span-2 bg-zinc-400 text-center">03</div>
  </div> 
row-start-{}
row-end-{}
row-span-{}
row-span-full   都是一样的道理


如下图: 
- 00 : 从网格 1 开始, 到 7 结束
- 01 : 从网格 2, span 2 个 item
- 02 : 从网格 1 开始, 到 3 结束
- 03 : 到网格 7 结束, (向前) span 2 个 item 
```



![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-135751.png)





## grid-auto-flow

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。

默认的放置顺序是“先行后列”， 即先填满第一行，再开始放入第二行 （就是子元素的排放顺序）

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-141135.png" style="zoom:50%;" />



tailwind : 

| Class               | Properties                    |
| ------------------- | ----------------------------- |
| grid-flow-row       | grid-auto-flow: row;          |
| grid-flow-col       | grid-auto-flow: column;       |
| grid-flow-dense     | grid-auto-flow: dense;        |
| grid-flow-row-dense | grid-auto-flow: row dense;    |
| grid-flow-col-dense | grid-auto-flow: column dense; |

```html
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
  <div class="col-span-2">01</div>
  <div class="col-span-2">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

如下图就是代码中的行优先排列 :

>  因为 02 在一行里放不下 , 所以不得已放到 01 下面 , 后面 03 可以塞道 01 后面 , 就 dense 塞进去了

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-141340.png" style="zoom:50%;" />



用与不用 row **dense** 的区别 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-28-141524.png" style="zoom:50%;" />



----



网格是一组相交的水平线和垂直线，它定义了网格的列和行。

CSS 提供了一个基于网格的布局系统，带有行和列，可以让我们更轻松地设计网页，而无需使用浮动和定位。

以下是一个简单的网页布局，使用了网格布局，包含六列和三行：

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-17-133511.png" style="zoom:50%;" />

```css
<style>
.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }

.grid-container {
  display: grid;
  grid:
  'header header header header header header'
  'menu main main main right right'
  'menu footer footer footer footer footer';
  grid-gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}
</style>
</head>
<body>

<h1>网页模版</h1>

<div class="grid-container">
  <div class="item1">头部</div>
  <div class="item2">菜单</div>
  <div class="item3">主要内容区域</div>  
  <div class="item4">右侧</div>
  <div class="item5">底部</div>
</div>
```







**display 属性**

当一个 HTML 元素将 display 属性设置为 grid 或 inline-grid 后，它就变成了一个网格容器，这个元素的所有直系子元素将成为网格元素: 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-05-17-133738.png" style="zoom:50%;" />

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<style>
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  font-size: 30px;
  text-align: center;
}
</style>
</head>
<body>

<div class="grid-container">
  <div class="grid-item">apple</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>  
  <div class="grid-item">4</div>
  <div class="grid-item">Amazon </div>
  <div class="grid-item">6</div>  
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">911</div>  
</div>

</body>
</html>
```





​	
