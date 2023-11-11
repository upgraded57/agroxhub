// tempdata
const users = [
  {
    id: "01",
    email: "john.doe@gmail.com",
    phone: "+2348012345678",
    type: "buyer",
    subtype: "personal",
  },
  {
    id: "02",
    email: "jane.smith@yahoo.com",
    phone: "+2348023456789",
    type: "seller",
    subtype: "farmer",
  },
  {
    id: "03",
    email: "bob.jones@gmail.com",
    phone: "+2348034567890",
    type: "buyer",
    subtype: "private business",
  },
  {
    id: "04",
    email: "alice.white@yahoo.com",
    phone: "+2348045678901",
    type: "seller",
    subtype: "private business",
  },
  {
    id: "05",
    email: "sam.brown@gmail.com",
    phone: "+2348056789012",
    type: "buyer",
    subtype: "personal",
  },
  {
    id: "06",
    email: "emily.green@yahoo.com",
    phone: "+2348067890123",
    type: "seller",
    subtype: "farmer",
  },
  {
    id: "07",
    email: "chris.black@gmail.com",
    phone: "+2348078901234",
    type: "buyer",
    subtype: "private business",
  },
  {
    id: "08",
    email: "olivia.gray@yahoo.com",
    phone: "+2348089012345",
    type: "seller",
    subtype: "private business",
  },
  {
    id: "09",
    email: "david.red@gmail.com",
    phone: "+2348090123456",
    type: "buyer",
    subtype: "personal",
  },
  {
    id: "10",
    email: "susan.orange@yahoo.com",
    phone: "+2348101234567",
    type: "seller",
    subtype: "farmer",
  },
  // Add more objects as needed
];

const baseUrl = "https://farmeasyapp.azurewebsites.net/api";

// fetch users
const fetchUsers = async () => {
  try {
    const res = await fetch(`${baseUrl}/waitlist`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users = await res.text();
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

fetchUsers();

const table = document.getElementById("tableBody");

table.innerHTML = users
  .map((user) => {
    return `<tr> 
        <td> ${user.id} </td>
        <td> ${user.email} </td>
        <td> ${user.phone} </td>
        <td> ${user.type} </td>
        <td> ${user.subtype} </td>
        </tr>`;
  })
  .join("");
