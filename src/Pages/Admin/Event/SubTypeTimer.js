import React, { useState } from 'react';
import EventService from '../../../Services/EventService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl, RadioList } from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class SubTypeTimer extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.change_Type = this.change_Type.bind(this);
    }
    async componentDidMount() {
        this.props.setSaveMethod(this.submitForm);
        await this.setState({ ...this.props })
        this.change_Type();
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    change_Type() {
        document.getElementById('divVariableData').style.display = 'none';
        document.getElementById('divMinute').style.display = 'none';
        document.getElementById('divDate').style.display = 'none';
        document.getElementById('divIntervalType').style.display = 'none';
        document.getElementById('divIntervalRepeatTimes').style.display = 'none';
        document.getElementById('divWeekDays').style.display = 'none';
        document.getElementById('divMonthDays').style.display = 'none';
        document.getElementById('divTimeHour').style.display = 'none';
        document.getElementById('divTimeMinute').style.display = 'none';

        let typeValue = document.getElementById('SubTypeTimerEventModel.Type').value;
        let setType = document.getElementById('SubTypeTimerEventModel.SetType').value;
        let intervalType = document.getElementById('SubTypeTimerEventModel.IntervalType').value;
        switch (typeValue) {
            //SubTypeTimerEventModel.e_Type.WaitFor
            case '1':
                switch (setType) {
                    //SubTypeTimerEventModel.e_SetType.Static
                    case '1':
                        document.getElementById('divMinute').style.display = '';
                        break;
                    //SubTypeTimerEventModel.e_SetType.Variable
                    case '2':
                        document.getElementById('divVariableData').style.display = '';
                        break;
                }
                break;
            //SubTypeTimerEventModel.e_Type.WaitUntil
            case '2':
                switch (setType) {
                    //SubTypeTimerEventModel.e_SetType.Static
                    case '1':
                        document.getElementById('divDate').style.display = '';
                        break;
                    //SubTypeTimerEventModel.e_SetType.Variable
                    case '2':
                        document.getElementById('divVariableData').style.display = '';
                        break;
                }
                document.getElementById('divTimeMinute').style.display = '';
                document.getElementById('divTimeHour').style.display = '';
                break;
            //SubTypeTimerEventModel.e_Type.Interval
            case '3':
                document.getElementById('divIntervalType').style.display = '';
                document.getElementById('divIntervalRepeatTimes').style.display = '';
                switch (setType) {
                    //SubTypeTimerEventModel.e_SetType.Static
                    case '1':
                        switch (intervalType) {
                            //SubTypeTimerEventModel.e_IntervalType.SpecificMinute
                            case '3':
                                document.getElementById('divMinute').style.display = '';
                                break;
                            //SubTypeTimerEventModel.e_IntervalType.EveryWeek
                            case '1':
                                document.getElementById('divTimeMinute').style.display = '';
                                document.getElementById('divTimeHour').style.display = '';
                                document.getElementById('divWeekDays').style.display = '';
                                break;
                            //SubTypeTimerEventModel.e_IntervalType.EveryMonth
                            case '2':
                                document.getElementById('divTimeMinute').style.display = '';
                                document.getElementById('divTimeHour').style.display = '';
                                document.getElementById('divMonthDays').style.display = '';
                                break;
                        }
                        break;
                    //SubTypeTimerEventModel.e_SetType.Variable
                    case '2':
                        document.getElementById('divVariableData').style.display = '';
                        break;
                }
                break;
        }
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            //send to server    
            let result = await new EventService().postSubTypeTimer(UtilityService.getFormData('divAddEditEvent', {
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

                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label>{Lang.SubTypeTimer.type }</label>
                                <div className="input-group">
                                    <Select name="SubTypeTimerEventModel.Type" id="SubTypeTimerEventModel.Type" defaultValue={this.state.Model.SubTypeTimerEventModel.Type || ''} className="required-field"
                                        handelChange={this.change_Type} listItem={this.state.SubTypeTimerEventModelTypes} optionKey="Key" optionLabel="Value" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label>{Lang.SubTypeTimer.setType}</label>
                                <div className="input-group">
                                    <Select name="SubTypeTimerEventModel.SetType" id="SubTypeTimerEventModel.SetType" defaultValue={this.state.Model.SubTypeTimerEventModel.SetType || ''} className="required-field"
                                        handelChange={this.change_Type} listItem={this.state.SubTypeTimerEventModelSetTypes} optionKey="Key" optionLabel="Value" />
                                </div> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-6" id="divIntervalType">
                                <label>{Lang.SubTypeTimer.intervalType}</label>
                                <div className="input-group">
                                    <Select name="SubTypeTimerEventModel.IntervalType" id="SubTypeTimerEventModel.IntervalType" defaultValue={this.state.Model.SubTypeTimerEventModel.IntervalType || ''} className="required-field"
                                        handelChange={this.change_Type} listItem={this.state.SubTypeTimerEventModelIntervalTypes} optionKey="Key" optionLabel="Value" />
                                </div>
                            </div>
                            <div className="col-lg-6" id="divVariableData">
                                <label>{Lang.SubTypeTimer.variable}</label>
                                <VariableControl name="KeyVariable" isRequired={false} value={this.state.Model.SubTypeTimerEventModel.VariableData} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-6" id="divMinute">
                                <label>{Lang.SubTypeTimer.minute}</label>
                                <div className="input-group">
                                    <input defaultValue={this.state.Model.SubTypeTimerEventModel.Minute || ''} autoComplete="off" name='SubTypeTimerEventModel.Minute' id='SubTypeTimerEventModel.Minute' className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-6" id="divDate">
                                <label>{Lang.SubTypeTimer.dateTime}</label>
                                <div className="input-group">
                                    <input defaultValue={this.state.Model.SubTypeTimerEventModel.DateTime || ''} autoComplete="off" data-type="DATEPICKER" data-showtype="date"
                                        name='SubTypeTimerEventModel.DateTime' id='SubTypeTimerEventModel.DateTime' className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-6" id="divTimeHour">
                                <label>{Lang.SubTypeTimer.hour}</label>
                                <div className="input-group">
                                    <input defaultValue={this.state.Model.SubTypeTimerEventModel.TimeHour || ''} autoComplete="off" name='SubTypeTimerEventModel.TimeHour' id='SubTypeTimerEventModel.TimeHour' className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-6" id="divTimeMinute">
                                <label>{Lang.SubTypeTimer.minute}</label>
                                <div className="input-group">
                                    <input defaultValue={this.state.Model.SubTypeTimerEventModel.TimeMinute || ''} autoComplete="off" name='SubTypeTimerEventModel.TimeMinute' id='SubTypeTimerEventModel.TimeMinute' className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-12" id="divWeekDays">
                                <div className="input-group">
                                    <label>{Lang.SubTypeTimer.daysofweek}</label>
                                    <div className="checkbox-inline">
                                        <label className="checkbox">Saturday <input name="SubTypeTimerEventModel.WeekDays" type="checkbox" defaultValue="1" defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListWeekDays.indexOf(1) > -1} /><span></span> </label>
                                        <label className="checkbox">Sunday<input name="SubTypeTimerEventModel.WeekDays" type="checkbox" defaultValue="2" defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListWeekDays.indexOf(2) > -1} /><span></span> </label>
                                        <label className="checkbox">Monday <input name="SubTypeTimerEventModel.WeekDays" type="checkbox" defaultValue="3" defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListWeekDays.indexOf(3) > -1} /><span></span> </label>
                                        <label className="checkbox">Tuesday<input name="SubTypeTimerEventModel.WeekDays" type="checkbox" defaultValue="4" defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListWeekDays.indexOf(4) > -1} /><span></span> </label>
                                        <label className="checkbox">Wednesday<input name="SubTypeTimerEventModel.WeekDays" type="checkbox" defaultValue="5" defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListWeekDays.indexOf(5) > -1} /><span></span> </label>
                                        <label className="checkbox">Thursday<input name="SubTypeTimerEventModel.WeekDays" type="checkbox" defaultValue="6" defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListWeekDays.indexOf(6) > -1} /><span></span> </label>
                                        <label className="checkbox">Friday<input name="SubTypeTimerEventModel.WeekDays" type="checkbox" defaultValue="7" defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListWeekDays.indexOf(7) > -1} /><span></span> </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12" id="divMonthDays">
                                <div className="input-group">
                                    <label>{Lang.SubTypeTimer.daysofmonths}</label>
                                    <div className="checkbox-inline">
                                        {
                                            [...Array(30).keys()].map((item, index) => {
                                                return <React.Fragment key={index}>
                                                    <label className="checkbox">{index + 1}<input name="SubTypeTimerEventModel.MonthDays" type="checkbox" defaultValue={index + 1} defaultChecked={this.state.Model.SubTypeTimerEventModel.GetListMonthDays.indexOf(index + 1) > -1} /><span></span> </label>
                                                </React.Fragment>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-6" id="divIntervalRepeatTimes">
                                <label>{Lang.SubTypeTimer.repeatTimes}</label>
                                <div className="input-group">
                                    <input defaultValue={this.state.Model.SubTypeTimerEventModel.RepeatTimes || ''} autoComplete="off" name='SubTypeTimerEventModel.RepeatTimes' id='SubTypeTimerEventModel.RepeatTimes' className="form-control" />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default SubTypeTimer;

