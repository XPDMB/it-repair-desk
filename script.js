// IT Repair Desk (Unified Static Website Script with Charts)

// ----------------------------------------------------
// 1. Helper function: Generate Dynamic Base64 Placeholder Images
// ----------------------------------------------------
function generatePlaceholderImage(text, bgColor, textColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = bgColor || '#f1f5f9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Wrench Graphic
  ctx.strokeStyle = textColor || '#64748b';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  
  // Handle
  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(250, 250);
  ctx.stroke();
  
  // Head
  ctx.fillStyle = bgColor || '#f1f5f9';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(150, 150, 25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  
  // Jaw cut
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(130, 130);
  ctx.lineTo(155, 155);
  ctx.stroke();
  
  // Gear Circle Graphic
  ctx.strokeStyle = textColor || '#64748b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(200, 130, 35, 0, Math.PI * 2);
  ctx.stroke();
  
  // Inner gear center
  ctx.beginPath();
  ctx.arc(200, 130, 12, 0, Math.PI * 2);
  ctx.fillStyle = textColor || '#64748b';
  ctx.fill();
  
  // Cross marks
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(180, 110);
  ctx.lineTo(220, 150);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(220, 110);
  ctx.lineTo(180, 150);
  ctx.stroke();
  
  // Text
  ctx.fillStyle = textColor || '#475569';
  ctx.font = 'bold 20px "Prompt", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 200, 230);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '14px "Prompt", sans-serif';
  ctx.fillText('IT Repair Service', 200, 260);
  
  return canvas.toDataURL('image/png');
}

// Seed initial mock tickets matching the layout
const defaultTickets = [
  {
    id: 'IT-260520-001',
    reporter: 'สมชาย รักดี',
    dept: 'การเงิน',
    deviceType: 'PC',
    model: 'Dell Optiplex 3280 All-in-One',
    subject: 'คอมพิวเตอร์เปิดไม่ติด หน้าจอมืด',
    detail: 'พออัดปุ่มเปิดเครื่องแล้ว ไม่มีไฟสถานะขึ้นเลย หน้าจอมืดสนิท ได้ยินเสียงพัดลมดังขึ้นแป้นเดียวแล้วดับไปทันที ลองเสียบปลั๊กใหม่แล้วยังเป็นเหมือนเดิม',
    status: 'processing',
    priority: 'เร่งด่วน',
    date: new Date(2026, 4, 20, 10, 15).toISOString(),
    photo: generatePlaceholderImage('Dell PC Power Problem', '#ffe4e6', '#e11d48'),
    assignee: 'พ.อ.ท.ชนินทร์ พรมฤทธิ์',
    repairResult: '',
    afterPhoto: ''
  },
  {
    id: 'IT-260520-002',
    reporter: 'วรรณพร แก้วมณี',
    dept: 'การตลาด',
    deviceType: 'Notebook',
    model: 'Lenovo Latitude 7410',
    subject: 'แป้นพิมพ์กดยากและบางปุ่มพิมพ์ไม่ติด',
    detail: 'คีย์บอร์ดฝั่งซ้ายกดยากมาก ปุ่ม ESC, F1, F2 และตัวเลข 5, 6 กดแล้วไม่มีการตอบสนอง ลองรีบูตเครื่องหลายรอบแล้วอาการยังไม่หาย คาดว่าแป้นพิมพ์อาจจะเสีย',
    status: 'processing',
    priority: 'ปกติ',
    date: new Date(2026, 4, 20, 8, 30).toISOString(),
    photo: generatePlaceholderImage('Lenovo Keyboard Fault', '#eff6ff', '#2563eb'),
    assignee: 'จ.อ.ภูมิดล บุโรดม',
    repairResult: '',
    afterPhoto: ''
  },
  {
    id: 'IT-260520-003',
    reporter: 'เกียรติศักดิ์ มั่นคง',
    dept: 'บุคคล / HR',
    deviceType: 'Printer',
    model: 'HP LaserJet Pro M404dn',
    subject: 'กระดาษติดบ่อยขณะพิมพ์งานชุดใหญ่',
    detail: 'เวลาสั่งพิมพ์เอกสารเกิน 5 แผ่นขึ้นไป เครื่องจะดึงกระดาษซ้อนกันทีละ 2-3 แผ่น แล้วกระดาษไปติดอยู่บริเวณชุดความร้อนด้านหลังเครื่อง ต้องเปิดดึงออกตลอดเวลาทำให้ทำงานไม่ได้เลย',
    status: 'completed',
    priority: 'ปกติ',
    date: new Date(2026, 4, 19, 14, 20).toISOString(),
    photo: generatePlaceholderImage('HP Printer Jammed', '#fef3c7', '#d97706'),
    assignee: 'จ.อ.ภูมิดล บุโรดม',
    repairResult: 'เปลี่ยนชุดลูกยางดึงกระดาษ (Pickup Roller) และทำความสะอาดเซ็นเซอร์ตรวจจับกระดาษเรียบร้อย ทดสอบพิมพ์งานต่อเนื่อง 50 แผ่น ผ่านฉลุย',
    afterPhoto: generatePlaceholderImage('HP Fixed Output', '#ecfdf5', '#059669')
  }
];

// Supabase public configuration. The publishable key is safe in the browser only
// when Row Level Security policies are enabled (see supabase-security.sql).
const SUPABASE_URL = 'https://zkkhqenmkrkxhippxger.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_0d7umoa1boSzAmPjByVbZg_WWu6Qs32';

let supabaseClient = null;
let useSupabase = false;

if (SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    useSupabase = true;
    console.log("Supabase client initialized successfully.");
  } catch (e) {
    console.error("Failed to initialize Supabase client:", e);
  }
} else {
  console.log("Using local storage (Supabase credentials not configured).");
}

// Function to fetch tickets from Supabase DB
async function fetchTicketsFromSupabase() {
  if (!useSupabase || !supabaseClient || !isAdminLoggedIn) return;
  try {
    const { data, error } = await supabaseClient
      .from('tickets')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    if (data) {
      tickets = data.map(item => ({
        id: item.id,
        reporter: item.reporter,
        dept: item.dept,
        phone: item.phone || '',
        deviceType: item.device_type,
        model: item.model,
        subject: item.subject,
        detail: item.detail,
        status: item.status,
        priority: item.priority,
        date: item.date,
        photo: item.photo,
        assignee: item.assignee,
        repairResult: item.repair_result,
        afterPhoto: item.after_photo
      }));
      console.log("Loaded tickets from Supabase:", tickets.length);
    }
  } catch (e) {
    console.error("Failed to fetch tickets from Supabase:", e);
  }
}

