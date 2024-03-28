import{a as l,j as e,h as p,T as m,o as x,p as y}from"./index-CJzAJxsW.js";import{p as j}from"./serviceAPI-tyEsb3sX.js";const v=()=>{const[o,d]=l.useState(null),[s,u]=l.useState(null),[a,n]=l.useState({open:!1,message:"",severity:"success"});function f(r){var t;const i=(t=r.target.files)==null?void 0:t.item(0);i&&(d(i),n({open:!0,message:"Your photo was uploaded!",severity:"success"}))}async function g(r){if(r.preventDefault(),!o){n({open:!0,message:"Please select an image file.",severity:"error"});return}new FormData().append("images",o);try{const t=await j(o),{is_plant:h}=t;h?u(t):n({open:!0,message:"No plants on the photo.",severity:"error"})}catch(t){n({open:!0,message:`Error: ${t}`,severity:"error"})}}const c=()=>{n({open:!1,message:a.message,severity:a.severity})};return e.jsxs(e.Fragment,{children:[e.jsxs("form",{onSubmit:g,style:{display:"flex",justifyContent:"space-between",flexWrap:"wrap",width:"100%"},children:[e.jsxs("label",{htmlFor:"upload",children:[e.jsx("input",{type:"file",onChange:f,style:{display:"none"},id:"upload"}),e.jsx(p,{color:"primary",variant:"contained",component:"span",sx:{color:"#fff",marginBottom:"10px"},children:"Upload a photo"})]}),e.jsx(p,{type:"submit",color:"primary",variant:"contained",component:"button",sx:{color:"#fff",marginBottom:"10px"},children:"Identify My Plant!"})]}),e.jsx("div",{children:s?e.jsxs(m,{align:"center",variant:"h4",children:["Your plant name is ",s.suggestions[0].plant_name,e.jsx("img",{src:s.images[0].url,alt:s.suggestions[0].plant_name})]}):null}),e.jsx(x,{open:a.open,autoHideDuration:4e3,onClose:c,anchorOrigin:{vertical:"top",horizontal:"center"},children:e.jsx(y,{onClose:c,severity:a.severity,children:a.message})})]})},w=()=>e.jsxs("section",{style:{maxWidth:"95%",width:"500px",display:"flex",flexDirection:"column",alignItems:"center",gap:"25px"},children:[e.jsx(m,{align:"center",variant:"h4",children:"Plants identification"}),e.jsx(v,{})]});export{w as default};