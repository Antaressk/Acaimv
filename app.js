const CATEGORIES = [
  "Todos",
  "Açaí",
  "Hambúrgueres",
  "Pastéis",
  "Milk-shakes",
  "Bebidas",
  "Sobremesas",
  "Combos",
];
const DEMO_PRODUCTS = [
  {
    id: "demo-1",
    name: "Açaí tradicional 300 ml",
    category: "Açaí",
    price: 12,
    description: "Açaí cremoso para matar a vontade de um jeito gostoso.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80",
    tag: "QUERIDINHO",
  },
  {
    id: "demo-2",
    name: "Açaí especial 500 ml",
    category: "Açaí",
    price: 16,
    description: "Açaí com banana, granola e complementos à escolha.",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=700&q=80",
    tag: "MAIS PEDIDO",
  },
  {
    id: "demo-3",
    name: "X-Burguer",
    category: "Hambúrgueres",
    price: 16,
    description: "Hambúrguer, queijo derretido, molho da casa e pão macio.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    tag: "CLÁSSICO",
  },
  {
    id: "demo-4",
    name: "X-Bacon",
    category: "Hambúrgueres",
    price: 21,
    description: "Hambúrguer suculento, queijo e bacon crocante.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-5",
    name: "Pastel de frango",
    category: "Pastéis",
    price: 8,
    description: "Massa douradinha e recheio saboroso de frango.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-6",
    name: "Pastel de queijo",
    category: "Pastéis",
    price: 8,
    description: "Queijo derretido em uma massa bem crocante.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-7",
    name: "Milk-shake de chocolate",
    category: "Milk-shakes",
    price: 12,
    description: "Cremoso, geladinho e com muito sabor de chocolate.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-8",
    name: "Milk-shake de morango",
    category: "Milk-shakes",
    price: 12,
    description: "Uma combinação cremosa e refrescante de morango.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-9",
    name: "Suco natural",
    category: "Bebidas",
    price: 6,
    description: "Suco gelado para acompanhar seu lanche.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-10",
    name: "Refrigerante lata",
    category: "Bebidas",
    price: 6,
    description: "Uma bebida gelada para completar o pedido.",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-11",
    name: "Taça especial",
    category: "Sobremesas",
    price: 14,
    description: "Camadas doces para fechar o momento com chave de ouro.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: "demo-12",
    name: "Combo X-Burguer",
    category: "Combos",
    price: 24,
    description: "X-burguer, batata e bebida em uma combinação prática.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
    tag: "COMBO",
  },
];
const STORAGE_KEY = "aca imv.catalog.v1".replace(" ", "");
let products = loadProducts();
let activeCategory = "Todos";
const $ = (id) => document.getElementById(id);
const money = (value) =>
  Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Inicialização das credenciais administrativas caso não existam
if (!localStorage.getItem('adminUser')) {
  localStorage.setItem('adminUser', 'admin');
  localStorage.setItem('adminPassword', 'admin123');
}

