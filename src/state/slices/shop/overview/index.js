import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../../api/baseApi';

export const myActivities = createAsyncThunk(
    'post/myActivities',
    async (payload) => {
        const { data } = await martApi
            .post('/myActivities', payload.body, {
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

export const myTools = createAsyncThunk('post/myTools', async (payload) => {
    const { data } = await martApi
        .patch(`/myTools/` + payload.id, payload.body, {
            headers: { auth: payload.auth },
        })
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return e.response;
        });
    return data;
});

export const getActivities = (dispatch, shopID, otpData, setState) => {
    const payload = {
        body: {
            shopID: shopID,
        },
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(myActivities(payload))
        .then(unwrapResult)
        .then((res) => {
            setState(res);
        })
        .catch((err) => {
            console.log(err.response);
        });
};

export const getMyTools = (dispatch, shopId, token, id, setState) => {
    const payload = {
        id: shopId,
        body: {
            shopId: shopId,
        },
        auth: id + ' ' + token,
    };
    dispatch(myTools(payload))
        .then(unwrapResult)
        .then((res) => {
            res.type !== 'error' && setState(res.message[0]);
        })
        .catch((err) => {
            console.log(err.response);
        });
};
/*









fetch notifications
delet notifications

*/

export const notificationApi = createAsyncThunk(
    'post/fetchNotification',
    async (payload) => {
        const { data } = await martApi
            .post('/fetchNotification', payload.body, {
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

export const myNotifications = (dispatch, store, otpData, setState) => {
    const payload = {
        body: {
            store: store,
        },
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(notificationApi(payload))
        .then(unwrapResult)
        .then((res) => {
            setState(res);
        })
        .catch((err) => {});
};
//
//
//

const deleteNotificationApi = createAsyncThunk(
    'post/deleteNotification',
    async (payload) => {
        const { data } = await martApi
            .post('/deleteNotification', payload.body, {
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

export const deleteNotifications = (dispatch, otpData, store) => {
    const payload = {
        body: {
            store: store,
        },
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(deleteNotificationApi(payload));
};

//
//
//
//
//
//
export const storeCartsApi = createAsyncThunk(
    'post/fetchStoreCarts',
    async (payload) => {
        const { data } = await martApi
            .post('/fetchStoreCarts', payload.body, {
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

export const storeCarts = (dispatch, store, otpData, setState) => {
    const payload = {
        body: {
            store: store,
        },
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(storeCartsApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && setState(res.message))
        .catch((err) => {});
};
