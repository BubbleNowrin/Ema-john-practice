import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo.svg'
import { AuthContext } from '../Contexts/UserContext';
import './Header.css'

const Header = () => {

    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    return (
        <nav className='header'>
            <img src={Logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>

                {user?.uid ?
                    <button onClick={logOut} className='btn-logOut'>LogOut</button>
                    :
                    <>
                        <Link to="/login">LogIn</Link>
                        <Link to="/signup">SignUp</Link>
                    </>
                }
                <span>{user?.email}</span>
            </div>
        </nav >
    );
};

export default Header;