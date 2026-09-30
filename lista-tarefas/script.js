const input = document.getElementById("tarefa");
const botao = document.getElementById("adicionar");
const lista = document.getElementById("lista");


// Quando a página abrir, recupera as tarefas
carregarTarefas();


// Clique no botão Adicionar
botao.addEventListener("click", adicionarTarefa);


// Pressionar ENTER também adiciona
input.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        adicionarTarefa();
    }

});


function adicionarTarefa() {

    const texto = input.value.trim();

    if (texto === "") {
        return;
    }

    criarTarefa(texto, false);

    salvarTarefas();

    input.value = "";
    input.focus();
}


function criarTarefa(texto, concluida) {

    const item = document.createElement("li");

    const nomeTarefa = document.createElement("span");

    nomeTarefa.textContent = texto;


    // Verifica se já estava concluída
    if (concluida) {
        nomeTarefa.classList.add("concluida");
    }


    // Clicar na tarefa marca como concluída
    nomeTarefa.addEventListener("click", function() {

        nomeTarefa.classList.toggle("concluida");

        salvarTarefas();

    });


    // Criar botão Excluir
    const excluir = document.createElement("button");

    excluir.textContent = "Excluir";

    excluir.classList.add("excluir");


    excluir.addEventListener("click", function() {

        item.remove();

        salvarTarefas();

    });


    item.appendChild(nomeTarefa);

    item.appendChild(excluir);

    lista.appendChild(item);
}


// SALVAR TAREFAS
function salvarTarefas() {

    const tarefas = [];

    document.querySelectorAll("#lista li").forEach(function(item) {

        const nome = item.querySelector("span");

        tarefas.push({

            texto: nome.textContent,

            concluida: nome.classList.contains("concluida")

        });

    });


    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}


// CARREGAR TAREFAS
function carregarTarefas() {

    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas === null) {
        return;
    }


    const tarefas = JSON.parse(tarefasSalvas);


    tarefas.forEach(function(tarefa) {

        criarTarefa(
            tarefa.texto,
            tarefa.concluida
        );

    });

}