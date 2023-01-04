import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';

const addOrderApi = createAsyncThunk('post/myOrder', async (payload) => {
    const { data } = await martApi
        .post('/newOrder', payload.body, { headers: { auth: payload.auth } })
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const addNewOrder = (body, auth, dispatch) => {
    const payload = {
        body,
        auth,
    };
    dispatch(addOrderApi(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message}
                    </Message>,
                    {
                        placement: 'topCenter',
                    }
                );
                FetchOrderHandler(body.userId, auth, dispatch, null);
            }
        })
        .catch((e) => {});
};

const fetchOrder = createAsyncThunk('post/fetchOrder', async (payload) => {
    const { data } = await martApi
        .post(
            `/fetchOrder/${payload.id}`,
            {},
            { headers: { auth: payload.auth } }
        )
        .then((e) => e)
        .catch((e) => e.response);
    return data;
});

export const FetchOrderHandler = (id, auth, dispatch, setState) => {
    const payload = {
        id,
        auth,
    };
    console.log(payload);
    dispatch(fetchOrder(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.type === 'success') {
                setState && setState(res.message);
            }
        })
        .catch((e) => {});
};

const continueOrderApi = createAsyncThunk(
    'post/continueOrder',
    async (payload) => {
        const { data } = await martApi
            .patch(
                `/continueOrder/${payload.orderId}`,
                {},
                { headers: { auth: payload.auth } }
            )
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const continueOrder = (orderId, auth, dispatch) => {
    const payload = {
        orderId,
        auth,
    };
    dispatch(continueOrderApi(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                window.location.reload();
            }
        })
        .catch((e) => {});
};

const cancelOrderApi = createAsyncThunk(
    'patch/cancelOrder',
    async (payload) => {
        const { data } = await martApi
            .patch(
                `/cancelOrder/${payload.orderId}`,
                {},
                { headers: { auth: payload.auth } }
            )
            .then((e) => e)
            .catch((e) => e.response);
        return data;
    }
);

export const cancelOrder = (orderId, auth, dispatch) => {
    const payload = {
        orderId,
        auth,
    };
    dispatch(cancelOrderApi(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.type === 'success') {
                window.location.reload();
            }
        })
        .catch((e) => {});
};
