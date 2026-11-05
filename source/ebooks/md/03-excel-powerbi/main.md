---
source_html: bisc_03_Excel_PowerBI_Audit_Simulation.html
part: main
title: "Excel & Power BI · Audit Simulation 2026 Training · BISC"
---

[→ Nội dung khung lồng: main\_frame1.md]

Bỏ qua →
Vào nội dung buổi học →

![BISC](img/9d0c5efe53.png)
BISC
![ACCA Approved Learning Partner Platinum](img/46933803b5.webp)

Excel & Power BI

Audit Simulation 2026 · Training

Tiến độ0/8 bài

Giới thiệu

◆
Giới thiệu buổi học  
4 slide mở đầu · xem lại

Phần 1 · Excel

1
Di chuyển & chọn vùng nhanh  
Ctrl + mũi tên · Ctrl + Shift · Ctrl + Home/End
2
Freeze, Filter & Vẽ bảng  
Alt W F F · Ctrl + Shift + L · Ctrl + T
3
SUMIFS  
Đối chiếu GL – TB · Phát sinh theo tháng
4
XLOOKUP  
Tra danh mục · Tìm mã lạ

Phần 2 · Power BI

1
Ghép nhiều file cùng bố cục  
Get Data → Folder → Combine
2
Measure đơn giản  
SUM · DIVIDE
3
Join dữ liệu  
Relationship · Merge Queries
4
Dựng dashboard  
KPI · Trend · Top · Slicer

Phần 3 · AI trong kiểm toán

🤖
AI tại Big4  
Công cụ đang dùng · Ứng dụng

© BISC Training Center · Audit Simulation 2026 · Training Excel & Power BI · Tài liệu nội bộ dành cho thí sinh

☰

Di chuyển & chọn vùng nhanh

Phần 1 · Excel / **Bài 1.1**

Bài 1.1 · Phím tắt

# Di chuyển & chọn vùng nhanh

Nhóm 1

## Nhảy tới mép vùng dữ liệu

`Ctrl`+`↓``↑``→``←`

Con trỏ nhảy tới **ô cuối cùng có dữ liệu** theo hướng mũi tên. Nếu ô kế tiếp đang trống, con trỏ nhảy tới ô có dữ liệu tiếp theo.

Nhóm 2

## Chọn cả vùng

`Ctrl`+`Shift`+`mũi tên`

Bôi đen từ ô hiện tại tới ô cuối cùng có dữ liệu theo hướng mũi tên. Kết hợp hai lần: `Ctrl`+`Shift`+`↓` rồi `Ctrl`+`Shift`+`→` để chọn toàn bộ bảng.

`Ctrl`+`A`

Chọn toàn bộ vùng dữ liệu liền mạch chứa ô hiện tại. Bấm lần hai để chọn cả sheet.

`Ctrl`+`Space`/`Shift`+`Space`

Chọn cả **cột** / cả **dòng** chứa ô hiện tại.

Nhóm 3

## Về đầu, tới cuối

⤒

`Ctrl` + `Home`

Về ô A1 (hoặc ô đầu tiên ngay dưới vùng đã freeze).

⤓

`Ctrl` + `End`

Tới ô cuối cùng đã từng được dùng của sheet: dòng cuối × cột cuối.

← Trước

Giới thiệu buổi học
Tiếp →

Bài 1.2 · Freeze, Filter & Vẽ bảng

Phần 1 · Excel / **Bài 1.2**

Bài 1.2 · Phím tắt

# Freeze, Filter & Vẽ bảng

Freeze Panes

## Giữ dòng tiêu đề đứng yên

`Alt`→`W`→`F`→`F`

Bấm **lần lượt** từng phím, không cần giữ. Excel cố định mọi dòng **phía trên** và mọi cột **bên trái** ô đang chọn.

Chọn ô

A5

Cố định dòng 1–4 (tiêu đề ở dòng 4). Đây là lựa chọn cho sheet 01 GL.

Chọn ô

E5

Cố định dòng 1–4 **và** cột A–D (STT, ngày, số chứng từ) khi cuộn ngang.

Bỏ freeze

Alt W F F

Bấm lại đúng tổ hợp này để gỡ freeze.

Filter

## Bật bộ lọc và lọc nhanh

`Ctrl`+`Shift`+`L`

Bật / tắt filter cho vùng dữ liệu chứa ô đang chọn. Hãy đứng ở **dòng tiêu đề** (dòng 4) trước khi bấm để Excel nhận đúng tiêu đề.

