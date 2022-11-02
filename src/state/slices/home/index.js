import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';

export const fetchProduct = createAsyncThunk(
    'post/fetchProduct',
    async (payload) => {
        const { data } = await martApi
            .patch(`/fetchProducts`, payload.body, {})
            .then((res) => {
                return res;
            })
            .catch((e) => {
                return e.response;
            });
        return data;
    }
);

export const getProduct = (dispatch, Query, space, setState) => {
    const payload = {
        body: {
            Query: Query,
            from: space,
        },
    };
    dispatch(fetchProduct(payload))
        .then(unwrapResult)
        .then((res) => {
            setState(res);
        })
        .catch();
};
/*





*/

const getOneProduct = createAsyncThunk('post/fetchProduct', async (payload) => {
    const { data } = await martApi
        .post(`/getOneProduct`, payload.body, {})
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const getOneProductHandler = (
    dispatch,
    query,
    setInfo,
    isArray,
    myCarts
) => {
    const payload = {
        body: {
            query: query,
        },
    };
    dispatch(getOneProduct(payload))
        .then(unwrapResult)
        .then((res) => {
            if (isArray) {
                setInfo(myCarts.push(res.message));
            } else {
                setInfo(res.message);
            }
        })
        .catch((err) => {});
};

export const getOnebyId = async (dispatch, id, setInfo = null) => {
    const payload = {
        body: {
            query: { _id: id },
        },
    };

    const response = await dispatch(getOneProduct(payload))
        .then(unwrapResult)
        .then((res) => {
            setInfo && setInfo(res.message);
            return res.message;
        })
        .catch();
    return response;
};

/*

homeSliderLink
this is for shortcut links

*/

const homeSliderLink = createAsyncThunk('post/homeSliderLink', async () => {
    const { data } = await martApi
        .post(`/homeSliderLink`, {})
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const sliderLinkHandler = (dispatch, setInfo) => {
    dispatch(homeSliderLink())
        .then(unwrapResult)
        .then((res) => {
            setInfo(res.message);
        });
};
