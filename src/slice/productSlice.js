import {createSlice} from '@reduxjs/toolkit'


const initialState = [
    {
        id: 1,
        name: 'Chicken Breast Fillets, Boneless matuu',
        brand: 'Hormel Black Labelmany',
        price: 6.99,
        quantity: 5,
        total: 34.95,
        approved: false,
        missing: false,
        quantityUpdated: false,
        
    },
    {
        id: 2,
        name: 'Chicken Breast Fillets, Boneless matuu',
        brand: 'Hormel Black Labelmany',
        price: 6.99,
        quantity: 5,
        total: 34.95,
        approved: false,
        missing: false,
        quantityUpdated: false,
    },
    {
        id: 3,
        name: 'Chicken Breast Fillets, Boneless matuu',
        brand: 'Hormel Black Labelmany',
        price: 6.99,
        quantity: 5,
        total: 34.95,
        approved: false,
        missing: false,
        quantityUpdated: false,
    },
    {
        id: 4,
        name: 'Chicken Breast Fillets, Boneless matuu',
        brand: 'Hormel Black Labelmany',
        price: 6.99,
        quantity: 5,
        total: 34.95,
        approved: false,
        missing: false,
        quantityUpdated: false,
    },
    {
        id: 5,
        name: 'Chicken Breast Fillets, Boneless matuu',
        brand: 'Hormel Black Labelmany',
        price: 6.99,
        quantity: 5,
        total: 34.95,
        approved: false,
        missing: false,
        quantityUpdated: false,
    },
    {
        id: 6,
        name: 'Chicken Breast Fillets, Boneless matuu',
        brand: 'Hormel Black Labelmany',
        price: 6.99,
        quantity: 5,
        total: 34.95,
        approved: false,
        missing: false,
        quantityUpdated: false,
    },

]

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        toggleApproval: (state, action) => {
            // Toggle the 'approved' property for a specific product
            const product = state.find((p) => p.id === action.payload);
            if (product) {
              product.approved = !product.approved;
            }
          },
          toggleMissing: (state, action) => {
            // Toggle the 'approved' property for a specific product
            const product = state.find((p) => p.id === action.payload);
            if (product) {
              product.missing = !product.missing;
            }
          },
          setQuantityUpdated: (state, action) => {
            const product = state.find((p) => p.id === action.payload);
            if (product) {
              product.quantityUpdated = action.payload.quantityUpdated;
            }
          },
        editProduct: (state, action) =>{
            const {id, updatedProduct} = action.payload
            const index = state.findIndex((product) => product.id === id);
            if(index !== -1){
                state[index] = {...state[index], ...updatedProduct};
            }
        }
    }
})


export const {addProduct, editProduct, toggleApproval, toggleMissing, setQuantityUpdated} = productSlice.actions;
export default productSlice.reducer