import React from 'react';
import Paging from '../../../Components/Paging';
import EmailAccountService from '../../../Services/EmailAccountService';
import UtilityService from '../../../Services/UtilityService';
import AddEditEmailAccount from './AddEditEmailAccount';
import Lang from '../../../Shared/AdminLang/Lang';
class EmailAccountList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
        this.delete = this.delete.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(6, [Lang.Menu.EmailAccountList, Lang.Menu.setting], false);
        this.doSearch();
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new EmailAccountService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }
    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEdit');
        this.doSearch();
    }
    async delete(id) {
        let result = await new EmailAccountService().delete(id);
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
                                            {Lang.EmailAccountList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar"> 
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnaddnewDbConnection" onClick={() => this.openAddEditForm(null)}>
                                            {Lang.EmailAccountList.new}
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.EmailAccountList.tbl_th_Email}
                                                        </th>
                                                        <th>
                                                            {Lang.EmailAccountList.tbl_th_SMTP}
                                                        </th>
                                                        <th>
                                                            {Lang.EmailAccountList.tbl_th_Port}
                                                        </th>
                                                        <th>
                                                            {Lang.EmailAccountList.tbl_th_MailUserName}
                                                        </th>
                                                        <th>
                                                            {Lang.EmailAccountList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.Email}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.SMTP}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Port}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.MailUserName}
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
                    {this.state.OpenAddEdit && <AddEditEmailAccount callBack={this.callBackFromAddEdit} addEditId={this.state.AddEditId}></AddEditEmailAccount>}
                </div>
            </div>
        );
    }
}

export default EmailAccountList;

