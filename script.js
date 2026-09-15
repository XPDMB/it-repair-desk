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

// Supabase public configuration. Never place a service_role key in browser code.
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
  if (!useSupabase || !supabaseClient) return;
  try {
    const { data, error } = await supabaseClient
      .from('tickets')
      // Keep the initial response small. Photos are fetched only when requested.
      .select('id,reporter,dept,phone,device_type,model,subject,detail,status,priority,date,assignee,repair_result')
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
        photo: null,
        photoLoaded: false,
        assignee: item.assignee,
        repairResult: item.repair_result,
        afterPhoto: null,
        afterPhotoLoaded: item.status !== 'completed'
      }));
      console.log("Loaded tickets from Supabase:", tickets.length);
    }
  } catch (e) {
    console.error("Failed to fetch tickets from Supabase:", e);
  }
}

let tickets = useSupabase ? [] : defaultTickets;
try {
  const storedTickets = localStorage.getItem('it_tickets');
  if (storedTickets) tickets = JSON.parse(storedTickets);
} catch (e) {
  console.warn("Storage access denied: falling back to memory storage.", e);
}


let currentRole = 'user'; // 'user' or 'admin'

let isAdminLoggedIn = false;
try {
  isAdminLoggedIn = sessionStorage.getItem('is_admin_logged_in') === 'true';
} catch (e) {
  console.warn("Session storage access denied: falling back to memory storage.", e);
}

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
let chartJsLoadingPromise = null;

function ensureChartJsLoaded() {
  if (typeof Chart !== 'undefined') return Promise.resolve();
  if (chartJsLoadingPromise) return chartJsLoadingPromise;

  chartJsLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('ไม่สามารถโหลด Chart.js ได้'));
    document.head.appendChild(script);
  });

  return chartJsLoadingPromise;
}