`Alt`+`↓`

Đứng ở ô tiêu đề đã có filter, mở menu lọc của cột đó. Gõ ngay vào ô Search để tìm giá trị.

Vẽ bảng

## Table và kẻ viền

`Ctrl`+`T`

Chuyển vùng dữ liệu thành **Table**: tự có filter, sọc màu xen kẽ, tự mở rộng khi thêm dòng, công thức tự kéo xuống cả cột. Tick *My table has headers* khi được hỏi.

| Phím tắt kẻ viền | Tác dụng |
| --- | --- |
| `Alt` → `H` → `B` → `A` | All Borders: kẻ viền mọi ô trong vùng chọn |
| `Ctrl` + `Shift` + `&` | Kẻ viền ngoài (outline) cho vùng chọn |
| `Ctrl` + `Shift` + `_` | Xóa toàn bộ viền |
| `Ctrl` + `1` | Mở hộp Format Cells để chỉnh viền, định dạng số |

← Trước

Bài 1.1 · Di chuyển & chọn vùng
Tiếp →

Bài 1.3 · SUMIFS

Phần 1 · Excel / **Bài 1.3**

Bài 1.3 · Công thức

# SUMIFS · cộng có điều kiện

Cú pháp

## Cấu trúc hàm

=SUMIFS(vùng\_cộng, vùng\_điều\_kiện\_1, điều\_kiện\_1, [vùng\_điều\_kiện\_2, điều\_kiện\_2], …)

Vùng cộng

Cột cần cộng

Ví dụ cột N · Phát sinh Nợ

Vùng điều kiện

Cột để so

Ví dụ cột G · Tài khoản

Điều kiện

Giá trị cần khớp

Ví dụ ô A5 = "131", hoặc ">="&ngày

Bài 1 · sheet BT1 SUMIFS TB

## Đối chiếu sổ cái với bảng cân đối phát sinh

Bảng đã có sẵn số dư đầu kỳ và phát sinh **theo kế toán**. Nhiệm vụ: tính phát sinh **theo sổ cái** ở cột F, G, rồi tìm chênh lệch.

| Ô | Công thức |
| --- | --- |
| F5 · PS Nợ theo GL | `=SUMIFS('01 GL'!$N:$N, '01 GL'!$G:$G, $A5)` |
| G5 · PS Có theo GL | `=SUMIFS('01 GL'!$O:$O, '01 GL'!$G:$G, $A5)` |
| H5 · Số dư cuối theo GL | `=C5+F5-G5` |
| J5 · Chênh lệch | `=H5-I5` |

Bài 2 · sheet BT2 SUMIFS THANG

## Nhiều điều kiện: tài khoản × tháng

Thêm điều kiện ngày để tách phát sinh theo tháng. Dòng 4 và dòng 5 đã có sẵn ngày đầu và ngày cuối mỗi tháng.

=SUMIFS('01 GL'!$N:$N, '01 GL'!$G:$G, $A7, '01 GL'!$B:$B, ">="&B$4, '01 GL'!$B:$B, "<="&B$5)  
 −SUMIFS('01 GL'!$O:$O, '01 GL'!$G:$G, $A7, '01 GL'!$B:$B, ">="&B$4, '01 GL'!$B:$B, "<="&B$5)

← Trước

Bài 1.2 · Freeze, Filter & Vẽ bảng
Tiếp →

Bài 1.4 · XLOOKUP

Phần 1 · Excel / **Bài 1.4**

Bài 1.4 · Công thức

# XLOOKUP · tra cứu danh mục

Cú pháp

## Cấu trúc hàm

=XLOOKUP(giá\_trị\_tìm, vùng\_tìm, vùng\_trả\_về, [nếu\_không\_thấy], [kiểu\_khớp], [kiểu\_tìm])

| So sánh | VLOOKUP | XLOOKUP |
| --- | --- | --- |
| Cột trả về nằm bên trái cột tìm | Không được | Được |
| Chèn thêm cột vào bảng danh mục | Sai kết quả (số thứ tự cột bị lệch) | Không ảnh hưởng |
| Mặc định khớp | Gần đúng (nếu quên FALSE) | Chính xác |
| Xử lý không tìm thấy | Phải bọc IFERROR | Có sẵn tham số thứ 4 |

Bài 3 · sheet BT3 XLOOKUP

