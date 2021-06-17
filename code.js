var elementD = document.getElementById('d')
var elementH = document.getElementById('h')
var elementM = document.getElementById('m')
var elementS = document.getElementById('s')
var elementTitle = document.getElementById('title')
var elementInfo = document.getElementById('info')
var elementoSettings = document.getElementById('settings')
var elementoDate = document.getElementById('date')
var elementoTime = document.getElementById('time')
var elementoModify = document.getElementById('modify')
var secondInMS = 1000
var minuteInMS = secondInMS * 60
var hourInMS = minuteInMS * 60
var dayInMS = hourInMS * 24

//1624125600000


function main(){
  var data = decodeUrlData(location.hash)
  if(data.time){
    showTime(getLeftTimeDetail(data.time - Date.now()))
  }
  if(window.editmode || !data.time){
    enableEdit()
  }else{
    disableEdit()
  }
  showTitleAndInfo(data.title, data.info)
}

window.addEventListener('hashchange',main)
elementoModify.addEventListener('click', function(){
  enableEdit()
  window.editmode = true
})
setInterval(function () {
  main()
}, 1000)
main()


function enableEdit(time) {
  elementInfo.className = 'editmode'
  elementTitle.className = 'editmode'
  elementInfo.placeholder = 'Descripción'
  elementTitle.placeholder = 'Título'
  elementTitle.disabled = false
  elementInfo.disabled = false

  elementoModify.className = 'editmode'

  elementoSettings.className = 'editmode'

  var date = new Date(time || Date.now())
  var datestr = date.toISOString().split('T')[0];
  var timestr = date.toLocaleTimeString()
  elementoDate.value = elementoDate.value || datestr
  elementoTime.value = elementoTime.value || timestr

  document.getElementById('start').onclick = function(){
    if(!elementoDate.value || !elementoTime.value) return;
    var newdate = new Date(elementoDate.value+' '+elementoTime.value)
    window.editmode = false
    disableEdit()
    location.hash = encodeUrlData({
      time: newdate.getTime(),
      title: elementTitle.value,
      info: elementInfo.value,
    })
  }
}

function disableEdit() {
  elementTitle.disabled = true
  elementInfo.disabled = true
  elementInfo.className = ''
  elementInfo.placeholder = ''
  elementTitle.className = ''
  elementTitle.placeholder = ''

  elementoModify.className = ''

  elementoSettings.className = ''
}

function decodeUrlData(url) {
  var arr = (url+'#').split('#')[1].split('|')
  var time = parseInt(arr[0])
  var title = decodeTitle(arr[1] || '')
  var info = decodeTitle(arr[2] || '')
  return {time,title,info}
}

function encodeUrlData(data) {
  return data.time+'|'+encodeTitle(data.title)+'|'+encodeTitle(data.info)
}

function getLeftMS() {
  // new Date("2021-6-19 15:00:00") - Date.now())
}

function getLeftTimeDetail(_time){
  var time = Math.abs(_time)
  var days = Math.floor(time / dayInMS)
  var hours = Math.floor((time % dayInMS)/hourInMS)
  var minutes = Math.floor((time % hourInMS)/minuteInMS)
  var seconds = Math.floor((time % minuteInMS)/secondInMS)
  if(_time != time){
    return {
      days:-days,
      hours:-hours,
      minutes:-minutes,
      seconds:-seconds,
    }
  }
  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

function showTitleAndInfo(title, info) {
  elementTitle.innerText = title || ''
  elementInfo.innerText = info || ''
}

function showTime(leftTime) {
  elementD.innerHTML = leftTime.days
  elementH.innerHTML = leftTime.hours
  elementM.innerHTML = leftTime.minutes
  elementS.innerHTML = leftTime.seconds
}

var encodedA_TILDE = encodeURIComponent("á")
var encodedE_TILDE = encodeURIComponent("é")
var encodedI_TILDE = encodeURIComponent("í")
var encodedO_TILDE = encodeURIComponent("ó")
var encodedU_TILDE = encodeURIComponent("ú")

function encodeTitle(title){
  return encodeURIComponent(title)
  .replace(/\%20/gi,'+')
  .replace(RegExp(encodedA_TILDE, 'gi'),'á')
  .replace(RegExp(encodedE_TILDE, 'gi'),'é')
  .replace(RegExp(encodedI_TILDE, 'gi'),'í')
  .replace(RegExp(encodedO_TILDE, 'gi'),'ó')
  .replace(RegExp(encodedU_TILDE, 'gi'),'ú')
}

function decodeTitle(title){
  return decodeURIComponent(title.replace(/\+/gi,'%20'))
}
