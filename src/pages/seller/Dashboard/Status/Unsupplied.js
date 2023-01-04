import React from 'react';
import { Placeholder } from 'rsuite';
import Image1 from '../../../../assets/images/png/conntect2db_rectangle.png';
import Status from '../../../../components/status';

const Unsupplied = () => (
    <section className="flex items-center lg:w-[calc(100%-280px)] flex-wrap">
        <Status
            prod_name="Gucci Shoe"
            quantity="8"
            image={Image1}
            color="red"
            action
        />
        <Status
            prod_name="iPhone 8plus"
            quantity="1"
            image={Image1}
            color="white"
            action
        />
        <Status
            prod_name="Fendi Cloth"
            quantity="3"
            image={Image1}
            color="white"
            action
        />
    </section>
);

export default Unsupplied;
