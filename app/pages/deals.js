module.exports = function (dataObj,currentTab) {
  
var scroll = new tabris.ScrollView({
      id:"homeScroll",
      background:"#FFFFFF",
        layoutData:{
          top:0,
          bottom:0,
          right:0,
          left:0
        }
    });
  new tabris.Composite({
    background:"#2f88b8",
    height:100,
    top:0,
    left:0,
    right:0
  }).appendTo(scroll);
  
  new tabris.ImageView({
    tintColor: "#FFFFFF",
        image: { src: dataObj.tabs[currentTab.id].icon},
        layoutData:{
          width:80,
          height:80,
          centerX:0,
          top:10
        }
    }).appendTo(scroll);
    
    scroll.appendTo(currentTab);
}