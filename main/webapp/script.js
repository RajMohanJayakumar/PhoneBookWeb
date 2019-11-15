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

function newContactAdd(){
	var name=document.querySelector('#name').value;
	console.log(name);
	var phone=document.querySelector('#phone').value;
	var email=document.querySelector('#email').value;


}

function phonebook() {
		const html = `<div class="container">
<div class="jumbotron">	
<tbody id="tbody">
<button class="btn btn-primary" onclick="newContact();">Add a new Contact</button>
<table class="table">
<tr>
<thead>
	<th>Name</th>
	<th>Phone Number</th>
	<th>Email</th>
	<th>Update</th>
	<th>Delete</th>
</thead>
</tr>`;
const strh = `</table>
</tbody>
</div>
</div>`;
    var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:8080/manipulate?todo=getAll";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
arr.forEach((e)=>
out += '<tr><td>'+e.name+'</td><td>'+e.phoneNumber+'</td><td>'+e.email+'</td><td><button id="'+e.email+'" value="1" class="upd btn btn-success" onclick="update();">Update</button></td><td><button id="del" value='+e.email+' class="btn btn-danger" onclick="cDelete(\'' + e.email + '\');">Delete</button></td></tr>'
)
    var str = html.concat(out);
    var str = str.concat(strh);
    document.getElementById("maindisp").innerHTML = str;
}
}

function newContact() {
	const html = `<h2>Add Contact</h2>
<div class="form-group">
<label>Enter Name:</label>
<input class="form-control" type="text" id="name" value="" required>
</div>
<div class="form-group">
<label>Enter Phone Number</label>
<input class="form-control" type="number" id="phone" value="" required>
</div>
<div class="form-group">
<label>Enter Email</label>
<input class="form-control" type="text" id="email" value="" required><br/>
<button id="save" type="submit" class="btn btn-lg btn-success" onclick="newContactAdd();">Save</button>
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
    var str = html.concat(out);
    var str = str.concat(strh);
    document.getElementById("maindisp").innerHTML = str;
}

// function newContact() {
// 	const html = `<h2>Add Contact</h2>
// <div class="form-group">
// <label>Enter Name:</label>
// <input class="form-control" type="text" id="id" value="" required>
// </div>
// <div class="form-group">
// <label>Enter Phone Number</label>
// <input class="form-control" type="number" id="name" value="" required>
// </div>
// <div class="form-group">
// <label>Enter Email</label>
// <input class="form-control" type="text" id="city" value="" required><br/>
// <button id="save" type="submit" class="btn btn-lg btn-success" onclick="contactSaved();">Save</button>
// <button id="save" type="submit" class="btn btn-lg btn-success" onclick="phonebook();">Return to Phonebook</button>
// </div>`;
//     document.getElementById('maindisp').innerHTML=html;
// }

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

function cDelete(email){
	    var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:8080/manipulate?email="+email;

xmlhttp.open("DELETE", url, true);
xmlhttp.send();
deleteRow()
}

function deleteRow(){
	if(event.target.classList('btn-danger')){
		event.target.closest('tr').remove();
	}
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