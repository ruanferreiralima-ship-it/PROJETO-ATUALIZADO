/* ============================================================
   JS INDEX - INTERAÇÕES DA PÁGINA PRINCIPAL
   ============================================================ */

   document.addEventListener("DOMContentLoaded", () => {
    const heroBtnWhatsApp = document.querySelector(".hero-actions .btn-gold");

    if (heroBtnWhatsApp) {
        heroBtnWhatsApp.href = "https://wa.me/5521970662286?text=" + 
            encodeURIComponent("Olá! Gostaria de fazer um orçamento de Insulfilm sem sair de casa.");
        heroBtnWhatsApp.target = "_blank";
        heroBtnWhatsApp.rel = "noopener noreferrer";
    }
});