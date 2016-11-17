module.exports = function (dataObj,currentTab) {

//console.log(currentTab);
//return;
//console.log(" from Request tab 1");
//console.log(currentTab);
// assign helpers function
var helpers = dataObj.helpers;
//loading Style for this page
var style = require("../style/"+dataObj.direction+"/"+currentTab.get("info").page+".json")
// temprary icon
var icon = "./app/images/icons/horse.png";
// item limit per Request
var itemLimit = 5;
var firstItemId;
var reachTheOldest = false;
var currentLastItemId;
var loading;
var apiUrl = currentTab.get("info").apiURL;
var addButtonApperance = true;


    
/// a collectionView to load the Requests
var cardsWindo = new tabris.CollectionView({

  class: "cardsWindo",
        background: style.cardsWindo.background,
        itemHeight: style.cardsWindo.itemHeight,
        refreshEnabled: style.cardsWindo.itemHeight,
        layoutData:style.cardsWindo.layoutData,
  cellType: function(item) {
    if(item.id == 0) return "firstItemBackground";
    return item.loading ? "loading" : "normal";
  },
  initializeCell: function(cell, type) {
    if (type === "loading") {
      initializeLoadingCell(cell);
    }else if(type === "firstItemBackground"){
      initializeFirstCell(cell);
    }else {
      initializeStandardCell(cell);
    }
  }
}).on("refresh", function() {
  loadNewItems();
}).on("scroll", function(view, scroll) {

  if(view.get('firstVisibleIndex') > 0 && addButtonApperance == true){
        addButtonApperance = false;
        helpers.animateOutRequestBottom(dataObj.pageHomoola.children("#buttonForAddRequestTab"));
  }

  if (scroll.deltaY > 0) {
    var remaining = view.get("items").length - view.get("lastVisibleIndex");
    if (remaining < 20) {
      loadMoreItems();
    }
  }
}).on("select", function(target, value) {
  if (!value.loading && value.id > 0) {
    createDetailsPage(value);
  }
});


//console.log(" from Request tab 2");
//console.log(currentTab);
// now send this to the main tab

//Start Load items
loadInitialItems();
cardsWindo.appendTo(currentTab);


/// first item as background
function initializeFirstCell(cell){
    var topB = new tabris.Composite({
    background:"#2f88b8",
    height:100,
    top:0,
    left:0,
    right:0
  });
  
  new tabris.ImageView({
    tintColor: "#FFFFFF",
        image: { src: dataObj.tabs[currentTab.id].icon},
        layoutData:{
          width:80,
          height:80,
          centerX:0,
          top:10
        }
    }).appendTo(topB);

 topB.appendTo(cell);
}
function initializeStandardCell(cell) {
  // the card ground 
  var requestCard = new tabris.Composite({
    class: "requestCard",
    background:style.requestCard.background,
    cornerRadius:style.requestCard.cornerRadius,
    transform:style.requestCard.transform,
    layoutData:style.requestCard.layoutData
    // elevation:
  });
// card icon to view on card ground
  var cardIcon = new tabris.Composite({
    class:"cardIcon",
    background:"#2f88b8",
    cornerRadius:25,
    layoutData: style.cardIcon.layoutData,
  }).appendTo(requestCard);
  var cardIcon = new tabris.ImageView({
    background:"#2f88b8",
    layoutData: {
      "height": 25,
      "width": 25,
      "centerX" : 0,
      "centerY" :0
    },
    tintColor: style.cardIcon.tintColor,
    scaleMode: "auto"
  }).appendTo(cardIcon);
/// card Title gose here
  var cardTitle = new tabris.TextView({
    class:"cardTitle",
    layoutData:style.cardTitle.layoutData,
    font: style.cardTitle.font,
    textColor: style.cardTitle.textColor,
    maxLines: 1
  }).appendTo(requestCard);
  /// icon for distance 
  var distanceImage = new tabris.ImageView({
    class:'distanceImage',
    layoutData:style.distanceImage.layoutData,
    image:style.distanceImage.image
  }).appendTo(requestCard);
// distance for text
  var distanceText = new tabris.TextView({
        layoutData:style.distanceText.layoutData,
        font: style.distanceText.font,
        textColor:style.distanceText.textColor
  }).appendTo(requestCard);
// AutherRating Icon
  var authorRatingIcon = new tabris.ImageView({
    class:'authorRatingIcon',
    layoutData:style.authorRatingIcon.layoutData,
    image:style.authorRatingIcon.image
  }).appendTo(requestCard);
//console.log(" from Request tab 3");
//console.log(currentTab);
// AutherRating as text
    var stars = new tabris.ImageView({
      class: 'stars',
      scaleMode:"auto",
      layoutData: style.stars.layoutData,
      tintColor: style.stars.tintColor
    }).appendTo(requestCard);
    
var authorRating = new tabris.TextView({
    layoutData:style.authorRating.layoutData,
     "font":  style.authorRating.font
  }).appendTo(requestCard);
///
// distance for text
//console.log(" from Request tab 4");
//console.log(currentTab);
  // now adding the footer data for this card
    var cardFooter = new tabris.Composite({
    class: "cardFooter",
    background:style.cardFooter.background,
    cornerRadius:style.cardFooter.cornerRadius,
    layoutData:style.cardFooter.layoutData
    // elevation:
  }).appendTo(requestCard);

  var fromIcon = new tabris.ImageView({
    class:'fromIcon',
    layoutData:style.fromIcon.layoutData,
    image:style.fromIcon.image,
    tintColor:style.fromIcon.tintColor
  }).appendTo(requestCard);

  var fromIcon = new tabris.ImageView({
    class:'fromIcon',
    layoutData:{width:16,height:20,left:7,top:[fromIcon,1]},
    image:{src:'./app/images/icons/arrow.png'}
    //tintColor:style.fromIcon.tintColor
  }).appendTo(requestCard);

  var toIcon = new tabris.ImageView({
    class:'toIcon',
    layoutData:style.toIcon.layoutData,
    image:style.toIcon.image,
    tintColor:style.toIcon.tintColor
  }).appendTo(requestCard);
//console.log(" from Request tab 5");
//console.log(currentTab);
var fromDistinstionText = new tabris.TextView(
  {
    class:"fromDistinstionText",
    layoutData:style.fromDistinstionText.layoutData,
    font:style.fromDistinstionText.font,
    alignment:style.fromDistinstionText.alignment,
    textColor:style.fromDistinstionText.textColor 
  }
).appendTo(requestCard);

var readyShipmentText =  new tabris.TextView({
  class:"readyShipmentText",
  layoutData:style.readyShipmentText.layoutData,
  textColor:style.readyShipmentText.textColor,
  font:style.readyShipmentText.font
}).appendTo(requestCard);

var toDistinstionText = new tabris.TextView(
  {
    class:"toDistinstionText",
    layoutData:style.toDistinstionText.layoutData,
    font:style.toDistinstionText.font,
    alignment:style.toDistinstionText.alignment,
    textColor:style.toDistinstionText.textColor 
  }
).appendTo(requestCard);
//console.log(" from Request tab 6");
//console.log(currentTab);
var pickDateText =  new tabris.TextView({
  class:"pickDateText",
  layoutData:style.pickDateText.layoutData,
  textColor:style.pickDateText.textColor,
  font:style.pickDateText.font
}).appendTo(requestCard);

/// low Bid icon
var lowBidIcon = new tabris.ImageView({
  class:"lowBidIcon",
  layoutData:style.lowBidIcon.layoutData,
  image:style.lowBidIcon.image
}).appendTo(requestCard);

var lowBidText =  new tabris.TextView({
  class:"lowBidText",
  layoutData:style.lowBidText.layoutData,
  textColor:style.lowBidText.textColor,
  font:style.lowBidText.font
}).appendTo(requestCard);
/// low Bid icon
/// expirationDateIcon
var expirationDateText =  new tabris.TextView({
  class:"expirationDateText",
  layoutData:style.expirationDateText.layoutData,
  textColor:style.expirationDateText.textColor,
  font:style.expirationDateText.font
}).appendTo(requestCard);

var expirationDateIcon = new tabris.ImageView({
  class:"expirationDateIcon",
  layoutData:style.expirationDateIcon.layoutData,
  image:style.expirationDateIcon.image,
  
}).appendTo(requestCard);

//console.log(" from Request tab 7");
//console.log(currentTab);
/// expirationDateIcon

  cell.on("change:item", function(widget, item) {


    lowBidText.set("text",(item.lowestBidding) ? item.lowestBidding+" "+dataObj.langs.text.SAR:dataObj.langs.text.noBidding);
    expirationDateText.set("text",item.drop_of_date.textDate);
    cardIcon.set("image", {src: icon});
    cardTitle.set("text", item.title);
    ///// Fucking Rating Lag
    stars.set('width', (Math.ceil(item.author.rating)*16));
    stars.set('image', {src:"./app/images/icons/rating/"+((Math.round(item.author.rating*2)/2)*2)+".png"});
    authorRating.set("text", item.author.rating); 
    ///// Fucking Rating Lag
    distanceText.set("text", (item.tripDistance) ? item.tripDistance+" "+dataObj.langs.text.km:dataObj.langs.text.unkown );
    readyShipmentText.set("text", " | "+dataObj.langs.text.ReadyToPickup);
    pickDateText.set("text"," | "+dataObj.langs.text.before+" "+item.pickup_date.shortDate)
    fromDistinstionText.set("text",item.from_destination[1].name+", "+item.from_destination[2].name);
    toDistinstionText.set("text",item.to_destination[1].name+", "+item.to_destination[2].name);
  
});
  /////// initial data..ends here


  // after you fill the card attacht it to the cell
  requestCard.appendTo(cell);
  
}

function initializeLoadingCell(cell) {
  new tabris.TextView({
    left: 12, right: 12, centerY: 0,
    alignment: "center",
    text: dataObj.langs.text.loading
  }).appendTo(cell);
}
var s =0;

function loadInitialItems() {
  cardsWindo.set("refreshIndicator", true);
 // getJSON(createUrl({limit: 25})).then(function(json) {
  helpers.getJson(apiUrl, { limit: itemLimit }).then(function(json) {
    
    firstItemId = json[0].id;
   json.unshift(		{
		"id": "0",
		"title": "أريد شحن 33 حبوب نباتية من دومة الجندل إلى الوجه ",
		"url_title": "i_need_to_ship_33_cereals_grains_from_dawmat_al_jandal_to_al_wajh_1466017012",
		"url": "http://homoola.com/apis/request/3284",
		"entry_date": "1466016960",
		"entry_date_foramted": "2016-06-15T18:56:00+00:00",
		"entry_icon": "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/android.svg",
		"entry_cover_image": "",
		"offers_count": "",
		"status": "shipping",
		"shipment_quantity": "33",
		"description": "تجربة الايبي الجديد",
		"lowestBidding" :"",
		"tripDistance" : "1217",
		"from_destination" :[
		
		{"name":"المملكة العربية السعودية",
			"url":"http://homoola.com/apis/tags/from_saudi-arabia"
		},
		{"name":"دومة الجندل",
			"url":"http://homoola.com/apis/tags/from_dawmat-al-jandal"
		},
		{"name":"الفيصلية",
			"url":"http://homoola.com/apis/tags/from_al-faisaliyah18"
		}],	
		
		"to_destination" :[
		
		{"name":"المملكة العربية السعودية",
			"url":"http://homoola.com/apis/tags/to_saudi-arabia"
		},
		{"name":"الوجه",
			"url":"http://homoola.com/apis/tags/to_al-wajh"
		},
		{"name":"العزيزية",
			"url":"http://homoola.com/apis/tags/to_al-aziziah"
		}],

		"pickup_date": 
				{
					"stamp_time" :"1465851600",
					"formated" :"2016-06-13T21:00:00+00:00",
					"shortDate":"13/06",
					"textDate":"قبل حوالي 3 أشهر"
				}
		,
		"drop_of_date":
			{
				"stamp_time" :"1466974800",
				"formated" :"2016-06-26T21:00:00+00:00",
				"shortDate":"13/06",
				"textDate":"قبل حوالي 3 أشهر"
			},
		
		"category": [
		{
			"scheme": "http://homoola.com/apis/requests/category/category/Trucks",
			"term": "شاحنات",
			"id": "1",
			"url_title": "Trucks"
		}],
		
		"author": {"name":"Yahya Ibrahim",
			"author_id":"1",
			"url": "http://homoola.com/apis/profile/1",
			"rating":"2.2",
			"avatar":"http://homoola.com/images/avatars/avatar_1.jpg",
			"avatar_image_width": "240",
			"avatar_image_height": "240"
		}
	}); // add new item at the begning
    
    cardsWindo.set("items", json);
    currentLastItemId = json[json.length - 1].id;
    cardsWindo.set("refreshIndicator", false);
  });
}

function loadNewItems() {

  if (!loading) {
    loading = true;
   
    helpers.getJson(apiUrl, {limit: itemLimit}).then(function(json) {
    if (json[0].id === firstItemId) {
          cardsWindo.reveal(0);
          cardsWindo.set("refreshIndicator", false);
          loading = false;
          return;
       }
        firstItemId = json[0].id;
        cardsWindo.insert(json, 0);
        cardsWindo.reveal(0);
        cardsWindo.set("refreshIndicator", false);
        loading = false;

    });
  }
}
 function loadMoreItems() {
    if (!loading && reachTheOldest === false) {
      loading = true;
      // insert placeholder item
      cardsWindo.insert([{ loading: true }]);      
     helpers.getJson(apiUrl, { limit: itemLimit, after: currentLastItemId }).then(function (json) {
        // remove placeholder item
        // cardsWindo.remove(-1);
        if (json.length > 1) {
          cardsWindo.remove(-1);
          currentLastItemId = json[json.length - 1].id;
          cardsWindo.insert(json);
          // 
        } else {
          // remove placeholder item..
          cardsWindo.remove(-1);
          reachTheOldest = true;
        }
        loading = false;
      });
    }
  }


function getFirstId() {
  return getHomoolaRequestId(cardsWindo.get("items")[0]) || null;
  
}

function getLastId() {
  var items = cardsWindo.get("items");
  return getHomoolaRequestId(items[(items.length-1)]) || null;
}

function getHomoolaRequestId(item) {
  return item ? item.id : null;
}

function createDetailsPage(data) {
 return  detailPage =  require('../pages/reqBox')(data);

  var detailPage = new tabris.Page({
    background: "black",
    title: data.title,
    topLevel: false
  });
  if (data.url.substr(-4, 4) === ".jpg") {
    new tabris.ImageView({
      left: 0, top: 0, right: 0, bottom: 0,
      image: data.url,
      scaleMode: "fit"
    }).appendTo(detailPage);
  } else {
    new tabris.WebView({
      left: 0, top: 0, right: 0, bottom: 0,
      url: data.url
    }).appendTo(detailPage);
  }
  detailPage.open();
}

function getJSON(url) {
  return fetch(url).then(function(response) {
    return response.json();
  });
}
}
