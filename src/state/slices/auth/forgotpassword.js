import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import martApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const forgotPasswordApi = createAsyncThunk('post/FP', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .post('/user/forgot-password', payload, {})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });

    return data;
});

export const ForgotPasswordHandler = (email, navigate, dispatch) => {
    dispatch(forgotPasswordApi({ email: email }))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                localStorage.setItem('sending-email-to', email);
                navigate('/email-sent');
            }
        })
        .catch((err) => {
            toaster.push(
                <Message showIcon type={'error'}>
                    No Connection
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
        });
};
