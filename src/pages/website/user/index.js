import React from 'react';
import { useSelector } from 'react-redux';
import { AccountAdjustment, accountLinks1, accountLinks2 } from './component';
import RecentView from './recentView';
import UserWrapper from './wrapper';

const User = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    return (
        <UserWrapper userData={userData} fullChild={<RecentView userData={userData} />}>
            <div className="w-full flex flex-col md:flex-row">
                <AccountAdjustment
                    title="Account Settings"
                    links={accountLinks1}
                />
                <AccountAdjustment
                    title="Account Security"
                    links={accountLinks2}
                />
            </div>
        </UserWrapper>
    );
};

export default User;
