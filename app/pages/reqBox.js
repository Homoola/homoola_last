//------paral
var icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Red_information_" +
  "icon_with_gradient_background.svg/48px-Red_information_icon_with_gradient_background.svg.png"
  var mapz = "http://www.videos-2-buzz.fr/wp-content/uploads/2014/11/Google-maps.png";

 
module.exports = function (value) {
var img_ = mapz;
  var title_ = value.title;
  var text_ = value.description;

  var MARGIN_SMALL = 14;
  var MARGIN = 16;

  var _OPACITY = 0.85;

  var titleCompY = 0;

  //tabris.ui.set("background", "#369");

  var paral = new tabris.Page({
    topLevel: false,
    title: title_
  }).once("resize", function () { 
    //  used "resize" event as workaround for tabris-js#597
   tabris.ui.set("toolbarVisible", true);
  });

///play images list
  var scrollView = new tabris.ScrollView({
    left: 0, right: 0, top: 0, bottom: 0
  }).appendTo(paral);

  var imageView = new tabris.ImageView({
    left: 0, top: 0, right: 0,
    image: "",
    scaleMode: "fill"
  }).appendTo(scrollView);

  var contentComposite = new tabris.Composite({
    left: 0, right: 0, top: ["#titleComposite",10],height: 800,
    background: "white"
  }).appendTo(scrollView);
///end image list

//____________
  ///scroll image
  var scrollimages = new tabris.ScrollView({
    left: 0, right: 0, top: 0, height: 300,
    direction: "horizontal",
    background: "#369"
  }).appendTo(scrollView);
//icno view
var iconView = new tabris.ImageView({
  left:10, top:10, width:48, height:48,image:"images/eye@2x.png"
}).appendTo(paral);
//icno view and
  if (value.images.length) {

    //  console.log("lenght:"+value.images.length);
    var i
    for (i = 0; i <= value.images.length - 1; i++) {
      console.log(value.images[i].url);
      new tabris.ImageView({
        layoutData: { right: 0, left: "prev() 10", centerY: 0, height: 300 },
        image: value.images[i].url,
        scaleMode: "fill",
        class: "imgscrl" + i
      }).on("tap", function (a) {
        //console.error("this img select:"+value.images[0].url);
        agrandir(this.get("image"))
        //reqBox_.reqBox(value,mapz);
      }).appendTo(scrollimages);
    }
  }
  //enad scroll

  //******wino add
  var status_ = new tabris.ImageView({
    layoutData: { height: 40, width: 40, right: MARGIN },
    //left: MARGIN, right: MARGIN, top: MARGIN,
    image: icon
  }).appendTo(contentComposite);

  new tabris.TextView({
    right: 60, top: MARGIN,
    text: value.status
  }).appendTo(contentComposite);
  //***********
  //********add
  var shipment_quantity = new tabris.ImageView({
    layoutData: { height: 40, width: 40, right: MARGIN, top: [status_, MARGIN - 8] },
    //left: MARGIN, right: MARGIN, top: MARGIN,
    image: icon
  }).appendTo(contentComposite);

  new tabris.TextView({
    right: 60, top: [status_, MARGIN],
    text: value.shipment_quantity
  }).appendTo(contentComposite);
  //--------end add
  //********add
  var from_destination = new tabris.ImageView({
    layoutData: { height: 40, width: 40, right: MARGIN, top: [shipment_quantity, MARGIN - 8] },
    //left: MARGIN, right: MARGIN, top: MARGIN,
    image: icon
  }).appendTo(contentComposite);

  new tabris.TextView({
    right: 60, top: [shipment_quantity, MARGIN],
    text: value.from_destination[0].name
  }).appendTo(contentComposite);
  //--------end add */
  //********add
  var to_destination = new tabris.ImageView({
    layoutData: { height: 40, width: 40, right: MARGIN, top: [from_destination, MARGIN - 8] },
    //left: MARGIN, right: MARGIN, top: MARGIN,
    image: icon
  }).appendTo(contentComposite);

  new tabris.TextView({
    right: 60, top: [from_destination, MARGIN],
    text: value.to_destination[0].name
  }).appendTo(contentComposite);
  //--------end add */
  //********add
  var pickup_date = new tabris.ImageView({
    layoutData: { height: 40, width: 40, right: MARGIN, top: [to_destination, MARGIN - 8] },
    //left: MARGIN, right: MARGIN, top: MARGIN,
    image: icon
  }).appendTo(contentComposite);

  new tabris.TextView({
    right: 60, top: [to_destination, MARGIN],
    text: value.pickup_date["formated"]
  }).appendTo(contentComposite);
  //--------end add */
  //********add
  var drop_of_date = new tabris.ImageView({
    layoutData: { height: 40, width: 40, right: MARGIN, top: [pickup_date, MARGIN - 8] },
    //left: MARGIN, right: MARGIN, top: MARGIN,
    image: icon
  }).appendTo(contentComposite);

  new tabris.TextView({
    right: 60, top: [pickup_date, MARGIN],
    text: value.pickup_date["formated"]
  }).appendTo(contentComposite);
  //--------end add */
  
  //maps
  var map = new tabris.ImageView({
    left: 0,  right: 0,top:[drop_of_date, MARGIN - 8],
    image: img_,
    scaleMode: "fill"
  }).appendTo(contentComposite);
//end maps
  //--- text direction
  new tabris.TextView({
    right: 60, top: [map, MARGIN],
    text: value.description
  }).appendTo(contentComposite);
  //---end txt description

  /*/--wino add composite
  
  
  new tabris.TextView({
      layoutData: {left: MARGIN, right: [truck_,MARGIN], top: MARGIN},
    text: text_
  }).appendTo(contentComposite);
  
  
  //--ende wino */


  var titleComposite = new tabris.Composite({
    left: 0, right: 0, height: 78,
    id: "titleComposite",
    background: "#369"
  }).appendTo(scrollView);

  new tabris.TextView({
    left: MARGIN, top: MARGIN, right: MARGIN,
    markupEnabled: true,
    text: "<b>ن3 </b>",
    font: "16px",
    textColor: "#fff"
  }).appendTo(titleComposite);

  new tabris.TextView({
    left: MARGIN, bottom: MARGIN_SMALL, right: MARGIN, top: "prev()",
    markupEnabled: true,
    text: "<b>" + title_ + "</b>",
    font: "24px",
    textColor: "white"
  }).appendTo(titleComposite);

  scrollView.on("resize", function (widget, bounds) {
    var imageHeight = bounds.height / 2;
    imageView.set("height", imageHeight);
    var titleCompHeight = titleComposite.get("height");
    // We need the offset of the title composite in each scroll event.
    // As it can only change on resize, we assign it here.
    titleCompY = Math.min(imageHeight - titleCompHeight, bounds.height / 2);
    titleComposite.set("top", titleCompY);
  });

  scrollView.on("scroll", function (widget, offset) {
    imageView.set("transform", { translationY: Math.max(0, offset.y * 0.4) });
    titleComposite.set("transform", { translationY: Math.max(0, offset.y - titleCompY) });
    var opacity = calculateTitleCompositeOpacity(offset.y, titleCompY);
    titleComposite.set("background", rgba(12, 152, 0, opacity));
  });
  function calculateTitleCompositeOpacity(scrollViewOffsetY, titleCompY) {
    var titleCompDistanceToTop = titleCompY - scrollViewOffsetY;
    var opacity = 1 - (titleCompDistanceToTop * (1 - _OPACITY)) / titleCompY;
    return opacity <= 1 ? opacity : 1;
  }

  function rgba(r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  //-----------
  //func agrandir
  ///scroll image


  function agrandir(params) {

    var pageBigImg = new tabris.Page({
       //tabris.ui.set("toolbarVisible", false);
    }).once("resize", function () { //  used "resize" event as workaround for tabris-js#597
      tabris.ui.set("toolbarVisible", true);
    });
  var scrollAgrandir = new tabris.ScrollView({
      left: 0, right: 0, top: 0, bottom: 0,
      direction: "horizontal",
      background: "#000"
    }).appendTo(pageBigImg);
    //----
    var agrand = new tabris.ImageView({
      left: 0, right: 0, top: 0, bottom: 0, width: 1000, centerX: 0, centerX: 0,
      image: params,
      scaleMode: "fill"
    }).on("tap", function () {
      // console.error("this img select wiiiiiii");
      //reqBox_.reqBox(value,mapz);
    }).appendTo(scrollAgrandir);
    pageBigImg.open();
  }
  //end function agrandir

  //---
  paral.open();
}

/*
function createTabFolder() {
  var tabFolder = new tabris.TabFolder({tabBarLocation: "top", paging: true});
  var relatedTab = new tabris.Tab({title: "طلبات"}).appendTo(tabFolder);
  homoolaList(homoolajax).appendTo(relatedTab);
  var commentsTab = new tabris.Tab({title: "ردود"}).appendTo(tabFolder);
  new tabris.TextView({
    layoutData: {left: PAGE_MARGIN, top: PAGE_MARGIN, right: PAGE_MARGIN},
    text: "شحن"
  }).appendTo(commentsTab);
  return tabFolder;
}
*/


//end paral--------
