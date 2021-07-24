import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Products from './Componets/Products/Products'
import TopMenu from './Componets/TopMenu'
import useFetch from './hooks/useFetch'
import { urlApiProducts,STORAGE_PRODUCTS_CARD } from './utils/constans'
function App() {

  const products = useFetch(urlApiProducts, null)
  const [porductsCart, setProductsCart]=useState([])

  useEffect(() => {
    getProductsCart()
  }, [])

  const getProductsCart=()=>{
    const idsProducts=localStorage.getItem(STORAGE_PRODUCTS_CARD)
    if(idsProducts){
      const idsProductsSplit=idsProducts.split(',')
      setProductsCart(idsProductsSplit)
    }else{
      setProductsCart([])
    }
  }

  const addProductCard=(id, name)=>{
    const idsProducts=porductsCart
    idsProducts.push(id)
    setProductsCart(idsProducts)
    localStorage.setItem(STORAGE_PRODUCTS_CARD,porductsCart)
    getProductsCart()
    toast.success(`${name} aregado al carrito correctamente`)
  }
  return (
    <div>
      <TopMenu
      porductsCart={porductsCart}
      getProductsCart={getProductsCart}
      products={products}
      ></TopMenu>
      <Products 
      addProductCard={addProductCard}
      products={products}/>
      <ToastContainer 
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
