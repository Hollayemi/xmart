import React, { useState } from 'react';
import { Steps, Panel, Loader, Message, toaster } from 'rsuite';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import Button from '../../../components/elements/Button/index';
import { Link } from 'react-router-dom';
import UploadProfilePic from '../../../components/websiteCompoents/UploadFile/uploadProfilePic';
import { useDispatch, useSelector } from 'react-redux';
import { RegNewUser } from '../../../state/slices/auth/Signup';
import { REQUEST_STATUS } from '../../../state/slices/constants';
import { unwrapResult } from '@reduxjs/toolkit';
import Step0 from './step0';
import Step1 from './step1';
import Step3 from './step3';

const KemSignUp = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        conf_pass: '',
        avatar: null,
        why_here: '',
    });
    let newValue = {};
    const updateValue = (newVal, variable) => {
        variable === 'fullname' && (newValue = { fullname: newVal });
        variable === 'username' && (newValue = { username: newVal });
        variable === 'email' && (newValue = { email: newVal });
        variable === 'phone' && (newValue = { phoneNumber: newVal });
        variable === 'password' && (newValue = { password: newVal });
        variable === 'conf_pass' && (newValue = { conf_pass: newVal });
        variable === 'avatar' && (newValue = { avatar: newVal });
        variable === 'why_here' && (newValue = { why_here: newVal });

        setFormData({
            ...formData,
            ...newValue,
        });
    };

    const [step, setStep] = useState(0);

    // functions
    const onChange = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    //
    //
    //
    const { status } = useSelector((state) => state.reducer.signUpReducer);
    const dispatch = useDispatch();
    const submitButton = () => {
        if (formData.password === formData.conf_pass) {
            const { conf_pass, ...others } = formData;
            dispatch(RegNewUser({ ...others, isSeller: false }))
                .then(unwrapResult)
                .then((res) => {
                    res.type &&
                        toaster.push(
                            <Message showIcon type={res.type}>
                                {res.message}
                            </Message>,
                            {
                                placement: 'topEnd',
                            }
                        );
                });
        }
    };
    return (
        <section className="h-80 min-h-screen overflow-x-hidden">
            <div className="w-full h-full flex">
                <div className="fixed left-0 top-0 hidden md:block sm-w-40 md:w-2/5 bg-slate-800 h-full"></div>
                <div className="hidden md:block sm-w-40 md:w-2/5 bg-slate-800 h-full"></div>
                <div className="flex justify-center w-full md:w-3/5">
                    <div className="w-full sm:max-w-[600px] px-1 md:px-4 flex flex-col items-center">
                        <div className="flex justify-between items-center w-full p-3 ">
                            <div className="flex h-10 mt-10 items-center">
                                <Button
                                    btnClass="h-8 rounded-l"
                                    onClick={onPrevious}
                                    disabled={step === 0}
                                    title={<FaAngleLeft />}
                                />
                            </div>
                            <div className="flex">
                                <h5 className="text-sm h-10 leading-6 flex items-center px-3 text-bold m-1">
                                    Have an account?
                                </h5>
                                <Link to="/signin">
                                    <h5 className="text-sm h-10 w-20 leading-6 flex items-center px-3 font-medium bg-gray-50 text-slate-700 hover:bg-gray-100 rounded m-1 shadow hover:decoration-none">
                                        Sign in
                                    </h5>
                                </Link>
                            </div>
                        </div>
                        <div className="w-5/6 md:w-5/6 my-5">
                            <h1 className="font-black text-black text-4xl ">
                                Register
                            </h1>
                            <p className="text-gray-500 leading-7 mx-1 mt-3 w-full md:min-w-[350px]">
                                Let's get you set up so you can verify your
                                account and start your journey with kemon market
                            </p>
                        </div>
                        <div className="w-full md:w-4/5 my-3 h-80 sm:min-w-[450px] lg:min-w-[550px] min-h-[450px] md:min-h-[430px] relative">
                            <Steps current={step}>
                                <Steps.Item title={''} />
                                <Steps.Item title="" />
                                <Steps.Item title={''} />
                                <Steps.Item title={''} />
                            </Steps>
                            <Panel header={`Step: ${step + 1}`}>
                                {step === 0 && (
                                    <Step0
                                        formData={formData}
                                        updateValue={updateValue}
                                    />
                                )}
                                {step === 1 && (
                                    <Step1
                                        formData={formData}
                                        updateValue={updateValue}
                                    />
                                )}
                                {step === 2 && (
                                    <div>
                                        <UploadProfilePic
                                            updateValue={updateValue}
                                            formData={formData}
                                        />
                                    </div>
                                )}
                                {step === 3 && (
                                    <Step3
                                        formData={formData}
                                        updateValue={updateValue}
                                        submitButton={submitButton}
                                    />
                                )}
                            </Panel>
                            <div className="absolute bottom-0 left-3 w-full">
                                <div className="w-full px-4 flex justify-end items-center">
                                    <Button
                                        onClick={onNext}
                                        disabled={step === 3}
                                        title={<FaAngleRight />}
                                        btnClass="h-8 mr-5 rounded-r"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {status === REQUEST_STATUS.PENDING && (
                <Loader
                    backdrop
                    speed="fast"
                    content="In few seconds..."
                    vertical
                />
            )}
            ;
        </section>
    );
};

export default KemSignUp;
