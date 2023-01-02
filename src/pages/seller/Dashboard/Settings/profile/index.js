import React, { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'rsuite';
// import Store from '../../../../assets/images/png/my store.png';
import InputGroup from '../../../../../components/elements/Input/InputGroup';
import { TopTitle } from '../../../../../components/SellerComponents/Dashboard/topTitle';
import { editShopHandler } from '../../../../../state/slices/shop/settings/editShop';
const StoreProfile = ({ neededInfo }) => {
    const { shopData } = useSelector((state) => state.reducer.setShopReducer);
    const { _id, isVerified, shopName, shopEmail, shopLine, Location } =
        shopData?.data;
    const [edit, setEdit] = useState(false);
    console.log(shopData);
    const [formData, setFormData] = useState({
        shopName,
        shopEmail,
        shopLine,
        street: Location[0].street,
        city: Location[0].city,
        state: Location[0].state,
        postalCode: Location[0].postalCode,
        landmark: Location[0].landmark,
    });

    const texts = {
        0: 'Not Rated',
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    let newValue = {};
    function updateValue(newVal, variable) {
        variable === 'shop_name' && (newValue = { shopName: newVal });
        variable === 'buzz_email' && (newValue = { shopEmail: newVal });
        variable === 'buzz_line' && (newValue = { shopLine: newVal });
        variable === 'Location' && (newValue = { street: newVal });
        variable === 'buzz_city' && (newValue = { city: newVal });
        variable === 'buzz_state' && (newValue = { state: newVal });
        variable === 'buzz_postal' && (newValue = { postalCode: newVal });
        variable === 'buzz_landmark' && (newValue = { landmark: newVal });

        setFormData({
            ...formData,
            ...newValue,
        });
    }
    const dispatch = useDispatch();
    const payload = {
        data: {
            ...formData,
        },
        shopID: _id,
    };

    const editShopInfo = () => {
        editShopHandler(dispatch, payload);
    };
    return (
        <section className="overflow-x-auto lg:w-[calc(100%-280px)] pb-10">
            <div className="flex flex-col min-w-[270px] items-center mx-1 md:mx-5 rounded-md">
                <TopTitle
                    header="Overview"
                    title="Store Profile"
                    info="Update/edit your account and profile settings"
                />
                <div className="flex flex-col xl:flex-row w-full mt-6 flex-col-reverse">
                    <div className="w-full bg-slate-50 pb-6 rounded-md">
                        <h3 className="border-b w-full leading-10 text-md px-3 flex justify-between items-center px-5 text-sm">
                            <p>Store Profile</p>
                            <i
                                onClick={() => setEdit(!edit)}
                                className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                            >
                                <FaUserEdit />
                            </i>
                        </h3>
                        <div className="mt-10">
                            <div className="flex items-center mt-4">
                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="Business Name"
                                        name="buzz_name"
                                        value={formData.shopName}
                                        placeholder=" "
                                        disabled={!edit}
                                        required={edit}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'shop_name'
                                            )
                                        }
                                    />
                                </div>

                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="Business Email"
                                        name="buzz_email"
                                        placeholder=" "
                                        value={formData.shopEmail}
                                        disabled={!edit}
                                        required={edit}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'buzz_email'
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center mt-4">
                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="Business Line"
                                        name="buzz_line"
                                        placeholder=" "
                                        value={formData.shopLine}
                                        disabled={!edit}
                                        required={edit}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'buzz_line'
                                            )
                                        }
                                    />
                                </div>

                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="State"
                                        name="State"
                                        placeholder=" "
                                        disabled={!edit}
                                        value={formData.state}
                                        required={edit}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'buzz_state'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="City"
                                        name="buzz_city"
                                        placeholder=" "
                                        value={formData.city}
                                        disabled={!edit}
                                        required={edit}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'buzz_city'
                                            )
                                        }
                                    />
                                </div>

                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="Postal Code"
                                        name="Postal"
                                        placeholder=" "
                                        disabled={!edit}
                                        value={formData.postalCode}
                                        required={edit}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'buzz_postal'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="Landmark"
                                        name="Landmark"
                                        placeholder=" "
                                        disabled={!edit}
                                        required={edit}
                                        value={formData.landmark}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'buzz_landmark'
                                            )
                                        }
                                    />
                                </div>

                                <div className="w-full md:w-2/3 px-2">
                                    <InputGroup
                                        label="Location in full"
                                        name="Location"
                                        placeholder=" "
                                        disabled={!edit}
                                        required={edit}
                                        value={formData.street}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'Location'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="px-4">
                                <button
                                    disabled={!edit}
                                    onClick={editShopInfo}
                                    className="w-full h-10 rounded-md shadow text-white text-lg bg-slate-800"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-2/5 mb-5 bg-slate-50 xl:ml-5 rounded-md p-2 py-4 ">
                        <h5 className="font-bold text-black text-md">
                            Your Account Status
                        </h5>
                        <div className="w-full flex flex-row xl:flex-col flex-wrap mt-4">
                            <div className="w-40 mb-3">
                                <h5 className="text-slate-600 text-md mb-1">
                                    Store
                                </h5>
                                <div
                                    className={`h-8 w-full rounded-md px-3 flex items-center justify-center bg-${
                                        isVerified ? 'green' : 'red'
                                    }-500 text-white`}
                                >
                                    {isVerified
                                        ? 'Store Verified'
                                        : 'Store Not Verified'}
                                </div>
                            </div>
                            <div className="mb-3 ml-3 xl:ml-0">
                                <h5 className="text-slate-600 text-md mb-1">
                                    Store Rating
                                </h5>
                                <Rate
                                    defaultValue={4}
                                    size="xs"
                                    onChangeActive={() => {}}
                                />{' '}
                                <span>( {texts[4]} )</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoreProfile;
