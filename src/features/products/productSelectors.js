export const selectProducts = (state) => state.products.products;

export const selectProductsLoading = (state) => state.products.loading;

export const selectProductsError = (state) => state.products.error;

export const selectTotalProducts = (state) => state.products.products.length;

export const selectAvailableProducts = (state) =>
  state.products.products.filter((product) => product.status === "Available")
    .length;

export const selectOutOfStockProducts = (state) =>
  state.products.products.filter((product) => product.status === "Out of Stock")
    .length;
