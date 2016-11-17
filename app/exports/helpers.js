/* add action to toolbar */

// usage Action
// date hepler
// Create Base64 Object
/*exports.encrypt = function (str, method) {
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        },
        decode: function (e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        },
        _utf8_encode: function (e) {
            e = e.replace(/rn/g, "n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        },
        _utf8_decode: function (e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }
    }
    if (method == "decode") return Base64.decode(str);
    else
        return Base64.encode(str);


}*/
//creat chart
var Chart = require("chart.js/Chart.min.js");
exports.creatChar = function(chartType, chartData,layoutData,appendTo_) {
    console.log("play creat char")
  
  var compoChar = new tabris.Composite({  layoutData:layoutData }).appendTo(appendTo_);
  var canvas = new tabris.Canvas({layoutData: layoutData}).appendTo(compoChar);
  var createCanvasContext = function() {
    var bounds = canvas.get("bounds");
    var width = bounds.width;
    var height = Math.min(bounds.height, width);
    return canvas.getContext("2d", width, height);
  };

  setTimeout(function() {
     // console.error("timeout chart")
     var ctx = createCanvasContext();
    // workaround for scaling to native pixels by chart.js
    ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
    new Chart(ctx)[chartType](chartData, {
      animation: true,
      showScale: true,
      showTooltips: false,
      scaleShowLabels: true
    });
  }, 500);
  
  return compoChar;
}

//add drawer
exports.drawer = function () {
    return tabris.create("Drawer");
}
//add new btn req
exports.NewbtnReq = function (params) {

    var buttonForAddRequestTab = new tabris.Composite({
        id: params.btnId
    });
    var addRequest = new tabris.ImageView({
        id: params.ImgId,
        image: { src: params.src }
    }).appendTo(buttonForAddRequestTab);
    return buttonForAddRequestTab;

}

/// animation for add Request button
exports.animateInRequestBottom = function (widget) {
    widget.set({
        opacity: 0.0,
        transform: { translationY: 70 }
    });
    widget.animate({
        opacity: 1.0,
        transform: { translationY: 0 }
    }, {
            delay: 350,
            duration: 250,
            easing: "ease-in-out"
        });
}
exports.animateOutRequestBottom = function (widget) {

    widget.animate({
        opacity: 0.0,
        transform: { translationY: 100 }
    }, {
            delay: 200,
            duration: 300,
            easing: "ease-in-out"
        });
}

exports.validateRealName = function (name) {
    if (name.length < 4) return false;
    return true;

}
exports.validateMobile = function (mobile) {
    console.log("My mobile is " + mobile.length);
    if (mobile.length < 8) return false;
    return true;

}

exports.validatePassworStrength = function (password) {

    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");

    if (password.length == 0) {
        return 0; // type password
    } else if (false == enoughRegex.test(password)) {
        return 1; // need extra Characters 
    } else if (strongRegex.test(password)) {
        return 4; // strong password
    } else if (mediumRegex.test(password)) {
        return 3;// // meduim Strength password
    } else {
        return 2; // weak password
    }
}
exports.validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
exports.action = function (params) { //add action + params array: title, src, callback,id, object - widget page(mi9bad), remove, replace
    //remove = this object action
    if (params.remove) {
        params.remove.dispose();
     //   console.error("bien remove action ")
        return;
    }
    //replace opject
    if (params.replace) {
        if (params.src) params.replace.set("image", { src: params.src, scale: 1 });
        //
        if (params.title) params.replace.set("title", params.title);
        //
        if (params.id) params.replace.set("id", params.title);
        //
        if (params.callback) params.replace.on("select", function (target) {
            console.log("callback change")
            params.callback(target);

        });
        console.log("bien replace action ")
        return params.replace;
    }


    //remove = this object action
    //if(params.active) //هنا شرط ان يبقى او يزول
    //params.object.children("#licenseToggler").dispose();
    // object.find('action').remove();
    var ID_Acttion = params.id ? params.id : "licenseToggler"; //if id
    return new tabris.Action({
        id: ID_Acttion,
        title: params.title,
        placementPriority: "high",
        visible: params.visible ? params.visible : true,
        image: { src: params.src, scale: 1 }
    }).on("select", function (target) {
        params.callback(target)
        //search_(lang).open();
    }).appendTo(params.object);
}
/* add action to toolbar */
//fix the url to send to API
// تقوم بتجهيز الرابط للإرسال
function createUrl(url, params, paraseType) {

    if (paraseType == "folders") {

        var urlm = url + Object.keys(params).map(function (key) {
            return params[key]; // old

        }).join("/");
        console.log("create url folder " + urlm);
        return urlm
    } else {
        var urlm = url + Object.keys(params).map(function (key) {
            return key + "=" + params[key];
        }).join("&");
        console.log("create question mark: " + urlm);
        return urlm;
    }
}

// هذه الدالة تعيد جيسون تحتاج لثلاثة متغيرات الاول رابط واللي بعده مصفوفة والاخيرة نوع البارس الخاص بالرابط
exports.getJson = function (url, params, paraseType) {
    paraseType = (!paraseType) ? 'folders' : paraseType;
    if (!params) {
        return fetch(url).then(function (response) {
            return response.json();
        });
    }

    return fetch(createUrl(url, params, paraseType)).then(function (response) {

        return response.json();
    });
}
//wino search_

exports.callingHomoolaAPI = function (loppObject, method, callBack) {

    var apiPath = "http://homoola.com/api/rest/" + method + "/json?";
    var postBody = "";
    var mainKey;
    for (var key in loppObject) {
        // skip loop if the property is from prototype
        if (!loppObject.hasOwnProperty(key)) continue;
        mainKey = key;
        var obj = loppObject[key];
        for (var prop in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(prop)) continue;
            // your code
            postBody += mainKey + "[" + prop + "]=" + obj[prop] + "&";
        }
    }
    // call the api and return the message.
    // remove the last & from the body
    //postBody.slice(0, -1);
    // Create an empty Headers instance
    var headers = new Headers();
    // Add a few headers
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.get('Content-Type', 'application/json');
    //console.log("api: "+apiPath+"\n body:"+postBody.slice(0, -1));

    fetch(apiPath, {
        method: "post",
        headers: headers,
        body: postBody.slice(0, -1)
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (result) {
            //console.log("1 "+result);
            callBack(result);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });

}

exports.createUrl = createUrl;