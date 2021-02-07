import React from 'react';
import Paging from '../../../Components/Paging';
import DepartmentService from '../../../Services/DepartmentService';
import DepartmentMemberService from '../../../Services/DepartmentMemberService';
import UtilityService from '../../../Services/UtilityService';
import AddEditDepartmentMember from './AddEditDepartmentMember';
import AddEditDepartment from './AddEditDepartment';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class DepartmentList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doLoadForm = this.doLoadForm.bind(this);
        this.doMemberSearch = this.doMemberSearch.bind(this);
        this.doDepartmentSearch = this.doDepartmentSearch.bind(this);
        this.callBackFromMemberAddEdit = this.callBackFromMemberAddEdit.bind(this);
        this.callBackFromDepartmentAddEdit = this.callBackFromDepartmentAddEdit.bind(this);
        this.openAddEditMemberForm = this.openAddEditMemberForm.bind(this);
        this.openAddEditDepartmentForm = this.openAddEditDepartmentForm.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    async componentDidMount() {
        window.selectedID = null;
        this.props.setPageCaption(3, [Lang.Menu.departmentList, Lang.Menu.setting], false);
        this.doLoadForm();
    }

    async doLoadForm() {
        window.doMemberSearch = this.doMemberSearch;
        window.doDepartmentSearch = this.doDepartmentSearch;
        window.openAddEditDepartmentForm = this.openAddEditDepartmentForm;
        window.deleteDepartment = this.deleteDepartment;
        await this.doDepartmentSearch();
        await this.doMemberSearch();
    }

    async doDepartmentSearch() {
        let data = await new DepartmentService().getList({ SelectedID: window.selectedID });
        await this.setState({ showTree: true })
        await this.setState({ ...data });
        //Department
        window.selectedID = data.SelectedID;
        $.jstree.defaults.contextmenu.items = function (o, cb) { // Could be an object directly
            return {
                "edit": {
                    "separator_before": false,
                    "icon": false,
                    "separator_after": false,
                    "_disabled": false,
                    "label": "Edit",
                    "action": function (data) {
                        var inst = $.jstree.reference(data.reference);
                        var obj = inst.get_node(data.reference);
                        window.selectedID = obj.id;
                        if (window.selectedID != null)
                            window.openAddEditDepartmentForm(window.selectedID, null);
                    }
                },
                "add": {
                    "separator_before": false,
                    "icon": false,
                    "separator_after": false,
                    "_disabled": false,
                    "label": "Add",
                    "action": function (data) {
                        var inst = $.jstree.reference(data.reference);
                        var obj = inst.get_node(data.reference);
                        window.selectedID = obj.id;
                        window.openAddEditDepartmentForm(null, window.selectedID);
                    }
                },
                "remove": {
                    "separator_before": false,
                    "icon": false,
                    "separator_after": false,
                    "_disabled": false,
                    "label": "Delete",
                    "action": async function (data) {
                        window.selectedID = 0;
                        window.deleteDepartment($.jstree.reference(data.reference).get_node(data.reference).id);
                    }
                }
            };
        }

        // ajax demo
        $('#ajax').jstree({
            "plugins": [
                "contextmenu"
            ],
            'core': {
                "themes": {
                    "responsive": false
                },
                'data': data.DepartmentList
            }
        }).on("changed.jstree", function (e, data) {
            if (data.selected.length) {
                window.selectedID = data.instance.get_node(data.selected[0]).id;
                window.doMemberSearch();
            }
        });
    }

    async doMemberSearch(reLoad, isAdvSearch, GetPagingProperties) {
        await this.setState({ DepartmentID: window.selectedID })
        let reusltData = await new UtilityService().doSearch(new DepartmentMemberService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...reusltData });
    }

    async callBackFromMemberAddEdit() {
        //close modal
        window.closeModal('divMemberAddEdit');
        this.doMemberSearch();
    }

    async callBackFromDepartmentAddEdit(id) {
        //close modal
        window.closeModal('divDepartmentAddEdit');
        await this.setState({ showTree: false })
        await this.doDepartmentSearch();
        if (id != null)
            window.selectedID = id
        await this.doMemberSearch();
    }

    async deleteMember(arg) {
        let result = await new DepartmentMemberService().delete(arg.UserID, arg.DepartmentID);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.doMemberSearch();
    }

    async deleteDepartment(id) {
        let result = await new DepartmentService().inActive(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.setState({ showTree: false })
        await this.doDepartmentSearch();
        await this.doMemberSearch();;
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async openAddEditMemberForm(id, departmentID) {
        if (window.selectedID == null || window.selectedID == '-1') {
            if (departmentID == null) {
                alert(Lang.DepartmentList.selectOprganozation);
                return;
            }
        }
        await this.setState({ AddEditId: id, DepartmentID: ((window.selectedID != null && window.selectedID != '-1') ? window.selectedID : departmentID) });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenMemberAddEdit: false });
        await this.setState({ OpenMemberAddEdit: true });
        window.openModal('divMemberAddEdit', true);
    }

    async openAddEditDepartmentForm(id, parentId) {
        await this.setState({ AddEditId: id, ParentId: parentId });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenDepartmentAddEdit: false });
        await this.setState({ OpenDepartmentAddEdit: true });
        window.openModal('divDepartmentAddEdit', true);
    }

    render() {
        return (
            <div>
                <div id="dbManagerIndexSearchForm">
                    <div className="row">
                        <div className="col-xl-3 pr-1">
                            <div className="card card-custom gutter-b">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                    <div className="card-title">
                                        <h3 className="card-label">
                                            {Lang.DepartmentList.departmentCaption}
                                        </h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            {
                                                this.state.showTree && <div id="ajax" className="demo"></div>
                                            }

                                        </div>
                                        <div id="divDepartmentAddEdit" className="modal fade" role="dialog">
                                            {this.state.OpenDepartmentAddEdit && <AddEditDepartment callBack={this.callBackFromDepartmentAddEdit} addEditId={this.state.AddEditId} parentId={this.state.ParentId}></AddEditDepartment>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 pl-0">
                            <div className="card card-custom gutter-b">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                    <div className="card-title">
                                        <h3 className="card-label">
                                            {Lang.DepartmentList.memberCaption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnAdd" onClick={() => this.openAddEditMemberForm(null)}>
                                            {Lang.DepartmentList.newMember}
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
                                                            {Lang.DepartmentList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.DepartmentList.tbl_th_Role}
                                                        </th>
                                                        <th>
                                                            {Lang.DepartmentList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.UserFullName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.RoleNames}
                                                                </td>

                                                                <td className="text-center">
                                                                    <a onClick={() => this.openAddEditMemberForm(item.UserID, item.DepartmentID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </a>
                                                                    <a onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.deleteMember, { UserID: item.UserID, DepartmentID: item.DepartmentID })} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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
                                            <Paging doSearch={this.doMemberSearch} {...this.state.GetPagingProperties}></Paging>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divMemberAddEdit" className="modal fade" role="dialog">
                    {this.state.OpenMemberAddEdit && <AddEditDepartmentMember callBack={this.callBackFromMemberAddEdit} addEditId={this.state.AddEditId} departmentID={this.state.DepartmentID} ></AddEditDepartmentMember>}
                </div>
            </div >
        );
    }
}

export default DepartmentList;

