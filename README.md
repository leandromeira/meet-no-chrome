# Meet no Chrome (Safari) + Atalho de Extensões

Projeto com a extensão **Meet no Chrome** para Safari (encaminha links do `meet.google.com` para o Google Chrome), o projeto Xcode correspondente e o atalho/automação para agilizar a habilitação de **Permitir extensões não assinadas** no macOS.

## Por que é preciso reativar "Permitir extensões não assinadas"?

Por segurança, o Safari no macOS só confia permanentemente em extensões distribuídas e assinadas pela **Mac App Store** (mesmo um app assinado com *Developer ID* e notarizado fora da loja continua sendo tratado pelo Safari como extensão não assinada).

Como o `Meet no Chrome.app` é compilado localmente sem passar pela Mac App Store:
- A opção **Permitir extensões não assinadas** é **zerada automaticamente toda vez que o Safari é encerrado** (`Cmd + Q`).
- O macOS exige **Touch ID ou senha** para marcá-la novamente ao reabrir o Safari.
- *(Dica: fechar apenas as janelas com `Cmd + W` ou ocultar com `Cmd + H` mantém o Safari aberto e evita ter que reativar a opção até o próximo reinício do app ou do Mac.)*

## Estrutura do repositório

- `extension/`: arquivos-fonte da Web Extension (`manifest.json`, `background.js`, `meet-links.js`, `icon.png`, `README.md`).
- `xcode/Meet no Chrome/`: projeto Xcode (`Meet no Chrome.xcodeproj`) com o app container e a extensão Safari.
- `shortcuts/`:
  - `Abrir Safari + Extensões.shortcut`: arquivo de atalho importável no app **Atalhos** (macOS).
  - `abrir-safari-extensoes.applescript`: código em texto do AppleScript usado na ação **Executar AppleScript**.

## Passo a passo na ordem correta

### 1. Compilar e abrir o app uma vez (obrigatório)
1. Abra `xcode/Meet no Chrome/Meet no Chrome.xcodeproj` no **Xcode** e compile/instale o `Meet no Chrome.app` (por exemplo em `~/Applications` ou `/Applications`).
2. **Abra o `Meet no Chrome.app` uma vez** — isso é necessário para o macOS registrar o bundle da extensão (`.appex`) no sistema e fazê-la aparecer dentro do Safari.

### 2. Habilitar o modo de desenvolvedor no Safari
1. Abra o **Safari** e vá em **Safari > Ajustes > Avançado**.
2. Marque **Mostrar recursos para desenvolvedores web** (faz a aba **Desenvolvimento** aparecer nos Ajustes do Safari).

### 3. Importar e liberar o atalho no app Atalhos
1. Dê duplo clique em `shortcuts/Abrir Safari + Extensões.shortcut` para importar no app **Atalhos** (ou crie um novo atalho com a ação **Executar AppleScript** usando `shortcuts/abrir-safari-extensoes.applescript`).
2. Em **Atalhos > Ajustes > Avançado**, habilite **Permitir execução de scripts**.
3. Na primeira execução, conceda permissão de **Acessibilidade** ao app **Atalhos** quando o macOS solicitar.

### 4. Criar a automação ao abrir o Safari
*(Automações do app Atalhos ficam salvas apenas localmente neste Mac e não sincronizam via iCloud.)*
1. No app **Atalhos**, abra a aba **Automação** e clique em **+**.
2. Escolha o gatilho **App** → selecione **Safari** → marque **Quando for aberto**.
3. Aponte a ação para executar o atalho **Abrir Safari + Extensões**.

### 5. Ativar a extensão no Safari
1. Ao abrir o Safari, a automação abrirá **Ajustes > Desenvolvimento** e clicará em **Permitir extensões não assinadas** — confirme com **Touch ID** ou senha.
2. Em **Safari > Ajustes > Extensões**, marque **Meet no Chrome** e conceda as permissões solicitadas. Nas próximas vezes em que o Safari for encerrado e reaberto, você só precisará confirmar o Touch ID/senha quando o atalho rodar.
