import React from 'react';
import Button from '../Form/Button';
import Input from '../Form/Input';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { DELIVERY_POST } from '../../api';
import styles from '../Form/Form.module.css';
import { useNavigate } from 'react-router-dom';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

const RegisterDelivery = () => {
  const navigate = useNavigate();
  const { error, loading, request } = useFetch();

  const name = useForm();
  const date = useForm();
  const start = useForm();
  const end = useForm();

  async function handleClick(event) {
    event.preventDefault();
    const body = {
      client_name: name.value,
      delivery_date: date.value,
      point_start: start.value,
      point_end: end.value
    }

    const token = window.localStorage.getItem('token');
    const { url, options } = DELIVERY_POST(body, token);
    await request(url, options);
    navigate('/conta/lista');
  }

  if (loading) return <Loading />;

  return (
    <section className="container">
      <div className={styles.form}>
        <form onSubmit={handleClick} className='animeLeft'>
          <Input label="Nome do Cliente" type="text" name="name" {...name} />
          <Input label="Data de Entrega" type="date" name="date" {...date} />

          <Input label="Ponto de Partida" type="text" name="start" {...start} />

          <Input label="Ponto de Destino" type="text" name="end" {...end} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar</Button>
          )}
          <Error error={error} />
        </form>
      </div>

    </section>
  );
};

export default RegisterDelivery;