/* eslint-disable max-len */
import { React } from 'react';
import PropTypes from 'prop-types';
import { listType } from '../../../types';
import { searchProducts, filterDuplicateProductsFromResults, removeProductFromList } from '../../../helpers/search';
import NewListProduct from './NewListProduct';
import '../index-lists.scss';
import { useAppContext } from '../../../lib/context';

export default function NewList(props) {
  const {
    newList, setResults, setIdToReplace, saveList, setNewList, setQueryDisplay, idToReplace,
  } = props;
  const { userContext, resultsReturnedContext } = useAppContext();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = userContext;
  // eslint-disable-next-line no-unused-vars
  const [resultsReturned, setResultsReturned] = resultsReturnedContext;

  const removeProduct = (id) => {
    const newProducts = removeProductFromList(newList.products, id);
    console.log('removeProduct', newProducts);

    setNewList((prev) => ({
      ...prev,
      products: newProducts,
    }));

    if (id === idToReplace) {
      setResults([]);
    }
  };

  const showReplacements = (query, title, id) => {
    const newQuery = title.toLowerCase().split(' ').filter((w) => w.includes(query.toLowerCase()))[0];
    console.log('newQuery', newQuery);
    setResultsReturned((prev) => ({
      ...prev,
      returned: false,
      initial: false,
    }));
    searchProducts(newQuery)
      .then((results) => {
        setIdToReplace(id);
        const dedupedResults = filterDuplicateProductsFromResults(results, newList);
        setResults(dedupedResults);
        setQueryDisplay(newQuery);
        setResultsReturned((prev) => ({
          ...prev,
          empty: results.length === 0,
          returned: true,
        }));
      });
  };

  const newListContents = () => {
    if (!newList.products.length) {
      console.log('no products yet');
      return (
        <div className="no-products-yet">
          <p>
            <em>
              You have no products yet.
            </em>
          </p>
        </div>
      );
    }

    const mappedList = newList.products.map((p) => (
      <NewListProduct
        product={p}
        showReplacements={showReplacements}
        removeProduct={removeProduct}
        key={p.api_id}
      />
    ));

    // calculate the running total CO2 of the new list
    const getTotalCo2 = newList.products.reduce((sum, product) => {
      // eslint-disable-next-line no-param-reassign
      sum += product.co2;
      return sum;
    }, 0);

    return (
      <>
        <p className="co2-saved-text co2">
          {/* eslint-disable-next-line */}
          This list generates <span className="co2-desc">{getTotalCo2} kg </span> of CO₂
        </p>
        <p className="co2-saved-text co2">
          Your replacements have saved
          <span className="co2-desc">
            {/* eslint-disable-next-line */}
            { ' ' + newList.co2_saved} kg {' '} 
          </span>
          of CO₂ so far
        </p>
        {mappedList}
      </>
    );
  };

  return (
    <section className="new-list-wrapper">
      <div className="new-list-content">
        <h1>New list</h1>
        {newListContents()}
      </div>
      {(newList.products.length && user.auth) ? <button className="save-btn" type="button" onClick={saveList}>Save list</button> : <></>}
    </section>
  );
}

// declare the prop type for the ListProducts component
NewList.propTypes = {
  newList: listType.isRequired,
  setResults: PropTypes.func.isRequired,
  setIdToReplace: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
  setNewList: PropTypes.func.isRequired,
  idToReplace: PropTypes.number,
  setQueryDisplay: PropTypes.func.isRequired,
};

NewList.defaultProps = {
  idToReplace: null,
};
