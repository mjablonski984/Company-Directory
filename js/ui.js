export default class Ui {

  static displayAllEmployees(dataArr) {
    let employeesList = '';
    dataArr.forEach(e => {
      let li =  `<tr><td class="pr-0">${e.lastName}</td><td class="pr-0">${e.firstName}</td>
      <td class="pr-0 pl-1">
          <button data-id=${e.id} data-toggle="modal" data-target="#modal" class="display-employee btn btn-sm btn-info py-2">VIEW</button>
          <button data-id=${e.id} data-toggle="modal" data-target="#modal" class="edit-employee btn btn-sm btn-primary py-2">EDIT</button>
          <button data-id=${e.id} data-toggle="modal" data-target="#modal" class="delete-employee btn btn-sm btn-danger py-2">DEL</button>
      </td></tr>`;
      employeesList += li;
    });

    $('#lists').html(`<p class="lead text-center text-success mx-4">Employees</p> <table class="table table-striped">
    <thead><tr><th class="sticky-top bg-white">Last name</th><th class="sticky-top bg-white">First name</th><th class="sticky-top bg-white pl-1">Actions</th></tr></thead>
    <tbody>${employeesList}</tbody></table>`);
  }


  static form (e, departments) {
    let options = '';
    departments.forEach(d =>{ 
      if ( d.name === e.department) {
        options += `<option value="${d.id}" data-location=${d.locationID} selected>${d.name}</option>`;
      } else {
        options += `<option value="${d.id}" data-location=${d.locationID}>${d.name}</option>`;
      }
    });

    const form =`<form id="employeeForm">
      <div class="form-row">
        <div class="form-group col-md-2">
          <label for="id">Id</label>
          <input type="text" class="form-control" id="id" name="id" placeholder="Id" value="${e.id}">
        </div>
        <div class="form-group col-md-5">
          <label for="firstName">First Name *</label>
          <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" value="${e.firstName}">
        </div>
        <div class="form-group col-md-5">
          <label for="lastName">Last Name *</label>
          <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name" value="${e.lastName}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="email">Email *</label>
          <input type="email" class="form-control" id="email" name="email"  placeholder="Email" value="${e.email}">
        </div>
        <div class="form-group col-md-6">
          <label for="jobTitle">Job Title</label>
          <input type="text" class="form-control" id="jobTitle" name="jobTitle" value="${e.jobTitle}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="department">Department *</label>
          <select class="form-control" id="department" name="departmentID" >${options}</select>
        </div>
        <div class="form-group col-md-6">
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" placeholder="Location" value="${e.location}" disabled>
        </div>
      </div>
    </form>`;

      return form;
  }


  static addEmployeeForm(departments) {
    $('.modal-title').html(`Add employee`);
    let options = '';
    departments.forEach(d => options += `<option value="${d.id}" data-location=${d.locationID}>${d.name}</option>`);
    const form = `<form id="addEmployeeForm">
      <p id="modal-msg" class="text-center my-0">&nbsp;</p>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="firstName">First Name *</label>
          <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" required>
        </div>
        <div class="form-group col-md-6">
          <label for="lastName">Last Name *</label>
          <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="email">Email *</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
        </div>
        <div class="form-group col-md-6">
          <label for="jobTitle">Job Title</label>
          <input type="text" class="form-control" id="jobTitle" name="jobTitle" placeholder="Job Title">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="department">Department *</label>
          <select class="form-control" id="department" name="departmentID" >${options}</select>
        </div>
        <div class="form-group col-md-6">
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" name="location" placeholder="Location" disabled>
        </div>
      </div>
      <button type="submit" id="add-btn" class="btn btn-primary btn-block mt-3 col-md-4">Add new</button>
    </form>`;
    $('.modal-body').html(form);
  }
    
  // View employee form - inputs disabled
  static displayEmployeeForm(e, departments) {
      $('.modal-title').html(`${e.lastName} ${e.firstName.charAt(0)}.`);
      // create form fou employee data
      const form = this.form(e, departments);
      $('.modal-body').html(form);
      $('#modal input').attr('disabled',true);
      $('select').attr('disabled',true);
  }

  // Edit employee form
  static editEmployeeForm(e, departments) {
      $('.modal-title').html(`${e.lastName} ${e.firstName.charAt(0)}.`);
      const form = this.form(e, departments);
      $('.modal-body').html(form);
      $('form').prepend('<p id="modal-msg" class="text-center my-0">&nbsp;</p>');
      $('input#id').attr('readonly',true); // set id to readonly (allows to serialize id);
      $('form#employeeForm').append('<button type="submit" id="edit-btn" class="btn btn-primary btn-block col-md-4">Save changes</button>');
  }


  static deleteEmployeeForm(e) {
      $('.modal-title').html(`Delete ${e.lastName} ${e.firstName} ?`);
      $('.modal-body').html(`<div class="text-center">
      <button type="submit" id="confirm-delete" class="btn btn-danger" data-id=${e.id} data-dismiss="modal">Delete</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>`);
  }


  static showMsg (element, msg, textColor='primary', timeout = 2500) {
    $(element).html(msg);
        $(element).addClass(`text-${textColor}`);
        setTimeout(()=> {
          $(element).html('&nbsp;');
          $(element).removeClass(`text-${textColor}`)
        },timeout);
  }

  static displayAbout() {
      $('.modal-title').html(`About <span class="text-success">Company Directory</span>`);
      const about = `<div class="text-center"><p class="px-5">Description:<br>A simple app that allows for creation, retrieval and modification of employees data.</p><br>
          <p>Version: 1.0.0</p><br>
          <p>Author: <a href="https://github.com/mjablonski984" class="text-decoration-none">mjablonski984</a></p>`;   
      $('.modal-body').html(about);
  }
}
