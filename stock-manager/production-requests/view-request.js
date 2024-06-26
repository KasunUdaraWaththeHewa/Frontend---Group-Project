(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-subtitle"),
    yardH = body.querySelector(".yard-h3"),
    tbody = body.querySelector(".tbody"),
    sYard = body.querySelector(".sYard"),
    yBlock = body.querySelector(".yBlock"),
    yAmount = body.querySelector(".yAmount"),
    yDays = body.querySelector(".yDays"),
    ystatus = body.querySelector(".ystatus"),
    date = body.querySelector(".date"),
    rId = body.querySelector(".rId"),
    accept = body.querySelector(".accept"),
    decline = body.querySelector(".decline"),
    closeBtn = body.querySelector(".close-btn"),
    overlay = body.querySelector(".overlay"),
    dropdown = body.querySelector(".dropdown"),
    dropdownError = body.querySelector(".dropdown-error"),
    submit = body.querySelector(".submit"),
    other = body.querySelector(".other"),
    otherError = body.querySelector(".other-error"),
    otherLabel = body.querySelector(".reason-label"),
    rtext = body.querySelector(".reason-text"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    rNote = body.querySelector(".reject-note");

  var lang = getCookie("lang"); // current language

  decline.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".decline-container").style.display = "block";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".decline-container").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".decline-container").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    accept.textContent = data["sin"]["accept"];
    decline.textContent = data["sin"]["decline"];
    rtext.textContent = data["sin"]["rtext"];
    submit.textContent = data["sin"]["submit"];
    otherLabel.textContent = data["sin"]["otherLabel"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];
    otherLabel.textContent = data["sin"]["otherLabel"];
    other.placeholder = data["sin"]["other"];
    submit.textContent = data["sin"]["submit"];
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
    accept.textContent = data["en"]["accept"];
    decline.textContent = data["en"]["decline"];
    rtext.textContent = data["en"]["rtext"];
    otherLabel.textContent = data["en"]["otherLabel"];
    submit.textContent = data["en"]["submit"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];
    otherLabel.textContent = data["en"]["otherLabel"];
    other.placeholder = data["en"]["other"];
    submit.textContent = data["en"]["submit"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඉල්ලීම බලන්න",
      sText: "නිෂ්පාදනය සඳහා අමුදව්ය ඉල්ලීම් වල විස්තර බලන්න",
      accept: "පිළිගන්න",
      decline: "ප්රතික්ෂේප කරන්න",
      rtext: "ඉල්ලීම ප්‍රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      otherLabel: "වෙනත්",
      other: "ඔබේ හේතුව මෙහි ඇතුල් කරන්න",
      submit: "ඉදිරිපත් කරන්න",
      op0: "ප්රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      op1: "පොල් ලබා ගත නොහැක",
      op2: "පොල් භාවිතයට සුදුසු තත්ත්වයේ නැත",
      op3: "වෙනත්",
    },
    en: {
      sTitle: "View Request",
      sText: "View stock request details for Production",
      accept: "Accept",
      decline: "Decline",
      rtext: "Select the reason for declining the request",
      otherLabel: "If other",
      submit: "Submit",
      op0: "Select reason for declining",
      op1: "Stock is not available",
      op2: "Coconuts are not in usable condition",
      op3: "Other",
    },
  };

  fetch(backProxy + "/production?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          getYard(data.request.block, data.request.yard);

          var stat = "";

          if (data.request.status == 1) 
            stat = "Pending Approval";
           else if (data.request.status == 2) {
            stat = "Accepted";
            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            tbody.parentElement.style.display = "none";
            yardH.parentElement.style.display = "none";
            yDays.textContent = data.request.days + " days";
          } else if (data.request.status == 3) {
            stat = "Rejected";
            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            rNote.textContent = data.request.reason;
            rNote.style.display = "";
            tbody.parentElement.style.display = "none";
            yardH.parentElement.style.display = "none";
            yDays.textContent = data.request.days + " days";
          } else {
            stat = "Accepted";
            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            rNote.textContent = data.request.reason;
            rNote.style.display = "";
            tbody.parentElement.style.display = "none";
            yardH.parentElement.style.display = "none";
            yDays.textContent = data.request.days + " days";
          }

          rId.textContent = "P/R/" + data.request.id;
          sYard.textContent = "Yard " + data.request.yard;
          yBlock.textContent = "B/" + data.request.block;
          yAmount.textContent = data.request.amount.toLocaleString("en-US");
          ystatus.textContent = stat;

          if (lang == "sin") yardH.textContent = "අංගනය " + data.request.yard;
          else yardH.textContent = "Yard " + data.request.yard;
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.message);
          Command: toastr["error"](data.message);
        });
      } else if (response.status === 401) {
        response.json().then((data) => {
          console.log(data.message);
          Command: toastr["error"](data.message);
        });
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });

  function getYard(id, yard) {
    let row = "";

    var formData = {
      id: id,
      yard: yard,
    };

    fetch(backProxy + "/yards", {
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
            data.yard.forEach((item) => {
              var status = "";
              if (item.days > 30) status = "stock-level4";
              else if (item.days > 25) status = "stock-level3";
              else if (item.days > 15) status = "stock-level2";
              else status = "stock-level1";

              row +=
                `<tr id=` +
                item.id +
                ` class="` +
                status +
                `">` +
                `<td> B/` +
                item.id +
                `</td>` +
                `<td>` +
                item.days +
                `</td>` +
                `<td>` +
                item.count +
                `</td>` +
                `</tr>`;
            });

            tbody.innerHTML = row;
            if (yDays.textContent == null || yDays.textContent.length == 0)
              yDays.textContent = data.block.days + " days";

            var req_date = new Date(data.block.date);
            date.textContent = req_date.toLocaleDateString();
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["info"]("යමක් වැරදී ඇත. නැවත උත්සාහ කරන්න");
          else Command: toastr["info"]("Something went wrong. Try again");
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
  }

  accept.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔබට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, පිළිගන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, accept it!",
        cancelButtonText = "Cancel";
    }
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(backProxy + "/accept-production?id=" + getCookie("id"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                console.log(data.message);
                if (lang == "sin") {
                  var title = "පිළිගත්තා!",
                    text = "නිෂ්පාදන ඉල්ලීම පිළිගනු ලැබේ.";
                } else {
                  var title = "Accepted!",
                    text = "Production request accepted.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  window.location.href = "./view-all.html";
                });
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
      }
    });
  });

  var dropdownStatus = false,
    otherStatus = false;

  dropdown.addEventListener("input", () => {
    dropdown_status_func();
  });

  other.addEventListener("input", () => {
    other_status_func();
  });

  decline.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".decline-container").style.display = "block";

    overlay.addEventListener("click", (e) => {
      if (e.target.id === "overlay") {
        overlay.style.display = "none";
        document.querySelector(".decline-container").style.display = "none";
      }
    });

    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      document.querySelector(".decline-container").style.display = "none";
    });

    submit.addEventListener("click", () => {
      if (!dropdown_status_func()) dropdown.focus();

      if (dropdown.value == "Other") {
        if (!other_status_func()) other.focus();

        if (dropdown && otherStatus) submit_decline();
      } else if (dropdownStatus) submit_decline();

      function submit_decline() {
        if (lang == "sin") {
          var title = "ඔබට විශ්වාස ද?",
            text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
            confirmButtonText = "ඔව්, එය ප්රතික්ෂේප කරන්න!",
            cancelButtonText = "අවලංගු කරන්න";
        } else {
          var title = "Are you sure?",
            text = "You won't be able to revert this!",
            confirmButtonText = "Yes, decline it!",
            cancelButtonText = "Cancel";
        }
        Swal.fire({
          title: title,
          text: text,
          confirmButtonText: confirmButtonText,
          cancelButtonText: cancelButtonText,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: confirmButtonColor,
          cancelButtonColor: cancelButtonColor,
        }).then((result) => {
          var reason = "";

          if (dropdown.value == "Other") reason = other.value;
          else reason = dropdown.value;

          if (result.isConfirmed) {
            var formData = {
              id: getCookie("id"),
              reason: reason,
            };

            fetch(backProxy + "/accept-production", {
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
                    if (lang == "sin") {
                      var title = "ප්‍රතික්ෂේප කළා!",
                        text = "නිෂ්පාදන ඉල්ලීම ප්‍රතික්ෂේප විය.";
                    } else {
                      var title = "Declined!",
                        text = "Production request declined.";
                    }
                    // sweet alert
                    Swal.fire({
                      title: title,
                      text: text,
                      icon: "success",
                      confirmButtonColor: confirmButtonColor,
                    }).then((response) => {
                      window.location.href = "./view-all.html";
                    });
                  });
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
          }
        });
      }
    });
  });

  function dropdown_status_func() {
    if (
      typeof dropdown.value === "string" &&
      dropdown.value.trim().length === 0
    ) {
      if (lang == "sin") {
        dropdownError.textContent = "හේතුව හිස් විය නොහැක";
        Command: toastr["warning"]("හේතුව හිස් විය නොහැක");
      } else {
        dropdownError.textContent = "Reason cannot be empty";
        Command: toastr["warning"]("Reason cannot be empty");
      }
      dropdownStatus = false;
      return false;
    } else {
      if (dropdown.value == "Other") {
        other.style.display = "";
        otherLabel.style.display = "";
      }

      dropdownError.textContent = "";
      dropdownStatus = true;
      return true;
    }
  }

  function other_status_func() {
    if (typeof other.value === "string" && other.value.trim().length === 0) {
      if (lang == "sin") {
        otherError.textContent = "හේතුව හිස් විය නොහැක";
        Command: toastr["warning"]("හේතුව හිස් විය නොහැක");
      } else {
        otherError.textContent = "Reason cannot be empty";
        Command: toastr["warning"]("Reason cannot be empty");
      }
      otherStatus = false;
      return false;
    } else {
      otherError.textContent = "";
      otherStatus = true;
      return true;
    }
  }
})();
