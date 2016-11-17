
module.exports = function (dataObj,currentTab) {
  
  //load this page style
  var style = require("../style/"+dataObj.direction+"/"+currentTab.get("info").page+".json")
  var detalisArray =
    [
      { icon: './app/images/icons/rating/2.png', value: '120 requests' },
      { icon: './app/images/icons/Future-100.png', value: '150 offers' },
      { icon: './app/images/icons/Future-100.png', value: '12 Deals' },
      { icon: './app/images/icons/Future-100.png', value: '120 requests' },
    ];
    var scroll = new tabris.ScrollView({
      id:"homeScroll",
      layoutData:style.homeScroll.layoutData
    });
  var topBackground = new tabris.Composite({
    id:"topBackground",
      layoutData:style.topBackground.layoutData,
      background:style.topBackground.background
  }).appendTo(scroll);

  /// profile Iamge 


  var tabRefrence = [

    {icon:"./app/images/saudi.jpg",obj:{title:"YAHYA"}},
    dataObj.tabs.requestsTab,
    dataObj.tabs.myRequestTab,
    dataObj.tabs.offersTab,
    dataObj.tabs.dealsTab,
    dataObj.tabs.trackingTab
  ];

// because I don't know how to make flat button I draw it my self :(
  for (var i = 0; i < tabRefrence.length; i++) {

    var myLayout =  { 
        top: (i >= 3) ? 130 : 5 ,
        width:80,
        height: 80
      };

    if( (i == 0) || (i == 3)){
      myLayout =  Object.assign({},style.tabButtonLeft.layoutData, myLayout);
    }else if( (i == 2) || (i == 5)){
      myLayout =  Object.assign({},style.tabButtonRight.layoutData, myLayout);
    }else if((i == 1) || (i == 4)){
      myLayout =  Object.assign({},style.tabButtonCenter.layoutData, myLayout);

    }
    var tabButton = new tabris.Composite({
      id: "b" + i,
      background: style.tabButton.background,
      layoutData:myLayout,
      cornerRadius: 40,
    });
    
    new tabris.ImageView({
      tintColor: (i > 0 ) ?"#eab64e":'',
      image: { src: tabRefrence[i].icon},
      layoutData: {
        centerX: 0,
        centerY: 0,
        width:(i > 0) ? 40:80,
        height:(i > 0) ? 40 :80
      }
    }).appendTo(tabButton);

  var tabName = new tabris.TextView({
    text: (i >0 ) ? tabRefrence[i].obj.get("title") : tabRefrence[i].obj.title ,
    alignment:"center",
    layoutData: {
      width:90,
      top: "#b" + i + "  5",
      left:"#b" + i + " -80"
    },
    textColor: "#FFFFFF",
    font: "16px"
  }).appendTo(scroll);

    tabButton.appendTo(scroll).on('tap', function () {
      var myId = parseInt(this.get("id").replace("b", ""));
      dataObj.homeFolder.set("selection", tabRefrence[myId].obj);
    });
  }
//*/

  scroll.appendTo(currentTab);
//include chart
var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};
//var layoutData_ = {left: 10, top: 80, right: 10, bottom: 10}

dataObj.helpers.creatChar("Bar", data, {
  left: 10, top: 127, right: 10, bottom: 10
},currentTab);
/*
creatChar("Bar", data,layoutData_,pageHomoola)
creatChar("Line", data,layoutData_,pageHomoola);
creatChar("Radar", data,layoutData_,pageHomoola);
creatChar("PolarArea", pieData,layoutData_,pageHomoola);
creatChar("Pie", pieData,layoutData_,pageHomoola);
creatChar("Doughnut", pieData,layoutData_,pageHomoola);
*/
//end chart
}