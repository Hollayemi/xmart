import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import InputGroup from '../../../components/elements/Input/InputGroup';
import { imageHandler } from '../../../components/websiteCompoents/UploadFile/uploadProfilePic';
import { KemonCategories } from '../../../components/SellerComponents/ProfiePreview';
import { InputFile } from '../../../components/elements/Input/InputFile';
import DividerPanel from '../../../components/elements/DividerPanel';
import DrawerPanel from '../../../components/elements/DrawerPanel';

export const Step2 = ({ updateValue, formData, Category, setCategory }) => {
    const [open, setOpen] = useState(false);
    const [tinLabel, setTinLabel] = useState(null);
    const [cacLabel, setCacLabel] = useState(null);
    return (
        <>
            <div className="flex w-full">
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="CAC Registration Number"
                        value={formData.cacNum}
                        placeholder="44033434"
                        required
                        onChange={(e) =>
                            updateValue({ key: e.target.value }, 'CAC')
                        }
                    />
                </div>
                <div className="w-2/4 m-1">
                    <InputFile
                        title="CAC Certificate"
                        label={cacLabel || 'Upload certificate'}
                        icon={<FaFile />}
                        name="UploadCacNum"
                        onChange={(e) =>
                            imageHandler(
                                e,
                                updateValue,
                                ['image', 'application'],
                                'CAC',
                                setCacLabel
                            )
                        }
                    />
                </div>
            </div>

            <div className="flex w-full">
                <div className="w-2/4 m-1">
                    <InputGroup
                        label="Tax Identification Number"
                        value={formData.tinNum}
                        placeholder="44033434"
                        required
                        onChange={(e) =>
                            updateValue({ key: e.target.value }, 'TIN')
                        }
                    />
                </div>
                <div className="w-2/4 m-1">
                    <InputFile
                        title="TIN Certificate"
                        label={tinLabel || 'Upload certificate'}
                        icon={<FaFile />}
                        name="uploadTinNum"
                        onChange={(e) =>
                            imageHandler(
                                e,
                                updateValue,
                                ['image', 'application'],
                                'TIN',
                                setTinLabel
                            )
                        }
                    />
                </div>
            </div>
            <DividerPanel text="Store Primary Category" />
            <div className="flex items-center">
                <h5>Set Store Category: </h5>
                <button
                    onClick={() => {
                        setOpen(true);
                    }}
                    className="w-[170px] ml-8 h-8 font-[600] shadow rounded bg-slate-800 text-slate-50"
                >
                    Select Category
                </button>
            </div>
            <DrawerPanel
                placement="right"
                light
                title="Select Category"
                size="xs"
                children={
                    <KemonCategories
                        setValue={setCategory}
                        value={Category}
                        max={3}
                    />
                }
                backdrop
                open={open && true}
                handleClose={() => setOpen(false)}
            />
        </>
    );
};
