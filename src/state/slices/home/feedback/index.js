import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';

const newFeedback = createAsyncThunk('post/newFeedback', async (payload) => {
    const { data } = await martApi
        .post('/setFeedback', payload.body, {})
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

const initialState = {
    feedback: { message: [] },
    status: 'idle',
    error: '',
};

const addNewFeedback = createSlice({
    name: 'newFeedback',
    initialState,
    reducers: {},
    extraReducers: {
        [newFeedback.pending]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.PENDING,
        }),
        [newFeedback.fulfilled]: (state, { payload }) => ({
            ...initialState,
            feedback: payload,
            status: REQUEST_STATUS.FULFILLED,
        }),
        [newFeedback.rejected]: (state) => ({
            ...initialState,
            status: REQUEST_STATUS.REJECTED,
        }),
    },
});

export const { setShop } = addNewFeedback.actions;
export default addNewFeedback.reducer;

export const feedbackHandler = (payload, dispatch) => {
    dispatch(newFeedback(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
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
