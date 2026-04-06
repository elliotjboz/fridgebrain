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
var currentToastTimeout = null;
function showToast(msg, isError, undoFn) {
  var toast = document.getElementById('toast');
  var text = document.getElementById('toastText');
  var action = document.getElementById('toastAction');
  text.textContent = msg;
  toast.classList.remove('error');
  if (isError) toast.classList.add('error');
  toast.classList.add('show');

  if (undoFn) {
    toast.classList.add('with-action');
    action.onclick = function () {
      undoFn();
      toast.classList.remove('show', 'with-action');
      if (currentToastTimeout) clearTimeout(currentToastTimeout);
    };
  } else {
    toast.classList.remove('with-action');
    action.onclick = null;
  }

  if (currentToastTimeout) clearTimeout(currentToastTimeout);
  currentToastTimeout = setTimeout(function () { toast.classList.remove('show', 'error'); }, 4000);
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

// ===== LOGIN / ONBOARDING =====
var isNewUser = true;

document.getElementById('googleSignIn').addEventListener('click', function () {
  if (isNewUser) {
    showScreen('onboarding');
  } else {
    showScreen('shopping');
    showToast('Welcome back, Elliot!');
  }
  // After first sign-in, treat as existing user
  isNewUser = false;
});

// Onboarding — Create household
var onboardCards = document.querySelector('.onboarding-cards');
var createForm = document.getElementById('createHouseholdForm');
var createSuccess = document.getElementById('createHouseholdSuccess');
var joinForm = document.getElementById('joinHouseholdForm');

document.getElementById('onboardCreate').addEventListener('click', function () {
  onboardCards.style.display = 'none';
  createForm.style.display = '';
});

document.getElementById('createHouseholdBack').addEventListener('click', function () {
  createForm.style.display = 'none';
  onboardCards.style.display = '';
});

document.getElementById('createHouseholdBtn').addEventListener('click', function () {
  var name = document.getElementById('newHouseholdName').value || 'My Household';
  createForm.style.display = 'none';
  createSuccess.style.display = '';
});

document.getElementById('copyInviteCode').addEventListener('click', function () {
  showToast('Invite code copied!');
});

document.getElementById('createHouseholdDone').addEventListener('click', function () {
  showScreen('shopping');
  showToast('Household created! Welcome!');
  // Reset onboarding for next time
  createSuccess.style.display = 'none';
  onboardCards.style.display = '';
});

// Onboarding — Join household
document.getElementById('onboardJoin').addEventListener('click', function () {
  onboardCards.style.display = 'none';
  joinForm.style.display = '';
});

document.getElementById('joinHouseholdBack').addEventListener('click', function () {
  joinForm.style.display = 'none';
  onboardCards.style.display = '';
});

document.getElementById('joinHouseholdBtn').addEventListener('click', function () {
  var code = document.getElementById('joinInviteCode').value;
  if (!code.trim()) { showToast('Please enter an invite code', true); return; }
  showScreen('shopping');
  showToast('Joined household! Welcome!');
  joinForm.style.display = 'none';
  onboardCards.style.display = '';
});

// Sign out
document.getElementById('profileSignout').addEventListener('click', function () { showScreen('login'); showToast('Signed out'); });

// Leave household — with confirmation
var leaveModal = document.getElementById('leaveHouseholdModal');
document.getElementById('leaveHouseholdBtn').addEventListener('click', function () { leaveModal.classList.add('open'); });
document.getElementById('leaveHouseholdCancel').addEventListener('click', function () { leaveModal.classList.remove('open'); });
document.getElementById('leaveHouseholdConfirm').addEventListener('click', function () {
  leaveModal.classList.remove('open');
  showToast('You left the household');
  showScreen('onboarding');
});

// Remove member — with confirmation
var removeMemberModal = document.getElementById('removeMemberModal');
var pendingRemoveMember = '';
document.querySelectorAll('.member-remove').forEach(function (btn) {
  btn.addEventListener('click', function () {
    pendingRemoveMember = btn.getAttribute('data-member');
    document.getElementById('removeMemberText').textContent = pendingRemoveMember + ' will be removed from the household. They can rejoin with an invite code.';
    removeMemberModal.classList.add('open');
  });
});
document.getElementById('removeMemberCancel').addEventListener('click', function () { removeMemberModal.classList.remove('open'); });
document.getElementById('removeMemberConfirm').addEventListener('click', function () {
  removeMemberModal.classList.remove('open');
  // Remove the member row from UI
  document.querySelectorAll('.member-remove[data-member="' + pendingRemoveMember + '"]').forEach(function (btn) {
    btn.closest('.member-row').style.display = 'none';
  });
  showToast(pendingRemoveMember + ' removed from household');
});

// Profile — copy invite code
document.getElementById('profileCopyCode').addEventListener('click', function () {
  showToast('Invite code copied!');
});

document.getElementById('regenInviteCode').addEventListener('click', function () {
  showToast('New invite code generated');
});

// Add store
document.getElementById('addStoreBtn').addEventListener('click', function () {
  showToast('Store added!');
});

// PWA banner — hide if already installed or dismissed
var pwaBanner = document.getElementById('pwaBanner');
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
  pwaBanner.style.display = 'none';
}
document.getElementById('pwaDismiss').addEventListener('click', function () {
  pwaBanner.style.display = 'none';
});
document.getElementById('pwaExpand').addEventListener('click', function () {
  var instructions = document.getElementById('pwaInstructions');
  var btn = document.getElementById('pwaExpand');
  instructions.classList.toggle('open');
  btn.classList.toggle('open');
});

// ===== STORE NOTIFICATION BANNER =====
var storeNotifBanner = document.getElementById('storeNotifBanner');

function showStoreNotification(personName, initials, avatarColor, store) {
  document.getElementById('storeNotifAvatar').textContent = initials;
  document.getElementById('storeNotifAvatar').style.background = avatarColor;
  document.getElementById('storeNotifTitle').textContent = personName + ' is at ' + store;
  storeNotifBanner.classList.add('show');
  // Auto-dismiss after 12 seconds
  clearTimeout(window._storeNotifTimeout);
  window._storeNotifTimeout = setTimeout(function () {
    storeNotifBanner.classList.remove('show');
  }, 12000);
}

document.getElementById('storeNotifClose').addEventListener('click', function () {
  storeNotifBanner.classList.remove('show');
  clearTimeout(window._storeNotifTimeout);
});

document.getElementById('storeNotifAdd').addEventListener('click', function () {
  storeNotifBanner.classList.remove('show');
  clearTimeout(window._storeNotifTimeout);
  showScreen('shopping');
  setTimeout(function () { addItemModal.classList.add('open'); }, 200);
});


// ===== AVATAR → PROFILE =====
document.querySelectorAll('.avatar').forEach(function (av) {
  av.addEventListener('click', function () { showScreen('profile'); });
});


// ===== NOTIFY FAB =====
var notifyModal = document.getElementById('notifyModal');
document.getElementById('notifyFab').addEventListener('click', function () { notifyModal.classList.add('open'); });
document.getElementById('notifyCancel').addEventListener('click', function () { notifyModal.classList.remove('open'); });
document.getElementById('notifyConfirm').addEventListener('click', function () {
  notifyModal.classList.remove('open');
  var store = document.getElementById('notifyStore').value.replace('📍 ', '');
  showToast('Household notified!');
  // Show the banner as a preview of what household members will see
  setTimeout(function () {
    showStoreNotification('Elliot', 'EB', '#00C853', store);
  }, 400);
});

