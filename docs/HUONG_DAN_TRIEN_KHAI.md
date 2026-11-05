# Hướng dẫn triển khai & cập nhật nội dung

## A. Lần đầu: đưa lên GitHub bằng GitHub Desktop
1. Mở **GitHub Desktop** → **File → Add local repository…** → chọn `C:\Users\hungh\Downloads\Ebook\audit-learning-hub` → **Add repository** (repo đã có sẵn lịch sử commit).
2. Bấm **Publish repository** (thanh trên cùng).
   - Name: `audit-learning-hub`
   - **Tick "Keep this code private"** (repo chứa ebook gốc trong `source/` và lời giải case Biscore).
   - Bấm **Publish repository**.
3. Kiểm tra trên github.com: repo có thư mục `src/`, `source/`, `docs/`, file `package.json`, `package-lock.json`, `vercel.json`.

## B. Lần đầu: kết nối Vercel
1. Vào **vercel.com** → đăng nhập bằng tài khoản GitHub → **Add New… → Project**.
2. Ở *Import Git Repository*, bấm **Adjust GitHub App Permissions** nếu chưa thấy repo, cấp quyền cho `audit-learning-hub` → **Import**.
3. Màn hình cấu hình: Vercel tự nhận **Framework Preset: Astro** (file `vercel.json` đã khai báo sẵn: install `npm ci`, build `npm run build`, output `dist`). Không cần đổi gì, không cần biến môi trường.
4. Bấm **Deploy**. Khoảng 1–2 phút sau có link dạng `audit-learning-hub-xxxx.vercel.app`.
5. (Khuyến nghị) **Settings → Deployment Protection**: bật bảo vệ nếu gói tài khoản cho phép, để chỉ người có quyền mới xem được. Site đã đặt `noindex` và `robots.txt` chặn công cụ tìm kiếm, nhưng ai có link vẫn mở được.

## C. Cập nhật nội dung về sau
1. Sửa hoặc thêm bài trong `src/content/docs/` theo `docs/LESSON_GUIDE.md` (hoặc nhờ Claude dùng skill `build-lesson`).
2. Ghi thay đổi vào `docs/CHANGELOG.md` (trang "Mới cập nhật" đọc trực tiếp file này).
3. Chạy thử: `npm install` (lần đầu) → `npm run build` phải không lỗi → `npm run dev`, mở http://localhost:4321.
4. Mở GitHub Desktop: thấy danh sách file thay đổi → ghi *Summary* (ví dụ "Thêm bài 3.8") → **Commit to main** → **Push origin**.
5. Vercel tự build và cập nhật site sau 1–2 phút. Xem trạng thái ở tab **Deployments**. Build lỗi thì site giữ bản cũ; mở log để xem lỗi (thường là thiếu trường frontmatter).

## D. Phương án dự phòng: Cloudflare Pages
Workers & Pages → Create → Pages → Connect to Git → chọn repo → Framework preset **Astro**, build command `npm run build`, output `dist`, biến môi trường `NODE_VERSION=22`.

## E. Lưu ý
- `source/` là nguồn gốc duy nhất; không sửa tay `source/ebooks/html`. Đồng bộ thư mục này lên Google Drive/NotebookLM khi có thay đổi.
- File thực hành công khai nằm ở `public/files/`. Không đặt dữ liệu nhạy cảm vào đây.
- Tiến độ, ghi chú người học lưu trên trình duyệt (localStorage); xuất/nhập JSON ở trang "Tiến độ & ghi chú". Khi mở cho nhiều người, thay `src/lib/store.ts` bằng backend Supabase (cùng cấu trúc dữ liệu).
