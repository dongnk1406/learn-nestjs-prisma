# SQL Cơ Bản – Các Nguyên Tắc Chuẩn Hoá

## 1. Vấn đề Anomaly trong cơ sở dữ liệu

- **Update anomaly**: Một fact (thông tin) xuất hiện ở nhiều nơi, ví dụ trong bảng *Enrollments*. Khi cập nhật, dễ dẫn đến dữ liệu không đồng nhất.  
- **Insert anomaly**: Không thể thêm dữ liệu vào một bảng vì thiếu thông tin bắt buộc (ví dụ cần thông tin chưa có sẵn).  

## 2. Các nguyên tắc chuẩn hoá để tránh anomaly (1NF, 2NF, 3NF, 3.5NF, 4NF)

📺 Tham khảo video: [Database Normalization](https://www.youtube.com/watch?v=xO1DaEtHY_g&list=PLRLJQuuRRcFnSyJnNbKBO0mqPgIoezQat&index=8)

### 🔹 1NF (First Normal Form)

- Mỗi ô chỉ chứa **một giá trị duy nhất**.  
- Không được phép có danh sách, mảng hay nhóm giá trị lặp lại trong một ô.  

### 🔹 2NF (Second Normal Form)

- Đạt 1NF.  
- Nếu bảng có **khóa chính gồm nhiều cột**, thì mọi cột khác phải phụ thuộc vào **toàn bộ khóa**, không chỉ một phần.  
- **Ví dụ:**  
  - Bảng *Enrollments*:  

    ```text
    | courseId | courseName | studentId | registerDate |
    |----------|------------|-----------|--------------|
    | CS101    | Intro CS   | 001       | 2025-01-15   |
    | CS102    | Data Struct| 001       | 2025-01-20   |
    | CS101    | Intro CS   | 002       | 2025-01-18   |
    ```

    > Bảng này vi phạm 2NF vì `courseName` lặp lại nhiều lần cho cùng một `courseId`. Điều này gây ra redundancy (dư thừa dữ liệu) và có thể dẫn đến update anomaly.

    - Khóa chính: `(courseId, studentId)`  
    - `courseName` chỉ phụ thuộc vào `courseId`, không phụ thuộc vào `studentId` → vi phạm 2NF.  

- **Cách làm đúng:**  
  - Tách thành 2 bảng:  
    - `Course(courseId, courseName)`  
    - `Enrollments(courseId, studentId, registerDate)`  

### 🔹 3NF (Third Normal Form)

- Đạt 2NF.  
- Các thuộc tính **không khóa** phải phụ thuộc trực tiếp vào **khóa chính**, không phụ thuộc vào cột khác.  
- **Ví dụ:**  

  ```text
  | hocsinhId | Điểm | Xếp loại |
  |-----------|------|----------|
  | HS001     | 8.5  | Giỏi     |
  | HS002     | 6.0  | Khá      |
  | HS003     | 9.2  | Xuất sắc |
  ```

  > Bảng này vi phạm 3NF vì `Xếp loại` không phụ thuộc trực tiếp vào khóa chính `hocsinhId`, mà phụ thuộc vào `Điểm`. Nếu cần thay đổi thang điểm xếp loại, phải cập nhật nhiều dòng.

  - `Xếp loại` phụ thuộc vào `Điểm`, trong khi `Điểm` phụ thuộc vào `hocsinhId`.  
  - Nếu cập nhật `Điểm` thành công nhưng lỗi khi cập nhật `Xếp loại` → dữ liệu không toàn vẹn.  

- **Cách làm đúng:**  
  - Tách thành 2 bảng:  
    - `BangDiem(hocsinhId, Điểm)`  
    - `XepLoai(Điểm, Xếp loại)`  

### 🔹 3.5NF (Boyce-Codd Normal Form – BCNF)

- Nếu Y phụ thuộc vào X thì X phải là **super key**.  
- Nghĩa là X có thể xác định duy nhất một dòng trong bảng.  

### 🔹 4NF (Fourth Normal Form)

- Đạt 3NF.  
- Tránh các bảng có cột là tổ hợp của những thuộc tính **không liên quan** (multi-valued dependency).  
- Tách dữ liệu để đảm bảo mỗi bảng chỉ mô tả một mối quan hệ độc lập.  

## 📘 DDL – Data Definition Language

### Create Table

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> Tạo bảng `users` với 4 cột. `id` là khóa chính, `email` có ràng buộc UNIQUE (không trùng lặp), `created_at` tự động gán thời gian hiện tại khi tạo record mới.

### Alter Table

```sql
ALTER TABLE users ADD age INT;
ALTER TABLE users DROP age;
```

> - Dòng 1: Thêm cột `age` kiểu INT vào bảng `users` đã tồn tại
> - Dòng 2: Xóa cột `age` khỏi bảng `users`

### Drop Table

```sql
DROP TABLE users;
```

> Xóa hoàn toàn bảng `users` và tất cả dữ liệu bên trong. **Cẩn thận**: Lệnh này không thể undo!

---

## 📗 DML – Data Manipulation Language

### Insert

```sql
INSERT INTO users (id, name, email)
VALUES (1, 'John', 'john@test.com');
```

> Thêm 1 record mới vào bảng `users` với giá trị cụ thể cho 3 cột `id`, `name`, `email`. Cột `created_at` sẽ tự động nhận giá trị timestamp hiện tại.

### Update

```sql
UPDATE users
SET name = 'John Doe'
WHERE id = 1;
```

> Cập nhật tên của user có `id = 1` thành 'John Doe'. Mệnh đề `WHERE` đảm bảo chỉ cập nhật đúng record cần thiết.

⚠️ **Without `WHERE`, all rows will be updated.**

### Delete

```sql
DELETE FROM users WHERE id = 1;
```

> Xóa user có `id = 1` khỏi bảng. **Cẩn thận**: Không có `WHERE` sẽ xóa tất cả records!

---

# 🧠 Data Query Language (DQL) — Deep Dive

DQL is primarily about **`SELECT`** and everything around it. Some of The Most Important SQL Commands

- **SELECT** - extracts data from a database  
- **UPDATE** - updates data in a database  
- **DELETE** - deletes data from a database  
- **INSERT INTO** - inserts new data into a database  
- **CREATE DATABASE** - creates a new database  
- **ALTER DATABASE** - modifies a database  
- **CREATE TABLE** - creates a new table  
- **ALTER TABLE** - modifies a table  
- **DROP TABLE** - deletes a table  
- **CREATE INDEX** - creates an index (search key)  
- **DROP INDEX** - deletes an index  

---

## 1️⃣ SELECT — The Core

### Basic Form

```sql
SELECT column1, column2
FROM table_name;
```

> Cú pháp cơ bản để lấy dữ liệu từ bảng. Chỉ định các cột cần lấy thay vì dùng `*` để tối ưu performance.

### Best Practice

```sql
SELECT id, name, email
FROM users;
```

> Luôn chỉ định tên cột cụ thể thay vì `SELECT *` để:
>
> - Tăng performance (chỉ lấy dữ liệu cần thiết)
> - Code dễ hiểu và bảo trì
> - Tránh lỗi khi cấu trúc bảng thay đổi

❌ **Avoid in production:**

```sql
SELECT * FROM users;
```

> Tránh dùng `SELECT *` trong production vì:
>
> - Lấy tất cả cột (có thể không cần thiết)
> - Chậm hơn khi bảng có nhiều cột
> - Khó debug khi có lỗi

---

## 2️⃣ WHERE — Filtering Rows

### Comparison Operators

```text
=   !=   <>   >   <   >=   <=
```

> Các toán tử so sánh cơ bản. `!=` và `<>` đều có nghĩa là "không bằng".

```sql
SELECT *
FROM orders
WHERE total > 100;
```

> Lọc tất cả đơn hàng có tổng tiền lớn hơn 100. WHERE clause được thực hiện trước khi trả về kết quả.

### Logical Operators

```text
AND   OR   NOT
```

> Toán tử logic để kết hợp nhiều điều kiện.

```sql
SELECT *
FROM orders
WHERE status = 'DELIVERED'
  AND total > 50;
```

> Lọc đơn hàng có trạng thái 'DELIVERED' VÀ tổng tiền > 50. Cả 2 điều kiện phải đúng.

### IN

```sql
SELECT *
FROM orders
WHERE status IN ('DELIVERED', 'FAILED');
```

> Lọc đơn hàng có trạng thái là 'DELIVERED' HOẶC 'FAILED'. Tương đương với `status = 'DELIVERED' OR status = 'FAILED'` nhưng ngắn gọn hơn.

### BETWEEN

```sql
SELECT *
FROM orders
WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31';
```

> Lọc đơn hàng được tạo từ 1/1/2025 đến 31/1/2025. BETWEEN bao gồm cả 2 giá trị biên.

⚠️ `BETWEEN` is **inclusive**

### LIKE / ILIKE

```sql
SELECT *
FROM users
WHERE email LIKE '%@gmail.com';
```

> Tìm user có email kết thúc bằng '@gmail.com'. `%` có nghĩa là "bất kỳ ký tự nào".

(Postgres)

```sql
WHERE email ILIKE '%gmail%'
```

> Tương tự LIKE nhưng không phân biệt hoa/thường (case-insensitive). Chỉ có trong PostgreSQL.

### NULL Handling (VERY IMPORTANT)

```sql
SELECT *
FROM users
WHERE deleted_at IS NULL;
```

> Lọc user chưa bị xóa (deleted_at là NULL). Phải dùng `IS NULL`, không được dùng `= NULL`.

❌ Wrong:

```sql
WHERE deleted_at = NULL;
```

> Sai cú pháp! NULL không thể so sánh bằng `=`. Phải dùng `IS NULL` hoặc `IS NOT NULL`.

---

## 3️⃣ ORDER BY — Sorting

```sql
SELECT *
FROM orders
ORDER BY created_at DESC;
```

> Sắp xếp kết quả theo `created_at` giảm dần (mới nhất trước). `ASC` = tăng dần (mặc định), `DESC` = giảm dần.

Multiple columns:

```sql
ORDER BY status ASC, created_at DESC;
```

> Sắp xếp theo `status` tăng dần trước, sau đó theo `created_at` giảm dần trong cùng nhóm status.

---

## 4️⃣ LIMIT & OFFSET — Pagination

```sql
SELECT *
FROM orders
LIMIT 20 OFFSET 40;
```

> Lấy 20 records, bỏ qua 40 records đầu tiên. Thường dùng cho phân trang (page 3, mỗi page 20 items).

⚠️ Large `OFFSET` = slow  
👉 Prefer **keyset pagination** for big tables.

---

## 5️⃣ DISTINCT — Remove Duplicates

```sql
SELECT DISTINCT status
FROM orders;
```

> Loại bỏ các giá trị trùng lặp trong cột `status`, chỉ trả về các giá trị duy nhất.

Multiple columns:

```sql
SELECT DISTINCT user_id, status
FROM orders;
```

> Loại bỏ các cặp `(user_id, status)` trùng lặp. Chỉ trả về các combination duy nhất.

---

## 6️⃣ Aggregate Functions

### Common Aggregates

- `COUNT(*)` - Đếm tổng số rows
- `SUM(amount)` - Tính tổng giá trị
- `AVG(amount)` - Tính trung bình  
- `MIN(amount)` - Tìm giá trị nhỏ nhất
- `MAX(amount)` - Tìm giá trị lớn nhất

```sql
SELECT COUNT(*) FROM orders;
```

> Đếm tổng số đơn hàng trong bảng. Aggregate functions thường đi kèm với GROUP BY.

### COUNT Differences (IMPORTANT)

- `COUNT(*)` → counts all rows  
- `COUNT(column)` → ignores `NULL`

> `COUNT(*)` đếm tất cả rows kể cả NULL, còn `COUNT(column)` bỏ qua các giá trị NULL.

---

## 7️⃣ GROUP BY — Aggregation Logic

```sql
SELECT status, COUNT(*) AS total
FROM orders
GROUP BY status;
```

> Nhóm các đơn hàng theo `status`, đếm số lượng trong mỗi nhóm. Kết quả sẽ có 1 row cho mỗi status khác nhau.

**Rule:**  
Every selected column must be:

- in `GROUP BY`, or  
- inside an aggregate function

> **Quy tắc quan trọng:** Mọi cột trong SELECT phải có trong GROUP BY hoặc nằm trong hàm aggregate.

❌ Invalid:

```sql
SELECT status, created_at, COUNT(*)
FROM orders
GROUP BY status;
```

> Lỗi vì `created_at` không có trong GROUP BY và không phải aggregate function.

---

## 8️⃣ HAVING — Filter Aggregates

```sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status
HAVING COUNT(*) > 10;
```

> Lọc các nhóm sau khi GROUP BY. Chỉ hiển thị status nào có hơn 10 đơn hàng. HAVING hoạt động sau GROUP BY.

🧠 Mental model:  

- `WHERE` → filters **rows before grouping**  
- `HAVING` → filters **groups after aggregation**

> **Ghi nhớ:** WHERE lọc dữ liệu trước khi nhóm, HAVING lọc các nhóm sau khi đã aggregate.

---

## 9️⃣ Joins — Querying Multiple Tables

### INNER JOIN

**INNER JOIN** là phép kết hợp dữ liệu từ hai hoặc nhiều bảng, chỉ trả về các hàng có giá trị khớp nhau ở cột liên quan trong tất cả các bảng. Nó tương tự như phép **giao nhau (intersection)** của các tập hợp.  

Đây là kiểu JOIN phổ biến nhất, thường được sử dụng để lấy các bản ghi liên quan chặt chẽ, ví dụ: danh sách đơn hàng cùng thông tin khách hàng. Mệnh đề **`ON`** được dùng để xác định điều kiện so sánh.

#### Cách hoạt động

- **So sánh cặp:** `INNER JOIN` so sánh từng hàng của bảng thứ nhất với từng hàng của bảng thứ hai.  
- **Điều kiện khớp:** Khi giá trị ở cột được chỉ định trong mệnh đề `ON` (ví dụ: `tableA.column = tableB.column`) khớp nhau, các cột từ cả hai bảng sẽ được kết hợp thành một hàng mới trong kết quả.  
- **Loại bỏ bản ghi không khớp:** Các hàng chỉ có ở một bảng hoặc không có giá trị tương ứng ở bảng còn lại sẽ bị loại bỏ.  

#### Cú pháp

```sql
SELECT columns
FROM tableA
INNER JOIN tableB
ON tableA.column_name = tableB.column_name;
```

- **SELECT columns:** Liệt kê các cột bạn muốn hiển thị.  
- **FROM tableA:** Bảng đầu tiên (bảng chính).  
- **INNER JOIN tableB:** Bảng thứ hai cần kết hợp (có thể viết gọn thành `JOIN tableB`).  
- **ON tableA.column_name = tableB.column_name:** Điều kiện để xác định các hàng khớp nhau.  

#### Ví dụ

Giả sử có bảng **Orders** (Mã Đơn Hàng, Mã Khách Hàng) và bảng **Customers** (Mã Khách Hàng, Tên Khách Hàng):

```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

👉 Kết quả: Trả về danh sách các đơn hàng kèm tên khách hàng, nhưng **chỉ những đơn hàng có khách hàng tồn tại trong bảng Customers**.

### LEFT JOIN (VERY COMMON)

**LEFT JOIN** (hay **LEFT OUTER JOIN**) là phép nối bảng trong SQL, trả về:  

- **Tất cả các hàng từ bảng bên trái (Left Table)**  
- **Các hàng khớp tương ứng từ bảng bên phải (Right Table)**  
- Nếu không có hàng nào khớp ở bảng bên phải, các cột của bảng đó sẽ hiển thị giá trị **`NULL`**.  

👉 Điều này giúp bạn giữ lại toàn bộ dữ liệu từ bảng chính (bên trái), ngay cả khi không có dữ liệu liên quan trong bảng khác.

#### Cách hoạt động

- **Bảng trái (Left Table):** Tất cả các bản ghi từ bảng này đều được bao gồm trong kết quả cuối cùng.  
- **Bảng phải (Right Table):** Chỉ những bản ghi có giá trị trùng khớp với điều kiện `ON` mới được đưa vào.  
- **Không khớp:** Nếu một bản ghi ở bảng trái không tìm thấy bản ghi khớp ở bảng phải, kết quả vẫn có bản ghi đó, nhưng các cột tương ứng từ bảng phải sẽ là `NULL`.  

#### Cú pháp

```sql
SELECT columns
FROM table1 -- Bảng bên trái
LEFT JOIN table2 -- Bảng bên phải
ON table1.common_column = table2.common_column;
```

- **table1:** Bảng bên trái.  
- **table2:** Bảng bên phải.  
- **ON:** Xác định cột để so sánh và kết hợp dữ liệu.  

#### 📊 Ví dụ

Giả sử có bảng **KhachHang** (bên trái) và bảng **DonHang** (bên phải):

```sql
SELECT K.TenKhachHang, D.MaDonHang
FROM KhachHang K
LEFT JOIN DonHang D 
ON K.MaKhachHang = D.MaKhachHang;
```

👉 Kết quả: Trả về tên tất cả khách hàng. Nếu có khách hàng chưa đặt đơn hàng nào, họ vẫn xuất hiện trong kết quả, nhưng cột **MaDonHang** sẽ là `NULL`.

### Join with Filter

```sql
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
 AND o.status = 'DELIVERED';
```

> JOIN với điều kiện thêm. Chỉ lấy orders có status 'DELIVERED', nhưng vẫn giữ tất cả users.

⚠️ Filtering in `ON` vs `WHERE` matters.

---

## 🔟 Subqueries

### IN Subquery

```sql
SELECT *
FROM users
WHERE id IN (
  SELECT user_id
  FROM orders
  WHERE total > 100
);
```

> Lấy tất cả users có ít nhất 1 order với total > 100. Subquery (truy vấn con) chạy trước, trả về list user_id, sau đó main query sử dụng kết quả này.

### EXISTS (More Efficient)

```sql
SELECT *
FROM users u
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.user_id = u.id
);
```

> Tương tự như trên nhưng hiệu quả hơn. EXISTS chỉ kiểm tra có tồn tại hay không, không cần trả về dữ liệu cụ thể.

---

## 1️⃣1️⃣ CASE — Conditional Logic

```sql
SELECT
  id,
  total,
  CASE
    WHEN total > 100 THEN 'HIGH'
    WHEN total > 50 THEN 'MEDIUM'
    ELSE 'LOW'
  END AS order_level
