import React from 'react';
import Paging from '../../../Components/Paging';
import CartableManageService from '../../../Services/CartableManageService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import { Link } from "react-router-dom"
import BpmsConfig from '../../../Shared/BpmsConfig'
import Lang from '../../../Shared/CartableLang/Lang';
class ThreadList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.handelProcessIDChange = this.handelProcessIDChange.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(3, [Lang.Menu.ThreadList, Lang.Menu.management], false);
        this.doSearch();
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new CartableManageService().getThreadIndex, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }

    handelChange = (event) => {
        this.setState(UtilityService.handelChange(event));
    }

    async handelProcessIDChange(event) {
        await this.setState(UtilityService.handelChange(event));
        this.doSearch(true, false);
    }

    render() {
        return (
            <div>
                <div id="divIndexSearchForm">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card card-custom gutter-b">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                    <div className="card-title">
                                        <h3 className="card-label">
                                            {Lang.ThreadList.caption}
                                        </h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-7 card-search">
                                        <div className="row align-items-center">
                                            <div className="col-lg-9 col-xl-8">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4 my-2 my-md-0">
                                                        <div className="input-icon">
                                                            <Select name="ProcessID" value={this.state.ProcessID || ''} handelChange={this.handelProcessIDChange}
                                                                listItem={this.state.GetProcess} optionKey="Key" optionLabel="Value" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-xl-4 mt-5 mt-lg-0">
                                                <a href="javascript:;" className="btn btn-light-primary px-6 font-weight-bold" data-toggle="collapse" data-target="#demo">
                                                    {Lang.Shared.AdvSearch}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-7 advsearch">
                                        <div className={this.state.IsAdvSearch ? "card card-custom card-fit card-border collapse show" : "card card-custom card-fit card-border collapse"} id="demo">
                                            <div className="card-body">
                                                <div className="form-group row">

                                                    <div className="col-lg-6">
                                                        <label> {Lang.ThreadList.advStartDateFrom}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={UtilityService.getDateAsStr(this.state.AdvStartDateFrom)} data-type="DATEPICKER" name='AdvStartDateFrom' className="form-control" autoComplete="Off" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label> {Lang.ThreadList.advStartDateTo}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={UtilityService.getDateAsStr(this.state.AdvStartDateTo)} data-type="DATEPICKER" name='AdvStartDateTo' className="form-control" autoComplete="Off" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-lg-6">
                                                        <label> {Lang.ThreadList.advEndDateTo}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={UtilityService.getDateAsStr(this.state.AdvEndDateFrom)} data-type="DATEPICKER" name='AdvEndDateFrom' className="form-control" autoComplete="Off" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label> {Lang.ThreadList.advEndDateFrom}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={UtilityService.getDateAsStr(this.state.AdvEndDateTo)} data-type="DATEPICKER" name='AdvEndDateTo' className="form-control" autoComplete="Off" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-lg-6">
                                                        <label> {Lang.ThreadList.process}</label>
                                                        <div className="input-group">
                                                            <Select name="AdvProcessID" value={this.state.AdvProcessID || ''} handelChange={this.handelChange}
                                                                listItem={this.state.GetProcess} optionKey="Key" optionLabel="Value" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <div className="col-lg-12 ">
                                                        <button type="reset" className="btn btn-primary ml-2" id="lnkAdvanceSearch" onClick={() => this.doSearch(true, true)}>
                                                            {Lang.Shared.search}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.ThreadList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.ThreadList.tbl_th_Number}
                                                        </th>
                                                        <th>
                                                            {Lang.ThreadList.tbl_th_FullName}
                                                        </th>
                                                        <th>
                                                            {Lang.ThreadList.tbl_th_StartDate}
                                                        </th>
                                                        <th>
                                                            {Lang.ThreadList.tbl_th_EndDate}
                                                        </th>
                                                        <th>
                                                            {Lang.ThreadList.tbl_th_Continue}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={index} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.Process.Name}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.FormattedNumber}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.User.FullName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.StartDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.EndDate && item.EndDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    <Link to={BpmsConfig.currentPage() + `/GetThreadDetail/${item.ID}`} className="btn btn-sm btn-clean btn-icon" title={Lang.ThreadList.tbl_th_Continue}>
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

export default ThreadList;

