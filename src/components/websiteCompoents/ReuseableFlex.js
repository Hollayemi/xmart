import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CountCart,
    LoadCart,
} from '../../pages/website/containers/products/components';
import RandomSearch from '../../pages/website/containers/randomSearch';
import { sliderLinkHandler } from '../../state/slices/home';
import Footer from './Footer';
import Header from './Header';
const SearchWrapper = (props) => {
    const [expandCate, setCategory] = useState(null);
    const [availableCate, setAvailableCate] = useState([]);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    useEffect(() => {
        sliderLinkHandler(dispatch, setAvailableCate);
    }, []);
    const [open, setOpen] = useState(false);
    return (
        <section className="bg-slate-50">
            <div className="md:h-10"></div>
            <Header
                expandCate={expandCate}
                setCategory={setCategory}
                open={open}
                setOpen={setOpen}
                availableCate={availableCate}
                setSearch={setSearch}
                search={search}
                cartItems={{
                    data: <LoadCart useSelector={useSelector} />,
                    total: <CountCart useSelector={useSelector} />,
                }}
            />
            {!search ? props.children : <RandomSearch search={search} />}
            <footer className="mt-10">
                <Footer />
            </footer>
        </section>
    );
};
export default SearchWrapper;
