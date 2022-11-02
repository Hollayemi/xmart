import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardWrapper from '../../../../components/AdminComponents';
import { verifyAction } from '../../../../state/slices/admin/actions';
import EditProduct from '../../../seller/Dashboard/editProduct';

export const ProductList = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    const verify = (arg, name) => {
        if (arg === 'approve') {
            verifyAction(dispatch, adminData, param.nick, 1, name);
        } else {
            verifyAction(dispatch, adminData, param.nick, 0, name);
        }
    };
    return (
        <DashboardWrapper>
            <EditProduct
                store={param && param.nick}
                setShowing={() => {}}
                setShowingInfo={() => {}}
                verify={verify}
            />
        </DashboardWrapper>
    );
};

export default ProductList;
