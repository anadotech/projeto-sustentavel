// Chave para guardar os anuncios no navegador
const CHAVE_STORAGE = "brecho_anuncios_comunitarios";

// Anuncios de exemplo que ja comecam no site
const listaAnunciosPadrao = [
  {
    id: 1,
    nome: "Jaqueta Jeans Unissex",
    categoria: "Roupas",
    tipo: "Venda",
    preco: "R$ 45,00",
    estado: "Ótimo estado",
    descricao: "Jaqueta jeans azul tradicional, tecido grosso e resistente. Tamanho M.",
    imagem: "img/jaqueta-jeans.svg",
    alt: "Desenho de uma jaqueta jeans azul em um cabide.",
    whatsapp: "5511999990001",
    usuarioProprio: false
  },
  {
    id: 2,
    nome: "Vestido de Verão Estampado",
    categoria: "Roupas",
    tipo: "Troca",
    preco: null,
    estado: "Bom estado",
    descricao: "Vestido leve e fresco, estampa florida alegre. Tamanho G. Aceito trocar por blusa.",
    imagem: "img/vestido-verao.svg",
    alt: "Desenho de um vestido de verão estampado.",
    whatsapp: "5511999990002",
    usuarioProprio: false
  },
  {
    id: 3,
    nome: "Tênis Infantil com Velcro",
    categoria: "Calçados",
    tipo: "Doação",
    preco: null,
    estado: "Bom estado",
    descricao: "Tênis azul tamanho 28, fácil de calçar com fecho de velcro. Higienizado.",
    imagem: "img/tenis-infantil.svg",
    alt: "Desenho de tênis infantil azul com velcro.",
    whatsapp: "5511999990003",
    usuarioProprio: false
  },
  {
    id: 4,
    nome: "Mochila Escolar Resistente",
    categoria: "Infantil",
    tipo: "Venda",
    preco: "R$ 30,00",
    estado: "Ótimo estado",
    descricao: "Mochila com alças acolchoadas e bolso frontal. Zíperes funcionando perfeitamente.",
    imagem: "img/mochila-escolar.svg",
    alt: "Desenho de uma mochila escolar laranja e verde.",
    whatsapp: "5511999990004",
    usuarioProprio: false
  },
  {
    id: 5,
    nome: "Panela de Pressão 4,5 Litros",
    categoria: "Casa e objetos",
    tipo: "Venda",
    preco: "R$ 40,00",
    estado: "Com marcas de uso",
    descricao: "Alumínio polido com borracha e válvula de segurança recém-trocadas.",
    imagem: "img/panela-pressao.svg",
    alt: "Desenho de uma panela de pressão com cabo.",
    whatsapp: "5511999990005",
    usuarioProprio: false
  },
  {
    id: 6,
    nome: "Cadeira de Plástico Reforçada",
    categoria: "Casa e objetos",
    tipo: "Doação",
    preco: null,
    estado: "Com marcas de uso",
    descricao: "Cadeira com braços na cor verde, firme e resistente para quintal ou varanda.",
    imagem: "img/cadeira-plastico.svg",
    alt: "Desenho de uma cadeira de plástico verde com braços.",
    whatsapp: "5511999990006",
    usuarioProprio: false
  },
  {
    id: 7,
    nome: "Livros de Receitas Caseiras",
    categoria: "Casa e objetos",
    tipo: "Troca",
    preco: null,
    estado: "Ótimo estado",
    descricao: "Kit com 3 livros com receitas de pães, bolos e pratos rápidos. Páginas intactas.",
    imagem: "img/livros-receitas.svg",
    alt: "Desenho de uma pilha de livros de receitas.",
    whatsapp: "5511999990007",
    usuarioProprio: false
  },
  {
    id: 8,
    nome: "Cobertor de Casal Macio",
    categoria: "Casa e objetos",
    tipo: "Venda",
    preco: "R$ 35,00",
    estado: "Bom estado",
    descricao: "Cobertor quentinho em tom caramelo, lavado e bem conservado, sem furos.",
    imagem: "img/cobertor-casal.svg",
    alt: "Desenho de um cobertor de casal dobrado.",
    whatsapp: "5511999990008",
    usuarioProprio: false
  }
];

// Pega os anuncios cadastrados pelo morador que estao salvos no navegador
function obterAnunciosUsuarios() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Não foi possível carregar os anúncios salvos:", erro);
    return [];
  }
}

