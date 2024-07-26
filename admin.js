const usersCount = document.getElementById("usersCount");

const table = document.getElementById("tableBody");
const loader = document.querySelector(".loader");

const baseUrl = "https://waitlist-08bk.onrender.com/users";

// fetch users
const fetchUsers = async () => {
  loader.style.display = "flex";
  try {
    const res = await fetch(`${baseUrl}`, {
      method: "GET",
    });

    let users = await res.json();
    usersCount.textContent = users.length;
    table.innerHTML = users
      .map((user, idx) => {
        return `<tr> 
        <td>${idx + 1}</td>
        <td> ${user.name} </td>
        <td> ${user.identifier} </td>
        <td> ${user.category} </td>
        <td> ${user.subCategory || "N/A"} </td>
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
