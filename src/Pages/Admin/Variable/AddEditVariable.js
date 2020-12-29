import React, { useState } from 'react';
import VariableService from '../../../Services/VariableService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
import AddEditEntityDef from '../EntityDef/AddEditEntityDef';
const $ = window.$;
class AddEditVariable extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.changeVariableType = this.changeVariableType.bind(this);
        this.getEntityProperty = this.getEntityProperty.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addEditBpmsDependency = this.addEditBpmsDependency.bind(this);
        this.addEditBpmsItem = this.addEditBpmsItem.bind(this);
        this.openAddEditEntityDef = this.openAddEditEntityDef.bind(this);
        this.callBackFromAddEditEntity = this.callBackFromAddEditEntity.bind(this);
    }

    async componentDidMount() {
        //load data 
        let data = await new VariableService().get(this.props.addEditId, '', this.props.processId, this.props.applicationPageId);
        await this.setState({ ...data });
        this.changeVariableType();
        window.setListModelBinding('tblBpmsDependency', 'ListDependencies');
        window.setListModelBinding('tblBpmsItem', 'ListItems');
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async openAddEditEntityDef() {
        let entityId = document.getElementById('EntityDefID').value;
        await this.setState({ AddEditEntityId: ((entityId != '' && entityId != null) ? entityId : null) });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEditEntityDef: false });
        await this.setState({ OpenAddEditEntityDef: true });
        window.openModal('divAddEditEntityDef', true);
    }

    callBackFromAddEditEntity(entityObj) {
        if (entityObj != null) {
            let list = this.state.ListEntities;
            let currentIndex = list.findIndex((item) => { return item.ID == entityObj.ID });
            if (currentIndex > -1) {
                list[currentIndex].Name = entityObj.Name;
            }
            else {
                list.push(entityObj);
            }
            this.setState({ ListEntities: list });
        }
        window.closeModal('divAddEditEntityDef');
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new VariableService().update(UtilityService.getFormData('divModalVariableForm', {
                ID: this.state.Model.ID,
                ProcessID: this.state.Model.ProcessID,
                ApplicationPageID: this.state.Model.ApplicationPageID,
            }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    async changeVariableType() {
        var selectVarTypeLU = document.getElementById('VarTypeLU');
        var selectRelationTypeLU = document.getElementById('RelationTypeLU');

        document.getElementById('divEntityProperty').style.display = '';
        selectRelationTypeLU.disabled = false;

        //is list=4 and  RelationType is systemic=1
        if (selectVarTypeLU.value == "4" && selectRelationTypeLU.value == "1") {
            document.getElementById('divItemDetail').style.display = '';
        }
        else {
            document.getElementById('divItemDetail').style.display = 'none';
            document.querySelectorAll('#tblBpmsItem .delete-row').forEach(function (item) {
                item.click();
            });
        }
        //var type is Object=
        if (selectVarTypeLU.value == "5") {
            selectRelationTypeLU.value = "2";//Entity
            document.getElementById('divEntityProperty').style.display = 'none';
            selectRelationTypeLU.disabled = true;
        }
        //is SqlQuery
        if (selectRelationTypeLU.value == "3") {
            document.getElementById('divSqlQueryDetail').style.display = '';
            document.getElementById('EntityDefID').value = '';
        }
        else {
            document.getElementById('divSqlQueryDetail').style.display = 'none';
        }
        //is Entity
        if (selectRelationTypeLU.value == "2") {
            document.getElementById('divEntityDetail').style.display = '';
            //is List
            if (selectVarTypeLU.value == "4") {
                document.getElementById('divEntityProperty').style.display = 'none';
            }
        }
        else {
            document.getElementById('divEntityDetail').style.display = 'none';
        }
    }

    async getEntityProperty(event) {
        let target = event.target;
        let properties = target.id == '_DependencyModel.ToVariableID' ?
            await new VariableService().getEntityPropertyByVariableId(target.value) :
            await new VariableService().getEntityProperty(target.value);

        if (target.id == '_DependencyModel.ToVariableID') {
            document.querySelectorAll('select[id="_DependencyModel.ToPropertyName"]').forEach(function (selectProperty) {
                //delete all options
                var length = selectProperty.options.length;
                for (let i = length - 1; i >= 0; i--) {
                    selectProperty.options[i] = null;
                } 
                //add new options 
                if (Array.isArray(properties)) {
                    properties.forEach(function (item) {
                        var option = document.createElement("option");
                        option.text = item.Name;
                        option.value = item.Name;
                        selectProperty.add(option);
                    });
                }
            });
        }
        else {
            document.querySelectorAll('#FieldName,select[id="_DependencyModel.DependentPropertyName"]').forEach(function (selectProperty) {
                //delete all options
                var length = selectProperty.options.length;
                for (let i = length - 1; i >= 0; i--) {
                    selectProperty.options[i] = null;
                }

                if (Array.isArray(properties)) {
                    //add new options
                    properties.forEach(function (item) {
                        var option = document.createElement("option");
                        option.text = item.Name;
                        option.value = item.ID;
                        selectProperty.add(option);
                    });
                }
            });
        }
    }

    async removeRow(event) {
        event.target.closest('tr').remove();
        window.setListModelBinding('tblBpmsDependency', 'ListDependencies');
        window.setListModelBinding('tblBpmsItem', 'ListItems');
    }

    async addEditBpmsDependency() {
        let table = $('#tblBpmsDependency');
        let newRow = document.querySelector('.addDependency').cloneNode(true);
        newRow.classList.remove('addDependency');
        newRow.style.removeProperty('display');
        table.append(newRow);
        newRow.querySelector('a.delete-row').onclick = this.removeRow;
        newRow.querySelector('[id="_DependencyModel.ToVariableID"]').onchange = this.getEntityProperty;
        window.setListModelBinding('tblBpmsDependency', 'ListDependencies');
    }

    async addEditBpmsItem() {
        let table = $('#tblBpmsItem');
        let newRow = document.querySelector('.addItem').cloneNode(true);
        newRow.classList.remove('addItem');
        newRow.style.removeProperty('display');
        table.append(newRow);
        newRow.querySelector('a.delete-row').onclick = this.removeRow;
        window.setListModelBinding('tblBpmsItem', 'ListItems');
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divModalVariableForm">
                {
                    this.state.Model &&
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{Lang.AddEditVariable.caption}</h5>
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
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditVariable.name}</label>
                                        <div className="input-group">
                                            <input defaultValue={this.state.Model.Name || ''} name='Name' id="Name" className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditVariable.name)} data-val="true" data-val-group="saveVariableForm" />
                                        </div>
                                        <span htmlFor="Name" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditVariable.defaultValue}</label>
                                        <div className="input-group">
                                            <input defaultValue={this.state.Model.DefaultValue || ''} name='DefaultValue' id="DefaultValue" className="form-control" />
                                        </div>
                                        <span htmlFor="DefaultValue" className="help-block error"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditVariable.varTypeLU}</label>
                                        <div className="input-group">
                                            <Select name="VarTypeLU" id="VarTypeLU" defaultValue={this.state.Model.VarTypeLU || ''} requiredMsg={Lang.requiredMsg(Lang.AddEditVariable.varTypeLU)} handelChange={this.changeVariableType}
                                                listItem={this.state.ListTypes} optionKey="Key" optionLabel="Value" isRequired={true} validationGroup="saveVariableForm" />
                                        </div>
                                        <span htmlFor="VarTypeLU" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditVariable.relation}</label>
                                        <div className="input-group">
                                            <Select name="RelationTypeLU" id="RelationTypeLU" defaultValue={this.state.Model.RelationTypeLU || ''} handelChange={this.changeVariableType}
                                                listItem={this.state.ListRelations} optionKey="Key" optionLabel="Value" isRequired={true} requiredMsg={Lang.requiredMsg(Lang.AddEditVariable.relation)} validationGroup="saveVariableForm" />
                                        </div>
                                        <span htmlFor="RelationTypeLU" className="help-block error"></span>
                                    </div>
                                </div>
                                <div id="divEntityDetail">
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditVariable.entity}</label>
                                            <div className="input-group">
                                                <Select name="EntityDefID" id="EntityDefID" defaultValue={this.state.Model.EntityDefID || ''} handelChange={this.getEntityProperty}
                                                    listItem={this.state.ListEntities} optionKey="ID" optionLabel="Name" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <a onClick={this.openAddEditEntityDef} id="lnkAddEntity" style={{ textDecoration: 'none' }}>
                                                            <i className="fa fa-plus"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                            <span htmlFor="EntityDefID" className="help-block error"></span>
                                        </div>
                                        {
                                            this.state.Model.ProcessID &&
                                            <div className="col-lg-6">
                                                <label>{Lang.AddEditVariable.filterTypeLU}</label>
                                                <div className="input-group">
                                                    <Select name="FilterTypeLU" id="FilterTypeLU" defaultValue={this.state.Model.FilterTypeLU || ''} handelChange={this.changeVariableType}
                                                        listItem={this.state.ListFilters} optionKey="Key" optionLabel="Value" />
                                                </div>
                                                <span htmlFor="FilterTypeLU" className="help-block error"></span>
                                            </div>
                                        }
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditVariable.whereClause}</label>
                                            <div className="input-group">
                                                <input defaultValue={this.state.Model.WhereClause || ''} name='WhereClause' id="WhereClause" className="form-control" />
                                            </div>
                                            <span htmlFor="WhereClause" className="help-block error"></span>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditVariable.orderBy}</label>
                                            <div className="input-group">
                                                <input defaultValue={this.state.Model.OrderByClause || ''} name='OrderByClause' id="OrderByClause" className="form-control" />
                                            </div>
                                            <span htmlFor="OrderByClause" className="help-block error"></span>
                                        </div>
                                    </div>
                                    <div className="form-group row" id="divEntityProperty">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditVariable.fieldName}</label>
                                            <div className="input-group">
                                                <Select name="FieldName" id="FieldName" defaultValue={this.state.Model.FieldName || ''}
                                                    listItem={this.state.ListProperties} optionKey="Name" optionLabel="Name" />
                                            </div>
                                            <span htmlFor="FieldName" className="help-block error"></span>
                                        </div>
                                    </div>
                                    <div className="bpms-table bpms-table-bordered bpms-table-head-custom bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table style={{ display: "none" }}>
                                                <tbody>
                                                    <tr className="addDependency">
                                                        <td style={{ display: "none" }}></td>
                                                        <td id="divDependentPropertyName">
                                                            <Select name="_DependencyModel.DependentPropertyName" id="_DependencyModel.DependentPropertyName" defaultValue=""
                                                                listItem={this.state.ListProperties} optionKey="Name" optionLabel="Name" />
                                                        </td>
                                                        <td>
                                                            <Select name="_DependencyModel.ToVariableID" id="_DependencyModel.ToVariableID" defaultValue="" handelChange={this.getEntityProperty}
                                                                listItem={this.state.DependencyToVariables} optionKey="ID" optionLabel="Name" />
                                                        </td>
                                                        <td name="tdToPropertyName">
                                                            <Select name="_DependencyModel.ToPropertyName" id="_DependencyModel.ToPropertyName" defaultValue=""
                                                                listItem={[]} optionKey="Name" optionLabel="Name" />
                                                        </td>
                                                        <td>
                                                            <input name='_DependencyModel.Description' defaultValue="" className="form-control" />
                                                        </td>
                                                        <td >
                                                            <a href='javascript:;' className="delete-row btn btn-sm btn-clean btn-icon btn-icon-md" title={Lang.Shared.delete} onClick={this.removeRow}>
                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="tblBpmsDependency" className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.AddEditVariable.tbl_th_DependentPropertyName}
                                                        </th>
                                                        <th>
                                                            {Lang.AddEditVariable.tbl_th_Variable}
                                                        </th>
                                                        <th>
                                                            {Lang.AddEditVariable.tbl_th_ToPropertyName}
                                                        </th>
                                                        <th>
                                                            {Lang.AddEditVariable.tbl_th_Description}
                                                        </th>
                                                        <th>{Lang.AddEditVariable.tbl_th_Delete}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.Model.ListVariableDependencyDTO &&
                                                        this.state.Model.ListVariableDependencyDTO.map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >
                                                                <td style={{ display: 'none' }}>
                                                                    <input type="hidden" value={item.ID} name="item.ID" />
                                                                </td>
                                                                <td >
                                                                    <Select name="item.DependentPropertyName" id="_DependencyModel.DependentPropertyName" defaultValue={item.DependentPropertyName}
                                                                        listItem={this.state.ListProperties} optionKey="Name" optionLabel="Name" />
                                                                </td>
                                                                <td >
                                                                    <Select name="item.ToVariableID" id="_DependencyModel.ToVariableID" defaultValue={item.ToVariableID} handelChange={this.getEntityProperty}
                                                                        listItem={this.state.DependencyToVariables} optionKey="ID" optionLabel="Name" />
                                                                </td>
                                                                <td name="tdToPropertyName">
                                                                    <Select name="item.ToPropertyName" id="_DependencyModel.ToPropertyName" defaultValue={item.ToPropertyName}
                                                                        listItem={item.GetToVariableProperties} optionKey="Name" optionLabel="Name" />
                                                                </td>
                                                                <td >
                                                                    <input name='item.Description' id="_DependencyModel.Description" defaultValue={item.Description} className="form-control" />
                                                                </td>
                                                                <td >
                                                                    <a href="javascript:;" className="delete-row btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete} onClick={this.removeRow}>
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
                                    <a href="javascript:;" className="btn btn-primary font-weight-bolder" id="btnaddnewDependent" onClick={this.addEditBpmsDependency}>
                                        {Lang.AddEditVariable.addDependnet}
                                    </a>
                                </div>
                                <div id="divSqlQueryDetail">
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditVariable.connection}</label>
                                            <div className="input-group">
                                                <Select name="DBConnectionID" id="DBConnectionID" defaultValue={this.state.Model.DBConnectionID || ''}
                                                    listItem={this.state.ListConnection} optionKey="ID" optionLabel="Name" />
                                            </div>
                                            <span htmlFor="DBConnectionID" className="help-block error"></span>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{Lang.AddEditVariable.query}</label>
                                            <div className="input-group">
                                                <textarea row="4" defaultValue={this.state.Model.Query || ''} name='Query' id="Query" className="form-control" />
                                            </div>
                                            <span htmlFor="Query" className="help-block error"></span>
                                        </div>
                                    </div>
                                </div>
                                <div id="divItemDetail">
                                    <div className="bpms-table bpms-table-bordered bpms-table-head-custom bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table style={{ display: "none" }}>
                                                <tbody>
                                                    <tr className="addItem">
                                                        <td style={{ display: "none" }}></td>
                                                        <td>
                                                            <input name='_VariableItemModel.Key' defaultValue="" className="form-control" />
                                                        </td>
                                                        <td>
                                                            <input name='_VariableItemModel.Text' defaultValue="" className="form-control" />
                                                        </td>
                                                        <td>
                                                            <a href='javascript:;' className="delete-row btn btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete} onClick={this.removeRow}>
                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="tblBpmsItem" className="table">
                                                <thead>
                                                    <tr>

                                                        <th>
                                                            {Lang.AddEditVariable.tbl_th_Key}
                                                        </th>
                                                        <th>
                                                            {Lang.AddEditVariable.tbl_th_Text}
                                                        </th>
                                                        <th>{Lang.AddEditVariable.tbl_th_Delete}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.Model.Items &&
                                                        this.state.Model.Items.map((item, index) => {
                                                            return <tr key={index} className="text-center" >
                                                                <td>
                                                                    <input name='item.Key' defaultValue={item.Key} className="form-control" />
                                                                </td>
                                                                <td>
                                                                    <input name='item.Text' defaultValue={item.Text} className="form-control" />
                                                                </td>
                                                                <td>
                                                                    <a href="javascript:;" className="btn btn-sm btn-clean btn-icon delete-row" title={Lang.Shared.delete} onClick={this.removeRow}>
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
                                    <a href="#" className="btn btn-primary font-weight-bolder" id="btnaddnewItem" onClick={this.addEditBpmsItem}>
                                        {Lang.AddEditVariable.addItem}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold" data-val-group="saveVariableForm">
                                {Lang.Shared.save}
                            </button>
                            <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                        </div>
                    </div>
                }
                <div id="divAddEditEntityDef" className="modal fade" role="dialog">
                    {this.state.OpenAddEditEntityDef && <AddEditEntityDef callBack={this.callBackFromAddEditEntity} addEditId={this.state.AddEditEntityId}></AddEditEntityDef>}
                </div>
            </div>
        );
    }
}

export default AddEditVariable;

