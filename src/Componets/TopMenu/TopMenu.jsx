import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { ReactComponent as Logo} from '../../assets/svg/logo.svg'
import Cart from '../Cart'

import "./TopMenu.scss"
const TopMenu = (props) => {
    const {porductsCart,getProductsCart,products}=props
    return (
        <Navbar bg='dark' variant='dark' className='top-menu'>
            <Container>
                <BrandMenu/>
                {/**Menu */}
                {/* {<MenuBar/>} */}
                <Cart porductsCart={porductsCart}
                getProductsCart={getProductsCart}
                products={products}/>
            </Container>
        </Navbar>
    )
}


const BrandMenu = () => {
    return (
        <Navbar.Brand>
            <Logo />
            <h2>La casa de los helados</h2>
        </Navbar.Brand>
    )
}

const MenuBar=()=>{
    return (
        <Nav className='mr-auto'>
            <Nav.Link href='#'>Aperitivos</Nav.Link>
            <Nav.Link href='#'>Mascotas</Nav.Link>
            <Nav.Link href='#'>Aperitivos</Nav.Link>
        </Nav>
    )
}
export default TopMenu
