# TAX_MAP · Nhánh D · ACCA TX-VNM Tax Atlas

> Phiên bản: **D-map 1.0** · 16/11/2026 · lập bằng Opus 5.5, bàn giao cho Sonnet 5.5 build.
> Nguồn duy nhất: `source/library/acca-tx-vnm/`. Mọi con số trên web phải trích được về slide BISC hoặc bảng thuế J26–J27.

## 0. Quyết định đã chốt (16/11/2026)

| # | Quyết định | Ghi chú |
|---|---|---|
| 1 | Thuật ngữ tiếng Anh như đề thi, giải thích bằng tiếng Việt | Tiêu đề thẻ: EN trước, VI sau. Câu hỏi luyện tập giữ tiếng Anh. |
| 2 | Hình thức: **Cây (syllabus A–E) + Dây nối (typed links) + Cây quyết định** | Không làm mind map tự do. Dây nối chỉ hiện quanh nút đang chọn. |
| 3 | Không dừng chờ duyệt giữa các bước; **chỉ dừng khi đổi model** | Opus: map + cây quyết định (xong). Sonnet: build web, thẻ, flashcard, gắn đề. |
| 4 | Nhánh D độc lập với A/B/C, giao diện tiếng Việt, màu BISC | Link chéo sang nhánh A ở các thẻ chi phí, doanh thu, TSCĐ, vay khi phù hợp. |

## 1. Phạm vi thi và căn cứ luật

- Kỳ thi: ACCA TX-VNM **tháng 12/2026**, syllabus J26–J27. Thi máy 3 giờ, 100 điểm. Section A: 15 câu MCQ × 2 điểm. Section B: bốn câu 10 điểm và hai câu 15 điểm. **Hai câu 15 điểm luôn là PIT (B) và CIT (C)** (syllabus §8).
- Căn cứ khi làm bài: **bảng thuế J26–J27** (`tax-tables-j26-j27.md`) + slide BISC. Bảng thuế ghi: VAT 10% / 5%; CIT 20%; PIT lũy tiến 7 bậc; giảm trừ bản thân 11 triệu, người phụ thuộc 4,4 triệu; lương tối đa đóng BHXH 46,8 triệu; tỷ giá 26.500 VND/USD; mức giảm VAT 2% năm 2025 không thi.
- Luật CIT mới (Luật 67/2025, hiệu lực 01/10/2025; Nghị định 320/2025, hiệu lực 15/12/2025) và luật VAT mới (Luật 48/2024; Nghị định 181/2025; Thông tư 69/2025) **đã vào phạm vi thi**. Thông tư 20/2026/TT-BTC (CIT) **chưa thi** (r3 tr.2).
- Syllabus loại trừ: thu nhập miễn thuế theo Luật CIT; chi tiết từng hiệp định DTA; danh sách địa bàn ưu đãi; Luật Đầu tư, Luật Doanh nghiệp. Thẻ thuộc các phần này gắn nhãn `ngoài trọng tâm`.
- **Thông tin luật thực tế khác bảng thuế đề thi** (ví dụ thay đổi biểu thuế, giảm trừ gia cảnh áp dụng từ 2026): luôn làm bài theo bảng thuế đề thi. Web hiển thị cảnh báo này ở trang D0 và trên thẻ `b-deductions`, `b-progressive-quick-formula`.

## 2. Thư viện nguồn (`source/library/acca-tx-vnm/`)

| Mã | File | Nội dung |
|---|---|---|
| `tt` | `tax-tables-j26-j27.md` | Bảng thuế cho trong đề (3 tr.) |
| `sy` | `syllabus.md` | Syllabus & study guide J26–J27 |
| `s0`…`s5` | `study/ch0-intro.md` … `study/ch5-fct.md` | Slide bài giảng: Ch1 Admin, Ch2 PIT, Ch3 CIT, Ch4 VAT, Ch5 FCT |
| `r1`…`r5` | `revision/r1-tax-admin.md` … `r5-fct.md` | Slide ôn tập (cô đọng, có tips + examiner) |
| `ex/<kỳ>` | `exams/<kỳ>/question.md`, `answer.md` | Đề thi cũ: ≤Dec17, Jun18, Dec18, Jun19, J20 sample (text); Jun21 → Dec23 (OCR xong); **Dec24 + J20 sample question: OCR chưa chạy xong** (chạy lại `scripts/ocr_tax_exams.py`, có cache) |
| `D320`, `L67`… | `Tax/tx26-documents-1/*.pdf` (ngoài repo) | Văn bản luật EN, chỉ dùng để đối chiếu khi slide mâu thuẫn, không nạp |

Script: `scripts/ingest_tax.py` (slide + đề có text) · `scripts/ocr_tax_exams.py` (đề dạng ảnh, tesseract eng, cache tại `~/.ocr_tax_cache`). PDF gốc để ngoài repo, không commit.

Ghi chú lỗi trích xuất: slide BISC dùng **chữ gạch ngang** để đánh dấu số cũ, nhưng khi trích ra text thì mất gạch. Gặp chỗ hai số đứng cạnh nhau ("20mil 5mil", "10% 20%", "20 billion 40 billion") thì **số đứng sau là số mới**. Đã đối chiếu: quỹ KH&CN 20% (L67), dự án mở rộng 40 tỷ / 20 tỷ (D320).

## 3. Trang và đường dẫn

