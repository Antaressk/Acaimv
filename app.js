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
  return (
    {
      Açaí: "🍇",
      Hambúrgueres: "🍔",
      Pastéis: "🥟",
      "Milk-shakes": "🥤",
      Bebidas: "🧃",
      Sobremesas: "🍨",
      Combos: "🍟",
    }[category] || "✦"
  );
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
      (c) =>
        `<button class="category-chip ${activeCategory === c ? "active" : ""}" data-category="${safeText(c)}">${c === "Todos" ? "✦" : categoryIcon(c)} &nbsp;${safeText(c)}</button>`,
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
  const query = $("searchInput").value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const filtered = products.filter((p) =>
    (activeCategory === "Todos" || p.category === activeCategory) &&
    `${p.name} ${p.description || ""} ${p.category}`
      .toLocaleLowerCase("pt-BR")
      .includes(query)
  );

  // Define a ordem das categorias no cardápio
  const categoryOrder = [
    ...CATEGORIES.filter((c) => c !== "Todos"),
    ...new Set(products.map((p) => p.category))
  ];

  const categoriesToShow = categoryOrder.filter(
    (category, index, array) =>
      array.indexOf(category) === index &&
      filtered.some((p) => p.category === category)
  );

  // Monta os produtos de cada categoria separadamente
  $("productGrid").innerHTML = categoriesToShow.map((category) => {
    const categoryProducts = filtered.filter(
      (p) => p.category === category
    );

    return `
      <section class="menu-category-section">
        <div class="menu-category-heading">
          <h2>${categoryIcon(category)} ${safeText(category)}</h2>
          <span>${categoryProducts.length}
            ${categoryProducts.length === 1 ? "produto" : "produtos"}
          </span>
        </div>

        <div class="product-grid menu-category-products">
          ${categoryProducts.map((p) => `
            <article class="product-card">
              <div class="product-image">
                ${
                  p.image
                    ? `<img
                        loading="lazy"
                        src="${safeText(p.image)}"
                        alt="${safeText(p.name)}"
                        onerror="this.outerHTML='<div class=&quot;image-placeholder&quot;>${categoryIcon(p.category)}</div>'"
                      >`
                    : `<div class="image-placeholder">${categoryIcon(p.category)}</div>`
                }
              </div>

              <div class="product-info">
                <div class="product-meta">
                  <h3>${safeText(p.name)}</h3>
                  <span class="product-price">${money(p.price)}</span>
                </div>

                <p>${safeText(
                  p.description || "Consulte os detalhes deste produto."
                )}</p>

                ${
                  p.tag
                    ? `<span class="product-tag">${safeText(p.tag)}</span>`
                    : ""
                }
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");

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
}
function renderAdminList() {
  if (!$("adminProductList")) return;
  $("adminProductList").innerHTML =
    products
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
  if ($("demoNotice")) {
    $("demoNotice").classList.toggle(
      "hidden",
      !products.some((p) => String(p.id).startsWith("demo-")),
    );
  }
}
function resetForm() {
  $("productForm").reset();
  $("productId").value = "";
  $("saveProduct").innerHTML = "Salvar produto <span>＋</span>";
}
function editProduct(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  $("productId").value = p.id;
  $("productName").value = p.name;
  $("productCategory").value = p.category;
  $("productPrice").value = p.price;
  $("productImage").value = p.image || "";
  $("productDescription").value = p.description || "";
  $("saveProduct").innerHTML = "Atualizar produto <span>✓</span>";
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

$("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("productId").value;
  const p = {
    id: id || `p-${Date.now()}`,
    name: $("productName").value.trim(),
    category: $("productCategory").value,
    price: Number($("productPrice").value),
    image: $("productImage").value.trim(),
    description: $("productDescription").value.trim(),
    tag: "",
  };
  if (!p.name || !Number.isFinite(p.price) || p.price < 0) return;
  products = id ? products.map((x) => (x.id === id ? p : x)) : [p, ...products];
  saveProducts();
  renderAll();
  resetForm();
  $("adminFeedback").textContent = id
    ? "Produto updated com sucesso."
    : "Produto cadastrado com sucesso.";
});

$("cancelEdit").addEventListener("click", () => {
  resetForm();
  $("adminFeedback").textContent = "";
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

$("resetDemo").addEventListener("click", () => {
  if (!confirm("Restaurar a lista de produtos e preços de exemplo? Suas alterações atuais serão substituídas.")) return;
  products = structuredClone(DEMO_PRODUCTS);
  saveProducts();
  activeCategory = "Todos";
  renderAll();
  $("adminFeedback").textContent = "Catálogo de demonstração restaurado.";
});

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
  const file = e.target.files;
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

// Inicialização segura ao carregar a página
$("year").textContent = new Date().getFullYear();
renderAll();