export function dateFormat(date) {

  let newDate = new Date(date)

  let year = newDate.getFullYear()

  let month = (newDate.getMonth() + 1) 

  month = month < 10 ? '0' + month : month

  let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()

  let hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()

  let minues = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()

  let seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds()

  return `${year}-${month}-${day} ${hour}:${minues}:${seconds}`

} 


export function getDay(day) {
  var today = new Date();

  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}

function doHandleMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}