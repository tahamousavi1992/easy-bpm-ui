import React from 'react';
import Paging from '../../../Components/Paging';
import VariableService from '../../../Services/VariableService';
import UtilityService from '../../../Services/UtilityService';
import AddEditVariable from './AddEditVariable';
import Lang from '../../../Shared/AdminLang/Lang';
class VariableList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
        this.delete = this.delete.bind(this);
    }
    async componentDidMount() {
        await this.setState({ ApplicationPageId: this.props.applicationPageId, ProcessId: this.props.processId })
        await this.doSearch();
    }
    async doSearch() {
        let data = await new VariableService().getList(this.state.ApplicationPageId, this.state.ProcessId);
        this.setState({ ...data });
    }
    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEditVariablePage');
        this.doSearch();
    }
    async delete(id) {
        let result = await new VariableService().delete(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }
    async openAddEditForm(id) {
        await this.setState({ AddEditId: id });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEdit: false });
        await this.setState({ OpenAddEdit: true });
        window.openModal('divAddEditVariablePage', true);
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="modalVariableListPage">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.VariableList.caption}</h5>
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
                        <div className="form">
                            <div className="row">
                                <div className="col-xl-12">
                                    <button type="button" className="btn btn-primary font-weight-bolder" id="btnaddnewDbConnection" onClick={() => this.openAddEditForm(null)}>
                                        {Lang.VariableList.new}
                                    </button>
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.VariableList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.VariableList.tbl_th_Type}
                                                        </th>
                                                        <th>
                                                            {Lang.VariableList.tbl_th_Relation}
                                                        </th>
                                                        <th>
                                                            {Lang.VariableList.tbl_th_Operation}
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
                                                                    {item.VarTypeName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.FilterTypeName}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divAddEditVariablePage" className="modal fade" role="dialog">
                            {this.state.OpenAddEdit && <AddEditVariable callBack={this.callBackFromAddEdit} applicationPageId={this.state.ApplicationPageId} processId={this.state.ProcessId} addEditId={this.state.AddEditId}></AddEditVariable>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.close}</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default VariableList;

