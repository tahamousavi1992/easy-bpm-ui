import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
class AddEditJavaScript extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.loadForm = this.loadForm.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        if (this.props.isForControlEvent) {
            let data = await new DesignCodeService().getJavaScriptIndex(this.props.dynamicFormId, this.props.callBack, this.props.code);
            this.setState({ ...data });
            this.loadForm(data.Code);
        }
        else {
            let data = await new DesignCodeService().getDynamicFormJavaScript(this.props.dynamicFormId);
            await this.setState({ ...data });
            this.loadForm(data.Code);
        }

    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async selectItem(event) {
        if (event.target.value != '' && event.target.value != null) {
            window.cEditor.replaceSelection(event.target.value.replace(/;/g, '"'));
        }
    }

    async loadForm(code) {
        window.cEditor = null;
        setTimeout(function () {
            window.cEditor = window.CodeMirror.fromTextArea(document.getElementById("txtCode"), {
                lineNumbers: true,
                matchBrackets: true,
                mode: "javascript"
            });

            let mac = window.CodeMirror.keyMap.default == window.CodeMirror.keyMap.macDefault;
            window.CodeMirror.keyMap.default[(mac ? "Cmd" : "Ctrl") + "-Space"] = "autocomplete";
            if (code == null)
                code = '';
            window.cEditor.setValue(code);
        }, 1000);
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            if (this.props.isForControlEvent)
                window[this.state.CallBack](window.cEditor.getValue());
            else
                this.props.callBack(window.cEditor.getValue());
            document.getElementById('lnkJavaCodeCancel').click();
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="modalJavaScript">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditJavaScript.caption}</h5>
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
                                    <label>{Lang.AddEditJavaScript.operations}</label>
                                    <div className="input-group">
                                        <Select name="ddlCodeOperation" id="ddlCodeOperation" defaultValue="" handelChange={this.selectItem}
                                            listItem={this.state.GetAllJavaMethods} optionKey="Key" optionLabel="Value" />
                                    </div>
                                    <span htmlFor="VarTypeLU" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditJavaScript.formControls}</label>
                                    <div className="input-group">
                                        <Select name="ddlProcessControls" id="ddlProcessControls" defaultValue="" handelChange={this.selectItem}
                                            listItem={this.state.GetControls} optionKey="Key" optionLabel="Value" />
                                    </div>
                                    <span htmlFor="RelationTypeLU" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>{Lang.AddEditJavaScript.script}</label>
                                    <div className="input-group">
                                        <textarea className="form-control" id="txtCode" defaultValue=""></textarea>
                                    </div>
                                    <span htmlFor="txtCode" className="help-block error"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="lnkSaveJavaCode" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button type="button" id="lnkJavaCodeCancel" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEditJavaScript;

