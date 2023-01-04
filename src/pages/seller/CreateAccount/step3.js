import React from 'react';
import Button from '../../../components/elements/Button';
import UploadProfilePic from '../../../components/websiteCompoents/UploadFile/uploadProfilePic';

export const Step3 = ({
    updateValue,
    formData,
    allowRegister,
    setAgreedToTerms,
    submitButton,
    agreedToTerms,
}) => (
    <>
        <div>
            <UploadProfilePic updateValue={updateValue} formData={formData} />
        </div>
        <div className="flex items-center mt-12 sm:mt-8">
            <input
                type="checkbox"
                name="agreeToPrivacy"
                id="agreeToPrivacy"
                checked={allowRegister}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
            />

            <label htmlFor="agreeToPrivacy" className="px-2">
                I agree to both The Terms and Privacy Policy
            </label>
        </div>
        <Button
            btnClass="h-10 rounded mt-4 w-full justify-center"
            onClick={submitButton}
            disabled={agreedToTerms === allowRegister}
        />
    </>
);
