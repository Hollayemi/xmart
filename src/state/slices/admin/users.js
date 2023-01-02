import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
//
const getAccountsApi = createAsyncThunk(
    'post/getAllAccounts',
    async (payload) => {
        console.log(payload.auth);
        const { data } = await martApi
            .post(
                '/user/get-account',
                {},
                {
                    headers: { auth: payload.auth },
                }
            )
            .then((res) => {
                return res;
            })
            .catch((e) => {
                return e.response;
            });
        return data;
    }
);

export const getAccounts = (dispatch, adminData, setState) => {
    const payload = {
        auth: adminData._id + ' ' + adminData.accessToken,
    };
    dispatch(getAccountsApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && setState(res.message))
        .catch((err) => {});
};
