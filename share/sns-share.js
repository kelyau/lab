/**
 * sns-share.js
 * Created by kenlyau on 15/6/13.
 * newallah@gmail.com
 */
(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define([],factory);
	} else if (typeof exports === "object") {
	    module.exports = factory();
	} else {
		root.snsShare = factory();
	}
}(this, function() {
	
	"use strict";
        var qApiSrc = {
        lower: "http://3gimg.qq.com/html5/js/qb.js",
        higher: "http://jsapi.qq.com/get?api=app.share"
        };
        var bLevel = {
            qq: {forbid: 0, lower: 1, higher: 2},
            uc: {forbid: 0, allow: 1}
        };
        var UA = navigator.appVersion;
        var platform_os = getPlantform();
        var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
        var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
        var version = {
            uc: "",
            qq: ""
        };
        var isWeixin = false;
        var isSupportNativeShare = false;
        var ucAppList = {
        sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
        weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
        weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
        QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
        QZone: ['kQZone', 'QZone', '3', 'QQ空间']
        };

        var nativeShare = function (to_app, config) {
            var title = config.title, 
                url = config.url, 
                desc = config.desc, 
                img = config.img, 
                img_title = config.img_title, 
                from = config.from;
            if (isucBrowser) {
                to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? this.ucAppList[to_app][0] : this.ucAppList[to_app][1]);
                if (to_app == 'QZone') {
                    B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+img+"&title="+title+"&description="+desc+"&url="+url+"&app_name="+from;
                    k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
                        k && k.parentNode && k.parentNode.removeChild(k)
                    }, 5E3);
                }
                if (typeof(ucweb) != "undefined") {
                    ucweb.startRequest("shell.page_share", [title, title, url, to_app, "", "@" + from, ""])
                } else {
                    if (typeof(ucbrowser) != "undefined") {
                        ucbrowser.web_share(title, title, url, to_app, "", "@" + from, '')
                    } else {
                    }
                }
            } else {
                if (isqqBrowser && !isWeixin) {
                    to_app = to_app == '' ? '' : this.ucAppList[to_app][2];
                    var ah = {
                        url: url,
                        title: title,
                        description: desc,
                        img_url: img,
                        img_title: img_title,
                        to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                        cus_txt: "请输入此时此刻想要分享的内容"
                    };
                    ah = to_app == '' ? '' : ah;
                    if (typeof(browser) != "undefined") {
                        if (typeof(browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher) {
                            browser.app.share(ah)
                        }
                    } else {
                        if (typeof(window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
                            window.qb.share(ah)
                        } else {
                        }
                    }
                } else {
                }
            }
        };
        function isloadqqApi() {
            if (isqqBrowser) {
                var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
                var d = document.createElement("script");
                var a = document.getElementsByTagName("body")[0];
                d.setAttribute("src", b);
                a.appendChild(d)
            }
        };
        function getPlantform() {
            var ua = navigator.userAgent;
            if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
                return "iPhone"
            }
            return "Android"
        };
        function is_weixin() {
            var a = UA.toLowerCase();
            if (a.match(/MicroMessenger/i) == "micromessenger") {
                return true
            } else {
                return false
            }
        };
        function getVersion(c) {
            var a = c.split("."), b = parseFloat(a[0] + "." + a[1]);
            return b
        };

        //init
        if (platform_os == "iPhone" || platform_os == "Android") {
            version.qq = isqqBrowser ? getVersion(UA.split("MQQBrowser/")[1]) : 0;
            version.uc = isucBrowser ? getVersion(UA.split("UCBrowser/")[1]) : 0;
            isWeixin = is_weixin();
            if ((isqqBrowser && version.qq < 5.4 && platform_os == "iPhone") || (isqqBrowser && version.qq < 5.3 && platform_os == "Android")) {
                isqqBrowser = bLevel.qq.forbid
            } else {
                if (isqqBrowser && version.qq < 5.4 && platform_os == "Android") {
                    isqqBrowser = bLevel.qq.lower
                } else {
                    if (isucBrowser && ((version.uc < 10.2 && platform_os == "iPhone") || (version.uc < 9.7 && platform_os == "Android"))) {
                        isucBrowser = bLevel.uc.forbid
                    }
                }
            }
            isloadqqApi();
            if (isqqBrowser || isucBrowser) {
                isSupportNativeShare = true;
            } else {
                
            }
        }

		var API = {
			qzone : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
			sina : 'http://service.weibo.com/share/share.php?',
			kaixin : 'http://www.kaixin001.com/repaste/share.php?',
			renren : 'http://widget.renren.com/dialog/share?',
			douban : 'http://www.douban.com/recommend/?'
		};


		/**
		 * qzone: param @title @summary @url @pics
		 * sina: param @title @url @pic
		 * kaixin: param @rtitle @rcontent @rurl
		 * renren: param @title @resourceUrl
		 * douban: param @title @url @image
		 */

		/**
		* @param shareType
		* @param {}
		* @function share
		*/
		var snsShare = function(shareType,param, native) {
			var shareParam = {
				title: encodeURIComponent(param.title),
				content: param.content? encodeURIComponent(param.content) : "",
				url: param.url? encodeURIComponent(param.url) : encodeURIComponent(location.href),
				pic: param.pic? encodeURIComponent(param.pic) : ""
			};
			var jumpUrl = API[shareType];
			
            if (native){
                //nativeType
                //sinaWeibo,weixin,weixinFriend,QQ,QZone,
                if (!isSupportNativeShare) {
                   alert("not support native share");
                   return
                }
                nativeShare(shareType, {
                    title : param.title,
                    url : param.url? param.url : location.href,
                    img: param.pic? param.pic: "",
                    img_title: param.img_title? param.img_title : "",
                    desc: param.content? param.content : "",
                    from : param.from? param.from : ""
                })
            }else{
                switch (shareType) {
                case "qzone":
                    jumpUrl +="url="
                            +shareParam.url
                            +"&title="
                            +shareParam.title
                            +"&summary="
                            +shareParam.content
                            +"&pic="
                            +shareParam.pic;
                    break;
                case "sina":
                    jumpUrl +="title="
                            +shareParam.title
                            +shareParam.content
                            +"&url="
                            +shareParam.url
                            +"&pic="
                            +shareParam.pic;
                    break;
                case "kaixin":
                    jumpUrl +="rtitle="
                            +shareParam.title
                            +"&rcontent="
                            +shareParam.content
                            +"&rurl="
                            +shareParam.url;
                    break;
                case "renren":
                    jumpUrl +="title="
                            +shareParam.title
                            +shareParam.content
                            +"&resourceUrl="
                            +shareParam.url;
                    break;
                case  "douban":
                    jumpUrl +="title="
                            +shareParam.title
                            +shareParam.content
                            +"&url="
                            +shareParam.url
                            +"&image="
                            +shareParam.pic;
                    break;
                default :
                    throw new error("unknown sharetype");
                }
                window.open(jumpUrl);
            }
			
		};
	return snsShare;
}));
