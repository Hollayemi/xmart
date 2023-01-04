import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardWrapper from '../../../components/AdminComponents';
import './index.css';
import Busineses from './Business';
import Overview from './Overview';
import Logout from './Logout';
import Agent from './Agent';
import QuickPickers from './QuickPickers';

const AdminDashboard = () => {
    const param = useParams();
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    console.log(param);

    return (
        <DashboardWrapper>
            {param.section === 'Overview' && <Overview />}
            {param.section === 'agents' && <Agent />}
            {param.section === 'pickers' && <QuickPickers />}
            {param.section === 'Logout' && <Logout />}
        </DashboardWrapper>
    );
};

export default AdminDashboard;
