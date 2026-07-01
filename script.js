/* ============================================================
   CommutAI — System Administrator Dashboard
   All data is simulated in-memory. No backend/API/database.
   ============================================================ */

/* ---------- Fake data store ---------- */
const DB = {
  users: [
    { id:"USR-1001", name:"Juan Dela Cruz", email:"juan.delacruz@gmail.com", role:"Passenger", status:"Active" },
    { id:"USR-1002", name:"Maria Santos", email:"maria.santos@gmail.com", role:"Passenger", status:"Active" },
    { id:"USR-1003", name:"Pedro Reyes", email:"pedro.reyes@gmail.com", role:"Staff", status:"Active" },
    { id:"USR-1004", name:"Ana Bautista", email:"ana.bautista@gmail.com", role:"Passenger", status:"Suspended" },
    { id:"USR-1005", name:"Carlos Torres", email:"carlos.torres@gmail.com", role:"Passenger", status:"Active" },
    { id:"USR-1006", name:"Liza Flores", email:"liza.flores@gmail.com", role:"Staff", status:"Active" },
  ],
  drivers: [
    { id:"DRV-201", name:"Ricardo Ramos", license:"N01-23-456789", vehicle:"Bus 014", phone:"0917 234 5678", status:"On Duty" },
    { id:"DRV-202", name:"Efren Salvador", license:"N02-45-778901", vehicle:"Bus 003", phone:"0918 445 1122", status:"On Duty" },
    { id:"DRV-203", name:"Danilo Lorenzo", license:"N03-67-990123", vehicle:"Bus 007", phone:"0919 556 3344", status:"Off Duty" },
    { id:"DRV-204", name:"Ferdie Neri", license:"N04-89-112233", vehicle:"Bus 019", phone:"0920 667 5566", status:"Off Duty" },
  ],
  conductors: [
    { id:"CDR-301", name:"Marites Uy", employeeId:"CDR-00214", vehicle:"Bus 014", phone:"0917 998 1122", status:"On Duty" },
    { id:"CDR-302", name:"Rowena Cabrera", employeeId:"CDR-00187", vehicle:"Bus 007", phone:"0918 774 4455", status:"On Duty" },
    { id:"CDR-303", name:"Allan Dagohoy", employeeId:"CDR-00292", vehicle:"Bus 022", phone:"0919 665 3322", status:"Off Duty" },
  ],
  vehicles: [
    { id:"VHC-401", vehicleNo:"Bus 003", plate:"KRT-1187", driver:"E. Salvador", capacity:45, status:"Active" },
    { id:"VHC-402", vehicleNo:"Bus 007", plate:"KRT-1542", driver:"D. Lorenzo", capacity:45, status:"Active" },
    { id:"VHC-403", vehicleNo:"Bus 014", plate:"KRT-2291", driver:"R. Ramos", capacity:45, status:"Active" },
    { id:"VHC-404", vehicleNo:"Bus 019", plate:"KRT-2830", driver:"F. Neri", capacity:45, status:"Maintenance" },
    { id:"VHC-405", vehicleNo:"Bus 022", plate:"KRT-3011", driver:"J. Amora", capacity:45, status:"Active" },
    { id:"VHC-406", vehicleNo:"Bus 009", plate:"KRT-4120", driver:"L. Enerio", capacity:45, status:"Idle" },
  ],
  routes: [
    { id:"RTE-501", origin:"Manolo Fortich", destination:"Cagayan de Oro", stops:"Alae, Sumilao, Libona", distance:"28.4 km", duration:"55 min" },
    { id:"RTE-502", origin:"Manolo Fortich", destination:"Malaybalay", stops:"Impasugong Jct., San Miguel", distance:"32.1 km", duration:"62 min" },
    { id:"RTE-503", origin:"Manolo Fortich", destination:"Impasugong", stops:"Kalugmanan, Bantuanon", distance:"14.7 km", duration:"28 min" },
    { id:"RTE-504", origin:"Manolo Fortich", destination:"Dalirig", stops:"Poblacion, Sankanan", distance:"6.9 km", duration:"15 min" },
  ],
  terminals: [
    { id:"TRM-601", name:"Manolo Fortich Central Terminal", location:"Poblacion, Manolo Fortich", capacity:450, status:"Operational" },
    { id:"TRM-602", name:"Agora Terminal", location:"Cagayan de Oro City", capacity:900, status:"Operational" },
    { id:"TRM-603", name:"Dalirig Terminal", location:"Dalirig, Manolo Fortich", capacity:120, status:"Operational" },
    { id:"TRM-604", name:"Alae Junction", location:"Alae, Manolo Fortich", capacity:80, status:"Maintenance" },
  ],
};

