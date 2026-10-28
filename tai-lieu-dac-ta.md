<<<<<<< HEAD
# Đặc tả hệ thống — Bếp Nhà

**Phiên bản:** 1.0 · **Loại hệ thống:** Web quản lý nhà hàng đơn giản · **Ngôn ngữ giao diện:** Tiếng Việt

## 1. Mục tiêu và phạm vi

Bếp Nhà là ứng dụng web dùng tại nhà hàng để khách/nhân viên xem menu, ghi nhận đặt bàn, gọi món theo bàn và lập hóa đơn thanh toán. Đây là bản mẫu phục vụ môn Đánh giá hiệu năng; dữ liệu lưu cục bộ trong trình duyệt (`localStorage`), không có máy chủ, đăng nhập hoặc xử lý thanh toán tiền thật.

## 2. Vai trò và giả định

- **Khách/nhân viên:** xem menu, tạo đặt bàn, gọi món cho bàn đã đặt.
- **Thu ngân:** xem hóa đơn và xác nhận thanh toán.
- Có 8 bàn, mã Bàn 01–08. Giá món hiển thị bằng VND và được giả định đã gồm thuế/phí.
- Một đặt bàn chứa tên, số điện thoại, ngày, giờ, số khách và bàn.
- Đơn hàng gắn với bàn, gồm các món và số lượng. Thanh toán đóng đơn và giải phóng bàn.
- Dữ liệu demo nằm trên thiết bị/trình duyệt hiện tại; xóa dữ liệu trình duyệt sẽ xóa dữ liệu demo.

## 3. Chức năng

### F-01 — Xem menu

Hiển thị tên món, nhóm món, mô tả, nhãn, biểu tượng và giá. Cho phép lọc theo Tất cả, Khai vị, Món chính, Đồ uống, Tráng miệng. Người dùng có thể chuyển sang luồng gọi món từ menu.

### F-02 — Đặt bàn

Nhập tên, số điện thoại, ngày, giờ, số lượng khách; chọn một trong tám bàn; xác nhận để tạo lượt đặt. Hiển thị các lượt đặt gần đây và trạng thái. Bàn đang có đặt chưa thanh toán được đánh dấu đã đặt.

### F-03 — Đặt món theo bàn

Chọn bàn đã đặt, thêm món từ menu, tăng/giảm số lượng và xem tạm tính. Giá dòng món bằng đơn giá × số lượng.

### F-04 — Thanh toán

Chọn bàn có hóa đơn, xem các món, số lượng và tổng cộng; chọn phương thức (tiền mặt, thẻ, chuyển khoản); xác nhận để đóng hóa đơn và giải phóng bàn.

## 4. Quy tắc nghiệp vụ mong muốn

1. Tên khách và số điện thoại là bắt buộc; điện thoại cần có định dạng hợp lệ.
2. Ngày đặt không được ở quá khứ.
3. Không được đặt trùng một bàn trong cùng ngày và khung giờ phục vụ.
4. Số khách phải phù hợp sức chứa bàn.
5. Chỉ bàn đang có đặt hợp lệ mới nhận được món; bàn đã thanh toán không được gọi thêm món.
6. Số lượng món là số nguyên dương; khi giảm về 0, dòng món được loại khỏi đơn.
7. Chỉ hóa đơn có món và tổng tiền lớn hơn 0 mới được thanh toán.
8. Ghi nhận phương thức thanh toán trong thông tin đơn đã đóng.
9. Số liệu “đặt bàn hôm nay” chỉ tính lượt đặt trong ngày hiện tại.
10. Giá và tổng tiền phải nhất quán trên menu, đơn gọi món và hóa đơn.

## 5. Dữ liệu chính

| Đối tượng  | Trường                                                    |
| ---------- | --------------------------------------------------------- |
| Món ăn     | mã, tên, nhóm, giá, mô tả, nhãn                           |
| Đặt bàn    | mã, tên khách, điện thoại, ngày, giờ, số khách, mã bàn    |
| Đơn hàng   | mã bàn, danh sách `{mã món, số lượng}`, tổng tiền         |
| Thanh toán | mã bàn/đơn, tổng tiền, phương thức, thời điểm, trạng thái |

## 6. Yêu cầu phi chức năng

- Giao diện tương thích màn hình máy tính và điện thoại.
- Các thao tác điều hướng và cập nhật dữ liệu phản hồi trực tiếp, không tải lại trang.
- Dữ liệu demo được lưu bền qua lần tải lại trang trên cùng trình duyệt.
- Dùng HTML/CSS/JavaScript thuần, không yêu cầu cài thư viện hay dịch vụ ngoài.
- Ứng dụng không gửi thông tin khách hàng ra mạng; không dùng để nhận thanh toán thật.

## 7. Ngoài phạm vi

Quản lý kho/nhân viên, phân quyền, đồng bộ nhiều thiết bị, máy in hóa đơn, tích hợp cổng thanh toán, cấu hình thực đơn từ màn hình quản trị, và báo cáo doanh thu.

## 8. Khởi chạy

Mở `index.html` bằng trình duyệt hiện đại. Có thể xóa dữ liệu demo bằng cách xóa khóa `bepnha-state` trong Local Storage của trang.
=======
# Đặc tả hệ thống — Bếp Nhà

