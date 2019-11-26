//Loading page with showAllContacts
window.onload = function() {
 showAllContacts();
};

//Function to hide all the blocks
let sections = document.querySelectorAll('.sections')
function hideSections(sections) {
 sections.forEach(function(userItem) {
  userItem.style.display = 'none';
 });
}

//To fetch all the records from an API call
function showAllContacts() {
 hideSections(sections);
 document.getElementById('phoneBook').style.display = 'block';
 call('http://localhost:8080/manipulate?todo=getAll', new payLoad('get', 'null', 'null'), phoneBookDisp);
}

//To delete a record using Axios
function deleteRec(email, callBack) {
 axios.delete('http://localhost:8080/manipulate?email=' + email, {})
  .then(res => callBack());
}

//To update a record using Axios
function updateRec(email1, name, email, phone, callBack) {
 if (name != "" && email != "" && phone != "") {
  axios.delete('http://localhost:8080/manipulate?email=' + email1, {})
   .then(res => callBack(name, email, phone));
 }
}

//To save a record using Axios
function saveRec(name, email, phone) {
 if (name != "" && email != "" && phone != "") {
  axios.post('http://localhost:8080/manipulate', {
    name: name,
    phoneNumber: phone,
    email: email
   })
   .then(res => showAllContacts());
 }
}

//To display a new contact form by hiding all the other fields with null values in the text fields
function newContactForm() {
 hideSections(sections);
 document.getElementById('newContactForm').style.display = 'block';
 document.getElementById('nameS').value = '';
 document.getElementById('emailS').value = '';
 document.getElementById('phoneS').value = '';
}

//To display update form with the previous values present inside the text fields
//Here 'emailRec' ID is used to store the existing email for the record to be updated
function update(name, phoneNumber, email) {
 hideSections(sections);
 document.getElementById('update').style.display = 'block';
 var updateHTML = `<h2>Update Contact</h2>
	<form>
<div class="form-group">
<label>Enter Name:</label>
<input class="form-control" type="text" id="nameU" value="${name}" required>
</div>

<div class="form-group">
<label>Enter Phone Number</label>
<input class="form-control" type="number" id="phoneU" value="${phoneNumber}" required>
</div>

<div class="form-group">
<label>Enter Email</label>
<input class="form-control" type="email" id="emailU" value="${email}" required><br/>

<input type="text" id="emailRec" value="${email}" style="display:none;">

<button id="save" class="btn btn-lg btn-success" onclick="updateContactSave();">Update</button>
<button id="save" class="btn btn-lg btn-success" onclick="showAllContacts();">Return to Phonebook</button>
</div>
</form>`
 document.getElementById('update').innerHTML = updateHTML;
}

//To show the contact deleted message
function contactDeleted() {
 hideSections(sections);
 document.getElementById('contactDeleted').style.display = 'block';
}

/* Fetching the values from text fields and calling saveRec 
function with the fetching values as parameters */
function saveContact() {
 let name = document.getElementById('nameS').value;
 let phone = document.getElementById('phoneS').value;
 let email = document.getElementById('emailS').value;
 saveRec(name, email, phone);
 contactSaved();
}

/* Fetching the new updated values from text fields and 
calling UpdateRec function with the fetching values as parameters */
function updateContactSave() {
 let name = document.getElementById('nameU').value;
 let phone = document.getElementById('phoneU').value;
 let email = document.getElementById('emailU').value;
 let emailRec = document.getElementById('emailRec').value;
 updateRec(emailRec, name, email, phone, saveRec);
 contactSaved();
}

//To display contact saved message
function contactSaved() {
 hideSections(sections);
 document.getElementById('contactSaved').style.display = 'block';

}

//To display contact not saved message
function contactNotSaved() {
 hideSections(sections);
 document.getElementById('contactNotSaved').style.display = 'block';

}

//To diplay contact updated message
function contactUpdated() {
 hideSections(sections);
 document.getElementById('contactUpdated').style.display = 'block';
}

//To show all the contacts from the response
function phoneBookDisp(res) {

 var tbody1 = document.createElement('tbody');

 res.data.forEach((e) => {
  var tr = document.createElement('tr');

  var td1 = document.createElement("td");
  var data = document.createTextNode(e.name);
  td1.setAttribute('class', 'name');
  td1.appendChild(data);
  tr.append(td1);

  var td2 = document.createElement("td");
  var data = document.createTextNode(e.phoneNumber);
  td2.setAttribute('class', 'phoneNumber');
  td2.appendChild(data);
  tr.append(td2);

  var td3 = document.createElement("td");
  var data = document.createTextNode(e.email);
  td3.setAttribute('class', 'email');
  td3.appendChild(data);
  tr.append(td3);

  var td4 = document.createElement("td");
  var btn1 = document.createElement("BUTTON");
  btn1.innerText = "Update";
  btn1.setAttribute('class', 'btn btn-success')
  td4.appendChild(btn1);
  tr.append(td4);

  var td5 = document.createElement("td");
  var btn2 = document.createElement("BUTTON");
  btn2.innerText = "Delete";
  btn2.setAttribute('class', 'btn btn-danger');
  td5.appendChild(btn2);
  tr.append(td5);
  tbody1.append(tr);

 })

 document.getElementById('pTable').innerHTML = `
	<tr>
	<thead>
	<th>Name</th>
	<th>Phone Number</th>
	<th>Email</th>
	<th>Update</th>
	<th>Delete</th>
	</thead>
	</tr>`;
 document.getElementById("pTable").appendChild(tbody1);

 handleEvents();
}

//To handle the click events for fetching the respective records
function handleEvents() {
 var deleteBtn = document.querySelectorAll('.btn-danger');
 var updateBtn = document.querySelectorAll('.btn-success');
 deleteBtn.forEach(btn => {
  btn.addEventListener('click', function(event) {
   event.preventDefault();
   var email = event.target.closest('tr').querySelector('.email').innerText;
   deleteRec(email, showAllContacts);
  })
 })

 updateBtn.forEach(btn => {
  btn.addEventListener('click', function(event) {
   event.preventDefault();
   var phoneNumber = event.target.closest('tr').querySelector('.phoneNumber').innerText;
   var name = event.target.closest('tr').querySelector('.name').innerText;
   var email = event.target.closest('tr').querySelector('.email').innerText;
   update(name, phoneNumber, email);
  })
 })
}

//Centralized API call funtion to access different methods and URLs
var call = function(url, payLoad, callBack) {
 axios({
   method: payLoad.method,
   url: url,
   data: payLoad.params
  })
  .then(res => callBack(res))
  .catch(err => console.log(err));
}

//Constructor for payLoad
var payLoad = function(method, data, params) {
 this.method = method;
 this.data = data;
 this.params = params;
}

//Constructor for data
var data = function(name, phoneNumber, email) {
 this.name = name;
 this.phoneNumber = phoneNumber;
 this.email = email;
}

//Constructor for params
var params = function(email) {
 this.email = email;
}