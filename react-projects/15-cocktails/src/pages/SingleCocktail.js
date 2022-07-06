import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'

// cocktail Details
export default function SingleCocktail() {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [cocktail, setCocktail] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        console.log("id   ",id)
        const data = await response.json()
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]  // 都是接口里的 keys
          const ingredients = [  // 组成成分
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newCocktail = { // 显示在页面的详情信息
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          }
          setCocktail(newCocktail)
        } else {
          setCocktail(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getCocktail()
  }, [id])    // id 变化时，说明用户点击了其他 鸡尾酒，所以要 fetch 当前 cocktail 的信息

  if (loading) {
    return <Loading/>
  }
  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>   {/* cocktail 详情页 */}
          <img src={image} alt={name}></img>
          <div className='drink-info'>
            <p> <span className='drink-data'>name :</span> {name} </p>
            <p> <span className='drink-data'>category :</span> {category} </p>
            <p> <span className='drink-data'>info :</span> {info}  </p>
            <p> <span className='drink-data'>glass :</span> {glass} </p>
            <p> <span className='drink-data'>instructons :</span> {instructions}  </p>
            <p> 
              <span className='drink-data'>ingredients : </span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}