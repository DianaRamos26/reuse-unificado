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

npm install
npm run dev

Acesse http://localhost:3000.

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

NEXT_PUBLIC_WXO_ORCHESTRATION_ID=
NEXT_PUBLIC_WXO_HOST_URL=
NEXT_PUBLIC_WXO_CRN=
NEXT_PUBLIC_WXO_AGENT_ID=

Os valores vêm do watsonx Orchestrate: agente **ReUse Bot** → **Deploy →
Canais → Agente incorporado**.

### Sobre a segurança do embed

Por padrão o watsonx Orchestrate exige um par de chaves RSA (RS256)
configurado para autenticar o widget. Para este projeto acadêmico, a
segurança do embed foi **desativada** (Settings → Embed Security →
Security: Off) — opção que a própria IBM recomenda para demonstrações
públicas e cenários sem dados sensíveis, que é o caso aqui. Por esse
mesmo motivo, a interface do chat usa a cor padrão da IBM (azul): a
customização visual só é aplicada quando a segurança está habilitada
com as chaves configuradas, o que exigiria um servidor adicional para
assinar tokens — fora do escopo deste projeto.

### Validade do plano Trial

O watsonx Orchestrate está em plano **Trial**, válido por 30 dias a
partir da ativação (aproximadamente até **18/10/2026**). Após esse
período, o chat pode parar de responder — prints e vídeo de
demonstração do funcionamento ficam anexados à entrega como evidência.

## Deploy na Vercel

1. Suba este repositório para o GitHub (público).
2. Em vercel.com, **Add New → Project** e importe
   o repositório — o build (Next.js) é detectado automaticamente.
3. Adicione as 4 variáveis `NEXT_PUBLIC_WXO_*` em **Environment
   Variables** antes do deploy (ou depois, e faça um redeploy).
4. Ao final, a Vercel gera o link público do app.

## Acessibilidade e responsividade

- Contraste dos textos segue AA sobre os fundos rosa/creme.
- Todos os botões e links possuem `aria-label` quando o texto não é
  autoexplicativo (ex.: mostrar/ocultar senha).
- Inputs possuem `label` associado e `autoComplete`.
- Layout responsivo dentro da moldura de smartphone (`max-w-[430px]`),
  centralizado e legível em qualquer tamanho de tela.
- Transições (`fade-in`, `slide-up`) sinalizam mudanças de estado sem
  depender apenas de cor.
