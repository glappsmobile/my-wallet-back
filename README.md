- Antes de começar

    1. Extraia os arquivos do banco do zip abaixo:
        
        [database-mystoreultrasystem-3a28727e.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1533e3dc-4009-4313-9f45-e614c89f01eb/database-mystoreultrasystem-3a28727e.zip)
        
    2. Abra um terminal na pasta do banco de dados extraídos e execute o seguinte comando para configurar o banco:
        
        ```sql
        bash ./create-database
        ```
        
    3. Abra um terminal na pasta do back-end e execute o seguinte comando:
        
        ```bash
        npm i # para instalar todas as dependências
        node src/app.js # para executar o servidor
        ```
        

Depois de tanto tempo trabalhando com banco de dados de produtos, decidiu criar seu próprio sistema de gerenciamento de produtos!

Para isso, já tem o banco construído com a tabela `produtos`, com a seguinte estrutura:

- `id`, número;
- `nome`, string;
- `preco`, número inteiro;
- `condicao`, string com valor `"novo"`, `"seminovo"` ou `"usado"`.

O sistema dado no zip abaixo possui 3 rotas parcialmente implementadas:

- **GET** `/api/products`
    
    Deve buscar todos os produtos da tabela e retorná-los ao usuário da API.
    
    **Esta rota já está implementada.**
    
- **GET** `/api/products/:id`
    
    Deve buscar um único produto do banco de dados pelo id especificado. Se nenhum produto for encontrado, deve retornar com status `404`. Se algum produto for encontrado, deve retorná-lo com status `200`.
    
- **POST** `/api/products`
    
    Deve inserir um produto no banco de dados. **Somente após a inserção** deve retornar status `201`.
    

As rotas não implementadas inicialmente respondem com o status `501`, que significa "Não implementado". Implemente as funções das rotas e **remova** a linha que responde com status `501`.