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
		var snsShare = function(shareType,param) {
			var shareParam = {
				title: encodeURIComponent(param.title),
				content: param.content? encodeURIComponent(param.content) : "",
				url: param.url? encodeURIComponent(param.url) : encodeURIComponent(location.href),
				pic: param.pic? encodeURIComponent(param.pic) : ""
			};
			var jumpUrl = API[shareType];
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
		};
	return snsShare;
}));
