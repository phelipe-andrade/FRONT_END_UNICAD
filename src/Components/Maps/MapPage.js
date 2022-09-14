import React from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

import styles from './Maps.module.css';
import { UserContext } from '../../UserContext';

import driving from '../../Assets/driving.png'
import walking from '../../Assets/walking.png'
import transit from '../../Assets/transit.png'
import bicycling from '../../Assets/bicycling.png'


const MapPage = () => {
  const { routeMap, setErrorMap } = React.useContext(UserContext);

  const navigate = useNavigate();
  if (!routeMap) navigate('/lista');
  const [libraries] = React.useState(['places']);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_KEY_MAPS,
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [travel, setTravel] = React.useState('DRIVING');

  const center = {
    lat: 0,
    lng: 0
  }

  async function calculateRoute() {
    try {
      //eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: routeMap.point_start,
        destination: routeMap.point_end,
        //eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode[travel]
      })
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setErrorMap(null);
    } catch (error) {
      if (error.code === "NOT_FOUND") {
        navigate('/conta/lista')
        setErrorMap('Não foi possível achar rota para estes pontos.')
      }

    }
  }
  calculateRoute();

  function handleTravel(event) {
    event.preventDefault();
    const list = event.currentTarget.querySelectorAll('li');
    list.forEach((item) => {
      item.classList.remove('active');
    })

    event.target.parentNode.classList.add('active')
    setTravel(event.target.alt);
  }

  return (
    <div className='animeLeft'>
      <h2 className={styles.title}> De: {routeMap.point_start} Para: {routeMap.point_end}</h2>
      <ul className={styles.travel} onClick={handleTravel}>
        <li><img src={driving} alt="DRIVING" /></li>
        <li><img src={walking} alt="WALKING" /></li>
        <li><img src={bicycling} alt="BICYCLING" /></li>
        <li><img src={transit} alt="TRANSIT" /></li>
        <li>Meio de locomoção: <span>{travel}</span> </li>
      </ul>

      <ul className='table'>
        <li><span>Ponto inicial "A"</span><span className='info'>{routeMap.point_start}</span></li>
        <li><span>Ponto final "B"</span><span className='info'>{routeMap.point_end}</span></li>
        <li><span>Data</span><span className='info'>{routeMap.delivery_date}</span></li>
        <li><span>Distância</span><span className='info'>{distance}</span></li>
        <li><span>Duração</span><span className='info'>{duration}</span></li>
      </ul>
      < div className={styles.map}>{
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={15}
          >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        ) : <></>
      }</div >
    </div >
  );
};

export default MapPage;