import React, { useState } from 'react';
import DocumentDefService from '../../../Services/DocumentDefService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
import Select, { CheckBox } from '../../../Components/Select';
class AddEditDef extends React.Component {
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
        let data = await new DocumentDefService().get(this.props.addEditId, this.props.documentFolderID);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new DocumentDefService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="mymodal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditDef.caption}</h5>
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
                                    <label>{Lang.AddEditDef.displayName}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.DisplayName || ''} name='DisplayName' className="form-control required-field" 
                                        data-val-required={Lang.requiredMsg(Lang.AddEditDef.displayName)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="DisplayName" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDef.name}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.NameOf || ''} name='NameOf' className="form-control" autoComplete="off" />
                                    </div>
                                    <span htmlFor="NameOf" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDef.maxSize}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.MaxSize || ''} name='MaxSize' className="form-control" />
                                    </div>
                                    <span htmlFor="MaxSize" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDef.validExtentions}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.ValidExtentions || ''} name='ValidExtentions' className="form-control" autoComplete="off" />
                                    </div>
                                    <span htmlFor="ValidExtentions" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDef.isMandatory}</label>
                                    <CheckBox id="IsMandatory" name="IsMandatory" checked={this.state.IsMandatory} handelChange={this.handelChange}/>
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

export default AddEditDef;

