module.exports = function (obj, callback, actif, helpers) {

  actif = false
  var MARGIN = 12;

  var trayHeight;
  var trayState = "down";
  var dragOffset;

  var shade = new tabris.Composite({
    layoutData: { left: 0, right: 0, top: 0, bottom: 0 },
    background: "#000",
    opacity: 0
  }).appendTo(obj);

  var tray = new tabris.Composite({
    layoutData: { left: 0, right: 0, top: "10%", bottom: 0 }
  }).on("pan:vertical", panVertical).appendTo(obj); //

  var strap = new tabris.Composite({
    id:"strap",
    background: "rgba(0,0,0,0.8)",
    layoutData: {
    top: 0,
    centerX:0,
    width:50,
    height:65
    },
    cornerRadius: 25
  }).appendTo(tray);

  var strapIcon = new tabris.ImageView({
    //layoutData: { left: MARGIN, right: MARGIN, bottom: -60 },
    image: { src: './app/images/icons/wheel.png' },
    layoutData: {
      top: 10,
      width: 24,
      height: 24,
      centerX:0
    },
    tintColor: "#ddd"
  }).appendTo(strap);

  var trayContent = new tabris.Composite({
    id:"trayContent"
  }).on("pan:vertical", panVertical);

  var trayTitle = new tabris.Composite({
    layoutData: { left: 0, right: 0, top: 0,height:35},
     background: "rgba(0,0,0,0.8)"
  });
  var trayTitleTxt = new tabris.TextView({
    id:"trayTitleTxt",
  }).appendTo(trayTitle);;
  trayTitle.appendTo(trayContent);
  trayContent.appendTo(tray);

  /*
   
  */
  var notify = new tabris.TextView({
    layoutData: { left: 20, top: 50 },
    font: "bold 16px",
    textColor: "#656465"
  }).appendTo(trayContent);
  //callback(trayContent); //wino

  //notif.appendTo(trayContent);
  trayContent.on("resize", function () {
     shade.set("background","rgba(0,0,0,0.5)")
    // background: "rgba(0,0,0,0.8)",
    var bounds = trayContent.get("bounds");
    trayHeight = bounds.height;
    if (trayState === "dragging") {
      positionTrayInRestingState(2000);
    } else {
      tray.set("transform", { translationY: trayHeight });
    }
  });

  strap.on("pan:vertical", panVertical);

  function openNotif() {
    // console.error("openNotif")

    if (trayState === "up" || trayState === "down") {
      positionTrayInRestingState(trayState === "down" ? -1000 : 1000);
    }
  }
  if (actif) openNotif();
  strap.on("tap", openNotif);

  function positionTrayInRestingState(velocity) {
    trayState = "animating";
    var translationY = velocity > 0 ? trayHeight : 0;
    var options = {
      duration: Math.min(Math.abs(trayHeight / velocity * 1000), 800),
      easing: Math.abs(velocity) >= 1000 ? "ease-out" : "ease-in-out"
    };
    shade.animate({ opacity: getShadeOpacity(translationY) }, options);
    strapIcon.animate({ transform: getStrapIconTransform(translationY) }, options);

    tray.once("animationend", function () {
      trayState = velocity > 0 ? "down" : "up";
    }).animate({
      transform: { translationY: translationY }

    }, options);
  }

  function getShadeOpacity(translationY) {
    var traveled = translationY / trayHeight;
    return Math.max(0, 0.75 - traveled);
  }

  function getStrapIconTransform(translationY) {
    var traveled = translationY / trayHeight;
    return { rotation: traveled * Math.PI - Math.PI };
  }
  //pan vertical
  function panVertical(widget, event) {
    if (event.state === "start" && (trayState === "up" || trayState === "down")) {
      trayState = "dragging";
      dragOffset = tray.get("transform").translationY - event.translation.y;
    }
    if (trayState === "dragging") {
      var offsetY = Math.min(Math.max(event.translation.y + dragOffset, 0), trayHeight);
      tray.set("transform", { translationY: offsetY });
      shade.set("opacity", getShadeOpacity(offsetY));
      strapIcon.set("transform", getStrapIconTransform(offsetY));
    }
    if (event.state === "end" && trayState === "dragging") {
      positionTrayInRestingState(event.velocity.y);
    }
  }
  //openNotif();
  //add wino time notife 8
  ///
  ///---------------------
  var s = 0;
  var url_notif = "http://tabris-zizwar.c9users.io/ping";
  console.log("___")
  //if cleare : clear time interval
  //
  var getPing = function (url_notif) {
    return fetch(url_notif).then(function (response) {
      //  console.log(response.text())                   
      return response.json();
    });
  }
  //

  var interval = setInterval(function () {
    getPing(url_notif).then(function (json) {
      console.log(json.ping);
      console.log(json.obj);
      if (json.ping == "on") {
        notify.set("text", json.obj)

        console.error("Homoola notif sms:[ " + json.obj + " ]");
        openNotif();
        navigator.notification.beep(2);
      }

    });
  }, 10000);
  ///end wino ping 
  ///---------------------

/* ----------- */
// collection view for the notifications
var HORIZONTAL_MARGIN = 16;
var VERTICAL_MARGIN = 8;

var items = [
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
  {title: "New Offer from proker", sender: "1200 SAR", time: "11:35"},
 
];

var collectionView = new tabris.CollectionView({
  layoutData: {left: 0, right: 0, top: 35, bottom: 0},
  itemHeight: 64,
  items: items,
  initializeCell: function(cell) {
    cell.set("background", "#d0d0d0");
    var container = new tabris.Composite({
      background: "white",
      layoutData: {left: 0, top: 0, bottom: 0, right: 0}
    }).on("pan:horizontal", function(widget, event) {
      handlePan(event, container);
    }).appendTo(cell);
    var senderView = new tabris.TextView({
      font: "bold 18px",
      layoutData: {top: VERTICAL_MARGIN, left: HORIZONTAL_MARGIN}
    }).appendTo(container);
    var titleView = new tabris.TextView({
      layoutData: {bottom: VERTICAL_MARGIN, left: HORIZONTAL_MARGIN}
    }).appendTo(container);
    var timeView = new tabris.TextView({
      textColor: "#b8b8b8",
      layoutData: {top: VERTICAL_MARGIN, right: HORIZONTAL_MARGIN}
    }).appendTo(container);
    new tabris.Composite({
      background: "#b8b8b8",
      layoutData: {left: 0, bottom: 0, right: 0, height: 1}
    }).appendTo(cell);
    cell.on("change:item", function(widget, message) {
      container.set({transform: {}, message: message});
      senderView.set("text", message.sender);
      titleView.set("text", message.title);
      timeView.set("text", message.time);
    });
  }
}).appendTo(trayContent);

function handlePan(event, container) {
  container.set("transform", {translationX: event.translation.x});
  if (event.state === "end") {
    handlePanFinished(event, container);
  }
}

function handlePanFinished(event, container) {
  var beyondCenter = Math.abs(event.translation.x) > container.get("bounds").width / 2;
  var fling = Math.abs(event.velocity.x) > 200;
  var sameDirection = sign(event.velocity.x) === sign(event.translation.x);
  // When swiped beyond the center, trigger dismiss if flinged in the same direction or let go.
  // Otherwise, detect a dismiss only if flinged in the same direction.
  var dismiss = beyondCenter ? sameDirection || !fling : sameDirection && fling;
  if (dismiss) {
    animateDismiss(event, container);
  } else {
    animateCancel(event, container);
  }
}

function animateDismiss(event, container) {
  var bounds = container.get("bounds");
  container.once("animationend", function() {
    collectionView.remove(container.parent().get("itemIndex"));
  }).animate({
    transform: {translationX: sign(event.translation.x) * bounds.width}
  }, {
    duration: 200,
    easing: "ease-out"
  });
}

function animateCancel(event, container) {
  container.animate({transform: {translationX: 0}}, {duration: 200, easing: "ease-out"});
}

function sign(number) {
  return number ? number < 0 ? -1 : 1 : 0;
}

}