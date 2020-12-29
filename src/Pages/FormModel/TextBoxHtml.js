import React, { useState } from 'react';
import Lang from '../../Shared/CartableLang/Lang';
const $ = window.$;
export default function TextBoxHtml(props) {
    let [model, setModel] = useState({ ...props });
    let attr = {};
    if (props.IsRequired) {
        attr['data-val-required'] = Lang.requiredMsg(props.Label);
    }
    if (model.MaxLength > 0) {
        attr['maxlength'] = model.MaxLength;
        attr['data-val-length-max'] = model.MaxLength;
        attr['data-val-length'] = Lang.maxLengthMsg(props.Label, model.MaxLength);
    }
    if (model.Pattern != null && model.Pattern != '') {
        attr['data-val-regex-pattern'] = `${model.Pattern}`;
        attr['data-val-regex'] = Lang.regexMsg(props.Label);
    }
    if (model.SubType != null && model.SubType != '') {
        attr['data-val-' + model.SubType.toLowerCase()] = Lang.typeValidMsg(props.Label);
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

                        {
                            model.IsMultiline &&
                            <textarea rows="3" type="text" placeholder={model.PlaceHolderText} readOnly={model.IsReadonly} id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} data-type={model.Type} defaultValue={model.Value}
                                data-val-group={model.ValidationGroup} data-val="true"   {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID}
                                {...attr}>
                            </textarea>
                        }
                        {
                            !model.IsMultiline &&
                            <input rows="3" type={model.SubType} placeholder={model.PlaceHolderText} readOnly={model.IsReadonly} id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} data-type={model.Type} defaultValue={model.Value}
                                data-val-group={model.ValidationGroup} data-val="true"   {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID}
                                {...attr} />
                        }
                    </div>
                    <span htmlFor={model.Id} className="form-text text-muted"></span>
                </div>
            }
        </React.Fragment >
    );
}


