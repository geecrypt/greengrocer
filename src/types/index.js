import PropTypes from 'prop-types';

const productType = PropTypes.shape({
  api_id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  cO2: PropTypes.number,
  lat: PropTypes.number,
  long: PropTypes.number,
});

const listType = PropTypes.shape({
  list_id: PropTypes.number,
  timestamp: PropTypes.string,
  co2_saved: PropTypes.number,
  products: productType,
});

export {
  productType,
  listType,
};
