const loginForm=document.getElementById("loginForm");function cripta(e,t){let a="";for(let i=0;i<e.length;i++){let n=e.charCodeAt(i);a+=String.fromCharCode(n=(n+t.charCodeAt(i%t.length))%256)}return a}function decripta(e,t){let a="";for(let i=0;i<e.length;i++){let n=e.charCodeAt(i);a+=String.fromCharCode(n=(n-t.charCodeAt(i%t.length)+256)%256)}return a}loginForm.addEventListener("submit",function(e){e.preventDefault(),email=document.getElementById("email").value,password=document.getElementById("password").value,email=cripta(email,chiave),password=cripta(password,chiave),"\xe2\xd2\xe2\xd0\xd6\xcbe\xae\x98\xad\x99\xeb\xd7p\x9d\xa8\xa6\xe0\xde^\x9b\xe9"===email&&"\xbf\xdb\xe4\xc8\xcd\xda\xab\xa7w\xab\x95\xe0\xe1\x9e\x97kc\xa7\x9a"===password||"\xe2\xca\xe2\xd6\xcd\xd2\x9cf\xa0\x9a\xa7\xdc\xdb\x91\x9e\xa2\xa1\xe4\xa5\x9b\xa1\xe8\xa4\xa9\x9d\xd2\xe9"===email&&"\xbf\xdb\xe4\xc8\xcd\xda\xab\xa7w\xab\x95\xe0\xe1\x9e\x97kc\xa7\x9a"===password?(localStorage.setItem("email",decripta(email,chiave)),window.location.href="/amministrazione"):alert("Credenziali non valide.")});const chiave="oiuahf78394yr0293ue02u90";function apriPopup(){document.getElementById("passwordPopup").style.display="block"}function controllaPin(){var e=document.getElementById("pin").value;"\xa0\xa2\xa6\x92\xa1\x9f"===(e=cripta(e,chiave))&&(document.getElementById("email").value=decripta("\xe2\xca\xe2\xd6\xcd\xd2\x9cf\xa0\x9a\xa7\xdc\xdb\x91\x9e\xa2\xa1\xe4\xa5\x9b\xa1\xe8\xa4\xa9\x9d\xd2\xe9",chiave),document.getElementById("password").value=decripta("\xbf\xdb\xe4\xc8\xcd\xda\xab\xa7w\xab\x95\xe0\xe1\x9e\x97kc\xa7\x9a",chiave),document.getElementById("Accedi").click())}