import{d as p,K as s,a0 as i,u,h as c,l,a1 as d,a2 as f,a3 as m,a4 as h,a5 as A,a6 as g,a7 as P,a8 as v,a9 as C,aa as y,ab as _,ac as b,ad as E,H as R}from"./chunks/framework.9ebe056a.js";import{t as w}from"./chunks/theme.7beeb190.js";function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,enhanceApp(t){a.enhanceApp&&a.enhanceApp(t),e.enhanceApp&&e.enhanceApp(t)}}}return e}const n=r(w),D=p({name:"VitePressApp",setup(){const{site:e}=u();return c(()=>{l(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),d(),f(),m(),n.setup&&n.setup(),()=>h(n.Layout)}});async function O(){const e=T(),a=S();a.provide(A,e);const t=g(e.route);return a.provide(P,t),a.component("Content",v),a.component("ClientOnly",C),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:a,router:e,siteData:y}),{app:a,router:e,data:t}}function S(){return _(D)}function T(){let e=s,a;return b(t=>{let o=E(t);return e&&(a=o),(e||a===o)&&(o=o.replace(/\.js$/,".lean.js")),s&&(e=!1),R(()=>import(o),[])},n.NotFound)}s&&O().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{O as createApp};
