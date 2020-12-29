import React, { useState } from 'react'; 
const $ = window.$;
export default function TitleHtml(props) {
    let hTag = `<${props.TitleType} id='${props.Id}}' name='${props.Id}'  class='${props.CssClass}' data-type='${props.Type}' data-formId='${props.DynamicFormID}' data-parameter='${props.Parameter}'>${props.Label}</${props.TitleType}>`;
    return (
        <React.Fragment>
            { 
                (props != null && props.Visibility != false) &&
                <div className="bpms-control-container" >
                    <div className="input-group" dangerouslySetInnerHTML={{ __html: hTag }}>
                    </div>
                </div>
            }

        </React.Fragment>
    );
}


