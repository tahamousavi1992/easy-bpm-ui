import React, { useState } from 'react';
import DesignCodeService from '../../../Services/DesignCodeService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import SelectTypeControl from './SelectTypeControl';
import SelectTypeValue from './SelectTypeValue';
import Lang from '../../../Shared/AdminLang/Lang';

class WebServiceForm extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.validateSetControl = this.validateSetControl.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addWebServiceParameterRow = this.addWebServiceParameterRow.bind(this);
        this.addWebServiceHeaderRow = this.addWebServiceHeaderRow.bind(this);
    }

    async componentDidMount() {
        let data = await new DesignCodeService().postLoadWebServiceForm(this.props);
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

    async addWebServiceParameterRow() {
        let cloneRow = document.getElementById('tblCloneRow').querySelector('tr').cloneNode(true);
        cloneRow.querySelector('#btnDelete').onclick = this.removeRow;
        document.getElementById('tblParameterModel').tBodies[0].appendChild(cloneRow);
    }

    async addWebServiceHeaderRow() {
        let cloneRow = document.getElementById('tblCloneRow').querySelector('tr').cloneNode(true);
        cloneRow.querySelector('#btnDelete').onclick = this.removeRow;
        document.getElementById('tblHeaderModel').tBodies[0].appendChild(cloneRow);
    }
    //it is called with ActionList.js submit function
    //name parameter is name field of ActionList.js form.
    submitForm(name, funcName) {
        if (window.bpmsFormIsValid()) {
            let rows = '';
            document.getElementById('tblParameterModel').tBodies[0].querySelectorAll('tr').forEach(function (item) {
                let valueType = item.querySelector('#txtSelectedValueType').getAttribute('data-type');
                let value = item.querySelector('#txtSelectedValueType').getAttribute('data-value');
                rows +=
                    `<DCRowWebServiceParameterModel>
<ValueType>${valueType}</ValueType>
<Value>${value}</Value>
<Name>${item.querySelector('#txtName').value}</Name>
<Type>0</Type>
</DCRowWebServiceParameterModel>`;
            });
            document.getElementById('tblHeaderModel').tBodies[0].querySelectorAll('tr').forEach(function (item) {
                let valueType = item.querySelector('#txtSelectedValueType').getAttribute('data-type');
                let value = item.querySelector('#txtSelectedValueType').getAttribute('data-value');

                rows +=
                    `<DCRowWebServiceParameterModel>
<ValueType>${valueType}</ValueType>
<Value>${value}</Value>
<Name>${item.querySelector('#txtName').value}</Name>
<Type>1</Type>
</DCRowWebServiceParameterModel>`;
            });
            let RetVariableName = document.querySelector('#divAddEditWebServiceModal #txtRetVariableName').value;
            let ContentType = document.querySelector('#divAddEditWebServiceModal #ddlContentType').value;
            let MethodType = document.querySelector('#divAddEditWebServiceModal #ddlMethodType').value;
            let code = `<DCWebServiceModel>
<ID>${this.state.Model.ID}</ID> 
<ParentShapeID>${this.state.Model.ParentShapeID}</ParentShapeID>
<IsFirst>${this.state.Model.IsFirst}</IsFirst>
<ShapeID>${this.state.Model.ShapeID}</ShapeID> 
<Name>${name}</Name>
<Url>${encodeURIComponent(document.querySelector('#divAddEditWebServiceModal #Url').value)}</Url>
<RetVariableName>${RetVariableName != null ? RetVariableName : ''}</RetVariableName>
<ContentType>${ContentType != null ? ContentType : ''}</ContentType>
<MethodType>${MethodType}</MethodType>
<FuncName>${funcName}</FuncName>
<IsOutputYes>${this.state.Model.IsOutputYes}</IsOutputYes>
<ActionType>${this.state.Model.ActionType}</ActionType>
<Rows>${rows}</Rows>
</DCWebServiceModel>`;

            if (!this.validateSetControl()) {
                return false;
            }
            return code;
        }
    }

    validateSetControl() {
        let result = true;
        if (document.querySelector('#divAddEditWebServiceModal #ddlMethodType').value == '') {
            UtilityService.showMessage('error', `Method Type is required.`);
            result = false;
        }

        document.getElementById('tblParameterModel').tBodies[0].querySelectorAll('tr').forEach(function (item, index) {
            if (item.querySelector('#txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Selecting the value in line ${index + 1} is required.`);
                result = false;
            }
        });
        document.getElementById('tblHeaderModel').tBodies[0].querySelectorAll('tr').forEach(function (item, index) {
            if (item.querySelector('#txtSelectedValueType').getAttribute('data-type') == '') {
                UtilityService.showMessage('error', `Selecting the value in line ${index + 1} is required.`);
                result = false;
            }
        });
        return result;
    }

    render() {
        return (
            <div className="form" id="divAddEditWebServiceModal">
                {
                    this.state.Model &&
                    <React.Fragment>
                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.WebServiceForm.url}</label>
                                <div className="input-group">
                                    <input onChange={this.handelChange} defaultValue={this.state.Model.Url || ''} name='Url' id='Url' className="form-control required-field" data-val-required="Url is required" data-val="true" data-val-group="saveActionList" />
                                </div>
                                <span htmlFor="Url" className="help-block error"></span>
                            </div>
                            <div className="col-lg-6">
                                <label>{Lang.WebServiceForm.methodType}</label>
                                <div className="input-group">
                                    <Select name="ddlMethodType" id="ddlMethodType" defaultValue={this.state.Model.MethodType || ''}
                                        listItem={this.state.ListMethodTypes} optionKey="Key" optionLabel="Value" />
                                </div>
                                <span htmlFor="ddlMethodType" className="help-block error"></span>
                            </div>
                        </div>
                        <div className="form-group row"> 
                            <div className="col-lg-6">
                                <label>{Lang.WebServiceForm.contentType}</label>
                                <div className="input-group">
                                    <Select name="ddlContentType" id="ddlContentType" defaultValue={this.state.Model.ContentType || ''}
                                        listItem={this.state.ListContentTypes} optionKey="Key" optionLabel="Value" />
                                </div>
                                <span htmlFor="ddlContentType" className="help-block error"></span>
                            </div>
                            <div className="col-lg-6">
                                <label>{Lang.WebServiceForm.retVariableName}</label>
                                <VariableControl name="txtRetVariableName" value={this.state.Model.RetVariableName} />
                            </div>
                        </div> 
                        <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                            <div className="table-information table-responsive">
                                <table id="tblCloneRow" style={{ display: "none" }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input id="txtName" type="text" className="form-control" autoComplete="off" />
                                            </td>
                                            <td>
                                                <SelectTypeControl ContainerID="divWS_SelectTypeValue" Value={""} ValueType={2}
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
                                <table id="tblParameterModel" className="table">
                                    <thead>
                                        <tr>
                                            <th>{Lang.WebServiceForm.tbl_th_Parameter}</th>
                                            <th>{Lang.WebServiceForm.tbl_th_Value}</th>
                                            <th>{Lang.WebServiceForm.tbl_th_Delete}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.Rows &&
                                            this.state.Model.Rows.filter((a) => { return a.Type == 0; }).map((item, index) => {
                                                return <tr key={index} className="text-center" >

                                                    <td>
                                                        <input id="txtName" defaultValue={item.Name} type="text" className="form-control" autoComplete="off" />
                                                    </td>
                                                    <td>
                                                        <SelectTypeControl ContainerID="divWS_SelectTypeValue" Value={item.Value} ValueType={item.ValueType}
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
                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnAddWebServiceParameterRow" onClick={this.addWebServiceParameterRow}>
                            {Lang.WebServiceForm.addParameter}
                        </button>

                        <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                            <div className="table-information table-responsive">
                                <table id="tblHeaderModel" className="table">
                                    <thead>
                                        <tr>
                                            <th>{Lang.WebServiceForm.tbl_th_Header}</th>
                                            <th>{Lang.WebServiceForm.tbl_th_Value}</th>
                                            <th>{Lang.WebServiceForm.tbl_th_Delete}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Model.Rows &&
                                            this.state.Model.Rows.filter((a) => { return a.Type == 1; }).map((item, index) => {
                                                return <tr key={index} className="text-center" >

                                                    <td>
                                                        <input id="txtName" defaultValue={item.Name} type="text" className="form-control" autoComplete="off" />
                                                    </td>
                                                    <td>
                                                        <SelectTypeControl ContainerID="divWS_SelectTypeValue" Value={item.Value} ValueType={item.ValueType}
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
                        <button type="button" className="btn btn-primary font-weight-bolder" id="btnAddWebServiceHeaderRow" onClick={this.addWebServiceHeaderRow}>
                            {Lang.WebServiceForm.addHeader}
                        </button>
                    </React.Fragment>
                }
                <div id="divWS_SelectTypeValue" className="modal fade" role="dialog">
                    <SelectTypeValue processId={this.props.ProcessId} applicationPageId={this.props.ApplicationPageId} containerID="divWS_SelectTypeValue" ProcessControls={this.state.ProcessControls} />
                </div>
            </div >
        );
    }
}

export default WebServiceForm;