// Household selector removed — single household in v1

// "Add to My List"
var addItemModal = document.getElementById('addItemModal');
var addedConfirmModal = document.getElementById('addedConfirmModal');
var addItemInput = document.getElementById('addItemName');
var autocompleteResults = document.getElementById('autocompleteResults');
var selectedItemArea = document.getElementById('selectedItemArea');
var selectedChip = document.getElementById('selectedChip');
var selectedItemName = '';

function resetAddItemModal() {
  addItemInput.value = '';
  document.getElementById('addItemNotes').value = '';
  document.getElementById('addItemQty').value = '';
  autocompleteResults.innerHTML = '';
  selectedItemArea.style.display = 'none';
  selectedItemName = '';
  addItemInput.style.display = '';
  addItemInput.parentElement.style.display = '';
}

document.getElementById('addItemCancel').addEventListener('click', function () {
  addItemModal.classList.remove('open');
  resetAddItemModal();
});

// Autocomplete as user types
addItemInput.addEventListener('input', function () {
  var query = addItemInput.value;
  if (query.trim().length === 0) {
    autocompleteResults.innerHTML = '';
    return;
  }

  var results = searchGroceryDB(query);
  var html = '';
  var limit = Math.min(results.length, 8);
  for (var i = 0; i < limit; i++) {
    html += '<div class="autocomplete-item" data-name="' + results[i].name + '">' +
      '<span class="autocomplete-item-name">' + results[i].name + '</span>' +
      '<span class="autocomplete-item-cat">' + results[i].category + '</span></div>';
  }
  html += '<div class="autocomplete-custom" id="autocompleteCustom">+ Add "' + query + '" as custom item</div>';
  autocompleteResults.innerHTML = html;

  autocompleteResults.querySelectorAll('.autocomplete-item').forEach(function (el) {
    el.addEventListener('click', function () { selectItem(el.getAttribute('data-name')); });
  });
  document.getElementById('autocompleteCustom').addEventListener('click', function () { selectItem(query); });
});

function selectItem(name) {
  selectedItemName = name;
  selectedChip.textContent = name;
  selectedItemArea.style.display = '';
  autocompleteResults.innerHTML = '';
  addItemInput.style.display = 'none';
  addItemInput.parentElement.style.display = 'none';
}

function updateEmptyStates() {
  // Hide empty states when lists have items, show when empty
  var myList = document.getElementById('myListItems');
  var emptyMy = document.getElementById('emptyMyList');
  if (emptyMy) emptyMy.style.display = myList.querySelector('.my-list-card:not([style*="display: none"])') ? 'none' : '';

  var hhList = document.getElementById('householdListItems');
  var emptyHH = document.getElementById('emptyHHList');
  if (emptyHH) emptyHH.style.display = hhList.querySelector('.hh-list-card') ? 'none' : '';

  var familyList = document.getElementById('familyListItems');
  var emptyFamily = document.getElementById('emptyFamilyList');
  if (emptyFamily) emptyFamily.style.display = familyList.querySelector('.my-list-card:not([style*="display: none"])') ? 'none' : '';
}

function addItemToList(name, notes, qty) {
  qty = qty || '';
  // Add to My List (apartment day-to-day)
  var myListItems = document.getElementById('myListItems');
  var card = document.createElement('div');
  card.className = 'my-list-card';
  card.innerHTML = '<div class="my-list-accent"></div>' +
    '<div class="drag-handle">☰</div>' +
    '<div class="my-list-info"><div class="my-list-name">' + name + '</div>' +
    (qty ? '<div class="my-list-qty">' + qty + '</div>' : '') +
    (notes ? '<div class="my-list-note">' + notes + '</div>' : '') +
    '</div>' +
    '<button class="my-list-remove">×</button>';
  myListItems.insertBefore(card, myListItems.firstChild);
  bindRemoveBtn(card.querySelector('.my-list-remove'));
  bindEditHandler(card);

  // Apartment store mode
  var storeMyItems = document.getElementById('storeMyItems');
  var storeItem = document.createElement('div');
  storeItem.className = 'store-item store-item-mine';
  storeItem.innerHTML = '<div class="store-check"></div><div class="store-item-name">' + name + '</div>';
  storeMyItems.insertBefore(storeItem, storeMyItems.firstChild);
  storeItem.querySelector('.store-check').addEventListener('click', function () {
    this.classList.toggle('checked');
    storeItem.classList.toggle('checked-off');
  });

  // Family day-to-day
  var familyListItems = document.getElementById('familyListItems');
  var familyCard = document.createElement('div');
  familyCard.className = 'my-list-card';
  familyCard.innerHTML = '<div class="my-list-accent" style="background:#00C853"></div>' +
    '<div class="my-list-info"><div class="my-list-name">' + name + '</div>' +
    (qty ? '<div class="my-list-qty">' + qty + '</div>' : '') +
    (notes ? '<div class="my-list-note">' + notes + '</div>' : '') +
    '</div>' +
    '<button class="my-list-remove">×</button>';
  familyListItems.insertBefore(familyCard, familyListItems.firstChild);
  bindEditHandler(familyCard);
  familyCard.querySelector('.my-list-remove').addEventListener('click', function () {
    familyCard.style.opacity = '0';
    setTimeout(function () {
      familyCard.style.display = 'none';
      removeItemByName('myListItems', name);
      removeItemByName('storeMyItems', name);
      removeItemByName('storeFamilyItems', name);
      addToSuggestionsData(name);
      refreshAllSuggestions();
      updateEmptyStates();
      showToast('Removed from list');
    }, 200);
  });

  // Family store mode
  var storeFamilyItems = document.getElementById('storeFamilyItems');
  var storeFamilyItem = document.createElement('div');
  storeFamilyItem.className = 'store-item store-item-mine';
  storeFamilyItem.innerHTML = '<div class="store-check"></div><div class="store-item-name">' + name + '</div>';
  storeFamilyItems.insertBefore(storeFamilyItem, storeFamilyItems.firstChild);
  storeFamilyItem.querySelector('.store-check').addEventListener('click', function () {
    this.classList.toggle('checked');
    storeFamilyItem.classList.toggle('checked-off');
  });

  updateEmptyStates();
  if (!suppressAddedModal) {
    document.getElementById('addedItemText').textContent = name + ' added to your list';
    addedConfirmModal.classList.add('open');
  }
}
var suppressAddedModal = false;

var pendingItemName = '';
var pendingItemNotes = '';
var duplicateModal = document.getElementById('duplicateModal');

document.getElementById('duplicateConfirm').addEventListener('click', function () {
  duplicateModal.classList.remove('open');
  addItemToList(pendingItemName, pendingItemNotes);
});
document.getElementById('duplicateCancel').addEventListener('click', function () {
  duplicateModal.classList.remove('open');
});

