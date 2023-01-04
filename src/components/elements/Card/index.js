import React from 'react';
import { Panel } from 'rsuite';

const Card = ({ children }) => (
    <>
        <Panel bordered shaded>
            {children}
        </Panel>
    </>
);

export default Card;
