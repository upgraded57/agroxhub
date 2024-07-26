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

  const data = Object.fromEntries(new FormData(e.target));

  postData(data);
};

const baseUrl = "https://waitlist-08bk.onrender.com";

const loader = document.querySelector(".loader");
// post data
const postData = async (data) => {
  loader.style.display = "flex";

  try {
    const res = await fetch(`${baseUrl}/users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    alert(response.message);
  } catch (error) {
    if (error.message && error.message === "User Already Exists")
      return alert("You are already registered");

    console.error("There was a problem with your fetch operation:", error);
    alert("Something went wrong! Please retry");
  } finally {
    loader.style.display = "none";
  }
};

// close banner
const banner = document.querySelectorAll(".banner");
const closeBtn = document.querySelectorAll(".banner span");

for (let i = 0; i < banner.length; i++) {
  closeBtn[i].onclick = () => {
    banner[i].style.opacity = 0;
    setTimeout(() => {
      banner[i].style.display = "none";
    }, 400);
  };
}
