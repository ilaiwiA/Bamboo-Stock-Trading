function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire10c2;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequire10c2=o),o.register("27Lyk",function(t,n){"use strict";e(t.exports,"register",()=>r,e=>r=e),e(t.exports,"resolve",()=>o,e=>o=e);var r,o,i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw Error("Could not resolve bundle with id "+e);return t}}),o("27Lyk").register(JSON.parse('{"qXT0n":"LoginPage.e731cb42.js","lJfxJ":"tickers_noSpecialChart_withName.e24a985a.csv"}'));var i={};i=new URL(o("27Lyk").resolve("lJfxJ"),import.meta.url).toString(),fetch(function(e){return e&&e.__esModule?e.default:e}(i)).then(e=>e.text()).then(e=>e.split("\n").map(e=>{let t=e.split(",");if(t[1]=t[1]?.slice(0,-1),"undefined"!==t[1]&&t[1]&&!(t[1].length<1)&&"ZZZ"!==t[0])return t}).filter(e=>e));const l=document.querySelector("#login-form"),a=document.querySelector("#button-submit"),s=document.querySelector("#login-failure");window.addEventListener("load",function(){this.document.querySelector(".waitLoad").classList.add("hidden")}),l.addEventListener("submit",function(e){e.preventDefault(),a.innerHTML='<div class="loader-button"></div>';let t=new FormData(l),n={username:t.get("formName"),password:t.get("formPass")};d(n)});const d=async function(e){let t=new Headers;t.append("Content-Type","application/json");let n=new Request("https://bamboospring-production.up.railway.app/auth/login",{method:"POST",headers:t,body:JSON.stringify(e),credentials:"include"}),r=await fetch(n);if(!r.ok)return u();window.location.href="/"},u=function(){s.classList.remove("hidden"),a.innerHTML="<p>Log in</p>"};
//# sourceMappingURL=LoginPage.e731cb42.js.map