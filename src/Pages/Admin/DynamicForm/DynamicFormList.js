import React from 'react';
import Paging from '../../../Components/Paging';
import DynamicFormService from '../../../Services/DynamicFormService';
import UtilityService from '../../../Services/UtilityService';
import AddDynamicForm from './AddDynamicForm';
import BpmsConfig from '../../../Shared/BpmsConfig'
import { Link } from "react-router-dom"
import Lang from '../../../Shared/AdminLang/Lang';
class DynamicFormList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddForm = this.openAddForm.bind(this);
        this.delete = this.delete.bind(this);
        this.copy = this.copy.bind(this);

    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    backToFunction = () => {
        this.props.history.push(BpmsConfig.currentPage() + "/DesignProcess/" + this.state.ProcessId);
    }

    async componentDidMount() {
        let processId = this.props.match.params.ProcessId;
        this.props.setPageCaption(processId != null ? 2 : 17, [(processId != null ? "Forms" : Lang.Menu.applicationPages), Lang.Menu.management],
            processId != null, processId, null, (processId != null ? this.backToFunction : null));
        await this.setState({ ProcessId: processId });
        this.doSearch();
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new DynamicFormService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }
    async callBackFromAddEdit(data, isAdd) {
        //close modal
        window.closeModal('divAddEdit');
        if (isAdd && data != null) {
            if (data.ApplicationPageID != null) {
                this.props.history.push(BpmsConfig.currentPage() + "/AppPageFormDesign/" + this.state.ApplicationPageID);
            }
            else {
                this.props.history.push(BpmsConfig.currentPage() + "/ProcessFormDesign/" + this.state.ID);
            }
        }

        this.doSearch();
    }
    async delete(id) {
        let result = await new DynamicFormService().delete(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }

    async copy(id) {
        let result = await new DynamicFormService().copy(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }

    async openAddForm(id) {
        await this.setState({ AddEditId: id });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEdit: false });
        await this.setState({ OpenAddEdit: true });
        window.openModal('divAddEdit', true);
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
                                            {Lang.DynamicFormList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnaddnewDbConnection" onClick={() => this.openAddForm(null)}>
                                            {Lang.DynamicFormList.new}
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-7 card-search">
                                        <div className="row align-items-center">
                                            <div className="col-lg-9 col-xl-8">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4 my-2 my-md-0">
                                                        <div className="input-icon">
                                                            <input onChange={this.handelChange} name="Name" value={this.state.Name || ''} className="form-control" autoComplete="Off" />
                                                            <span>
                                                                <a onClick={() => this.doSearch(true, false)} >
                                                                    <i className="fa fa-search text-muted"></i>
                                                                </a>
                                                            </span>
                                                        </div>
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
                                                            {Lang.DynamicFormList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.DynamicFormList.tbl_th_Overview}
                                                        </th>
                                                        <th>
                                                            {Lang.DynamicFormList.tbl_th_CreatedBy}
                                                        </th>
                                                        <th>
                                                            {Lang.DynamicFormList.tbl_th_CreatedDate}
                                                        </th>
                                                        <th>
                                                            {Lang.DynamicFormList.tbl_th_UpdatedBy}
                                                        </th>
                                                        <th>
                                                            {Lang.DynamicFormList.tbl_th_UpdatedDate}
                                                        </th>

                                                        <th>
                                                            {Lang.DynamicFormList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.Name}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.ShowInOverview ? "Yes" : "No"}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.CreatedByName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.CreatedDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.UpdatedByName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.UpdatedDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    {
                                                                        item.ApplicationPageID &&
                                                                        <React.Fragment>
                                                                            <Link to={BpmsConfig.currentPage() + `/AppPageFormDesign/${item.ApplicationPageID}`} className="btn btn-sm btn-clean btn-icon">
                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-palette"></i></span>
                                                                            </Link>
                                                                        </React.Fragment>
                                                                    }
                                                                    {
                                                                        item.ProcessId &&
                                                                        <React.Fragment>
                                                                            <Link to={BpmsConfig.currentPage() + `/ProcessFormDesign/${item.ID}`} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-palette"></i></span>
                                                                            </Link>
                                                                        </React.Fragment>
                                                                    }

                                                                    <a onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.delete, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                                    </a>
                                                                    <a onClick={() => UtilityService.showConfirm(Lang.DynamicFormList.makeCopy, this.copy, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.DynamicFormList.copy}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-copy"></i></span>
                                                                    </a>
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
                <div id="divAddEdit" className="modal fade" role="dialog">
                    {this.state.OpenAddEdit && <AddDynamicForm callBack={this.callBackFromAddEdit} processId={this.state.ProcessId} addEditId={this.state.AddEditId}></AddDynamicForm>}
                </div>
            </div>
        );
    }
}

export default DynamicFormList;