| Trang | Route | Nội dung |
|---|---|---|
| D0 · Start here | `/d/` | Cách dùng Atlas, cấu trúc đề, lộ trình ôn 3 tuần, cảnh báo luật mới vs đề cũ |
| D1 · Tax Atlas | `/d/atlas/` | Full screen: cây bên trái, thẻ ở giữa, panel "Liên quan" bên phải; tìm kiếm; bộ lọc (phần A–E, ⚠️ bẫy, 🆕 luật mới, ❓ chưa thuộc, ngoài trọng tâm); deep link `#n-<id>` |
| D2 · Cây quyết định | `/d/decide/` + `/d/decide/<tree-id>/` | 16 cây từ `src/data/tax/trees.json`; kết quả có nút mở thẻ, "chạy cây tiếp theo" |
| D3 · Bẫy đề | `/d/traps/` | Gom mọi `trap` của thẻ và cây, lọc theo phần, đánh dấu "đã nắm" |
| D4 · Kho đề | `/d/exam-bank/` | Câu đề cũ gắn với nút; nhãn kỳ thi + `luật cũ` / `luật hiện hành`; tự chấm đúng/sai → cập nhật màu nút trên Atlas |
| D5 · Flashcard | `/d/drill/` | Sinh từ thẻ (mặt trước: câu hỏi EN; mặt sau: đáp án + giải thích VI), lặp lại ngắt quãng (localStorage) |
| D6 · Máy tính | `/d/calc/` | PIT (gross/net, tiền nhà 15%, nhiều nơi trả), CIT (bảng điều chỉnh), FCT (net/gross, tách hàng/dịch vụ), VAT (khấu trừ, phân bổ, hoàn) |
| D7 · Bảng thuế | `/d/tables/` | Bảng thuế J26–J27 dạng tương tác, mỗi dòng link về thẻ dùng nó |

Sidebar: `D · Thuế Việt Nam (ACCA TX-VNM)`. Trang chủ thêm ô dẫn sang D0.

## 4. Mô hình dữ liệu

`src/data/tax/atlas.json`:

```jsonc
{
  "nodes": [{
    "id": "c-interest",               // khớp danh sách §5
    "part": "C", "parent": "c-deductible",  // cây
    "title_en": "Interest expense", "title_vi": "Chi phí lãi vay",
    "summary_vi": "1–2 câu: quy tắc cốt lõi",
    "rules_vi": ["…"],                 // gạch đầu dòng, mỗi dòng 1 quy tắc
    "numbers": [{"label": "Trần lãi vay ngoài TCTD", "value": "20%/năm", "src": "r3:20"}],
    "formula": "…",                    // tùy chọn
    "example": {"q_en": "…", "a_vi": "…", "src": "r3:20"},  // ví dụ số có trong nguồn
    "traps": [{"text_vi": "…", "src": "r3:60"}],
    "legal": ["Law 67/2025", "Decree 320/2025"],
    "sources": ["r3:20", "s3:…"],
    "flags": ["new"],                  // new | off-focus | conflict
    "exam_refs": ["2023-dec:Q…"],      // điền ở bước gắn đề
    "level": 2                          // intellectual level theo syllabus
  }],
  "edges": [{"from": "c-5m-noncash", "to": "e-input-conditions", "type": "same-number", "why_vi": "…"}]
}
```

Loại dây nối (`type`): `affects` (ảnh hưởng sang) · `same-number` (cùng con số/ngưỡng) · `confused-with` (hay nhầm với) · `exception-of` (ngoại lệ của) · `computed-with` (dùng chung trong một phép tính) · `contrast` (so sánh cá nhân vs doanh nghiệp, resident vs non-resident).

`src/data/tax/trees.json`: **đã soạn xong** (16 cây, 167 nút, 86 thẻ được tham chiếu). Schema ghi trong `_meta`. Sonnet chỉ render, không sửa logic.

Tiến độ người học: `localStorage` khóa `tax-progress-v1` (trạng thái thẻ: mới / đang học / đã thuộc; kết quả câu đề; lịch flashcard; note riêng từng thẻ) + xuất/nhập JSON như các nhánh khác.

## 5. Cây kiến thức (xương sống)

Ký hiệu nguồn: `r3:20` = revision CIT tr.20; `s2:3` = study PIT tr.3; `tt:2` = bảng thuế tr.2. ★ = thẻ được cây quyết định tham chiếu (bắt buộc có trong MVP).

### A · Tax system & administration

| id | Thẻ (EN · VI) | Nguồn |
|---|---|---|
| a-system-purpose | Purpose & types of tax · Chức năng, phân loại thuế (trực thu/gián thu) | r1:2, s1 |
| a-legal-hierarchy | Law → Decree → Circular → Official letter · Hệ thống văn bản | r1:2 |
| a-avoidance-evasion | Avoidance vs evasion · Tránh thuế vs trốn thuế, đạo đức nghề nghiệp | r1:3 |
| a-registration | Tax registration · Đăng ký thuế (10 ngày) | r1:4 |
| a-filing-deadlines | Filing deadlines · Hạn nộp tờ khai (tháng 20 · quý ngày cuối tháng đầu quý sau · năm · từng lần 10 ngày · quyết toán ngày cuối tháng 3 · chấm dứt 45 ngày) | r1:4 |
| a-payment-matrix | Payment matrix by tax · Ma trận khai/nộp theo sắc thuế | r1:5 |
| a-late-interest | Late payment interest · Tiền chậm nộp 0,03%/ngày, cách đếm ngày | r1:5, r1:7 |
| a-penalties | Penalties · Phạt khai sai 20%, trốn thuế 1–3 lần, vi phạm thủ tục, nộp tờ khai chậm | r1:5 |
| a-limitation | Statute of limitation · Thời hiệu | r1:5 |
| a-currency-fx | Tax currency & FX rate · Đồng tiền khai thuế, tỷ giá | r1:7 |
| a-multi-province | Multi-province allocation · Phân bổ thuế cho đơn vị phụ thuộc ở tỉnh khác | r1:9, r3:59 |
| a-tax-audit | Tax audit vs inspection · Kiểm tra vs thanh tra thuế, thời hạn | r1:9, r1:10 |
| a-rights-complaints | Rights, obligations, complaints · Quyền, nghĩa vụ, khiếu nại | r1:10, s1 |
| a-tp-principles | TP principles · Nguyên tắc giá giao dịch độc lập, bản chất quyết định hình thức | r3:48 |
| a-tp-related-parties | Related parties · Các trường hợp bên liên kết (25%, 10%, khoản vay 25% vốn chủ & 50% nợ dài hạn, HĐQT > 50%, gia đình…) | r3:51–53 |
| a-tp-methods | TP methods · Phương pháp so sánh giá, tỷ suất lợi nhuận, phân bổ lợi nhuận | r3:54–55 |
| a-tp-range | Arm's length range · Khoảng giá trị chuẩn (bách phân vị 35–75, trung vị 50) | r3:51 |
| a-tp-nondeductible-costs ★ | TP non-deductible costs · Chi phí không được trừ theo quy định chuyển giá (phí dịch vụ tập đoàn) | r3:56 |
| a-tp-interest-30-ebitda ★ | 30% EBITDA interest cap · Trần lãi vay 30% EBITDA, chuyển 5 năm | r3:57 |
| a-tp-documentation | TP documentation · Hồ sơ chuyển giá: thông tin liên kết, local file, master file, CbCR; thời hạn | r3:58 |

