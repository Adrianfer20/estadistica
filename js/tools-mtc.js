import { getProcess } from "./orderClass.js";

const getFirtClass = (Li,Ic,Um) => {
    let Ls = Number(Li)+Ic-Um;
    return {"Li":Li, "Ls":Ls}
}
const getUm = (valor) => {
    let n = String(valor).split(".")
    if(!n[1])return 1;
    if(n[1].length == 1) return 0.1;
    if(n[1].length == 2) return 0.01;
    if(n[1].length == 3) return 0.001;
    return alert("Unida de medida no valida.")
}

const getAllClass = (firtClass, VM) => {
    const nexClass = {"Li":firtClass[firtClass.length-1].Ls+1, "Ls":firtClass[firtClass.length-1].Ls+9};
    firtClass.push(nexClass);
    if(firtClass[firtClass.length-1].Ls >= VM) return firtClass;
    return getAllClass(firtClass,VM);
}

const getAllFa = (allFi) => {
    const allFa = [];
    allFi.forEach(Fi => {
        if(allFa.length == 0)return allFa.push(Fi);
        let lastFi = allFa[allFa.length-1];
        allFa.push(Fi+lastFi);
    });
    return allFa;
}

const getAllFi = (allClass,Xi,Fi,count) =>  {
    const ls = allClass[count].Ls;
    const li = allClass[count].Li;
    let result = 0;
    Xi.forEach(valor => {
        if(valor >= li && valor <= ls ) result = result+1;
    });
    Fi.push(result);
    if(count >= allClass.length-1)return Fi;
    return getAllFi(allClass,Xi,Fi,count+1);
}

const getAllXm = (allClass) => {
    const Xm = [];
    allClass.forEach(clase => {
        let result = (Number(clase.Li) + Number(clase.Ls))/2;
        Xm.push(result);
    });
    return Xm;
}
const getAllLVC = (allClass) => {
    const allLVC = allClass.map(obj => {
        return {"Li":obj.Li-.5, "Ls":obj.Ls+.5}
    });
    return allLVC;
}

const getMedia = (FixXm, N) => {
    const addFixXm = FixXm.reduce((previus,now)=> now + previus ,0);
    const X = addFixXm/N;
    return X;
}

const getXmLessXAdsolut = (XmLessX)=> {
    const XmLessXAdsolut = XmLessX.map((media)=> {
        if(media>0)return media;
        let num = media;
        num -= num*2;
        return num;
    });
    return XmLessXAdsolut;
}

const getMTC = (value) => {
    let MTC = {};
    //1re Paso Ordenar Datos;
    const {Xi} = getProcess(value);

    //2do Paso Intervalo Total = It;
    // It = VM - (Vm + Um);
    const VM = +Xi[Xi.length-1];
    const Vm = Number(Xi[0]);
    const Um = getUm(Vm);
    const It = VM - (Vm + Um); 

    //3er Paso Intervalo de Clase = Ic;
    const N = Xi.length;
    const Ic = Math.round(It / (1+3.322*Math.log10(N)));
    
    //4to Paso Tabla de Distribucion y Frecuencia;
    //Clases
    const firtClass = getFirtClass(Vm,Ic,Um);
    const allClass = getAllClass([firtClass], VM);
    //Fi
    const allFi = getAllFi(allClass,Xi,[],0);
    //Fa
    const allFa = getAllFa(allFi);
    //Xm
    const allXm = getAllXm(allClass);
    //LVC
    const allLVC = getAllLVC(allClass);
    //Fi*Xm
    const allFiMultiplyXm = allFi.map((fi,i)=> fi * allXm[i]);

    //5to Paso Obtener La Media;
    //La Media = X = ...Fi*Xm/N; 
    const X = getMedia(allFiMultiplyXm, N);

    //6to Paso Tabla de Adsolutas y No Adsolutas
    //(Xm-X)
    const XmLessX = allXm.map(Xm=> +(Xm - X).toFixed(2));
    //|Xm-X|
    const XmLessXAdsolut = getXmLessXAdsolut(XmLessX);
    //Fi*|Xm-X|
    const FiMultiplyXmLessX = allFi.map((fi,i)=>+(fi*XmLessXAdsolut[i]).toFixed(4));
    //Fi*(Xm-X)2
    const FiMultiplyXmLessX2 = allFi.map((Fi,index)=>{
        const result = XmLessX[index]*XmLessX[index];
        return +(Fi * result).toFixed(4);
    });

    const addFiMultiplyXmLessX = FiMultiplyXmLessX.reduce((previus,now)=> now + previus, 0);
    const addFiMultiplyXmLessX2 = FiMultiplyXmLessX2.reduce((previus,now)=> +now + previus, 0);
    const DM = addFiMultiplyXmLessX;
    const S2 = addFiMultiplyXmLessX2/N;
    const S = Math.sqrt(S2);
    const CV = (S*100)/X;

    MTC = {
        "sortedData":Xi,
        VM,Vm,Um,It,Ic,N,
        "TableFirt":{
            "class": allClass,
            "fi": allFi,
            "fa": allFa,
            "Xm": allXm,
            "LVC":allLVC,
            "FiLessXm":allFiMultiplyXm
        },
        "TableUnitAdsolut":{
            XmLessX,
            XmLessXAdsolut,
            FiMultiplyXmLessX,
            FiMultiplyXmLessX2
        },
        DM,
        "mediaFi*Xm-X": addFiMultiplyXmLessX,
        "mediaFi*Xm-X2": addFiMultiplyXmLessX2,
        "Desviacion Media = DM": DM,
        "La Varianza = S2": S2,
        "Desviacion Tipica =  S": S,
        "Conciente de Variacion = CV": CV
    }

    return MTC;
}

export {getMTC}