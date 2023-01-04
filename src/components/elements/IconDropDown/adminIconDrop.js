import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonToolbar, Dropdown, Popover, Whisper } from 'rsuite';

const AdminIconDropdown = ({ Icon, Content, onSelect, className, ref }) => {
    const [prodId, prodDrawer] = useState(null);
    const [colId, colDrawer] = useState(null);
    const navigate = useNavigate();
    const myContent = Content.map((res, index) => (
        <Dropdown.Item eventKey={res.value} key={index}>
            {res.name}
        </Dropdown.Item>
    ));
    const handleSelect = async (eventKey) => {
        navigate(eventKey);
        onSelect(eventKey);
    };

    return (
        <>
            <ButtonToolbar>
                <Whisper
                    placement="leftStart"
                    trigger="click"
                    speaker={
                        <Popover
                            ref={ref}
                            className={`w-fit ${className}`}
                            full
                        >
                            <Dropdown.Menu onSelect={handleSelect}>
                                {myContent}
                            </Dropdown.Menu>
                        </Popover>
                    }
                >
                    <i className="w-full h-full">{Icon}</i>
                </Whisper>
            </ButtonToolbar>
        </>
    );
};

export default AdminIconDropdown;