### B · Personal income tax

| id | Thẻ | Nguồn |
|---|---|---|
| b-scope-resident-vs-non ★ | Resident vs non-resident treatment · Bảng so sánh phạm vi, giảm trừ, thuế suất, khấu trừ thuế nước ngoài | r2:3 |
| b-residence-test ★ | Residence test · 183 ngày / nơi ở thường xuyên / thuê nhà ≥ 183 ngày | r2:3, s2:3 |
| b-tax-period-first-year ★ | First tax year · Năm tính thuế đầu tiên (12 tháng / 01/01 / ngày đến) | r2:4, s2:3 |
| b-cross-year-finalisation ★ | Cross-year finalisation · Quyết toán năm chồng lấn | r2:22 |
| b-income-types | 8 income types & 5 steps · 8 loại thu nhập, 5 bước tính thuế toàn phần | r2:4, r2:7 |
| b-emp-taxable ★ | Taxable employment income · Thu nhập từ tiền lương chịu thuế (lương, thưởng, cổ phiếu, phụ cấp, lợi ích) | r2:8 |
| b-emp-housing-15 ★ | Housing 15% rule · Tiền nhà 15% | r2:9, r2:16 |
| b-emp-meal-uniform ★ | Meal 730k · uniform 5m · Ăn ca, đồng phục | r2:9 |
| b-emp-life-insurance ★ | Life insurance 10% · Bảo hiểm có tích lũy phí | r2:10 |
| b-emp-exempt-benefits ★ | Non-taxable benefits list · Danh sách lợi ích không chịu thuế (vé về phép, học phí, chuyển vùng, điện thoại, hiếu hỉ, đào tạo, xe đưa đón, visa, thôi việc…) | r2:10–13 |
| b-exempt-income ★ | Exempt income · Thu nhập miễn thuế (lãi tiền gửi, kiều hối, học bổng…) | r2:14 |
| b-deductions ★ | Deductions · Giảm trừ: 11tr / 4,4tr, BH bắt buộc, quỹ hưu trí tự nguyện 1tr/tháng, từ thiện | r2:14, tt:3 |
| b-shui | Compulsory insurance · Tỷ lệ BHXH, BHYT, BHTN; lương tối đa 46,8 triệu; người nước ngoài không đóng BHTN | tt:3, r2:24 |
| b-progressive-quick-formula ★ | Progressive rates & quick formula · Biểu lũy tiến, công thức T = aG − b | r2:15, tt:2 |
| b-gross-up-net ★ | Net-to-gross · Quy đổi net → gross | r2:15–17, tt:2 |
| b-nonresident-employment ★ | Non-resident employment 20% · Phân bổ theo ngày | r2:17, tt:2 |
| b-multiple-employers ★ | Several payers · Nhiều nơi trả, làm thêm dưới 10 triệu | r2:23 |
| b-business-income ★ | Business income · Ngưỡng 100 triệu, 3 phương pháp, tỷ lệ % | r2:18–20, tt:3 |
| b-capital-investment ★ | Investment income 5% · Thu nhập đầu tư vốn | r2:5, tt:3 |
| b-capital-transfer ★ | Capital & securities transfer · 20% lãi / 0,1% giá bán | r2:5, tt:3 |
| b-real-estate ★ | Real property transfer 2% · Miễn thuế trong gia đình, nhà duy nhất | r2:5, tt:3 |
| b-royalty-prize-gift ★ | Royalty 5% · prize & gift 10% (> 10 triệu) | r2:6, tt:3 |
| b-taxing-time-shares ★ | Taxing time: dividends, share awards, options · Thời điểm tính thuế cổ tức, thưởng cổ phiếu, quyền chọn | r2:23 |
| b-capital-contribution ★ | Contribution in kind · Góp vốn bằng vốn góp, cổ phần, BĐS | r2:24 |
| b-foreign-tax-credit ★ | Foreign tax credit · Khấu trừ thuế nước ngoài = MIN(thuế đã nộp; thuế VN phân bổ) | r2:22 |
| b-admin-declaration | Declaration & finalisation · Khai tháng/quý, quyết toán, ủy quyền quyết toán, mẫu biểu | r2:20–21 |
| b-deadlines | PIT deadlines · Hạn khai, đăng ký người phụ thuộc, 45 ngày khi rời VN, ngày cuối tháng 4 cho cá nhân tự quyết toán | r2:21 |
| b-dta ★ | DTA for individuals · Hiệp định thuế với cá nhân | r5:25–26 |

### C · Corporate income tax

