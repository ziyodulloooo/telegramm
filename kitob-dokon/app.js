// =================================================================
// ZIYO KITOB - Asosiy JavaScript Dastur Mantiqi (app.js)
// =================================================================

// Ilova Holati (State)
const state = {
  books: [],
  cart: [],
  favorites: new Set(),
  activeCategory: 'all',
  searchQuery: '',
  maxPrice: 150000,
  sortBy: 'popular',
  appliedDiscountPercent: 0,
  promoCode: '',
  showingOnlyFavorites: false,
  readerFontSize: 17
};

// =================================================================
// Initsializatsiya
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadSavedData();
  renderCategoryPills();
  renderBooks();
  updateCartBadge();
  updateFavBadge();
  setupEventListeners();
  setupConfetti();
});

// Saqlangan ma'lumotlarni yuklash (LocalStorage)
function loadSavedData() {
  // Shaxsiy qo'shilgan kitoblar
  const customBooksJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_BOOKS);
  const customBooks = customBooksJson ? JSON.parse(customBooksJson) : [];
  state.books = [...INITIAL_BOOKS, ...customBooks];

  // Savat
  const cartJson = localStorage.getItem(STORAGE_KEYS.CART);
  state.cart = cartJson ? JSON.parse(cartJson) : [];

  // Sevimlilar
  const favsJson = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  if (favsJson) {
    state.favorites = new Set(JSON.parse(favsJson));
  }
}

// LocalStorage ga saqlash
function saveCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(Array.from(state.favorites)));
}

function saveCustomBook(newBook) {
  const customBooksJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_BOOKS);
  const customBooks = customBooksJson ? JSON.parse(customBooksJson) : [];
  customBooks.push(newBook);
  localStorage.setItem(STORAGE_KEYS.CUSTOM_BOOKS, JSON.stringify(customBooks));
}

// =================================================================
// Tungi / Kunduzgi Mavzu (Theme)
// =================================================================
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const target = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem(STORAGE_KEYS.THEME, target);
  updateThemeIcon(target);
  showToast(target === 'dark' ? 'Tungi rejim yoqildi 🌙' : 'Kunduzgi rejim yoqildi ☀️');
}

