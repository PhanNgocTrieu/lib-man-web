# 📚 Kế hoạch Xây dựng NTC Library (Web Quản lý Thư viện)

## 🌟 Tổng Quan (Overview)

Xây dựng một hệ thống quản lý thư viện hiện đại (NTC Library), tập trung vào giao diện đẹp (Premium Design), trải nghiệm người dùng mượt mà và tối ưu hóa quy trình quản lý sách, độc giả, và mượn trả.

## 🛠 Công Nghệ (Tech Stack)

_Dự kiến sử dụng các công nghệ hiện đại nhất:_

- **Frontend**: Next.js 14+ (App Router), React, TypeScript.
- **Styling**: Tailwind CSS (Custom Design System for Premium feel).
- **Icons**: Lucide React / Heroicons.
- **Database & Auth**: (Sẽ xác định cụ thể khi triển khai - ví dụ: Firebase hoặc Supabase).

## 🚀 Lộ Trình Phát Triển (Roadmap)

### Giai đoạn 1: Khởi tạo & Cơ sở hạ tầng (Foundation)

- [x] Thiết lập dự án Next.js, cấu hình Tailwind CSS, Font chữ, Dark/Light mode theme.
- [x] Xây dựng Component UI cơ bản (Button, Input, Card, Modal...).
- [x] Thiết lập Layout: Layout Admin (Sidebar, Header) và Layout User (Public).
- [x] Hệ thống Xác thực: Đăng nhập, Đăng ký, Quên mật khẩu.

### Giai đoạn 2: Quản lý Tài nguyên (Core Resources)

- [x] **Quản lý Danh mục (Categories)**: Phân loại sách, thêm/sửa/xóa.
- [x] **Quản lý Sách (Books)**:
  - Quản lý thông tin chi tiết: Tên, Tác giả, ISBN, Giá, Số lượng, Vị trí.
  - Upload ảnh bìa sách.
  - Tìm kiếm và Lọc sách nâng cao.
- [x] **Quản lý Tác giả (Authors)**: Thông tin tác giả.

### Giai đoạn 3: Nghiệp vụ Thư viện (Business Operations)

- [x] **Quản lý Độc giả (Readers)**:
  - Hồ sơ độc giả, thẻ thư viện, lịch sử hoạt động.
- [x] **Quy trình Mượn - Trả (Circulation)**:
  - Tạo phiếu mượn sách.
  - Kiểm tra giới hạn sách được mượn.
  - Xử lý trả sách và tính toán phí phạt (nếu có).
  - Gia hạn sách.

### Giai đoạn 4: Quản trị & Báo cáo (Admin & Reporting)

- [x] **Dashboard Tổng quan**: Thống kê số lượng sách, lượt mượn trong tháng, sách quá hạn.
- [x] **Quản lý Nhân viên**: Phân quyền, tạo tài khoản thủ thư.
- [x] **Báo cáo (Reports)**: Báo cáo nhập xuất, thống kê sách hot.
- [x] **Cấu hình Hệ thống**: Quy định số ngày mượn, số sách tối đa, mức phạt.

### Giai đoạn 5: Tiện ích & Hoàn thiện (Polish & UX)

- [x] **Thông báo (Notifications)**: Email nhắc trả sách, thông báo hệ thống.
- [x] **Sao lưu & Bảo mật**: Nhật ký hệ thống (Audit Logs), Backup dữ liệu.
- [x] **User Portal**: Trang dành cho độc giả (tra cứu sách, xem lịch sử cá nhân).

---

## 📋 Chi Tiết Các Module Chính

### 1. Phân hệ Quản trị (Admin Portal)

Dành cho Thủ thư và Admin.

- **Dashboard**: Hiển thị nhanh các chỉ số quan trọng.
- **Kho Sách**: Giao diện dạng lưới/danh sách, hỗ trợ thao tác nhanh.
- **Quầy Mượn Trả**: Giao diện tối ưu để xử lý nhanh giao dịch check-in/check-out.
- **Cài đặt**: Tùy chỉnh tham số hệ thống mà không cần sửa code.

### 2. Phân hệ Độc giả (User Portal)

Dành cho người dùng tìm kiếm và xem thông tin.

- **Trang chủ**: Banner sự kiện, Sách mới nhập, Sách đọc nhiều.
- **Tìm kiếm**: Tìm theo tên, tác giả, danh mục.
- **Tủ sách của tôi**: Xem sách đang mượn, hạn trả.

## 🎨 Yêu cầu Giao diện (Design Requirements)

- **Phong cách**: Hiện đại, sạch sẽ, sử dụng khoảng trắng hợp lý.
- **Màu sắc**: Palette màu chuyên nghiệp (ví dụ: Deep Blue, Soft Gray, Accent Color nổi bật).
- **Tương tác**: Hiệu ứng hover mượt mà, loading skeletons, phản hồi tức thì.
