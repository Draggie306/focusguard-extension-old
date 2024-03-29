var Options=function(){let e,s,t=null,a=null;var n,o="exceptions",i=/[\n ,]+/,c=/^[0]*[1-9]+[0-9]*$/,r=function(e){document.getElementById(e).style.opacity="1",setTimeout((function(){document.getElementById(e).style.opacity="0"}),2500)},d=function(){showRequestPassContainer((e=>{if("accepted"===e){var s=n.getOptions(),t=document.getElementById.bind(document),a=t("time").value;s.time=Math.abs(parseInt(a))||s.time;var o=t("short").value;s.break=Math.abs(parseInt(o))||0;var i=t("longer").value;s.longerBreak=Math.abs(parseInt(i))||0;var c=t("serie").value;s.serie=Math.abs(parseInt(c))||0,n.saveOptions(s),r("saved-text-timers")}else closePassContainer()}))},l=function(){showRequestPassContainer((e=>{if("accepted"===e){var s=n.getOptions(),t=document.getElementById.bind(document);"block"===t("block").value?s.block=!0:s.block=!1,s.sites=t("sites").value.split(i),s.exceptions=t(o).value.split(i),n.saveOptions(s),r("saved-text-sites")}else closePassContainer()}))},p=function(e){e.disabled=!1},u=function(e){e.disabled=!0},h=function(){var e=document.getElementById.bind(document),s=n.getOptions();e("time").value=s.time.toString(),s.break?(e("short").value=s.break.toString(),s.serie?(e("serie").value=s.serie.toString(),s.longerBreak&&(e("longer").value=s.longerBreak.toString())):u(e("longer"))):(u(e("serie")),u(e("longer"))),e("badge").checked=s.badge,e("cleanpage").checked=s.cleanBlockPage,e("sites").value=s.sites.join("\n"),e(o).value=s.exceptions.join("\n"),s.block?(e("block").value="block",e("sites").style.backgroundColor="#FFEBEE",e(o).style.backgroundColor="#E8F5E9"):(e("block").value="allow",e("sites").style.backgroundColor="#E8F5E9",e(o).style.backgroundColor="#FFEBEE"),e("audio").checked=s.audio,e("notification").checked=s.notification,s.localOptions,e("autostart").checked=!s.autoStart,e("hide-pause-stop").checked=s.hidePause};return validationEntrePassInput=function(e){let s=e.target.value.replace(/[^A-Za-z0-9]*$/,"");e.target.value=s,s.length<8?($(".pass-border").css({border:"1px solid red",borderRadius:"6px"}),$(".block").css("display","block")):($(".block").css("display","none"),$(".pass-border").css("border","1px solid #E0E0E0"))},showRequestPassContainer=function(t){!1===e?t("accepted"):($(".password-wrapper").css("display","flex"),$(".password-container").css("height","315px"),$(".entr-pass").css("display","block"),$(".pass-header-text").text("Please enter your password below"),$(".pass-btn-entr").text("Enter"),$(".hide").click((function(){$(this).parent().closest("div").find("input").attr("type",(function(e,s){return"password"===s?"text":"password"})),$(this).toggleClass("show")})),$(".password-wrapper").on("click",(e=>{e.target===e.currentTarget&&(closePassContainer(),t&&t("canceled"))})),document.getElementById("e-pass").addEventListener("input",validationEntrePassInput),$(".pass-btn-entr").click((function(){document.getElementById("e-pass").value===s?($(".pass-footer").text(""),closePassContainer(),t("accepted")):$(".pass-footer").text("Invalid password")})))},savePassBtnListener=function(){$(".pass-btn-save").click((function(){chrome.storage.local.set({siteBlockerPassword:a}),$(".set-pass-mod").css("display","none"),$(".rem-pass-mod").css("display","flex"),$(".set-pass").css("display","none"),e=!0,s=a,closePassContainer()}))},validationInput=function(e){let s=e.target.value.replace(/[^A-Za-z0-9]*$/,"");e.target.value=s;switch(e.target.attributes.name.value){case"new-pass":t=s;break;case"rep-pass":a=s}a!==t?($(".pass-border").css({border:"1px solid red",borderRadius:"6px"}),$(".pass-footer").text("The passwords you entered do not match")):($(".pass-border").css("border","1px solid #E0E0E0"),$(".pass-footer").text("")),t.length>=8&&a===t?($(".pass-btn-save").css("opacity","1"),savePassBtnListener()):($(".pass-btn-save").css("opacity","0.4"),$(".pass-btn-save").off())},listenerSetPassMod=function(){$(".hide").click((function(){$(this).parent().closest("div").find("input").attr("type",(function(e,s){return"password"===s?"text":"password"})),$(this).toggleClass("show")})),document.getElementById("new-pass").addEventListener("input",validationInput),document.getElementById("rep-pass").addEventListener("input",validationInput)},showPassContainer=function(t){switch(t){case"set-pass":$(".password-wrapper").css("display","flex"),$(".password-container").css("height","400px"),$(".set-pass").css("display","block"),$(".pass-header-text").text("Enter password and then repeat it"),listenerSetPassMod();break;case"rem-pass":showRequestPassContainer((t=>{"accepted"===t&&(chrome.storage.local.set({siteBlockerPassword:""}),$(".rem-pass-mod").css("display","none"),$(".set-pass-mod").css("display","flex"),$(".entr-pass").css("display","none"),e=!1,s=""),closePassContainer()}))}$(".password-wrapper").on("click",(e=>{e.target===e.currentTarget&&closePassContainer()}))},closePassContainer=function(){$(".password-wrapper").css("display","none"),$(".password-wrapper").off(),t=null,a=null,document.getElementById("new-pass").value="",document.getElementById("rep-pass").value="",document.getElementById("e-pass").value="",$(".pass-border").css("border","1px solid #E0E0E0"),document.getElementById("new-pass").removeEventListener("input",validationInput),document.getElementById("rep-pass").removeEventListener("input",validationInput),$(".hide").off(),$(".pass-btn-entr").off()},enablePassListener=function(){$(".set-pass-mod-btn").on("click",(()=>{showPassContainer("set-pass")})),$(".rem-pass-mod-btn").on("click",(()=>{showPassContainer("rem-pass")}))},checkPassword=function(){chrome.storage.local.get((t=>{t.siteBlockerPassword&&""!==t.siteBlockerPassword?($(".set-pass-mod").css("display","none"),$(".rem-pass-mod").css("display","flex"),e=!0,s=t.siteBlockerPassword):($(".rem-pass-mod").css("display","none"),$(".set-pass-mod").css("display","flex"),e=!1,s=""),enablePassListener()}))},{init:function(e){n=e.BgCtrl,function(){var e=document.getElementById.bind(document);e("short").addEventListener("input",(function(){this.value.match(c)?(p(e("serie")),e("serie").value.match(c)&&p(e("longer"))):(u(e("serie")),u(e("longer")))})),e("serie").addEventListener("input",(function(){this.value.match(c)?p(e("longer")):u(e("longer"))})),e("bt-save-time").addEventListener("click",d),e("bt-save-sites").addEventListener("click",l),e("badge").addEventListener("change",(async function(e){var s=n.getOptions();showRequestPassContainer((t=>{"accepted"===t?(s.badge=this.checked,n.saveOptions(s)):e.target.checked=s.badge}))})),e("cleanpage").addEventListener("change",(function(e){var s=n.getOptions();showRequestPassContainer((t=>{"accepted"===t?(s.cleanBlockPage=this.checked,n.saveOptions(s)):e.target.checked=s.cleanBlockPage}))})),e("notification").addEventListener("change",(function(e){var s=n.getOptions();showRequestPassContainer((t=>{"accepted"===t?(s.notification=this.checked,n.saveOptions(s)):e.target.checked=s.notification}))})),e("audio").addEventListener("change",(function(e){var s=n.getOptions();showRequestPassContainer((t=>{"accepted"===t?(s.audio=this.checked,n.saveOptions(s)):e.target.checked=s.audio}))})),e("hide-pause-stop").addEventListener("change",(function(e){var s=n.getOptions();showRequestPassContainer((t=>{"accepted"===t?(s.hidePause=this.checked,s.hideStop=this.checked,n.saveOptions(s)):e.target.checked=s.hidePause}))})),e("autostart").addEventListener("change",(function(e){var s=n.getOptions();showRequestPassContainer((t=>{"accepted"===t?(s.autoStart=!this.checked,n.saveOptions(s)):e.target.checked=s.autoStart}))}))}(),h(),checkPassword()}}}();document.addEventListener("DOMContentLoaded",(function(){chrome.runtime.getBackgroundPage(Options.init),$(".menu-box_list_item").click((function(){const e=$(`.${this.id}`)[0].offsetTop;window.scroll(0,e-160)}))}));