function loadProducts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : structuredClone(DEMO_PRODUCTS);
  } catch {
    return structuredClone(DEMO_PRODUCTS);
  }
}
function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
function safeText(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function categoryIcon(category) {
  const icons = {
    "Todos": '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>',
    "Açaí": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16l-1.5 7a3 3 0 0 1-3 2.4h-7A3 3 0 0 1 5.5 17L4 10Z"/><path d="M4 10c2-3 5-4 8-4s6 1 8 4M12 6l2-3M8 7 6 4M15 8l3-2"/></svg>',
    "Hambúrgueres": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10a8 8 0 0 1 16 0H4Z"/><path d="M3 13h18l-1 3H4l-1-3ZM5 19h14"/><path d="M8 7h.01M12 5h.01M16 7h.01"/></svg>',
    "Pastéis": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15 15 4a3 3 0 0 1 4 0l1 1a3 3 0 0 1 0 4L9 20a3 3 0 0 1-4 0l-1-1a3 3 0 0 1 0-4Z"/><path d="m7 16 1 1m2-4 1 1m2-4 1 1m2-4 1 1"/></svg>',
    "Milk-shakes": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8h10l-1 12H8L7 8Z"/><path d="M9 8 14 3M12 8l5-5M9 12h6M10 16h4"/></svg>',
    "Bebidas": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7h8l-1 13H9L8 7Z"/><path d="M10 4h4M12 4V2M10 11l4 5M14 11l-4 5"/></svg>',
    "Sobremesas": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h14l-1 10H6L5 9Z"/><path d="M4 9c0-2 2-3 4-2 1-3 6-3 8 0 2-1 4 0 4 2M12 7V4M12 4c-2 0-3-1-3-2"/></svg>',
    "Combos": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M8 8 7 3M12 8V2M16 8l1-5M9 12v4M12 12v4M15 12v4"/></svg>'
  };
  return icons[category] || '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18"/></svg>';
}

function renderCategories() {
  const cats = [
    ...CATEGORIES.filter(
      (c) => c === "Todos" || products.some((p) => p.category === c),
    ),
    ...new Set(
      products.map((p) => p.category).filter((c) => !CATEGORIES.includes(c)),
    ),
  ];
  $("categories").innerHTML = cats
    .map(
      (c) => {
        const count = c === "Todos" ? products.length : products.filter((p) => p.category === c).length;
        return `<button class="category-chip ${activeCategory === c ? "active" : ""}" data-category="${safeText(c)}" type="button"><span class="category-symbol" aria-hidden="true">${categoryIcon(c)}</span><span>${safeText(c)}</span><span class="category-count">${count}</span></button>`;
      },
    )
    .join("");
  $("categories")
    .querySelectorAll("button")
    .forEach((btn) =>
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        renderCategories();
        renderProducts();
      }),
    );
}

