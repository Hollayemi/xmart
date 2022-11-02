import React from 'react';
import { useEffect } from 'react';
import { ColorBtn, colors, SizeBtn, sizes } from '../components';

export const Colors = ({ prefColors, setPrefColor }) => {
    return (
        <>
            <h4 className="mt-4">Colors available</h4>
            <div className="flex">
                {colors.map((res, index) => {
                    return (
                        <ColorBtn
                            key={index}
                            setColor={setPrefColor}
                            chosenColors={prefColors}
                            color={res}
                        />
                    );
                })}
            </div>
        </>
    );
};

export const Sizes = ({ availableSize, setPrefSize, prefSizes }) => {
    useEffect(() => {}, [prefSizes]);

    return (
        <>
            <h4>Sizes available</h4>
            <div className="flex">
                {sizes.map((res, index) => {
                    if (availableSize.includes(res)) {
                        return (
                            <SizeBtn
                                key={index}
                                disable={false}
                                size={res}
                                setSize={setPrefSize}
                                preferedSizes={prefSizes}
                            />
                        );
                    } else {
                        return (
                            <SizeBtn
                                key={index}
                                disable={true}
                                size={res}
                                setSize={setPrefSize}
                            />
                        );
                    }
                })}
            </div>
        </>
    );
};
