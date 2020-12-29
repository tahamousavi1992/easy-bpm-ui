import React, { useState } from 'react'; 
const $ = window.$;
export default function LinkHtml(props) {
    // Declare a new state variable, which we'll call "count"
    let [model, setModel] = useState({ ...props });

    return (
        <React.Fragment>
            {
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" >
                    <div className="input-group">
                        <a id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} href={model.Href} target={model.Target} data-type={model.Type}
                            {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})} data-formid={model.DynamicFormID}
                            dangerouslySetInnerHTML={{ __html: model.Label }}>
                        </a>
                    </div>

                </div>
            }

        </React.Fragment>
    );
}


