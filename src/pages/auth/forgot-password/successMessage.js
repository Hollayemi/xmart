import React from 'react';
import { FaAngleLeft, FaTelegramPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ForgotPassword } from './ForgotPassword';

const EmailSent = () => (
    <section className="h-80 min-h-screen overflow-x-hidden">
        <div className="w-full h-full flex relative">
            <h5
                className="text-blue-500 absolute cursor-pointer top-4 left-4 flex items-center justify-center"
                onClick={() => window.history.back()}
            >
                <FaAngleLeft className=" -mt-1 mr-3" /> Back to Home
            </h5>
            <div className="w-full  px-5 md:px-4 flex flex-col items-center justify-center">
                <SuccessMessage />
            </div>
        </div>
    </section>
);

export default EmailSent;

const SuccessMessage = () => {
    const emailTo = localStorage.getItem('sending-email-to');
    console.log(emailTo);
    return (
        <div className="flex text-center items-center flex-col">
            <i className="text-4xl mb-3 w-28 h-28 rounded-full flex justify-center items-center border border-slate-100">
                <FaTelegramPlane className="text-4xl" />
            </i>
            <h5>We've sent you a mail where you can reset your password</h5>
            <a
                href={`https://mail.google.com/mail/u/${emailTo}/`}
                target="_blank"
                rel="noreferrer"
            >
                <button className="px-4 mt-1 py-2 w-28 rounded-md border shadow text-blue-500 bg-slate-50 cursor-pointer">
                    Open Mail
                </button>
            </a>
        </div>
    );
};
