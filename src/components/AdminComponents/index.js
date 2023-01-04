import React, { useState } from 'react';
import {
    Container,
    Header,
    Content,
    Sidebar,
    Navbar,
    Dropdown,
    Nav,
    Sidenav,
} from 'rsuite';
import {
    FaAngleRight,
    FaAngleLeft,
    FaUserCog,
    FaGripHorizontal,
    FaMapMarked,
    FaQuestionCircle,
    FaDumpster,
    FaUserShield,
    FaSignOutAlt,
    FaHome,
    FaShoppingBag,
    FaUsers,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import profPic from '../../assets/images/avatar/avatar2.png';

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
    <section className="w-full flex overflow-auth md:overflow-hidden myScroll-x min-w-[250px] items-center justify-between border-b-2 px-3">
        <div className="flex items-center h-14 w-full md:px-10">
            <img
                src={profPic}
                alt="pics"
                className="w-[60px] h-[60px] rounded-full"
            />
            <h2 className="leading-7 ml-2 md:ml-5 font-[600] Lucida text-md text-slate-800">
                Admin Hollayemi
            </h2>
        </div>
        <i className="text-xl mr-5 cursor-pointer" title="Logout">
            <FaSignOutAlt />
        </i>
    </section>
);

const DashboardWrapper = ({ ...props }) => {
    const navigate = useNavigate();
    const { showing } = props;
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
                                        active={showing === 'overview' && true}
                                        onClick={() =>
                                            navigate('/admin/dashboard')
                                        }
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
                                            navigate('/admin/dashboard')
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
                                    <Dropdown
                                        eventKey="3"
                                        trigger="click"
                                        title={
                                            <div className="h-5 min-w-[100%]">
                                                <div className="flex items-center h-full">
                                                    <i className="text-lg">
                                                        <FaShoppingBag />
                                                    </i>
                                                    <span className="px-5">
                                                        Orders
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                        icon={<FaShoppingBag />}
                                        placement="leftStart"
                                    >
                                        <Dropdown.Item
                                            eventKey="1-0"
                                            active={
                                                showing ===
                                                    'Orders_All Orders' && true
                                            }
                                            onClick={() =>
                                                navigate(
                                                    '/admin/dashboard/all-orders'
                                                )
                                            }
                                        >
                                            All Orders
                                        </Dropdown.Item>
                                    </Dropdown>
                                    <Dropdown
                                        eventKey="4"
                                        trigger="click"
                                        title={
                                            <div className="h-5 min-w-[100%]">
                                                <div className="flex items-center h-full">
                                                    <i className="text-lg">
                                                        <FaUsers />
                                                    </i>
                                                    <span className="px-5">
                                                        Accounts
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                        icon={<FaUsers />}
                                        placement="leftStart"
                                    >
                                        <Dropdown.Item
                                            eventKey="2-1"
                                            active={showing === 'users' && true}
                                            onClick={() =>
                                                navigate(
                                                    '/admin/dashboard/users'
                                                )
                                            }
                                        >
                                            Users
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            eventKey="2-2"
                                            active={
                                                showing === 'agents' && true
                                            }
                                            onClick={() =>
                                                navigate(
                                                    '/admin/dashboard/agents'
                                                )
                                            }
                                        >
                                            Agents
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            eventKey="2-3"
                                            active={
                                                showing === 'stores' && true
                                            }
                                            onClick={() =>
                                                navigate(
                                                    '/admin/dashboard/stores'
                                                )
                                            }
                                        >
                                            Stores
                                        </Dropdown.Item>
                                    </Dropdown>
                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'pickers' && true}
                                        onClick={() =>
                                            navigate('/admin/dashboard/pickers')
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaMapMarked />
                                                </i>
                                                <span className="px-3">
                                                    Quick Pickers
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'logout' && true}
                                        onClick={() =>
                                            navigate('/admin/dashboard/Logout')
                                        }
                                    >
                                        <div className="h-5 ml-2 min-w-[100%]">
                                            <div className="flex items-center h-full">
                                                <i className="text-lg">
                                                    <FaSignOutAlt />
                                                </i>
                                                <span className="px-3">
                                                    Logout
                                                </span>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item
                                        eventKey="2"
                                        active={showing === 'help' && true}
                                        onClick={() =>
                                            navigate('/admin/dashboard/Help')
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
                            <div className="bg-slate-100 shadow flex items-center">
                                <DashboardHeader />
                            </div>
                            <div className="w-full bg-slate-100">
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