FROM orders;
```

> Tạo cột mới `order_level` dựa trên giá trị `total`. CASE hoạt động như if-else trong programming.

---

## 1️⃣2️⃣ Aliases

```sql
SELECT
  u.name AS user_name,
  COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name;
```

> Đặt tên ngắn gọn cho bảng (`u`, `o`) và cột (`user_name`, `order_count`) để code dễ đọc hơn.

---

## 1️⃣3️⃣ Date & Time Queries

### Filtering by Date

```sql
SELECT *
FROM orders
WHERE created_at >= NOW() - INTERVAL '7 days';
```

> Lấy orders trong 7 ngày qua. `NOW()` là thời gian hiện tại, `INTERVAL '7 days'` là khoảng thời gian 7 ngày.

### Difference Between Dates

```sql
SELECT
  AVG(delivery_date - sent_at) AS avg_delivery_time
FROM messages;
```

> Tính thời gian giao hàng trung bình bằng cách lấy hiệu 2 timestamp.

➡ Perfect for `processingSeconds`

---

## 1️⃣4️⃣ Window Functions (Advanced DQL)

### AVG Without GROUP BY

```sql
SELECT
  user_id,
  total,
  AVG(total) OVER (PARTITION BY user_id) AS avg_user_total
FROM orders;
```

> Tính trung bình total cho từng user mà không cần GROUP BY. Mỗi row vẫn giữ nguyên, chỉ thêm cột avg_user_total.

### Ranking

```sql
SELECT
  user_id,
  total,
  RANK() OVER (ORDER BY total DESC) AS rank
