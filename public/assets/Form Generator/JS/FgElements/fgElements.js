'use strict';

import FgRow from "./row.js";
import FgColumn from "./column.js";
import FgButton from "./button.js";
import FgTextbox from "./textbox.js";
import FgDropdown from "./dropdown/dropdown.js";
import FgRadiobuttonlist from "./radioAndCheckboxList/radiobuttonlist.js";
import FgCheckboxlist from "./radioAndCheckboxList/checkboxlist.js"
import FgCheckbox from "./radioAndCheckboxList/checkbox.js"
import FgFileuploader from "./fileuploader.js";
import FgImage from "./image.js";
import FgLink from "./link.js";
import FgTitile from "./title.js";
import FgDatepicker from "./datepicker/datepicker.js";
import FgDownloadLink from "./downloadlink.js";
import FgComboSearch from "./comboSearch.js";
import FgDataGrid from "./dataGrid.js";
import FgForm from "./form.js";
import FgChart from "./chart.js";
const factory = {
    row: FgRow.createRow,
    column: FgColumn.createColumn,
    button: FgButton.createButton,
    texbox: FgTextbox.createTextbox,
    dropdown: FgDropdown.createDropdown,
    radioButtonList: FgRadiobuttonlist.createFgRadiobuttonlist,
    checkboxlist: FgCheckboxlist.createFgCheckboxlist,
    checkbox: FgCheckbox.createFgCheckbox,
    fileuploader: FgFileuploader.createFileuploader,
    image: FgImage.createImage,
    link: FgLink.createLink,
    title: FgTitile.createTitle,
    datepicker: FgDatepicker.createDatepicker,
    downloadlink: FgDownloadLink.createLink,
    comboSearch: FgComboSearch.createComboSearch,
    dataGrid: FgDataGrid.createDataGrid,
    form: FgForm.createForm,
    chart: FgChart.createChart,
}

export default factory