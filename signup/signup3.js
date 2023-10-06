(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh = body.querySelector(".form-heading"),
    fht = body.querySelector(".form-heading-text"),
    ename = body.querySelector(".estate-name"),
    location = body.querySelector(".location"),
    area = body.querySelector(".area"),
    next = body.querySelector(".next");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    fh.textContent = data["sin"]["fh"];
    fht.innerHTML = data["sin"]["fht"];
    ename.placeholder = data["sin"]["ename"];
    location.placeholder = data["sin"]["location"];
    area.placeholder = data["sin"]["area"];
    next.textContent = data["sin"]["next"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    fh.textContent = data["en"]["fh"];
    fht.innerHTML = data["en"]["fht"];
    ename.placeholder = data["en"]["ename"];
    location.placeholder = data["en"]["location"];
    area.placeholder = data["en"]["area"];
    next.textContent = data["en"]["next"];
  });

  var data = {
    sin: {
      fh: "වතු ස්ථාන",
      fht: "ඔබේ මූලික වතු තොරතුරු එක් කරන්න. <br /> ඔබට උපකරණ පුවරුව තුළ තවත් වතු ස්ථාන එක් කිරීමට හැකි වනු ඇත",
      ename: "වතු නම",
      location: "ස්ථානය",
      area: "ප්රදේශය/කලාපය",
      next: "ඊළඟ",
    },
    en: {
      fh: "Estate Locations",
      fht: "Add your primary estate information. <br /> You will be able to add more estate locations inside the dashboard",
      ename: "Estate Name",
      location: "Location",
      area: "Area/Region",
      next: "Next",
    },
  };

  checkLng();
  var enameStatus = false,
    locationstatus = false,
    areaStatus = false;

  next.addEventListener("click", () => {
    if (typeof area.value === "string" && area.value.trim().length === 0) {
      console.log("Area cannot be empty");
      area.focus();
    } else {
      areaStatus = true;
    }

    if (
      typeof location.value === "string" &&
      location.value.trim().length === 0
    ) {
      console.log("Location cannot be empty");
      location.focus();
    } else {
      locationstatus = true;
    }

    if (typeof ename.value === "string" && ename.value.trim().length === 0) {
      console.log("Estate name cannot be empty");
      ename.focus();
    } else {
      enameStatus = true;
    }

    if (enameStatus && locationstatus && enameStatus) {
      var formData = {
        supplier_id: sessionStorage.getItem("sId"),
        estate_name: ename.value,
        estate_location: location.value,
        area: area.value,
      };
      fetch(backProxy + "/estate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              console.log(data.message);
            });
            window.location.href = frontProxy + "/signup/signup4.html";
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
          } else {
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });
})();
