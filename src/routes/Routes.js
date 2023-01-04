import { Navigate as Redirect, useRoutes } from 'react-router-dom';
import LazyLoading from '../components/LazyLoading';
import Activities from '../pages/Agent - Copy/Dashboard/Accounts/stores/Activities';
import RandomSearch from '../pages/website/containers/randomSearch';

const NotFound = LazyLoading(() => import('../pages/NotFound'));
const AuthOutlet = LazyLoading(() => import('../components/HOC/AuthOutlet'));
const AdminOutlet = LazyLoading(() => import('../components/HOC/AdminOutlet'));

const ErorrBoundary = LazyLoading(() =>
    import('../components/HOC/ErrorBoundary')
);

const Home = LazyLoading(() => import('../pages/website/Home'));
const SearchCategory = LazyLoading(() =>
    import('../pages/website/containers/searchCategories')
);
const SearchBrands = LazyLoading(() =>
    import('../pages/website/containers/searchGroup')
);
const ProdContainter = LazyLoading(() =>
    import('../pages/website/containers/products')
);
const Checkout = LazyLoading(() => import('../pages/website/checkout'));
const Cart = LazyLoading(() => import('../pages/website/cart'));
const UserDashboard = LazyLoading(() => import('../pages/website/user'));
const MyAdresses = LazyLoading(() =>
    import('../pages/website/user/pages/addresses')
);
const MyPickup = LazyLoading(() =>
    import('../pages/website/user/pages/pickup_person')
);
const MyNotification = LazyLoading(() =>
    import('../pages/website/user/pages/notification')
);

const EditAccount = LazyLoading(() =>
    import('../pages/website/user/pages/editAccount')
);

const Communication = LazyLoading(() =>
    import('../pages/website/user/pages/communication')
);

const MyOrders = LazyLoading(() =>
    import('../pages/website/user/pages/orders')
);

//
// auth Routes
const SignUp = LazyLoading(() => import('../pages/auth/signup/SignUp'));
const SignIn = LazyLoading(() => import('../pages/auth/signin'));
const ForgotPass = LazyLoading(() => import('../pages/auth/forgot-password'));
const ResetPassword = LazyLoading(() => import('../pages/auth/resetPassword'));
const EmailSent = LazyLoading(() =>
    import('../pages/auth/forgot-password/successMessage')
);
const Sell = LazyLoading(() => import('../pages/seller/seller/Home'));
const Agent = LazyLoading(() => import('../pages/Agent/website/Home'));

// admin page
const AdminLogin = LazyLoading(() =>
    import('../pages/Agent - Copy/website/Login')
);
const AdminSignup = LazyLoading(() =>
    import('../pages/Agent - Copy/website/Signup')
);

const AdminForgotPassword = LazyLoading(() =>
    import('../pages/Agent - Copy/website/ForgotPass')
);
const AdminGen = LazyLoading(() => import('../pages/Agent - Copy/Dashboard'));
const AwaitingProduct = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Business/Awaiting')
);
const AllOrder = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Orders')
);
const XmartOverview = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Overview')
);
const AllStores = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Accounts/stores')
);
const StoreInfo = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Accounts/stores/details')
);
const AdminProdList = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Accounts/stores/productList')
);

const AllUsers = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Accounts/users')
);

const AllAgents = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Accounts/agents')
);

// sellerPage
const CreateAccount = LazyLoading(() =>
    import('../pages/seller/CreateAccount')
);
const SellerDashboard = LazyLoading(() => import('../pages/seller/Dashboard'));
const Activation = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/activation')
);
const Confirmation = LazyLoading(() =>
    import('../pages/Agent - Copy/Dashboard/Accounts/agents/confirmation')
);
// Agent Page
const NewAgent = LazyLoading(() => import('../pages/Agent/newAgent.js'));
const AgentDashboard = LazyLoading(() => import('../pages/Agent/Dashboard'));

