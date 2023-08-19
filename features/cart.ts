import { ProductDocument } from "@/prismicio-types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface InitialState
{
    products: any[];
    total: number,
}

const initialState: InitialState = {
    products: [],
    total: 0
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => { }
});
