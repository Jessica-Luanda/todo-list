const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');

let minhaListaDeItens = []
const pError =  document.querySelector('.error-message')

/*Trazer o valor que está dentro do input*/
function adicionarNovaTarefa() {

    if (input.value.trim() === '') {
        mostrarErro("Por favor, insira uma tarefa antes do adicionar!")
        return // Retorna para evitar adicionar uma tarefa vazia
    }

    // Adicionar nova tarefa na lista
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    });
    input.value = '';  // Limpar campo de entrada
    pError.textContent = ''
    mostrarTarefas() //atualiza a exibição das tarefas da lista
}



function mostrarTarefas() {

    let novaLi = ''

    // acessar intem por item
    minhaListaDeItens.forEach((item, posicao) => {


        novaLi = novaLi + `
    
        <li class="task ${item.concluida && "done"}">
                <img class="check"  src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
               <p>${item.tarefa}</p>
               <img src="./img/trash.png" alt="deletar-tarefa" onclick="deletarItem(${posicao})" >
         </li>
    
    `
    });

    listaCompleta.innerHTML = novaLi;

    //LocalStorage só aceita strigs
    // JSON.stringify - Transforma tudo dentro dele em string
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}




function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()

}

function deletarItem(posicao) {
    //SPLICE - permite que eu delete tudo o que eu quiser dentro do meu array
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()

}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        //JSON.parse - Transforma o que tem em objeto
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()

}
recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa);

function mostrarErro(mensagem){
   
   pError.textContent = mensagem
   pError.classList.add('animation-shake')


}