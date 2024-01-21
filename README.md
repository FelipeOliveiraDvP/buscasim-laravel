# BuscaSim - Consulta de placas automotivas

O BuscaSim é uma plataforma onde os usuários podem consultar qualquer placa, e receber todas as informações do veículo.

## Fluxo do usuário simples

1. O cliente faz a pesquisa de uma placa na página inicial.
   1.1 Caso a placa esteja no formato errado, ou seja inválida, a API retorna um erro.

2. Após a pesquisa, são exibidas as informações gratuitas da consulta.
   2.1 Caso o usuário atualize a página, a consulta gratuita deverá ser refeita com a placa que está na URL.
   2.2 Caso não exista placa na URL, ou ela for inválida, o cliente deverá ser redirecionado para a página inicial.
   2.3 O cliente poderá optar por liberar as informações bloqueadas, e ser redirecionado para o pagamento.

3. Para visualizar as informações bloqueadas, o cliente deverá realizar o pagamento.
   3.1 O cliente deverá informar CPF, Nome, E-mail e aceitar a política de privacidade.
   3.2 O cliente poderá informar um cupon promocional para obter um desconto no valor.
   3.2.1 O Cupon vai aplicar uma porcentagem do valor total como desconto.
   3.2.2 O Cupon deverá ser uma palavra única composta por letras e números em caixa alta.
   3.2.3 O Cupon deverá possuir uma data de expiração, pode ser ativado ou desativado.
   3.3 Após confirmar o pagamento, será gerado um QRCode e um código PIX
   3.4 O cliente deverá escanear ou copiar o código PIX para efetuar o pagamento.
   3.5 Após a confirmação do pagamento via websocket, o cliente será redirecionado para a página de resultados com as informações liberadas.
   3.5.1 Caso o cliente atualize ou saia da página, ele deverá acessar sua área privada para visualizar as informações.

4. Para acessar a área privada, o cliente deverá informar seu e-mail
   4.1 Caso seja o primeiro acesso, ele deverá criar uma senha de acesso
   4.1.1 Após a criação da senha, o cliente será redirecionado para o seu histórico de consulta
   4.2 Caso não seja, será redirecionado para o histórico.

5. No histórico, o cliente poderá visualizar as informações das consultas que foram pagas.
   5.1 As informações vão ser as mesmas do momento em que a consulta foi efetuada.
