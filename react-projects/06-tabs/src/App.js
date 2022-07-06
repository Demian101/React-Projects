import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'
//let a = 0

function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    const reponse = await fetch(url)
    const newJobs = await reponse.json()  //  objs 的 list： [{…}, {…}, {…}]
    // console.log("newJobs : ", newJobs)
    setJobs(newJobs)
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs()
  }, [])   // 无依赖，立即且仅执行一次
  
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  // 每次 Button 被点击，调用 setValue 重置 value，react 会重新渲染
  // company, dates, duties, title 存储成新的值。
  const { company, dates, duties, title } = jobs[value]
  //a += 1
  console.log("company: ", company)
  console.log("duties: ", duties[0].substr(0,10))
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {/* jobs 是一个 list ： [{…}, {…}, {…}] ， item 就是 obj ， index 从 0~2*/}
          {/* 这一步会渲染出 3 个 Button（3 个 Tab），对应页面里的 TOMMY BIGDROP CUKER 3 个公司 */}
          {jobs.map((item, index) => {  
            return (
              <button
                key={item.id}   // 每一个 item (obj) 都有 company，duties，id，date 这些属性
                onClick={() => setValue(index)}   // 点击某个 button 就会设置 value 为该列表元素的 index， 
                                                  // setValue 会使页面重新 render （部分页面？）
                // ES6 模板字符串，`` 里面是字符串，${} 里面存放 JS 表达式. 这里的意思是:
                // - 对于选中的 Tab 使用 class='job-btn active-btn' 这个 css class
                // - 对未选中的 Tab 使用 class='job-btn false'  ，来达到不同的渲染目的
                // 如 <div class="user login"> 有 2 个 class， 能被.user和.login两个选择器选中。
                // 如果这两个选择器中有相同的属性值，则该属性值先被改为 .user 中的值，再被改为 .login 中的值，
                // 即重复的属性以最后一个选择器中的属性值为准。
                className={`job-btn ${index === value && 'active-btn'}`}
              >
                {item.company}
              </button>
            )
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}  (职位)</h3>
          <h4>{company} (公司)</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
      <button type="button" className="btn">  more info  </button>
    </section>
  )
}

export default App
