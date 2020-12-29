'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import ElementToolbarButton from "./elementToolbarButton.js"
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgCardEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createCard(fgElement, containerCssClass, placeHolderCssClass) {
 
        return new FgCardEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

function getToolbarButtons() {

    let toolbarButtons = [];

    let editButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>', "editElement label");
    let deleteButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-trash-o" aria-hidden="true"></i>', "fg-delete-element label label-important");
    let addRowButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-align-justify" aria-hidden="true"></i>', "fg-add-row addNewElement label label-important");

    toolbarButtons.push(addRowButton);
    toolbarButtons.push(editButton);
    toolbarButtons.push(deleteButton);

    return toolbarButtons;
}

export default FgCardEditMode