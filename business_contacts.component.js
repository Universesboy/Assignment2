
function renderBusinessContactsView() {
    var contacts = [
          { name: "John Doe", number: "123-456-7890", email: "johndoe@example.com" },
          { name: "Jane Smith", number: "987-654-3210", email: "janesmith@example.com" },
    ];
    var business_contacts_list = document.getElementById("business_contacts_list");
    contacts.forEach((contact) => {
      var row = document.createElement("tr");
      var nameCell = document.createElement("td");
      var numberCell = document.createElement("td");
      var emailCell = document.createElement("td");
      var updatebtnCell = document.createElement("td");
      var deletebtnCell = document.createElement("td");
      var updatebtn = document.createElement("button");
      var deletebtn = document.createElement("button");

      nameCell.textContent = contact.name;
      numberCell.textContent = contact.number;
      emailCell.textContent = contact.email;

      updatebtn.textContent = "Update";
      updatebtn.addEventListener("click", () => {
        console.log("Update button clicked for contact: " + contact.name);
      });
      deletebtn.textContent = "Delete";
      deletebtn.addEventListener("click", () => {
        console.log("Delete button clicked for contact: " + contact.name);
      });

      updatebtnCell.appendChild(updatebtn);
      deletebtnCell.appendChild(deletebtn);

      row.appendChild(nameCell);
      row.appendChild(numberCell);
      row.appendChild(emailCell);
      row.appendChild(updatebtnCell);
      row.appendChild(deletebtnCell);
      business_contacts_list.appendChild(row);
    });
}


renderBusinessContactsView()
