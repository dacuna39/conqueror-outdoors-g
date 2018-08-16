import React from 'react';
import ProductPreview from '../components/ProductPreview';
import H from '../components/H';
import LoadingIndicator from '../components/LoadingIndicator';

export default function (productsList, productsReady) {
  if (productsReady === true) {
    if (productsList.length > 0) {
      return productsList.map((product, index) => {

        if (index <= 24) {
          return (
            <ProductPreview
              key={index}
              _id={product._id}
              name={product.name}
              img={product.image}
              price={product.price}
              salePrice={product.salePrice}
            />
          );
        }
        return null;
      })
    }
    else {//products list length = 0
      return (
        <H> No Products Found </H>
      );
    }
  }
  else { //products are not ready
    return (
      <LoadingIndicator />
    );
  }
}