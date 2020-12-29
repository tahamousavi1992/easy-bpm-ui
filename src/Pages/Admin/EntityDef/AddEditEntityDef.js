import React, { useState } from 'react';
import EntityDefService from '../../../Services/EntityDefService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class AddEditEntityDef extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.initBpmsProperty = this.initBpmsProperty.bind(this);
        this.addEditBpmsProperty = this.addEditBpmsProperty.bind(this);
        this.removeProperty = this.removeProperty.bind(this);

    }

    async componentDidMount() {
        //load data 
        this.fillForm(this.props.addEditId);
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }

    async fillForm(entityId) {
        let data = await new EntityDefService().get(entityId);
        await this.setState({ ...data });
        window.setListModelBinding('tblBpmsProperty', 'listProperties');
        this.initBpmsProperty();
        window.setFormChangeStatus('tblBpmsProperty');
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event, this.state)); }

    name_onChange = (event) => { document.getElementById('EntityDefDTO.FormattedTableName').value = "Bpms_" + event.target.value; }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new EntityDefService().update(UtilityService.getFormData('addEditEntityModal', { "EntityDefDTO.ID": this.state.Model.ID }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack(result.Data);
            } 
        }
    }

    //property section
    async removeProperty(event) {
        event.target.closest('tr').remove();
        //if we do not this ,it will send null to server because all items must be in order.
        window.setListModelBinding('tblBpmsProperty', 'listProperties');
    }

    async addEditBpmsProperty() {
        let table = $('#tblBpmsProperty');
        let newRow = document.querySelector('.addProperty').cloneNode(true);
        newRow.classList.remove('addProperty');
        newRow.style.removeProperty('display');
        table.append(newRow);
        window.setListModelBinding('tblBpmsProperty', 'listProperties');
        newRow.querySelector('.delete-row').onclick = this.removeProperty;
        newRow.querySelector('[id="_PropertyModel.FormatedDbType"]').onchange = this.initBpmsProperty;

    }

    async initBpmsProperty() {
        let proprtyTable = document.getElementById('tblBpmsProperty');
        if (proprtyTable.tBodies[0] != null) {
            for (let i = 0; i < proprtyTable.tBodies[0].rows.length; i++) {
                let row = proprtyTable.tBodies[0].rows[i];
                let selectType = row.querySelector('select');
                let dbType = row.querySelector('[id="_PropertyModel.DbType"]');
                let relationToEntityID = row.querySelector('[id="_PropertyModel.RelationToEntityID"]');
                let varLength = row.querySelector('[id="_PropertyModel.Length"]');
                //set DbType hidden field
                dbType.value = selectType.value.split(':')[0];
                relationToEntityID.value = '';
                if (selectType.value == "0" || selectType.value == "2") {
                    varLength.readOnly = false;
                    if (selectType.value == "2" && varLength.value == '')
                        varLength.value = '18,0'
                }
                else {
                    varLength.readOnly = true;
                    varLength.value = '';
                    //if entity is selected
                    if (dbType.value == "7") {
                        //set RelationToEntityID hidden field.
                        relationToEntityID.value = selectType.value.split(':')[1];
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-xxlg modal-windows" role="document" id="addEditEntityModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditEntityDef.caption}</h5>
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
                        {
                            this.state.Model &&
                            <div className="form">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditEntityDef.displayName}</label>
                                        <div className="input-group">
                                            <input defaultValue={this.state.Model.DisplayName || ''} name='EntityDefDTO.DisplayName' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditEntityDef.displayName)} data-val="true" autoComplete="off" />
                                        </div>
                                        <span htmlFor="EntityDefDTO.DisplayName" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditEntityDef.name}</label>
                                        <div className="input-group">
                                            <input readOnly={this.state.Model.ID != '00000000-0000-0000-0000-000000000000'} onChange={this.name_onChange} defaultValue={this.state.Model.Name || ''} name='EntityDefDTO.Name' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditEntityDef.name)} data-val="true" autoComplete="off" />
                                        </div>
                                        <span htmlFor="EntityDefDTO.Name" className="help-block error"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.AddEditEntityDef.tableName}</label>
                                        <div className="input-group">
                                            <input readOnly={true} value={this.state.Model.FormattedTableName || ''} id="EntityDefDTO.FormattedTableName" name='EntityDefDTO.FormattedTableName' className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="datatable datatable-bordered datatable-head-custom datatable-default  ">
                                    <div className="table-information table-responsive">
                                        <table style={{ display: "none" }}>
                                            <tbody>
                                                <tr className="addProperty">
                                                    <td style={{ display: "none" }}>
                                                        <input type="hidden" defaultValue="" name="_PropertyModel.DbType" id="_PropertyModel.DbType" />
                                                        <input type="hidden" defaultValue="" name="_PropertyModel.RelationToEntityID" id="_PropertyModel.RelationToEntityID" />
                                                    </td>
                                                    <td >
                                                        <input name='_PropertyModel.Name' defaultValue="" id="_PropertyModel.Name" className="form-control required-field" autoComplete='off' />
                                                    </td>
                                                    <td>
                                                        <select onChange={this.initBpmsProperty} name="_PropertyModel.FormatedDbType" defaultValue="" id="_PropertyModel.FormatedDbType" className="form-control">
                                                            <option value="">Select a type</option>
                                                            <optgroup label="Data Types">
                                                                {
                                                                    this.state.DbTypes && this.state.DbTypes.filter(c => c.Key.indexOf(':') == -1).map((item, index) => {
                                                                        return <option key={index} value={item.Key} className="text-center" >{item.Value}</option>
                                                                    })
                                                                }
                                                            </optgroup>
                                                            <optgroup label="Entity">
                                                                {
                                                                    this.state.DbTypes && this.state.DbTypes.filter(c => c.Key.indexOf(':') > -1).map((item, index) => {
                                                                        return <option key={index} value={item.Key} className="text-center" >{item.Value}</option>
                                                                    })
                                                                }
                                                            </optgroup>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input name='_PropertyModel.Length' defaultValue="" id="_PropertyModel.Length" className="form-control" autoComplete='off' />
                                                    </td>
                                                    <td>
                                                        <input type="checkbox" defaultValue="" name='_PropertyModel.Required' id="_PropertyModel.Required" />
                                                    </td>
                                                    <td>
                                                        <input name='_PropertyModel.DefaultValue' defaultValue="" className="form-control" autoComplete='off' />
                                                    </td>
                                                    <td>
                                                        <button type="button" className="delete-row btn btn-sm btn-clean btn-icon btn-icon-md" onClick={this.removeProperty} title={Lang.Shared.delete}>
                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table id="tblBpmsProperty" className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "30%" }}>
                                                        {Lang.AddEditEntityDef.tbl_th_Name}
                                                    </th>
                                                    <th style={{ width: "20%" }}>
                                                        {Lang.AddEditEntityDef.tbl_th_DbType}
                                                    </th>
                                                    <th style={{ width: "10%" }}>
                                                        {Lang.AddEditEntityDef.tbl_th_Length}
                                                    </th>
                                                    <th>
                                                        {Lang.AddEditEntityDef.tbl_th_Required}
                                                    </th>
                                                    <th>
                                                        {Lang.AddEditEntityDef.tbl_th_DefaultValue}
                                                    </th>
                                                    <th>{Lang.AddEditEntityDef.tbl_th_Delete}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.Model.Properties &&
                                                    this.state.Model.Properties.map((item, index) => {
                                                        //EntityPropertyModel.e_dbType.Entity
                                                        if (item.DbType == 7) {
                                                            item.DbType = "7:" + item.RelationToEntityID;
                                                        }
                                                        return <tr key={item.ID} className="text-center" >
                                                            <td style={{ display: "none" }}>
                                                                <input type="hidden" defaultValue={item.ID} name="Properties.ID" />
                                                                <input type="hidden" defaultValue={item.RelationConstaintName} name="Properties.RelationConstaintName" />
                                                                <input type="hidden" defaultValue={item.DbType.toString().split(':')[0]} name="Properties.DbType" id="_PropertyModel.DbType" />
                                                                <input type="hidden" defaultValue={item.RelationToEntityID} name="Properties.RelationToEntityID" id="_PropertyModel.RelationToEntityID" />
                                                            </td>
                                                            <td>
                                                                <input name='Properties.Name' id="_PropertyModel.Name" defaultValue={item.Name} className="form-control required-field" autoComplete='off' />
                                                            </td>
                                                            <td>
                                                                <select onChange={this.initBpmsProperty} name="Properties.FormatedDbType" defaultValue={item.DbType} id="_PropertyModel.FormatedDbType" className="form-control">
                                                                    <option value="">Select a type</option>
                                                                    <optgroup label="Data Types">
                                                                        {
                                                                            this.state.DbTypes && this.state.DbTypes.filter(c => c.Key.indexOf(':') == -1).map((item, index) => {
                                                                                return <option key={index} value={item.Key} className="text-center" >{item.Value}</option>
                                                                            })
                                                                        }
                                                                    </optgroup>
                                                                    <optgroup label="Entity">
                                                                        {
                                                                            this.state.DbTypes && this.state.DbTypes.filter(c => c.Key.indexOf(':') > -1).map((item, index) => {
                                                                                return <option key={index} value={item.Key} className="text-center" >{item.Value}</option>
                                                                            })
                                                                        }
                                                                    </optgroup>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input name='Properties.Length' id="_PropertyModel.Length" defaultValue={item.Length} className="form-control" autoComplete='off' />
                                                            </td>
                                                            <td>
                                                                <input type="checkbox" name='Properties.Required' defaultChecked={item.Required} id="_PropertyModel.Required" />
                                                            </td>
                                                            <td>
                                                                <input defaultValue={item.DefaultValue} name='Properties.DefaultValue' id="_PropertyModel.DefaultValue" className="form-control" autoComplete='off' />
                                                            </td>
                                                            <td>
                                                                <button type="button" className="delete-row btn btn-sm btn-clean btn-icon" onClick={this.removeProperty} title={Lang.Shared.delete}>
                                                                    <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <button type="button" className="btn btn-danger font-weight-bolder" id="btnaddnewProperty" onClick={this.addEditBpmsProperty}>
                                                {Lang.AddEditEntityDef.newProperty}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }

                    </div>
                    <div className="modal-footer">
                        <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">
                            {Lang.Shared.cancel}
                        </button>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddEditEntityDef;