| id | Thẻ | Nguồn |
|---|---|---|
| c-law-timeline | New law timeline · Luật 67/2025, Nghị định 320/2025, Thông tư 20/2026 (chưa thi) | r3:2 |
| c-pe-scope | PE & territorial scope · Định nghĩa PE, phạm vi chịu thuế theo loại doanh nghiệp | r3:2–3 |
| c-tax-period | Tax period · Kỳ đầu/cuối ≤ 3 tháng gộp (≤ 15 tháng); đổi kỳ ≤ 12 tháng | r3:3–4 |
| c-rates | CIT rates · 20%; 15% (≤ 3 tỷ); 17% (3–50 tỷ); dầu khí; tài nguyên quý hiếm | r3:4, tt:1 · flag `conflict` (§9-3) |
| c-methods | Direct vs declaration method · Phương pháp tỷ lệ trên doanh thu vs kê khai | r3:5–7 |
| c-direct-rates | Direct method rates · Tỷ lệ % theo 4 nhóm đối tượng | r3:6–7 |
| c-computation-template ★ | Computation template · Mẫu bảng điều chỉnh từ lợi nhuận kế toán | r3:8, r3:60 |
| c-revenue-timing | Revenue timing · Thời điểm ghi nhận doanh thu tính thuế; doanh thu gồm/không gồm VAT theo phương pháp VAT | r3:9–10 |
| c-deductible-3-conditions ★ | 3 conditions · Liên quan kinh doanh + chứng từ + không dùng tiền mặt | r3:10–11 |
| c-rnd-200 ★ | R&D 200% · Trừ thêm chi phí R&D | r3:11 |
| c-no-invoice-purchases ★ | No-invoice purchases · Bảng kê 01/TNDN | r3:11, r3:18–19 |
| c-5m-noncash ★ | VND5m non-cash rule · Ngưỡng 5 triệu | r3:12 |
| c-salary-nondeductible ★ | Salary non-deductible cases · Lương không được trừ | r3:12 |
| c-salary-provision-17 ★ | Salary provision 17% · Quỹ dự phòng tiền lương | r3:13 |
| c-employment-caps ★ | Uniform 5m · welfare 1 month · pension 5m/month · Trần chi phí nhân viên | r3:13 |
| c-depreciation-nondeductible ★ | Depreciation non-deductible cases · Khấu hao không được trừ, tạm ngừng 9/12 tháng | r3:14–15 |
| c-car-1-6bn ★ | Car ≤ 9 seats 1.6bn · Ô tô dưới 10 chỗ | r3:14 |
| c-depreciation-methods | Depreciation methods · Đường thẳng, số dư giảm dần (1,5 / 2,0), sản lượng | r3:16–17 |
| c-repair-vs-upgrade ★ | Repair vs upgrade · Sửa chữa ≤ 3 năm, nâng cấp cộng nguyên giá | r3:16 |
| c-lur | Land use rights · Quyền sử dụng đất có thời hạn / lâu dài | r3:15 |
| c-materials-norm | Materials over norm · Vật tư vượt định mức | r3:18 |
| c-interest ★ | Interest expense · Lãi vay: vốn góp thiếu, > 20%/năm, 30% EBITDA | r3:20, r3:57 |
| c-lease-allocation | Over-allocated lease · Chi phí thuê trả trước phân bổ | r3:20 |
| c-provisions ★ | Provisions (Circular 48) · 5 loại dự phòng | r3:21 |
| c-pe-mgmt-allocation ★ | Management fee to PE · Công thức A = B/C × D | r3:22 |
| c-fx-unrealised ★ | Unrealised FX · Chênh lệch tỷ giá đánh giá lại | r3:22 |
| c-specialised-law ★ | Non-compliance with specialised laws (new) · Làm thêm giờ vượt luật, quảng cáo hàng cấm | r3:23 |
| c-other-nondeductible ★ | Other non-deductible · Golf, phạt hành chính, thuế gánh thay, chi phí vốn chủ, phí tập đoàn… | r3:23 · flag `conflict` (§9-1) |
| c-donations ★ | Donations · 7 mục đích, biên bản | r3:24 |
| c-funds-contribution | Contributions to Government funds (new) · Đóng góp quỹ | r3:24 |
| c-expenses-no-revenue ★ | Expenses before revenue (new) · Chi phí chưa tương ứng doanh thu | r3:25 |
| c-special-deductible ★ | Other deductible (new) · Đào tạo, bất khả kháng, VAT đầu vào không được khấu trừ, chống HIV… | r3:26 |
| c-capital-transfer-vn | Capital/securities transfer (VN enterprise) · 20% trên lãi | r3:27 |
| c-capital-transfer-foreign | Capital transfer (foreign) · 2% giá chuyển nhượng; 0,1% chứng khoán niêm yết; gián tiếp ở nước ngoài | r3:28–29, tt:2 |
| c-real-estate-transfer ★ | Real estate transfer · Thu nhập chuyển nhượng BĐS, giá không thấp hơn giá UBND | r3:29–30 |
| c-other-income ★ | Other income list · Thu nhập khác theo NĐ 320 | r3:30–32 |
| c-overseas-income-credit | Overseas income & tax credit · Gross-up, MIN(thuế nước ngoài; thuế VN), không chuyển kỳ sau | r3:33, r3:61 |
| c-exempt-income | Exempt income · Thu nhập miễn thuế | r3:33–35 · flag `off-focus` (syllabus loại trừ) |
| c-loss-cf ★ | Loss carry-forward · 5 năm, bù ngang trước, lỗ BĐS | r3:36–37 |
| c-st-fund ★ | S&T fund 20% · Quỹ KH&CN, thu hồi nếu dùng < 70% trong 5 năm, lãi | r3:37–38 |
| c-incentive-concepts ★ | Incentive concepts 1–3 · Hạch toán riêng, thu nhập loại trừ, ngành nghề | r3:38–41 |
| c-location-incentive | Location incentives · Địa bàn khó khăn, KKT, KCNC, KCN | r3:41 · flag `off-focus` (danh sách địa bàn không thi) |
| c-large-scale ★ | Large-scale projects (amended) · ≥ 12.000 tỷ → 10%, ≤ 30 năm | r3:42 |
| c-expansion ★ | Expansion investment · Dự án mở rộng: 3 tiêu chí, 2 cách tách thu nhập | r3:42–44, r3:47 |
| c-transition | Transition rules · Chuyển tiếp ưu đãi cũ/mới | r3:45 |
| c-incentive-duration ★ | Incentive start dates · Thời điểm bắt đầu thuế suất ưu đãi và miễn, giảm | r3:45–46 |
| c-other-reductions | Female / ethnic minority labour, technology transfer, household → enterprise · Giảm thuế khác | r3:47–48 |
| c-admin | CIT administration · Tạm nộp quý (80%), quyết toán, đơn vị phụ thuộc | r3:59 |
| c-exam-approach | CIT exam approach · Cách trình bày bài điều chỉnh, ghi 0 | r3:60 |

### D · Foreign contractor tax

