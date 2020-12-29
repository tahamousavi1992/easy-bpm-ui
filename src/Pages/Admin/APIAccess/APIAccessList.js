import React from 'react';
import Paging from '../../../Components/Paging';
import APIAccessService from '../../../Services/APIAccessService';
import UtilityService from '../../../Services/UtilityService';
import AddEditAPIAccess from './AddEditAPIAccess';
import Lang from '../../../Shared/AdminLang/Lang';
class APIAccessList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
        this.delete = this.delete.bind(this);
        this.active = this.active.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(12, [Lang.Menu.apiAccessList, Lang.Menu.setting], false);
        this.doSearch();
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new APIAccessService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }
    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEdit');
        this.doSearch();
    }
    async delete(id) {
        let result = await new APIAccessService().delete(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }
    async active(id) {
        let result = await new APIAccessService().active(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }
    async openAddEditForm(id) {
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
                                            {Lang.APIAccessList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">

                                        <a href="javascript:;" className="btn btn-primary font-weight-bolder" id="btnaddnewAPIAccess" onClick={() => this.openAddEditForm(null)}>
                                            {Lang.APIAccessList.new}
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default ">
                                        <div className="table-information table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.APIAccessList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.APIAccessList.tbl_th_IPAddress}
                                                        </th>
                                                        <th>
                                                            {Lang.APIAccessList.tbl_th_AccessKey}
                                                        </th>
                                                        <th>
                                                            {Lang.APIAccessList.tbl_th_IsActive}
                                                        </th>
                                                        <th>
                                                            {Lang.APIAccessList.tbl_th_Operation}
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
                                                                    {item.IPAddress}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.AccessKey}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.IsActive ? 'Active' : "InActive"}
                                                                </td>
                                                                <td className="text-center">
                                                                    <a href="javascript:;" onClick={() => this.openAddEditForm(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </a>
                                                                    {
                                                                        item.IsActive &&
                                                                        <a href="javascript:;" onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.delete, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        !item.IsActive &&
                                                                        <a href="javascript:;" onClick={() => this.active(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.active}>
                                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-share"></i></span>
                                                                        </a>
                                                                    }

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
                    {this.state.OpenAddEdit && <AddEditAPIAccess callBack={this.callBackFromAddEdit} addEditId={this.state.AddEditId}></AddEditAPIAccess>}
                </div>
            </div>
        );
    }
}

export default APIAccessList;

