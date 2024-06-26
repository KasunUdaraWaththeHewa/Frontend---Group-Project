(() => {
  let loaded = false;

  const interval = setInterval(() => {
    const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      l0 = body.querySelector(".l0"),
      l1 = body.querySelector(".l1"),
      l2 = body.querySelector(".l2"),
      l3 = body.querySelector(".l3"),
      l4 = body.querySelector(".l4"),
      l5 = body.querySelector(".l5"),
      l6 = body.querySelector(".l6"),
      l7 = body.querySelector(".l7"),
      l8 = body.querySelector(".l8"),
      l9 = body.querySelector(".l9"),
      l11 = body.querySelector(".l11"),
      newSupply = body.querySelector(".newSupply"),
      address = body.querySelector(".address"),
      payment = body.querySelector(".payment"),
      reports = body.querySelector(".reports"),
      chat = body.querySelector(".chat"),
      dashboard = body.querySelector(".dashboard"),
      Uname = body.querySelector(".name"),
      logout = body.querySelector(".logout"),
      profile = body.querySelector(".profile"),
      bars = body.querySelector(".fa-bars"),
      navHide = body.querySelector(".nav-hide");

    newSupply.addEventListener("click", () => {
      pageLoading();
    });
    address.addEventListener("click", () => {
      pageLoading();
    });
    payment.addEventListener("click", () => {
      pageLoading();
    });
    reports.addEventListener("click", () => {
      pageLoading();
    });
    chat.addEventListener("click", () => {
      pageLoading();
    });
    dashboard.addEventListener("click", () => {
      pageLoading();
    });
    profile.addEventListener("click", () => {
      pageLoading();
    });
    logout.addEventListener("click", () => {
      signout();
    });

    if (getCookie("name") != null) Uname.textContent = getCookie("name");
    else {
      document.cookie =
        "name=" + getPayload(getCookie("jwt")).name + "; path=/";
      Uname.textContent = getCookie("name");
    }

    newSupply.href = frontProxy + "/supplier/supply";
    address.href = frontProxy + "/supplier/address/view-all.html";
    payment.href = frontProxy + "/supplier/payment/view-all.html";
    chat.href = frontProxy + "/supplier/chat/chat.html";
    reports.href = frontProxy + "/supplier/reports/report.html";
    profile.href = frontProxy + "/supplier/profile/view.html";
    dashboard.href = frontProxy + "/supplier/";

    if (!loaded && toggle && modeSwitch) {
      loaded = true;
      clearInterval(interval);
    }

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    navHide.addEventListener("click", () => {
      sidebar.classList.remove("sidebar-active");
      bars.style.display = "block";
    });

    modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        // sessionStorage.setItem("mode", "dark");
        document.cookie = "mode=dark; path=/";
        modeText.innerHTML = modeTranslate();
      } else {
        // sessionStorage.setItem("mode", "light");
        document.cookie = "mode=light; path=/";
        modeText.innerHTML = modeTranslate();
      }
    });

    sin.addEventListener("click", () => {
      l0.textContent = data["sin"]["l0"];
      l1.textContent = data["sin"]["l1"];
      l2.textContent = data["sin"]["l2"];
      l3.textContent = data["sin"]["l3"];
      l4.textContent = data["sin"]["l4"];
      l5.textContent = data["sin"]["l5"];
      l6.textContent = data["sin"]["l6"];
      l7.textContent = data["sin"]["l7"];
      l8.textContent = data["sin"]["l8"];
      l9.textContent = modeTranslate();
      l11.textContent = data["sin"]["l11"];
    });

    en.addEventListener("click", () => {
      l0.textContent = data["en"]["l0"];
      l1.textContent = data["en"]["l1"];
      l2.textContent = data["en"]["l2"];
      l3.textContent = data["en"]["l3"];
      l4.textContent = data["en"]["l4"];
      l5.textContent = data["en"]["l5"];
      l6.textContent = data["en"]["l6"];
      l7.textContent = data["en"]["l7"];
      l8.textContent = data["en"]["l8"];
      l9.textContent = modeTranslate();
      l11.textContent = data["en"]["l11"];
    });

    var data = {
      sin: {
        l0: "පරිශීලක ක්‍රියා",
        l1: "නව සැපයුම්",
        l2: "ලිපින",
        l3: "බැංකු ගිණුම්",
        l4: "වාර්තා",
        l5: "කෙටි පණිවිඩ",
        l6: "ප්‍රධාන ක්‍ර්‍රියාවන්",
        l7: "ගිණුම බලන්න",
        l8: "ගිණුමෙන් ඉවත් වන්න",
        l11: "උපකරණ පුවරුව",
      },
      en: {
        l0: "USER ACTIONS",
        l1: "New Supplies",
        l2: "Addresses",
        l3: "Bank Accounts",
        l4: "Reports",
        l5: "Chat",
        l6: "MAIN ACTIONS",
        l7: "View Profile",
        l8: "Log Out",
        l11: "Dashboard",
      },
    };

    bars.addEventListener("click", () => {
      sidebar.classList.add("sidebar-active");
      sidebar.style.display = "block";
      bars.style.display = "none";
      if (window.innerWidth <= 718) {
        document.body.addEventListener("click", (e) => {
          if (!sidebar.contains(e.target) && !bars.contains(e.target)) {
            sidebar.classList.remove("sidebar-active");
            bars.style.display = "block";
          }
        });
      }
    });

    setGreeting();
    checkLng();
    checkMode();
  }, 10);
})();

window.addEventListener("load", (e) => {
  const interval = setInterval(() => {
    let loaded = false;
    var pathname = window.location.pathname;
    pathname = pathname.split("/")[2] || "";
    pathname = pathname.split(".")[0];

    if (!pathname) {
      document.querySelector(`#nav-item-index`).classList.add("active");
    }

    // pathname = pathname.replace(".html", "");
    const navItems = [
      "supply",
      "address",
      "payment",
      "reports",
      "chat",
      "index",
      "profile",
    ];
    if (!loaded && pathname) {
      loaded = true;
      clearInterval(interval);
    }

    for (const navItem of navItems) {
      const nav = document.querySelector(`#nav-item-${pathname}`);

      if (!nav) continue;

      if (navItem == pathname) {
        nav.classList.add("active");
        break;
      } else {
        nav.classList.remove("active");
      }
    }
    if (!pathname) clearInterval(interval);
  }, 10);
});
