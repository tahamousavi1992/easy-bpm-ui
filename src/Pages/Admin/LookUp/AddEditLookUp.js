import React, { useState } from 'react';
import LookUpService from '../../../Services/LookUpService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
class AddEditLookUp extends React.Component {
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
        let data = await new LookUpService().get(this.props.addEditId, this.props.luTableId);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new LookUpService().update(this.state);
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
                        <h5 className="modal-title">{Lang.AddEditLookUp.caption}</h5>
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
                                    <label>{Lang.AddEditLookUp.name}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.NameOf || ''} name='NameOf' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditLookUp.name)} data-val="true" />
                                    </div>
                                    <span htmlFor="NameOf" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditLookUp.displayOrder}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.DisplayOrder || ''} name='DisplayOrder' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditLookUp.displayOrder)} data-val="true" />
                                    </div>
                                    <span htmlFor="DisplayOrder" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditLookUp.code}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.CodeOf || ''} name='CodeOf' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditLookUp.code)} data-val="true" />
                                    </div>
                                    <span htmlFor="CodeOf" className="help-block error"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveConnectionSrting" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
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

export default AddEditLookUp;

