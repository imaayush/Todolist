var Mytable = function(tableId){
  this.tableId=$('#'+tableId)[0];
  this.rowCount=this.tableId.rows.length;
  this.rowCreate=function(){
    this.row=this.tableId.insertRow(this.rowCount);
  }
  this.cellCreate=function(dataOfCell,cellNumber){
    this.cell1 = this.row.insertCell(cellNumber);
    this.cell1.innerHTML=dataOfCell
  }
  this.cellEdit=function(dataoFCell,row1){
    row1.cells[0].innerHTML=dataoFCell;
	
  }
  this.changeColor=function(color1,row1){
    row1.cells[0].style.color=color1;	  
  }
}
function edit1(src)
{
  var todotable = new Mytable('ToDoListTable');
  var oRow = src.parentElement.parentElement; 
  var row1 = todotable.tableId.rows[oRow.rowIndex];
  var oldtask= row1.cells[0].childNodes[0].nodeValue;
  var dataoFCell="<input  type='text' class='form-control' id='myt' name='ts' ><br> <input  type='button' class='btn btn-primary' value='save' onclick='save1(this);' />";
  todotable.cellEdit(dataoFCell,row1);
  $('#myt').attr('value',oldtask);
    
   
}
function save1(src)
{
  var newtask=$('#myt')[0].value;
  var sherlocked = Sherlock.parse(newtask);
  var title = sherlocked.eventTitle;    // 'Homework 5 due'
  var startDate = sherlocked.startDate; // Date object pointing to next monday at 3pm
  var endDate = sherlocked.endDate;
  var newtime = new  Date().getTime();
 
  var validated = sherlocked.validated;
  if(title==''||title==null)
  {
    alert("Invalid input ");
	return false;
  }
  if(validated=='')
  {
    alert("Invalid input");
	return false;	
  }
  var todotable = new Mytable('ToDoListTable');
  var oRow = src.parentElement.parentElement; 
  var row1 = todotable.tableId.rows[oRow.rowIndex];
  dataoFCell =title+"<br>Starts :"+startDate+"<br>Ends :"+endDate+"<br><input type='button' class='btn btn-primary'value='Task Completed' onclick='status_change(this);'>";
  todotable.cellEdit(dataoFCell,row1);

}
function addList() 
{ 
  var todotable = new Mytable('ToDoListTable');
  todotable.rowCreate();
  var task1=$('#mytask')[0].value;
  var sherlocked = Sherlock.parse(task1);
  var title = sherlocked.eventTitle;    // 'Homework 5 due'
  var startDate = sherlocked.startDate; // Date object pointing to next monday at 3pm
  var endDate = sherlocked.endDate;
  var validated = sherlocked.validated;
  var newtime = new  Date().getTime();
  if(title==''||title==null)
  {
    alert("Invalid input ");
	return false;
  }
  if(validated=='')
  {
    alert("Invalid input ");
	return false;
  }
  var celldata1=title+"<br>Starts :"+startDate+"<br>Ends :"+endDate+"<br><input type='button' class='btn btn-primary'value='Task Completed' onclick='status_change(this);'>";
  todotable.cellCreate(celldata1,0);
  
  var celldata2 = "<input type='button' class='btn btn-primary' value='Edit' onclick='edit1(this);'>";
  todotable.cellCreate(celldata2,1);
    
  var celldata3 = "<input type='button' class='btn btn-primary'value='Delete' onclick='deleteRow(this);'>";
  todotable.cellCreate(celldata3,2);
  $('#mytask').val("");
  $('#duedate').val("");
	
}
function deleteRow(src)
{
  var todotable = new Mytable('ToDoListTable');
  var oRow = src.parentElement.parentElement; 
  todotable.tableId.deleteRow(oRow.rowIndex);
}

function filter(src)
{ 
  var one = $('#filter_one')[0];
  var two = $('#filter_two')[0];
  var todotable = new Mytable('ToDoListTable');
  var newtime = new  Date().getTime();
  for(var i=0; i<todotable.rowCount; i++)
  { 
    var duetime =null;
    var row1 = todotable.tableId.rows[i];
    duetime = row1.cells[0].childNodes[2].nodeValue;
    //alert(duetime);
    if(duetime.localeCompare("Starts :null")==1)
    { 
      var sherlocked = Sherlock.parse(duetime);
      var startTime = sherlocked.startDate;
	  var end_of_today = new Date();
	  end_of_today.setHours(23,59,59,999);
	  var beginning_of_today = new Date();
	  beginning_of_today.setHours(0,0,0,0);
	  ;
	  if(startTime.getTime()>=beginning_of_today.getTime()&&startTime.getTime()<=end_of_today.getTime()&&one.checked)
	  { 
        todotable.changeColor('red',row1);
	  }else if(startTime.getTime()>=beginning_of_today.getTime()&&startTime.getTime()<=end_of_today.getTime()&&!one.checked)
	  { 
        todotable.changeColor('black',row1);
	  }
	  var end_of_tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      end_of_tomorrow.setHours(23,59,59,999);
      var beginning_of_tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	  beginning_of_tomorrow.setHours(0,0,0,0)
	  if(startTime.getTime()>=beginning_of_tomorrow.getTime()&&startTime.getTime()<=end_of_tomorrow.getTime()&&two.checked)
	  {
	    todotable.changeColor('blue',row1);
	  }else if(startTime.getTime()>=beginning_of_tomorrow.getTime()&&startTime.getTime()<=end_of_tomorrow.getTime()&&!two.checked)
	  {
	    row1.cells[0].style.color = 'black';
	  }
    }	
		 
  }
  
  
  
}
function status_change(src)
{
  var todotable = new Mytable('ToDoListTable');
  var oRow = src.parentElement.parentElement; 
  var row1 = todotable.tableId.rows[oRow.rowIndex];
  var title1= row1.cells[0].childNodes[0].nodeValue;
  todotable.tableId.deleteRow(oRow.rowIndex);
  
  var complteTable=new Mytable('CompleteTask');
  complteTable.rowCreate();
  var newtime = new  Date();
  var data=title1+"<br>Completed on :" + newtime;
  complteTable.cellCreate(data,0);
}