| id | Thẻ | Nguồn |
|---|---|---|
| d-concept | FCT concept & legislation · FCT không phải sắc thuế riêng; TT 103 + TT 69 + NĐ 320 | r5:2 |
| d-scope ★ | Scope (7 cases) · Phạm vi áp dụng | r5:3–6 |
| d-non-applicable ★ | Non-applicable · Không áp dụng | r5:6–7 |
| d-vat-subject ★ | VAT-FCT subject · Hàng kèm dịch vụ: tách / không tách | r5:9 |
| d-cit-subject ★ | CIT-FCT subject · Thu nhập chịu CIT (kể cả bản quyền, lãi vay…) | r5:10–11 |
| d-methods ★ | 3 methods · VAS / hybrid / trực tiếp (điều kiện) | r5:8, r5:11–12 |
| d-hybrid ★ | Hybrid method | r5:22 · flag `conflict` (§9-4) |
| d-nonvas-vat ★ | Non-VAS VAT · VAT = doanh thu tính VAT × tỷ lệ; loại trừ thầu phụ, thuê máy, logistics | r5:13–15 |
| d-nonvas-cit ★ | Non-VAS CIT · CIT = doanh thu tính CIT × tỷ lệ | r5:15, r5:20 |
| d-nonvas-gross-up ★ | Gross-up net contracts · Quy đổi giá net | r5:13, r5:15 |
| d-special-cases ★ | Special cases · Thầu phụ, cho thuê, hàng không, hàng hải, logistics, tái bảo hiểm, chứng khoán, tín phiếu | r5:16–20 |
| d-rates ★ | FCT rates (tables) · Tỷ lệ VAT, CIT theo bảng thuế | tt:1–2 |
| d-mixed-contracts ★ | Mixed contracts example · Ví dụ nhà máy điện 3 trường hợp | r5:21–22 |
| d-admin ★ | FCT administration · Khai từng lần 10 ngày / theo tháng ngày 20 | r5:23 |
| d-ecommerce ★ | E-commerce / digital (direct filing) · Nhà cung cấp số không có PE | r5:23–24 |
| d-dta-procedure | DTA procedure · Mẫu 01/HTQT, giấy chứng nhận cư trú | r5:25–26 |
| d-exam-traps | FCT examiner's notes · Lỗi hay gặp | r5:27–28 |

### E · Value added tax & invoices

| id | Thẻ | Nguồn |
|---|---|---|
| e-law | VAT & invoice legislation · Luật 48/2024, NĐ 181/2025, NĐ 123/2020 + NĐ 70/2025, TT 69/2025 | r4:2, r4:10 |
| e-invoice-content | E-invoice definition & content · Nội dung bắt buộc, thời điểm ký số | r4:3–4 |
| e-invoicing-time | Invoicing time · Thời điểm lập hóa đơn theo từng trường hợp | r4:4–5 |
| e-invoice-special | Special invoices · Quà tặng, khuyến mại, điều chuyển tài sản | r4:6–7 |
| e-invoice-errors ★ | Invoice errors · Điều chỉnh / thay thế / thông báo | r4:7–8 |
| e-returns-discounts ★ | Returns & trade discounts · Trả hàng, chiết khấu | r4:8–9 |
| e-scope-taxpayer | Scope & taxpayers · Phạm vi, người nộp thuế (kể cả nền tảng số) | r4:10–11 |
| e-non-taxable ★ | Non-taxable groups [1]–[12] · Đối tượng không chịu thuế | r4:11–14 |
| e-not-required-declare ★ | Not required to declare · Không phải kê khai, tính nộp | r4:14–15 |
| e-zero-rate ★ | 0% goods & services + conditions · Hàng hóa, dịch vụ 0% và hồ sơ | r4:16–19, r4:37 |
| e-zero-not-entitled ★ | Not entitled to 0% · Không được áp 0% | r4:20 |
| e-five-pct ★ | 5% list · Danh sách 5% | r4:21–22 |
| e-ten-pct ★ | 10% & digital suppliers · 10% và nhà cung cấp số | r4:23 |
| e-zero-vs-exempt ★ | 0% vs non-taxable · Bảng so sánh | r4:23 |
| e-taxable-value | Taxable value (special cases) · Giá tính thuế: nhập khẩu, quà biếu, nội bộ, khuyến mại, cho thuê, trả góp, gia công, xây dựng, BĐS, đại lý, vé, du lịch, cầm đồ… | r4:24–31 |
| e-credit-method | Credit method eligibility · Doanh thu từ 1 tỷ, tự nguyện đăng ký trước 20/12, ổn định 2 năm | r4:32–33 |
| e-input-principles ★ | Input VAT principles · Nguyên tắc khấu trừ | r4:34–35 |
| e-input-conditions ★ | Input VAT conditions · Hóa đơn, thanh toán không dùng tiền mặt ≥ 5 triệu | r4:37 |
| e-input-specific ★ | Specific cases · Ô tô 1,6 tỷ, nhà ở người nước ngoài, công trình cho người lao động, hàng tổn thất, quà tặng | r4:35–40 |
| e-input-apportion ★ | Apportionment · Phân bổ theo doanh thu, dự án đầu tư mới 3 năm | r4:36, r4:38 |
| e-input-noncreditable-to-cit ★ | Non-creditable VAT → CIT expense · VAT không khấu trừ tính vào chi phí | r4:39 |
| e-direct-method | Direct method · Vàng bạc: 10% × GTGT; khác: tỷ lệ 1% / 5% / 3% / 2% | r4:40–41 |
| e-taxing-time | Taxing time · Thời điểm xác định thuế | r4:42 |
| e-declaration-timing ★ | Declaration timing & amendments · Khai vào kỳ nào, khai bổ sung | r4:42 |
| e-refund-investment ★ | Refund: investment projects · 300 triệu, trường hợp bị loại | r4:44–45 |
| e-refund-export ★ | Refund: exports · Công thức, 10% doanh thu, hoàn trước/kiểm tra sau | r4:45–46 |
| e-refund-other ★ | Refund: 5% businesses, dissolution, ODA, diplomats, travellers | r4:46–48 |
| e-refund-procedure | Refund procedure · Hồ sơ, 6 / 40 ngày làm việc | r4:48–49 |
| e-exam-traps | VAT examiner's notes · Lỗi hay gặp | r4:49–50 |

**Tổng: 143 thẻ** (A 20 · B 28 · C 49 · D 17 · E 29), trong đó 86 thẻ ★ là MVP.

## 6. Dây nối (bộ khởi đầu, 36 dây)

