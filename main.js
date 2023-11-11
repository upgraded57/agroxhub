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
  const email = form.querySelector('input[type= "email"]').value;
  const phone_number = form.querySelector('input[type= "text"]').value;
  const user_type = category.value;
  let subCategory;

  buyerOptionsInputs.forEach((input) => {
    if (input.checked) {
      return (subCategory = input.value);
    }
  });

  sellerOptionsInputs.forEach((input) => {
    if (input.checked) {
      return (subCategory = input.value);
    }
  });

  const buyer_type = user_type === "buyer" ? subCategory : null;
  const seller_type = user_type === "seller" ? subCategory : null;
  const data = { email, phone_number, user_type, buyer_type, seller_type };

  // remove null keys from data object
  Object.keys(data).forEach((key) => {
    if (data[key] === null) {
      delete data[key];
    }
  });

  postData(data);
};

const baseUrl = "https://farmeasyapp.azurewebsites.net/api";
const loader = document.querySelector(".loader");
// post data
const postData = async (data) => {
  loader.style.display = "flex";
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("phone_number", data.phone_number);
  formData.append("user_type", data.user_type);
  if (data.buyer_type) {
    formData.append("buyer_type", data.buyer_type);
  }
  if (data.seller_type) {
    formData.append("seller_type", data.seller_type);
  }

  try {
    await fetch(`${baseUrl}/wait-list/create/`, {
      method: "POST",
      body: formData,
    });
    alert("You have been added to the waitlist");
    loader.style.display = "none";
  } catch (err) {
    alert("Something went wrong! Please retry");
    loader.style.display = "none";
  }
};
