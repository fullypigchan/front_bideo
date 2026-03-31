const selectedFilters = { region: null, field: null };

document
    .getElementById("filterRegion")
    .addEventListener("click", () =>
        togglePanel("regionPanel", "filterRegion"),
    );
document
    .getElementById("filterField")
    .addEventListener("click", () => togglePanel("fieldPanel", "filterField"));

function togglePanel(panelId, triggerId) {
    const panel = document.getElementById(panelId);
    const trigger = document.getElementById(triggerId);
    const isOpen = panel.classList.contains("open");
    closeAll();
    if (!isOpen) {
        panel.classList.add("open");
        trigger.classList.add("active");
    }
}

function closeAll() {
    document
        .querySelectorAll(".dropdown-panel")
        .forEach((p) => p.classList.remove("open"));
    document
        .querySelectorAll(".filter-item")
        .forEach((i) => i.classList.remove("active"));
}

document.addEventListener("click", function (e) {
    if (
        !e.target.closest(".filter-item") &&
        !e.target.closest(".dropdown-panel")
    ) {
        closeAll();
    }
});

document.querySelectorAll(".dropdown-option").forEach((opt) => {
    opt.addEventListener("click", function () {
        const target = this.dataset.target;
        const value = this.dataset.value;
        document
            .querySelectorAll(`[data-target="${target}"]`)
            .forEach((o) => o.classList.remove("selected"));
        this.classList.add("selected");
        selectedFilters[target] = value;
        const labelId = target === "region" ? "regionLabel" : "fieldLabel";
        const label = document.getElementById(labelId);
        label.textContent = value;
        label.classList.add("selected");
        closeAll();
        updateCount();
    });
});

document.getElementById("searchInput").addEventListener("input", updateCount);

function updateCount() {
    let count = 0;
    if (selectedFilters.region) count++;
    if (selectedFilters.field) count++;
    if (document.getElementById("searchInput").value.trim()) count++;
    document.getElementById("selectedCount").textContent = count;
}

document.getElementById("searchBtn").addEventListener("click", function () {
    const keyword = document.getElementById("searchInput").value.trim();
    if (!keyword && !selectedFilters.region && !selectedFilters.field) {
        alert("검색조건을 설정해 주세요.");
        return;
    }
    console.log("검색:", { ...selectedFilters, keyword });
});

// 북마크 토글
document.querySelectorAll(".card-bookmark").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("active");
    });
});
