import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';

//Api to get all Business for admin
export const getAllBusinesses = createAsyncThunk(
    'post/allBuzz',
    async (payload) => {
        const { data } = await martApi
            .post(`/allBusinesses`, payload.body, {
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

export const fetchAllStore = (dispatch, setTargetInfo, adminData, query) => {
    //fetch
    const payload = {
        body: {
            shopQuary: query,
        },

        auth: adminData._id + ' ' + adminData.accessToken,
    };
    dispatch(getAllBusinesses(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            setTargetInfo(res.message);
        })
        .catch((err) => {
            console.log(err.response);
        });
};
