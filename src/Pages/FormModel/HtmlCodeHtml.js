import React, { useState } from 'react';
import PagingHtml from './PagingHtml';
import UtilityService from '../../Services/UtilityService';
const $ = window.$;
export default function HtmlCodeHtml(props) { 
    let [model, setModel] = useState({ ...props });
    return (
        <React.Fragment>
            { 
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" >
                    <div id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} data-type={model.Type}
                        {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID}
                        dangerouslySetInnerHTML={{ __html: model.Label }}>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}


