import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionBtn from '../../../../../components/elements/Button/actions';
import { acceptWithdraw, updateAgent } from '../../../../../state/slices/admin/agents/adminActions';

const Confirmation = () => {
    const useQuery = new URLSearchParams(window.location.search)
    const name = useQuery.get('name');
    const id = useQuery.get('id');
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    
    const Decline = () => {
        let set = { withdraw: false };
        updateAgent(dispatch, setData, adminData, set, id);
    };
    const Accept = () => {
        acceptWithdraw(dispatch, adminData, id);
    }
    data && window.history.back();
  return (
    <section className="flex justify-center bg-slate-50 pt-10 h-screen px-3">
        <div className="w-[400px] border h-fit rounded-md p-5 flex flex-col items-center">
            <h5>You are about to reset {name}'s Amount to 0, Beliving{' '}
                {name}'s payment has been made.{' '}</h5>
            <div className="flex justify-center mt-3">
                <ActionBtn type="error" label="Decline Payment" func={Decline} />
                <ActionBtn type="success" label="Accept Payment" func={Accept} />
            </div>
        </div>
    </section>
  )
}

export default Confirmation
