import React from 'react';
import { Divider } from 'rsuite';

const DividerPanel = ({ text, ...props }) => (
    <>
        <Divider {...props}>{text}</Divider>
    </>
);

export default DividerPanel;
