
class BpmsConfig {
    constructor() {
    }
    static moduleType() { return window.moduleType }
    static currentPage() { return window.rootPage; }
    get AdminUrl() { return window.AdminUrl; }
    get CartableUrl() { return window.CartableUrl; }
    get EngineUrl() { return window.EngineUrl; }
    get SingleActionUrl() { return window.SingleActionUrl; }
}

export default BpmsConfig;