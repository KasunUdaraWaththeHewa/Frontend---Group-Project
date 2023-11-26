(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText1 = body.querySelector(".stockmg-text1"),
    th1 = body.querySelector(".th1"),
    th2 = body.querySelector(".th2"),
    th3 = body.querySelector(".th3"),
    th4 = body.querySelector(".th4"),
    th5 = body.querySelector(".th5"),
    tbody = body.querySelector(".tbody");

  const rows = document.querySelectorAll("tr[data-href]");
  rows.forEach((r) => {
    r.addEventListener("click", () => {
      document.cookie = "id=" + r.id + "; path=/";
      window.location.href = r.dataset.href;
    });
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    sText1.innerHTML = data["sin"]["sText1"];
    th1.textContent = data["sin"]["th1"];
    th2.textContent = data["sin"]["th2"];
    th3.textContent = data["sin"]["th3"];
    th4.textContent = data["sin"]["th4"];
    th5.textContent = data["sin"]["th5"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    sTitle.textContent = data["en"]["sTitle"];
    sText1.innerHTML = data["en"]["sText1"];
    th1.textContent = data["en"]["th1"];
    th2.textContent = data["en"]["th2"];
    th3.textContent = data["en"]["th3"];
    th4.textContent = data["en"]["th4"];
    th5.textContent = data["en"]["th5"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සමාගමේ එකතුකරන්නන්",
      sText1: "සමාගම් එකතුකරන්නන්ගේ තොරතුරු සහ ඔවුන්ගේ එකතු කිරීම් බලන්න",
      th1: "එකතුකරන්නාගේ නම",
      th2: "ප්රදේශය",
      th3: "දුරකතන අංකය",
      th4: "එකතු කිරීම්",
      th5: "එකතු කළ ප්රමාණය",
    },
    en: {
      sTitle: "Collectors",
      sText1: "View information of company collectors and their collections",
      th1: "Collector's Name",
      th2: "Hometown",
      th3: "Phone No.",
      th4: "Collections",
      th5: "Current Amount",
    },
  };
})();
