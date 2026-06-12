# Patas-do-bem

Bem-vindo ao repositório oficial do projeto Patas-do-bem 
Aqui voce encontra todos os manuais e documentação técnica necessários para o funcionamento do sistema.

 
## MANUAL DO USUÁRIO:
O Patas do Bem é uma plataforma web desenvolvida com o objetivo de centralizar informações sobre os cães presentes no IFTM Campus Ituiutaba. O sistema foi criado para facilitar a divulgação dos animais, apoiar processos de adoção responsável, registrar ocorrências e promover a interação entre a comunidade acadêmica e a equipe responsável pelos cuidados dos cães.

A plataforma pode ser acessada por meio de navegadores de internet em computadores, tablets e smartphones, sem necessidade de instalação.

1. Acesso ao Sistema

Para utilizar o sistema:

Abra um navegador de internet.
Acesse o endereço disponibilizado pela equipe do projeto.
Navegue pelas páginas utilizando o menu principal localizado no topo da tela.

Não é necessário realizar instalação ou cadastro para acessar as informações públicas da plataforma.

2. Página Inicial

A página inicial apresenta informações gerais sobre o projeto Patas do Bem e seus objetivos.

Nela, o usuário pode:

Conhecer a proposta do projeto;
Compreender a importância do cuidado com os cães do campus;
Acessar rapidamente as demais funcionalidades do sistema.

3. InstaCão

A página InstaCão funciona como uma galeria dos cães do campus.

Nesta área, o usuário pode:

Visualizar fotografias dos animais;
Conhecer informações básicas sobre cada cão;
Acompanhar os cães presentes no campus.

O objetivo desta página é aumentar a visibilidade dos animais junto à comunidade acadêmica.

6. Cães do Campus

Nesta seção estão disponíveis informações detalhadas sobre cada animal.

Os dados apresentados podem incluir:

Nome;
Idade aproximada;
Características físicas;
Situação de vacinação;
Castração;
Histórico de convivência.

Essas informações auxiliam usuários interessados em conhecer melhor os cães antes de realizar uma adoção ou acompanhar as atividades do projeto.

7. Adoção Responsável

A página de adoção reúne informações e orientações para pessoas interessadas em oferecer um novo lar aos animais.

O usuário poderá:

Conhecer os cães disponíveis para adoção;
Obter orientações sobre adoção responsável;
Consultar informações importantes sobre os animais.
8. Doações e Necessidades

Esta área apresenta as necessidades atuais relacionadas aos cuidados dos cães.

Podem ser divulgados itens como:

Ração;
Medicamentos;
Materiais de higiene;
Acessórios e outros recursos necessários.

A página permite que a comunidade acompanhe as demandas existentes e contribua com o projeto.

9. Registro de Ocorrências

A funcionalidade de ocorrências permite informar situações relacionadas aos cães do campus.

Exemplos de ocorrências:

Necessidade de atendimento;
Mudança de localização do animal;
Problemas observados durante a convivência;
Informações relevantes para a equipe responsável.

As ocorrências auxiliam no acompanhamento e gerenciamento dos animais.

10. Mapa Interativo

O sistema disponibiliza um mapa interativo do campus.

Por meio dele, o usuário pode localizar:

Pontos de alimentação;
Canil;
Sede da equipe Fauna;
Outros locais de interesse relacionados ao projeto.

Os pontos são apresentados através de marcadores que exibem informações ao serem selecionados.

11. Página de Contato

A página de contato reúne informações da equipe responsável pelo projeto.

Nela, o usuário pode:

Encontrar canais de comunicação;
Enviar dúvidas;
Fazer sugestões;
Solicitar informações adicionais.
12. Recomendações de Uso

Para uma melhor experiência, recomenda-se:

Utilizar navegadores atualizados;
Verificar periodicamente novas informações sobre os cães;
Informar ocorrências de forma clara e objetiva;
Respeitar as orientações da equipe responsável pelos animais.
12. Suporte

Em caso de dúvidas, sugestões ou problemas de utilização, entre em contato através dos canais disponibilizados na página "Contato" do sistema.

13. Considerações Finais

O Patas do Bem foi desenvolvido para promover o bem-estar dos cães do IFTM Campus Ituiutaba, facilitar a comunicação entre a comunidade acadêmica e a equipe Fauna e contribuir para ações de adoção responsável e cuidado animal.

A participação da comunidade é fundamental para o sucesso da iniciativa.

## Guia do Desenvolvedor

O sistema foi construído utilizando tecnologias web de software livre, priorizando simplicidade, acessibilidade e facilidade de manutenção.

2. Objetivo do Sistema

O Patas do Bem tem como finalidade:

