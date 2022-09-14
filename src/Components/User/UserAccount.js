import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { DELIVERY_GET } from '../../api';
import Loading from '../Helper/Loading';
import { UserContext } from '../../UserContext';

const UserAccount = () => {
  const { data, error, loading, request } = useFetch();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    async function getList() {
      const token = window.localStorage.getItem('token');
      const { url, options } = DELIVERY_GET(token);
      request(url, options);
    }
    getList();
  }, [request]);

  if (error) return;
  if (loading) return <Loading />;

  return (
    <section className='animeLeft'>
      {data && (
        < ul className='table'>
          <li><span>Nome:</span><span className='info'>{user.name}</span></li>
          <li><span>Email:</span><span className='info'>{user.email}</span></li>
          <li><span>Entregas cadastradas:</span><span className='info'>{data.length}</span></li>
        </ul>
      )}
    </section >
  );
};

export default UserAccount;