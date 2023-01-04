import React from 'react';
import InputGroup from '../../../components/elements/Input/InputGroup';

export const Step1 = ({ updateValue, formData }) => (
    <>
        <div className="flex w-full">
            <div className="w-2/4 m-1">
                <InputGroup
                    label="City"
                    name="ownerName"
                    value={formData.city}
                    placeholder=" "
                    required
                    onChange={(e) => updateValue(e.target.value, 'city')}
                />
            </div>
            <div className="w-2/4 m-1">
                <InputGroup
                    label="State"
                    value={formData.state}
                    placeholder=" "
                    required
                    onChange={(e) => updateValue(e.target.value, 'state')}
                />
            </div>
        </div>
        <div className="flex w-full">
            <div className="w-2/4 m-1">
                <InputGroup
                    label="Postal Code"
                    value={formData.postalCode}
                    placeholder=" "
                    type="number"
                    required
                    onChange={(e) => updateValue(e.target.value, 'postalCode')}
                />
            </div>
            <div className="w-2/4 m-1">
                <InputGroup
                    label="Landmark"
                    placeholder="e.g Opposite GTB bank "
                    value={formData.landmark}
                    required
                    onChange={(e) => updateValue(e.target.value, 'buzz_lndmk')}
                />
            </div>
        </div>
        <InputGroup
            label="Location"
            placeholder=" "
            value={formData.location}
            required
            onChange={(e) => updateValue(e.target.value, 'buzz_loc')}
        />
    </>
);
