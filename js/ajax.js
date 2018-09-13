
/**
     * @Ajax封装
     * 执行基本ajax请求,返回XMLHttpRequest
     *  $Ajax.request({
     *      url
     *      async 是否异步 true(默认)
     *      method 请求方式 POST or GET(默认)
     *      data 请求参数 (键值对字符串)
     *      success 请求成功后响应函数，参数为xhr
     *      error 请求失败后响应函数，参数为xhr 11
     *  });
     */
    let $Ajax = function(){
     //xhr = XMLHttpRequest
     let onStateChange = (xhr,success,failure)=>{
          if(xhr.readyStates == 4){
               //4->成功并且已经准备就绪
               let _status = xhr.status;
               if(_status == 200){
                    success(xhr);
               }else{
                    failure(xhr);
               }
          }else{
               alert('服务器繁忙~');
          }
     };
     let request = (opt)=>{
          let _cb = () => {};
          let _url = opt.url || '';
          let _async = opt.async !== false;
          let _method = opt.method || 'GET';
          let _data = opt.data || null;
          let _success = opt.success || _cb;
          let _failure = opt.failure || _cb;
          _method = _method.toUpperCase();   //转大写
          if(_method === 'GET' && _data){
               let _str = '';
               if(typeof _data === 'String'){
                    _str = _data;
               }else if(typeof _data === 'object'){
                    let arr = new Array();
                    for(let k in _data){
                         let v = _data[k];
                         arr.push(k + '=' + v);
                    }
                    _str = arr.join('&');
               }
               _url += (_url.indexOf('?') === -1?'?':'&')+ _str;
               _data = null;
          }
          // let _xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveObject('Microsoft.XMLHTTP');
          let _xhr = window.XMLHttpRequest ? new XMLHttpRequest() : '';
          // let _xhr = new XMLHttpRequest();
          
          // console.log(_xhr);
          // debugger;
          _xhr = onreadystatechange = ()=>{
               // 当请求被发送到服务器时，需要执行一些基于响应的任务
               onStateChange(_xhr,_success,_failure)
          };

          _xhr.open(_method, _url, _async); // 创建一个请求，并准备向服务器发送
          if(_method === 'POST'){
               //   如果是POST请求的时候，需要添加个请求消息头
               _xhr = setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=UTF-8');
          }
          _xhr.send(_data);
          return _xhr;
     };
     return {
      request : request
     };
}();



window.onload = function(){
    //  $Ajax.request({
    //   url:'https://www.dian68.net/app/renren.php?do=Index&sign=everyone_app_laike',
    //   // url:'/public/index.json',
    //   method:'POST',
    //   async:true,
    //   data:{
    //     openid:'oQWwf5cf74XumgGmE0H7ptoXcqUU',
    //     sign:'everyone_app_laike',
    //     siteid:'20881809088687042877',
    //     appid:'wxd800ea0ed7a4cda5',
    //   },
    //   success:function(res){
    //     console.log(res);
    //   }
    // })
}

function ajax(url,type,param,async,header) {
                return new Promise(function(resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.onload = function() { 
                        if(req.status == 200 || req.status == 304) {
                            resolve(JSON.parse(req.response));
                        } else {
                            reject(Error(req.statusText));
                        }
                    };
                    req.onerror = function() {
                        reject(Error("Network Error"));
                    };
                    type == null || type.toUpperCase() == 'GET'?type='get':type='post';
                    param = formatParams(param);
                    param == null || param == ''?url:url=url+'?'+param;
                    async == null || async == true?async=true:async=false;
                    //设置表单提交时的内容类型，未完
                    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req.open(type,url,async);
                    req.send();
                });
                function formatParams(data) {
                    var _fpArr = [];
                    for (var _fpName in data) {
                  _fpArr.push(_fpName + "=" + data[_fpName]);
                    }
                    return _fpArr.join("&");
                };
            };

// module.exports = ajax;