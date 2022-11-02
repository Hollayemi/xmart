import React, { useState } from 'react';
import DashboardWrapper from '../../../components/AgentComponents/Dashboard';
import myPic from '../../../assets/images/avatar/avatar5.png';
import './index.css';
import Overview from './Overview';
import Reward from './Reward';
import Pickup from './Pickup';
import AvailablePickup from './available';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AgentDashboard = () => {
    const { data } = useSelector((state) => state.reducer.agentReducer);
    const usersInfo = {
        username: data.message.username,
        email: data.message.email,
        profPic: myPic,
    };
    const param = useParams();

    return (
        <DashboardWrapper
            danger="mainly"
            showing={param.showing}
            agentDetails={usersInfo}
            shopName="Kemon-Mart"
        >
            {param.showing === 'overview' && <Overview />}
            {param.showing === 'reward' && <Reward data={data} />}
            {param.showing === 'pickup' && <Pickup />}
            {param.showing === 'available' && <AvailablePickup />}
            {param.showing === 'settings' && <Settings />}
        </DashboardWrapper>
    );
};

export default AgentDashboard;
