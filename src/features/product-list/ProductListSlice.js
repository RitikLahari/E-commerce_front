import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchBrands, fetchCategories, fetchProductById, createProduct, updateProduct, fetchAllProducts, fetchProductsByFilters } from './ProductListAPI';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null
};


export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productListSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProductsByFiltersAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products = action.payload.products;
      state.totalItems = action.payload.totalItems;
    })
    .addCase(fetchBrandsAsync.pending, (state) => { 
      state.status = 'loading';
    })
    .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.brands = action.payload;
    })
    .addCase(fetchCategoriesAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.categories = action.payload;
    })
    .addCase(fetchProductByIdAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.selectedProduct = action.payload;
    })
    .addCase(createProductAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createProductAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products.push(action.payload);
    })
    .addCase(updateProductAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateProductAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = action.payload;
      state.selectedProduct = action.payload;

    });
  }
});

export const { increment} = productListSlice.actions;
export const { clearSelectedProduct } = productListSlice.actions;
export const selectAllProduct = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default productListSlice.reducer;
