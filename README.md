# IT Repair Desk

ระบบแจ้งซ่อมแบบ Static Web ที่ใช้ Supabase สำหรับฐานข้อมูลและการเข้าสู่ระบบเจ้าหน้าที่

## ตั้งค่าความปลอดภัยก่อน Deploy

1. เปิด Supabase Dashboard > SQL Editor แล้วรัน `supabase-security.sql`
2. สร้างบัญชีเจ้าหน้าที่ใน Authentication > Users
3. คัดลอก UUID ของบัญชี แล้วเพิ่มลงตาราง `admin_users`:

   ```sql
   insert into public.admin_users (user_id)
   values ('STAFF_USER_UUID');
   ```

4. ตรวจว่า Row Level Security ของ `tickets` และ `admin_users` เปิดอยู่
5. ทดสอบว่า visitor สร้างใบงานสถานะ `pending` ได้ แต่ไม่สามารถอ่าน แก้ไข หรือลบรายการทั้งหมดผ่าน API
6. ทดสอบว่าเฉพาะบัญชีใน `admin_users` เท่านั้นที่เปิดหน้าจัดการงานและแก้ไขข้อมูลได้

`SUPABASE_ANON_KEY` เป็น publishable key สำหรับหน้าเว็บ จึงอยู่ใน JavaScript ได้ แต่ห้ามใส่ `service_role` key ใน repository หรือหน้าเว็บโดยเด็ดขาด

## การจัดเก็บรูป

Bucket `ticket-images` เดิมยังต้องมี Storage policy ที่เหมาะสมกับหน่วยงาน ก่อนใช้งานกับข้อมูลจริงควรเปลี่ยนเป็น private bucket และออก signed URL ให้เจ้าหน้าที่ แทนการเผยแพร่รูปด้วย public URL
