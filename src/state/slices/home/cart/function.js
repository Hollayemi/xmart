import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { FetchCartHandler } from './fetchCart';
import martApi from '../../api/baseApi';

const changeCartApi = createAsyncThunk('post/changeQty', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .patch('/changeCart/Qty', payload, {})
        .then((e) => {
            return e;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const changeQty = (payload, dispatch) => {
    console.log();
    dispatch(changeCartApi(payload))
        .then(unwrapResult)
        .then(
            (res) =>
                res.type === 'success' &&
                FetchCartHandler(payload.userId, dispatch, () => {})
        )
        .catch((e) => {});
};

const removeCartApi = createAsyncThunk('post/changeCart', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .patch('/changeCart/remove', payload, {})
        .then((e) => {
            return e;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const removeCartHandler = (payload, dispatch) => {
    dispatch(removeCartApi(payload))
        .then(unwrapResult)
        .then(
            (res) =>
                res.type === 'success' &&
                FetchCartHandler(payload.userId, dispatch, () => {})
        )
        .catch((e) => {});
};
