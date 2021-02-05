import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen.js';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen.js';
import ProductsScreen from './screens/ProductsScreen.js';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';


function App() {
  
  const userSignin = useSelector(state=>state.userSignin);
  const { userInfo } = userSignin;


  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to ="/" >Art of Bloom</Link>
        
      </div>
      <div className="header-links">
        <a href="Home.html">Home</a>
        <a href="Flowers.html">Flowers</a>
        <a href="Aboutus.html">Aboutus</a>
        <a href="Contact us.html">Contact</a>
        <a href="cart.html">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
             {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
   { /*    <div className="row">
      <div className="col-2">
      <h1 className="first-text">Send loving thoughts<br/> with Beautiful Flowers!</h1>  
     
      </div>
  </div> */}

<aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Best Sellers">Best Sellers</Link>
            </li>

            <li>
              <Link to="/category/Featured Flowers">Featured Flowers</Link>
            </li>
          </ul>
        </aside>
      <div className="content">
        <Route path="/orders" component={OrdersScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/order/:id" component={OrderScreen} /> 
        <Route path="/products" component={ProductsScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/" exact={true} component={HomeScreen} />
        
      </div>
      <footer className="footer">All right reserved.</footer> 
 </div>
 </BrowserRouter>
  );
}

export default App;
