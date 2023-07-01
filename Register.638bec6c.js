function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=r.parcelRequire10c2;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},r.parcelRequire10c2=i),i.register("27Lyk",function(t,r){"use strict";e(t.exports,"register",()=>n,e=>n=e),e(t.exports,"resolve",()=>o,e=>o=e);var n,o,i={};n=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)i[t[r]]=e[t[r]]},o=function(e){var t=i[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}}),i("27Lyk").register(JSON.parse('{"7kFgJ":"Register.638bec6c.js","lJfxJ":"tickers_noSpecialChart_withName.e24a985a.csv","3ILDj":"error-icon.d9c2a70f.png","hjiE0":"successIconLarge.fcca01cd.png"}'));var a={};a=new URL(i("27Lyk").resolve("lJfxJ"),import.meta.url).toString(),fetch(t(a)).then(e=>e.text()).then(e=>e.split("\n").map(e=>{let t=e.split(",");if(t[1]=t[1]?.slice(0,-1),"undefined"!==t[1]&&t[1]&&!(t[1].length<1)&&"ZZZ"!==t[0])return t}).filter(e=>e));var s={};s=new URL(i("27Lyk").resolve("3ILDj"),import.meta.url).toString();var c={};c=new URL(i("27Lyk").resolve("hjiE0"),import.meta.url).toString();const l=document.querySelector("main"),d=document.querySelector(".login-form"),u=document.querySelector("#register-form"),f=document.querySelector("#button-submit"),p=document.querySelectorAll("label");window.addEventListener("load",function(){this.document.querySelector(".waitLoad").classList.add("hidden")}),u.addEventListener("submit",function(e){e.preventDefault(),f.innerHTML='<div class="loader-button"></div>',b();let t=new FormData(u),r={};t.forEach((e,t)=>{"formStartBal"===t&&(e=+e),r[t]=e}),g(r)});const g=async function(e){let t=new Headers;t.append("Content-Type","application/json");let r=new Request("https://bamboospring-production.up.railway.app/auth/register",{method:"POST",headers:t,body:JSON.stringify(e)}),n=await fetch(r);if(!n.ok)return m(await n.json());h()},m=function(e){e.details.forEach(e=>{let t=e.indexOf(":"),r="validatePassword"===e.slice(0,t)||"passwordMatch"===e.slice(0,t)?"password":e.slice(0,t);document.querySelector(`#${r}`).innerHTML=w(e.slice(t+1))}),f.innerHTML="<p>Log in</p>"},h=function(){d.classList.add("hidden");let e=`
  <section class="register-success main-form">
    <img
        src="${t(c)}"
        alt="account_creation_success"
    />
    <div class="success-message">
        <h1>Account successfully created!</h1>
        <p id="redirect-msg">
        You will be redirected to the login page shortly...
        </p>
        <a id="redirect-manual" href="/LoginPage.html">Click here if you are not redirected.</a>
    </div>
  </section>
  `;l.insertAdjacentHTML("beforeend",e),setTimeout(()=>{window.location.href="/Bamboo-Stock-Trading/LoginPage.html"},"2000")},b=function(){p.forEach(e=>{e.innerHTML="&nbsp;"})},w=function(e){return`
    <img src="${t(s)}" alt="error-icon">
    <p>${e}</p>
    `};
//# sourceMappingURL=Register.638bec6c.js.map
