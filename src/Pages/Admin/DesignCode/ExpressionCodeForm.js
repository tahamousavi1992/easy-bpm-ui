import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class ExpressionCodeForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.expressionCodeInit = this.expressionCodeInit.bind(this);
        this.expressionDdlCategories_Change = this.expressionDdlCategories_Change.bind(this);
        this.expressionCodeEditorInti = this.expressionCodeEditorInti.bind(this);
        this.expressionCodeSelectItem = this.expressionCodeSelectItem.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    }

    async componentDidMount() {
        window.cEditor = null;
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        let data = await new DesignCodeService().postLoadExpressionCodeForm(this.props);
        await this.setState({ ...data });

        this.expressionCodeInit(this.state.AssembliesJson, this.state.Model.Assemblies,
            this.state.ProcessVariables, 'ddlExpressionAssemblies', 'ddlExpressionCodeProcessVariable');

        window.expressionCodeEditorInti = this.expressionCodeEditorInti;
        window.expressionCodeEditorIntiData = data.Model.ExpressionCode == "undefined" ? "" : data.Model.ExpressionCode;
        setTimeout(() => {
            window.expressionCodeEditorInti('txtExpressionCode', window.expressionCodeEditorIntiData)
        }, 1000);
        //init category
        this.category_changed(document.getElementById('ddlCategories'));
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    expressionCodeInit(assembliesJson, selectedAssemblies, processVariables, ddlAssembliesId, ddlCodeProcessVariableId) {
        let ctAssemblies = $('#' + ddlAssembliesId).comboTree({
            source: assembliesJson, isMultiple: true, collapse: true
        });
        window.setComboTreeValues(ctAssemblies, selectedAssemblies);

        $('#' + ddlCodeProcessVariableId).comboTree({
            source: processVariables,
            isMultiple: false,
            collapse: true
        });

        //clicking on combo tree item , this put value in code editor
        $('.comboTreeItemTitle').click(function () {
            if (this.innerText.indexOf('.dll') == -1)
                window.cEditor.replaceSelection(this.getAttribute('data-id').replace(/;/g, '"'));
        });

        $('.methods select[multiple] option').dblclick(function () {
            if (this.value != '' && this.value != null) {
                window.cEditor.replaceSelection(this.value.replace(/;/g, '"'));
            }
        });
    }

    expressionDdlCategories_Change(event) {
        this.category_changed(event.target);
    }

    category_changed = (target) => {
        document.querySelectorAll('.methods select[multiple]').forEach(function (item) {
            item.style.display = 'none';
        });
        document.getElementById(target.value).closest('.methods').querySelector('label').innerHTML = target.selectedOptions[0].text;
        document.getElementById(target.value).style.display = '';
    }

    expressionCodeEditorInti(inputid, code) {
        window.cEditor = window.CodeMirror.fromTextArea(document.getElementById(inputid), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-csharp"
        });
        var mac = window.CodeMirror.keyMap.default == window.CodeMirror.keyMap.macDefault;
        window.CodeMirror.keyMap.default[(mac ? "Cmd" : "Ctrl") + "-Space"] = "autocomplete";
        window.cEditor.setValue(code);
    }

    expressionCodeSelectItem(event) {
        if (event.target.value != '' && event.target.value != null) {
            window.cEditor.replaceSelection(event.target.value.replace(/;/g, '"'));
            event.target.value = '';
        }
    }

    updateDescription(event) {
        document.querySelectorAll('#divDescription div').forEach(function (item) {
            item.style.display = event.target != null && event.target.value.split('(')[0].replace('.', '_') == item.id.replace('.', '_') ? '' : 'none';
        });
    }

    async submitForm() {

        if (window.bpmsFormIsValid()) {
            let code = `<DCExpressionModel>
<ID>${this.state.Model.ID}</ID>
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID>
<Name>${document.getElementById('Name').value}</Name>
<FuncName>${this.state.Model.FuncName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
<Assemblies>${document.getElementById('ddlExpressionAssemblies').value}</Assemblies>
<ExpressionCode>${window.cEditor.getValue()}</ExpressionCode>
</DCExpressionModel>`;

            window.draw2UpdateDiagramData([code], document.getElementById('Name').value, this.state.Model.ShapeID);
            window.closeModal('divAddEditBusinessRule');
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divAddEditExpressionModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.ExpressionCodeForm.caption}</h5>
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
                            this.state.Model &&
                            <div className="form">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.ExpressionCodeForm.name}</label>
                                        <div className="input-group">
                                            <input onChange={this.handelChange} defaultValue={this.state.Model.Name || ''} name='Name' id='Name' className="form-control required-field" data-val-required="Name is required" data-val="true" data-val-group="saveExpression" autoComplete="off" />
                                        </div>
                                        <span htmlFor="Name" className="help-block error"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-4">
                                        <label>Categories</label>
                                        <div className="input-group">
                                            <select defaultValue="" name='ddlCategories' id='ddlCategories' className="form-control" onChange={this.expressionDdlCategories_Change}  >
                                                <option value="ddlSysMethods" >{Lang.ExpressionCodeForm.systemicMethods}</option>
                                                <option value="ddlVariablesMethods">{Lang.ExpressionCodeForm.variablesMethods}</option>
                                                <option value="ddlMessageMethods">{Lang.ExpressionCodeForm.messageMethods}</option>
                                                <option value="ddlAccessMethods">{Lang.ExpressionCodeForm.accessMethods}</option>
                                                <option value="ddlHelperMethods">{Lang.ExpressionCodeForm.helperMethods}</option>
                                                <option value="ddlDocumentMethods">{Lang.ExpressionCodeForm.documentMethods}</option>
                                                <option value="ddlDocumentFolderID">{Lang.ExpressionCodeForm.folders}</option>
                                                <option value="ddlsysVariables">{Lang.ExpressionCodeForm.systemicVariables}</option>
                                                <option value="ddlApplicationPageId">{Lang.ExpressionCodeForm.applicationPages}</option>
                                                <option value="ddlDepartmentRole">{Lang.ExpressionCodeForm.roles}</option>
                                                <option value="ddlProcessControls">{Lang.ExpressionCodeForm.controls}</option>
                                                <option value="ddlDepartmentList">{Lang.ExpressionCodeForm.organizations}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 methods">
                                        <label></label>
                                        <div className="input-group" style={{ min_height: "100px" }}>
                                            <Select id="ddlSysMethods" name="ddlSysMethods" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.updateDescription}
                                                listItem={this.state.GetAllSysMethods} optionKey="Key" optionLabel="Key" />
                                            <Select id="ddlVariablesMethods" name="ddlVariablesMethods" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.updateDescription}
                                                listItem={this.state.GetVariableMethods} optionKey="Key" optionLabel="Key" />
                                            <Select id="ddlMessageMethods" name="ddlMessageMethods" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.updateDescription}
                                                listItem={this.state.GetMessageMethods} optionKey="Key" optionLabel="Key" />
                                            <Select id="ddlAccessMethods" name="ddlAccessMethods" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.updateDescription}
                                                listItem={this.state.GetAccessMethods} optionKey="Key" optionLabel="Key" />
                                            <Select id="ddlHelperMethods" name="ddlHelperMethods" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.updateDescription}
                                                listItem={this.state.GetHelperMethods} optionKey="Key" optionLabel="Key" />
                                            <Select id="ddlDocumentMethods" name="ddlDocumentMethods" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.updateDescription}
                                                listItem={this.state.GetDocumentMethods} optionKey="Key" optionLabel="Key" />
                                            <Select id="ddlsysVariables" name="ddlsysVariables" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.updateDescription}
                                                listItem={this.state.GetAllSysProperties} optionKey="Key" optionLabel="Key" />
                                            <Select id="ddlDocumentFolderID" name="ddlDocumentFolderID" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.expressionCodeSelectItem}
                                                listItem={this.state.DocumentFolders} optionKey="Key" optionLabel="Value" />
                                            <Select id="ddlApplicationPageId" name="ddlApplicationPageId" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.expressionCodeSelectItem}
                                                listItem={this.state.ApplicationPages} optionKey="Key" optionLabel="Value" />
                                            <Select id="ddlDepartmentRole" name="ddlDepartmentRole" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.expressionCodeSelectItem}
                                                listItem={this.state.DepartmentRoles} optionKey="CodeOf" optionLabel="NameOf" />
                                            <Select id="ddlDepartmentList" name="ddlDepartmentList" defaultValue={[]} style={{ display: "none" }} multiple={true} style={{ display: "none" }} handelChange={this.expressionCodeSelectItem}
                                                listItem={this.state.DepartmentList} optionKey="ID" optionLabel="Name" />
                                            <Select id="ddlProcessControls" name="ddlProcessControls" defaultValue={[]} style={{ display: "none" }} multiple={true} handelChange={this.expressionCodeSelectItem}
                                                listItem={this.state.ProcessControls} optionKey="Key" optionLabel="Value" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label>{Lang.ExpressionCodeForm.description}</label>
                                        <div className="input-group" id="divDescription" style={{ min_height: "100px" }}>
                                            <div id="VariableHelper.Save" style={{ display: "none" }}> </div>
                                            <div id="VariableHelper.Set" style={{ display: "none" }}> </div>
                                            <div id="VariableHelper.Get" style={{ display: "none" }}> </div>
                                            <div id="VariableHelper.GetValue" style={{ display: "none" }}> </div>
                                            <div id="VariableHelper.Clear" style={{ display: "none" }}> </div>
                                            <div id="MessageHelper.AddError" style={{ display: "none" }}> </div>
                                            <div id="MessageHelper.AddInfo" style={{ display: "none" }}> </div>
                                            <div id="MessageHelper.AddSuccess" style={{ display: "none" }}> </div>
                                            <div id="MessageHelper.AddWarning" style={{ display: "none" }}> </div>
                                            <div id="AccessHelper.GetUser" style={{ display: "none" }}> </div>
                                            <div id="AccessHelper.GetUserID" style={{ display: "none" }}> </div>
                                            <div id="AccessHelper.GetDepartmentHierarchyByUserId" style={{ display: "none" }}></div>
                                            <div id="ControlHelper.GetValue" style={{ display: "none" }}> </div>
                                            <div id="ControlHelper.SetValue" style={{ display: "none" }}> </div>
                                            <div id="ControlHelper.SetVisibility" style={{ display: "none" }}></div>
                                            <div id="OperationHelper.RunQuery" style={{ display: "none" }}> </div>
                                            <div id="UrlHelper.GetParameter" style={{ display: "none" }}> </div>
                                            <div id="UrlHelper.RedirectUrl" style={{ display: "none" }}> </div>
                                            <div id="UrlHelper.RedirectForm" style={{ display: "none" }}> </div>
                                            <div id="UserHelper.CreateSiteUser" style={{ display: "none" }}> </div>
                                            <div id="UserHelper.CreateBpmsUser" style={{ display: "none" }}> </div>
                                            <div id="UserHelper.GetSiteUser" style={{ display: "none" }}> </div>
                                            <div id="DocumentHelper.GetList" style={{ display: "none" }}> </div>
                                            <div id="DocumentHelper.CheckMandatory" style={{ display: "none" }}> </div>
                                            <div id="this.CurrentUserID" style={{ display: "none" }}> </div>
                                            <div id="this.CurrentUserName" style={{ display: "none" }}> </div>
                                            <div id="this.ThreadUserID" style={{ display: "none" }}> </div>
                                            <div id="this.ThreadID" style={{ display: "none" }}> </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.ExpressionCodeForm.variable}</label>
                                        <div>
                                            <input id="ddlExpressionCodeProcessVariable" name="ddlExpressionCodeProcessVariable" autoComplete="off" type="text" defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.ExpressionCodeForm.assemblies}</label>
                                        <div className="input-group">
                                            <div style={{ width: "100%" }}>
                                                <input id="ddlExpressionAssemblies" name="ddlExpressionAssemblies" autoComplete="off" type="text" defaultValue="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <div className="input-group">
                                            <textarea className="form-control" id="txtExpressionCode" ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveInfo" onClick={this.submitForm} data-val-group="saveExpression"
                            type="button" className="btn btn-primary font-weight-bold">
                            {Lang.Shared.apply}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" id="lnkExpressionCancel" data-dismiss="modal" >
                            {Lang.Shared.cancel}
                        </button>
                    </div>
                </div>
            </div >
        );
    }
}

export default ExpressionCodeForm;

