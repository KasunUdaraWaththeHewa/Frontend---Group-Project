(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".salesmg-title"),
    pText = body.querySelector(".salesmg-text"),
    productsTable = body.querySelector(".products-table"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    searchBar = body.querySelector(".search"),
    closeBtn1 = body.querySelector(".close-btn1"),
    closeBtn2 = body.querySelector(".close-btn2"),
    closeBtn3 = body.querySelector(".close-btn3"),
    overlay1 = body.querySelector(".overlay1"),
    overlay2 = body.querySelector(".overlay2"),
    overlay3 = body.querySelector(".overlay3"),
    submit = body.querySelector(".submit"),
    editSubmit = body.querySelector(".edit-submit"),
    pCategory = body.querySelector(".product-category"),
    pType = body.querySelector(".product-type"),
    pPrice = body.querySelector(".product-price"),
    pCategoryError = body.querySelector(".category-error"),
    pTypeError = body.querySelector(".type-error"),
    pPriceError = body.querySelector(".price-error"),
    editCategory = body.querySelector(".edit-product-category"),
    editType = body.querySelector(".edit-product-type"),
    editPrice = body.querySelector(".edit-product-price"),
    editCategoryError = body.querySelector(".edit-category-error"),
    editTypeError = body.querySelector(".edit-type-error"),
    editPriceError = body.querySelector(".edit-price-error"),
    type = body.querySelector(".type"),
    category = body.querySelector(".category"),
    price = body.querySelector(".price"),
    deleteBtn = body.querySelector(".delete-btn"),
    editBtn = body.querySelector(".edit-btn"),
    addBtn = body.querySelector(".add");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), productsTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), productsTable);
  });

  overlay1.addEventListener("click", (e) => {
    if (e.target.id === "overlay1") {
      overlay1.style.display = "none";
      document.querySelector(".view-product-container").style.display = "none";
    }
  });

  closeBtn1.addEventListener("click", () => {
    overlay1.style.display = "none";
    document.querySelector(".view-product-container").style.display = "none";
  });

  overlay2.addEventListener("click", (e) => {
    if (e.target.id === "overlay2") {
      overlay2.style.display = "none";
      document.querySelector(".add-product-container").style.display = "none";
    }
  });

  closeBtn2.addEventListener("click", () => {
    overlay2.style.display = "none";
    document.querySelector(".add-product-container").style.display = "none";
  });

  overlay3.addEventListener("click", (e) => {
    if (e.target.id === "overlay3") {
      overlay3.style.display = "none";
      document.querySelector(".edit-product-container").style.display = "none";
    }
  });

  closeBtn3.addEventListener("click", () => {
    overlay3.style.display = "none";
    document.querySelector(".edit-product-container").style.display = "none";
  });

  addBtn.addEventListener("click", () => {
    overlay2.style.display = "block";
    document.querySelector(".add-product-container").style.display = "block";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.innerHTML = data["sin"]["pText"];

    addBtn.textContent = data["sin"]["addBtn"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    pTitle.textContent = data["en"]["pTitle"];
    pText.innerHTML = data["en"]["pText"];
    addBtn.textContent = data["en"]["addBtn"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "නිෂ්පාදන",
      pText: "සමාගමේ නිෂ්පාදන විස්තර බලන්න සහ සංස්කරණය කරන්න",
      addBtn: "අලුතින් එකතු කරන්න",
    },
    en: {
      pTitle: "Products",
      pText: "View and edit company product details",
      addBtn: "Add New",
    },
  };

  getAllData();

  function getAllData() {
    var row1 = "",
      row2 = "";
    fetch(backProxy + "/products", {
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
              var price = "0.0 LKR";
              if (item.price != null) {
                price = item.price + " LKR";
              }

              if (item.status == 0) {
                row1 +=
                  `<tr id=` +
                  item.id +
                  `>` +
                  `<td class="col1"> P/I/` +
                  item.id +
                  `</td>` +
                  `<td class="col1">` +
                  item.type +
                  `</td>` +
                  `<td class="col1">` +
                  item.category +
                  `</td>` +
                  `<td class="col"><button class="status pending">Pending</button></td>` +
                  `<td><i class="fa-solid fa-pen-to-square icon"></i></td>` +
                  `<td><i class="fa-solid fa-trash-can icon"></i></td>` +
                  `</tr>`;
              } else {
                row2 +=
                  `<tr id=` +
                  item.id +
                  `>` +
                  `<td class="col"> P/I/` +
                  item.id +
                  `</td>` +
                  `<td class="col">` +
                  item.type +
                  `</td>` +
                  `<td class="col">` +
                  item.category +
                  `</td>` +
                  `<td class="col">` +
                  price +
                  `</td>` +
                  `<td><i class="fa-solid fa-pen-to-square icon"></i></td>` +
                  `<td><i class="fa-solid fa-trash-can icon"></i></td>` +
                  `</tr>`;
              }
            }
            tbody1.innerHTML = row1;
            tbody2.innerHTML = row2;

            const cols = document.querySelectorAll(".col"),
             col1s = document.querySelectorAll(".col1"),
              edits = document.querySelectorAll(".fa-pen-to-square"),
              deletes = document.querySelectorAll(".fa-trash-can");

            edits.forEach((edit) => {
              edit.addEventListener("click", () => {
                overlay3.style.display = "block";
                document.querySelector(
                  ".edit-product-container"
                ).style.display = "block";
                editType.value =
                  edit.parentNode.parentNode.children[1].textContent;
                editCategory.value =
                  edit.parentNode.parentNode.children[2].textContent;

                if (
                  edit.parentNode.parentNode.children[3].textContent ==
                  "0.0 LKR"
                )
                  editPrice.value = null;
                else
                  editPrice.value =
                    edit.parentNode.parentNode.children[3].textContent.slice(
                      0,
                      -4
                    );

                document.cookie =
                  "id=" + edit.parentElement.parentNode.id + "; path=/";
              });
            });

            deletes.forEach((del) => {
              del.addEventListener("click", () => {
                document.cookie =
                  "id=" + del.parentElement.parentNode.id + "; path=/";
                delete_product();
              });
            });

            cols.forEach((col) => {
              col.addEventListener("click", () => {
                overlay1.style.display = "block";
                document.querySelector(
                  ".view-product-container"
                ).style.display = "block";
                type.textContent = col.parentNode.children[1].textContent;
                category.textContent = col.parentNode.children[2].textContent;
                price.textContent = col.parentNode.children[3].textContent;
                document.cookie = "id=" + col.parentElement.id + "; path=/";

                deleteBtn.addEventListener("click", () => {
                  delete_product();
                });

                editBtn.addEventListener("click", () => {
                  overlay1.click();
                  overlay3.style.display = "block";
                  document.querySelector(
                    ".edit-product-container"
                  ).style.display = "block";
                  editType.value = col.parentNode.children[1].textContent;
                  editCategory.value = col.parentNode.children[2].textContent;

                  if (col.parentNode.children[3].textContent == "0.0 LKR")
                    editPrice.value = null;
                  else
                    editPrice.value =
                      col.parentNode.children[3].textContent.slice(0, -4);
                });
              });
            });

            col1s.forEach((col1) => {
              col1.addEventListener("click", () => {
                overlay3.style.display = "block";
                document.querySelector(
                  ".edit-product-container"
                ).style.display = "block";
                editType.value =
                  col1.parentNode.parentNode.children[1].textContent;
                editCategory.value =
                  col1.parentNode.parentNode.children[2].textContent;

                if (
                  col1.parentNode.parentNode.children[3].textContent ==
                  "0.0 LKR"
                )
                  editPrice.value = null;
                else
                  editPrice.value =
                    col1.parentNode.parentNode.children[3].textContent.slice(
                      0,
                      -4
                    );

                document.cookie =
                  "id=" + edit.parentElement.parentNode.id + "; path=/";
              });
            });
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            addressTable.style.display = "none";
            if (lang == "sin") Command: toastr["info"]("නිෂ්පාදන නැත");
            else Command: toastr["info"]("No Product");
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
  }

  function delete_product() {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, එය මකන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, delete it!",
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
        fetch(backProxy + "/product?id=" + getCookie("id"), {
          method: "DELETE",
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
                  var title = "මකා දමන ලදී!",
                    text = "ඔබගේ නිෂ්පාදනය මකා ඇත.";
                } else {
                  var title = "Deleted!",
                    text = "Your product has been deleted.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  closeBtn1.click();
                  getAllData();
                });
              });
            } else if (response.status === 400) {
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
      }
    });
  }

  var pCategoryStatus = false,
    pPriceStatus = false,
    pTypeStatus = false;

  pPrice.addEventListener("input", () => {
    pPrice_status_func();
  });
  pCategory.addEventListener("input", () => {
    pCategory_status_func();
  });
  pType.addEventListener("input", () => {
    pType_status_func();
  });

  submit.addEventListener("click", () => {
    if (!pType_status_func()) {
      pType.focus();
    }
    if (!pCategory_status_func()) {
      pCategory.focus();
    }
    if (!pPrice_status_func()) {
      pPrice.focus();
    }

    if (pCategoryStatus && pTypeStatus && pPriceStatus) {
      var formData = {
        type: pType.value,
        category: pCategory.value,
        price: pPrice.value,
      };
      fetch(backProxy + "/product", {
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
              pType.value = "";
              pCategory.value = "";
              pPrice.value = "";
            });
            if (lang == "sin") var title = "නිෂ්පාදන සාර්ථකව එකතු කරන ලදී";
            else var title = "Product added successfully";

            closeBtn2.click();

            Swal.fire({
              title: title,
              // text: "You clicked the button!",
              icon: "success",
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              getAllData();
            });
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
            if (lang == "sin") Command: toastr["error"]("නිෂ්පාදන එකතු කර නැත");
            else Command: toastr["error"]("Product is not added");
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

  var editCategoryStatus = false,
    editPriceStatus = false,
    editTypeStatus = false;

  editPrice.addEventListener("input", () => {
    editPrice_status_func();
  });
  editCategory.addEventListener("input", () => {
    editCategory_status_func();
  });
  editType.addEventListener("input", () => {
    editType_status_func();
  });

  editSubmit.addEventListener("click", () => {
    if (!editPrice_status_func()) {
      editPrice.focus();
    }
    if (!editType_status_func()) {
      editType.focus();
    }
    if (!editCategory_status_func()) {
      editCategory.focus();
    }

    if (editCategoryStatus && editTypeStatus && editPriceStatus) {
      var formData = {
        id: getCookie("id"),
        type: editType.value,
        category: editCategory.value,
        price: editPrice.value,
      };
      fetch(backProxy + "/product", {
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
            });
            if (lang == "sin") var title = "නිෂ්පාදනය සාර්ථකව සංස්කරණය කරන ලදී";
            else var title = "Product edited successfully";

            closeBtn3.click();

            Swal.fire({
              title: title,
              // text: "You clicked the button!",
              icon: "success",
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              getAllData();
            });
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
            if (lang == "sin")
              Command: toastr["error"]("නිෂ්පාදන සංස්කරණය කර නැත");
            else Command: toastr["error"]("Product is not edited");
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

  function pPrice_status_func() {
    if (typeof pPrice.value === "string" && pPrice.value.trim().length === 0) {
      if (lang == "sin")
        pPriceError.textContent = "නිෂ්පාදන මිල හිස් විය නොහැක";
      else pPriceError.textContent = "Product price cannot be empty";
      pPriceStatus = false;
      return false;
    } else if (!checkInt(pPrice.value)) {
      if (lang == "sin") pPriceError.textContent = "ඒකක මිල ධනාත්මක විය යුතුය";
      else pPriceError.textContent = "Unit price must be positive";
      pPriceStatus = false;
      return false;
    } else {
      pPriceError.textContent = "";
      pPriceStatus = true;
      return true;
    }
  }
  function pCategory_status_func() {
    if (
      typeof pCategory.value === "string" &&
      pCategory.value.trim().length === 0
    ) {
      if (lang == "sin")
        pCategoryError.textContent = "නිෂ්පාදන කාණ්ඩය හිස් විය නොහැක";
      else pCategoryError.textContent = "Product category cannot be empty";
      pCategoryStatus = false;
      return false;
    } else {
      pCategoryError.textContent = "";
      pCategoryStatus = true;
      return true;
    }
  }
  function pType_status_func() {
    if (typeof pType.value === "string" && pType.value.trim().length === 0) {
      if (lang == "sin")
        pTypeError.textContent = "නිෂ්පාදන වර්ගය හිස් විය නොහැක";
      else pTypeError.textContent = "Product type cannot be empty";
      pTypeStatus = false;
      return false;
    } else {
      pTypeError.textContent = "";
      pTypeStatus = true;
      return true;
    }
  }

  function editPrice_status_func() {
    if (
      typeof editPrice.value === "string" &&
      editPrice.value.trim().length === 0
    ) {
      if (lang == "sin")
        editPriceError.textContent = "නිෂ්පාදන මිල හිස් විය නොහැක";
      else editPriceError.textContent = "Product price cannot be empty";
      editPriceStatus = false;
      return false;
    } else if (!checkInt(editPrice.value)) {
      if (lang == "sin")
        editPriceError.textContent = "ඒකක මිල ධනාත්මක විය යුතුය";
      else editPriceError.textContent = "Unit price must be positive";
      editPriceStatus = false;
      return false;
    } else {
      editPriceError.textContent = "";
      editPriceStatus = true;
      return true;
    }
  }
  function editCategory_status_func() {
    if (
      typeof editCategory.value === "string" &&
      editCategory.value.trim().length === 0
    ) {
      if (lang == "sin")
        editCategoryError.textContent = "නිෂ්පාදන කාණ්ඩය හිස් විය නොහැක";
      else editCategoryError.textContent = "Product category cannot be empty";
      editCategoryStatus = false;
      return false;
    } else {
      editCategoryError.textContent = "";
      editCategoryStatus = true;
      return true;
    }
  }
  function editType_status_func() {
    if (
      typeof editType.value === "string" &&
      editType.value.trim().length === 0
    ) {
      if (lang == "sin")
        editTypeError.textContent = "නිෂ්පාදන වර්ගය හිස් විය නොහැක";
      else editTypeError.textContent = "Product type cannot be empty";
      editTypeStatus = false;
      return false;
    } else {
      editTypeError.textContent = "";
      editTypeStatus = true;
      return true;
    }
  }
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
