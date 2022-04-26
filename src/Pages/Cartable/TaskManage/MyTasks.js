import React from 'react';
import Paging from '../../../Components/Paging';
import CartableManageService from '../../../Services/CartableManageService';
import UtilityService from '../../../Services/UtilityService'; 
import { Link } from "react-router-dom"
import BpmsConfig from '../../../Shared/BpmsConfig'
import Lang from '../../../Shared/CartableLang/Lang';
class MyTasks extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(1, [Lang.Menu.MyTasks, Lang.Menu.management], false);
        this.doSearch();
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }
    async doSearch(reLoad, isAdvSearch, getPagingProperties) {
        let data = await new UtilityService().doSearch(new CartableManageService().getList, this.state, reLoad, isAdvSearch, getPagingProperties);
        this.setState({ ...data });
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    render() {
        return (
            <div>
                <div id="dbManagerIndexSearchForm">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card card-custom gutter-b">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                    <div className="card-title">
                                        <h3 className="card-label">
                                            {Lang.MyTasks.caption } 
                                        </h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_Name} 
                                                        </th>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_Version} 
                                                        </th>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_Number} 
                                                        </th>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_TaskName} 
                                                        </th>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_FullName} 
                                                        </th>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_StartDate} 
                                                        </th>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_ThreadStartDate} 
                                                        </th>
                                                        <th>
                                                            {Lang.MyTasks.tbl_th_Continue} 
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={index} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.Thread.Process.Name}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Thread.Process.ProcessVersion}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Thread.FormattedNumber}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.TaskName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Thread.User.FullName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Thread.StartDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.ThreadTaskStartDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    <Link to={BpmsConfig.currentPage() + `/GetCartableThread/${item.ThreadTaskID}`} className="btn btn-sm btn-clean btn-icon" title={Lang.MyTasks.tbl_th_Continue }>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-search"></i></span>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {
                                            this.state.GetPagingProperties &&
                                            <Paging doSearch={this.doSearch} {...this.state.GetPagingProperties}></Paging>
                                        }

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

export default MyTasks;

