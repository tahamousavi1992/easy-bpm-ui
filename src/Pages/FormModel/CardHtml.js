import React, { useState } from 'react';
import RowHtml from './RowHtml'
const $ = window.$;
export default function CardHtml(props) {
 
    return (
        <React.Fragment>
            {
                props.Visibility != false &&
                <div className={"card " + props.CssClass} id={props.Id} data-type={props.Type} data-formid={props.DynamicFormID}>
                    <div className="card-header" id={"headingOne_" + props.Id}>
                        <div className="card-title" data-toggle="collapse" data-target={"#card_" + props.Id} aria-expanded="false"
                            aria-controls={"card_" + props.Id} dangerouslySetInnerHTML={{ __html: props.Label }}>
                        </div>
                    </div>
                    <div id={"card_" + props.Id} className="collapse show" aria-labelledby={"headingOne_" + props.Id} data-parent={"#" + props.AccordionParentId}>
                        <div className="card-body">
                            {
                                props.Rows.map((item, index) => {
                                    return <React.Fragment key={index} >
                                        <RowHtml globalProps={props.globalProps} {...item} />
                                    </React.Fragment>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </React.Fragment >
    );
}


