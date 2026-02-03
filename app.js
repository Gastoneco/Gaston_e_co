(function(){
  const saved = localStorage.getItem("gastonco_lang") || "it";
  const setLang = (lang) => {
    document.documentElement.setAttribute("data-lang", lang);
    localStorage.setItem("gastonco_lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      const it = el.getAttribute("data-it") || "";
      const en = el.getAttribute("data-en") || "";
      el.innerHTML = (lang === "en" ? en : it);
    });
    document.querySelectorAll(".lang button").forEach(b=>{
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
  };
  window.GC = { setLang };
  document.addEventListener("click", (e)=>{
    const btn = e.target.closest(".lang button");
    if(btn){ setLang(btn.dataset.lang); }
  });
  setLang(saved);

  // active nav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".links a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path){ a.classList.add("active"); }
  });

  // smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", (e)=>{
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });
})();