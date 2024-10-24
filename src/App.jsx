import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Layout from './layouts/Layout/Layout'

import Home from './pages/Home/Home'
import Calculator from './pages/Calculator/calculator'
import Animation from './pages/Animation/animation'
import Component from './pages/Components/components'
import Todo from './pages/Todo/Todo'
import Product from './pages/Product/product'
import Cart from './pages/Cart/cart'
import Login from './pages/Login/Login'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { fetchProducts } from './data/products'

import './App.css'

// HashRouter  // localhost:5173/#/<paths> *compatable old*
// BrowserRouter // localhost:5173/<paths> *produnction*
// MemoryRouter // localhost:5173

//App -> Layout -> Navbar(buttons)
//tap -> (props)
//***  
const inTap = 'home'

function App() {

  const [token, setToken] = useState('x')
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
 const [tap ,setTap] = useState(' ')

 useEffect(() => {
   setTap(inTap)
 }, []) //first load

 useEffect(() => setProducts(fetchProducts()), [])

 useEffect(() => console.log(products), [products])

 if(token === ' '){
   return (<Login setToken={setToken} />)
 }else{
  return (
    <div className='app-container'>
      <HashRouter>
        <Routes>
          <Route element={<Layout tap={tap} setTap={setTap} products={products} cart={cart} setToken={setToken} />}>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/calculator' element={<Calculator/>}/>
          <Route path='/animation' element={<Animation/>}/>
          <Route path='/component' element={<Component/>}/>
          <Route path='/todo' element={<Todo/>}/>
          <Route path='/product' element={<Product products={products} cart={cart} setCart={setCart} />}/>
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}
}

export default App
