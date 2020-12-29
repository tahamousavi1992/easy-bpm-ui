import React from 'react';
import StyleSheetService from '../../../Services/StyleSheetService';
import UtilityService from '../../../Services/UtilityService';
import AddEditStyleSheet from './AddEditStyleSheet';
import Lang from '../../../Shared/AdminLang/Lang';
class StyleSheetList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.delete = this.delete.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
    }

    async componentDidMount() {
        this.props.setPageCaption(11, [Lang.Menu.StyleSheetList, Lang.Menu.management], false);
        this.doSearch();
    }

    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEdit');
        this.doSearch();
    }

    async openAddEditForm(fileName) {
        await this.setState({ AddEditId: fileName });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEdit: false });
        await this.setState({ OpenAddEdit: true });
        window.openModal('divAddEdit', true);
    }

    async doSearch() {
        let data = await new StyleSheetService().getList();
        this.setState({ GetList: data });
    }

    async uploadFile() {
        let result = await new StyleSheetService().postFile(UtilityService.getFormData('styleSheetForm'));
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }

    async delete(fileName) {
        let result = await new StyleSheetService().delete(fileName);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    render() {
        return (
            <div>
                <div id="styleSheetForm">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card card-custom gutter-b">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                    <div className="card-title">
                                        <h3 className="card-label">
                                            {Lang.StyleSheetList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <input type="file" name="FileStyle" id="FileStyle" onChange={() => this.uploadFile()} style={{ display: "none" }} />
                                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnaddnewStyle" onClick={() => document.getElementById('FileStyle').click()}>
                                            {Lang.StyleSheetList.uploadNewStyle}
                                        </button>
                                        <button type="button" className="btn btn-primary font-weight-bolder mr-2" id="btnadd" onClick={() => this.openAddEditForm(null)}>
                                            {Lang.StyleSheetList.addNewStyle}
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
                                                            {Lang.StyleSheetList.tbl_th_FileName}
                                                        </th>
                                                        <th>
                                                            {Lang.StyleSheetList.tbl_th_Size}
                                                        </th>
                                                        <th>
                                                            {Lang.StyleSheetList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.index} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.FileName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.Size}
                                                                </td>
                                                                <td className="text-center">
                                                                    <a onClick={() => this.openAddEditForm(item.Name)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                    </a>

                                                                    <a onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.delete, item.Name)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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
                    </div>
                </div>
                <div id="divAddEdit" className="modal fade" role="dialog">
                    {this.state.OpenAddEdit && <AddEditStyleSheet callBack={this.callBackFromAddEdit} addEditId={this.state.AddEditId}></AddEditStyleSheet>}
                </div>
            </div>
        );
    }
}

export default StyleSheetList;

