import React, { useEffect, useState } from 'react';
import { FaTag } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Progress, Rate } from 'rsuite';
import TextAreaGroup from '../../../../components/elements/Input/TextAreaGroup';
import Loading from '../../../../components/elements/Loading';
import ModalPanel from '../../../../components/elements/ModalPanel';
import { Avatar } from '../../../../components/websiteCompoents/UploadFile/avatar';
import { feedbackHandler } from '../../../../state/slices/home/feedback';
import { feedbackLoader } from '../../../../state/slices/home/feedback/loadFeedback';
import { SignInForm } from '../../../auth/signin/Signin';

const SetFeedback = ({ username, userId, setFeedbackState, productId }) => {
    const dispatch = useDispatch();
    const [rate, setRate] = useState(0);
    const [tag, setTag] = useState(false);
    const [review, setReview] = useState(null);
    const [signin, openSignin] = useState(false);
    const texts = {
        0: 'Not Rated',
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    const saveFeedback = () => {
        if (!userId && !username) {
            openSignin(true);
        }
        const payload = {
            body: {
                rate: rate,
                review: review,
                tag: tag,
                username: username,
                productId: productId,
                userId: userId,
            },
        };
        userId &&
            username &&
            feedbackHandler(payload, dispatch, setFeedbackState);
    };

    return (
        <div className="w-full px-2 max-h-[500px] shadow-md my-5 py-3 max-w-[450px] mt-3 rounded-md">
            <h5 className="Lucida font-[500]">Rate this product</h5>
            <Rate defaultValue={0} size="md" onChangeActive={setRate} />{' '}
            <span>( {texts[rate]} )</span>
            <div className="flex items-center justify-between">
                <h5 className="mt-4 mb-2 Lucida font[500]">Feedback</h5>
                <h5
                    onClick={() => setTag(!tag)}
                    className={`flex items-center mr-2 cursor-pointer ${
                        tag && 'text-yellow-500'
                    } `}
                >
                    <i className="mr-2 text-md">
                        <FaTag />
                    </i>
                    Tag Admin
                </h5>
            </div>
            <TextAreaGroup
                onChange={(e) => setReview(e.target.value)}
                label=" "
                disabled={rate < 1}
                className="h-40 w-full border rounded-md p-3 focus:outline-none min-h-[300px] border-gray-100"
                placeholder="Please give a feedback"
            />
            <div className="w-full flex justify-center py-2">
                <button
                    onClick={saveFeedback}
                    disabled={rate < 1}
                    className="px-4 py-2 rounded-md bg-green-500 text-white Lucida font-[500] hover:bg-green-600"
                >
                    Send Feedback
                </button>
            </div>
            <ModalPanel
                closeButton={true}
                title=" "
                children={<SignInForm going="/" />}
                hasBackdrop={true}
                keyboard={true}
                open={signin}
                buttonName="Varify Code"
                handleClose={() => openSignin(!signin)}
            />
        </div>
    );
};

export default SetFeedback;

export const LoadReviews = (productId) => {
    const payload = {
        body: {
            ...productId,
        },
    };
    const dispatch = useDispatch();

    useEffect(() => {
        feedbackLoader(payload, dispatch);
    }, []);

    const { message } = useSelector((state) => state.reducer.feedback);
    if (message && message !== 'fetch error') {
        return message[1] && message[1].length > 0 ? (
            <div>
                <ReviewBars arr={message[0]} />
                <section className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {message[1].map((res, i) => {
                        return <EachFeedback key={i} feedback={res} />;
                    })}
                </section>
            </div>
        ) : (
            <section className="w-full">
                <div className="h-40 min-h-[400px] w-full flex items-center justify-center">
                    No Reviews
                </div>
            </section>
        );
    } else {
        return (
            <section className="w-full h-full flex items-center justify-center">
                <Loading speed="fast" content="Loading..." />
            </section>
        );
    }
};

const EachFeedback = ({ feedback }) => {
    return (
        <div className="flex w-full">
            <img
                src={Avatar[feedback.rate]}
                alt="avatar"
                className="w-20 h-16 border border-blue-100 rounded-full p-2"
            />
            <div>
                <div className="flex flex-col">
                    <h5 className="font-[600]">{feedback.username}</h5>
                    <Rate
                        readOnly
                        defaultValue={parseInt(feedback.rate)}
                        size="xs"
                    />
                </div>
                <p className="mb-6 py-2 text-gray-500 px-2">
                    {feedback.review}
                </p>
            </div>
        </div>
    );
};

const ReviewBars = ({ arr }) => {
    const count = (num) => {
        let percentage = arr.filter((curr) => parseInt(curr) === num);
        let nume = percentage.length / arr.length;

        return parseInt(nume * 100);
    };
    return (
        <div className="w-full md:w-5/10 mb-5 px-8 py-4">
            <div className="flex items-center">
                <h5 className="mr-3 w-16">Useless</h5>
                <Progress.Line percent={count(1)} status="active" />
            </div>
            <div className="flex items-center">
                <h5 className="mr-3 w-16">Poor</h5>
                <Progress.Line percent={count(2)} status="active" />
            </div>
            <div className="flex items-center">
                <h5 className="mr-3 w-16">Okay</h5>
                <Progress.Line percent={count(3)} status="active" />
            </div>
            <div className="flex items-center">
                <h5 className="mr-3 w-16">Good</h5>
                <Progress.Line percent={count(4)} status="active" />
            </div>
            <div className="flex items-center">
                <h5 className="mr-3 w-16">Excellent</h5>
                <Progress.Line percent={count(5)} status="active" />
            </div>
        </div>
    );
};