## Tra danh mục và tìm mã lạ

| Ô | Công thức |
| --- | --- |
| B6 · Tên tài khoản | `=XLOOKUP($A6, '02 DM TAI KHOAN'!$A:$A, '02 DM TAI KHOAN'!$B:$B)` |
| B18 · Tên đối tượng | `=XLOOKUP($A18, '03 DM DOI TUONG'!$A:$A, '03 DM DOI TUONG'!$B:$B, "KHÔNG CÓ TRONG DANH MỤC")` |
| D18 · Số dòng trên GL | `=COUNTIFS('01 GL'!$J:$J, $A18)` |
| E18 · Tên ghi trên GL | `=XLOOKUP($A18, '01 GL'!$J:$J, '01 GL'!$K:$K)` |

Tổng hợp

## Bảng phím tắt & công thức Phần 1

| Thao tác | Phím tắt / Công thức |
| --- | --- |
| Nhảy tới mép dữ liệu | `Ctrl` + mũi tên |
| Chọn tới mép dữ liệu | `Ctrl` + `Shift` + mũi tên |
| Về đầu / tới cuối | `Ctrl` + `Home` / `Ctrl` + `End` |
| Freeze Panes | `Alt` → `W` → `F` → `F` |
| Bật / tắt filter · mở menu lọc | `Ctrl` + `Shift` + `L` · `Alt` + `↓` |
| Tạo Table | `Ctrl` + `T` |
| Kẻ viền tất cả / viền ngoài / xóa viền | `Alt` → `H` → `B` → `A` · `Ctrl`+`Shift`+`&` · `Ctrl`+`Shift`+`_` |
| Cộng có điều kiện | `=SUMIFS(vùng_cộng, vùng_đk, đk, …)` |
| Tra cứu | `=XLOOKUP(tìm, vùng_tìm, vùng_trả_về, "nếu không thấy")` |

← Trước

Bài 1.3 · SUMIFS
Tiếp →

Bài 2.1 · Ghép nhiều file

Phần 2 · Power BI / **Bài 2.1**

Bài 2.1 · Power Query

# Ghép nhiều file cùng bố cục

Ý tưởng

## Từ 12 file thành 1 bảng

1

Thư mục

GL theo thang\ chứa 12 file T01…T12

→

2

Combine

Power Query đọc từng file theo một file mẫu

→

3

Làm sạch

Bỏ dòng tiêu đề, đặt header, chỉnh kiểu dữ liệu

→

4

Bảng GL

7.216 dòng · sẵn sàng phân tích

Từng bước

## Thực hiện trong Power BI Desktop

1

Lấy dữ liệu từ thư mục

**Home → Get data → More… → Folder → Connect**. Dán đường dẫn thư mục `…\Thuc hanh Power BI\GL theo thang` → OK.

2

Chọn Combine & Transform

Cửa sổ hiện danh sách 12 file. Bấm **Combine → Combine & Transform Data** (không bấm Load ở bước này).

3

Chọn sheet mẫu

Ở hộp *Combine Files*, chọn sheet **SO CAI** → OK. Power Query dùng file đầu tiên làm mẫu và áp dụng cho mọi file còn lại.

4

Sửa file mẫu: bỏ 3 dòng đầu, đặt tiêu đề

Ở khung Queries bên trái, mở query **Transform Sample File**. **Home → Remove Rows → Remove Top Rows → 3**, sau đó **Home → Use First Row as Headers**. Mọi bước làm ở đây tự áp dụng cho cả 12 file.

5

Quay lại query tổng, đổi tên thành GL

Mở query tổng (tên thư mục, ví dụ *GL theo thang*), đổi tên thành **GL**. Nếu thấy bước *Changed Type* báo lỗi do tên cột cũ, xóa bước đó ở khung *Applied Steps*. Cột **Source.Name** cho biết mỗi dòng đến từ file nào: nên giữ lại để truy vết.

6

Chỉnh kiểu dữ liệu

Số tiền (Phát sinh Nợ, Phát sinh Có) → **Whole Number**. Tài khoản, Mã đối tượng → **Text**. Ngày đang là chữ dạng *dd/mm/yyyy*: chuột phải tiêu đề cột → **Change Type → Using Locale… → Date · Vietnamese (Vietnam)**.

7

Thêm cột Tháng và TK cấp 1