function renderProducts() {
  const query = $("searchInput").value.trim().toLocaleLowerCase("pt-BR");
  const filtered = products.filter((p) =>
    (activeCategory === "Todos" || p.category === activeCategory) &&
    `${p.name} ${p.description || ""} ${p.category}`.toLocaleLowerCase("pt-BR").includes(query)
  );

  const summary = $("menuSummary");
  if (summary) {
    summary.textContent = `${filtered.length} ${filtered.length === 1 ? "opção" : "opções"}`;
  }

  // Agrupa os resultados por categoria para que cada tipo de produto tenha
  // um título próprio. A ordem segue a lista de categorias do cardápio.
  const categoryOrder = [
    ...CATEGORIES.filter((category) => category !== "Todos"),
    ...new Set(products.map((product) => product.category).filter(
      (category) => !CATEGORIES.includes(category)
    )),
  ];
  const grouped = new Map();
  categoryOrder.forEach((category) => {
    const items = filtered.filter((product) => product.category === category);
    if (items.length) grouped.set(category, items);
  });

  $("productGrid").innerHTML = [...grouped.entries()].map(([category, items]) => `
    <section class="menu-category-section" aria-labelledby="category-${safeText(category).replace(/[^a-z0-9]+/gi, "-")}">
      <div class="menu-category-heading">
        <h2 id="category-${safeText(category).replace(/[^a-z0-9]+/gi, "-")}">
          <span class="menu-category-icon" aria-hidden="true">${categoryIcon(category)}</span>
          ${safeText(category)}
        </h2>
        <span>${items.length} ${items.length === 1 ? "produto" : "produtos"}</span>
      </div>
      <div class="menu-category-products">
        ${items.map((p) => `
          <article class="product-card product-card-clickable" data-product-id="${safeText(p.id)}" tabindex="0" role="button" aria-label="Ver detalhes de ${safeText(p.name)}">
            <div class="product-image">
              ${p.image
                ? `<img loading="lazy" src="${safeText(p.image)}" alt="${safeText(p.name)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false">`
                : ""}
              <div class="image-placeholder" ${p.image ? "hidden" : ""}>${categoryIcon(p.category)}</div>
            </div>
            <div class="product-info">
              <div class="product-category-label">${categoryIcon(p.category)}<span>${safeText(p.category)}</span></div>
              <div class="product-meta">
                <h3>${safeText(p.name)}</h3>
                ${p.tag ? `<span class="product-tag">${safeText(p.tag)}</span>` : ""}
              </div>
              <p>${safeText(p.description || "Consulte os detalhes deste produto.")}</p>
              <div class="product-bottom">
                <span class="product-price">${money(p.price)}</span>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");

  $("emptyState").classList.toggle("hidden", filtered.length > 0);
}

function fillCategorySelect() {
  if (!$("productCategory")) return;
  const current = $("productCategory").value;
  $("productCategory").innerHTML = [
    ...new Set([
      ...CATEGORIES.filter((c) => c !== "Todos"),
      ...products.map((p) => p.category),
    ]),
  ]
    .map((c) => `<option value="${safeText(c)}">${safeText(c)}</option>`)
    .join("");
  if ([...$("productCategory").options].some((o) => o.value === current))
    $("productCategory").value = current;
  const adminFilter = $("adminCategoryFilter");
  if (adminFilter) {
    const selected = adminFilter.value || "todas";
    adminFilter.innerHTML = '<option value="todas">Todas as categorias</option>' +
      [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b, "pt-BR"))
        .map((c) => `<option value="${safeText(c)}">${safeText(c)}</option>`).join("");
    if ([...adminFilter.options].some((o) => o.value === selected)) adminFilter.value = selected;
  }
}
function renderAdminList() {
  if (!$("adminProductList")) return;
  const selectedCategory = $("adminCategoryFilter")?.value || "todas";
  const visibleProducts = selectedCategory === "todas" ? products : products.filter((p) => p.category === selectedCategory);
  $("adminProductList").innerHTML =
    visibleProducts
      .map(
        (p) =>
          `<div class="admin-product"><div class="mini-placeholder">${categoryIcon(p.category)}</div><div class="admin-product-main"><strong>${safeText(p.name)}</strong><small>${safeText(p.category)}</small></div><span class="admin-product-price">${money(p.price)}</span><div class="admin-actions"><button type="button" data-edit="${safeText(p.id)}">Editar</button><button type="button" class="delete-btn" data-delete="${safeText(p.id)}" aria-label="Excluir ${safeText(p.name)}">Excluir</button></div></div>`,
      )
      .join("") || '<p class="empty-state">Nenhum produto cadastrado.</p>';
  $("adminProductList")
    .querySelectorAll("[data-edit]")
    .forEach((b) =>
      b.addEventListener("click", () => editProduct(b.dataset.edit)),
    );
  $("adminProductList")
    .querySelectorAll("[data-delete]")
    .forEach((b) =>
      b.addEventListener("click", () => deleteProduct(b.dataset.delete)),
    );
}
function renderAll() {
  renderCategories();
  renderProducts();
  fillCategorySelect();
  renderAdminList();
}
function resetForm() {
  $("productForm").reset();
  $("productId").value = "";
  $("saveProduct").innerHTML = "Salvar produto <span>＋</span>";
  if ($("productImageFile")) $("productImageFile").value = "";
  if ($("productImagePreview")) { $("productImagePreview").removeAttribute("src"); $("productImagePreview").hidden = true; $("productImagePreview").style.display = "none"; }
}
function editProduct(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  $("productId").value = p.id;
  $("productName").value = p.name;
  $("productCategory").value = p.category;
  $("productPrice").value = p.price;
  $("productImageUrl").value = (p.image && !p.image.startsWith("data:")) ? p.image : "";
  $("productImageFile").value = "";
  const preview = $("productImagePreview");
  if (p.image) { preview.src = p.image; preview.hidden = false; preview.style.display = "block"; }
  else { preview.removeAttribute("src"); preview.hidden = true; preview.style.display = "none"; }
  $("productDescription").value = p.description || "";
  $("saveProduct").innerHTML = "Atualizar produto <span>✓</span>";
  $("productForm").classList.remove("hidden");
  $("showProductForm").textContent = "＋ Novo produto";
  $("productForm").scrollIntoView({ behavior: "smooth", block: "start" });
  $("productName").focus();
}
function deleteProduct(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  if (!confirm(`Excluir "${p.name}" do catálogo?`)) return;
  products = products.filter((x) => x.id !== id);
  saveProducts();
  renderAll();
  $("adminFeedback").textContent = "Produto excluído.";
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, 900 / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/webp", 0.78));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

$("productImageFile")?.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const preview = $("productImagePreview");
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    e.target.value = "";
    preview.hidden = true;
    preview.style.display = "none";
    return;
  }
  try {
    preview.src = await compressImage(file);
    preview.hidden = false;
    preview.style.display = "block";
    $("productImageUrl").value = "";
  } catch {
    preview.hidden = true;
    preview.style.display = "none";
  }
});

