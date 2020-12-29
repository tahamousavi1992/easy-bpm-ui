import React, { useState } from 'react';
import ColumnHtml from './ColumnHtml'
const $ = window.$;
export default function RowHtml(props) {
    // Declare a new state variable, which we'll call "count"

    return (
        <React.Fragment>
            {
                props.Visibility != false &&
                <div className={props.CssClass} data-isfooter={props.IsFooter ? 'true' : 'false'} id={props.Id} data-type={props.Type} data-formid={props.DynamicFormID}>
                    {
                        props.Columns.map((item, index) => {
                            return <React.Fragment key={index} >
                                <ColumnHtml globalProps={props.globalProps} {...item} />
                            </React.Fragment>
                        })
                    }
                </div>
            }
        </React.Fragment >
    );
}


