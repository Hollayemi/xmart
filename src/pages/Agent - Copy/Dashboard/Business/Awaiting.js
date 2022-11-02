import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardWrapper from '../../../../components/AdminComponents';
import DrawerPanel from '../../../../components/elements/DrawerPanel';
import ViewProduct from '../../../../components/elements/DrawerPanel/drawerContent/viewProduct';
import { verifyAction } from '../../../../state/slices/admin/actions';
import { getAwaitingProducts } from '../../../../state/slices/admin/dashboard';
import { OneProduct } from '../../../seller/Dashboard/editProduct';

const Awaiting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [upDatedData, setData] = useState(false);
    const [view, setView] = useState(false);
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    const [data, setAwaiting] = useState(null);

    useEffect(() => {
        getAwaitingProducts(dispatch, setAwaiting, adminData, 1000);
    }, []);

    const verify = (arg, name, store, id) => {
        if (arg === 'approve') {
            verifyAction(dispatch, adminData, store, 1, name, id, setData);
        } else {
            verifyAction(dispatch, adminData, store, 0, name, id, setData);
        }
    };
    let fetchFrom = !upDatedData ? data : upDatedData;
    return (
        <DashboardWrapper>
            <section className="px-4 mt-8 py-3 min-h-screen mt-2">
                {fetchFrom &&
                    fetchFrom.map((res, index) => {
                        return (
                            <div key={index}>
                                <div className="Lucida flex items-center w-full  myScroll-x overflow-auto  my-2 mt-3 font-bold">
                                    <h5 className="min-w-fit">
                                        {res._id.title} ({res.total})
                                    </h5>
                                </div>
                                {res.details && (
                                    <OneProduct
                                        subCate={res.details}
                                        setShowing={null}
                                        setShowingInfo={null}
                                        setView={setView}
                                    />
                                )}
                            </div>
                        );
                    })}
                <DrawerPanel
                    placement="right"
                    title="Product Info"
                    size="xs"
                    children={
                        <ViewProduct id={view} verify={verify && verify} />
                    }
                    backdrop={true}
                    open={view && true}
                    handleClose={() => setView(false)}
                />
            </section>
        </DashboardWrapper>
    );
};

export default Awaiting;
