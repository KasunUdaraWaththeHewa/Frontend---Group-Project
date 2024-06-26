document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    text = body.querySelector(".text"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    w2Value = body.querySelector(".w2-value"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c3 = body.querySelector(".c3"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    productionTable = body.querySelector(".production-table"),
    requestTable = body.querySelector(".request-table"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    searchBar1 = body.querySelector(".search1"),
    searchBar2 = body.querySelector(".search2"),
    filter1 = body.querySelector(".filter-1"),
    filter2 = body.querySelector(".filter-2");

  var lang = getCookie("lang"); // current language

  var searchBox1 = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );
  var searchBox2 = document.querySelectorAll(
    '.search-box2 input[type="text"] + span'
  );

  searchBox1.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar1.value.toUpperCase(), productionTable);
    });
  });

  searchBox2.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar2.value.toUpperCase(), requestTable);
    });
  });

  searchBar1.addEventListener("keyup", () => {
    search(searchBar1.value.toUpperCase(), productionTable);
  });

  searchBar2.addEventListener("keyup", () => {
    search(searchBar2.value.toUpperCase(), requestTable);
  });

  filter1.addEventListener("input", () => {
    search(filter1.value.toUpperCase(), productionTable);
  });

  filter2.addEventListener("input", () => {
    search(filter2.value.toUpperCase(), requestTable);
  });

  const googleIcon = document.querySelectorAll("#filter-icon");

  googleIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.parentElement.classList.toggle("active");
    });
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    c3.innerHTML = data["sin"]["c3"];
    text.textContent = data["sin"]["text"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    c3.innerHTML = data["en"]["c3"];
    text.textContent = data["en"]["text"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "සමාගම් නිෂ්පාදන",
      w2: "දැනට පවතින නිෂ්පාදන",
      c1: "දැනට පවතින නිෂ්පාදන",
      c2: "දැනට පවතින නිෂ්පාදන වල තත්ත්වය බලන්න",
      c4: "නිෂ්පාදන වල තත්ත්වය",
      c5: "ඔබගේ ඉල්ලීම් වල තත්ත්වය බලන්න",
      c3: "*සැපයුම් පොල් ප්‍රමාණය අවශ්‍ය අවම මට්ටමට නොපැමිණීම හේතුවෙන් සැපයුම් හැඳුනුම්පත P092 ප්‍රතික්ෂේප කර ඇත. <br/>මෙය දින 7කින් ස්වයංක්‍රීයව මැකෙනු ඇත",
      text: "උපකරණ පුවරුව",
    },
    en: {
      w1: "Company Products",
      w2: "Ongoing Production",
      c1: "Ongoing Productions",
      c2: "View ongoing production status",
      c4: "Production Requests",
      c5: "View your Request status",
      c3: "*Production ID P094 has been rejected due to the supply amount not meeting the minimum required. <br />This will be automatically deleted in 7 days",
      text: "Dashboard",
    },
  };

  let row1 = "",
    row2 = "";

  fetch(backProxy + "/production-manager", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.productions.forEach((item) => {
            var stat = "",
              st = "";

            if (item.status == 1) {
              stat = "pending";
              st = "Pending Approval";
              if (window.innerWidth <= 718) st = "Pending";
            } else if (item.status == 2) {
              stat = "accept";
              st = "Accepted";
            } else if (item.status == 3) {
              stat = "rejected";
              st = "Rejected";
            } else if (item.status == 4) {
              stat = "completed";
              st = "Completed";
            } else {
              return;
            }

            var date_string = new Date(item.date);

            row2 +=
              "<tr data-href='./production-requests/view.html' id=" +
              item.id +
              ">" +
              "<td> P/R/" +
              item.id +
              "</td>" +
              "<td>" +
              date_string.toLocaleDateString() +
              "</td>" +
              "<td>" +
              item.amount.toLocaleString("en-US") +
              "</td>" +
              "<td>Yard " +
              item.yard +
              "</td>" +
              "<td>B/" +
              item.block +
              "</td>" +
              "<td>" +
              "<button class='" +
              stat +
              " status'>" +
              st +
              "</button>" +
              "</td>" +
              "</tr>";
          });

          tbody2.innerHTML = row2;

          const rows = document.querySelectorAll("tr[data-href]");
          rows.forEach((r) => {
            r.addEventListener("click", () => {
              document.cookie = "id=" + r.id + "; path=/";
              window.location.href = r.dataset.href;
            });
          });
          pagination("table2", 15);
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
        });
      } else if (response.status === 401) {
        response.json().then((data) => {
          console.log(data.message);
        });
        if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
        else Command: toastr["error"]("Invalid User");
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });

  w2Value.textContent = 0;

  //get ongoing batch data
  fetch(backProxy + "/batches", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          w2Value.textContent = data.ongoing.length;
          data.ongoing.forEach((item) => {
            var date_string = new Date(item.create_date);
            var arr = item.products.split(",");

            row1 +=
              "<tr data-href='./production/view.html' id=" +
              item.id +
              ">" +
              "<td> P/B/" +
              item.id +
              "</td>" +
              "<td>" +
              date_string.toLocaleDateString() +
              "</td>" +
              "<td>" +
              item.amount.toLocaleString("en-US") +
              "</td>" +
              "<td>" +
              arr.length +
              "</td>" +
              "<td>" +
              "<button class='pending status'>Processing</button>" +
              "</td>" +
              "</tr>";
          });

          tbody1.innerHTML = row1;

          const rows = document.querySelectorAll("tr[data-href]");
          rows.forEach((r) => {
            r.addEventListener("click", () => {
              document.cookie = "id=" + r.id + "; path=/";
              window.location.href = r.dataset.href;
            });
          });


        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.message);
        });
        if (lang == "sin") Command: toastr["info"]("නිෂ්පාදන කණ්ඩායම් නොමැත");
        else Command: toastr["info"]("No production batches");
      } else if (response.status === 401) {
        response.json().then((data) => {
          console.log(data.message);
        });
        if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
        else Command: toastr["error"]("Invalid User");
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });
})();
