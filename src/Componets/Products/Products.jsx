import React from 'react'
import {Container,Row} from 'react-bootstrap'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'
const Products = (props) => {
    const {products:{
        result,loading,error
    },addProductCard}=props
    return (
        <Container>
            <Row>
                {loading || !result ? (
                    <Loading/>
                ):(
                    result.map((produ,index)=>{
                        return(
                            <Product
                            key={index}
                            product={produ}
                            addProductCard={addProductCard}
                            />
                        )
                    })
                )}
            </Row>
        </Container>
    )
}

export default Products
