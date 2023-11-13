(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      sTitle = body.querySelector(".stockmg-title"),
      sText = body.querySelector(".stockmg-text"),
      tbody = body.querySelector(".tbody");
  
    var lang = getCookie("lang"); // current language
  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      // sessionStorage.setItem("lang", "sin");
      document.cookie = "lang=sin; path=/";
      lang = "sin";
  
      sTitle.textContent = data["sin"]["sTitle"];
      sText.textContent = data["sin"]["sText"];
      setGreeting();
    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
      // sessionStorage.setItem("lang", "en");
      document.cookie = "lang=en; path=/";
      lang = "en";
  
      sTitle.textContent = data["en"]["sTitle"];
      sText.textContent = data["en"]["sText"];
      setGreeting();
    });
  
    var data = {
      sin: {
        sTitle: "සැපයුම් ඉල්ලීම්",
        sText: "සැපයුම්කරුවන්ගේ ඉල්ලීම් බලන්න සහ අනුමත කරන්න",
      },
      en: {
        sTitle: "Supply Requests",
        sText: "View and approve supplier requests",
      },
    };
  
    let row = "";
  
    fetch(backProxy + "/supply-requests?sId=" + getCookie("sId"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            let arr = data.list;
            arr.forEach(data_to_table);
  
            function data_to_table(item) {
              row +=
                "<tr data-href='./supply-requests/view-request1.html' id=" +
                item.id +
                ">" +
                "<td>" +
                item.id +
                "</td>" +
                "<td>" +
                item.name +
                "</td>" +
                "<td>" +
                item.date +
                "</td>" +
                "<td>" +
                item.amount.toLocaleString("en-US") +
                "</td>" +
                "<td>" +
                item.method.charAt(0).toUpperCase() +
                item.method.slice(1) +
                "</td>" +
                "</tr>";
            }
  
            tbody.innerHTML = row;
  
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
            console.log(data.size);
          });
          if (lang == "sin") Command: toastr["info"]("සැපයුම් ඉල්ලීම් නොමැත");
          else Command: toastr["info"]("No Supply requests");
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
  