let counters = { users:1007, drivers:205, conductors:304, vehicles:407, routes:505, terminals:605 };

/* ---------- Entity configuration (drives generic CRUD UI) ---------- */
const ENTITY_CONFIG = {
  users: {
    label: "User",
    idPrefix: "USR",
    avatar: e => initials(e.name),
    title: e => e.name,
    subtitle: e => e.email,
    statusKey: "status",
    fields: [ {key:"role", label:"Role"}, {key:"email", label:"Email"} ],
    form: [
      {key:"name", label:"Full name", type:"text"},
      {key:"email", label:"Email", type:"text"},
      {key:"role", label:"Role", type:"select", options:["Passenger","Staff"]},
      {key:"status", label:"Status", type:"select", options:["Active","Suspended"]},
    ],
  },
  drivers: {
    label: "Driver",
    idPrefix: "DRV",
    avatar: e => initials(e.name),
    title: e => e.name,
    subtitle: e => e.license,
    statusKey: "status",
    fields: [ {key:"vehicle", label:"Assigned vehicle"}, {key:"phone", label:"Phone"} ],
    form: [
      {key:"name", label:"Full name", type:"text"},
      {key:"license", label:"License number", type:"text"},
      {key:"vehicle", label:"Assigned vehicle", type:"text"},
      {key:"phone", label:"Phone number", type:"text"},
      {key:"status", label:"Status", type:"select", options:["On Duty","Off Duty"]},
    ],
  },
  conductors: {
    label: "Conductor",
    idPrefix: "CDR",
    avatar: e => initials(e.name),
    title: e => e.name,
    subtitle: e => e.employeeId,
    statusKey: "status",
    fields: [ {key:"vehicle", label:"Assigned vehicle"}, {key:"phone", label:"Phone"} ],
    form: [
      {key:"name", label:"Full name", type:"text"},
      {key:"employeeId", label:"Employee ID", type:"text"},
      {key:"vehicle", label:"Assigned vehicle", type:"text"},
      {key:"phone", label:"Phone number", type:"text"},
      {key:"status", label:"Status", type:"select", options:["On Duty","Off Duty"]},
    ],
  },
  vehicles: {
    label: "Vehicle",
    idPrefix: "VHC",
    avatar: e => "\uf207",
    iconMode: true,
    title: e => e.vehicleNo,
    subtitle: e => e.plate,
    statusKey: "status",
    fields: [ {key:"driver", label:"Driver"}, {key:"capacity", label:"Capacity"} ],
    form: [
      {key:"vehicleNo", label:"Vehicle number", type:"text"},
      {key:"plate", label:"Plate number", type:"text"},
      {key:"driver", label:"Driver", type:"text"},
      {key:"capacity", label:"Capacity", type:"text"},
      {key:"status", label:"Status", type:"select", options:["Active","Maintenance","Idle"]},
    ],
  },
  routes: {
    label: "Route",
    idPrefix: "RTE",
    avatar: e => "\uf4d7",
    iconMode: true,
    title: e => `${e.origin} → ${e.destination}`,
    subtitle: e => e.stops,
    statusKey: null,
    fields: [ {key:"distance", label:"Distance"}, {key:"duration", label:"Est. time"} ],
    form: [
      {key:"origin", label:"Origin", type:"text"},
      {key:"destination", label:"Destination", type:"text"},
      {key:"stops", label:"Stops (comma-separated)", type:"text"},
      {key:"distance", label:"Distance", type:"text"},
      {key:"duration", label:"Estimated time", type:"text"},
    ],
  },
  terminals: {
    label: "Terminal",
    idPrefix: "TRM",
    avatar: e => "\uf1ad",
    iconMode: true,
    title: e => e.name,
    subtitle: e => e.location,
    statusKey: "status",
    fields: [ {key:"capacity", label:"Passenger capacity"} ],
    form: [
      {key:"name", label:"Terminal name", type:"text"},
      {key:"location", label:"Location", type:"text"},
      {key:"capacity", label:"Passenger capacity", type:"text"},
      {key:"status", label:"Status", type:"select", options:["Operational","Maintenance"]},
    ],
  },
};

