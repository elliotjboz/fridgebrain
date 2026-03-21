// ===== SCREEN NAVIGATION =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
  var target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
  document.querySelectorAll('.menu-item[data-screen]').forEach(function (m) {
    m.classList.toggle('active', m.getAttribute('data-screen') === id);
  });
  closeMenu();
}

// ===== TOAST =====
function showToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2500);
}

// ===== HAMBURGER MENU =====
var menuOverlay = document.getElementById('menuOverlay');
var slideMenu = document.getElementById('slideMenu');
function openMenu() { menuOverlay.classList.add('open'); slideMenu.classList.add('open'); }
function closeMenu() { menuOverlay.classList.remove('open'); slideMenu.classList.remove('open'); }

document.querySelectorAll('.hamburger').forEach(function (btn) { btn.addEventListener('click', openMenu); });
menuOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.menu-item[data-screen]').forEach(function (item) {
  item.addEventListener('click', function () { showScreen(item.getAttribute('data-screen')); });
});
document.getElementById('menuSignout').addEventListener('click', function () { closeMenu(); showScreen('login'); });

// ===== LOGIN / SIGNUP =====
var loginForm = document.getElementById('loginForm');
var signupForm = document.getElementById('signupForm');
var loginWelcome = document.getElementById('loginWelcome');

document.getElementById('showSignup').addEventListener('click', function () {
  loginForm.style.display = 'none'; signupForm.style.display = 'block'; loginWelcome.textContent = 'Create your account';
});
document.getElementById('showLogin').addEventListener('click', function () {
  signupForm.style.display = 'none'; loginForm.style.display = 'block'; loginWelcome.textContent = 'Welcome back';
});
document.getElementById('loginBtn').addEventListener('click', function () { showScreen('home'); showToast('Welcome back, Elliot!'); });
document.getElementById('signupBtn').addEventListener('click', function () { showScreen('home'); showToast('Account created! Welcome, Elliot!'); });
document.getElementById('profileSignout').addEventListener('click', function () { showScreen('login'); showToast('Signed out'); });

// ===== AVATAR → PROFILE =====
document.querySelectorAll('.avatar').forEach(function (av) {
  av.addEventListener('click', function () { showScreen('profile'); });
});

// ===== HOUSEHOLD SELECTOR =====
var householdSelector = document.getElementById('householdSelector');
var householdDropdown = document.getElementById('householdDropdown');
var householdName = document.getElementById('householdName');

householdSelector.addEventListener('click', function () { householdDropdown.classList.toggle('open'); });
document.querySelectorAll('.household-option').forEach(function (opt) {
  opt.addEventListener('click', function () {
    var name = opt.getAttribute('data-household');
    householdName.textContent = name;
    document.querySelectorAll('.household-option').forEach(function (o) { o.classList.remove('active'); });
    opt.classList.add('active');
    householdDropdown.classList.remove('open');
    showToast('Switched to ' + name);
  });
});

// ===== HOME — ACTION CARDS =====
// "Going to the Store"
var storeModal = document.getElementById('storeModal');
document.getElementById('cardGoingToStore').addEventListener('click', function () { storeModal.classList.add('open'); });
document.getElementById('storeCancel').addEventListener('click', function () {
  storeModal.classList.remove('open');
  showScreen('shopping');
});
document.getElementById('storeConfirm').addEventListener('click', function () {
  storeModal.classList.remove('open');
  showToast('Your household has been notified!');
  showScreen('shopping');
});

