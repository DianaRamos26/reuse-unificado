# ReUse! — App unificado + assistente virtual (ReUse Bot)

Projeto acadêmico **ReUse!** — marketplace de produtos sustentáveis com
parceiros e comissão por venda. Este repositório **une** as telas dos
dois projetos anteriores em um só app, mantendo a identidade visual
oficial (rosa `#EC1E79`, dourado, creme, ameixa), e adiciona o
assistente virtual **ReUse Bot** (watsonx Orchestrate).

## Telas

| Rota              | Tela              |
| ------------------ | ----------------- |
| `/`                | Splash            |
| `/login`           | Login             |
| `/cadastro`        | Cadastro          |
| `/esqueci-senha`   | Esqueci senha     |
| `/home`            | Home (produtos + pontos) |
| `/product/[id]`    | Detalhe do item   |
| `/checkout`        | Resumo da compra  |

## Sobre os dados

Para o app rodar sem depender de um banco de dados Postgres (facilitando
o deploy e a avaliação), os dados de produtos/usuário foram migrados do
`prisma/seed.ts` original para `lib/data.ts` (mock em memória). Login de
demonstração: **ana@reuse.app** / **reuse123**.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (paleta e componentes reaproveitados do `reuse-app`)
- lucide-react (ícones)
- watsonx Orchestrate — Web Channel (chat embutido)

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Ativando o assistente virtual (ReUse Bot)

O chat usa a integração oficial de **Web Channel** do watsonx
Orchestrate (o mesmo widget usado em produção pela IBM), sem expor
nenhuma credencial no código-fonte.

1. No watsonx Orchestrate, abra o agente **ReUse Bot**.
2. Vá em **Deploy → Canais → Agente incorporado** (Embedded agent).
3. Copie os 4 valores do trecho gerado (`orchestrationID`, `hostURL`,
   `crn`, `agentId`, dentro de `chatOptions`).
4. Duplique `.env.example` como `.env.local` e preencha:

```
NEXT_PUBLIC_WXO_ORCHESTRATION_ID=...
NEXT_PUBLIC_WXO_HOST_URL=...
NEXT_PUBLIC_WXO_CRN=...
NEXT_PUBLIC_WXO_AGENT_ID=...
```

5. Reinicie o `npm run dev` (ou, na Vercel, adicione as mesmas
   variáveis em **Project Settings → Environment Variables** e faça um
   novo deploy).

Enquanto essas variáveis não estiverem preenchidas, um botão flutuante
de exemplo aparece no lugar do chat (só para mostrar onde ele fica na
interface) — o `components/ChatWidget.tsx` concentra toda essa lógica.

## Deploy na Vercel

1. Suba este repositório para o GitHub (público).
2. Em [vercel.com](https://vercel.com), **Add New → Project** e importe
   o repositório — o build (Next.js) é detectado automaticamente.
3. Adicione as 5 variáveis `NEXT_PUBLIC_WXO_*` em **Environment
   Variables** antes do deploy (ou depois, e faça um redeploy).
4. Ao final, a Vercel gera o link público do app.

## Acessibilidade e responsividade

- Contraste dos textos segue AA sobre os fundos rosa/creme.
- Todos os botões e links possuem `aria-label` quando o texto não é
  autoexplicativo (ex.: mostrar/ocultar senha).
- Inputs possuem `label` associado (`htmlFor`/`id`) e `autoComplete`.
- Layout responsivo dentro da moldura de smartphone (`max-w-[430px]`),
  centralizado e legível em qualquer tamanho de tela.
- Transições (`fade-in`, `slide-up`) sinalizam mudanças de estado sem
  depender apenas de cor.
