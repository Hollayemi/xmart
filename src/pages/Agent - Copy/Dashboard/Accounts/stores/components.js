import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Verification } from '../../../../../components/SellerComponents/Dashboard/RecentInfo';

export const ImageName = ({ storeData }) => {
    return (
        <div className="flex flex-col md:flex-col items-center justify-between pr-3 ">
            <div className="flex items-center">
                <img
                    src={storeData?.avatar.display}
                    className="w-32 h-32 rounded-full"
                    alt={storeData?.avatar.file}
                />
                <div className="flex flex-col items-start pt-4">
                    <h4 className="font-bold text-black text-lg">
                        {storeData.shopName}
                    </h4>
                    <h4 className="text-slate-400 text-sm flex items-center">
                        {storeData.shopEmail}{' '}
                        <a
                            href={`mailto: ${storeData.shopEmail}`}
                            className="text-blue-500 ml-5"
                        >
                            <FaEnvelope />
                        </a>
                    </h4>
                    <h4 className="text-slate-400 text-sm flex items-center">
                        {storeData.shopLine}{' '}
                        <a
                            href={`tel: ${storeData.shopLine}`}
                            className="text-blue-500 ml-5"
                        >
                            <FaPhoneAlt />
                        </a>
                    </h4>
                </div>
            </div>
            <Verification check={storeData.status} />
        </div>
    );
};
