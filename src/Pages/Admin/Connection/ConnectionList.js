import React from 'react';
import Paging from '../../../Components/Paging';
import ConnectionService from '../../../Services/ConnectionService';
import UtilityService from '../../../Services/UtilityService';
import AddEditConnection from './AddEditConnection';
import Lang from '../../../Shared/AdminLang/Lang';
class ConnectionList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
        this.delete = this.delete.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(7, [Lang.Menu.connectionList, Lang.Menu.management], false);
        this.doSearch();
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new ConnectionService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }
    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEdit');
        this.doSearch();
    }
    async delete(id) {
        let result = await new ConnectionService().delete(id);
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
                                            {Lang.ConnectionList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnaddnewDbConnection" onClick={() => this.openAddEditForm(null)}>
                                            {Lang.ConnectionList.new}
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
                                                            <input onChange={this.handelChange} name="Name" value={this.state.Name || ''} className="form-control" placeholder={Lang.ConnectionList.name} autoComplete="Off" />
                                                            <span>
                                                                <a  onClick={() => this.doSearch(true, false)} >
                                                                    <i className="fa fa-search text-muted"></i>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-xl-4 mt-5 mt-lg-0">
                                                <button type="button" className="btn btn-light-primary px-6 font-weight-bold" data-toggle="collapse" data-target="#demo">
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
                                                        <label>{Lang.ConnectionList.name}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={this.state.AdvName || ''} name='AdvName' className="form-control" autoComplete="Off" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label>{Lang.ConnectionList.server}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={this.state.AdvDataSource || ''} name='AdvDataSource' className="form-control" autoComplete="Off" />
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
                                                            {Lang.ConnectionList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.ConnectionList.tbl_th_DataSource}
                                                        </th>
                                                        <th>
                                                            {Lang.ConnectionList.tbl_th_InitialCatalog}
                                                        </th>
                                                        <th>
                                                            {Lang.ConnectionList.tbl_th_UserID}
                                                        </th>
                                                        <th>
                                                            {Lang.ConnectionList.tbl_th_IntegratedSecurity}
                                                        </th>

                                                        <th>
                                                            {Lang.ConnectionList.tbl_th_Operation}
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
                                                                    {item.DataSource}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.InitialCatalog}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.UserID}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.IntegratedSecurity ? "Yes" : "No"}
                                                                </td>
                                                                <td className="text-center">
                                                                    <a onClick={() => this.openAddEditForm(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </a>
                                                                    <a onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.delete, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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
                    {this.state.OpenAddEdit && <AddEditConnection callBack={this.callBackFromAddEdit} addEditId={this.state.AddEditId}></AddEditConnection>}
                </div>
            </div>
        );
    }
}

export default ConnectionList;

