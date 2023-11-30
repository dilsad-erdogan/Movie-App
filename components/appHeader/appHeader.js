const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `
    <header> | Movie App | </header>
    <head>
        <link rel="stylesheet" href="components/appHeader/appHeader.css">
    </head>
`

class appHeader extends HTMLElement {
    constructor(){
        super();
        
        this.attachShadow({mode : "open"});
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    }
}

window.customElements.define("app-header", appHeader);