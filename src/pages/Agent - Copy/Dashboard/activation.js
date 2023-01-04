import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionBtn from '../../../components/elements/Button/actions';
import { activation } from '../../../state/slices/admin/deactivator';

const Activation = () => {
    const useQuery = new URLSearchParams(window.location.search);
    const account = useQuery.get('account');
    const name = useQuery.get('name');
    const id = useQuery.get('id');
    const data = { account, name, id };
    const dispatch = useDispatch();
    const { adminData } = useSelector((state) => state.reducer.adminReducer);


    
    const deactivate = () => {
        activation(dispatch, data, adminData);
    };
    return (
        <section className="flex justify-center bg-slate-50 pt-10 h-screen px-3">
            <div className="w-[400px] border h-fit rounded-md p-5 flex flex-col items-center">
                <h5>
                    You are about to deactivate from
                    {account} account{' '}
                </h5>
                <h5>
                    {account} name:
                    {name}
                </h5>
                <div className="flex justify-center mt-3">
                    <ActionBtn
                        type="error"
                        label="Cancel"
                        func={() => window.history.back()}
                    />
                    <ActionBtn
                        type="success"
                        label="Continue"
                        func={deactivate}
                    />
                </div>
            </div>
        </section>
    );
};

export default Activation;
