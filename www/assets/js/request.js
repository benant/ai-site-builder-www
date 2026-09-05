/* =========================================================
 * ASBA 작업 의뢰 폼 스크립트
 * - 카테고리/템플릿 선택 → 템플릿 목록 갱신
 * - 공통 + 카테고리별 동적 필드 렌더
 * - 견적 실시간 계산
 * - POST {ASBA.API_BASE}/api/intake 로 접수
 * 빌드 없이 동작하는 바닐라 JS
 * ========================================================= */
(function () {
  "use strict";

  if (!window.ASBA) return;
  var $ = function (id) { return document.getElementById(id); };

  var state = {
    category: null,
    template: null,   // null = AI 자동 선택
    autoTemplate: true
  };

  /* ---------- 서버에서 다운로드 템플릿 로드 ---------- */
  ASBA.fetchServerTemplates().then(function () {
    // 템플릿 로드 후 현재 선택된 카테고리가 있으면 다시 렌더
    if (state.category) renderTemplates();
  });

  /* ---------- Step 1: GitHub username 간단 검증 ---------- */
  var ghInput = $("github-username");
  var ghCheck = $("gh-check");
  var ghTimer = null;

  ghInput.addEventListener("input", function () {
    clearTimeout(ghTimer);
    var name = ghInput.value.trim();
    if (!name || !/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(name)) {
      ghCheck.textContent = name ? " ⚠️ GitHub 사용자 이름 형식이 아닙니다." : "";
      return;
    }
    ghCheck.textContent = " ✓ 형식 확인";
    // 존재 여부는 서버에서 최종 확인 (공개 API 직접 호출은 rate limit 회피를 위해 생략)
  });

  /* ---------- Step 2: 카테고리 카드 렌더 ---------- */
  var catWrap = $("category-cards");
  ASBA.CATEGORIES.forEach(function (cat) {
    var label = document.createElement("label");
    label.className = "radio-card";
    label.innerHTML =
      "<input type='radio' name='category' value='" + cat.code + "' />" +
      "<span class='rc-icon'>" + cat.icon + "</span><b>" + cat.name + "</b>" +
      "<small>" + cat.desc + "</small>";
    catWrap.appendChild(label);
  });
  catWrap.addEventListener("change", function (e) {
    state.category = e.target.value;
    state.template = null; // 카테고리 변경 시 템플릿 초기화
    Array.prototype.forEach.call(catWrap.children, function (el) {
      el.classList.toggle("selected", el.querySelector("input").checked);
    });
    renderTemplates();
    renderCategoryFields();
    updateQuote();
  });

  /* ---------- Step 3: 템플릿 목록 ---------- */
  var tplWrap = $("template-list");
  var autoChk = $("auto-template");

  function renderTemplates() {
    tplWrap.innerHTML = "";
    var cat = ASBA.CATEGORIES.find(function (c) { return c.code === state.category; });
    if (!cat) {
      tplWrap.innerHTML = "<p class='hint'>카테고리를 먼저 선택해 주세요.</p>";
      autoChk.disabled = true;
      return;
    }
    autoChk.disabled = false;

    // 다운로드 템플릿과 AI 템플릿 분리
    var downloadedTpls = [];
    var aiTpls = [];
    cat.templates.forEach(function (tid) {
      var meta = ASBA.TEMPLATES[tid] || { name: tid, tone: "" };
      if (meta.source === "downloaded") {
        downloadedTpls.push({ id: tid, meta: meta });
      } else {
        aiTpls.push({ id: tid, meta: meta });
      }
    });

    // 다운로드 템플릿 표시 (더 크고 눈에 띄게)
    if (downloadedTpls.length > 0) {
      var sectionLabel = document.createElement("div");
      sectionLabel.className = "tpl-section-label";
      sectionLabel.innerHTML = "📁 실제 템플릿 <span class='tpl-section-badge'>다운로드 완료</span>";
      tplWrap.appendChild(sectionLabel);

      downloadedTpls.forEach(function (item) {
        var label = document.createElement("label");
        label.className = "radio-card downloaded" + (state.autoTemplate ? " disabled" : "");

        // 썸네일 + 미리보기 URL (로컬)
        var tplSlug = item.id.replace("dl-", "");
        var thumbUrl = "./assets/img/templates/" + tplSlug + ".png";
        var previewUrl = "./templates/" + tplSlug + "/index.html";

        var html = "<input type='radio' name='template' value='" + item.id + "' " + (state.autoTemplate ? "disabled" : "") + " />" +
          "<div class='rc-thumb-wrap'>" +
            "<img class='rc-thumb-img' src='" + thumbUrl + "' alt='" + item.meta.name + "' loading='lazy' onerror=\"this.style.display='none'\" />" +
            "<div class='rc-thumb-overlay'>" +
              "<a href='" + previewUrl + "' target='_blank' rel='noopener' class='rc-preview-btn' onclick='event.preventDefault(); event.stopPropagation(); window.open(this.href)'>미리보기 ↗</a>" +
            "</div>" +
          "</div>" +
          "<div class='rc-info'>" +
            "<b>" + item.meta.name + "</b>" +
            "<span class='rc-badge'>실제 템플릿</span>" +
            "<small>" + item.meta.tone + "</small>" +
          "</div>";
        label.innerHTML = html;
        tplWrap.appendChild(label);
      });
    }

    // AI 템플릿 표시
    if (aiTpls.length > 0) {
      var aiLabel = document.createElement("div");
      aiLabel.className = "tpl-section-label";
      aiLabel.innerHTML = "🤖 AI 추천 스타일";
      tplWrap.appendChild(aiLabel);

      aiTpls.forEach(function (item) {
        var label = document.createElement("label");
        label.className = "radio-card" + (state.autoTemplate ? " disabled" : "");
        label.innerHTML =
          "<input type='radio' name='template' value='" + item.id + "' " + (state.autoTemplate ? "disabled" : "") + " />" +
          "<span class='rc-icon'>🧩</span>" +
          "<b>" + item.meta.name + "</b>" +
          "<small>" + item.meta.tone + "</small>";
        tplWrap.appendChild(label);
      });
    }
  }
  tplWrap.addEventListener("change", function (e) {
    if (!state.autoTemplate && e.target.name === "template") {
      state.template = e.target.value || null;
      Array.prototype.forEach.call(tplWrap.children, function (el) {
        var input = el.querySelector("input[name='template']");
        if (input) el.classList.toggle("selected", input.checked);
      });
    }
  });
  autoChk.addEventListener("change", function () {
    state.autoTemplate = autoChk.checked;
    if (state.autoTemplate) state.template = null;
    renderTemplates();
  });

  /* ---------- 동적 필드 렌더 유틸 ---------- */
  function buildField(f, prefix) {
    var wrap = document.createElement("div");
    wrap.className = "mt-16";
    var id = prefix + f.key;
    var req = f.required ? " <span class='req'>*</span>" : "";
    var label = document.createElement("label");
    label.className = "fl";
    label.setAttribute("for", id);
    label.innerHTML = f.label + req;
    wrap.appendChild(label);

    var input;
    if (f.type === "textarea") {
      input = document.createElement("textarea");
      input.id = id;
      input.placeholder = f.placeholder || "";
    } else if (f.type === "select") {
      input = document.createElement("select");
      input.id = id;
      (f.options || []).forEach(function (o) {
        var opt = document.createElement("option");
        opt.value = o; opt.textContent = o;
        input.appendChild(opt);
      });
    } else {
      input = document.createElement("input");
      input.type = f.type === "number" ? "number" : (f.type === "color" ? "color" : (f.type || "text"));
      input.id = id;
      if (f.type !== "color") input.placeholder = f.placeholder || "";
      if (f.min !== undefined) input.min = f.min;
    }
    input.dataset.fieldKey = f.key;
    if (f.required) input.required = true;
    wrap.appendChild(input);
    return wrap;
  }

  /* 공통 필드 */
  var commonWrap = $("common-fields");
  ASBA.COMMON_FIELDS.forEach(function (f) {
    commonWrap.appendChild(buildField(f, "c-"));
  });

  /* 카테고리별 필드 */
  var detailWrap = $("category-fields");
  var detailHint = $("detail-hint");

  function renderCategoryFields() {
    detailWrap.innerHTML = "";
    var schema = ASBA.FORM_SCHEMAS[state.category];
    if (!schema) {
      detailHint.style.display = "";
      return;
    }
    detailHint.style.display = "none";
    schema.forEach(function (f) {
      detailWrap.appendChild(buildField(f, "d-"));
    });
    var perPageHint = $("per-page-hint");
    var cat = ASBA.CATEGORIES.find(function (c) { return c.code === state.category; });
    if (cat && perPageHint) perPageHint.textContent = cat.pagesLabel + ": 페이지당 " + ASBA.formatKRW(cat.perPagePrice);
  }

  /* ---------- 옵션 체크박스 ---------- */
  var formOptionsWrap = $("form-options");
  ASBA.OPTIONS.forEach(function (o) {
    var label = document.createElement("label");
    label.className = "check-item";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = o.code;
    label.appendChild(input);
    var text = document.createElement("span");
    text.innerHTML = "<b>" + o.name + "</b> <span class='price'>+" + ASBA.formatKRW(o.price) + "</span><small>" + o.desc + "</small>";
    label.appendChild(text);
    formOptionsWrap.appendChild(label);
  });

  /* ---------- 견적 갱신 ---------- */
  var extraPagesInput = $("extra-pages");

  function currentQuote() {
    if (!state.category) return null;
    var opts = Array.prototype.slice
      .call(formOptionsWrap.querySelectorAll("input:checked"))
      .map(function (i) { return i.value; });
    return ASBA.calcQuote(state.category, extraPagesInput.value, opts);
  }

  function updateQuote() {
    var q = currentQuote();
    var linesEl = $("form-quote-lines");
    var totalEl = $("form-quote-total");
    if (!q) {
      linesEl.innerHTML = "";
      totalEl.textContent = "-";
      return;
    }
    linesEl.innerHTML = "";
    q.lines.forEach(function (l) {
      var li = document.createElement("li");
      li.innerHTML = "<span>" + l.label + "</span><span>" + ASBA.formatKRW(l.amount) + "</span>";
      linesEl.appendChild(li);
    });
    totalEl.textContent = ASBA.formatKRW(q.total);
  }

  formOptionsWrap.addEventListener("change", updateQuote);
  extraPagesInput.addEventListener("input", updateQuote);

  /* ---------- URL 파라미터로 랜딩 계산기 값 받기 ---------- */
  (function applyParams() {
    var p = new URLSearchParams(location.search);
    var cat = p.get("category");
    if (cat && ASBA.FORM_SCHEMAS[cat]) {
      var radio = catWrap.querySelector("input[value='" + cat + "']");
      if (radio) { radio.checked = true; radio.dispatchEvent(new Event("change", { bubbles: true })); }
    }
    var pages = parseInt(p.get("pages") || "0", 10);
    if (pages > 0) extraPagesInput.value = pages;
    (p.getAll("option") || []).forEach(function (code) {
      var cb = formOptionsWrap.querySelector("input[value='" + code + "']");
      if (cb) cb.checked = true;
    });
    updateQuote();
  })();

  /* ---------- 유효성 검사 ---------- */
  function collectErrors() {
    var errs = [];
    if (!ghInput.value.trim()) errs.push("GitHub 사용자 이름을 입력해 주세요.");
    if (!state.category) errs.push("카테고리를 선택해 주세요.");
    ["common-fields", "category-fields"].forEach(function (wrapId) {
      $(wrapId).querySelectorAll("[required]").forEach(function (el) {
        if (!String(el.value).trim()) errs.push("'" + el.previousElementSibling.textContent.replace("*", "").trim() + "' 항목은 필수입니다.");
      });
    });
    if (!$("agree-terms").checked) errs.push("동의 항목에 체크해 주세요.");
    return errs;
  }

  /* ---------- 제출 ---------- */
  var form = $("intake-form");
  var submitBtn = $("submit-btn");
  var resultBox = $("form-result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    resultBox.className = "form-result";
    resultBox.textContent = "";

    var errors = collectErrors();
    if (errors.length) {
      resultBox.classList.add("error");
      resultBox.innerHTML = "<b>입력을 확인해 주세요:</b><ul style='margin:8px 0 0 18px;'><li>"
        + errors.join("</li><li>") + "</li></ul>";
      resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span class='spinner'></span>접수 중...";

    var payload = {
      github_username: ghInput.value.trim(),
      category: state.category,
      template: state.template,
      auto_template: state.autoTemplate,
      extra_pages: Math.max(0, parseInt(extraPagesInput.value || "0", 10)),
      options: Array.prototype.slice
        .call(formOptionsWrap.querySelectorAll("input:checked"))
        .map(function (i) { return i.value; }),
      answers: {}
    };
    ["common-fields", "category-fields"].forEach(function (wrapId) {
      $(wrapId).querySelectorAll("[data-field-key]").forEach(function (el) {
        if (String(el.value).trim() !== "") payload.answers[el.dataset.fieldKey] = el.value;
      });
    });

    fetch(ASBA.API_BASE + "/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("서버 응답 오류 (" + res.status + ")");
        return res.json();
      })
      .then(function (data) {
        resultBox.classList.add("ok");
        resultBox.innerHTML =
          "<b>🎉 의뢰가 접수되었습니다!</b><br />" +
          "전용 저장소가 준비되면 입력하신 GitHub 계정(<b>" + escapeHtml(payload.github_username) +
          "</b>)으로 공동작업자 초대가 발송됩니다.<br />" +
          "초대를 수락하시면 저장소 이슈에서 AI 기획서와 디자인 시안 3종을 확인하실 수 있습니다." +
          (data.repo_url ? "<br /><br />🔗 <a href='" + data.repo_url + "' target='_blank' rel='noopener'>" + data.repo_url + "</a>" : "");
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(function (err) {
        resultBox.classList.add("error");
        resultBox.innerHTML = "<b>접수에 실패했습니다.</b><br />" + escapeHtml(err.message) +
          "<br />잠시 후 다시 시도해 주세요. 문제가 지속되면 아래 주소로 문의해 주세요.";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "무료로 접수하고 시작하기 →";
        resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
      });
  });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
