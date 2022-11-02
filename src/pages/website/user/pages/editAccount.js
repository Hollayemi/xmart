import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputRadio } from '../../../../components/elements/Input/InputFile';
import InputGroup from '../../../../components/elements/Input/InputGroup';
import UploadProfilePic from '../../../../components/websiteCompoents/UploadFile/uploadProfilePic';
import { updateUserAccount } from '../../../../state/slices/users/updateAccount';
import UserWrapper from '../wrapper';

const EditAccount = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: userData._id,
        fullname: userData.fullname || '',
        username: userData.username || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        avatar: userData.avatar || null,
        why_here: userData.why_here || '',
    });
    let newValue = {};
    const updateValue = (newVal, variable) => {
        variable === 'fullname' && (newValue = { fullname: newVal });
        variable === 'username' && (newValue = { username: newVal });
        variable === 'email' && (newValue = { email: newVal });
        variable === 'phone' && (newValue = { phoneNumber: newVal });
        variable === 'avatar' && (newValue = { avatar: newVal });
        variable === 'why_here' && (newValue = { why_here: newVal });

        setFormData({
            ...formData,
            ...newValue,
        });
    };
    let auth = userData._id + ' ' + userData.accessToken;

    const updateAccount = () => {
        updateUserAccount(formData, auth, dispatch, navigate);
    };

    return (
        <UserWrapper type="settings">
            <section className="flex justify-center mt-4 md:ml-7 px-2">
                <div className="w-full max-w-[500px]">
                    <div className="mb-7">
                        <UploadProfilePic
                            updateValue={updateValue}
                            formData={formData}
                        />
                    </div>
                    <div className="flex w-full">
                        <div className="w-2/4 m-1">
                            <InputGroup
                                label="Name"
                                name="fullName"
                                placeholder=" "
                                value={formData.fullname}
                                required={true}
                                onChange={(e) =>
                                    updateValue(e.target.value, 'fullname')
                                }
                            />
                        </div>
                        <div className="w-2/4 m-1">
                            <InputGroup
                                label="Username"
                                placeholder=" "
                                required={true}
                                value={formData.username}
                                tooltip={
                                    <ul className="p-1">
                                        <li>Minimum of 6 characters</li>
                                    </ul>
                                }
                                onChange={(e) =>
                                    updateValue(e.target.value, 'username')
                                }
                            />
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-2/4 m-1">
                            <InputGroup
                                label="Email"
                                placeholder=" "
                                required={true}
                                value={formData.email}
                                onChange={(e) =>
                                    updateValue(e.target.value, 'email')
                                }
                            />
                        </div>
                        <div className="w-2/4 m-1">
                            <InputGroup
                                label="Phone number"
                                placeholder=" "
                                required={true}
                                type="number"
                                max={11}
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    updateValue(e.target.value, 'phone')
                                }
                                tooltip={
                                    <ul className="p-1">
                                        <li>Maximum of 11 characters</li>
                                    </ul>
                                }
                            />
                        </div>
                    </div>
                    <div
                        onChange={(e) =>
                            updateValue(e.target.value, 'why_here')
                        }
                        className="flex-col md:flex items"
                    >
                        <InputRadio
                            name="Reason"
                            value="To become an agent"
                            label="To be an agent"
                            checked={formData.why_here === 'To become an agent'}
                        />
                        <InputRadio
                            name="Reason"
                            value="To Create online store"
                            label="To create online store"
                            checked={
                                formData.why_here === 'To Create online store'
                            }
                        />
                        <InputRadio
                            name="Reason"
                            value="To buy"
                            label="To buy"
                            checked={formData.why_here === 'To buy'}
                        />
                    </div>
                    <div className="flex justify-center ">
                        <button
                            onClick={updateAccount}
                            className="bg-slate-700 text-slate-100 px-10 py-2 rounded-md"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </section>
        </UserWrapper>
    );
};

export default EditAccount;
