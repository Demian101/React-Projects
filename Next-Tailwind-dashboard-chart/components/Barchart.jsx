import React,{useState, useEffect, useMemo} from 'react';
import ReactECharts from 'echarts-for-react';
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://igpsqlfoymaomzplhnvo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlncHNxbGZveW1hb216cGxobnZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTk2MjEyMSwiZXhwIjoyMDAxNTM4MTIxfQ.uN6w9xyZdv6nsrCWXPYXtigHvqGgoajYhscKp1CGueQ')


function convertToBeijingTime(utcDateString) {
  // 创建一个 Date 对象
  let date = new Date(utcDateString);
  
  // 使用 toLocaleString 将日期转换为北京时间
  // 注意，我们需要传递一个 options 对象来指定我们想要的日期和时间的格式
  let beijingTime = date.toLocaleString("zh-CN", {timeZone: "Asia/Shanghai", hour12: false});
  
  return beijingTime;
}

function sum(numbers) {
  return numbers.reduce((total, current) => total + current, 0);
}


let utcDate = "2023-06-05T10:57:07.433803+00:00";
console.log(convertToBeijingTime(utcDate));



const Barchart = () => { // Barchart: React.FC 
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);
  const [cates, setCates] = useState(null);  // categories: like Rust/zkp...
  const [dates, setDates] = useState(null);  // X -axis
  const [options, setOptions] = useState(null);

  const getTomatos = async () => {
    let result = await supabase.from('alltomato').select("*");
  
    if(result.error) { setError(result.error); } 
    if(result.data) { 
      const data = result.data.slice(-10);
      setData(data);
  
      const cates = Object.keys(data.map(({ id, created_at, Date, ...rest }) => rest)[0]);
      setCates(cates);
      setDates(data.map( item => item.Date));
  
      const totals = data.map(obj => cates.reduce((sum, col) => sum + (obj[col] || 0), 0));
      setTotal(totals);
      console.log("data", data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getTomatos();
  }, []); 

  // console.log("result.data", data);
  // console.log("result.dates", dates);
  // console.log("result.total", total);

  const taskList = useMemo (() => { 
    if (!cates || !data) {
      return [];
    }
    
    let catesTomatoNumList = cates.map(cate => data.map(obj => obj[cate]));
  
    return cates.map((cate, index) => {
        return { 
          name: cate,
          type: 'bar',
          barWidth: 20,
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          data: catesTomatoNumList[index]
        };
      })
  },[cates, data]);

  console.log("taskList", taskList)


  useEffect(() => {
      const options  = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '10%',
          right: '10%',
          bottom: '%',
          top: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: dates
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: 
        
        [
          {
            name: 'Total',
            type: 'bar',
            barWidth: 20,
            data: total,
            emphasis: {
              focus: 'series'
            },
          },
          ...taskList
        ]
      };
      setOptions(options);
  }, [taskList]);
  console.log("options", options);
  return(
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {options &&  <ReactECharts option={options} />}
    </>
  )
};

export default Barchart;