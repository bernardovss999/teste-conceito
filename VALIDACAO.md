# Validação — 02/10/2026

Esta entrega foi salva localmente e no Google Drive. Não houve envio à hospedagem, publicação ou deploy nesta revisão.

## Mudanças

- A arara para sempre em grupos completos, com margem para mangas, cabides, escala de seleção e balanço.
- Até cinco peças por grupo em desktop; quatro em tablet; três em larguras intermediárias; duas em celular.
- O último grupo reapresenta a peça anterior quando necessário para evitar uma peça isolada ou cortada no final.
- Todos os 25 produtos permanecem acessíveis, com baby looks intercalados.
- Arraste da barra, botões anterior/próximo e teclado continuam funcionando.
- Controles de toque com pelo menos 44 pixels; fotografias de produto contidas sem corte e miniaturas ajustadas ao celular.
- Faixa inferior contínua e identidade visual preservadas.

## Verificações realizadas

- Prévia local em 320 × 568, 390 × 844, 768 × 1024 e 1280 × 720.
- Sem transbordamento horizontal da página nas larguras verificadas.
- Imagens dos grupos visíveis integralmente dentro da área da arara.
- Último grupo mobile com peças 24 e 25 completas; navegação por arraste da barra e teclado verificadas.
- Seleção da camiseta e abertura dos detalhes verificadas no celular.
- `node --check dist/app.js` e `node --check dist/rack.js` aprovados.
- `npm run build` aprovado: arquivos do site e fotos/mockups dos 25 produtos presentes.
- Configuração Vercel incluída; a publicação na Vercel não foi executada.

## Correção do envio para GitHub

- Projeto completo: 96 arquivos; `dist/`: 88 arquivos.
- Referências a 125 arquivos de imagens remapeadas para 76 arquivos únicos.
- As 125 referências foram comparadas byte a byte com o original: todas preservadas, sem recompressão ou mudança de qualidade.
- Maior arquivo: 1.605.749 bytes, abaixo do limite de 25 MiB do envio pelo navegador.
- O build foi executado no pacote otimizado e novamente depois da extração do ZIP.
- O ZIP corrigido não inclui capturas de prévia, código do antigo 3D, histórico Git, credenciais ou configuração da hospedagem Sites.

Não houve envio a um repositório GitHub, publicação ou deploy nesta correção. O pacote está preparado para o proprietário realizar o envio e a publicação.
