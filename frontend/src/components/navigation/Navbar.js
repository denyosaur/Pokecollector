import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import PopUp from "./PopUp";
import MyCart from "../cart/MyCart";
import CartContext from "../../context/CartContext";

import "../../css/navigation/navbar.css";

//Navbar using React Bootstrap
const NavbarComponent = ({ authed, setAuthed }) => {
    const [openLogin, setOpenLogin] = useState(false); //useState to keep track of whether login/reg page is open
    const [cartOpen, setCartOpen] = useState(false); //useState to keep track of whether cart is open
    const [username, setUsername] = useState(false); //useState to keep track of username from localStorage
    const [isAdmin, setIsAdmin] = useState(false); //useState to keep track of admin status from localStorage
    const [activePage, setActivePage] = useState(false); //useState to keep track of active page for navbar
    const Cart = useContext(CartContext);

    //function to handle opening and closing of login forms
    const handleFormOpen = (formType) => {
        const text = (typeof (formType.target) !== "undefined") ? formType.target.innerText : "not open";
        setOpenLogin(text);
    };

    //function to handle opening and closing of cart
    const cartOpenHandler = () => {
        setCartOpen(!cartOpen);
    };

    useEffect(() => {
        setUsername(localStorage.getItem("username") || false); //fetch the updated username
        setIsAdmin(localStorage.getItem("isAdmin") || false) //fetch the whether use is admin
        if (authed) Cart.clearCart(); //if user logged in, clear cart state. if not, leave it
        const cart = JSON.parse(localStorage.getItem("cart")); //fetch the cart from localStorage and parse to object
        //if there is a cart in localStorage, update cart state
        if (cart) {
            localStorage.removeItem("cart")
            for (let card in cart) {
                let num = cart[card].quantity;
                while (num > 0) {
                    const toAdd = {
                        id: card,
                        name: cart[card].name,
                        images: cart[card].image,
                        prices: cart[card].price,
                        setName: cart[card].setName,
                        rarity: cart[card].rarity
                    };
                    Cart.addToCart(toAdd)
                    num--;
                };
            };
        };
        //with cart from localStorage, update cart when Navbar is first laoded

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authed]) //when authed is updated with token from logging in, refresh this component

    const logout = () => {
        setAuthed(false); //set authed to false
        localStorage.removeItem("username"); //remove username in localStorage
        localStorage.removeItem("token"); //remove token in localStorage
        localStorage.removeItem("isAdmin"); //remove admin status in localStorage
        Cart.clearCart(); //clear cart state. cart still saved in localStorage
    };

    return (
        <>
            <Navbar className="Navbar-section" expand="md" collapseOnSelect sticky="top">
                <Container className="Navbar-container">
                    <Navbar.Brand href="/" className="Navbar-brand">PokeCollector</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="Navbar-navigation" activeKey={activePage} onSelect={(selectedKey) => setActivePage(selectedKey)}>
                            <Nav.Link to="/store" className="Navbar-public" as={Link} eventKey="pokeshop">PokeShop</Nav.Link>
                            {authed && <>
                                <Nav.Link to="/mycards" as={Link} eventKey="mycards">My Cards</Nav.Link>
                                <Nav.Link to="/mydecks" as={Link} eventKey="mydecks">My Decks</Nav.Link>
                                {isAdmin && <Nav.Link to="/admin" as={Link} eventKey="admin">Admin</Nav.Link>
                                }
                            </>}
                        </Nav>
                        <Nav className="Navbar-auth ms-auto" activeKey={activePage} onSelect={(selectedKey) => setActivePage(selectedKey)}>
                            {authed
                                ? <>
                                    <Nav.Link onClick={cartOpenHandler}><i className="bi bi-cart2"></i>Cart</Nav.Link>
                                    <Nav.Link to="profile" as={Link} eventKey="profile">{username}</Nav.Link>
                                    <Nav.Link onClick={logout}>Log Out</Nav.Link>
                                </>
                                : <>
                                    <Nav.Link onClick={cartOpenHandler}><i className="bi bi-cart2"></i>Cart</Nav.Link>
                                    <Nav.Link onClick={handleFormOpen}>Login</Nav.Link>
                                    <Nav.Link onClick={handleFormOpen}>Sign Up</Nav.Link>
                                </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <PopUp handleFormOpen={handleFormOpen} openLogin={openLogin} setOpenLogin={setOpenLogin} setAuthed={setAuthed} />
            {cartOpen && <MyCart setCartOpen={setCartOpen} authed={authed} setOpenLogin={setOpenLogin} username={username} cartOpenHandler={cartOpenHandler} cartOpen={cartOpen} />}
        </ >
    )
};

export default NavbarComponent;