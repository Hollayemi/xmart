import React from 'react';
import InputGroup from '../../../components/elements/Input/InputGroup';

const Step1 = ({ formData, updateValue }) => {
    return (
        <>
            <InputGroup
                label="Password"
                type="password"
                placeholder=" "
                required={true}
                value={formData.password}
                onChange={(e) => updateValue(e.target.value, 'password')}
                tooltip={
                    <ul className="p-1">
                        <li>Minimum of 6 characters</li>
                    </ul>
                }
            />
            <InputGroup
                label="Confirm Password"
                type="password"
                placeholder=" "
                value={formData.conf_pass}
                required={true}
                onChange={(e) => updateValue(e.target.value, 'conf_pass')}
                tooltip={
                    <ul className="p-1">
                        <li>Minimum of 6 characters</li>
                    </ul>
                }
            />
        </>
    );
};

export default Step1;
