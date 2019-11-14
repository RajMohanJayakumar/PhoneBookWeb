window.onload = function() {
  phonebook();
};

function search(){
	 const Http = new XMLHttpRequest();
const url='http://localhost:8080/manipulate?email=Ram2@gmail.com';
Http.open('DELETE', url);
Http.send();
console.log(Http.responseText)
Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}
}

function phonebook() {
	const html = `<div class="container">
<div class="jumbotron">	
<tbody id="tbody">
<button class="btn btn-primary" onclick="newContact();">Add Contact</button>
<button class="btn btn-primary" onclick="update();">Update</button>
<button class="btn btn-primary" onclick="contactDeleted();">Delete</button>
<table class="table">
<tr>
<thead>
	<th>Name</th>
	<th>Phone Number</th>
	<th>Email</th>
	<th>Update</th>
	<th>Delete</th>
</thead>
</tr>
</table>
</tbody>
</div>
</div>`;
    document.getElementById('maindisp').innerHTML=html;
}

function newContact() {
	const html = `<h2>Add Contact</h2>
<div class="form-group">
<label>Enter Name:</label>
<input class="form-control" type="text" id="id" value="" required>
</div>
<div class="form-group">
<label>Enter Phone Number</label>
<input class="form-control" type="number" id="name" value="" required>
</div>
<div class="form-group">
<label>Enter Email</label>
<input class="form-control" type="text" id="city" value="" required><br/>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="contactSaved();">Save</button>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="phonebook();">Return to Phonebook</button>
</div>`;
    document.getElementById('maindisp').innerHTML=html;
}

function update() {
	const html = `<h2>Update Contact</h2>
<div class="form-group">
<label>Enter Name:</label>
<input class="form-control" type="text" id="id" value="" required>
</div>
<div class="form-group">
<label>Enter Phone Number</label>
<input class="form-control" type="number" id="name" value="" required>
</div>
<div class="form-group">
<label>Enter Email</label>
<input class="form-control" type="text" id="city" value="" required><br/>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="contactUpdated();">Update</button>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="phonebook();">Return to Phonebook</button>
</div>`;
    document.getElementById('maindisp').innerHTML=html;
}

function contactDeleted() {
	const html = `<h2>Contact deleted</h2>
<div class="form-group">
	<br>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="phonebook();">Return to Phonebook</button>
</div>`;
    document.getElementById('maindisp').innerHTML=html;
}

function contactSaved() {
	const html = `<h2>Contact Saved</h2>
<div class="form-group">
	<br>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="phonebook();">Return to Phonebook</button>
</div>`;
    document.getElementById('maindisp').innerHTML=html;
}

function contactUpdated() {
	const html = `<h2>Contact Updated</h2>
<div class="form-group">
	<br>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="phonebook();">Return to Phonebook</button>
</div>`;
    document.getElementById('maindisp').innerHTML=html;
}