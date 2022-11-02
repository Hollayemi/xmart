import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';

const updateAccountApi = createAsyncThunk(
    'post/updateUserAccount',
    async (payload) => {
        const { data } = await martApi
            .post('/updateUserAccount', payload.body, {
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

export const updateUserAccount = (formData, auth, dispatch, navigate) => {
    const payload = {
        body: formData,
        auth: auth,
    };
    dispatch(updateAccountApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.type === 'success' && navigate('/signin');
        })
        .catch((e) => {});
};
