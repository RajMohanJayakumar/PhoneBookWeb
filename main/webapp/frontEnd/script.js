// // var request
// // function myFunc(id)
// // {   
// // 	if(id == "username")
// // 	{
// // 		var num = 1
// // 	}else
// // 	{
// // 		var num = 2	
// // 	}
// // 	request = new XMLHttpRequest();
// // 	var enteredValue = document.getElementById(id).value
// // 	var url = "http://localhost:8080/manipulate?todo=getAll"
// // 	try{
// // 		request.onreadystatechange = function()
// // 		{
// // 			if(request.readyState == 4)
// // 				{
// // 				 var current = document.getElementById("demo").innerHTML = request.responseText;
// // 				 document.getElementById(id).focus();
// // 				}
// // 		}
// // 		request.open("GET",url,true);
// // 		request.send()
// // 	}catch(e)
// // 	{
// // 		alert("Unabe to Reach Server");
// // 	}
// // }

// // const Http = new XMLHttpRequest();
// // const url='http://localhost:8080/manipulate?todo=getAll';
// // Http.open("GET", url);
// // Http.send();

// // Http.onreadystatechange = (e) => {
// //   console.log(Http.responseText)
// // }
// function showall(){
// 	cconst Http = new XMLHttpRequest();
// const url='http://localhost:8080/manipulate?todo=getAll';
// Http.open('GET', url);
// Http.send();

// Http.onreadystatechange = (e) => {
//   console.log(Http.responseText)
// }
// }

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
	const html = "<h1>Hello World</h1>";
// 	"<button id='"'addf'"' class='"'btn btn-primary'"'>Add Contact</button><table class='"'table'"'<tr><thead>"+
// 	"<th>Name</th>"+
// 	"<th>Phone Number</th>"+
// 	"<th>Email</th>"+
// 	"<th>Update</th>"+
// 	"<th>Delete</th>"+
// "</thead>"+
// "</tr>"+
// "</table>";
     document.getElementById("maindisp").innerHTML=html;
}

function addRow() {
  const div = document.createElement('div');

  div.id = 'maindisp';

  div.innerHTML = `
    <input type="text" name="name" value="" />
    <input type="text" name="value" value="" />
    <label> 
      <input type="checkbox" name="check" value="1" /> Checked? 
    </label>
    <input type="button" value="-" onclick="removeRow(this)" />
  `;

  document.getElementById('maindisp').appendChild(div);
}