// Salva a lista atualizada no navegador
function salvarAnunciosUsuarios(lista) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  } catch (erro) {
    console.error("Não foi possível salvar o anúncio:", erro);
  }
}

// Junta os anuncios novos dos moradores com os anuncios padrao
function obterTodosOsAnuncios() {
  const cadastrados = obterAnunciosUsuarios();
  return [...cadastrados, ...listaAnunciosPadrao];
}

// Garante que o telefone tenha o codigo do Brasil (55) e apenas numeros
function formatarNumeroWhatsapp(numeroBruto) {
  if (!numeroBruto) return "5511999999999";
  let limpo = numeroBruto.replace(/\D/g, "");
  if (limpo.length === 10 || limpo.length === 11) {
    limpo = "55" + limpo;
  }
  return limpo;
}

// Cria o link direto do WhatsApp com a mensagem pronta sobre a peca
function criarLinkWhatsapp(numero, nomePeca) {
  const numeroFormatado = formatarNumeroWhatsapp(numero);
  const mensagem = `Olá! Vi o anúncio da peça "${nomePeca}" no Brechó do Bairro e tenho interesse.`;
  return `https://wa.me/${numeroFormatado}?text=${encodeURIComponent(mensagem)}`;
}

// Desenha os cards na tela da vitrine
function renderizarVitrine(itens) {
  const container = document.getElementById("grade-anuncios");
  const contador = document.getElementById("contador-pecas");

  if (!container) return;

  if (contador) {
    contador.textContent = `Mostrando ${itens.length} peça${itens.length === 1 ? "" : "s"} disponível${itens.length === 1 ? "" : "is"}`;
  }

  // Se nao encontrar nenhuma peca no filtro
  if (itens.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="p-4 bg-white rounded-4 border border-2 border-warning shadow-sm">
          <i class="bi bi-search display-5 text-warning mb-3 d-block" aria-hidden="true"></i>
          <h3 class="h4 fw-bold text-dark">Nenhuma peça encontrada neste filtro</h3>
          <p class="text-muted fs-5 mb-3">Tente escolher outra categoria ou outro tipo de anúncio para ver mais opções.</p>
          <button type="button" class="btn btn-outline-success fw-bold px-4 py-2" onclick="limparFiltros()">
            <i class="bi bi-arrow-counterclockwise me-1" aria-hidden="true"></i> Ver todas as peças
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  itens.forEach(peca => {
    let classeSelo = "selo-troca";
    if (peca.tipo === "Doação") classeSelo = "selo-doacao";
    if (peca.tipo === "Venda") classeSelo = "selo-venda";

    const urlWhatsapp = criarLinkWhatsapp(peca.whatsapp, peca.nome);

    // Mostra o preco se for venda, ou o tipo se for troca/doacao
    const blocoPreco = (peca.tipo === "Venda" && peca.preco)
      ? `<div class="valor-peca" aria-label="Preço: ${peca.preco}"><i class="bi bi-tag-fill me-1" aria-hidden="true"></i> ${peca.preco}</div>`
      : `<div class="valor-peca text-success" aria-label="Tipo: ${peca.tipo}"><i class="bi bi-arrow-repeat me-1" aria-hidden="true"></i> Sem custo em dinheiro (${peca.tipo})</div>`;

    // Etiqueta para pecas que o proprio usuario cadastrou
    const badgeUsuario = peca.usuarioProprio 
      ? `<span class="badge-anuncio-comunitario"><i class="bi bi-person-check-fill me-1"></i>Anunciado por você</span>` 
      : "";

    // Botao para quem cadastrou poder apagar o anuncio
    const botaoExcluir = peca.usuarioProprio 
      ? `<button type="button" class="btn-remover-anuncio" onclick="removerAnuncio('${peca.id}')">
           <i class="bi bi-trash3 me-1"></i> Remover meu anúncio
         </button>` 
      : "";

    const colunaCard = document.createElement("div");
    colunaCard.className = "col-12 col-md-6 col-lg-4 col-xl-3 d-flex";

    colunaCard.innerHTML = `
      <article class="card-peca w-100" aria-labelledby="titulo-peca-${peca.id}">
        <div class="container-imagem-peca">
          <img src="${peca.imagem}" alt="${peca.alt || peca.nome}" loading="lazy" />
          <span class="selo-tipo ${classeSelo}">${peca.tipo}</span>
        </div>

        <div class="corpo-card">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="categoria-tag"><i class="bi bi-folder2 me-1" aria-hidden="true"></i>${peca.categoria}</span>
          </div>

          ${badgeUsuario}
          
          <h3 id="titulo-peca-${peca.id}" class="titulo-peca">${peca.nome}</h3>
          
          <p class="descricao-peca">${peca.descricao}</p>
          
          <div class="meta-estado">
            <i class="bi bi-shield-check me-1" aria-hidden="true"></i>
            <strong>Estado:</strong> ${peca.estado}
          </div>

          ${blocoPreco}

          <a href="${urlWhatsapp}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-whatsapp-card"
             aria-label="Chamar anunciante no WhatsApp sobre ${peca.nome}">
            <i class="bi bi-whatsapp fs-5" aria-hidden="true"></i>
            <span>Chamar no WhatsApp</span>
          </a>

          ${botaoExcluir}
        </div>
      </article>
    `;

    container.appendChild(colunaCard);
  });
}

// Filtra a vitrine por categoria e tipo
function aplicarFiltros() {
  const selectCategoria = document.getElementById("filtro-categoria");
  const selectTipo = document.getElementById("filtro-tipo");

  const categoriaEscolhida = selectCategoria ? selectCategoria.value : "todos";
  const tipoEscolhido = selectTipo ? selectTipo.value : "todos";

  const todos = obterTodosOsAnuncios();

  const itensFiltrados = todos.filter(peca => {
    const bateuCategoria = (categoriaEscolhida === "todos") || (peca.categoria === categoriaEscolhida);
    const bateuTipo = (tipoEscolhido === "todos") || (peca.tipo === tipoEscolhido);
    return bateuCategoria && bateuTipo;
  });

  renderizarVitrine(itensFiltrados);
}

// Reseta os filtros e mostra tudo de novo
function limparFiltros() {
  const selectCategoria = document.getElementById("filtro-categoria");
  const selectTipo = document.getElementById("filtro-tipo");

  if (selectCategoria) selectCategoria.value = "todos";
  if (selectTipo) selectTipo.value = "todos";

  renderizarVitrine(obterTodosOsAnuncios());
}

// Desenho padrao caso o morador nao envie foto da peca
function obterImagemPadraoPorCategoria(categoria) {
  switch (categoria) {
    case "Roupas": return "img/jaqueta-jeans.svg";
    case "Calçados": return "img/tenis-infantil.svg";
    case "Infantil": return "img/mochila-escolar.svg";
    case "Casa e objetos": return "img/cadeira-plastico.svg";
    default: return "img/logo.svg";
  }
}

// Controla o formulario de cadastro da peca
function configurarFormularioAnuncio() {
  const form = document.getElementById("form-novo-anuncio");
  const selectTipo = document.getElementById("anuncio-tipo");
  const campoContainerPreco = document.getElementById("campo-container-preco");
  const inputPreco = document.getElementById("anuncio-preco");
  const inputFoto = document.getElementById("anuncio-foto");
  const previewContainer = document.getElementById("preview-foto-container");
  const imgPreview = document.getElementById("img-preview");
  const alertaSucesso = document.getElementById("alerta-sucesso-anuncio");

  if (!form) return;

  // Esconde o campo de preco se a peca for troca ou doacao
  if (selectTipo && campoContainerPreco) {
    selectTipo.addEventListener("change", () => {
      if (selectTipo.value === "Venda") {
        campoContainerPreco.style.display = "block";
        if (inputPreco) inputPreco.required = true;
      } else {
        campoContainerPreco.style.display = "none";
        if (inputPreco) {
          inputPreco.required = false;
          inputPreco.value = "";
        }
      }
    });
  }

  // Mostra a foto na tela assim que o usuario escolhe o arquivo
  if (inputFoto && previewContainer && imgPreview) {
    inputFoto.addEventListener("change", () => {
      const arquivo = inputFoto.files[0];
      if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = (e) => {
          imgPreview.src = e.target.result;
          previewContainer.classList.remove("d-none");
        };
        leitor.readAsDataURL(arquivo);
      } else {
        previewContainer.classList.add("d-none");
      }
    });
  }

  // Formata o telefone automaticamente enquanto digita
  const inputWhatsapp = document.getElementById("anuncio-whatsapp");
  if (inputWhatsapp) {
    inputWhatsapp.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "");
      if (valor.length > 11) valor = valor.slice(0, 11);

      if (valor.length > 6) {
        e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
      } else if (valor.length > 2) {
        e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
      } else if (valor.length > 0) {
        e.target.value = `(${valor}`;
      }
    });
  }

  // Formata o preco em reais enquanto digita
  if (inputPreco) {
    inputPreco.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "");
      if (!valor) {
        e.target.value = "";
        return;
      }
      const valorNumerico = (parseFloat(valor) / 100).toFixed(2);
      e.target.value = `R$ ${valorNumerico.replace(".", ",")}`;
    });
  }

  // Quando o usuario clica em publicar a peca
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("anuncio-nome").value.trim();
    const categoria = document.getElementById("anuncio-categoria").value;
    const estado = document.getElementById("anuncio-estado").value;
    const tipo = selectTipo.value;
    let preco = inputPreco ? inputPreco.value.trim() : "";
    const whatsapp = document.getElementById("anuncio-whatsapp").value.trim();
    const descricao = document.getElementById("anuncio-descricao").value.trim();

    if (!nome || !categoria || !whatsapp || !descricao) {
      alert("Por favor, preencha todos os campos obrigatórios (Nome, Categoria, WhatsApp e Descrição).");
      return;
    }

    if (tipo === "Venda") {
      if (!preco) {
        alert("Para anúncios de Venda, por favor informe o valor da peça.");
        return;
      }
      if (!preco.toLowerCase().includes("r$")) {
        preco = `R$ ${preco}`;
      }
    } else {
      preco = null;
    }

    const salvarNovoItem = (imagemUrl) => {
      const novoAnuncio = {
        id: "user-" + Date.now(),
        nome,
        categoria,
        tipo,
        preco,
        estado,
        descricao,
        imagem: imagemUrl,
        alt: `Foto do anúncio comunitário de ${nome}`,
        whatsapp,
        usuarioProprio: true
      };

      const listaAtual = obterAnunciosUsuarios();
      listaAtual.unshift(novoAnuncio);
      salvarAnunciosUsuarios(listaAtual);

      renderizarVitrine(obterTodosOsAnuncios());

      form.reset();
      if (previewContainer) previewContainer.classList.add("d-none");
      if (alertaSucesso) {
        alertaSucesso.classList.remove("d-none");
        alertaSucesso.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      const vitrineElem = document.getElementById("vitrine");
      if (vitrineElem) {
        setTimeout(() => {
          vitrineElem.scrollIntoView({ behavior: "smooth" });
        }, 800);
      }
    };

    const arquivoFoto = inputFoto && inputFoto.files ? inputFoto.files[0] : null;
    if (arquivoFoto) {
      const leitor = new FileReader();
      leitor.onload = (e) => {
        salvarNovoItem(e.target.result);
      };
      leitor.readAsDataURL(arquivoFoto);
    } else {
      const imagemPadrao = obterImagemPadraoPorCategoria(categoria);
      salvarNovoItem(imagemPadrao);
    }
  });
}

// Apaga um anuncio que o proprio morador postou
window.removerAnuncio = function(id) {
  if (confirm("Deseja realmente remover o seu anúncio da vitrine?")) {
    let listaAtual = obterAnunciosUsuarios();
    listaAtual = listaAtual.filter(item => item.id !== id);
    salvarAnunciosUsuarios(listaAtual);
    renderizarVitrine(obterTodosOsAnuncios());
  }
};

// Inicia as funcoes quando a pagina carregar
document.addEventListener("DOMContentLoaded", () => {
  renderizarVitrine(obterTodosOsAnuncios());

  const selectCategoria = document.getElementById("filtro-categoria");
  const selectTipo = document.getElementById("filtro-tipo");
  const botaoLimpar = document.getElementById("btn-limpar-filtros");

  if (selectCategoria) selectCategoria.addEventListener("change", aplicarFiltros);
  if (selectTipo) selectTipo.addEventListener("change", aplicarFiltros);
  if (botaoLimpar) botaoLimpar.addEventListener("click", limparFiltros);

  configurarFormularioAnuncio();
});
