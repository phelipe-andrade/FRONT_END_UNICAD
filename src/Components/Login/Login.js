import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { UserContext } from '../../UserContext';

import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
//import LoginPassword from './LoginPassword';


const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/conta" />;
  return (
    <section className="container">
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/cadastrar' element={<LoginCreate />} />
        {/* <Route path='/perdeu' element={<LoginPassword />} /> */}
      </Routes>
    </section>
  );
};

export default Login;