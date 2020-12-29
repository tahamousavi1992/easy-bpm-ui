
import langEn from "./Lang-en.js";
let Lang = langEn;
switch (window.culture) {
    case 'en':
        Lang = langEn;
        break; 
    default:
        Lang = langEn;
        break;
} 
export default Lang;