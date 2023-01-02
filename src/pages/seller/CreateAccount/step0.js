import React from 'react';
import InputGroup from '../../../components/elements/Input/InputGroup';

export const Step0 = ({ updateValue, formData }) => {
    return (
        <>
            <div className="flex w-full">
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="Store Name"
                        name="ownerName"
                        value={formData.store}
                        placeholder="e.g xmart (a word)"
                        required={true}
                        onChange={(e) => updateValue(e.target.value, 'store')}
                    />
                </div>
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="Business Name"
                        value={formData.shopName}
                        placeholder="Xmart Book Store "
                        required={true}
                        onChange={(e) =>
                            updateValue(e.target.value, 'shopName')
                        }
                    />
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="Business Email"
                        value={formData.shopEmail}
                        placeholder="e.g info@xmart.com "
                        required={true}
                        onChange={(e) =>
                            updateValue(e.target.value, 'shopEmail')
                        }
                    />
                </div>
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="Business Line"
                        placeholder="e.g 07010010000 "
                        value={formData.shopLine}
                        required={true}
                        type="number"
                        onChange={(e) =>
                            updateValue(e.target.value, 'shopLine')
                        }
                    />
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="Referred by (referrer code)"
                        value={formData.referrer}
                        placeholder="referrer"
                        required={true}
                        onChange={(e) =>
                            updateValue(e.target.value, 'referrer')
                        }
                    />
                </div>
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="Business Line"
                        placeholder="e.g 07010010000 "
                        value={formData.shopLine}
                        required={true}
                        type="number"
                        onChange={(e) =>
                            updateValue(e.target.value, 'shopLine')
                        }
                    />
                </div>
            </div>
        </>
    );
};
