
export const StartOrder = (items, totalPrice) => {
  return {
    type: "START_ORDER",
    payload: {
      items: items,
      totalPrice: totalPrice,
    },
  }
}