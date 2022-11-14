import { getProcess } from "./orderClass.js";

const showXi = (Xi) => {
    const $main = document.getElementById('orderNumber');
    $main.innerHTML = '';

    Xi.forEach(number => {
        $main.innerHTML += `<span class="text-center col-span-1">${number}</span>`
    });
}

const getShowFi =  (Fi,indexXi) => {
    let keys = Object.keys(Fi); // keys = ["nombre", "color", "macho", "edad"]
    let result;
    for(let i=0; i< keys.length; i++){
    let key = keys[i];
    let value = Fi[key];
        if(key === indexXi){
            result = value;
        }
    }
    return result;
}
const getShowFa = (Fa, indexFa) => {
    let indexPrevius = indexFa - 1;
    if(indexPrevius === -1) return Fa[indexFa];
    return Fa[indexPrevius] + "+" + (Fa[indexFa]- Fa[indexPrevius]) + "="+ Fa[indexFa];
}
const getShowFr = (result,index, indexXi) => {
    let keys = Object.keys(result.Fi); // keys = ["nombre", "color", "macho", "edad"]
    let Fi;
    for(let i=0; i< keys.length; i++){
    let key = keys[i];
    let value = result.Fi[key];
        if(key === indexXi){Fi = value;break;}
    }
    return `${Fi}/${result.Xi.length} = ${result.Fr[index]}`
}
const getShowFra = (Fra, indexFra)=> {
    let indexPrevius = indexFra - 1;
    if(indexPrevius === -1) return Fra[indexFra];
    let valuePrevius = Fra[indexFra] - Fra[indexPrevius];
    return Fra[indexPrevius] + " + " + valuePrevius.toFixed(4) + " = "+ Fra[indexFra];
}

const getShowFp = (Fr, Fp, index) => {
    return `${Fr[index]} * 100 = ${Fp[index]}`;
}
const getShowFap = (Fap, indexFap) => {
    let indexPrevius = indexFap - 1;
    if(indexPrevius === -1) return Fap[indexFap];
    let valuePrevius = Fap[indexFap] - Fap[indexPrevius];
    return Fap[indexPrevius] + " + " + valuePrevius.toFixed(4) + " = "+ Fap[indexFap];
}
const showResult = (result) => {
    const Xi = [...new Set(result.Xi)];
    const $wrapper = document.getElementById('wrapper');
    const $head = document.getElementById('head-wrapper');
    $wrapper.innerHTML = '';
    $wrapper.appendChild($head); 
    const $fragment = new DocumentFragment();
    Xi.forEach((numberXi,index) => {
        const $divRow = document.createElement('div');
        $divRow.className = 'w-full flex flex-wrap text-sm border border-indigo-600 rounded shadow px-2 py-1 mb-1';
        $divRow.innerHTML = `
        <div class="w-4/12 md:w-2/12 grid grid-cols-3 my-1">
                            <div class="col-span-1 flex items-center justify-center">
                                <h2 class=" self-center">${numberXi}</h2>
                            </div>
                            <div class="col-span-1 flex items-center justify-center">
                            <h2 class=" self-center">${getShowFi(result.Fi, numberXi)}</h2></div>
                            
                            <div class="col-span-1 flex items-center justify-center">
                            <h2 class=" self-center">${getShowFa(result.Fa, index)}</h2>
                            </div>
                        </div>

                        <div class="w-4/12 md:w-2/12 my-1">
                            <div class="flex items-center justify-center"></div>
                            <h2>${getShowFr(result,index, numberXi)}</h2>
                        </div>

                        <div class="w-4/12 md:w-3/12 text-center my-1">
                            <div class="flex items-center justify-center">
                                <h2>${getShowFra(result.Fra, index)}</h2>
                            </div>
                        </div>

                        <div class="w-6/12 md:w-2/12 text-center my-1>
                            <div class="flex items-center justify-center">
                                <h2 ">${getShowFp(result.Fr, result.Fp, index)}</h2>
                            </div>
                        </div>

                        <div class="w-6/12 md:w-3/12 text-center my-1">
                            <div class="flex items-center justify-center">
                                <h2 >${getShowFap(result.Fap, index)}</h2>
                            </div>
                        </div>
        `;
        $fragment.appendChild($divRow);
    });
    $wrapper.appendChild($fragment);
}

const showOrderNumber = () => {
    const {value} = document.getElementById('input-orderNumber');
    if(!value) return alert('Debe introducir obligatoriamente al menos un valor');
    //  const stringNumber = "7.24,7.25,7.26,7.27,7.27,7.28,7.28,7.29,7.29,7.29,7.30,7.30,7.30, 7.31, 7.31,7.32,7.32, 7.32, 7.32,7.32,7.33,7.33,7.33,7.34, 7.34, 7.34,7.34,7.35,7.35,7.35,7.35,7.35,7.35,7.35,7.35,7.36,7.36,7.36,  7.36,7.36,7.36,7.37,7.37,7.37,7.38,7.38,7.38,7.39,7.39,7.39,7.40,7.40,7.40,7.41,7.41";
    const result = getProcess(value);
    let isError = false;
    result.Xi.forEach((numberXi, index) => {
        let position = index + 1;
        let message = '¡Has ingresado un valor que no es valido, en la posicion: ';
       if(!(numberXi>=0)){isError = true; return alert(message + position)}
    });

    if(isError) return;
    showXi(result.Xi);
    showResult(result);
}
const clickApp = (e) => {
    const id = e.target.id;
    if(id == 'btn-order'){
        e.preventDefault()
        return showOrderNumber();
    }
}

window.addEventListener('click', (e)=> clickApp(e));