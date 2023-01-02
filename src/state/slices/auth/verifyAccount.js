import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import martApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const verifyApi = createAsyncThunk('post/VA', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .patch(
            `/user/verify-account?token=${payload.token}&email=${payload.email}`,
            {},
            {}
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });

    return data;
});

export const VerifyHandler = (email, token, navigate, dispatch) => {
    dispatch(verifyApi({ email, token }))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                navigate('/signin');
            }
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
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
