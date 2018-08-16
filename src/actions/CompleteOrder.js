
export const CompleteOrder = (order, orderNumber) => {
  return {
    type: "COMPLETE_ORDER",
    payload: {
      order: order,
      orderNumber: orderNumber,
    },
  }
}