Chọn cột Ngày hạch toán → **Add Column → Date → Month → Month**. Thêm cột **TK cấp 1**: chọn cột Tài khoản → **Add Column → Extract → First Characters → 3**, đổi tên cột mới thành *TK cấp 1* (ví dụ 511.HH → 511, 632.DV → 632, 1121.VCB → 112).

8

Close & Apply

**Home → Close & Apply**. Kiểm tra số dòng ở Table view: phải là **7.216**.

← Trước

Bài 1.4 · XLOOKUP
Tiếp →

Bài 2.2 · Measure đơn giản

Phần 2 · Power BI / **Bài 2.2**

Bài 2.2 · DAX

# Measure đơn giản: SUM & DIVIDE

Cách tạo

## Tạo measure đầu tiên

Ở khung *Data*, chuột phải bảng **GL → New measure**, gõ công thức vào thanh công thức và Enter. Measure hiện với biểu tượng máy tính 🖩.

SUM

## Nhóm measure cộng

Tổng PS Nợ = SUM ( GL[Phát sinh Nợ] )  
Tổng PS Có = SUM ( GL[Phát sinh Có] )  
Phát sinh ròng = [Tổng PS Nợ] - [Tổng PS Có]  
Số dòng = COUNTROWS ( GL )

Measure có thể gọi lại measure khác bằng tên trong ngoặc vuông, như `[Tổng PS Nợ]`. Nên xây measure gốc trước rồi ghép dần.

DIVIDE

## Chia an toàn

Bình quân mỗi dòng = DIVIDE ( [Tổng PS Nợ], [Số dòng] )

Dùng dấu /

[A] / [B]

Khi B = 0, kết quả là lỗi hoặc vô cùng (∞) trên biểu đồ.

Dùng DIVIDE

DIVIDE([A], [B], 0)

Khi B = 0, trả về giá trị thay thế (tham số thứ 3), mặc định là trống.

Mở rộng

## Doanh thu, giá vốn và biên lợi nhuận gộp

Muốn cộng **có điều kiện** (như SUMIFS), bọc measure trong `CALCULATE` với điều kiện lọc. Dùng cột *TK cấp 1* đã tạo ở Bài 2.1:

Doanh thu = CALCULATE ( [Tổng PS Có], GL[TK cấp 1] = "511" )  
Giá vốn = CALCULATE ( [Tổng PS Nợ], GL[TK cấp 1] = "632" )  
Biên LN gộp % = DIVIDE ( [Doanh thu] - [Giá vốn], [Doanh thu] )

Chọn measure *Biên LN gộp %*, vào **Measure tools → Format → Percentage**.

← Trước

Bài 2.1 · Ghép nhiều file
Tiếp →

Bài 2.3 · Join dữ liệu

Phần 2 · Power BI / **Bài 2.3**

Bài 2.3 · Data model

# Join dữ liệu: sổ cái + danh mục

Bước 1

## Nạp 2 bảng danh mục

**Home → Get data → Excel workbook** → chọn `Danh muc\DM_TAI_KHOAN.xlsx` → tick sheet → **Load**. Làm tương tự với `DM_DOI_TUONG.xlsx`.

Bước 2 · Cách A (khuyên dùng)

## Tạo Relationship trong Model view

1

Mở Model view

Biểu tượng thứ ba ở thanh bên trái màn hình Power BI.

2

Kéo thả cột khóa

Kéo **GL[Tài khoản]** thả vào **DM\_TAI\_KHOAN[Số hiệu TK]**. Kéo **GL[Mã đối tượng]** thả vào **DM\_DOI\_TUONG[Mã đối tượng]**.

3

Kiểm tra thiết lập

Nhấp đúp vào đường nối: **Cardinality = Many to one (\*:1)**, **Cross filter direction = Single**. Phía "một" là danh mục (mỗi mã xuất hiện một lần), phía "nhiều" là GL.

Bảng danh mục

DM\_TAI\_KHOAN

Số hiệu TK · Tên · Nhóm · Tính chất

Bảng dữ liệu

GL

7.216 dòng · nối bằng Tài khoản và Mã đối tượng

Bảng danh mục

DM\_DOI\_TUONG

Mã đối tượng · Tên · Loại

Bước 2 · Cách B

## Merge Queries trong Power Query

**Home → Transform data** → chọn query GL → **Home → Merge Queries** → chọn bảng DM\_TAI\_KHOAN, chọn cột Tài khoản và Số hiệu TK → **Join kind: Left Outer** → OK → bấm biểu tượng mở rộng ↔ ở cột mới, tick các cột cần lấy.

