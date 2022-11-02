import React from 'react';
import { InputFile } from '../../elements/Input/InputFile';
import { FaPlus, FaUser } from 'react-icons/fa';
import { Avatar } from './avatar';
import DividerPanel from '../../elements/DividerPanel';
import { Message, toaster } from 'rsuite';

//
export const imageHandler = (
    e,
    updateValue,
    accept,
    myTarget,
    setLabel = null
) => {
    let preImg = null;
    let exactType = e.target.files[0].type.split('/');
    let getName = e.target.files[0].name.split('.');
    if (accept.includes(exactType[0])) {
        preImg = [URL.createObjectURL(e.target.files[0])];
        const reader = new FileReader();
        setLabel && setLabel(getName[0]);
        reader.onloadend = () => {
            let dataRez;
            if (myTarget !== 'avatar') {
                dataRez = reader.result;
                updateValue({ file: dataRez, isAvatar: false }, myTarget);
            } else {
                dataRez = {
                    display: preImg,
                    file: reader.result,
                    isAvatar: true,
                };
                updateValue(dataRez, myTarget);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    } else {
        toaster.push(
            <Message showIcon type="error">
                Inappropiate File, choose another file
            </Message>,
            { placement: 'topCenter' }
        );
    }
};

const UploadProfilePic = ({ formData, updateValue }) => {
    return (
        <div>
            {formData.avatar && (
                <img
                    src={formData.avatar.display}
                    alt="imageHere"
                    className="w-32 h-32 ml-5 rounded-full bg-slate-50"
                />
            )}
            {!formData.avatar && (
                <>
                    <h5 className="w-32 h-32 ml-5 relative rounded-full bg-slate-100 flex items-center justify-center text-5xl text-gray-400">
                        <FaUser />
                    </h5>
                </>
            )}
            <InputFile
                label="add picture"
                icon={<FaPlus />}
                name="uploadProfilePic2"
                onChange={(e) =>
                    imageHandler(e, updateValue, ['image'], 'avatar')
                }
            />
            <DividerPanel text="OR" />
            <div className="flex w-full justify-center items-center">
                {Avatar.map((res, index) => {
                    let displayData = {
                        display: res,
                        file: `avatar${index + 1}`,
                        isAvatar: true,
                    };
                    return (
                        <img
                            src={res}
                            key={index}
                            alt="Avatar"
                            className="w-14 h-14 rounded-full mx-1"
                            onClick={() => updateValue(displayData, 'avatar')}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default UploadProfilePic;
