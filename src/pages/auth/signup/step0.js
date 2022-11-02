import React from 'react';
import InputGroup from '../../../components/elements/Input/InputGroup';

const Step0 = ({ formData, updateValue }) => {
    return (
        <>
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
                        onChange={(e) => updateValue(e.target.value, 'email')}
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
                        onChange={(e) => updateValue(e.target.value, 'phone')}
                        tooltip={
                            <ul className="p-1">
                                <li>Maximum of 11 characters</li>
                            </ul>
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default Step0;
