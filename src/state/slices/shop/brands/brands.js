import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { Message, toaster } from 'rsuite';
import { martCategories } from '../../../../components/SellerComponents/Info/Categories';
import martApi from '../../api/baseApi';
import { REQUEST_STATUS } from '../../constants';
import { myBusinessFiles, storeFiles } from '../display/displayAll';
import { updateInstance } from '../settings/genApi';

export const createBrandApi = createAsyncThunk(
    'post/createBrand',
    async (payload) => {
        const { data } = await martApi
            .post(`/newBrand/${payload.id}`, payload.body, {
                headers: { auth: payload.auth },
            })
            .then((res) => res)
            .catch((e) => e.response);
        return data;
    }
);

// export const updateInstance = createAsyncThunk(
//     'post/collectionInstance',
//     async (payload) => {
//         const { data } = await martApi
//             .post(`/use`, payload, {})
//             .then((res) => {
//                 return res;
//             })
//             .catch((e) => {
//                 return e.response;
//             });
//         return data;
//     }
// );

//
//
//
//

export const createBrand = (formData, neededInfo, dispatch) => {
    if (neededInfo.otpStatus === REQUEST_STATUS.VERIFIED) {
        const payload = {
            id: neededInfo.shopData.id,
            body: {
                ...formData,
            },
            auth: `${neededInfo.otpData.id} ${neededInfo.otpData.accessToken}`,
        };
        dispatch(createBrandApi(payload))
            .then(unwrapResult)
            .then((res) => {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message.replace('buzz_', 'business ')}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
                neededInfo.reFetchData();
                if (res.type === 'success') {
                }
            })
            .catch((e) => {});
    }
};

//
//
//
//

export const deleteBrand = (
    splited,
    neededInfo,
    deleteHandler,
    eventFunc,
    dispatch
) => {
    const { shopData, otpData, reFetchData } = neededInfo;
    const payload = {
        shopID: shopData.id,
        body: {
            delCase: 'brand',
            _id: splited[2],
            name: splited[0],
        },
        auth: `${otpData.id} ${otpData.accessToken}`,
    };
    dispatch(deleteHandler(payload))
        .then(unwrapResult)
        .then((resr) => {
            dispatch(myBusinessFiles({ id: shopData.id, auth: payload.auth }))
                .then(unwrapResult)
                .then((res) => {
                    toaster.push(
                        <Message showIcon type={resr.type}>
                            {resr.message}
                        </Message>,
                        {
                            placement: 'topEnd',
                        }
                    );
                    reFetchData();
                });
            eventFunc('');
        })
        .catch((e) => {});
};

export const loadChildren = (cate) => {
    const theArray = [];
    const forArr = (array) => {
        for (let i = 0; i < array.length; i++) {
            const holl = {
                label: array[i].value,
                value: array[i].value,
            };
            theArray.push(holl);
            const element = array[i].children;
            if (element.length > 0) {
                forArr(element);
            }
        }
    };
    martCategories[0].children.map((res, index) => {
        if (res.label === cate) {
            forArr(res.children);
        }
    });
    return theArray;
};

export const loadCategories = (cate) => {
    const theArray = [];
    const forArr = (array) => {
        for (let i = 0; i < array.length; i++) {
            const holl = {
                label: array[i].value,
                value: array[i].value,
                spec: array[i].spec,
            };
            theArray.push(holl);
        }
    };
    martCategories[0].children.map((res, index) => {
        if (res.label === cate) {
            forArr(res.children);
        }
    });
    return theArray;
};

export const loadSubCategories = (cate, subCategory) => {
    const theArray = [];
    const forArr = (array) => {
        for (let i = 0; i < array.length; i++) {
            const holl = {
                label: array[i].label,
                value: array[i].value,
            };
            theArray.push(holl);
            const element = array[i].children;
            if (element.length > 0) {
                theArray.push(['Others']);
            }
        }
    };
    martCategories[0].children.map((res, index) => {
        if (res.label === cate) {
            res.children.map((res, index) => {
                if (res.label === subCategory) {
                    forArr(res.children);
                }
            });
        }
    });
    return theArray;
};
