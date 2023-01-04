import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarGroup } from 'rsuite';
import IconDropdown from '../../../../components/elements/IconDropDown';
import ModalPanel from '../../../../components/elements/ModalPanel';
import { loadSubCategories } from '../../../../state/slices/shop/brands/brands';
import { deleteProd } from '../../../../state/slices/shop/products/deleteProduct';
import { editProductHandler } from '../../../../state/slices/shop/products/updateProduct';

export const Folders = ({ name, neededInfo, prodImage, price, id }) => {
    const [eventFunc, setEventFunc] = useState('');
    const splited = eventFunc.split('-');
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    let max = 1;
    if (prodImage.length > 1) {
        max = 2;
    }

    const deleteProdHandler = () => {
        const body = {
            delCase: 'Product',
            _id: splited[2],
            name: splited[0],
        };
        deleteProd(body, neededInfo, eventFunc, dispatch);
    };
    return (
        <div className="flex cursor-pointer flex-col justify-btween min-w-[280px] relative px-4 m-2  h-32 border rounded-[50px] bg-blue-100 shadow-md">
            <i className="text-6xl text-blue-500 m-2">
                <AvatarGroup stack>
                    {prodImage
                        .filter((each, i) => i < max)
                        .map((each, index) => (
                            <Avatar
                                circle
                                key={index}
                                src={each.image}
                                alt={each.name}
                            />
                        ))}
                    {max > 2 && (
                        <Avatar circle style={{ background: '#111' }}>
                            <h5 className="text-xs">
                                +{prodImage.length - max}
                            </h5>
                        </Avatar>
                    )}
                </AvatarGroup>
            </i>
            <i className="absolute top-5 right-7 w-6 h-3 bg-white rounded-full flex items-center justify-center text-xs text-slate-300 cursor-pointer">
                <IconDropdown
                    Icon={<FaEllipsisH />}
                    Content={[
                        {
                            value: `${name}-delete-${id}-product`,
                            name: 'Delete',
                        },
                        {
                            value: `${name}-view-${id}-product`,
                            name: 'View',
                        },
                    ]}
                    onSelect={setEventFunc}
                    className="w-20"
                />
            </i>
            <div className="h-full">
                <h5 className="font-bold text-md">{name}</h5>
                <p
                    className="text-xs absolute px-3 h-10 text-white rounded-full flex items-center justify-center
                            shadow-md shadow-slate-400 right-4 -bottom-3 bg-blue-500"
                >
                    &#x20A6;
                    {price}
                </p>
            </div>
            {splited[1] === 'delete' && (
                <ModalPanel
                    title="Deletion"
                    children={
                        <>
                            <h1 className="leading-7">
                                You are about to drop a product{' '}
                                <b>({splited[0]})</b>, click below button to
                                complete your action
                            </h1>
                            <div className="w-full flex justify-center pt-10">
                                <button
                                    onClick={deleteProdHandler}
                                    className="w-28 h-8 bg-slate-800 text-white text-md border-none rounded shadow "
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    }
                    hasBackdrop
                    keyboard
                    open={open}
                    closeButton
                    buttonName="Varify Code"
                    handleClose={() => setOpen(!open)}
                />
            )}
        </div>
    );
};

export const editProduct = (formData, showingInfo, dispatch, neededInfo) => {
    editProductHandler(
        {
            ...formData,
            prodId: showingInfo._id,
            prodName: formData.prodName.split('-').join('_'),
        },
        dispatch,
        neededInfo
    );
};

export const selectBrandFunc = (
    setProductCategory,
    value,
    updateValue,
    setProductGroup
) => {
    if (value) {
        updateValue(value, 'brand');
        setProductCategory(value.split('$$')[1]);
        setProductGroup(
            loadSubCategories(value.split('$$')[1], value.split('$$')[2])
        );
    } else {
        setProductCategory(null);
    }
};

//
//
//
export function updateInfoHandler(
    newVal,
    variable,
    newValue,
    formData,
    setFormData
) {
    variable === 'name' && (newValue = { prodName: newVal });
    variable === 'price' && (newValue = { prodPrice: newVal });
    variable === 'reference' && (newValue = { prodKey: newVal });
    variable === 'prodGroup' && (newValue = { prodGroup: newVal });
    variable === 'note' && (newValue = { prodInfo: newVal });
    variable === 'brand' &&
        (newValue = {
            prodBrand: newVal.split('$$')[0],
            prodCategory: newVal.split('$$')[1],
            prodSub_Category: newVal.split('$$')[2],
        });

    variable === 'weight' &&
        (newValue.prodVari = { ...formData.prodVari, weight: newVal });
    variable === 'unit' &&
        (newValue.prodVari = { ...formData.prodVari, unit: newVal });
    variable === 'size' &&
        (newValue.prodVari = { ...formData.prodVari, size: newVal });
    variable === 'color' &&
        (newValue.prodVari = { ...formData.prodVari, color: newVal });
    variable === 'gender' &&
        (newValue.prodVari = { ...formData.prodVari, gender: newVal });

    variable === 'image' && (newValue = { ...formData.images.push(newVal) });
    variable === 'removeImg' &&
        (newValue = { ...formData.images.filter(newVal) });

    setFormData({
        ...formData,
        ...newValue,
    });
}
