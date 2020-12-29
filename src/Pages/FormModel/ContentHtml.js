import React, { useState } from 'react';
import RowHtml from './RowHtml'
import AccordionHtml from './AccordionHtml'
const $ = window.$;
export default function ContentHtml(props) {

    return (
        <React.Fragment>
            {
                props.Rows != null &&
                props.Rows.map((item, index) => {
                    return <React.Fragment key={index} >
                        {
                            item.Type == "ROW" &&
                            <RowHtml globalProps={props.globalProps} {...item} />
                        }
                        {
                            item.Type == "ACCORDION" &&
                            <AccordionHtml globalProps={props.globalProps} {...item} />
                        }
                    </React.Fragment>
                })
            }

        </React.Fragment>
    );
}


