const palavrasSuspeitas = [
    "senha",
    "codigo de segurança",
    "código de segurança",
    "pix",
    "premio",
    "prêmio",
    "ganhou",
    "ganhador",
    "urgente",
    "clique aqui",
    "conta bloqueada",
    "conta será bloqueada",
    "confirme seus dados",
    "atualize seus dados",
    "dados bancarios",
    "dados bancários",
    "cpf",
    "cartao",
    "cartão",
    "transferencia",
    "transferência",
    "deposito",
    "depósito"
];

const expressoesGolpe = [
    "mande o codigo",
    "mande o código",
    "informe sua senha",
    "clique no link",
    "acesse o link",
    "faça um pix",
    "envie o pix",
    "transfira agora",
    "confirme sua conta",
    "sua conta foi bloqueada"
];

const campoMensagem = document.getElementById("mensagem");
const botaoAnalisar = document.getElementById("analisar");
const botaoLimpar = document.getElementById("limpar");

const resultado = document.getElementById("resultado");
const classificacao = document.getElementById("classificacao");
const pontuacaoElemento = document.getElementById("pontuacao");
const listaMotivos = document.getElementById("motivos");


botaoAnalisar.addEventListener("click", analisarMensagem);

botaoLimpar.addEventListener("click", limpar);


function analisarMensagem() {

    const mensagem = campoMensagem.value.trim();

    if (mensagem === "") {
        alert("Digite ou cole uma mensagem para analisar.");
        return;
    }

    const texto = mensagem.toLowerCase();

    let pontuacao = 0;

    const motivos = [];


    // 1. PALAVRAS SUSPEITAS

    palavrasSuspeitas.forEach(function(palavra) {

        if (texto.includes(palavra)) {

            pontuacao += 5;

            motivos.push(
                `Termo suspeito encontrado: "${palavra}"`
            );
        }

    });


    // 2. EXPRESSÕES SUSPEITAS

    expressoesGolpe.forEach(function(expressao) {

        if (texto.includes(expressao)) {

            pontuacao += 15;

            motivos.push(
                `Expressão suspeita encontrada: "${expressao}"`
            );
        }

    });


    // 3. VERIFICAR LINKS

    const padraoURL = /https?:\/\/\S+|www\.\S+/i;

    if (padraoURL.test(texto)) {

        pontuacao += 15;

        motivos.push(
            "A mensagem contém um link."
        );
    }


    // 4. EXCESSO DE EXCLAMAÇÕES

    const exclamacoes = (texto.match(/!/g) || []).length;

    if (exclamacoes >= 3) {

        pontuacao += 5;

        motivos.push(
            "Uso excessivo de exclamações."
        );
    }


    // 5. CLASSIFICAÇÃO

    classificacao.classList.remove(
        "baixo",
        "medio",
        "alto"
    );


    if (pontuacao >= 40) {

        classificacao.textContent =
            "ALTO RISCO - POSSÍVEL GOLPE";

        classificacao.classList.add("alto");

    } else if (pontuacao >= 20) {

        classificacao.textContent =
            "RISCO MÉDIO - MENSAGEM SUSPEITA";

        classificacao.classList.add("medio");

    } else {

        classificacao.textContent =
            "BAIXO RISCO";

        classificacao.classList.add("baixo");

    }


    // MOSTRAR PONTUAÇÃO

    pontuacaoElemento.textContent = pontuacao;


    // MOSTRAR MOTIVOS

    listaMotivos.innerHTML = "";

    if (motivos.length === 0) {

        const item = document.createElement("li");

        item.textContent =
            "Nenhum sinal suspeito encontrado pelas regras atuais.";

        listaMotivos.appendChild(item);

    } else {

        motivos.forEach(function(motivo) {

            const item = document.createElement("li");

            item.textContent = motivo;

            listaMotivos.appendChild(item);

        });

    }


    // MOSTRAR RESULTADO

    resultado.classList.remove("oculto");

}


function limpar() {

    campoMensagem.value = "";

    resultado.classList.add("oculto");

    classificacao.textContent = "";

    pontuacaoElemento.textContent = "0";

    listaMotivos.innerHTML = "";

    campoMensagem.focus();

}