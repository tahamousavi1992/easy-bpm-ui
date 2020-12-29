import React, { useState } from 'react'; 
import Lang from '../../Shared/CartableLang/Lang';
const $ = window.$;
export default function DatePickerHtml(props) {
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
                <div className="bpms-control-container" >
                    <label dangerouslySetInnerHTML={{ __html: model.Label + helpText }}></label>
                    <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-clock"></i></span></div>
                        <input readOnly={model.IsReadonly} type="text" id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} data-type={model.Type} defaultValue={(model.ShowType == 'date' ? (model.Value != null ? model.Value.split('T')[0] : '') : model.Value)}
                            {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID} data-val="true" data-val-group={model.ValidationGroup}
                            {...attr} data-showtype={model.ShowType} data-dateformat={model.DateFormat}
                        />
                    </div>
                    <span htmlFor={model.Id} className="form-text text-muted"></span>
                </div>
            }

        </React.Fragment >
    );
}


