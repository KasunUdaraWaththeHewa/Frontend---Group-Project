(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-text"),
    date = body.querySelector(".date"),
    searchBar = body.querySelector(".search"),
    addressTable = body.querySelector(".addresses-table"),
    tbody = body.querySelector(".tbody");

  date.textContent = getCookie("date");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), addressTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), addressTable);
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
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
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "එකතුකරන්නන්ට පවරන්න",
      sText:
        "අදාළ දිනය සඳහා එක් එක් එකතුකරන්නන්ගේ එකතු කිරීමේ තොරතුරු බලන්න සහ නව එකතුවක් පවරන්න",
    },
    en: {
      sTitle: "Assign Collectors",
      sText:
        "View collection information of each collector for the relevent day and assign a new one",
    },
  };

  let row = "";

  fetch(backProxy + "/assign-collector?date=" + getCookie("date"), {
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
              "<tr style='cursor: default;' id=" +
              item.employee_id +
              ">" +
              "<td>" +
              item.name +
              " " +
              item.last_name +
              "</td>" +
              "<td>" +
              item.row_count +
              "</td>" +
              "<td>" +
              "<button class='direction status' style='cursor: pointer;'>Assign</button>" +
              "</td>" +
              "</tr>";
          }

          tbody.innerHTML = row;

          const assigns = document.querySelectorAll(".direction");

          assigns.forEach((assign) => {
            assign.addEventListener("click", () => {
              var formData = {
                id: getCookie("id"),
                emp: assign.parentElement.parentElement.id,
              };
              fetch(backProxy + "/assign-collector", {
                method: "PUT",
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
                      if (lang == "sin") var title = "එකතුකරන්නාට පවරා ඇත";
                      else var title = "Collector assigned!";

                      // sweet alert
                      Swal.fire({
                        title: title,
                        icon: "success",
                        confirmButtonColor: confirmButtonColor,
                      }).then((response) => {
                        window.location.href = "./";
                      });
                    });
                  } else if (response.status === 202) {
                    response.json().then((data) => {
                      console.log(data.message);
                    });
                    if (lang == "sin") Command: toastr["error"]("");
                    else Command: toastr["error"]("No Collector assigned");
                  } else if (response.status === 401) {
                    response.json().then((data) => {
                      console.log(data.message);
                    });
                    if (lang == "sin")
                      Command: toastr["error"]("වලංගු නොවන පරිශීලක");
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
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
        });
        if (lang == "sin") Command: toastr["info"]("එකතුකරන්නන් නැත");
        else Command: toastr["info"]("No Collectors");
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
