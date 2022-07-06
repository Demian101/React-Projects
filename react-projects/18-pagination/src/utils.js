const paginate = (followers) => {
  const itemsPerPage = 10    // 每页 10 人
  const numberOfPages = Math.ceil(followers.length / itemsPerPage)   // 下取整

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    // ex: index == 3 ,  start = 3* 10 , 
    const start = index * itemsPerPage
    return followers.slice(start, start + itemsPerPage)
  })
  console.log(newFollowers)  //  (10) [Array(10), Array(10) ,,, Array(10)]
  return newFollowers  // 返回 100 个 Users，每页 10 个，一共 10 页
}
export default paginate