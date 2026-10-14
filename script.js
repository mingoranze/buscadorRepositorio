// Elementos da página
const campoBusca = document.getElementById('campo-busca');
const cardResultados = document.getElementById('card-resultados');
const mensagem = document.getElementById('mensagem');
const listaResultados = document.getElementById('lista-resultados');

// Dispara a busca somente ao pressionar ENTER
campoBusca.addEventListener('keydown', function (evento) {
  if (evento.key.toLocaleLowerCase() === 'enter') {
    const termo = campoBusca.value.trim();

    if (termo !== '') {
      buscarRepositorios(termo);
    }
  }
});

// Consulta a API do GitHub
async function buscarRepositorios(termo) {
  mostrarMensagem('Carregando...');

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(termo)}&sort=stars&per_page=10`;

  try {
    const resposta = await fetch(url);

    if (resposta.status !== 200) {
      throw new Error(`Erro na API: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (dados.items.length === 0) {
      mostrarMensagem('Nenhum repositório encontrado para essa busca.');
      return;
    }

    mostrarResultados(dados.items);
  } catch (erro) {
    console.error(erro);
    mostrarMensagem('Não foi possível buscar os repositórios. Tente novamente em alguns instantes.', true);
  }
}

// Exibe uma mensagem de estado (loading, vazio ou erro) e limpa a lista
function mostrarMensagem(texto, ehErro = false) {
  cardResultados.hidden = false;
  listaResultados.innerHTML = '';
  mensagem.textContent = texto;
  mensagem.classList.toggle('erro', ehErro);
}

// Exibe a lista de repositórios
function mostrarResultados(repositorios) {
  cardResultados.hidden = false;
  mensagem.textContent = '';
  listaResultados.innerHTML = '';

  repositorios.forEach(function (repositorio) {
    listaResultados.appendChild(criarItem(repositorio));
  });
}

// Monta o item (li) de um repositório
function criarItem(repositorio) {
  const item = document.createElement('li');
  item.className = 'repositorio';

  // Autor: foto e nome
  const autor = document.createElement('div');
  autor.className = 'autor';

  const foto = document.createElement('img');
  foto.src = repositorio.owner.avatar_url;
  foto.alt = `Foto de ${repositorio.owner.login}`;

  const nomeAutor = document.createElement('span');
  nomeAutor.textContent = repositorio.owner.login;

  autor.append(foto, nomeAutor);

  // Nome do repositório
  const nome = document.createElement('h2');
  nome.className = 'nome-repositorio';
  nome.textContent = repositorio.name;

  // Descrição
  const descricao = document.createElement('p');
  descricao.className = 'descricao';
  descricao.textContent = repositorio.description || 'Sem descrição.';

  // Linguagem, estrelas e link
  const detalhes = document.createElement('div');
  detalhes.className = 'detalhes';

  const linguagem = document.createElement('span');
  linguagem.textContent = `Linguagem: ${repositorio.language || 'Não informada'}`;

  const estrelas = document.createElement('span');
  estrelas.textContent = `★ ${repositorio.stargazers_count.toLocaleString('pt-BR')}`;

  const link = document.createElement('a');
  link.className = 'link';
  link.href = repositorio.html_url;
  link.target = '_blank';
  link.textContent = 'Ver no GitHub';

  detalhes.append(linguagem, estrelas, link);

  item.append(autor, nome, descricao, detalhes);
  return item;
}
