import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardWrapper from '../../../components/SellerComponents/Dashboard';
import Collections from './Collections';
import Brand from './Brands';
import Products from './Products';
import { storeFiles } from '../../../state/slices/shop/display/displayAll';
import ModalPanel from '../../../components/elements/ModalPanel';
import MyOtpModal from '../../../components/elements/OtpVerification';
import PasswordVerification from '../../../components/elements/OtpVerification/passwordVerification';
import { REQUEST_STATUS } from '../../../state/slices/constants';
import otpPic from '../../../assets/images/png/otp.png';
import PurchaseBrand from './xtar/X_brand';
import PurchaseCollection from './xtar/X_collection';
import PurchaseProduct from './xtar/X_product';
// import PurchaseMemory from './xtar/X_memory';
import Unsupplied from './Status/Unsupplied';
import Carted from './Status/Carted';
import Supplied from './Status/Supplied';
import StoreProfile from './Settings/profile';
import Analytics from './Analytics';
import Overview from './Overview';
import EntryMode from './Settings/entryMode';
import ReferenceKey from './Settings/referenceKey';
import ActivitiesPage from './Settings/activities';
import EditProduct from './editProduct';
import { useNavigate } from 'react-router-dom';
import DrawerPanel from '../../../components/elements/DrawerPanel';
import SetLocation from '../../../components/elements/DrawerPanel/drawerContent/setLocation';
import { Loader } from 'rsuite';

const Dashboard = () => {
    const loadThisPage =
        localStorage.getItem('save_page_for_later') || '0_Analytics';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [agreedToTerms, setAgreedToTerms] = useState(true);
    const [showing, pageSetter] = useState(loadThisPage);
    const [showingInfo, setShowingInfo] = useState(null);
    const [files, setFiles] = useState(null);
    const [OpenDrawer, setOpenDrawer] = useState(true);
    const splitedShowing = showing.split('_');
    let myBreadcrumb = [
        { name: 'Dashboard', link: '/' },
        { name: splitedShowing[1], link: '/' },
    ];
    if (splitedShowing.length > 1 && splitedShowing[0] !== '0') {
        myBreadcrumb = [
            { name: 'Dashboard', link: '/' },
            { name: splitedShowing[0], link: '/' },
            { name: splitedShowing[1], link: '/' },
        ];
    }
    const { otpStatus, otpData } = useSelector(
        (state) => state.reducer.setOtpReducer
    );
    const { shopData } = useSelector((state) => state.reducer.setShopReducer);

    const reLoad = () => {
        storeFiles(shopData.id, otpData, dispatch, setFiles);
    };
    useEffect(() => {
        if (!shopData) {
            navigate('/seller');
        }
        reLoad(setFiles);
    }, []);
    const setShowing = (page) => {
        localStorage.setItem('save_page_for_later', page);
        pageSetter(page);
    };
    const neededInfo = {
        otpStatus: otpStatus,
        otpData: otpData,
        shopData: shopData,
        setFiles: setFiles,
        reFetchData: reLoad,
    };
    const myBrandData = [];
    files?.myBrands?.map((res) => {
        let myBrand = {
            value:
                res.brandName +
                '$$' +
                res.brandCollection +
                '$$' +
                res.sub_category,
            label: res.brandName,
        };
        myBrandData.push(myBrand);
        return true;
    });
    const MyLoader = () => (
        <div className="w-full h-[400px] flex justify center items-center">
            <Loader />
        </div>
    );

    let displaying = <Overview neededInfo={neededInfo} />;

    switch (splitedShowing[1]) {
        case 'Dashboard':
            displaying = <Overview neededInfo={neededInfo} />;
            break;
        case 'Analytics':
            displaying = <Analytics neededInfo={neededInfo} />;
            break;
        case 'Brands':
            displaying = files ? (
                <Brand
                    neededInfo={neededInfo}
                    myBrands={files.myBrands}
                    loadedCateg={files.myCategories}
                    setShowing={setShowing}
                />
            ) : (
                <MyLoader />
            );
            break;
        case 'Collections':
            displaying = files ? (
                <Collections
                    collections={files.myCategories}
                    neededInfo={neededInfo}
                />
            ) : (
                <MyLoader />
            );
            break;
        case 'Products':
            displaying = files ? (
                <Products
                    myBrandData={myBrandData}
                    dispatch={dispatch}
                    allProducts={files.myProducts}
                    neededInfo={neededInfo}
                    showingInfo={showingInfo}
                />
            ) : (
                <MyLoader />
            );
            break;
        case 'My store':
            displaying = (
                <EditProduct
                    setShowing={setShowing}
                    store={neededInfo.shopData.data.store}
                    setShowingInfo={setShowingInfo}
                />
            );
            break;
        case 'Xtra Brand':
            displaying = <PurchaseBrand shopData={shopData} />;
            break;
        case 'Xtra Product':
            displaying = <PurchaseProduct shopData={shopData} />;
            break;
        case 'Xtra Collection':
            displaying = <PurchaseCollection shopData={shopData} />;
            break;
        case 'Unsupplied Products':
            displaying = <Unsupplied />;
            break;
        case 'Carted Products':
            displaying = <Carted />;
            break;
        case 'Supplied Products':
            displaying = <Supplied />;
            break;
        case 'Edit Store Info':
            displaying = <StoreProfile neededInfo={neededInfo} />;
            break;
        case 'Entry Mode':
            displaying = <EntryMode neededInfo={neededInfo} />;
            break;
        case 'Transactions':
            displaying = <ReferenceKey id={shopData.id} />;
            break;
        case 'Activities':
            displaying = <ActivitiesPage neededInfo={neededInfo} />;
            break;
        default:
            break;
    }
    return (
        <div className="bg-slate-300">
            <DashboardWrapper
                danger="mainly"
                BreadcrumbList={myBreadcrumb}
                setShowing={setShowing}
                showing={showing}
                shopInfo={shopData.data}
                otpData={otpData}
                prodNum={files?.allProducts?.length}
            >
                {files && displaying}
                {otpStatus !== REQUEST_STATUS.VERIFIED && (
                    <ModalPanel
                        title="Dashboard Authorization"
                        children={
                            shopData.data.entryMode === 'otp' ? (
                                <MyOtpModal
                                    otpPic={otpPic}
                                    id={shopData.data._id}
                                    title="Enter verification code"
                                    note={`we have just sent a verification code to
                                            ${shopData.data.shopEmail} and it expires in 1hour`}
                                />
                            ) : (
                                <PasswordVerification id={shopData.id} />
                            )
                        }
                        hasBackdrop={true}
                        keyboard={true}
                        open={agreedToTerms}
                        buttonName="Varify Code"
                        handleClose={() => setAgreedToTerms(!agreedToTerms)}
                    />
                )}
                {shopData.data && !shopData.data.Location[1].coordinates && (
                    <DrawerPanel
                        placement="bottom"
                        title="Shop Current Location"
                        size="xs"
                        children={<SetLocation shopData={shopData} />}
                        backdrop={true}
                        open={OpenDrawer}
                        handleClose={() => setOpenDrawer(false)}
                    />
                )}
            </DashboardWrapper>
        </div>
    );
};

export default Dashboard;
