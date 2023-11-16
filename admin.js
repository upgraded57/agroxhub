const usersCount = document.getElementById("usersCount");

const table = document.getElementById("tableBody");
const loader = document.querySelector(".loader");

const baseUrl = "https://farmeasyapp.azurewebsites.net/api";

// fetch users
const fetchUsers = async () => {
  loader.style.display = "flex";
  try {
    const res = await fetch(`${baseUrl}/waitlist`, {
      method: "GET",
    });

    let users = await res.json();
    usersCount.textContent = users.length;
    table.innerHTML = users
      .map((user) => {
        return `<tr> 
        <td> ${user.id} </td>
        <td> ${user.email} </td>
        <td> ${user.phone_number || "N/A"} </td>
        <td> ${user.user_type} </td>
        <td> ${user.seller_type || user.buyer_type || "N/A"} </td>
        </tr>`;
      })
      .join("");
    loader.style.display = "none";
    return users;
  } catch (error) {
    loader.style.display = "none";
    throw new Error("Error", err);
  }
};

const users = fetchUsers();

console.log(users);
