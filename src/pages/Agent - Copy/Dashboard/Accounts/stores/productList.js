import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardWrapper from '../../../../../components/AdminComponents';
import { verifyAction } from '../../../../../state/slices/admin/actions';
import EditProduct from '../../../../seller/Dashboard/editProduct';

export const ProductList = () => {
    const dispatch = useDispatch();
    const useQuery = new URLSearchParams(window.location.search);
    const store = useQuery.get('store');
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    const verify = (arg, name) => {
        if (arg === 'approve') {
            verifyAction(dispatch, adminData, store, 'approved', name);
        } else {
            verifyAction(dispatch, adminData, store, 'rejected', name);
        }
    };
    return (
        <DashboardWrapper>
            <EditProduct
                store={store}
                setShowing={() => {}}
                setShowingInfo={() => {}}
                verify={verify}
            />
        </DashboardWrapper>
    );
};

export default ProductList;
