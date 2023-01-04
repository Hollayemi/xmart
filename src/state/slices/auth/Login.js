import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';

const kem_signin = createAsyncThunk('post/kem_signin', async (payload) => {
    console.log(payload);
    const { data } = await martApi
        .post('/user/login', {
            ...payload,
        })
        .then((res) => res)
        .catch((err) => err.response);

    return data;
});

const initialState = {
    userData: {},
    loading: false,
    status: 'idle',
    wasGoing: 'no-where',
    error: {},
};

const UserSlice = createSlice({
    name: 'xMartLogin',
    initialState,
    // keepUnusedDataFor: 2,
    reducers: {
        wasGoing: (state, { payload }) => ({
            ...initialState,
            wasGoing: payload,
        }),
        logout: () => {
            alert('here');
            return initialState;
        },
    },
    extraReducers: {
        [kem_signin.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
            loading: true,
        }),
        [kem_signin.fulfilled]: (state, { payload }) => ({
            ...initialState,
            userData: { ...payload.user },
            status: REQUEST_STATUS.FULFILLED,
            loading: false,
        }),
        [kem_signin.rejected]: (state, error) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
            error,
        }),
    },
});

export const { setUsers, wasGoing, logout } = UserSlice.actions;

// export states
export default UserSlice.reducer;
export { kem_signin };

/*

*/

export const myLogin = (formData, navigate, dispatch, wasGoing) => {
    dispatch(kem_signin(formData))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.type === 'success') {
                if (wasGoing !== 'no-where') {
                    navigate(`${wasGoing}`);
                } else {
                    navigate('/site/user/account');
                }
            }
        })
        .catch((err) => {
            toaster.push(
                <Message showIcon type="error">
                    No Connection
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
        });
};
