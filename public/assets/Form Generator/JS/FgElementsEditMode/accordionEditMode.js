'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import ElementToolbarButton from "./elementToolbarButton.js"
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgAccordionEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createAccordion(fgElement, containerCssClass, placeHolderCssClass) {
 
        return new FgAccordionEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

function getToolbarButtons() {

    let toolbarButtons = [];

    let editButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>', "editElement label");
    let deleteButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-trash-o" aria-hidden="true"></i>', "fg-delete-element label label-important");
    let addCardButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-square-o" aria-hidden="true"></i>', "fg-add-card addNewElement label label-important");

    toolbarButtons.push(addCardButton);
    toolbarButtons.push(editButton);
    toolbarButtons.push(deleteButton);

    return toolbarButtons;
}

export default FgAccordionEditMode