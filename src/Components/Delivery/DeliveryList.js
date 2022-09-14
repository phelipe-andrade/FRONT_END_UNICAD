import React from 'react';
import Item from './Item';
import useFetch from '../../Hooks/useFetch';
import { DELIVERY_GET, DELIVERY_DELETE } from '../../api';
import DeliveryModal from './DeliveyModal';
import Error from '../Helper/Error';
import { UserContext } from '../../UserContext';
import Button from '../Form/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../Helper/Loading';

const DeliveryList = () => {
  const { data, error, loading, request } = useFetch();
  const [deleteItem, setDeleteItem] = React.useState(null);
  const [modalDelivery, setModelDelivery] = React.useState(null);
  const { errorMap } = React.useContext(UserContext);
  const token = window.localStorage.getItem('token');
  const navegate = useNavigate();
  React.useEffect(() => {
    async function getList() {
      const { url, options } = DELIVERY_GET(token);
      await request(url, options);
    }
    getList();
  }, [request, token, deleteItem, modalDelivery])

  async function deleteItems(info) {
    const confirm = window.confirm(`Deseja deletar a de entrega do cliente: ${info.delivery.client_name}`)
    if (!confirm) return;
    const { url, options } = DELIVERY_DELETE(info.id, token);
    await request(url, options);
    setDeleteItem(info.id);
  }

  if (error) return;
  if (loading) return <Loading />;
  return (
    <section className="container">
      {modalDelivery && (
        <DeliveryModal item={modalDelivery} setModelDelivery={setModelDelivery} />
      )}
      <Error error={errorMap} />
      <ul className='animeLeft'>
        {data && data.length > 0 ? (data.map((item) => (
          <Item
            key={item.id}
            info={item}
            deleteItem={deleteItems}
            modalEdit={setModelDelivery}
          />
        ))
        ) : (
          <div>
            <p style={{ marginBottom: '10px' }}>Sem entregas cadastradas.</p>
            <Button onClick={() => navegate('/conta/cadastro')}>Cadastrar entrega</Button>
          </div>
        )}
      </ul>
    </section >
  );
};

export default DeliveryList;