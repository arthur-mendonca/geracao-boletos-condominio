# geracao-boletos-condominio

O aplicativo desenvolvido em Node.js com TypeScript é um projeto de back-end destinado a importar e exportar dados de e para um sistema de controle de acesso de um condomínio residencial. A aplicação utiliza várias bibliotecas, como Express para a construção da API, pdf-parse e pdf-make para manipulação de arquivos PDF, csv-parser para manipulação de arquivos CSV, dotenv para gerenciamento de variáveis de ambiente, pg para lidar com um banco de dados PostgreSQL, TypeORM e reflect-metadata para mapeamento objeto-relacional (ORM) e suporte a decoradores, respectivamente.

O aplicativo oferece várias funcionalidades:

Importação de Dados do CSV: A aplicação possui um endpoint que recebe um arquivo CSV, extrai os dados e os importa para a tabela 'boletos' no banco de dados.

Mapeamento de Lotes: Devido à diferença no formato dos nomes dos lotes nos sistemas financeiro e da portaria, o aplicativo implementa um sistema de mapeamento para vincular corretamente os boletos ao respectivo lote no sistema da portaria.

Importação de Dados do PDF: A aplicação possui outro endpoint que recebe um arquivo PDF, desmembra-o em várias páginas (cada uma representando um boleto) e salva essas páginas como arquivos PDF separados em uma pasta local. O nome do PDF gerado corresponde ao ID do boleto na tabela 'boletos'.

Recuperação de Boletos: A aplicação fornece um endpoint que retorna todos os boletos existentes no sistema, com a capacidade de filtrar os boletos com base em vários critérios.

Geração de Relatórios: A aplicação possui a capacidade de gerar um relatório em formato PDF de todos os boletos solicitados através de um endpoint. O relatório é retornado como uma string base64.

O aplicativo usa um banco de dados SQL e implementa duas tabelas - 'lotes', que armazena os lotes do condomínio, e 'boletos', que armazena os boletos importados. O projeto foi estruturado com foco na organização e padronização do código e habilidades técnicas com banco de dados e integração no Node.js.

Observações:
- O código está na branch Master;
- Para fins de teste, o arquivo boletos.csv e boletos.pdf são utilizados por padrão pelo aplicativo, basta mantê-los na pasta raiz do projeto;
- Os arquivos de pdf criados pelas requisições são enviados por padrão para a pasta raiz do aplicativo, no disco local;
- o arquivo de rotas do Insomnia contém todas as rotas do projeto;
- baixar o Insomnia - https://insomnia.rest/download