$("productImageUrl")?.addEventListener("input", () => {
  const preview = $("productImagePreview");
  if ($("productImageUrl").value.trim()) {
    preview.src = $("productImageUrl").value.trim();
    preview.hidden = false;
    preview.style.display = "block";
    $("productImageFile").value = "";
  } else if (!$("productImageFile").files.length) {
    preview.hidden = true;
    preview.style.display = "none";
  }
});

$("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = $("productId").value;
  const p = {
    id: id || `p-${Date.now()}`,
    name: $("productName").value.trim(),
    category: $("productCategory").value,
    price: Number($("productPrice").value),
    image: $("productImageUrl").value.trim(),
    description: $("productDescription").value.trim(),
    tag: "",
  };
  const imageFile = $("productImageFile").files[0];
  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      $("adminFeedback").textContent = "Selecione um arquivo de imagem válido.";
      return;
    }
    try {
      p.image = await compressImage(imageFile);
    } catch {
      $("adminFeedback").textContent = "Não foi possível carregar essa imagem. Tente outra.";
      return;
    }
  } else if (id) {
    const previous = products.find((x) => x.id === id);
    if (previous && previous.image && previous.image.startsWith("data:") && !p.image) p.image = previous.image;
  }
  if (!p.name || !Number.isFinite(p.price) || p.price < 0) return;
  products = id ? products.map((x) => (x.id === id ? p : x)) : [p, ...products];
  saveProducts();
  renderAll();
  resetForm();
  $("productForm").classList.add("hidden");
  $("showProductForm").textContent = "＋ Adicionar produto";
  $("adminFeedback").textContent = id
    ? "Produto atualizado com sucesso."
    : "Produto cadastrado com sucesso.";
});

$("cancelEdit").addEventListener("click", () => {
  resetForm();
  $("productForm").classList.add("hidden");
  $("showProductForm").textContent = "＋ Adicionar produto";
  $("adminFeedback").textContent = "";
});

$("showProductForm")?.addEventListener("click", () => {
  const form = $("productForm");
  const opening = form.classList.contains("hidden");
  if (opening) {
    resetForm();
    form.classList.remove("hidden");
    $("showProductForm").textContent = "× Fechar formulário";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    $("productName").focus({ preventScroll: true });
  } else {
    resetForm();
    form.classList.add("hidden");
    $("showProductForm").textContent = "＋ Adicionar produto";
  }
});