// "Add to My List"
var addItemModal = document.getElementById('addItemModal');
var addedConfirmModal = document.getElementById('addedConfirmModal');
document.getElementById('cardAddItem').addEventListener('click', function () { addItemModal.classList.add('open'); });
document.getElementById('addItemCancel').addEventListener('click', function () { addItemModal.classList.remove('open'); });
document.getElementById('addItemConfirm').addEventListener('click', function () {
  var name = document.getElementById('addItemName').value || 'New item';
  addItemModal.classList.remove('open');
  document.getElementById('addedItemText').textContent = name + ' added to your list';
  addedConfirmModal.classList.add('open');
  document.getElementById('addItemName').value = '';
  document.getElementById('addItemNotes').value = '';
});
document.getElementById('addedGoToList').addEventListener('click', function () {
  addedConfirmModal.classList.remove('open');
  showScreen('shopping');
});
document.getElementById('addedDone').addEventListener('click', function () {
  addedConfirmModal.classList.remove('open');
});
document.getElementById('addItemPhoto').addEventListener('click', function () { showToast('Camera would open here'); });

// ===== SHOPPING LIST — MODE TOGGLE =====
document.querySelectorAll('.mode-btn[data-mode]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.mode-btn[data-mode]').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var mode = btn.getAttribute('data-mode');
    document.getElementById('daytodayView').style.display = mode === 'daytoday' ? '' : 'none';
    document.getElementById('atstoreView').style.display = mode === 'atstore' ? '' : 'none';
    // Hide FAB in store mode
    var fab = document.getElementById('addToMyListFab');
    fab.style.display = mode === 'atstore' ? 'none' : '';
  });
});

// Shopping list checkboxes (household items in day-to-day)
document.querySelectorAll('.list-item-check').forEach(function (check) {
  check.addEventListener('click', function () {
    check.classList.toggle('checked');
    if (check.classList.contains('checked')) showToast('Marked as bought!');
  });
});

// My list remove buttons
document.querySelectorAll('.my-list-remove').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var card = btn.closest('.my-list-card');
    card.style.opacity = '0';
    setTimeout(function () { card.style.display = 'none'; showToast('Removed from your list'); }, 200);
  });
});

// Store mode checkboxes
document.querySelectorAll('.store-check').forEach(function (check) {
  check.addEventListener('click', function () {
    check.classList.toggle('checked');
    var item = check.closest('.store-item');
    item.classList.toggle('checked-off');
  });
});

// Done shopping
var doneShoppingModal = document.getElementById('doneShoppingModal');
document.getElementById('doneShopping').addEventListener('click', function () { doneShoppingModal.classList.add('open'); });
document.getElementById('doneReceiptYes').addEventListener('click', function () {
  doneShoppingModal.classList.remove('open');
  showScreen('finances');
});
document.getElementById('doneReceiptNo').addEventListener('click', function () {
  doneShoppingModal.classList.remove('open');
  showToast('Shopping trip saved!');
});

// FAB on shopping list → add item modal
document.getElementById('addToMyListFab').addEventListener('click', function () { addItemModal.classList.add('open'); });

// ===== INVENTORY — MINE/HOUSEHOLD TOGGLE =====
document.querySelectorAll('.mode-btn[data-inv]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.mode-btn[data-inv]').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var view = btn.getAttribute('data-inv');
    document.getElementById('invMineView').style.display = view === 'mine' ? '' : 'none';
    document.getElementById('invHouseholdView').style.display = view === 'household' ? '' : 'none';
  });
});

// Inventory card detail modal
var invDetailModal = document.getElementById('invDetailModal');
var invData = {
  butter: { name: 'Butter', qty: '1 lb', status: 'Plenty', statusClass: 'status-green' },
  cheese: { name: 'Cheddar Cheese', qty: '8 oz block', status: 'Running Low', statusClass: 'status-yellow' },
  yogurt: { name: 'Greek Yogurt', qty: '1 container', status: 'Almost Out', statusClass: 'status-red' },
  pasta: { name: 'Pasta', qty: '2 boxes', status: 'Plenty', statusClass: 'status-green' },
  'apples-j': { name: 'Apples', qty: '6 count', status: 'Plenty', statusClass: 'status-green' },
  'bananas-j': { name: 'Bananas', qty: '4 count', status: 'Running Low', statusClass: 'status-yellow' },
  'rice-s': { name: 'Rice', qty: '5 lb bag', status: 'Plenty', statusClass: 'status-green' },
  'sauce-s': { name: 'Tomato Sauce', qty: '1 jar', status: 'Almost Out', statusClass: 'status-red' }
};

