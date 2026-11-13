/* ============================================================
   JS INSULFILM - SOLICITAÇÃO RÁPIDA POR TIPO DE PELÍCULA
   ============================================================ */

   document.addEventListener("DOMContentLoaded", () => {
    const filmCards = document.querySelectorAll(".film-card");

    filmCards.forEach((card) => {
        card.style.cursor = "pointer";
        card.title = "Clique para solicitar orçamento desta película no WhatsApp";

        card.addEventListener("click", () => {
            const titulo = card.querySelector("h3")?.textContent.trim() || "Insulfilm";
            const tag = card.querySelector(".film-tag")?.textContent.trim() || "";
            const msg = `Olá! Tenho interesse na *${titulo}* (${tag}) e gostaria de um orçamento.`;

            window.open(`https://wa.me/5521970662286?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
        });
    });
});