import React from 'react';
import Paging from '../../../Components/Paging';
import Select from '../../../Components/Select';
import UserService from '../../../Services/UserService';
import UtilityService from '../../../Services/UtilityService';
import AddEditUser from './AddEditUser';
import Lang from '../../../Shared/AdminLang/Lang';
class UserList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
        this.delete = this.delete.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(1, [Lang.Menu.UserList, Lang.Menu.setting], false);
        this.doSearch();
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new UserService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }
    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEdit');
        this.doSearch();
    }
    async delete(id) {
        let result = await new UserService().delete(id);
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
                                            {Lang.UserList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <a className="btn btn-primary font-weight-bolder" id="btnaddnewDbConnection" onClick={() => this.openAddEditForm(null)}>
                                            {Lang.UserList.new}
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-7 card-search">
                                        <div className="row align-items-center">
                                            <div className="col-lg-9 col-xl-8">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4 my-2 my-md-0">
                                                        <div className="input-icon">
                                                            <input onChange={this.handelChange} name="Name" value={this.state.Name || ''} className="form-control" placeholder={Lang.UserList.name} autoComplete="Off" />
                                                            <span>
                                                                <a onClick={() => this.doSearch(true, false)} >
                                                                    <i className="fa fa-search text-muted"></i>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-xl-4 mt-5 mt-lg-0">
                                                <button  className="btn btn-light-primary px-6 font-weight-bold" data-toggle="collapse" data-target="#demo">
                                                    {Lang.Shared.AdvSearch}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-7 advsearch">
                                        <div className={this.state.IsAdvSearch ? "card card-custom card-fit card-border collapse show" : "card card-custom card-fit card-border collapse"} id="demo">
                                            <div className="card-body">
                                                <div className="form-group row">
                                                    <div className="col-lg-6">
                                                        <label>{Lang.UserList.advName}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={this.state.AdvName || ''} name='AdvName' className="form-control" autoComplete="Off" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label>{Lang.UserList.advRoleCode}</label>
                                                        <div className="input-group">
                                                            <Select name="AdvRoleCode" value={this.state.AdvRoleCode || ''} handelChange={this.handelChange}
                                                                listItem={this.state.GetRoleList} optionKey="CodeOf" optionLabel="NameOf" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-lg-6">
                                                        <label>{Lang.UserList.advDepartmentID}</label>
                                                        <div className="input-group">
                                                            <Select name="AdvDepartmentID" value={this.state.AdvDepartmentID || ''} handelChange={this.handelChange}
                                                                listItem={this.state.GetDepartmentList} optionKey="ID" optionLabel="Name" />
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
                                                            {Lang.UserList.tbl_th_Username}
                                                        </th>
                                                        <th>
                                                            {Lang.UserList.tbl_th_FirstName}
                                                        </th>
                                                        <th>
                                                            {Lang.UserList.tbl_th_LastName}
                                                        </th>
                                                        <th>
                                                            {Lang.UserList.tbl_th_Email}
                                                        </th>
                                                        <th>
                                                            {Lang.UserList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.Username}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.FirstName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.LastName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Email}
                                                                </td>
                                                                <td className="text-center">
                                                                    <a onClick={() => this.openAddEditForm(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </a>
                                                                    <a onClick={() => UtilityService.showConfirm('Delete this item?', this.delete, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
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
                    {this.state.OpenAddEdit && <AddEditUser callBack={this.callBackFromAddEdit} addEditId={this.state.AddEditId}></AddEditUser>}
                </div>
            </div>
        );
    }
}

export default UserList;

