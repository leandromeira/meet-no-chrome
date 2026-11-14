# Meet no Chrome (Safari) + Atalho de Extensões

Projeto com a extensão **Meet no Chrome** para Safari (encaminha links do `meet.google.com` para o Google Chrome), o projeto Xcode correspondente e o atalho/automação para agilizar a habilitação de **Permitir extensões não assinadas** no macOS.

## Estrutura

- `extension/`: arquivos-fonte da Web Extension (`manifest.json`, `background.js`, `meet-links.js`, `icon.png`, `README.md`).
- `xcode/Meet no Chrome/`: projeto Xcode (`Meet no Chrome.xcodeproj`) com o app container e a extensão Safari.
- `shortcuts/`:
  - `Abrir Safari + Extensões.shortcut`: arquivo de atalho importável no app **Atalhos** (macOS).
  - `abrir-safari-extensoes.applescript`: versão em texto do AppleScript usado na ação **Executar AppleScript** (procura a aba `Desenvolvimento` / `Desenvolvedor` / `Developer` e marca a caixa quando desmarcada, abrindo o pedido de senha/Touch ID do macOS).

## Como configurar o Atalho e a Automação no macOS

1. Dê duplo clique em `shortcuts/Abrir Safari + Extensões.shortcut` para importar no app **Atalhos** (ou crie um atalho com a ação **Executar AppleScript** usando `shortcuts/abrir-safari-extensoes.applescript`).
2. Em **Atalhos > Ajustes > Avançado**, habilite **Permitir execução de scripts** e conceda permissão de **Acessibilidade** ao app Atalhos quando o macOS solicitar.
3. Para disparar automaticamente ao abrir o Safari (como as automações não sincronizam via iCloud entre Macs):
   - No app **Atalhos**, vá na aba **Automação** → **+** → **App** → escolha **Safari** (`Quando for aberto`) → selecione o atalho **Abrir Safari + Extensões**.
