import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaPlus, FaTrash, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import FloatingLabelInput from '../../../../components/elements/Input/FloatingLabelInput';
import ModalPanel from '../../../../components/elements/ModalPanel';
import {
    addPickupPerson,
    deletePickupPerson,
    getPickupPerson,
} from '../../../../state/slices/users/pickup';
import UserWrapper from '../wrapper';

const PickupPerson = () => {
    const [data, setData] = useState(null);
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch();
    let auth = userData._id + ' ' + userData.accessToken;

    useEffect(() => {
        getPickupPerson(userData._id, auth, dispatch, setData);
    }, []);

    const deleteOne = (id) => {
        deletePickupPerson(id, auth, dispatch, setData);
    };

    console.log(data);

    return (
        <UserWrapper type="settings">
            <div>
                <h5 className="m-3">Your Pickup Agents</h5>
                <div className="flex flex-wrap w-full">
                    <EachAgent
                        surname={userData.username}
                        phone_number={userData.phoneNumber}
                        relat="You (default)"
                    />
                    {data &&
                        data.map((res, i) => (
                            <EachAgent
                                surname={res.surname}
                                key={i}
                                last_name={res.last_name}
                                relat={res.relationship}
                                phone_number={res.phone_number}
                                func={deleteOne}
                                id={res._id}
                            />
                        ))}
                    <div className="flex mt-3 mx-1 h-56 w-44 md:w-48 flex-col relative justify-center items-center border bg-slate-150 rounded-md">
                        <i
                            onClick={() => setOpenAdd(!openAdd)}
                            className="p-3 border mb-2 cursor-pointer shadow border-dashed rounded-full"
                        >
                            <FaPlus />
                        </i>
                        Add New
                    </div>
                </div>
            </div>
            <ModalPanel
                closeButton={true}
                title="New Pickup person"
                children={
                    <NewPickUpPerson
                        userData={userData}
                        setOpenAdd={setOpenAdd}
                        openAdd={openAdd}
                    />
                }
                hasBackdrop={true}
                keyboard={true}
                open={openAdd}
                buttonName="Varify Code"
                handleClose={() => setOpenAdd(!openAdd)}
            />
        </UserWrapper>
    );
};

export default PickupPerson;

const NewPickUpPerson = ({ userData, setOpenAdd, openAdd }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        relationship: '',
        first_name: '',
        last_name: '',
        surname: '',
        phone_number: '',
        userId: userData._id,
    });

    const newAddressHandler = () => {
        let auth = userData._id + ' ' + userData.accessToken;
        addPickupPerson(formData, auth, dispatch);
    };

    let newValue = {};
    function updateValue(newVal, variable) {
        variable === 'relationship' && (newValue = { relationship: newVal });
        variable === 'first_name' && (newValue = { first_name: newVal });
        variable === 'last_name' && (newValue = { last_name: newVal });
        variable === 'surname' && (newValue = { surname: newVal });
        variable === 'phone_number' && (newValue = { phone_number: newVal });

        setFormData({
            ...formData,
            ...newValue,
            userId: userData._id,
        });
    }
    return (
        <section className="mt-10">
            <div className="px-2">
                <FloatingLabelInput
                    required={true}
                    label="Relationship"
                    type="text"
                    onChange={(e) =>
                        updateValue(e.target.value, 'relationship')
                    }
                />
            </div>
            <div className="flex items-center">
                <div className="w-1/2 px-2">
                    <FloatingLabelInput
                        required={true}
                        label="Surname"
                        onChange={(e) => updateValue(e.target.value, 'surname')}
                    />
                </div>
                <div className="w-1/2 px-2">
                    <FloatingLabelInput
                        required={true}
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
                        required={true}
                        label="Last Name"
                        onChange={(e) =>
                            updateValue(e.target.value, 'last_name')
                        }
                    />
                </div>
                <div className="w-1/2 px-2">
                    <FloatingLabelInput
                        required={true}
                        label="Phone Number"
                        type="number"
                        onChange={(e) =>
                            updateValue(e.target.value, 'phone_number')
                        }
                    />
                </div>
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
        </section>
    );
};

const EachAgent = ({ surname, last_name, relat, phone_number, id, func }) => {
    return (
        <div className="flex mt-3 mx-1 h-56 w-44 md:w-48 flex-col relative justify-center items-center border bg-slate-150 rounded-md">
            {id && (
                <i
                    onClick={() => func(id)}
                    className="absolute hover:text-red-600 cursor-pointer top-2 right-2"
                >
                    <FaTrash />
                </i>
            )}
            <i className="text-4xl w-28 h-28 flex items-center justify-center text-slate-400 bg-slate-200 rounded-full p-1">
                <FaUser />
            </i>
            <div className="flex flex-col items-center">
                <h5 className="text-[16px] mt-3 font-[600] ">
                    {surname} {last_name}
                </h5>
                <h5>{relat}</h5>
                <h5 className="text-xs">
                    <i>{phone_number}</i>
                </h5>
            </div>
        </div>
    );
};
