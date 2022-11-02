import React from 'react';
import Loading from './elements/Loading';

const NotReady = () => {
    return (
        <section className="flex flex-col w-full min-w-[350px] overflow-auto myScroll-x items-center justify-center min-h-[80vh] p-4">
            <h3>This Page is Currently Not Available</h3>
            <Loading speed="fast" />
        </section>
    );
};

export default NotReady;
