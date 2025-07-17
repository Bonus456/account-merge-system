const accounts = [
   { id: 1, firstName: "John", lastName: "Doe", address: "123 Main St", color: "Blue" },
  { id: 2, firstName: "Jane", lastName: "Smith", address: "456 Maple Ave", color: "Green" },
  { id: 3, firstName: "Alice", lastName: "Johnson", address: "789 Oak Rd", color: "Red" },
  { id: 4, firstName: "John", lastName: "Doe", address: "555 Elm St", color: "Blue" },
  { id: 5, firstName: "John", lastName: "Doe", address: "777 Birch Rd", color: "Blue" },
  { id: 6, firstName: "Alice", lastName: "Johnson", address: "789 Oak Rd", color: "Red" },
  { id: 7, firstName: "Cathy", lastName: "White", address: "999 Pine St", color: "Pink" },
  { id: 8, firstName: "Dan", lastName: "Green", address: "333 Birch Blvd", color: "Orange" },
  { id: 9, firstName: "Tom", lastName: "Hanks", address: "888 Cedar Cir", color: "Yellow" },
  { id: 10, firstName: "Tom", lastName: "Hanks", address: "888 Cedar Cir", color: "Blue" },

  { id: 11, firstName: "Emily", lastName: "Clark", address: "1010 River Rd", color: "Purple" },
  { id: 12, firstName: "John", lastName: "Doe", address: "123 Main St", color: "Blue" }, // duplicate
  { id: 13, firstName: "Greg", lastName: "Miller", address: "212 Sunset Blvd", color: "Red" },
  { id: 14, firstName: "Alice", lastName: "Johnson", address: "111 Forest Ln", color: "Red" },
  { id: 15, firstName: "Emily", lastName: "Clark", address: "1010 River Rd", color: "Teal" }, // same name/address, diff color
  { id: 16, firstName: "Sarah", lastName: "Lee", address: "400 Ocean Ave", color: "Blue" },
  { id: 17, firstName: "Jane", lastName: "Smith", address: "456 Maple Ave", color: "Green" }, // exact duplicate
  { id: 18, firstName: "David", lastName: "Stone", address: "150 Hilltop Rd", color: "Orange" },
  { id: 19, firstName: "Lucas", lastName: "White", address: "221 Sunset Blvd", color: "Red" }, // similar address
  { id: 20, firstName: "Jane", lastName: "Smith", address: "999 Grove St", color: "Green" },   // same name, diff address

  { id: 21, firstName: "Anna", lastName: "Bell", address: "305 Willow Way", color: "Pink" },
  { id: 22, firstName: "Tom", lastName: "Hanks", address: "888 Cedar Cir", color: "Blue" }, // duplicate
  { id: 23, firstName: "Chris", lastName: "Brown", address: "456 Maple Ave", color: "Teal" }, // same address
  { id: 24, firstName: "Brian", lastName: "Lee", address: "789 Oak Rd", color: "Purple" }, // same address
  { id: 25, firstName: "Anna", lastName: "Bell", address: "305 Willow Way", color: "Pink" }, // duplicate
  { id: 26, firstName: "Megan", lastName: "Stone", address: "150 Hilltop Rd", color: "Yellow" }, // same address
  { id: 27, firstName: "Cathy", lastName: "White", address: "999 Pine St", color: "Pink" }, // duplicate
  { id: 28, firstName: "Nina", lastName: "Brown", address: "303 Canyon Dr", color: "Red" },
  { id: 29, firstName: "Kyle", lastName: "Green", address: "404 Redwood Ln", color: "Orange" },

  { id: 30, firstName: "Alice", lastName: "Johnson", address: "789 Oak Rd", color: "Red" }, // duplicate
  { id: 31, firstName: "David", lastName: "Stone", address: "150 Hilltop Rd", color: "Orange" }, // duplicate
  { id: 32, firstName: "Tom", lastName: "Hanks", address: "222 Cedar Cir", color: "Yellow" }, // similar
  { id: 33, firstName: "Lucas", lastName: "White", address: "221 Sunset Blvd", color: "Red" }, // duplicate
  { id: 34, firstName: "Emily", lastName: "Clark", address: "1212 River Rd", color: "Purple" }, // same name
  { id: 35, firstName: "John", lastName: "Doe", address: "123 Main St", color: "Blue" } // duplicate
];

let marked = new Set();
let currentPage = 1;
let sortKey = "lastName";
const itemsPerPage = 10;

