import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../../api/baseApi';

const addOrderApi = createAsyncThunk('post/myOrder', async (payload) => {
    const { data } = await martApi
        .post('/newOrder', payload.body, { headers: { auth: payload.auth } })
        .then((e) => {
            return e;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const addNewOrder = (body, auth, dispatch) => {
    const payload = {
        body: body,
        auth: auth,
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
        .then((e) => {
            return e;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const FetchOrderHandler = (id, auth, dispatch, setState) => {
    const payload = {
        id: id,
        auth: auth,
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
