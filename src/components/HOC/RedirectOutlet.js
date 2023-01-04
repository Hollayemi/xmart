import React from 'react';
import { Navigate } from 'react-router-dom';

export const RedirectOutlet = (to) => <Navigate to={to} />;

export default RedirectOutlet;
