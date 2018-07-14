import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable */
const html = `
 <!--LiveInternet counter--><script type="text/javascript"><!--
 document.write("<a href='//www.liveinternet.ru/click' "+
 "target=_blank><img src='//counter.yadro.ru/hit?t12.6;r"+
 escape(document.referrer)+((typeof(screen)=="undefined")?"":
 ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
 screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
 ";"+Math.random()+
 "' alt='' title='LiveInternet: показано число просмотров за 24"+
 " часа, посетителей за 24 часа и за сегодня' "+
 "border='0' width='88' height='31'><\/a>")
 //--></script><!--/LiveInternet-->
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
(function (d, w, c) {
  (w[c] = w[c] || []).push(function() {
    try {
      w.yaCounter40064475 = new Ya.Metrika({
          id:40064475,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
          });
          } catch(e) { }
          });

          var n = d.getElementsByTagName("script")[0],
          s = d.createElement("script"),
          f = function () { n.parentNode.insertBefore(s, n); };
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://mc.yandex.ru/metrika/watch.js";

          if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
            })(document, window, "yandex_metrika_callbacks");
            </script>
            <noscript><div><img src="https://mc.yandex.ru/watch/40064475" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
 <!-- /Yandex.Metrika counter -->
 <!-- Rating@Mail.ru counter -->
 <script type="text/javascript">
 var _tmr = window._tmr || (window._tmr = []);
 _tmr.push({id: "2823157", type: "pageView", start: (new Date()).getTime()});
 (function (d, w, id) {
   if (d.getElementById(id)) return;
   var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
   ts.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//top-fwz1.mail.ru/js/code.js";
   var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
   if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
 })(document, window, "topmailru-code");
 </script><noscript><div style="position:absolute;left:-10000px;">
 <img src="//top-fwz1.mail.ru/counter?id=2823157;js=na" style="border:0;" height="1" width="1" alt="Рейтинг@Mail.ru" />
 </div></noscript>
 <!-- //Rating@Mail.ru counter -->
 <!-- Rating@Mail.ru logo -->
 <a href="http://top.mail.ru/jump?from=2823157">
 <img src="//top-fwz1.mail.ru/counter?id=2823157;t=604;l=1"
 style="border:0;" height="31" width="80" alt="Рейтинг@Mail.ru" /></a>
 <!-- //Rating@Mail.ru logo -->
`;
/* eslint-enable */

const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <p><span className="copyright">© 2018 - scary-stories.ru</span></p>
      <p className="links">
        <span className="link-item bold">
          <Link to="/about">О проекте</Link>
        </span>
        <span className="link-item bold">
          <Link to="/faq">Часто задаваемые вопросы</Link>
        </span>
        <span className="link-item bold">
          <Link to="/feedback">Обратная связь</Link>
        </span>
      </p>
    </div>
  </footer>
);

export default Footer;
