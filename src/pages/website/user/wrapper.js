import React, { useEffect } from 'react';
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SearchWrapper from '../../../components/websiteCompoents/ReuseableFlex';
import { toDashboard } from '../../../state/slices/shop/addShop';
import {
    AccountAdjustment,
    accountLinks1,
    NotRegPreview,
    StorePreview,
} from './component';

const UserWrapper = ({ children, type, userData, fullChild }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        !userData && navigate('/signin');
    }, []);
    return (
        <SearchWrapper>
            <section>
                <div className="w-full flex justify-between items-center px-1 md:px-12 h-12 border-b">
                    <div className="flex items-center leading-10">
                        <h5
                            onClick={() => window.history.back()}
                            className="text-blue-500 cursor-pointer mr-3 flex items-center"
                        >
                            <i className="mr-2">
                                <FaAngleLeft />
                            </i>
                            Back
                        </h5>
                        {userData.username}{' '}
                        <i className="ml-2">
                            <FaAngleDown />
                        </i>
                    </div>
                    <div>
                        {userData.isSeller ? (
                            <div
                                onClick={() =>
                                    toDashboard(userData, dispatch, navigate)
                                }
                                className="border border-slate-150 rounded-md shadow px-3 py-1"
                            >
                                Open Store
                            </div>
                        ) : (
                            <Link to="/seller/create-account/new/0">
                                <div className="border border-slate-150 rounded-md shadow px-3 py-1">
                                    Create New Store
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className=" flex flex-col flex-col-reverse sm:flex-row md:px-10 w-full md:w-[500px] lg:w-[calc(100%_-_400px)]">
                        {type === 'settings' && (
                            <AccountAdjustment
                                title="Account Settings"
                                links={accountLinks1}
                            />
                        )}
                        <div>{children}</div>
                    </div>
                    <div className="">
                        {userData?.isSeller ? (
                            <StorePreview userData={userData} />
                        ) : (
                            <NotRegPreview userData={userData} />
                        )}
                    </div>
                </div>
                {fullChild && fullChild}
            </section>
        </SearchWrapper>
    );
};

export default UserWrapper;
