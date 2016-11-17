
module.exports = function (dataObj, currentTab) {







  //play get appCategories
  function getz() {
    dataObj.helpers.getJson(currentTab.get('info').apiURL).then(function (json) {
      mainMyRecJson(json)
    });
  }
  var save_ = [];

  function mainMyRecJson(jsonRoot) {
    
    jsonRoot.forEach(function (item, index) {
      console.error("___this for eche_");
      new tabris.Button({
        id: item.category_value,
        height: 100,
        top: (index % 2) ? "prev() -100" : "prev() 5",
        left: (index % 2) ? "prev() 5" : 5,
        text: item.title,
        width: 200,
        background: "#fff",
        textColor: "#999"
      }).on("select", function () {
        if (item.children.length)
          forChildren(item.children);
        else
          //console.error("baraka no child");
          console.error("last category_value:[" + item.category_value + "]");

      }).appendTo(currentTab);

    });

  }

  function forChildren(children) {
    //  console.error("___this for eche_");
    var pageChild = new tabris.Page({
      title: "childer",
      background: "#31B7D0",
      topLevel: false
    });
    var categoriesScroll = new tabris.ScrollView({
      layoutData: {
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0
      }
    }).appendTo(pageChild);

    children.forEach(function (item, index) {
      new tabris.Button({
        id: item.category_value,
        height: 100,
        top: (index % 2) ? "prev() -100" : "prev() 5",
        left: (index % 2) ? "prev() 5" : 5,
        text: item.title,
        width: 200,
        background: "#fff",
        textColor: "#999"
      }).on("select", function () {
        if (item.children.length)
          forChildren(item.children);
        else
          console.error("last category_value:[" + item.category_value + "]");
      }).appendTo(categoriesScroll);

      //PageMyReq
    })
    pageChild.open();
  }
  getz()


}