| from → to | type | Vì sao (why_vi) |
|---|---|---|
| c-5m-noncash → e-input-conditions | same-number | Ngưỡng 5 triệu thanh toán không dùng tiền mặt áp cho cả chi phí CIT và khấu trừ VAT |
| e-input-noncreditable-to-cit → c-special-deductible | affects | VAT đầu vào không được khấu trừ thì tính vào chi phí CIT, trừ khoản ≥ 5 triệu trả tiền mặt |
| c-car-1-6bn → e-input-specific | same-number | 1,6 tỷ: trần nguyên giá khấu hao và trần VAT được khấu trừ của ô tô ≤ 9 chỗ |
| c-employment-caps → b-emp-meal-uniform | same-number | Đồng phục tiền mặt 5 triệu/năm: trần chi phí CIT = ngưỡng miễn PIT |
| c-employment-caps → b-emp-exempt-benefits | confused-with | Phúc lợi CIT ≤ 1 tháng lương bình quân vs hiếu hỉ PIT ≤ 1 tháng lương |
| c-employment-caps → b-deductions | confused-with | Hưu trí tự nguyện: CIT trừ ≤ 5 triệu/tháng; PIT giảm trừ ≤ 1 triệu/tháng |
| c-other-nondeductible → b-gross-up-net | affects | PIT gánh thay (lương net) có được trừ khi tính CIT không: xem §9-1 |
| c-other-nondeductible → d-nonvas-gross-up | affects | CIT-FCT nộp thay (hợp đồng net): xem §9-1 |
| c-pe-scope → d-methods | computed-with | Có PE là điều kiện đầu tiên của phương pháp VAS / hybrid |
| c-direct-rates → d-rates | same-number | Tỷ lệ CIT trên doanh thu của doanh nghiệp nước ngoài = tỷ lệ CIT-FCT |
| c-capital-transfer-foreign → d-rates | same-number | 2% chuyển nhượng vốn, 0,1% chứng khoán |
| c-overseas-income-credit → b-foreign-tax-credit | same-number | Cùng nguyên tắc MIN(thuế nước ngoài; thuế VN tương ứng) |
| a-tp-interest-30-ebitda → c-interest | affects | Tầng thứ 3 của kiểm tra lãi vay |
| a-tp-nondeductible-costs → c-pe-mgmt-allocation | confused-with | Phí tập đoàn (chuyển giá) vs phí quản lý phân bổ cho PE (công thức) |
| a-tp-related-parties → c-interest | affects | Có bên liên kết thì mới áp trần 30% EBITDA |
| b-business-income → e-non-taxable | confused-with | PIT: ngưỡng 100 triệu (bảng thuế); VAT: cá nhân thu nhập ≤ 200 triệu không chịu thuế (slide). Xem §9-2 |
| b-business-income → e-direct-method | same-number | Tỷ lệ VAT của hộ, cá nhân kinh doanh 1% / 5% / 3% / 2% |
| d-vat-subject → e-taxable-value | affects | Hàng đã nộp VAT nhập khẩu thì không chịu VAT-FCT nữa |
| e-scope-taxpayer → d-vat-subject | same-number | Bên VN mua dịch vụ của nhà cung cấp nước ngoài không có PE là người nộp VAT |
| a-filing-deadlines → b-deadlines | same-number | Hạn ngày 20 / ngày cuối tháng đầu quý dùng chung |
| a-filing-deadlines → d-admin | same-number | FCT: từng lần 10 ngày, theo tháng ngày 20 |
| a-filing-deadlines → c-admin | same-number | Tạm nộp CIT ngày 30 tháng đầu quý sau; quyết toán ngày cuối tháng 3 |
| a-late-interest → c-admin | computed-with | Tạm nộp < 80% → tiền chậm nộp 0,03%/ngày trên phần thiếu vượt 20% |
| e-zero-rate → e-non-taxable | confused-with | 0% được khấu trừ, được hoàn; KCT thì không |
| e-invoicing-time → c-revenue-timing | confused-with | Thời điểm lập hóa đơn vs thời điểm ghi nhận doanh thu tính CIT |
| e-taxing-time → e-invoicing-time | confused-with | Thời điểm xác định VAT vs thời điểm lập hóa đơn |
| b-real-estate → c-real-estate-transfer | contrast | Cá nhân 2% giá bán vs doanh nghiệp tính trên thu nhập (doanh thu − chi phí) |
| b-capital-transfer → c-capital-transfer-vn | contrast | Cá nhân resident 20% lãi vs doanh nghiệp VN 20% lãi (cùng số, khác cơ sở pháp lý) |
| c-st-fund → c-loss-cf | computed-with | Thứ tự: trừ lỗ trước, trừ quỹ KH&CN sau |
| c-incentive-concepts → c-loss-cf | affects | Không tách được lỗ thì bù vào thu nhập ưu đãi trước; lỗ BĐS không bù vào thu nhập ưu đãi |
| c-provisions → c-other-income | affects | Hoàn nhập dự phòng là thu nhập khác |
| e-input-specific → e-invoice-special | computed-with | Quà tặng, khuyến mại: VAT đầu vào được khấu trừ; đầu ra tính theo giá thị trường hoặc 0 nếu đăng ký khuyến mại |
| b-dta → d-dta-procedure | computed-with | Cùng hồ sơ 01/HTQT, giấy chứng nhận cư trú |
| b-scope-resident-vs-non → d-concept | affects | Cá nhân nước ngoài là nhà thầu → phần thuế thu nhập là PIT |
| e-zero-rate → e-refund-export | computed-with | Đủ điều kiện 0% mới tính được số hoàn cho hàng xuất khẩu |
| b-emp-housing-15 → e-input-specific | affects | Nhà cho người nước ngoài: PIT tiền nhà 15%, còn VAT đầu vào thì tùy ai là người sử dụng lao động |

Sonnet được thêm dây khi viết thẻ, **mỗi dây phải có why_vi và nguồn ở cả hai đầu**.

## 7. Cây quyết định (đã soạn, `src/data/tax/trees.json`)

