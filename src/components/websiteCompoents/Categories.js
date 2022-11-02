import React from 'react';
import { FaAngleRight, FaList } from 'react-icons/fa';

const Category = ({ name, setCategory, expandCate }) => {
    return (
        <div
            className={`flex ${
                expandCate[1] === name ? 'text-blue-500 bg-blue-200' : null
            } text-md justify-between cursor-pointer my-1 items-center px-4 w-full`}
            onClick={() => setCategory(expandCate)}
        >
            <h5 className=" my-1">{name}</h5>
            <i>
                <FaAngleRight />
            </i>
        </div>
    );
};

const Categories = ({ setCategory, expandCate, allCate }) => {
    return (
        <div className="w-full">
            <div className="font-medium text-sm text-white p-2 flex items-center w-full bg-slate-800">
                <FaList />
                <h5 className="mx-2">OUR CATEGORIES</h5>
            </div>
            <div className="font-medium w-full">
                {allCate.map((res, index) => {
                    return (
                        <Category
                            key={index}
                            setCategory={setCategory}
                            expandCate={[res._id.title, res.subCate, res.group]}
                            name={res._id.title}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
