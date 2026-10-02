# Gemini Experience — arara interativa

Site estático em HTML, CSS e JavaScript, sem dependências de execução. Página principal com peças completas, navegação por grupos, arraste da arara e animação suave. Baby looks permanecem intercalados com as camisetas. No celular aparecem duas peças completas por vez. A página de produto usa as fotografias originais da Gemini.

## Executar localmente

Instale uma versão LTS do Node.js. Na pasta do projeto:

```sh
npm run dev
```

Abra `http://127.0.0.1:3000`. Use um servidor HTTP; abrir o HTML diretamente como arquivo impede a leitura do catálogo JSON em alguns navegadores.

```sh
npm run build
```

O comando verifica a presença dos arquivos e das imagens do catálogo. `dist/` já contém o site pronto; não há compilação ou serviço de backend.

## GitHub — envio pelo navegador corrigido

Este pacote contém **96 arquivos no total**, sendo **88 em `dist/`**. Nenhum arquivo individual ultrapassa 2 MB. Foram compartilhadas 49 cópias idênticas de imagens e retirados do pacote os arquivos do antigo 3D que não são carregados pelo site. Todas as fotografias, os 25 mockups, a logo e as fontes foram preservados sem recompressão.

O GitHub aceita até 100 arquivos de uma vez e 25 MiB por arquivo no navegador. Este pacote cabe nesses limites: [documentação oficial](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

1. Baixe novamente o ZIP corrigido e extraia em uma **nova pasta**. Evite misturar com a extração anterior, que tinha 149 arquivos.
2. Abra a pasta `gemini-experience`. O ZIP deve ser extraído; enviar o próprio ZIP ao repositório não instala o site.
3. No GitHub, abra o repositório e escolha **Add file → Upload files** na raiz.
4. Arraste o **conteúdo de dentro** de `gemini-experience`: as pastas `dist` e `scripts`, `package.json`, `package-lock.json`, `vercel.json`, `README.md`, `VALIDACAO.md` e `.gitignore`. Não arraste a pasta externa `gemini-experience`.
5. Confirme que `package.json`, `vercel.json` e `dist/` aparecem na raiz e conclua o commit.

Se alguns arquivos já foram enviados ao repositório, o novo envio atualiza os caminhos correspondentes. Os arquivos antigos que sobrarem não impedem o funcionamento, pois o catálogo usa apenas os caminhos do pacote corrigido.

### Alternativa com Git/GitHub Desktop

Também é possível usar GitHub Desktop para adicionar a pasta a um repositório e enviar as mudanças. Pelo terminal, em um repositório vazio:

```sh
git init
git add .
git commit -m "Gemini Experience: vitrine e arara interativa"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

O ZIP não inclui `.git`, tokens ou credenciais. O destino do GitHub deve ser escolhido pelo proprietário. Esta entrega não publica automaticamente o projeto.

## Vercel

Importe esse repositório na Vercel. A configuração em `vercel.json` define:

- Framework: Other.
- Root Directory: raiz do repositório.
- Build Command: `npm run build`.
- Output Directory: `dist`.

Não são necessárias variáveis de ambiente. As páginas usam caminhos relativos e preservam `produto.html?id=...`. A compra abre o produto na loja oficial.

Referências: [configuração de build da Vercel](https://vercel.com/docs/builds/configure-a-build) e [configuração do projeto](https://vercel.com/docs/project-configuration).

## Arquivos editáveis

- `dist/index.html`: página principal.
- `dist/produto.html`: detalhes da camiseta.
- `dist/products.json`: produtos, preços, tamanhos, fotos e endereço da loja.
- `dist/rack.js`: grupos completos, arraste, teclado e navegação da arara.
- `dist/sliding-rack.css`: proporções da arara e ajustes mobile.
- `dist/style.css`: identidade visual compartilhada e faixa contínua.
- `dist/assets/`: logo, fontes, fotografias originais e mockups.

Os mockups da arara são imagens ilustrativas geradas; pequenas letras e detalhes das estampas podem variar. As fotografias originais em catálogo e produto são a referência dos itens vendidos. A logo original do cabeçalho foi preservada. Os valores correspondem ao conteúdo consultado na criação; atualize `products.json` quando o catálogo oficial mudar.

A pasta `.openai/` no checkout de trabalho identifica a hospedagem Sites existente. O pacote para GitHub/Vercel funciona de forma independente e não inclui essa configuração.
