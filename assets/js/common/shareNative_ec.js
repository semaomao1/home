var mobile_ios = false;
var mobile_and = false;
var wechat = false;
var user_img_base_src = "../assets/images/shared/";
var default_fav_src = user_img_base_src + "ios/favImg.png";
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
var addHTML_canvas = "";

function getShareCanvasHtml() {
    let default_shared_src = user_img_base_src + "ios/shareImg.png";
    let shareHtml = ' <div class="overlay-content">';
    shareHtml += '    <img id="shareImg" src="' + default_shared_src + '" style="height:100%;max-width: 100%;" onclick="closeShare();">';
    shareHtml += '    </div>';
    return shareHtml;
}

function getFavCanvasHtml() {
    let default_fav_src = user_img_base_src + "ios/favImg.png";
    let favHtml = '<div class="overlay-content" onclick="closeFav();">';
    favHtml += '<img id="favImg" src="' + default_fav_src + '" style="max-width: 400px;width: 100%;" >';
    favHtml += '</div>';
    return favHtml;
}

function configFav() {
    if (document.getElementById('favCanvas')) {
        openFav();
        return;
    } else {
        var favDiv = document.createElement('div');
        favDiv.setAttribute("id", "favCanvas");
        favDiv.setAttribute("class", "overlay");
        favDiv.innerHTML = getFavCanvasHtml();
        document.body.appendChild(favDiv);
    }
    setShareAndFavImg();
}

function configShare() {
    if (document.getElementById('shareCanvas')) {
        openShare();
        return;
    } else {
        var shareDiv = document.createElement('div');
        shareDiv.setAttribute("id", "shareCanvas");
        shareDiv.setAttribute("class", "overlay");
        shareDiv.innerHTML = getShareCanvasHtml();
        document.body.appendChild(shareDiv);
    }
    setShareAndFavImg();
}

function setShareAndFavImg() {
    if (isMobileIosOrAndroid()) {
        var Obj_shareImg = document.getElementById("shareImg");
        var Obj_favImg = document.getElementById("favImg");
        let fav_src = "";
        let share_src = "";
        let ios_user_flags = [
            "crios",
            "fxios",
            "sogou",
            "ucbrowser",
            "qhbrowser",
            "qqbrowser",
            "baidu",
            "2345",
            "version"
        ];
        let and_user_flags = [
            "baidu",
            "firefox",
            "sogou",
            "ucbrowser",
            "qqbrowser",
            "2345",
            "liebao",
            "samsung",
            "default"
        ];
        if (wechat) {
            share_src = "/js/fenxiang/wechat.png";
            fav_src = "/js/fav/wechat.png";
        } else {
            let re = "";
            let match = 0;
            if (mobile_ios) {
                user_img_base_src = user_img_base_src + "ios/";
                ios_user_flags.forEach(item => {
                    re = new RegExp(item, "i");
                    if (re.test(userAgent)) {
                        match = 1;
                        share_src = user_img_base_src + item + "/shareImg.png";
                        fav_src = user_img_base_src + item + "/favImg.png";
                    }
                })

                if (match == 0) {
                    match = 1
                    share_src = user_img_base_src + "default/shareImg.png";
                    fav_src = user_img_base_src + "default/favImg.png";
                }
            } else if (mobile_and) {
                user_img_base_src = user_img_base_src + "android/";
                and_user_flags.forEach(item => {
                    re = new RegExp(item, "i");
                    if (re.test(userAgent)) {
                        match = 1
                        share_src = user_img_base_src + item + "/shareImg.png";
                        fav_src = user_img_base_src + item + "/favImg.png";
                    }
                })
                if (match == 0) {
                    match = 1
                    if (/chrome/i.test(userAgent)) {
                        if (/version/i.test(userAgent)) {
                            share_src = user_img_base_src + "chrome/version/shareImg.png";
                            fav_src = user_img_base_src + "chrome/version/favImg.png";
                        } else {
                            share_src = user_img_base_src + "chrome/default/shareImg.png";
                            fav_src = user_img_base_src + "chrome/default/favImg.png";
                        }
                    } else {
                        share_src = user_img_base_src + "default/shareImg.png";
                        fav_src = user_img_base_src + "default/favImg.png";
                    }
                }
            }
        }
        if (Obj_shareImg) {
            Obj_shareImg.src = share_src;
        }
        if(Obj_favImg){
          Obj_favImg.src = fav_src;
        }
        openShare();
    }
}

function isMobileIosOrAndroid() {
    if (/iPad|iPhone|iPod/i.test(userAgent)) {
        mobile_ios = true;
    }
    if (/android/i.test(userAgent)) {
        mobile_and = true;
    }
    if (/micromessenger|wechat|weixin/i.test(userAgent)) {
        wechat = true;
    }
    if (mobile_ios || mobile_and) {
        return true;
    }
    return false;
}

function openShare() {
    $("#shareCanvas").show();
    $("#shareCanvas").css('height',"100%");
}

function closeShare() {
    $("#shareCanvas").hide();
    $("#shareCanvas").css('height',"0");
}

function openFav() {
    let favCanvas = $('#favCanvas');
    favCanvas[0].style.height = "auto";
    favCanvas.show();
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
        if (/liebao/i.test(userAgent)) {
            closeFav();
        }
    } else {
        var Obj_favImg = document.getElementById("favImg");
        Obj_favImg.src = default_fav_src;
    }
}

function closeFav() {
    $('#favCanvas').hide();
}