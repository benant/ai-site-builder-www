/* =========================================================
 * ASBA 랜딩 페이지 스크립트 — 견적 계산기
 * 빌드 없이 동작하는 바닐라 JS
 * ========================================================= */
(function () {
  "use strict";

  var categorySelect = document.getElementById("calc-category");
  var pagesInput = document.getElementById("calc-pages");
  var optionsWrap = document.getElementById("calc-options");
  var linesEl = document.getElementById("calc-lines");
  var totalEl = document.getElementById("calc-total");
  var ctaEl = document.getElementById("calc-cta");

  if (!categorySelect || !window.ASBA) return;

  /* 카테고리 옵션 채우기 */
  ASBA.CATEGORIES.forEach(function (cat) {
    var opt = document.createElement("option");
    opt.value = cat.code;
    opt.textContent = cat.icon + " " + cat.name;
    categorySelect.appendChild(opt);
  });

  /* 추가 옵션 체크박스 렌더 */
  var checkboxes = [];
  ASBA.OPTIONS.forEach(function (o) {
    var label = document.createElement("label");
    label.className = "check-item";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = o.code;
    label.appendChild(input);
    var text = document.createElement("span");
    text.innerHTML =
      "<b>" + o.name + "</b> <span class='price'>+" + ASBA.formatKRW(o.price) + "</span>" +
      "<small>" + o.desc + "</small>";
    label.appendChild(text);
    optionsWrap.appendChild(label);
    checkboxes.push(input);
  });

  function render() {
    var selected = checkboxes.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    var quote = ASBA.calcQuote(categorySelect.value, pagesInput.value, selected);
    if (!quote) return;

    linesEl.innerHTML = "";
    quote.lines.forEach(function (line) {
      var li = document.createElement("li");
      li.innerHTML = "<span>" + line.label + "</span><span>" + ASBA.formatKRW(line.amount) + "</span>";
      linesEl.appendChild(li);
    });
    totalEl.textContent = ASBA.formatKRW(quote.total);

    /* 의뢰 폼으로 선택값 전달 (쿼리스트링) */
    var params = new URLSearchParams({
      category: categorySelect.value,
      pages: pagesInput.value || "0"
    });
    selected.forEach(function (code) { params.append("option", code); });
    ctaEl.href = "./request.html?" + params.toString();
  }

  categorySelect.addEventListener("change", render);
  pagesInput.addEventListener("input", render);
  optionsWrap.addEventListener("change", render);


  render();

  /* =========================================================
   * 진행 과정 Carousel Timeline
   * ========================================================= */
  initTimeline();

  function initTimeline() {
    var rail = document.querySelector(".tl-rail");
    var track = document.querySelector(".tl-track");
    var dots = document.querySelectorAll(".tl-dots span");
    var prev = document.querySelector(".tl-prev");
    var next = document.querySelector(".tl-next");
    var railDots = document.querySelectorAll(".tl-rail .tl-dot");
    if (!rail || !track) return;

    var N = railDots.length;
    var i = 0;
    var animLock = false;
    var LOCK_MS = 600;

    function go(target) {
      if (animLock) return;
      i = Math.max(0, Math.min(N - 1, target));
      track.style.setProperty("--i", i);
      railDots.forEach(function (d, idx) {
        var on = idx === i;
        d.classList.toggle("is-active", on);
        d.setAttribute("aria-selected", on ? "true" : "false");
      });
      dots.forEach(function (d, idx) {
        d.classList.toggle("is-on", idx === i);
        d.classList.toggle("is-on-gate", idx === i && idx === 3);
      });
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === N - 1;
      animLock = true;
      setTimeout(function () { animLock = false; }, LOCK_MS);
    }

    railDots.forEach(function (d) {
      d.addEventListener("click", function () { go(parseInt(d.dataset.i, 10)); });
    });
    if (prev) prev.addEventListener("click", function () { go(i - 1); });
    if (next) next.addEventListener("click", function () { go(i + 1); });

    // 하단 dot indicator 클릭
    dots.forEach(function (d, idx) {
      d.addEventListener("click", function () { go(idx); });
    });

    // 키보드 ←/→
    var section = document.getElementById("process");
    if (section) {
      section.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft")  { e.preventDefault(); go(i - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
      });
    }

    // 터치 스와이프
    var startX = null;
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX == null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
      startX = null;
    });

    go(0);
  }
})();
