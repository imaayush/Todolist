function edit1(src)
{
	var table = $('#ToDoListTable')[0];
    var oRow = src.parentElement.parentElement; 
    var row = table.rows[oRow.rowIndex];
    var old1= row.cells[0].childNodes[0].nodeValue;
    var oldd1=row.cells[0].childNodes[2].nodeValue;
    var tc=oldd1.split("Deadline :");
    // alert(tc[1]);
    row.cells[0].innerHTML="<input  type='text' class='form-control'  id='myt' name='ts' > <br><input class='form-control' type='text' id='myd' > <br> <input  type='button' class='btn btn-primary' value='save' onclick='save1(this);' />";
    $('#myt').attr('value',old1);
    $('#myd').attr('value',tc[1]);
   
}
function save1(src)
{
    var m1=$('#myt')[0].value;
	var m2=$('#myd')[0].value;
	if(m1==null||m1==""){
		alert("Enter Task");
		return false;}
	if(m2==null||m2==""){
		alert("Enter Due Date");
		return false;}
	var table = $('#ToDoListTable')[0];
    var oRow = src.parentElement.parentElement; 
    var row = table.rows[oRow.rowIndex];
    row.cells[0].innerHTML =m1+"<br>Deadline : "+m2;
}
function addList(myTable) 
{
    var table = $('#ToDoListTable')[0];
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
	var task1=$('#mytask')[0].value;
    var date1="Deadline : "+$('#duedate')[0].value;
    var te =$('#duedate')[0].value;
			
	if(task1==null||task1==""){
		alert("Enter Task");
		return false;}
	if(te==null||te==""){
		alert("Enter Due Date");
		return false;}
			
    var cell1 = row.insertCell(0); 
		;
         var element1 = document.createTextNode(task1);
         cell1.appendChild(element1);
		 var linebreak = document.createElement('br');
		 cell1.appendChild(linebreak);
		 var c = document.createTextNode(date1);
		 cell1.appendChild(c);

    var cell2 = row.insertCell(1);
       
         cell2.innerHTML="<input type='button' class='btn btn-primary' value='Edit' onclick='edit1(this);'>";
    var cell3 = row.insertCell(2);
         
        cell3.innerHTML="<input type='button' class='btn btn-primary'value='Delete' onclick='delete1(this);'>";
    $('#mytask').val("");
	$('#duedate').val("");
	
}
function delete1(src){
//alert(src.value);
var table = $('#ToDoListTable')[0];
var oRow = src.parentElement.parentElement; 
table.deleteRow(oRow.rowIndex);
}