function fetchEmployees() {
    const search = document.getElementById('searchInput').value;
    const department = document.getElementById('departmentSelect').value;
    const designation = document.getElementById('designationSelect').value;
  
    const url = new URL('/api/employees', window.location.origin);
    const params = new URLSearchParams();
  
    if (search) params.append('search', search);
    if (department) params.append('department', department);
    if (designation) params.append('designation', designation);
  
    url.search = params.toString();  // Append parameters to the URL
  
    // Fetch data from the backend API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayEmployees(data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }
  
  function displayEmployees(employees) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';  // Clear existing list of employees
  
    if (employees.length === 0) {
      employeeList.innerHTML = '<p>No employees found.</p>';
      return;
    }
  
    // Log the employee data here to check if it is complete
    console.log('Employees:', employees);
  
    employees.forEach(employee => {
      const employeeCard = document.createElement('div');
      employeeCard.classList.add('employee-card');
  
      employeeCard.innerHTML = `
        <img src="images/${employee.profileImage}" alt="${employee.name}" class="employee-img">
        <h3>${employee.name}</h3>
        <p class="designation">${employee.designation}</p>
        <p class="department">${employee.department}</p>
        <p class="salary">$${employee.salary}</p>
      `;
  
      employeeList.appendChild(employeeCard);
    });
  }
  
  // Initial fetch to load all employees when the page loads
  fetchEmployees();
  