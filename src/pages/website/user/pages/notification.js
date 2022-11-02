import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserWrapper from '../wrapper';

const UserNotification = () => {
    return (
        <UserWrapper type="settings">
            <section className="mt-5 ml-5">
                <h5 className="flex items-center">
                    Notifications{' '}
                    <span className="w-4 h-4 ml-2 text-xs p-2 rounded-full bg-red-600 text-white flex items-center justify-center">
                        2
                    </span>
                </h5>
                <div className="max-w-[500px] mt-5">
                    <Each
                        icon={<FaShoppingCart />}
                        message={
                            'crashing child Starting child process with node server.js crashing child Starting child process with node server.js'
                        }
                    />
                    <Each
                        icon={<FaShoppingCart />}
                        message={
                            'crashing child Starting child process with node server.js crashing child Starting child process with node server.js'
                        }
                    />
                    <Each
                        icon={<FaShoppingCart />}
                        message={
                            'crashing child Starting child process with node server.js crashing child Starting child process with node server.js'
                        }
                    />
                </div>
            </section>
        </UserWrapper>
    );
};
export default UserNotification;

const Each = ({ icon, message, note, link, time }) => {
    return (
        <div className="flex items-start relative pb-4 border-b my-1 p-2 mx-">
            <div className="pr-3">
                <div className="border w-10 h-10 text-xl flex justify-center items-center p-1 border-blue-400 text-blue-400 rounded-full w-9 h-9 ">
                    {icon}
                </div>
            </div>
            <div>
                <h5 className="text-gray-600">
                    {message}
                    {note && (
                        <Link to={link}>
                            <span className="text-blue-400 ml-3">{note}</span>
                        </Link>
                    )}
                </h5>
                <h5 className="absolute bottom-0 right-2 text-gray-300">
                    {time}
                </h5>
            </div>
        </div>
    );
};
