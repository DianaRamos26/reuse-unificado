# ReUse! — Assistente virtual (ReUse Bot)

Projeto acadêmico **ReUse!** — marketplace de produtos sustentáveis com
parceiros e comissão por venda. Este repositório contém o app completo
e o assistente virtual **ReUse Bot** (watsonx Orchestrate).

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
o deploy e a avaliação), os dados de produtos/usuário ficam mockados em
memória, em `lib/data.ts`. Login de demonstração: **ana@reuse.app** /
**reuse123**.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- lucide-react (ícones)
- watsonx Orchestrate — Web Channel (chat embutido)

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## O assistente virtual (ReUse Bot)

O chat usa a integração oficial de **Web Channel** do watsonx
Orchestrate, embutida em `components/ChatWidget.tsx`. O bot executa
tarefas reais na plataforma (cadastrar item, pausar oferta, listar
ofertas ativas) e orienta o usuário sobre cadastro, pontos, comissão do
parceiro e redefinição de senha, com um tom conversacional e humano.

### Variáveis de ambiente

As credenciais do canal ficam em variáveis públicas (usadas no
navegador), configuradas na Vercel em **Project Settings → Environment
Variables**:
