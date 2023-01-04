import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';

const loadFeedback = createAsyncThunk('post/loadFeedback', async (payload) => {
    const { data } = await martApi
        .post('/loadFeedback', payload.body, {})
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

const initialState = {
    message: [],
    status: 'idle',
    error: '',
};

const loadAllFeedback = createSlice({
    name: 'loadFeedback',
    initialState,
    reducers: {},
    extraReducers: {
        [loadFeedback.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [loadFeedback.fulfilled]: (state, { payload }) => ({
            ...initialState,
            message: payload.message,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [loadFeedback.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

// export const { setShop } = loadAllFeedback.actions;
export default loadAllFeedback.reducer;

export const feedbackLoader = (payload, dispatch) => {
    dispatch(loadFeedback(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.text}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
            }
        })
        .catch((e) => {});
};
