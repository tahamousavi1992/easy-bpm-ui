import React from 'react';
import Paging from '../../../Components/Paging';
import DocumentFolderService from '../../../Services/DocumentFolderService';
import DocumentDefService from '../../../Services/DocumentDefService';
import UtilityService from '../../../Services/UtilityService';
import AddEditDef from './AddEditDef';
import AddEditFolder from './AddEditFolder';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class FolderList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doLoadForm = this.doLoadForm.bind(this);
        this.doDefSearch = this.doDefSearch.bind(this);
        this.doFolderSearch = this.doFolderSearch.bind(this);
        this.callBackFromDefAddEdit = this.callBackFromDefAddEdit.bind(this);
        this.callBackFromFolderAddEdit = this.callBackFromFolderAddEdit.bind(this);
        this.openAddEditDefForm = this.openAddEditDefForm.bind(this);
        this.openAddEditFolderForm = this.openAddEditFolderForm.bind(this);
        this.inActiveDef = this.inActiveDef.bind(this);
        this.inActiveFolder = this.inActiveFolder.bind(this);
    }
    async componentDidMount() {
        window.selectedID = null;
        this.props.setPageCaption(9, [Lang.Menu.FolderList, Lang.Menu.management], false);
        this.doLoadForm();
    }

    async doLoadForm() {
        window.doDefSearch = this.doDefSearch;
        window.doFolderSearch = this.doFolderSearch;
        window.openAddEditDefForm = this.openAddEditDefForm;
        window.openAddEditFolderForm = this.openAddEditFolderForm;
        window.inActiveFolder = this.inActiveFolder;
        await this.doFolderSearch();
        await this.doDefSearch();
    }

    async doFolderSearch() {
        let data = await new DocumentFolderService().getList({ selectedID: window.selectedID });
        await this.setState({ showTree: true })
        await this.setState({ ...data });
        //DocumentFolder
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
                            window.openAddEditFolderForm(window.selectedID, null);
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
                        window.openAddEditFolderForm(null, window.selectedID);
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
                        window.inActiveFolder($.jstree.reference(data.reference).get_node(data.reference).id);
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
                'data': data.FolderList
            }
        }).on("changed.jstree", function (e, data) {
            if (data.selected.length) {
                window.selectedID = data.instance.get_node(data.selected[0]).id;
                window.doDefSearch();
            }
        });
    }

    async doDefSearch(reLoad, isAdvSearch, GetPagingProperties) {
        await this.setState({ DocumentFolderID: window.selectedID })
        let reusltData = await new UtilityService().doSearch(new DocumentDefService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...reusltData });
    }

    async callBackFromDefAddEdit() {
        //close modal
        window.closeModal('divDefAddEdit');
        this.doDefSearch();
    }

    async callBackFromFolderAddEdit(id) {
        //close modal
        window.closeModal('divFolderAddEdit');
        await this.setState({ showTree: false })
        await this.doFolderSearch();
        if (id != null)
            window.selectedID = id
        await this.doDefSearch();
    }

    async inActiveDef(id) {
        let result = await new DocumentDefService().inActive(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.doDefSearch();
    }

    async inActiveFolder(id) {
        let result = await new DocumentFolderService().inActive(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        await this.setState({ showTree: false })
        await this.doFolderSearch();
        await this.doDefSearch();;
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async openAddEditDefForm(id, documentFolderID) {
        if (window.selectedID == null || window.selectedID == '-1') {
            if (documentFolderID == null) {
                alert('First choose Folder');
                return;
            }
        }

        await this.setState({ AddEditId: id, DocumentFolderID: ((window.selectedID != null && window.selectedID != '-1') ? window.selectedID : documentFolderID) });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenDefAddEdit: false });
        await this.setState({ OpenDefAddEdit: true });
        window.openModal('divDefAddEdit', true);
    }

    async openAddEditFolderForm(id, parentId) {
        await this.setState({ AddEditId: id, ParentId: parentId });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenFolderAddEdit: false });
        await this.setState({ OpenFolderAddEdit: true });
        window.openModal('divFolderAddEdit', true);
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
                                            {Lang.FolderList.caption}
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
                                        <div id="divFolderAddEdit" className="modal fade" role="dialog">
                                            {this.state.OpenFolderAddEdit && <AddEditFolder callBack={this.callBackFromFolderAddEdit} addEditId={this.state.AddEditId} parentId={this.state.ParentId}></AddEditFolder>}
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
                                            {Lang.FolderList.documentCaption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <a href="javascript:;" className="btn btn-primary font-weight-bolder" id="btnAdd" onClick={() => this.openAddEditDefForm(null)}>
                                            {Lang.FolderList.folderNew}
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.FolderList.tbl_th_DisplayName}
                                                        </th>
                                                        <th>
                                                            {Lang.FolderList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.FolderList.tbl_th_IsMandatory}
                                                        </th>
                                                        <th>
                                                            {Lang.FolderList.tbl_th_MaxSize}
                                                        </th>
                                                        <th>
                                                            {Lang.FolderList.tbl_th_ValidExtensions}
                                                        </th>
                                                        <th>
                                                            {Lang.FolderList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.DisplayName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.NameOf}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.IsMandatory ? "Yes" : "No"}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.MaxSize}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.ValidExtensions}
                                                                </td>

                                                                <td className="text-center">
                                                                    <a href="javascript:;" onClick={() => this.openAddEditDefForm(item.ID, item.DocumentFolderID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </a>
                                                                    <a href="javascript:;" onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.inActiveDef, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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
                                            <Paging doSearch={this.doDefSearch} {...this.state.GetPagingProperties}></Paging>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divDefAddEdit" className="modal fade" role="dialog">
                    {this.state.OpenDefAddEdit && <AddEditDef callBack={this.callBackFromDefAddEdit} addEditId={this.state.AddEditId} documentFolderID={this.state.DocumentFolderID} ></AddEditDef>}
                </div>
            </div >
        );
    }
}

export default FolderList;