const USER_TICKETS_STORAGE_KEY = 'it_user_tickets_v2';

function loadLocalTickets() {
  if (useSupabase) {
    try {
      const storedTickets = localStorage.getItem(USER_TICKETS_STORAGE_KEY);
      return storedTickets ? JSON.parse(storedTickets) : [];
    } catch (e) {
      console.warn("Storage access denied: falling back to memory storage.", e);
      return [];
    }
  }
  return defaultTickets.map(ticket => ({ ...ticket }));
}

// Public users only see tickets created in their own browser. Admins load the
// shared list after Supabase confirms their authenticated role.
let tickets = loadLocalTickets();
try {
  localStorage.removeItem('it_tickets');
} catch (e) {
  console.warn("Could not remove legacy local data.", e);
}


let currentRole = 'user'; // 'user' or 'admin'

let isAdminLoggedIn = false;
let currentAdminUser = null;

// IT Technicians configuration list
const techniciansList = [
  { name: 'พ.อ.ท.ชนินทร์ พรมฤทธิ์', role: 'หัวหน้าช่างไอทีและระบบสารสนเทศ (IT Systems Chief)', avatar: '👨‍✈️' },
  { name: 'จ.อ.ภูมิดล บุโรดม', role: 'ช่างเทคนิคระบบเครือข่ายและระบบสารสนเทศ (Network & Systems Specialist)', avatar: '🧑‍💻' },
  { name: 'จ.ต.ภัทร พยุหะ', role: 'ช่างซ่อมบำรุงรักษาคอมพิวเตอร์ (Hardware Maintenance)', avatar: '👨‍🔧' },
  { name: 'นายภูรินทร์ อินทร์บุญช่วย', role: 'เจ้าหน้าที่บริการช่วยเหลือไอที (IT Helpdesk Support)', avatar: '👩‍🔧' }
];

// Global variables for Chart.js instances to allow clean re-draws
let chartStatusInstance = null;
let chartDeviceInstance = null;
let chartDeptInstance = null;

// Temporary variables for image uploads
let tempUploadPhoto = '';
let tempUploadAfterPhoto = '';
let tempEditPhoto = '';
let tempEditAfterPhoto = '';
let tempUploadFile = null;
let tempUploadAfterFile = null;
let tempEditFile = null;
let tempEditAfterFile = null;

// ----------------------------------------------------
// 2. Select DOM Elements
// ----------------------------------------------------
// Navigation / Role Toggle Buttons (3 Tab System)
const tabUserBtn = document.getElementById('tab-user-btn');
const tabAdminBtn = document.getElementById('tab-admin-btn');
const tabDashboardBtn = document.getElementById('tab-dashboard-btn');
const tabLoginBtn = document.getElementById('tab-login-btn');
const tabLogoutBtn = document.getElementById('tab-logout-btn');
const openNewTicketBtn = document.getElementById('open-new-ticket-btn');
const adminModeBanner = document.getElementById('admin-mode-banner');
const adminOverviewPanel = document.getElementById('admin-overview-panel');
const ticketsListSection = document.getElementById('tickets-list-section');
const adminLoginModal = document.getElementById('admin-login-modal');
const adminLoginForm = document.getElementById('admin-login-form');
const adminEmailInput = document.getElementById('admin-email');
const adminPasswordInput = document.getElementById('admin-password');
const loginErrorMsg = document.getElementById('login-error-msg');
const loginErrorText = document.getElementById('login-error-text');
const techListGrid = document.getElementById('tech-list-grid');

// Statistics UI Elements
const statPendingCount = document.getElementById('stat-pending-count');
const statProcessingCount = document.getElementById('stat-processing-count');
const statCompletedCount = document.getElementById('stat-completed-count');
const statUrgentCount = document.getElementById('stat-urgent-count');

// Search and Filter Elements
const searchInput = document.getElementById('search-input');
const filterDevice = document.getElementById('filter-device');
const filterStatus = document.getElementById('filter-status');
const resetFilterBtn = document.getElementById('reset-filter-btn');

// Lists and Grids Containers
const ticketsContainer = document.getElementById('tickets-container');
const emptyState = document.getElementById('empty-state');

// Form Modals Elements
const newTicketModal = document.getElementById('new-ticket-modal');
const newTicketForm = document.getElementById('new-ticket-form');
const assignJobModal = document.getElementById('assign-job-modal');
const assignJobForm = document.getElementById('assign-job-form');
const completeJobModal = document.getElementById('complete-job-modal');
const completeJobForm = document.getElementById('complete-job-form');
const editTicketModal = document.getElementById('edit-ticket-modal');
const editTicketForm = document.getElementById('edit-ticket-form');

// Photo Upload Input elements
const repairPhotoInput = document.getElementById('repair-photo');
const photoPreviewContainer = document.getElementById('photo-preview-container');
const photoPreview = document.getElementById('photo-preview');
const removePhotoBtn = document.getElementById('remove-photo-btn');

const afterPhotoInput = document.getElementById('after-photo');
const afterPreviewContainer = document.getElementById('after-preview-container');
const afterPreview = document.getElementById('after-preview');
const removeAfterPhotoBtn = document.getElementById('remove-after-photo-btn');

// Edit Photo elements
const editPhotoInput = document.getElementById('edit-photo-input');
const editPhotoPreviewContainer = document.getElementById('edit-photo-preview-container');
const editPhotoPreview = document.getElementById('edit-photo-preview');
const removeEditPhotoBtn = document.getElementById('remove-edit-photo-btn');

const editAfterPhotoInput = document.getElementById('edit-after-photo-input');
const editAfterPreviewContainer = document.getElementById('edit-after-preview-container');
const editAfterPreview = document.getElementById('edit-after-preview');
const removeEditAfterPhotoBtn = document.getElementById('remove-edit-after-photo-btn');

// Lightbox Elements
const imageLightbox = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxBtn = document.getElementById('close-lightbox-btn');

