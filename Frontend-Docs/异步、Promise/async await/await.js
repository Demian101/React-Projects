async function main(){
    let p = new Promise((resolve, reject) => {
        reject('Error');
    })

    // 2. 右侧为其他类型的数据
    //let res2 = await 20;
    // 3. 如果promise是失败的状态
    try{
      let res3 = await p;
      console.log("res3", res3)
    }catch(e){
       console.log(e);
    }

}
main();

