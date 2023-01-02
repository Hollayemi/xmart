import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardWrapper from '../../../../../components/AdminComponents';
import { TopTitle } from '../../../../../components/SellerComponents/Dashboard/topTitle';
import colImage from '../../../../../assets/images/main/collections blue.png';
import brandImg from '../../../../../assets/images/main/folder2.png';
import prodImage from '../../../../../assets/images/main/folder.png';
import { getStoreInfo } from '../../../../../state/slices/admin/fetch';
import { List, Loader, Panel, PanelGroup, Placeholder, Tag } from 'rsuite';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFileDownload } from 'react-icons/fa';
import { ImageName } from './components';

const StoreDetails = () => {
    const dispatch = useDispatch();
    const { adminData } = useSelector((state) => state.reducer.adminReducer);
    const useQuery = new URLSearchParams(window.location.search);
    const store = useQuery.get('store');

    const [storeData, setStoreData] = useState(null);
    const [storeFiles, setStoreFiles] = useState(null);
    useEffect(() => {
        getStoreInfo(dispatch, setStoreData, setStoreFiles, adminData, store);
    }, []);

    return (
        <DashboardWrapper>
            <section className="px-2 md:px-5 w-full min-w-[290px]">
                <div className="md:p-3 pt-5 w-full">
                    <TopTitle
                        header="store"
                        title={`${storeData?.shopName}'s in brief`}
                        info="Brief review of xMart store"
                    />
                </div>
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-3/5 lg:p-2 pt-2">
                        <div className="w-full bg-slate-50 lg:p-2 rounded-md">
                            {storeData ? (
                                <ImageName storeData={storeData} />
                            ) : (
                                <Placeholder.Paragraph
                                    style={{ marginTop: 30 }}
                                    graph="circle"
                                />
                            )}
                            <div className="flex flex-col justify-center items-center pt-8 mt-4">
                                Primary Categories
                                <div className="mt-1">
                                    {storeData?.Category.map((res, i) => (
                                        <Tag
                                            key={i}
                                            closable
                                            className="shadow"
                                        >
                                            {res}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                            <div className="ml-2 mt-6 flex justify-center">
                                <div className="w-[320px]">
                                    <Listing
                                        title="CAC"
                                        value={
                                            <div className="flex items-center">
                                                <h5>{storeData?.CAC.key}</h5>
                                                <i className="ml-3 text-blue-500 text-xl">
                                                    <FaFileDownload />
                                                </i>
                                            </div>
                                        }
                                    />
                                    <br />
                                    <Listing
                                        title="TIN"
                                        value={
                                            <div className="flex items-center">
                                                <h5>{storeData?.CAC.key}</h5>
                                                <i className="ml-3 text-blue-500 text-xl">
                                                    <FaFileDownload />
                                                </i>
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="md:px-10">
                                <Panel bordered header="Address">
                                    {storeData ? (
                                        <List>
                                            <List.Item className="bg-transparent">
                                                Street:{' '}
                                                {storeData.Location[0].street}
                                            </List.Item>
                                            <List.Item className="bg-transparent">
                                                City:{' '}
                                                {storeData.Location[0].city}
                                            </List.Item>
                                            <List.Item className="bg-transparent">
                                                State:{' '}
                                                {storeData.Location[0].state}
                                            </List.Item>
                                            <List.Item className="bg-transparent">
                                                Postal Code:{' '}
                                                {
                                                    storeData.Location[0]
                                                        .postalCode
                                                }
                                            </List.Item>
                                            <List.Item className="bg-transparent">
                                                Landmark:{' '}
                                                {storeData.Location[0].landMark}
                                            </List.Item>
                                        </List>
                                    ) : (
                                        <div className="h-10 flex justify-center">
                                            <Loader />
                                        </div>
                                    )}
                                </Panel>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5 pt-2 lg:p-2">
                        <div className="w-full bg-slate-50 p-2 px-3 pb-6 rounded-md">
                            <div className="">
                                <h5>Files summary</h5>
                            </div>
                            {storeFiles ? (
                                <>
                                    <div className="flex mt-2 items-center flex-wrap">
                                        <FileSummary
                                            title="Available Products"
                                            image={prodImage}
                                            total={
                                                storeFiles.Total_products -
                                                storeFiles.products
                                            }
                                            color="green"
                                        />
                                        <FileSummary
                                            title="Available Category"
                                            image={colImage}
                                            total={
                                                storeFiles.Total_categories -
                                                storeFiles.categories
                                            }
                                            color="blue"
                                        />
                                        <FileSummary
                                            title="Available Brand"
                                            image={brandImg}
                                            total={
                                                storeFiles.Total_brands -
                                                storeFiles.brands
                                            }
                                            color="slate"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <PanelGroup accordion>
                                            <Panel header="Collections">
                                                <PanelGroup accordion bordered>
                                                    {storeFiles.myCategories.map(
                                                        (res, i) => (
                                                            <Panel
                                                                header={
                                                                    res.collectionName
                                                                }
                                                                eventKey={`col${i}`}
                                                                id={`col${i}`}
                                                            >
                                                                <Listing
                                                                    title="category"
                                                                    value={
                                                                        res.category
                                                                    }
                                                                />
                                                                <Listing
                                                                    title="Info"
                                                                    value={
                                                                        res.collectionInfo
                                                                    }
                                                                />
                                                            </Panel>
                                                        )
                                                    )}
                                                </PanelGroup>
                                            </Panel>
                                            <Panel header="Brands">
                                                <PanelGroup accordion bordered>
                                                    {storeFiles.myBrands.map(
                                                        (res, i) => (
                                                            <Panel
                                                                header={
                                                                    res.brandName
                                                                }
                                                                eventKey={`brand${i}`}
                                                                id={`brand${i}`}
                                                            >
                                                                <Listing
                                                                    title="Collection"
                                                                    value={
                                                                        res.brandCollection
                                                                    }
                                                                />
                                                                <Listing
                                                                    title="Sub Category"
                                                                    value={
                                                                        res.sub_category
                                                                    }
                                                                />
                                                                <Listing
                                                                    title="ref key"
                                                                    value={
                                                                        res.refKey
                                                                    }
                                                                />
                                                                <Listing
                                                                    title="Info"
                                                                    value={
                                                                        res.brandInfo
                                                                    }
                                                                />
                                                            </Panel>
                                                        )
                                                    )}
                                                </PanelGroup>
                                            </Panel>

                                            <Panel header="Products">
                                                <div className="flex items-center">
                                                    <h5>Go to </h5>
                                                    <div className="ml-2 flex items-center justify-center text-blue-400">
                                                        <h5 className="mr-1">
                                                            <Link
                                                                to={`/admin/dashboard/stores/product-list?store=${store}`}
                                                            >
                                                                Store Products
                                                            </Link>
                                                        </h5>
                                                        <FaArrowRight />
                                                    </div>
                                                </div>
                                            </Panel>
                                        </PanelGroup>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-16">
                                    <Loader />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </DashboardWrapper>
    );
};

export default StoreDetails;

const FileSummary = ({ image, title, total, color }) => {
    return (
        <div className="flex items-center mr-4">
            <div className="h-8 w-8 flex items-center justify-centetr">
                <img src={image} className="h-7 w-7" alt="file-1" />
            </div>
            <h5 className="ml-1">{title}</h5>
            <div
                className={`h-5 w-5 flex items-center justify-center bg-${color}-200 ml-2 rounded-full`}
            >
                <h5 className={` text-xs`}>{total}</h5>
            </div>
        </div>
    );
};

const Listing = ({ title, value }) => (
    <div className={`w-full flex items-start`}>
        <span className="w-32 font-bold">{title}</span>
        <h5 className="w-4/6">{value}</h5>
    </div>
);