// ----------------------------------------------------
// 3. Utility / Helper Functions
// ----------------------------------------------------
// Local Storage sync — บันทึกเฉพาะข้อมูลหลัก ไม่รวมรูปภาพ (Base64 ใหญ่เกิน)
function saveStateToLocalStorage() {
  // Never copy the shared admin dataset to a public browser profile.
  if (isAdminLoggedIn) return;
  try {
    const ticketsWithoutPhotos = tickets.map(t => {
      const { photo, afterPhoto, ...rest } = t;
      return rest;
    });
    localStorage.setItem(USER_TICKETS_STORAGE_KEY, JSON.stringify(ticketsWithoutPhotos));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function safeImageUrl(value) {
  const url = String(value ?? '').trim();
  if (/^https:\/\//i.test(url) || /^data:image\/(?:png|jpe?g|webp|gif);base64,/i.test(url)) {
    return url;
  }
  return '';
}

function setLoginError(message) {
  loginErrorText.textContent = message;
  loginErrorMsg.style.display = 'block';
}

async function userHasAdminRole(userId) {
  if (!useSupabase || !supabaseClient || !userId) return false;
  const { data, error } = await supabaseClient
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Admin role lookup failed:', error);
    return false;
  }
  return Boolean(data);
}

async function applyAuthenticatedSession(session) {
  const user = session?.user || null;
  const allowed = user ? await userHasAdminRole(user.id) : false;
  currentAdminUser = allowed ? user : null;
  isAdminLoggedIn = allowed;

  if (allowed) {
    await fetchTicketsFromSupabase();
    setRoleMode('admin-manage');
  } else {
    tickets = loadLocalTickets();
    setRoleMode('user');
  }
}

function requireAdmin() {
  if (isAdminLoggedIn && currentAdminUser) return true;
  alert('เซสชันเจ้าหน้าที่หมดอายุ กรุณาเข้าสู่ระบบใหม่');
  setRoleMode('user');
  return false;
}

// Thai Date formatter
function formatDateThai(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const yearBE = (date.getFullYear() + 543) % 100;
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${yearBE} ${hours}:${minutes}`;
}

// Open / Close Modal animations helper
function openModal(modal) {
  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Map Device Type to fontawesome icon
function getDeviceIconClass(type) {
  switch (type) {
    case 'PC': return 'fa-desktop';
    case 'Notebook': return 'fa-laptop';
    case 'All in One': return 'fa-desktop';
    case 'Printer': return 'fa-print';
    case 'Network': return 'fa-network-wired';
    default: return 'fa-screwdriver-wrench';
  }
}

// Translate raw status to Thai
function getStatusLabel(status) {
  switch (status) {
    case 'pending': return 'รอรับเรื่อง';
    case 'processing': return 'กำลังซ่อม';
    case 'completed': return 'เสร็จแล้ว';
    default: return status;
  }
}

// ----------------------------------------------------
// 4. Renders & Computations UI Updates
// ----------------------------------------------------

// Calculate and render statistics cards
function updateStatistics() {
  const pending = tickets.filter(t => t.status === 'pending').length;
  const processing = tickets.filter(t => t.status === 'processing').length;
  const completed = tickets.filter(t => t.status === 'completed').length;
  
  // Urgent counts are non-completed tickets with priority === 'เร่งด่วน'
  const urgent = tickets.filter(t => t.priority === 'เร่งด่วน' && t.status !== 'completed').length;

  statPendingCount.textContent = pending;
  statProcessingCount.textContent = processing;
  statCompletedCount.textContent = completed;
  statUrgentCount.textContent = urgent;
}

// Render Tickets Roster List (Main Card Grid)
function renderTickets() {
  const searchQuery = searchInput.value.trim().toLowerCase();
  const deviceFilter = filterDevice.value;
  const statusFilter = filterStatus.value;
  
  // Filter tickets matching inputs
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = [t.id, t.reporter, t.dept, t.model, t.subject, t.detail, t.assignee]
      .some(value => String(value ?? '').toLowerCase().includes(searchQuery));
      
    const matchesDevice = (deviceFilter === 'all' || t.deviceType === deviceFilter);
    const matchesStatus = (statusFilter === 'all' || t.status === statusFilter);
    
    return matchesSearch && matchesDevice && matchesStatus;
  });

  // Render main card grid
  ticketsContainer.innerHTML = '';
  document.getElementById('ticket-results-count').textContent = `พบ ${filteredTickets.length} รายการ`;
  
  if (filteredTickets.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    
    filteredTickets.forEach(t => {
      const card = document.createElement('div');
      card.className = 'ticket-card';

      const safeId = escapeHtml(t.id);
      const safeModel = escapeHtml(t.model);
      const safeDeviceType = escapeHtml(t.deviceType);
      const safeSubject = escapeHtml(t.subject);
      const safeDetail = escapeHtml(t.detail);
      const safeReporter = escapeHtml(t.reporter);
      const safeDept = escapeHtml(t.dept);
      const safePhone = escapeHtml(t.phone || '-');
      const safeAssignee = escapeHtml(t.assignee || '');
      const safeRepairResult = escapeHtml(t.repairResult || '');
      const safePriority = escapeHtml(t.priority);
      const safeStatus = ['pending', 'processing', 'completed'].includes(t.status) ? t.status : 'pending';
      const beforePhotoUrl = safeImageUrl(t.photo);
      const afterPhotoUrl = safeImageUrl(t.afterPhoto);
      
      // Floating Admin actions
      let adminActionsHTML = '';
      if (currentRole === 'admin' && t.status !== 'completed') {
        adminActionsHTML = `
          <div class="card-admin-actions">
            <button type="button" class="card-admin-btn edit" data-action="edit" title="แก้ไขทุกส่วน">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="card-admin-btn delete" data-action="delete" title="ลบใบงาน">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;
      }
      
      // Photo previews logic
      let beforePhotoHTML = `<span class="no-image-placeholder">ไม่มีรูป</span>`;
      if (beforePhotoUrl) {
        beforePhotoHTML = `
          <button type="button" class="img-preview-trigger" data-image-slot="before">
            <img alt="ก่อนซ่อม">
            <span>ดูรูป</span>
          </button>
        `;
      }
      
      let afterPhotoHTML = `<span class="no-image-placeholder">ไม่มีรูป</span>`;
      if (afterPhotoUrl) {
        afterPhotoHTML = `
          <button type="button" class="img-preview-trigger" data-image-slot="after">
            <img alt="หลังซ่อม">
            <span>ดูรูป</span>
          </button>
        `;
      }

      // Repair result text block
      let repairSummaryHTML = '';
      if (t.status === 'completed' && t.repairResult) {
        repairSummaryHTML = `
          <div class="card-repair-summary">
            <strong>ผลการซ่อม:</strong> ${safeRepairResult}<br>
            <strong>ผู้ซ่อม:</strong> ${safeAssignee || 'ช่างไอที'}
          </div>
        `;
      }

      // Priority Badge
      const priorityClass = t.priority === 'เร่งด่วน' ? 'badge-urgent' : 'badge-normal';
      
      // Active bottom button highlighting
      const activePendingClass = safeStatus === 'pending' ? 'active-pending' : '';
      const activeProcessingClass = safeStatus === 'processing' ? 'active-processing' : '';
      const activeCompletedClass = safeStatus === 'completed' ? 'active-completed' : '';
      
      // Click event attributes for admin vs disabled for user
      let isInteractiveClass = currentRole === 'admin' ? 'admin-interactive' : 'user-readonly';
      let statusActionAttributes = currentRole === 'admin' ? 'data-admin-action="true"' : 'disabled';

      // If completed, lock all status buttons so it cannot be reverted
      if (t.status === 'completed') {
        isInteractiveClass = 'user-readonly';
        statusActionAttributes = 'disabled';
      }

      card.innerHTML = `
        ${adminActionsHTML}
        <div>
          <!-- Header Row -->
          <div class="card-header-row">
            <div class="card-device-icon-box">
              <i class="fa-solid ${getDeviceIconClass(t.deviceType)}"></i>
            </div>
            <div class="card-title-details">
              <h3>${safeModel}</h3>
              <span class="ticket-sub-id">${safeId} · รับเข้า ${escapeHtml(formatDateThai(t.date))}</span>
            </div>
          </div>
          
          <!-- Badges -->
          <div class="card-badges-row">
            <span class="card-badge badge-gray">${safeDeviceType}</span>
            <span class="badge-separator">-</span>
            <span class="card-badge badge-${safeStatus}">${escapeHtml(getStatusLabel(safeStatus))}</span>
            <span class="card-badge ${priorityClass}">${safePriority}</span>
          </div>

          <!-- Problem description Box -->
          <div class="card-problem-desc">
            <h4>รายละเอียดปัญหา</h4>
            <p><strong>${safeSubject}</strong>: ${safeDetail}</p>
          </div>

          <!-- Metadata info Grid -->
          <div class="card-meta-grid">
            <div class="meta-item">
              <span class="meta-label">ผู้แจ้ง</span>
              <span class="meta-value">${safeReporter}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">แผนก</span>
              <span class="meta-value">${safeDept}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">เบอร์โทร</span>
              <span class="meta-value">${safePhone}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">ช่างรับผิดชอบ</span>
              <span class="meta-value" style="color: var(--primary-light); font-weight: 600;">${safeAssignee || '<span class="unassigned-value">ยังไม่ระบุ</span>'}</span>
            </div>
            <div class="meta-item" style="grid-column: span 1;">
              <span class="meta-label">รูปแจ้งซ่อม</span>
              ${beforePhotoHTML}
            </div>
            <div class="meta-item" style="grid-column: span 1;">
              <span class="meta-label">รูปปิดงาน</span>
              ${afterPhotoHTML}
            </div>
          </div>

          ${repairSummaryHTML}
        </div>

        <!-- Action / Status Buttons Roster -->
        <div class="card-status-buttons ${isInteractiveClass}">
          <button type="button" class="status-btn-option ${activePendingClass}" data-next-status="pending" ${statusActionAttributes}>รอรับเรื่อง</button>
          <button type="button" class="status-btn-option ${activeProcessingClass}" data-next-status="processing" ${statusActionAttributes}>กำลังซ่อม</button>
          <button type="button" class="status-btn-option ${activeCompletedClass}" data-next-status="completed" ${statusActionAttributes}>เสร็จแล้ว</button>
        </div>
      `;

      card.querySelector('[data-action="edit"]')?.addEventListener('click', () => openEditModal(t.id));
      card.querySelector('[data-action="delete"]')?.addEventListener('click', () => deleteTicket(t.id));

      const beforeImageButton = card.querySelector('[data-image-slot="before"]');
      if (beforeImageButton) {
        beforeImageButton.querySelector('img').src = beforePhotoUrl;
        beforeImageButton.addEventListener('click', () => showLightbox(beforePhotoUrl, `รูปหลักฐาน: ${t.id}`));
      }

      const afterImageButton = card.querySelector('[data-image-slot="after"]');
      if (afterImageButton) {
        afterImageButton.querySelector('img').src = afterPhotoUrl;
        afterImageButton.addEventListener('click', () => showLightbox(afterPhotoUrl, `รูปหลังซ่อม: ${t.id}`));
      }

      card.querySelectorAll('[data-admin-action="true"]').forEach(button => {
        button.addEventListener('click', () => {
          const nextStatus = button.dataset.nextStatus;
          if (nextStatus === 'completed') adminOpenCompleteModal(t.id);
          else adminUpdateStatus(t.id, nextStatus);
        });
      });
      ticketsContainer.appendChild(card);
    });
  }
}