|  | Relationship (Cách A) | Merge Queries (Cách B) |
| --- | --- | --- |
| Bản chất | Nối hai bảng trong mô hình, không thêm cột | Ghép cột danh mục vào hẳn bảng GL, giống XLOOKUP |
| Dung lượng | Nhẹ | Bảng GL nặng hơn |
| Khi nào dùng | Mặc định cho dashboard | Khi cần xuất bảng phẳng ra Excel hoặc cần cột để lọc trong Power Query |

← Trước

Bài 2.2 · Measure đơn giản
Tiếp →

Bài 2.4 · Dựng dashboard

Phần 2 · Power BI / **Bài 2.4**

Bài 2.4 · Visualization

# Dựng dashboard

Thực hành

## Thực hành trực tiếp trên Power BI

Phần này các bạn làm cùng trainer trên file Power BI đã dựng ở Bài 2.1 – 2.3: dùng các measure và bảng danh mục đã join để dựng một trang dashboard gồm thẻ KPI, biểu đồ theo tháng, top khách hàng, bảng chi tiết theo tài khoản và các slicer để lọc. Dưới đây là dashboard mẫu dựng từ bộ dữ liệu đại lý VinFast (thư mục *Thuc hanh VinFast*): 12 file GL ghép lại, join với Sales report qua Số hóa đơn. Tick chọn tháng và showroom ở bên trái để xem các visual tự lọc theo.

**Dashboard\_VinFast\_AnPhat.pbix**· Trang 1 · Doanh thu & giá vốn bán xe 2025

Bán xe VinFast 2025

Công ty CP Ô tô An Phát · đại lý giả định · số liệu hư cấu · GL join Sales report qua Số hóa đơn

Tháng

 Select all

Showroom

 Select all

Doanh thu, Giá vốn và Biên LN gộp % theo Tháng

Doanh thuGiá vốnBiên LN gộp %

Doanh thu theo Dòng xe

Doanh thu theo Nhân viên bán hàng

Kết quả bán xe theo Tháng (triệu VND)

← Trước

Bài 2.3 · Join dữ liệu
Tiếp →

Phần 3 · AI tại Big4

Phần 3 · AI trong kiểm toán / **AI tại Big4**

Phần 3 · AI

# AI tại Big4

Công cụ

## Big4 đang dùng AI nào?

