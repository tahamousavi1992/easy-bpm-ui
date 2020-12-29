import React, { useState } from 'react';
import CardHtml from './CardHtml'
const $ = window.$;
export default function AccordionHtml(props) {
 
    return (
        <React.Fragment>
            {
                props.Visibility != false &&
                <div className="bpms-control-container">
                    <div className={props.CssClass} id={props.Id} data-type={props.Type} data-formid={props.DynamicFormID}>
                        {
                            props.Cards.map((item, index) => {
                                return <React.Fragment key={index} >
                                    <CardHtml globalProps={props.globalProps} AccordionParentId={props.Id } {...item} />
                                </React.Fragment>
                            })
                        }
                    </div>
                </div>
            }
        </React.Fragment >
    );
}


