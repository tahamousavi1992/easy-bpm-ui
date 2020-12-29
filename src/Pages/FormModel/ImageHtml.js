import React, { useState } from 'react'; 
const $ = window.$;
export default function ImageHtml(props) {
    // Declare a new state variable, which we'll call "count"

    let [model, setModel] = useState({ ...props });

    return (
        <React.Fragment>
            {
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" >
                    <div className="input-group">
                        <img id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} width={model.Width} height={model.Height} src={model.Address} data-type={model.Type}
                            {...model.EventDataAttributes.reduce((prev, curr) => { prev[curr.AttrName] = curr.FunctionName; return prev; }, {})}    data-formid={model.DynamicFormID} />
                    </div>

                </div>
            }

        </React.Fragment>
    );
}


