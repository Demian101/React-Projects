## Redux

### Redux Store

```js
// ./reducer/articleSlice
import {createSlice} from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "auth",
  initialState: () => {
    return {
      articleId: '',
    }
  },
  reducers: {
    setCurrentArticle (state, action) {
      state.articleId = action.payload.articleId
      // return action.payload;
    },
  },
});


export const {
  setCurrentArticle,
} = articleSlice.actions;
```

- 在 `initialState` 中定义要 Store 的变量
- 在 `reducer` 中定义对 Store 的操作和对其进行的变更 



How to **Store** parameters to Redux store ? 

```js
//  ./components/ActicleDetail.js

import {useDispatch} from "react-redux";
const ActicleDetail = () => {
  const dispatch = useDispatch();
  const dispatchArticle = (id) => {
    dispatch(setCurrentArticle({
      articleId: id
    }));
  }
  
  dispatchArticle("I'am an ID going to be Stored");
  ... 
```



### Redux Retrieve

How to retrieve parameters which defined in Redux Slice ? 

```js
//  ./components/ActicleDetail.js

import { useSelector } from "react-redux";

const ActicleDetail = () => {
  const article = useSelector(state => state.article);
  
  console.log(article.articleId) 

```





### Redux RTK

```bash
./store
├─ index.js   > store's components registered in index.js
│  ├── articleSlice.js  > Methods about Articles retrieving and posting.  
│  └── authSlice.js     > Methods about Identity Authorization
├─ api
│  ├── articleApi.js    > articles API definition from backend server
│  └── AuthApi.js       > authorization API definition from backend server
```



```js
`/store/apis/poleApi`

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeApi = createApi({
  reducerPath: "pokemons",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2",
  }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: (id) => `/pokemon?limit=10&offset=${id}`,
    }),
    getPokemonByName: builder.query({
      query: (name) => `/pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokeApi;
```



```js
`./store/index.js`
import { configureStore } from "@reduxjs/toolkit";
import { pokeApi } from "./apis/pokeApi";

export const store = configureStore({
  reducer: {
    [pokeApi.reducerPath]: pokeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokeApi.middleware),
});
```





### 调用 :

- useGetPokemonsQuery 接受一个参数

```js
import { useGetPokemonsQuery } from "../../redux/apis/pokeApi";

export default function Pokemons() {
  const [offset, setOffset] = useState(0);
  const [pokemon, setPokemon] = useState([]);

  const { data: pokemons = [], isLoading} = useGetPokemonsQuery(offset);
  ... 
```



