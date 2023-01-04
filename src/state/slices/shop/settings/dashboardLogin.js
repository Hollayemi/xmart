import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { getOTPhandler } from '../setOtp';

export const dashBoardLogin = createAsyncThunk(
    'post/dashboardLogin',
    async (payload) => {
        const { data } = await martApi
            .post('/dashboardLogin', payload.body, {})
            .then((res) => res)
            .catch((err) => err.response);
        return data;
    }
);

export const dasboardLoginHandler = (payload, dispatch) => {
    dispatch(dashBoardLogin(payload))
        .then(unwrapResult)
        .then((res) => {
            const payload2 = {
                login: res.type,
                otp: '08908',
                shopID: payload.body.shopID,
            };
            if (res.type === 'success') {
                console.log(res);
                dispatch(getOTPhandler(dispatch, payload2));
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
            } else {
                toaster.push(
                    <Message showIcon type="error">
                        {res.message}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
            }
        })
        .catch((e) => {});
};
