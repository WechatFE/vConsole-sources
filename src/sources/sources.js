import tplSource from './sources.html';
import './sources.less';

let $ = vConsole.$;

class VConsoleSourcesTab extends vConsole.VConsolePlugin {
  constructor(...args) {
    super(...args);
    this.resUrls = VConsoleSourcesTab.getAllResUrl();

  }
  onRenderTab(callback) {
    var that = this;
    var resUrls = this.resUrls;
    var $dom = this.$dom = $.render(tplSource, {resUrls:resUrls})

    callback($dom);

    $.bind($.all('.vc-sources-file', $dom), 'click', function(){
      $.removeClass($.all('.vc-sources-file', $dom), "actived");
      $.addClass(this, "actived");
      let idx = this.dataset.idx*1, res = resUrls[idx];
 
      if (!!res){
        $.one(".vc-sources-url", $dom).innerText = res.url;
        if (res.content){
          let $content = $.one(".vc-sources-content", $dom);
          let $iframeContent = $.one(".vc-sources-iframe-content", $dom);
          $content.style.display = "block";
          $iframeContent.style.display = "none";
          $content.innerText = res.content;
        }else{
          that.fillContent(res.url, idx);
        }
      }
    });
  }

  static getAllResUrl(){
    var resList = [];

    resList.push({url:location.href, filename:VConsoleSourcesTab.getFileName(location.href), type:"html", content:document.getElementsByTagName("html")[0].innerHTML});
    var otherRes = $.all('link[rel="stylesheet"],script[src]');
    for (let res of otherRes) {
      let url = "";
      let filename = "";
      let type = "unknow";
      let nodeName = res.nodeName.toUpperCase();
      if (nodeName == "LINK"){ 
        url = res.href || "";
        type = "css";
      }else if (nodeName == "SCRIPT"){
        url = res.src || "";
        type = "script";
      }
      filename = VConsoleSourcesTab.getFileName(url);
      if (!!filename){
        resList.push({url:url, filename:filename, type:type});
      }
    }
    return resList;
  }

  static getFileName(url){
    var reg = /\/([^\/\?]+)($|\?)/g;
    var match = reg.exec(url);
    return match && match[1];
  }

  getResContent(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = ()=>{
      if (xhr.readyState == 3) {
      }
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = null;
        var status = xhr.status;
        if ( status >= 200 && status < 400 ) {
          callback(xhr.responseText);
        } else {
          callback("[ERROR] Please Try Again.");
        }
      }
    }
    xhr.send();
  }
  fillContent(url, idx){
    var urlSuf = location.protocol + "//" + location.host;
    var $dom = this.$dom;
    var $content = $.one(".vc-sources-content", $dom);
    var $iframeContent = $.one(".vc-sources-iframe-content", $dom);
    var resUrls = this.resUrls;
    if (url.indexOf(urlSuf) == 0){
      $content.innerText = "loading...";
      $content.style.display = "block";
      $iframeContent.style.display = "none";
      this.getResContent(url, (text)=>{
        $content.innerText = text;
        resUrls[idx] && (resUrls[idx].content = text);
      });
    }else{
      //iframe
      $iframeContent.src = url;
      $content.style.display = "none";
      $iframeContent.style.display = "block";
    }
  }
}

vConsole.addPlugin(new VConsoleSourcesTab('vconsole-source', 'Source'));