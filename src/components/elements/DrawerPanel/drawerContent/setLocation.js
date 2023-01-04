import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAddress } from '../../../../state/slices/shop/address';
import { editShopHandler } from '../../../../state/slices/shop/settings/editShop';
import Loading from '../../Loading';

const SetLocation = ({ shopData }) => {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [address, setAddress] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
                const data = {
                    lat: position.coords.latitude,
                    lon: position.coords.latitude,
                    key: 'bdc19c9b2a23467390028dd587dda962',
                };
                getAddress(data, dispatch, setAddress);
            });
        }
    }, []);

    const payload = {
        data: {
            coordinate: [
                {
                    lat,
                    lon,
                    address,
                },
            ],
        },
        shopID: shopData.data._id,
    };

    const editShopInfo = () => {
        editShopHandler(dispatch, payload);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between relative">
            <div className="w-[270px]">
                <div className="flex items-center w-full">
                    {/* {!address && } */}
                    <h5 className="font-[500] text-[15px]">
                        Current position address
                    </h5>
                </div>
                <div className="mt-5 text-slate-400 w-full">
                    <h5 className="mt-2">
                        Latitude:
                        {lat}
                    </h5>
                    <h5 className="mt-2">
                        Longitude:
                        {lon}
                    </h5>
                    <h5 className="mt-2">
                        Address: {address && address.formatted}
                    </h5>
                </div>
            </div>
            {address ? (
                <Loading speed="fast" size="md" />
            ) : (
                <button
                    onClick={editShopInfo}
                    className="px-3 h-8 py-1 bg-slate-100 w-28 text-slate-700 ml-[200px] rounded absolute top-0 right-0"
                >
                    Save Address
                </button>
            )}
        </div>
    );
};

export default SetLocation;
