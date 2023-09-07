import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');

  const handleEmailChange = (event) =>{
    console.log(event.target.value);
    setEmail(event.target.value);
  }

  const handlePasswordBlur = (event) =>{
    console.log(event.target.value);

  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
  }

    return (
        <div className='bg-slate-100  '>
            <h1  className='text-center text-2xl font-semibold font-serif py-8'>Register Please</h1>
            <form onSubmit={handleSubmit} className='pl-80'>
            <input onChange={handleEmailChange}  className='my-6 py-2 px-4    ' type="email" name='email' placeholder='Your Email' id='email' />
            <br />
            <input onBlur={handlePasswordBlur} className='my-6 py-2 px-4' type="password" name='password' placeholder='Your Password' id='password' />
            <br />
            <input className='text-xl mb-8 border-2 border-red-500 py-2 px-4 font-semibold rounded shadow-md' type="submit" value='Register' />
            </form>
        </div>
    );
};

export default Register;