import React, { useState } from 'react';
import DynamicFormService from '../../../Services/DynamicFormService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
import Select, { CheckBox } from '../../../Components/Select';
class AddDynamicForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new DynamicFormService().get(this.props.addEditId, this.props.processId);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event, this.state)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new DynamicFormService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack(result.Data, this.state.ID == null);
            }
        }
    } 
    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="mymodal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddDynamicForm.caption}</h5>
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
                                    <label>{Lang.AddDynamicForm.name}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Name || ''} name='Name' className="form-control required-field"
                                            data-val-required={Lang.requiredMsg(Lang.AddDynamicForm.name)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="Name" className="help-block error"></span>
                                </div>
                                {
                                    this.state.ApplicationPageDTO != null &&
                                    <div className="col-lg-6">
                                        <label>{Lang.EditApplicationPage.group}</label>
                                        <div className="input-group">
                                            <Select name="ApplicationPageDTO.GroupLU" value={this.state.ApplicationPageDTO.GroupLU || ''} handelChange={this.handelChange}
                                                listItem={this.state.ApplicationPageDTO.ListGroupLU} optionKey="CodeOf" optionLabel="NameOf" isRequired={true}
                                                requiredMsg={Lang.requiredMsg(Lang.EditApplicationPage.group)} />
                                        </div>
                                        <span htmlFor="ApplicationPageDTO.GroupLU" className="help-block error"></span>
                                    </div>
                                }
                            </div>
                            <div className="form-group row">
                                {
                                    this.state.ProcessId &&
                                    <div className="col-lg-6">
                                        <label>{Lang.AddDynamicForm.showInOverview}</label>
                                        <CheckBox id="ShowInOverview" name="ShowInOverview" checked={this.state.ShowInOverview} handelChange={this.handelChange} />
                                    </div>
                                }
                                {
                                    this.state.ApplicationPageDTO != null &&
                                    <div className="col-lg-6">
                                        <label>{Lang.EditApplicationPage.showInMenu}</label>
                                        <CheckBox id="ApplicationPageDTO.ShowInMenu" name="ApplicationPageDTO.ShowInMenu" checked={this.state.ApplicationPageDTO.ShowInMenu} handelChange={this.handelChange} />
                                    </div>
                                }
                                <div className="col-lg-6">
                                    <label>{Lang.AddDynamicForm.isEncrypted}</label>
                                    <CheckBox id="IsEncrypted" name="IsEncrypted" checked={this.state.IsEncrypted} handelChange={this.handelChange} />
                                </div>
                            </div>
                        </div>
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

export default AddDynamicForm;

