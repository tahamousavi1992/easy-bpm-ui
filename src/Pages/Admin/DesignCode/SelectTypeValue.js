import React, { useState } from 'react';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import InnerFormSelectVariable from '../Variable/InnerFormSelectVariable'
import Lang from '../../../Shared/AdminLang/Lang';
class SelectTypeValue extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.openSelectTypeValue = this.openSelectTypeValue.bind(this);
        this.ddlValueType_onChange = this.ddlValueType_onChange.bind(this);
        this.reLoadAllSelectedTypeValues = this.reLoadAllSelectedTypeValues.bind(this);
        this.selectVariable = this.selectVariable.bind(this);
    }
    async componentDidMount() {
        await this.setState({ ContainerId: this.props.containerId });
        window.openSelectTypeValue = this.openSelectTypeValue;
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        this.reLoadAllSelectedTypeValues();
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async openSelectTypeValue(target, containerId) {
        await this.setState({ ContainerId: containerId });
        window.ddlValueType_onChange = this.ddlValueType_onChange;
        document.querySelectorAll(`#${containerId} #divSelectTypeValueModal`).forEach(function (divModal) {
            window[containerId + '-target'] = target;
            divModal.querySelectorAll('input').forEach((item) => {
                item.value = '';
            });

            let type = target.getAttribute('data-type');
            let value = target.getAttribute('data-value');
            divModal.querySelector('#ddlType').value = type;

            window.ddlValueType_onChange(type, value);

        });
        delete window.ddlValueType_onChange;
        window.openModal(containerId, true);
    }

    async ddlValueType_onChange(type, value) {

        let nodes = document.querySelectorAll(`#${this.props.containerID} #divSelectTypeValueModal`);
        for (let i = 0; i < nodes.length; i++) {
            let divModal = nodes[i];
            //hide all container
            divModal.querySelector('#divControl').style.display = 'none';
            divModal.querySelector('#divStatic').style.display = 'none';
            divModal.querySelector('#divParameter').style.display = 'none';
            divModal.querySelector('#divSysParameter').style.display = 'none';
            divModal.querySelector('#divVariable').style.display = 'none';

            switch (type) {
                case "1"://variable
                    divModal.querySelector('#divVariable').style.display = '';
                    await this.setState({ SelectedVariable: '', OpenSelectVariable: false });
                    await this.setState({ SelectedVariable: value, OpenSelectVariable: true });
                    break;
                case "2"://static
                    divModal.querySelector('#divStatic').style.display = '';
                    divModal.querySelector('#txtStaticValue').value = value;
                    break;
                case "3"://control
                    divModal.querySelector('#divControl').style.display = '';
                    divModal.querySelector('#ddlProcessControls').value = value;
                    break;
                case "4"://parameter
                    divModal.querySelector('#divParameter').style.display = '';
                    divModal.querySelector('#txtParameterValue').value = value;
                    break;
                case "6"://systemicProperty
                    divModal.querySelector('#divSysParameter').style.display = '';
                    divModal.querySelector('#txtSysParameterValue').value = value;
                    break;
            }
        }
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let divModal = document.querySelector(`#${this.props.containerID} #divSelectTypeValueModal`);
            let type = divModal.querySelector('#ddlType').value;
            let value = '';
            switch (type) {
                case "1"://variable
                    value = this.state.SelectedVariable;
                    break;
                case "2"://static
                    value = divModal.querySelector('#txtStaticValue').value;
                    break;
                case "3"://control
                    value = divModal.querySelector('#ddlProcessControls').value;
                    break;
                case "4"://parameter
                    value = divModal.querySelector('#txtParameterValue').value;
                    break;
                case "6"://systemicProperty
                    value = divModal.querySelector('#txtSysParameterValue').value;
                    break;
            }
            window[this.props.containerID + '-target'].setAttribute('data-type', type);
            window[this.props.containerID + '-target'].setAttribute('data-value', value);
            this.reLoadAllSelectedTypeValues();
            window.closeModal(this.props.containerID);
        }
    }

    async reLoadAllSelectedTypeValues() {
        document.querySelectorAll(`#${this.props.containerID} #divSelectTypeValueModal`).forEach(function (divModal) {
            document.querySelectorAll('[data-isSelectTypeValue]').forEach(function (item) {
                let type = item.getAttribute('data-type');
                let value = item.getAttribute('data-value');
                switch (type) {
                    case "1"://variable
                        item.value = value;
                        break;
                    case "2"://static
                        item.value = value;
                        break;
                    case "3"://control
                        item.value = value;
                        let options = divModal.querySelector('#ddlProcessControls').options;
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].value == value)
                                item.value = options[i].text;
                        }
                        break;
                    case "4"://parameter
                        item.value = value;
                        break;
                    case "6"://systemicProperty
                        item.value = value;
                        let Sysoptions = divModal.querySelector('#txtSysParameterValue').options;
                        for (let i = 0; i < Sysoptions.length; i++) {
                            if (Sysoptions[i].value == value)
                                item.value = Sysoptions[i].text;
                        }
                        break;
                }
            });
        });
    }

    async selectVariable(variableName) {
        window[this.props.containerID + '-target'].setAttribute('data-type', '1');
        window[this.props.containerID + '-target'].setAttribute('data-value', variableName);
        this.reLoadAllSelectedTypeValues();
        window.closeModal(this.props.containerID);
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divSelectTypeValueModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.SelectTypeValue.caption}</h5>
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
                                <div className="col-lg-8">
                                    <label>{Lang.SelectTypeValue.type}</label>
                                    <div className="input-group">
                                        <select id="ddlType" name="ddlType" className="form-control" onChange={(e) => { this.ddlValueType_onChange(e.target.value, '') }}>
                                            <option value="1">{Lang.SelectTypeValue.variable} </option>
                                            <option value="2">{Lang.SelectTypeValue.static}</option>
                                            <option value="3">{Lang.SelectTypeValue.control}</option>
                                            <option value="4">{Lang.SelectTypeValue.urlParameter}</option>
                                            <option value="6">{Lang.SelectTypeValue.systemicParameter}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row" id="divVariable">
                                {this.state.OpenSelectVariable &&
                                    <InnerFormSelectVariable isListVariable={false} selectedVariable={this.state.SelectedVariable} selectVariableFunc={this.selectVariable}
                                        processId={this.props.processId} applicationPageId={this.props.applicationPageId}></InnerFormSelectVariable>}
                            </div>
                            <div className="form-group row" id="divControl">
                                <div className="col-lg-8">
                                    <label>{Lang.SelectTypeValue.control}</label>
                                    <div className="input-group">
                                        <Select name="ddlProcessControls" id="ddlProcessControls" defaultValue="" handelChange={this.selectItem}
                                            listItem={this.props.ProcessControls} optionKey="Key" optionLabel="Value" />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group row" id="divStatic">
                                <div className="col-lg-8">
                                    <label>{Lang.SelectTypeValue.static}</label>
                                    <div className="input-group">
                                        <input id="txtStaticValue" type="text" defaultValue="" autoComplete="off" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row" id="divParameter">
                                <div className="col-lg-8">
                                    <label>{Lang.SelectTypeValue.urlParameter}</label>
                                    <div className="input-group">
                                        <input id="txtParameterValue" name="txtParameterValue" defaultValue="" type="text" autoComplete="off" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row" id="divSysParameter">
                                <div className="col-lg-8">
                                    <label>{Lang.SelectTypeValue.systemicParameter}</label>
                                    <div className="input-group">
                                        <select id="txtSysParameterValue" className="form-control">
                                            <option value="GetCurrentUserID">{Lang.SelectTypeValue.currentUserID}</option>
                                            <option value="GetCurrentUserName">{Lang.SelectTypeValue.currentUserName}</option>
                                            <option value="GetThreadUserID">{Lang.SelectTypeValue.threadUserID}</option>
                                            <option value="GetThreadID">{Lang.SelectTypeValue.threadID}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="lnkSaveJavaCode" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.apply}
                         </button>
                        <button type="button" id="lnkJavaCodeCancel" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectTypeValue;