FROM orders;
```

> Xếp hạng các orders theo total giảm dần. Mỗi order sẽ có rank tương ứng.

---

## 1️⃣5️⃣ Execution Order (CRITICAL)

SQL does **not** execute top-down.  
Actual order:

1. FROM  
2. JOIN  
3. WHERE  
4. GROUP BY  
5. HAVING  
6. SELECT  
7. ORDER BY  
8. LIMIT  

🧠 This explains many “why doesn’t this work?” moments.

---

## 1️⃣6️⃣ Performance Tips (DQL Focused)

✔ Filter early (`WHERE`)  
✔ Index columns in:

- `WHERE`
- `JOIN`
- `ORDER BY`

❌ Avoid:

- `SELECT *`
- Large `OFFSET`
- Unnecessary subqueries

---

## 1️⃣7️⃣ Real-World Example (Metrics)

### Average Processing Time

```sql
SELECT
  status,
  AVG(processing_seconds) AS avg_processing_seconds
FROM message_logs
GROUP BY status;
```

> Tính thời gian xử lý trung bình cho từng trạng thái message. Hữu ích để monitor performance system.

### Success Rate

```sql
SELECT
  COUNT(*) FILTER (WHERE status = 'DELIVERED') * 100.0 / COUNT(*) AS success_rate
FROM message_logs;
```

> Tính tỉ lệ thành công (%) bằng cách đếm số message DELIVERED chia cho tổng số message. `FILTER` chỉ có trong PostgreSQL.

### Truy vấn N+1

Truy vấn N+1 (N+1 query) là một vấn đề hiệu suất phổ biến trong ứng dụng cơ sở dữ liệu, xảy ra khi bạn thực hiện 1 truy vấn ban đầu để lấy dữ liệu chính,
sau đó lặp qua kết quả và thực hiện thêm N truy vấn nữa để lấy dữ liệu liên quan, tổng cộng là 1 + N truy vấn thay vì một truy vấn duy nhất,
gây chậm trễ và lãng phí tài nguyên, thường gặp khi dùng ORM (Object-Relational Mapper).