| id | Câu hỏi | Phần |
|---|---|---|
| pit-residence | Resident hay non-resident? | B |
| pit-tax-period | Năm tính thuế đầu tiên của người nước ngoài | B |
| pit-income-type | Loại thu nhập → thuế suất, cơ sở tính | B |
| pit-benefit | Phúc lợi có chịu thuế không (17 loại) | B |
| pit-computation-path | Đường tính gross / net / nhiều nơi trả | B |
| cit-deductible | Chi phí có được trừ không | C |
| cit-interest | Lãi vay: 3 tầng kiểm tra | C |
| cit-loss | Thứ tự bù trừ lỗ | C |
| cit-incentive | Ưu đãi: dự án mới / mở rộng | C |
| fct-scope | Có thuộc FCT không | D |
| fct-method | VAS / hybrid / trực tiếp | D |
| fct-compute | Tính FCT: tách hàng-dịch vụ, net / gross | D |
| vat-treatment | KCT / 0% / 5% / 10% / không phải kê khai | E |
| vat-input | VAT đầu vào có được khấu trừ không | E |
| vat-refund | Có được hoàn VAT không | E |
| invoice-error | Hóa đơn sai: xử lý, khai kỳ nào | E |

Chưa có cây cho phần A (quản lý thuế). Phần A chủ yếu là hạn và mức phạt, nên dùng bảng tra và flashcard là đủ.

## 8. Bẫy đề (bộ khởi đầu, lấy từ tips và examiner's notes trong slide)

1. Đối tượng có mặt dưới 183 ngày nhưng thuê nhà đủ 183 ngày → có thể vẫn là resident (r2:3).
2. Tiền nhà 15% tính trên thu nhập chịu thuế, không phải trên thu nhập tính thuế. Với lương net phải gross-up trước khi lấy 15% (r2:16).
3. Vé về phép cho người thân của expat thì chịu thuế (r3:60).
4. Nhiều nơi trả, lương net: gross-up riêng từng nơi, giảm trừ chỉ áp một lần (r2:23).
5. Người nước ngoài năm đầu đến hoặc năm cuối rời đi: giảm trừ theo tỷ lệ tháng. Người Việt luôn đủ 12 tháng (r2:23).
6. Cổ tức bằng cổ phiếu chưa tính thuế khi nhận (r2:23).
7. Bài điều chỉnh CIT: liệt kê mọi khoản, khoản không điều chỉnh ghi 0 (r3:60).
8. Lãi vay tương ứng vốn điều lệ góp thiếu: công thức khác nhau giữa 1 khoản vay và nhiều khoản vay (r3:20, r3:60).
9. Tài trợ ngoài 7 mục đích cho phép, hoặc thiếu biên bản → không được trừ (r3:24, r3:60).
10. Lỗ chênh lệch tỷ giá đánh giá lại cuối năm không được trừ; lãi thì không tính thuế (r3:22, r3:60).
11. Khấu trừ thuế nước ngoài: phải gross-up thu nhập; không lấy chênh lệch thuế suất; phần vượt thuế VN không được chuyển sang năm sau (r3:61).
12. Tạm nộp CIT 4 quý dưới 80% số phải nộp cả năm → tính tiền chậm nộp trên phần thiếu vượt 20% (r3:59).
13. Trần 20%/năm cho lãi vay ngoài tổ chức tín dụng là quy định mới; đề cũ dùng 1,5 lần lãi suất cơ bản (r3:20).
14. FCT: nhầm nơi thực hiện với nơi tiêu dùng dịch vụ (r5:27).
15. FCT: gross-up sai khi giá hợp đồng là net (r5:27).
16. FCT: hợp đồng hỗn hợp hàng + dịch vụ áp sai tỷ lệ (r5:28).
17. VAT: nhầm 0% với không chịu thuế (r4:50).
18. VAT: xác định sai thời điểm tính thuế trong thương mại, dịch vụ, BĐS, xây dựng, nhập khẩu (r4:50).
19. VAT: tính sai số hoàn khi vừa xuất khẩu vừa bán trong nước (r4:50).
20. Hóa đơn: chọn nhầm giữa điều chỉnh và thay thế; sai kỳ khai (r4:42, r4:50).
21. Nhầm chi phí cần hóa đơn (mua hàng, dịch vụ) với chi phí chỉ cần chứng từ nội bộ (lương, thưởng, dự phòng) (r4:50).
22. Hàng trả tiền mặt ≥ 5 triệu: bị loại ở cả CIT lẫn VAT, và VAT đó không được đưa vào chi phí (r3:12, r4:37, r4:39).
23. Đề cũ (Jun 21 → Dec 24) làm theo luật trước 2025. Đáp án các chủ đề CIT, VAT, FCT có thể khác luật hiện hành (§10).

## 9. Vấn đề nguồn cần lưu ý (không tự sửa, hiển thị cờ `conflict` trên thẻ)

1. **Thuế gánh thay khi tính CIT.** Slide r3:23 xếp "PIT & FCT paid under gross-up method" vào nhóm không được trừ. Decree 320/2025 Điều 10 khoản 12 (bản EN) thì loại trừ (tức cho được trừ) hai khoản: CIT nộp thay nhà thầu nước ngoài khi hợp đồng ghi doanh thu nhà thầu không gồm CIT, và PIT khi hợp đồng lao động ghi lương không gồm PIT. → **Cần hỏi giảng viên.** Cây `cit-deductible` đang hiển thị cả hai, chưa kết luận.
2. **Ngưỡng cá nhân kinh doanh.** Bảng thuế (PIT) ghi 100 triệu; slide VAT r4:13 ghi hàng hóa, dịch vụ của cá nhân kinh doanh có thu nhập năm ≤ 200 triệu thuộc diện không chịu VAT. Hai ngưỡng thuộc hai sắc thuế khác nhau. Thẻ phải ghi rõ con số nào đi với thuế nào.
3. **Thuế suất CIT.** Bảng thuế chỉ cho "Standard rate 20%". Slide r3:4 giới thiệu 15% (doanh thu ≤ 3 tỷ) và 17% (3–50 tỷ) theo Luật 67/2025. Trừ khi đề cho số liệu khác, làm bài với 20%; thẻ `c-rates` ghi rõ điều này.
4. **Điều kiện phương pháp hybrid.** r5:11 ghi hybrid là "2/3 conditions", r5:22 lại liệt kê đủ 3 điều kiện. Cây `fct-method` phân biệt VAS và hybrid theo mức độ áp dụng chế độ kế toán.
5. **Số bị gạch trong slide.** Xem ghi chú ở §2. Đã đối chiếu quỹ KH&CN 20% và dự án mở rộng 40 tỷ / 20 tỷ với luật. Các chỗ khác ("20mil 5mil" ở r4:39–40, "VND3mil → 5mil" ở r3:13) lấy số đứng sau.
6. **Slide r1 tr.6 và tr.8** chứa comment nội bộ của người soạn (HTL1 / TTD1). Giữ trong thư viện, không đưa lên web.
7. **Nông sản bán cho doanh nghiệp kinh doanh tiếp:** slide áp 5% cho kỳ thi 2026 – 6/2027 dù Luật 149 (hiệu lực 01/01/2026) đã chuyển sang "không phải kê khai". Làm bài theo slide (r4:15).

