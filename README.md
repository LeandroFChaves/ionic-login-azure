# Ionic com Login Azure 

Projeto de exemplo de uma aplicação ionic (cordova) que faz simula um login com o azure ad (Microsoft).

## Configuração no Azure

Abaixo seguem os passos para configuração da sua conta no azure e o aplicativo.

1. Acessar a página https://portal.azure.com/ com a conta da sua instituição e na tela que foi aberta clique no botão “Gerenciar o Azure Active Directory”;

2. Do lado esquerdo clicar na opção “Registro de Aplicativos”;

3. Clicar no botão “+ Novo Registro” e preencher os campos obrigatórios em seguida clicar em “Registrar”;

4. Na próxima tela copiar o “ID do aplicativo (cliente)” e “ID do diretório (locatório)” que devem ser informados nos parametros correspondentes no environments deste projeto;

5. No painel ao lado esquerdo clicar na opção “Autenticação”;

6. No lado direito da tela na seção de “Configurações de plataforma” clique na opção “+ Adicionar uma plataforma” e escolha a opção “Aplicativo de página única”;

7. Depois no campo “URI de redirecionamento do aplicativo” coloque o valor http://localhost e clique em “Configurar” no final da página;


## Links

Abaixo segue alguns links de tutorias e referências que foram utilizadas durante o desenvolvimento deste projeto.

https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code

https://stackoverflow.com/questions/69391322/ionic-and-msal-authentication

https://stackoverflow.com/questions/71479604/error-the-selector-app-redirect-did-not-match-any-elements-i-am-trying-to-up

https://stackoverflow.com/questions/71374941/angular-msal-v2-login-via-redirect-redirecting-3-or-more-times-before-token-a
