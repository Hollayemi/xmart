import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';
import signUpReducer from './slices/auth/Signup';
import agentReducer from './slices/agents/agentInfo';
import adminReducer from './slices/admin/login';
import waitingProducts from './slices/admin/dashboard';
import setOtpReducer from './slices/shop/setOtp';
import setShopReducer from './slices/shop/addShop';
import myBusinessFile from './slices/shop/display/displayAll';
import myNewProduct from './slices/shop/products/productSlice';
import cartedProduct from './slices/home/cart/fetchCart';
import addressSlice from './slices/home/checkout/fetch';
import feedback from './slices/home/feedback/loadFeedback';
import viewReducer from './slices/home/view/view';

export const myReducers = combineReducers({
    loginReducer: loginReducer,
    signUpReducer: signUpReducer,
    setShopReducer: setShopReducer,
    setOtpReducer: setOtpReducer,
    myBusinessFile: myBusinessFile,
    myNewProduct: myNewProduct,
    agentReducer: agentReducer,
    adminReducer: adminReducer,
    cartedProduct: cartedProduct,
    addressSlice: addressSlice,
    waitingProducts: waitingProducts,
    feedback: feedback,
    viewReducer: viewReducer
});