function initials(name){ return name.split(" ").map(n=>n[0]).slice(0,2).join("").toUpperCase(); }

/* ---------- Navigation ---------- */
function goToView(name){
  document.querySelectorAll(".side-link[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  document.querySelectorAll(".view[data-view]").forEach(v => v.classList.toggle("active", v.dataset.view === name));
}
document.querySelectorAll(".side-link[data-view]").forEach(el=>{
  el.addEventListener("click", ()=> goToView(el.dataset.view));
});

/* ---------- Toast ---------- */
function showToast(msg){
  const toast = document.getElementById("toast");
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> toast.classList.remove("show"), 2400);
}

/* ---------- Sidebar toggle ---------- */
const sidebar = document.getElementById("sidebar");
document.getElementById("sidebar-toggle").addEventListener("click", ()=>{
  if(window.innerWidth <= 860) sidebar.classList.toggle("mobile-open");
  else sidebar.classList.toggle("collapsed");
});

/* ---------- Dark mode ---------- */
function setTheme(dark){
  document.body.dataset.theme = dark ? "dark" : "light";
  document.getElementById("dark-toggle").checked = dark;
}
document.getElementById("dark-toggle").addEventListener("change", (e)=> setTheme(e.target.checked));
document.getElementById("dark-toggle-btn").addEventListener("click", ()=>{
  setTheme(document.body.dataset.theme !== "dark");
});

/* ---------- Live clock ---------- */
function tickClock(){
  const str = new Date().toLocaleTimeString("en-PH", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true });
  document.getElementById("live-clock").textContent = str;
}

/* ---------- KPI + dashboard render ---------- */
let kpi = { users:18204, passengers:16940, drivers:86, vehicles:64, trips:512, revenue:612480 };
function renderKPIs(){
  document.getElementById("kpi-users").textContent = kpi.users.toLocaleString();
  document.getElementById("kpi-passengers").textContent = kpi.passengers.toLocaleString();
  document.getElementById("kpi-drivers").textContent = kpi.drivers;
  document.getElementById("kpi-vehicles").textContent = kpi.vehicles;
  document.getElementById("kpi-trips").textContent = kpi.trips;
  document.getElementById("kpi-revenue").textContent = "₱" + kpi.revenue.toLocaleString();
}
function tickKPIs(){
  kpi.users += Math.floor(Math.random()*3);
  kpi.passengers += Math.floor(Math.random()*8);
  kpi.revenue += Math.floor(Math.random()*8)*60;
  if(Math.random() > 0.8) kpi.trips += 1;
  renderKPIs();
}

const notifications = [
  { type:"info", icon:"fa-user-plus", title:"New user registered", text:"Ana Bautista created a passenger account.", time:"3 min ago" },
  { type:"warn", icon:"fa-triangle-exclamation", title:"Vehicle flagged", text:"Bus 019 flagged for scheduled maintenance.", time:"14 min ago" },
  { type:"danger", icon:"fa-ban", title:"Account suspended", text:"An account was suspended for policy violation.", time:"27 min ago" },
  { type:"info", icon:"fa-route", title:"Route updated", text:"MF ⇄ Dalirig route stops were revised.", time:"1 hr ago" },
];
function renderNotifications(){
  document.getElementById("notif-list").innerHTML = notifications.map(n => `
    <div class="notif-card">
      <div class="notif-icon notif-icon--${n.type}"><i class="fa-solid ${n.icon}"></i></div>
      <div class="notif-body"><strong>${n.title}</strong><span>${n.text}</span></div>
    </div>
  `).join("");
}

