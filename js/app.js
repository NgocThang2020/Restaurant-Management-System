const dishes = [
  {
    id: 1,
    name: "Phở bò tái",
    cat: "Món chính",
    price: 75000,
    emoji: "🍜",
    tag: "Bán chạy",
    desc: "Nước dùng ninh xương 12 tiếng, thịt bò tươi",
  },
  {
    id: 2,
    name: "Cơm tấm sườn",
    cat: "Món chính",
    price: 65000,
    emoji: "🍛",
    tag: "Đặc biệt",
    desc: "Sườn nướng mật ong, bì chả nhà làm",
  },
  {
    id: 3,
    name: "Gỏi cuốn tôm thịt",
    cat: "Khai vị",
    price: 45000,
    emoji: "🥗",
    tag: "Tươi ngon",
    desc: "Cuốn tay mỗi ngày, dùng kèm sốt đậu phộng",
  },
  {
    id: 4,
    name: "Bánh xèo miền Tây",
    cat: "Khai vị",
    price: 55000,
    emoji: "🥞",
    tag: "Giòn rụm",
    desc: "Vỏ bánh vàng giòn, nhân tôm thịt và giá",
  },
  {
    id: 5,
    name: "Cá kho tộ",
    cat: "Món chính",
    price: 85000,
    emoji: "🐟",
    tag: "Cơm nhà",
    desc: "Cá lóc kho niêu đất cùng nước màu dừa",
  },
  {
    id: 6,
    name: "Chè khúc bạch",
    cat: "Tráng miệng",
    price: 30000,
    emoji: "🍧",
    tag: "Mát lạnh",
    desc: "Nhãn tươi, hạnh nhân rang và thạch mềm",
  },
  {
    id: 7,
    name: "Trà đào cam sả",
    cat: "Đồ uống",
    price: 35000,
    emoji: "🍹",
    tag: "Thanh mát",
    desc: "Trà đen ủ lạnh, đào vàng và cam tươi",
  },
  {
    id: 8,
    name: "Nước sâm nhà nấu",
    cat: "Đồ uống",
    price: 20000,
    emoji: "🥤",
    tag: "Ít ngọt",
    desc: "La hán quả, rong biển và thảo mộc",
  },
  {
    id: 9,
    name: "Kem dừa",
    cat: "Tráng miệng",
    price: 40000,
    emoji: "🍨",
    tag: "Món mới",
    desc: "Kem dừa thủ công trong trái dừa tươi",
  },
];
const categories = ["Tất cả", "Khai vị", "Món chính", "Đồ uống", "Tráng miệng"];
let state = loadState();
let category = "Tất cả";
let selectedBookingTable = null;
let selectedOrderTable = null;
let selectedPaymentTable = null;
function loadState() {
  try {
    return (
      JSON.parse(localStorage.getItem("bepnha-state")) || {
        bookings: [],
        orders: {},
        paid: [],
      }
    );
  } catch {
    return { bookings: [], orders: {}, paid: [] };
  }
}
function save() {
  localStorage.setItem("bepnha-state", JSON.stringify(state));
  renderAll();
}
function money(n) {
  return new Intl.NumberFormat("vi-VN").format(n) + " ₫";
}
function toast(msg) {
  const t = document.querySelector("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2300);
}
function today() {
  let d = new Date();
  document.querySelector("#dateLabel").textContent = d.toLocaleDateString(
    "vi-VN",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  );
  document.querySelector("#bookDate").value = d.toISOString().slice(0, 10);
}
function renderFilters() {
  document.querySelector("#filters").innerHTML = categories
    .map(
      (c) =>
        `<button class="filter ${c === category ? "active" : ""}" data-category="${c}">${c}</button>`,
    )
    .join("");
  document.querySelectorAll("[data-category]").forEach(
    (b) =>
      (b.onclick = () => {
        category = b.dataset.category;
        renderFilters();
        renderMenu();
      }),
  );
}
function dishCard(d, forOrder = false) {
  return `<article class="dish"><div class="dish-top"><span class="dish-tag">${d.tag}</span>${d.emoji}</div><div class="dish-body"><div class="dish-row"><div class="dish-name">${d.name}</div><div class="dish-price">${money(d.price)}</div></div><div class="dish-desc">${d.desc}</div><button class="add-btn" data-add="${d.id}">${forOrder ? "＋ Thêm vào đơn" : "＋ Gọi món"}</button></div></article>`;
}
function renderMenu() {
  document.querySelector("#menuGrid").innerHTML = dishes
    .filter((d) => category === "Tất cả" || d.cat === category)
    .map((d) => dishCard(d))
    .join("");
  document.querySelectorAll("#menuGrid [data-add]").forEach(
    (b) =>
      (b.onclick = () => {
        go("orders");
        if (!selectedOrderTable) {
          const b0 = state.bookings.find((x) => !state.paid.includes(x.table));
          selectedOrderTable = b0?.table ?? null;
        }
        if (selectedOrderTable) addDish(+b.dataset.add);
        else toast("Vui lòng đặt bàn trước khi gọi món");
      }),
  );
}
function reservedTables() {
  return state.bookings
    .filter((b) => !state.paid.includes(b.table))
    .map((b) => b.table);
}
function renderBooking() {
  const busy = reservedTables();
  document.querySelector("#bookingTables").innerHTML = Array.from(
    { length: 8 },
    (_, i) => i + 1,
  )
    .map(
      (n) =>
        `<button type="button" class="table-card ${selectedBookingTable === n ? "selected" : ""}" data-btable="${n}"><span class="dot ${busy.includes(n) ? "busy" : ""}"></span><span class="num">Bàn ${String(n).padStart(2, "0")}</span><small>${busy.includes(n) ? "Đã đặt" : "2–4 khách"}</small></button>`,
    )
    .join("");
  document.querySelectorAll("[data-btable]").forEach(
    (b) =>
      (b.onclick = () => {
        selectedBookingTable = +b.dataset.btable;
        renderBooking();
      }),
  );
  document.querySelector("#reservationList").innerHTML = state.bookings.length
    ? state.bookings
        .slice()
        .reverse()
        .map(
          (x) =>
            `<div class="reservation"><div><div class="res-main">${x.name} · Bàn ${String(x.table).padStart(2, "0")}</div><div class="res-meta">${x.date} · ${x.time} · ${x.guests} khách</div></div><span class="badge">${state.paid.includes(x.table) ? "Đã thanh toán" : "Đã xác nhận"}</span></div>`,
        )
        .join("")
    : '<div class="empty">Chưa có lượt đặt bàn nào.</div>';
}
function addDish(id) {
  if (!selectedOrderTable) return;
  let order = state.orders[selectedOrderTable] || {};
  order[id] = (order[id] || 0) + 1;
  state.orders[selectedOrderTable] = order;
  save();
  toast("Đã thêm món vào đơn");
}
function renderOrders() {
  const tables = reservedTables();
  document.querySelector("#orderTables").innerHTML = tables.length
    ? tables
        .map(
          (n) =>
            `<button class="table-pill ${selectedOrderTable === n ? "active" : ""}" data-otable="${n}">Bàn ${String(n).padStart(2, "0")}</button>`,
        )
        .join("")
    : '<div class="empty">Chưa có bàn đặt. Hãy đặt bàn trước.</div>';
  document.querySelectorAll("[data-otable]").forEach(
    (b) =>
      (b.onclick = () => {
        selectedOrderTable = +b.dataset.otable;
        renderOrders();
      }),
  );
  document.querySelector("#orderTableName").textContent = selectedOrderTable
    ? `Bàn ${String(selectedOrderTable).padStart(2, "0")} · Đơn gọi món hiện tại`
    : "Chọn bàn để bắt đầu";
  document.querySelector("#orderMenu").innerHTML = dishes
    .map((d) => dishCard(d, true))
    .join("");
  document
    .querySelectorAll("#orderMenu [data-add]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          selectedOrderTable
            ? addDish(+b.dataset.add)
            : toast("Vui lòng chọn bàn đã đặt")),
    );
  let order = state.orders[selectedOrderTable] || {};
  let entries = Object.entries(order);
  document.querySelector("#orderItems").innerHTML = entries.length
    ? entries
        .map(([id, q]) => {
          let d = dishes.find((x) => x.id === +id);
          return `<div class="order-item"><div class="item-emoji">${d.emoji}</div><div class="item-info"><strong>${d.name}</strong><small>${money(d.price)} / phần</small></div><div class="qty"><button data-qty="${id}" data-change="-1">−</button><span>${q}</span><button data-qty="${id}" data-change="1">+</button></div></div>`;
        })
        .join("")
    : '<div class="empty">Chưa có món nào trong đơn.</div>';
  document.querySelectorAll("[data-qty]").forEach(
    (b) =>
      (b.onclick = () => {
        let o = state.orders[selectedOrderTable];
        o[b.dataset.qty] = Math.max(
          0,
          (o[b.dataset.qty] || 0) + +b.dataset.change,
        );
        save();
      }),
  );
  let total = entries.reduce(
    (s, [id, q]) => s + dishes.find((x) => x.id === +id).price * q,
    0,
  );
  document.querySelector("#orderTotal").innerHTML =
    `<div class="total-row grand"><span>Tạm tính</span><span>${money(total)}</span></div><div class="bill-note">Thuế và phí đã được tính trong giá món.</div>`;
}
function getBill(table) {
  let order = state.orders[table] || {};
  let entries = Object.entries(order)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ dish: dishes.find((d) => d.id === +id), q }));
  return {
    entries,
    total: entries.reduce((s, x) => s + x.dish.price * x.q, 0),
  };
}
function renderPayment() {
  let tables = reservedTables();
  document.querySelector("#paymentTables").innerHTML = tables.length
    ? tables
        .map(
          (n) =>
            `<button class="table-pill ${selectedPaymentTable === n ? "active" : ""}" data-ptable="${n}">Bàn ${String(n).padStart(2, "0")}</button>`,
        )
        .join("")
    : '<div class="empty">Không có hóa đơn đang mở.</div>';
  document.querySelectorAll("[data-ptable]").forEach(
    (b) =>
      (b.onclick = () => {
        selectedPaymentTable = +b.dataset.ptable;
        renderPayment();
      }),
  );
  let bill = getBill(selectedPaymentTable);
  document.querySelector("#payAmount").textContent = money(bill.total);
  document.querySelector("#payTableName").textContent = selectedPaymentTable
    ? `Bàn ${String(selectedPaymentTable).padStart(2, "0")} · ${bill.entries.length} món`
    : "Chưa chọn bàn";
  document.querySelector("#billDetails").innerHTML = bill.entries.length
    ? `<div class="bill-line head"><span>Món</span><span>SL</span><span>Thành tiền</span></div>${bill.entries.map((x) => `<div class="bill-line"><span>${x.dish.name}</span><span>${x.q}</span><span>${money(x.dish.price * x.q)}</span></div>`).join("")}<div class="total-row grand"><span>Tổng cộng</span><span>${money(bill.total)}</span></div>`
    : '<div class="empty">Chưa có món để thanh toán.</div>';
}
function renderStats() {
  document.querySelector("#occupiedStat").textContent = reservedTables().length;
  document.querySelector("#bookingStat").textContent = state.bookings.length;
}
function renderAll() {
  renderMenu();
  renderBooking();
  renderOrders();
  renderPayment();
  renderStats();
}
const titles = {
  menu: ["Thực đơn hôm nay", "Món ngon nhà làm, chọn món bạn yêu thích."],
  booking: ["Đặt bàn", "Giữ chỗ trước để có trải nghiệm trọn vẹn."],
  orders: ["Gọi món theo bàn", "Chọn bàn đã đặt và thêm món vào hóa đơn."],
  payment: ["Thanh toán hóa đơn", "Kiểm tra và hoàn tất hóa đơn của khách."],
};
function go(page) {
  document
    .querySelectorAll(".nav button")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === page));
  ["menu", "booking", "orders", "payment"].forEach((p) =>
    document.querySelector(`#${p}Page`).classList.toggle("hidden", p !== page),
  );
  document.querySelector("#pageTitle").textContent = titles[page][0];
  document.querySelector("#pageSubtitle").textContent = titles[page][1];
}
document
  .querySelectorAll(".nav button")
  .forEach((b) => (b.onclick = () => go(b.dataset.page)));
