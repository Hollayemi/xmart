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
        .patch(`/myTools/` + payload.body.shopId, payload.body, {
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
        .catch((err) => {});
};

export const getMyTools = (dispatch, shopId, userData, setState) => {
    const payload = {
        body: {
            shopId: shopId,
        },
        auth: userData._id + ' ' + userData.accessToken,
    };
    dispatch(myTools(payload))
        .then(unwrapResult)
        .then((res) => {
            res.type !== 'error' && setState(res.message[0]);
        })
        .catch((err) => {});
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


//
//
//
//
//
//
export const storeOrdersApi = createAsyncThunk(
    'post/fetchStoreCarts',
    async (payload) => {
        const { data } = await martApi
            .post('/store/order-request', payload.body, {
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

export const OrderRequestsHandler = (dispatch, store, otpData, setState) => {
    const payload = {
        body: {
            store: store,
        },
        auth: otpData.id + ' ' + otpData.accessToken,
    };
    dispatch(storeOrdersApi(payload))
        .then(unwrapResult)
        .then((res) => res.type === 'success' && setState(res.data))
        .catch((err) => {});
};
