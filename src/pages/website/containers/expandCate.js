import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeftMenu = ({ category, setCategory, image }) => {
    const filtered = [];
    category[1].reduce((arr, value) => {
        !filtered.includes(value) && filtered.push(value);
    }, []);
    const name = category[0].split('&&&');
    return (
        <div className="absolute top-0 left-0 w-full h-full opacity-[.98] bg-slate-100">
            <div className="w-full h-8 bg-slate-800 text-white font-bold text-md px-8 leading-8 flex justify-between items-center">
                <h5>{name[1]}</h5>
                <i
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => setCategory('')}
                >
                    <FaTimes />
                </i>
            </div>
            <div className="h-full relative flex flex-col pb-10 flex-wrap items-start">
                {filtered.map((res, index) => (
                    <Link to={`/s/${name[1]}/${name[0]}/${res}`} key={index}>
                        <div
                            className="w-40 py-2 px-4 max-w-40 text-black hover:text-blue-600"
                            key={index}
                        >
                            <h5>{res}</h5>
                        </div>
                    </Link>
                ))}
                <div className="absolute right-0 top-0 h-40 min-h-fit max-h-fit ">
                    <img src={image} alt="imag" className="h-full" />
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;
