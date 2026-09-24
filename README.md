# Pesquisa de Campo - Banco de Usos de IA

Exemplo simples de back-end para cadastrar e consultar alguns usos de Inteligência Artificial usando JSON.

## Tecnologias

* **Node.js**
* **JavaScript**
* **Express**
* **VS Code**
* **Thunder Client**
* **HTML**
* **JSON**

## Como executar

### 1. Clone este repositório

Abra o repositório no GitHub e faça o clone para o seu computador.

### 2. Abra no VS Code

Abra a pasta do projeto no **Visual Studio Code**.

### 3. Instale as dependências

No terminal, digite:

```bash
npm install
```

### 4. Inicie o servidor

```bash
node server.js
```

O servidor ficará disponível em:

```text
http://localhost:3001
```

## Testando a API

Os testes podem ser feitos pelo **Thunder Client**.

### GET — listar

```text
GET http://localhost:3001/ia
```

### GET — buscar por ID

```text
GET http://localhost:3001/ia/1
```

### POST — cadastrar

```text
POST http://localhost:3001/ia
```

Exemplo de JSON:

```json
{
  "nome": "ChatGPT",
  "uso": "Auxiliar em estudos e pesquisas"
}
```

## Imagens do projeto

### Testes no Thunder Client

![Teste GET no Thunder Client](prints/get.png)

![Teste POST no Thunder Client](prints/post.png)

### Página H

