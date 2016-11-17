//rem tmp variable
var importantData = [] || {};
var direction, lang;
var helpers = require('../app/exports/helpers.js');
var userId = 1;/// remove later
var LOGGED_IN = true; // local Storage 
var addRequestBtnAppears = false;
// wino homolla play


//include langs

var langs = (function () {
  lang = tabris.device.get("language").replace(/-.*/, "");
  try {
    return require("../app/langs/" + lang).lang;
  } catch (ex) {
    lang = 'ar';
    return require("../app/langs/ar").lang;
  }
} ());
direction = langs.text.direction;
///
var langCode = (lang == "ar") ? "" : "/" + lang;
var baseURL = "http://homoola.com" + langCode;


// Crate the Main page
var pageHomoola = new tabris.Page({
  id: "pageHomoola",
  topLevel: true
});
/// creat widget action with option
var paramAction = {
  title: "Serch",
  src: "../app/images/icons/tracking.png",
  //src: "./app/images/icons/location.png",
  object: pageHomoola,
  visible: true,
  id: "search_",
  callback: function (target) {
    // console.error(target.get("id")); //=> sort #id الايدي لتخزينه والتحكم في الاظهار او الاخفائ على حسب
    //add search
    var objSearch = { "obj": "newPage", page: "search", apiURL: apiURL + "requests/", actionId: "search_" };
    require("./pages/search")(objSearch)
      .on("appear", function () {
        target.set("visible", false);
      })
      .on("disappear", function () {
        target.set("visible", true)
      }).open();
  }
}
//
var actionFirst = helpers.action(paramAction);
///end Secnd action
var paramAction2 = {
  title: "Setting",
  src: "./app/images/icons/wheel.png",
  object: pageHomoola,
  visible: true,
  id: "Setting",
  callback: function (target) {
    console.error("this id=" + target.get("id"));
  }
}
var actionSecend = helpers.action(paramAction2);
//helpers.action({remove:actionFirst}) or actionFirst.remove()// remove

//replace any element
//var actionFirst;
//if (!actionFirst) actionFirst = helpers.action(paramAction);

