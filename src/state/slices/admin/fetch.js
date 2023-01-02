import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';

//Api to get all Business for admin
export const getAllBusinesses = createAsyncThunk(
    'post/allBuzz',
    async (payload) => {
        const { data } = await martApi
            .post('/allBusinesses', payload.body, {
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
//
//
//
//Api to get all Business for admin
export const getStoreInfoApi = createAsyncThunk(
    'post/allBuzz',
    async (payload) => {
        console.log(payload);
        const { data } = await martApi
            .patch(
                '/getStoreByStoreName/' + payload.store,
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

export const getStoreInfo = (dispatch, setInfo, setFiles, adminData, store) => {
    //fetch
    const payload = {
        store,
        auth: adminData._id + ' ' + adminData.accessToken,
    };
    dispatch(getStoreInfoApi(payload))
        .then(unwrapResult)
        .then((res) => {
            setInfo(res.shopInfo);
            setFiles(res.storeFiles[0]);
        })
        .catch((err) => {
            console.log(err.response);
        });
};
