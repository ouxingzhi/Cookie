var Cookie = function(window,document){
  		/**
			 * @class Cookie
			 * @static
			 */
			var Cookie = {};
			/**
			 * 设置cookie值
			 * @param name {String}  名称
			 * @param value {String} 值
			 * @param expire {Number}  可选 过期时间，单位为(天),如设1,则当前时间一天后，可以为小数。如果为负数则cookie立即过期
			 * @param path {String} 可选 设置路径
			 * @param domain {String} 可选 设置域
			 * @return {Boolean} 是否设置成功
			 * @public
			 * @static
			 */
			Cookie.Set = function(name,value,expire,path,domain){
				var c = [];
				if(!name) return false;
				c.push(name + '=' + escape(value));
				if(Object.prototype.toString.call(expire) == '[object Number]'){
					var now = new Date();
						//天数换算为秒
						second = parseInt(expire * 86400);
					now.setSeconds(second);
					var utc = now.toGMTString();
					alert(utc);
					c.push('expires='+utc);
				}
				path && c.push('path=' + path);
				domain && c.push('domain=' + domain);
				document.cookie = c.join(';');
			};
			/**
			 * 获得cookie值
			 * @param name {String} 可选 指定cookie值名称，如果不设置此值，则取所有的cookie
			 * @return {String|Object|null} 指定name时，找到值则返回String，未找到则返回null。未指定name，取所有的cookie值，返回Object
			 * @public
			 * @static
			 */
			Cookie.Get = function(name){
				var result;
				if(name){
					var RegCookie = new RegExp('\\b'+name+'=([^;]*)\\b'),
						match = RegCookie.exec(document.cookie);
					result = match && unescape(match[1]);
				}else{
					var cookies = document.cookie.split(';'),i,c;
					result = {};
					for(i=0,len=cookies.length;i<len;i++){
						c = cookies[i].split('=');
						result[c[0]] = unescape(c[2]);
					}
				}
				return result;
			};
			/**
			 * 删除cookie值
			 * @param name 要删除的cookie值
			 * @return void
			 * @public
			 * @static
			 */
			 Cookie.Del = function(name){
				Cookie.Set(name,'',-1);
			 };
			 return Cookie;
		}(window,document);