document.getElementById('addItemConfirm').addEventListener('click', function () {
  var name = selectedItemName || 'New item';
  var notes = document.getElementById('addItemNotes').value || '';
  var qty = document.getElementById('addItemQty').value || '';
  addItemModal.classList.remove('open');

  // Group-based duplicate check
  var existingItems = getAllListItems();
  var dupCheck = checkDuplicateByGroup(name, existingItems);

  if (dupCheck.isDuplicate) {
    pendingItemName = name;
    pendingItemNotes = notes;
    var sourceMsg = '';
    if (dupCheck.source === 'you') {
      sourceMsg = 'You already have';
    } else if (dupCheck.source === 'the household') {
      sourceMsg = 'The household already has';
    } else {
      sourceMsg = dupCheck.source + ' already has';
    }

    if (dupCheck.group === 'exact') {
      var listName = dupCheck.source === 'you' ? 'your list' : 'the list';
      document.getElementById('duplicateText').textContent = sourceMsg + ' "' + name + '" on ' + listName + '. Add anyway?';
    } else {
      var listName = dupCheck.source === 'you' ? 'your list' : 'the list';
      document.getElementById('duplicateText').textContent = sourceMsg + ' "' + dupCheck.existingItem + '" (similar) on ' + listName + '. Still add "' + name + '"?';
    }
    duplicateModal.classList.add('open');
    resetAddItemModal();
    return;
  }

  addItemToList(name, notes, qty);
  resetAddItemModal();
});
document.getElementById('addedDone').addEventListener('click', function () {
  addedConfirmModal.classList.remove('open');
});

// ===== SYNC LISTS ON LOAD =====
// Ensures at-the-store views match day-to-day views
function syncStoreLists() {
  // --- Apartment mode: sync storeMyItems from myListItems ---
  var storeMyItems = document.getElementById('storeMyItems');
  storeMyItems.innerHTML = '';
  document.querySelectorAll('#myListItems .my-list-card').forEach(function (card) {
    if (card.style.display === 'none') return;
    var name = card.querySelector('.my-list-name').textContent;
    var storeItem = document.createElement('div');
    storeItem.className = 'store-item store-item-mine';
    storeItem.innerHTML = '<div class="store-check"></div><div class="store-item-name">' + name + '</div>';
    storeMyItems.appendChild(storeItem);
    storeItem.querySelector('.store-check').addEventListener('click', function () {
      this.classList.toggle('checked');
      storeItem.classList.toggle('checked-off');
    });
  });

  // --- Apartment mode: sync storeHHItems from householdListItems ---
  var storeHHItems = document.getElementById('storeHHItems');
  storeHHItems.innerHTML = '';
  document.querySelectorAll('#householdListItems .hh-list-card').forEach(function (card) {
    var name = card.querySelector('.hh-list-name').textContent;
    var avatar = card.querySelector('.hh-avatar');
    var avatarBg = avatar ? avatar.style.background : '#757575';
    var avatarText = avatar ? avatar.textContent : '?';
    var storeItem = document.createElement('div');
    storeItem.className = 'store-item';
    storeItem.innerHTML = '<div class="store-check"></div>' +
      '<div class="store-avatar" style="background:' + avatarBg + '">' + avatarText + '</div>' +
      '<div class="store-item-name">' + name + '</div>';
    storeHHItems.appendChild(storeItem);
    storeItem.querySelector('.store-check').addEventListener('click', function () {
      this.classList.toggle('checked');
      storeItem.classList.toggle('checked-off');
    });
  });

  // --- Family mode: sync storeFamilyItems from familyListItems ---
  var storeFamilyItems = document.getElementById('storeFamilyItems');
  storeFamilyItems.innerHTML = '';
  document.querySelectorAll('#familyListItems .my-list-card').forEach(function (card) {
    if (card.style.display === 'none') return;
    var name = card.querySelector('.my-list-name').textContent;
    var storeItem = document.createElement('div');
    storeItem.className = 'store-item store-item-mine';
    storeItem.innerHTML = '<div class="store-check"></div><div class="store-item-name">' + name + '</div>';
    storeFamilyItems.appendChild(storeItem);
    storeItem.querySelector('.store-check').addEventListener('click', function () {
      this.classList.toggle('checked');
      storeItem.classList.toggle('checked-off');
    });
  });
}

// Sync when switching to at-the-store mode
var origApplyShoppingMode = applyShoppingMode;
applyShoppingMode = function () {
  var modeActive = document.querySelector('.mode-btn[data-mode].active');
  var mode = modeActive ? modeActive.getAttribute('data-mode') : 'daytoday';
  if (mode === 'atstore') syncStoreLists();
  origApplyShoppingMode();
};

// Sync on initial login
var origShowScreen = showScreen;
showScreen = function (id) {
  origShowScreen(id);
  if (id === 'shopping') syncStoreLists();
};

// ===== SUGGESTIONS INFO =====
document.querySelectorAll('.suggestions-info').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('suggestionsInfoModal').classList.add('open');
  });
});
document.getElementById('suggestionsInfoClose').addEventListener('click', function () {
  document.getElementById('suggestionsInfoModal').classList.remove('open');
});

// Build suggestions on day-to-day views at load (deferred to ensure suggestionsData is defined)
setTimeout(function () {
  buildSuggestions('daytodaySuggestionItems');
  buildSuggestions('familyDaytodaySuggestionItems');
}, 0);

// ===== EDIT ITEM =====
var editItemModal = document.getElementById('editItemModal');
var editingCard = null;

function bindEditHandler(card) {
  var info = card.querySelector('.my-list-info');
  if (!info) return;
  info.addEventListener('click', function (e) {
    e.stopPropagation();
    editingCard = card;
    var name = card.querySelector('.my-list-name').textContent;
    var noteEl = card.querySelector('.my-list-note');
    var note = noteEl ? noteEl.textContent : '';
    document.getElementById('editItemName').value = name;
    document.getElementById('editItemNotes').value = note;
    editItemModal.classList.add('open');
  });
}

// Bind edit on existing my-list cards
document.querySelectorAll('#myListItems .my-list-card').forEach(bindEditHandler);
document.querySelectorAll('#familyListItems .my-list-card').forEach(bindEditHandler);

document.getElementById('editItemSave').addEventListener('click', function () {
  if (!editingCard) return;
  var newName = document.getElementById('editItemName').value.trim();
  var newNotes = document.getElementById('editItemNotes').value.trim();
  if (!newName) { showToast('Item name cannot be empty'); return; }

  var oldName = editingCard.querySelector('.my-list-name').textContent;
  editingCard.querySelector('.my-list-name').textContent = newName;
  var noteEl = editingCard.querySelector('.my-list-note');
  if (noteEl) noteEl.textContent = newNotes;

  editItemModal.classList.remove('open');
  editingCard = null;
  refreshAllSuggestions();
  showToast('Item updated');
});

function addToSuggestionsData(name) {
  var lower = name.toLowerCase();
  var exists = suggestionsData.some(function (s) { return s.toLowerCase() === lower; });
  if (!exists) suggestionsData.unshift(name);
}

document.getElementById('editItemDelete').addEventListener('click', function () {
  if (!editingCard) return;
  var name = editingCard.querySelector('.my-list-name').textContent;
  var cardRef = editingCard;
  cardRef.style.display = 'none';
  removeItemByName('storeMyItems', name);
  removeItemByName('familyListItems', name);
  removeItemByName('storeFamilyItems', name);
  addToSuggestionsData(name);
  refreshAllSuggestions();
  updateEmptyStates();
  editItemModal.classList.remove('open');
  editingCard = null;
  showToast('Removed from list', false, function () {
    cardRef.style.display = '';
    cardRef.style.opacity = '1';
    restoreItemByName('storeMyItems', name);
    restoreItemByName('familyListItems', name);
    restoreItemByName('storeFamilyItems', name);
    refreshAllSuggestions();
    updateEmptyStates();
  });
});

document.getElementById('editItemCancel').addEventListener('click', function () {
  editItemModal.classList.remove('open');
  editingCard = null;
});

