
export const UpdateSearchTerms = (searchTerms, category, brand) => {
  return {
    type: "UPDATE_SEARCH_TERMS",
    payload: {
      searchTerms: searchTerms,
      category: category,
      brand: brand,
    },
  }
}