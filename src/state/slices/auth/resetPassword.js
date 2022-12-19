import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import martApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const resetPasswordApi = createAsyncThunk('post/RP', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .patch('/user/reset-password',payload, {})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });

    return data;
});

export const ResetPasswordHandler = (formData, navigate, dispatch) => {
    dispatch(resetPasswordApi(formData))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                navigate('/signin');
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