Centralizar informações sobre os cães do campus;
Facilitar processos de adoção responsável;
Divulgar necessidades e campanhas de arrecadação;
Registrar ocorrências relacionadas aos animais;
Disponibilizar um mapa interativo com pontos de interesse;
Fortalecer a comunicação entre a comunidade acadêmica e a equipe Fauna.
3. Tecnologias Utilizadas
Tecnologia	Finalidade
HTML5	Estrutura das páginas
CSS3	Estilização da interface
JavaScript	Interatividade do sistema
Leaflet.js	Implementação do mapa interativo
ArcGIS World Imagery	Camada de visualização dos mapas
Visual Studio Code	Ambiente de desenvolvimento
GitHub	Controle de versão
Netlify	Hospedagem do sistema
4. Estrutura do Projeto

A organização do projeto segue uma estrutura simples baseada em páginas estáticas.

Exemplo:

patas-do-bem/
│
├── index.html
├── adocao.html
├── caes.html
├── ocorrencias.html
├── contato.html
├── doacoes.html
├── mapa.html
│
├── css/
│   ├── style.css
│   └── paginas.css
│
├── js/
│   ├── script.js
│   ├── mapa.js
│   └── filtros.js
│
├── img/
│   ├── logos/
│   ├── caes/
│   └── icones/
│
└── docs/
    ├── ManualUsuario.pdf
    └── GuiaDesenvolvedor.pdf

A estrutura pode variar conforme a evolução do projeto.

5. Funcionalidades Implementadas
Página Inicial

Apresenta informações sobre o projeto e acesso às demais funcionalidades.

Arquivo principal
index.html
InstaCão

Galeria visual contendo imagens dos cães do campus.

Objetivo

Facilitar a divulgação dos animais.

Cães do Campus

Exibe informações detalhadas dos cães cadastrados.

Informações apresentadas
Nome
Características
Idade aproximada
Situação de vacinação
Castração
Histórico
Adoção Responsável

Disponibiliza orientações e informações sobre adoção.

Doações e Necessidades

Lista itens necessários para os cuidados dos animais.

Registro de Ocorrências

Permite registrar acontecimentos relacionados aos cães.

Mapa Interativo

Implementado utilizando a biblioteca Leaflet.js.

Recursos
Marcadores personalizados;
Janelas informativas (popups);
Localização de pontos importantes;
Navegação interativa.
Página de Contato

Disponibiliza informações da equipe responsável e canais de comunicação.

6. Personalização do Sistema

Para adicionar um novo cão:

Inserir a imagem na pasta correspondente.
Adicionar os dados no arquivo HTML ou estrutura utilizada.
Atualizar informações relacionadas à adoção, quando necessário.

Para adicionar um novo ponto no mapa:

Abrir o arquivo JavaScript responsável pelo mapa.
Inserir as coordenadas desejadas.
Configurar o texto informativo do marcador.

Exemplo:

L.marker([-18.97, -49.46])
.addTo(map)
.bindPopup("Novo ponto de interesse");
7. Hospedagem

O projeto pode ser hospedado gratuitamente utilizando o Netlify.

Procedimento básico:

Realizar upload dos arquivos do projeto.
Configurar a publicação.
Gerar o endereço público.
Testar todas as páginas após a implantação.
8. Controle de Versão

O código-fonte está disponível em:

GitHub:
https://github.com/Patas-do-bem/patas-do-bem/tree/main

Recomenda-se utilizar Git para:

Controle de alterações;
Correção de erros;
Desenvolvimento colaborativo;
Registro do histórico de modificações.
9. Manutenção

As atividades de manutenção incluem:

Correção de erros identificados pelos usuários;
Atualização das informações dos cães;
Inclusão de novas funcionalidades;
Atualização da documentação;
Verificação da hospedagem;
Melhorias de desempenho e acessibilidade.
10. Possíveis Melhorias Futuras

Entre as melhorias planejadas para futuras versões estão:

Integração com banco de dados;
Sistema de autenticação de usuários;
Cadastro online de adoções;
Painel administrativo;
Upload de imagens pela equipe Fauna;
Histórico completo dos animais;
Sistema de notificações.
11. Licença

## O projeto utiliza a Licença MIT.

A licença permite uso, modificação, distribuição e compartilhamento do software, desde que os créditos dos autores originais sejam preservados.

12. Considerações Finais

O Patas do Bem foi desenvolvido seguindo princípios de simplicidade, acessibilidade e colaboração. O projeto permanece aberto para futuras melhorias e contribuições da comunidade, permitindo sua evolução contínua em benefício dos animais e da comunidade acadêmica do IFTM Campus Ituiutaba.
