﻿import React, { useState } from 'react';
import ProcessService from '../../../Services/ProcessService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
class AddProcess extends React.Component {
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
        let data = await new ProcessService().getAdd(this.props.processGroupID);
        this.setState({ ...data });

    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new ProcessService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }


    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="addEditMemberModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddProcess.caption}</h5>
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
                                    <label>{Lang.AddProcess.name}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Name || ''} name='Name' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddProcess.name)} data-val="true" data-val-group="saveProcess" />
                                    </div>
                                    <span htmlFor="Name" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddProcess.parallelCountPerUser}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.ParallelCountPerUser || ''} name='ParallelCountPerUser' className="form-control" />
                                    </div>
                                    <span htmlFor="ParallelCountPerUser" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddProcess.type}</label>
                                    <div className="input-group">
                                        <Select name="TypeLU" id="TypeLU" value={this.state.TypeLU || '1'} handelChange={this.handelChange}
                                            listItem={this.state.ListTypes} optionKey="Key" optionLabel="Value" isRequired={true} requiredMsg={Lang.requiredMsg(Lang.AddProcess.type)} validationGroup="saveProcess"  />
                                    </div>
                                    <span htmlFor="TypeLU" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddProcess.description}</label>
                                    <div className="input-group">
                                        <textarea rows="3" onChange={this.handelChange} value={this.state.Description || ''} name='Description' className="form-control" >
                                        </textarea>
                                    </div>
                                    <span htmlFor="Description" className="help-block error"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold" data-val-group="saveProcess">
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

export default AddProcess;

