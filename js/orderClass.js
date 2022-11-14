const getOrderClass = (stringNumber) => {
    const arrNumber = stringNumber.split(",");
    return arrNumber.sort((a, b) => {
        a = Number(a);
        b = Number(b);
        if(a == b) {
          return 0; 
        }
        if(a < b) {
          return -1;
        }
        return 1;
      });
}

const getFi = (Xi) => {
    var Fi = {};
    Xi.forEach(n => {
        let value = (Fi[n]||0)+1;
        return Fi[n] = value });
    return Fi;
}
const getFa = (Fi) => {
    const Fa = []
    for (const iterator of Object.keys(Fi)) {
        if(!Fa.length) { Fa.push(Fi[iterator]);}
        else {
            const lastFa = Fa[Fa.length-1];
            Fa.push(lastFa + Fi[iterator]);
        }
    }
    return Fa
}

const getFr = (Fi, N) => {
    const Fr = []
    for (const iterator of Object.keys(Fi)) {
        const number = Fi[iterator]
        const result = number/N;
        Fr.push(Number(result.toFixed(4)));
    }
    return Fr
}

const getFra = (Fr) => {
    let  Fra = [];
    Fr.reduce((numberP, numberN)=>{
        Fra.push(Number((numberP + numberN).toFixed(4)));
        return numberP + numberN;
    },0);
    return Fra;
}
const getFp =  (Fr) => {
    const Fp = []
    for (const iterator of Object.keys(Fr)) {
        const number = Fr[iterator]
        const result = number*100;
        Fp.push(Number(result.toFixed(4)));
    }
    return Fp
}
const getFap = (Fp) => {
    let  Fap = [];
    Fp.reduce((numberP, numberN)=>{
        let result = numberP + numberN;
        result = Number(result.toFixed(4));
        Fap.push(result);
        return result;
    },0);
    return Fap;
}

const getProcess = (stringNumber) => {
    //12,13,22,23,24,33,34,54;
    // 4.00,4.00,4.00,4.10,4.10,4.10,4.10,4.10,4.10,4.10,4.10,4.10,4.10, 4.20, 4.20,4.20,4.20, 4.30, 4.30,4.30,4.30,4.30,4.30,4.30, 4.40, 4.40,4.40,4.40,4.40,4.40,4.40,4.40,4.50,4.50,4.50,4.50,4.50,4.50,  4.60,4.60,4.60,4.60,4.60,4.70,4.70,4.70,4.70,4.80,4.80,4.80,4.90,4.90,4.90,4.90,5.00,5.00,5.00,5.10, 5.20, 5.30, 5.40, 5.40 
    // const stringNumber = "7.24,7.25,7.26,7.27,7.27,7.28,7.28,7.29,7.29,7.29,7.30,7.30,7.30, 7.31, 7.31,7.32,7.32, 7.32, 7.32,7.32,7.33,7.33,7.33,7.34, 7.34, 7.34,7.34,7.35,7.35,7.35,7.35,7.35,7.35,7.35,7.35,7.36,7.36,7.36,  7.36,7.36,7.36,7.37,7.37,7.37,7.38,7.38,7.38,7.39,7.39,7.39,7.40,7.40,7.40,7.41,7.41";
    const Xi = getOrderClass(stringNumber);
    const Fi = getFi(Xi);
    const Fa = getFa(Fi);
    const Fr = getFr(Fi, Xi.length);
    const Fra = getFra(Fr);
    const Fp = getFp(Fr);
    const Fap = getFap(Fp);

    return {Xi, Fi, Fa, Fr, Fra, Fp, Fap}
}


export {getProcess}