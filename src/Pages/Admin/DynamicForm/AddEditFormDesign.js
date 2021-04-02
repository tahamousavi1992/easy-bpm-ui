import React, { useState } from 'react';
import DynamicFormService from '../../../Services/DynamicFormService';
import VariableService from '../../../Services/VariableService';
import UtilityService from '../../../Services/UtilityService';
import SelectVariable from '../Variable/SelectVariable'
import AddEditStyleSheet from './AddEditStyleSheet'
import AddEditJavaScript from '../DesignCode/AddEditJavaScript'
import DesignCodeForm from '../DesignCode/DesignCodeForm'
import ConditionForm from '../DesignCode/ConditionForm'
import Lang from '../../../Shared/AdminLang/Lang';
import EditApplicationPage from './EditApplicationPage';
import AddDynamicForm from './AddDynamicForm';
import VariableList from '../Variable/VariableList'
import { Link } from 'react-router-dom'
import BpmsConfig from '../../../Shared/BpmsConfig'
const $ = window.$;
var currentAddVariableId = '';
var targetElementAddCode = null;
class AddEditFormDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.sendFormToServer = this.sendFormToServer.bind(this);
        this.disableSubmit = this.disableSubmit.bind(this);
        this.initialForm = this.initialForm.bind(this);
        this.initCombooTree = this.initCombooTree.bind(this);
        this.initVariableComboTree = this.initVariableComboTree.bind(this);
        this.initDocumentComboTree = this.initDocumentComboTree.bind(this);

        this.openOnExitForm = this.openOnExitForm.bind(this);
        this.openOnEntryForm = this.openOnEntryForm.bind(this);
        this.openBackEndCode = this.openBackEndCode.bind(this);
        this.onCodeCallBack = this.onCodeCallBack.bind(this);
        this.openJavaScriptCode = this.openJavaScriptCode.bind(this);
        this.onEventCodeCallBack = this.onEventCodeCallBack.bind(this);
        this.openFormOnloadStyleSheet = this.openFormOnloadStyleSheet.bind(this);
        this.openFormOnloadJavaScriptCode = this.openFormOnloadJavaScriptCode.bind(this);
        this.onLoadJavaScriptCodeCallBack = this.onLoadJavaScriptCodeCallBack.bind(this);
        this.onEntryFormCallBack = this.onEntryFormCallBack.bind(this);
        this.onExitFormCallBack = this.onExitFormCallBack.bind(this);
        this.tidyUp = this.tidyUp.bind(this);
        this.getTaskIdFromUrl = this.getTaskIdFromUrl.bind(this);
        this.configRemoveToolbarButtons = this.configRemoveToolbarButtons.bind(this);
        this.configSortable = this.configSortable.bind(this);
        this.openSelectVariable = this.openSelectVariable.bind(this);
        this.openButtonBackEndCode = this.openButtonBackEndCode.bind(this);
        this.openFormEditApplicationPage = this.openFormEditApplicationPage.bind(this);
        this.openVariableListPage = this.openVariableListPage.bind(this);
        this.openAddDynamicForm = this.openAddDynamicForm.bind(this);
        this.callBackAddDynamicForm = this.callBackAddDynamicForm.bind(this);
        this.setPageCaption = this.setPageCaption.bind(this);
    }

    async componentDidMount() {
        //load data 
        let data = await new DynamicFormService().getAddEditFormDesign(this.props.match.params.Id, this.props.match.params.ApplicationPageId);
        this.setPageCaption(data.Model);
        await this.setState({ ...data });

        window.initialForm = this.initialForm;
        window.initCombooTree = this.initCombooTree;
        window.initVariableComboTree = this.initVariableComboTree;
        window.initDocumentComboTree = this.initDocumentComboTree;
        window.disableSubmit = this.disableSubmit;
        window.configSortable = this.configSortable;
        window.configRemoveToolbarButtons = this.configRemoveToolbarButtons;
        window.tidyUp = this.tidyUp;
        window.openVariableList = this.openSelectVariable;
        window.openJavaScriptCode = this.openJavaScriptCode;
        window.onEventCodeCallBack = this.onEventCodeCallBack;
        window.openBackEndCode = this.openBackEndCode;
        window.onCodeCallBack = this.onCodeCallBack;
        window.onEntryFormCallBack = this.onEntryFormCallBack;
        window.onExitFormCallBack = this.onExitFormCallBack;
        window.openButtonBackEndCode = this.openButtonBackEndCode;

        $(document).ready(function () {
            window.initialForm(data);
            //load validation
        });
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }

    setPageCaption(model) {
        this.props.setPageCaption((model != null && model.ProcessId != null ? 2 : 17), [(model != null ? model.Name : ''), (model != null && model.ProcessId != null ? "Forms" : Lang.Menu.applicationPages), Lang.Menu.management], true, (model != null ? model.ProcessId : null), this.props.match.params.ApplicationPageId, this.backToFunction);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }
    backToFunction = () => {
        if (this.state.Model.ProcessId != null)
            this.props.history.push(BpmsConfig.currentPage() + "/ProcessFormList/" + this.state.Model.ProcessId);
        else
            this.props.history.push(BpmsConfig.currentPage() + "/DynamicFormList");
    }

    async initialForm(data) {
        $(document).on("click", ".delete-row", function () {
            $(this.closest("tr")).remove();
        });
        this.disableSubmit();
        if (data != null) {
            window.processForms = data.ProcessForms;
            window.variableData = data.ListVariables;
            window.entityVariables = data.EntityVariables;
            window.CaptchaUrl = '';
            window.GetDesignCodeIndexUrl = '';
            window.GetSelectVariableUrl = '';
            window.documentDefs = [];
            //load content
            if (data.Model.DesignJson != null && data.Model.DesignJson != '')
                window.FormGeneratorMethod.loadContent(String.raw`${data.Model.DesignJson}`);
            //init form generator
            window.FormGeneratorMethod.configEditToolbarButtons();
            window.FormGeneratorMethod.callDraggableForAllElementNew();
            $('#content').sortable({
                cursor: "move",
                connectWith: "[fg_element_type=\"CARD\"]",
            });

        }
        $('.rowDashboard').click(function () {
            let dropped = window.FormGeneratorMethod.addNewRow('4-4-4');
            $('#content').append(dropped);
            $(dropped).find('.rowElementContent').sortable({
                cursor: "move",
                items: '.fg-column',
                connectToSortable: '.rowElementContent',
            });
        });

        $('.accordionDashboard').click(function () {
            let dropped = window.FormGeneratorMethod.addNewAccordion();
            window.FormGeneratorMethod.addCardToAccordion(dropped);
            $('#content').append(dropped);
            $(dropped).find('.rowElementContent').sortable({
                cursor: "move",
                items: '.fg-column',
                connectToSortable: '.rowElementContent',
            });
        });

        setInterval(window.disableSubmit, 2000);

        // Loading taskFormHtml that is sent from designer for using in form generator
        $('#content').html(window["taskFormHtml"]);
        window.configSortable();
        window.configRemoveToolbarButtons();
    }

    async initCombooTree(notRefresh) {
        if (notRefresh) {
            this.initVariableComboTree();
            this.initDocumentComboTree();
        }
        else {
            window.data = await new VariableService().getVariableData();
            this.initVariableComboTree();
            if (document.querySelector('[data-isDocumentDefComboTree="true"]') != null) {
                window.documentDefs = await new DynamicFormService().GetFolderList();
                window.initDocumentComboTree();;
            }
        }
    }

    async initVariableComboTree() {
        window.variableComboTree = $('[data-isVariableComboTree="true"]').comboTree({
            source: window.data,
            isMultiple: false,
            collapse: true,
        });
    }

    async initDocumentComboTree() {
        //init variable combotree
        window.documentDefComboTree = $('[data-isDocumentDefComboTree="true"]').comboTree({
            source: window.documentDefs,
            isMultiple: false,
            collapse: true,
        });
        //because combo tree doesnt select its value automatically, this method does that.
        let documentdefid = $('[data-isDocumentDefComboTree="true"]').val();
        if (documentdefid != '' && documentdefid != null)
            window.setComboTreeValues(window.documentDefComboTree, documentdefid);
    }

    async sendFormToServer(designJson) {
        let result = await new DynamicFormService().updateDesign({
            DesignJson: designJson,
            DynamicFormId: this.state.Model.ID
        });
        UtilityService.showMessage(result.ResultType, result.Message);
    }

    disableSubmit() {
        if (document.getElementsByTagName('form').length > 0)
            document.getElementsByTagName('form')[0].onsubmit = function () {
                return false;
            };
    }

    async openOnExitForm() {
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEditDesignCode: false, OpenConditionForm: false, DesignCodeType: 1, IsOnExitForm: true, DesignCodeCallBack: 'onExitFormCallBack' });
        await this.setState({ OpenAddEditDesignCode: true });
        window.openModal('divDesignCode', true);
    }

    async openOnEntryForm() {
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEditDesignCode: false, OpenConditionForm: false, DesignCodeType: 1, IsOnExitForm: false, DesignCodeCallBack: 'onEntryFormCallBack' });
        await this.setState({ OpenAddEditDesignCode: true });
        window.openModal('divDesignCode', true);
    }

    async openButtonBackEndCode(designCode, callBack) {
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEditDesignCode: false, OpenConditionForm: false, DesignCodeType: 2, CodeType: 5, DesignCode: designCode, DesignCodeCallBack: callBack });
        await this.setState({ OpenAddEditDesignCode: true });
        window.openModal('divDesignCode', true);

    }

    async openBackEndCode(designCode, targetElement) {
        if (designCode == null || designCode == 'undefined' || designCode == "null" || designCode == '' || designCode == '[object Object]')
            designCode = '';
        else
            designCode = decodeURIComponent(escape(atob(designCode)));
        targetElementAddCode = targetElement;
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEditDesignCode: false, OpenConditionForm: false, DesignCode: designCode, DesignCodeCallBack: 'onCodeCallBack' });
        await this.setState({ OpenConditionForm: true });
        window.openModal('divDesignCode', true);

    }

    async onEntryFormCallBack(designCode) {
        let result = await new DynamicFormService().postAddEditOnEntryFormCode({ DesignCode: designCode, DynamicFormId: this.state.Model.ID });
        UtilityService.showMessage(result.ResultType, result.Message);
        return result.ResultType == 'success';
    }

    async onExitFormCallBack(designCode) {
        let result = await new DynamicFormService().postAddEditOnExitFormCode({ DesignCode: designCode, DynamicFormId: this.state.Model.ID });
        UtilityService.showMessage(result.ResultType, result.Message);
        return result.ResultType == 'success';
    }

    async onCodeCallBack(codeDesign, code) {
        if (targetElementAddCode.type == 'textarea')
            targetElementAddCode.value = code;
        if (codeDesign == null || codeDesign == 'undefined' || codeDesign == '')
            codeDesign = '';
        else
            codeDesign = btoa(unescape(encodeURIComponent(codeDesign)));
        targetElementAddCode.setAttribute('data-code', codeDesign);
    }

    //is for form control event javascript
    async openJavaScriptCode(code, targetElement) {
        if (targetElement.id != 'txtCallBackScript' && targetElement.value == "" && (code == null || code == "")) {
            targetElement.value = document.getElementById('txtIdElement').value
                + "_" + targetElement.id.split('_')[1];
            code = `function ${targetElement.value}(){ 

        }`;
        }
        targetElementAddCode = targetElement;
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEditJavaScript: false, IsForControlEvent: true, JavaCode: code, JavaCallBack: 'onEventCodeCallBack' });
        await this.setState({ OpenAddEditJavaScript: true });
        window.openModal('divAddEditJavaScript', true);
    }

    //is for on load javascript
    async openFormOnloadJavaScriptCode() {
        //to reload modal form I had to hide&show component to reload that
        await this.setState({ OpenAddEditJavaScript: false, IsForControlEvent: false, JavaCode: '', JavaCallBack: '' });
        await this.setState({ OpenAddEditJavaScript: true });
        window.openModal('divAddEditJavaScript', true);
    }

    async onLoadJavaScriptCodeCallBack(code) {
        let result = await new DynamicFormService().updateJavaScript(this.state.Model.ID, code);
        UtilityService.showMessage(result.ResultType, result.Message);
    }

    async onEventCodeCallBack(code) {
        if (targetElementAddCode.type == 'textarea')
            targetElementAddCode.value = code;
        else
            targetElementAddCode.setAttribute('data-eventcode', code);
    }

    async openFormOnloadStyleSheet() {
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenAddEditStyle: false });
        await this.setState({ OpenAddEditStyle: true });
        window.openModal('divAddEditStyle', true);
    }

    async callBackFromStyle() {
        //close modal
        window.closeModal('divAddEditStyle');
    }

    async openFormEditApplicationPage() {
        //to reload modal form I had to hide&show component to reload that
        await this.setState({ OpenEditApplicationPage: false });
        await this.setState({ OpenEditApplicationPage: true });
        window.openModal('divEditApplicationPage', true);
    }

    //the variable list page -> Variable -> VariableList.js
    async openVariableListPage() {
        //to reload modal form I had to hide&show component to reload that
        await this.setState({ OpenVariableListPage: false });
        await this.setState({ OpenVariableListPage: true });
        window.openModal('divVariableListPage', true);
    }

    async openAddDynamicForm() {
        //to reload modal form I had to hide&show component to reload that
        await this.setState({ OpenAddDynamicForm: false });
        await this.setState({ OpenAddDynamicForm: true });
        window.openModal('divAddDynamicForm', true);
    }

    async callBackAddDynamicForm(data) {
        window.closeModal('divAddDynamicForm');
        //update the name of the page.
        this.setPageCaption(data);
    }

    // This method uses for tyding up html content from extra classes or attributes which they was used for some operations like sortable an so on.
    tidyUp(content) {
        $(content.find('.remove').parent()).remove();
        content.find('*').removeClass('rowElementContent fg-el-placeholder toolbarElement ui-droppable ui-sortable-handle ui-sortable elementContent row-fluid form-row column demo whenDrag');
        //content.find('*').removeAttr('fg_element_type');
        return content;
    }

    getTaskIdFromUrl() {
        let url = new URL(window.location.href);
        let taskId = url.searchParams.get("taskId");
        return taskId;
    }

    configRemoveToolbarButtons() {
        $('.fg-delete-element').on('click', function () {
            console.log(this);
        });
        $('#content').on('click', '.fg-delete-element', function () {
            $(this).closest('.fg-el-container').remove();
        });
    }

    configSortable() {
        // Sortable column
        $('.rowElementContent').sortable({
            cursor: "move",
            items: '.column',
            connectToSortable: '.rowElementContent',
        });
    }

    async openSelectVariable(target) {
        window.selectedTarget = (target.tagName == "A" || target.tagName == "I") ? target.closest('.input-group').querySelector('input,textarea') : target;
        await this.setState({
            SelectedVariable: (window.selectedTarget.value == null ? '' : window.selectedTarget.value),
            IsListVariable: window.selectedTarget.getAttribute('data-isListVariable') == 'true',
            OpenSelectVariable: false
        });
        await this.setState({ OpenSelectVariable: true });
        window.openModal('divSelectVariable', true);
    }

    render() {
        return (
            <div id="editAppPageSearchForm">
                {
                    this.state.Model &&
                    <React.Fragment>
                        <div className="form-generator generator-sticky">
                            <div className="card card-custom card-sticky portlet-windows" id="sk_page_sticky_card">
                                <div className="card-header">
                                    <div className="card-toolbar">
                                        <div className="dropdown">
                                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {Lang.AddEditFormDesign.actions}
                                            </button>
                                            <div className="dropdown-menu" style={{ minWidth: '150px' }} aria-labelledby="dropdownMenuButton">
                                                {
                                                    (!this.state.Model.ProcessId || true) &&
                                                    <a className="dropdown-item mt-1" id="btnOpenEditInfo" onClick={() => {
                                                        this.sendFormToServer(window.FormGeneratorMethod.saveContent());
                                                        this.disableSubmit();
                                                    }}> 
                                                        <span className="nav-text">{Lang.AddEditFormDesign.saveForm}<i className="fa fa-save float-right mt-1"></i></span>
                                                    </a>
                                                }
                                                {
                                                    this.state.Model.ApplicationPageID &&
                                                    <a className="dropdown-item mt-1" id="btnOpenEditInfo" onClick={this.openFormEditApplicationPage}> 
                                                        <span className="nav-text">{Lang.AddEditFormDesign.openFormEditApplicationPage}<i className="fa fa-wpforms float-right mt-1"></i></span>
                                                    </a>
                                                }
                                                {
                                                    !this.state.Model.ApplicationPageID &&
                                                    <a className="dropdown-item mt-1" id="btnOpenEditInfo" onClick={this.openAddDynamicForm}> 
                                                        <span className="nav-text">{Lang.AddEditFormDesign.AddDynamicForm}<i className="fa fa-wpforms float-right mt-1"></i></span>
                                                    </a>
                                                }
                                                <a className="dropdown-item mt-1" id="btnOpenEditInfo" onClick={this.openVariableListPage}> 
                                                    <span className="nav-text">{Lang.AddEditFormDesign.openVariables}<i className="fa fa-wpforms float-right mt-1"></i></span>
                                                </a>
                                                <a className="dropdown-item mt-1" id="btnOpenOnLoadJavaScript" onClick={this.openFormOnloadJavaScriptCode}> 
                                                    <span className="nav-text">{Lang.AddEditFormDesign.onLoadJavaScript}<i className="fa fa-code float-right mt-1"></i></span>
                                                </a>
                                                <a className="dropdown-item mt-1" id="btnOpenStyleSheet" onClick={this.openFormOnloadStyleSheet}> 
                                                    <span className="nav-text">{Lang.AddEditFormDesign.openStyleSheet}<i className="fa fa-css3 float-right mt-1"></i></span>
                                                </a>
                                                <a className="dropdown-item mt-1" id="btnOpenBeforeCode" onClick={this.openOnEntryForm}> 
                                                    <span className="nav-text">{Lang.AddEditFormDesign.openBeforeCode}<i className="fa fa-code float-right mt-1"></i></span>
                                                </a>
                                                <a className="dropdown-item mt-1" id="btnOpenAfterCode" onClick={this.openOnExitForm}> 
                                                    <span className="nav-text">{Lang.AddEditFormDesign.openAfterCode}<i className="fa fa-code float-right mt-1"></i></span>
                                                </a>
                                                <Link to={BpmsConfig.currentPage() + "/PreviewForm/" + this.state.Model.ID} target="_blank" className="dropdown-item mt-1">
                                                    <span className="nav-text">{Lang.AddEditFormDesign.preview}<i className="fa fa-wpforms float-right mt-1"></i></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-toolbar card-icons">
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 rowDashboard" title="Row">
                                            <i className="fad fa-align-justify"></i>
                                        </a>
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 accordionDashboard" title="Accordion">
                                            <i className="fad fa-align-justify"></i>
                                        </a>
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 buttonDashboard" title="Button">
                                            <i className="fad fa-hand-point-up"></i>
                                        </a>
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 inputDashboard" title="Input">
                                            <i className="fad fa-font"></i>
                                        </a>
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 comboSearchDashboard" title="Combo Search">
                                            <i className="fad fa-list-ul"></i>
                                        </a>
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 dropDownListDashboard" title="Drop Down List" >
                                            <i className="fad fa-list-ul"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 radioButtonListDashboard" title="Radio Button List" >
                                            <i className="fad fa-circle-notch"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 checkBoxListDashboard" data-toggle="tooltip" title="Check Box List" >
                                            <i className="fad fa-check-double"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 checkBoxDashboard" data-toggle="tooltip" title="CheckBox" >
                                            <i className="fad fa-check-square"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 fileUploaderDashboard" data-toggle="tooltip" title="File Uploader" >
                                            <i className="fad fa-upload"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 imageDashboard" data-toggle="tooltip" title="Image" >
                                            <i className="fad fa-image"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 linkDashboard" data-toggle="tooltip" title="Link" >
                                            <i className="fad fa-link"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 captchaGoogleDashboard" data-toggle="tooltip" title="Captcha" >
                                            <i className="fad fa-shield-check"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 captchaWordDashboard" data-toggle="tooltip" title="Captcha Word" >
                                            <i className="fad fa-shield"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 titleDashboard" data-toggle="tooltip" title="Title" >
                                            <i className="fad fa-heading"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 datePickerDashboard" data-toggle="tooltip" title="DatePicker" >
                                            <i className="fad fa-calendar-times"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 ckEditorDashboard" data-toggle="tooltip" title="CkEditor" >
                                            <i className="fad fa-text-size"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 htmlCodeDashboard" data-toggle="tooltip" title="HtmlCode" >
                                            <i className="fad fa-file-code"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 downloadLinkDashboard" data-toggle="tooltip" title="Download Link" >
                                            <i className="fad fa-download"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 dataGridDashboard" data-toggle="tooltip" title="DataGrid" >
                                            <i className="fad fa-table"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 chartDashboard" data-toggle="tooltip" title="Chart" >
                                            <i className="fad fa-analytics"></i>
                                        </a >
                                        <a className="btn btn-sm btn-icon btn-light-primary ml-2 dataFormDashboard" data-toggle="tooltip" title="Form" >
                                            <i className="fad fa-window"></i>
                                        </a >
                                        <a href="#" className="btn btn-sm btn-icon btn-light-primary ml-2 portlet-maximize">
                                            <i className="fad fa-expand-alt portlet-icons"></i>
                                        </a>
                                    </div >
                                </div>
                                <div className="card-body portlet-scroll">
                                    <div className="row">
                                        <div className="col-xl-12 m-0 p-0">
                                            <div className="edit toolbox-reset">
                                                <div className="fg-el-container">
                                                    <div className="fg-el-placeholder">
                                                        <div id="content" fg_element_type="CONTENT" className="fg-content demo col-sm-12 m-0">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="divDynamicFormContainer">

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal fade" id="settingElementPopUp" role="dialog">
                            <div className="modal-dialog modal-dialog-centered modal-windows modal-xxlg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{Lang.AddEditFormDesign.setting}</h5>
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

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button id="btnSetElementAttributes_EditPopUp" type="button" data-dismiss="modal" className="btn btn-primary font-weight-bold">
                                            {Lang.Shared.apply}
                                        </button>
                                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">
                                            {Lang.Shared.cancel}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divSelectVariable" className="modal fade" role="dialog">
                            {this.state.OpenSelectVariable &&
                                <SelectVariable isListVariable={this.state.IsListVariable} selectedVariable={this.state.SelectedVariable}
                                    processId={this.state.Model.ProcessId} applicationPageId={this.state.Model.ApplicationPageID}></SelectVariable>}
                        </div>
                        <div id="divAddEditStyle" className="modal fade" role="dialog">
                            {this.state.OpenAddEditStyle && <AddEditStyleSheet callBack={this.callBackFromStyle} dynamicFormId={this.state.Model.ID}></AddEditStyleSheet>}
                        </div>
                        <div id="divAddEditJavaScript" className="modal fade" role="dialog">
                            {this.state.OpenAddEditJavaScript && <AddEditJavaScript callBack={this.state.IsForControlEvent ? this.state.JavaCallBack : this.onLoadJavaScriptCodeCallBack} isForControlEvent={this.state.IsForControlEvent}
                                code={this.state.JavaCode} dynamicFormId={this.state.Model.ID}></AddEditJavaScript>}
                        </div>
                        <div id="divDesignCode" className="modal fade" role="dialog">
                            {this.state.OpenAddEditDesignCode && <DesignCodeForm callBack={this.state.DesignCodeCallBack} loadType={this.state.DesignCodeType}
                                isOnExitForm={this.state.IsOnExitForm} dynamicFormId={this.state.Model.ID} designCode={this.state.DesignCode} codeType={this.state.CodeType}
                                processId={this.state.Model.ProcessId} applicationPageId={this.state.Model.ApplicationPageID}></DesignCodeForm>}

                            {this.state.OpenConditionForm && <ConditionForm callBack={this.state.DesignCodeCallBack}
                                dynamicFormId={this.state.Model.ID} designCode={this.state.DesignCode} openDirectly={true}
                                processId={this.state.Model.ProcessId} applicationPageId={this.state.Model.ApplicationPageID}></ConditionForm>}

                        </div>
                        <div id="divEditApplicationPage" className="modal fade" role="dialog">
                            {this.state.OpenEditApplicationPage &&
                                <EditApplicationPage applicationPageId={this.state.Model.ApplicationPageID}></EditApplicationPage>}
                        </div>
                        <div id="divVariableListPage" className="modal fade" role="dialog">
                            {this.state.OpenVariableListPage &&
                                <VariableList processId={this.state.Model.ProcessId} applicationPageId={this.state.Model.ApplicationPageID}></VariableList>}
                        </div>
                        <div id="divAddDynamicForm" className="modal fade" role="dialog">
                            {this.state.OpenAddDynamicForm &&
                                <AddDynamicForm callBack={this.callBackAddDynamicForm} processId={this.state.Model.ProcessId} addEditId={this.state.Model.ID}  ></AddDynamicForm>}
                        </div>
                    </React.Fragment>
                }

            </div>
        );
    }
}

export default AddEditFormDesign;

