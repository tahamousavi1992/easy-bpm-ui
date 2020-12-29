import React from 'react';
import Paging from '../../../Components/Paging';
import ProcessGroupService from '../../../Services/ProcessGroupService';
import ProcessService from '../../../Services/ProcessService';
import UtilityService from '../../../Services/UtilityService';
import AddProcess from './AddProcess';
import AddEditProcessGroup from './AddEditProcessGroup';
import { Link } from "react-router-dom"
import BpmsConfig from '../../../Shared/BpmsConfig'
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class ProcessList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doLoadForm = this.doLoadForm.bind(this);
        this.doProcessSearch = this.doProcessSearch.bind(this);
        this.doProcessGroupSearch = this.doProcessGroupSearch.bind(this);
        this.callBackFromProcessAddEdit = this.callBackFromProcessAddEdit.bind(this);
        this.callBackFromProcessGroupAddEdit = this.callBackFromProcessGroupAddEdit.bind(this);
        this.openAddProcessForm = this.openAddProcessForm.bind(this);
        this.openAddEditProcessGroupForm = this.openAddEditProcessGroupForm.bind(this);
        this.deleteProcess = this.deleteProcess.bind(this);
        this.inActiveProcessGroup = this.inActiveProcessGroup.bind(this);

        this.publishProcess = this.publishProcess.bind(this);
        this.activeProcess = this.activeProcess.bind(this);
        this.inActiveProcess = this.inActiveProcess.bind(this);
        this.newVersionProcess = this.newVersionProcess.bind(this);
    }

    async componentDidMount() {
        this.props.setPageCaption(2, [Lang.Menu.ProcessList, Lang.Menu.management], false);
        this.doLoadForm();
    }

    async doLoadForm() {
        window.doProcessSearch = this.doProcessSearch;
        window.doProcessGroupSearch = this.doProcessGroupSearch;
        window.openAddProcessForm = this.openAddProcessForm;
        window.openAddEditProcessGroupForm = this.openAddEditProcessGroupForm;
        window.inActiveProcessGroup = this.inActiveProcessGroup;
        await this.doProcessGroupSearch();
        await this.doProcessSearch();
    }

    async doProcessGroupSearch() {
        let data = await new ProcessGroupService().getList({ SelectedID: window.selectedID });
        await this.setState({ showTree: true })
        await this.setState({ ...data });
        //ProcessGroup
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
                            window.openAddEditProcessGroupForm(window.selectedID, null);
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
                        window.openAddEditProcessGroupForm(null, window.selectedID);
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
                        window.inActiveProcessGroup($.jstree.reference(data.reference).get_node(data.reference).id);
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
                'data': data.GroupList
            }
        }).on("changed.jstree", function (e, data) {
            if (data.selected.length) {
                if (data.instance.get_node(data.selected[0]).id != window.selectedID) {
                    window.selectedID = data.instance.get_node(data.selected[0]).id;
                    window.doProcessSearch();
                }
            }
        });
    }

    async doProcessSearch(reLoad, isAdvSearch, GetPagingProperties) {
        await this.setState({ SelectedID: window.selectedID })
        let reusltData = await new UtilityService().doSearch(new ProcessService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...reusltData });
    }

    async callBackFromProcessAddEdit() {
        //close modal
        window.closeModal('divProcessAddEdit');
        this.doProcessSearch();
    }

    async callBackFromProcessGroupAddEdit(id) {
        //close modal
        window.closeModal('divProcessGroupAddEdit');
        await this.setState({ showTree: false })
        await this.doProcessGroupSearch();
        if (id != null)
            window.selectedID = id
        await this.doProcessSearch();
    }

    async deleteProcess(id) {
        let result = await new ProcessService().delete(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.doProcessSearch();
    }

    async activeProcess(id) {
        let result = await new ProcessService().active(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.doProcessSearch();
    }

    async publishProcess(id) {
        let result = await new ProcessService().getPublish(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.doProcessSearch();
    }

    async inActiveProcess(id) {
        let result = await new ProcessService().inActive(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.doProcessSearch();
    }

    async newVersionProcess(id) {
        let result = await new ProcessService().getNewVersion(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.doProcessSearch();
    }

    async inActiveProcessGroup(id) {
        let result = await new ProcessGroupService().delete(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.setState({ showTree: false })
        await this.doProcessGroupSearch();
        await this.doProcessSearch();;
    }


    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async openAddProcessForm(id) {
        if (window.selectedID == null || window.selectedID == '-1') {
            alert(Lang.ProcessList.selectGroup);
            return;
        }
        await this.setState({ AddEditId: id, ProcessGroupID: window.selectedID });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenProcessAddEdit: false });
        await this.setState({ OpenProcessAddEdit: true });
        window.openModal('divProcessAddEdit', true);
    }

    async openAddEditProcessGroupForm(id, parentId) {
        await this.setState({ AddEditId: id, ParentId: parentId });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenProcessGroupAddEdit: false });
        await this.setState({ OpenProcessGroupAddEdit: true });
        window.openModal('divProcessGroupAddEdit', true);
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
                                            {Lang.ProcessList.groupCaption}
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
                                        <div id="divProcessGroupAddEdit" className="modal fade" role="dialog">
                                            {this.state.OpenProcessGroupAddEdit && <AddEditProcessGroup callBack={this.callBackFromProcessGroupAddEdit} addEditId={this.state.AddEditId} parentId={this.state.ParentId}></AddEditProcessGroup>}
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
                                            {Lang.ProcessList.processCaption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnAdd" onClick={() => this.openAddProcessForm(null)}>
                                            {Lang.ProcessList.new}
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
                                                            {Lang.ProcessList.tbl_th_FormattedNumber}
                                                        </th>
                                                        <th>
                                                            {Lang.ProcessList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.ProcessList.tbl_th_Status}
                                                        </th>
                                                        <th>
                                                            {Lang.ProcessList.tbl_th_Creator}
                                                        </th>
                                                        <th>
                                                            {Lang.ProcessList.tbl_th_CreatedOn}
                                                        </th>
                                                        <th>
                                                            {Lang.ProcessList.tbl_th_UpdatedOn}
                                                        </th>
                                                        <th>
                                                            {Lang.ProcessList.tbl_th_Type}
                                                        </th>
                                                        <th>
                                                            {Lang.ProcessList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.FormattedNumber}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Name}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.StatusName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.CreatorUsername}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.CreateDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.UpdateDate.split('T')[0]}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.TypeName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {
                                                                        //Published
                                                                        item.StatusLU == 2 &&
                                                                        <React.Fragment>
                                                                            <a onClick={() => UtilityService.showConfirm(Lang.ProcessList.makeStop, this.inActiveProcess, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.ProcessList.stop}>
                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-stop"></i></span>
                                                                            </a>
                                                                            <a onClick={() => UtilityService.showConfirm(Lang.ProcessList.newVersion, this.newVersionProcess, item.ID)} className="btn btn-sm btn-clean btn-icon" title="New Version">
                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-copy"></i></span>
                                                                            </a>
                                                                        </React.Fragment>
                                                                    }
                                                                    {
                                                                        //Inactive/Stop
                                                                        item.StatusLU == 3 &&
                                                                        <React.Fragment>
                                                                            <a onClick={() => UtilityService.showConfirm(Lang.ProcessList.newVersion, this.newVersionProcess, item.ID)} className="btn btn-sm btn-clean btn-icon" title="New Version">
                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-copy"></i></span>
                                                                            </a>
                                                                            <a onClick={() => this.activeProcess(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.active}>
                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-check"></i></span>
                                                                            </a>
                                                                        </React.Fragment>
                                                                    }
                                                                    {
                                                                        //Draft
                                                                        item.StatusLU == 1 &&
                                                                        <React.Fragment>
                                                                            <a onClick={() => this.publishProcess(item.ID)} className="btn btn-sm btn-clean btn-icon" title="Publish">
                                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-play"></i></span>
                                                                            </a>
                                                                        </React.Fragment>
                                                                    }
                                                                    <Link to={BpmsConfig.currentPage() + `/DesignProcess/${item.ID}`} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </Link>
                                                                    <a onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.deleteProcess, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-times"></i></span>
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
                                            <Paging doSearch={this.doProcessSearch} {...this.state.GetPagingProperties}></Paging>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divProcessAddEdit" className="modal fade" role="dialog">
                    {this.state.OpenProcessAddEdit && <AddProcess callBack={this.callBackFromProcessAddEdit} processGroupID={this.state.ProcessGroupID} ></AddProcess>}
                </div>
            </div >
        );
    }
}

export default ProcessList;

