
'use strict';
import ElementContainer from "./elementContainer.js"
import ElementToolbar from "./elementToolbar.js"
import ElementPlaceHolder from "./elementPlaceHolder.js"
import ElementToolbarButton from "./elementToolbarButton.js"

export class FgElementEditMode {

    constructor(fgElement, htmlType, toolbarbuttons, containerCssClass, placeHolderCssClass) {
        this.fgElement = fgElement;
        this.htmlType = htmlType;
        this.elementContainer = ElementContainer.creatElementContainer(containerCssClass
            , ElementToolbar.createElementToolbar(toolbarbuttons)
            , ElementPlaceHolder.createElementPlaceHolder(placeHolderCssClass));
    }


}

export function getDefaultToolbarButtons() {

    let toolbarButtons = [];

    let editButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>', "editElement label");
    let deleteButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-trash-o" aria-hidden="true"></i>', "fg-delete-element label label-important");

    toolbarButtons.push(editButton);
    toolbarButtons.push(deleteButton);

    return toolbarButtons;
}
 
 