// ===== SHOPPING LIST — MODE TOGGLE =====
document.querySelectorAll('.mode-btn[data-mode]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.mode-btn[data-mode]').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    applyShoppingMode();
  });
});

// Shopping list checkboxes (household items in day-to-day)
document.querySelectorAll('.list-item-check').forEach(function (check) {
  check.addEventListener('click', function () {
    check.classList.toggle('checked');
    if (check.classList.contains('checked')) showToast('Marked as bought!');
  });
});

// ===== DRAG AND DROP SORTING =====
function enableDragSort(container) {
  if (!container || container._dragSetup) return;
  container._dragSetup = true;
  var draggedCard = null;

  container.addEventListener('pointerdown', function (e) {
    var handle = e.target.closest('.drag-handle');
    if (!handle) return;
    draggedCard = handle.closest('.my-list-card');
    if (!draggedCard) return;
    draggedCard.setAttribute('draggable', 'true');
  });

  container.addEventListener('dragstart', function (e) {
    if (!draggedCard) return;
    draggedCard.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
  });

  container.addEventListener('dragend', function () {
    if (draggedCard) {
      draggedCard.classList.remove('dragging');
      draggedCard.removeAttribute('draggable');
      draggedCard = null;
    }
    container.querySelectorAll('.my-list-card').forEach(function (c) { c.classList.remove('drag-over'); });
  });

  container.addEventListener('dragover', function (e) {
    e.preventDefault();
    if (!draggedCard) return;
    var target = e.target.closest('.my-list-card');
    if (!target || target === draggedCard) return;
    var rect = target.getBoundingClientRect();
    var midpoint = rect.top + rect.height / 2;
    if (e.clientY < midpoint) {
      container.insertBefore(draggedCard, target);
    } else {
      container.insertBefore(draggedCard, target.nextSibling);
    }
  });
}

// Enable drag sort on list containers
setTimeout(function () {
  enableDragSort(document.getElementById('myListItems'));
  enableDragSort(document.getElementById('familyListItems'));
}, 0);

// ===== INVENTORY SEARCH =====
var invSearchInput = document.getElementById('invSearchInput');
if (invSearchInput) {
  invSearchInput.addEventListener('input', function () {
    var q = invSearchInput.value.toLowerCase().trim();
    document.querySelectorAll('.inv-view .inventory-card').forEach(function (card) {
      var name = card.querySelector('.inventory-card-name');
      if (!name) return;
      var match = q === '' || name.textContent.toLowerCase().indexOf(q) > -1;
      card.style.display = match ? '' : 'none';
    });
    // Hide empty person groups in household view
    document.querySelectorAll('.inv-person-group').forEach(function (group) {
      var visible = group.querySelectorAll('.inventory-card:not([style*="display: none"])').length;
      group.style.display = visible ? '' : 'none';
    });
  });
}

// Remove item by name from a container's children
function removeItemByName(containerId, name) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.store-item-name, .my-list-name').forEach(function (el) {
    if (el.textContent.trim() === name) {
      var item = el.closest('.store-item, .my-list-card');
      if (item) { item.style.display = 'none'; }
    }
  });
}

// My list remove buttons
function bindRemoveBtn(btn) {
  btn.addEventListener('click', function () {
    var card = btn.closest('.my-list-card');
    // Only handle if this card is in myListItems
    if (!card.closest('#myListItems')) return;
    var name = card.querySelector('.my-list-name').textContent;
    card.style.opacity = '0';
    setTimeout(function () {
      card.style.display = 'none';
      // Remove from all synced views by name
      removeItemByName('storeMyItems', name);
      removeItemByName('familyListItems', name);
      removeItemByName('storeFamilyItems', name);
      addToSuggestionsData(name);
      refreshAllSuggestions();
      updateEmptyStates();
      showToast('Removed from your list', false, function () {
        // Undo — restore everything
        card.style.display = '';
        card.style.opacity = '1';
        restoreItemByName('storeMyItems', name);
        restoreItemByName('familyListItems', name);
        restoreItemByName('storeFamilyItems', name);
        refreshAllSuggestions();
        updateEmptyStates();
      });
    }, 200);
  });
}

// Restore (unhide) a previously hidden item in a list
function restoreItemByName(containerId, name) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.store-item-name, .my-list-name, .hh-list-name').forEach(function (el) {
    if (el.textContent.trim() === name) {
      var item = el.closest('.store-item, .my-list-card, .hh-list-card');
      if (item) { item.style.display = ''; item.style.opacity = '1'; }
    }
  });
}
document.querySelectorAll('#myListItems .my-list-remove').forEach(bindRemoveBtn);

// Store mode checkboxes
document.querySelectorAll('.store-check').forEach(function (check) {
  check.addEventListener('click', function () {
    check.classList.toggle('checked');
    var item = check.closest('.store-item');
    item.classList.toggle('checked-off');
  });
});

// Family view remove buttons — sync across all views
document.querySelectorAll('#familyListItems .my-list-remove').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var card = btn.closest('.my-list-card');
    var name = card.querySelector('.my-list-name').textContent;
    card.style.opacity = '0';
    setTimeout(function () {
      card.style.display = 'none';
      removeItemByName('myListItems', name);
      removeItemByName('storeMyItems', name);
      removeItemByName('storeFamilyItems', name);
      addToSuggestionsData(name);
      refreshAllSuggestions();
      updateEmptyStates();
      showToast('Removed from list');
    }, 200);
  });
});

// Family store view checks
document.querySelectorAll('#storeFamilyItems .store-check').forEach(function (check) {
  check.addEventListener('click', function () {
    check.classList.toggle('checked');
    check.closest('.store-item').classList.toggle('checked-off');
  });
});

// Done shopping
var doneShoppingModal = document.getElementById('doneShoppingModal');
document.getElementById('doneShopping').addEventListener('click', function () {
  var checked = document.querySelectorAll('.store-item.checked-off');
  if (checked.length === 0) { showToast('No items checked off yet'); return; }
  doneShoppingModal.classList.add('open');
});
document.getElementById('doneShoppingFamily').addEventListener('click', function () {
  var checked = document.querySelectorAll('.store-item.checked-off');
  if (checked.length === 0) { showToast('No items checked off yet'); return; }
  doneShoppingModal.classList.add('open');
});
var suggestionsData = ['Whole Milk', 'Eggs (12ct)', 'Butter', 'Bananas', 'Chicken Breast', 'Greek Yogurt', 'Paper Towels', 'Pasta'];

function refreshAllSuggestions() {
  buildSuggestions('daytodaySuggestionItems');
  buildSuggestions('familyDaytodaySuggestionItems');
}

function buildSuggestions(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  // Filter out items already on any list
  var existing = getAllListItems().map(function (i) { return i.name.toLowerCase(); });
  var filtered = suggestionsData.filter(function (name) {
    return existing.indexOf(name.toLowerCase()) === -1;
  });
  filtered.forEach(function (name) {
    var item = document.createElement('div');
    item.className = 'suggestion-item';
    item.innerHTML = '<span class="suggestion-item-name">' + name + '</span><button class="suggestion-add">+ Add</button>';
    container.appendChild(item);
    item.querySelector('.suggestion-add').addEventListener('click', function () {
      suppressAddedModal = true;
      addItemToList(name, '');
      suppressAddedModal = false;
      // Remove from all suggestion containers
      refreshAllSuggestions();
      updateEmptyStates();
      showToast(name + ' added to your list');
    });
  });
}

