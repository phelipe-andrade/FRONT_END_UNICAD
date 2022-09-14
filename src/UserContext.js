import React from "react";
import { TOKEN_POST, TOKEN_VALIDADE_POST, LIST_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export function UserStorage({ children }) {
  const [list, setList] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [routeMap, setRouteMap] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [errorMap, setErrorMap] = React.useState('');

  const navigate = useNavigate()
  function changeRouteMap(info) {
    setRouteMap(info);
    navigate('/conta/maps');
  }

  const userLogout = React.useCallback(
    async function userLogout() {
      setList(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      setUser(null);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getList(token) {
    const { url, options } = LIST_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setList(json);
    setLogin(true);
  }

  async function userLogin(email, password) {

    setError(null);
    setLoading(true);
    const { url, options } = TOKEN_POST({ email, password });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.errors);
      };
      const { token, name, email } = await response.json();
      setUser({ name, email });
      window.localStorage.setItem('token', token);
      await getList(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setLoading(true);
          const { url, options } = TOKEN_VALIDADE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          const json = await response.json();
          setUser(json);
          await getList(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider value={{ routeMap, changeRouteMap, login, userLogin, userLogout, list, getList, user, error, errorMap, setErrorMap, loading }}>
      {children}
    </UserContext.Provider>
  );
}