// ----------------------------------------------------
// 5. Controller: Dashboard Charts Renderer (Chart.js)
// ----------------------------------------------------
function renderDashboardCharts() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js library is not available.');
    return;
  }

  // 1. Prepare Status Distribution Data
  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const processingCount = tickets.filter(t => t.status === 'processing').length;
  const completedCount = tickets.filter(t => t.status === 'completed').length;

  const canvasStatus = document.getElementById('chart-status');
  if (canvasStatus) {
    const ctxStatus = canvasStatus.getContext('2d');
    if (chartStatusInstance) chartStatusInstance.destroy();
    chartStatusInstance = new Chart(ctxStatus, {
      type: 'doughnut',
      data: {
        labels: ['รอรับเรื่อง', 'กำลังซ่อม', 'เสร็จแล้ว'],
        datasets: [{
          data: [pendingCount, processingCount, completedCount],
          backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'], /* Amber, Blue, Emerald */
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Prompt', size: 11 },
              padding: 15
            }
          }
        }
      }
    });
  }

  // 2. Prepare Device Type Counts
  const devices = ['PC', 'Notebook', 'All in One', 'Printer', 'Network', 'Other'];
  const deviceCounts = devices.map(d => tickets.filter(t => t.deviceType === d).length);

  const canvasDevice = document.getElementById('chart-device');
  if (canvasDevice) {
    const ctxDevice = canvasDevice.getContext('2d');
    if (chartDeviceInstance) chartDeviceInstance.destroy();
    chartDeviceInstance = new Chart(ctxDevice, {
      type: 'bar',
      data: {
        labels: devices,
        datasets: [{
          data: deviceCounts,
          backgroundColor: '#3b82f6',
          borderRadius: 6,
          maxBarThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: { family: 'Prompt', size: 10 }
            },
            grid: { color: '#f1f5f9' }
          },
          x: {
            ticks: {
              font: { family: 'Prompt', size: 10 }
            },
            grid: { display: false }
          }
        }
      }
    });
  }

  // 3. Prepare Department Distribution
  const deptMap = {};
  tickets.forEach(t => {
    const d = t.dept || 'ไม่ระบุ';
    deptMap[d] = (deptMap[d] || 0) + 1;
  });
  const depts = Object.keys(deptMap);
  const deptCounts = Object.values(deptMap);

  const canvasDept = document.getElementById('chart-dept');
  if (canvasDept) {
    const ctxDept = canvasDept.getContext('2d');
    if (chartDeptInstance) chartDeptInstance.destroy();
    chartDeptInstance = new Chart(ctxDept, {
      type: 'bar',
      data: {
        labels: depts.length > 0 ? depts : ['ไม่มีข้อมูล'],
        datasets: [{
          data: deptCounts.length > 0 ? deptCounts : [0],
          backgroundColor: '#f59e0b',
          borderRadius: 6,
          maxBarThickness: 24
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: { family: 'Prompt', size: 10 }
            },
            grid: { color: '#f1f5f9' }
          },
          y: {
            ticks: {
              font: { family: 'Prompt', size: 10 }
            },
            grid: { display: false }
          }
        }
      }
    });
  }

  // Render Technicians list below charts
  renderTechniciansList();
}

