// open FAQ
const faqToggle = document.querySelectorAll(".faq-head");
const faqs = document.querySelectorAll(".faq");

faqToggle.forEach(
  (toggler) =>
    (toggler.onclick = (e) => {
      faqs.forEach((faq) => {
        if (faq.classList.contains("open")) {
          faq.classList.remove("open");
        }
      });
      if (e.target.parentElement.classList.contains("open")) {
        e.target.parentElement.classList.remove("open");
      } else {
        e.target.parentElement.classList.add("open");
      }
    })
);

// submit form
const category = document.querySelector(".category select");
const buyerOptions = document.querySelector(".category-option-buyer");
const sellerOptions = document.querySelector(".category-option-seller");

const buyerOptionsInputs = buyerOptions.querySelectorAll("input");
const sellerOptionsInputs = sellerOptions.querySelectorAll("input");

category.onchange = (e) => {
  if (e.target.value === "buyer") {
    buyerOptions.style.display = "flex";
    sellerOptions.style.display = "none";

    // uncheck all seller options
    sellerOptionsInputs.forEach((input) => {
      input.checked = false;
    });
  } else if (e.target.value === "seller") {
    sellerOptions.style.display = "flex";
    buyerOptions.style.display = "none";

    // uncheck all buyers options
    buyerOptionsInputs.forEach((input) => {
      input.checked = false;
    });
  } else {
    sellerOptions.style.display = "none";
    buyerOptions.style.display = "none";

    // uncheck all inputs
    buyerOptionsInputs.forEach((input) => {
      input.checked = false;
    });

    sellerOptionsInputs.forEach((input) => {
      input.checked = false;
    });
  }
};

const form = document.querySelector(".list-form");

form.onsubmit = (e) => {
  e.preventDefault();
  const email = form.querySelector('input[type= "email"]');
  const phone = form.querySelector('input[type= "text"]');
  const selectedCategory = category.value;
  const subCategory = "";
  console.log(selectedCategory);
};
