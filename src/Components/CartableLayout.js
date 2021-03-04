import React from 'react';
import MyTasks from '../Pages/Cartable/TaskManage/MyTasks';
import ListProcess from '../Pages/Cartable/TaskManage/ListProcess';
import ThreadList from '../Pages/Cartable/TaskManage/ThreadList';
import GetCartablePage from '../Pages/Cartable/PageManage/GetCartablePage';
import GetCartableThread from '../Pages/Cartable/CartableThread/GetCartableThread';
import GetThreadDetail from '../Pages/Cartable/TaskManage/GetThreadDetail';
import CartableRightMenu from './CartableRightMenu';
import SiteMenu from './SiteMenu';
import { BrowserRouter, Route, Link, withRouter, Switch } from 'react-router-dom'
const $ = window.$;
class CartableLayout extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.setPageCaption = this.setPageCaption.bind(this);
    }

    async setPageCaption(menuIndex, breadCrumb, isDesignMode, processId, appPageId) {
        this.setState({ MenuIndex: menuIndex, pageHeader: breadCrumb[0], listBreadCrumb: breadCrumb.filter((c, i) => { return i != 0; }), isDesignMode: isDesignMode, processId: processId, appPageId: appPageId })
    }

    render() {
        return (
            <div className={window.showUserPanelWithNoSkin ? '' : 'panel-noskin'}>
                <div id="sk_header_mobile" className="header-mobile align-items-center  header-mobile-fixed ">

                    <a href="#">
                        <img alt="Logo" src={'/DesktopModules/MVC/DynamicBusiness.Bpms/Resources/assets/media/logo/logo.png'} />
                    </a>

                    <div className="d-flex align-items-center">

                        <button className="btn p-0 burger-icon burger-icon-left  ml-2 mr-2" id="sk_aside_mobile_toggle">
                            <span></span>
                        </button>

                        <button className="btn p-0 burger-icon" id="sk_header_mobile_toggle">
                            <span></span>
                        </button>

                        <button className="btn btn-hover-text-primary p-0" id="sk_header_mobile_topbar_toggle">
                            <span className="svg-icon svg-icon-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                        <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3"></path>
                                        <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fillRule="nonzero"></path>
                                    </g>
                                </svg>
                            </span>
                        </button>

                    </div>

                </div>
                <div className="d-flex flex-column flex-root">
                    <div className="d-flex flex-row flex-column-fluid page">
                        <CartableRightMenu menuIndex={this.state.MenuIndex} />
                        <div className="d-flex flex-column flex-row-fluid wrapper" >
                            {
                                window.showUserPanelWithNoSkin &&
                                <div id="bpms_header" className="header header-fixed ">
                                    <div className="container-fluid  d-flex align-items-stretch justify-content-between">
                                        <div className=" bpms-top-menu-container  bpms-top-menu-container-left" id="bpms_header_menu_wrapper">
                                            <div id="bpms_header_menu" className="bpms-top-menu bpms-top-menu-mobile  bpms-top-menu-layout-default ">
                                                <ul className="bpms-menu-ul" >
                                                    {
                                                        window.dnnMenu.filter(c => c.parentId == -1).map((item, index) => {
                                                            return <li key={index} className="bpms-parent-menu bpms-menu-segment bpms-menu-segment-here bpms-menu-segment-rel" >
                                                                <a href={item.url} className="bpms-link-menu">
                                                                    <span className="bpms-link-text">{item.name}</span>
                                                                </a>
                                                                {
                                                                    window.dnnMenu.filter(c => c.parentId == item.id).length > 0 &&
                                                                    <div className="bpms-sub-menu menu-submenu menu-down-simple menu-submenu-left">
                                                                        <ul className="bpms-down-menu">
                                                                            <SiteMenu parentId={item.id} />
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="topbar">
                                            <div className="topbar-item">
                                                <div className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
                                                    {
                                                        (window.userFullName != null && window.userFullName != '') ?
                                                            <React.Fragment>
                                                                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline ml-3">
                                                                    {window.userFullName}
                                                                </span>
                                                                <span className="symbol symbol-35 symbol-light-success">
                                                                    <span className="symbol-label font-size-h5 font-weight-bold">
                                                                        <a href={window.signOutUrl}>
                                                                            <i className="fa fa-sign-out"></i>
                                                                        </a>
                                                                    </span>
                                                                </span>
                                                            </React.Fragment>
                                                            :
                                                            <span class="symbol symbol-35 symbol-light-success">
                                                                <span class="symbol-label font-size-h5 font-weight-bold">
                                                                    <a href={window.loginUrl}>
                                                                        <i class="fa fa-sign-in"></i>
                                                                    </a>
                                                                </span>
                                                            </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="content  d-flex flex-column flex-column-fluid">
                                <div className="subheader py-2 py-lg-4  subheader-solid " id="sk_subheader">
                                    <div className=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                                        <div className="d-flex align-items-center flex-wrap ml-2">
                                            <h5 className="text-dark font-weight-bold mt-2 mb-2 ml-5">
                                                {this.state.pageHeader}
                                            </h5>
                                            {
                                                this.state.listBreadCrumb &&
                                                this.state.listBreadCrumb.map((item, index) => {
                                                    return [
                                                        <div key={item + index} className="subheader-separator subheader-separator-ver mt-2 mb-2 ml-4 bg-gray-200"></div>,
                                                        <span key={(index * 100)} className="text-muted font-weight-bold ml-4">{item}</span>
                                                    ]
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column-fluid">
                                    <div className=" container-fluid ">
                                        <Switch>
                                            <Route path="*/MyTasks" render={(props) => { return <MyTasks {...props} setPageCaption={this.setPageCaption} /> }} />
                                            <Route path="*/ListProcess" render={(props) => { return <ListProcess {...props} setPageCaption={this.setPageCaption} /> }} />
                                            <Route path="*/ThreadList" render={(props) => { return <ThreadList {...props} setPageCaption={this.setPageCaption} /> }} />
                                            <Route path="*/GetCartablePage/:applicationPageId" render={(props) => { return <GetCartablePage {...props} setPageCaption={this.setPageCaption} /> }} />
                                            <Route path="*/GetCartableThread/:threadTaskID" render={(props) => { return <GetCartableThread {...props} setPageCaption={this.setPageCaption} /> }} />
                                            <Route path="*/GetThreadDetail/:threadId" render={(props) => { return <GetThreadDetail {...props} setPageCaption={this.setPageCaption} /> }} />
                                            <Route render={(props) => { return <MyTasks {...props} setPageCaption={this.setPageCaption} /> }} />
                                        </Switch>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartableLayout;

