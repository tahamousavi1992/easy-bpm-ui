import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import SelectTypeControl from './SelectTypeControl';
import SelectTypeValue from './SelectTypeValue';
import Lang from '../../../Shared/AdminLang/Lang';

class CallMethodForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSetControl = this.validateSetControl.bind(this);
        this.setRequiredCss = this.setRequiredCss.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadCallMethodForm(this.props);
        await this.setState({ ...data });
        this.setRequiredCss();
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //add submit function to actionList.js save event
        this.props.setSaveFunction(this.submitForm);
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    //it is called with ActionList.js submit function
    //name parameter is name field of ActionList.js form.
    submitForm(name, funcName) {
        if (window.bpmsFormIsValid()) {
            let containerDiv = document.getElementById('divAddEditCallMethodModal');
            let rows = '';
            document.getElementById('tblMethodParaetersModel').tBodies[0].querySelectorAll('tr').forEach(function (item) {
                let parameterName = item.querySelector('#txtParameterName').value;
                let valueType = item.querySelector('#txtSelectedValueType').getAttribute('data-type');
                let value = item.querySelector('#txtSelectedValueType').getAttribute('data-value');
                rows +=
                    `<DCMethodParaetersModel>
<ParameterName>${parameterName}</ParameterName>
<ValueType>${valueType}</ValueType>
<Value>${value}</Value>
</DCMethodParaetersModel>`;
            });
            let code = `<DCCallMethodModel>
<ID>${this.state.Model.ID}</ID> 
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID> 
<Name>${name}</Name> 
<FuncName>${funcName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType> 
<MethodGroupType>${this.state.Model.MethodGroupType}</MethodGroupType>
<MethodID>${this.state.Model.MethodID}</MethodID>
<RetVariableName>${containerDiv.querySelector('#RetVariableName').value}</RetVariableName>
<Rows>${rows}</Rows>
</DCCallMethodModel>`;
            if (!this.validateSetControl()) {
                return false;
            }
            return code;
        }
    }


    validateSetControl() {
        let result = true;
        document.getElementById('tblMethodParaetersModel').tBodies[0].querySelectorAll('tr').forEach(function (item, index) {
            let selectValueType = item.querySelector('#txtSelectedValueType');
            let dataType = selectValueType.getAttribute('data-type');
            let dataValue = selectValueType.getAttribute('data-value');
            if (dataType == null || dataType == '') {
                UtilityService.showMessage('error', `Selecting the type in line ${index + 1} is required.`);
                result = false;
            }
            if ((dataValue == null || dataValue == '') && selectValueType.classList.contains('required-field')) {
                UtilityService.showMessage('error', `Selecting the value in line ${index + 1} is required.`);
                result = false;
            }
        });
        return result;
    }

    async setRequiredCss() {
        let containerDiv = document.getElementById('divAddEditCallMethodModal');
        let tableElement = containerDiv.querySelector('#tblMethodParaetersModel');
        let selectedMethod = null;
        //Get selected dropdown method
        containerDiv.querySelectorAll('#divMethods select').forEach((item) => { if (item.style.display == '') { selectedMethod = item } });
 
        if (selectedMethod != null && selectedMethod.value != '-1') {
            let option = selectedMethod.options[selectedMethod.selectedIndex];
            option.getAttribute('data-parameters').split(',').forEach(function (item) {
                //According to parameter setting ,It adds required-field class name to parameter input in table
                if (item.split(':').length == 3 && item.split(':')[2] == "Required") {
                    tableElement.querySelectorAll('#txtParameterName').forEach((element) => {
                        if (element.value == item.split(':')[0]) {
                            element.closest('tr').querySelector('#txtSelectedValueType').classList.add('required-field')
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <div className="form" id="divAddEditCallMethodModal">
                {
                    this.state.Model &&
                    <React.Fragment>
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.CallMethodForm.variable}</label>
                                <VariableControl name="RetVariableName" value={this.state.Model.RetVariableName} />
                            </div> 
                        </div>
                        <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                            <div className="table-information table-responsive">
                                <table id="tblMethodParaetersModel" className="table">
                                    <thead>
                                        <tr>
                                            <th>{Lang.CallMethodForm.tbl_th_Parameter}</th>
                                            <th>{Lang.CallMethodForm.tbl_th_Value}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.Rows &&
                                            this.state.Model.Rows.map((item, index) => {
                                                return <tr key={index} className="text-center" >

                                                    <td>
                                                        <input id="txtParameterName" readOnly={true} type="text" defaultValue={item.ParameterName} className="form-control" />
                                                    </td>
                                                    <td>
                                                        <SelectTypeControl ContainerID="divCM_SelectTypeValue" Value={item.Value} ValueType={item.ValueType}
                                                            ParentShapeID={this.state.Model.ParentShapeID} ShapeID={this.state.Model.ShapeID}
                                                            IsOutputYes={this.state.Model.IsOutputYes} DynamicFormId={this.state.DynamicFormId} />
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
                <div id="divCM_SelectTypeValue" className="modal fade" role="dialog">
                    <SelectTypeValue processId={this.props.ProcessId} applicationPageId={this.props.ApplicationPageId} containerID="divCM_SelectTypeValue" ProcessControls={this.state.ProcessControls} />
                </div>
            </div>
        );
    }
}

export default CallMethodForm;

