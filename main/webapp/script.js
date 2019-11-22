window.onload = function() {
  phonebook();
};

let sections = document.querySelectorAll('.sections')
function hideSections (sections){
sections.forEach(function(userItem) {
  userItem.style.display = 'none';
});
}

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
	hideSections(sections);
	// document.getElementsByClassName('sections').style.display = 'none';
		// document.getElementById('phoneBook').style.display = 'none';
	document.getElementById('newContact').style.display = 'block';
	// document.getElementById('update').style.display = 'none';
	// document.getElementById('contactDeleted').style.display = 'none';
	// document.getElementById('contactSaved').style.display = 'none';
	// document.getElementById('contactUpdated').style.display = 'none';
	// var name=document.querySelector('#name').value;
	// console.log(name);
	// var phone=document.querySelector('#phone').value;
	// var email=document.querySelector('#email').value;
}


function newContact() {
	hideSections(sections);
	// document.getElementsByClassName('sections').style.display = 'none';
	// 	var phoneBookElm = document.getElementById('phoneBook').style.display = 'none';
	// if(phoneBookElm){
	// 	phoneBookElm.style.display = 'none';
	// }
	// document.getElementsByClassName('sections').style.display = 'none';
	document.getElementById('newContact').style.display = 'block';
	// document.getElementById('update').style.display = 'none';
	// document.getElementById('contactDeleted').style.display = 'none';
	// document.getElementById('contactSaved').style.display = 'none';
	// document.getElementById('contactUpdated').style.display = 'none';
}

function update() {
	hideSections(sections);
	// document.getElementsByClassName('sections').style.display = 'none';
	// document.getElementById('phoneBook').style.display = 'none';
	// document.getElementById('newContact').style.display = 'none';
	document.getElementById('update').style.display = 'block';
	// document.getElementById('contactDeleted').style.display = 'none';
	// document.getElementById('contactSaved').style.display = 'none';
	// document.getElementById('contactUpdated').style.display = 'none';
}

function contactDeleted() {
	hideSections(sections);
	// document.getElementsByClassName('sections').style.display = 'none';
	// document.getElementById('phoneBook').style.display = 'none';
	// document.getElementById('newContact').style.display = 'none';
	// document.getElementById('update').style.display = 'none';
	document.getElementById('contactDeleted').style.display = 'block';
	// document.getElementById('contactSaved').style.display = 'none';
	// document.getElementById('contactUpdated').style.display = 'none';
}

function cDelete(email){
	    var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:8080/manipulate?email="+email;

xmlhttp.open("DELETE", url, true);
xmlhttp.send();
deleteRow()
}


function contactSaved() {
	hideSections(sections);
	// document.querySelectorAll('.sections')
	// document.getElementById('phoneBook').style.display = 'none';
	// document.getElementById('newContact').style.display = 'none';
	// document.getElementById('update').style.display = 'none';
	// document.getElementById('contactDeleted').style.display = 'none';
	// document.getElementById('contactUpdated').style.display = 'none';
	document.getElementById('contactSaved').style.display = 'block';
	
}
function contactUpdated() {
	hideSections(sections);
	// document.querySelectorAll('.sections').style.display = 'none';
	// document.getElementById('phoneBook').style.display = 'none';
	// document.getElementById('newContact').style.display = 'none';
	// document.getElementById('update').style.display = 'none';
	// document.getElementById('contactDeleted').style.display = 'none';
	// document.getElementById('contactSaved').style.display = 'none';
	document.getElementById('contactUpdated').style.display = 'block';
}
function phonebook() {
	// document.location.reload();
	hideSections(sections);	
	// document.getElementById('save').closest().style.display = 'none';
	// document.getElementById('newContact').style.display = 'none';
	// document.getElementById('update').style.display = 'none';
	// document.getElementById('contactDeleted').style.display = 'none';
	// document.getElementById('contactSaved').style.display = 'none';
	// document.getElementById('contactUpdated').style.display = 'none';
	document.getElementById('phoneBook').style.display = 'block';
	
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
	var tbody1 = document.createElement('tbody');
arr.forEach((e)=>{
	var tr = document.createElement('tr');
	var td1 = document.createElement("td");
	var data = document.createTextNode(e.name);
	td1.appendChild(data);
	tr.append(td1);
	var td2 = document.createElement("td");
	var data = document.createTextNode(e.phoneNumber);
	td2.appendChild(data);
	tr.append(td2);
	var td3 = document.createElement("td");
	var data = document.createTextNode(e.email);
	td3.appendChild(data);
	tr.append(td3);

	var td4 = document.createElement("td");
	var btn1 = document.createElement("BUTTON");
	btn1.innerText = "Update";
	btn1.setAttribute('class','btn btn-success')
	td4.appendChild(btn1);
	tr.append(td4);

	var td5 = document.createElement("td");
	var btn2 = document.createElement("BUTTON");
	btn2.innerText = "Delete";
	btn2.setAttribute('class','btn btn-danger');
	td5.appendChild(btn2);
	tr.append(td5);
	tbody1.append(tr);

})	
	document.getElementById('pTable').innerText = '';
	document.getElementById("pTable").appendChild(tbody1);
}
}