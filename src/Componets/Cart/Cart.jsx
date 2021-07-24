import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg'
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg'
import { ReactComponent as Close } from '../../assets/svg/close.svg'
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg'
import { STORAGE_PRODUCTS_CARD, BASE_PATH } from '../../utils/constans'
import { countDuplicateItemsArray, removeArrayDuplicate, removeItemArray } from '../../utils/arrayFunc'
import './Cart.scss'
const Cart = (props) => {
    const { porductsCart, getProductsCart, products } = props
    const [cartOpen, setCartOpen] = useState(false)
    const widthCartContent = cartOpen ? 450 : 0
    const [singleProductsCart, setSingelProductsCart] = useState([])
    const [cartTotalPrice,setCartTotalPrice]=useState(0)

    useEffect(() => {
        const allProductsid = removeArrayDuplicate(porductsCart)
        setSingelProductsCart(allProductsid)
    }, [porductsCart])

    useEffect(() => {
           const productData=[]
           let totalPrice=0

           const allProductsid=removeArrayDuplicate(porductsCart)
           allProductsid.forEach(productId=>{
               const cantidad=countDuplicateItemsArray(productId,porductsCart)
               const productValue={
                   id:productId,
                   cantidad:cantidad
               }
               productData.push(productValue)
           })
           if(!products.loading && products.result){
               products.result.forEach(product=>{
                   productData.forEach(item=>{
                       if(product.id==item.id){
                           const totalValue=product.price*item.cantidad
                        //    console.log(`tota value:${product.price} * ${item.cantidad}`)
                           totalPrice+=totalValue
                       }
                   })
               })
           }
        //    console.log(totalPrice)
           setCartTotalPrice(totalPrice)
    },[porductsCart,products])
    const openCart = () => {
        setCartOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeCart = () => {
        setCartOpen(false)
        document.body.style.overflow = 'scroll'
    }

    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CARD)
        getProductsCart()
    }

    const incrementarCantidad=(id)=>{
        const arrayItemsCart=porductsCart
        arrayItemsCart.push(id)
        localStorage.setItem(STORAGE_PRODUCTS_CARD,arrayItemsCart)
        getProductsCart()
    }

    const decrementarCantidad=(id)=>{
        const arrayItemsCart=porductsCart
        const result=removeItemArray(arrayItemsCart,id.toString())
        localStorage.setItem(STORAGE_PRODUCTS_CARD,result)
        getProductsCart()
    }
    return (
        <>
            <Button variant='link' className="cart">
                {porductsCart.length > 0 ?
                    (
                        <CartFull onClick={openCart} />
                    ) : (

                        <CartEmpty onClick={openCart} />
                    )}

            </Button>
            <div className='cart-content' style={{ width: widthCartContent }}>
                <CartContenHeade closeCart={closeCart} emptyCart={emptyCart} />
                <div className='cart-content__products'>

                    {
                        singleProductsCart.map((idProductCart, index) => {
                            return (
                                <CartContentProducts
                                    key={index}
                                    products={products}
                                    idsProductCart={porductsCart}
                                    idProductCart={idProductCart}
                                    incrementarCantidad={incrementarCantidad}
                                    decrementarCantidad={decrementarCantidad}
                                />

                            )
                        })
                    }
                </div>
                <CartContentFooter
                cartTotalPrice={cartTotalPrice}
                />
            </div>
        </>
    )
}

const CartContenHeade = (props) => {
    const { closeCart, emptyCart } = props
    return (
        <div className='cart-content__header'>
            <div className=''>
                <Close onClick={closeCart} />
                <h2>Carrito</h2>
            </div>
            <Button variant='link'>
                Vaciar
                <Garbage onClick={emptyCart} />
            </Button>
        </div>
    )
}

const CartContentProducts = (props) => {
    const { products: { loading, result },
        idsProductCart,
        idProductCart,
        incrementarCantidad,
        decrementarCantidad
    } = props
    if (!loading && result) {
        return result.map((product, index) => {
            if (idProductCart == product.id) {
                const contar = countDuplicateItemsArray(product.id, idsProductCart)
                return (
                    <RenderProducto
                        key={index}
                        product={product}
                        contar={contar}
                        incrementarCantidad={incrementarCantidad}
                        decrementarCantidad={decrementarCantidad}
                    />
                )
            }
        })
    } else {
        return null
    }
}

const RenderProducto = (props) => {
    const { contar, product,incrementarCantidad,decrementarCantidad } = props
    return (
        <div className="cart-content__product">
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
            <div className='cart-content__product-info'>
                <div>
                    <h3>{product.name.substr(0, 25)}</h3>
                    <p>${product.price.toFixed(2)}/ud.</p>
                </div>
                <div>
                    <p>En Carrito:{contar}</p>
                    <div>
                        <button onClick={()=>incrementarCantidad(product.id)}>+</button>
                        <button onClick={()=>decrementarCantidad(product.id)}>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CartContentFooter(props){
    const {cartTotalPrice}=props

    return(
        <div className='cart-content__footer'>
            <div>
                <p>Total Aproximado:</p>
                <p>${cartTotalPrice.toFixed(2)}</p>
            </div>
            <button>Tramitar Pedido</button>

        </div>
    )
}

export default Cart
