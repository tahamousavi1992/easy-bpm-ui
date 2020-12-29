import React, { useState } from 'react';
import Lang from '../../Shared/CartableLang/Lang';
const $ = window.$;
export default function ComboSearchHtml(props) { 
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
                    <div className="input-group">
                        {
                            (model.FontIconCssClass != null && model.FontIconCssClass != '') &&
                            <div className="input-group-prepend"><span className="input-group-text"><i className={model.FontIconCssClass}></i></span></div>
                        }
                        <select disabled={model.IsReadonly} id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} data-type={model.Type} defaultValue={model.Value} data-optionalcaption={model.OptionalCaption} data-hasoptional={model.HasOptional}
                            data-val-group={model.ValidationGroup} data-val="true"
                            {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID}
                            {...attr}>
                            {
                                (model.Value != null && model.Value != '') &&
                                <option value={model.Value}>{model.TextOfSelectedValue}</option>
                            }
                        </select>
                    </div>
                    <span htmlFor={model.Id} className="form-text text-muted"></span>
                </div>
            }
        </React.Fragment>
    );
}


