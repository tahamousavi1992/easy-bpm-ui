import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import ConditionForm from './ConditionForm';
import ActionList from './ActionList';
import ExpressionCodeForm from './ExpressionCodeForm';
import Lang from '../../../Shared/AdminLang/Lang';

class BusinessRuleDiagram extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.loadForm = this.loadForm.bind(this);
        this.draw2dToExpression = this.draw2dToExpression.bind(this);
        this.openExpressionForm = this.openExpressionForm.bind(this);
        this.openConditionForm = this.openConditionForm.bind(this);
        this.openActionList = this.openActionList.bind(this);
        this.getDataForBusinessRule = this.getDataForBusinessRule.bind(this);

    }

    async componentDidMount() {
        await this.setState({ ...this.props });
        this.loadForm();
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async loadForm() {
        //is used in designCode.js file
        window.draw2dToExpression = this.draw2dToExpression;
        window.openExpressionForm = this.openExpressionForm;
        window.openConditionForm = this.openConditionForm;
        window.openActionList = this.openActionList;

        window.designCodeData = this.state.DesignCodeData;
        window.bpmsDesignCodeModel = this.state;
        setTimeout(function () {
            window.draw2dInit();
            if (window.bpmsDesignCodeModel.Diagram == null || window.bpmsDesignCodeModel.Diagram == '') {
                window.draw2dAddNextAction(window.draw2dAddStartCircle(), 'New Action', null);
            }
            else {
                let obj = JSON.parse(window.bpmsDesignCodeModel.Diagram);
                window.draw2dLoadFromJsonObject(obj);
            }
        }, 500);
    }

    //it will open _ConditionForm
    async openActionList(shapeId) {
        let data = await this.getDataForBusinessRule(shapeId);
        //adding current data xml to data parameter
        //only one acction fit the condition.
        window["designCodeData"].forEach(function (item) {
            if (item.shapeId == shapeId) {
                data.Action = item.data;
            }
        });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenActionListForm: false, Data: data, OpenConditionForm: false, OpenExpressionCodeForm: false });
        await this.setState({ OpenActionListForm: true });
        window.openModal('divAddEditBusinessRule', true);
    }

    //it will open _ConditionForm
    async openConditionForm(shapeId) {
        let data = await this.getDataForBusinessRule(shapeId);
        //adding current data xml to data parameter
        window["designCodeData"].forEach(function (item, index) {
            if (item.shapeId == shapeId) {
                data['Data'] = item.data;//base64 xml condition
            }
        });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenConditionForm: false, Data: data, OpenActionListForm: false, OpenExpressionCodeForm: false });
        await this.setState({ OpenConditionForm: true });
        window.openModal('divAddEditBusinessRule', true);
    }

    //it will open _ConditionForm
    async openExpressionForm(shapeId) {
        let data = await this.getDataForBusinessRule(shapeId);
        //adding current data xml to data parameter
        window.designCodeData.forEach(function (item, index) {
            if (item.shapeId == shapeId) {
                data['Data'] = item.data;//base64 xml condition
            }
        });
        //to reload modal form i had two hide&show component to reload that
        await this.setState({ OpenConditionForm: false, Data: data, OpenActionListForm: false, OpenExpressionCodeForm: false });
        await this.setState({ OpenExpressionCodeForm: true });
        window.openModal('divAddEditBusinessRule', true);
    }

    //get shared data for sending to server for loading rules forms
    async getDataForBusinessRule(shapeId) {
        let parentShapeId = window.draw2dFindParentShapeNodeId(shapeId);
        let isFirst = window.draw2dIsFirstStep(shapeId);
        let isOutputYes = window.draw2dFindParentIsYesCondition(shapeId);
        let shapeName = window.draw2dCanvas.getFigure(shapeId).userData.name;
        let data = {
            IsFirst: isFirst,
            ShapeId: shapeId,
            DynamicFormId: this.state.DynamicFormID,
            Name: (shapeName == undefined || shapeName == null) ? '' : shapeName,
        };
        if (isOutputYes != null) {
            data.IsOutputYes = isOutputYes;
        }
        if (parentShapeId != null && parentShapeId != '') {
            data.ParentShapeId = parentShapeId;
        }
        data.ProcessId = this.props.processId;
        data.ApplicationPageId = this.props.applicationPageId
        return data;
    }

    //convert a action shape to expression one.
    async draw2dToExpression(figure) {
        let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        let parentShapeId = window.draw2dFindParentShapeNodeId(figure.id);
        let xmlCode = `<ArrayOfObjects>${window.draw2dGetXml(figure.id)}</ArrayOfObjects>`;
        xmlCode = xmlCode.replaceAll('<IsFirst>false</IsFirst>', '<IsFirst>true</IsFirst>');

        let result = await new DesignCodeService().doRenderCode(xmlCode, this.props.processId, this.props.applicationPageId, false, false);

        let code = `<DCExpressionModel>
<ID>${guid}</ID>
<ParentShapeID>${parentShapeId}</ParentShapeID>
<IsFirst>true</IsFirst>
<ShapeID>${figure.id}</ShapeID>
<Name>${figure.userData.name}</Name>
<IsOutputYes></IsOutputYes>
<ActionType>4</ActionType>
<Assemblies>${result.Assemblies}</Assemblies>
<ExpressionCode>${result.Code}</ExpressionCode>
</DCExpressionModel>`;
        window.draw2UpdateDiagramData([code], 'Action', figure.id);
        window.draw2dAddExpressionIcon(figure);
    }


    render() {
        return (
            <div className="form mt-3">
                <div className="alert alert-info alert-dismissible fade show">
                    <strong>Tip: </strong> {Lang.DesignCodeForm.DiagramHelp} <button type="button" className="close" data-dismiss="alert">×</button>
                </div>
                <div className="row" id="convasContainer" style={{ height: "400px" }}>
                    <div id="gfx_holder2">
                    </div>
                </div>
                <div id="divAddEditBusinessRule" className="modal fade" role="dialog">
                    {this.state.OpenActionListForm && <ActionList  {...this.state.Data}></ActionList>}
                    {this.state.OpenConditionForm && <ConditionForm  {...this.state.Data}></ConditionForm>}
                    {this.state.OpenExpressionCodeForm && <ExpressionCodeForm  {...this.state.Data}></ExpressionCodeForm>}
                </div>
                <div id="divAddEditExpression" className="modal fade" role="dialog">

                </div>
                <div id="divGoToModal" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-windows">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{Lang.BusinessRuleDiagram.caption}</h5>
                                <div className="modal-button">
                                    <button type="button" className="btn close window-maximize" data-dismiss="modal" aria-label="Close">
                                        <i className="fad fa-expand-alt modal-square"></i>
                                    </button>
                                    <button type="button" className="btn close" onClick={() => { window.closeModal('divGoToModal'); }} aria-label="Close">
                                        <i className="fa fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body modal-scroll">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.BusinessRuleDiagram.nextElement}</label>
                                        <div className="input-group">
                                            <select type="text" id="ddlDraw2dFigureId" className="form-control" autoComplete="off">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="btnSaveInfo" onClick={() => { window.draw2dSaveGoTo(); }} type="button" className="btn btn-primary font-weight-bold">
                                    {Lang.Shared.apply}
                                </button>
                                <button type="button" className="btn btn-light-primary font-weight-bold" onClick={() => { window.closeModal('divGoToModal'); }}>
                                    {Lang.Shared.cancel}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BusinessRuleDiagram;

