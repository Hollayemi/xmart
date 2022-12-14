import React from 'react';
import { ForgotPassword } from './ForgotPassword';

const ForgotPass = () => (
    <section className="h-80 min-h-screen overflow-x-hidden">
        <div className="w-full h-full flex">
            <div className="fixed left-0 top-0 hidden md:block sm-w-40 md:w-2/5 bg-slate-800 h-full" />
            <div className="hidden md:block sm-w-40 md:w-2/5 bg-slate-800 h-full" />
            <div className="w-full md:w-3/5 relative px-5 md:px-4 flex flex-col items-center justify-center">
                <ForgotPassword />
            </div>
        </div>
    </section>
);

export default ForgotPass;
