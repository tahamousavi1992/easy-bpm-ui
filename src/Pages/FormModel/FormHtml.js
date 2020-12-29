import React, { useState } from 'react';
import ContentHtml from './ContentHtml'
const $ = window.$;
export default function FormHtml(props) {

    return (
        <React.Fragment>
            {
                props.Visibility != false &&
                <div className={props.CssClass}>
                    <ContentHtml globalProps={props.globalProps} {...props.ContentHtml}></ContentHtml>  
                </div>
            }
        </React.Fragment >
    );
}


