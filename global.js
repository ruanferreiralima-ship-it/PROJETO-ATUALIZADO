/* ============================================================
   JS GLOBAL - TEMA, ACESSIBILIDADE E REDIRECIONAMENTO WHATSAPP
   ============================================================ */

   const WHATSAPP_NUMERO = "5521970662286";
   const WHATSAPP_MENSAGEM_PADRAO = "Olá! Vim pelo site da RUAN FILM e gostaria de solicitar um orçamento.";
   
   function gerarLinkWhatsApp(mensagem = WHATSAPP_MENSAGEM_PADRAO) {
       return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
   }
   
   // 1. Aplica tema escuro imediatamente para evitar piscar a tela
   (function aplicarPreferenciasIniciais() {
       if (localStorage.getItem("ruan_theme") === "dark") {
           const toggle = document.getElementById("theme-toggle");
           if (toggle) toggle.checked = true;
       }
   
       const savedFont = localStorage.getItem("ruan_font_size");
       if (savedFont) {
           const fontRadio = document.getElementById(savedFont);
           if (fontRadio) fontRadio.checked = true;
       }
   })();
   
   document.addEventListener("DOMContentLoaded", () => {
       // 2. Controle de Tema (Dark / Light)
       const themeToggle = document.getElementById("theme-toggle");
       const themeButtons = document.querySelectorAll(".theme-button");
   
       if (localStorage.getItem("ruan_theme") === "dark" && themeToggle) {
           themeToggle.checked = true;
       }
   
       themeButtons.forEach((button) => {
           button.addEventListener("click", (e) => {
               e.preventDefault();
               if (!themeToggle) return;
   
               themeToggle.checked = !themeToggle.checked;
               localStorage.setItem("ruan_theme", themeToggle.checked ? "dark" : "light");
               themeToggle.dispatchEvent(new Event("change"));
           });
       });
   
       // 3. Persistência do Tamanho da Fonte
       const fontRadios = document.querySelectorAll('input[name="font-size"]');
       fontRadios.forEach((radio) => {
           radio.addEventListener("change", () => {
               if (radio.checked) {
                   localStorage.setItem("ruan_font_size", radio.id);
               }
           });
       });
   
       // 4. Atualiza todos os ícones de WhatsApp existentes na página (Footer / Cards)
       const linksWhatsApp = document.querySelectorAll('a[aria-label="WhatsApp"]');
       linksWhatsApp.forEach((link) => {
           link.href = gerarLinkWhatsApp();
           link.target = "_blank";
           link.rel = "noopener noreferrer";
       });
   
       // 5. Atualiza o telefone na barra superior para ser clicável
       const infoSpans = document.querySelectorAll(".accessibility-info span");
       infoSpans.forEach((span) => {
           if (span.textContent.includes("7066-2286") || span.textContent.includes("XXXX-XXXX")) {
               span.innerHTML = `<a href="${gerarLinkWhatsApp()}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;">
                   <i class="fa-brands fa-whatsapp gold-text"></i> (21) 9 7066-2286
               </a>`;
           }
       });
   
       // 6. Cria o Botão Flutuante de Redirecionamento Automático para o WhatsApp
       criarBotaoFlutuanteWhatsApp();
   });
   
   function criarBotaoFlutuanteWhatsApp() {
       if (document.querySelector(".whatsapp-float-btn")) return;
   
       const btnFloat = document.createElement("a");
       btnFloat.href = gerarLinkWhatsApp();
       btnFloat.target = "_blank";
       btnFloat.rel = "noopener noreferrer";
       btnFloat.className = "whatsapp-float-btn";
       btnFloat.setAttribute("aria-label", "Falar no WhatsApp (21) 97066-2286");
       btnFloat.title = "Orçamento rápido via WhatsApp: (21) 97066-2286";
       btnFloat.innerHTML = `<i class="fa-brands fa-whatsapp"></i>`;
   
       document.body.appendChild(btnFloat);
   }