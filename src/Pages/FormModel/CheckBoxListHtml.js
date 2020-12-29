import React, { useState } from 'react';
import Lang from '../../Shared/CartableLang/Lang';
const $ = window.$;
export default function CheckBoxListHtml(props) { 
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
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container">
                    <label dangerouslySetInnerHTML={{ __html: model.Label + helpText }}></label>
                    <div id={model.Id} className={model.CssClass} data-type={model.Type} data-parameter={model.Parameter}
                        data-val-group={model.ValidationGroup} data-val="true"
                        {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID}
                        {...attr}>
                        {
                            model.Options &&
                            model.Options.map((item, index) => {
                                return <label key={index} className="checkbox"  >
                                    <input defaultChecked={item.Selected} name={model.Id} type="checkbox" disabled={model.IsReadonly} defaultValue={item.Value} />
                                    <span></span>
                                    {item.Label}
                                </label>
                            })
                        } 
                    </div>
                    <span htmlFor={model.Id} className="form-text text-muted"></span>
                </div>
            }
        </React.Fragment>
    );
}


