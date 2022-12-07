import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';

const newView = createAsyncThunk('post/newView', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .post('/newView', payload.body, { headers: { auth: payload.auth } })
        .then((e) => {
            return e;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const addNewView = (productId, userData, dispatch) => {
    let payload = {
        body: {
            productId: productId,
            userId: userData._id,
        },
        auth: userData._id + ' ' + userData.accessToken,
    }
    dispatch(newView(payload))
        .then(unwrapResult)
        .then(
            (res) =>
                res.type === 'success' &&
                console.log('added')
        )
        .catch((e) => {});
};

//
//
//
//


const getViewApi = createAsyncThunk('post/recentlyViewed', async (payload) => {
    const { data } = await martApi
        .patch('/recentlyView/' + payload.userId, {}, { headers: { auth: payload.auth } })
        .then((e) => {
            return e;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

const initialState = {
    myViews: {},
    status: 'idle',
    error: '',
};

const viewSlice = createSlice({
    name: 'recentlyViewSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [getViewApi.pending]: (state) => {
            return { ...initialState, status: REQUEST_STATUS.PENDING };
        },
        [getViewApi.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                myViews: payload.message,
                status: REQUEST_STATUS.FULFILLED,
            };
        },
        [getViewApi.rejected]: (state) => {
            return { ...initialState, status: REQUEST_STATUS.REJECTED };
        },
    },
});

export default viewSlice.reducer;

export const recentlyViewed = (userData, dispatch) => {
    const payload = {
        userId: userData._id,
        auth: userData._id + ' ' + userData.accessToken,
    }
    dispatch(getViewApi(payload));
};