document.querySelector("#bookingForm").onsubmit = (e) => {
  e.preventDefault();
  if (!selectedBookingTable) {
    toast("Vui lòng chọn bàn");
    return;
  }
  const busy = reservedTables();
  if (busy.includes(selectedBookingTable)) {
    toast("Bàn này đã được đặt");
    return;
  }
  let booking = {
    id: Date.now(),
    name: document.querySelector("#guestName").value.trim(),
    phone: document.querySelector("#guestPhone").value.trim(),
    date: document.querySelector("#bookDate").value,
    time: document.querySelector("#bookTime").value,
    guests: +document.querySelector("#guestCount").value,
    table: selectedBookingTable,
  };
  state.bookings.push(booking);
  state.orders[selectedBookingTable] = {};
  selectedOrderTable = selectedBookingTable;
  save();
  e.target.reset();
  selectedBookingTable = null;
  today();
  toast("Đặt bàn thành công!");
};
document.querySelector("#payButton").onclick = () => {
  if (!selectedPaymentTable) {
    toast("Vui lòng chọn bàn cần thanh toán");
    return;
  }
  let bill = getBill(selectedPaymentTable);
  if (!bill.total) {
    toast("Hóa đơn chưa có món");
    return;
  }
  state.paid.push(selectedPaymentTable);
  delete state.orders[selectedPaymentTable];
  save();
  selectedPaymentTable = null;
  toast("Thanh toán thành công!");
};
today();
renderFilters();
renderAll();