var option_ = {
  replace: actionFirst,
  title: "wino",
  src: "./app/images/icons/wheel.png"
  //,callback: function (target) { console.log("we change", target.get("id")) }
}
//helpers.action(option_)
/// end action
/// create the Main tab folder 
var homeFolder = new tabris.TabFolder({
  id: "homeTabs", font: "bold 29px", tabBarLocation: "hidden",
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(pageHomoola);


// Tabs array .. sorted what we want to be appears
var loggedInTabs = [
  { id: "trackingTab", page: "tracking", loggedIn: true, icon: "./app/images/icons/tracking.png", apiURL: baseURL + "tracking/" },
  { id: "dealsTab", page: "deals", loggedIn: true, icon: "./app/images/icons/deals.png", apiURL: baseURL + "deals/" },
  { id: "offersTab", page: "offers", loggedIn: true, icon: "./app/images/icons/offers.png", apiURL: baseURL + "offers/" },
  { id: "homePageTab", page: "homePageTab", loggedIn: true, apiURL: baseURL + "profile/" },
  { id: "requestsTab", page: "requests", loggedIn: false, icon: "./app/images/icons/requests.png", apiURL: baseURL + "/apis/requests/" },
  { id: "myRequestTab", page: "requests", loggedIn: false, icon: "./app/images/icons/truck_request.png", apiURL: baseURL + "/apis/userRequests/" + userId + "/" },
  { id: "addRequestTab", page: "addRequest", loggedIn: true, icon: "./app/images/icons/add_request.png", apiURL: baseURL + "addRequest/" }
]

var notLoggedInTabs = [
  { id: "trackingTab", page: "tracking", loggedIn: true, icon: "./app/images/icons/tracking.png", apiURL: baseURL + "tracking/" },
  { id: "dealsTab", page: "deals", loggedIn: true, icon: "./app/images/icons/deals.png", apiURL: baseURL + "deals/" },
  { id: "offersTab", page: "offers", loggedIn: true, icon: "./app/images/icons/offers.png", apiURL: baseURL + "offers/" },
  { id: "homePageTab", page: "homePageTab", loggedIn: true, apiURL: baseURL + "profile/" },
  { id: "requestsTab", page: "requests", loggedIn: false, icon: "./app/images/icons/requests.png", apiURL: baseURL + "/apis/requests/" },
  { id: "myRequestTab", page: "requests", loggedIn: false, icon: "./app/images/icons/truck_request.png", apiURL: baseURL + "/apis/userRequests/" + userId + "/" },
  { id: "addRequestTab", page: "addRequest", loggedIn: true, icon: "./app/images/icons/add_request.png", apiURL: baseURL + "addRequest/" },
  { id: "registrationTab", page: "registration", loggedIn: false, icon: "./app/images/icons/icon.png", apiURL: baseURL + "/apis/registration/" },
  { id: "addRequestTab", page: "addRequest", loggedIn: false, icon: "./app/images/icons/icon.png", apiURL: baseURL + "/apis/appCategories/" },
  // { id: "requestsTab", page: "requests", loggedIn: false, icon: "./app/images/icons/icon.png", apiURL: baseURL + "/apis/requests/" },
]
var tabsLoop = (LOGGED_IN) ? loggedInTabs : notLoggedInTabs;
// Big main Object for everything that will share with the apps pages.
importantData = {
  direction: direction,
  lang: lang,
  langs: langs,
  helpers: helpers,
  pageHomoola: pageHomoola,
  homeFolder: homeFolder,
  tabs: {}
};

tabris.ui.set("background", "#eab64e"); // Yellow homoola color

tabsLoop.forEach(function (item, index) {
  // create the tab
  var theTab = new tabris.Tab({
    id: item.id
  });
  theTab.set("info", item);
  theTab.appendTo(homeFolder);
  // add this object to the importantData.tabs
  importantData.tabs[item.id] = item;
  importantData.tabs[item.id].obj = theTab;


  if (item.id == "homePageTab") homeFolder.set("selection", theTab);
});


// loop  to Create Tabs with and call the internal pages to be inside the tabs
// after fill the big Object [ImportantData]

//
//// end of tabs
//import drawer wino
var drawer = helpers.drawer();
//exmple add
var profile_ = new tabris.ImageView({

  image: { src: "./app/images/icons/saudi.jpg" },
  scaleMode: "fill",
  layoutData: { left: 0, right: 0, top: 0, height: 200 }
}).appendTo(drawer);
new tabris.TextView({
  text: "Yahya , ibrahim",
  layoutData: { centerX: 0, top: [profile_, 10], left: 0 },
  font: "22px Arial"
}).on("tap", function () {
  drawer.close();
}).appendTo(drawer);
//end drawer 
//play LOGGED_IN
if (LOGGED_IN) {
  require("./pages/notif");
  /**
    var buttonForAddRequestTab = new tabris.Composite({
      id: "buttonForAddRequestTab"
    }).on("tap", function () {
      homeFolder.set("selection", importantData.tabs.addRequestTab.obj);
    })
  
    var addRequest = new tabris.ImageView({
      id: "addRequestBtn",
      image: { src: "./app/images/icons/add.png" }
    }).appendTo(buttonForAddRequestTab);
  //*/
  //wino Creat new btnReq
  var optionBtnReqAdd = {
    btnId: "buttonForAddRequestTab",
    imgId: "addRequestBtn",
    src: "./app/images/icons/add.png"
  }
  var buttonForAddRequestTab = helpers.NewbtnReq(optionBtnReqAdd);
  buttonForAddRequestTab.on("tap", function () {
    homeFolder.set("selection", importantData.tabs.addRequestTab.obj);
  })
  helpers.animateInRequestBottom(buttonForAddRequestTab);
  buttonForAddRequestTab.appendTo(pageHomoola)
  addRequestBtnAppears = true;
  //end  btnReq add

  /**play exmple btnReq Edit  */
  var optionBtnReqEdit = {
    btnId: "buttonForEditRequestTab",
    imgId: "addRequestBtn",
    src: "./app/images/icons/private.png"
  }
  var buttonForEditRequestTab = helpers.NewbtnReq(optionBtnReqEdit);
  buttonForEditRequestTab.on("tap", function () {
    homeFolder.set("selection", importantData.tabs.addRequestTab.obj);
  })
  //helpers.animateOutRequestBottom(buttonForEditRequestTab);
  buttonForEditRequestTab.appendTo(pageHomoola)
  buttonForEditRequestTab.animate({
    opacity: 0.0,
    transform: { translationY: 100 }
  }, {
      delay: 1,
      duration: 1,
      easing: "ease-in-out"
    });

  addRequestBtnAddAppears = false;
  // end btneq edit

}

homeFolder.on("change:selection", function (widget, tab) {

  var currentTab = tab.get('id');
  pageHomoola.set('title', tab.get("title"));
  /// add requests button apperance
  if (currentTab == "homePageTab" || currentTab == "myRequestTab" || currentTab == "requestsTab") {
    if (addRequestBtnAppears == false) {
      addRequestBtnAppears = true;
      actionFirst.set("visible", true)
      helpers.animateInRequestBottom(buttonForAddRequestTab);
      helpers.animateOutRequestBottom(buttonForEditRequestTab); //edit

    }
  } else {
    if (addRequestBtnAppears == true) {
      addRequestBtnAppears = false;
      actionFirst.set("visible", false)
      helpers.animateOutRequestBottom(buttonForAddRequestTab);
      helpers.animateInRequestBottom(buttonForEditRequestTab);//edit
    }
  }
  /// add requests button apperance 
  if (currentTab == "homePageTab")
    tabris.ui.set("background", "#eab64e");
  else
    tabris.ui.set("background", "#2f88b8");

});



(pageHomoola, function (appendz) {

  /* callback
  return new tabris.TextView({({
  layoutData: {left: 20, top:50},
   font: "bold 16px",
   textColor: "#656465"
  }).appendTo(appendz);
   */
}, true, helpers);
//end  notif ping //*/


pageHomoola.apply(langs.objects);
pageHomoola.apply(require("./style/" + direction + "/publicStyle.json"));

// after fill the objects crate the pages
tabsLoop.forEach(function (item, index) {
  var page = require('./pages/' + item.page);
  page(importantData, item.obj);
});


pageHomoola.open();
