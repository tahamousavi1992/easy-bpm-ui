import React, { useState } from 'react';
import Lang from '../../Shared/CartableLang/Lang';
const $ = window.$;
export default function CkeditorHtml(props) {
    let [model, setModel] = useState({ ...props });
    let attr = {};
    if (props.IsRequired) {
        attr['data-val-required'] = Lang.requiredMsg(props.Label);
    }
    let helpText = (model.HelpMessageText != null && model.HelpMessageText != '') ?
        ' <i class="fa fa-exclamation-circle" data-toggle="tooltip" title="' + model.HelpMessageText + '"></i>' : '';
    return (
        <React.Fragment>
            {
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container">
                    <label dangerouslySetInnerHTML={{ __html: model.Label + helpText }}></label>
                    {
                        model.IsReadonly != true &&
                        <div className="">
                            <textarea type='text' id={model.Id} name={model.Id} className={"myCkeditor " + model.CssClass.replace("myCkeditor", "")} defaultValue={model.Value} data-parameter={model.Parameter} data-type={model.Type}
                                data-val-group={model.ValidationGroup} data-val="true"
                                {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID}
                                {...attr} ></textarea>
                        </div>
                    }
                    {
                        model.IsReadonly == true &&
                        <div className="input-group" dangerouslySetInnerHTML={{ __html: model.Value }}>

                        </div>
                    }
                    <span htmlFor={model.Id} className="form-text text-muted"></span>
                </div>
            }
        </React.Fragment>
    );
}


