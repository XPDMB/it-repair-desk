const required = ['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','LINE_CHANNEL_ACCESS_TOKEN','LINE_TARGET_ID'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.log(`LINE reminder skipped. Configure repository secrets: ${missing.join(', ')}`);
  process.exit(0);
}

const supabaseUrl = process.env.SUPABASE_URL.replace(/\/$/, '');
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const lineToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const lineTargetId = process.env.LINE_TARGET_ID;
const repairDeskUrl = process.env.REPAIR_DESK_URL || 'https://xpdmb.github.io/it-repair-desk/';

const query = new URLSearchParams({
  select: 'id,device_type,model,status,priority,date,assignee',
  status: 'neq.completed',
  order: 'date.asc'
});
const response = await fetch(`${supabaseUrl}/rest/v1/tickets?${query}`, {
  headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` }
});
if (!response.ok) throw new Error(`Supabase request failed (${response.status}): ${await response.text()}`);

const tickets = await response.json();
if (!tickets.length) {
  console.log('No pending repair tickets. LINE message skipped.');
  process.exit(0);
}
const statusLabel = (status) => ({ pending: 'รอรับเรื่อง', processing: 'กำลังซ่อม' }[status] || status);
const ageInDays = (dateString) => {
  const created = new Date(dateString);
  if (Number.isNaN(created.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - created.getTime()) / 86400000));
};
const pending = tickets.filter((ticket) => ticket.status === 'pending').length;
const processing = tickets.filter((ticket) => ticket.status === 'processing').length;
const urgent = tickets.filter((ticket) => ticket.priority === 'เร่งด่วน').length;
const details = tickets.slice(0, 10).map((ticket, index) => {
  const device = [ticket.device_type, ticket.model].filter(Boolean).join(' · ');
  const assignee = ticket.assignee ? ` · ${ticket.assignee}` : '';
  return `${index + 1}. ${ticket.id} | ${device || 'ไม่ระบุอุปกรณ์'}\n   ${statusLabel(ticket.status)} · ค้าง ${ageInDays(ticket.date)} วัน${assignee}`;
});
const more = tickets.length > details.length ? `\n…และอีก ${tickets.length - details.length} รายการ` : '';
const message = [
  '🔔 แจ้งเตือนงานซ่อมค้าง',
  `มีเครื่องค้างซ่อมทั้งหมด ${tickets.length} รายการ`,
  `• รอรับเรื่อง ${pending} รายการ`,
  `• กำลังซ่อม ${processing} รายการ`,
  `• งานเร่งด่วน ${urgent} รายการ`,
  '', ...details, more, '', `เปิดระบบ: ${repairDeskUrl}`
].filter(Boolean).join('\n').slice(0, 4900);

const lineResponse = await fetch('https://api.line.me/v2/bot/message/push', {
  method: 'POST',
  headers: { Authorization: `Bearer ${lineToken}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ to: lineTargetId, messages: [{ type: 'text', text: message }] })
});
if (!lineResponse.ok) throw new Error(`LINE request failed (${lineResponse.status}): ${await lineResponse.text()}`);
console.log(`LINE reminder sent for ${tickets.length} pending repair tickets.`);
