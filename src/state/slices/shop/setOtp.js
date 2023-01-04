import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';
import { REQUEST_STATUS } from '../constants';

export const otpHandler = createAsyncThunk(
    'post/otpHandler',
    async (payload) => {
        const { data } = await martApi
            .post(`/setOTP/${payload}`, {}, {})
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const getOTP = createAsyncThunk('post/getotp', async (payload) => {
    const { data } = await martApi
        .post('/getOTP', payload, {})
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

const initialState = {
    otpStatus: REQUEST_STATUS.NOT_VERIFIED,
    error: '',
    otpData: { id: '', message: [] },
};

const setOtp = createSlice({
    name: 'newOtp',
    initialState,
    reducers: {
        defaultOTP: (state, { payload }) =>
            // state.wasGoing = payload;
            ({ ...initialState, wasGoing: REQUEST_STATUS.NOT_VERIFIED }),
    },
    extraReducers: {
        [otpHandler.pending]: (state) => ({
            ...initialState,
            otpStatus: REQUEST_STATUS.PENDING,
        }),
        [otpHandler.fulfilled]: (state, { payload }) => ({
            ...initialState,
            SetOTP: payload,
            otpStatus: REQUEST_STATUS.NOT_VERIFIED,
        }),
        [otpHandler.rejected]: (state) => ({
            ...initialState,
            otpStatus: REQUEST_STATUS.REJECTED,
        }),

        //
        //
        [getOTP.pending]: () => ({
            ...initialState,
            otpStatus: REQUEST_STATUS.PENDING,
        }),
        [getOTP.fulfilled]: (state, { payload }) => {
            if (payload.message === 'welcome') {
                return {
                    ...initialState,
                    otpData: payload,
                    otpStatus: REQUEST_STATUS.VERIFIED,
                };
            }
            return {
                ...initialState,
                error2: payload,
                otpStatus: REQUEST_STATUS.FULFILLED,
            };
        },
        [getOTP.rejected]: (state) => ({
            ...initialState,
            otpStatus: REQUEST_STATUS.REJECTED,
        }),
    },
});

export const { setOTP, defaultOTP } = setOtp.actions;
export default setOtp.reducer;

export const getOTPhandler = (dispatch, payload) => {
    dispatch(getOTP(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message.replace('buzz_', 'business ')}
                </Message>,
                {
                    placement: 'topStart',
                }
            );
        })
        .catch((e) => {});
};
