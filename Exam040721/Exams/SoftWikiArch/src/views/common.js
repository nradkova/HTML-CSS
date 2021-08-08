import { html, render } from '../../node_modules/lit-html/lit-html.js'

const notificationsTemplate = (code, msg) => html` 
${code == 'load'
        ? html`<div id="loadingBox" class="notification">
        <span>Loading …</span>
</div>`
        : ''}
${code == 'info'
        ? html`<div id="infoBox" class="notification">
        <span>${msg}</span>
</div>`
        : ''}
${code == 'error'
        ? html`<div id="errorBox" class="notification">
        <span>${msg}</span>
</div>`
        : ''}`;

const container = document.querySelector('main');

export default function notify(code, msg) {
    if (code != 'load') {
        render(notificationsTemplate(code, msg), container);
        setTimeout(clear, 3000);
    }else{
        return  render(notificationsTemplate(code, msg), container);
    }
}
function clear() {
        render('', container)
}