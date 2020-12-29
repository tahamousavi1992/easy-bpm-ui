var langEn = {
    requiredMsg(name) { return `${name} is required.` },
    maxLengthMsg(name, maxLength) { return `the length of ${name} must not to be more than ${maxLength} .` },
    regexMsg(name) { return `${name} is not valid.` },
    typeValidMsg(name) { return `${name} is not valid.` },
    Shared: {
        apply: 'Apply',
        AdvSearch: 'Advanced Search',
        search: 'Search',
        cancel: 'cancel',
        save: 'save',
        delete: 'Delete',
        inActive: 'Inactive',
        active: 'Active',
        edit: 'Edit',
        makeInActive: 'InActive this item?',
        makeDelete: 'Delete this item?'
    },

    Menu:
    {
        management: 'Manage',
        ListProcess: 'Processes',
        ThreadList: 'Requests',
        MyTasks: 'My Tasks',
    },

    ListProcess: {
        caption: 'Processes',
        tbl_th_Name: 'Name',
        tbl_th_Version: 'Version',
        tbl_th_Number: 'Number',
        tbl_th_CreateDate: 'Created On',
        tbl_th_Description: 'Description',
        tbl_th_Start: 'Start',
        beginTask: 'Start Task',
    },

    ThreadList: {
        caption: 'Requests',
        process: 'Process',
        advStartDateFrom: 'Start Date From',
        advStartDateTo: 'Start Date To',
        advEndDateTo: 'End Date To',
        advEndDateFrom: 'End Date From',
        tbl_th_Name: 'Name',
        tbl_th_Number: 'Number',
        tbl_th_FullName: 'Full Name',
        tbl_th_StartDate: 'Start Date',
        tbl_th_EndDate: 'End Date',
        tbl_th_Continue: 'Details',
    },
    GetThreadDetail:
    {
        caption: 'Task Details',
        taskInfo: 'Task Info',
        actions: 'Actions',
        processName: 'Name',
        fullName: 'Full Name',
        startDate: 'Start Date',
        endDate: 'End Date',
        StatusName: 'Status',
        tbl_th_TaskName: 'Task Name',
        tbl_th_FullName: 'Full Name',
        tbl_th_StartDate: 'Start Date',
        tbl_th_EndDate: 'End Date',
        tbl_th_Description: 'Description',
    },

    MyTasks: {
        caption: 'My Tasks',
        tbl_th_Name: 'Name',
        tbl_th_Version: 'Version',
        tbl_th_Number: 'Number',
        tbl_th_TaskName: 'Task Name',
        tbl_th_FullName: 'Full Name',
        tbl_th_StartDate: 'Start Date',
        tbl_th_ThreadStartDate: 'Request Start Date',
        tbl_th_Continue: 'Continue',
    },

    GetCartableThread: {
        taskInfo: 'Task Info',
        actions: 'Actions',
        tbl_th_TaskName: 'Task Name',
        tbl_th_FullName: 'Full Name',
        tbl_th_StartDate: 'Start Date',
        tbl_th_EndDate: 'End Date',
        tbl_th_Description: 'Description',
    },
};
export default langEn;