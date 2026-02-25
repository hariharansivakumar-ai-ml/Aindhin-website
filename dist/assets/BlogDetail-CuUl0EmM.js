import{g as L,u as z,r as l,j as e,L as N}from"./index-80fPDcQI.js";import{h as A,i as E,a as q,j as R}from"./apiClient-By3N48Vp.js";import{A as U}from"./arrow-left-CMtqZ6EZ.js";import{U as w}from"./user-DLUyzu8B.js";import{C as h}from"./calendar-DbILaviy.js";import{M as d}from"./message-square-BEvWHOqI.js";import{S as G}from"./search-BP-g2yVK.js";const H=()=>{var j;const{slug:x}=L(),c=z(),[r,v]=l.useState(null),[f,k]=l.useState([]),[_,u]=l.useState(!0),[i,C]=l.useState(""),[a,o]=l.useState({name:"",email:"",subject:"",message:"",save:!1}),[n,S]=l.useState([]),[b,y]=l.useState(!1),B=async t=>{try{const s=await R(t);S(s||[])}catch(s){console.error("Error fetching comments:",s)}};l.useEffect(()=>{(async()=>{try{u(!0),window.scrollTo(0,0);const s=await E(x);v(s),document.title=`${s.title} | Aindhin`,B(s.id);const p=await q();k((p||[]).filter(D=>D.slug!==x).slice(0,5))}catch(s){console.error("Error fetching blog:",s.message),c("/404")}finally{u(!1)}})()},[x,c]);const m=t=>t?new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"";if(_)return e.jsx("div",{className:"min-h-screen bg-[#f4f6fb] pt-32 pb-16 flex justify-center items-center",children:e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"}),e.jsx("p",{className:"text-sm text-gray-400 font-medium",children:"Loading article…"})]})});if(!r)return null;const g=({title:t,icon:s,children:p})=>e.jsxs("div",{className:"bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden",children:[e.jsxs("div",{className:"flex items-center gap-2 px-5 pt-5 pb-3 border-b border-gray-100",children:[s&&e.jsx(s,{className:"w-4 h-4 text-primary"}),e.jsx("h3",{className:"text-sm font-bold text-gray-800 uppercase tracking-wider",children:t})]}),e.jsx("div",{className:"p-5",children:p})]});return e.jsxs("div",{className:"min-h-screen bg-[#f4f6fb] pt-24 pb-16 px-4 md:px-6 lg:px-8",style:{fontFamily:"'Inter', sans-serif"},children:[e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs(N,{to:"/blog",className:"inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 font-medium no-underline",children:[e.jsx(U,{className:"w-4 h-4"}),"All Blogs"]}),e.jsxs("div",{className:"flex flex-col lg:flex-row gap-7",children:[e.jsxs("main",{className:"flex-1 min-w-0 space-y-6",children:[e.jsxs("div",{className:"bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden",children:[e.jsx("div",{className:"h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-indigo-500"}),r.image_url&&e.jsx("div",{className:"overflow-hidden",children:e.jsx("img",{src:r.image_url,alt:r.title,className:"w-full object-cover max-h-[440px]"})}),e.jsxs("div",{className:"px-5 md:px-8 lg:px-10 pt-8 pb-10",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 mb-4",children:[e.jsxs("span",{className:"inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-3 py-1",children:[e.jsx(w,{className:"w-3 h-3"}),r.author||"Aindhin"]}),r.date&&e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"inline-flex items-center gap-1.5 text-xs text-gray-400",children:[e.jsx(h,{className:"w-3 h-3"}),m(r.date||r.created_at)]}),n.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-gray-200",children:"|"}),e.jsxs("span",{className:"inline-flex items-center gap-1.5 text-xs text-gray-400",children:[e.jsx(d,{className:"w-3 h-3"}),n.length," Comments"]})]})]})]}),e.jsx("h1",{className:"text-2xl md:text-[1.85rem] font-extrabold text-gray-900 leading-tight mb-6 tracking-tight",children:r.title}),e.jsx("hr",{className:"border-gray-100 mb-6"}),e.jsx("div",{className:"blog-content text-gray-700 leading-relaxed",dangerouslySetInnerHTML:{__html:(j=r.description)==null?void 0:j.replace(/&nbsp;|\u00A0/g," ")}})]})]}),n.length>0&&e.jsxs("div",{className:"bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden p-7",children:[e.jsxs("h3",{className:"text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-50 flex items-center gap-2",children:[e.jsx(d,{className:"w-5 h-5 text-primary"}),"Community Conversations (",n.length,")"]}),e.jsx("div",{className:"space-y-6",children:n.map(t=>e.jsxs("div",{className:"flex gap-4 group",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0",children:e.jsx(w,{size:20})}),e.jsxs("div",{className:"flex-1 space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"text-sm font-bold text-gray-800",children:t.author_name}),e.jsx("span",{className:"text-[11px] text-gray-400",children:m(t.created_at)})]}),e.jsx("p",{className:"text-sm text-gray-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-50",children:t.content})]})]},t.id))})]}),e.jsxs("div",{className:"bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden",children:[e.jsx("div",{className:"h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500"}),e.jsxs("div",{className:"px-5 md:px-8 lg:px-10 pt-8 pb-10",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx(d,{className:"w-5 h-5 text-primary"}),e.jsx("h2",{className:"text-lg font-bold text-gray-900",children:"Leave A Comment"})]}),e.jsx("p",{className:"text-xs text-gray-400 mb-6 ml-7",children:"Your email address will not be published. Required fields are marked *"}),e.jsxs("form",{onSubmit:t=>t.preventDefault(),className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx("label",{className:"text-[11px] font-bold text-gray-400 uppercase tracking-widest",children:"Name *"}),e.jsx("input",{type:"text",placeholder:"John Doe",value:a.name,onChange:t=>o({...a,name:t.target.value}),className:"w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"})]}),e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx("label",{className:"text-[11px] font-bold text-gray-400 uppercase tracking-widest",children:"Email *"}),e.jsx("input",{type:"email",placeholder:"john@example.com",value:a.email,onChange:t=>o({...a,email:t.target.value}),className:"w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"})]})]}),e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx("label",{className:"text-[11px] font-bold text-gray-400 uppercase tracking-widest",children:"Subject"}),e.jsx("input",{type:"text",placeholder:"What's this about?",value:a.subject,onChange:t=>o({...a,subject:t.target.value}),className:"w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"})]}),e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx("label",{className:"text-[11px] font-bold text-gray-400 uppercase tracking-widest",children:"Comment *"}),e.jsx("textarea",{placeholder:"Share your thoughts or questions…",rows:5,value:a.message,onChange:t=>o({...a,message:t.target.value}),className:"w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none resize-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] focus:bg-white placeholder:text-gray-300"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2",children:[e.jsxs("label",{className:"flex items-start gap-2 text-xs text-gray-400 cursor-pointer select-none",children:[e.jsx("input",{type:"checkbox",checked:a.save,onChange:t=>o({...a,save:t.target.checked}),className:"mt-0.5 accent-primary"}),"Save my name and email in this browser for next time."]}),e.jsx("button",{type:"submit",disabled:b,onClick:async t=>{if(t.preventDefault(),!a.name||!a.email||!a.message){alert("Please fill in all required fields.");return}try{y(!0),await A({post_id:r.id,author_name:a.name,author_email:a.email,subject:a.subject,content:a.message}),alert("Comment submitted for approval!"),o({name:"",email:"",subject:"",message:"",save:a.save})}catch(s){alert("Error: "+s.message)}finally{y(!1)}},className:"shrink-0 px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-bold hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-primary/20 disabled:opacity-50",children:b?"Submitting...":"Post Comment"})]})]})]})]})]}),e.jsxs("aside",{className:"w-full lg:w-[300px] xl:w-[310px] shrink-0 space-y-5",children:[e.jsx(g,{title:"Search",icon:G,children:e.jsxs("div",{className:"flex gap-2 min-w-0",children:[e.jsx("input",{type:"text",value:i,onChange:t=>C(t.target.value),onKeyDown:t=>t.key==="Enter"&&i&&c(`/blog?q=${encodeURIComponent(i)}`),placeholder:"Search articles…",className:"min-w-0 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-[#f8fafd] placeholder:text-gray-300"}),e.jsx("button",{onClick:()=>i&&c(`/blog?q=${encodeURIComponent(i)}`),className:"shrink-0 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700",children:"Go"})]})}),e.jsx(g,{title:"Recent Comments",icon:d,children:n.length===0?e.jsx("p",{className:"text-sm text-gray-400 italic",children:"No comments yet."}):e.jsx("div",{className:"space-y-3",children:n.slice(0,3).map(t=>e.jsxs("div",{className:"group",children:[e.jsxs("p",{className:"text-xs font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2",children:[t.author_name,": ",e.jsxs("span",{className:"font-normal text-gray-500",children:['"',t.content,'"']})]}),e.jsx("p",{className:"text-[10px] text-gray-300 mt-1 uppercase font-bold tracking-tight",children:m(t.created_at)})]},t.id))})}),e.jsx(g,{title:"Recent Blogs",icon:h,children:f.length===0?e.jsx("p",{className:"text-sm text-gray-400 italic",children:"No recent posts."}):e.jsx("div",{className:"space-y-4",children:f.map(t=>e.jsxs(N,{to:`/blog/${t.slug}`,className:"flex gap-3 group no-underline",children:[e.jsx("div",{className:"w-[60px] h-[52px] rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100",children:t.image_url?e.jsx("img",{src:t.image_url,alt:t.title,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-gradient-to-br from-primary/20 to-blue-100 flex items-center justify-center",children:e.jsx("span",{className:"text-[10px] font-bold text-primary",children:"Blog"})})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-[13px] font-semibold text-gray-800 group-hover:text-primary leading-snug line-clamp-2 mb-1",children:t.title}),e.jsxs("div",{className:"flex items-center gap-1 text-[11px] text-primary font-medium",children:[e.jsx(h,{className:"w-3 h-3"}),m(t.date||t.created_at)]})]})]},t.id))})})]})]})]}),e.jsx("style",{children:`
                .blog-content {
                    font-size: 1.0625rem; /* 17px */
                    line-height: 1.8;
                    color: #1f2937;
                    word-break: normal; 
                    overflow-wrap: break-word;
                    white-space: normal;
                }

                .blog-content * {
                    word-break: normal;
                    overflow-wrap: break-word;
                    white-space: normal;
                }

                .blog-content p {
                    margin-bottom: 1.5rem;
                }

                .blog-content h1, .blog-content h2, .blog-content h3 {
                    color: #111827;
                    font-weight: 800;
                    line-height: 1.3;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                }
                
                .blog-content h1 { font-size: 2.25rem; }
                .blog-content h2 { font-size: 1.75rem; }
                .blog-content h3 { font-size: 1.25rem; }

                .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }

                .blog-content li {
                    margin-bottom: 0.5rem;
                }

                .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 1rem;
                    margin: 2.5rem 0;
                    display: block;
                }

                .blog-content a { 
                    color: #2563eb; 
                    font-weight: 600; 
                    text-decoration: underline; 
                    text-underline-offset: 4px;
                }
                
                .blog-content blockquote { 
                    border-left: 4px solid #3b82f6; 
                    padding: 1.5rem 2rem; 
                    background: #f8fafc; 
                    color: #334155; 
                    font-style: italic; 
                    margin: 2rem 0; 
                    border-radius: 0 1rem 1rem 0; 
                }

                .blog-content pre { 
                    background: #0f172a; 
                    color: #f8fafc; 
                    padding: 1.5rem; 
                    border-radius: 0.75rem; 
                    overflow-x: auto; 
                    margin: 2rem 0; 
                    font-size: 0.875rem; 
                }

                .blog-content table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 2rem 0; 
                    font-size: 0.9375rem; 
                }

                .blog-content th { 
                    background: #f1f5f9; 
                    padding: 0.75rem 1rem; 
                    text-align: left; 
                    font-weight: 700; 
                    border: 1px solid #e2e8f0; 
                }

                .blog-content td { 
                    padding: 0.75rem 1rem; 
                    border: 1px solid #e2e8f0; 
                }
            `})]})};export{H as default};
