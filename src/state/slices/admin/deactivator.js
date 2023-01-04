import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
//
//
//
//
//
const activationApi = createAsyncThunk(
    'post/accountActivation',
    async (payload) => {
        const { data } = await martApi
            .post('/activation', payload.data, {
                headers: { auth: payload.auth },
            })
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const activation = (dispatch, data, adminData) => {
    const payload = {
        data,
        auth: `${adminData._id} ${adminData.accessToken}`,
    };
    dispatch(activationApi(payload))
        .then(unwrapResult)
        .then((res) => {
            res.type === 'success' &&
                toaster.push(
                    <Message showIcon type="success">
                        {res.message}
                    </Message>,
                    {
                        placement: 'bottomCenter',
                    }
                ),
                window.history.back();
        })
        .catch((err) => {});
};