**Phiên bản:** 1.0 · **Loại hệ thống:** Web quản lý nhà hàng đơn giản · **Ngôn ngữ giao diện:** Tiếng Việt

## 1. Mục tiêu và phạm vi

Bếp Nhà là ứng dụng web dùng tại nhà hàng để khách/nhân viên xem menu, ghi nhận đặt bàn, gọi món theo bàn và lập hóa đơn thanh toán. Đây là bản mẫu phục vụ môn Đánh giá hiệu năng; dữ liệu lưu cục bộ trong trình duyệt (`localStorage`), không có máy chủ, đăng nhập hoặc xử lý thanh toán tiền thật.

## 2. Vai trò và giả định

- **Khách/nhân viên:** xem menu, tạo đặt bàn, gọi món cho bàn đã đặt.
- **Thu ngân:** xem hóa đơn và xác nhận thanh toán.
- Có 8 bàn, mã Bàn 01–08. Giá món hiển thị bằng VND và được giả định đã gồm thuế/phí.
- Một đặt bàn chứa tên, số điện thoại, ngày, giờ, số khách và bàn.
- Đơn hàng gắn với bàn, gồm các món và số lượng. Thanh toán đóng đơn và giải phóng bàn.
- Dữ liệu demo nằm trên thiết bị/trình duyệt hiện tại; xóa dữ liệu trình duyệt sẽ xóa dữ liệu demo.

## 3. Chức năng

### F-01 — Xem menu

Hiển thị tên món, nhóm món, mô tả, nhãn, biểu tượng và giá. Cho phép lọc theo Tất cả, Khai vị, Món chính, Đồ uống, Tráng miệng. Người dùng có thể chuyển sang luồng gọi món từ menu.

### F-02 — Đặt bàn

Nhập tên, số điện thoại, ngày, giờ, số lượng khách; chọn một trong tám bàn; xác nhận để tạo lượt đặt. Hiển thị các lượt đặt gần đây và trạng thái. Bàn đang có đặt chưa thanh toán được đánh dấu đã đặt.

### F-03 — Đặt món theo bàn

Chọn bàn đã đặt, thêm món từ menu, tăng/giảm số lượng và xem tạm tính. Giá dòng món bằng đơn giá × số lượng.

### F-04 — Thanh toán

Chọn bàn có hóa đơn, xem các món, số lượng và tổng cộng; chọn phương thức (tiền mặt, thẻ, chuyển khoản); xác nhận để đóng hóa đơn và giải phóng bàn.

## 4. Quy tắc nghiệp vụ mong muốn

1. Tên khách và số điện thoại là bắt buộc; điện thoại cần có định dạng hợp lệ.
2. Ngày đặt không được ở quá khứ.
3. Không được đặt trùng một bàn trong cùng ngày và khung giờ phục vụ.
4. Số khách phải phù hợp sức chứa bàn.
5. Chỉ bàn đang có đặt hợp lệ mới nhận được món; bàn đã thanh toán không được gọi thêm món.
6. Số lượng món là số nguyên dương; khi giảm về 0, dòng món được loại khỏi đơn.
7. Chỉ hóa đơn có món và tổng tiền lớn hơn 0 mới được thanh toán.
8. Ghi nhận phương thức thanh toán trong thông tin đơn đã đóng.
9. Số liệu “đặt bàn hôm nay” chỉ tính lượt đặt trong ngày hiện tại.
10. Giá và tổng tiền phải nhất quán trên menu, đơn gọi món và hóa đơn.

## 5. Dữ liệu chính

| Đối tượng  | Trường                                                    |
| ---------- | --------------------------------------------------------- |
| Món ăn     | mã, tên, nhóm, giá, mô tả, nhãn                           |
| Đặt bàn    | mã, tên khách, điện thoại, ngày, giờ, số khách, mã bàn    |
| Đơn hàng   | mã bàn, danh sách `{mã món, số lượng}`, tổng tiền         |
| Thanh toán | mã bàn/đơn, tổng tiền, phương thức, thời điểm, trạng thái |

## 6. Yêu cầu phi chức năng

- Giao diện tương thích màn hình máy tính và điện thoại.
- Các thao tác điều hướng và cập nhật dữ liệu phản hồi trực tiếp, không tải lại trang.
- Dữ liệu demo được lưu bền qua lần tải lại trang trên cùng trình duyệt.
- Dùng HTML/CSS/JavaScript thuần, không yêu cầu cài thư viện hay dịch vụ ngoài.
- Ứng dụng không gửi thông tin khách hàng ra mạng; không dùng để nhận thanh toán thật.

## 7. Ngoài phạm vi

Quản lý kho/nhân viên, phân quyền, đồng bộ nhiều thiết bị, máy in hóa đơn, tích hợp cổng thanh toán, cấu hình thực đơn từ màn hình quản trị, và báo cáo doanh thu.

## 8. Khởi chạy

Mở `index.html` bằng trình duyệt hiện đại. Có thể xóa dữ liệu demo bằng cách xóa khóa `bepnha-state` trong Local Storage của trang.
>>>>>>> ca291255b92bf6dd5ff809b27023fe4569ac724e
