import React from 'react'
import { Button, Card,Col } from 'react-bootstrap'
import {BASE_PATH} from '../../utils/constans'
import './Product.scss'
const Product = (props) => {
    const {product,addProductCard} = props
    return (
        <Col xs={3} className='product'>
        <Card>
            <Card.Img variant="top" src={`${BASE_PATH}/${product.image}`} />
            <Card.Body >
                <Card.Title>
                    {product.name}
                </Card.Title>
                <Card.Text>
                    {product.extraInfo}
                </Card.Text>
                <Card.Text>
                    {product.price.toFixed(2)}$/Unidad
                </Card.Text>
                <Button onClick={()=>addProductCard(product.id,product.name)}>Add Card</Button>
            </Card.Body>
        </Card>
        </Col>
    )
}

export default Product
