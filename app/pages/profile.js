 module.exports = function(obj,callback,actif,helpers) {
   ///plugin
   /* global Media: false */
 
console.log(" play deja")

   //and plug
  actif = false
var MARGIN = 12;

var trayHeight;
var trayState = "up";
var dragOffset;

//الكومبوزيت الرئيسي يطبق عليه تأثير الضل 
var trayHome = new tabris.Composite({
  layoutData: {left: 0, right: 0, top: 0, bottom: 0},
  background: "red",
  opacity: 0
}).appendTo(obj);

var tray = new tabris.Composite({
  layoutData: {left: 0, right: 0, top: -300,height:900},
  background: "#369" 
}).on("pan:vertical", panVertical).appendTo(obj);

//هذا كومبوزيت الكادر 
var cadr0 = new tabris.Composite({
  layoutData: {left: 0, right: 0, top:0, bottom: 0},
  background: "#fff" //
}).on("pan:vertical", panVertical).appendTo(tray);

var cadr1 = new tabris.Composite({ 
 layoutData: {left: 0, right: 0, top:[cadr1, 0], bottom: "60%"},
  background: "#369" 
})
//نضيف ليه هذا باش ليه قيمة الصعود و نزل
.on("pan:vertical", panVertical)
.appendTo(tray);

//هذا مربع الايقونة
var cadr1Icon = new tabris.ImageView({
  layoutData: {left: MARGIN, right: MARGIN ,bottom:-60},
 image:{src:"./app/images/notif.png"}
}).appendTo(cadr1);

//هذا الكادر هوا الوادهو
var cadr2 = new tabris.Composite({
  layoutData: {left: 0, right: 0, top: [cadr1, 0], bottom: 30},
  background: "#c9c9c9" //
}).on("pan:vertical", panVertical).appendTo(tray);
//
var cadr3 = new tabris.Composite({
  layoutData: {left: 0, right: 0, top: [cadr2, 0], bottom: 20},
  background: "#ff0" //
}).on("pan:vertical", panVertical).appendTo(tray);

/*
 
*/
callback(cadr2);
//notif.appendTo(cadr2);

cadr2.on("resize", function() {
  

  var bounds = trayHome.get("bounds");//cadr0.get("bounds");

  trayHeight =  bounds.height ;
console.error(trayHeight); 
return;
  if(trayState === "dragging") {
    positionTrayInRestingState(2000);
  } else {
    tray.set("transform", {translationY: trayHeight});
  }
});
//


//
cadr1.on("pan:vertical",panVertical);



 function openNotif() {
   console.error("openNotif")
 
  if (trayState === "up" || trayState === "down") {
    positionTrayInRestingState(trayState === "down" ? -1000 : 1000);
  }
}
if(actif)openNotif();
cadr1.on("tap",openNotif);

function positionTrayInRestingState(velocity) {
  trayState = "animating";
  var translationY = velocity > 0 ? trayHeight : 0;
  var options = {
    duration: Math.min(Math.abs(trayHeight / velocity * 1000), 800),
    easing: Math.abs(velocity) >= 1000 ? "ease-out" : "ease-in-out"
  };
  trayHome.animate({opacity: gettrayHomeOpacity(translationY)}, options);
  cadr1Icon.animate({transform: getcadr1IconTransform(translationY)}, options);

  tray.once("animationend", function() {
    trayState = velocity > 0 ? "down" : "up";
  }).animate({
    transform: {translationY: translationY}
    
  }, options);
}

function gettrayHomeOpacity(translationY) {
  var traveled = translationY / trayHeight;
  return Math.max(0, 0.75 - traveled);
}

function getcadr1IconTransform(translationY) {
  var traveled = translationY / trayHeight;
  return {rotation: traveled * Math.PI - Math.PI};
}
//openNotif();
//wino panVertical
function panVertical(widget, event) {
  if (event.state === "start" && (trayState === "up" || trayState === "down")) {
    trayState = "dragging";
    dragOffset = tray.get("transform").translationY - event.translation.y;
  }
  if (trayState === "dragging") {
    var offsetY = Math.min(Math.max(event.translation.y + dragOffset, 0), trayHeight);
    tray.set("transform", {translationY: offsetY});
    trayHome.set("opacity", gettrayHomeOpacity(offsetY));
    cadr1Icon.set("transform", getcadr1IconTransform(offsetY));
  }
  if (event.state === "end" && trayState === "dragging") {
    positionTrayInRestingState(event.velocity.y);
  }
}

//*/
}//*/