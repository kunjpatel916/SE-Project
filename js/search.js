/* Search box for donor directory — combines with filters.js via applyDonorFilters() */
let donorSearchTerm = "";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("donor-search");
  if(!searchInput) return;
  searchInput.addEventListener("input", () => {
    donorSearchTerm = searchInput.value.trim().toLowerCase();
    applyDonorFilters();
  });
});