function setAdminView(view) {
  const settingsView = view === "settings";
  [".admin-warning", ".admin-toolbar", ".admin-category-filter", "#adminProductList", ".admin-footer"].forEach((selector) => {
    document.querySelectorAll(`#adminPanelSection ${selector}`).forEach((element) => element.classList.toggle("hidden", settingsView));
  });
  document.querySelectorAll("#adminPanelSection > .admin-list-head").forEach((element) => element.classList.toggle("hidden", settingsView));
  if (settingsView) {
    $("productForm").classList.add("hidden");
    resetForm();
    $("showProductForm").textContent = "＋ Adicionar produto";
  }
  $("adminSettings").classList.toggle("hidden", !settingsView);
  $("toggleSettings")?.setAttribute("aria-expanded", String(settingsView));
  if (settingsView) {
    $("whatsappNumber").value = localStorage.getItem("acaimvWhatsappNumber") || "";
    $("adminSettings").scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    $("adminProductList").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
$("toggleSettings")?.addEventListener("click", () => setAdminView("settings"));
$("backToProducts")?.addEventListener("click", () => setAdminView("products"));

function refreshWhatsappButton() {
  const button = $("whatsappFloat");
  if (!button) return;
  const number = (localStorage.getItem("acaimvWhatsappNumber") || "").replace(/\D/g, "");
  if (number.length >= 10) {
    button.href = `https://wa.me/${number}`;
    button.classList.remove("hidden");
  } else {
    button.classList.add("hidden");
    button.removeAttribute("href");
  }
}
$("whatsappForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const number = $("whatsappNumber").value.replace(/\D/g, "");
  if (number && number.length < 10) {
    $("whatsappFeedback").textContent = "Confira o número: inclua o código do país, DDD e telefone.";
    $("whatsappFeedback").hidden = false;
    return;
  }
  localStorage.setItem("acaimvWhatsappNumber", number);
  $("whatsappFeedback").textContent = number ? "Número do WhatsApp atualizado." : "Botão do WhatsApp ocultado porque o número foi removido.";
  $("whatsappFeedback").hidden = false;
  refreshWhatsappButton();
});

// Controle de Telas (Acesso Restrito / Login / Painel)
$("adminOpen").addEventListener("click", () => {
  $("adminModal").classList.remove("hidden");
  $("loginSection").classList.remove("hidden");
  $("adminPanelSection").classList.add("hidden");
  $("loginError").style.display = "none";
  $("loginForm").reset();
});

$("closeLogin").addEventListener("click", () => {
  $("adminModal").classList.add("hidden");
});

$("closeAdmin").addEventListener("click", () => {
  $("adminModal").classList.add("hidden");
});

// Interceptar clique fora do modal para fechar tudo com segurança
$("adminModal").addEventListener("click", (e) => {
  if (e.target === $("adminModal")) $("adminModal").classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") $("adminModal").classList.add("hidden");
});

// Ação de Autenticação do Formulário de Login
$("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = $("loginUser").value;
  const passwordInput = $("loginPassword").value;

  if (userInput === localStorage.getItem("adminUser") && passwordInput === localStorage.getItem("adminPassword")) {
    $("loginSection").classList.add("hidden");
    $("adminPanelSection").classList.remove("hidden");
    setAdminView("products");
    renderAll();
  } else {
    $("loginError").style.display = "block";
  }
});

// Troca de Credenciais Administrativas
$("credentialsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("adminUser", $("newAdminUser").value);
  localStorage.setItem("adminPassword", $("newAdminPassword").value);
  $("credentialsFeedback").style.display = "block";
  setTimeout(() => {
    $("credentialsFeedback").style.display = "none";
  }, 3000);
  $("credentialsForm").reset();
});

$("searchInput").addEventListener("input", renderProducts);
$("adminCategoryFilter")?.addEventListener("change", renderAdminList);



$("exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "catalogo-acaimv.json";
  a.click();
  URL.revokeObjectURL(url);
  $("adminFeedback").textContent = "Exportação do catálogo iniciada.";
});

$("importData").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data) || !data.every((p) => p.name && p.category && Number.isFinite(Number(p.price)))) throw new Error("Formato inválido");
    products = data.map((p, i) => ({
      id: String(p.id || `import-${Date.now()}-${i}`),
      name: String(p.name),
      category: String(p.category),
      price: Number(p.price),
      description: String(p.description || ""),
      image: String(p.image || ""),
      tag: String(p.tag || ""),
    }));
    saveProducts();
    activeCategory = "Todos";
    renderAll();
    $("adminFeedback").textContent = "Catálogo importado com sucesso.";
  } catch {
    $("adminFeedback").textContent = "Não foi possível importar. Confira se o JSON é um catálogo válido.";
  }
  e.target.value = "";
});

