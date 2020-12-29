import React, { useState } from 'react';
import VariableService from '../../../Services/VariableService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import AddEditVariable from './AddEditVariable';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class SelectVariable extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditVariable = this.openAddEditVariable.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    async componentDidMount() {
        await this.doSearch();
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        setTimeout(window.initCustom, 500);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async doSearch() {
        let data = await new VariableService().getSelectVariable(this.props.isListVariable, this.state.SearchVariable, this.props.processId, this.props.applicationPageId, this.props.selectedVariable);
        await this.setState({ GetList: data });
        //to load some js features for arrow on table row
        setTimeout(window.initCustom, 800);
    }

    async openAddEditVariable(id) {
        await this.setState({ AddEditId: id });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEdit: false });
        await this.setState({ OpenAddEdit: true });
        window.openModal('divAddEditVariable', true);
    }

    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEditVariable');
        this.doSearch();
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divModalSelectVariableForm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{Lang.SelectVariable.caption}</h5>
                            <div className="modal-button">
                                <button type="button" className="btn close window-maximize" data-dismiss="modal" aria-label="Close">
                                    <i className="fad fa-expand-alt modal-square"></i>
                                </button>
                                <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body modal-scroll">

                            <div className="row align-items-center mb-7">
                                <div className="col-lg-9 col-xl-8">
                                    <div className="row align-items-center">
                                        <div className="col-md-6 my-2 my-md-0">
                                            <div className="input-icon">
                                                <input type="text" id="SearchVariable" name="SearchVariable" value={this.state.SearchVariable || ''} onChange={this.handelChange} placeholder="جستجو ..." className="form-control" />
                                                <span>
                                                    <a href="#" onClick={this.doSearch}>
                                                        <i className="fa fa-search text-muted"></i>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-4 mt-5 mt-lg-0">
                                    <button type="button" className="btn btn-primary font-weight-bolder float-right" onClick={this.openAddEditVariable}>
                                        {Lang.SelectVariable.new}
                                    </button>
                                </div>
                            </div>

                            <div className="bpms-table bpms-table-bordered  bpms-table-default   mt-2">
                                <table className="bpms-table-table" style={{ display: "block" }}>
                                    <thead className="bpms-table-head">
                                        <tr className="bpms-table-row" style={{ left: "0px" }}>
                                            <th className="bpms-table-cell bpms-table-toggle-detail">
                                                <span style={{ width: "40px" }}> {Lang.SelectVariable.tbl_th_Select}</span>
                                            </th>
                                            <th className="bpms-table-cell">
                                                <span style={{ width: "160px" }}> {Lang.SelectVariable.tbl_th_Name}</span>
                                            </th>
                                            <th className="bpms-table-cell">
                                                <span style={{ width: "100px" }}> {Lang.SelectVariable.tbl_th_Type}</span>
                                            </th>
                                            <th className="bpms-table-cell">
                                                <span style={{ width: "130px" }}>
                                                    {Lang.SelectVariable.tbl_th_Filter}
                                                </span>
                                            </th>
                                            <th className="bpms-table-cell-left bpms-table-cell">
                                                <span style={{ width: "80px" }}>
                                                    {Lang.SelectVariable.tbl_th_Edit}
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bpms-table-body">
                                        {
                                            this.state.GetList &&
                                            this.state.GetList.map((item, index) => {
                                                return <React.Fragment key={item.ID + index}><tr className="bpms-table-row" style={{ left: "0px", backgroundColor: ((this.props.selectedVariable != null && this.props.selectedVariable.split('.')[0] == item.Name) ? "#e9fbe2" : "") }} >
                                                    {
                                                        item.VarTypeLU != 5 &&
                                                        <td className="bpms-table-cell">
                                                            <a href="javascript:;" onClick={() => { window.selectVariable(item.Name) }} data-dismiss="modal" className="btn btn-sm btn-clean btn-icon">
                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-check"></i></span>
                                                            </a>
                                                        </td>
                                                    }
                                                    {
                                                        item.VarTypeLU == 5 &&
                                                        <td className="bpms-table-cell bpms-table-toggle-detail text-left">
                                                            <a className="bpms-table-toggle-detail table-collapse-detail" href="javascript:;">
                                                                <i className="fa fa-caret-left"></i>
                                                            </a>
                                                        </td>
                                                    }


                                                    <td className="bpms-table-cell">
                                                        <span style={{ width: "160px" }}>{item.Name}</span>
                                                    </td>
                                                    <td className="bpms-table-cell">
                                                        <span style={{ width: "100px" }}>{item.VarTypeName}</span>
                                                    </td>
                                                    <td className="bpms-table-cell">
                                                        <span style={{ width: "130px" }}>{item.FilterTypeName}</span>
                                                    </td>
                                                    <td className="bpms-table-cell text-center">
                                                        <span style={{ width: "80px" }}>
                                                            <a href="javascript:;" onClick={() => { this.openAddEditVariable(item.ID) }} className="btn btn-sm btn-clean btn-icon" title="ویرایش">
                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                    {
                                                        item.VarTypeLU == 5 &&
                                                        <tr className="bpms-table-row-detail collapse-row-detail">
                                                            <td className="bpms-table-detail" colSpan="4">
                                                                <table>
                                                                    <tbody>
                                                                        {
                                                                            item.ListEntityPropertyModel &&
                                                                            item.ListEntityPropertyModel.map((Property, index) => {
                                                                                return <tr key={index} className="bpms-table-row" style={{ backgroundColor: ((this.props.selectedVariable != null && this.props.selectedVariable.split('.')[1] == Property.Name) ? "#e9fbe2" : "") }} >
                                                                                    <td className="bpms-table-cell">
                                                                                        <span>
                                                                                            <a href="javascript:;" onClick={() => { window.selectVariable(item.Name + "." + Property.Name) }} data-dismiss="modal" className="btn btn-sm btn-clean btn-icon">
                                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-check"></i></span>
                                                                                            </a>
                                                                                        </span>
                                                                                    </td>
                                                                                    <td className="bpms-table-cell"><span>{Property.Name}</span></td>
                                                                                    <td className="bpms-table-cell"><span>{Property.DbTypeName}</span></td>
                                                                                    <td className="bpms-table-cell"><span>{Property.Required ? "Optional" : "Required"}</span></td>
                                                                                    <td className="bpms-table-cell"><span>{Property.Description}</span></td>
                                                                                </tr>
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    }
                                                </React.Fragment>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                        </div>
                    </div>
                </div>
                <div id="divAddEditVariable" className="modal fade" role="dialog">
                    {this.state.OpenAddEdit && <AddEditVariable callBack={this.callBackFromAddEdit} applicationPageId={this.props.applicationPageId} processId={this.props.processId} addEditId={this.state.AddEditId}></AddEditVariable>}
                </div>
            </React.Fragment>
        );
    }
}

export default SelectVariable;

