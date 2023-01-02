import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { toaster, Message } from 'rsuite';
import martApi from '../api/baseApi';
import { getAwaitingProducts } from './dashboard';

const verifyProductApi = createAsyncThunk(
    'post/verifyProduct',
    async (payload) => {
        const { data } = await martApi
            .post('/verifyProduct', payload.body, {
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

//
export const verifyAction = (
    dispatch,
    adminData,
    store,
    newStatus,
    name,
    _id,
    setData
) => {
    const payload = {
        body: {
            store: store.toLowerCase(),
            newStatus: newStatus,
            name: name,
            _id: _id,
        },
        auth: adminData._id + ' ' + adminData.accessToken,
    };
    console.log(payload);
    dispatch(verifyProductApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.type === 'success') {
                getAwaitingProducts(dispatch, setData, adminData, 1000);
            }
        })
        .catch((err) => {});
};
