
  ///******send sms 
  var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };
        var success = function () { console.log('msg sent successfully'); };
        var error = function (e) { console.log('msg Failed:' + e); };
       sms.send(num, msg, options, success, error);  
///****** call 
     window.plugins.CallNumber.callNumber(   function(result){
  console.log("Success:"+result);
}, function(result) {
  console.log("Error:"+result);
}
, num, true);

///****** notification local withoot senderID
  cordova.plugins.notification.local.schedule({
    title: num,
    message: msg,
    sound: "http://festivalmerzouga.com/2015/fr/wp-content/uploads/2016/08/fim.mp3",
    icon: "http://burtoncr.com/css/images/099303-facebook-logo-square.png"
  });

///****** MAps 
new esmaps.Map({
  left: 0, right: 0, top: 0, bottom: 0
}).on("ready", function() {
  // show paris with a radius of 2000 meters
  console.log("readyyyyyy")
  this.moveToPosition([48.8644458, 2.3589976],2000);
}).appendTo(page);




