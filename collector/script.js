(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    modeSwitch = body.querySelector(".toggle-switch"),
    closeBtn = body.querySelector(".close-btn"),
    bell = body.querySelector(".bell"),
    notify = body.querySelector("#notify"),
    l10 = body.querySelector(".l10"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    l10.textContent = data["sin"]["l10"];
    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    l10.textContent = data["en"]["l10"];
    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    setGreeting();
  });

  bell.addEventListener("click", () => {
    notify.style.display = "grid";
    bell.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    notify.style.display = "none";
    bell.classList.remove("active");
  });

  body.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("do-not") &&
      bell.classList.contains("active")
    ) {
      notify.style.display = "none";
      bell.classList.remove("active");
    }
  });

  var data = {
    sin: {
      l10: "දැනුම්දීම්",
      w1: "අද එකතු කිරීම්",
      w2: "අද ඉතිරිය",
      c1: "අද එකතු කිරීම්",
      c2: "සවිස්තරාත්මක දසුනක් සඳහා එකතුවක් තෝරන්න",
      c4: "ඉදිරියට එන එකතු කිරීම්",
      c5: "ඉදිරි දින 2 සඳහා ඉදිරි එකතු කිරීම් බලන්න",
    },
    en: {
      l10: "Notifications",
      w1: "Today's Collections",
      w2: "Today's Remaining",
      c1: "Today's Collections",
      c2: "select a collection for a detailed view",
      c4: "Upcoming Collections",
      c5: "View upcoming collections for next 2 days",
    },
  };

  checkLng();
  checkMode();

  modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      sessionStorage.setItem("mode", "dark");
    } else {
      sessionStorage.setItem("mode", "light");
    }
  });
})();