// Temporary variables for image uploads
let tempUploadPhoto = '';
let tempUploadAfterPhoto = '';
let tempEditPhoto = '';
let tempEditAfterPhoto = '';
let tempUploadFile = null;
let tempUploadAfterFile = null;
let tempEditFile = null;
let tempEditAfterFile = null;
let editPhotoChanged = false;
let editAfterPhotoChanged = false;

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
const serviceHomePanel = document.getElementById('service-home-panel');
const internetRegistrationSection = document.getElementById('internet-registration-section');
const chooseRepairServiceBtn = document.getElementById('choose-repair-service');
const chooseInternetServiceBtn = document.getElementById('choose-internet-service');
const repairBackHomeBtn = document.getElementById('repair-back-home');
const internetBackHomeBtn = document.getElementById('internet-back-home');
const internetRegistrationForm = document.getElementById('internet-registration-form');
const internetPrintSheet = document.getElementById('internet-print-sheet');
const internetWorkspace = document.querySelector('.internet-workspace');
const internetPrintToolbar = document.getElementById('internet-print-toolbar');
const internetPrintValidationNote = document.getElementById('internet-print-validation-note');
const editInternetFormBtn = document.getElementById('edit-internet-form-btn');
const printInternetNowBtn = document.getElementById('print-internet-now-btn');
const clearInternetFormBtn = document.getElementById('clear-internet-form');
const internetDraftStatus = document.getElementById('internet-draft-status');
const adminLoginModal = document.getElementById('admin-login-modal');
const adminLoginForm = document.getElementById('admin-login-form');
const adminPasswordInput = document.getElementById('admin-password');
const loginErrorMsg = document.getElementById('login-error-msg');
const loginErrorText = document.getElementById('login-error-text');
const techListGrid = document.getElementById('tech-list-grid');
const reportYearSelect = document.getElementById('report-year');
const printReportBtn = document.getElementById('print-report-btn');
const reportPeriodLabel = document.getElementById('report-period-label');
const reportGeneratedAt = document.getElementById('report-generated-at');
const yearlyReportTableBody = document.getElementById('yearly-report-table-body');
const yearlyReportTableFoot = document.getElementById('yearly-report-table-foot');
const yearlyTotalCount = document.getElementById('yearly-total-count');
const yearlyCompletedCount = document.getElementById('yearly-completed-count');
const yearlyCompletionRate = document.getElementById('yearly-completion-rate');
const yearlyOpenCount = document.getElementById('yearly-open-count');
const yearlyUrgentCount = document.getElementById('yearly-urgent-count');

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
  try {
    const ticketsWithoutPhotos = tickets.map(t => {
      const { photo, afterPhoto, ...rest } = t;
      return rest;
    });
    localStorage.setItem('it_tickets', JSON.stringify(ticketsWithoutPhotos));
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

function getPhotoSlotConfig(slot) {
  return slot === 'after'
    ? { property: 'afterPhoto', loadedFlag: 'afterPhotoLoaded', column: 'after_photo', title: 'รูปหลังซ่อม' }
    : { property: 'photo', loadedFlag: 'photoLoaded', column: 'photo', title: 'รูปหลักฐาน' };
}

async function loadTicketPhoto(ticket, slot) {
  const config = getPhotoSlotConfig(slot);
  const cachedUrl = safeImageUrl(ticket[config.property]);
  if (cachedUrl || ticket[config.loadedFlag] === true) return cachedUrl;

  if (!useSupabase || !supabaseClient) {
    ticket[config.loadedFlag] = true;
    return '';
  }

  const { data, error } = await supabaseClient
    .from('tickets')
    .select(config.column)
    .eq('id', ticket.id)
    .maybeSingle();

  if (error) throw error;

  ticket[config.property] = data?.[config.column] || '';
  ticket[config.loadedFlag] = true;
  return safeImageUrl(ticket[config.property]);
}

async function showTicketPhoto(ticket, slot, button) {
  const config = getPhotoSlotConfig(slot);
  const label = button?.querySelector('.photo-action-label');
  const originalLabel = label?.textContent || 'ดูรูป';

  if (button) button.disabled = true;
  if (label) label.textContent = 'กำลังโหลด...';

  try {
    const imageUrl = await loadTicketPhoto(ticket, slot);
    if (!imageUrl) {
      alert(`รายการนี้ไม่มี${config.title}`);
      return;
    }
    showLightbox(imageUrl, `${config.title}: ${ticket.id}`);
  } catch (error) {
    console.error('Failed to load ticket photo:', error);
    alert('โหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
  } finally {
    if (button) button.disabled = false;
    if (label) label.textContent = originalLabel;
  }
}

function setLoginError(message) {
  loginErrorText.textContent = message;
  loginErrorMsg.style.display = 'block';
}

function requireAdmin() {
  if (isAdminLoggedIn) return true;
  alert('กรุณาเข้าสู่ระบบเจ้าหน้าที่ก่อนดำเนินการ');
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
      if (beforePhotoUrl || t.photoLoaded !== true) {
        beforePhotoHTML = `
          <button type="button" class="img-preview-trigger lazy-photo-trigger" data-image-slot="before">
            <i class="fa-regular fa-image" aria-hidden="true"></i>
            <span class="photo-action-label">ดูรูป</span>
          </button>
        `;
      }
      
      let afterPhotoHTML = `<span class="no-image-placeholder">ไม่มีรูป</span>`;
      if (afterPhotoUrl || t.afterPhotoLoaded !== true) {
        afterPhotoHTML = `
          <button type="button" class="img-preview-trigger lazy-photo-trigger" data-image-slot="after">
            <i class="fa-regular fa-image" aria-hidden="true"></i>
            <span class="photo-action-label">ดูรูป</span>
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
        beforeImageButton.addEventListener('click', () => showTicketPhoto(t, 'before', beforeImageButton));
      }

      const afterImageButton = card.querySelector('[data-image-slot="after"]');
      if (afterImageButton) {
        afterImageButton.addEventListener('click', () => showTicketPhoto(t, 'after', afterImageButton));
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
const thaiMonthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

function getValidTicketDate(ticket) {
  const date = new Date(ticket.date);
  return Number.isNaN(date.getTime()) ? null : date;
}

function populateReportYearOptions() {
  if (!reportYearSelect) return;

  const currentYear = new Date().getFullYear();
  const years = new Set([currentYear]);
  tickets.forEach(ticket => {
    const date = getValidTicketDate(ticket);
    if (date) years.add(date.getFullYear());
  });

  const sortedYears = [...years].sort((a, b) => b - a);
  const previousValue = Number(reportYearSelect.value);
  reportYearSelect.innerHTML = sortedYears
    .map(year => `<option value="${year}">พ.ศ. ${year + 543} (ค.ศ. ${year})</option>`)
    .join('');

  if (sortedYears.includes(previousValue)) {
    reportYearSelect.value = String(previousValue);
  } else {
    reportYearSelect.value = String(sortedYears[0]);
  }
}

function getSelectedReportYear() {
  const selectedYear = Number(reportYearSelect?.value);
  return Number.isInteger(selectedYear) ? selectedYear : new Date().getFullYear();
}

function getTicketsForSelectedYear() {
  const selectedYear = getSelectedReportYear();
  return tickets.filter(ticket => {
    const date = getValidTicketDate(ticket);
    return date && date.getFullYear() === selectedYear;
  });
}

function countReportStatuses(reportTickets) {
  return {
    pending: reportTickets.filter(ticket => ticket.status === 'pending').length,
    processing: reportTickets.filter(ticket => ticket.status === 'processing').length,
    completed: reportTickets.filter(ticket => ticket.status === 'completed').length,
    urgent: reportTickets.filter(ticket => ticket.priority === 'เร่งด่วน').length
  };
}

function renderYearlySummary(reportTickets) {
  const selectedYear = getSelectedReportYear();
  const yearBE = selectedYear + 543;
  const totals = countReportStatuses(reportTickets);
  const completionRate = reportTickets.length
    ? Math.round((totals.completed / reportTickets.length) * 100)
    : 0;

  reportPeriodLabel.textContent = `รายงานผลการดำเนินงาน ประจำปี พ.ศ. ${yearBE} (ค.ศ. ${selectedYear})`;
  reportGeneratedAt.textContent = `จัดทำเมื่อ ${new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date())}`;
  yearlyTotalCount.textContent = reportTickets.length;
  yearlyCompletedCount.textContent = totals.completed;
  yearlyCompletionRate.textContent = `คิดเป็น ${completionRate}%`;
  yearlyOpenCount.textContent = totals.pending + totals.processing;
  yearlyUrgentCount.textContent = totals.urgent;

  const monthlyRows = thaiMonthNames.map((monthName, monthIndex) => {
    const monthTickets = reportTickets.filter(ticket => getValidTicketDate(ticket)?.getMonth() === monthIndex);
    const counts = countReportStatuses(monthTickets);
    const rate = monthTickets.length ? Math.round((counts.completed / monthTickets.length) * 100) : 0;
    return `
      <tr>
        <td>${monthName}</td>
        <td>${monthTickets.length}</td>
        <td>${counts.pending}</td>
        <td>${counts.processing}</td>
        <td>${counts.completed}</td>
        <td>${counts.urgent}</td>
        <td>${rate}%</td>
      </tr>
    `;
  }).join('');

  yearlyReportTableBody.innerHTML = monthlyRows;
  yearlyReportTableFoot.innerHTML = `
    <tr>
      <th>รวมทั้งปี</th>
      <th>${reportTickets.length}</th>
      <th>${totals.pending}</th>
      <th>${totals.processing}</th>
      <th>${totals.completed}</th>
      <th>${totals.urgent}</th>
      <th>${completionRate}%</th>
    </tr>
  `;
}

function refreshAdminDashboard() {
  renderYearlySummary(getTicketsForSelectedYear());
  ensureChartJsLoaded()
    .then(renderDashboardCharts)
    .catch(error => console.error('Chart.js load failed:', error));
}

function renderDashboardCharts() {
  const reportTickets = getTicketsForSelectedYear();
  renderYearlySummary(reportTickets);

  if (typeof Chart === 'undefined') {
    console.warn('Chart.js library is not available.');
    return;
  }

  // 1. Prepare Status Distribution Data
  const pendingCount = reportTickets.filter(t => t.status === 'pending').length;
  const processingCount = reportTickets.filter(t => t.status === 'processing').length;
  const completedCount = reportTickets.filter(t => t.status === 'completed').length;

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
  const deviceCounts = devices.map(d => reportTickets.filter(t => t.deviceType === d).length);

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
  reportTickets.forEach(t => {
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
  renderTechniciansList(reportTickets);
}

// Render dynamic workload stats for each technician
function renderTechniciansList(reportTickets = tickets) {
  if (!techListGrid) return;
  
  techListGrid.innerHTML = '';
  
  techniciansList.forEach(tech => {
    // Count stats from tickets array
    const inProgressCount = reportTickets.filter(t => t.assignee === tech.name && t.status === 'processing').length;
    const completedCount = reportTickets.filter(t => t.assignee === tech.name && t.status === 'completed').length;
    
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
    populateReportYearOptions();
    refreshAdminDashboard();
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
    serviceHomePanel.classList.remove('hidden');
    ticketsListSection.classList.add('hidden');
    internetRegistrationSection.classList.add('hidden');
    adminOverviewPanel.classList.add('hidden');
    adminModeBanner.classList.add('hidden');
    openNewTicketBtn.classList.add('hidden');
    repairBackHomeBtn.classList.remove('hidden');
  } 
  else if (mode === 'admin-manage') {
    currentRole = 'admin';
    tabAdminBtn.classList.add('active');
    serviceHomePanel.classList.add('hidden');
    ticketsListSection.classList.remove('hidden');
    internetRegistrationSection.classList.add('hidden');
    adminOverviewPanel.classList.add('hidden');
    adminModeBanner.classList.remove('hidden');
    openNewTicketBtn.classList.remove('hidden');
    repairBackHomeBtn.classList.add('hidden');
    document.getElementById('admin-banner-text').innerHTML = `
      <strong>โหมดจัดการงานซ่อม (แอดมิน):</strong> คุณสามารถคลิกเปลี่ยนสถานะใต้การ์ด หรือกดแก้ไข/ลบข้อมูลได้โดยตรงที่ใบงานซ่อม
    `;
  } 
  else if (mode === 'admin-dashboard') {
    currentRole = 'admin';
    tabDashboardBtn.classList.add('active');
    serviceHomePanel.classList.add('hidden');
    ticketsListSection.classList.add('hidden');
    internetRegistrationSection.classList.add('hidden');
    adminOverviewPanel.classList.remove('hidden');
    adminModeBanner.classList.remove('hidden');
    openNewTicketBtn.classList.add('hidden');
    document.getElementById('admin-banner-text').innerHTML = `
      <strong>ภาพรวมแอดมิน:</strong> เลือกปีเพื่อดูสรุปผล และกดพิมพ์รายงานประจำปีได้
    `;
    
    // Draw / refresh the Chart.js visualisations
    populateReportYearOptions();
    setTimeout(refreshAdminDashboard, 50); // slight timeout to allow panel display transitions
  }
  
  // Re-render matching current permissions view
  renderTickets();
}

// ----------------------------------------------------
// 6.5 User service navigation and internet registration
// ----------------------------------------------------
const INTERNET_DRAFT_KEY = 'it_repair_desk_internet_registration_draft_v1';
const internetFieldMap = {
  agency: 'internet-agency',
  documentNo: 'internet-document-no',
  documentDate: 'internet-document-date',
  fullname: 'internet-fullname',
  airforceId: 'internet-airforce-id',
  nationalId: 'internet-national-id',
  position: 'internet-position',
  affiliation: 'internet-affiliation',
  internalPhone: 'internet-internal-phone',
  phone: 'internet-phone',
  deviceType: 'internet-device-type',
  deviceBrand: 'internet-device-brand',
  macAddress: 'internet-mac-address',
  location: 'internet-location'
};

function formatThaiDocumentDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(date);
}

function getInternetFormData() {
  const data = {};
  Object.entries(internetFieldMap).forEach(([key, id]) => {
    data[key] = document.getElementById(id).value.trim();
  });
  data.consent = document.getElementById('internet-consent').checked;
  return data;
}

function renderInternetPrintSheet() {
  const data = getInternetFormData();
  Object.keys(internetFieldMap).forEach((key) => {
    const displayValue = key === 'documentDate' ? formatThaiDocumentDate(data[key]) : data[key];
    internetPrintSheet.querySelectorAll(`[data-print-field="${key}"]`).forEach((element) => {
      element.textContent = displayValue || '';
    });
  });
}

function saveInternetDraft() {
  const data = getInternetFormData();
  try {
    localStorage.setItem(INTERNET_DRAFT_KEY, JSON.stringify(data));
    internetDraftStatus.classList.add('saved');
    window.clearTimeout(saveInternetDraft.statusTimer);
    saveInternetDraft.statusTimer = window.setTimeout(() => internetDraftStatus.classList.remove('saved'), 1200);
  } catch (error) {
    console.warn('Could not save internet registration draft:', error);
  }
  renderInternetPrintSheet();
}

function loadInternetDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(INTERNET_DRAFT_KEY) || '{}');
    Object.entries(internetFieldMap).forEach(([key, id]) => {
      if (typeof saved[key] === 'string') document.getElementById(id).value = saved[key];
    });
    document.getElementById('internet-consent').checked = Boolean(saved.consent);
  } catch (error) {
    console.warn('Could not load internet registration draft:', error);
  }

  const dateInput = document.getElementById('internet-document-date');
  if (!dateInput.value) dateInput.value = new Date().toISOString().slice(0, 10);
  renderInternetPrintSheet();
}

function showUserService(service) {
  if (isAdminLoggedIn) return;
  exitInternetPrintPreview();
  serviceHomePanel.classList.toggle('hidden', service !== 'home');
  ticketsListSection.classList.toggle('hidden', service !== 'repair');
  internetRegistrationSection.classList.toggle('hidden', service !== 'internet');
  adminOverviewPanel.classList.add('hidden');
  adminModeBanner.classList.add('hidden');
  openNewTicketBtn.classList.toggle('hidden', service !== 'repair');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function finishInternetPrint() {
  document.body.classList.remove('printing-internet-form');
}

function getMissingInternetFields() {
  return Array.from(internetRegistrationForm.elements)
    .filter((field) => field.required && !field.checkValidity())
    .map((field) => {
      const label = internetRegistrationForm.querySelector(`label[for="${field.id}"]`);
      if (field.id === 'internet-consent') return 'การยืนยันรับทราบเงื่อนไข';
      return label ? label.textContent.replace('*', '').trim() : 'ข้อมูลที่จำเป็น';
    });
}

function enterInternetPrintPreview() {
  saveInternetDraft();
  const missingFields = getMissingInternetFields();
  internetPrintValidationNote.textContent = missingFields.length
    ? `ยังไม่ได้กรอก ${missingFields.length} รายการ: ${missingFields.join(', ')} — สามารถกลับไปกรอกเพิ่ม หรือพิมพ์แบบฟอร์มเปล่าได้`
    : 'ข้อมูลที่จำเป็นครบแล้ว ตรวจสอบเอกสารด้านล่างก่อนสั่งพิมพ์';
  internetPrintValidationNote.classList.toggle('has-warning', missingFields.length > 0);
  internetWorkspace.classList.add('hidden');
  internetPrintToolbar.classList.remove('hidden');
  document.body.classList.add('internet-print-preview-mode');
  internetPrintToolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function exitInternetPrintPreview() {
  if (!internetWorkspace || !internetPrintToolbar) return;
  internetWorkspace.classList.remove('hidden');
  internetPrintToolbar.classList.add('hidden');
  document.body.classList.remove('internet-print-preview-mode');
  finishInternetPrint();
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
    tickets[index].afterPhotoLoaded = true;
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

// Admin opens edit modal. Existing photos are loaded only for this ticket.
async function openEditModal(ticketId) {
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
  const submitBtn = editTicketForm.querySelector('button[type="submit"]');
  const originalSubmitText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังโหลดข้อมูลรูป...';
  submitBtn.disabled = true;
  tempEditPhoto = '';
  tempEditAfterPhoto = '';
  tempEditFile = null;
  tempEditAfterFile = null;
  editPhotoChanged = false;
  editAfterPhotoChanged = false;
  editPhotoPreviewContainer.classList.add('hidden');
  editAfterPreviewContainer.classList.add('hidden');
  openModal(editTicketModal);

  try {
    const [beforePhoto, afterPhoto] = await Promise.all([
      loadTicketPhoto(ticket, 'before'),
      loadTicketPhoto(ticket, 'after')
    ]);

    // Ignore a late response if another ticket was opened in the meantime.
    if (document.getElementById('edit-ticket-id').value !== ticket.id) return;

    tempEditPhoto = beforePhoto;
    tempEditAfterPhoto = afterPhoto;
    if (beforePhoto) {
      editPhotoPreview.src = beforePhoto;
      editPhotoPreviewContainer.classList.remove('hidden');
    }
    if (afterPhoto) {
      editAfterPreview.src = afterPhoto;
      editAfterPreviewContainer.classList.remove('hidden');
    }

    submitBtn.innerHTML = originalSubmitText;
    submitBtn.disabled = false;
  } catch (error) {
    console.error('Failed to load photos for editing:', error);
    submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> โหลดรูปไม่สำเร็จ';
    alert('ไม่สามารถโหลดข้อมูลรูปเดิมได้ กรุณาปิดหน้าต่างแล้วลองใหม่อีกครั้ง');
  }
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

chooseRepairServiceBtn.addEventListener('click', () => showUserService('repair'));
chooseInternetServiceBtn.addEventListener('click', () => showUserService('internet'));
repairBackHomeBtn.addEventListener('click', () => showUserService('home'));
internetBackHomeBtn.addEventListener('click', () => showUserService('home'));

internetRegistrationForm.addEventListener('input', saveInternetDraft);
internetRegistrationForm.addEventListener('change', saveInternetDraft);
internetRegistrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  enterInternetPrintPreview();
});

editInternetFormBtn.addEventListener('click', () => {
  exitInternetPrintPreview();
  internetRegistrationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

printInternetNowBtn.addEventListener('click', () => {
  document.body.classList.add('printing-internet-form');
  window.setTimeout(() => window.print(), 60);
  window.setTimeout(finishInternetPrint, 3000);
});

clearInternetFormBtn.addEventListener('click', () => {
  if (!confirm('ต้องการล้างข้อมูลในใบลงทะเบียนอินเทอร์เน็ตทั้งหมดหรือไม่?')) return;
  internetRegistrationForm.reset();
  try {
    localStorage.removeItem(INTERNET_DRAFT_KEY);
  } catch (error) {
    console.warn('Could not clear internet registration draft:', error);
  }
  document.getElementById('internet-document-date').value = new Date().toISOString().slice(0, 10);
  renderInternetPrintSheet();
});

window.addEventListener('afterprint', finishInternetPrint);

reportYearSelect.addEventListener('change', refreshAdminDashboard);

printReportBtn.addEventListener('click', () => {
  if (!requireAdmin()) return;
  renderDashboardCharts();
  document.body.classList.add('printing-yearly-report');
  window.setTimeout(() => window.print(), 60);
  window.setTimeout(() => document.body.classList.remove('printing-yearly-report'), 3000);
});

// Login & Logout switches
tabLoginBtn.addEventListener('click', () => {
  adminPasswordInput.value = '';
  loginErrorMsg.style.display = 'none';
  openModal(adminLoginModal);
});

tabLogoutBtn.addEventListener('click', () => {
  if (confirm('คุณต้องการออกจากระบบเจ้าหน้าที่หรือไม่?')) {
    isAdminLoggedIn = false;
    try {
      sessionStorage.removeItem('is_admin_logged_in');
    } catch (e) {
      console.warn("Could not remove from sessionStorage:", e);
    }
    setRoleMode('user');
  }
});

// Simple password gate for this single-admin internal deployment.
// This is a UI convenience only; a static website cannot keep this password secret.
adminLoginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const password = adminPasswordInput.value.trim();

  if (password === '36335') {
    isAdminLoggedIn = true;
    try {
      sessionStorage.setItem('is_admin_logged_in', 'true');
    } catch (e) {
      console.warn("Could not save session state:", e);
    }
    closeModal('admin-login-modal');
    setRoleMode('admin-manage');
  } else {
    setLoginError('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
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

async function optimizeImageForUpload(file) {
  if (!file || typeof createImageBitmap !== 'function') return file;

  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 1600;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 0.8));
    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'ticket-photo';
    return new File([blob], `${baseName}.webp`, { type: 'image/webp' });
  } catch (error) {
    console.warn('Image optimization skipped:', error);
    return file;
  }
}

// Helper to optimize and upload image to Supabase Storage
async function uploadImageToSupabase(file) {
  if (!useSupabase || !supabaseClient || !file) return null;
  try {
    const optimizedFile = await optimizeImageForUpload(file);
    const fileExt = optimizedFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabaseClient.storage
      .from('ticket-images')
      .upload(filePath, optimizedFile, { contentType: optimizedFile.type });

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
  (data) => { tempEditPhoto = data; editPhotoChanged = true; },
  (file) => tempEditFile = file);
handleImageFileSelect(editAfterPhotoInput, editAfterPreviewContainer, editAfterPreview,
  (data) => { tempEditAfterPhoto = data; editAfterPhotoChanged = true; },
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
  editPhotoChanged = true;
  editPhotoInput.value = '';
  editPhotoPreviewContainer.classList.add('hidden');
  editPhotoPreview.src = '';
});

removeEditAfterPhotoBtn.addEventListener('click', () => {
  tempEditAfterPhoto = '';
  tempEditAfterFile = null;
  editAfterPhotoChanged = true;
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
  
  // Keep Base64 only for offline/local mode. Supabase stores a compact file URL.
  let photoData = '';
  
  if (tempUploadFile && useSupabase && supabaseClient) {
    const submitBtn = newTicketForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอัปโหลดรูปภาพ...';
    submitBtn.disabled = true;

    const uploadedUrl = await uploadImageToSupabase(tempUploadFile);
    if (!uploadedUrl) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      alert('อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      return;
    }
    photoData = uploadedUrl;

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  } else if (tempUploadFile) {
    photoData = tempUploadPhoto;
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
    photoLoaded: true,
    assignee: '',
    repairResult: '',
    afterPhoto: '',
    afterPhotoLoaded: true
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
  tickets[index].afterPhotoLoaded = true;
  
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

  let afterPhotoData = '';

  // Handle actual file upload if present
  if (tempUploadAfterFile && useSupabase && supabaseClient) {
    const submitBtn = completeJobForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอัปโหลดรูปภาพ...';
    submitBtn.disabled = true;
    
    const uploadedUrl = await uploadImageToSupabase(tempUploadAfterFile);
    if (!uploadedUrl) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      alert('อัปโหลดรูปหลังซ่อมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      return;
    }
    afterPhotoData = uploadedUrl;
    
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  } else if (tempUploadAfterFile) {
    afterPhotoData = tempUploadAfterPhoto;
  }

  tickets[index].status = 'completed';
  tickets[index].assignee = assignee || 'ช่างไอที';
  tickets[index].repairResult = repairResult;
  tickets[index].afterPhoto = afterPhotoData;
  tickets[index].afterPhotoLoaded = true;

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
  const originalPhoto = tickets[index].photo;
  const originalAfterPhoto = tickets[index].afterPhoto;

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
  }

  // Assign image updates
  tickets[index].photo = tempEditPhoto;
  tickets[index].afterPhoto = tempEditAfterPhoto;
  tickets[index].photoLoaded = true;
  tickets[index].afterPhotoLoaded = true;

  if (useSupabase && supabaseClient) {
    const submitBtn = editTicketForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    if (tempEditFile || tempEditAfterFile) {
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอัปโหลดรูปภาพ...';
      submitBtn.disabled = true;
    }
    
    if (tempEditFile) {
      const uploadedUrl = await uploadImageToSupabase(tempEditFile);
      if (!uploadedUrl) {
        tickets[index].photo = originalPhoto;
        tickets[index].afterPhoto = originalAfterPhoto;
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('อัปโหลดรูปหลักฐานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        return;
      }
      tickets[index].photo = uploadedUrl;
    }
    if (tempEditAfterFile) {
      const uploadedUrl = await uploadImageToSupabase(tempEditAfterFile);
      if (!uploadedUrl) {
        tickets[index].photo = originalPhoto;
        tickets[index].afterPhoto = originalAfterPhoto;
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('อัปโหลดรูปหลังซ่อมไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        return;
      }
      tickets[index].afterPhoto = uploadedUrl;
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
    const updatePayload = {
      reporter: t.reporter,
      dept: t.dept,
      device_type: t.deviceType,
      model: t.model,
      priority: t.priority,
      status: t.status,
      subject: t.subject,
      detail: t.detail,
      assignee: t.assignee,
      repair_result: t.repairResult
    };
    if (editPhotoChanged) updatePayload.photo = t.photo;
    if (editAfterPhotoChanged) updatePayload.after_photo = t.afterPhoto;

    supabaseClient.from('tickets').update(updatePayload).eq('id', t.id).then(({ error }) => {
      if (error) console.error("Supabase update failed:", error);
    });
  }
});

// ----------------------------------------------------
// 11. Initial On-Load Trigger
// ----------------------------------------------------
async function initApp() {
  // Paint cached text data immediately, then refresh from Supabase in the background.
  loadInternetDraft();
  updateStatistics();
  setRoleMode(isAdminLoggedIn ? 'admin-manage' : 'user');

  if (useSupabase && supabaseClient) {
    await fetchTicketsFromSupabase();
    saveStateAndRender();
  }
}

// Boot
window.addEventListener('DOMContentLoaded', initApp);
