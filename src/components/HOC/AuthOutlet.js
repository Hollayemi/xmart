import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { wasGoing } from '../../state/slices/auth/Login';
import { REQUEST_STATUS } from '../../state/slices/constants';

const AuthOutlet = ({ to }) => {
    const redir = to || '/';
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.reducer.loginReducer);
    let auth = false;
    if (status === REQUEST_STATUS.FULFILLED) {
        auth = true;
    } else {
        dispatch(wasGoing(`/${redir}`));
    }
    return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthOutlet;

export const AdminOutlet = () => {
    const { status } = useSelector((state) => state.reducer.adminReducer);

    let auth = false;
    if (status === REQUEST_STATUS.FULFILLED) {
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/admin/login" />;
};
