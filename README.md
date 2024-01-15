
# Reserva BP

Para agendar melhor os atendimentos e planos da Bem Protege foi requisitada a criação de um aplicativo chamado Reserva BP. Ele será encarregado de criar agendas entre Corretores de Seguro e Clientes.

## Deploy

[reserva-bp.odutra.xyz](https://reserva-bp.odutra.xyz)

## Bibliotecas utilizadas
- vuetify
- typescript
- vue
- vue-router
- vite
- vue-tpastification
- pinia 



## Funcionalidades aplicação

- Temas dark e light
- Preview em tempo real
- Multiplataforma
- Validação de inputs e formularios
- Configuração para ultilização de JSX/TSX
- Historico geral da conta
- Envio de emails de confirmação e avisos
- Edição de dados do usuario
- Gerenciamento de estado global com pinia
- Estrutura de pastas bem divididas
- Rotas configuradas e autenticadas
- Rota de erro
- Funções diversas de formatação
- Instancia configurada do axios
- Vuetify para estilização
- Vite configurado para desenvolvimento e build
- Biblioteca de avisos configurada

## Funcionalidades agendamento
- Agendar reuniões de 30 minutos a 2 horas.
- Escolha do corretor
- Escolha do dia e horario da reunião
- O sistema ja envia todos horarios disponiveis daquele corretor, sendo asism não é possivel agendar em um horario já ocupado.
- Corretores não podem agendar reuniões
- Calendario com todas as reuniões, podendo escolher entre exibição mensal, semanal ou diaria
- Caso o corretor opte, ele pode selecionar em seu perfil para as reuniões precisarem de sua aprovação, sendo assim ele controla a agenda.



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/DARKnx/bp-agenda.git
```

Entre no diretório do projeto

```bash
  cd bp-agenda
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Deploy

Para fazer o deploy desse projeto rode

```bash
  npm run build
```

## apresentação do projeto

[youtube](https://youtu.be/nWphD52Loik)


## backend

[reserva-api](https://github.com/DARKnx/bp-agenda-api)
## Autor

- [@darknx](https://www.github.com/darknx)