const logLevels = ["info","info","info","warn","error"];
const logMessages = [
  "Auth service processed 14 login requests",
  "GPS sync completed for 64 vehicles",
  "Passenger check-in event received (Bus 014)",
  "High memory usage on tracking worker #2",
  "Failed to reach terminal display CAM-07",
  "Scheduled report generation completed",
  "New route configuration deployed",
];
let logEntries = [];
function pushLog(){
  const level = logLevels[Math.floor(Math.random()*logLevels.length)];
  const msg = logMessages[Math.floor(Math.random()*logMessages.length)];
  const time = new Date().toLocaleTimeString("en-PH", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false });
  logEntries.unshift({ level, msg, time });
  if(logEntries.length > 12) logEntries.pop();
  renderLogs();
}
function renderLogs(){
  const wrap = document.getElementById("log-list");
  if(wrap){
    wrap.innerHTML = logEntries.map(l => `
      <div class="log-item"><span class="log-time">${l.time}</span><span class="log-level log-level--${l.level}">${l.level.toUpperCase()}</span><span>${l.msg}</span></div>
    `).join("");
  }
}

const activity = [
  { type:"", text:"System admin approved 2 new driver applications", time:"Just now" },
  { type:"warn", text:"Bus 019 taken offline for maintenance", time:"14 min ago" },
  { type:"", text:"Weekly report auto-generated and archived", time:"1 hr ago" },
  { type:"danger", text:"Failed login attempt blocked (5x)", time:"2 hr ago" },
  { type:"", text:"New route MF ⇄ Dalirig added to network", time:"Yesterday" },
];
function renderActivity(){
  document.getElementById("activity-list").innerHTML = activity.map(a => `
    <div class="activity-item ${a.type}">
      <div class="activity-dot"></div>
      <div class="activity-text"><strong>${a.text}</strong><span>${a.time}</span></div>
    </div>
  `).join("");
}

/* ---------- Generic entity grid rendering ---------- */
let searchState = {};
let filterState = { users: "all" };

function renderGrid(type){
  const cfg = ENTITY_CONFIG[type];
  const wrap = document.getElementById("grid-" + type);
  if(!wrap) return;
  let list = DB[type];

  const query = (searchState[type] || "").toLowerCase();
  if(query){
    list = list.filter(e => JSON.stringify(e).toLowerCase().includes(query));
  }
  if(type === "users" && filterState.users !== "all"){
    list = list.filter(e => e.status === filterState.users);
  }

  wrap.innerHTML = list.map(e => `
    <div class="entity-card">
      <div class="entity-card-top">
        <div class="entity-avatar">${cfg.iconMode ? `<i class="fa-solid ${type==='vehicles'?'fa-bus':type==='routes'?'fa-route':'fa-building-shield'}"></i>` : cfg.avatar(e)}</div>
        <div class="entity-title"><strong>${cfg.title(e)}</strong><span>${cfg.subtitle(e)}</span></div>
        ${cfg.statusKey ? `<span class="entity-status entity-status--${(e[cfg.statusKey]||'').toLowerCase().replace(' ','')}">${e[cfg.statusKey]}</span>` : ""}
      </div>
      <div class="entity-fields">
        ${cfg.fields.map(f => `<div class="entity-field"><span>${f.label}</span><strong>${e[f.key] ?? "—"}</strong></div>`).join("")}
      </div>
      <div class="entity-actions">
        <button class="btn-edit" data-edit="${type}:${e.id}"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="btn-delete" data-delete="${type}:${e.id}"><i class="fa-solid fa-trash"></i> Delete</button>
      </div>
    </div>
  `).join("") || `<p style="color:var(--text-muted); font-size:13px;">No records found.</p>`;
}

function renderAllGrids(){
  Object.keys(ENTITY_CONFIG).forEach(renderGrid);
}

/* Search bindings */
document.querySelectorAll(".entity-search").forEach(input=>{
  input.addEventListener("input", (e)=>{
    const type = input.dataset.entity;
    searchState[type] = e.target.value;
    renderGrid(type);
  });
});

/* Users status filter */
document.querySelectorAll("#users-filters .filter-chip").forEach(chip=>{
  chip.addEventListener("click", ()=>{
    document.querySelectorAll("#users-filters .filter-chip").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    filterState.users = chip.dataset.filter;
    renderGrid("users");
  });
});

/* ---------- Add / Edit modal ---------- */
const entityModal = document.getElementById("entity-modal");
const modalFields = document.getElementById("modal-fields");
const modalTitle = document.getElementById("modal-title");
const entityForm = document.getElementById("entity-form");
let modalState = { type: null, editingId: null };