function renderAccounts() {
  const container = document.getElementById("account-list");
  container.innerHTML = "";

  // Sort accounts before paginating
  const sortedAccounts = [...accounts].sort((a, b) => {
    return a[sortKey].localeCompare(b[sortKey]);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAccounts = sortedAccounts.slice(startIndex, endIndex);

  paginatedAccounts.forEach(account => {
    const div = document.createElement("div");
    div.className = "account";
    div.innerHTML = `
      <div class="account-details">
        <strong>${account.firstName} ${account.lastName}</strong><br/>
        Address: ${account.address}<br/>
        Favorite Color: ${account.color}
      </div>
      <input type="checkbox" data-id="${account.id}" ${marked.has(account.id) ? "checked" : ""}>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      if (e.target.checked) {
        marked.add(id);
      } else {
        marked.delete(id);
      }
    });
  });

  renderPagination();
}

function renderPagination() {
  let paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    document.querySelector(".container").appendChild(paginationContainer);
  }

  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.disabled = true;
    }
    btn.addEventListener("click", () => {
      currentPage = i;
      renderAccounts();
    });
    paginationContainer.appendChild(btn);
  }
}

document.getElementById("merge-btn").addEventListener("click", () => {
  if (marked.size < 2) {
    alert("Please mark at least two accounts to merge.");
    return;
  }

  showMergeChoice();
});

function showMergeChoice() {
  const modal = document.getElementById("modal");
  const optionsContainer = document.getElementById("modal-options");
  optionsContainer.innerHTML = `
    <button id="select-dominant">Keep only 1 Selected Account Data From Selection</button>
    <button id="merge-all">Merge All Selected Info Into 1 Account</button>
  `;

  document.getElementById("select-dominant").onclick = () => openModal();
  document.getElementById("merge-all").onclick = () => {
    startMergeAll();
    closeModal();
  };

  modal.classList.remove("hidden");
}

function openModal() {
  const modal = document.getElementById("modal");
  const optionsContainer = document.getElementById("modal-options");
  optionsContainer.innerHTML = "";

  const selectedAccounts = [...marked].map(id => accounts.find(a => a.id === id));

  const allAddresses = selectedAccounts.map(a => a.address);
  const allColors = selectedAccounts.map(a => a.color);

  const uniqueAddresses = [...new Set(allAddresses)];
  const uniqueColors = [...new Set(allColors)];

  selectedAccounts.forEach(account => {
    const btn = document.createElement("button");

    let details = `${account.firstName} ${account.lastName}`;

    if (uniqueAddresses.length > 1) {
      details += `\nAddress: ${account.address}`;
    }

    if (uniqueColors.length > 1) {
      details += `\nColor: ${account.color}`;
    }

    btn.textContent = details;
    btn.onclick = () => {
      mergeDominant(account.id);
      closeModal();
    };

    optionsContainer.appendChild(btn);
  });
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}


function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}


//merges accounts via selected dominat account and remove the rest
function mergeDominant(dominantId) {
  const selectedAccounts = [...marked].map(id => accounts.find(a => a.id === id));
  const dominantAccount = accounts.find(a => a.id === dominantId);

  for (const acc of selectedAccounts) {
    const index = accounts.findIndex(a => a.id === acc.id);
    if (index !== -1) {
      accounts.splice(index, 1);
    }
  }

  accounts.push(dominantAccount);

  marked.clear();
  renderAccounts();
}

//begin to merge all info and catch if there are more than 1 unique names in the selected accoutns
function startMergeAll() {
  const selectedAccounts = [...marked].map(id => accounts.find(a => a.id === id));

  const fullNames = selectedAccounts.map(a => `${a.firstName} ${a.lastName}`);
  const uniqueNames = [...new Set(fullNames)];

  if (uniqueNames.length > 1) {
    openNameConflictModal(selectedAccounts); 
  } else {
    mergeAllSelected(selectedAccounts, uniqueNames[0]);
  }
}

//merge all sub info, addresses and colors. takes in final name string on top of selected account info
function mergeAllSelected(selectedAccounts, finalName) {
  const [firstName, ...lastParts] = finalName.split(" ");
  const lastName = lastParts.join(" ");

  const base = { id: Date.now(), firstName, lastName };

  base.address = [...new Set(selectedAccounts.map(a => a.address))].join(", ");
  base.color = [...new Set(selectedAccounts.map(a => a.color))].join(", ");

  selectedAccounts.forEach(acc => {
    const index = accounts.findIndex(a => a.id === acc.id);
    if (index !== -1) {
      accounts.splice(index, 1);
    }
  });

  accounts.push(base);
  marked.clear();
  renderAccounts();
}

function openNameConflictModal(selectedAccounts) {
  const modal = document.getElementById("name-conflict-modal");
  const container = document.getElementById("name-conflict-options");
  container.innerHTML = "";

  const selectLabel = document.createElement("p");
  selectLabel.textContent = "Choose a name to use:";
  container.appendChild(selectLabel);

  const addedNames = new Set();

  selectedAccounts.forEach(account => {
    const fullName = `${account.firstName} ${account.lastName}`;
    if (addedNames.has(fullName)) return;

    const btn = document.createElement("button");
    btn.textContent = fullName;
    btn.onclick = () => {
      mergeAllSelected(selectedAccounts, fullName); // merge syb info with one dominant name
      closeNameConflictModal();
    };
    container.appendChild(btn);

    addedNames.add(fullName);
  });

  const mergeAllBtn = document.createElement("button");
  mergeAllBtn.textContent = "Merge All Names";
  mergeAllBtn.onclick = () => {
    const allNames = [...new Set(selectedAccounts.map(a => `${a.firstName} ${a.lastName}`))];
    const combinedName = allNames.join(", ");
    mergeAllSelected(selectedAccounts, combinedName); // merge sub info + all names commas separated
    closeNameConflictModal();
  };
  container.appendChild(mergeAllBtn);

  modal.classList.remove("hidden");
}

function cancelNameConflict() {
  document.getElementById("name-conflict-modal").classList.add("hidden");
}

function closeNameConflictModal() {
  document.getElementById("name-conflict-modal").classList.add("hidden");
}

document.getElementById("cancel-btn").addEventListener("click", closeModal);

document.getElementById("sort-select").addEventListener("change", (e) => {
  sortKey = e.target.value;
  currentPage = 1;
  renderAccounts();
});

renderAccounts();
