import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { REQUEST_STATUS } from '../constants';
import { otpHandler } from './setOtp';
import { editShopInfo } from './settings/editShop';

export const addShop = createAsyncThunk('post/addNewShop', async (payload) => {
    const { data } = await martApi
        .post('/newBusiness', payload, {})
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const shopConfig = createAsyncThunk(
    'post/shopInstance',
    async (payload) => {
        const { data } = await martApi
            .post('/default', { payload }, {})
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const getShopInfo = createAsyncThunk(
    'post/getShopInfo',
    async (payload) => {
        const { data } = await martApi
            .post(
                `/getShopInfo/${payload.id}`,
                {},
                {
                    headers: {
                        auth: payload.auth,
                    },
                }
            )
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

const initialState = {
    shopData: {},
    status: 'idle',
    error: '',
};

const editExistingShop = createSlice({
    name: 'newShop',
    initialState,
    reducers: {},
    extraReducers: {
        [addShop.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [addShop.fulfilled]: (state, { payload }) => ({
            ...initialState,
            shopData: payload,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [addShop.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
        //
        //
        //
        [getShopInfo.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [getShopInfo.fulfilled]: (state, { payload }) => ({
            ...initialState,
            shopData: payload,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [getShopInfo.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
        //
        //
        //
        [editShopInfo.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [editShopInfo.fulfilled]: (state, { payload }) => ({
            ...initialState,
            shopData: payload,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [editShopInfo.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export const { setShop } = editExistingShop.actions;
export default editExistingShop.reducer;

/*

*/

export const createHandler = (payload, dispatch, navigate) => {
    dispatch(addShop(payload))
        .then(unwrapResult)
        .then((shop_res) => {
            if (shop_res.type === 'success') {
                dispatch(otpHandler(shop_res.data._id))
                    .then(unwrapResult)
                    .then((res) => {
                        toaster.push(
                            <Message showIcon type={res.type}>
                                {res.message.replace('buzz_', 'business ')}
                            </Message>,
                            {
                                placement: 'topEnd',
                            }
                        );
                        dispatch(shopConfig(shop_res.data._id))
                            .then(unwrapResult)
                            .then((config) => {
                                if (config.type === 'success') {
                                    navigate('/seller/dashboard');
                                }
                            });
                    });
            } else {
                toaster.push(
                    <Message showIcon type={shop_res.type}>
                        {shop_res.message.replace('buzz_', 'business ')}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
            }
        })
        .catch((e) => {});
};

export const fetchShopInfo = (dispatch, id, otpData, setState) => {
    const payload = {
        id,
        auth: `${id} ${otpData}`,
    };
    dispatch(getShopInfo(payload))
        .then(unwrapResult)
        .then((res) => {
            res.type == 'success' && setState(res.data);
        });
};

export const toDashboard = (userData, dispatch, navigate) => {
    const payload = {
        id: userData._id,
        auth: `${userData._id} ${userData.accessToken}`,
    };
    dispatch(getShopInfo(payload))
        .then(unwrapResult)
        .then((res) => {
            dispatch(otpHandler(res.id))
                .then(unwrapResult)
                .then((res) => {
                    console.log(res);
                    navigate('/seller/dashboard');
                });
        })
        .catch((e) => {});
};
