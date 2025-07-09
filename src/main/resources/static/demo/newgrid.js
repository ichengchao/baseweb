document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addBtn = document.getElementById('addBtn');
    const editBtn = document.getElementById('editBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const batchDeleteBtn = document.getElementById('batchDeleteBtn');
    const gridBody = document.getElementById('gridBody');
    const selectAll = document.getElementById('selectAll');

    const formModal = new bootstrap.Modal(document.getElementById('formModal'));
    const modalTitle = document.getElementById('modalTitle');
    const saveBtn = document.getElementById('saveBtn');
    const userForm = document.getElementById('userForm');
    const userId = document.getElementById('userId');
    const userName = document.getElementById('userName');
    const userComment = document.getElementById('userComment');

    const API_BASE_URL = '../demo/';

    async function fetchData(searchTerm = '') {
        const response = await fetch(`${API_BASE_URL}searchDemo.do?simpleSearch=${encodeURIComponent(searchTerm)}`);
        const result = await response.json();
        renderGrid(result.data);
    }

    function renderGrid(data) {
        gridBody.innerHTML = '';
        if (!data) return;
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" class="row-checkbox" value="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.comment}</td>
            `;
            gridBody.appendChild(row);
        });
    }

    async function handleApiRequest(url, body) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (result.success) {
                fetchData();
                formModal.hide();
                alert('Operation successful!');
            } else {
                alert('Operation failed: ' + result.message);
            }
        } catch (error) {
            console.error('API request error:', error);
            alert('An error occurred.');
        }
    }

    searchBtn.addEventListener('click', () => fetchData(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchData(searchInput.value);
        }
    });

    addBtn.addEventListener('click', () => {
        userForm.reset();
        userId.value = '';
        modalTitle.textContent = 'Add User';
        formModal.show();
    });

    editBtn.addEventListener('click', () => {
        const selected = getSelectedRows();
        if (selected.length !== 1) {
            alert('Please select exactly one row to edit.');
            return;
        }
        const row = selected[0].closest('tr');
        const cells = row.querySelectorAll('td');
        userId.value = cells[1].textContent;
        userName.value = cells[2].textContent;
        userComment.value = cells[3].textContent;
        modalTitle.textContent = 'Edit User';
        formModal.show();
    });

    saveBtn.addEventListener('click', () => {
        if (!userForm.checkValidity()) {
            userForm.reportValidity();
            return;
        }
        const id = userId.value;
        const url = id ? `${API_BASE_URL}updateDemo.do` : `${API_BASE_URL}addDemo.do`;
        const formString = JSON.stringify({
            id: id,
            name: userName.value,
            comment: userComment.value
        });
        handleApiRequest(url, { formString });
    });

    deleteBtn.addEventListener('click', () => {
        const selected = getSelectedRows();
        if (selected.length !== 1) {
            alert('Please select exactly one row to delete.');
            return;
        }
        if (confirm('Are you sure you want to delete the selected user?')) {
            handleApiRequest(`${API_BASE_URL}deleteDemo.do`, { id: selected[0].value });
        }
    });

    batchDeleteBtn.addEventListener('click', () => {
        const selected = getSelectedRows();
        if (selected.length === 0) {
            alert('Please select at least one row to delete.');
            return;
        }
        if (confirm(`Are you sure you want to delete ${selected.length} users?`)) {
            const idArray = selected.map(cb => cb.value);
            handleApiRequest(`${API_BASE_URL}batchDeleteDemo.do`, { idArray: JSON.stringify(idArray) });
        }
    });

    selectAll.addEventListener('change', (e) => {
        gridBody.querySelectorAll('.row-checkbox').forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });

    function getSelectedRows() {
        return Array.from(gridBody.querySelectorAll('.row-checkbox:checked'));
    }

    // Initial data load
    fetchData();
});
