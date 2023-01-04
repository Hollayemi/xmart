import React, { useState } from 'react';
import {
    Container,
    Header,
    Content,
    Sidebar,
    Navbar,
    Nav,
    Sidenav,
} from 'rsuite';
import {
    FaAngleRight,
    FaAngleLeft,
    FaUserCog,
    FaGripHorizontal,
    FaCog,
    FaRegCreditCard,
    FaCartArrowDown,
    FaMapMarked,
    FaQuestionCircle,
    FaSignOutAlt,
    FaHome,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavToggle = ({ expand, onChange }) => (
    <Navbar appearance="subtle" className="nav-toggle bg-slate-900">
        <Navbar className="bg-slate-900">
            <Nav pullRight>
                <Nav.Item
                    onClick={onChange}
                    style={{
                        width: 56,
                        textAlign: 'center',
                    }}
                >
                    {expand ? <FaAngleLeft /> : <FaAngleRight />}
                </Nav.Item>
            </Nav>
        </Navbar>
    </Navbar>
);

const DashboardHeader = ({ agentDetails }) => (
    <section className="w-full fixed z-50 top-0 bg-slate-50 flex items-center justify-between border-b">
        <div className="flex items-center h-18 pt-2 w-full px-2">
            <img
                src={agentDetails.profPic}
                alt="pics"
                className="w-[60px] h-[60px] rounded-full"
            />
            <div className="flex flex-col items-start">
                <h5 className="ml-2 font-[500] text-md text-slate-800">
                    {agentDetails.username}
                </h5>
                <h5 className="text-gray-300 ml-2 -mt-1">
                    {agentDetails.email}
                </h5>
            </div>
        </div>
        <i className="text-lg mr-5">
            <FaSignOutAlt />
        </i>
    </section>
);

const DashboardWrapper = ({ ...props }) => {
    const { showing } = props;
    const navigate = useNavigate();
    const [expand, setExpand] = useState(true);
    return (
        <div className="show-fake-browser sidebar-page bg-slate-100">
            <Container>
                <div className="rounded-r-3xl overflow-hidden h-[100%] bg-slate-900 fixed top-0">
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column' }}
                        width={expand ? 260 : 56}
                        collapsible
                    >
                        <Sidenav.Header>
                            <div className="h-14 ml-6 text-lg min-w-[100%]">
                                <div className="flex items-center h-full">
                                    <i className="text-lg">
                                        <FaUserCog />
                                    </i>
                                    <span className="px-4 text-sm">
                                        {props.shopName}
                                    </span>
                                </div>
                            </div>
                        </Sidenav.Header>
                        <Sidenav
                            expanded={expand}
                            defaultOpenKeys={['3']}
                            appearance="subtle"
                        >
                            <Sidenav.Body>
                                <Nav>
                                    <Nav.Item
                                        eventKey="1"
                                        active={showing === 'home' && true}
                                        onClick={() => navigate('/agent')}
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaHome />
                                                </i>
                                                <span className="px-3">
                                                    Home
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item
                                        eventKey="1"
                                        active={showing === 'overview' && true}
                                        onClick={() =>
                                            navigate(
                                                '/agent/dashboard/overview'
                                            )
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaGripHorizontal />
                                                </i>
                                                <span className="px-3">
                                                    Dashboard
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>

                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'reward' && true}
                                        onClick={() =>
                                            navigate('/agent/dashboard/reward')
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaRegCreditCard />
                                                </i>
                                                <span className="px-3">
                                                    Reward Account
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>

                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'pickup' && true}
                                        onClick={() =>
                                            navigate('/agent/dashboard/pickup')
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaCartArrowDown />
                                                </i>
                                                <span className="px-3">
                                                    Quick Pick
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'available' && true}
                                        onClick={() =>
                                            navigate(
                                                '/agent/dashboard/available'
                                            )
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaMapMarked />
                                                </i>
                                                <span className="px-3">
                                                    Available Products
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'settings' && true}
                                        onClick={() =>
                                            navigate(
                                                '/agent/dashboard/settings'
                                            )
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaCog />
                                                </i>
                                                <span className="px-3">
                                                    Settings
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'help' && true}
                                        onClick={() =>
                                            navigate('/agent/dashboard/help')
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaQuestionCircle />
                                                </i>
                                                <span className="px-3">
                                                    Help
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                        <NavToggle
                            expand={expand}
                            onChange={() => setExpand(!expand)}
                        />
                    </Sidebar>
                </div>

                <Container>
                    <div
                        className={`absolute overflow-x-hidden ${
                            expand === true
                                ? 'w-[calc(100%_-_260px)] ml-[260px]'
                                : 'w-[calc(100%-56px)] ml-[56px]'
                        }`}
                    >
                        <Header />
                        <Content>
                            <div className="bg-white mt-14 shadow flex items-center">
                                <DashboardHeader
                                    agentDetails={props.agentDetails}
                                />
                            </div>
                            <div className="w-full bg-slate-50">
                                {props.children}
                            </div>
                        </Content>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default DashboardWrapper;
