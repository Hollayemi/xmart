import React from 'react';

// eslint-disable-next-line react/prop-types
export const TopTitle = ({ header, title, info }) => {
    return (
      <div className="bg-slate-50 h-32 w-full rounded-md p-3 mt-5">
          <h5 className="text-gray-300">{header}</h5>
          <h5 className="font-bold text-2xl text-black">{title}</h5>
          <h5 className="text-gray-500 mt-5">{info}</h5>
        </div>
    );
};
