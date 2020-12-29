import React from 'react'; 
import CartableManageService from '../../../Services/CartableManageService';
import UtilityService from '../../../Services/UtilityService';
import { Link } from "react-router-dom"
import BpmsConfig from '../../../Shared/BpmsConfig'
import Lang from '../../../Shared/CartableLang/Lang';
class ListProcess extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async componentDidMount() {
        this.props.setPageCaption(2, [Lang.Menu.ListProcess, Lang.Menu.management], false);
        this.doSearch();
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }

    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new CartableManageService().getListProcess, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    } 
   
    async beginTask(processID) {
        let result = await new CartableManageService().getBeginTask(processID);
        UtilityService.showMessageByList(result.MessageList);
        if (result.Result) {
            this.props.history.push(BpmsConfig.currentPage() + "/GetCartableThread/" + result.ThreadTaskID);
        }
    }

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
                                            {Lang.ListProcess.caption }
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
                                                            {Lang.ListProcess.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.ListProcess.tbl_th_Version}
                                                        </th>
                                                        <th>
                                                            {Lang.ListProcess.tbl_th_Number}
                                                        </th>
                                                        <th>
                                                            {Lang.ListProcess.tbl_th_CreateDate}
                                                        </th>
                                                        <th>
                                                            {Lang.ListProcess.tbl_th_Description}
                                                        </th>
                                                        <th>
                                                            {Lang.ListProcess.tbl_th_Start}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={index} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.Name}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.ProcessVersion}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.FormattedNumber}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.CreateDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Description}
                                                                </td>
                                                                <td className="text-center"> 
                                                                    <a href="javascript:;" onClick={() => this.beginTask(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.ListProcess.beginTask}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-plus-square"></i></span>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
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

export default ListProcess;

