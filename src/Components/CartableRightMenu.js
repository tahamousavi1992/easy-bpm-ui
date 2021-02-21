import React from 'react';
import { Link } from 'react-router-dom'
import BpmsConfig from '../Shared/BpmsConfig'
import CartableManageService from '../Services/CartableManageService';
import Lang from '../Shared/CartableLang/Lang';
const $ = window.$;
class CartableRightMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        let data = await new CartableManageService().getPagesForMenu();
        await this.setState({ GetList: data });
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
                            <i className="fa fa-angle-right fa-lg" ></i>
                        </button>
                    </div>
                    <div className="flex-column-fluid" id="kt_aside_menu_wrapper">
                        <div id="sk_aside_menu" className="bpms-sidebar my-4 ">
                            <ul className="bpms-menu-ul">
                                <li className={"bpms-menu-segment  menu-down-segment" +
                                    (this.props.menuIndex == 1 ||
                                        this.props.menuIndex == 2 ||
                                        this.props.menuIndex == 3 ? " bpms-menu-segment-open" : "")}>
                                    <a href="javascript:;" className="bpms-link-menu menu-toggle">
                                        <span className="svg-icon menu-icon">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACoUlEQVRIidWUS0iUYRSGn/P/0zgj1UwjCVar0ilbtDIJc8amyIhMCLsQJVQQLSTwEiRC0EYKpEZCXLhpERViEVHaZsTKoht0N68RoYlk5CXzMrevhVlzUVOToBfO4jv/Oec97zn/98H/Dol0bN2Rc9BkNpcCDI+OltTfvnZ53gi2ZOesM8qCZyeLjhuDSlF2vsLr8wVSPHU1b+ZKoIWdAtp6e1KiN8ORhsu5kaTEVV4lpM61OIAh7KQHn7W1dxgb7j8EpWjveG/U8T/5G4KoHWzJ2n0g1mQqBRgZHivx1NVcmTeCzMxd8QGDnqoJ5pkkK/S3ntrq5vz7KkET0if8wQBd5ZvkEYSMaOvO3ZmaGG7GL43zGwx6cCYE9sSVTZ7a6jRRuBQUTvg1jTbgUZiC7D25rUcPH7Rnbc+MrBMAuoHPQC/wJcRei8it6Zr4pcDn9a1IXm0P+zgw+I3nL1993JzhWDUTRdMSTIamdy1cunotIdSX51Fxxhj2uR1SWdSg1gQ1DkUlCl1up1RA5D2IgEJF+RbFEBSFcSbdwx8UTIazDukDygHOuaQFKJ4ufloF84HfCkSCIjIELGT8zwHQA36/NzShsFHZleKU2ym5hXeVS2mUTVK33e2U/WEEGempeyurLhbnHTvibGpu1UUEq3Ux/QODvaGZQ2Y+xA7jBggqXmhwBomYhNAZpaD4RMGd7D25F7p7eujs+gSA1bo2qrWqFPEBzwHKXdIPXJ9qPGEEs4JSgogCyG9QVpMh/Mkx+Rk57ZJRmMOS8++p5IIH1AMUNKpdotM3pvgaagM6jyfiZ01QniHN381sA3A75IYKsCRGsIWaJcCGifg5jejnHsYJx/cwJf7hPQCsFsvTOJvNu3xZQixAnM02bLVYXv4NwQ9r8d0w/in/mwAAAABJRU5ErkJggg==" />
                                        </span><span className="bpms-link-text">{Lang.Menu.management }</span><i className="fa fa-angle-left menu-arrow"></i>
                                    </a>
                                    <div className="menu-submenu ">
                                        <ul className="bpms-down-menu">
                                            <li className="bpms-menu-segment  bpms-menu-segment-parent" aria-haspopup="true"><span className="bpms-link-menu"><span className="bpms-link-text">Applications</span></span></li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 1 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/MyTasks"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.MyTasks}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 2 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/ListProcess"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.ListProcess}</span>
                                                </Link>
                                            </li>
                                            <li className={"bpms-menu-segment" + (this.props.menuIndex == 3 ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                <Link to={BpmsConfig.currentPage() + "/ThreadList"} className="bpms-link-menu">
                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{Lang.Menu.ThreadList}</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {
                                    this.state.GetList &&
                                    this.state.GetList.map((item, index) => {
                                        return <li key={index} className={"bpms-menu-segment  menu-down-segment" + (item.List.findIndex((i) => { return i.ID == this.props.menuIndex }) > -1 ? " bpms-menu-segment-open" : "")} >
                                            <a href="javascript:;" className="bpms-link-menu menu-toggle" >
                                                <span className="svg-icon menu-icon">
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAxklEQVRIie2SMU5DQQxE3/6/EQ0dx6DPfWg4AIdAuQIU3IfLUEQpEq09Q/E34kekSwHFTmVrpGd7d2Dor1UAtp/7h42np1I0r00JFKKFUBMKISXR+wyWeuU3JSWdx9TH/uXxqwJszDPFr17mAWCZDJFnQIpMkWEUJoMfL7qXAoEp3M21Arvp2llr+BlyWfuqZ/kXqy5P4be5llku90hECPetlCLasrXS/YIOTxEp3HwJnzicIt5v/sB/oZGikaLbNVI0UjQE390iU1pPlIM5AAAAAElFTkSuQmCC" />
                                                </span > <span className="bpms-link-text">{item.GroupName}</span><i className="fa fa-angle-left menu-arrow"></i>
                                            </a>
                                            <div className="menu-submenu" >
                                                <ul className="bpms-down-menu">
                                                    <li className="bpms-menu-segment  bpms-menu-segment-parent" aria-haspopup="true"><span className="bpms-link-menu"><span className="bpms-link-text">Applications</span></span></li>
                                                    {
                                                        item.List.map((page, index) => {
                                                            return <li key={index} className={"bpms-menu-segment" + (this.props.menuIndex == page.ID ? " bpms-menu-segment-active" : "")} aria-haspopup="true">
                                                                <Link to={BpmsConfig.currentPage() + "/GetCartablePage/" + page.ID} className="bpms-link-menu">
                                                                    <i className="menu-bullet "><span></span></i><span className="bpms-link-text">{page.Name}</span>
                                                                </Link>
                                                            </li>

                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartableRightMenu;

