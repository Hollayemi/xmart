import React from 'react';
import SearchWrapper from '../components/websiteCompoents/ReuseableFlex';
const NotFound = () => {
    return (
        <SearchWrapper>
            <div className="w-full h-[50vh] flex items-center justify-center">
                Page Not Found :)
            </div>
        </SearchWrapper>
    );
};

export default NotFound;
