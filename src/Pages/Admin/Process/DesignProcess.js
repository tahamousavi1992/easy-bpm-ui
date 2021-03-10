import React from 'react';
import ProcessService from '../../../Services/ProcessService';
import UtilityService from '../../../Services/UtilityService';
import UserTaskIndex from './UserTaskIndex';
import SelectVariable from '../Variable/SelectVariable'
import DesignCodeForm from '../DesignCode/DesignCodeForm'
import TaskService from '../../../Services/TaskService';
import AddEditEvent from '../Event/AddEditEvent';
import GatewayManagment from './GatewayManagment';
import Lang from '../../../Shared/AdminLang/Lang';
import EditProcess from './EditProcess';
import VariableList from '../Variable/VariableList'
import BpmsConfig from '../../../Shared/BpmsConfig'
import { Link } from "react-router-dom"
const $ = window.$;
const userTaskPathIcon = 'm 15,12';
const serviceTasPathIcon = 'm 12,18';
const scriptPathIcon = 'm 15,20';
const parallelPathIcon = 'm 23,10';
var taskId = '-1'; // None of user tasks are selected
var gatewayId = '-1';
var laneId = '-1';
var eventId = '-1';

class DesignProcess extends React.Component {
    constructor() {
        super();
        this.state = {
            Model: {}
        };
        this.saveDesignXml = this.saveDesignXml.bind(this);
        this.setConfigBpmnModeler = this.setConfigBpmnModeler.bind(this);
        this.openTaskManagement = this.openTaskManagement.bind(this);
        this.openSelectVariable = this.openSelectVariable.bind(this);
        this.openServiceTaskManagement = this.openServiceTaskManagement.bind(this);
        this.serviceTaskCodeCallBack = this.serviceTaskCodeCallBack.bind(this);
        this.openEventManagement = this.openEventManagement.bind(this);
        this.openConditionManagement = this.openConditionManagement.bind(this);
        this.openEditProcess = this.openEditProcess.bind(this);
        this.callBackEditProcess = this.callBackEditProcess.bind(this);
        this.openVariableListPage = this.openVariableListPage.bind(this);
        this.inActiveProcess = this.inActiveProcess.bind(this);
        this.loadForm = this.loadForm.bind(this);
    }

