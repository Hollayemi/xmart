import React from 'react';
import { useSelector } from 'react-redux';
import AddressBook from '../../checkout/address';
import UserWrapper from '../wrapper';

const MyAdresses = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    return (
        <UserWrapper>
            <div className="w-full">
                <AddressBook userId={userData._id} setAddress={() => {}} />
            </div>
        </UserWrapper>
    );
};

export default MyAdresses;