function addBoughtItemToInventory(name) {
  var key = name.toLowerCase().replace(/\s+/g, '-') + '-bought-' + Date.now();
  var purchasedAt = Date.now();
  invData[key] = { name: name, qty: '—', status: 'Plenty', statusClass: 'status-green', purchasedAt: purchasedAt };

  // Add to Mine view
  var card = document.createElement('div');
  card.className = 'inventory-card';
  card.setAttribute('data-inv-item', key);
  card.innerHTML = '<div class="inventory-card-name">' + name + '</div>' +
    '<div class="inventory-card-qty">Just bought</div>' +
    '<span class="status-badge status-green">Plenty</span>';
  document.querySelector('#invMineView .inventory-grid').appendChild(card);

  // Add to Family view
  var familyCard = card.cloneNode(true);
  document.querySelector('#invFamilyView .inventory-grid').appendChild(familyCard);

  // Bind click on both
  [card, familyCard].forEach(function (c) {
    c.addEventListener('click', function () {
      var d = invData[key]; if (!d) return;
      currentInvKey = key;
      document.getElementById('invDetailName').textContent = d.name;
      document.getElementById('invDetailQty').textContent = d.qty;
      document.getElementById('invDetailStatus').innerHTML = '<span class="status-badge ' + d.statusClass + '">' + d.status + '</span>';
      document.getElementById('invDetailActions').style.display = familyMode ? '' : '';
      document.getElementById('invDetailReadonly').style.display = 'none';
      invDetailModal.classList.add('open');
    });
  });

  // Simulate 2-week expiry: after 14 days, move to suggestions
  // For prototype, we'll mark with purchasedAt for backend to handle
  // Frontend can check on load and gray out expired items
}

function clearCheckedStoreItems() {
  var checked = document.querySelectorAll('.store-item.checked-off');
  if (checked.length === 0) return false;

  // Collect names of bought items
  var boughtNames = [];
  checked.forEach(function (item) {
    var nameEl = item.querySelector('.store-item-name');
    if (nameEl) boughtNames.push(nameEl.textContent);
  });

  // Remove checked items from store view
  checked.forEach(function (item) {
    item.style.transition = 'opacity 0.2s';
    item.style.opacity = '0';
    setTimeout(function () { item.remove(); }, 200);
  });

  // Add bought items to inventory
  setTimeout(function () {
    boughtNames.forEach(function (name) {
      // Don't add if already in inventory
      var alreadyInInventory = false;
      for (var k in invData) {
        if (invData[k].name.toLowerCase() === name.toLowerCase()) {
          alreadyInInventory = true;
          break;
        }
      }
      if (!alreadyInInventory) addBoughtItemToInventory(name);
    });

    var count = boughtNames.length;
    showToast(count + ' item' + (count > 1 ? 's' : '') + ' added to inventory');
  }, 300);
  return true;
}

document.getElementById('doneShoppingClose').addEventListener('click', function () {
  clearCheckedStoreItems();
  doneShoppingModal.classList.remove('open');
});
// doneReceiptNo removed — simplified done shopping modal

// FAB on shopping list → same add item modal as home page
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
  cheese: { name: 'Cheddar Cheese', qty: '8 oz', status: 'Running Low', statusClass: 'status-yellow' },
  yogurt: { name: 'Greek Yogurt', qty: '1 container', status: 'Almost Out', statusClass: 'status-red' },
  pasta: { name: 'Pasta', qty: '2 boxes', status: 'Plenty', statusClass: 'status-green' },
  'eggs-mine': { name: 'Eggs (12ct)', qty: '12 count', status: 'Running Low', statusClass: 'status-yellow' },
  oliveoil: { name: 'Olive Oil', qty: '1 bottle', status: 'Plenty', statusClass: 'status-green' },
  chicken: { name: 'Chicken Breast', qty: '1 lb', status: 'Plenty', statusClass: 'status-green' },
  spinach: { name: 'Spinach', qty: '1 bag', status: 'Running Low', statusClass: 'status-yellow' },
  'bread-mine': { name: 'Sourdough Bread', qty: '1 loaf', status: 'Plenty', statusClass: 'status-green' },
  'salt-mine': { name: 'Salt', qty: '1 container', status: 'Plenty', statusClass: 'status-green' },
  'apples-j': { name: 'Apples', qty: '6 count', status: 'Plenty', statusClass: 'status-green' },
  'bananas-j': { name: 'Bananas', qty: '4 count', status: 'Running Low', statusClass: 'status-yellow' },
  'coffee-j': { name: 'Coffee', qty: '1 bag', status: 'Plenty', statusClass: 'status-green' },
  'milk-j': { name: 'Whole Milk', qty: '1 gallon', status: 'Running Low', statusClass: 'status-yellow' },
  'rice-s': { name: 'Rice', qty: '5 lb bag', status: 'Plenty', statusClass: 'status-green' },
  'sauce-s': { name: 'Tomato Sauce', qty: '1 jar', status: 'Almost Out', statusClass: 'status-red' },
  'hummus-s': { name: 'Hummus', qty: '1 tub', status: 'Plenty', statusClass: 'status-green' },
  'broth-s': { name: 'Chicken Broth', qty: '2 cartons', status: 'Plenty', statusClass: 'status-green' },
  'oranges-k': { name: 'Oranges', qty: '6 count', status: 'Plenty', statusClass: 'status-green' },
  'peanutbutter-k': { name: 'Peanut Butter', qty: '1 jar', status: 'Running Low', statusClass: 'status-yellow' },
  'rice-mine': { name: 'Rice', qty: '5 lb bag', status: 'Plenty', statusClass: 'status-green' },
  'bananas-mine': { name: 'Bananas', qty: '4 count', status: 'Running Low', statusClass: 'status-yellow' },
  'garlic-mine': { name: 'Garlic', qty: '1 head', status: 'Plenty', statusClass: 'status-green' },
  'onions-mine': { name: 'Onions', qty: '3 count', status: 'Plenty', statusClass: 'status-green' }
};

document.querySelectorAll('.inventory-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var key = card.getAttribute('data-inv-item');
    var readonly = familyMode ? false : card.getAttribute('data-readonly') === 'true';
    var data = invData[key];
    if (!data) return;
    currentInvKey = key;
    document.getElementById('invDetailName').textContent = data.name;
    document.getElementById('invDetailQty').textContent = data.qty;
    document.getElementById('invDetailStatus').innerHTML = '<span class="status-badge ' + data.statusClass + '">' + data.status + '</span>';
    document.getElementById('invDetailActions').style.display = readonly ? 'none' : '';
    document.getElementById('invDetailReadonly').style.display = readonly ? '' : 'none';
    invDetailModal.classList.add('open');
  });
});

var currentInvKey = '';

