var listaElement= document.querySelector('#salve ul');
var inputLinkElemento= document.querySelector('#salve input[name=link]');
var inputNomelinkElemento= document.querySelector('#salve input[name=Nomelink');
var botaoElement= document.querySelector('#salve button');

var link= {
    NomeLink: '',
    Endlink: ''
}

var todosObjLinks= JSON.parse(localStorage.getItem('list_todos')) || [];  // Carrega a lista do banco de dados local e caso haja erro no carregamento o valor default foi definido lista vazia []

function renderLinks(){     // Renderiza a lista na tela
    listaElement.innerHTML= ""; //O que estiver dentro da ul(html) será colocado como vazio, usado para não reprntar a lista
    for(links of todosObjLinks){
        var ElementoLi= document.createElement('li'); // Cria lista(html)
        var Elementolink= document.createElement('a'); // Cria link(html)
        Elementolink.setAttribute('target','_blank');
        Elementolink.setAttribute('href', links.Endlink); // passa o endereço do link
        var linkText= document.createTextNode(links.NomeLink); // passa o nome do link
        var btExcluirElement= document.createElement('button'); // Cria o elemento botão para o link da lista
        var btText= document.createTextNode('Excluir');
        var pos= todosObjLinks.indexOf(links); // Procura no array a posição do objeto
        btExcluirElement.setAttribute('onclick', 'Excluirlink('+ pos +')');


        Elementolink.appendChild(linkText); // relaciona o link com o nome do link
        btExcluirElement.appendChild(btText);
        ElementoLi.appendChild(Elementolink); // adiciona o link na lista
        ElementoLi.appendChild(btExcluirElement);
        listaElement.appendChild(ElementoLi); // adiciona a lista no elemento ul(html)
    }
}

function Addlink(){
    link.NomeLink= inputNomelinkElemento.value;
    link.Endlink= inputLinkElemento.value;
    todosObjLinks.push(link); // Insere objeto na lista
    inputNomelinkElemento.value= '';
    inputLinkElemento.value= '';
    renderLinks();
    SaveStorage();
}

botaoElement.onclick= Addlink;

function Excluirlink(pos){
    todosObjLinks.splice(pos, 1); // Na posição passada ele vai remover o primeiro objeto
    renderLinks();
    SaveStorage();
}

function SaveStorage(){ // Salvando no banco local
    localStorage.setItem('list_todos', JSON.stringify(todosObjLinks));
}

renderLinks();
