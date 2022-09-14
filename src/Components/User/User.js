import React from 'react';
import { Route, Routes } from 'react-router';
import UserHeader from './UserHeader';
import UserAccount from './UserAccount';
import RegisterDelivery from '../Delivery/RegisterDelivery';
import DeliveryList from '../Delivery/DeliveryList';
import MapPage from '../Maps/MapPage';

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path='/' element={<UserAccount />} />
        <Route path='/cadastro' element={<RegisterDelivery />} />
        <Route path='/lista' element={<DeliveryList />} />
        <Route path='/maps' element={<MapPage />} />
      </Routes>
    </section>
  );
};

export default User;