    async componentDidMount() {
        window.openVariableList = this.openSelectVariable;
        this.props.setPageCaption(2, [Lang.Menu.DesignProcess, Lang.Menu.ProcessList, Lang.Menu.management], true, this.props.match.params.Id, null, this.backToFunction);
        window.setConfigBpmnModeler = this.setConfigBpmnModeler;

        //if languages file was loaded before, call loadForm.
        if (window.BpmnIoLang != null)
            this.loadForm();
        else
            window.addEventListener('load', this.loadForm);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    backToFunction = () => {
        this.props.history.push(BpmsConfig.currentPage() + "/ProcessList");
    }

    async loadForm() {
        //This function is defined in bpmn-modeler.development.js and due to window.BpmnIoLang null refrence is loaded after all.
        window.load_process_designer();
        //load data 
        let data = await new ProcessService().getDesignerIndex(this.props.match.params.Id);
        window.processDesignerModel = data;
        await this.setState({ ...data });

        try {
            window.setConfigBpmnModeler();
            let delayTime = 2;
            setTimeout(function () {
                window["bpmnModeler"].get('canvas').zoom('fit-viewport', 'auto');
            }, delayTime);
        }
        catch {

        }

        $('body').on("click", function (e) {

            var element = e.target;
            // Check click on operation links
            if ($(element).attr('id') == 'lnkShowUseTask'
                || $(element).attr('id') == 'lnkShowConditionManagement'
                || $(element).attr('id') == 'lnkShowEventManagement'
                || $(element).attr('id') == 'lnkShowServiceTaskManagement')
                return;

            var el = element.closest('.djs-element');
            if ($(element).hasClass('djs-element')) {
                el = element;
            }
            $('#lnkShowUseTask').hide();
            $('#lnkShowConditionManagement').hide();
            $('#lnkShowEventManagement').hide();
            $('#lnkShowServiceTaskManagement').hide();
            if (el) {
                let dataElementId = $(el).attr('data-element-id');
                if (dataElementId) {
                    let elementG = document.querySelector(`[data-element-id="${dataElementId}"]`);
                    let dAttrElement = elementG.querySelector('path[d^="m 15,12"],path[d^="m 12,18"],path[d^="m 15,20"],path[d^="m 23,10"]');
                    let dAttr = dAttrElement != null ? dAttrElement.getAttribute('d') : '';

                    if (dataElementId.indexOf("Task_") != -1 || dataElementId.startsWith("Activity_")) {
                        if (dAttr.startsWith(userTaskPathIcon)) {
                            $('#lnkShowUseTask').show();
                            taskId = dataElementId;
                            return;
                        }
                    }
                    if (dataElementId.indexOf("Task_") != -1 || dataElementId.startsWith("Activity_")) {
                        if (dAttr.startsWith(serviceTasPathIcon) || dAttr.startsWith(scriptPathIcon) || dAttr == '') {
                            $('#lnkShowServiceTaskManagement').show();
                            taskId = dataElementId;
                            return;
                        }
                    }
                    if (dataElementId.startsWith("ExclusiveGateway_") || dataElementId.startsWith("InclusiveGateway_") || dataElementId.startsWith("Gateway_")) {
                        if (dAttr == '' || !dAttr.startsWith(parallelPathIcon)) {
                            $('#lnkShowConditionManagement').show();
                            gatewayId = dataElementId;
                            return;
                        }
                    }
                    if (dataElementId.startsWith("Event_") || dataElementId.startsWith("StartEvent_") || dataElementId.startsWith("EndEvent_")) {
                        $('#lnkShowEventManagement').show();
                        eventId = dataElementId;
                        return;
                    }
                }
            }
        });
    }

    saveDesignXml(callBack) {
        let processId = this.state.ID;
        window["bpmnModeler"].saveXML({ format: true }, function (err, xml) {
            if (err) {
                console.error('diagram save failed', err);
            } else {
                new ProcessService().designerPostEdit({
                    ID: processId,
                    DiagramXML: xml
                }).then(result => {
                    if (result.ResultType == 'success') {
                        if (callBack != null && (typeof callBack) != 'object')
                            callBack();
                        else
                            UtilityService.showMessage(result.ResultType, result.Message);
                    }
                    else UtilityService.showMessage(result.ResultType, result.Message);
                });
            }
        });
    }

    setConfigBpmnModeler() {
        (function (BpmnModeler, $) {
            // create modeler
            window["bpmnModeler"] = new BpmnModeler({
                container: '#canvas'
            });
            // import function
            function importXML(xml) {
                // import diagram
                window["bpmnModeler"].importXML(xml, function (err) {
                    if (err) {
                        return console.error('could not import BPMN 2.0 diagram', err);
                    }
                    // zoom to fit full viewport
                    window["bpmnModeler"].get('canvas').zoom('fit-viewport', 'auto');
                });
            }
            // import xml
            importXML(window.processDesignerModel.DiagramXML);

        })(window.BpmnJS, window.jQuery);
    }

    async openTaskManagement(saveXml) {
        if (saveXml) {
            this.saveDesignXml(this.openTaskManagement);
        }
        else {
            //to reload modal form i had two hide&show component to reload that
            await this.setState({ OpenUserTaskIndex: false, ElementId: taskId });
            await this.setState({ OpenUserTaskIndex: true });
            window.openModal('taskManagement', true);
        }
    }

    async openServiceTaskManagement(saveXml) {
        if (saveXml) {
            this.saveDesignXml(this.openServiceTaskManagement);
        }
        else {
            //to reload modal form i had two hide&show component to reload that
            await this.setState({ OpenServiceTask: false, ElementId: taskId });
            await this.setState({ OpenServiceTask: true });
            window.openModal('divDesignCode', true);
        }
    }

    async serviceTaskCodeCallBack(designCode, code) {
        let data = { ProcessId: this.state.ID, DesignCode: designCode, ElementId: taskId };
        let result = await new TaskService().postAddEditServiceTask(data);
        UtilityService.showMessage(result.ResultType, result.Message);
        return result.ResultType == 'success';
    }

    async openEventManagement(saveXml) {
        if (saveXml) {
            this.saveDesignXml(this.openEventManagement);
        }
        else {
            //to reload modal form i had two hide&show component to reload that
            await this.setState({ OpenAddEditEvent: false, ElementId: eventId });
            await this.setState({ OpenAddEditEvent: true });
            window.openModal('divEvent', true);
        }
    }

    async openSelectVariable(target) {
        window.selectedTarget = (target.tagName == "A" || target.tagName == "I") ? target.closest('.input-group').querySelector('input') : target;
        await this.setState({
            SelectedVariable: (window.selectedTarget.value == null ? '' : window.selectedTarget.value),
            IsListVariable: window.selectedTarget.getAttribute('data-isListVariable') == 'true',
            OpenSelectVariable: false
        });
        await this.setState({ OpenSelectVariable: true });
        window.openModal('divSelectVariable', true);
    }

    async openConditionManagement(saveXml) {
        if (saveXml) {
            this.saveDesignXml(this.openConditionManagement);
        }
        else {
            debugger;
            //to reload modal form i had two hide&show component to reload that
            await this.setState({ OpenGatewayManagment: false, ElementId: gatewayId });
            await this.setState({ OpenGatewayManagment: true });
            window.openModal('conditionManagement', true);
        }
    }

    async openEditProcess() {
        //to reload modal form I had to hide&show component to reload that
        await this.setState({ OpenEditProcess: false });
        await this.setState({ OpenEditProcess: true });
        window.openModal('divEditProcess', true);
    }

    async callBackEditProcess(name) {
        window.closeModal('divEditProcess');
        this.setState({ Name: name });
    }

    //the variable list page -> Variable -> VariableList.js
    async openVariableListPage() {
        //to reload modal form I had to hide&show component to reload that
        await this.setState({ OpenVariableListPage: false });
        await this.setState({ OpenVariableListPage: true });
        window.openModal('divVariableListPage', true);
    }

    async inActiveProcess() {
        let result = await new ProcessService().inActive(this.state.ID);
        UtilityService.showMessage(result.ResultType, result.Message);
        this.loadForm();
    }

    render() {
        return (
            <div>
                <div className="row process-chart">
                    <div className="col-xl-12">
                        <div className="card card-custom  portlet-windows">
                            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                <div className="card-title">
                                    <h3 className="card-label">
                                        {this.state.Name && (" Diagram " + this.state.Name + "(" + this.state.FormattedNumber + ")")}
                                    </h3>
                                </div>
                                <div className="card-toolbar card-icons card-icons-modal">

                                    <button type="button" className="btn btn-success font-weight-bolder" id="lnkShowUseTask" onClick={() => { this.openTaskManagement(true); }} style={{ display: "none" }}>
                                        {Lang.DesignProcess.activitySetting}
                                    </button>
                                    <button type="button" className="btn btn-success font-weight-bolder" id="lnkShowConditionManagement" onClick={() => { this.openConditionManagement(true); }} style={{ display: "none" }}>
                                        {Lang.DesignProcess.conditionSetting}
                                    </button>
                                    <button type="button" className="btn btn-success font-weight-bolder" id="lnkShowServiceTaskManagement" onClick={() => { this.openServiceTaskManagement(true); }} style={{ display: "none" }}>
                                        {Lang.DesignProcess.codeSetting}
                                    </button>
                                    <button type="button" className="btn btn-success font-weight-bolder" id="lnkShowEventManagement" onClick={() => { this.openEventManagement(true); }} style={{ display: "none" }}>
                                        {Lang.DesignProcess.eventSetting}
                                    </button>
                                    <div className="dropdown ml-2">
                                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {Lang.DesignProcess.actions}
                                        </button>
                                        <div className="dropdown-menu" style={{ minWidth: '140px' }} aria-labelledby="dropdownMenuButton">
                                            {
                                                this.state.AllowEdit &&
                                                <a className="dropdown-item mt-1" id="btnOpenEditInfo" onClick={this.saveDesignXml}>
                                                    <span className="nav-text">{Lang.DesignProcess.saveForm}<i className="fa fa-save float-right mt-1"></i></span>
                                                </a>
                                            }
                                            {
                                                //is Published
                                                this.state.StatusLU == 2 &&
                                                <a className="dropdown-item mt-1" title={Lang.DesignProcess.stop} onClick={this.inActiveProcess} >
                                                    <span className="nav-text">{Lang.DesignProcess.stop}<i className="fa fa-stop float-right mt-1"></i></span>
                                                </a>
                                            }
                                            <a className="dropdown-item mt-1" id="btnOpenEditProcess" onClick={this.openEditProcess}>
                                                <span className="nav-text">{Lang.DesignProcess.openEditProcess}<i className="fa fa-wpforms float-right mt-1"></i></span>
                                            </a>
                                            <Link to={BpmsConfig.currentPage() + `/ProcessFormList/${this.state.ID}`} className="dropdown-item mt-1">
                                                <span className="nav-text">{Lang.DesignProcess.forms} <i className="fa fa-arrow-right float-right mt-1"></i></span>
                                            </Link>
                                            <a className="dropdown-item mt-1" id="btnOpenVariableList" onClick={this.openVariableListPage}>
                                                <span className="nav-text">{Lang.DesignProcess.openVariables}<i className="fa fa-wpforms float-right mt-1"></i></span>
                                            </a>
                                        </div>
                                    </div>

                                    <a href="#" className="btn btn-sm btn-icon btn-light-primary ml-2 portlet-maximize">
                                        <i className="fad fa-expand-alt portlet-icons"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div id="canvas" style={{ border: '1px solid', height: '600px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="taskManagement" data-backdrop="true" className="modal fade" role="dialog">
                    {this.state.OpenUserTaskIndex && <UserTaskIndex processId={this.state.ID} elementId={this.state.ElementId} ></UserTaskIndex>}
                </div>
                <div id="conditionManagement" className="modal fade" role="dialog">
                    {this.state.OpenGatewayManagment && <GatewayManagment processId={this.state.ID} elementId={this.state.ElementId} ></GatewayManagment>}
                </div>
                <div id="divDesignCode" className="modal fade" role="dialog">
                    {this.state.OpenServiceTask && <DesignCodeForm callBack={this.serviceTaskCodeCallBack} loadType={3}
                        elementId={this.state.ElementId} processId={this.state.ID}></DesignCodeForm>}

                </div>
                <div id="divEvent" className="modal fade" role="dialog">
                    {this.state.OpenAddEditEvent && <AddEditEvent processId={this.state.ID} elementId={this.state.ElementId} ></AddEditEvent>}
                </div>
                <div id="divSelectVariable" className="modal fade" role="dialog">
                    {this.state.OpenSelectVariable &&
                        <SelectVariable isListVariable={this.state.IsListVariable} selectedVariable={this.state.SelectedVariable}
                            processId={this.state.ID} ></SelectVariable>}
                </div>
                <div id="divEditProcess" className="modal fade" role="dialog">
                    {this.state.OpenEditProcess &&
                        <EditProcess processId={this.state.ID} callBack={this.callBackEditProcess}></EditProcess>}
                </div>
                <div id="divVariableListPage" className="modal fade" role="dialog">
                    {this.state.OpenVariableListPage &&
                        <VariableList processId={this.state.ID}></VariableList>}
                </div>
            </div>
        );
    }
}

export default DesignProcess;

