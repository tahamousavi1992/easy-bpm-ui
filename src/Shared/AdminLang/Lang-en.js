﻿var langEn = {
    requiredMsg(name) { return `${name} is required.` },
    maxLengthMsg(name, maxLength) { return `the length of ${name} must not to be more than ${maxLength} .` },
    regexMsg(name) { return `${name} is not valid.` },
    typeValidMsg(name) { return `${name} is not valid.` },
    Shared: {
        apply: 'Apply',
        AdvSearch: 'Advanced Search',
        search: 'Search',
        cancel: 'cancel',
        close: 'close',
        save: 'save',
        delete: 'Delete',
        inActive: 'Inactive',
        active: 'Active',
        edit: 'Edit',
        makeInActive: 'InActive this item?',
        makeDelete: 'Delete this item?',
        backTo: 'Back To',
    },

    Menu:
    {
        Task: 'Task',
        management: 'Management',
        setting: 'Setting',
        apiAccessList: 'API Access',
        assemblyFileList: 'Components',
        connectionList: 'Sql Connections',
        departmentList: 'Organization',
        applicationPages: 'Application Pages',
        EmailAccountList: 'Email Accounts',
        EntityDefList: 'Entity',
        FolderList: 'Folders',
        JavaScriptList: 'Java Script',
        LookUpList: 'LookUp Info',
        MessageTypeList: 'Message Type',
        ProcessList: 'Processes',
        DesignProcess: 'Diagram',
        EditProcess: 'Edit Process',
        AddEditSetting: 'Configuration',
        StyleSheetList: 'Style Sheet',
        ThreadList: 'Requests',
        UserList: 'Users',
        VariableList: 'Variables',
    },

    APIAccessList:
    {
        caption: 'API Access List',
        new: 'New',
        tbl_th_Name: 'Name',
        tbl_th_IPAddress: 'IPAddress',
        tbl_th_AccessKey: 'Access Key',
        tbl_th_IsActive: 'Active',
        tbl_th_Operation: 'Operation',
    },
    AddEditAPIAccess:
    {
        caption: 'Add or Edit API Access',
        name: 'Name',
        ipAddress: 'IP Address',
        accessKey: 'Access Key',
    },

    AssemblyFileList: {
        caption: 'Assembly List',
        new: 'New',
        tbl_th_FileName: 'File Name',
        tbl_th_Size: 'Size',
        tbl_th_Version: 'Version',
        tbl_th_Operation: 'Operation',
    },

    ConnectionList: {
        caption: 'Connections',
        new: 'New',
        name: 'Name',
        server: 'Server',
        tbl_th_Name: 'Name',
        tbl_th_DataSource: 'DataSource',
        tbl_th_InitialCatalog: 'InitialCatalog',
        tbl_th_UserID: 'UserID',
        tbl_th_IntegratedSecurity: 'IntegratedSecurity',
        tbl_th_Operation: 'Operation',
    },
    AddEditConnection: {
        caption: 'Add or Edit Connection',
        name: 'Name',
        server: 'Server',
        dataSource: 'DataSource',
        initialCatalog: 'InitialCatalog',
        userID: 'UserID',
        integratedSecurity: 'IntegratedSecurity',
        password: 'Password',
        testConnection: 'Test Connection',
    },

    DepartmentList: {
        newMember: 'new',
        departmentCaption: 'Organization',
        memberCaption: 'Member',
        tbl_th_Name: 'Name',
        tbl_th_Role: 'Role',
        tbl_th_Operation: 'Operation',
        selectOprganozation: 'First choose Oprganization',
    },
    AddEditDepartment: {
        caption: 'Add or Edit Organization',
        name: 'Name',
        workEmail: 'Email',
        smpt: 'SMTP',
        port: 'Port',
        emailUserName: 'Email UserName',
        emailPassword: 'Email Password',
    },
    AddEditDepartmentMember: {
        caption: 'Add or Edit Member',
        add: 'Add',
        user: 'User',
        role: 'Role',
        tbl_th_Name: 'Name',
        tbl_th_Delete: 'Delete',
    },

    ActionList: {
        caption: 'Actions',
        name: 'Name',
        action: 'Action',
        selectAction: 'Select An Action',
        createBpmsUser: 'Create Bpms User',
        createSiteUser: 'Create Site User',
        getUserPropertyByID: 'Get User Property By ID',
        getUserPropertyByUserName: 'Get User Property By UserName',
        addError: 'Add Error',
        addInfo: 'Add Info',
        addSuccess: 'Add Success',
        addWarning: 'Add Warning',
        getUserID: 'Get User ID',
        getRoleCode: 'Get Role Code',
        getRoleCodeList: 'Get RoleCode List',
        addRoleToUser: 'Add Role To User',
        removeRoleFromUser: 'Remove Role From User',
        getDepartmentHierarchyByUserId: 'Get Department Hierarchy By UserId',
        redirectUrl: 'Redirect Url',
        redirectForm: 'Redirect Form',
        setVariable: 'Set Variable',
        setControl: 'Set Control',
        manageWebService: 'Manage WebService',
        manageSqlFunction: 'Sql Query',
        createEntity: 'Create Entity',
        updateEntity: 'Update Entity',
        deleteEntity: 'Delete Entity',
        tbl_th_Name: 'Name',
        tbl_th_Action: 'Action',
        tbl_th_Operation: 'Operation',
    },
    AddEditJavaScript: {
        caption: 'Java Script',
        operations: 'Operations',
        formControls: 'Form Controls',
        script: 'Script',
    },
    BusinessRuleDiagram: {
        caption: 'Select Next Element',
        nextElement: 'Next Element',
        caption: 'Java Script',
        caption: 'Java Script',
    },
    CallMethodForm: {
        caption: 'Method',
        name: 'Name',
        variable: 'Set result in variable',
        tbl_th_Parameter: 'Parameter',
        tbl_th_Value: 'Value',
    },
    ConditionForm: {
        caption: 'Method',
        name: 'Name',
        type: 'Type',
        add: 'Add',
        tbl_th_FirstConditionValue: 'First Value',
        tbl_th_OperationType: 'Operator',
        tbl_th_SecondConditionValue: 'Second Value',
        tbl_th_Delete: 'Delete',
    },
    DesignCodeForm: {
        caption: 'Business Rule',
        DiagramHelp: `By selecting each shape(action) and right-clicking on it, a list of operations will be shown, and by selecting one, a new action will be added to the diagram.
By double-clicking on any shape(action), you can specify the activity associated with it. However, by right-clicking, the edit menu will be displayed.`,
    },
    EntityForm: {
        caption: 'Entity',
        name: 'Name',
        entity: 'Entity',
        tbl_th_Required: 'Required',
        tbl_th_Value: 'Value',
        tbl_th_Parameter: 'Parameter',
    },
    ExpressionCodeForm: {
        caption: 'Expression',
        name: 'Name',
        systemicMethods: 'Systemic Methods',
        variablesMethods: 'Variables Methods',
        messageMethods: 'Message Methods',
        accessMethods: 'Access Methods',
        helperMethods: 'Helper Methods',
        documentMethods: 'Document Methods',
        folders: 'Folders',
        systemicVariables: 'Systemic Variables',
        applicationPages: 'Application Pages',
        roles: 'Roles',
        controls: 'Controls',
        organizations: 'Organizations',
        description: 'Description',
        variable: 'Variable',
        assemblies: 'Assemblies',
    },
    SelectTypeValue: {
        caption: 'Value',
        type: 'Type',
        variable: 'Variable',
        static: 'Static',
        control: 'Form Control',
        urlParameter: 'Url Parameter',
        systemicParameter: 'Systemic Parameter',
        currentUserID: 'Current User ID',
        currentUserName: 'Current UserName',
        threadUserID: 'Thread User ID',
        threadID: 'threadID',
    },
    SetControlForm: {
        caption: 'Set Control',
        name: 'Name',
        control: 'Control',
        value: 'Value',
        delete: 'Delete',
        add: 'Add Control',
    },
    SetVariableForm: {
        caption: 'Set Variable',
        name: 'Name',
        variable: 'Variable',
        value: 'Value',
        delete: 'Delete',
        add: 'Add Variable',
    },
    WebServiceForm: {
        caption: 'Web Service',
        name: 'Name',
        url: 'Url',
        methodType: 'Method Type',
        contentType: 'Content Type',
        retVariableName: 'Put result into',
        tbl_th_Parameter: 'Parameter',
        tbl_th_Value: 'Value',
        tbl_th_Delete: 'Delete',
        addParameter: 'Add Parameter',
        addHeader: 'Add Header',
        tbl_th_Header: 'Header',
    },

    SqlFunctionForm: {
        caption: 'Sql Query',
        name: 'Name',
        query: 'Query',
        methodType: 'Type',
        retVariableName: 'Put result into',
        tbl_th_Parameter: 'Parameter',
        tbl_th_Value: 'Value',
        tbl_th_Delete: 'Delete',
        addParameter: 'Add Parameter',
    },

    DynamicFormList:
    {
        caption: 'Pages',
        new: 'New',
        tbl_th_Name: 'Name',
        tbl_th_Overview: 'Overview',
        tbl_th_CreatedBy: 'Created By',
        tbl_th_CreatedDate: 'Created Date',
        tbl_th_UpdatedBy: 'Updated By',
        tbl_th_UpdatedDate: 'Updated Date',
        tbl_th_Operation: 'Operation',
        copy: 'Copy',
        makeCopy: 'Copy this item?',
    },
    AddDynamicForm: {
        caption: 'Add or Edit Page',
        name: 'Name',
        showInOverview: 'Show In Overview?',
        isEncrypted: 'Is Encrypted?',
    },
    AddEditFormDesign: {
        onLoadJavaScript: 'Java Script',
        openStyleSheet: 'StyleSheet',
        openBeforeCode: 'OnLoad-Rule',
        openAfterCode: 'Post-Rule',
        preview: 'Preview',
        setting: 'Setting',
        openFormEditApplicationPage: 'Edit Info',
        AddDynamicForm: 'Edit Info',
        openVariables: 'Variables',
        saveForm: 'Save Form',
        actions: 'Actions',
    },
    AddEditStyleSheet: {
        caption: 'Style',
        style: 'Style',
    },
    EditApplicationPage: {
        caption: 'Edit Page',
        user: 'User',
        name: 'Name',
        group: 'Group',
        description: 'Description',
        showInMenu: 'Show In Menu?',
        isEncrypted: 'Is Encrypted?',
        byRoles: 'By Roles',
        role: 'Role',
        organization: 'Organization',
        addRole: 'Add Role',
        tbl_th_Role: 'Role',
        tbl_th_Organization: 'Organization',
        tbl_th_AllowView: 'AllowView',
        tbl_th_AllowAdd: 'Allow Add',
        tbl_th_AllowEdit: 'Allow Edit',
        tbl_th_AllowDelete: 'Allow Delete',
        tbl_th_Operation: 'Operation',
        byUsers: 'By Users',
        addUser: 'Add User',
        tbl_th_FullName: 'Name',
    },

    EmailAccountList:
    {
        caption: 'Email Account List',
        new: 'New',
        tbl_th_Email: 'Email',
        tbl_th_SMTP: 'SMTP',
        tbl_th_Port: 'Port',
        tbl_th_MailUserName: 'Mail UserName',
        tbl_th_Operation: 'Operation',
    },
    AddEditEmailAccount: {
        caption: 'Add or Edit Email',
        smtp: 'SMTP',
        port: 'Port',
        mailUserName: 'Mail UserName',
        mailPassword: 'MailPassword',
        email: 'Email',
        test: 'Test',
    },

    EntityDefList:
    {
        caption: 'Entities',
        new: 'New',
        tbl_th_DisplayName: 'Display Name',
        tbl_th_Name: 'Name',
        tbl_th_TableName: 'Table Name',
        tbl_th_Operation: 'Operation',
    },
    AddEditEntityDef: {
        caption: 'Add or Edit Entity',
        formischanged: 'Form was changed ,do you want to save it?',
        displayName: 'Display Name',
        name: 'Name',
        tableName: 'Table Name',
        tbl_th_Name: 'Name',
        tbl_th_DbType: 'Db Type',
        tbl_th_Length: 'Length',
        tbl_th_Required: 'Required',
        tbl_th_DefaultValue: 'Default Value',
        tbl_th_Description: 'Description',
        tbl_th_Delete: 'Delete',
        newProperty: 'Add Property',
        tbl_th_ForeignTable: 'foreign table',
        tbl_th_Foreignkey: 'foreign key',
        tbl_th_key: 'key',
        newRelation: 'Add Relation',
    },

    AddEditEvent:
    {
        caption: 'Event Setting',
        new: 'New',
    },
    SubTypeCatchMessage:
    {
        keyType: 'Key Type',
        key: 'Key',
        messageType: 'Message Type',
        tbl_th_Variable: 'Variable',
        tbl_th_Paramtere: 'Paramtere',
    },
    SubTypeThrowMessage:
    {
        type: 'Type',
        keyType: 'Key Type',
        key: 'Key',
        messageType: 'Message Type',
        tbl_th_Variable: 'Variable',
        tbl_th_Paramtere: 'Paramtere',
        from: 'From',
        toType: 'To Type',
        to: 'To',
        subject: 'Subject',
        content: 'Body',
        variable: 'Variable',
    },
    SubTypeTimer:
    {
        type: 'Type',
        setType: 'Set Type',
        intervalType: 'Interval Type',
        variable: 'Variable',
        minute: 'Minute',
        dateTime: 'DateTime',
        hour: 'Hour',
        daysofweek: 'Days of week',
        daysofmonths: 'Days of months',
        repeatTimes: 'The number of repetitions',
    },

    FolderList:
    {
        caption: 'Folder',
        documentCaption: '',
        folderNew: 'New',
        tbl_th_DisplayName: 'Display Name',
        tbl_th_Name: 'Name',
        tbl_th_IsMandatory: 'Required',
        tbl_th_MaxSize: 'Max Size(KB)',
        tbl_th_ValidExtentions: 'Valid Extentions',
        tbl_th_Operation: 'Operation',
    },
    AddEditFolder:
    {
        caption: 'Add Or Edit Folder',
        displayName: 'Display Name',
        name: 'Name',
    },
    AddEditDef:
    {
        caption: 'Add Or Edit Document',
        displayName: 'Display Name',
        name: 'Name',
        maxSize: 'Max Size (KB)',
        validExtentions: 'Valid Extentions',
        isMandatory: 'Required?',
    },

    JavaScriptList:
    {
        caption: 'Java Script',
        new: 'Upload New File',
        tbl_th_FileName: 'FileName',
        tbl_th_Size: 'Size(KB)',
        tbl_th_Operation: 'Operation',
    },

    LookUpList:
    {
        caption: 'LookUp',
        new: 'New',
        tbl_th_Name: 'Name',
        tbl_th_Code: 'Code',
        tbl_th_DisplayOrder: 'Display Order',
        tbl_th_Systemic: 'Is Systemic',
        tbl_th_Operation: 'Operation',
    },
    AddEditLookUp:
    {
        caption: 'Add or Edit LookUp',
        name: 'Name',
        displayOrder: 'Display Order',
        code: 'Code',
    },

    MessageTypeList:
    {
        caption: 'Messages',
        new: 'New',
        tbl_th_Name: 'Name',
        tbl_th_IsActive: 'Active',
        tbl_th_Operation: 'Operation',
    },
    AddEditMessageType:
    {
        caption: 'Add or Edit Message',
        name: 'Name',
        new: 'Add Parameter',
        tbl_th_Name: 'Name',
        tbl_th_IsRequired: 'Required',
        tbl_th_Delete: 'Delete',
    },
    ProcessList:
    {
        groupCaption: 'Group',
        selectGroup: 'First select group',
        processCaption: 'Processes',
        new: 'New',
        tbl_th_FormattedNumber: 'Formatted Number',
        tbl_th_Name: 'Name',
        tbl_th_Status: 'Status',
        tbl_th_Creator: 'Created By',
        tbl_th_CreatedOn: 'Created On',
        tbl_th_UpdatedOn: 'Updated On',
        tbl_th_Type: 'Type',
        tbl_th_Operation: 'Operation',
        newVersion: 'Are you sure to add new version?',
        makeStop: 'Stop this process?',
        stop: 'Stop',
    },
    AddEditProcessGroup: {
        caption: 'Add Or Edit Group',
        name: 'Name',
        description: 'Description',
    },
    AddProcess: {
        caption: 'Add Process',
        name: 'Name',
        parallelCountPerUser: 'Parallel Count Per User',
        type: 'Type',
        description: 'Description',
    },
    DesignProcess: {
        activitySetting: 'Activity Setting',
        conditionSetting: 'Condition Setting',
        codeSetting: 'Setting',
        eventSetting: 'Event Setting',
        description: 'Description',
        actions: 'Actions',
        saveForm: 'Save Diagram',
        openEditProcess: 'Edit Process',
        openVariables: 'Variables',
        stop: 'Stop',
        forms: 'Go to forms',
    },
    EditProcess: {
        caption: 'Edit Process',
        name: 'Name',
        parallelCountPerUser: 'Parallel Count Per User',
        type: 'TypeLU',
        description: 'Description',
    },
    GatewayManagment: {
        caption: 'Gateway',
        new: 'Add Condition',
        sequenceFlow: 'Sequence Flow',
        rule: 'Rule',
        delete: 'Delete',
    },
    UserTaskIndex: {
        caption: 'Task Setting',
        steps: 'Steps',
        access: 'Access',
        tbl_th_Name: 'Name',
        tbl_th_Form: 'Form',
        tbl_th_Delete: 'Delete',
        newStep: 'Add Step',
        ownerType: 'Owner',
        accessType: 'Access',
        user: 'User',
        tbl_th_Name: 'Name',
        variable: 'Variable',
        roleName: 'Role',
        userType: 'User Type',
        department: 'Organization',
        goUpDepartment: 'Go Up Organization',
    },

    AddEditSetting: {
        caption: 'Configuration',
        defaultReportFontFamily: 'Report Font Family',
        processStartPointSerlialNumber: 'Serial number starting point of the process',
        processFormatSerlialNumber: 'Format of Process Serial Number',
        threadStartPointSerlialNumber: 'Start Point of Thread Serial Number',
        threadFormatSerlialNumber: 'Format of Thread Serial Number',
        noContainerPath: 'No Container Path',
        noSkinPath: 'No Skin Path',
        addUserAutomatically: 'Add user automatically when open user panel if it does not exist in user table and it is authorized.',
        showUserPanelWithNoSkin: 'show user panel with noskin(recommended)',
        loadUserPanelJquery: 'load jQuery on user panel(if not you have to load jQuery in skin)',
        loadUserPanelBootstrap: 'load bootstrap on user panel(if not you have to load Bootstrap in skin)',
    },

    StyleSheetList: {
        caption: 'Style List',
        uploadNewStyle: 'Upload New Style',
        addNewStyle: 'Add New Style',
        tbl_th_FileName: 'File Name',
        tbl_th_Size: 'Size(KB)',
        tbl_th_Operation: 'Operation',
    },
    AddEditStyleSheet:
    {
        caption: 'Add or Edit Style',
        fileName: 'File Name',
        style: 'Style',
    },

    ThreadList: {
        caption: 'Requests',
        process: 'Process',
        advStartDateFrom: 'Start Date From',
        advStartDateTo: 'Start Date To',
        advEndDateTo: 'End Date To',
        advEndDateFrom: 'End Date From',
        tbl_th_Select: 'Select',
        tbl_th_Name: 'Name',
        tbl_th_Number: 'Number',
        tbl_th_FullName: 'Full Name',
        tbl_th_StartDate: 'Start Date',
        tbl_th_EndDate: 'End Date',
        tbl_th_Status: 'Status',
        tbl_th_Operation: 'Operation',
        delete: 'Delete',
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

    UserList: {
        caption: 'Users',
        new: 'New',
        advName: 'Name',
        advRoleCode: 'Role',
        name: 'Name',
        advDepartmentID: 'Organization',
        tbl_th_Username: 'User Name',
        tbl_th_FirstName: 'First Name',
        tbl_th_LastName: 'Last Name',
        tbl_th_Email: 'Email',
        tbl_th_Operation: 'Operation',
    },
    AddEditUser:
    {
        caption: 'Add or Edit User',
        collapsInfo: 'General Info',
        collapsEmail: 'Email Info (this email will be used in processes and tasks)',
        username: 'User Name',
        email: 'Email',
        firstName: 'First Name',
        lastName: 'Last Name',
        tel: 'Telephone',
        mobile: 'Mobile',
        password: 'Password',
        smpt: 'SMTP',
        port: 'Port',
        mailUserName: 'Email User Name',
        mailPassword: 'Email Password',
        email: 'Email',
    },

    VariableList: {
        caption: 'Variables',
        new: 'New',
        tbl_th_Name: 'Name',
        tbl_th_Type: 'Data Type',
        tbl_th_Relation: 'Type',
        tbl_th_Operation: 'Operation',
    },
    AddEditVariable:
    {
        caption: 'Add or Edit Variable',
        name: 'Name',
        defaultValue: 'Default Value',
        varTypeLU: 'Data Type',
        relation: 'Type',
        entity: 'Entity',
        filterTypeLU: 'Filter',
        whereClause: 'Where Query',
        orderBy: 'Order By',
        fieldName: 'Field Name',
        tbl_th_DependentPropertyName: 'Dependent Property Name',
        tbl_th_Variable: 'Variable',
        tbl_th_ToPropertyName: 'To Property Name',
        tbl_th_Description: 'Description',
        tbl_th_Delete: 'Delete',
        addDependnet: 'Add Dependnet',
        connection: 'Connection',
        query: 'Query',
        tbl_th_Key: 'Key',
        tbl_th_Text: 'Text',
        tbl_th_Delete: 'Delete',
        addItem: 'Add Item',
    },
    SelectVariable: {
        caption: 'Variables',
        new: 'New',
        tbl_th_Select: 'Select',
        tbl_th_Name: 'Name',
        tbl_th_Type: 'Data Type',
        tbl_th_Filter: 'Filter',
        tbl_th_Edit: 'Edit',
    },
};
export default langEn;