import React, { useEffect, useState } from 'react';
import { FaPlus, FaImage } from 'react-icons/fa';
import { SelectPicker, CheckPicker, Loader } from 'rsuite';
import InputGroup from '../../../../components/elements/Input/InputGroup';
import { productInformation } from '../../../../components/SellerComponents/Info/Categories';
import TextAreaGroup from '../../../../components/elements/Input/TextAreaGroup';
import ImagePreview from '../../../../components/SellerComponents/imagePreview';
import { createProductHandler } from '../../../../state/slices/shop/products/productSlice';
import { useSelector } from 'react-redux';
import { REQUEST_STATUS } from '../../../../state/slices/constants';
import { loadSubCategories } from '../../../../state/slices/shop/brands/brands';
import {
    editProduct,
    Folders,
    selectBrandFunc,
    updateInfoHandler,
} from './components';
//folders
const Product = ({
    myBrandData,
    dispatch,
    neededInfo,
    allProducts,
    showingInfo,
}) => {
    const [formData, setFormData] = useState({
        prodName: showingInfo ? showingInfo.prodName : '',
        prodPrice: showingInfo ? showingInfo.prodPrice : '',
        prodBrand: showingInfo ? showingInfo.prodBrand : '',
        prodSub_Category: showingInfo ? showingInfo.prodSub_Category : '',
        prodCategory: showingInfo ? showingInfo.prodCategory : '',
        prodGroup: showingInfo ? showingInfo.prodGroup : '',
        prodVari: {
            weight: showingInfo ? showingInfo.prodVari[0].weight : '',
            unit: showingInfo ? showingInfo.prodVari[0].unit : '',
            size: showingInfo ? showingInfo.prodVari[0].size : '',
            color: showingInfo ? showingInfo.prodVari[0].color : '',
            gender: showingInfo ? showingInfo.prodVari[0].gender : '',
        },
        images: [],
        prodKey: showingInfo ? showingInfo.prodKey : '',
        prodInfo: showingInfo ? showingInfo.prodInfo : '',
        shopName: neededInfo.shopData.data.shopName,
        store: neededInfo.shopData.data.store.toLowerCase(),
    });
    const newProd = useSelector((state) => state.reducer.myNewProduct);
    const [productCategory, setProductCategory] = useState(null);
    const [productGroup, setProductGroup] = useState([]);

    let newValue = {};
    const updateValue = (newVal, variable) => {
        updateInfoHandler(newVal, variable, newValue, formData, setFormData);
    };
    console.log(formData);

    useEffect(() => {
        showingInfo &&
            setProductGroup(
                loadSubCategories(
                    showingInfo.prodCategory,
                    showingInfo.prodSub_Category
                )
            );
    }, []);

    const createProduct = () => {
        createProductHandler(
            {
                ...formData,
                prodName: formData.prodName.split('-').join('_'),
            },
            dispatch,
            neededInfo
        );
    };

    let folders = null;
    folders =
        allProducts.type === 'success' &&
        (folders = allProducts.message.map((each, index) => {
            return (
                <Folders
                    key={index}
                    name={each.prodName}
                    id={each._id}
                    price={each.prodPrice}
                    prodImage={each.images}
                    neededInfo={neededInfo}
                />
            );
        }));

    return (
        <>
            <section className="relative mx-3">
                <div className="lg:w-[calc(100%-280px)]">
                    <div className="flex items-center h-44 relative overflow-x-auto w-full myScroll-x bg-slate-50 px-4 w-full border-4 border-slate-50">
                        <div className="flex justify-between items-center px-4 m-2 w-48 h-20 border min-w-[200px] rounded-lg bg-slate-50 shadow-sm">
                            <h5 className="text-gray-200 relative">
                                <FaImage className="text-6xl" />
                                <i className="text-sm shadow-md w-6 h-6 bg-white rounded-full flex items-center justify-center absolute top-5 left-4">
                                    <FaPlus />
                                </i>
                            </h5>
                            <div className="flex flex-col justify-evenly h-full">
                                <h5 className="font-bold text-gray-200">New</h5>
                            </div>
                        </div>
                        {folders}
                    </div>
                    <div className=" px-1 md:px-5 flex justify-center md:items-center flex-col pt-5 w-full overflow-auto">
                        <div className="w-full px-0 md:px-5">
                            <div className="w-full flex flex-col justify-center sm:flex-row flex-wrap items-center">
                                <div className="w-full sm:w-1/2 max-w-[280px] md:w-[250px] max- sm:m-1">
                                    <InputGroup
                                        label="Product Name"
                                        name="name"
                                        placeholder=" "
                                        value={formData.prodName}
                                        required={true}
                                        onChange={(e) =>
                                            updateValue(e.target.value, 'name')
                                        }
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 max-w-[280px] md:w-[250px] sm:m-1">
                                    <InputGroup
                                        label="Price"
                                        name="name"
                                        placeholder=" "
                                        value={formData.prodPrice}
                                        required={true}
                                        type="number"
                                        onChange={(e) =>
                                            updateValue(e.target.value, 'price')
                                        }
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 max-w-[280px] md:w-[250px] sm:m-1">
                                    <InputGroup
                                        label="ref key (optional)."
                                        name="name"
                                        placeholder=" "
                                        value={formData.prodKey}
                                        onChange={(e) =>
                                            updateValue(
                                                e.target.value,
                                                'reference'
                                            )
                                        }
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 max-w-[280px] md:w-[250px] sm:m-1">
                                    <SelectPicker
                                        label="Brand Name"
                                        data={myBrandData}
                                        className="w-full bg-slate-100"
                                        size="lg"
                                        placeholder={
                                            showingInfo
                                                ? `Brand (${formData.prodBrand})`
                                                : 'Select Brand'
                                        }
                                        onChange={(value) => {
                                                selectBrandFunc(
                                                    setProductCategory,
                                                    value,
                                                    updateValue,
                                                    setProductGroup
                                                )
                                            }
                                        }
                                        onClean={() => updateValue('', 'brand')}
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 max-w-[280px] md:w-[250px] sm:m-1">
                                    <SelectPicker
                                        data={productGroup}
                                        className="w-full bg-slate-100"
                                        size="lg"
                                        disabled={formData.prodBrand === ''}
                                        placeholder={
                                            showingInfo
                                                ? `Collection (${formData.prodGroup})`
                                                : 'Product Collections'
                                        }
                                        onChange={(value) => {
                                            updateValue(value, 'prodGroup');
                                        }}
                                        onClean={() =>
                                            updateValue('', 'prodGroup')
                                        }
                                    />
                                </div>
                            </div>
                            <label className="block text-sm font-bold mt-7 text-slate-700 tracking-wider mb-1">
                                Product Specifications
                                <span className="text-red-600 dark:text-red-500">
                                    *
                                </span>
                            </label>
                            <div className="flex flex-wrap w-full justify-center">
                                {productCategory !== 'Wears' && (
                                    <SelectPicker
                                        data={productInformation.weight}
                                        className=" w-full sm:w-1/5 min-w-[280px] m-1 md:m-2 bg-slate-100"
                                        size="lg"
                                        placeholder={
                                            showingInfo
                                                ? `Weight (${formData.prodVari.weight})`
                                                : 'Weight'
                                        }
                                        onChange={(value) =>
                                            updateValue(value, 'weight')
                                        }
                                    />
                                )}
                                {productCategory !== 'Wears' && (
                                    <SelectPicker
                                        data={productInformation.unit}
                                        className=" w-full sm:w-1/5 min-w-[280px] m-1 md:m-2 bg-slate-100"
                                        size="lg"
                                        placeholder={
                                            showingInfo
                                                ? `Unit (${formData.prodVari.unit})`
                                                : 'Unit'
                                        }
                                        onChange={(value) =>
                                            updateValue(value, 'unit')
                                        }
                                    />
                                )}
                                <SelectPicker
                                    data={productInformation.gender}
                                    className=" w-full sm:w-1/5 min-w-[280px] m-1 md:m-2 bg-slate-100"
                                    size="lg"
                                    placeholder={
                                        showingInfo
                                            ? `Gender (${formData.prodVari.gender})`
                                            : 'Gender'
                                    }
                                    onChange={(value) =>
                                        updateValue(value, 'gender')
                                    }
                                />
                                <CheckPicker
                                    data={productInformation.color}
                                    placeholder={
                                        showingInfo
                                            ? `Colors (${formData.prodVari.color})`
                                            : 'Available colors'
                                    }
                                    className=" w-full sm:w-1/5 min-w-[280px] m-1 md:m-2 bg-slate-100"
                                    size="lg"
                                    onChange={(value) =>
                                        updateValue(value, 'color')
                                    }
                                />
                                <CheckPicker
                                    data={productInformation.size}
                                    className=" w-full sm:w-1/5 min-w-[280px] m-1 md:m-2 bg-slate-100"
                                    size="lg"
                                    placeholder={
                                        showingInfo
                                            ? `Size (${formData.prodVari.size})`
                                            : 'Size'
                                    }
                                    onChange={(value) =>
                                        updateValue(value, 'size')
                                    }
                                />
                            </div>
                            <div className="w-full m-1">
                                <TextAreaGroup
                                    label="Give a short description"
                                    placeholder=" "
                                    value={formData.prodInfo}
                                    required={true}
                                    onChange={(e) =>
                                        updateValue(e.target.value, 'note')
                                    }
                                />
                            </div>
                            <label className="block text-sm font-bold text-slate-700 tracking-wider mb-1">
                                Add Images
                                <span className="text-red-600 dark:text-red-500">
                                    *
                                </span>
                            </label>
                            <ImagePreview
                                setFileList={updateValue}
                                fileList={formData.images}
                            />
                        </div>

                        <div className="mt-4 w-4/5"></div>
                    </div>
                    <div className="flex justify-center mt-10 pb-20">
                        {!showingInfo && (
                            <button
                                onClick={createProduct}
                                className="text-center w-[300px] h-10 rounded bg-slate-600 text-white font-bold text-md"
                            >
                                Create Product
                            </button>
                        )}
                        {showingInfo && (
                            <button
                                onClick={() =>
                                    editProduct(
                                        formData,
                                        showingInfo,
                                        dispatch,
                                        neededInfo
                                    )
                                }
                                className="text-center w-[300px] h-10 rounded bg-slate-600 text-white font-bold text-md"
                            >
                                Update Product
                            </button>
                        )}
                    </div>
                </div>
            </section>
            {newProd.status === REQUEST_STATUS.PENDING && (
                <div className="absolute z-50 top-0 left-0 w-full h-full">
                    <Loader
                        backdrop
                        speed="fast"
                        content="In few seconds..."
                        vertical
                    />
                </div>
            )}
        </>
    );
};
export default Product;
