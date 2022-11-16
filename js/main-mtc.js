    import { getProcess } from "./orderClass.js";
    const $formApp = document.getElementById('form-app');

    const getLs = (Li,Ic,Um) => {
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

    const getAllClassFa = (allClassFi) => {
        const allClassFa = [];
        allClassFi.forEach(Fi => {
            if(allClassFa.length == 0)return allClassFa.push(Fi);
            let lastFi = allClassFa[allClassFa.length-1];
            allClassFa.push(Fi+lastFi);
        });
        return allClassFa;
    }

    const getAllClassFi = (allClass,Xi,Fi,count) =>  {
        const ls = allClass[count].Ls;
        const li = allClass[count].Li;
        let result = 0;
        Xi.forEach(valor => {
            if(valor >= li && valor <= ls ) result = result+1;
        });
        Fi.push(result);
        if(count >= allClass.length-1)return Fi;
        return getAllClassFi(allClass,Xi,Fi,count+1);
    }

    const getAllClassXm = (allClass) => {
        const Xm = [];
        allClass.forEach(clase => {
            let result = (Number(clase.Li) + Number(clase.Ls))/2;
            Xm.push(result);
        });
        return Xm;
    }
    const getAllClassLVC = (allClass) => {
        const allClassLVC = allClass.map(obj => {
            return {"Li":obj.Li-.5, "Ls":obj.Ls+.5}
        });
        return allClassLVC;
    }

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

            const {Xi} = getProcess(value);

            const VM = Xi[Xi.length-1];
            const Vm = Number(Xi[0]);
            const Um = getUm(Vm);
            const N = Xi.length;
            const It = VM - Vm + Um; 
            const Ic = Math.round(It / (1+3.322*Math.log10(N)));
            const firtClass = getLs(Vm,Ic,Um);

            //Data Table;
            const allClass = getAllClass([firtClass], VM);
            const allClassFi = getAllClassFi(allClass,Xi,[],0);
            const allClassFa = getAllClassFa(allClassFi);
            const allClassXm = getAllClassXm(allClass);
            const allClassLVC = getAllClassLVC(allClass);
            const allClassFixXm = allClassFi.map((Fi,index)=> {
                return Fi * allClassXm[index];
            });

            const laMediaX = allClassFixXm.reduce((valorAnterior,valorActual)=>{return valorActual + valorAnterior},0)/N; 


            //(Xm-X)
            const XmMenosLaMediaX = allClassXm.map(Xm=>{return +(Xm - laMediaX).toFixed(2)});
            //|Xm-X|
            const XmMenosLaMediaXadsoluta = XmMenosLaMediaX.map((media)=> {
                if(media>0)return media;
                let num = media;
                num -= num*2;
                return num;
            });

            //Fi*|Xm-X|
            const FiXmX = allClassFi.map((Fi,index)=>{
                return +(Fi*XmMenosLaMediaXadsoluta[index]).toFixed(4);
            })
            //Fi*(Xm-X)2
            const FiXmX2 = allClassFi.map((Fi,index)=>{
                const result = XmMenosLaMediaX[index]*XmMenosLaMediaX[index];
                return +(Fi * result).toFixed(4);
            });


            console.info("DATOS ORDENADOS:", Xi);
            console.info("CLASES:", allClass);
            console.info("Fi:", allClassFi);
            console.info("Fa", allClassFa);
            console.info("LVC", allClassLVC);
            console.info("Fi * Xm", allClassFixXm);
            console.info("Media =", laMediaX);
            console.info("(Xm - X)", XmMenosLaMediaX);
            console.info("|Xm - X|", XmMenosLaMediaXadsoluta);
            console.info("Fi * |Xm - X|", FiXmX);
            console.info("Fi * (Xm - X)2", FiXmX2);

        }
    }

    $formApp.addEventListener('click', (e)=>clickApp(e));