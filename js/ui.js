export default class Ui {

  static displayAllEmployees(dataArr) {
    let employeesList = '';

    dataArr.forEach(e => {
      let role = e.jobTitle !== '' ? `<p><img src="assets/icons/role.svg" width="22px" alt="location" class="align-text-bottom pr-1"/>${e.jobTitle}</p>` : '';
      
      let card =  `<div class="card-div col-md-6 col-lg-3 mb-3 mb-md-4"><div class="card h-100">
      <div class="card-header lead text-white bg-info"><img src="assets/icons/person.svg" width="23px" alt="email" class="align-text-top mr-2"/>${e.lastName} ${e.firstName}</div>
      <div class="card-body bg-light">
      <p><img src="assets/icons/email.svg" width="22px" alt="email" class="align-text-bottom pr-1"/>${e.email}</p>
      <p><img src="assets/icons/department.svg" width="22px" alt="department" class="align-text-bottom pr-1"/>${e.department}</p>${role}
      <p><img src="assets/icons/location.svg" width="22px" alt="location" class="align-text-bottom pr-1"/>${e.location}</p>
      </div>
      <div class="card-footer bg-info">
        <span class="d-flex justify-content-end">
            <button data-id=${e.id} data-toggle="modal" data-target="#modal" class="edit-employee btn btn-sm btn-primary mr-2">
              <img src="assets/icons/edit.svg" width="22px" alt="edit" class="align-text-bottom"/></button>
            <button data-id=${e.id} data-toggle="modal" data-target="#modal" class="delete-employee btn btn-sm btn-danger">
              <img src="assets/icons/delete.svg" width="22px" alt="delete" class="align-text-bottom"/></button>
        </span>
      </div>  
      </div></div>`;
      
      employeesList += card;
    });

    $('#lists').html(`${employeesList}`);
    if (dataArr && dataArr.length > 0) {
      $('#counter').html(`Records found : ${dataArr.length}`);
    } else if (dataArr.length == 0) {
      $('#counter').html('No records found');
    } else {
      $('#counter').html('');
    }
  }



  static addEmployeeForm(departments) {
    $('.modal-title').html(`<img src="assets/icons/add.svg" width="23px" alt="email" class="align-text-top mr-2"/>Add employee`);
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
      
    </form>`;
    $('.modal-body').html(form);
    $('.modal-footer').html(`
      <button type="submit" id="add-btn" class="btn btn-success btn-block mt-1 col-md-4 mx-auto">Add new</button>
      <button type="button" class="close-modal btn btn-secondary btn-block mt-1 col-md-4 mx-auto" data-dismiss="modal">Close</button>`
    );
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
        <input type="hidden" class="form-control" id="id" name="id" placeholder="Id" value="${e.id}">
        <div class="form-group col-md-6">
          <label for="firstName">First Name *</label>
          <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" value="${e.firstName}">
        </div>
        <div class="form-group col-md-6">
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

  // Edit employee form
  static editEmployeeForm(e, departments) {
      $('.modal-title').html(`<img src="assets/icons/person.svg" width="23px" alt="email" class="align-text-top mr-2"/>
        ${e.firstName.charAt(0)}. ${e.lastName}`);

      const form = this.form(e, departments);
      $('.modal-body').html(form);
      $('form#employeeForm').prepend('<p id="modal-msg" class="text-center my-0">&nbsp;</p>');
      $('input#id').attr('readonly',true); // set id to readonly (allows to serialize id);

      $('.modal-footer').html(`
      <button type="submit" id="edit-btn" class="btn btn-success btn-block mt-1 col-md-4 mx-auto">Save changes</button>
      <button type="button" class="close-modal btn btn-secondary btn-block mt-1 col-md-4 mx-auto" data-dismiss="modal">Close</button>`
    );
  }


  static deleteEmployeeForm(e) {
      $('.modal-title').html(`Delete ${e.lastName} ${e.firstName} ?`);
      $('.modal-footer').html('&nbsp');
      $('.modal-body').html(`<div class="text-center">
      <button type="submit" id="confirm-delete" class="btn btn-danger" data-id=${e.id} data-dismiss="modal">Delete</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>`);
  }


  static showMsg (element, msg, textColor='primary', timeout = 2500) {
    let color = `text-${textColor}`
    $(element).html(msg);
        $(element).addClass(color);
        setTimeout(()=> {
          $(element).html('&nbsp;');
          $(element).removeClass(color)
        },timeout);
  }

  static displayAbout() {
      $('.modal-title').html(`<span class="font-italic">
      <img src="assets/icons/people.svg" width="22px" alt="logo" class="align-text-bottom" />
      <span>Company Directory</span></span>`);

      const about = `<div class="text-center">
        <p class="px-5"><span class="lead">Description:</span><br><br>A simple app that allows for creation, retrieval and modification of employees data.</p><br>
          <p><span class="lead">Version</span>: 1.0.1</p><br>
          <p><span class="lead">Author</span>: <a href="https://github.com/mjablonski984" class="text-decoration-none">mjablonski984</a></p>`;   
      $('.modal-body').html(about);
      $('.modal-footer').html('<button type="button" class="close-modal btn btn-secondary btn-block mt-1 col-md-4 mx-auto" data-dismiss="modal">Close</button>');
  }
}
