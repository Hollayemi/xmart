import React from 'react';
import { AccountAdjustment, accountLinks1, accountLinks2 } from './component';
import UserWrapper from './wrapper';

const User = () => {
    return (
        <UserWrapper>
            <div className="h-40 flex items-center justify-center ">
                <h5>No Order Preview Available</h5>
            </div>
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
