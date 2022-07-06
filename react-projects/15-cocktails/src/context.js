import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='   // s=dd 表示包含 ‘dd’ 串的品类
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('dd')  // url 后缀
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = useCallback( async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)  // url 后缀
      const data = await response.json() //  {drinks: Array(8)}
      const { drinks } = data    // (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      console.log("drinks, data",data,drinks)
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass, } = item // 解包
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
        } else {  // 说明没获取到 searchTerm 这个查询 enquiry。
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[searchTerm])  // useCallback 依赖 [searchTerm]
  // 这个组件不会被重复渲染，因为只要 searchTerm 没变，就不需要重新 fetch 获取数据
  // 也提高了整个网站的流畅程度

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm,fetchDrinks])
  
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
