import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import { ReactComponent as Lista } from '../../Assets/feed.svg';
import { ReactComponent as Cadastrar } from '../../Assets/adicionar.svg';
import { ReactComponent as Usuario } from '../../Assets/estatisticas.svg';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive
            }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav className={` ${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive
        }`}>
        <NavLink to="/conta" end>
          <Usuario />
          {mobile && 'Minha conta'}
        </NavLink>
        <NavLink to='/conta/lista'>
          <Lista />
          {mobile && 'Lista de entregas'}
        </NavLink>
        <NavLink to='/conta/cadastro'>
          <Cadastrar />
          {mobile && 'Cadastrar entregas'}
        </NavLink>
        <button onClick={userLogout}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
