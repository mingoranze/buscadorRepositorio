# PRD — Buscador de Repositórios no GitHub

## Visão geral

Aplicação web simples em que o usuário pesquisa repositórios no GitHub por palavra-chave e visualiza os resultados em uma lista formatada.

---

## Funcionalidades

### Busca

- O usuário digita um termo no campo de busca.
- A busca é disparada **somente ao pressionar ENTER** (não em tempo real enquanto digita).
- A aplicação consulta a API do GitHub e exibe os repositórios encontrados.

### Informações exibidas por repositório

Cada resultado deve mostrar:

| Campo | Descrição |
|-------|-----------|
| Autor | Nome e foto do autor |
| Repositório | Nome do repositório |
| Descrição | Descrição do repositório |
| Linguagem | Linguagem principal utilizada |
| Estrelas | Número de estrelas |
| Link | Link direto para o repositório no GitHub |

### Estados da interface

| Estado | Quando exibir |
|--------|---------------|
| **Loading** | Enquanto a requisição à API estiver em andamento |
| **Resultados** | Quando a busca retornar repositórios |
| **Empty state** | Quando a busca não retornar resultados |
| **Erro** | Quando a requisição falhar — exibir mensagem amigável ao usuário |

### Layout e aparência

- Conteúdo centralizado na página, com largura máxima de **700px**.
- Fundo da página mais escuro que os cards.
- **Card de busca**: campo de pesquisa dentro de um card com bordas arredondadas.
- **Card de resultados**: lista de repositórios dentro de um card com bordas arredondadas.

---

## Decisões técnicas

### API do GitHub

- **Endpoint:** `https://api.github.com/search/repositories?q={PALAVRA-CHAVE}&sort=stars&per_page=10`
- `{PALAVRA-CHAVE}` é substituído pelo termo digitado pelo usuário.
- Resultados ordenados por estrelas (`sort=stars`), limitados a 10 por página (`per_page=10`).

### Requisição HTTP

- Usar `fetch` nativo do JavaScript.
- Implementar com `async/await` dentro de `try/catch`.
- Verificar o `status` da resposta antes de processar os dados.

### Eventos e estrutura do código

- Todos os event listeners devem ser registrados no JavaScript.
- Nenhum evento (`onclick`, `onkeydown`, etc.) deve ser definido diretamente no HTML.
