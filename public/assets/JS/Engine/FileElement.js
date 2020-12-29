'use strict';
import BPMSCommon from "./BPMSCommon.js"
class FileElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    get value() {
        return this.element.value;
    }

    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }
    get readOnly() {
        return this.element.readOnly;
    }

    set readOnly(readOnly) {
        this.element.readOnly = readOnly;
    }
    init() {

    }

    //targetElement is a tag.
    deleteFile(targetElement) {
        targetElement = targetElement.closest('a');
        let elementid = this.element.id;
        let fileId = targetElement.getAttribute('data-fileid');
        if (fileId == null) {
            new FileElement(elementid).deleteRow(targetElement);
        }
        else {
            CallGetAjax(window[this.formId + "DeleteFileUrl"], { guid: fileId }, null, null, function (result) {
                showMessage((result.isSuccess ? 'success' : 'error'), result.message);
                if (result.isSuccess) {
                    new FileElement(elementid).deleteRow(targetElement);
                }
            }, null);
        }
    }

    deleteRow(targetElement) {
        targetElement = targetElement.closest('a');
        let fileId = targetElement.getAttribute('data-fileid');
        if (this.element.getAttribute('data-isMultiple') == "true") {
            targetElement.closest('tr').remove();
        }
        else {
            document.getElementById('download_' + fileId).remove();
            targetElement.remove();
        }
    }

    addRow(elementId, formId, deleteClass, deleteCaptionBase64) {
        let table = document.getElementById('divUploader_' + elementId);
        table.tBodies[0].insertAdjacentHTML('beforeend', `<tr>
<td style='width: 70 %'>
<input id="${elementId}" name="${elementId}" data-isMultiple="true" type="file" data-type="FILEUPLOAD" data-formId="${formId}">
</td>
<td style='width: 15 %'><td>
<td style='width: 15 %'>
<a id="@Model.Id" class="${deleteClass}" data-type="FILEUPLOAD" data-formId="${formId}"
    href="#" onclick="FormControl.get('${elementId}').deleteFile(this); return false;">
    ${BPMSCommon.fromB64(deleteCaptionBase64)}
</a>
<td>
</tr>`);
    }

    addChangeEvent() {
        this.element.removeEventListener("input", FileElement.on_change);
        this.element.addEventListener("input", FileElement.on_change);
    }

    addClickEvent() {
        this.element.removeEventListener("click", FileElement.on_click);
        this.element.addEventListener("click", FileElement.on_click);
    }

    static on_change() {
        let funcName = BPMSCommon.getChangeFuncName(event.target);
        if (funcName != null)
            window[funcName](BPMSCommon.getElementClass(event.target.id));
        BPMSCommon.callUpdateDependent(event.target);
    }

    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}
export default FileElement