function openModal(type, editingId){
  const cfg = ENTITY_CONFIG[type];
  modalState = { type, editingId };
  modalTitle.textContent = (editingId ? "Edit " : "Add ") + cfg.label;

  const record = editingId ? DB[type].find(e => e.id === editingId) : {};
  modalFields.innerHTML = cfg.form.map(f => {
    if(f.type === "select"){
      return `
        <label class="modal-field"><span>${f.label}</span>
          <select name="${f.key}">
            ${f.options.map(o => `<option ${record[f.key]===o?"selected":""}>${o}</option>`).join("")}
          </select>
        </label>`;
    }
    return `
      <label class="modal-field"><span>${f.label}</span>
        <input type="text" name="${f.key}" value="${record[f.key] ?? ""}" placeholder="Enter ${f.label.toLowerCase()}">
      </label>`;
  }).join("");

  entityModal.classList.add("show");
}
function closeModal(){ entityModal.classList.remove("show"); }

document.querySelectorAll("[data-add]").forEach(btn=>{
  btn.addEventListener("click", ()=> openModal(btn.dataset.add, null));
});
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-cancel").addEventListener("click", closeModal);

document.addEventListener("click", (e)=>{
  const editBtn = e.target.closest("[data-edit]");
  if(editBtn){
    const [type, id] = editBtn.dataset.edit.split(":");
    openModal(type, id);
  }
});

entityForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const { type, editingId } = modalState;
  const cfg = ENTITY_CONFIG[type];
  const formData = new FormData(entityForm);
  const record = {};
  cfg.form.forEach(f => record[f.key] = formData.get(f.key));

  if(editingId){
    const idx = DB[type].findIndex(e => e.id === editingId);
    DB[type][idx] = { ...DB[type][idx], ...record };
    showToast(cfg.label + " updated");
  } else {
    counters[type] += 1;
    record.id = `${cfg.idPrefix}-${counters[type]}`;
    DB[type].push(record);
    showToast(cfg.label + " added");
  }
  renderGrid(type);
  closeModal();
});

/* ---------- Delete modal ---------- */
const deleteModal = document.getElementById("delete-modal");
let deleteTarget = null;

document.addEventListener("click", (e)=>{
  const delBtn = e.target.closest("[data-delete]");
  if(delBtn){
    const [type, id] = delBtn.dataset.delete.split(":");
    deleteTarget = { type, id };
    const cfg = ENTITY_CONFIG[type];
    const record = DB[type].find(x => x.id === id);
    document.getElementById("delete-copy").textContent = `This will remove ${cfg.title(record)} from the system. This action cannot be undone.`;
    deleteModal.classList.add("show");
  }
});
document.getElementById("delete-cancel").addEventListener("click", ()=> deleteModal.classList.remove("show"));
document.getElementById("delete-confirm").addEventListener("click", ()=>{
  if(deleteTarget){
    const { type, id } = deleteTarget;
    DB[type] = DB[type].filter(e => e.id !== id);
    renderGrid(type);
    showToast(ENTITY_CONFIG[type].label + " removed");
  }
  deleteModal.classList.remove("show");
});

/* ---------- Reports ---------- */
const reportData = {
  daily:   { title:"Daily Report — July 1, 2026", trips:512, passengers:16940, vehicles:64, revenue:"₱612,480" },
  weekly:  { title:"Weekly Report — Jun 25–Jul 1, 2026", trips:3540, passengers:116200, vehicles:64, revenue:"₱4,236,900" },
  monthly: { title:"Monthly Report — June 2026", trips:15080, passengers:497600, vehicles:64, revenue:"₱18,102,300" },
};
function renderReport(kind){
  const r = reportData[kind];
  document.getElementById("report-title").textContent = r.title;
  document.getElementById("report-trips").textContent = r.trips.toLocaleString();
  document.getElementById("report-passengers").textContent = r.passengers.toLocaleString();
  document.getElementById("report-vehicles").textContent = r.vehicles;
  document.getElementById("report-revenue").textContent = r.revenue;
}
document.querySelectorAll("[data-rfilter]").forEach(chip=>{
  chip.addEventListener("click", ()=>{
    document.querySelectorAll("[data-rfilter]").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    renderReport(chip.dataset.rfilter);
  });
});
document.getElementById("btn-pdf").addEventListener("click", ()=> showToast("PDF export generated (simulated)"));
document.getElementById("btn-excel").addEventListener("click", ()=> showToast("Excel export generated (simulated)"));
document.getElementById("btn-print").addEventListener("click", ()=> showToast("Sending to printer (simulated)"));

