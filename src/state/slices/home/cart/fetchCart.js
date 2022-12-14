import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';

export const myCart = createAsyncThunk('post/getMyCarts', async (payload) => {
    const { data } = await martApi
        .post('/getMyCarts', payload, {})
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

const initialState = {
    cartData: {},
    status: 'idle',
    error: '',
};

const fetchMyCarts = createSlice({
    name: 'newShop',
    initialState,
    reducers: {},
    extraReducers: {
        [myCart.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [myCart.fulfilled]: (state, { payload }) => ({
            ...initialState,
            cartData: payload.message,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [myCart.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export default fetchMyCarts.reducer;
//
//
//
//
export const FetchCartHandler = (payload, dispatch, setState) => {
    dispatch(myCart({ userId: payload }))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setState(res.message);
            }
        })
        .catch((e) => {});
};
