import { Message, toaster } from 'rsuite';
import React, { useEffect, useState } from 'react';
import { FaAddressBook, FaPhoneAlt, FaTrash, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteAddress } from '../../../state/slices/home/checkout';
import { getAllAddress } from '../../../state/slices/home/checkout/fetch';
import CreateNewAddress from './newAddress';
import ModalPanel from '../../../components/elements/ModalPanel';

const AddressBook = ({ userId, setAddress, openAdd, setOpenAdd, withNew }) => {
    const dispatch = useDispatch();
    const [allMessages, setMessages] = useState([]);
    const [selectedAdd, setSeletedAdd] = useState(null);
    const [newAdd, setNewAdd] = useState(false);
    useEffect(() => {
        const payload = {
            body: {
                userId,
            },
        };
        getAllAddress(payload, dispatch, setMessages);
    }, []);

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {allMessages.length > 0 ? (
                    allMessages.map((res, index) => (
                        <Address
                            key={index}
                            selectedAdd={selectedAdd}
                            setSeletedAdd={setSeletedAdd}
                            name={`${res.surname} ${res.first_name} ${res.last_name}`}
                            address={res.address}
                            phone={res.phone_number}
                            index={index}
                            title={res.title}
                            id={res._id}
                            userId={userId}
                            setAddress={setAddress}
                            res={res}
                        />
                    ))
                ) : (
                    <div className="h-60 flex flex-col items-center sm:items-end sm:-mr-10 justify-center">
                        <h5 className="">No Address available</h5>
                        {!withNew && (
                            <button
                                onClick={() => setNewAdd(!newAdd)}
                                className="w-40 mt-5 -mr-4 shadow-md h-8 text-slate-100 rounded-md bg-slate-700 hover:bg-slate-600"
                            >
                                Add New Address
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="w-full flex justify-center my-4">
                {!withNew && allMessages.length > 0 && (
                    <button
                        onClick={() => setNewAdd(!newAdd)}
                        className="w-40 mt-5 -mr-4 shadow-md h-8 text-slate-100 rounded-md bg-slate-700 hover:bg-slate-600"
                    >
                        Add New Address
                    </button>
                )}
            </div>
            {withNew && (
                <CreateNewAddress
                    userId={userId}
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                />
            )}
            <ModalPanel
                closeButton
                title="Address Details"
                children={
                    <CreateNewAddress
                        userId={userId}
                        openAdd={openAdd}
                        setOpenAdd={setOpenAdd}
                    />
                }
                hasBackdrop
                keyboard
                open={newAdd}
                buttonName="Varify Code"
                handleClose={() => setNewAdd(!newAdd)}
            />
        </section>
    );
};

export default AddressBook;

export const Address = ({
    selectedAdd,
    setSeletedAdd,
    name,
    phone,
    address,
    index,
    id,
    userId,
    setAddress,
    res,
    title,
}) => {
    const dispatch = useDispatch();
    const payload = {
        body: {
            _id: id,
            userId,
        },
    };
    const setAll = () => {
        setSeletedAdd(index);
        setAddress(res);
        toaster.push(
            <Message showIcon type="success">
                Selected
            </Message>,
            {
                placement: 'topEnd',
            }
        );
    };
    return (
        <div
            onClick={setAll}
            className={`w-11/12 px-2 ${
                selectedAdd === index ? 'border-slate-400' : 'border-slate-200'
            } pb-2 border rounded-t-md m-3 cursor-pointer relative`}
        >
            <div
                className={`flex px-2 justify-between items-center h-10 py-2 border-b ${
                    selectedAdd === index
                        ? 'border-slate-400'
                        : 'border-slate-200'
                }`}
            >
                <h5>{title}</h5>
                <div
                    className={`flex ${
                        selectedAdd === index && 'shadow-md'
                    } items-center bg-slate-100 rounded-sm px-3`}
                >
                    <div
                        className={`w-3 h-3 mr-2 rounded-full ${
                            selectedAdd === index
                                ? 'bg-slate-800'
                                : 'bg-slate-300'
                        } bg-gray-300 border`}
                    />
                    <h5>Choose</h5>
                </div>
            </div>
            <div className="h-32">
                <div className="px-2">
                    <h5 className="flex my-2 items-center">
                        <FaUser /> <span className="ml-4">{name}</span>
                    </h5>
                    <h5 className="flex my-2 ">
                        <FaAddressBook className="mt-2" />{' '}
                        <span className="ml-4">{address}</span>
                    </h5>
                    <h5 className="flex my-2 items-center">
                        <FaPhoneAlt /> <span className="ml-4">{phone}</span>
                    </h5>
                </div>
            </div>
            <i
                onClick={() => deleteAddress(payload, dispatch, setSeletedAdd)}
                className="absolute right-2 bottom-3 w-8 h-8 rounded-full flex items-center justify-center border"
            >
                <FaTrash />
            </i>
        </div>
    );
};
