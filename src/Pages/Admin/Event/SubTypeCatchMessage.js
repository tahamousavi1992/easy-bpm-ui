import React, { useState } from 'react';
import EventService from '../../../Services/EventService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl, RadioList } from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class SubTypeCatchMessage extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSaveThrowMessage = this.validateSaveThrowMessage.bind(this);
        this.keyTypeChange = this.keyTypeChange.bind(this);
        this.messageTypeID_onChange = this.messageTypeID_onChange.bind(this);
        this.addMessageParaeters = this.addMessageParaeters.bind(this);
        this.clearMessageParams = this.clearMessageParams.bind(this);
    }
    async componentDidMount() {
        this.props.setSaveMethod(this.submitForm);
        let data = this.props;
        if (this.props.hideVariable) {
            //SubTypeMessageEventModel.e_KeyType.Static
            data.Model.SubTypeMessageEventModel.KeyType = 2;
        }
        await this.setState({ ...data })
        window.setListModelBinding('tblMessageParams', 'ListParameter');
        this.keyTypeChange();
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

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
        let _trParameter = document.querySelector('#divAddEditEvent #tblCloneMessageParams').tBodies[0].querySelector('tr').cloneNode(true);
        if (isRequired)
            _trParameter.querySelector('[id="MessageParams.Variable"]').classList.add('required-field');
        //set value of controls.
        _trParameter.querySelector('#txtName').value = parameterName;
        document.querySelector('#divAddEditEvent #tblMessageParams').tBodies[0].appendChild(_trParameter);
    }

    //refresh and clear parameter table
    clearMessageParams() {
        document.querySelector('#divAddEditEvent #tblMessageParams').tBodies[0].innerHTML = '';
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            ////SubTypeMessageEventModel.e_Type.Message 
            if (!this.validateSaveThrowMessage()) {
                return;
            }
            //send to server    
            let result = await new EventService().postSaveSubTypeMessage(UtilityService.getFormData('divAddEditEvent', {
                ProcessID: this.state.Model.ProcessID,
                EventId: this.state.Model.ID,
            }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                window.closeModal('divEvent');
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.Model &&
                    <React.Fragment>
                        <input defaultValue={this.state.Model.ID} type="hidden" id="ID" name="ID" />
                        <input defaultValue={this.state.Model.TypeLU} type="hidden" id="TypeLU" name="TypeLU" />
                        <input defaultValue={this.state.Model.SubType} type="hidden" id="SubType" name="SubType" />
                        {
                            this.props.hideVariable &&
                            <input defaultValue={this.state.Model.SubType} type="hidden" id="SubTypeMessageEventModel.KeyType" name="SubTypeMessageEventModel.KeyType" />
                        }
                        {
                            !this.props.hideVariable &&
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.SubTypeCatchMessage.keyType }</label>
                                    <div className="input-group">
                                        <RadioList id="SubTypeMessageEventModel.KeyType" name="SubTypeMessageEventModel.KeyType" defaultValue={this.state.Model.SubTypeMessageEventModel.KeyType}
                                            listItem={this.state.SubTypeMessageEventModelKeyTypes} optionKey="Key" optionLabel="Value" handelChange={this.keyTypeChange} />
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.SubTypeCatchMessage.key}</label>
                                <div className="input-group">
                                    <div id="divContainerKeyVariable" style={{ width: "100%" }}>
                                        <VariableControl name="KeyVariable" isRequired={false} value={
                                            //if is SubTypeMessageEventModel.e_KeyType.Variable 
                                            (this.state.Model.SubTypeMessageEventModel.KeyType == 1 ? this.state.Model.SubTypeMessageEventModel.Key : "")} />
                                    </div>
                                    <input type="text" id="KeyStatic" name="KeyStatic" className="form-control required-field" defaultValue={
                                        //if is SubTypeMessageEventModel.e_KeyType.Static
                                        (this.state.Model.SubTypeMessageEventModel.KeyType == 2 ? this.state.Model.SubTypeMessageEventModel.Key : "")} style={{ display: "none" }} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.SubTypeCatchMessage.messageType}</label>
                                <div className="input-group">
                                    <Select name="MessageTypeID" id="MessageTypeID" defaultValue={this.state.Model.MessageTypeID || ''} className="required-field"
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
                                                <VariableControl name="MessageParams.Variable" isRequired={false} value="" />
                                            </td>
                                            <td>
                                                <input id="txtName" name="MessageParams.Name" readOnly={true} type="text" className="form-control text-left" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id="tblMessageParams" className="table table-bordered">
                                    <thead>
                                        <tr>

                                            <th>{Lang.SubTypeCatchMessage.tbl_th_Variable}</th>
                                            <th>{Lang.SubTypeCatchMessage.tbl_th_Paramtere}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.SubTypeMessageEventModel.MessageParams &&
                                            this.state.Model.SubTypeMessageEventModel.MessageParams.map((item, index) => {
                                                return <tr key={index} >
                                                    <td>
                                                        <VariableControl name="MessageParams.Variable" isRequired={item.IsRequired} value={item.Variable} />
                                                    </td>
                                                    <td>
                                                        <input id="txtName" name="MessageParams.Name" readOnly={true} type="text" defaultValue={item.Name} className="form-control text-left" />
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default SubTypeCatchMessage;

