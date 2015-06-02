function convert_In_Utc()
{
  var mytime = new Date();
  var difference = mytime.getTimezoneOffset();	
  mytime.setHours(mytime.getHours() + parseInt((difference/60)));
  mytime.setMinutes(mytime.getMinutes() + difference%60);
  document.write(mytime.toLocaleString());
}