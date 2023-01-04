import { unwrapResult } from '@reduxjs/toolkit';
import { deleteHandler } from '../delete';
import { storeFiles } from '../display/displayAll';
import { updateInstance } from '../settings/genApi';

export const deleteProd = (body, neededInfo, eventFunc, dispatch) => {
    const { otpData, shopData } = neededInfo;
    const payload = {
        shopID: neededInfo.shopData.id,
        body,
        auth: `${otpData.id} ${otpData.accessToken}`,
    };
    const subPayload = {
        id: neededInfo.shopData.id,
        operator: '+',
        useCase: 'products',
        number: 1,
    };
    dispatch(deleteHandler(payload))
        .then(unwrapResult)
        .then((resr) => {
            storeFiles(shopData.id, dispatch, otpData, setFiles);
            if (resr.type) {
                dispatch(updateInstance(subPayload));
            }
            // neededInfo.reFetchData();

            eventFunc('');
        })
        .catch((e) => {});
};
