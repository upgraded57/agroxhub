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
        <td> ${
          (user.seller_type === "private_business" && "private business") ||
          (user.buyer_type === "private_business" && "private business") ||
          "N/A"
        } </td>
        </tr>`;
      })
      .join("");
    loader.style.display = "none";
  } catch (error) {
    loader.style.display = "none";
    throw new Error("Error", err);
  }
};

fetchUsers();

// download data
const downloadBtn = document.getElementById("download-btn");

downloadBtn.onclick = () => {
  /* Create worksheet from HTML DOM TABLE */
  const wb = XLSX.utils.table_to_book(table, { sheet: "sheet-1" });

  /* Export to file (start a download) */
  XLSX.writeFile(wb, "Waitlist.xlsx");
};
