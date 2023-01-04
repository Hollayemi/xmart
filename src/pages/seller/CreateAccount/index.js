import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Steps, Panel } from 'rsuite';
import { FaAngleLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/elements/Button';
import { ProfiePreview } from '../../../components/SellerComponents/ProfiePreview';
import ModalPanel from '../../../components/elements/ModalPanel';
// stateManagement
import { createHandler } from '../../../state/slices/shop/addShop';
import { Step0 } from './step0';
import { Step1 } from './step1';
import { Step2 } from './step2';
import { Step3 } from './step3';

//
//

//
//

const NewPage = () => {
    const { store } = useParams();
    let storeName;

    store === 'new' ? (storeName = '') : (storeName = store);
    const agent = localStorage.getItem('agentName') || '';

    const [formData, setFormData] = useState({
        store: storeName.toLowerCase(),
        shopName: '',
        shopEmail: '',
        shopLine: '',
        street: '',
        referrer: agent,
        city: '',
        postalCode: '',
        state: '',
        landmark: '',
        Category: '',
        accept_order: true,
        CAC: { key: '', file: '' },
        TIN: { key: '', file: '' },
        avatar: null,
    });

    const [Category, setCategory] = useState([]);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [allowRegister, setAllowRegister] = useState(false);
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const setCloseModal = () => {
        setAgreedToTerms(!agreedToTerms);
        setAllowRegister(true);
    };

    let newValue = {};
    const updateValue = (newVal, variable) => {
        variable === 'store' && (newValue = { store: newVal });
        variable === 'shopName' && (newValue = { shopName: newVal });
        variable === 'shopEmail' && (newValue = { shopEmail: newVal });
        variable === 'shopLine' && (newValue = { shopLine: newVal });
        variable === 'buzz_loc' && (newValue = { street: newVal });
        variable === 'city' && (newValue = { city: newVal });
        variable === 'postalCode' && (newValue = { postalCode: newVal });
        variable === 'state' && (newValue = { state: newVal });
        variable === 'Category' && (newValue = { Category: newVal });
        variable === 'buzz_lndmk' && (newValue = { landmark: newVal });
        variable === 'do_order' && (newValue = { accept_order: newVal });
        variable === 'avatar' && (newValue = { avatar: newVal });
        variable === 'referrer' && (newValue = { referrer: newVal });
        variable === 'CAC' &&
            (newValue = { CAC: { ...formData.CAC, ...newVal } });
        variable === 'TIN' &&
            (newValue = { TIN: { ...formData.CAC, ...newVal } });

        setFormData({
            ...formData,
            ...newValue,
        });
    };

    //
    //
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.reducer.loginReducer.userData);
    // const getshopInfo = useSelector((state) => state.reducer.setShopReducer);
    //
    const submitButton = async () => {
        const payload = {
            ...formData,
            id: _id,
            isSelle: true,
            Category,
        };
        createHandler(payload, dispatch, navigate);
    };
    //
    //
    //
    const [step, setStep] = useState(0);
    const onChange = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    return (
        <section className="seller-bg-image min-h-screen">
            <div className="flex justify-evenly items-center w-full h-full bg-slate-900 bg-opacity-75  absolute top-0 left-0">
                <div className="flex md:w-full lg:w-5/6 justify-center">
                    <div className="block md:hidden">
                        <ModalPanel
                            title="Your Profile Preview"
                            children={
                                <ProfiePreview
                                    formData={formData}
                                    Category={Category}
                                />
                            }
                            hasBackdrop
                            keyboard
                            open={agreedToTerms}
                            closeButton
                            buttonName="Nice!"
                            handleClose={setCloseModal}
                        />
                    </div>
                    <div className="bg-white pt-5 shadow-xl rounded h-screen md:h-[560px] w-full min-w-[350px] md:w-[550px] md:p-4">
                        <div className="flex justify-between items-center w-full px-3  ">
                            <div className="flex h-10 items-center">
                                <Button
                                    btnClass={`h-8 rounded-l bg-red-400 ${
                                        step === 0 ? 'hidden' : ''
                                    }`}
                                    onClick={onPrevious}
                                    disabled={step === 0}
                                    title={<FaAngleLeft />}
                                />
                            </div>
                            <div className="flex">
                                <h5 className="text-sm h-10 leading-6 flex items-center px-3 text-bold m-1">
                                    Have an account?
                                </h5>
                            </div>
                        </div>
                        <div className="w-full mt-16 sm:mt-0">
                            <Steps current={step} className="mx-1.5">
                                <Steps.Item />
                                <Steps.Item />
                                <Steps.Item />
                                <Steps.Item />
                            </Steps>
                            <Panel
                                header={`Step: ${step + 1}`}
                                className="mt-10 sm:mt-0"
                            >
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
                                    <Step2
                                        Category={Category}
                                        setCategory={setCategory}
                                        formData={formData}
                                        updateValue={updateValue}
                                    />
                                )}
                                {step === 3 && (
                                    <Step3
                                        updateValue={updateValue}
                                        formData={formData}
                                        allowRegister={allowRegister}
                                        setAgreedToTerms={setAgreedToTerms}
                                        submitButton={submitButton}
                                        agreedToTerms={agreedToTerms}
                                    />
                                )}
                            </Panel>
                            <div className="flex w-full justify-end py-2 mt-8 sm:mt-0">
                                <Button
                                    onClick={onNext}
                                    disabled={step === 3}
                                    title="Continue"
                                    btnClass={`h-8 mr-5 rounded-r ${
                                        step === 3 ? 'hidden' : ''
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewPage;
