
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

}