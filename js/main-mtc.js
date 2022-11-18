import { getMTC } from "./tools-mtc.js";
const $formApp = document.getElementById('form-app');


    const clickApp = (e)=> {
        const {id} = e.target;
        if(id == 'btn-input'){
            e.preventDefault();
            let {value} = $formApp.querySelector('input');
            if(!value)return alert('Ingresar al menos una clase.');
            const test = "119, 125,126,128,132,135,135,135,136,138,138,140,140,142,142,144,144,145,145,146,146,147,147,148,149,150,150,152,153,154,156,157,158,161,163,164,165,168,173,176";

            if(value === 'ejemplo'){
                 value = "119, 125,126,128,132,135,135,135,136,138,138,140,140,142,142,144,144,145,145,146,146,147,147,148,149,150,150,152,153,154,156,157,158,161,163,164,165,168,173,176";
            }
            const MTC = getMTC(value);
            const wrapper = document.getElementById('wrapper');
            const pre = document.createElement('pre');
            pre.innerHTML = `
                ${JSON.stringify(MTC,undefined,2)}
            `
            wrapper.appendChild(pre);

        }
    }

    $formApp.addEventListener('click', (e)=>clickApp(e));