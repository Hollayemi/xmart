import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import martApi from '../api/baseApi';

const addPickupAgent = createAsyncThunk(
    'post/addPickupAgent',
    async (payload) => {
        const { data } = await martApi
            .post('/addPickup', payload.body, {
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

export const addPickupPerson = (formData, auth, dispatch, setData) => {
    const payload = {
        body: formData,
        auth: auth,
    };
    dispatch(addPickupAgent(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.type === 'success' && window.location.reload();
        })
        .catch((e) => {});
};

//
//delete pickup agent
const myPickupsApi = createAsyncThunk('post/deletePickup', async (payload) => {
    const { data } = await martApi
        .post(`myPickups/${payload.id}`, '', {
            headers: { auth: payload.auth },
        })
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e;
        });
    return data;
});

export const getPickupPerson = (formData, auth, dispatch, setData) => {
    const payload = {
        id: formData,
        auth: auth,
    };
    dispatch(myPickupsApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.type === 'success' && setData(res.data);
        })
        .catch((e) => {});
};
//
//
//
//
//delete pickup agent
const deletePickupAgent = createAsyncThunk(
    'post/deletePickup',
    async (payload) => {
        const { data } = await martApi
            .post(`deletePickup/${payload.id}`, '', {
                headers: { auth: payload.auth },
            })
            .then((res) => {
                return res;
            })
            .catch((e) => {
                return e;
            });
        return data;
    }
);

export const deletePickupPerson = (formData, auth, dispatch, setData) => {
    const payload = {
        id: formData,
        auth: auth,
    };
    dispatch(deletePickupAgent(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.status}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.type === 'success' && window.location.reload();
        })
        .catch((e) => {});
};
