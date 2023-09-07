import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='flex justify-center items-center py-12 '>
            <Link to='/' className=' border-2 border-pink-500 text-base py-2 px-4 mr-6 rounded shadow '>Home</Link> 
            <Link to='/login' className=' border-2 border-blue-900 text-base py-2 px-4 mr-6 rounded shadow '>Login</Link> 
            <Link to='/register' className=' border-2 border-purple-500 text-base py-2 px-4 mr-6  rounded shadow '>Register</Link> 
            <Link to='/register_td' className=' border-2 border-red-500 text-base py-2 px-4 mr-6  rounded shadow '>Register-DaisyUI</Link> 
        </nav>
    );
};

export default Header;