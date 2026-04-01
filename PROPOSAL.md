Oi, tudo bem?

Li atentamente o escopo do projeto e entendo exatamente o desafio: substituir a IREV por uma solução interna que dê controle total sobre a operacao de afiliados, com regras de negocio personalizadas e sem depender de terceiros.

Ja construi um demo funcional para voce avaliar de imediato:

**Demo:** https://github.com/nightfairy5831/igaming-affiliates

## O Que o Demo Inclui

O sistema ja possui todas as funcionalidades essenciais descritas no escopo:

- **Dashboard Principal** — KPIs em tempo real: registros, FTD, QFTD, NGR, revenue, comissoes pagas, CPA medio, taxa de conversao. Grafico mensal de performance, ranking de top afiliados, feed de atividades recentes
- **Gestao de Afiliados** — Listagem com filtros (busca, status, pais), perfil detalhado com casas vinculadas, ofertas, identificadores, historico de campanhas e financeiro
- **Campanhas & Links** — Gerenciamento de campanhas por operadora, links de rastreamento com copia rapida, metricas de performance (clicks, registros, FTD, conversao, NGR)
- **Reports & Analytics** — 4 abas (Visao Geral, Por Afiliado, Por Campanha, Por Operadora) com filtros avancados por periodo, afiliado e operadora
- **Fechamento Financeiro** — Calculo de comissoes CPA e RevShare, carry over, ajustes, validacao de resultados, controle de pagamentos (pendente/aprovado/pago)
- **Configuracoes** — Regras de negocio (carry over, non carry over, baseline, hibrido CPA+Rev, QFTD minimo, threshold de pagamento), controle de acessos por perfil, integracoes
- **Login** — Autenticacao com design profissional

## Stack Tecnico

- **Frontend:** Next.js com TypeScript
- **Styling:** Tailwind CSS v3.4.4 com design system customizado
- **UI:** Sidebar navigation, tabelas com filtros, badges de status, graficos visuais
- **Mock Data:** 10 afiliados, 10 campanhas, 12 registros financeiros, regras de negocio completas

## Plano de Implementacao

**Fase 1 — Core do Sistema (Semanas 1-2)**
- Backend com banco de dados (PostgreSQL)
- Sistema de cadastro e autenticacao
- CRUD completo de afiliados com vinculos de casas, ofertas e identificadores
- Modelo de dados para CPA, RevShare e Hibrido

**Fase 2 — Campanhas & Rastreamento (Semanas 3-4)**
- Geracao e gestao de links de rastreamento por operadora
- Processamento de dados de clicks, registros e depositos
- Dashboard operacional com metricas em tempo real

**Fase 3 — Metricas & Reports (Semanas 4-5)**
- Monitoramento de FTD, QFTD, NGR, CPA, RevShare
- Reports com filtros avancados (periodo, afiliado, campanha, operadora)
- Exportacao CSV/XLSX

**Fase 4 — Financeiro & Regras (Semanas 5-6)**
- Fechamento mensal automatizado
- Implementacao de carry over, non carry over, baseline
- Acordos hibridos CPA + Rev
- Criterios minimos de qualificacao (QFTD)
- Controle de valores a pagar e validacao

**Fase 5 — Acessos & Integracoes (Semanas 7-8)**
- Sistema de permissoes com perfis (admin, manager, analista, afiliado)
- API REST para integracao externa
- Import/export de planilhas
- Integracao com APIs de operadoras

## Por Que Eu?

- **Ja construi o produto.** Enquanto outros enviam textos, eu entrego um sistema funcionando.
- **Experiencia com marketplaces e plataformas dois lados.** Entendo a complexidade de sistemas com multiplos perfis de usuario e regras de negocio customizadas.
- **Conhecimento do setor de iGaming.** As metricas (FTD, QFTD, NGR, carry over, baseline) ja estao implementadas no demo — nao sao conceitos novos para mim.
- **Codigo limpo e escalavel.** TypeScript, arquitetura de componentes, separacao de dados — pronto para crescer com a operacao.
- **Visao de produto.** Nao sou apenas um executor tecnico. Penso na jornada do usuario, na usabilidade e na eficiencia operacional.

## Orcamento & Prazo

- **Prazo:** 6-8 semanas para MVP completo
- **Abordagem:** Sprints semanais com demos para acompanhamento e feedback continuo

Estou aberto a discutir priorizacao de funcionalidades e otimizacao de escopo para melhor adequacao ao orcamento. O objetivo e entregar uma solucao que substitua completamente a IREV com maior flexibilidade e controle.

Confira o demo no repositorio e me diga o que acha!

Abraco
