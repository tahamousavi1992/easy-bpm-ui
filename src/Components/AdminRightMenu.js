import React from 'react';
import { Link } from 'react-router-dom'
import BpmsConfig from '../Shared/BpmsConfig'
import Lang from '../Shared/AdminLang/Lang';
const $ = window.$;
class AdminRightMenu extends React.Component {
    constructor() {
        super();

    }
    componentDidMount() {
        window.menuItem();
    }

    render() {
        return (
            <div>
                <div className="aside aside-left  aside-fixed  d-flex flex-column flex-row-auto" id="sk_aside">

                    <div className="brand flex-column-auto" >
                        <a href="#" className="brand-logo">
                            <img alt="Logo" src={'/DesktopModules/MVC/DynamicBusiness.Bpms/Resources/assets/media/logo/logo.png'} />
                        </a>
                        <button className="brand-toggle btn btn-sm px-0" id="sk_aside_toggle" type="button">
                            <i className="fa fa-angle-left fa-lg" ></i>
                        </button>
                    </div>
                    <div className="flex-column-fluid" id="kt_aside_menu_wrapper">
                        <div id="sk_aside_menu" className="bpms-sidebar my-4 ">
                            <ul className="bpms-menu-ul">
                                <li className={"bpms-menu-segment  menu-down-segment" +
                                    (this.props.menuIndex == 10 ||
                                        this.props.menuIndex == 1 ||
                                        this.props.menuIndex == 3 ||
                                        this.props.menuIndex == 8 ||
                                        this.props.menuIndex == 6 ||
                                        this.props.menuIndex == 12 ||
                                        this.props.menuIndex == 26 ? " bpms-menu-segment-open" : "")}>
                                    <a className="bpms-link-menu menu-toggle">
                                        <span className="svg-icon menu-icon">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAEkklEQVRIia2WXUxTZxjHf6ct9OP0g/JhWypCtTjURKYDUZxapzPZHMFkJGZL5haz7MqLzexCnZu4GXXZhzdemN0scR/ecDGiWyYhivOrQDfFxaArA0EK5aO0lPZAgfbsQlptcNIle67O83/f//M/5znP+88rkGHUnb5Vq0KxCmCWxN2GfWsaM+GpMhUwqLNObHm+eAXAldsPOoGMBBSZbHr582uFi8y6nEVmkUVmkYIcvem1Yzfs/4tAzUn3i2ZR/N5pz7UksdLFZqvOqDlb+1Vb9UJ8IflQXy8rWmhRtNRvnQWo+aLVYdBrflhmy1lZ7rSadJqsNGJ0coY7fw+FugbG/hyXom/98uHGXgBX/WWVC1eivl5IpAnUnb510KjNfi82M9sTi83+ZtBp3n1lwzK7XpNNdHKaXn+Q8WgMAJOopthqRtRmE5ma5sJNb48kTZ9Vq1Wb1VkqR3hy+puGfWtOpAR2nrhqXmzN99Ruem5pQpbxByJY8vTICRlPZz/aLKhy5lKYpwNgICDh9o4xFReoXGEHQWAoEMGap0chCPx0tbPb5x+r+PngpqAKQKPTHakoszkAFIJAYb6B2XiClj+62VVZSFG+Lq09Doseh0XPw9EojZ4eXGsdFOYbUuuVZXZHIDx1BHhfARCJxz5t6ejtCEsxObnJ09n/1OJPRlG+SO0LVto7fSksLMXklo7ejlB09rO0f7D9pMdkMara39yxujQ6OU13n5/dG5cAEI/LNLh7Bx8MRboASiwGZ936JTal8hH93LU+nCVWRE02Pzbd8fpiwXUtH2wNwRNj2nygYlxQClEB6B0MUlWam3qrBnfv4M37I7vP7F29+cze1Zuv3x95o8HdN5hcX1+aS99gEAFQKBWRZPE0AQC1Uqmb+0xsZm0K7xmOeBv3V11N5uf3r7vyYHiiK5kX5moJz01YdpYqracZnWRBftzKZMiyMA97WqQJxOJxCcCoUzMwNpnCSywGZ83XbVuS+a5T7a6lVsOyZN4fkDCKGgCmZ2alJ2umzM516nKOHJdFGSixmXF7/TgsegDq1i+xAefs397pAnBYjM7Xq4psSW6bN4jTYUUGEvGEfvtJj6n5QMU4zE3RtuOtedZcTXNN9fJyo04tALjvPmT7qlyK8sVntqBvJMqlzjGqVhYBj8b0/I2/Okal6LaL+6vHFAA5oupjV3lxqjhA5Qo7jR4/D0ejzyx+/nc/FWWPjdWoUwuu8uJyvVL9SapFU5J0tP2er8ZeYEyzCtdaB813fWiUAaqcZuxzVtEfkGjzBonJAlvWOkAQGBidSFlF+72B7ilJOppqEcw3O1Gb9fbO6uUles0jQ+vzhxiPTAFg0msotpgRtVmZmR3Mt+tXv7xebNKJ3zlsOWVrnLYCUTvfrm93+Yd7/KF7oWhkz4J2/W+x4/jNKpNefWxH5dKX7AVGBYBvJJxoau++NB6JHW46tKH1WfwFD1rToQ2t4YnEni7f2FAS8/YH/ZPhqXcWKp6RAMDFjyoGh4NSaDgYZTgYZSQUGb9wuNq3MPM/3ComYjMHf23tTl1bMuX9AyvE7qSP2yatAAAAAElFTkSuQmCC" />
                                        </span><span className="bpms-link-text">{Lang.Menu.setting}</span><i className="fa fa-angle-left menu-arrow"></i>
                                    </a>
                                    <div className="menu-submenu ">
                                        <ul className="bpms-down-menu">
                                            <li className="bpms-menu-segment  bpms-menu-segment-parent" aria-haspopup="true"><span className="bpms-link-menu"><span className="bpms-link-text">Applications</span></span></li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 10 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/Settings"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.AddEditSetting}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 1 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/UserList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.UserList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 3 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/Organization"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.departmentList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 8 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/LookUpList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.LookUpList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 6 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/EmailAccountList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.EmailAccountList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 12 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/APIAccessList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.apiAccessList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 26 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/Assembly"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.assemblyFileList}</span>
                                                </Link>
                                            </li>
                                        </ul >
                                    </div >
                                </li>
                                <li className={"bpms-menu-segment  menu-down-segment" +
                                    (this.props.menuIndex == 2 ||
                                        this.props.menuIndex == 7 ||
                                        this.props.menuIndex == 4 ||
                                        this.props.menuIndex == 9 ||
                                        this.props.menuIndex == 11 ||
                                        this.props.menuIndex == 27 ||
                                        this.props.menuIndex == 28 ||
                                        this.props.menuIndex == 17 ? " bpms-menu-segment-open" : "")}>
                                    <a className="bpms-link-menu menu-toggle" >
                                        <span className="svg-icon menu-icon">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACoUlEQVRIidWUS0iUYRSGn/P/0zgj1UwjCVar0ilbtDIJc8amyIhMCLsQJVQQLSTwEiRC0EYKpEZCXLhpERViEVHaZsTKoht0N68RoYlk5CXzMrevhVlzUVOToBfO4jv/Oec97zn/98H/Dol0bN2Rc9BkNpcCDI+OltTfvnZ53gi2ZOesM8qCZyeLjhuDSlF2vsLr8wVSPHU1b+ZKoIWdAtp6e1KiN8ORhsu5kaTEVV4lpM61OIAh7KQHn7W1dxgb7j8EpWjveG/U8T/5G4KoHWzJ2n0g1mQqBRgZHivx1NVcmTeCzMxd8QGDnqoJ5pkkK/S3ntrq5vz7KkET0if8wQBd5ZvkEYSMaOvO3ZmaGG7GL43zGwx6cCYE9sSVTZ7a6jRRuBQUTvg1jTbgUZiC7D25rUcPH7Rnbc+MrBMAuoHPQC/wJcRei8it6Zr4pcDn9a1IXm0P+zgw+I3nL1993JzhWDUTRdMSTIamdy1cunotIdSX51Fxxhj2uR1SWdSg1gQ1DkUlCl1up1RA5D2IgEJF+RbFEBSFcSbdwx8UTIazDukDygHOuaQFKJ4ufloF84HfCkSCIjIELGT8zwHQA36/NzShsFHZleKU2ym5hXeVS2mUTVK33e2U/WEEGempeyurLhbnHTvibGpu1UUEq3Ux/QODvaGZQ2Y+xA7jBggqXmhwBomYhNAZpaD4RMGd7D25F7p7eujs+gSA1bo2qrWqFPEBzwHKXdIPXJ9qPGEEs4JSgogCyG9QVpMh/Mkx+Rk57ZJRmMOS8++p5IIH1AMUNKpdotM3pvgaagM6jyfiZ01QniHN381sA3A75IYKsCRGsIWaJcCGifg5jejnHsYJx/cwJf7hPQCsFsvTOJvNu3xZQixAnM02bLVYXv4NwQ9r8d0w/in/mwAAAABJRU5ErkJggg==" />
                                        </span > <span className="bpms-link-text">{Lang.Menu.management}</span><i className="fa fa-angle-left menu-arrow"></i>
                                    </a >
                                    <div className="menu-submenu ">
                                        <ul className="bpms-down-menu">
                                            <li className="bpms-menu-segment  bpms-menu-segment-parent" aria-haspopup="true"><span className="bpms-link-menu"><span className="bpms-link-text">Applications</span></span></li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 2 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/ProcessList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.ProcessList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 7 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/ConnectionList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.connectionList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 4 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/EntityList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.EntityDefList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 9 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/FolderList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.FolderList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 11 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/StyleSheetList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.StyleSheetList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 27 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/JavaScriptList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.JavaScriptList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 28 ? " bpms-menu-segment-active" : "")} aria-haspopup="true" >
                                                <Link to={BpmsConfig.currentPage() + "/MessageTypeList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.MessageTypeList}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 17 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/DynamicFormList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.applicationPages}</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div >
                                </li >
                                <li className={"bpms-menu-segment  menu-down-segment" +
                                    (this.props.menuIndex == 18 ? " bpms-menu-segment-open" : "")}>
                                    <a className="bpms-link-menu menu-toggle" >
                                        <span className="svg-icon menu-icon">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAxklEQVRIie2SMU5DQQxE3/6/EQ0dx6DPfWg4AIdAuQIU3IfLUEQpEq09Q/E34kekSwHFTmVrpGd7d2Dor1UAtp/7h42np1I0r00JFKKFUBMKISXR+wyWeuU3JSWdx9TH/uXxqwJszDPFr17mAWCZDJFnQIpMkWEUJoMfL7qXAoEp3M21Arvp2llr+BlyWfuqZ/kXqy5P4be5llku90hECPetlCLasrXS/YIOTxEp3HwJnzicIt5v/sB/oZGikaLbNVI0UjQE390iU1pPlIM5AAAAAElFTkSuQmCC" />
                                        </span > <span className="bpms-link-text">{Lang.Menu.Task}</span><i className="fa fa-angle-left menu-arrow"></i>
                                    </a>
                                    <div className="menu-submenu ">
                                        <ul className="bpms-down-menu">
                                            <li className="bpms-menu-segment  bpms-menu-segment-parent" aria-haspopup="true"><span className="bpms-link-menu"><span className="bpms-link-text">Applications</span></span></li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 18 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/ThreadList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.ThreadList}</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div >
                                </li >
                            </ul>

                        </div>

                    </div>

                </div>

            </div >
        );
    }
}

export default AdminRightMenu;

