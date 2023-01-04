import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

const KickOff = () => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);

export default KickOff;
