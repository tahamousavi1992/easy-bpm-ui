import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import CallMethodForm from './CallMethodForm';
import SetVariableForm from './SetVariableForm';
import SetControlForm from './SetControlForm';
import WebServiceForm from './WebServiceForm';
import SqlFunctionForm from './SqlFunctionForm';
import EmailForm from './EmailForm';
import EntityForm from './EntityForm';
import Lang from '../../../Shared/AdminLang/Lang';

class ActionList extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.loadForm = this.loadForm.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.ddlActionsChange = this.ddlActionsChange.bind(this);
        this.addSetVariable = this.addSetVariable.bind(this);
        this.addSetControl = this.addSetControl.bind(this);
        this.addMethod = this.addMethod.bind(this);
        this.addLoadWebService = this.addLoadWebService.bind(this);
        this.addLoadSqlFunction = this.addLoadSqlFunction.bind(this);
        this.addLoadEmail = this.addLoadEmail.bind(this);
        this.addLoadEntity = this.addLoadEntity.bind(this);
        this.setSaveFunction = this.setSaveFunction.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadDesignCodeActionList(this.props);
        await this.setState({ ...data });
        this.loadForm();
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    //called by actions like setvariable,setControl,etc... .
    setSaveFunction(submitFunction) {
        this.setState({ actionSubmit: submitFunction })
    }

    loadForm() {
        if (this.state.Model != null) {
            let actionTypeSelected = '';
            switch (this.state.Model.ActionType) {
                case 1:
                    actionTypeSelected = 'addSetVariable:1';
                    break;
                case 3:
                    actionTypeSelected = 'addMethod:3:' + this.state.Model.MethodID + ':' + this.state.Model.MethodGroupType;
                    break;
                case 5:
                    actionTypeSelected = 'addSetControl:5';
                    break;
                case 7:
                    actionTypeSelected = 'addLoadWebService:7';
                    break;
                case 8:
                    actionTypeSelected = 'addLoadEntity:8:' + this.state.Model.MethodType;
                    break;
                case 9:
                    actionTypeSelected = 'addLoadSqlFunction:9';
                    break;
                case 10:
                    actionTypeSelected = 'addLoadEmail:10';
                    break;
            }
            document.getElementById('ddlActions').value = actionTypeSelected;
            this.ddlActionsChange({ target: document.getElementById('ddlActions') }, this.state.Base64Code);
        }
    }

    async openEditModal(xmlB64Model, actionType) {
        if (actionType == 1) this.addSetVariable(xmlB64Model);
        if (actionType == 3) this.addMethod(xmlB64Model);
        if (actionType == 5) this.addSetControl(xmlB64Model);
        if (actionType == 7) this.addLoadWebService(xmlB64Model);
        if (actionType == 8) this.addLoadEntity(xmlB64Model);
        if (actionType == 9) this.addLoadSqlFunction(xmlB64Model);
        if (actionType == 10) this.addLoadEmail(xmlB64Model);
    }

    async ddlActionsChange(event, xmlB64Model) {
        let selectedValue = event.target.value;
        if (selectedValue != null && selectedValue != '') {
            switch (Number(selectedValue.split(':')[1])) {
                case 3:
                    let methodId = selectedValue.split(':')[2];
                    let groupName = selectedValue.split(':')[3];
                    this.addMethod(xmlB64Model, methodId, groupName);
                    break;
                case 1:
                    this.addSetVariable(xmlB64Model);
                    break;
                case 5:
                    this.addSetControl(xmlB64Model);
                    break;
                case 7:
                    this.addLoadWebService(xmlB64Model);
                    break;
                case 8:
                    this.addLoadEntity(xmlB64Model, selectedValue.split(':')[2]);
                    break;
                case 9:
                    this.addLoadSqlFunction(xmlB64Model);
                    break;
                case 10:
                    this.addLoadEmail(xmlB64Model);
                    break;
            }
        }
    }

    //it will open _CallMethodForm
    async addMethod(xmlB64Model, defMethodId, defGroupName) {
        if (xmlB64Model == null) xmlB64Model = '';
        let data = {
            DynamicFormId: this.state.DynamicFormId, XmlB64Model: xmlB64Model, ShapeId: this.state.ShapeId,
            ParentShapeId: this.state.ParentShapeId, IsOutputYes: this.state.IsOutputYes, IsFirst: this.state.IsFirst,
            ProcessId: this.props.ProcessId, ApplicationPageId: this.props.ApplicationPageId,
            DefaultMethodID: defMethodId, DefaultMethodGroupType: defGroupName
        };

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenCallMethodForm: false, OpenSetVariableForm: false, OpenSetControlForm: false, OpenWebServiceForm: false, OpenEntityForm: false, OpenSqlFunctionForm: false, OpenEmailForm: false, Data: data });
        await this.setState({ OpenCallMethodForm: true });
    }

    //it will open _SetVariableForm 
    async addSetVariable(xmlB64Model) {
        if (xmlB64Model == null) xmlB64Model = '';
        let data = {
            DynamicFormId: this.state.DynamicFormId, XmlB64Model: xmlB64Model, ShapeId: this.state.ShapeId,
            ParentShapeId: this.state.ParentShapeId, IsOutputYes: this.state.IsOutputYes, IsFirst: this.state.IsFirst,
            ProcessId: this.props.ProcessId, ApplicationPageId: this.props.ApplicationPageId,
        };

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenCallMethodForm: false, OpenSetVariableForm: false, OpenSetControlForm: false, OpenWebServiceForm: false, OpenEntityForm: false, OpenSqlFunctionForm: false, OpenEmailForm: false, Data: data });
        await this.setState({ OpenSetVariableForm: true });
    }

    //it will open _SetVariableForm
    async addSetControl(xmlB64Model) {
        if (xmlB64Model == null) xmlB64Model = '';
        let data = {
            DynamicFormId: this.state.DynamicFormId, XmlB64Model: xmlB64Model, ShapeId: this.state.ShapeId,
            ParentShapeId: this.state.ParentShapeId, IsOutputYes: this.state.IsOutputYes, IsFirst: this.state.IsFirst,
            ProcessId: this.props.ProcessId, ApplicationPageId: this.props.ApplicationPageId,
        };

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenCallMethodForm: false, OpenSetVariableForm: false, OpenSetControlForm: false, OpenWebServiceForm: false, OpenEntityForm: false, OpenSqlFunctionForm: false, OpenEmailForm: false, Data: data });
        await this.setState({ OpenSetControlForm: true });
    }

    //it will open _WebServiceForm
    async addLoadWebService(xmlB64Model) {
        if (xmlB64Model == null) xmlB64Model = '';
        let data = {
            DynamicFormId: this.state.DynamicFormId, XmlB64Model: xmlB64Model, ShapeId: this.state.ShapeId,
            ParentShapeId: this.state.ParentShapeId, IsOutputYes: this.state.IsOutputYes, IsFirst: this.state.IsFirst,
            ProcessId: this.props.ProcessId, ApplicationPageId: this.props.ApplicationPageId,
        };

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenCallMethodForm: false, OpenSetVariableForm: false, OpenSetControlForm: false, OpenWebServiceForm: false, OpenEntityForm: false, OpenSqlFunctionForm: false, OpenEmailForm: false, Data: data });
        await this.setState({ OpenWebServiceForm: true });
    }
    //it will open Sql Function
    async addLoadSqlFunction(xmlB64Model) {
        if (xmlB64Model == null) xmlB64Model = '';
        let data = {
            DynamicFormId: this.state.DynamicFormId, XmlB64Model: xmlB64Model, ShapeId: this.state.ShapeId,
            ParentShapeId: this.state.ParentShapeId, IsOutputYes: this.state.IsOutputYes, IsFirst: this.state.IsFirst,
            ProcessId: this.props.ProcessId, ApplicationPageId: this.props.ApplicationPageId,
        };

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenCallMethodForm: false, OpenSetVariableForm: false, OpenSetControlForm: false, OpenWebServiceForm: false, OpenEntityForm: false, OpenSqlFunctionForm: false, OpenEmailForm: false, Data: data });
        await this.setState({ OpenSqlFunctionForm: true });
    }

    //it will open Sql Function
    async addLoadEmail(xmlB64Model) {
        if (xmlB64Model == null) xmlB64Model = '';
        let data = {
            DynamicFormId: this.state.DynamicFormId, XmlB64Model: xmlB64Model, ShapeId: this.state.ShapeId,
            ParentShapeId: this.state.ParentShapeId, IsOutputYes: this.state.IsOutputYes, IsFirst: this.state.IsFirst,
            ProcessId: this.props.ProcessId, ApplicationPageId: this.props.ApplicationPageId,
        };

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenCallMethodForm: false, OpenSetVariableForm: false, OpenSetControlForm: false, OpenWebServiceForm: false, OpenEntityForm: false, OpenSqlFunctionForm: false, OpenEmailForm: false, Data: data });
        await this.setState({ OpenEmailForm: true });
    }


    //it will open _EntityForm
    async addLoadEntity(xmlB64Model, defGroupType) {
        if (xmlB64Model == null) xmlB64Model = '';
        let data = {
            DynamicFormId: this.state.DynamicFormId, XmlB64Model: xmlB64Model, ShapeId: this.state.ShapeId,
            ParentShapeId: this.state.ParentShapeId, IsOutputYes: this.state.IsOutputYes, IsFirst: this.state.IsFirst,
            ProcessId: this.props.ProcessId, ApplicationPageId: this.props.ApplicationPageId,
            DefaultMethodType: defGroupType
        };

        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenCallMethodForm: false, OpenSetVariableForm: false, OpenSetControlForm: false, OpenWebServiceForm: false, OpenEntityForm: false, OpenSqlFunctionForm: false, OpenEmailForm: false, Data: data });
        await this.setState({ OpenEntityForm: true });
    }

    async submitForm() {
        if (window.bpmsFormIsValid()) {
            let name = document.querySelector('#divAddEditActionListModal #Name').value;
            if (name == '') {
                UtilityService.showMessage('error', `Name is required.`);
                return false;
            }

            let code = this.state.actionSubmit(name, this.state.FuncName);

            if (code == null || code == '') {
                return false;
            }

            let id = window.getValueInsideXmlTag('ID', code);
            //if the actionType is changed, update current action id in window.designCodeData.
            //because it will update current action with new action in draw2UpdateDiagramData not push new one to array.
            if (this.state.Model != null && this.state.Model.ID != id) {
                window.designCodeData.forEach((data) => {
                    if (data.id == this.state.Model.ID) {
                        data.id = id;
                    }
                });
            }
            window.draw2UpdateDiagramData([code], name, this.state.ShapeId);
            window.closeModal('divAddEditBusinessRule');
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divAddEditActionListModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.ActionList.caption}</h5>
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
                            this.state.ShapeId &&
                            <div className="form">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.ActionList.name}</label>
                                        <div className="input-group">
                                            <input onChange={this.handelChange} defaultValue={this.state.Name || ''} name='Name' id='Name' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.ActionList.name)} data-val="true" data-val-group="saveActionList" />
                                        </div>
                                        <span htmlFor="Name" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.ActionList.action}</label>
                                        <div className="input-group">
                                            <select name="ddlActions" id="ddlActions" defaultValue="" className="form-control" onChange={this.ddlActionsChange}>
                                                <option value="">{Lang.ActionList.selectAction}</option>
                                                <optgroup label="User Methods">
                                                    <option value="addMethod:3:CreateBpmsUser:1">{Lang.ActionList.createBpmsUser}</option>
                                                    <option value="addMethod:3:CreateSiteUser:1">{Lang.ActionList.createSiteUser}</option>
                                                    <option value="addMethod:3:GetUserPropertyByID:1">{Lang.ActionList.getUserPropertyByID}</option>
                                                    <option value="addMethod:3:GetUserPropertyByUserName:1">{Lang.ActionList.getUserPropertyByUserName}</option>
                                                </optgroup>
                                                <optgroup label="Message Methods">
                                                    <option value="addMethod:3:AddError:2">{Lang.ActionList.addError}</option>
                                                    <option value="addMethod:3:AddInfo:2">{Lang.ActionList.addInfo}</option>
                                                    <option value="addMethod:3:AddSuccess:2">{Lang.ActionList.addSuccess}</option>
                                                    <option value="addMethod:3:AddWarning:2">{Lang.ActionList.addWarning}</option>
                                                </optgroup>
                                                <optgroup label="Access Methods">
                                                    <option value="addMethod:3:GetUserID:4">{Lang.ActionList.getUserID}</option>
                                                    <option value="addMethod:3:GetRoleCode:4">{Lang.ActionList.getRoleCode}</option>
                                                    <option value="addMethod:3:GetRoleCodeList:4">{Lang.ActionList.getRoleCodeList}</option>
                                                    <option value="addMethod:3:AddRoleToUser:4">{Lang.ActionList.addRoleToUser}</option>
                                                    <option value="addMethod:3:RemoveRoleFromUser:4">{Lang.ActionList.removeRoleFromUser}</option>
                                                    <option value="addMethod:3:GetDepartmentHierarchyByUserId:4">{Lang.ActionList.getDepartmentHierarchyByUserId}</option>
                                                </optgroup>
                                                <optgroup label="Url Methods">
                                                    <option value="addMethod:3:RedirectUrl:5">{Lang.ActionList.redirectUrl}</option>
                                                    <option value="addMethod:3:RedirectForm:5">{Lang.ActionList.redirectForm}</option>
                                                </optgroup>
                                                <optgroup label="Varaible">
                                                    <option value="addSetVariable:1">{Lang.ActionList.setVariable}</option>
                                                </optgroup>
                                                <optgroup label="Controls">
                                                    <option value="addSetControl:5">{Lang.ActionList.setControl}</option>
                                                </optgroup>
                                                <optgroup label="WebService">
                                                    <option value="addLoadWebService:7">{Lang.ActionList.manageWebService}</option>
                                                </optgroup>
                                                <optgroup label="Entity">
                                                    <option value="addLoadEntity:8:1">{Lang.ActionList.createEntity}</option>
                                                    <option value="addLoadEntity:8:2">{Lang.ActionList.updateEntity}</option>
                                                    <option value="addLoadEntity:8:3">{Lang.ActionList.deleteEntity}</option>
                                                </optgroup>
                                                <optgroup label="SqlFunction">
                                                    <option value="addLoadSqlFunction:9">{Lang.ActionList.manageSqlFunction}</option>
                                                </optgroup>
                                                <optgroup label="Email">
                                                    <option value="addLoadEmail:10">{Lang.ActionList.manageEmail}</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                        <span htmlFor="Actions" className="help-block error"></span>
                                    </div>
                                </div>
                                <div>
                                    {this.state.OpenCallMethodForm && <CallMethodForm setSaveFunction={this.setSaveFunction} {...this.state.Data}></CallMethodForm>}
                                    {this.state.OpenSetVariableForm && <SetVariableForm setSaveFunction={this.setSaveFunction} {...this.state.Data}></SetVariableForm>}
                                    {this.state.OpenSetControlForm && <SetControlForm setSaveFunction={this.setSaveFunction} {...this.state.Data}></SetControlForm>}
                                    {this.state.OpenWebServiceForm && <WebServiceForm setSaveFunction={this.setSaveFunction} {...this.state.Data}></WebServiceForm>}
                                    {this.state.OpenEntityForm && <EntityForm setSaveFunction={this.setSaveFunction} {...this.state.Data}></EntityForm>}
                                    {this.state.OpenSqlFunctionForm && <SqlFunctionForm setSaveFunction={this.setSaveFunction} {...this.state.Data}></SqlFunctionForm>}
                                    {this.state.OpenEmailForm && <EmailForm setSaveFunction={this.setSaveFunction} {...this.state.Data}></EmailForm>}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveInfo" onClick={this.submitForm} data-val-group="saveActionList"
                            type="button" className="btn btn-primary font-weight-bold">
                            {Lang.Shared.apply}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal" >
                            {Lang.Shared.cancel}
                        </button>
                    </div>
                </div>

            </div >
        );
    }
}

export default ActionList;

