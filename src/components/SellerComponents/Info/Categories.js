import Slider from 'react-slick';
import LadiesImage from '../../../assets/images/png/purchase.png';
import MenImage from '../../../assets/images/png/Landing/main5.jpg';
import FootImage from '../../../assets/images/png/Landing/main2.png';
import fakeImg1 from '../../../assets/images/png/_supreme.png';
import fakeImg2 from '../../../assets/images/png/_supreme2.jpg';
import fakeImg3 from '../../../assets/images/png/_supreme3.png';
import fakeImg4 from '../../../assets/images/png/_supreme4.png';
import { MySlickSlide } from '../../../pages/website/Home';
import { websiteImages } from '../../websiteCompoents/Images';

export const MartCategories = [
    'Men',
    'Women',
    'Kids & Babies',
    'Liquor',
    'Kitchen Appliances',
    'Home Appliances',
    'Phones & Smartwatches',
    'Camping & Outdoors',
    'Beauty',
    'Book & Courses',
    'Fashion & Luggage',
    'Computer & Electronics',
    'Toys',
    'Office & Stationary',
    'Pets',
    'Sport & Training',
    'Tv, Audio & Media',
    'Gaming',
    'Health & Person',
];

const settings2 = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
};

const SliderImages = ({ images }) => (
    <div className="h-32 md:h-48 relative md:-mt-6">
        <Slider {...settings2}>
            {images.map((img, i) => (
                <MySlickSlide
                    key={i}
                    h="h-32 md:h-48"
                    image={websiteImages[img]}
                />
            ))}
        </Slider>
    </div>
);

