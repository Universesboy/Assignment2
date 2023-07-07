// Login View
// GUI
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

// Functionality
loginButton.addEventListener('click', function() {
  const username = usernameField.value;
  const password = passwordField.value;

  // Authenticate user using username and password
  if (authenticateUser(username, password)) {
    window.location.href = 'business_contacts.component.html';
  } else {
    // Redirect back to Login View if credentials are incorrect
    alert('Invalid username or password. Please try again.');
    // You can redirect back to Login View using window.location.href = 'loginView.html';
  }
});

// Business Contacts List View
// GUI
const contactsTable = document.getElementById('contactsTable');

// Functionality
// Retrieve contact data from the database and populate the table
const contactData = getContactDataFromDatabase();
displayContactsTable(contactData);

function displayContactsTable(data) {
  // Sort the contacts alphabetically by name
  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

  // Clear the table
  contactsTable.innerHTML = '';

  // Create table rows for each contact
  sortedData.forEach(function(contact) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.number}</td>
      <td>${contact.email}</td>
      <td>
        <button class="updateButton" data-contact-id="${contact.id}">Update</button>
      </td>
      <td>
        <button class="deleteButton" data-contact-id="${contact.id}">Delete</button>
      </td>
    `;
    contactsTable.appendChild(row);
  });

  // Attach event listeners to the update and delete buttons
  const updateButtons = document.getElementsByClassName('updateButton');
  const deleteButtons = document.getElementsByClassName('deleteButton');

  for (let i = 0; i < updateButtons.length; i++) {
    updateButtons[i].addEventListener('click', function() {
      const contactId = this.dataset.contactId;
      // Redirect to Update View with the contactId as a parameter
      window.location.href = `updateView.html?contactId=${contactId}`;
    });
    deleteButtons[i].addEventListener('click', function() {
      const contactId = this.dataset.contactId;
      // Delete the contact from the database
      deleteContact(contactId);
      // Refresh the contacts table
      displayContactsTable(getContactDataFromDatabase());
    });
  }
}

// Update View
// GUI
const updateForm = document.getElementById('updateForm');
const deleteButton = document.getElementById('deleteButton');
const cancelButton = document.getElementById('cancelButton');

// Functionality
updateForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const contactId = getContactIdFromQueryString();
  const updatedContact = {
    id: contactId,
    name: updateForm.name.value,
    number: updateForm.number.value,
    email: updateForm.email.value
    // Add other contact details as needed
  };
  // Update the contact in the database
  updateContact(updatedContact);
  // Redirect to Business Contacts List View
  window.location.href = 'login.component.html';
});

deleteButton.addEventListener('click', function() {
  const contactId = getContactIdFromQueryString();
  // Delete the contact from the database
  deleteContact(contactId);
  // Redirect to Business Contacts List View
  window.location.href = 'login.component.html';
});

cancelButton.addEventListener('click', function() {
  // Redirect to Business Contacts List View
  window.location.href = 'login.component.html';
});

// Helper functions
function authenticateUser(username, password) {
  // Perform authentication logic here, check if the credentials match the user collection in the database
  // Return true if authenticated, false otherwise
  return true
}

function getContactDataFromDatabase() {
  // Retrieve contact data from the database and return as an array
}

function deleteContact(contactId) {
  // Delete the contact with the specified contactId from the database
}

function updateContact(updatedContact) {
  // Update the contact with the specified details in the database
}

function getContactIdFromQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('contactId');
}