// Render dynamic workload stats for each technician
function renderTechniciansList() {
  if (!techListGrid) return;
  
  techListGrid.innerHTML = '';
  
  techniciansList.forEach(tech => {
    // Count stats from tickets array
    const inProgressCount = tickets.filter(t => t.assignee === tech.name && t.status === 'processing').length;
    const completedCount = tickets.filter(t => t.assignee === tech.name && t.status === 'completed').length;
    
    // Status text based on workload
    const isBusy = inProgressCount >= 3;
    const statusText = isBusy ? 'งานหนาแน่น (Busy)' : (inProgressCount > 0 ? 'กำลังปฏิบัติงาน (Active)' : 'พร้อมรับงาน (Available)');
    const statusClass = isBusy ? 'tech-status-busy' : (inProgressCount > 0 ? 'tech-status-active' : 'tech-status-available');
    
    const card = document.createElement('div');
    card.className = 'tech-card-item';
    card.innerHTML = `
      <div class="tech-profile">
        <div class="tech-avatar">${tech.avatar}</div>
        <div class="tech-info">
          <h4>${tech.name}</h4>
          <p class="tech-role">${tech.role}</p>
        </div>
      </div>
      <div class="tech-stats">
        <div class="tech-stat-box">
          <span class="tech-stat-label">กำลังซ่อม</span>
          <span class="tech-stat-val val-processing">${inProgressCount}</span>
        </div>
        <div class="tech-stat-box">
          <span class="tech-stat-label">เสร็จสิ้น</span>
          <span class="tech-stat-val val-completed">${completedCount}</span>
        </div>
      </div>
      <div class="tech-status-badge ${statusClass}">
        <span class="dot"></span> ${statusText}
      </div>
    `;
    techListGrid.appendChild(card);
  });
}

// Function to rebuild statistics, render cards, and update graphs
function saveStateAndRender() {
  saveStateToLocalStorage();
  updateStatistics();
  renderTickets();
  
  // Re-draw graphs if the Admin Dashboard panel is currently active/visible
  if (!adminOverviewPanel.classList.contains('hidden')) {
    renderDashboardCharts();
  }
}

function updateTabVisibility() {
  if (isAdminLoggedIn) {
    tabUserBtn.classList.add('hidden');
    tabAdminBtn.classList.remove('hidden');
    tabDashboardBtn.classList.remove('hidden');
    tabLogoutBtn.classList.remove('hidden');
    tabLoginBtn.classList.add('hidden');
  } else {
    tabUserBtn.classList.remove('hidden');
    tabAdminBtn.classList.add('hidden');
    tabDashboardBtn.classList.add('hidden');
    tabLogoutBtn.classList.add('hidden');
    tabLoginBtn.classList.remove('hidden');
  }
}

function setRoleMode(mode) {
  // Guard admin pages if not logged in
  if ((mode === 'admin-manage' || mode === 'admin-dashboard') && !isAdminLoggedIn) {
    mode = 'user';
  }

  // Update tab visibilities on mode changes
  updateTabVisibility();

  // Reset tab active statuses
  tabUserBtn.classList.remove('active');
  tabAdminBtn.classList.remove('active');
  tabDashboardBtn.classList.remove('active');
  
  if (mode === 'user') {
    currentRole = 'user';
    tabUserBtn.classList.add('active');
    ticketsListSection.classList.remove('hidden');
    adminOverviewPanel.classList.add('hidden');
    adminModeBanner.classList.add('hidden');
  } 
  else if (mode === 'admin-manage') {
    currentRole = 'admin';
    tabAdminBtn.classList.add('active');
    ticketsListSection.classList.remove('hidden');
    adminOverviewPanel.classList.add('hidden');
    adminModeBanner.classList.remove('hidden');
    document.getElementById('admin-banner-text').innerHTML = `
      <strong>โหมดจัดการงานซ่อม (แอดมิน):</strong> คุณสามารถคลิกเปลี่ยนสถานะใต้การ์ด หรือกดแก้ไข/ลบข้อมูลได้โดยตรงที่ใบงานซ่อม
    `;
  } 
  else if (mode === 'admin-dashboard') {
    currentRole = 'admin';
    tabDashboardBtn.classList.add('active');
    ticketsListSection.classList.add('hidden');
    adminOverviewPanel.classList.remove('hidden');
    adminModeBanner.classList.remove('hidden');
    document.getElementById('admin-banner-text').innerHTML = `
      <strong>ภาพรวมแอดมิน:</strong> ติดตามสถิติของระบบผ่านกราฟประเภทต่าง ๆ
    `;
    
    // Draw / refresh the Chart.js visualisations
    setTimeout(renderDashboardCharts, 50); // slight timeout to allow panel display transitions
  }
  
  // Re-render matching current permissions view
  renderTickets();
}

// ----------------------------------------------------
// 7. Modals: Open & Actions Handling
// ----------------------------------------------------

// Admin transitions status from status buttons
function adminUpdateStatus(ticketId, nextStatus) {
  if (!requireAdmin()) return;
  const index = tickets.findIndex(t => t.id === ticketId);
  if (index === -1) return;

  let updateFields = {};
  if (nextStatus === 'pending') {
    tickets[index].status = 'pending';
    tickets[index].assignee = '';
    tickets[index].repairResult = '';
    tickets[index].afterPhoto = '';
    updateFields = { status: 'pending', assignee: '', repair_result: '', after_photo: '' };
    saveStateAndRender();
    updateSupabaseStatus(ticketId, updateFields);
  } else if (nextStatus === 'processing') {
    // Open Assign Job Modal instead of changing immediately
    document.getElementById('assign-ticket-id').value = ticketId;
    document.getElementById('assign-tech').value = tickets[index].assignee || '';
    openModal(assignJobModal);
  }
}

