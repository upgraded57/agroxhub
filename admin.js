const usersCount = document.getElementById("usersCount");

const table = document.getElementById("tableBody");

const baseUrl = "https://farmeasyapp.azurewebsites.net/api";

// fetch users
let users = [];
const fetchUsers = async () => {
  try {
    const res = await fetch(`${baseUrl}/waitlist`, {
      method: "GET",
    });

    users = await res.json();
    console.log(users);
    usersCount.textContent = users.length;
    table.innerHTML = users
      .map((user) => {
        return `<tr> 
        <td> ${user.id} </td>
        <td> ${user.email} </td>
        <td> ${user.phone_number} </td>
        <td> ${user.seller_type || user.buyer_type} </td>
        <td> ${user.user_type} </td>
        </tr>`;
      })
      .join("");
  } catch (error) {
    throw new Error("Error", err);
  }
};

fetchUsers();
