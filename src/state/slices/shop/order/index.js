import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';

const toWaitingApi = createAsyncThunk('post/toWaiting', async (payload) => {
    const { data } = await martApi
        .post('/store/order-waiting', payload.body, {
            headers: { auth: payload.auth },
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((e) => {
            console.log(e);
            return e.response;
        });
    return data;
});

export const toWaiting = (
    dispatch,
    orderId,
    info,
    otpData,
    user,
    store,
    setState
) => {
    const ReactionArr = info.map((x) => (x[1] === 'rejected' ? x[0] : ''));
    const messArray = ReactionArr.filter((x) => x !== '' && x);
    const pre_mess = messArray.length > 1 ? messArray.join(', ') : messArray[0];
    const mess = `${pre_mess} ${
        messArray.length > 1 ? 'are' : 'is'
    } not available at the moment from ${store} store, you can check later or try another store`;
    const payload = {
        body: {
            orderId,
            message: mess,
            user,
            store,
        },
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(toWaitingApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && setState(res.data))
        .catch((err) => {
            console.log(err);
        });
};

const toProcessingApi = createAsyncThunk(
    'post/toProcessing',
    async (payload) => {
        const { data } = await martApi
            .post('/store/order-processing', payload.body, {
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

export const toProcessing = (dispatch, orderId, store, otpData, setState) => {
    const payload = {
        body: { orderId, store },
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(toProcessingApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && setState(res.data))
        .catch((err) => {});
};
