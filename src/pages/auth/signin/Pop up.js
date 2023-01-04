import React from 'react';
import ModalPanel from '../../../components/elements/ModalPanel';
import { SignInForm } from './Signin';

const SigninPop = ({ openAdd, going, setOpenAdd }) => (
    <ModalPanel
        closeButton
        title=" "
        children={
            <div className="w-full">
                <SignInForm going={going || ''} popUp />
            </div>
        }
        hasBackdrop
        keyboard
        open={openAdd}
        buttonName="Varify Code"
        handleClose={() => setOpenAdd(!openAdd)}
    />
);

export default SigninPop;