// Helper to push status updates to Supabase
function updateSupabaseStatus(ticketId, updateFields) {
  if (!requireAdmin()) return;
  if (useSupabase && supabaseClient) {
    supabaseClient.from('tickets').update(updateFields).eq('id', ticketId).then(({ error }) => {
      if (error) console.error("Supabase update status failed:", error);
    });
  }
}
// Admin opens complete-job modal
function adminOpenCompleteModal(ticketId) {
  if (!requireAdmin()) return;
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  document.getElementById('complete-ticket-id').value = ticket.id;
  
  // Reset previews inside close job form
  tempUploadAfterPhoto = '';
  afterPreviewContainer.classList.add('hidden');
  afterPreview.src = '';
  completeJobForm.reset();

  // Set technician text value directly
  document.getElementById('assignee-tech').value = ticket.assignee || '';

  openModal(completeJobModal);
}

// Admin opens edit modal
function openEditModal(ticketId) {
  if (!requireAdmin()) return;
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  document.getElementById('edit-ticket-id').value = ticket.id;
  document.getElementById('edit-id-display').value = ticket.id;
  document.getElementById('edit-date-display').value = formatDateThai(ticket.date);
  document.getElementById('edit-reporter').value = ticket.reporter;
  document.getElementById('edit-dept').value = ticket.dept;
  document.getElementById('edit-device-type').value = ticket.deviceType;
  document.getElementById('edit-model').value = ticket.model;
  document.getElementById('edit-priority').value = ticket.priority || 'ปกติ';
  document.getElementById('edit-status').value = ticket.status;
  document.getElementById('edit-subject').value = ticket.subject;
  document.getElementById('edit-detail').value = ticket.detail;
  document.getElementById('edit-result').value = ticket.repairResult || '';

  // Setup technician text input value
  const editAssigneeInput = document.getElementById('edit-assignee');
  const editResultInput = document.getElementById('edit-result');
  editAssigneeInput.value = ticket.assignee || '';
  
  if (ticket.status === 'completed') {
    editAssigneeInput.disabled = true;
    editAssigneeInput.style.backgroundColor = 'var(--secondary-light)';
    editAssigneeInput.style.cursor = 'not-allowed';
    
    editResultInput.readOnly = true;
    editResultInput.style.backgroundColor = 'var(--secondary-light)';
    editResultInput.style.cursor = 'not-allowed';
  } else {
    editAssigneeInput.disabled = false;
    editAssigneeInput.style.backgroundColor = 'white';
    editAssigneeInput.style.cursor = 'pointer';
    
    editResultInput.readOnly = false;
    editResultInput.style.backgroundColor = 'white';
    editResultInput.style.cursor = 'text';
  }
  // Initialize edit photos preview states
  tempEditPhoto = ticket.photo || '';
  if (tempEditPhoto) {
    editPhotoPreview.src = tempEditPhoto;
    editPhotoPreviewContainer.classList.remove('hidden');
  } else {
    editPhotoPreviewContainer.classList.add('hidden');
  }

  tempEditAfterPhoto = ticket.afterPhoto || '';
  if (tempEditAfterPhoto) {
    editAfterPreview.src = tempEditAfterPhoto;
    editAfterPreviewContainer.classList.remove('hidden');
  } else {
    editAfterPreviewContainer.classList.add('hidden');
  }

  openModal(editTicketModal);
}

// Admin deletes a ticket
function deleteTicket(ticketId) {
  if (!requireAdmin()) return;
  if (confirm(`คุณต้องการลบรายการแจ้งซ่อมรหัส ${ticketId} หรือไม่?`)) {
    tickets = tickets.filter(t => t.id !== ticketId);
    saveStateAndRender();

    if (useSupabase && supabaseClient) {
      supabaseClient.from('tickets').delete().eq('id', ticketId).then(({ error }) => {
        if (error) console.error("Supabase delete failed:", error);
      });
    }
  }
}

// Lightbox controller
function showLightbox(imgSrc, title) {
  lightboxImage.src = imgSrc;
  lightboxCaption.textContent = title;
  imageLightbox.classList.add('active');
}

// ----------------------------------------------------
// 8. Event Listeners Setup
// ----------------------------------------------------

// Tab switches
tabUserBtn.addEventListener('click', () => setRoleMode('user'));
tabAdminBtn.addEventListener('click', () => setRoleMode('admin-manage'));
tabDashboardBtn.addEventListener('click', () => setRoleMode('admin-dashboard'));

// Login & Logout switches
tabLoginBtn.addEventListener('click', () => {
  adminEmailInput.value = '';
  adminPasswordInput.value = '';
  loginErrorMsg.style.display = 'none';
  openModal(adminLoginModal);
});

tabLogoutBtn.addEventListener('click', async () => {
  if (confirm('คุณต้องการออกจากระบบเจ้าหน้าที่หรือไม่?')) {
    if (useSupabase && supabaseClient) {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        alert('ออกจากระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        return;
      }
    }
    isAdminLoggedIn = false;
    currentAdminUser = null;
    tickets = loadLocalTickets();
    setRoleMode('user');
  }
});

// Admin authentication is verified by Supabase Auth and the admin_users table.
adminLoginForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = adminEmailInput.value.trim();
  const password = adminPasswordInput.value.trim();

  if (!useSupabase || !supabaseClient) {
    setLoginError('ยังไม่ได้ตั้งค่า Supabase จึงไม่สามารถเข้าสู่ระบบเจ้าหน้าที่ได้');
    return;
  }

  const submitButton = adminLoginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'กำลังตรวจสอบ...';
  loginErrorMsg.style.display = 'none';

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error || !data.session) throw error || new Error('Missing session');

    const allowed = await userHasAdminRole(data.user.id);
    if (!allowed) {
      await supabaseClient.auth.signOut();
      setLoginError('บัญชีนี้ไม่มีสิทธิ์เจ้าหน้าที่');
      return;
    }

    currentAdminUser = data.user;
    isAdminLoggedIn = true;
    await fetchTicketsFromSupabase();
    closeModal('admin-login-modal');
    setRoleMode('admin-manage');
  } catch (error) {
    console.error('Admin login failed:', error);
    setLoginError('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'ยืนยันเข้าสู่ระบบ';
  }
});

// Open New Ticket dialog
openNewTicketBtn.addEventListener('click', () => {
  tempUploadPhoto = '';
  photoPreviewContainer.classList.add('hidden');
  photoPreview.src = '';
  newTicketForm.reset();
  openModal(newTicketModal);
});

