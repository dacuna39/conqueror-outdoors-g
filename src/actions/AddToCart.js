
export const AddToCart = (_id, name, image, category, quantity, price, salePrice, options, weightPounds, weightOunces, dimensions) => {
  return {
    type: "ADD_TO_CART",
    payload: {
      _id: _id,
      name: name,
      image: image,
      category: category,
      quantity: quantity,
      price: price,
      salePrice: salePrice,

      options: options,
      /*
       * options is an array of objects that has a name and choice selected
       * ex: [
       *      {name: 'Draw Length', choice: '25"', price: 0},
       *      {name: 'Color', choice: 'Red', price: 10},
       *     ]
       */

      weightPounds: weightPounds,
      weightOunces: weightOunces,
      dimensions: dimensions,
    },
  }
}