## 10. Kho đề và cách gắn

- 13 kỳ: ≤Dec17 (gộp), Jun18, Dec18, Jun19, J20 sample, Jun21, Dec21, Jun22, Dec22, Jun23, Dec23, Dec24, Dec25 (chỉ có đáp án 1 trang).
- Mỗi câu → `src/data/tax/exam-bank.json`: `{id, sitting, section, q_no, marks, part, nodes[], law_status, question_ref, answer_ref}`. **Không chép nguyên văn đề lên web** khi chưa xác nhận quyền: hiển thị tóm tắt yêu cầu bằng tiếng Việt + link về file trong `/source` (dùng nội bộ).
- `law_status`: `current` (không chịu ảnh hưởng luật mới) / `old-law` (CIT, VAT, FCT các kỳ trước 2026 có chạm điểm đã đổi) / `check`. Thẻ hiển thị số lần xuất hiện theo kỳ → biết chủ đề nào ra nhiều.
- OCR: câu bảng số có thể lệch cột. Khi gắn đề, kiểm tra lại số liệu với ảnh gốc trong file `.xlsx` / `.pdf`.

## 11. Khuôn thẻ (style D)

1. Tiêu đề: `EN term · Tiếng Việt`. Dòng 1: tóm tắt 1–2 câu tiếng Việt.
2. Quy tắc: gạch đầu dòng ngắn, số in đậm, mỗi số có nguồn `(r3:20)`.
3. Công thức (nếu có) trong khối riêng. Ví dụ số chỉ lấy từ slide hoặc đề, không tự bịa.
4. ⚠️ Bẫy: tối đa 3 dòng. 🆕 nếu là quy định mới 2025–2026.
5. "Liên quan": panel dây nối, tự sinh từ `edges`.
6. Note cá nhân của người học: ô ghi chú lưu localStorage, xuất JSON cùng tiến độ.
7. Không dùng thuật ngữ ngoài `docs/GLOSSARY.md`. Thêm thuật ngữ thuế mới vào GLOSSARY (mục "Thuế").
8. Frontmatter trang MDX: `nhanh: D`, `phan: d0…d7`, `style_version: "D-1.0-draft"`.

## 12. Kế hoạch build cho Sonnet (làm tuần tự, không cần dừng chờ duyệt)

1. **Khung:** schema nhánh D (`nhanh: D`), sidebar, trang D0, route `/d/*`, nạp `trees.json`. Viết `docs/STYLE_D.md` từ §11.
2. **Component:** `TaxAtlas` (cây + thẻ + panel liên quan, deep link, bộ lọc, trạng thái thẻ), `DecisionTree` (đi từng bước, nút quay lại, đường đã đi, kết quả có link thẻ, "chạy cây tiếp theo"), `TrapList`, `TaxFlashcards` (tái dùng `Flashcards`), `ExamBank`. Tái dùng `Mindmap`/`AuditMasterMap` nếu phù hợp, màu BISC.
3. **Thẻ ★ (86):** viết `atlas.json` theo §4–§5, đọc nguồn trước khi viết; cờ `conflict` theo §9.
4. **Máy tính D6** (PIT, CIT, FCT, VAT) + **Bảng thuế D7**: mọi hằng số lấy từ một file `src/data/tax/tables-j26.ts`.
5. **Thẻ còn lại (57)** + dây nối bổ sung.
6. **Gắn đề (xong 2026-11-16: 66 câu, 63 thẻ có exam_refs):** chạy nốt OCR (Dec24 + J20 sample question), lập `exam-bank.json`, cập nhật `exam_refs` trong thẻ.
7. **Kiểm tra:** `npm run build` không lỗi; script kiểm tra mọi `cards[]` trong trees và mọi `from/to` trong edges đều có trong nodes; mọi `sources` trỏ tới trang có thật; mở `/d/atlas/` và 3 cây bất kỳ để kiểm tra hiển thị. Sau đó giao **một agent review độc lập**: đối chiếu 20 thẻ ngẫu nhiên với nguồn, báo lệch.
8. Ghi `CHANGELOG.md`, commit. **Không push / deploy khi chưa hỏi.** CHANGELOG cần ghi bù cả phần Opus đã làm ngày 16/11 nhưng chưa commit được vì mất kết nối: nạp thư viện `acca-tx-vnm` (`scripts/ingest_tax.py`, `scripts/ocr_tax_exams.py`), `docs/TAX_MAP.md` D-map 1.0, `src/data/tax/trees.json` D-trees-1.0.

## 14. Trạng thái bàn giao (16/11/2026)

- Đã nằm trên máy: `source/library/acca-tx-vnm/` (slide, syllabus, bảng thuế, đề có text, OCR Jun21 → Dec23), 2 script, chưa commit.
- Chưa nằm trên máy (máy mất kết nối giữa phiên): file này và `trees.json`. Chép vào `docs/TAX_MAP.md` và `src/data/tax/trees.json`.
- Chưa chạy: OCR Dec24 (đề + đáp án) và J20 sample (đề); review độc lập với nguồn.

## 13. Lộ trình ôn 3 tuần (hiển thị ở D0, người học tự chỉnh)

| Tuần | Trọng tâm | Công cụ |
|---|---|---|
| 1 | PIT + CIT (2 câu 15 điểm) | Cây `pit-*`, `cit-*`; máy tính PIT, CIT; đề Dec23, Dec24 câu PIT/CIT |
| 2 | VAT + FCT + Admin | Cây `vat-*`, `fct-*`, `invoice-error`; flashcard phần A |
| 3 | Đề tổng hợp có bấm giờ, sửa bẫy | Kho đề, trang Bẫy đề, nút đỏ trên Atlas |
