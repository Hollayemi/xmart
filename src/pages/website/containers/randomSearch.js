import React from 'react';
// import { useParams } from 'react-router-dom';

const RandomSearch = ({ search }) => {
    // const param = useParams();

    return (
        <div>
            <div>{search}</div>
            <div className="my-32"></div>
        </div>
    );
};

export default RandomSearch;
