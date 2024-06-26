document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "area=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "amount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "final=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    text = body.querySelector(".text"),
    fire = body.querySelector(".fire"),
    w1 = body.querySelector(".w1"),
    w1Value = body.querySelector(".w1-value"),
    w2 = body.querySelector(".w2"),
    w2Value = body.querySelector(".w2-value"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    c6 = body.querySelector(".c6"),
    c7 = body.querySelector(".c7"),
    tbody1 = body.querySelector(".tbody1"),
    todayTable = body.querySelector(".today-table"),
    greet = body.querySelector(".greet-text"),
    greet1 = body.querySelector(".greet-line1"),
    greet2 = body.querySelector(".greet-line2"),
    tbody2 = body.querySelector(".tbody2"),
    tbody3 = body.querySelector(".tbody3"),
    missed = body.querySelector(".missed"),
    closeBtn1 = body.querySelector(".close-btn1"),
    overlay1 = body.querySelector(".overlay1"),
    viewAll = body.querySelector(".view-all");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    c6.textContent = data["sin"]["c6"];
    c7.textContent = data["sin"]["c7"];
    greet1.textContent = data["sin"]["greet1"];
    greet2.textContent = data["sin"]["greet2"];
    text.textContent = data["sin"]["text"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    c6.textContent = data["en"]["c6"];
    c7.textContent = data["en"]["c7"];
    greet1.textContent = data["en"]["greet1"];
    greet2.textContent = data["en"]["greet2"];
    text.textContent = data["en"]["text"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "පොල් මිල",
      w2: "අද ඉතිරිය",
      c1: "අද එකතු කිරීම්",
      c2: "සවිස්තරාත්මකව තොරතුරු බැලීමට එම සැපයුම තෝරන්න",
      c4: "ඉදිරියට එන එකතු කිරීම්",
      c5: "ඉදිරි දින 2 සඳහා ඉදිරි එකතු කිරීම් බලන්න",
      c6: "මඟ හැරුණු එකතු කිරීම්",
      c7: "ඔබගේ මග හැරුණු පොල් එකතු කිරීම් බලන්න",
      greet1: "සුභ පැතුම්!",
      greet2: "ඔබ අද දින එකතු කිරීම් සියල්ල සම්පූර්ණ කර ඇත",
      text: "උපකරණ පුවරුව",
    },
    en: {
      w1: "Coconut Rate",
      w2: "Today's Remaining",
      c1: "Today's Collections",
      c2: "select a collection for a detailed view",
      c4: "Upcoming Collections",
      c5: "View upcoming collections for next 2 days",
      c6: "Missed Collections",
      c7: "View your missed coconut collections",
      greet1: "Good Job!",
      greet2: "You completed all of today's collections",
      text: "Dashboard",
    },
  };

  closeBtn1.addEventListener("click", () => {
    document.querySelector(".get-direction").style.display = "none";
    document.querySelector(".overlay1").style.display = "none";
  });

  overlay1.addEventListener("click", (e) => {
    if (e.target.id === "overlay1") {
      overlay1.style.display = "none";
      document.querySelector(".get-direction").style.display = "none";
    }
  });

  w1Value.textContent = 0 + " LKR";
  w2Value.innerHTML = `0<span>/0</span>`;

  fetch(backProxy + "/collector", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        let row1 = "",
          row2 = "",
          row3 = "";

        response.json().then((data) => {
          let arr1 = data.today,
            arr2 = data.upcoming,
            arr3 = data.missed;

          arr1.forEach((item) => {
            row1 +=
              `<tr id=${item.id}>` +
              `<td data-href="./collection/view.html">${item.area}</td>` +
              `<td data-href="./collection/view.html">${timeString(
                item.time
              )}</td>` +
              `<td data-href="./collection/view.html">${item.amount.toLocaleString(
                "en-US"
              )}</td>` +
              `<td class='hide'><button class="direction status" location="${item.location}">Get Directions</button></td>` +
              `</tr>`;
          });

          arr2.forEach((item) => {
            row2 +=
              `<tr id=${item.id}>` +
              `<td data-href="./collection/view.html">${item.date}</td>` +
              `<td data-href="./collection/view.html">${timeString(
                item.time
              )}</td>` +
              `<td data-href="./collection/view.html">${item.area}</td>` +
              `<td data-href="./collection/view.html">${item.amount.toLocaleString(
                "en-US"
              )}</td>` +
              `<td class='hide'><button class="direction status" location="${item.location}">Get Directions</button></td>` +
              `</tr>`;
          });

          arr3.forEach((item) => {
            row3 +=
              `<tr id=${item.id}>` +
              `<td data-href="./collection/view.html">${item.area}</td>` +
              `<td data-href="./collection/view.html">${item.date}</td>` +
              `<td data-href="./collection/view.html">${timeString(
                item.time
              )}</td>` +
              `<td data-href="./collection/view.html">${item.amount.toLocaleString(
                "en-US"
              )}</td>` +
              `<td class='hide'><button class="direction status" location="${item.location}">Get Directions</button></td>` +
              `</tr>`;
          });

          tbody1.innerHTML = row1;
          tbody2.innerHTML = row2;
          tbody3.innerHTML = row3;

          w1Value.textContent = data.rate.price + " LKR";
          w2Value.innerHTML = data.size + `<span>/` + data.count + `</span>`;

          if ((data.size = 0 && data.count > 0)) {
            fire.style.display = "block";
            greet.style.display = "flex";
            todayTable.style.display = "none";
            viewAll.style.display = "none";
            c1.style.display = "none";
            c2.style.display = "none";
          }

          const cols = document.querySelectorAll("td[data-href]");
          cols.forEach((c) => {
            c.addEventListener("click", () => {
              document.cookie = "id=" + c.parentElement.id + "; path=/";
              window.location.href = c.dataset.href;
            });
          });

          const directions = document.querySelectorAll(".direction");
          directions.forEach((d) => {
            d.addEventListener("click", () => {
              document.querySelector(".get-direction").style.display = "block";
              document.querySelector(".overlay1").style.display = "block";
              getDirection(d.getAttribute("location"));
            });
          });

          viewAll.addEventListener("click", () => {
            if (arr1.length > 0) {
              overlay1.style.display = "flex";
              document.querySelector(".get-direction").style.display = "block";

              let locations = [];
              let end;

              arr1.forEach((item, index) => {
                if (index == arr1.length - 1) {
                  end = `${item.location.split(" ")[0]},${
                    item.location.split(" ")[1]
                  }`;
                } else {
                  locations.push(
                    `${item.location.split(" ")[0]},${
                      item.location.split(" ")[1]
                    }`
                  );
                }
              });

              getDirectionWithWayPoints(locations, end);
            } else {
              if (lang == "sin")
                Command: toastr["warning"]("අද එකතු කිරීම් නැත");
              else Command: toastr["warning"]("No collections today");
            }
          });

          if (arr3.length == 0) missed.style.display = "none";
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          let arr3 = data.missed;
          let row3 = "";

          arr3.forEach((item) => {
            row3 +=
              `<tr id=${item.id}>` +
              `<td data-href="./collection/view.html">${item.area}</td>` +
              `<td data-href="./collection/view.html">${item.date}</td>` +
              `<td data-href="./collection/view.html">${timeString(
                item.time
              )}</td>` +
              `<td data-href="./collection/view.html">${item.amount.toLocaleString(
                "en-US"
              )}</td>` +
              `<td class='hide'><button class="direction status" location="${item.location}">Get Directions</button></td>` +
              `</tr>`;
          });

          tbody3.innerHTML = row3;

          if (arr3.length == 0) missed.style.display = "none";

          const cols = document.querySelectorAll("td[data-href]");
          cols.forEach((c) => {
            c.addEventListener("click", () => {
              document.cookie = "id=" + c.parentElement.id + "; path=/";
              window.location.href = c.dataset.href;
            });
          });

          const directions = document.querySelectorAll(".direction");
          directions.forEach((d) => {
            d.addEventListener("click", () => {
              document.querySelector(".get-direction").style.display = "block";
              document.querySelector(".overlay1").style.display = "block";
              getDirection(d.getAttribute("location"));
            });
          });

          if (data.size == -2) {
            if (lang == "sin") Command: toastr["info"]("එකතු කිරීම් නැත");
            else Command: toastr["info"]("No collections");

            if (data.count > 0) {
              fire.style.display = "block";
              greet.style.display = "flex";
              todayTable.style.display = "none";
              viewAll.style.display = "none";
              c1.style.display = "none";
              c2.style.display = "none";
            }

            w1Value.textContent = data.rate.price + " LKR";
            w2Value.innerHTML = `0<span>/` + data.count + `</span>`;

            viewAll.addEventListener("click", () => {
              if (lang == "sin")
                Command: toastr["warning"]("අද එකතු කිරීම් නැත");
              else Command: toastr["warning"]("No collections today");
            });
          } else if (data.size == -1) {
            let arr2 = data.upcoming;
            let row2 = "";

            arr2.forEach((item) => {
              row2 +=
                `<tr id=${item.id}>` +
                `<td data-href="./collection/view.html">${item.date}</td>` +
                `<td data-href="./collection/view.html">${timeString(
                  item.time
                )}</td>` +
                `<td data-href="./collection/view.html">${item.area}</td>` +
                `<td data-href="./collection/view.html">${item.amount.toLocaleString(
                  "en-US"
                )}</td>` +
                `<td class='hide'><button class="direction status" location="${item.location}">Get Directions</button></td>` +
                `</tr>`;
            });

            tbody2.innerHTML = row2;

            const cols = document.querySelectorAll("td[data-href]");
            cols.forEach((c) => {
              c.addEventListener("click", () => {
                document.cookie = "id=" + c.parentElement.id + "; path=/";
                window.location.href = c.dataset.href;
              });
            });

            const directions = document.querySelectorAll(".direction");
            directions.forEach((d) => {
              d.addEventListener("click", () => {
                document.querySelector(".get-direction").style.display =
                  "block";
                document.querySelector(".overlay1").style.display = "block";
                getDirection(d.getAttribute("location"));
              });
            });

            if (lang == "sin") Command: toastr["info"]("අද එකතු කිරීම් නැත");
            else Command: toastr["info"]("No collections today");

            if (data.count > 0) {
              fire.style.display = "block";
              greet.style.display = "flex";
              todayTable.style.display = "none";
              viewAll.style.display = "none";
              c1.style.display = "none";
              c2.style.display = "none";
            }

            w1Value.textContent = data.rate.price + " LKR";
            w2Value.innerHTML = `0<span>/` + data.count + `</span>`;

            viewAll.addEventListener("click", () => {
              if (lang == "sin")
                Command: toastr["warning"]("අද එකතු කිරීම් නැත");
              else Command: toastr["warning"]("No collections today");
            });
          } else {
            let arr1 = data.today;
            let row1 = "";

            arr1.forEach((item) => {
              row1 +=
                `<tr id=${item.id}>` +
                `<td data-href="./collection/view.html">${item.area}</td>` +
                `<td data-href="./collection/view.html">${timeString(
                  item.time
                )}</td>` +
                `<td data-href="./collection/view.html">${item.amount.toLocaleString(
                  "en-US"
                )}</td>` +
                `<td class='hide'><button class="direction status" location="${item.location}">Get Directions</button></td>` +
                `</tr>`;
            });

            tbody1.innerHTML = row1;

            const cols = document.querySelectorAll("td[data-href]");
            cols.forEach((c) => {
              c.addEventListener("click", () => {
                document.cookie = "id=" + c.parentElement.id + "; path=/";
                window.location.href = c.dataset.href;
              });
            });

            const directions = document.querySelectorAll(".direction");
            directions.forEach((d) => {
              d.addEventListener("click", () => {
                document.querySelector(".get-direction").style.display =
                  "block";
                document.querySelector(".overlay1").style.display = "block";
                getDirection(d.getAttribute("location"));
              });
            });

            w1Value.textContent = data.rate.price + " LKR";
            w2Value.innerHTML = data.size + `<span>/` + data.count + `</span>`;

            if (lang == "sin") Command: toastr["info"]("ඉදිරි එකතු කිරීම් නැත");
            else Command: toastr["info"]("No upcoming collections");

            if ((data.size = 0 && data.count > 0)) {
              fire.style.display = "block";
              greet.style.display = "flex";
              todayTable.style.display = "none";
              viewAll.style.display = "none";
              c1.style.display = "none";
              c2.style.display = "none";
            }

            viewAll.addEventListener("click", () => {
              if (arr1.length > 0) {
                overlay1.style.display = "flex";
                document.querySelector(".get-direction").style.display =
                  "block";

                let locations = [];
                let end;

                arr1.forEach((item, index) => {
                  if (index == arr1.length - 1) {
                    end = `${item.location.split(" ")[0]},${
                      item.location.split(" ")[1]
                    }`;
                  } else {
                    locations.push(
                      `${item.location.split(" ")[0]},${
                        item.location.split(" ")[1]
                      }`
                    );
                  }
                });

                getDirectionWithWayPoints(locations, end);
              } else {
                if (lang == "sin")
                  Command: toastr["warning"]("අද එකතු කිරීම් නැත");
                else Command: toastr["warning"]("No collections today");
              }
            });
          }
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
})();

let directionsService, directionsRenderer, start;
let startMarker = null,
  endMarker = null;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
  });

  directionsRenderer.setMap(map);

  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);

        const marker = new google.maps.Marker({
          position: pos,
          map,
        });

        // Set start position to user's current location
        start = pos.lat + "," + pos.lng;
      },
      () => {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

function getDirection(end) {
  calculateAndDisplayRoute(directionsService, directionsRenderer, start, end);
}

function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  start,
  end
) {
  // Retrieve the start and end locations and create a DirectionsRequest using
  // DRIVING directions.
  directionsService
    .route({
      origin: {
        lat: +start.split(",")[0],
        lng: +start.split(",")[1],
      },
      destination: {
        lat: +end.split(" ")[0],
        lng: +end.split(" ")[1],
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((result) => {
      // Route the directions and display on the map.
      directionsRenderer.setDirections(result);

      // Clear existing markers
      // directionsRenderer.setOptions({ suppressMarkers: true });
      // log(directionsRenderer);

      // Clear existing markers if they exist
      // if (startMarker) {
      //   startMarker.setMap(null);
      // }
      // if (endMarker) {
      //   endMarker.setMap(null);
      // }

      // Add markers for start and end locations
      // startMarker = new google.maps.Marker({
      //   map: directionsRenderer.getMap(),
      //   position: result.routes[0].legs[0].start_location,
      //   label: "S", // Marker label for start
      // });
      // endMarker = new google.maps.Marker({
      //   map: directionsRenderer.getMap(),
      //   position: result.routes[0].legs[0].end_location,
      //   label: "E", // Marker label for end
      // });

      // directionsRenderer.setPanel(document.querySelector(".pick-address"));

      const summaryPanel = document.querySelector(".pick-address");

      summaryPanel.innerHTML = "";

      const route = result.routes[0];

      // For each route, display summary information.

      summaryPanel.innerHTML += "<b>Directions:</b><br>";
      summaryPanel.innerHTML +=
        "<p class='start-address'>" +
        route.legs[0].start_address +
        "</p> <b>to</b> ";
      summaryPanel.innerHTML +=
        "<p class='end-address'>" + route.legs[0].end_address + "</p> <br>";
      summaryPanel.innerHTML +=
        "<p class='distance'><b>Distance: </b>" +
        route.legs[0].distance.text +
        "</p>";
      summaryPanel.innerHTML +=
        "<p class='duration'><b>Duration: </b>" +
        route.legs[0].duration.text +
        "</p> <br><br>";
      summaryPanel.innerHTML +=
        "<p class='view-text'>View More <i class='fas fa-chevron-down'></i> </p>";

      const viewMoreSection = document.createElement("div");
      viewMoreSection.setAttribute("class", "view-more-section");
      viewMoreSection.setAttribute("style", "display:none;");

      // console.log(route.legs[i].steps)

      for (let j = 0; j < route.legs[0].steps.length; j++) {
        viewMoreSection.innerHTML +=
          route.legs[0].steps[j].duration.text + "<br>";
        viewMoreSection.innerHTML +=
          route.legs[0].steps[j].distance.text + "<br>";
        viewMoreSection.innerHTML +=
          route.legs[0].steps[j].instructions + "<br><br>";
      }

      summaryPanel.appendChild(viewMoreSection);

      document.querySelector(".view-text").addEventListener("click", () => {
        $(".view-more-section").toggle();
        if (
          summaryPanel.querySelector(".view-more-section").style.display ==
          "none"
        ) {
          document.querySelector(".view-text").innerHTML =
            "View More <i class='fas fa-chevron-down'></i>";
        } else {
          document.querySelector(".view-text").innerHTML =
            "View Less <i class='fas fa-chevron-up'></i>";
        }
      });
    })
    .catch((e) => {
      window.alert("Directions request failed due to " + e);
    });
}

function getDirectionWithWayPoints(locations, end) {
  calculateAndDisplayRouteWithWayPoints(
    directionsService,
    directionsRenderer,
    start,
    end,
    locations
  );
}

function calculateAndDisplayRouteWithWayPoints(
  directionsService,
  directionsRenderer,
  start,
  end,
  locations
) {
  const waypts = [];

  for (let i = 0; i < locations.length; i++) {
    waypts.push({
      location: locations[i],
      stopover: true,
    });
  }
  // Retrieve the start and end locations and create a DirectionsRequest using
  // DRIVING directions.
  directionsService
    .route({
      origin: {
        lat: +start.split(",")[0],
        lng: +start.split(",")[1],
      },
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      // Route the directions and display on the map.
      directionsRenderer.setDirections(response);

      const route = response.routes[0];
      const summaryPanel = document.querySelector(".pick-address");

      summaryPanel.innerHTML = "";

      // For each route, display summary information.
      for (let i = 0; i < route.legs.length; i++) {
        const routeSegment = i + 1;

        summaryPanel.innerHTML +=
          "<b class='title'>Route: " + routeSegment + "</b><br>";
        summaryPanel.innerHTML +=
          "<p class='start-address'>" +
          route.legs[i].start_address +
          "</p> <b>to</b> ";
        summaryPanel.innerHTML +=
          "<p class='end-address'>" + route.legs[i].end_address + "</p> <br>";
        summaryPanel.innerHTML +=
          "<p class='distance'><b>Distance: </b>" +
          route.legs[i].distance.text +
          "</p>";
        summaryPanel.innerHTML +=
          "<p class='duration'><b>Duration: </b>" +
          route.legs[i].duration.text +
          "</p> <br><br>";

        // console.log(route.legs[i].steps)

        // for (let j = 0; j < route.legs[i].steps.length; j++) {
        //   summaryPanel.innerHTML += route.legs[i].steps[j].duration.text + "<br>";
        //   summaryPanel.innerHTML += route.legs[i].steps[j].distance.text + "<br>";
        //   summaryPanel.innerHTML +=
        //     route.legs[i].steps[j].instructions + "<br><br>";
        // }
      }
    })
    .catch((e) => {
      window.alert("Directions request failed due to " + e);
    });
}

function handleLocationError(browserHasGeolocation, pos) {
  console.log(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
}

window.initMap = initMap;