export const HomeDisplay = {
    Men: [
        'Get decent wears for  from xmart',
        LadiesImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
    Women: [
        'Get decent wears for women from xmart',
        LadiesImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
    Phones: [
        'Get ladies decent outfit from xmart',
        LadiesImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
    Kids: [
        'Get decent wears for  from xmart',
        FootImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
    Computer: [
        'Order for men jacket today, look different today',
        MenImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
    Home: [
        'Order for men jacket today, look different today',
        MenImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
    Pets: [
        'Order for men jacket today, look different today',
        MenImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
    Tv: [
        'High quality of leader shoes from xmart',
        FootImage,
        <SliderImages images={['shopDrinks', 'kitchenEquipment']} />,
    ],
};

export const martCategories = [
    {
        label: 'xMart Categories',
        value: 'home',
        children: [
            {
                label: 'Women',
                value: 'Women',
                children: [
                    {
                        label: 'Clothing',
                        value: 'Clothing',
                        children: [
                            {
                                label: 'Knitwear',
                                value: 'Knitwear',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Trousers & Chinos',
                                value: 'Trousers & Chinos',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Swimwear',
                                value: 'Swimwear',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'T-Shirts',
                                value: 'T-Shirts',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Underwear',
                                value: 'Underwear',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Suits',
                                value: 'Suits',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Skirts',
                                value: 'Skirts',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Shorts',
                                value: 'Shorts',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Sleep & Lounge',
                                value: 'Sleep & Lounge',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Jumpsuits, Rompers & Overalls',
                                value: 'Jumpsuits, Rompers & Overalls',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Leggings',
                                value: 'Leggings',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Undies',
                                value: 'Undies',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Maternity',
                                value: 'Maternity',
                                spec: ['size', 'color'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Accessories',
                        value: 'Ladies Wears',
                        children: [
                            {
                                label: 'Belts',
                                value: 'Belts',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Hats & Caps',
                                value: 'Hats & Caps',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Bags',
                                value: 'Bags',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Sunglasses',
                                value: 'Sunglasses',
                                spec: ['size', 'color', 'type'],
                                children: [],
                            },
                            {
                                label: 'Watches & Eyewear',
                                value: 'Watches & Eyewear',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Scarves & head ties',
                                value: 'Scarves & head ties',
                                spec: ['size', 'color', 'length'],
                                children: [],
                            },
                            {
                                label: 'Ladies Wrist Wear',
                                value: 'Ladies Wrist Wear',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Wallets',
                                value: 'Wallets',
                                spec: ['size', 'color', 'spaces'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Beauty',
                        value: 'Beauty',
                        children: [
                            {
                                label: 'Hair Care',
                                value: 'Hair Care',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Skincare',
                                value: 'Skincare',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Make-up & Nails',
                                value: 'Make-up & Nails',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Fragrances',
                                value: 'Fragrances',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Body, Bath & Shower',
                                value: 'Body, Bath & Shower',
                                spec: ['size', 'color', 'quantity'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Shoes',
                        value: 'Shoes',
                        children: [
                            {
                                label: 'Boot Shoes',
                                value: 'Boot Shoes',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Flat Shoes',
                                value: 'Flat Shoes',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Heels',
                                value: 'Heels',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Sandals',
                                value: 'Sandals',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Sneakers & Canvas',
                                value: 'Sneakers & Canvas',
                                spec: ['size', 'color', 'texture', 'gender'],
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Men',
                value: 'Men',
                children: [
                    {
                        label: 'Clothing',
                        value: 'Clothing',
                        spec: ['size', 'color', 'gender'],
                        children: [
                            {
                                label: 'Knitwear',
                                value: 'Knitwear',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Trousers & Chinos',
                                value: 'Trousers & Chinos',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Swimwear',
                                value: 'Swimwear',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Jeans',
                                value: 'Jeans',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'T-Shirts',
                                value: 'T-Shirts',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Underwear',
                                value: 'Underwear',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Suits',
                                value: 'Suits',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Socks',
                                value: 'Socks',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Shorts',
                                value: 'Shorts',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Sleep & Lounge',
                                value: 'Sleep & Lounge',
                                children: [],
                            },
                            {
                                label: 'Jumpsuits, Rompers & Overalls',
                                value: 'Jumpsuits, Rompers & Overalls',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Accessories',
                        value: 'Accessories',
                        children: [
                            {
                                label: 'Belts',
                                value: 'Belts',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Jewellery',
                                value: 'Jewellery',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Hats & Caps',
                                value: 'Hats & Caps',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Bags',
                                value: 'Bags',
                                spec: ['size', 'color', 'texrure'],
                                children: [],
                            },
                            {
                                label: 'Sunglasses',
                                value: 'Sunglasses',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Watches & Eyewear',
                                value: 'Watches & Eyewear',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Cuff Links, Shirt Studs & Tie Clips',
                                value: 'Cuff Links, Shirt Studs & Tie Clips',
                                children: [],
                            },
                            {
                                label: 'Men Wrist Wear',
                                value: 'Men Wrist Wear',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Wallets',
                                value: 'Wallets',
                                spec: ['size', 'color', 'spaces'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Grooming',
                        value: 'Grooming',
                        children: [
                            {
                                label: 'Hair Care',
                                value: 'Hair Care',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Skincare',
                                value: 'Skincare',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Shaving',
                                value: 'Shaving',
                                spec: ['size', 'color', 'Blades'],
                                children: [],
                            },
                            {
                                label: 'Fragrances',
                                value: 'Fragrances',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Body, Bath & Shower',
                                value: 'Body, Bath & Shower',
                                spec: ['size', 'color'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Shoes',
                        value: 'Shoes',
                        children: [
                            {
                                label: 'Boots',
                                value: 'Boots',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Casual Shoes',
                                value: 'Casual Shoes',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Formal Shoes',
                                value: 'Formal Shoes',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Slippers & Flip-flops',
                                value: 'Slippers & Flip-flops',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Sneakers & Canvas',
                                value: 'Sneakers & Canvas',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Sport Shoes',
                                value: 'Sport Shoes',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Kids & Babies',
                value: 'Kids & Babies',
                children: [
                    {
                        label: 'Clothing',
                        value: 'Clothing',
                        children: [
                            {
                                label: 'T-shirt',
                                value: 'T-shirt',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Polo',
                                value: 'Polo',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                            {
                                label: 'Jeans',
                                value: 'Jeans',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Accessories',
                        value: 'Accessories',
                        children: [
                            {
                                label: 'School Bags',
                                value: 'School Bags',
                                spec: ['size', 'color', 'texture'],
                                children: [],
                            },
                            {
                                label: 'Baby care & Nursery',
                                value: 'Baby care & Nursery',
                                spec: ['size', 'color', 'weight'],
                                children: [],
                            },
                            {
                                label: 'Changing & Feeding',
                                value: 'Changing & Feeding',
                                spec: ['size', 'color', 'gender'],
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Phones & Smartwatches',
                value: 'Phones & Smartwatches',
                children: [
                    {
                        label: 'Cellphones',
                        value: 'Cellphones',
                        children: [
                            {
                                label: 'Tecno',
                                value: 'Tecno',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Infinix',
                                value: 'Infinix',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Gionee',
                                value: 'Gionee',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Redmi',
                                value: 'Redmi',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Samsung',
                                value: 'Samsung',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Xiaomi',
                                value: 'Xiaomi',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Apple',
                                value: 'Apple',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Huawei',
                                value: 'Huawei',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Hisense',
                                value: 'Hisense',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Nokia',
                                value: 'Nokia',
                                spec: ['model no', 'phoneSpec', 'color'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Cellular Accessories',
                        value: 'Cellular Accessories',
                        spec: ['size', 'color', 'gender'],
                        children: [
                            {
                                label: 'Android Cord',
                                value: 'Android Cord',
                                spec: ['length', 'speed', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'Phone Pouch',
                                value: 'Phone Pouch',
                                spec: ['Phone', 'phoneSpec', 'color'],
                                children: [],
                            },
                            {
                                label: 'Power Bank',
                                value: 'Power Bank',
                                spec: ['capacity', 'color'],
                                children: [],
                            },
                            {
                                label: 'Type C Charger',
                                value: 'Type C Charger',
                                spec: ['length', 'speed', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'iPhone Charger',
                                value: 'iPhone Charger',
                                spec: ['length', 'speed', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'Case',
                                value: 'Case',
                                spec: ['length', 'speed', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'Earpiece',
                                value: 'Earpiece',
                                spec: ['color', 'thickness', 'plug'],
                                children: [],
                            },
                            {
                                label: 'Phone Glass Protector',
                                value: 'Phone Glass Protector',
                                spec: ['Phone'],
                                children: [],
                            },
                            {
                                label: 'Phone Stand Tripod',
                                value: 'Phone Stand Tripod',
                                spec: ['height', 'color'],
                                children: [],
                            },
                            {
                                label: 'Selfie Stick',
                                value: 'Selfie Stick',
                                spec: ['height', 'controller', 'color'],
                                children: [],
                            },
                            {
                                label: 'Earbuds',
                                value: 'Earbuds',
                                spec: ['fingerprint', 'color', 'sound'],
                                children: [],
                            },
                            {
                                label: 'Headphones',
                                value: 'Headphones',
                                spec: [
                                    'fingerprint',
                                    'color',
                                    'sound',
                                    'bluetooth',
                                ],
                                children: [],
                            },
                            {
                                label: 'Others',
                                value: 'Others',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Tablets & Kindles',
                        value: 'Tablets & Kindles',
                        children: [],
                    },
                    {
                        label: 'Smartwatches',
                        value: 'Smartwatches',
                        spec: ['color', 'watchSpec', 'size'],
                        children: [
                            {
                                label: 'Luxury Smartwatch',
                                value: 'Luxury Smartwatch',
                                spec: ['color', 'watchSpec', 'size'],
                                children: [],
                            },
                            {
                                label: 'Budget Smartwatch',
                                value: 'Budget Smartwatch',
                                spec: ['color', 'watchSpec', 'size'],
                                children: [],
                            },
                            {
                                label: 'GPS Smartwatch',
                                value: 'GPS Smartwatch',
                                spec: ['color', 'watchSpec', 'size'],
                                children: [],
                            },
                            {
                                label: 'Hybrid Smartwatch',
                                value: 'Hybrid Smartwatch',
                                spec: ['color', 'watchSpec', 'size'],
                                children: [],
                            },
                            {
                                label: 'Fitness Tracker',
                                value: 'Fitness Tracker',
                                spec: ['color', 'watchSpec', 'size'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Repairing Accessories',
                        value: 'Repairing Accessories',
                        children: [
                            {
                                label: 'For iPhone',
                                value: 'For iPhone',
                                children: [],
                            },
                            {
                                label: 'For Android',
                                value: 'For Android',
                                children: [],
                            },
                            {
                                label: 'For Smartwatch',
                                value: 'For Smartwatch',
                                children: [],
                            },
                            {
                                label: 'For Tablets',
                                value: 'For Tablets',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Computer & Electronics',
                value: 'Computer & Electronics',
                children: [
                    {
                        label: 'Computers & Laptops',
                        value: 'Computers & Laptops',
                        children: [
                            {
                                label: 'Hp',
                                value: 'Hp',
                                spec: ['computerSpec'],
                                children: [],
                            },
                            {
                                label: 'Acer',
                                value: 'Acer',
                                spec: ['computerSpec'],
                                children: [],
                            },
                            {
                                label: 'Dell',
                                value: 'Dell',
                                spec: ['computerSpec'],
                                children: [],
                            },
                            {
                                label: 'Zinox',
                                value: 'Zinox',
                                spec: ['computerSpec'],
                                children: [],
                            },
                            {
                                label: 'Macbook',
                                value: 'Macbook',
                                spec: ['computerSpec'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Smart Home',
                        value: 'Smart Home',
                        children: [],
                    },
                    {
                        label: 'Desktop',
                        value: 'Desktop',
                        children: [
                            {
                                label: 'Monitors',
                                value: 'Monitors',
                                spec: ['monitorSpec'],
                                children: [],
                            },
                            {
                                label: 'Networking',
                                value: 'Networking',
                                children: [],
                            },
                            {
                                label: 'Software',
                                value: 'Software',
                                children: [],
                            },
                            {
                                label: 'Storage Devices',
                                value: 'Storage Devices',
                                spec: ['size'],
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Computer Accessories',
                        value: 'Computer Accessories',
                        children: [
                            {
                                label: 'Battery',
                                value: 'Battery',
                                spec: ['capacity'],
                                children: [],
                            },
                            {
                                label: 'Keyboard',
                                value: 'Keyboard',
                                children: [],
                            },
                            {
                                label: 'Mouse',
                                value: 'Mouse',
                                children: [],
                            },
                            {
                                label: 'Charger',
                                value: 'Charger',
                                children: [],
                            },
                            {
                                label: 'Screen',
                                value: 'Screen',
                                children: [],
                            },
                            {
                                label: 'Other Computer Accessories',
                                value: 'Other Computer Accessories',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Digital Cameras',
                        value: 'Digital Cameras',
                        children: [
                            {
                                label: 'Canon',
                                value: 'Canon',
                                children: [],
                            },
                            {
                                label: 'Nikik',
                                value: 'Nikik',
                                children: [],
                            },
                            {
                                label: 'Digital Cameras Accessories',
                                value: 'Digital Cameras Accessories',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Action Cams & Drones',
                        value: 'Action Cams & Drones',
                        children: [],
                    },
                    {
                        label: 'Household Materials',
                        value: 'Household Materials',
                        children: [
                            {
                                label: 'Generators',
                                value: 'Generators',
                                children: [],
                            },
                            {
                                label: 'Television',
                                value: 'Television',
                                children: [],
                            },
                            {
                                label: 'Air Conditioners',
                                value: 'Air Conditioners',
                                children: [],
                            },
                            {
                                label: 'Solar',
                                value: 'Solar',
                                children: [],
                            },
                            {
                                label: 'Electric cookers',
                                value: 'Electric cookers',
                                children: [],
                            },
                            {
                                label: 'Electirc Fans',
                                value: 'Electirc Fans',
                                children: [],
                            },
                            {
                                label: 'Washing Machines',
                                value: 'Washing Machines',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Liquor',
                value: 'Liquor',
                children: [
                    {
                        label: 'Beer & Ciders',
                        value: 'Beer & Ciders',
                        spec: ['Alcohol Percentage', 'sugar', 'Caffine'],
                        children: [],
                    },
                    {
                        label: 'Gin',
                        value: 'Gin',
                        spec: ['Alcohol Percentage', 'sugar', 'Caffine'],
                        children: [],
                    },
                    {
                        label: 'Whisky & Bourbon',
                        value: 'Whisky & Bourbon',
                        spec: ['Alcohol Percentage', 'sugar', 'Caffine'],
                        children: [],
                    },
                    {
                        label: 'Wine',
                        value: 'Wine',
                        spec: ['Alcohol Percentage', 'sugar', 'Caffine'],
                        children: [],
                    },
                    {
                        label: 'Non-alcoholic',
                        value: 'Non-alcoholic',
                        spec: ['sugar', 'Caffine'],
                        children: [],
                    },
                    {
                        label: 'Beverages',
                        value: 'Beverages',
                        children: [],
                    },
                ],
            },
            {
                label: 'Home Appliances',
                value: 'Home Appliances',
                children: [
                    {
                        label: 'Bathroom',
                        value: 'Bathroom',
                        children: [
                            {
                                label: 'Accessories',
                                value: 'Accessories',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Bath Rug',
                                value: 'Bath Rug',
                                spec: ['size', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'Towel',
                                value: 'Towel',
                                spec: ['size', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'Kids Bathroom',
                                value: 'Kids Bathroom',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Bedroom',
                        value: 'Bedroom',
                        spec: ['size', 'color'],
                        children: [
                            {
                                label: 'Bedspreads, Coverlets & Duvets',
                                value: 'Bedspreads, Coverlets & Duvets',
                                spec: ['size', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'Blankets & Throws',
                                value: 'Blankets & Throws',
                                spec: ['size', 'color', 'thickness'],
                                children: [],
                            },
                            {
                                label: 'Decorative Pillows, Inserts & Covers',
                                value: 'Decorative Pillows, Inserts & Covers',
                                spec: ['size', 'color'],
                                children: [],
                            },
                            {
                                label: 'Kids Bedding',
                                value: 'Kids Bedding',
                                spec: ['width', 'height'],
                                children: [],
                            },
                            {
                                label: 'Mattress Pads & Protectors',
                                value: 'Mattress Pads & Protectors',

                                children: [],
                            },
                            {
                                label: 'Nursery Bedding',
                                value: 'Nursery Bedding',
                                children: [],
                            },
                            {
                                label: 'Pillows & Positioners',
                                value: 'Pillows & Positioners',
                                children: [],
                            },
                            {
                                label: 'Bed',
                                value: 'Bed',
                                children: [],
                            },
                            {
                                label: 'Wardrobe',
                                value: 'Wardrobe',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Kitchen & Dining',
                        value: 'Kitchen & Dining',
                        children: [
                            {
                                label: 'Sink',
                                value: 'Sink',
                                spec: ['phase', 'color', 'size'],
                                children: [],
                            },
                            {
                                label: 'Shelves & Racks',
                                value: 'Shelves & Racks',
                                spec: ['color', 'size'],
                                children: [],
                            },
                            {
                                label: 'Pots',
                                value: 'Pots',
                                children: [],
                            },
                            {
                                label: 'Cookers',
                                value: 'Cookers',
                                children: [],
                            },
                            {
                                label: 'Dishes',
                                value: 'Dishes',
                                children: [],
                            },
                            {
                                label: 'Other Accessories',
                                value: 'Other Accessories',
                                children: [],
                            },
                            {
                                label: 'Kids Room Decor',
                                value: 'Kids Room Decor',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Indoor Decor',
                        value: 'Indoor Decor',
                        spec: ['size', 'color'],
                        children: [
                            {
                                label: 'Area Rugs, Runners & Pads',
                                value: 'Area Rugs, Runners & Pads',
                                children: [],
                            },
                            {
                                label: 'Candles & Holders',
                                value: 'Candles & Holders',
                                children: [],
                            },
                            {
                                label: 'Clocks',
                                value: 'Clocks',
                                children: [],
                            },
                            {
                                label: 'Draperies & Curtains',
                                value: 'Draperies & Curtains',
                                children: [],
                            },
                            {
                                label: 'Home Decor Accents',
                                value: 'Home Decor Accents',
                                children: [],
                            },
                            {
                                label: 'Home Fragrances',
                                value: 'Home Fragrances',
                                children: [],
                            },
                            {
                                label: 'Kids Room Decor',
                                value: 'Kids Room Decor',
                                children: [],
                            },
                            {
                                label: 'Lighting',
                                value: 'Lighting',
                                children: [],
                            },
                            {
                                label: 'Mirrors',
                                value: 'Mirrors',
                                children: [],
                            },
                            {
                                label: 'Picture Frames',
                                value: 'Picture Frames',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Book & Courses',
                value: 'Book & Courses',
                children: [],
            },
            {
                label: 'Beauty',
                value: 'Beauty',
                children: [],
            },
            {
                label: 'Fashion & Luggage',
                value: 'Fashion & Luggage',
                children: [
                    {
                        label: 'Suitcases',
                        value: 'Suitcases',
                        spec: ['color'],
                        children: [
                            {
                                label: 'Set',
                                value: 'Set',
                                children: [],
                            },
                            {
                                label: 'Medium',
                                value: 'Medium',
                                children: [],
                            },
                            {
                                label: 'Large',
                                value: 'Large',
                                children: [],
                            },
                            {
                                label: 'Small',
                                value: 'Small',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Business Bags',
                        value: 'Business Bags',
                        spec: ['size', 'color', 'texture'],
                        children: [
                            {
                                label: 'Business Bags',
                                value: 'Business Bags',
                                children: [],
                            },
                            {
                                label: 'Student Bags',
                                value: 'Student Bags',
                                children: [],
                            },
                            {
                                label: 'Fashion Bags',
                                value: 'Fashion Bags',
                                children: [],
                            },
                            {
                                label: 'Handbags',
                                value: 'Handbags',
                                children: [],
                            },
                            {
                                label: 'Backpacks & Duffles',
                                value: 'Backpacks & Duffles',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Travel Accessories',
                        value: 'Travel Accessories',
                        children: [
                            {
                                label: 'Others',
                                value: 'Others',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Watches',
                        value: 'Watches',
                        children: [
                            {
                                label: 'Leather',
                                value: 'Leather',
                                children: [],
                            },
                            {
                                label: 'Rolex',
                                value: 'Rolex',
                                children: [],
                            },
                            {
                                label: 'Gold',
                                value: 'Gold',
                                children: [],
                            },
                            {
                                label: 'Silver',
                                value: 'Silver',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Wallets & Purses',
                        value: 'Wallets & Purses',
                        children: [
                            {
                                label: 'Others',
                                value: 'Others',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Jewellery',
                        value: 'Jewellery',
                        children: [
                            {
                                label: 'Silver',
                                value: 'Silver',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Toys & Games',
                value: 'Toys & Games',
                children: [
                    {
                        label: 'Action Figures',
                        value: 'Action Figures',
                        children: [],
                    },
                    {
                        label: 'Dolls',
                        value: 'Dolls',
                        children: [],
                    },
                    {
                        label: 'Board Games',
                        value: 'Board Games',
                        children: [],
                    },
                    {
                        label: 'Card Games',
                        value: 'Card Games',
                        children: [],
                    },
                    {
                        label: 'Puzzles',
                        value: 'Puzzles',
                        children: [],
                    },
                    {
                        label: 'Kids Party Supplies',
                        value: 'Kids Party Supplies',
                        children: [],
                    },
                ],
            },
            {
                label: 'Office & Stationary',
                value: 'Office & Stationary',
                children: [],
            },
            {
                label: 'Pets',
                value: 'Pets',
                children: [
                    {
                        label: 'Dogs',
                        value: 'Dogs',
                        children: [
                            {
                                label: 'Puppy',
                                value: 'Puppy',
                                children: [],
                            },
                            {
                                label: 'Female Dog',
                                value: 'Female Dog',
                                children: [],
                            },
                            {
                                label: 'Male Dog',
                                value: 'Male Dog',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Cats',
                        value: 'Cats',
                        children: [
                            {
                                label: 'Kitten',
                                value: 'Kitten',
                                children: [],
                            },
                            {
                                label: 'Female Cat',
                                value: 'Female Cat',
                                children: [],
                            },
                            {
                                label: 'Male Cat',
                                value: 'Male Cat',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Fish',
                        value: 'Fish',
                        children: [
                            {
                                label: 'Fingerlins',
                                value: 'Fingerlins',
                                children: [],
                            },
                            {
                                label: 'Cat fishes',
                                value: 'Cat fishes',
                                children: [],
                            },
                            {
                                label: 'Roasted fishes',
                                value: 'Roasted fishes',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Small Pets',
                        value: 'Small Pets',
                        children: [],
                    },
                ],
            },
            {
                label: 'Sport & Training',
                value: 'Sport & Training',
                children: [
                    {
                        label: 'Tennis',
                        value: 'Tennis',
                        children: [
                            {
                                label: 'Egg',
                                value: 'Egg',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Soccer',
                        value: 'Soccer',
                        children: [],
                    },
                    {
                        label: 'Badmiton',
                        value: 'Badmiton',
                        children: [],
                    },
                ],
            },
            {
                label: 'Tv, Audio & Media',
                value: 'Tv, Audio & Media',
                children: [
                    {
                        label: 'TV Brands',
                        value: 'TV Brands',
                        children: [
                            {
                                label: 'Hisense',
                                value: 'Hisense',
                                children: [],
                            },
                            {
                                label: 'LG',
                                value: 'LG',
                                children: [],
                            },
                            {
                                label: 'TCL',
                                value: 'TCL',
                                children: [],
                            },
                            {
                                label: 'Vizio',
                                value: 'Vizio',
                                children: [],
                            },
                            {
                                label: 'Philips',
                                value: 'Philips',
                                children: [],
                            },
                            {
                                label: 'Samsung',
                                value: 'Samsung',
                                children: [],
                            },
                            {
                                label: 'Sony',
                                value: 'Sony',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Dishes',
                        value: 'Dishes',
                        children: [
                            {
                                label: 'DSTV',
                                value: 'DSTV',
                                children: [],
                            },
                            {
                                label: 'GOTV',
                                value: 'GOTV',
                                children: [],
                            },
                            {
                                label: 'DVD',
                                value: 'DVD',
                                children: [],
                            },
                            {
                                label: 'VCD',
                                value: 'VCD',
                                children: [],
                            },
                        ],
                    },

                    {
                        label: 'Home Entertainment',
                        value: 'Home Entertainment',
                        children: [],
                    },
                    {
                        label: 'Headsets',
                        value: 'Headsets',
                        children: [
                            {
                                label: 'Oraimo',
                                value: 'Oraimo',
                                children: [],
                            },
                            {
                                label: 'New Age',
                                value: 'New Age',
                                children: [],
                            },
                            {
                                label: 'Others',
                                value: 'Others',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'TV Series',
                        value: 'TV Series',
                        children: [],
                    },
                    {
                        label: 'Movies & Series',
                        value: 'Movies & Series',
                        children: [],
                    },
                    {
                        label: 'Guitars',
                        value: 'Guitars',
                        children: [],
                    },
                    {
                        label: 'Musical Instruments',
                        value: 'Musical Instruments',
                        children: [],
                    },
                    {
                        label: 'Keyboard',
                        value: 'Keyboard',
                        children: [],
                    },
                ],
            },
            {
                label: 'Gaming',
                value: 'Gaming',
                children: [
                    {
                        label: 'PlayStation',
                        value: 'PlayStation',
                        children: [],
                    },
                    {
                        label: 'PC Gaming',
                        value: 'PC Gaming',
                        children: [
                            {
                                label: 'PS3',
                                value: 'PS3',
                                children: [],
                            },
                            {
                                label: 'PS4',
                                value: 'PS4',
                                children: [],
                            },
                            {
                                label: 'PS5',
                                value: 'PS5',
                                children: [],
                            },
                            {
                                label: 'Key pad',
                                value: 'Key pad',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Others',
                        value: 'Others',
                        children: [],
                    },
                ],
            },
            {
                label: 'Health & Person',
                value: 'Health & Person',
                children: [
                    {
                        label: 'Health Equipment',
                        value: 'Health Equipment',
                        children: [
                            {
                                label: 'Medicine & Treatments',
                                value: 'Medicine & Treatments',
                                children: [],
                            },
                            {
                                label: 'Sanitize & First Aid',
                                value: 'Sanitize & First Aid',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Sexual Health',
                                value: 'Sexual Health',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Wellness Store',
                        value: 'Wellness Store',
                        children: [
                            {
                                label: 'Store',
                                value: 'Store',
                                children: [],
                            },
                        ],
                    },
                    {
                        label: 'Personal Care',
                        value: 'Personal Care',
                        children: [
                            {
                                label: 'Natural Care',
                                value: 'Natural Care',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                            {
                                label: 'Lip & Skin Care',
                                value: 'Lip & Skin Care',
                                spec: ['size', 'color', 'measurement'],
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const productInformation = {
    unit: [
        {
            label: 'kg',
            value: 'kg',
            children: [],
        },
        {
            label: 'litre',
            value: 'litre',
            children: [],
        },
        {
            label: 'pieces',
            value: 'pieces',
            children: [],
        },
        {
            label: 'g',
            value: 'g',
            children: [],
        },
    ],

    gender: [
        {
            label: 'Male',
            value: 'Male',
            children: [],
        },
        {
            label: 'Female',
            value: 'Female',
            children: [],
        },
        {
            label: 'Unisex',
            value: 'Unisex',
            children: [],
        },
        {
            label: 'Kids',
            value: 'Kids',
            children: [],
        },
    ],
    weight: [
        {
            label: 'small (0-10)',
            value: 'small (0-10)',
            children: [],
        },
        {
            label: 'medium (11-20)',
            value: 'medium (11-20)',
            children: [],
        },
        {
            label: 'Big (20-30)',
            value: 'Big (20-30)',
            children: [],
        },
    ],
    size: [
        {
            label: 'S (small)',
            value: 'S',
            children: [],
        },
        {
            label: 'M (medium)',
            value: 'M',
            children: [],
        },
        {
            label: 'L (large)',
            value: 'L',
            children: [],
        },
        {
            label: 'XL (extra large)',
            value: 'XL',
            children: [],
        },
        {
            label: 'XXL (double extra large)',
            value: 'XXL',
            children: [],
        },
    ],
    color: [
        {
            label: 'Black',
            value: 'Black',
            children: [],
        },
        {
            label: 'White',
            value: 'White',
            children: [],
        },
        {
            label: 'Green',
            value: 'Green',
            children: [],
        },
        {
            label: 'Blue',
            value: 'Blue',
            children: [],
        },
        {
            label: 'Yellow',
            value: 'Yellow',
            children: [],
        },
        {
            label: 'Red',
            value: 'Red',
            children: [],
        },
        {
            label: 'Orange',
            value: 'Orange',
            children: [],
        },
        {
            label: 'Purple',
            value: 'Purple',
            children: [],
        },
        {
            label: 'Pink',
            value: 'Pink',
            children: [],
        },
    ],
};

export const myProducts2 = {
    message: [
        { images: [{ image: fakeImg1 }], prodPrice: 200, prodName: 'sweater' },
        { images: [{ image: fakeImg2 }], prodPrice: 200, prodName: 'sweater' },
        { images: [{ image: fakeImg3 }], prodPrice: 200, prodName: 'sweater' },
        { images: [{ image: fakeImg4 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg5 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg6 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg1 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg2 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg3 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg4 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg5 }], prodPrice: 200, prodName: 'sweater' },
        // { images: [{ image: fakeImg6 }], prodPrice: 200, prodName: 'sweater' },
    ],
};
