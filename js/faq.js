/* Renders FAQ accordion items from dummy-data.js */
document.addEventListener("DOMContentLoaded", () => {
  renderFaqList("faq-preview", (typeof FAQS !== "undefined" ? FAQS.slice(0, 6) : []));
  renderFaqList("faq-full", (typeof FAQS !== "undefined" ? FAQS : []));

  // Myths vs Facts (awareness page)
  const mythWrap = document.getElementById("myth-fact-list");
  if(mythWrap && typeof MYTHS_FACTS !== "undefined"){
    mythWrap.innerHTML = MYTHS_FACTS.map(m => `
      <div class="myth-row">
        <div class="myth-cell myth"><strong>Myth:</strong> ${m.myth}</div>
        <div class="myth-cell fact"><strong>Fact:</strong> ${m.fact}</div>
      </div>
    `).join("");
  }

  initFaqAccordions();
});

function renderFaqList(containerId, items){
  const wrap = document.getElementById(containerId);
  if(!wrap || !items.length) return;
  wrap.innerHTML = items.map((f, i) => `
    <div class="accordion-item">
      <div class="accordion-head"><span>${f.q}</span><span class="plus">+</span></div>
      <div class="accordion-body"><p>${f.a}</p></div>
    </div>
  `).join("");
}
