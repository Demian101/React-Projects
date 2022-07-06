import React from 'react'
import { useGlobalContext } from '../context'

export default function SearchForm() {
  const { setSearchTerm } = useGlobalContext()
  const searchValue = React.useRef('')   // 点击 label 即可获取焦点

  React.useEffect(() => {
    searchValue.current.focus()
  }, [])

  function searchCocktail() {
    setSearchTerm(searchValue.current.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            type='text'
            id='name'  // id 和 htmlFor 链接起来
            ref={searchValue}
            onChange={searchCocktail}  // 改变组件树的状态

            // context.js  :   const [searchTerm, setSearchTerm] = useState('dd')

          />
        </div>
      </form>
    </section>
  )
}
