import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';

const homeSearch = createAsyncThunk('post/aggrSearch', async (payload) => {
    const { data } = await martApi
        .post('/HomeSegment', payload, {})
        .then((res) => res)
        .catch((e) => e.response);
    return data;
});

export const fetcher = (dispatch, query, groupBy, setData) => {
    const payload = {
        query,
        groupBy,
    };
    dispatch(homeSearch(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                setData(res.message);
            }
        })
        .catch((err) => err.response);
};
