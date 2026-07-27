/* Filters + render + pagination for donors.html */
let donorPage = 1;
const DONORS_PER_PAGE = 6;

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("donor-grid");
  if(!grid || typeof DONORS === "undefined") return;

  populateFilterOptions();

  document.getElementById("filter-bloodgroup")?.addEventListener("change", () => { donorPage = 1; applyDonorFilters(); });
  document.getElementById("filter-city")?.addEventListener("change", () => { donorPage = 1; applyDonorFilters(); });
  document.getElementById("filter-availability")?.addEventListener("change", () => { donorPage = 1; applyDonorFilters(); });

  applyDonorFilters();
});

function populateFilterOptions(){
  const bgSelect = document.getElementById("filter-bloodgroup");
  const citySelect = document.getElementById("filter-city");
  if(bgSelect){
    const groups = [...new Set(DONORS.map(d => d.bloodGroup))].sort();
    bgSelect.innerHTML = `<option value="">All Blood Groups</option>` + groups.map(g => `<option value="${g}">${g}</option>`).join("");
  }
  if(citySelect){
    const cities = [...new Set(DONORS.map(d => d.city))].sort();
    citySelect.innerHTML = `<option value="">All Cities</option>` + cities.map(c => `<option value="${c}">${c}</option>`).join("");
  }
}

function applyDonorFilters(){
  const bg = document.getElementById("filter-bloodgroup")?.value || "";
  const city = document.getElementById("filter-city")?.value || "";
  const avail = document.getElementById("filter-availability")?.value || "";
  const term = typeof donorSearchTerm !== "undefined" ? donorSearchTerm : "";

  let results = DONORS.filter(d => {
    if(bg && d.bloodGroup !== bg) return false;
    if(city && d.city !== city) return false;
    if(avail === "available" && !d.available) return false;
    if(avail === "unavailable" && d.available) return false;
    if(term && !(d.name.toLowerCase().includes(term) || d.city.toLowerCase().includes(term))) return false;
    return true;
  });

  renderDonorResults(results);
}

function renderDonorResults(results){
  const grid = document.getElementById("donor-grid");
  const countLabel = document.getElementById("donor-count");
  const pager = document.getElementById("donor-pagination");
  if(!grid) return;

  if(countLabel) countLabel.textContent = `${results.length} donor${results.length !== 1 ? "s" : ""} found`;

  const totalPages = Math.max(1, Math.ceil(results.length / DONORS_PER_PAGE));
  if(donorPage > totalPages) donorPage = totalPages;
  const start = (donorPage - 1) * DONORS_PER_PAGE;
  const pageItems = results.slice(start, start + DONORS_PER_PAGE);

  if(!pageItems.length){
    grid.innerHTML = `<p class="muted center" style="grid-column:1/-1;padding:40px 0;">No donors match your filters. Try widening your search.</p>`;
  } else {
    grid.innerHTML = pageItems.map(d => `
      <div class="card donor-card">
        <div class="donor-top">
          <img class="donor-photo" src="${d.photo}" alt="${d.name}" loading="lazy">
          <div>
            <strong>${d.name}</strong>
            <div class="donor-meta">${d.city} · ${d.age} yrs</div>
          </div>
          <div class="donor-bg" style="margin-left:auto">${d.bloodGroup}</div>
        </div>
        <div class="flex-between" style="margin-bottom:14px;">
          <span class="badge badge-dot ${d.available ? 'badge-available' : 'badge-unavailable'}">${d.available ? "Available" : "Unavailable"}</span>
          <span class="muted" style="font-size:.78rem">${d.donations} donations</span>
        </div>
        <button class="btn btn-primary btn-sm btn-block" onclick="showToast('Contact request sent to ${d.name.replace(/'/g, "\\'")}.')">Contact Donor</button>
      </div>
    `).join("");
  }

  if(pager){
    let html = "";
    for(let i = 1; i <= totalPages; i++){
      html += `<button class="${i === donorPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    pager.innerHTML = html;
    pager.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        donorPage = parseInt(btn.dataset.page, 10);
        applyDonorFilters();
        document.getElementById("donor-grid").scrollIntoView({behavior:"smooth", block:"start"});
      });
    });
  }
}
