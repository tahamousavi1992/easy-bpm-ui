import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import SelectTypeControl from './SelectTypeControl';
import SelectTypeValue from './SelectTypeValue';
import Lang from '../../../Shared/AdminLang/Lang';

class SetControlForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSetControl = this.validateSetControl.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addControlRow = this.addControlRow.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadSetControlForm(this.props);
        await this.setState({ ...data });
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //add submit function to actionList.js save event
        this.props.setSaveFunction(this.submitForm);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async removeRow(event) {
        event.target.closest('tr').remove();
    }

    async addControlRow() {
        let cloneRow = document.getElementById('tblCloneSetControlRow').querySelector('tr').cloneNode(true);
        document.getElementById('tblSetControl').tBodies[0].appendChild(cloneRow);
        cloneRow.querySelector('#btnDelete').onclick = this.removeRow;
    }

    //it is called with ActionList.js submit function
    //name parameter is name field of ActionList.js form.
    submitForm(name, funcName) {
        if (window.bpmsFormIsValid()) {
            let containerDiv = document.getElementById('divAddEditSetControlModal');
            let rows = '';
            containerDiv.querySelector('#tblSetControl').tBodies[0].querySelectorAll('tr').forEach(function (item) {
                let controlId = item.querySelector('#ddlSetControlId').value;
                let value = item.querySelector('#txtSelectedValueType').getAttribute('data-value');
                let valueType = item.querySelector('#txtSelectedValueType').getAttribute('data-type');

                rows +=
                    `<DCRowSetControlModel>
<ControlId>${controlId}</ControlId>
<ValueType>${valueType}</ValueType>
<Value>${value}</Value>
</DCRowSetControlModel>`;
            }); 
             
            let code = `<DCSetControlModel>
<ID>${this.state.Model.ID}</ID>
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID>
<Name>${name}</Name>
<FuncName>${funcName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
<Rows>${rows}</Rows>
</DCSetControlModel>`;
            if (!this.validateSetControl()) {
                return false;
            }
            return code;
        }
    }
     
    validateSetControl() {
        let result = true;
        document.getElementById('tblSetControl').tBodies[0].querySelectorAll('tr').forEach(function (item) {
            if (item.querySelector('#ddlSetControlId').value == '') {
                UtilityService.showMessage('error', `Control is required.`);
                result = false;
            }

            if (item.querySelector('#txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Value is required.`);
                result = false;
            }
        });
        return result;
    }

    render() {
        return (
            <div className="form" id="divAddEditSetControlModal">
                {
                    this.state.Model &&
                    <React.Fragment> 
                        <div className="bpms-table bpms-table-bordered  bpms-table-default">
                            <div className="table-information table-responsive">
                                <table id="tblCloneSetControlRow" style={{ display: "none" }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Select name="ddlSetControlId" id="ddlSetControlId" defaultValue=''
                                                    listItem={this.state.ProcessControls} optionKey="Key" optionLabel="Value" />
                                            </td>
                                            <td>
                                                <SelectTypeControl ContainerID="divSC_SelectTypeValue" Value='' ValueType='2'
                                                    ParentShapeID={this.state.Model.ParentShapeID} ShapeID={this.state.Model.ShapeID}
                                                    IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.DynamicFormId} />
                                            </td>
                                            <td>
                                                <button id="btnDelete" type="button" className="btn btn-sm btn-clean btn-icon">
                                                    <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id="tblSetControl" className="table">
                                    <thead>
                                        <tr>
                                            <th>{Lang.SetControlForm.control}</th>
                                            <th>{Lang.SetControlForm.value}</th>
                                            <th style={{ width: "5%" }} >{Lang.SetControlForm.delete}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.Rows &&
                                            this.state.Model.Rows.map((item, index) => {
                                                return <tr key={index} className="text-center" >
                                                    <td>
                                                        <Select name="ddlSetControlId" id="ddlSetControlId" defaultValue={item.ControlId || ''}
                                                            listItem={this.state.ProcessControls} optionKey="Key" optionLabel="Value" />
                                                    </td>
                                                    <td>
                                                        <SelectTypeControl ContainerID="divSC_SelectTypeValue" Value={item.Value} ValueType={item.ValueType}
                                                            ParentShapeID={this.state.Model.ParentShapeID} ShapeID={this.state.Model.ShapeID}
                                                            IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.DynamicFormId} />
                                                    </td>
                                                    <td>
                                                        <button id="btnDelete" onClick={this.removeRow} type="button" className="btn btn-sm btn-clean btn-icon">
                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            })
                                        } 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <button id="btnAddSetControlRow" onClick={this.addControlRow} type="button" className="btn btn-danger">
                                    {Lang.SetControlForm.add}
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                }
                <div id="divSC_SelectTypeValue" className="modal fade" role="dialog">
                    <SelectTypeValue processId={this.props.ProcessId} applicationPageId={this.props.ApplicationPageId} containerID="divSC_SelectTypeValue" ProcessControls={this.state.ProcessControls} />
                </div>
            </div>
        );
    }
}

export default SetControlForm;