// Janela de detalhes: clique/toque em qualquer produto para ampliar a imagem e ver informações.
function openProductDetails(productId) {
  const product = products.find((item) => String(item.id) === String(productId));
  if (!product) return;
  $("productDetailTitle").textContent = product.name || "Produto";
  $("productDetailCategory").textContent = product.category || "";
  $("productDetailDescription").textContent = product.description || "Consulte a loja para mais detalhes sobre este produto.";
  $("productDetailPrice").textContent = money(product.price);
  const image = $("productDetailImage");
  if (product.image) {
    image.src = product.image;
    image.alt = product.name || "Imagem do produto";
    image.hidden = false;
    image.onerror = () => { image.hidden = true; };
  } else {
    image.removeAttribute("src");
    image.hidden = true;
  }
  $("productDetailModal").classList.remove("hidden");
  document.body.classList.add("product-detail-open");
  $("closeProductDetail").focus();
}
function closeProductDetails() {
  $("productDetailModal").classList.add("hidden");
  document.body.classList.remove("product-detail-open");
}
$("productGrid").addEventListener("click", (event) => {
  if (event.target.closest("a, button, input, select, textarea")) return;
  const card = event.target.closest(".product-card[data-product-id]");
  if (card) openProductDetails(card.dataset.productId);
});
$("productGrid").addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".product-card[data-product-id]")) {
    event.preventDefault();
    openProductDetails(event.target.dataset.productId);
  }
});
$("closeProductDetail").addEventListener("click", closeProductDetails);
$("productDetailModal").addEventListener("click", (event) => {
  if (event.target === $("productDetailModal")) closeProductDetails();
});

// Inicialização segura ao carregar a página
$("year").textContent = new Date().getFullYear();
refreshWhatsappButton();
renderAll();

// Renderização organizada do painel administrativo por categoria.
function renderAdminList() {
  const list = $("adminProductList");
  if (!list) return;
  const selectedCategory = $("adminCategoryFilter")?.value || "todas";
  const categories = [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const visibleProducts = selectedCategory === "todas" ? products : products.filter((p) => p.category === selectedCategory);
  if ($("adminTotalCount")) $("adminTotalCount").textContent = products.length;
  if ($("adminCategoryCount")) $("adminCategoryCount").textContent = categories.length;
  list.innerHTML = categories
    .filter((category) => selectedCategory === "todas" || category === selectedCategory)
    .map((category) => {
      const items = visibleProducts.filter((p) => p.category === category);
      if (!items.length) return "";
      return `<section class="admin-category-group"><div class="admin-category-title"><h4>${safeText(category)}</h4><span>${items.length} ${items.length === 1 ? "produto" : "produtos"}</span></div>${items.map((p) => `<div class="admin-product">${p.image ? `<img class="admin-product-thumb" src="${safeText(p.image)}" alt="Foto de ${safeText(p.name)}" loading="lazy">` : `<div class="mini-placeholder">${categoryIcon(p.category)}</div>`}<div class="admin-product-main"><strong>${safeText(p.name)}</strong><small>${safeText(p.description || category)}</small></div><span class="admin-product-price">${money(p.price)}</span><div class="admin-actions"><button type="button" data-edit="${safeText(p.id)}">Editar</button><button type="button" class="delete-btn" data-delete="${safeText(p.id)}" aria-label="Excluir ${safeText(p.name)}">Excluir</button></div></div>`).join("")}</section>`;
    }).join("") || '<p class="empty-state">Nenhum produto cadastrado nesta categoria. Use “Adicionar produto” para começar.</p>';
  list.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => editProduct(b.dataset.edit)));
  list.querySelectorAll("[data-delete]").forEach((b) => b.addEventListener("click", () => deleteProduct(b.dataset.delete)));
}
