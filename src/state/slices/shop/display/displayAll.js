import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';

export const myBusinessFiles = createAsyncThunk(
    'post/allFiles',
    async (payload) => {
        const { data } = await martApi
            .patch(
                `/loadFiles/${payload.id}`,
                {},
                {
                    headers: { auth: payload.auth },
                }
            )
            .then((e) => {
                return e;
            })
            .catch((e) => {
                return e.response;
            });
        return data;
    }
);

const initialState = {
    status: 'idle',
    data: {},
};
//
//
//
const myBusinessFile = createSlice({
    name: 'getBrands_Categories',
    initialState,
    reducers: {},
    extraReducers: {
        [myBusinessFiles.pending]: () => {
            return { ...initialState, status: REQUEST_STATUS.PENDING };
        },
        [myBusinessFiles.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                data: payload,
                status: REQUEST_STATUS.FULFILLED,
            };
        },
        [myBusinessFiles.rejected]: () => {
            return { ...initialState, status: REQUEST_STATUS.REJECTED };
        },
    },
});

export const { getTheInfo } = myBusinessFile.actions;
export default myBusinessFile.reducer;
//

export const storeFiles = (id, otpData, dispatch, setFiles) => {
    const payload = {
        id,
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(myBusinessFiles(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res?.type === 'success') {
                setFiles(res.message[0]);
                return res;
            }
        })
        .catch((e) => {});
};
