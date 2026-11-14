# Meet no Chrome (Safari) + Atalho de Extensões

Extensão do **Safari** para macOS que evita abrir reuniões do **Google Meet** no Safari, encaminhando-as automaticamente para o **Google Chrome** — acompanhada do app compilado, do projeto Xcode e do atalho/automação para reativar extensões não assinadas ao abrir o Safari.

## O que a extensão faz

- **Intercepta cliques em links do Google Meet:** ao clicar (botão esquerdo ou do meio) em qualquer link `https://meet.google.com/...` (ou subdomínios `*.meet.google.com`) dentro de qualquer site no Safari, a extensão impede a abertura no Safari e envia o link para o **Google Chrome** via *native messaging* (pelo app wrapper nativo do macOS).
- **Oferece abrir no Chrome quando você já está no Meet:** se uma página do `meet.google.com` já estiver aberta no Safari, a extensão exibe um card no canto superior direito (*"Quer abrir esta reunião no Google Chrome?"*) com duas opções:
  - **Abrir no Chrome:** abre a reunião no Chrome e fecha a aba atual do Safari.
  - **Continuar no Safari:** fecha o aviso e mantém a reunião no Safari.
- **Requisitos:** Safari 15.4 ou superior e Google Chrome instalado no Mac.

## Como instalar e usar (na ordem correta)

### 1. Instalar e abrir o app uma vez (obrigatório)
- **Opção A — Usar o app já compilado (mais rápido, Apple Silicon `arm64`):**
  1. Baixe `Meet-no-Chrome.app.zip` na página de [Releases (v1.4.0)](https://github.com/leandromeira/meet-no-chrome/releases/tag/v1.4.0).
  2. Descompacte e mova `Meet no Chrome.app` para `~/Applications` ou `/Applications`.
  3. **Abra o `Meet no Chrome.app` uma vez** para o macOS registrar o bundle da extensão (`.appex`) no Safari. *(Como tem assinatura local, se o Gatekeeper bloquear na primeira abertura, use **Clique direito > Abrir** ou libere em **Ajustes do Sistema > Privacidade e Segurança**.)*
- **Opção B — Compilar pelo Xcode:**
  1. Abra `xcode/Meet no Chrome/Meet no Chrome.xcodeproj` no **Xcode** e compile/execute o app no seu Mac (isso também já o abre uma vez e registra a extensão).

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

## Por que é preciso reativar "Permitir extensões não assinadas"?

Por segurança, o Safari no macOS só confia permanentemente em extensões distribuídas e assinadas pela **Mac App Store** (mesmo um app assinado com *Developer ID* e notarizado fora da loja continua sendo tratado pelo Safari como extensão não assinada).

Como o `Meet no Chrome.app` é compilado localmente sem passar pela Mac App Store:
- A opção **Permitir extensões não assinadas** é **zerada automaticamente toda vez que o Safari é encerrado** (`Cmd + Q`).
- O macOS exige **Touch ID ou senha** para marcá-la novamente ao reabrir o Safari.
- *(Dica: fechar apenas as janelas com `Cmd + W` ou ocultar com `Cmd + H` mantém o Safari aberto e evita ter que reativar a opção até o próximo reinício do app ou do Mac.)*

## Estrutura do repositório

- **Releases (`v1.4.0`):** `Meet-no-Chrome.app.zip` já compilado (`arm64`, assinatura ad-hoc local).
- `extension/`: arquivos-fonte da Web Extension (`manifest.json`, `background.js`, `meet-links.js`, `icon.png`, `README.md`).
- `xcode/Meet no Chrome/`: projeto Xcode (`Meet no Chrome.xcodeproj`) com o app container e a extensão Safari.
- `shortcuts/`:
  - `Abrir Safari + Extensões.shortcut`: arquivo de atalho importável no app **Atalhos** (macOS).
  - `abrir-safari-extensoes.applescript`: código em texto do AppleScript usado na ação **Executar AppleScript**.
