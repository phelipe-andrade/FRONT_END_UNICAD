import React from 'react';
import styles from './DeliveryModal.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import { DELIVERY_PATCH } from '../../api';

const FeedModal = ({ item, setModelDelivery }) => {
  const { error, loading, request } = useFetch();
  const { client_name, delivery_date, point_start, point_end } = item.delivery

  const name = useForm();
  const date = useForm();
  const start = useForm();
  const end = useForm();

  function handleOutSideClick(event) {
    if (event.target === event.currentTarget) setModelDelivery(null);
  }

  async function handleClick(event) {
    event.preventDefault();



    const inputs = event.target.querySelectorAll('input');
    inputs.forEach((i) => {
      if (!i.value) i.value = i.placeholder
    })

    const body = {
      client_name: inputs[0].value,
      delivery_date: inputs[1].value,
      point_start: inputs[2].value,
      point_end: inputs[3].value
    }

    const token = window.localStorage.getItem('token');
    const { url, options } = DELIVERY_PATCH(item.id, body, token);
    await request(url, options);
    setModelDelivery(null);
  }


  return (
    <div className={styles.modal} onClick={handleOutSideClick}>
      <div className={styles.form}>
        <div className={styles.close} onClick={() => setModelDelivery(null)}>X</div>
        <h2 className='title'>Editar Entrega</h2>
        <form onSubmit={handleClick} className='animeLeft'>
          <Input label="Nome do Cliente" type="text" name="name" placeholder={client_name} {...name} />
          <Input label="Data de Entrega" type="date" name="date" placeholder={delivery_date} {...date} />

          <Input label="Ponto de Partida" type="text" placeholder={point_start} name="start" {...start} />

          <Input label="Ponto de Destino" type="text" placeholder={point_end} name="end" {...end} />
          {loading ? (
            <Button disabled>Atualizando...</Button>
          ) : (
            <Button>Atualizar</Button>
          )}
          <Error error={error} />
        </form>
      </div>
    </div >
  );
};

export default FeedModal;