/* ---------- Charts ---------- */
let chartPassengers, chartTrips, chartVehicles, chartOccupancy;
function initCharts(){
  Chart.defaults.font.family = "Manrope, sans-serif";
  Chart.defaults.color = "#6B7A75";
  const green = "#2E7D32", yellow = "#F9A825", orange = "#FB8C00", danger="#D32F2F", muted="#E4EEE4";

  chartPassengers = new Chart(document.getElementById("chart-passengers"), {
    type: "line",
    data: { labels: ["Wed","Thu","Fri","Sat","Sun","Mon","Tue"],
      datasets: [{ data:[14200,15100,16800,18400,17600,15900,16940], borderColor: green, backgroundColor:"rgba(46,125,50,0.12)", fill:true, tension:0.4, pointRadius:3 }] },
    options: { responsive:true, plugins:{legend:{display:false}}, scales:{ y:{grid:{color:"rgba(0,0,0,0.05)"}}, x:{grid:{display:false}} } }
  });

  chartTrips = new Chart(document.getElementById("chart-trips"), {
    type: "bar",
    data: { labels: ["Wed","Thu","Fri","Sat","Sun","Mon","Tue"],
      datasets: [{ data:[440,470,505,560,530,486,512], backgroundColor: yellow, borderRadius:6 }] },
    options: { responsive:true, plugins:{legend:{display:false}}, scales:{ y:{grid:{color:"rgba(0,0,0,0.05)"}}, x:{grid:{display:false}} } }
  });

  chartVehicles = new Chart(document.getElementById("chart-vehicles"), {
    type: "doughnut",
    data: { labels:["Active","Maintenance","Idle"], datasets:[{ data:[52,6,6], backgroundColor:[green, danger, muted], borderWidth:0 }] },
    options: { responsive:true, plugins:{legend:{position:"bottom"}}, cutout:"65%" }
  });

  chartOccupancy = new Chart(document.getElementById("chart-occupancy"), {
    type: "bar",
    data: { labels:["6AM","9AM","12PM","3PM","6PM","9PM"],
      datasets:[{ data:[38,64,71,80,88,52], backgroundColor: orange, borderRadius:6 }] },
    options: { responsive:true, plugins:{legend:{display:false}}, scales:{ y:{grid:{color:"rgba(0,0,0,0.05)"}, max:100}, x:{grid:{display:false}} } }
  });
}
function tickCharts(){
  chartPassengers.data.datasets[0].data[6] = kpi.passengers;
  chartPassengers.update();
  chartTrips.data.datasets[0].data[6] = kpi.trips;
  chartTrips.update();
}

/* ---------- AI Monitoring simulation ---------- */
const aiCanvas = document.getElementById("ai-canvas");
const aiCtx = aiCanvas ? aiCanvas.getContext("2d") : null;
let aiBoxes = [];

function makeBoxes(count){
  const boxes = [];
  for(let i=0;i<count;i++){
    const w = 40 + Math.random()*30;
    const h = 70 + Math.random()*40;
    boxes.push({
      x: Math.random() * (aiCanvas.width - w),
      y: Math.random() * (aiCanvas.height - h) * 0.7 + aiCanvas.height*0.15,
      w, h,
      conf: (0.72 + Math.random()*0.27),
    });
  }
  return boxes;
}