![Deloitte](https://commons.wikimedia.org/wiki/Special:FilePath/Logo_of_Deloitte.svg)Deloitte

Copilot

Microsoft Copilot

Trợ lý AI chính tại Việt Nam. Lý do: bảo mật, vì Copilot chạy trong hệ thống Microsoft 365 của hãng và dữ liệu client không ra ngoài.

Toàn cầu

Claude

Claude

Anthropic. Triển khai cho khoảng 470.000 nhân sự toàn cầu từ 10/2025.

PairD

PairD

Trợ lý AI nội bộ của Deloitte.

Zora

Zora AI

Nền tảng AI agent ("digital workers") xây dựng cùng Nvidia.

![PwC](https://commons.wikimedia.org/wiki/Special:FilePath/PwC_2025_Logo.svg)PwC

Copilot

Microsoft Copilot

Trợ lý AI chính tại Việt Nam. Lý do: bảo mật, vì Copilot chạy trong hệ thống Microsoft 365 của hãng và dữ liệu client không ra ngoài.

Toàn cầu

Chat

ChatPwC

Trợ lý AI nội bộ, bên trong có tích hợp Claude.

Claude

Claude

Anthropic. Mở rộng liên minh 5/2026, đào tạo 30.000 nhân sự PwC Mỹ.

OpenAI

ChatGPT Enterprise

OpenAI. Đối tác từ 2024.

![EY](https://commons.wikimedia.org/wiki/Special:FilePath/Ernst_%26_Young_logo_(2025).svg)EY

Copilot

Microsoft Copilot

Trợ lý AI chính tại Việt Nam. Lý do: bảo mật, vì Copilot chạy trong hệ thống Microsoft 365 của hãng và dữ liệu client không ra ngoài.

Toàn cầu

Copilot

Microsoft Copilot

Đã triển khai cho 150.000 người, đang mở rộng tới hơn 400.000 nhân sự (5/2026).

Azure

EY Canvas + AI agents

Nền tảng kiểm toán toàn cầu, tích hợp hệ thống multi-agent trên Microsoft Azure.

EY.ai

EY.ai

Nền tảng AI của EY cho cả nội bộ và khách hàng.

![KPMG](https://commons.wikimedia.org/wiki/Special:FilePath/KPMG_blue_logo.svg)KPMG

Copilot

Microsoft Copilot

Trợ lý AI chính tại Việt Nam. Lý do: bảo mật, vì Copilot chạy trong hệ thống Microsoft 365 của hãng và dữ liệu client không ra ngoài.

Toàn cầu

Claude

Claude

Anthropic. Liên minh toàn cầu 5/2026, cho toàn bộ hơn 276.000 nhân sự.

Azure

KPMG Workbench

Nền tảng multi-agent trên Microsoft Azure, khoảng 50 trợ lý AI.

Clara

KPMG Clara

Nền tảng kiểm toán, đang tích hợp thêm AI agent.

Nguồn: [Anthropic × Deloitte](https://www.anthropic.com/news/deloitte-anthropic-partnership) · [PwC × Anthropic (5/2026)](https://www.pwc.com/us/en/about-us/newsroom/press-releases/anthropic-pwc-expand-alliance-agentic-enterprise.html) · [Microsoft × PwC](https://www.microsoft.com/en/customers/story/26160-pwc-microsoft-365-enterprise) · [EY × Microsoft (5/2026)](https://itbrief.com.au/story/ey-microsoft-launch-ai-push-with-usd-1-billion-plan) · [Anthropic × KPMG (5/2026)](https://www.anthropic.com/news/anthropic-kpmg) · [Generative AI at the Big 4](https://www.big4events.com/blog/generative-ai-big-4-2026)

Ứng dụng

## Kiểm toán viên đang dùng AI để làm gì?

1

### Đọc nhanh hợp đồng

Đọc nhanh hợp đồng dài hàng chục trang và rút ra những điều khoản ảnh hưởng tới số liệu kế toán.

- Bên ký, thời hạn, giá trị, lịch thanh toán
- Chiết khấu, ưu đãi, điều khoản phạt, điều kiện chấm dứt
- Thời điểm chuyển giao, nghiệm thu: căn cứ ghi nhận doanh thu

**Prompt mẫu**Tóm tắt hợp đồng đính kèm thành bảng: các bên, thời hạn, giá trị, lịch thanh toán, ưu đãi/giảm giá, điều kiện chấm dứt. Ghi rõ số điều khoản cho từng ý.

2

### Trau chuốt bài phân tích

Biến ghi chú thô thành đoạn phân tích mạch lạc, đúng giọng văn chuyên nghiệp cho working paper hoặc slide pitching.

- Diễn giải biến động: số liệu, nguyên nhân, kết luận
- Chuẩn hóa thuật ngữ kiểm toán tiếng Việt / tiếng Anh
- Rút gọn thành câu chốt cho slide

**Prompt mẫu**Viết lại đoạn phân tích sau theo văn phong kiểm toán viên, cấu trúc: biến động – nguyên nhân – rủi ro – thủ tục tiếp theo. Giữ nguyên mọi con số.

3

### Tóm lược audit guide

Đọc nhanh hướng dẫn kiểm toán, chuẩn mực, chính sách kế toán của client và biến thành checklist dùng ngay.

- Tóm tắt yêu cầu theo từng phần hành
- Lập danh sách thủ tục và tài liệu cần thu thập
- So sánh chính sách của client với chuẩn mực

**Prompt mẫu**Tóm tắt hướng dẫn sau thành checklist thủ tục kiểm toán cho phần hành doanh thu: mục tiêu, thủ tục, tài liệu cần request.

🔒

Bảo mật dữ liệu client

Chỉ dùng công cụ AI được hãng phê duyệt. Không đưa dữ liệu khách hàng lên công cụ cá nhân.

🔍

Luôn kiểm tra lại

AI có thể tóm tắt sai hoặc bịa điều khoản. Đối chiếu lại với văn bản gốc trước khi dùng.

🧠

Xét đoán là của bạn

AI hỗ trợ đọc và viết. Kết luận kiểm toán và trách nhiệm vẫn thuộc về kiểm toán viên.

← Trước

Bài 2.4 · Dựng dashboard
Về trang đầu →

Giới thiệu buổi học

Audit Simulation 2026 · Training Excel & Power BI · BISC Training Center