// Close modals triggers
document.querySelectorAll('.close-modal-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    closeModal(modalId);
  });
});

// Helper to upload image to Supabase Storage
async function uploadImageToSupabase(file) {
  if (!useSupabase || !supabaseClient || !file) return null;
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabaseClient.storage
      .from('ticket-images')
      .upload(filePath, file);

    if (error) throw error;

    const { data: publicUrlData } = supabaseClient.storage
      .from('ticket-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (e) {
    console.error("Error uploading image to Supabase:", e);
    return null;
  }
}

// Click outside modal triggers cancel closing
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Lightbox close events
closeLightboxBtn.addEventListener('click', () => imageLightbox.classList.remove('active'));
imageLightbox.addEventListener('click', (e) => {
  if (e.target === imageLightbox || e.target === closeLightboxBtn) {
    imageLightbox.classList.remove('active');
  }
});

// ----------------------------------------------------
// 9. Input & Upload File Preview Handler (FileReader Base64)
// ----------------------------------------------------

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

function validateImageFile(file) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return 'รองรับเฉพาะไฟล์ JPG, PNG และ WebP';
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return 'รูปภาพต้องมีขนาดไม่เกิน 5 MB';
  }
  return '';
}

// Convert and preview helper
function handleImageFileSelect(inputElement, previewContainer, previewImage, callback, fileCallback) {
  inputElement.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      alert(validationError);
      inputElement.value = '';
      return;
    }

    if (fileCallback) fileCallback(file);

    const reader = new FileReader();
    reader.onload = function(evt) {
      previewImage.src = evt.target.result;
      previewContainer.classList.remove('hidden');
      callback(evt.target.result); // Save Base64 data string
    };
    reader.readAsDataURL(file);
  });
}

// Register file handlers
handleImageFileSelect(repairPhotoInput, photoPreviewContainer, photoPreview, 
  (data) => tempUploadPhoto = data, 
  (file) => tempUploadFile = file);
handleImageFileSelect(afterPhotoInput, afterPreviewContainer, afterPreview, 
  (data) => tempUploadAfterPhoto = data, 
  (file) => tempUploadAfterFile = file);
handleImageFileSelect(editPhotoInput, editPhotoPreviewContainer, editPhotoPreview, 
  (data) => tempEditPhoto = data, 
  (file) => tempEditFile = file);
handleImageFileSelect(editAfterPhotoInput, editAfterPreviewContainer, editAfterPreview, 
  (data) => tempEditAfterPhoto = data, 
  (file) => tempEditAfterFile = file);

// Remove preview buttons
removePhotoBtn.addEventListener('click', () => {
  tempUploadPhoto = '';
  tempUploadFile = null;
  repairPhotoInput.value = '';
  photoPreviewContainer.classList.add('hidden');
  photoPreview.src = '';
});

removeAfterPhotoBtn.addEventListener('click', () => {
  tempUploadAfterPhoto = '';
  tempUploadAfterFile = null;
  afterPhotoInput.value = '';
  afterPreviewContainer.classList.add('hidden');
  afterPreview.src = '';
});

removeEditPhotoBtn.addEventListener('click', () => {
  tempEditPhoto = '';
  tempEditFile = null;
  editPhotoInput.value = '';
  editPhotoPreviewContainer.classList.add('hidden');
  editPhotoPreview.src = '';
});

removeEditAfterPhotoBtn.addEventListener('click', () => {
  tempEditAfterPhoto = '';
  tempEditAfterFile = null;
  editAfterPhotoInput.value = '';
  editAfterPreviewContainer.classList.add('hidden');
  editAfterPreview.src = '';
});

// Search & Filter event triggers
searchInput.addEventListener('input', renderTickets);
filterDevice.addEventListener('change', renderTickets);
filterStatus.addEventListener('change', renderTickets);

resetFilterBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterDevice.value = 'all';
  filterStatus.value = 'all';
  renderTickets();
});

// ----------------------------------------------------
// 10. Form submissions logic
// ----------------------------------------------------

// Form submit: New Ticket reporting
newTicketForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const reporter = document.getElementById('reporter-name').value.trim();
  const dept = document.getElementById('reporter-dept').value.trim();
  const phone = document.getElementById('reporter-phone').value.trim();
  const type = document.getElementById('device-type').value;
  const model = document.getElementById('device-model').value.trim();
  const priority = document.getElementById('repair-priority').value;
  const detail = document.getElementById('repair-detail').value.trim();
  const subject = detail.length > 60 ? detail.substring(0, 60) + '...' : detail;
  
  // Calculate new sequential ID (e.g. IT-260520-001)
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const datePrefix = `${yy}${mm}${dd}`; // "260520" format
  
  const prefix = `IT-${datePrefix}-`;
  const matches = tickets.filter(t => t.id.startsWith(prefix));
  let nextNum = 1;
  if (matches.length > 0) {
    const nums = matches.map(t => {
      const parts = t.id.split('-');
      return parseInt(parts[2], 10);
    });
    nextNum = Math.max(...nums) + 1;
  }
  const idStr = `${prefix}${String(nextNum).padStart(3, '0')}`;
  
  // Setup photo or generate dynamic placeholder if empty
  let photoData = tempUploadPhoto;
  
  if (tempUploadFile && useSupabase && supabaseClient) {
    const submitBtn = newTicketForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอัปโหลดรูปภาพ...';
    submitBtn.disabled = true;

    const uploadedUrl = await uploadImageToSupabase(tempUploadFile);
    if (uploadedUrl) {
       photoData = uploadedUrl;
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
  
  if (!photoData) {
    photoData = generatePlaceholderImage('แจ้งซ่อม: ' + model, '#fee2e2', '#ef4444');
  }

  const newTicket = {
    id: idStr,
    reporter: reporter,
    dept: dept,
    phone: phone,
    deviceType: type,
    model: model,
    subject: subject,
    detail: detail,
    status: 'pending',
    priority: priority,
    date: new Date().toISOString(),
    photo: photoData,
    assignee: '',
    repairResult: '',
    afterPhoto: ''
  };

  if (useSupabase && supabaseClient) {
    const { error } = await supabaseClient.from('tickets').insert([{
      id: newTicket.id,
      reporter: newTicket.reporter,
      dept: newTicket.dept,
      phone: newTicket.phone,
      device_type: newTicket.deviceType,
      model: newTicket.model,
      subject: newTicket.subject,
      detail: newTicket.detail,
      status: newTicket.status,
      priority: newTicket.priority,
      date: newTicket.date,
      photo: newTicket.photo,
      assignee: newTicket.assignee,
      repair_result: newTicket.repairResult,
      after_photo: newTicket.afterPhoto
    }]);

    if (error) {
      console.error('Supabase insert failed:', error);
      alert('ส่งใบแจ้งซ่อมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      return;
    }
  }

  tickets.unshift(newTicket); // Show only in the reporter's current browser.
  saveStateAndRender();
  closeModal('new-ticket-modal');
});

// Form submit: Assign Job (กำลังซ่อม)
assignJobForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!requireAdmin()) return;
  
  const ticketId = document.getElementById('assign-ticket-id').value;
  const assignee = document.getElementById('assign-tech').value;
  
  const index = tickets.findIndex(t => t.id === ticketId);
  if (index === -1) return;

  tickets[index].status = 'processing';
  tickets[index].assignee = assignee;
  tickets[index].repairResult = '';
  tickets[index].afterPhoto = '';
  
  const updateFields = { status: 'processing', assignee: assignee, repair_result: '', after_photo: '' };
  
  saveStateAndRender();
  closeModal('assign-job-modal');
  updateSupabaseStatus(ticketId, updateFields);
});

