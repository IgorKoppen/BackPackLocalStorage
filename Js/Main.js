const Form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const MessageBox = document.getElementById("MessageBox");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(elemento => {
    criaElemento(elemento)
});


Form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade']
 
   if(nome.value === "" || quantidade.value === ""){
    MessageBox.classList.add("active")
    MessageBox.innerHTML = `<p>Todos os campos devem ser prenchidos!</p>`;
   return
   }else{
    MessageBox.classList.remove("active")
    MessageBox.innerHTML = "";
   }

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
     itemAtual.id = existe.id;

     atualizaElement(itemAtual)
     itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id  = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0
        criaElemento(itemAtual)
        itens.push(itemAtual);
    }
    localStorage.setItem("itens", JSON.stringify(itens))
    
    nome.value = "";
    quantidade.value = "";

})

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElement(item){
   document.querySelector("[data-id='"+ item.id+"']").innerHTML = item.quantidade
   
}

function botaoDeleta(id){
const elementoBotao = document.createElement("button")
elementoBotao.innerText = "X";
elementoBotao.classList.add("BotaoDeletar")
elementoBotao.addEventListener("click", function(){
    deletaElemento(this.parentNode, id)
}) 
return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id),1)
    localStorage.setItem("itens", JSON.stringify(itens));
}

