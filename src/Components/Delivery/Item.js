import React from 'react';
import styles from './Item.module.css';
import { UserContext } from '../../UserContext';
import edit from '../../Assets/editar.png'

const Item = ({ info, deleteItem, modalEdit }) => {
  const { client_name, delivery_date, point_start, point_end } = info.delivery;
  const { changeRouteMap } = React.useContext(UserContext);

  return (
    <li className={styles.item}>
      <ul className={styles.info} onClick={() => changeRouteMap(info.delivery)}>
        <li>
          <div><span>Nome do cliente: </span>{client_name}</div>
          <div><span>Data de entrega: </span>{delivery_date}</div>
        </li>
        <li>
          <div><span>Ponto de Partida: </span>{point_start}</div>
          <div><span>Ponto de Entrega: </span>{point_end}</div>
        </li>
      </ul>
      <div className={styles.actions}>
        <div className={styles.edit} onClick={() => modalEdit(info)}><img src={edit} alt="editar" /></div>
        <div className={styles.delete} onClick={() => deleteItem(info)}>X</div>
      </div>
    </li>
  );
};

export default Item;