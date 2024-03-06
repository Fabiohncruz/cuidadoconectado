# Projeto de TCC - Cuidado Conectado

Este é o repositório do Projeto Cuidado Conectado, que consiste em uma aplicação dividida em três partes principais:
API, WEB e APP Mobile. A
API é construída com Node.js e integração com MongoDB e Firebase, enquanto a parte WEB é desenvolvida em React. A
aplicação móvel (APP) é desenvolvida usando React Native.

## Estrutura do Projeto

```
cuidadoconecatdo/
│
├── api/ # Pasta da API (Node.js + Mongo + Firebase)
├── web/ # Pasta da aplicação WEB (React)
└── app/ # Pasta da aplicação móvel (React Native)
```

## Pré-requisitos

* Node.js e npm instalados
* MongoDB instalado e em execução ( [Ou/MongoAtlas](https://cloud.mongodb.com/) )
* Conta Firebase para configuração da API (Verificar acessos para uso local)

## Dados do Projeto

Acessar o Banco Mongo:

## Como Iniciar

1. **API (Node.js + Mongo + Firebase)**
    - Navegue até a pasta `api`:
      ```
      cd api
      ```
    - Instale as dependências:
      ```
      npm install
      ```
    - Configure suas credenciais criando arquivo `.env`.
    - Inicie o servidor:
      ```
      npm start
      ```

2. **WEB (React)**
    - Navegue até a pasta `web`:
      ```
      cd web
      ```
    - Instale as dependências:
      ```
      npm install
      ```
    - Inicie o servidor de desenvolvimento:
      ```
      npm start
      ```

3. **APP (React Native)**
    - Navegue até a pasta `app`:
      ```
      cd app
      ```
    - Instale as dependências:
      ```
      npm install
      ```
    - Inicie o aplicativo no emulador ou dispositivo conectado:
      ```
      npm start
      ```
    - Inicie App no Android
      ```
      press: a
      ```

Com estas etapas, você deverá ser capaz de iniciar cada parte do projeto localmente em seu ambiente de desenvolvimento.