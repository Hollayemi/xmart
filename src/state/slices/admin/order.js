import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';
//
//
//
//
//
const listOrdersItemsApi = createAsyncThunk(
    'post/listOrdersItems',
    async (payload) => {
        const { data } = await martApi
            .post(
                '/xmart/order-request',
                {},
                {
                    headers: { auth: payload.auth },
                }
            )
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

export const AllOrdersItems = (dispatch, adminData, setState) => {
    const payload = {
        auth: `${adminData._id} ${adminData.accessToken}`,
    };
    dispatch(listOrdersItemsApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && setState(res.data))
        .catch((err) => {});
};
