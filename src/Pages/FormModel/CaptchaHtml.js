import React, { useState, useEffect } from 'react'; 
const $ = window.$;
export default function CaptchaHtml(props) { 
    let [model, setModel] = useState({ ...props });
    useEffect(() => {
        let script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js` + ((props.Language == '' || props.Language == null) ? '' : ("?hl=" + props.Language));
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);
    return (
        <React.Fragment>
            {
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" >
                    <div className="input-group">
                        <div id={model.Id} name={model.Id} className={'g-recaptcha' + model.CssClass.replace(" g-recaptcha", "")} data-sitekey={model.SiteKey} data-type={model.Type} data-formid={model.DynamicFormID}></div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}


