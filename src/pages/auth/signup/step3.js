import React, { useState } from 'react';
import Button from '../../../components/elements/Button';
import { InputRadio } from '../../../components/elements/Input/InputFile';

const Step3 = ({ formData, updateValue, submitButton }) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    return (
        <>
            <div className="flex-col md:flex items">
                <InputRadio
                    name="Reason"
                    value="Agent"
                    label="To be an agent"
                    checked={formData.why_here === 'Agent'}
                    onChange={(e) => updateValue(e.target.value, 'why_here')}
                />
                <InputRadio
                    name="Reason"
                    value="online store"
                    label="To create online store"
                    checked={formData.why_here === 'online store'}
                    onChange={(e) => updateValue(e.target.value, 'why_here')}
                />
                <InputRadio
                    name="Reason"
                    value="Rendering Services"
                    label="Rendering Services"
                    checked={formData.why_here === 'Rendering Services'}
                    onChange={(e) => updateValue(e.target.value, 'why_here')}
                />
                <InputRadio
                    name="Reason"
                    value="To buy"
                    label="To buy"
                    checked={formData.why_here === 'To buy'}
                    onChange={(e) => updateValue(e.target.value, 'why_here')}
                />
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
