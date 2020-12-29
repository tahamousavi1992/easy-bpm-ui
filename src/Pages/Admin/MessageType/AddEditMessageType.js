import React, { useState } from 'react';
import MessageTypeService from '../../../Services/MessageTypeService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class AddEditMessageType extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.addParameter = this.addParameter.bind(this);
        this.removeRow = this.removeRow.bind(this);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new MessageTypeService().get(this.props.addEditId);
        this.setState({ ...data });
        window.setListModelBinding('tblParameters', 'ListParameter');
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new MessageTypeService().update(UtilityService.getFormData('addEditMessageType', { ID: this.state.ID }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    removeRow(event) {
        event.target.closest('tr').remove();
        //if we do not this ,it will send null to server because all items must be in order.
        window.setListModelBinding('tblParameters', 'ListParameter');
    }

    addParameter() {
        let table = document.getElementById('tblParameters');
        let newRow = document.querySelector('.addParameter').cloneNode(true);
        newRow.classList.remove('addParameter');
        newRow.style.removeProperty('display');
        table.appendChild(newRow);
        newRow.querySelector('.delete-row').onclick = this.removeRow;
        window.setListModelBinding('tblParameters', 'ListParameter');
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="addEditMessageType">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditMessageType.caption}</h5>
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
                                    <label>{Lang.AddEditMessageType.name}</label>
                                    <div className="input-group">
                                        <input name='Name' value={this.state.Name || ''} onChange={this.handelChange} className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditMessageType.name)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="Name" className="help-block error"></span>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary font-weight-bolder" onClick={() => { this.addParameter(); }}>
                                {Lang.AddEditMessageType.new}
                            </button>
                            <div className="bpms-table bpms-table-bordered bpms-table-head-custom bpms-table-default   mt-2">
                                <div className="table-information table-responsive">
                                    <table style={{ display: "none" }}>
                                        <tbody>
                                            <tr className="addParameter" key="123">
                                                <td style={{ display: "none" }}></td>
                                                <td>
                                                    <input name="ListParameter.Name" id="ListParameter.Name" onChange={this.handelChange} className="form-control" autoComplete="off" />
                                                </td>
                                                <td class="text-center">
                                                    <input type="checkbox" onChange={this.handelChange} name='ListParameter.IsRequired' id="ListParameter.IsRequired" />
                                                </td>
                                                <td class="text-center">
                                                    <button type="button" onClick={this.removeRow} className="delete-row btn btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                        <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table id="tblParameters" className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    {Lang.AddEditMessageType.tbl_th_Name}
                                                </th>
                                                <th>
                                                    {Lang.AddEditMessageType.tbl_th_IsRequired}
                                                </th>
                                                <th>
                                                    {Lang.AddEditMessageType.tbl_th_Delete}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.ListParameter &&
                                                this.state.ListParameter.map((item, index) => {
                                                    return <tr key={index} className="text-center" >

                                                        <td>
                                                            <input name="ListParameter.Name" value={item.Name} id="ListParameter.Name" onChange={this.handelChange} className="form-control" autoComplete="off" />
                                                        </td>
                                                        <td class="text-center">
                                                            <input type="checkbox" checked={item.IsRequired} onChange={this.handelChange} name='ListParameter.IsRequired' id="ListParameter.IsRequired" />
                                                        </td>
                                                        <td class="text-center">
                                                            <button type="button" onClick={this.removeRow} className="delete-row btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveAccess" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">
                            {Lang.Shared.cancel}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEditMessageType;

