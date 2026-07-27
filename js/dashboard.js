/* Renders dashboard.html and history.html from dummy data */
document.addEventListener("DOMContentLoaded", () => {
  if(typeof DASHBOARD_STATS === "undefined") return;
  const d = DASHBOARD_STATS;

  setText("stat-bloodgroup", d.bloodGroup);
  setText("stat-status", d.donationStatus);
  setText("stat-organ", d.registeredOrgan);
  setText("stat-total", d.totalDonations);
  setText("stat-lives", d.livesImpacted);
  setText("stat-eligible", d.nextEligible);

  const reqWrap = document.getElementById("dash-requests");
  if(reqWrap){
    reqWrap.innerHTML = d.upcomingRequests.map(r => `
      <div class="activity-row">
        <span class="activity-dot"></span>
        <div>
          <strong>${r.patient}</strong> needs <strong>${r.bloodGroup}</strong> blood
          <div class="muted" style="font-size:.8rem">${r.hospital}</div>
        </div>
        <span class="badge badge-${r.urgency === 'Urgent' ? 'urgent' : 'neutral'}" style="margin-left:auto">${r.urgency}</span>
      </div>
    `).join("");
  }

  const notifWrap = document.getElementById("dash-notifications");
  if(notifWrap){
    notifWrap.innerHTML = d.notifications.map(n => `
      <div class="notif-item">
        <span class="activity-dot"></span>
        <div><div>${n.text}</div><div class="muted" style="font-size:.78rem">${n.time}</div></div>
      </div>
    `).join("");
  }

  const activityWrap = document.getElementById("dash-activity");
  if(activityWrap){
    activityWrap.innerHTML = d.recentActivity.map(a => `
      <div class="activity-row">
        <span class="activity-dot"></span>
        <div><div>${a.text}</div><div class="muted" style="font-size:.78rem">${a.time}</div></div>
      </div>
    `).join("");
  }

  // Quick action cards navigate via sendable buttons
  document.querySelectorAll("[data-goto]").forEach(el => {
    el.addEventListener("click", () => window.location.href = el.dataset.goto);
  });
});

/* Donation history page with client-side pagination */
document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("history-list");
  if(!wrap || typeof DONATION_HISTORY === "undefined") return;

  const perPage = 4;
  let page = 1;
  const totalPages = Math.ceil(DONATION_HISTORY.length / perPage);

  function render(){
    const start = (page - 1) * perPage;
    const items = DONATION_HISTORY.slice(start, start + perPage);
    wrap.innerHTML = items.map(h => `
      <div class="timeline-item">
        <div class="flex-between">
          <strong>${h.type}</strong>
          <span class="badge ${h.status === 'Completed' ? 'badge-available' : 'badge-unavailable'}">${h.status}</span>
        </div>
        <div class="muted">${h.hospital}</div>
        <div class="muted" style="font-size:.8rem">${h.date}</div>
      </div>
    `).join("");

    const pager = document.getElementById("history-pagination");
    if(pager){
      let html = "";
      for(let i = 1; i <= totalPages; i++){
        html += `<button class="${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      pager.innerHTML = html;
      pager.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => { page = parseInt(btn.dataset.page, 10); render(); });
      });
    }
  }
  render();
});

function setText(id, val){
  const el = document.getElementById(id);
  if(el) el.textContent = val;
}
