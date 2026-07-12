(() => {
    const toggle = document.querySelector(".mode-toggle");
    if (!toggle) return;

    const setMode = (mode) => {
        document.body.dataset.mode = mode;
        const isBusiness = mode === "business";
        toggle.setAttribute("aria-pressed", String(isBusiness));
        toggle.setAttribute("aria-label", isBusiness ? "Switch to play view" : "Switch to work view");
        toggle.querySelector(".mode-toggle-label").textContent = isBusiness ? "Work" : "Play";

        const personalPortrait = document.querySelector(".v2-portrait-personal");
        const businessPortrait = document.querySelector(".v2-portrait-business");
        personalPortrait?.setAttribute("aria-hidden", String(isBusiness));
        businessPortrait?.setAttribute("aria-hidden", String(!isBusiness));
    };

    const updateModeUrl = (mode) => {
        const url = new URL(window.location.href);
        url.searchParams.set("mode", mode === "business" ? "work" : "play");
        window.history.replaceState({}, "", url);
    };

    const linkedMode = new URLSearchParams(window.location.search).get("mode");
    const initialMode = linkedMode === "work"
        ? "business"
        : linkedMode === "play"
            ? "personal"
            : window.localStorage.getItem("site-mode") === "business"
                ? "business"
                : "personal";

    setMode(initialMode);
    toggle.addEventListener("click", () => {
        if (document.body.classList.contains("mode-changing")) return;

        const nextMode = document.body.dataset.mode === "business" ? "personal" : "business";
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            window.localStorage.setItem("site-mode", nextMode);
            setMode(nextMode);
            updateModeUrl(nextMode);
            return;
        }

        document.body.classList.add("mode-changing");
        window.setTimeout(() => {
            window.localStorage.setItem("site-mode", nextMode);
            setMode(nextMode);
            updateModeUrl(nextMode);
        }, 140);
        window.setTimeout(() => document.body.classList.remove("mode-changing"), 1050);
    });
})();
