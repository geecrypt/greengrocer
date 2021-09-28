// https://spoonacular.com/productImages/12003-312x231.jpeg

import { React } from 'react';
import PropTypes from 'prop-types';
import Product from '../../Product';

export default function SearchResults(props) {
  const { results, setList } = props;
  console.log('results', results);
  const jsxResults = results.map((result) => (
    <Product
      key={result.id}
      id={result.id}
      image={result.image}
      title={result.title}
      upc={result.upc}
      setNewProduct={setList}
    />
  ));

  return (
    <div>
      {jsxResults}
    </div>
  );
}

// declare the prop type for the SearchResults component
SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  setList: PropTypes.func.isRequired,
};
