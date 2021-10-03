import { React, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';

import Planet from './Planet';
import Clouds from './Clouds';
import Location from './Location';

export default function Main({ products, origin }) {
  const mappedLocations = products.map((product) => (
    <Location lat={product.lat} long={product.long} origin={origin} />
  ));

  const group = useRef();
  useFrame(() => {
    group.current.rotation.y += 0.003;
  });
  return (
    <group ref={group}>
      <Planet />
      <Clouds />
      {mappedLocations}
    </group>
  );
}

Main.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  })).isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
};