document.getElementById('invDetailClose').addEventListener('click', function () { invDetailModal.classList.remove('open'); });
document.getElementById('invRunningLow').addEventListener('click', function () {
  invDetailModal.classList.remove('open');
  var data = invData[currentInvKey];
  if (data) {
    suppressAddedModal = true;
    addItemToList(data.name, '');
    suppressAddedModal = false;
  }
  showToast(data ? data.name + ' added to your list!' : 'Added to your list!');
});
document.getElementById('invEdit').addEventListener('click', function () {
  invDetailModal.classList.remove('open');
  showToast('Edit saved');
});
document.getElementById('invDelete').addEventListener('click', function () {
  invDetailModal.classList.remove('open');
  // Remove card from all inventory views
  document.querySelectorAll('.inventory-card[data-inv-item="' + currentInvKey + '"]').forEach(function (c) {
    c.style.transition = 'opacity 0.2s';
    c.style.opacity = '0';
    setTimeout(function () { c.remove(); }, 200);
  });
  delete invData[currentInvKey];
  showToast('Item deleted');
});
// ===== ADD TO INVENTORY MODAL =====
var addInvModal = document.getElementById('addInvModal');
var addInvSearch = document.getElementById('addInvSearch');
var invAutocomplete = document.getElementById('invAutocomplete');
var invSelectedArea = document.getElementById('invSelectedArea');
var invSelectedChip = document.getElementById('invSelectedChip');
var invSelectedName = '';
var invSelectedStatus = 'plenty';

document.getElementById('addInventoryBtn').addEventListener('click', function () { addInvModal.classList.add('open'); });
document.getElementById('addInvCancel').addEventListener('click', function () {
  addInvModal.classList.remove('open');
  addInvSearch.value = ''; invAutocomplete.innerHTML = ''; invSelectedArea.style.display = 'none';
  addInvSearch.style.display = ''; addInvSearch.parentElement.style.display = '';
  invSelectedName = ''; invSelectedStatus = 'plenty';
});

addInvSearch.addEventListener('input', function () {
  var q = addInvSearch.value;
  if (q.trim().length === 0) { invAutocomplete.innerHTML = ''; return; }
  var results = searchGroceryDB(q);
  var html = '';
  var limit = Math.min(results.length, 8);
  for (var i = 0; i < limit; i++) {
    html += '<div class="autocomplete-item" data-name="' + results[i].name + '"><span class="autocomplete-item-name">' + results[i].name + '</span><span class="autocomplete-item-cat">' + results[i].category + '</span></div>';
  }
  html += '<div class="autocomplete-custom" id="invAutoCustom">+ Add "' + q + '" as custom item</div>';
  invAutocomplete.innerHTML = html;
  invAutocomplete.querySelectorAll('.autocomplete-item').forEach(function (el) {
    el.addEventListener('click', function () { selectInvItem(el.getAttribute('data-name')); });
  });
  document.getElementById('invAutoCustom').addEventListener('click', function () { selectInvItem(q); });
});

function selectInvItem(name) {
  invSelectedName = name;
  invSelectedChip.textContent = name;
  invSelectedArea.style.display = '';
  invAutocomplete.innerHTML = '';
  addInvSearch.style.display = 'none';
  addInvSearch.parentElement.style.display = 'none';
}

// Status selector
document.querySelectorAll('.status-opt').forEach(function (opt) {
  opt.addEventListener('click', function () {
    document.querySelectorAll('.status-opt').forEach(function (o) { o.classList.remove('active'); });
    opt.classList.add('active');
    invSelectedStatus = opt.getAttribute('data-status');
  });
});

document.getElementById('addInvConfirm').addEventListener('click', function () {
  var name = invSelectedName || 'New item';
  var qty = document.getElementById('addInvQty').value || '1';
  var statusMap = { plenty: { text: 'Plenty', cls: 'status-green' }, low: { text: 'Running Low', cls: 'status-yellow' }, out: { text: 'Almost Out', cls: 'status-red' } };
  var st = statusMap[invSelectedStatus];
  var key = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

  invData[key] = { name: name, qty: qty, status: st.text, statusClass: st.cls };

  var card = document.createElement('div');
  card.className = 'inventory-card';
  card.setAttribute('data-inv-item', key);
  card.innerHTML = '<div class="inventory-card-name">' + name + '</div><div class="inventory-card-qty">' + qty + '</div><span class="status-badge ' + st.cls + '">' + st.text + '</span>';
  document.querySelector('#invMineView .inventory-grid').appendChild(card);

  // Also add to family view
  var familyCard = card.cloneNode(true);
  document.querySelector('#invFamilyView .inventory-grid').appendChild(familyCard);

  function bindInvCardClick(c) {
    c.addEventListener('click', function () {
      var d = invData[key]; if (!d) return;
      currentInvKey = key;
      document.getElementById('invDetailName').textContent = d.name;
      document.getElementById('invDetailQty').textContent = d.qty;
      document.getElementById('invDetailStatus').innerHTML = '<span class="status-badge ' + d.statusClass + '">' + d.status + '</span>';
      document.getElementById('invDetailActions').style.display = '';
      document.getElementById('invDetailReadonly').style.display = 'none';
      invDetailModal.classList.add('open');
    });
  }
  bindInvCardClick(card);
  bindInvCardClick(familyCard);

  addInvModal.classList.remove('open');
  addInvSearch.value = ''; invAutocomplete.innerHTML = ''; invSelectedArea.style.display = 'none';
  addInvSearch.style.display = ''; addInvSearch.parentElement.style.display = '';
  invSelectedName = ''; invSelectedStatus = 'plenty';
  document.querySelectorAll('.status-opt').forEach(function (o) { o.classList.remove('active'); });
  document.querySelector('.status-opt[data-status="plenty"]').classList.add('active');
  showToast(name + ' added to inventory!');
});

// Finances screen removed — moved to Coming Soon

// ===== TOGGLE SWITCHES =====
document.querySelectorAll('.toggle-switch').forEach(function (toggle) {
  // Skip family mode toggle — handled separately
  if (toggle.id === 'familyModeToggle') return;
  toggle.addEventListener('click', function () { toggle.classList.toggle('on'); });
});

// ===== FAMILY MODE =====
var familyMode = false;
var familyModeToggle = document.getElementById('familyModeToggle');
var familyModeDesc = document.getElementById('familyModeDesc');
var familyModeInfo = document.getElementById('familyModeInfo');

// Households: The Apartment = individual mode, Family Home = family mode available
var householdModes = { 'The Apartment': false, 'Family Home': true };
var currentHousehold = 'The Apartment';

familyModeToggle.addEventListener('click', function () {
  familyMode = !familyMode;
  familyModeToggle.classList.toggle('on', familyMode);
  applyShoppingMode();
  applyInventoryMode();
  showToast(familyMode ? 'Family mode enabled' : 'Family mode disabled');
});

familyModeInfo.addEventListener('click', function () {
  familyModeDesc.classList.toggle('show');
});

function applyInventoryMode() {
  var toggle = document.getElementById('invModeToggle');
  var mineView = document.getElementById('invMineView');
  var hhView = document.getElementById('invHouseholdView');
  var familyView = document.getElementById('invFamilyView');

  if (familyMode) {
    toggle.style.display = 'none';
    mineView.style.display = 'none';
    hhView.style.display = 'none';
    familyView.style.display = '';
  } else {
    toggle.style.display = '';
    familyView.style.display = 'none';
    // Show whichever tab is active
    var activeTab = document.querySelector('.mode-btn[data-inv].active');
    var inv = activeTab ? activeTab.getAttribute('data-inv') : 'mine';
    mineView.style.display = inv === 'mine' ? '' : 'none';
    hhView.style.display = inv === 'household' ? '' : 'none';
  }
}

