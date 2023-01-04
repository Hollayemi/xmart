import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DividerPanel from '../../../components/elements/DividerPanel';
import FloatingLabelInput from '../../../components/elements/Input/FloatingLabelInput';
import TextAreaGroup from '../../../components/elements/Input/TextAreaGroup';
import { newAddress } from '../../../state/slices/home/checkout';

const CreateNewAddress = ({ userId, setOpenAdd, openAdd, withNew }) => {
    const [leaveMessage, setLeaveMessage] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        first_name: '',
        last_name: '',
        surname: '',
        address: '',
        city: '',
        postal_code: '',
        state: '',
        phone_number: '',
    });

    let newValue = {};
    function updateValue(newVal, variable) {
        variable === 'title' && (newValue = { title: newVal });
        variable === 'first_name' && (newValue = { first_name: newVal });
        variable === 'last_name' && (newValue = { last_name: newVal });
        variable === 'surname' && (newValue = { surname: newVal });
        variable === 'address' && (newValue = { address: newVal });
        variable === 'city' && (newValue = { city: newVal });
        variable === 'state' && (newValue = { state: newVal });
        variable === 'postal_code' && (newValue = { postal_code: newVal });
        variable === 'phone_number' && (newValue = { phone_number: newVal });

        setFormData({
            ...formData,
            ...newValue,
            userId,
        });
    }
    const dispatch = useDispatch();
    const newAddressHandler = () => {
        const payload = {
            body: formData,
        };
        newAddress(payload, dispatch);
    };
    return (
        <>
            {withNew && <DividerPanel text="New Address" />}
            <div>
                <p className="text-sm font-[200] mb-3 text-slate-600 mt-4">
                    Personal Details
                </p>
                <div className="flex items-center">
                    <div className="w-1/2 px-2">
                        <FloatingLabelInput
                            required
                            label="Surname"
                            onChange={(e) =>
                                updateValue(e.target.value, 'surname')
                            }
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <FloatingLabelInput
                            required
                            label="First Name"
                            onChange={(e) =>
                                updateValue(e.target.value, 'first_name')
                            }
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-1/2 px-2">
                        <FloatingLabelInput
                            required
                            label="Last Name"
                            onChange={(e) =>
                                updateValue(e.target.value, 'last_name')
                            }
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <FloatingLabelInput
                            required
                            label="Phone Number"
                            type="number"
                            onChange={(e) =>
                                updateValue(e.target.value, 'phone_number')
                            }
                        />
                    </div>
                </div>
                <p className="text-sm font-[200] text-slate-600 mb-3 mt-4">
                    Shipping Details
                </p>
                <div className="w-1/2 px-2">
                    <FloatingLabelInput
                        required
                        label="Title"
                        onChange={(e) => updateValue(e.target.value, 'title')}
                    />
                </div>
                <div className="px-2">
                    <FloatingLabelInput
                        required
                        label="Address"
                        onChange={(e) => updateValue(e.target.value, 'address')}
                    />
                </div>
                <div className="flex items-center">
                    <div className="w-1/2 px-2">
                        <FloatingLabelInput
                            required
                            type="number"
                            label="Zip-code"
                            onChange={(e) =>
                                updateValue(e.target.value, 'postal_code')
                            }
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <FloatingLabelInput
                            required
                            label="City"
                            onChange={(e) =>
                                updateValue(e.target.value, 'city')
                            }
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-1/2 px-2">
                        <FloatingLabelInput
                            required
                            label="State"
                            onChange={(e) =>
                                updateValue(e.target.value, 'state')
                            }
                        />
                    </div>
                    <div className="w-1/2 -mt-7 px-2">
                        <div className="flex items-center mt-8">
                            <input
                                type="checkbox"
                                name="agreeToPrivacy"
                                id="agreeToPrivacy"
                                checked={leaveMessage}
                                onChange={() => setLeaveMessage(!leaveMessage)}
                            />
                            <label htmlFor="agreeToPrivacy" className="px-2">
                                Leave a message
                            </label>
                        </div>
                    </div>
                </div>
                <div className={`${leaveMessage ? 'block' : 'hidden'}`}>
                    <TextAreaGroup label=" " placeholder="Tell us something" />
                </div>
                <div className="flex justify-end px-4 mt-5">
                    <button
                        onClick={() => setOpenAdd(!openAdd)}
                        className="w-20 h-10 bg-slate-50 border rounded-md mr-4"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={newAddressHandler}
                        className="w-20 h-10 bg-green-600 text-white font-[400] border rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateNewAddress;
