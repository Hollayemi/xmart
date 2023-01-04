import React, { useState } from 'react';
import {
    FaAt,
    FaEnvelopeOpenText,
    FaFacebook,
    FaPen,
    FaPhone,
    FaWhatsapp,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectPicker } from 'rsuite';
import FloatingLabelInput from '../../../../components/elements/Input/FloatingLabelInput';
import { InputRadio } from '../../../../components/elements/Input/InputFile';
import { updateUserAccount } from '../../../../state/slices/users/updateAccount';
import { Languages } from '../component';
import UserWrapper from '../wrapper';

const PhoneNumbers = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    console.log(userData);
    const [lang, setLang] = useState(
        userData.comm.language || Languages[0].value
    );
    const [prefMedium, setMedium] = useState(userData.comm.prefMedium);
    const [formData, setFormData] = useState({});
    const newPayLoad = {
        id: userData._id,
        comm: {
            whatsapp: userData.comm.whatsapp,
            facebook: userData.comm.facebook,
            ...formData,
            language: lang,
            prefMedium,
        },
    };
    console.log(newPayLoad);
    const auth = `${userData._id} ${userData.accessToken}`;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateAccount = () => {
        updateUserAccount(newPayLoad, auth, dispatch, navigate);
    };
    let newValue = {};
    const updateValue = (newVal, variable) => {
        variable === 'whatsapp' && (newValue = { whatsapp: newVal });
        variable === 'facebook' && (newValue = { facebook: newVal });
        setFormData({
            ...formData,
            ...newValue,
        });
    };
    return (
        <UserWrapper type="settings">
            <section className="py-5 px-3 w-full md:max-w-[600px]">
                <div className="py-4 flex items-center w-full  border-b">
                    <h5 className="mr-4 font-black">Language: </h5>
                    <SelectPicker
                        data={Languages}
                        label=" "
                        className="w-48 bg-slate-100"
                        size="sm"
                        value={lang}
                        placeholder="Select Language"
                        onChange={(e) => setLang(e)}
                        onClean={(e) => setLang(Languages[0].value)}
                    />
                </div>
                <h5 className="mr-4 font-black pt-4">
                    Choose prefered way we can contact you
                </h5>
                <div className="flex-col md:flex items">
                    <div className="mt-4 ml-1 md:ml-4">
                        <InputRadio
                            name="comm"
                            value="Calling and texting"
                            label={
                                <h5 className="text-[14px] pt-1">
                                    Phone Calling & Text Messaging
                                </h5>
                            }
                            onChange={(e) => setMedium('Calling and texting')}
                            checked={prefMedium === 'Calling and texting'}
                        />
                        <div className="flex flex-wrap items-center">
                            <Medium
                                icon={<FaPhone />}
                                info={userData.phoneNumber}
                                color="blue"
                            />
                            <Medium
                                icon={<FaEnvelopeOpenText />}
                                info={userData.phoneNumber}
                                color="blue"
                            />
                        </div>
                    </div>
                    <div className="mt-4 ml-1 md:ml-4">
                        <InputRadio
                            name="comm"
                            value="Email"
                            label={<h5 className="text-md pt-1">Email</h5>}
                            onChange={(e) => setMedium('Email')}
                            checked={prefMedium === 'Email'}
                        />
                        <div className="flex flex-wrap items-center">
                            <Medium
                                icon={<FaAt />}
                                color="pink"
                                info={userData.email}
                            />
                        </div>
                    </div>
                    <div className="mt-4 ml-1 md:ml-4">
                        <InputRadio
                            name="comm"
                            value="Social Media"
                            label={
                                <h5 className="text-[14px] pt-1">
                                    Social Media
                                </h5>
                            }
                            onChange={(e) => setMedium('Social Media')}
                            checked={prefMedium === 'Social Media'}
                        />
                        <div className="flex flex-wrap tems-center">
                            <Medium
                                icon={<FaWhatsapp />}
                                info={userData.comm.whatsapp}
                                color="green"
                                name="whatsapp"
                                formData={formData}
                                updateValue={updateValue}
                            />
                            <Medium
                                icon={<FaFacebook />}
                                info={userData.comm.facebook}
                                color="blue"
                                name="facebook"
                                formData={formData}
                                updateValue={updateValue}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center md:float-right my-4 mr-3">
                        <button
                            onClick={() => window.history.back()}
                            className="w-28 mr-2 h-8 bg-slate-150 rounded-md border text-slate-400 "
                        >
                            Go Back
                        </button>
                        <button
                            onClick={updateAccount}
                            className="w-28 mr-2 h-8 bg-slate-700 rounded-md text-slate-100"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </section>
        </UserWrapper>
    );
};

export default PhoneNumbers;

const Medium = ({ icon, info, color, name, updateValue, formData }) => {
    const [edit, setEdit] = useState(false);
    return (
        <div className="flex mr-1 md:mr-3 items-center h-10 max-w-fit my-3 px-3 bg-slate-200 rounded-md">
            <div
                className={`flex items-center justify-center text-lg bg-${color}-500 px-1 text-white w-9 h-8 rounded-full`}
            >
                {icon}
            </div>
            {name && (
                <FloatingLabelInput
                    label=" "
                    size="sm"
                    placeholder={`${name} url`}
                    value={!formData[name] ? info : formData[name]}
                    disabled={!edit}
                    onChange={(e) => updateValue(e.target.value, name)}
                    className={`py-0 m-0 w-36 bg-transparent h-7 ml-2 px-2 mt-6 ${
                        edit && 'border'
                    } border-slate-400`}
                />
            )}
            {!name && <h5 className="ml-8 font-black">{info}</h5>}
            {name && (
                <i
                    onClick={() => setEdit(!edit)}
                    className="h-8 text-[10px] ml-1 flex items-center justify-center rounded-full"
                >
                    <FaPen />
                </i>
            )}
        </div>
    );
};
