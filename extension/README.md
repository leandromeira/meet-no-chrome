# Google Meet no Chrome (Safari)

Extensão Web mínima que tenta encaminhar navegações para `meet.google.com` ao Google Chrome usando o esquema `googlechrome://`. Requer que o Chrome esteja instalado. O macOS/Safari pode pedir confirmação para abrir o aplicativo externo.

## Criar o app/extensão do Safari

1. No Xcode, escolha **File > New > Project… > Safari Extension App** (o nome do template pode variar por versão).
2. No alvo da extensão, substitua o `manifest.json` e o script de background pelos arquivos desta pasta. Confirme que o script de fundo está incluído no bundle da extensão.
3. Compile e execute o app no Mac. No Safari, abra **Settings > Extensions** e habilite a extensão.

Se o template atual gerar uma extensão MV3 com `service_worker`, adapte a seção `background` do manifesto para `"service_worker": "background.js"`.

## Limitação

O Safari não oferece à extensão uma API para lançar outro navegador diretamente. Esta versão usa um esquema de URL registrado pelo Chrome, que pode depender da configuração do Chrome/macOS e da confirmação do usuário. Não foi possível testar no Xcode/Safari deste ambiente.