function drawAIFeed(){
  if(!aiCtx) return;
  // background gradient "camera feed"
  const grad = aiCtx.createLinearGradient(0,0,0,aiCanvas.height);
  grad.addColorStop(0, "#16241A");
  grad.addColorStop(1, "#0A140C");
  aiCtx.fillStyle = grad;
  aiCtx.fillRect(0,0,aiCanvas.width, aiCanvas.height);

  // faint grid to suggest a floor / vanishing perspective
  aiCtx.strokeStyle = "rgba(165,214,167,0.08)";
  aiCtx.lineWidth = 1;
  for(let x=0; x<=aiCanvas.width; x+=40){
    aiCtx.beginPath(); aiCtx.moveTo(x,0); aiCtx.lineTo(x,aiCanvas.height); aiCtx.stroke();
  }
  for(let y=0; y<=aiCanvas.height; y+=40){
    aiCtx.beginPath(); aiCtx.moveTo(0,y); aiCtx.lineTo(aiCanvas.width,y); aiCtx.stroke();
  }

  // draw bounding boxes
  aiBoxes.forEach((b,i)=>{
    aiCtx.strokeStyle = "#F9A825";
    aiCtx.lineWidth = 2;
    aiCtx.strokeRect(b.x, b.y, b.w, b.h);
    aiCtx.fillStyle = "rgba(249,168,37,0.85)";
    const label = `person ${Math.round(b.conf*100)}%`;
    aiCtx.font = "11px monospace";
    const tw = aiCtx.measureText(label).width + 8;
    aiCtx.fillRect(b.x, b.y - 16, tw, 16);
    aiCtx.fillStyle = "#0A140C";
    aiCtx.fillText(label, b.x + 4, b.y - 4);
  });

  document.getElementById("ai-detect-count").textContent = `${aiBoxes.length} objects detected`;
}

let aiCount = 0, aiAccuracy = 0, aiConfidence = 0, aiFramerate = 0, aiOccupancy = 0;
function animateCounter(el, target, suffix){
  const current = parseFloat(el.textContent) || 0;
  const next = current + (target - current) * 0.25;
  el.textContent = (Math.abs(target-next) < 0.3 ? target : Math.round(next)) + suffix;
}

function tickAI(){
  const targetCount = 8 + Math.floor(Math.random()*14);
  const targetAccuracy = 91 + Math.random()*7;
  const targetConfidence = 85 + Math.random()*13;
  const targetFramerate = 20 + Math.floor(Math.random()*10);
  const targetOccupancy = Math.min(100, Math.round((targetCount/24)*100));

  aiBoxes = makeBoxes(targetCount);
  drawAIFeed();

  animateCounter(document.getElementById("ai-count"), targetCount, "");
  animateCounter(document.getElementById("ai-accuracy"), Math.round(targetAccuracy), "%");
  animateCounter(document.getElementById("ai-confidence"), Math.round(targetConfidence), "%");
  animateCounter(document.getElementById("ai-framerate"), targetFramerate, " fps");
  animateCounter(document.getElementById("ai-occupancy"), targetOccupancy, "%");
  document.getElementById("ai-fps-tag").textContent = targetFramerate + " FPS";

  const crowdEl = document.getElementById("ai-crowding");
  let level = "Low", cls = "low";
  if(targetOccupancy >= 75){ level = "High"; cls = "high"; }
  else if(targetOccupancy >= 45){ level = "Moderate"; cls = ""; }
  crowdEl.textContent = level;
  crowdEl.className = "ai-metric-value ai-metric-value--tag " + cls;

  // occasionally push a detection log line
  if(Math.random() > 0.5){
    aiLogEntries.unshift({
      time: new Date().toLocaleTimeString("en-PH", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false }),
      level: "info",
      msg: `Detected ${targetCount} passengers · confidence ${Math.round(targetConfidence)}%`,
    });
    if(aiLogEntries.length > 10) aiLogEntries.pop();
    renderAILogs();
  }
}

let aiLogEntries = [];
function renderAILogs(){
  const wrap = document.getElementById("ai-log-list");
  if(!wrap) return;
  wrap.innerHTML = aiLogEntries.map(l => `
    <div class="log-item"><span class="log-time">${l.time}</span><span class="log-level log-level--${l.level}">${l.level.toUpperCase()}</span><span>${l.msg}</span></div>
  `).join("");
}

/* ---------- Init ---------- */
function init(){
  renderKPIs();
  renderNotifications();
  renderActivity();
  for(let i=0;i<5;i++) pushLog();
  renderAllGrids();
  renderReport("daily");
  initCharts();
  tickClock();

  setInterval(tickClock, 1000);
  setInterval(tickKPIs, 5000);
  setInterval(pushLog, 4500);
  setInterval(tickCharts, 6000);
  setInterval(tickAI, 2200);
  tickAI();
}
init();
