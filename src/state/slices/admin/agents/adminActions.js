import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';

//Api to get all agents for admin
export const getAllAgents = createAsyncThunk(
    'post/allBuzz',
    async (payload) => {
        const { data } = await martApi
            .post(`/allAgents`, payload.body, {
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

export const fetchAllAgent = (dispatch, setTargetInfo, adminData, query) => {
    //fetch
    const payload = {
        body: {
            shopQuary: query,
        },

        auth: adminData._id + ' ' + adminData.accessToken,
    };

    dispatch(getAllAgents(payload))
        .then(unwrapResult)
        .then((res) => {
            setTargetInfo(res.message);
        })
        .catch((err) => {
            console.log(err.response);
        });
};

//
//

//Api to get all agents for admin
export const updateAgentApi = createAsyncThunk(
    'post/adminUpdateAgents',
    async (payload) => {
        const { data } = await martApi
            .post(`/adminUpdateAgents`, payload.body, {
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

export const updateAgent = (dispatch, setTargetInfo, adminData, query, id) => {
    //fetch
    const payload = {
        body: {
            query: query,
            id: id,
        },

        auth: adminData._id + ' ' + adminData.accessToken,
    };

    dispatch(updateAgentApi(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res.message);
            setTargetInfo(res.message);
        })
        .catch((err) => {
            console.log(err.response);
        });
};
