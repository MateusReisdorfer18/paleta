const paleta = document.querySelector('#paleta');
const cores = document.querySelectorAll('#paleta div');
const divRes = document.querySelector('#res');
const inptAdd = document.querySelector('#nova-cor');
const btnAdd = document.querySelector('#adicionar');
const btnRemove = document.querySelectorAll("#remover");

let arrCores = [];

/*const coresSalvas = localStorage.getItem('Cores');

if(coresSalvas){
    arrCores = JSON.parse(coresSalvas);
};*/

const mostrarCor = (elemento, cor) => {
    elemento.addEventListener('click', () => {
        divRes.style.backgroundColor = cor;
        divRes.style.boxShadow = `-3px 2px 8px ${cor}`;
        divRes.style.border = `1px solid ${cor}`;
    });
};

const addArray = (array, cor) => {
    array.push(cor);
};

cores.forEach((cor) => {
    const dataCor = cor.getAttribute('data-cor');

    addArray(arrCores, dataCor);
    mostrarCor(cor, dataCor);
});

const addCor = () => {
    const inptAddValor = inptAdd.value;

    if (!arrCores.includes(inptAddValor)) {
        const div = document.createElement('div');
        div.setAttribute('data-cor', inptAddValor);
        div.setAttribute('class', inptAddValor);
        div.style.backgroundColor = inptAddValor;
        div.style.boxShadow = `-3px 2px 8px ${inptAddValor}`;

        const btnRemover = document.createElement('input');
        btnRemover.setAttribute('type', 'button');
        btnRemover.setAttribute('value', 'X');
        div.appendChild(btnRemover);

        removerCor(btnRemover);

        paleta.appendChild(div);

        const dataCor = div.getAttribute('data-cor');
        addArray(arrCores, dataCor);
        mostrarCor(div, dataCor);
        removerArray(btnRemover, dataCor);

        localStorage.setItem('Cores', JSON.stringify(arrCores));

        inptAdd.value = '';
        inptAdd.focus();
    } else {
        alert('Essa cor já existe!');
    };
}; 

const removerArray = (btn, cor) => {
    btn.addEventListener('click', () => {
        let index = arrCores.findIndex((item) => item === cor);

        if (index !== -1){
            arrCores.splice(index, 1)
            console.log(arrCores);
        };
    });
};

const removerCor = (btn) => {
    btn.addEventListener('click', () => {
        const parentDiv = btn.closest('div');

        parentDiv.remove();
    });
};

btnAdd.addEventListener('click', () => {
    addCor();
    console.log(arrCores);
});

btnRemove.forEach((btn) => {
    const parentDiv = btn.closest('div');
    const dataCor = parentDiv.getAttribute('data-cor');

    removerCor(btn);
    removerArray(btn, dataCor);
});