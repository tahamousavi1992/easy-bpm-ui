import React from 'react';
import Paging from '../../../Components/Paging';
import LookUpService from '../../../Services/LookUpService';
import UtilityService from '../../../Services/UtilityService';
import AddEditLookUp from './AddEditLookUp';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
class LookUpList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.doSearch = this.doSearch.bind(this);
        this.callBackFromAddEdit = this.callBackFromAddEdit.bind(this);
        this.openAddEditForm = this.openAddEditForm.bind(this);
        this.delete = this.delete.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.handelLUTableChange = this.handelLUTableChange.bind(this);
    }

    async componentDidMount() {
        this.props.setPageCaption(8, [Lang.Menu.LookUpList, Lang.Menu.setting], false);
        this.doSearch();
    }
    async doSearch(reLoad, isAdvSearch, GetPagingProperties) {
        let data = await new UtilityService().doSearch(new LookUpService().getList, this.state, reLoad, isAdvSearch, GetPagingProperties);
        this.setState({ ...data });
    }

    async callBackFromAddEdit() {
        //close modal
        window.closeModal('divAddEdit');
        this.doSearch();
    }
     
    async delete(id) {
        let result = await new LookUpService().delete(id);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.doSearch();
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async handelLUTableChange(event) {
        await this.setState(UtilityService.handelChange(event));
        this.doSearch(true, false);
    }

    async openAddEditForm(id) {
        if (this.state.LUTableID == null || this.state.LUTableID == '') {
            alert('Please select LookUp Type.');
            return;
        }
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
                                            {Lang.LookUpList.caption}
                                        </h3>
                                    </div>
                                    <div className="card-toolbar">
                                        <a href="javascript:;" className="btn btn-primary font-weight-bolder" id="btnaddnew" onClick={() => this.openAddEditForm(null)}>
                                            {Lang.LookUpList.new}
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-7 card-search">
                                        <div className="row align-items-center">
                                            <div className="col-lg-9 col-xl-8">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4 my-2 my-md-0">
                                                        <div className="input-group">
                                                            <Select defaultOption="select lookUp type" name="LUTableID" value={this.state.LUTableID || ''} handelChange={(event) => { this.handelLUTableChange(event); }}
                                                                listItem={this.state.GetLUTables} optionKey="ID" optionLabel="NameOf" />
                                                            <div className="input-group-append">
                                                                <a href="javascript:;" className="input-group-text" onClick={() => this.doSearch(true, false)} >
                                                                    <i className="fa fa-search"></i>
                                                                </a>
                                                            </div>
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
                                                            {Lang.LookUpList.tbl_th_Name}
                                                        </th>
                                                        <th>
                                                            {Lang.LookUpList.tbl_th_Code}
                                                        </th>
                                                        <th>
                                                            {Lang.LookUpList.tbl_th_DisplayOrder}
                                                        </th>
                                                        <th>
                                                            {Lang.LookUpList.tbl_th_Systemic}
                                                        </th>
                                                        <th>
                                                            {Lang.LookUpList.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.GetList &&
                                                        this.state.GetList.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td className="text-center">
                                                                    {item.NameOf}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.CodeOf}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.DisplayOrder}
                                                                </td>
                                                                <td className="text-center">
                                                                    {item.IsSystemic ? "Yes" : "No"}
                                                                </td>
                                                                <td className="text-center">
                                                                    {
                                                                        !item.IsSystemic &&
                                                                        <a href="javascript:;" onClick={() => this.openAddEditForm(item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.edit}>
                                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-pencil"></i></span>
                                                                        </a>
                                                                    }
                                                                    {
                                                                        !item.IsSystemic &&
                                                                        <a href="javascript:;" onClick={() => UtilityService.showConfirm(Lang.Shared.makeDelete, this.delete, item.ID)} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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
                    {this.state.OpenAddEdit && <AddEditLookUp callBack={this.callBackFromAddEdit} luTableId={this.state.LUTableID} addEditId={this.state.AddEditId}></AddEditLookUp>}
                </div>
            </div>
        );
    }
}

export default LookUpList;

