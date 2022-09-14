import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { ReactComponent as Usuario } from '../Assets/usuario.svg'
import logo from '../Assets/logo.png';

const Header = () => {
  const { user } = React.useContext(UserContext);

  return (
    <header className={styles.header}>

      <nav className={`${styles.nav} container`}>
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        {user ? (
          <Link className={styles.login} to="/conta">
            <Usuario />
            {user.name}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
