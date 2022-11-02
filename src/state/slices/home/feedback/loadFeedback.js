import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';

const loadFeedback = createAsyncThunk('post/loadFeedback', async (payload) => {
    const { data } = await martApi
        .post('/loadFeedback', payload.body, {})
        .then((e) => {
            return e;
        })
        .catch((e) => {
            return e.response;
        });
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
        [loadFeedback.pending]: (state) => {
            return { ...initialState, status: REQUEST_STATUS.PENDING };
        },
        [loadFeedback.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                message: payload.message,
                status: REQUEST_STATUS.FULFILLED,
            };
        },
        [loadFeedback.rejected]: (state) => {
            return { ...initialState, status: REQUEST_STATUS.REJECTED };
        },
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
