(() => {
  function isMeet(url) {
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" &&
      (host === "meet.google.com" || host.endsWith(".meet.google.com"));
  }

  function meetingLink(event) {
    for (const node of event.composedPath()) {
      if (!(node instanceof Element)) continue;
      const link = node.closest("a[href]");
      if (!link) continue;
      try {
        const url = new URL(link.href, location.href);
        if (isMeet(url)) return url.href;
      } catch (_) {}
    }
    return null;
  }

  function openInChrome(url, closeTab = false) {
    return browser.runtime.sendMessage({type: "openMeet", url, closeTab})
      .catch(() => ({ok: false}));
  }

  function handleClick(event) {
    if (event.defaultPrevented || (event.button !== 0 && event.button !== 1)) return;
    const url = meetingLink(event);
    if (!url) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openInChrome(url).then((response) => {
      if (!response || !response.ok) alert("Não foi possível abrir a reunião no Chrome. Verifique se a extensão está ativada e se o Chrome está instalado.");
    });
  }

  function offerChrome() {
    if (!isMeet(new URL(location.href))) return;

    const host = document.createElement("div");
    host.style.cssText = "position:fixed;z-index:2147483647;top:18px;right:18px;max-width:calc(100vw - 36px)";
    const shadow = host.attachShadow({mode: "closed"});
    const style = document.createElement("style");
    style.textContent = `
      .card { font: 14px -apple-system, BlinkMacSystemFont, sans-serif; color: #202124;
        background: white; border: 1px solid #dadce0; border-radius: 12px;
        box-shadow: 0 4px 20px #0004; padding: 16px; width: 310px; max-width: calc(100vw - 68px); }
      p { margin: 0 0 14px; line-height: 1.4; }
      .actions { display: flex; gap: 8px; flex-wrap: wrap; }
      button { font: inherit; cursor: pointer; border-radius: 6px; padding: 8px 10px; border: 1px solid #dadce0; background: white; }
      .primary { background: #1a73e8; border-color: #1a73e8; color: white; }
      button:disabled { opacity: .6; cursor: default; }
      .error { color: #b3261e; margin: 10px 0 0; }
    `;
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-label", "Abrir reunião no Chrome");
    const question = document.createElement("p");
    question.textContent = "Quer abrir esta reunião no Google Chrome?";
    const actions = document.createElement("div");
    actions.className = "actions";
    const openButton = document.createElement("button");
    openButton.className = "primary";
    openButton.textContent = "Abrir no Chrome";
    const stayButton = document.createElement("button");
    stayButton.textContent = "Continuar no Safari";
    const error = document.createElement("p");
    error.className = "error";
    error.hidden = true;
    error.textContent = "Não foi possível abrir o Chrome. Confira se ele está instalado e tente novamente.";
    stayButton.addEventListener("click", () => host.remove());
    openButton.addEventListener("click", async () => {
      openButton.disabled = true;
      error.hidden = true;
      const response = await openInChrome(location.href, true);
      if (response && response.ok && response.closed) host.remove();
      else if (response && response.ok) {
        error.textContent = "O Chrome foi aberto, mas não foi possível fechar esta aba.";
        error.hidden = false;
      } else { openButton.disabled = false; error.hidden = false; }
    });
    actions.append(openButton, stayButton);
    card.append(question, actions, error);
    shadow.append(style, card);
    document.documentElement.append(host);
  }

  document.addEventListener("click", handleClick, true);
  document.addEventListener("auxclick", handleClick, true);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", offerChrome, {once: true});
  else offerChrome();
})();
