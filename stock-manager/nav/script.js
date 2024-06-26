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
      l12 = body.querySelector(".l12"),
      l11 = body.querySelector(".l11"),
      dashboard = body.querySelector(".dashboard"),
      track = body.querySelector(".track"),
      supply = body.querySelector(".supply"),
      chat = body.querySelector(".chat"),
      stock = body.querySelector(".stock"),
      production = body.querySelector(".production"),
      all = body.querySelector(".all"),
      Uname = body.querySelector(".name"),
      logout = document.querySelector(".logout"),
      profile = body.querySelector(".profile"),
      bars = body.querySelector(".fa-bars"),
      navHide = body.querySelector(".nav-hide");

    logout.addEventListener("click", () => {
      signout();
    });

    dashboard.href = frontProxy + "/stock-manager/";
    track.href = frontProxy + "/stock-manager/collectors/view-all.html";
    supply.href = frontProxy + "/stock-manager/supply-requests/";
    chat.href = frontProxy + "/stock-manager/chat/chat.html";
    stock.href = frontProxy + "/stock-manager/stock/view-all.html";
    production.href = frontProxy + "/stock-manager/production-requests/view-all.html";
    profile.href = frontProxy + "/stock-manager/profile/view.html";
    all.href = frontProxy + "/stock-manager/all-collections/";

    if (getCookie("name") != null) Uname.textContent = getCookie("name");
    else {
      document.cookie =
        "name=" + getPayload(getCookie("jwt")).name + "; path=/";
      Uname.textContent = getCookie("name");
    }

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
      l12.textContent = data["sin"]["l12"];
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
      l12.textContent = data["en"]["l12"];
      l11.textContent = data["en"]["l11"];
    });

    var data = {
      sin: {
        l0: "පරිශීලක ක්‍රියා",
        l1: "එකතුකරන්නන්",
        l2: "සැපයුම් ඉල්ලීම්",
        l3: "කෙටි පණිවිඩ",
        l4: "සියලුම එකතු කිරීම්",
        l5: "ගබඩා සමාලෝචනය",
        l6: "ප්‍රධාන ක්‍ර්‍රියා",
        l7: "ගිණුම බලන්න",
        l8: "ගිණුමෙන් ඉවත් වන්න",
        l12: "නිෂ්පාදන ඉල්ලීම්",
        l11: "උපකරණ පුවරුව",
      },
      en: {
        l0: "USER ACTIONS",
        l1: "Collectors",
        l2: "Supply Requests",
        l3: "Chat",
        l4: "All Collections",
        l5: "Stock Overview",
        l6: "MAIN ACTIONS",
        l7: "View Profile",
        l8: "Log Out",
        l12: "Production Requests",
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
      "supply-requests",
      "collectors",
      "chat",
      "stock",
      "index",
      "production-requests",
      "profile",
      "all-collections",
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
