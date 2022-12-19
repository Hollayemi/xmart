import React, { useState } from 'react';
import { Row } from 'rsuite';
import InputAddon from '../../../components/elements/Input/InputAddon';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '../../../components/elements/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ResetPasswordHandler } from '../../../state/slices/auth/resetPassword';

export const ResetForm = ({ going, popUp }) => {
    const queryParams = new URLSearchParams(window.location.search);
    const [formData, setFormData] = useState(
        { 
            email: queryParams.get('email'),
            token: queryParams.get('token'),
            password: '',
            conf_pass: '',
        }
    );
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };
    let newValue = {};
    const updateValue = (newVal, variable) => {
        // eslint-disable-next-line no-lone-blocks
        {
            variable === 'password' && (newValue = { password: newVal });
            variable === 'conf_pass' && (newValue = { conf_pass: newVal });
        }
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
    const resetHandler = () => {
        console.log(formData);
        if (formData.password === formData.conf_pass) {
            ResetPasswordHandler(formData, navigate, dispatch);
        }
    };
    return (
        <>
            <div
                className={`w-full ${
                    !popUp ? 'md:w-3/5 min-w-[330px]' : 'max-w-450 min-w-[300px] lg:ml-5'
                } my-3`}
            >
                <h1 className="font-black text-black text-4xl ">Reset Password</h1>
                <p className="text-gray-500 leading-7 mx-1 mt-3 w-full md:w-4/5">
                    Let's get you set up so you can verify your account and
                    start your journey with kemon market
                </p>
            </div>
            <div
                className={`w-full ${
                    !popUp ? 'md:w-3/5 min-w-[330px]' : 'flex justify-center'
                }
                 my-3 h-80 relative`}
            >
                <form className="my-4 h-4/6 flex flex-col w-full max-w-[450px] items-stretch pt-4">
                    <Row>
                        <InputAddon
                             suffix
                             icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                             label="Password"
                             type={showPassword ? 'text' : 'password'}
                             onClick={toggleShowPassword}
                             onChange={(e) =>
                                 updateValue(e.target.value, 'password')
                             }
                             name="password"
                             placeholder="*******"
                        />
                    </Row>
                    <Row>
                        <InputAddon
                            suffix
                            icon={showPassword2 ? <FaEyeSlash /> : <FaEye />}
                            label="Confirm Password"
                            type={showPassword2 ? 'text' : 'password'}
                            onClick={toggleShowPassword2}
                            onChange={(e) =>
                                updateValue(e.target.value, 'conf_pass')
                            }
                            name="conf_pass"
                            placeholder="*******"
                        />
                    </Row>
                    <Row className="relative bottom-0 mt-auto">
                        <Button
                            onClick={resetHandler}
                            btnClass="w-full mt-5 h-10 rounded shadow mt-2 justify-center"
                            title="Update Password"
                        />
                    </Row>
                </form>
            </div>
        </>
    );
};
