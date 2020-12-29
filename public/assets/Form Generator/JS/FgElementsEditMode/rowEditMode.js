'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import ElementToolbarButton from "./elementToolbarButton.js"
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgRowEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createRow(fgElement, containerCssClass, placeHolderCssClass) {
 
        return new FgRowEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

function getToolbarButtons() {

    let toolbarButtons = [];

    let editButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>', "editElement label");
    let deleteButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-trash-o" aria-hidden="true"></i>', "fg-delete-element label label-important");
    let addColumnButton = ElementToolbarButton.createElementToolbarButton('<i class="fa fa-columns" aria-hidden="true"></i>', "fg-add-column addNewElement label label-important");

    toolbarButtons.push(addColumnButton);
    toolbarButtons.push(editButton);
    toolbarButtons.push(deleteButton);

    return toolbarButtons;
}

export default FgRowEditMode