function applyShoppingMode() {
  var modeActive = document.querySelector('.mode-btn[data-mode].active');
  var mode = modeActive ? modeActive.getAttribute('data-mode') : 'daytoday';

  document.getElementById('daytodayView').style.display = 'none';
  document.getElementById('daytodayFamilyView').style.display = 'none';
  document.getElementById('atstoreView').style.display = 'none';
  document.getElementById('atstoreFamilyView').style.display = 'none';

  if (mode === 'daytoday') {
    if (familyMode) {
      document.getElementById('daytodayFamilyView').style.display = '';
    } else {
      document.getElementById('daytodayView').style.display = '';
    }
  } else {
    if (familyMode) {
      document.getElementById('atstoreFamilyView').style.display = '';
    } else {
      document.getElementById('atstoreView').style.display = '';
    }
  }
}

// ===== COMING SOON — VOTING & FEEDBACK =====
document.querySelectorAll('.cs-vote').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var voted = btn.getAttribute('data-voted') === 'true';
    if (voted) {
      btn.classList.remove('voted');
      btn.setAttribute('data-voted', 'false');
      showToast('Vote removed');
    } else {
      btn.classList.add('voted');
      btn.setAttribute('data-voted', 'true');
      showToast('Thanks for voting!');
    }
  });
});

document.getElementById('csFeedbackSubmit').addEventListener('click', function () {
  var input = document.getElementById('csFeedbackInput');
  if (!input.value.trim()) { showToast('Please enter your feedback'); return; }
  showToast('Thanks for your feedback!');
  input.value = '';
});

// ===== FILTER TABS (activity) =====
document.querySelectorAll('.activity-filters .filter-tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    tab.parentElement.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    var person = tab.textContent.trim();
    document.querySelectorAll('.activity-item').forEach(function (item) {
      if (person === 'All' || item.getAttribute('data-person') === person) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== RECIPES =====
var recipeDB = [
  { name: 'Scrambled Eggs', emoji: '🍳', category: 'breakfast', prep: '5 min', cook: '5 min', servings: 2,
    ingredients: [{ name: 'Eggs (12ct)', qty: '3 eggs' }, { name: 'Butter', qty: '1 tbsp' }, { name: 'Salt', qty: 'pinch' }, { name: 'Black Pepper', qty: 'pinch' }],
    steps: ['Crack eggs into a bowl and whisk until smooth', 'Melt butter in a non-stick pan over medium heat', 'Pour in eggs, stir gently with a spatula until just set', 'Season with salt and pepper, serve immediately'] },
  { name: 'Yogurt Parfait', emoji: '🥣', category: 'breakfast', prep: '5 min', cook: '0 min', servings: 1,
    ingredients: [{ name: 'Greek Yogurt', qty: '1 cup' }, { name: 'Granola', qty: '1/4 cup' }, { name: 'Bananas', qty: '1 sliced' }, { name: 'Honey', qty: '1 tbsp' }],
    steps: ['Layer yogurt in the bottom of a glass or bowl', 'Add a layer of granola', 'Top with sliced banana and drizzle with honey'] },
  { name: 'Avocado Toast', emoji: '🥑', category: 'breakfast', prep: '5 min', cook: '2 min', servings: 1,
    ingredients: [{ name: 'Sourdough Bread', qty: '2 slices' }, { name: 'Avocados', qty: '1' }, { name: 'Salt', qty: 'pinch' }, { name: 'Eggs (12ct)', qty: '1 egg' }],
    steps: ['Toast the bread until golden', 'Mash avocado with salt in a bowl', 'Spread onto toast', 'Top with a fried or poached egg'] },
  { name: 'Pasta with Tomato Sauce', emoji: '🍝', category: 'lunch', prep: '5 min', cook: '15 min', servings: 2,
    ingredients: [{ name: 'Pasta', qty: '8 oz' }, { name: 'Tomato Sauce', qty: '1 cup' }, { name: 'Olive Oil', qty: '1 tbsp' }, { name: 'Salt', qty: 'to taste' }, { name: 'Parmesan Cheese', qty: '2 tbsp' }],
    steps: ['Boil pasta in salted water until al dente', 'Heat tomato sauce in a pan with olive oil', 'Drain pasta and toss with sauce', 'Top with parmesan cheese'] },
  { name: 'Grilled Cheese', emoji: '🧀', category: 'lunch', prep: '3 min', cook: '6 min', servings: 1,
    ingredients: [{ name: 'Sourdough Bread', qty: '2 slices' }, { name: 'Cheddar Cheese', qty: '2 slices' }, { name: 'Butter', qty: '1 tbsp' }],
    steps: ['Butter one side of each bread slice', 'Place cheese between unbuttered sides', 'Cook in a pan over medium heat until golden on each side'] },
  { name: 'Spinach Salad', emoji: '🥗', category: 'lunch', prep: '10 min', cook: '0 min', servings: 2,
    ingredients: [{ name: 'Spinach', qty: '3 cups' }, { name: 'Eggs (12ct)', qty: '2 hard-boiled' }, { name: 'Olive Oil', qty: '2 tbsp' }, { name: 'Salt', qty: 'pinch' }],
    steps: ['Wash and dry spinach leaves', 'Slice hard-boiled eggs', 'Toss spinach with olive oil and salt', 'Top with sliced eggs'] },
  { name: 'Rice Bowl', emoji: '🍚', category: 'lunch', prep: '5 min', cook: '20 min', servings: 2,
    ingredients: [{ name: 'Rice', qty: '1 cup' }, { name: 'Chicken Breast', qty: '1' }, { name: 'Soy Sauce', qty: '2 tbsp' }, { name: 'Spinach', qty: '1 cup' }],
    steps: ['Cook rice according to package directions', 'Season and cook chicken breast, then slice', 'Wilt spinach in a hot pan', 'Assemble bowls with rice, chicken, and spinach', 'Drizzle with soy sauce'] },
  { name: 'Chicken Stir Fry', emoji: '🍗', category: 'dinner', prep: '10 min', cook: '12 min', servings: 3,
    ingredients: [{ name: 'Chicken Breast', qty: '1 lb' }, { name: 'Rice', qty: '1.5 cups' }, { name: 'Soy Sauce', qty: '3 tbsp' }, { name: 'Olive Oil', qty: '2 tbsp' }, { name: 'Garlic', qty: '2 cloves' }],
    steps: ['Cook rice and set aside', 'Cut chicken into strips', 'Heat oil in a wok, cook chicken until golden', 'Add minced garlic, stir 30 seconds', 'Add soy sauce, toss to coat', 'Serve over rice'] },
  { name: 'Spaghetti Bolognese', emoji: '🍝', category: 'dinner', prep: '10 min', cook: '25 min', servings: 4,
    ingredients: [{ name: 'Pasta', qty: '1 lb' }, { name: 'Ground Beef', qty: '1 lb' }, { name: 'Tomato Sauce', qty: '2 cups' }, { name: 'Onions', qty: '1 diced' }, { name: 'Garlic', qty: '3 cloves' }, { name: 'Olive Oil', qty: '1 tbsp' }],
    steps: ['Cook pasta according to package', 'Sauté onion and garlic in olive oil', 'Brown the ground beef', 'Add tomato sauce and simmer 15 minutes', 'Serve sauce over pasta'] },
  { name: 'Egg Fried Rice', emoji: '🥘', category: 'dinner', prep: '5 min', cook: '10 min', servings: 2,
    ingredients: [{ name: 'Rice', qty: '2 cups cooked' }, { name: 'Eggs (12ct)', qty: '2' }, { name: 'Soy Sauce', qty: '2 tbsp' }, { name: 'Olive Oil', qty: '1 tbsp' }, { name: 'Green Onions', qty: '2 stalks' }],
    steps: ['Heat oil in a wok over high heat', 'Scramble eggs and set aside', 'Add rice to the wok, stir fry 2-3 minutes', 'Add soy sauce and eggs back in', 'Top with sliced green onions'] },
  { name: 'Butter Pasta', emoji: '🧈', category: 'dinner', prep: '2 min', cook: '12 min', servings: 2,
    ingredients: [{ name: 'Pasta', qty: '8 oz' }, { name: 'Butter', qty: '3 tbsp' }, { name: 'Parmesan Cheese', qty: '1/4 cup' }, { name: 'Salt', qty: 'to taste' }, { name: 'Black Pepper', qty: 'pinch' }],
    steps: ['Cook pasta in salted water until al dente, reserve 1/2 cup pasta water', 'Melt butter in the pot', 'Add pasta back, toss with butter and a splash of pasta water', 'Stir in parmesan, season with salt and pepper'] },
  { name: 'Hummus & Veggies', emoji: '🥕', category: 'snacks', prep: '5 min', cook: '0 min', servings: 2,
    ingredients: [{ name: 'Hummus', qty: '1/2 cup' }, { name: 'Carrots', qty: '2' }, { name: 'Cucumber', qty: '1/2' }, { name: 'Bell Peppers', qty: '1' }],
    steps: ['Slice carrots, cucumber, and bell peppers into sticks', 'Serve with hummus for dipping'] },
  { name: 'PB & Apple Slices', emoji: '🍎', category: 'snacks', prep: '3 min', cook: '0 min', servings: 1,
    ingredients: [{ name: 'Apples', qty: '1' }, { name: 'Peanut Butter', qty: '2 tbsp' }],
    steps: ['Slice apple into wedges', 'Serve with peanut butter for dipping'] },
  { name: 'Cheese & Crackers', emoji: '🧀', category: 'snacks', prep: '3 min', cook: '0 min', servings: 2,
    ingredients: [{ name: 'Cheddar Cheese', qty: '4 oz' }, { name: 'Crackers', qty: '1 sleeve' }],
    steps: ['Slice cheese into squares', 'Arrange on a plate with crackers'] },
  { name: 'Fruit Smoothie', emoji: '🥤', category: 'snacks', prep: '5 min', cook: '0 min', servings: 1,
    ingredients: [{ name: 'Bananas', qty: '1' }, { name: 'Greek Yogurt', qty: '1/2 cup' }, { name: 'Whole Milk', qty: '1/2 cup' }, { name: 'Honey', qty: '1 tbsp' }],
    steps: ['Add all ingredients to a blender', 'Blend until smooth', 'Pour into a glass and enjoy'] }
];

// Get inventory item names for recipe matching
function getInventoryItems() {
  var items = [];
  for (var key in invData) {
    items.push(invData[key].name);
  }
  return items;
}

// Check which recipe ingredients the user has
function checkRecipeIngredients(recipe) {
  var invItems = getInventoryItems();
  var have = [], need = [];
  recipe.ingredients.forEach(function (ing) {
    var ingGroup = getGroupForItem(ing.name) || guessGroupForCustomItem(ing.name);
    var found = false;
    for (var i = 0; i < invItems.length; i++) {
      var invGroup = getGroupForItem(invItems[i]) || guessGroupForCustomItem(invItems[i]);
      if (ingGroup && invGroup && ingGroup === invGroup) { found = true; break; }
      if (invItems[i].toLowerCase() === ing.name.toLowerCase()) { found = true; break; }
    }
    if (found) have.push(ing); else need.push(ing);
  });
  return { have: have, need: need, matchCount: have.length, totalCount: recipe.ingredients.length };
}

// Render recipes
function renderRecipes(category) {
  var list = document.getElementById('recipeList');
  var filtered = category === 'all' ? recipeDB : recipeDB.filter(function (r) { return r.category === category; });

  // Sort by match percentage (best first)
  var scored = filtered.map(function (r) {
    var check = checkRecipeIngredients(r);
    return { recipe: r, check: check, pct: check.matchCount / check.totalCount };
  });
  scored.sort(function (a, b) { return b.pct - a.pct; });

  var html = '';
  scored.forEach(function (s) {
    var r = s.recipe, c = s.check;
    html += '<div class="recipe-card" data-recipe="' + r.name + '">';
    html += '<div class="recipe-card-header"><span class="recipe-card-name">' + r.name + '</span><span class="recipe-card-emoji">' + r.emoji + '</span></div>';
    html += '<div class="recipe-card-match">' + c.matchCount + '/' + c.totalCount + ' ingredients in your inventory</div>';
    html += '<div class="recipe-card-tags">';
    c.have.forEach(function (i) { html += '<span class="ingredient-tag have">' + i.name + '</span>'; });
    c.need.forEach(function (i) { html += '<span class="ingredient-tag need">' + i.name + '</span>'; });
    html += '</div></div>';
  });

  list.innerHTML = html;

  // Bind clicks
  list.querySelectorAll('.recipe-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var name = card.getAttribute('data-recipe');
      var recipe = recipeDB.find(function (r) { return r.name === name; });
      if (recipe) openRecipeDetail(recipe);
    });
  });
}

