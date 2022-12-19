import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TopTitle } from '../../../../components/SellerComponents/Dashboard/topTitle';
import { getActivities } from '../../../../state/slices/shop/overview';
import { Activities } from '../Overview/components';

const ActivitiesPage = ({ neededInfo }) => {
    const dispatch = useDispatch();
    const [activities, setActivities] = useState();
    console.log(activities);
    useEffect(() => {
        getActivities(
            dispatch,
            neededInfo.shopData.id,
            neededInfo.otpData.accessToken,
            setActivities
        );
    }, []);

    return (
        <section className="px-6 md:px-5 lg:w-[calc(100%-280px)] h-[90vh] w-full min-w-[80px] overflow-auto">
            <TopTitle
                header="Information"
                title="Activities"
                info="Most Recent List Of Activitie"
            />
            <div className="w-full mt-6">
                <Activities
                    activities={activities}
                    header="Recent Activities"
                    title="Most Recent List Of Activities"
                    shopOwner="Stephen"
                />
            </div>
        </section>
    );
};

export default ActivitiesPage;
