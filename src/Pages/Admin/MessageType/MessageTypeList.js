import React from 'react';
import Paging from '../../../Components/Paging';
import MessageTypeService from '../../../Services/MessageTypeService';
import UtilityService from '../../../Services/UtilityService';
import AddEditMessageType from './AddEditMessageType';
import Lang from '../../../Shared/AdminLang/Lang';
class MessageTypeList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
        this.inActive = this.inActive.bind(this);
    }
    async componentDidMount() {
        this.props.setPageCaption(28, [Lang.Menu.MessageTypeList, Lang.Menu.management], false);
        this.doSearch();
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new MessageTypeService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }
    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEdit');
        this.doSearch();
    }
    async inActive(id) {
        let result = await new MessageTypeService().inActive(id);
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
                <div id="messageTypeIndexSearchForm">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card card-custom gutter-b">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                    <div className="card-title">
                                        <h3 className="card-label">
                                            {Lang.MessageTypeList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnaddnewMessage" onClick={() => this.openAddEditForm(null)}>
                                            {Lang.MessageTypeList.new}
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
                                                            {Lang.MessageTypeList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.MessageTypeList.tbl_th_IsActive}
                                                        </th>
                                                        <th>
                                                            {Lang.MessageTypeList.tbl_th_Operation}
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
                                                                    {item.IsActive ? 'Active' : "InActive"}
                                                                </td>
                                                                <td className="text-center">
                                                                    <a onClick={() => this.openAddEditForm(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </a>
                                                                    {
                                                                        item.IsActive &&
                                                                        <a onClick={() => UtilityService.showConfirm(Lang.Shared.makeInActive, this.inActive, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.inActive}>
                                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
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
                    {this.state.OpenAddEdit && <AddEditMessageType callBack={this.callBackFromAddEdit} addEditId={this.state.AddEditId}></AddEditMessageType>}
                </div>
            </div>
        );
    }
}

export default MessageTypeList;

