# Meet no Chrome (Safari) + Atalho de Extensões

Extensão do **Safari** para macOS que evita abrir reuniões do **Google Meet** no Safari, encaminhando-as automaticamente para o **Google Chrome** — acompanhada do app compilado, do projeto Xcode e do atalho/automação para reativar extensões não assinadas ao abrir o Safari.

## O que a extensão faz

- **Intercepta cliques em links do Google Meet:** ao clicar (botão esquerdo ou do meio) em qualquer link `https://meet.google.com/...` (ou subdomínios `*.meet.google.com`) dentro de qualquer site no Safari, a extensão impede a abertura no Safari e envia o link para o **Google Chrome** via *native messaging* (pelo app wrapper nativo do macOS).
- **Oferece abrir no Chrome quando você já está no Meet:** se uma página do `meet.google.com` já estiver aberta no Safari, a extensão exibe um card no canto superior direito (*"Quer abrir esta reunião no Google Chrome?"*) com duas opções:
  - **Abrir no Chrome:** abre a reunião no Chrome e fecha a aba atual do Safari.
  - **Continuar no Safari:** fecha o aviso e mantém a reunião no Safari.
- **Requisitos:** Safari 15.4 ou superior e Google Chrome instalado no Mac.

## Como instalar e usar (na ordem correta)

### 1. Colocar o app no Mac
- **Opção A — Usar o app já compilado (mais rápido, Apple Silicon `arm64`):**
  1. Baixe `Meet-no-Chrome.app.zip` na página de [Releases (v1.4.0)](https://github.com/leandromeira/meet-no-chrome/releases/tag/v1.4.0).
  2. Descompacte e mova `Meet no Chrome.app` para `~/Applications` ou `/Applications` (ainda sem precisar abrir).
- **Opção B — Compilar pelo Xcode:**
  1. Abra `xcode/Meet no Chrome/Meet no Chrome.xcodeproj` no **Xcode** e compile o app para a sua pasta de Aplicativos.

### 2. Habilitar o modo de desenvolvedor e "Permitir extensões não assinadas" no Safari
1. Abra o **Safari** e vá em **Safari > Ajustes > Avançado**.
2. Marque **Mostrar recursos para desenvolvedores web**.
3. Vá na aba **Desenvolvimento** (em **Safari > Ajustes > Desenvolvimento**) e marque **Permitir extensões não assinadas**, confirmando com **Touch ID** ou senha.
   *(Fazer isso antes de abrir o app evita confusão: sem essa caixa marcada, o Safari oculta a extensão da lista.)*

### 3. Abrir o `Meet no Chrome.app` pela primeira vez
1. **Abra o `Meet no Chrome.app` uma vez** para o macOS registrar o bundle da extensão (`.appex`) no sistema.
   *(Como tem assinatura local, se o Gatekeeper bloquear na primeira abertura, use **Clique direito > Abrir** ou libere em **Ajustes do Sistema > Privacidade e Segurança**.)*
2. Volte em **Safari > Ajustes > Extensões**, marque **Google Meet no Chrome** (ou **Meet no Chrome**) e libere a permissão de acesso como **Sempre Permitir em Todos os Sites** (ou **Sempre Permitir neste Site** nos sites de onde você abre reuniões, como Google Agenda e Gmail).
   *(Importante: se a permissão ficar em **Perguntar** ou liberada apenas para `meet.google.com`, o script não roda no site de origem — o Safari abrirá uma nova aba do Meet primeiro e só então mostrará o card perguntando se deseja abrir no Chrome.)*

### 4. Importar o atalho e criar a automação (para os próximos usos)
*(Automações do app Atalhos ficam salvas apenas localmente neste Mac e não sincronizam via iCloud.)*
1. Dê duplo clique em `shortcuts/Abrir Safari + Extensões.shortcut` para importar no app **Atalhos** (ou crie um novo atalho com a ação **Executar AppleScript** usando `shortcuts/abrir-safari-extensoes.applescript`).
2. Em **Atalhos > Ajustes > Avançado**, habilite **Permitir execução de scripts** e conceda permissão de **Acessibilidade** ao app **Atalhos** quando o macOS solicitar.
3. No app **Atalhos**, abra a aba **Automação** → **+** → **App** → selecione **Safari** → marque **Quando for aberto** → aponte para o atalho **Abrir Safari + Extensões**.
4. Daqui em diante, sempre que o Safari for aberto após ter sido encerrado (`Cmd + Q`), a automação abrirá a tela certa e clicará na caixa, restando apenas confirmar com **Touch ID** ou senha.

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
