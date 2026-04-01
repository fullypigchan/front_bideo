document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector("[data-intro-main-root]");
  if (!root) {
    return;
  }

  const CLASS_TAB_OPEN = "lb-tabpanel--open";
  const ICON_VOLUME_OFF = "volume-off";
  const ICON_VOLUME_UP = "volume-up";

  function initHeroVideo() {
    const video = root.querySelector(".ytc-home-hero__video");
    const muteButton = root.querySelector(".ytc-home-hero__mute");
    const iconUse = muteButton ? muteButton.querySelector("use") : null;

    if (!video || !muteButton) {
      return;
    }

    if (!video.getAttribute("src")) {
      muteButton.hidden = true;
      muteButton.disabled = true;
      return;
    }

    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    muteButton.setAttribute("aria-pressed", "true");

    function updateIcon() {
      if (iconUse) {
        iconUse.setAttribute("href", "#" + (video.muted ? ICON_VOLUME_OFF : ICON_VOLUME_UP));
      }

      muteButton.setAttribute("aria-pressed", String(video.muted));
      muteButton.setAttribute("aria-label", video.muted ? "음소거 해제" : "음소거");
    }

    muteButton.addEventListener("click", function (event) {
      event.preventDefault();
      video.muted = !video.muted;
      updateIcon();

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          return undefined;
        });
      }
    });

    updateIcon();
  }

  function initFaqTabs() {
    const tabs = Array.from(root.querySelectorAll('.lb-tablist [role="tab"]'));
    const panels = Array.from(root.querySelectorAll(".lb-tabpanel-group > .lb-tabpanel"));

    if (tabs.length === 0 || panels.length === 0 || tabs.length !== panels.length) {
      return;
    }

    function activateTab(index) {
      tabs.forEach(function (tab, tabIndex) {
        const selected = tabIndex === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      panels.forEach(function (panel, panelIndex) {
        const selected = panelIndex === index;
        panel.classList.toggle(CLASS_TAB_OPEN, selected);
        panel.hidden = !selected;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function (event) {
        event.preventDefault();
        activateTab(index);
      });

      tab.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateTab(index);
        }
      });
    });

    activateTab(0);
  }

  initHeroVideo();
  initFaqTabs();
});
