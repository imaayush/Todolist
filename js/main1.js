function edit1(src)
{
  var table = $('#ToDoListTable')[0];
  var oRow = src.parentElement.parentElement; 
  var row = table.rows[oRow.rowIndex];
  var oldtask= row.cells[0].childNodes[0].nodeValue;
  row.cells[0].innerHTML="<input  type='text' class='form-control' id='myt' name='ts' ><br> <input  type='button' class='btn btn-primary' value='save' onclick='save1(this);' />";
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
  var table = $('#ToDoListTable')[0];
  var oRow = src.parentElement.parentElement; 
  var row = table.rows[oRow.rowIndex];
  row.cells[0].innerHTML=title+"<br>Starts :"+startDate+"<br>Ends :"+endDate+"<br><input type='button' class='btn btn-primary'value='Task Completed' onclick='status_change(this);'>";
 

}
function addList() 
{
  var table = $('#ToDoListTable')[0];
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  var task1=$('#mytask')[0].value;
  var sherlocked = Sherlock.parse(task1);
  var title = sherlocked.eventTitle;    // 'Homework 5 due'
  var startDate = sherlocked.startDate; // Date object pointing to next monday at 3pm
  var endDate = sherlocked.endDate;
  var validated = sherlocked.validated;
  var newtime = new  Date().getTime();
  
  //alert(lefttime);
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
 
  
  var cell1 = row.insertCell(0);
  cell1.innerHTML=title+"<br>Starts :"+startDate+"<br>Ends :"+endDate+"<br><input type='button' class='btn btn-primary'value='Task Completed' onclick='status_change(this);'>";
  
  var cell2 = row.insertCell(1);
  cell2.innerHTML="<input type='button' class='btn btn-primary' value='Edit' onclick='edit1(this);'>";
    
  var cell3 = row.insertCell(2);
  cell3.innerHTML="<input type='button' class='btn btn-primary'value='Delete' onclick='delete1(this);'>";
  $('#mytask').val("");
  $('#duedate').val("");
	
}
function delete1(src)
{
  var table = $('#ToDoListTable')[0];
  var oRow = src.parentElement.parentElement; 
  table.deleteRow(oRow.rowIndex);
}

function filter(src)
{ 
  var one = $('#filter_one')[0];
  var two = $('#filter_two')[0];
  var table = $('#ToDoListTable')[0];
  var newtime = new  Date().getTime();
  var rowCount = table.rows.length;
  
  if (one.checked==true) 
  {          
    for(var i=0; i<rowCount; i++)
	{ var duetime =null;
      var row = table.rows[i];
      duetime = row.cells[0].childNodes[2].nodeValue;
      //alert(duetime);
      if(duetime.localeCompare("Starts :null")==1)
      { 
        var sherlocked = Sherlock.parse(duetime);
        var startTime = sherlocked.startDate;
	    var lefttime= startTime.getTime()-newtime;
        lefttime=lefttime/(60*60*1000);
	    if(lefttime>-24 ||lefttime<24)
	    {
	      row.cells[0].style.color = 'red';
	    }else
	    {
	      //row.style.visibility ='hidden';
	    }
      }	
		 
	}
  }else if(one.checked==false)
  {
    for(var i=0; i<rowCount; i++)
	{
	  var row = table.rows[i];
	  var duetime = row.cells[0].childNodes[2].nodeValue;
	  if(duetime.localeCompare("Starts :null")==1 )
      { 
        var sherlocked = Sherlock.parse(duetime);
		var startTime = sherlocked.startDate;
	    var lefttime= startTime.getTime()-newtime;
        lefttime=lefttime/(60*60*1000);
	    if(lefttime>-24||lefttime<24)
		{
		  row.cells[0].style.color = 'black';
		}else
		{
		  //row.style.visibility ='hidden';		 
	    }
      }	
		 
	}
  }	
  if (two.checked==true) 
  {          
    for(var i=0; i<rowCount; i++)
	{
      var row = table.rows[i];
      var duetime = row.cells[0].childNodes[2].nodeValue;
      if(duetime.localeCompare("Starts :null")==1 )
      { 
        var sherlocked = Sherlock.parse(duetime);
	    var startTime = sherlocked.startDate;
	    var lefttime= startTime.getTime()-newtime;
        lefttime=lefttime/(60*60*1000);
	    if(lefttime<48&&lefttime>24)
	    {
	      row.cells[0].style.color = 'blue';
	    }else
	    {
		  //row.style.visibility ='hidden';	 
	    }
      }	
		 
	}
  }else if(two.checked==false)
  {
    for(var i=0; i<rowCount; i++)
	{
	  var row = table.rows[i];
	  var duetime = row.cells[0].childNodes[2].nodeValue;
	  if(duetime.localeCompare("Starts :null")==1 )
      { 
        var sherlocked = Sherlock.parse(duetime);
		var startTime = sherlocked.startDate;
	    var lefttime= startTime.getTime()-newtime;
        lefttime=lefttime/(60*60*1000);
	    if(lefttime<48&&lefttime>24)
		{
	      row.cells[0].style.color = 'black';
	    }else
		{
		  //row.style.visibility ='hidden';
				 
		}
       }	
		 
	}
  }
}
function status_change(src)
{
  var table = $('#ToDoListTable')[0];
  var oRow = src.parentElement.parentElement; 
  var row = table.rows[oRow.rowIndex];
  var title1= row.cells[0].childNodes[0].nodeValue;
  table.deleteRow(oRow.rowIndex);
  var table1 = $('#CompleteTask')[0];
  var rowCount1 = table1.rows.length;
  var row1 = table1.insertRow(rowCount1);
  var cell1 = row1.insertCell(0);
  var newtime = new  Date();
  cell1.innerHTML=title1+"<br>Completed on :" + newtime;
}
