import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { UserStorage } from './UserContext';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import Header from './Components/Header';
import Home from './Components/Home'
import User from './Components/User/User';
import Login from './Components/Login/Login';
import Footer from './Components/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className='main'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login/*' element={<Login />} />
              <Route path='/conta/*' element={<ProtectedRoute><User /></ProtectedRoute>} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
