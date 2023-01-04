import React, { useState } from 'react';
import { CheckTree, Message, toaster } from 'rsuite';
import { martCategories } from './Info/Categories';

//
const FieldAdded = ({ title, value }) => (
    <h5 className="mb-2 mx-2 flex items-center">
        <span className="w-28 mr-2">{title}:</span> {value}
    </h5>
);

export const ProfiePreview = ({ formData, Category }) => (
    <div className="bg-slate-900 bg-opacity-75 py-3 px-1 text-slate-300 text-white">
        {formData.owner_name !== '' ? (
            <FieldAdded title="Your Name" value={formData.store} />
        ) : null}
        {formData.buzz_name !== '' ? (
            <FieldAdded title="Business Name" value={formData.shopName} />
        ) : null}
        {formData.buzz_email !== '' ? (
            <FieldAdded title="Business Email" value={formData.shopEmail} />
        ) : null}
        {formData.buzz_phone !== '' ? (
            <FieldAdded title="Business Phone" value={formData.shopLine} />
        ) : null}
        {formData.buzz_location !== '' ? (
            <FieldAdded title="Location" value={formData.street} />
        ) : null}
        {formData.buzz_city !== '' ? (
            <FieldAdded title="City" value={formData.city} />
        ) : null}
        {formData.buzz_postal !== '' ? (
            <FieldAdded title="Postal Code" value={formData.postalCode} />
        ) : null}
        {formData.buzz_state !== '' ? (
            <FieldAdded title="State" value={formData.state} />
        ) : null}
        {formData.buzz_landmark !== '' ? (
            <FieldAdded title="Landmark" value={formData.landmark} />
        ) : null}
        {formData.buzz_landmark !== '' ? (
            <FieldAdded title="Landmark" value={formData.landmark} />
        ) : null}
        {formData.accept_order !== '' ? (
            <FieldAdded title="Accept Order" value={formData.accept_order} />
        ) : null}
        {Category.length !== 0 ? (
            <FieldAdded title="Category" value={Category.join(', ')} />
        ) : null}
    </div>
);

export const KemonCategories = ({ value, setValue, max }) => {
    const [allChildren, setChildren] = useState([]);

    const handleTagRemove = (tag) => {
        if (tag.length < max + 1) {
            setValue(tag);
        } else {
            toaster.push(
                <Message showIcon type="info">
                    You can only select maximum of three categories
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
        }
    };

    return (
        <CheckTree
            cascade={false}
            data={martCategories}
            value={value}
            onExpand={(data, children) => {
                setChildren(children.children);
            }}
            style={{ width: 280 }}
            onChange={(value) => handleTagRemove(value)}
            getChildren={(activeNode) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([]);
                    }, 1000);
                })
            }
        />
    );
};
