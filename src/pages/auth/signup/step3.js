import React from 'react';
import { useState } from 'react';
import Button from '../../../components/elements/Button';
import { InputRadio } from '../../../components/elements/Input/InputFile';

const Step3 = ({ formData, updateValue, submitButton }) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    return (
        <>
            <div
                onChange={(e) => updateValue(e.target.value, 'why_here')}
                className="flex-col md:flex items"
            >
                <InputRadio
                    name="Reason"
                    value="To become an agent"
                    label="To be an agent"
                />
                <InputRadio
                    name="Reason"
                    value="To Create online store"
                    label="To create online store"
                />
                <InputRadio name="Reason" value="To buy" label="To buy" />
            </div>
            <div className="flex items-center mt-8">
                <input
                    type="checkbox"
                    name="agreeToPrivacy"
                    id="agreeToPrivacy"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                />
                <label htmlFor="agreeToPrivacy" className="px-2">
                    I agree to the Terms both Privacy Policy
                </label>
            </div>
            <Button
                btnClass="h-10 rounded mt-4 w-full justify-center"
                onClick={submitButton}
                disabled={!agreedToTerms}
            />
        </>
    );
};

export default Step3;
