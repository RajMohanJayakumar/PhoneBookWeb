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

// deleteRec('r@g');

  function deleteRec(email,callBack){
	  axios.delete('http://localhost:8080/manipulate?email='+email,{})
	  .then(res => callBack());
}

function updateRec(email1,name,email,phone,callBack){
	axios.delete('http://localhost:8080/manipulate?email='+email1,{})
	.then(res => callBack(name,email,phone));
}

function saveRec(name,email,phone){
	axios.post('http://localhost:8080/manipulate',{
		name : name,
		phoneNumber : phone,
		email : email
	});
	phonebook();
}



function newContactAdd(){
	hideSections(sections);
	document.getElementById('newContact').style.display = 'block';
}


function newContact() {
	hideSections(sections);
	document.getElementById('newContact').style.display = 'block';
}

function update(email) {
	hideSections(sections);
	document.getElementById('update').style.display = 'block';
}

function contactDeleted() {
	hideSections(sections);
	document.getElementById('contactDeleted').style.display = 'block';
}

function saveContact(){
	call('http://localhost:8080/manipulate',new payLoad('post',new data('Ram',8667,'ram@gmail.com'),null),phoneBookDisp);
	contactSaved();
}

function contactSaved() {
	hideSections(sections);
	document.getElementById('contactSaved').style.display = 'block';
	
}
function contactUpdated() {
	hideSections(sections);
	document.getElementById('contactUpdated').style.display = 'block';
}
function phonebook() {
	hideSections(sections);	
	document.getElementById('phoneBook').style.display = 'block';
	call('http://localhost:8080/manipulate?todo=getAll',new payLoad('get','null','null'),phoneBookDisp);
	}

function phoneBookDisp(res) {

	var tbody1 = document.createElement('tbody');
	res.data.forEach((e)=>{

	var tr = document.createElement('tr');
	var td1 = document.createElement("td");
	var data = document.createTextNode(e.name);
	td1.setAttribute('class','name');
	td1.appendChild(data);
	tr.append(td1);

	var td2 = document.createElement("td");
	var data = document.createTextNode(e.phoneNumber);
	td2.setAttribute('class','phoneNumber');
	td2.appendChild(data);
	tr.append(td2);

	var td3 = document.createElement("td");
	var data = document.createTextNode(e.email);
	td3.setAttribute('class','email');
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

	handleEvents();
}

function handleEvents(){
	var deleteBtn = document.querySelectorAll('.btn-danger');
	var updateBtn = document.querySelectorAll('.btn-success');
	deleteBtn.forEach(btn=>{
		btn.addEventListener('click', function(event){
			event.preventDefault();
			var email = event.target.closest('tr').querySelector('.email').innerText;
			deleteRec(email);
		})
	})

	updateBtn.forEach(btn=>{
		btn.addEventListener('click', function(event){
			event.preventDefault();
			var phoneNumber = event.target.closest('tr').querySelector('.phoneNumber').innerText;
			var name = event.target.closest('tr').querySelector('.name').innerText;
			var email = event.target.closest('tr').querySelector('.email').innerText;
			console.log(email);
			update(email);
		})
	})
}

var call = function(url,payLoad,callBack){
	axios({
  	method : payLoad.method,
  	url : url,
  	data : payLoad.params
  })
  .then(res => callBack(res))
  .catch(err => console.log(err));
}

var payLoad = function(method,data,params){
	this.method = method;
	this.data = data;
	this.params = params;
}

var data = function(name,phoneNumber,email){
	this.name = name;
	this.phoneNumber = phoneNumber;
	this.email = email;
}

var params = function(email){
	this.email = email;
}