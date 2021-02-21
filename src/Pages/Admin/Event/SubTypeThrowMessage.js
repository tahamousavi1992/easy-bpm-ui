import React, { useState } from 'react';
import EventService from '../../../Services/EventService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl, RadioList } from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class SubTypeThrowMessage extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.changeTypeOfMessage = this.changeTypeOfMessage.bind(this);
        this.validateSaveThrowMessage = this.validateSaveThrowMessage.bind(this);
        this.keyTypeChange = this.keyTypeChange.bind(this);
        this.messageTypeID_onChange = this.messageTypeID_onChange.bind(this);
        this.addMessageParaeters = this.addMessageParaeters.bind(this);
        this.clearMessageParams = this.clearMessageParams.bind(this);
        //email
        this.openVariableContent = this.openVariableContent.bind(this);
        this.callBackVariableContent = this.callBackVariableContent.bind(this);
        this.toTypeChange = this.toTypeChange.bind(this);
        this.insertAtVariableContent = this.insertAtVariableContent.bind(this);
    }

    async componentDidMount() {
        this.props.setSaveMethod(this.submitForm);
        await this.setState({ ...this.props })
        this.changeTypeOfMessage(this.state.Model.SubTypeMessageEventModel.Type);
        window.setListModelBinding('tblMessageParams', 'ListParameter');
        this.keyTypeChange();
        this.toTypeChange();
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    changeTypeOfMessage(event) {
        let type = event.target == null ? event : event.target.value;
        document.getElementById('divDefaultMessage').style.display = 'none';
        if (document.getElementById('divEmailMessage') != null) {
            document.getElementById('divEmailMessage').style.display = 'none';
        }
        //SubTypeMessageEventModel.e_Type.Message
        if (String(type) == '1') {
            document.getElementById('divDefaultMessage').style.display = '';
        }
        //SubTypeMessageEventModel.e_Type.Email
        if (String(type) == '2') {
            document.getElementById('divEmailMessage').style.display = '';
        }
    }

    validateSaveThrowMessage() {
        let result = true;
        document.getElementById('tblMessageParams').tBodies[0].querySelectorAll('tr').forEach(function (item, index) {
            let variableElement = item.querySelector('[id="MessageParams.Variable"]');
            if ((variableElement.value == null || variableElement.value == '') && variableElement.classList.contains('required-field')) {
                UtilityService.showMessage('error', `Selecting the variable in line ${index + 1} is required.`);
                result = false;
            }
        });
        return result;
    }

    keyTypeChange() {
        let target = $('input[name="SubTypeMessageEventModel.KeyType"]:checked')[0];
        document.getElementById('divContainerKeyVariable').style.display = "none";
        document.getElementById('KeyStatic').style.display = "none";
        if (target != null) {
            //SubTypeMessageEventModel.e_KeyType.Variable
            if (target.value == '1') {
                document.getElementById('divContainerKeyVariable').style.display = "";
            }
            //SubTypeMessageEventModel.e_KeyType.Static
            if (target.value == '2') {
                document.getElementById('KeyStatic').style.display = "";
            }
        }
    }

    async messageTypeID_onChange() {
        this.clearMessageParams();
        let target = document.getElementById('MessageTypeID');
        //send to server
        if (target.value != '') {
            let result = await new EventService().getThrowMessageParams(target.value);
            let addMessageParaeters = this.addMessageParaeters;
            result.forEach(function (item) {
                addMessageParaeters({ parameterName: item.Name, isRequired: item.IsRequired });
            });
            window.setListModelBinding('tblMessageParams', 'ListParameter');

        }
    }

    addMessageParaeters({ parameterName = '', isRequired = false }) {
        let _trParameter = document.querySelector('#divDefaultMessage #tblCloneMessageParams').tBodies[0].querySelector('tr').cloneNode(true);
        if (isRequired)
            _trParameter.querySelector('[id="MessageParams.Variable"]').classList.add('required-field');
        //set value of controls.
        _trParameter.querySelector('#txtName').value = parameterName;
        document.querySelector('#divDefaultMessage #tblMessageParams').tBodies[0].appendChild(_trParameter);
    }

    //refresh and clear parameter table
    clearMessageParams() {
        document.querySelector('#divDefaultMessage #tblMessageParams').tBodies[0].innerHTML = '';
    }

    //Email region
    openVariableContent(targetId) {
        window['lastInput'] = targetId; 
        document.getElementById('txtVariableContent').value = document.getElementById(targetId).value;
        window.openModal('divVariableContent', true);
    }

    callBackVariableContent() {
        document.getElementById(window['lastInput']).value = document.getElementById('txtVariableContent').value;
        $('#divVariableContent').modal("toggle");
    }

    toTypeChange() {
        debugger;
        let target = $('input[name="SubTypeMessageEventModel.Email.ToType"]:checked')[0];
        document.getElementById('divContainertoVariable').style.display = "none";
        document.getElementById('ToSystemic').style.display = "none";
        document.getElementById('ToStatic').style.display = "none";
        //SubTypeEmailEventModel.e_ToType.Variable
        if (target.value == '2') {
            document.getElementById('divContainertoVariable').style.display = "";
        }
        //SubTypeEmailEventModel.e_ToType.Static
        if (target.value == '1') {
            document.getElementById('ToStatic').style.display = "";
        }
        //SubTypeEmailEventModel.e_ToType.Systemic
        if (target.value == '3') {
            document.getElementById('ToSystemic').style.display = "";
        }
    }

    insertAtVariableContent(event) {
        window.insertAtCaret(document.getElementById('txtVariableContent'), "[" + event.target.value + "]");
        event.target.value = '';
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            ////SubTypeMessageEventModel.e_Type.Message
            if (document.getElementById('ddlSubTypeMessageEventModelType').value == '1') {
                if (!this.validateSaveThrowMessage()) {
                    return;
                }
                //send to server    
                let result = await new EventService().postSaveSubTypeMessage(UtilityService.getFormData('divDefaultMessage', {
                    ProcessID: this.state.Model.ProcessID,
                    EventId: this.state.Model.ID,
                }));
                UtilityService.showMessage(result.ResultType, result.Message);
                if (result.ResultType == 'success') {
                    window.closeModal('divEvent');
                }
            }
            else {
                //send to server    
                let result = await new EventService().postSubTypeEmail(UtilityService.getFormData('divEmailMessage', {
                    ProcessID: this.state.Model.ProcessID,
                    EventId: this.state.Model.ID,
                }));
                UtilityService.showMessage(result.ResultType, result.Message);
                if (result.ResultType == 'success') {
                    window.closeModal('divEvent');
                }
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.Model &&
                    <React.Fragment>
                        {
                            //sysEvent.e_TypeLU.IntermediateThrow
                            this.state.Model.TypeLU == 3 &&
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.SubTypeThrowMessage.type }</label>
                                    <div className="input-group">
                                        <Select name="ddlSubTypeMessageEventModelType" id="ddlSubTypeMessageEventModelType" defaultValue={this.state.Model.SubTypeMessageEventModel.Type || ''} handelChange={this.changeTypeOfMessage}
                                            listItem={this.state.SubTypeMessageEventModelTypes} optionKey="Key" optionLabel="Value" />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="form" id="divDefaultMessage" style={{ display: "none" }}>
                            <input defaultValue={this.state.Model.ID} type="hidden" id="ID" name="ID" />
                            <input defaultValue={this.state.Model.TypeLU} type="hidden" id="TypeLU" name="TypeLU" />
                            <input defaultValue={this.state.Model.SubType} type="hidden" id="SubType" name="SubType" />

                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.SubTypeThrowMessage.keyType}</label>
                                    <div className="input-group">
                                        <RadioList id="SubTypeMessageEventModel.KeyType" name="SubTypeMessageEventModel.KeyType" defaultValue={this.state.Model.SubTypeMessageEventModel.KeyType}
                                            listItem={this.state.SubTypeMessageEventModelKeyTypes} optionKey="Key" optionLabel="Value" handelChange={this.keyTypeChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.SubTypeThrowMessage.key}</label>
                                    <div className="input-group">
                                        <div id="divContainerKeyVariable" style={{ width: "100%" }}>
                                            <VariableControl name="KeyVariable" isRequired={false} value={
                                                //if is SubTypeMessageEventModel.e_KeyType.Variable 
                                                (this.state.Model.SubTypeMessageEventModel.KeyType == 1 ? this.state.Model.SubTypeMessageEventModel.Key : "")} />
                                        </div>
                                        <input type="text" id="KeyStatic" autoComplete="off" name="KeyStatic" className="form-control required-field" defaultValue={
                                            //if is SubTypeMessageEventModel.e_KeyType.Static
                                            (this.state.Model.SubTypeMessageEventModel.KeyType == 2 ? this.state.Model.SubTypeMessageEventModel.Key : "")} style={{ display: "none" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.SubTypeThrowMessage.messageType}</label>
                                    <div className="input-group">
                                        <Select name="MessageTypeID" id="MessageTypeID" defaultValue={this.state.Model.MessageTypeID || ''}
                                            handelChange={this.messageTypeID_onChange} listItem={this.state.MessageTypes} optionKey="Key" optionLabel="Value" />
                                    </div>
                                </div>
                            </div>
                            <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                <div className="table-information table-responsive">
                                    <table id="tblCloneMessageParams" style={{ display: "none" }}>
                                        <tbody>
                                            <tr> 
                                                <td>
                                                    <input id="txtName" name="MessageParams.Name" readOnly={true} type="text" className="form-control text-left" />
                                                </td>
                                                <td>
                                                    <VariableControl name="MessageParams.Variable" isRequired={false} value="" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table id="tblMessageParams" className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>{Lang.SubTypeThrowMessage.tbl_th_Paramtere}</th>
                                                <th>{Lang.SubTypeThrowMessage.tbl_th_Variable}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Model.SubTypeMessageEventModel.MessageParams &&
                                                this.state.Model.SubTypeMessageEventModel.MessageParams.map((item, index) => {
                                                    return <tr key={index} >
                                                        <td>
                                                            <input id="txtName" name="MessageParams.Name" readOnly={true} type="text" defaultValue={item.Name} className="form-control text-left" />
                                                        </td>
                                                        <td>
                                                            <VariableControl name="MessageParams.Variable" isRequired={item.IsRequired} value={item.Variable} />
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {
                            //sysEvent.e_TypeLU.IntermediateThrow
                            this.state.Model.TypeLU == 3 &&
                            <React.Fragment>
                                <div className="form" id="divEmailMessage" style={{ display: "none" }}>
                                    <input defaultValue={this.state.Model.ID} type="hidden" id="ID" name="ID" />
                                    <input defaultValue={this.state.Model.TypeLU} type="hidden" id="TypeLU" name="TypeLU" />
                                    <input defaultValue={this.state.Model.SubType} type="hidden" id="SubType" name="SubType" />
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.SubTypeThrowMessage.from}</label>
                                            <div className="input-group">
                                                <Select name="SubTypeMessageEventModel.Email.From" id="SubTypeMessageEventModel.Email.From" defaultValue={this.state.Model.SubTypeMessageEventModel.Email.From || ''}
                                                    listItem={this.state.EmailAccounts} optionKey="Key" optionLabel="Value" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.SubTypeThrowMessage.toType}</label>
                                            <div className="input-group">
                                                <RadioList id="SubTypeMessageEventModel.Email.ToType" name="SubTypeMessageEventModel.Email.ToType" defaultValue={this.state.Model.SubTypeMessageEventModel.Email.ToType}
                                                    listItem={this.state.SubTypeEmailEventModelToTypes} optionKey="Key" optionLabel="Value" handelChange={this.toTypeChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.SubTypeThrowMessage.to}</label>
                                            <div id="divContainertoVariable" style={{ width: "100%" }}>
                                                <VariableControl name="ToVariable" isRequired={false} value={
                                                    //if is SubTypeEmailEventModel.e_ToType.Variable
                                                    (this.state.Model.SubTypeMessageEventModel.Email.ToType == 2 ? this.state.Model.SubTypeMessageEventModel.Email.To : "")} />
                                            </div>
                                            <div className="input-group">
                                                <Select name="ToSystemic" id="ToSystemic" defaultValue={(this.state.Model.SubTypeMessageEventModel.Email.ToType == 3 ? this.state.Model.SubTypeMessageEventModel.Email.To : '') || ''}
                                                    listItem={this.state.SubTypeEmailEventModelToSystemicTypes} optionKey="Key" optionLabel="Value" style={{ display: "none" }} />

                                                <input type="text" id="ToStatic" name="ToStatic" className="form-control" defaultValue={(this.state.Model.SubTypeMessageEventModel.Email.ToType == 1 ? this.state.Model.SubTypeMessageEventModel.Email.To : "")} style={{ display: "none" }} autoComplete="off" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.SubTypeThrowMessage.subject}</label>
                                            <div className="input-group">
                                                <input type="text" id="SubTypeMessageEventModel.Email.Subject" name="SubTypeMessageEventModel.Email.Subject" className="form-control" defaultValue={this.state.Model.SubTypeMessageEventModel.Email.Subject || ''} autoComplete="off" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <a onClick={(e) => { this.openVariableContent('SubTypeMessageEventModel.Email.Subject'); }} href="javascript:;" style={{ textDecoration: 'none' }}>
                                                            <i className="fa fa-plus"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.SubTypeThrowMessage.content}</label>
                                            <div className="input-group">
                                                <textarea rows="3" type="text" id="SubTypeMessageEventModel.Email.Content" name="SubTypeMessageEventModel.Email.Content" className="form-control" defaultValue={this.state.Model.SubTypeMessageEventModel.Email.Content || ''}>
                                                </textarea>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <a onClick={(e) => { this.openVariableContent('SubTypeMessageEventModel.Email.Content'); }} href="javascript:;" style={{ textDecoration: 'none' }}>
                                                            <i className="fa fa-plus"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="divVariableContent" className="modal fade" role="dialog">
                                    <div className="modal-dialog modal-dialog-centered modal-lg modal-windows">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">{Lang.SubTypeThrowMessage.content}</h5>
                                                <div className="modal-button">
                                                    <button type="button" className="btn close window-maximize" data-dismiss="modal" aria-label="Close">
                                                        <i className="fad fa-expand-alt modal-square"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-scroll">
                                                <div className="form">
                                                    <div className="form-group row">
                                                        <div className="col-lg-6">
                                                            <label>{Lang.SubTypeThrowMessage.variable}</label>
                                                            <VariableControl name="ddlCodeProcessVariable" isRequired={false} value="" onChange={this.insertAtVariableContent} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-lg-6">
                                                            <label>{Lang.SubTypeThrowMessage.content}</label>
                                                            <div className="input-group">
                                                                <textarea rows="3" className="form-control" id="txtVariableContent"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button id="btnSaveMessage" onClick={this.callBackVariableContent} type="submit" className="btn btn-primary font-weight-bold">
                                                    {Lang.Shared.apply }
                                                </button>
                                                <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal" >
                                                    {Lang.Shared.cancel}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        }

                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default SubTypeThrowMessage;

