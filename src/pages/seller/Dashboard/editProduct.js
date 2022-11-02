import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import image1 from '../../../assets/images/png/_supreme3.png';
import { productsList } from '../../../state/slices/shop/display/allProducts';
import {
    FaEdit,
    FaTrash,
    FaLongArrowAltRight,
    FaEye,
    FaTimesCircle,
    FaCheckDouble,
    FaClock,
} from 'react-icons/fa';
import DrawerPanel from '../../../components/elements/DrawerPanel';
import ViewProduct from '../../../components/elements/DrawerPanel/drawerContent/viewProduct';

const EditProduct = ({ store, setShowing, setShowingInfo, verify }) => {
    const dispatch = useDispatch();
    const [allProducts, setProducts] = useState([]);
    const [view, setView] = useState();
    useEffect(() => {
        const payload = {
            nick: store.toLowerCase(),
        };
        productsList(payload, dispatch, setProducts);
    }, []);

    return (
        <section className="min-h-screen pb-10 lg:w-[calc(100%-280px)]">
            {allProducts.map((res, index) => {
                return (
                    <section className="px-4 mt-8" key={index}>
                        <div className="Lucida flex items-center w-full  myScroll-x overflow-auto  my-2 mt-3 font-bold">
                            <h5 className="min-w-fit">
                                {res._id.secName} ({res.total})
                            </h5>
                            <FaLongArrowAltRight className="ml-2" />
                            <span className="font-[400] ml-5 flex items-center">
                                Filter:
                                {res.group.map((res, index) => {
                                    return (
                                        <h5
                                            key={index}
                                            className="mx-2 hover:text-blue-400 min-w-fit cursor-pointer"
                                        >
                                            {res}
                                        </h5>
                                    );
                                })}
                            </span>
                        </div>
                        <OneProduct
                            subCate={res.detail}
                            setShowing={setShowing}
                            setShowingInfo={setShowingInfo}
                            setView={setView}
                        />
                    </section>
                );
            })}
            <DrawerPanel
                placement="right"
                title="Product Info"
                size="xs"
                children={<ViewProduct id={view} verify={verify && verify} />}
                backdrop={true}
                open={view && true}
                handleClose={() => setView(false)}
            />
        </section>
    );
};

export default EditProduct;

export const OneProduct = ({
    subCate,
    setShowing,
    setShowingInfo,
    setView,
    hideFuncs,
}) => {
    const setUpdateInfo = (prodInfo) => {
        setShowingInfo(prodInfo);
        setShowing('Store_Products');
    };
    let allProducts = subCate.map((res, index) => {
        return (
            <div
                key={index}
                className="border mx-3 min-w-[150px] relative w-44 border rounded-t-md"
            >
                <i className="absolute top-0 right-0">
                    {res.approved === 1 && (
                        <FaCheckDouble
                            title="Approved"
                            className="text-green-300 rounded-full border-2"
                        />
                    )}
                    {res.approved === 0 && (
                        <FaTimesCircle
                            title="Rejected, learn about how to upload on xMart"
                            className="text-red-500 rounded-full border-2"
                        />
                    )}
                    {res.approved === 2 && (
                        <FaClock
                            title="waiting for approval"
                            className="text-orange-500 rounded-full border-2"
                        />
                    )}
                </i>
                <div className="w-full flex justify-center mt-2">
                    <img src={image1} alt="prodImg" className="w-28 h-28" />
                </div>
                <h5 className="Lucida h-10 w-full mt-2 text-center text-sm font-[400]">
                    {res.prodName}
                </h5>
                <div
                    className={`${
                        hideFuncs && 'hidden '
                    } flex justify-center items-center`}
                >
                    <button
                        onClick={() => setUpdateInfo(res)}
                        className="m-1 p-2"
                    >
                        <FaEdit />
                    </button>
                    <button className="m-1 p-1">
                        <FaTrash />
                    </button>
                    <button
                        onClick={() => setView(res._id)}
                        className="m-1 p-1"
                    >
                        <FaEye />
                    </button>
                </div>
            </div>
        );
    });
    return (
        <div className="flex rounded myScroll-x overflow-auto shadow bg-white py-3 items-center">
            {allProducts}
        </div>
    );
};
