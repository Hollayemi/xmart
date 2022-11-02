import React from 'react';
import ModalPanel from '../../../components/elements/ModalPanel';
import { SignInForm } from './Signin';

const SigninPop = ({ openAdd, going, setOpenAdd }) => {
    return (
        <ModalPanel
            closeButton={true}
            title=" "
            children={
                <div className="w-full">
                    <SignInForm going={going || ''} popUp={true} />
                </div>
            }
            hasBackdrop={true}
            keyboard={true}
            open={openAdd}
            buttonName="Varify Code"
            handleClose={() => setOpenAdd(!openAdd)}
        />
    );
};

export default SigninPop;
