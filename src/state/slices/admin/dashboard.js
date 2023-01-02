import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
import { REQUEST_STATUS } from '../constants';

const Overview = createAsyncThunk('post/xmartOverview', async (payload) => {
    const { data } = await martApi
        .post('/xmartOverview/', payload.body, {
            headers: { auth: payload.auth },
        })
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const xmartOverview = (dispatch, setTargetInfo, adminData, query) => {
    //fetch
    const payload = {
        body: {
            shopQuary: query,
        },

        auth: adminData._id + ' ' + adminData.accessToken,
    };
    dispatch(Overview(payload))
        .then(unwrapResult)
        .then((res) => {
            setTargetInfo(res.message[0]);
        })
        .catch((err) => {});
};
/*





*/
const awaitingProducts = createAsyncThunk(
    'post/xmartOverview',
    async (payload) => {
        const { data } = await martApi
            .post('/awaitingProducts', payload.body, {
                headers: { auth: payload.auth },
            })
            .then((res) => {
                return res;
            })
            .catch((e) => {
                return e.response;
            });
        return data;
    }
);

const initialState = {
    status: 'idle',
    data: [],
};

const waitingProducts = createSlice({
    name: 'getBrands_Categories',
    initialState,
    reducers: {},
    extraReducers: {
        [awaitingProducts.pending]: () => {
            return { ...initialState, status: REQUEST_STATUS.PENDING };
        },
        [awaitingProducts.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                data: payload.type !== 'error' ? payload.message : null,
                status: REQUEST_STATUS.FULFILLED,
            };
        },
        [awaitingProducts.rejected]: () => {
            return { ...initialState, status: REQUEST_STATUS.REJECTED };
        },
    },
});

export default waitingProducts.reducer;

export const getAwaitingProducts = (dispatch, setData, adminData, query) => {
    //fetch
    const payload = {
        body: {
            limit: query,
        },
        auth: adminData._id + ' ' + adminData.accessToken,
    };
    dispatch(awaitingProducts(payload))
        .then(unwrapResult)
        .then((res) => {
            res.type === 'success' && setData(res.message);
        })
        .catch((err) => {});
};
