import React, { useState } from 'react';
const $ = window.$;
export default function DownloadLinkHtml(props) {
    let [model, setModel] = useState({ ...props });

    return (
        <React.Fragment>
            {
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" >
                    {
                        (model.Label != null && model.Label != '') &&
                        <label dangerouslySetInnerHTML={{ __html: model.Label }}></label>
                    }
                    <div className="input-group">
                        {
                            model.ListDocument.map((item, index) => {
                                return <React.Fragment>
                                    <a key={index} id={model.Id} name={model.Id} className={model.CssClass} data-type={model.Type}
                                        data-formId={model.DynamicFormID} href={props.globalProps.DownloadFileUrl + "&guid=" + item.GUID} dangerouslySetInnerHTML={{ __html: item.CaptionOf }}>
                                    </a>
                                    {
                                        model.ListDocument.length!=0 && index != (model.ListDocument.length - 1) &&
                                        <div class="border-right"></div>
                                    }

                                </React.Fragment >
                            })
                        }
                    </div>
                </div>
            }

        </React.Fragment>
    );
}


