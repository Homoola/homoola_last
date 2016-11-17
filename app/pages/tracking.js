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
  var compositeY = new tabris.Composite({
    background:"#2f88b8",
    id:"compositeY",
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

//creat new chart tracking
var pieData = [
  {
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red"
  },
  {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green"
  },
  {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow"
  },
  {
    value: 40,
    color: "#949FB1",
    highlight: "#A8B3C5",
    label: "Grey"
  },
  {
    value: 120,
    color: "#4D5360",
    highlight: "#616774",
    label: "Dark Grey"
  }
];
var layoutData_ = {left: 10, top: 80, right: 10, bottom: 10}

dataObj.helpers.creatChar("Pie", pieData, layoutData_,currentTab);

/*
creatChar("Bar", data,layoutData_,pageHomoola)
creatChar("Line", data,layoutData_,pageHomoola);
creatChar("Radar", data,layoutData_,pageHomoola);
creatChar("PolarArea", pieData,layoutData_,pageHomoola);
creatChar("Pie", pieData,layoutData_,pageHomoola);
creatChar("Doughnut", pieData,layoutData_,pageHomoola);
*/

//end chart tracking
  console.log(dataObj.direction + " - " + currentTab.id);
}