function updateThemeIcon(theme) {
  const iconSpan = document.getElementById('themeIcon');
  if (iconSpan) {
    iconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// =================================================================
// Kitoblar Katalogini Filtrlash va Tartiblash
// =================================================================
function getFilteredBooks() {
  let result = [...state.books];

  // Sevimlilar filtri
  if (state.showingOnlyFavorites) {
    result = result.filter(book => state.favorites.has(book.id));
  }

  // Kategoriya filtri
  if (state.activeCategory !== 'all') {
    result = result.filter(book => book.category === state.activeCategory);
  }

  // Narx bo'yicha filtr
  result = result.filter(book => book.price <= state.maxPrice);

  // Qidiruv bo'yicha filtr
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase().trim();
    result = result.filter(book => 
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      (book.categoryName && book.categoryName.toLowerCase().includes(q)) ||
      (book.originalTitle && book.originalTitle.toLowerCase().includes(q))
    );
  }

  // Tartiblash (Sorting)
  switch (state.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'year-desc':
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
      break;
    case 'popular':
    default:
      result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
      break;
  }

  return result;
}

// =================================================================
// Kitoblar Kartalarini Chizish (Render Books Grid)
// =================================================================
function renderBooks() {
  const grid = document.getElementById('booksGrid');
  const countEl = document.getElementById('booksFoundCount');
  const filtered = getFilteredBooks();

  if (countEl) {
    countEl.textContent = `${filtered.length} ta kitob`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>Hech qanday kitob topilmadi</h3>
        <p>Qidiruv shartlarini o'zgartirib ko'ring yoki filtrlarni tozalang.</p>
        <button class="hero-btn-primary" onclick="resetAllFilters()">Filtrlarni tozalash</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(book => {
    const isFav = state.favorites.has(book.id);
    const inCart = state.cart.some(item => item.id === book.id);
    const formattedPrice = formatMoney(book.price);
    const formattedOldPrice = book.oldPrice ? formatMoney(book.oldPrice) : null;

    return `
      <div class="book-card" data-id="${book.id}">
        <!-- Muqova Qismi -->
        <div class="book-cover-stage" onclick="openBookModal(${book.id})">
          ${book.badge ? `<span class="badge-tag ${book.badge.toLowerCase().includes('bestseller') ? 'bestseller' : 'klassika'}">${book.badge}</span>` : ''}

          <button class="fav-action-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${book.id})" title="Sevimlilarga qo'shish">
            ${isFav ? '❤️' : '🤍'}
          </button>

          <div class="book-cover-item" style="background: ${book.coverGradient || 'linear-gradient(135deg, #4f46e5, #7c3aed)'}">
            <div class="book-cover-header">${escapeHtml(book.publisher || 'Ziyo Press')}</div>
            <div class="book-cover-center">
              <div class="book-cover-icon">${book.coverIcon || '📖'}</div>
              <div class="book-cover-title">${escapeHtml(book.title)}</div>
              <div class="book-cover-author">${escapeHtml(book.author)}</div>
            </div>
            <div style="font-size: 9px; opacity: 0.8; text-align: right;">${book.year || '2023'}</div>
          </div>

          <div class="quick-preview-overlay">
            <span>👁️ Batafsil ko'rish</span>
          </div>
        </div>

        <!-- Matnli Qism -->
        <div class="book-info-body">
          <div class="book-cat-rating">
            <span class="book-cat-label">${escapeHtml(book.categoryName || book.category)}</span>
            <span class="book-rating-badge">★ ${book.rating || 5.0}</span>
          </div>

          <h3 class="book-title-link" onclick="openBookModal(${book.id})" title="${escapeHtml(book.title)}">
            ${escapeHtml(book.title)}
          </h3>

          <p class="book-author-text">${escapeHtml(book.author)}</p>

          <div class="book-footer-card">
            <div class="book-pricing">
              <span class="book-price-current">${formattedPrice}</span>
              ${formattedOldPrice ? `<span class="book-price-old">${formattedOldPrice}</span>` : ''}
            </div>

            <button class="add-cart-btn ${inCart ? 'in-cart' : ''}" onclick="handleCartClick(${book.id})">
              <span>${inCart ? '✓ Savatda' : '🛒 Savatga'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// =================================================================
// Sevimlilar (Favorites) Boshqaruvi
// =================================================================
function toggleFavorite(event, bookId) {
  if (event) event.stopPropagation();

  if (state.favorites.has(bookId)) {
    state.favorites.delete(bookId);
    showToast("Sevimlilardan olib tashlandi 💔");
  } else {
    state.favorites.add(bookId);
    showToast("Sevimlilarga qo'shildi! ❤️");
  }

  saveFavorites();
  updateFavBadge();
  renderBooks();
}

function updateFavBadge() {
  const badge = document.getElementById('favCountBadge');
  const count = state.favorites.size;
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function toggleFavoritesFilter() {
  state.showingOnlyFavorites = !state.showingOnlyFavorites;
  const btn = document.getElementById('favsToggleBtn');
  if (state.showingOnlyFavorites) {
    btn.classList.add('primary-btn');
    showToast(`Faqat sevimlilar ko'rsatilmoqda (${state.favorites.size} ta)`);
  } else {
    btn.classList.remove('primary-btn');
  }
  renderBooks();
}

// =================================================================
// Savat (Shopping Cart) Boshqaruvi
// =================================================================
function handleCartClick(bookId) {
  const existingItem = state.cart.find(item => item.id === bookId);
  const book = state.books.find(b => b.id === bookId);

  if (!book) return;

  if (existingItem) {
    existingItem.quantity += 1;
    showToast(`"${book.title}" soni oshirildi (${existingItem.quantity}) 🛒`);
  } else {
    state.cart.push({
      id: book.id,
      quantity: 1,
      book: book
    });
    showToast(`"${book.title}" savatga qo'shildi! 🛍️`);
  }

  saveCart();
  updateCartBadge();
  renderBooks();
  renderCartDrawer();
}

function updateCartItemQty(bookId, delta) {
  const itemIndex = state.cart.findIndex(item => item.id === bookId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].quantity += delta;

  if (state.cart[itemIndex].quantity <= 0) {
    const bookTitle = state.cart[itemIndex].book.title;
    state.cart.splice(itemIndex, 1);
    showToast(`"${bookTitle}" savatdan o'chirildi`);
  }

  saveCart();
  updateCartBadge();
  renderBooks();
  renderCartDrawer();
}

function removeCartItem(bookId) {
  const itemIndex = state.cart.findIndex(item => item.id === bookId);
  if (itemIndex > -1) {
    const bookTitle = state.cart[itemIndex].book.title;
    state.cart.splice(itemIndex, 1);
    showToast(`"${bookTitle}" savatdan olib tashlandi`);
    saveCart();
    updateCartBadge();
    renderBooks();
    renderCartDrawer();
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cartCountBadge');
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  }
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cartBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const listEl = document.getElementById('cartItemsList');
  const countEl = document.getElementById('cartTotalItemsCount');
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('cartDiscountRow');
  const discountEl = document.getElementById('cartDiscount');
  const deliveryEl = document.getElementById('cartDelivery');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtnSpan = document.getElementById('checkoutTotalBtnSpan');

  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = totalCount;

  if (state.cart.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <div style="font-size: 50px; margin-bottom: 12px;">🛒</div>
        <p style="font-size: 15px; font-weight: 600;">Savatchangiz bo'sh</p>
        <p style="font-size: 13px; margin-top: 4px;">Katalogdan o'zingizga yoqqan kitoblarni tanlang</p>
      </div>
    `;
    subtotalEl.textContent = '0 so\'m';
    discountRow.style.display = 'none';
    deliveryEl.textContent = '0 so\'m';
    totalEl.textContent = '0 so\'m';
    if (checkoutBtnSpan) checkoutBtnSpan.textContent = '0 so\'m';
    return;
  }

  // Elementlar ro'yxatini chiqarish
  listEl.innerHTML = state.cart.map(item => {
    const book = item.book;
    const itemTotal = book.price * item.quantity;
    return `
      <div class="cart-item">
        <div class="cart-item-cover" style="background: ${book.coverGradient || '#4f46e5'}">
          ${book.coverIcon || '📖'}
        </div>
        <div class="cart-item-details">
          <div>
            <div class="cart-item-title">${escapeHtml(book.title)}</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">${escapeHtml(book.author)}</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div class="cart-qty-controls">
              <button class="qty-btn" onclick="updateCartItemQty(${book.id}, -1)">−</button>
              <span class="qty-count">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartItemQty(${book.id}, 1)">+</button>
            </div>
            <span class="cart-item-price">${formatMoney(itemTotal)}</span>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeCartItem(${book.id})" title="O'chirish">✕</button>
      </div>
    `;
  }).join('');

  // Hisob-kitoblar
  const subtotal = state.cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const discountAmount = Math.round(subtotal * state.appliedDiscountPercent);
  // Agar 100 000 so'mdan ko'p bo'lsa yetkazib berish bepul
  const delivery = subtotal >= 100000 ? 0 : 15000;
  const grandTotal = subtotal - discountAmount + delivery;

  subtotalEl.textContent = formatMoney(subtotal);

  if (discountAmount > 0) {
    discountRow.style.display = 'flex';
    discountEl.textContent = `-${formatMoney(discountAmount)}`;
  } else {
    discountRow.style.display = 'none';
  }

  deliveryEl.textContent = delivery === 0 ? 'Bepul (Aksiya 🎉)' : formatMoney(delivery);
  totalEl.textContent = formatMoney(grandTotal);
  if (checkoutBtnSpan) {
    checkoutBtnSpan.textContent = formatMoney(grandTotal);
  }
}

// Promokodni qo'llash
function applyPromoCode() {
  const input = document.getElementById('promoInput');
  const badge = document.getElementById('promoBadge');
  const code = (input.value || '').trim().toUpperCase();

  if (code === 'KITOBXON') {
    state.appliedDiscountPercent = 0.10;
    state.promoCode = code;
    badge.textContent = "🎉 'KITOBXON' promokodi bilan 10% chegirma taqdim etildi!";
    badge.classList.add('active');
    showToast("10% chegirma muvaffaqiyatli qo'llandi! 🎉");
  } else if (code === 'TALABA') {
    state.appliedDiscountPercent = 0.15;
    state.promoCode = code;
    badge.textContent = "🎓 'TALABA' promokodi bilan 15% chegirma berildi!";
    badge.classList.add('active');
    showToast("15% talaba chegirmasi qo'llandi! 🎓");
  } else if (code === '') {
    showToast("Iltimos, promokodni kiriting");
    return;
  } else {
    showToast("Noto'g'ri promokod. ('KITOBXON' yoki 'TALABA' ni sinab ko'ring)");
    return;
  }

  renderCartDrawer();
}

// =================================================================
// Kitob Tafsilotlari Modali (Book Details Modal)
// =================================================================
function openBookModal(bookId) {
  const book = state.books.find(b => b.id === bookId);
  if (!book) return;

  const modalBody = document.getElementById('bookModalBody');
  const inCart = state.cart.some(item => item.id === book.id);
  const isFav = state.favorites.has(book.id);

  modalBody.innerHTML = `
    <div class="book-detail-grid">
      <div>
        <div class="book-detail-cover" style="background: ${book.coverGradient || '#4f46e5'}">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase;">${escapeHtml(book.publisher || 'Ziyo Press')}</div>
          <div style="text-align: center;">
            <div style="font-size: 40px; margin-bottom: 8px;">${book.coverIcon || '📖'}</div>
            <div style="font-size: 17px; font-weight: 800; line-height: 1.25;">${escapeHtml(book.title)}</div>
          </div>
          <div style="font-size: 12px; font-weight: 600;">${escapeHtml(book.author)}</div>
        </div>
      </div>

      <div class="book-detail-info">
        <h2>${escapeHtml(book.title)}</h2>
        ${book.originalTitle ? `<div class="book-detail-orig-title">${escapeHtml(book.originalTitle)}</div>` : ''}
        <div class="book-detail-author">Muallif: <strong>${escapeHtml(book.author)}</strong></div>

        <div class="meta-pills-row">
          <span class="meta-pill">⭐ ${book.rating} (${book.reviewsCount || 100}+ sharh)</span>
          <span class="meta-pill">🏷️ ${escapeHtml(book.categoryName || book.category)}</span>
          <span class="meta-pill">📦 ${book.format || 'Qog\'oz muqova'}</span>
        </div>

        <p class="book-detail-desc">${escapeHtml(book.description || 'Kitob haqida batafsil ma\'lumot tez orada joylanadi.')}</p>

        <table class="book-specs-table">
          <tr>
            <td>Sahifalar soni:</td>
            <td>${book.pages || 320} bet</td>
          </tr>
          <tr>
            <td>Nashr yili:</td>
            <td>${book.year || 2023}-yil</td>
          </tr>
          <tr>
            <td>Nashriyot:</td>
            <td>${escapeHtml(book.publisher || 'Ziyo Nashriyoti')}</td>
          </tr>
          <tr>
            <td>Tili:</td>
            <td>${escapeHtml(book.language || "O'zbekcha")}</td>
          </tr>
        </table>

        <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px;">
          <span style="font-size: 24px; font-weight: 800; color: var(--primary);">${formatMoney(book.price)}</span>
          ${book.oldPrice ? `<span style="font-size: 14px; color: var(--text-muted); text-decoration: line-through;">${formatMoney(book.oldPrice)}</span>` : ''}
        </div>

        <div class="detail-actions-row">
          <button class="add-cart-btn" onclick="handleCartClick(${book.id}); closeBookModal();">
            <span>${inCart ? '✓ Savatga yana qo\'shish' : '🛒 Savatga qo\'shish'}</span>
          </button>

          <button class="sample-read-btn" onclick="openReaderModal(${book.id})">
            <span>📖 Namunani o'qish (1-Bob)</span>
          </button>

          <button class="fav-action-btn ${isFav ? 'active' : ''}" style="position: static;" onclick="toggleFavorite(event, ${book.id})" title="Sevimlilar">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('bookModalBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookModal() {
  document.getElementById('bookModalBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

// =================================================================
// Kitob O'quvchi (Mini Reader / Mutolaa) Modali
// =================================================================
function openReaderModal(bookId) {
  closeBookModal(); // Agar ochilgan bo'lsa
  const book = state.books.find(b => b.id === bookId);
  if (!book) return;

  const titleEl = document.getElementById('readerBookTitle');
  const chapterTitleEl = document.getElementById('readerChapterTitle');
  const paragraphsEl = document.getElementById('readerParagraphs');
  const contentBody = document.getElementById('readerContentBody');

  titleEl.textContent = `${book.title} — Mutolaa`;
  chapterTitleEl.textContent = book.sampleTitle || '1-Bob: Muqaddima';

  // Matnlarni bo'lib chiqarish
  const sampleText = book.sampleText || `Ushbu kitob muallif tomonidan mehr bilan yozilgan bo'lib, insonning qalbini ilm nuri bilan to'ldiradi. Har bir bobida yangi hikmatlar, amaliy maslahatlar va unutilmas tajribalar joy olgan...`;
  const paragraphs = sampleText.split('\n\n').filter(p => p.trim());

  paragraphsEl.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');

  contentBody.style.fontSize = `${state.readerFontSize}px`;

  document.getElementById('readerModalBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReaderModal() {
  document.getElementById('readerModalBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

function setReaderFontSize(delta) {
  state.readerFontSize = Math.min(26, Math.max(14, state.readerFontSize + delta));
  const content = document.getElementById('readerContentBody');
  if (content) {
    content.style.fontSize = `${state.readerFontSize}px`;
  }
}

function setReaderTheme(themeType) {
  const container = document.getElementById('readerModalContainer');
  if (!container) return;

  container.classList.remove('reader-theme-sepia', 'reader-theme-dark');

  if (themeType === 'sepia') {
    container.classList.add('reader-theme-sepia');
  } else if (themeType === 'dark') {
    container.classList.add('reader-theme-dark');
  }
}

// =================================================================
// Buyurtmani Rasmiylashtirish va Chek (Checkout & Receipt)
// =================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Savatda hech narsa yo'q!");
    return;
  }
  closeCartDrawer();

  // Jami summani hisoblash
  const subtotal = state.cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const discountAmount = Math.round(subtotal * state.appliedDiscountPercent);
  const delivery = subtotal >= 100000 ? 0 : 15000;
  const grandTotal = subtotal - discountAmount + delivery;

  document.getElementById('checkoutTotalBtnSpan').textContent = formatMoney(grandTotal);
  document.getElementById('checkoutModalBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModalBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const region = document.getElementById('orderRegion').value;
  const address = document.getElementById('orderAddress').value.trim();
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Payme';

  if (!name || !phone || !address) {
    showToast("Iltimos, barcha maydonlarni to'ldiring!");
    return;
  }

  // Hisob-kitoblar
  const subtotal = state.cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const discount = Math.round(subtotal * state.appliedDiscountPercent);
  const delivery = subtotal >= 100000 ? 0 : 15000;
  const total = subtotal - discount + delivery;
  const orderId = 'ZB-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleString('uz-UZ', { dateStyle: 'medium', timeStyle: 'short' });

  // Chek kontenti
  const receiptEl = document.getElementById('receiptDetailsBox');
  receiptEl.innerHTML = `
    <div style="text-align: center; margin-bottom: 16px; border-bottom: 1px dashed var(--border-color); padding-bottom: 12px;">
      <div class="receipt-order-no">BUYURTMA RAQAMI: <strong>${orderId}</strong></div>
      <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${dateStr}</div>
    </div>

    <div class="receipt-rows">
      <div class="receipt-row">
        <span>Xaridor:</span>
        <strong>${escapeHtml(name)}</strong>
      </div>
      <div class="receipt-row">
        <span>Telefon:</span>
        <strong>${escapeHtml(phone)}</strong>
      </div>
      <div class="receipt-row">
        <span>Manzil:</span>
        <span>${escapeHtml(region)}, ${escapeHtml(address)}</span>
      </div>
      <div class="receipt-row">
        <span>To'lov usuli:</span>
        <strong>${escapeHtml(paymentMethod)}</strong>
      </div>
      <div class="receipt-row" style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 8px;">
        <span>Kitoblar soni:</span>
        <span>${state.cart.reduce((s, i) => s + i.quantity, 0)} dona</span>
      </div>
      <div class="receipt-row">
        <span>Yetkazib berish:</span>
        <span>${delivery === 0 ? 'Bepul' : formatMoney(delivery)}</span>
      </div>
      ${discount > 0 ? `
      <div class="receipt-row" style="color: var(--success);">
        <span>Chegirma:</span>
        <span>-${formatMoney(discount)}</span>
      </div>
      ` : ''}
      <div class="receipt-row" style="font-size: 16px; font-weight: 800; color: var(--primary); margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color);">
        <span>Jami to'lov:</span>
        <span>${formatMoney(total)}</span>
      </div>
    </div>
  `;

  // Savatni bo'shatish
  state.cart = [];
  state.appliedDiscountPercent = 0;
  saveCart();
  updateCartBadge();
  renderBooks();

  closeCheckoutModal();

  // Chek modalini ochish va confetti otish
  document.getElementById('receiptModalBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
  triggerConfetti();
}

function closeReceiptModal() {
  document.getElementById('receiptModalBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

// =================================================================
// Yangi Kitob Qo'shish (Add Book Modal)
// =================================================================
function openAddBookModal() {
  document.getElementById('addBookModalBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAddBookModal() {
  document.getElementById('addBookModalBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

function handleAddBookSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('newBookTitle').value.trim();
  const author = document.getElementById('newBookAuthor').value.trim();
  const category = document.getElementById('newBookCategory').value;
  const price = parseInt(document.getElementById('newBookPrice').value, 10);
  const desc = document.getElementById('newBookDesc').value.trim();

  if (!title || !author || !price) {
    showToast("Barcha maydonlarni to'ldiring!");
    return;
  }

  const categoryNames = {
    badiiy: "Badiiy adabiyot",
    psixologiya: "Psixologiya & Rivojlanish",
    it: "Dasturlash & IT",
    biznes: "Biznes & Moliya",
    tarix: "Tarix & Falsafa",
    bolalar: "Bolalar uchun"
  };

  const gradients = [
    "linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #0369a1 100%)",
    "linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #4c1d95 100%)",
    "linear-gradient(135deg, #059669 0%, #10b981 50%, #065f46 100%)",
    "linear-gradient(135deg, #e11d48 0%, #fb7185 50%, #881337 100%)"
  ];
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  const newBook = {
    id: Date.now(),
    title: title,
    originalTitle: title,
    author: author,
    category: category,
    categoryName: categoryNames[category] || "Boshqa",
    price: price,
    oldPrice: Math.round(price * 1.2),
    rating: 5.0,
    reviewsCount: 1,
    badge: "Yangi",
    format: "Qog'oz muqova",
    pages: 280,
    year: new Date().getFullYear(),
    publisher: "Ziyo Nashriyoti",
    isbn: "978-9943-000-00-1",
    language: "O'zbekcha",
    description: desc,
    sampleTitle: "1-Bob",
    sampleText: desc,
    coverGradient: randomGradient,
    coverIcon: "✨",
    stock: 10
  };

  state.books.unshift(newBook);
  saveCustomBook(newBook);
  renderBooks();
  closeAddBookModal();
  document.getElementById('addBookForm').reset();
  showToast(`"${title}" kitobi muvaffaqiyatli qo'shildi! 🎉`);
}

// =================================================================
// Janrlar (Category Pills) Chizish va Hodisalar
// =================================================================
function renderCategoryPills() {
  const container = document.getElementById('categoryPills');
  if (!container) return;

  const buttons = container.querySelectorAll('.cat-pill');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      renderBooks();
    });
  });
}

function resetAllFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  state.maxPrice = 150000;
  state.sortBy = 'popular';
  state.showingOnlyFavorites = false;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  const priceRange = document.getElementById('priceRange');
  if (priceRange) priceRange.value = 150000;

  const priceVal = document.getElementById('priceVal');
  if (priceVal) priceVal.textContent = '150 000 so\'m';

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'popular';

  const searchClear = document.getElementById('searchClearBtn');
  if (searchClear) searchClear.classList.remove('active');

  const catButtons = document.querySelectorAll('.cat-pill');
  catButtons.forEach(b => {
    if (b.dataset.category === 'all') b.classList.add('active');
    else b.classList.remove('active');
  });

  renderBooks();
}

// =================================================================
// Hodisalar (Event Listeners)
// =================================================================
function setupEventListeners() {
  // Qidiruv
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (searchClearBtn) {
        if (state.searchQuery) searchClearBtn.classList.add('active');
        else searchClearBtn.classList.remove('active');
      }
      renderBooks();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClearBtn.classList.remove('active');
      renderBooks();
      searchInput.focus();
    });
  }

  // Tartiblash
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderBooks();
    });
  }

  // Narx slayderi
  const priceSlider = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceVal');
  if (priceSlider && priceVal) {
    priceSlider.addEventListener('input', (e) => {
      state.maxPrice = parseInt(e.target.value, 10);
      priceVal.textContent = formatMoney(state.maxPrice);
      renderBooks();
    });
  }

  // Mavzu almashtirish
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Sevimlilar tugmasi
  const favsBtn = document.getElementById('favsToggleBtn');
  if (favsBtn) {
    favsBtn.addEventListener('click', toggleFavoritesFilter);
  }

  // Savat ochish / yopish
  const cartOpenBtn = document.getElementById('cartOpenBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartBackdrop = document.getElementById('cartBackdrop');

  if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) closeCartDrawer();
    });
  }

  // Promokod tugmasi
  const promoBtn = document.getElementById('promoApplyBtn');
  if (promoBtn) promoBtn.addEventListener('click', applyPromoCode);

  // Buyurtmaga o'tish tugmasi
  const openCheckoutBtn = document.getElementById('openCheckoutModalBtn');
  if (openCheckoutBtn) openCheckoutBtn.addEventListener('click', openCheckoutModal);

  // Modallar yopish tugmalari
  const bookModalClose = document.getElementById('bookModalCloseBtn');
  const bookModalBackdrop = document.getElementById('bookModalBackdrop');
  if (bookModalClose) bookModalClose.addEventListener('click', closeBookModal);
  if (bookModalBackdrop) {
    bookModalBackdrop.addEventListener('click', (e) => {
      if (e.target === bookModalBackdrop) closeBookModal();
    });
  }

  const readerClose = document.getElementById('readerCloseBtn');
  const readerBackdrop = document.getElementById('readerModalBackdrop');
  if (readerClose) readerClose.addEventListener('click', closeReaderModal);
  if (readerBackdrop) {
    readerBackdrop.addEventListener('click', (e) => {
      if (e.target === readerBackdrop) closeReaderModal();
    });
  }

  const checkoutClose = document.getElementById('checkoutCloseBtn');
  const checkoutBackdrop = document.getElementById('checkoutModalBackdrop');
  if (checkoutClose) checkoutClose.addEventListener('click', closeCheckoutModal);
  if (checkoutBackdrop) {
    checkoutBackdrop.addEventListener('click', (e) => {
      if (e.target === checkoutBackdrop) closeCheckoutModal();
    });
  }

  const receiptClose = document.getElementById('receiptCloseBtn');
  const receiptDone = document.getElementById('receiptDoneBtn');
  if (receiptClose) receiptClose.addEventListener('click', closeReceiptModal);
  if (receiptDone) receiptDone.addEventListener('click', closeReceiptModal);

  // Kitob qo'shish modal
  const addBookOpenBtn = document.getElementById('addBookOpenBtn');
  const addBookCloseBtn = document.getElementById('addBookCloseBtn');
  const addBookBackdrop = document.getElementById('addBookModalBackdrop');
  if (addBookOpenBtn) addBookOpenBtn.addEventListener('click', openAddBookModal);
  if (addBookCloseBtn) addBookCloseBtn.addEventListener('click', closeAddBookModal);
  if (addBookBackdrop) {
    addBookBackdrop.addEventListener('click', (e) => {
      if (e.target === addBookBackdrop) closeAddBookModal();
    });
  }

  // Formalar
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  const addBookForm = document.getElementById('addBookForm');
  if (addBookForm) addBookForm.addEventListener('submit', handleAddBookSubmit);

  // Reader asboblari
  const fontInc = document.getElementById('fontIncBtn');
  const fontDec = document.getElementById('fontDecBtn');
  if (fontInc) fontInc.addEventListener('click', () => setReaderFontSize(2));
  if (fontDec) fontDec.addEventListener('click', () => setReaderFontSize(-2));

  const tWhite = document.getElementById('themeWhiteBtn');
  const tSepia = document.getElementById('themeSepiaBtn');
  const tDark = document.getElementById('themeDarkBtn');
  if (tWhite) tWhite.addEventListener('click', () => setReaderTheme('white'));
  if (tSepia) tSepia.addEventListener('click', () => setReaderTheme('sepia'));
  if (tDark) tDark.addEventListener('click', () => setReaderTheme('dark'));

  // Hero tezkor o'qish tugmasi
  const heroQuickRead = document.getElementById('heroQuickReadBtn');
  if (heroQuickRead) {
    heroQuickRead.addEventListener('click', () => {
      openReaderModal(1); // Atom Odatlari
    });
  }

  const heroFeaturedBook = document.getElementById('heroFeaturedBook');
  if (heroFeaturedBook) {
    heroFeaturedBook.addEventListener('click', () => {
      openBookModal(1);
    });
  }

  // Footer kategoriya havolalari
  document.querySelectorAll('[data-cat-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.catLink;
      const targetPill = document.querySelector(`.cat-pill[data-category="${cat}"]`);
      if (targetPill) targetPill.click();
      document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // To'lov turi tanlash vizuali
  document.querySelectorAll('.payment-option-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

// =================================================================
// Yordamchi Funksiyalar (Helpers)
// =================================================================
function formatMoney(amount) {
  if (typeof amount !== 'number') return '0 so\'m';
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so\'m';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">🔔</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// =================================================================
// Confetti Bayrami Animatsiyasi
// =================================================================
let confettiCanvas, confettiCtx, confettiParticles = [], confettiAnimationId;

function setupConfetti() {
  confettiCanvas = document.getElementById('confettiCanvas');
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext('2d');
  resizeConfetti();
  window.addEventListener('resize', resizeConfetti);
}

function resizeConfetti() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function triggerConfetti() {
  if (!confettiCanvas || !confettiCtx) return;
  confettiParticles = [];
  const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];

  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.7) * 20,
      gravity: 0.35,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  animateConfetti();
}

function animateConfetti() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  let stillAlive = false;
  confettiParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.vRotation;
    p.alpha -= 0.007;

    if (p.alpha > 0) {
      stillAlive = true;
      confettiCtx.save();
      confettiCtx.globalAlpha = p.alpha;
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      confettiCtx.restore();
    }
  });

  if (stillAlive) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}
