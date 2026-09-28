const form = document.getElementById('employeeForm');
const formMessage = document.getElementById('formMessage');
const employeeList = document.getElementById('employeeList');

function showMessage(message, isError = false) {
    formMessage.textContent = message;
    formMessage.classList.toggle('error', isError);
    formMessage.classList.toggle('success', !isError);
}

function clearValidation() {
    document.querySelectorAll('.is-invalid').forEach((field) => {
        field.classList.remove('is-invalid');
    });
}

function markInvalid(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('is-invalid');
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearValidation();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value.trim();

    if (name.length < 2) {
        markInvalid('name');
        showMessage('Name must be at least 2 characters long.', true);
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        markInvalid('email');
        showMessage('Please enter a valid email address.', true);
        return;
    }

    if (!role) {
        markInvalid('role');
        showMessage('Please select a valid role.', true);
        return;
    }

    const card = document.createElement('article');
    card.className = 'employee-card';

    const details = document.createElement('div');
    details.className = 'employee-details';
    details.innerHTML = `
        <h4>${name}</h4>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function () {
        card.classList.add('is-removed');
        setTimeout(() => card.remove(), 200);
    });

    card.appendChild(details);
    card.appendChild(deleteButton);
    employeeList.appendChild(card);

    form.reset();
    showMessage('Employee added successfully!');
});
