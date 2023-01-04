import React, { useState } from 'react';
import { Loader, Row } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';
import InputGroup from '../../../components/elements/Input/InputGroup';
import Button from '../../../components/elements/Button';
import { ForgotPasswordHandler } from '../../../state/slices/auth/forgotpassword';
import HelperText from '../../../components/elements/Input/HelperText';

export const ForgotPassword = ({ going, popUp }) => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fireAction = () => {
        ForgotPasswordHandler(email, navigate, dispatch);
    };
    return (
        <>
            <div
                className={`w-full ${
                    !popUp ? 'md:w-3/5' : 'max-w-450  ml-5'
                } my-3`}
            >
                <h5
                    className="text-blue-500 absolute cursor-pointer top-4 left-4 flex items-center justify-center"
                    onClick={() => window.history.back()}
                >
                    <FaAngleLeft className=" -mt-1 mr-3" /> Back to Home
                </h5>
                <h1 className="font-black text-black text-4xl ">
                    Forgot Password
                </h1>
            </div>
            <div
                className={`w-full ${
                    !popUp ? 'md:w-3/5' : 'flex justify-center'
                }
                 my-3 h-80 relative`}
            >
                <form className="my-4 h-4/6 flex flex-col w-full max-w-[450px] items-stretch pt-4">
                    <Row>
                        <InputGroup
                            label="Email"
                            size="lg"
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                        />
                    </Row>
                    <HelperText linkTo="/signin" linkText="Try Login Again" />
                    <Row className="relative bottom-0 mt-auto">
                        <Button
                            onClick={fireAction}
                            btnClass="w-full h-10 rounded shadow mt-2 justify-center"
                            title="Recover Password"
                        />
                    </Row>
                </form>
            </div>
        </>
    );
};
