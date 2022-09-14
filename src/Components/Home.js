import React from 'react';
import { UserContext } from '../UserContext';
import Button from './Form/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate()

  return (
    <section className="container">
      <div className='animeLeft'>
        <h1 className='title'>Bem-vindo ao Rotas de Entrega LTDA.</h1>
        {user ? (<Button onClick={() => navigate('/conta')}>Minha conta</Button>) : (<Button onClick={() => navigate('/login')}>Faça o login</Button>)}
      </div>
    </section>
  );
};

export default Home;