import Ui from './ui.js';
import {getData, postData} from './ajax.js';
import  UI  from './ui.js';
import  Validation  from './validation.js';

let employees = [];
let departments = [];
let locations = [];

$('document').ready(function () {
  
  // Hide loader
  $('.loader-container').fadeOut(500);

  // Get the data from the tables and fill the arrays;
  // (for localhost use absolute url i.e.http://localhost/projects/companydirectory/libs/php/)
  getData('/libs/php/getAll.php',getEmployees);  
  getData('/libs/php/getAllDepartments.php',getDepartments);
  getData('/libs/php/getAllLocations.php',getLocations);


  // Events

  // Add new employee
  $('#add').click(function () {
    Ui.addEmployeeForm(departments);
  });

  // Events for action buttons (display modals)
  $('#lists').click(function(e){
    let searched;
    if (e.target.classList.contains('edit-employee')) {
      searched = filterResultById(e.target.dataset.id);
      Ui.editEmployeeForm(searched,departments);
    }
    if (e.target.classList.contains('delete-employee')) {
      searched = filterResultById(e.target.dataset.id);
      Ui.deleteEmployeeForm(searched);
    } 
  });

  // Search btn
  $('#search').on('input',function () {
    let word = this.value.toLowerCase().trim();
    
      let filteredArr = employees.filter(e => {
        const fName = e.firstName.toLowerCase().includes(word) ;
        const lName = e.lastName.toLowerCase().includes(word) ;
        const email = e.email.toLowerCase().includes(word) ;
        const job = e.jobTitle.toLowerCase().includes(word) ;
        const department = e.department.toLowerCase().includes(word) ;
        return fName || lName || email || job || department;
      });
  
    UI.displayAllEmployees(filteredArr);
    
  }).on('focus',function () {
    $(this).val('');
    UI.displayAllEmployees(employees);
  });
  
  // Modal events
  $('.modal-content').on('click', function (e) {
    // Delete record
    if(e.target.id === 'confirm-delete'){
     const id =  e.target.dataset.id;
     postData('/libs/php/deletePersonnel.php', `id=${id}`, updateList);
     Ui.showMsg('#main-msg',`Record deleted successfully`,'success');
    }
    // Add / update record
    if(e.target.id === 'add-btn' || e.target.id === 'edit-btn'){
    
      e.preventDefault(e);

      const isValidEmail = Validation.validateEmail($('#email').val());
      const isValidFName = Validation.validateName($('#firstName').val());
      const isValidLName = Validation.validateName($('#lastName').val());

      if(e.target.id === 'add-btn' ){

        if (isValidFName && isValidLName && isValidEmail && $('#department').val()) {
          let data = $('#addEmployeeForm').serialize();
          postData('/libs/php/insertPersonnel.php', data, updateList);
          $('#modal').modal('hide');
          Ui.showMsg('#main-msg',`New record added`,'success');
        }else {
          Ui.showMsg('#modal-msg','Please enter valid data into all required fields','warning');
        }
      }

      if(e.target.id === 'edit-btn'){
        
        if ($('#id').val() && isValidFName && isValidLName && isValidEmail && $('#department').val()) {
          let data = $('#employeeForm').serialize();  
          postData('/libs/php/updatePersonnel.php', data, updateList);
          $('#modal').modal('hide');
          Ui.showMsg('#main-msg','Record updated successfully','success');   
        }else {
          Ui.showMsg('#modal-msg','Please enter valid data into all required fields','warning');
        }
      }
  }

    // Clear modal on close
    if(e.target.classList.contains('close') || e.target.classList.contains('close-modal')){
    $('.modal-title').html('');
    $('.modal-body').html('<div class="loader"></div>');
    $('.modal-footer').html('&nbsp;');
    $('#modal').modal('hide');
  }


  }).on('change', function (e) {
    if(e.target.id === 'department'){
      // Find Id of a location (from data-location attr in selected option elem.) 
      // Display the correct location of department, when user selects different departments
      const select = e.target;
      const option = select.options[select.selectedIndex];
      const locationId = option.dataset.location;
      const location = (locations.filter(l => l.id === locationId))[0];
      $('#location').val(location.name);
  }});


  $('#info').click(Ui.displayAbout);
});


// Functions

function updateList() {
  getData('/libs/php/getAll.php',getEmployees);
}

function filterResultById(employeeId){
  const id = employeeId;
  const searched = employees.filter(item => item.id === id);
  if(searched.length !== 1) return;
  return searched[0];
}

function getEmployees(result) {
  showResponceError(result); // show server errors
  employees = [...result.data]
  UI.displayAllEmployees(employees)
}

function getDepartments(result) {
  showResponceError(result); 
  departments = [...result.data];
  return departments;
}

function getLocations(result) {
  showResponceError(result); 
  locations = [...result.data];
  return locations;
}

function showResponceError(result) {
  if(result.status.code == 400 || result.status.code == 300 || result.status.code == 404) {
    const msg = `Error ${result.status.code} : ${result.status.description}`;
    Ui.showMsg('#main-msg', msg, 'danger',10000);
  }
}

    