//
const AppRoutes = () => {
    let allRoutes = useRoutes([
        {
            path: '/',
            children: [
                {
                    element: <Home />,
                    index: true,
                },
                { path: '/signin', element: <SignIn /> },
                {
                    path: '/signup',
                    element: <SignUp />,
                },
                {
                    path: '/forgot-password',
                    element: <ForgotPass />,
                },
                {
                    path: '/email-sent',
                    element: <EmailSent />,
                },
                {
                    path: '/resetpassword',
                    element: <ResetPassword />,
                },
                {
                    path: '/s/:category',
                    element: <SearchCategory />,
                },
                {
                    path: '/s/:category/:brand',
                    element: <SearchBrands />,
                },
                {
                    path: '/search/:search',
                    element: <RandomSearch />,
                },
                {
                    path: '/b/:shop/:product',
                    element: <ProdContainter />,
                },
                { path: '/forgot-password', element: <SignUp /> },
            ],
        },
        {
            path: '/',
            element: <AuthOutlet />,
            children: [
                {
                    path: '/checkout',
                    element: <Checkout />,
                },
                {
                    path: '/cart',
                    element: <Cart />,
                },
                {
                    path: '/my-orders',
                    element: <MyOrders />,
                },
            ],
        },
        {
            path: '/site',
            element: <AuthOutlet to="site/user/account" />,
            children: [
                { element: <Redirect to="/site/user/account" />, index: true },
                { path: 'user/account', element: <UserDashboard /> },
                { path: 'user/account/addresses', element: <MyAdresses /> },
                {
                    path: 'user/account/add-a-pickup-person',
                    element: <MyPickup />,
                },
                {
                    path: 'user/account/notifications',
                    element: <MyNotification />,
                },
                {
                    path: 'user/account/change-account-information',
                    element: <EditAccount />,
                },
                {
                    path: 'user/account/communication-preferences',
                    element: <Communication />,
                },
            ],
        },
        {
            path: '/seller',
            element: <AuthOutlet to="seller" />,
            children: [
                { element: <Sell />, index: true },
                {
                    path: '/seller/create-account/:store/:agent',
                    element: <CreateAccount />,
                },
                {
                    path: '/seller/dashboard',
                    element: <SellerDashboard />,
                },
                {
                    path: 'seller/sell',
                    element: <Sell />,
                },
            ],
        },
        {
            path: '/agent',
            element: <AuthOutlet to="agent" />,
            children: [
                { element: <Agent />, index: true },
                {
                    path: '/agent/new-agent',
                    element: <NewAgent />,
                },
                { element: <AgentDashboard />, path: 'dashboard/:showing' },
            ],
        },
        {
            path: '/admin',
            children: [
                { element: <AdminLogin />, index: true },
                {
                    path: '/admin/signup',
                    element: <AdminSignup />,
                },
                {
                    element: <AdminForgotPassword />,
                    path: '/admin/forgot-password',
                },
                {
                    element: <AdminLogin />,
                    path: '/admin/login',
                },
                {
                    element: <AdminOutlet to="admin" />,
                    path: '/admin/dashboard',
                    children: [
                        {
                            element: <XmartOverview />,
                            index: true,
                        },
                        {
                            element: <Activation />,
                            path: '/admin/dashboard/activation',
                        },
                        {
                            path: '/admin/dashboard/confirmation',
                            element: <Confirmation />,
                        },
                        {
                            path: '/admin/dashboard/:section',
                            element: <AdminGen />,
                        },
                        {
                            path: '/admin/dashboard/stores/product-list',
                            element: <AdminProdList />,
                        },
                        {
                            path: '/admin/dashboard/stores/store-info',
                            element: <StoreInfo />,
                        },
                        {
                            path: '/admin/dashboard/stores',
                            element: <AllStores />,
                        },
                        {
                            path: '/admin/dashboard/users',
                            element: <AllUsers />,
                        },
                        {
                            path: '/admin/dashboard/agents',
                            element: <AllAgents />,
                        },
                        {
                            path: '/admin/dashboard/all-orders',
                            element: <AllOrder />,
                        },
                        {
                            path: '/admin/dashboard/stores/activities',
                            element: <Activities />,
                        },
                        {
                            path: '/admin/dashboard/stores/awaiting',
                            element: <AwaitingProduct />,
                        },
                    ],
                },
            ],
        },
        {
            path: '/error/:codeErr',
            element: <ErorrBoundary />,
        },
        // {
        //     path: '/yomi/Dashboard',
        //     element: <BossDashboard />,
        // },

        {
            // =======
            // >>>>>>> 74763df8bbd4e67e19856d0a4e6a726ba0362df9
            path: '*',
            element: <NotFound />,
        },
    ]);
    return allRoutes;
};

export default AppRoutes;