// Form submit: Close job (เสร็จสิ้นการซ่อม)
completeJobForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!requireAdmin()) return;
  
  const ticketId = document.getElementById('complete-ticket-id').value;
  const assignee = document.getElementById('assignee-tech').value.trim();
  const repairResult = document.getElementById('repair-result').value.trim();
  
  const index = tickets.findIndex(t => t.id === ticketId);
  if (index === -1) return;

  tickets[index].status = 'completed';
  tickets[index].assignee = assignee || 'ช่างไอที';
  tickets[index].repairResult = repairResult;
  
  if (tempUploadAfterPhoto) {
    tickets[index].afterPhoto = tempUploadAfterPhoto;
  } else {
    // Generate dynamic placeholder for fixed image
    tickets[index].afterPhoto = generatePlaceholderImage('แก้ไขเสร็จสิ้น: ' + tickets[index].model, '#d1fae5', '#10b981');
  }

  // Handle actual file upload if present
  if (tempUploadAfterFile && useSupabase && supabaseClient) {
    const submitBtn = completeJobForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอัปโหลดรูปภาพ...';
    submitBtn.disabled = true;
    
    const uploadedUrl = await uploadImageToSupabase(tempUploadAfterFile);
    if (uploadedUrl) {
      tickets[index].afterPhoto = uploadedUrl;
    }
    
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }

  saveStateAndRender();
  closeModal('complete-job-modal');

  if (useSupabase && supabaseClient) {
    const t = tickets[index];
    supabaseClient.from('tickets').update({
      status: t.status,
      assignee: t.assignee,
      repair_result: t.repairResult,
      after_photo: t.afterPhoto
    }).eq('id', t.id).then(({ error }) => {
      if (error) console.error("Supabase complete job failed:", error);
    });
  }
});

// Form submit: Edit Ticket (แก้ไขทุกส่วน - แอดมิน)
editTicketForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!requireAdmin()) return;
  
  const ticketId = document.getElementById('edit-ticket-id').value;
  const index = tickets.findIndex(t => t.id === ticketId);
  if (index === -1) return;

  tickets[index].reporter = document.getElementById('edit-reporter').value.trim();
  tickets[index].dept = document.getElementById('edit-dept').value.trim();
  tickets[index].deviceType = document.getElementById('edit-device-type').value;
  tickets[index].model = document.getElementById('edit-model').value.trim();
  tickets[index].priority = document.getElementById('edit-priority').value;
  tickets[index].status = document.getElementById('edit-status').value;
  tickets[index].subject = document.getElementById('edit-subject').value.trim();
  tickets[index].detail = document.getElementById('edit-detail').value.trim();
  tickets[index].assignee = document.getElementById('edit-assignee').value.trim();
  tickets[index].repairResult = document.getElementById('edit-result').value.trim();

  // If status is completed but repair result/assignee are empty, validate or warn
  if (tickets[index].status === 'completed') {
    if (!tickets[index].assignee) {
      tickets[index].assignee = 'ช่างไอที';
    }
    if (!tickets[index].repairResult) {
      tickets[index].repairResult = 'แอดมินปิดงานซ่อมแซม';
    }
    if (!tempEditAfterPhoto && !tickets[index].afterPhoto) {
      tickets[index].afterPhoto = generatePlaceholderImage('แก้ไขเสร็จสิ้น: ' + tickets[index].model, '#d1fae5', '#10b981');
    }
  }

  // Assign image updates
  tickets[index].photo = tempEditPhoto;
  tickets[index].afterPhoto = tempEditAfterPhoto;

  if (useSupabase && supabaseClient) {
    const submitBtn = editTicketForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    if (tempEditFile || tempEditAfterFile) {
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอัปโหลดรูปภาพ...';
      submitBtn.disabled = true;
    }
    
    if (tempEditFile) {
      const uploadedUrl = await uploadImageToSupabase(tempEditFile);
      if (uploadedUrl) tickets[index].photo = uploadedUrl;
    }
    if (tempEditAfterFile) {
      const uploadedUrl = await uploadImageToSupabase(tempEditAfterFile);
      if (uploadedUrl) tickets[index].afterPhoto = uploadedUrl;
    }
    
    if (tempEditFile || tempEditAfterFile) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  saveStateAndRender();
  closeModal('edit-ticket-modal');

  if (useSupabase && supabaseClient) {
    const t = tickets[index];
    supabaseClient.from('tickets').update({
      reporter: t.reporter,
      dept: t.dept,
      device_type: t.deviceType,
      model: t.model,
      priority: t.priority,
      status: t.status,
      subject: t.subject,
      detail: t.detail,
      assignee: t.assignee,
      repair_result: t.repairResult,
      photo: t.photo,
      after_photo: t.afterPhoto
    }).eq('id', t.id).then(({ error }) => {
      if (error) console.error("Supabase update failed:", error);
    });
  }
});

// ----------------------------------------------------
// 11. Initial On-Load Trigger
// ----------------------------------------------------
async function initApp() {
  if (!useSupabase || !supabaseClient) {
    updateStatistics();
    setRoleMode('user');
    return;
  }

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) console.error('Could not restore Supabase session:', error);
  await applyAuthenticatedSession(data?.session || null);

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      currentAdminUser = null;
      isAdminLoggedIn = false;
      tickets = loadLocalTickets();
      setRoleMode('user');
    }
  });
}

// Boot
window.addEventListener('DOMContentLoaded', initApp);