document.querySelectorAll('.inventory-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var key = card.getAttribute('data-inv-item');
    var readonly = card.getAttribute('data-readonly') === 'true';
    var data = invData[key];
    if (!data) return;

    document.getElementById('invDetailName').textContent = data.name;
    document.getElementById('invDetailQty').textContent = data.qty;
    document.getElementById('invDetailStatus').innerHTML = '<span class="status-badge ' + data.statusClass + '">' + data.status + '</span>';
    document.getElementById('invDetailActions').style.display = readonly ? 'none' : '';
    document.getElementById('invDetailReadonly').style.display = readonly ? '' : 'none';
    invDetailModal.classList.add('open');
  });
});

document.getElementById('invDetailClose').addEventListener('click', function () { invDetailModal.classList.remove('open'); });
document.getElementById('invRunningLow').addEventListener('click', function () {
  invDetailModal.classList.remove('open');
  showToast('Added to your list!');
});
document.getElementById('invEdit').addEventListener('click', function () { showToast('Coming soon!'); });
document.getElementById('invDelete').addEventListener('click', function () {
  invDetailModal.classList.remove('open');
  showToast('Item deleted');
});
document.getElementById('addInventoryBtn').addEventListener('click', function () { showToast('Coming soon!'); });

// ===== FINANCES — RECEIPT/SPLIT TOGGLE =====
document.querySelectorAll('.mode-btn[data-fin]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.mode-btn[data-fin]').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var view = btn.getAttribute('data-fin');
    document.getElementById('finReceiptView').style.display = view === 'receipt' ? '' : 'none';
    document.getElementById('finSplitView').style.display = view === 'split' ? '' : 'none';
  });
});

// Receipt scanner
var uploadArea = document.getElementById('uploadArea');
var scannerSpinner = document.getElementById('scannerSpinner');
var receiptResult = document.getElementById('receiptResult');

uploadArea.addEventListener('click', function () {
  uploadArea.style.display = 'none';
  scannerSpinner.classList.add('show');
  setTimeout(function () {
    scannerSpinner.classList.remove('show');
    receiptResult.classList.add('show');
  }, 2000);
});

document.getElementById('addToInventoryBtn').addEventListener('click', function () { showToast('Items added to inventory!'); });
document.getElementById('splitCostsBtn').addEventListener('click', function () {
  // Switch to split costs tab
  document.querySelectorAll('.mode-btn[data-fin]').forEach(function (b) { b.classList.remove('active'); });
  document.querySelector('.mode-btn[data-fin="split"]').classList.add('active');
  document.getElementById('finReceiptView').style.display = 'none';
  document.getElementById('finSplitView').style.display = '';
  showToast('Review your cost split below');
});

// Expense card expand
document.querySelectorAll('.expense-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var id = card.getAttribute('data-expense');
    var detail = document.querySelector('.expense-details[data-expdetail="' + id + '"]');
    if (detail) detail.classList.toggle('open');
  });
});

// Receipt check toggles
document.querySelectorAll('.receipt-check').forEach(function (check) {
  check.addEventListener('click', function () {
    if (check.textContent === '✓') { check.textContent = ''; check.style.background = '#fff'; }
    else { check.textContent = '✓'; check.style.background = '#00C853'; }
  });
});

// ===== TOGGLE SWITCHES =====
document.querySelectorAll('.toggle-switch').forEach(function (toggle) {
  toggle.addEventListener('click', function () { toggle.classList.toggle('on'); });
});

// ===== FILTER TABS (activity) =====
document.querySelectorAll('.activity-filters .filter-tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    tab.parentElement.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    showToast('Filter: ' + tab.textContent);
  });
});
