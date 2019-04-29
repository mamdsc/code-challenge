# Sistema de transações

#### Tecnologias usadas

- ReactJs
- CurrencyJs
- Date Fns

#### Organização dos diretórios

Seguindo o padrão de organização proposto pelo Dan Abramov, pois assim há mais controle do state no container e evitamos a duplicação de state.

- Components: Dumb components usados para construção da tela, organizados por feature;
- Containers: Smart components, componente principal que executa a lógica;
- Service: Fornece serviços necessários para aplicação;
- Database: Configuração de acesso ao local storage.

#### Objetivos

Essa PWA tem como objetivo cadastrar transações, lista-lás e exibir o total de transações realizadas.<br>
É possível também limpar todas ou excluir alguns itens.<br>
Tratamento da moeda: PT-BR.

#### Design

Optei também por não utilizar frameworks para estilos, como antd ou material-UI, pois julguei ser mais simples.<br>
Tentei seguir alguns padrões de projeto como YAGNI e KISS.

#### Para rodar o projeto

```bash
$ git clone https://github.com/mamdsc/code-challenge
$ cd code-challenge
$ yarn install | npm install
$ npm start
```

Porta: [http://localhost:3000](http://localhost:3000).

#### Melhorias
Melhorar a responsividade.