var currentRecipeMissing = [];

function openRecipeDetail(recipe) {
  var check = checkRecipeIngredients(recipe);
  currentRecipeMissing = check.need;

  var html = '<h3>' + recipe.emoji + ' ' + recipe.name + '</h3>';
  html += '<div class="recipe-detail-meta"><span>⏱ Prep: ' + recipe.prep + '</span><span>🔥 Cook: ' + recipe.cook + '</span><span>🍽 Serves ' + recipe.servings + '</span></div>';

  html += '<div class="recipe-detail-section"><h4>Ingredients</h4>';
  recipe.ingredients.forEach(function (ing) {
    var hasIt = check.have.indexOf(ing) > -1;
    html += '<div class="recipe-ingredient-row"><span class="recipe-ingredient-icon">' + (hasIt ? '✅' : '❌') + '</span><span>' + ing.qty + ' ' + ing.name + '</span></div>';
  });
  html += '</div>';

  html += '<div class="recipe-detail-section"><h4>Instructions</h4>';
  recipe.steps.forEach(function (step, i) {
    html += '<div class="recipe-step"><span class="recipe-step-num">' + (i + 1) + '</span><span>' + step + '</span></div>';
  });
  html += '</div>';

  document.getElementById('recipeDetailContent').innerHTML = html;
  document.getElementById('recipeAddMissing').style.display = check.need.length > 0 ? '' : 'none';
  document.getElementById('recipeDetailModal').classList.add('open');
}

document.getElementById('recipeDetailClose').addEventListener('click', function () {
  document.getElementById('recipeDetailModal').classList.remove('open');
});

document.getElementById('recipeAddMissing').addEventListener('click', function () {
  suppressAddedModal = true;
  currentRecipeMissing.forEach(function (ing) { addItemToList(ing.name, ''); });
  suppressAddedModal = false;
  document.getElementById('recipeDetailModal').classList.remove('open');
  showToast(currentRecipeMissing.length + ' missing items added to your list');
});

// Recipe filter tabs
document.querySelectorAll('#recipeFilters .filter-tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    tab.parentElement.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    renderRecipes(tab.getAttribute('data-rcat'));
  });
});

// Render recipes when navigating to the screen
var origShowScreen2 = showScreen;
showScreen = function (id) {
  origShowScreen2(id);
  if (id === 'recipes') renderRecipes('all');
};
