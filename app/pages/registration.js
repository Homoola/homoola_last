module.exports = function (dataObj, currentTab) {
 
 
  var userTypes = ['select your type!', 'individual LNG', 'Companies LNG', 'Brokers LNG'];
  var userTypesIds = [0, 5, 7, 8];
  var registrationPage,userInfo,loadingPage;





  var registrationBG = new tabris.Composite({
    id: "registrationBG",
    background: "#FFFFFF",
    layoutData: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  }).appendTo(currentTab);
  var registrationBG = new tabris.ImageView({
    id: "registrationFooter",
    image: { src: "./app/images/req_img.png" },
    layoutData: {
      bottom: 0,
      right: 0,
      width: 300
    }
  }).appendTo(registrationBG);

  var pageScroll = new tabris.ScrollView({
    id: "pageScroll",
    layoutData: {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    }
  }).appendTo(currentTab);
  var regLogo = new tabris.ImageView({
    id: "regLogo",
    image: { src: "./app/images/logo_vert.png" },
    layoutData: {
      top: 40,
      centerX: 0,
      height: 150
    }
  }).appendTo(pageScroll);

  var phoneIcon = new tabris.ImageView({
    id: "phoneIcon",
    image: { src: "./app/images/icons/phone.png" },
    tintColor: "#2592cb",
    layoutData: {
      width: 24,
      height: 24,
      right: "#logiButton -24",
      top: "prev() 20"
    }
  }).appendTo(pageScroll);

  var passwordIcon = new tabris.ImageView({
    id: "passwordIcon",
    image: { src: "./app/images/icons/Password.png" },
    tintColor: "#2592cb",
    scaleMode: "fill",
    layoutData: {
      width: 24,
      height: 24,
      right: "#logiButton -24",
      top: "#phoneIcon 20"
    }
  }).appendTo(pageScroll);

  var userName = new tabris.TextInput({
    id: "userName",
    message: "Mobile Number LNG",
    keyboard: "phone",
    layoutData: {
      width: 250,
      left: "#phoneIcon 5",
      top: "#regLogo 10"
    }
  }).appendTo(pageScroll);

  var userPassword = new tabris.TextInput({
    id: "passphraseInput",
    type: "password",
    message: "Your Password LNG",
    layoutData: {
      width: 250,
      top: "#userName 10",
      left: "#phoneIcon 5"
    }
  }).appendTo(pageScroll);


  var logiButton = new tabris.Button({
    id: "logiButton",
    text: "Login LNG",
    alignment: "center",
    image: {
      src: "./app/images/icons/Password.png",
      width: 24,
      height: 24,
      left: 140,
      tintColor: "#FFF"
    },
    background: "#eab64e",

    layoutData: {
      centerX: 0,
      width: 300,
      top: "prev() 10"
    }

  }).appendTo(pageScroll);
  /*  forget passowrd and  rigstration  */

  var forgetPassword = new tabris.TextView({
    id: "forgetPassword",
    text: "forget Password? LNG",
    aligment: "left",
    layoutData: {
      height: 20,
      top: "prev() 10",
      left: "prev() -295"
    }
  }).appendTo(pageScroll);
  var z = 0;
  var registerNewUser = new tabris.TextView({
    id: "registerNewUser",
    text: "register New user? LNG",
    aligment: "left",
    layoutData: {
      height: 20,
      top: "#logiButton 10",
      right: "#logiButton -295"
    }
  }).on('tap', function () {
    createRegistrationPage();
  }).appendTo(pageScroll);





  /* ----- Registration Page ----- */
  function createRegistrationPage() {
    registrationPage = new tabris.Page({
      id: "registrationPage",
      title: "register New User lng",
      topLevel: false
    });
    var regPageScroll = new tabris.ScrollView({
      id: "pageScroll",
      layoutData: {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
      }
    }).appendTo(registrationPage);

    new tabris.ImageView({
      id: "regLogo",
      image: { src: "./app/images/logo_vert.png", height: 80 },
      layoutData: {
        top: 10,
        left: 5
      }
    }).appendTo(regPageScroll);

    new tabris.TextView({
      class: "registrationDescription",
      text: "information About registration with homoola Lang",
      layoutData: {
        top: 10,
        left: "prev() 5",
        right: 5
      }
    }).appendTo(regPageScroll);

    new tabris.ImageView({
      id: "phoneIcon",
      image: { src: "./app/images/icons/phone.png" },
      tintColor: "#2592cb",
      layoutData: {
        width: 24,
        height: 24,
        right: "#logiButton -24",
        top: "#regLogo 5"
      }
    }).appendTo(regPageScroll);

    new tabris.ImageView({
      id: "passwordIcon",
      image: { src: "./app/images/icons/Password.png" },
      tintColor: "#2592cb",
      scaleMode: "fill",
      layoutData: {
        width: 24,
        height: 24,
        right: "#logiButton -24",
        top: "#phoneIcon 20"
      }
    }).appendTo(regPageScroll);

    new tabris.TextInput({
      id: "userName",
      message: "Mobile Number LNG",
      keyboard: "phone",
      layoutData: {
        width: 250,
        left: "#phoneIcon 5",
        top: "#regLogo 10"
      }
    }).appendTo(regPageScroll);

    new tabris.TextInput({
      id: "password",
      type: "password",
      keyboard: "ascii",
      message: "Your password LNG",
      layoutData: {
        width: 250,
        top: "prev() 10",
        left: "#phoneIcon 5"
      }
    }).appendTo(regPageScroll);

    new tabris.TextInput({
      id: "realName",
      message: "Your real name LNG",
      layoutData: {
        width: 250,
        top: "prev() 10",
        left: "#phoneIcon 5"
      }
    }).appendTo(regPageScroll);

    new tabris.TextInput({
      id: "email",
      message: "Your email (optional) LNG",
      keyboard: "email",
      layoutData: {
        width: 250,
        top: "prev() 10",
        left: "#phoneIcon 5"
      }
    }).appendTo(regPageScroll);

    new tabris.Picker({
      id: "groupPick",
      layoutData: {
        centerX: 0,
        width: 300,
        top: "prev() 10"
      },
      items: userTypes
    }).on("change:selection", function (widget, selection, options) {
      console.log(options.index);
    }).appendTo(regPageScroll);

    new tabris.CheckBox({
      id: "termsAgree",
      text: "I agree To Homoola Agreemnt",
      layoutData: {
        centerX: 0,
        width: 300,
        top: "prev() 10"
      },
    }).appendTo(regPageScroll);

    new tabris.Button({
      id: "logiButton",
      text: "Login LNG",
      alignment: "center",
      image: {
        src: "./app/images/icons/Password.png",
        height: 24,
        left: 140,
        tintColor: "#FFF"
      },
      background: "#eab64e",

      layoutData: {
        centerX: 0,
        width: 300,
        top: "prev() 20"
      }

    }).on("select", function () {

      
      collectRegistration(regPageScroll);

    }).appendTo(regPageScroll);
    /*  forget passowrd and  rigstration  */


    registrationPage.open();
  }
  /* ----- Registration Page ----- */

  /*currentTab.on("resize", function () {
  
      if(tabris.device.get("orientation")));
    });*/




  // collect registration dataObj
  function collectRegistration(registrationPage) {

    userInfo = {
      username: registrationPage.children("#userName").get("text"),
      password: registrationPage.children("#password").get("text"),
      screen_name: registrationPage.children("#realName").get("text"),
      email: registrationPage.children("#email").get("text"),
      group_id: userTypesIds[registrationPage.children("#groupPick").get("selectionIndex")],
    }

    // user name as mobile
    if (!dataObj.helpers.validateMobile(userInfo.username))
      return popupError("fix mobile Number Lang", registrationPage.children("#userName"));

    // validate validatePassworStrength
    if (dataObj.helpers.validatePassworStrength(userInfo.password) < 2)
      return popupError("fix password Lang", registrationPage.children("#passowrd"));
    // email address
    if (!dataObj.helpers.validateEmail(userInfo.email))
      return popupError("fix email Lang", registrationPage.children("#email"));

    // real name validation 
    if (!dataObj.helpers.validateRealName(userInfo.screen_name))
      return popupError("fix Real Name Lang", registrationPage.children("#realName"));

    // group Id validation 
    if (userInfo.group_id <= 1)
      return popupError("fix group type Lang", registrationPage.children("#groupPick"));
    loadingPage = loadingEffect();
    loadingPage.appendTo(registrationPage.parent());
    return checkMobile(userInfo);
  }

  /// register new User
  function registerMember(object) {

    userInfo = {
      auth:{
      shortkey:"B8CD6D3BA45555CFC42B8CD6DC65EA55CFC42B",
      },data: onject
    }
    dataObj.helpers.callingHomoolaAPI(userInfo,"create_member",callback);
    

    return popupError('horray you are new user now.');
    // first check if this mobile not registered user.
  }
      function callback(json){
        console.log(json);
    }
  /// error popupError
  function popupError(msg, obj) {
    navigator.notification.alert(
      msg, // message
      function () {
        if (obj) console.log('I will foucs someone');
      }, // callback
      "caution LNG", // title
      "close LNG" // buttonName
    );
  }

  function checkMobile(object) {
    /*
      message code:
      0 : cannot send SMS now
      1 : message sent to the member he is good
      15: wrong Number.
      error: server error (try to re-check):
      expierd: active code expierd.
      member_exsist: there is a member registerd with the same number.
      denied: acsess denide to the service
    */


    dataObj.helpers.getJson('http://homoola.com/apis/mobileCheck?', { mobile: object.username, rand: (Math.random() * (9999999 - 100000) + 100000) }, "question").then(function (json) {
      loadingPage.dispose();
      if (json.status == 0) {
        
        return popupError('error in service try again Lang');
      } else if (json.status == 1) {
        //openProment
         openEnterActiveactionCodePromt();
      } else if (json.status == 'already_send') {
          openEnterActiveactionCodePromt(json.wait_for);
          
      } else if (json.status == 15) {
        return popupError('enter valid Number');
      } else if (json.status == "member_exsist") {
        return popupError('this mobiel is userd by anthoer member.');
      }

      // registerMember(registerMember,json.status);
    });

  }

  function openEnterActiveactionCodePromt(wait) {
    var activeCodePage = new tabris.Page({
      id: "activeCodePage",
      title: "Wait for active code lng",
      topLevel: false
    });


    new tabris.TextView({
      class: "registrationDescription",
      text: "information About wating for code Lang",
      layoutData: {
        top: 10,
        centerX: 0,
      }
    }).appendTo(activeCodePage);

    new tabris.ImageView({
      id: "regLogo",
      image: { src: "./app/images/icons/private.png", height: 50 },
      layoutData: {
        top: "prev() 10",
        centerX: 0,
      }
    }).appendTo(activeCodePage);

    new tabris.TextInput({
      id: "activeCodeInput",
      message: "enter Active Code",
      keyboard: "number",
      layoutData: {
        width: 250,
        centerX: 0,
        top: "prev() 10",
      }
    }).appendTo(activeCodePage);

    new tabris.Button({
      id: "logiButton",
      text: "Login LNG",
      alignment: "center",
      image: {
        src: "./app/images/icons/Password.png",
        height: 24,
        left: 140,
        tintColor: "#FFF"
      },
      background: "#eab64e",
      layoutData: {
        centerX: 0,
        width: 250,
        top: "prev() 20"
      }

    }).on("select", function () {
    checkACticCode(activeCodePage.children("#activeCodeInput").get("text"),activeCodePage);
    }).appendTo(activeCodePage);
    activeCodePage.open();
    if(wait)  popupError('code already send to you..please wait lang');
  }



  function checkACticCode(activeCode,activeCodePage) {
    /*
      message code:
      error: wrong activation Code.
      expierd: active code expierd.
      denied: acsess denide to the service
      valid: valid code
    */
    ///
    loadingPage = loadingEffect().appendTo(activeCodePage);
    return dataObj.helpers.getJson('http://homoola.com/apis/mobileCheck/active?', { mobile: userInfo.username,code: activeCode,rand: (Math.random() * (9999999 - 100000) + 100000) }, "question").then(function (json) {
     loadingPage.dispose();
      if (json.status == 'valid') {
        // do register new user from the api.
        registerMember(userInfo);

      } else if (json.status =='expierd') {
        // send new code for the member
         enterActivrCode('your activation code expired ... you will recivce new one.. please hold');
          return sendActiveCode(userInfo.username);
    } else if (json.status == 'error') {
        return popupError('please enter the valid activation number');
      }

      // registerMember(registerMember,json.status);
    });
  }

  function loadingEffect() {
    var loadingBG = new tabris.Composite({
      id: "loadingBG",
      background: "rgba(0,0,0,0.7)",
      layoutData: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    }).on('pan',function(){

    });
    new tabris.ActivityIndicator({ centerX: 0, centerY: 0 }).appendTo(loadingBG);
    return loadingBG;
  }
}