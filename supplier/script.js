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
    c3 = body.querySelector(".c3"),
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
    c3.innerHTML = data["sin"]["c3"];
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
    c3.innerHTML = data["en"]["c3"];
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
      w1: "දැනට පවතින සැපයුම්",
      w2: "මාසික ආදායම",
      c1: "දැනට පවතින සැපයුම්",
      c2: "ඔබේ වතුවල දැනට පවතින සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
      c3: "*සැපයුම් පොල් ප්‍රමාණය අවශ්‍ය අවම මට්ටමට නොපැමිණීම හේතුවෙන් සැපයුම් හැඳුනුම්පත S092 ප්‍රතික්ෂේප කර ඇත. <br/>මෙය දින 7කින් ස්වයංක්‍රීයව මැකෙනු ඇත",
      c4: "අතීත සැපයුම්",
      c5: "ඔබේ වතුවල අතීත සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
    },
    en: {
      l10: "Notifications",
      w1: "Ongoing Supplies",
      w2: "Monthly Income",
      c1: "Ongoing Supplies",
      c2: "Overview of ongoing supplies at your estates",
      c3: "*Supply ID S092 has been rejected due to the supply coconut amount not meeting the minimum required. <br/>This will be automatically deleted in 7 days",
      c4: "Past Supplies",
      c5: "Overview of past supplies at your estates",
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
