前言提示:  JavaScript中的this可能是当年设计的时候存在着设计缺陷，**在ES6中能使用`()=>`这个高端的箭头函数就尽量使用箭头函数**



# this指向

与其他编程语言不同，JavaScript 没有块作用域（在 C 中 `{}`  花括号是块作用域）。 JS  只有两个作用域，即全局作用域和局部作用域。

1. local scope : variables declared **within a function** becomes local to that function
2. global scope: variable defined **outside of function** becomes global and all scripts and functions can access it.



对于this的指向，我的理解就是记住一句话，

- 如果没有使用 apply 和 call 还有箭头函数的情况下，this 指向最后一次调用它的**对象**， 
- 如果最后一次调用它的是函数，则在严格模式指向 `undefined` 非严格模式下指向全局变量 `window`。



```js
const obj = {
  outerFunc: function() {
    console.log( this == obj)  // true
  }
}
obj.outerFunc()   // true
```

因为最后一次调用 `outerFunc` 方法的是 `obj` 这个对象 , 故 this 指向 obj ;



```js
const obj = {
  outerFunc: function() {
    // console.log( this == obj)  // true
    function innerFunc(){
      console.log( this == obj)  //  ?
    }
    return innerFunc  // 返回内部函数
  }
}
//obj.outerFunc()


//This code will return inner function and won't execute
const inner = obj.outerFunc()
// Invoke 调用 inner Function here
inner()
```

- 上面 clg 打印 `false`  , What ????? 
- `innerFunction`  在 `obj`  对象的上下文 context 中，但是当尝试在返回该方法后调用该方法时，context 丢失了，“this” 不再指向 “obj”而是指向全局对象，这就是问题出现的地方。



# const self = this

现在为了解决上面这个问题，我们可以将对象的上下文保存到其他变量中，比如 `self`  ，

然后我们可以在 `innerFunction` 中使用 `self` 来引用对象的上下文。感谢  JS  中的闭包， innerFunction 可以在返回后引用 outerFunction 的变量。基本上，尽管它是从 outerFunction 返回的，但它会记住创建它的环境。

```js
const obj = {
  outerFunc: function() {
    const self = this

    function innerFunc(){
      console.log( this == obj)  // false
      console.log( self == obj)  // true
    }
    return innerFunc  // 返回内部函数
  }
}
//This code will return inner function and won't execute
const inner = obj.outerFunc()
// Invoke 调用 inner Function here
inner()

/*  控制台返回信息 : 
false
true
*/
```



> 别再用 self=this、that=this了，代码太难读懂！







# 代码使用方法

```bash
node this.js
```

