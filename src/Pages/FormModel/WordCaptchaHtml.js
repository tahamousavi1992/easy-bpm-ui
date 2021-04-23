import React, { useState } from 'react'; 
const $ = window.$;
export default function WordCaptchaHtml(props) {
    // Declare a new state variable, which we'll call "count"
    let [model, setModel] = useState({ ...props });
    return (
        <React.Fragment>
            {
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" >
                    <img data-captcha="true" />
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <a href="javascript:;" onClick={() => { window.FormControl.get(model.Id).refresh() }} className="refresh-captcha"><i className="fa fa-refresh"></i></a>
                            </span>
                        </div>
                        <input className={model.CssClass} id={model.Id} name={model.Id} type="text" data-type={model.Type} data-formid={model.DynamicFormID} autoComplete="off" />
                    </div>
                </div>
            }
        </React.Fragment>
    );
}


