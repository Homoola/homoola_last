
module.exports = function (dataObj, currentTab) {
  var scroll = new tabris.ScrollView({
    id: "homeScroll"
  }).appendTo(currentTab);

  new tabris.Composite({
    background: "#2f88b8",
    height: 100,
    top: 0,
    left: 0,
    right: 0
  }).appendTo(scroll);

  new tabris.ImageView({
    tintColor: "#FFFFFF",
    image: { src: dataObj.tabs[currentTab.id].icon },
    layoutData: {
      width: 80,
      height: 80,
      centerX: 0,
      top: 10
    }
  }).appendTo(scroll);


  function getJSON(url) {
    return fetch(url).then(function (response) {
      return response.json();
    });
  }
  //play get appCategories
  function getz() {
    console.log("play getz")
    getJSON("https://homoola.com/en/apis/categories").then(function (json) {
      console.log(json)
      mainMyRecJson(json)
    });
  }
  var save_ = [];

  function mainMyRecJson(jsonRoot) {
    console.log("play mainrex____");
    jsonRoot.forEach(function (item, index) {
      console.log("id category")
      new tabris.Button({
        id: item.cat_id,
        height: 100,
        top: (index % 2) ? "prev() -100" : "prev() 5",
        left: (index % 2) ? "prev() 5" : 5,
        text: item.title,
        width: 200,
        background: "#fff",
        textColor: "#999"
      }).on("select", function () {
        if (item.children.length)
          forChildren(item.children, item.title);
        else
          pageFetch(item);

      }).appendTo(scroll);

    });

  }

  function forChildren(children, title_) {
    //  console.error("___this for eche_");
    var pageChild = new tabris.Page({
      title: title_,
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
        id: item.cat_id,
        height: 100,
        top: (index % 2) ? "prev() -100" : "prev() 5",
        left: (index % 2) ? "prev() 5" : 5,
        text: item.title,
        width: 200,
        background: "#fff",
        textColor: "#999"
      }).on("select", function () {
        if (item.children.length)
          forChildren(item.children, item.title);
        else
          pageFetch(item);
      }).appendTo(categoriesScroll);
      //PageMyReq
    })
    pageChild.open();
  }

  function pageFetch(item) {
    //console.error("last cat_id:[" + item.cat_id + "],titlr=" + item.url_title);
    var cat_id_ = item.cat_id;
    var url_title_ = item.url_title;
    //
    var pageFetch = new tabris.Page({
      title: item.title,
      background: "#31B7D0",
      topLevel: false
    }).open();
    //
    var activityIndicator_ = new tabris.ActivityIndicator({
      centerX: 0,
      centerY: 0
    }).appendTo(pageFetch);
    activityIndicator_.set("visible", true);
    //
    getJSON("http://homoola.com/apis/productsList/category/" + item.url_title).then(function (json) {
      console.log(json);
      if (json) {
        activityIndicator_.set("visible", false);
        json.forEach(function (item, index) {
          new tabris.Button({
            id: item.id,
            height: 100,
            top: (index % 2) ? "prev() -100" : "prev() 5",
            left: (index % 2) ? "prev() 5" : 5,
            text: item.title,
            width: 200,
            background: "#fff",
            textColor: "#999"
          }).on("select", function () {
            // id:item.id 
            console.error("resalt productsList{ id:" + item.id + ",title:" + item.title + ", title_url=" + item.url_title + "cat_id{cat_id:" + cat_id_);
            FNaddDate({ url_title: item.url_title, id: item.id, cat_id: cat_id_ })
          }).appendTo(pageFetch);
          //PageMyReq
        })
      }
      // mainMyRecJson(json)
    });
    //function datepick
    function FNaddDate(data_send) {

      var pageDate = new tabris.Page({
        title: "date",
        background: "#31B7D0",
        topLevel: false
      }).open();

      //***play add date play   
      var bttDatPly = new tabris.Button({
        text: "Date Play",
        layoutData: { top: 10, centerX: 0 }
      }).appendTo(pageDate);

      var txtDatPly = new tabris.TextView({
        layoutData: { top: [bttDatPly, 15], centerX: 0 }
      }).appendTo(pageDate);
      //
      bttDatPly.on("select", function () {
        var options = {
          date: new Date(),
          mode: 'date', // or 'time'
          minDate: new Date() - 10000,
          maxDate: new Date() + 10000,
          allowOldDates: true,
          allowFutureDates: false,
          doneButtonLabel: 'ok',
          doneButtonColor: '#F39',
          cancelButtonLabel: 'cancel',
          cancelButtonColor: '#369'
        };

        datePicker.show(options, function (date) {
          console.error("date result " + date);
          txtDatPly.set("text", date);
          data_send.push({ datePlay: date });
        });
      })

      /*****date end */
      //***play add date play   
      var bttDatEnd = new tabris.Button({
        text: "Date Play",
        layoutData: { top: [txtDatPly, 20], centerX: 0 }
      }).appendTo(pageDate);

      var txtDatEnd = new tabris.TextView({
        layoutData: { top: [bttDatEnd, 15], centerX: 0 }
      }).appendTo(pageDate);
      //
      bttDatEnd.on("select", function () {
        var options = {
          date: new Date(),
          mode: 'date', // or 'time'
          minDate: new Date() - 10000,
          maxDate: new Date() + 10000,
          allowOldDates: true,
          allowFutureDates: false,
          doneButtonLabel: 'ok',
          doneButtonColor: '#F39',
          cancelButtonLabel: 'cancel',
          cancelButtonColor: '#369'
        };

        datePicker.show(options, function (date) {
          console.error("date end result " + date);
          txtDatEnd.set("text", date);
          data_send.push({ dateEnd: date });
        });
      })
//add exetn maps
var mapslt = new tabris.TextView({
        layoutData: { top: [bttDatEnd, 15], centerX: 0 }
      }).appendTo(pageDate);
      //
 var map = new esmaps.Map({
    left: 0, right: 0, top: [txtDatEnd,15], bottom: 20
  }).on("ready", function() {
    this.on("change:camera", function(source){
       var region = this.get("region");
      "southWest: [ " + (region.southWest[0]) + ", " + (region.southWest[1]);
    })
      .on("cameramove", function(source){

      })
      .set("region", {southWest: [24.725398,46.2620111], northEast: [24.825398,46.3620111]});
  }).appendTo(pageDate);

    }
    //**end fndate
  }
  getz()


}