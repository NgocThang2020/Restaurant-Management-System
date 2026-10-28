# Bộ tình huống kiểm thử lỗi — Bếp Nhà

Tài liệu này dành cho người kiểm thử. Mỗi tình huống mô tả lỗi cần phát hiện, không đưa cách sửa. Trạng thái mong đợi được đối chiếu với đặc tả trong `SPEC.md`.

| ID     | Mức độ     | Chức năng  | Tiền đề / bước tái hiện                                                                     | Kết quả mong đợi                                                  |
| ------ | ---------- | ---------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| BUG-01 | Cao        | Đặt bàn    | Nhập tên hợp lệ, nhập số điện thoại `abc`, chọn ngày/giờ/bàn rồi xác nhận.                  | Hệ thống từ chối số điện thoại sai định dạng và thông báo rõ lỗi. |
| BUG-02 | Cao        | Đặt bàn    | Đặt Bàn 01 cho 2 khách ngày mai lúc 18:00; thử đặt lại Bàn 01 cùng ngày và giờ.             | Hệ thống phát hiện trùng khung giờ; không tạo lượt đặt thứ hai.   |
| BUG-03 | Cao        | Đặt bàn    | Đặt một bàn cho ngày mai; thử đặt lại chính bàn đó vào hôm nay ở giờ khác.                  | Hệ thống cho phép nếu ngày/giờ không trùng và bàn còn khả dụng.   |
| BUG-04 | Trung bình | Đặt bàn    | Chọn bàn hiển thị sức chứa 2–4 khách, chọn 8 khách và xác nhận.                             | Hệ thống cảnh báo sức chứa hoặc yêu cầu chọn bàn phù hợp.         |
| BUG-05 | Trung bình | Đặt bàn    | Tạo một đặt bàn với ngày hôm qua bằng cách sửa giá trị ngày trong trình duyệt rồi gửi form. | Hệ thống không tạo đặt bàn trong quá khứ.                         |
| BUG-06 | Trung bình | Tổng quan  | Tạo lượt đặt bàn ở ngày khác hôm nay; quan sát thẻ “Đặt bàn hôm nay”.                       | Thẻ chỉ đếm đặt bàn có ngày là hôm nay.                           |
| BUG-07 | Cao        | Đặt món    | Tạo đặt bàn cho hai bàn; vào Menu và nhấn “Gọi món” trên một món.                           | Ứng dụng yêu cầu chọn bàn cụ thể trước khi thêm món.              |
| BUG-08 | Cao        | Đặt món    | Đặt bàn, thêm một món, vào thanh toán và hoàn tất; quay lại gọi món cho bàn đã đóng.        | Bàn đã thanh toán không nhận thêm món; cần mở lượt phục vụ mới.   |
| BUG-09 | Trung bình | Đặt món    | Thêm một món, giảm số lượng xuống 0, tiếp tục thêm món khác rồi xem đơn/hóa đơn.            | Dòng có số lượng 0 phải biến mất và không làm sai tổng tiền.      |
| BUG-10 | Cao        | Thanh toán | Thanh toán một hóa đơn bằng “Thẻ ngân hàng”, sau đó mở lại dữ liệu đơn đã thanh toán.       | Hệ thống ghi nhận phương thức thanh toán cùng hóa đơn đã đóng.    |

## Ghi nhận kết quả

Người kiểm thử nên ghi ID, môi trường/trình duyệt, dữ liệu đầu vào, bước thực hiện, kết quả thực tế, ảnh chụp và mức độ ảnh hưởng. Không sửa Local Storage giữa các bước trừ khi tình huống yêu cầu dữ liệu sạch.
