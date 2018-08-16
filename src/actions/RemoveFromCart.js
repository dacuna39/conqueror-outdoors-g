
export const RemoveFromCart = (_id) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: {
      _id: _id,
    },
  }
}