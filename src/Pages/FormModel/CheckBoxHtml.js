import React, { useState } from 'react';
const $ = window.$;
export default function CheckBoxHtml(props) { 
    let [model, setModel] = useState({ ...props });
    let helpText = (model.HelpMessageText != null && model.HelpMessageText != '') ?
        ' <i class="fa fa-exclamation-circle" data-toggle="tooltip" title="' + model.HelpMessageText + '"></i>' : '';
    return (
        <React.Fragment>
            {
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" >
                    <label dangerouslySetInnerHTML={{ __html: (model.IsInline ? "" : model.Label + helpText) }}></label>
                    <div className={model.CssClass}>
                        <label className={(model.IsSwitch ? " switch" : "checkbox")}>
                            <input id={model.Id} name={model.Id} data-parameter={model.Parameter} defaultChecked={model.Checked} disabled={model.IsReadonly} type="checkbox" defaultValue="true" data-type={model.Type}
                                {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID} />
                            {(model.IsInline ? model.Label : "")} 
                            <span></span>
                        </label>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}


