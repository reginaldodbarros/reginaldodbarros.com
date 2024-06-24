import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

const tab4dev = createApp(App);
tab4dev.directive('mask-int', {
    mounted: (el) => {
        el.setAttribute('pattern', '\\d*');
        el.addEventListener('paste', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var clipboardData = e.clipboardData || window.clipboardData;
            var pastedData = clipboardData.getData('text/plain');
            el.value = pastedData.replace(/\D/g, '');
        });

        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
            el.addEventListener(event, function (e) {
                if (!e.isTrusted) return;
                let valorTratado = this.value.replace(/\D/g, '');
                if (valorTratado.length < this.value.length) {
                    this.setCustomValidity('Digits only');
                    this.reportValidity();
                } else if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.setCustomValidity("");
                }
                this.value = valorTratado;
                el.dispatchEvent(new CustomEvent('input'));
            });
        });
    }
});
tab4dev.directive('mask-hex', {
    mounted: (el) => {
        el.setAttribute('pattern', '^#?[0-9A-Fa-f]+');
        el.addEventListener('paste', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var clipboardData = e.clipboardData || window.clipboardData;
            var pastedData = clipboardData.getData('text/plain');
            el.value = pastedData.replace(/[^#0-9A-Fa-f]+/g, '');
        });

        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
            el.addEventListener(event, function (e) {
                if (!e.isTrusted) return;
                let valorTratado = this.value.replace(/[^#0-9A-Fa-f]+/g, '');
                if (valorTratado.length < this.value.length) {
                    this.setCustomValidity('Hex chars only');
                    this.reportValidity();
                } else if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.setCustomValidity("");
                }
                this.value = valorTratado;
                el.dispatchEvent(new CustomEvent('input'));
            });
        });
    }
});
tab4dev.mount('#app');
