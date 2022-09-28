//声明构造函数
function Promise(executor){
  //添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  //声明属性
  this.callbacks = [];
  //保存实例对象的 this 的值
  const self = this;// self _this that
  //resolve 函数
  function resolve(data){
    //判断状态
    if(self.PromiseState !== 'pending') return;
    //1. 修改对象的状态 (promiseState)
    self.PromiseState = 'fulfilled';// resolved
    //2. 设置对象结果值 (promiseResult)
    self.PromiseResult = data;
    //调用成功的回调函数
    self.callbacks.forEach(item => {
      item.onResolved(data);
    });
  }
  //reject 函数
  function reject(data){
    //判断状态
    if(self.PromiseState !== 'pending') return;
    //1. 修改对象的状态 (promiseState)
    self.PromiseState = 'rejected';// 
    //2. 设置对象结果值 (promiseResult)
    self.PromiseResult = data;
    //执行失败的回调
    self.callbacks.forEach(item => {
      item.onRejected(data);
    });
  }
  try{
    //同步调用『执行器函数』
    executor(resolve, reject);
  }catch(e){
    //修改 promise 对象状态为『失败』
    reject(e);
  }
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
  const self = this; // 避免作用域问题；
  return new Promise((resolve, reject) => {
    //调用回调函数  PromiseState
    if(this.PromiseState === 'fulfilled'){
      try{
        //获取回调函数的执行结果
        let result = onResolved(this.PromiseResult);
        
        if(result instanceof Promise){  //判断
          result.then( 
            v => { resolve(v); }, //如果是 Promise 类型的对象
            r => { reject(r) ; })
        }else{  // 不是 Promise 实例
          resolve(result);  //结果的对象状态为『成功』
        }
      }catch(e){
        reject(e);
      }
    }
    if(this.PromiseState === 'rejected'){
      onRejected(this.PromiseResult);
    }
    // 判断 pending 状态 （异步在这里执行；）
    if(this.PromiseState === 'pending'){
      //保存回调函数
      this.callbacks.push({
        'onResolved': function(){
          try{
            //执行成功回调函数
            let result = onResolved(self.PromiseResult);  // self 指向调用对象
            if(result instanceof Promise){  // 判断返回值是否是 Promise
              result.then( v => { resolve(v); }, r=>{  reject(r); } )
            }else{ 
              resolve(result); 
            }
          }catch(e){
            reject(e);
          }
        },
        'onRejected': function(){
          try{
            let result = onRejected(self.PromiseResult);
            if(result instanceof Promise){
              result.then( v => { resolve(v); }, r=>{  reject(r); } )
            }else{ resolve(result); }
          }catch(e){ reject(e);  }
        }
      });
    }
  })
}