function checkData(e,t){for(var l=0;l<e.length;l++)if(e[l]==t)return!1;return!0}function filterSelection(e){let t=document.getElementsByClassName("item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"),l;if("all"==e)for(var a=0;a<t.length;a++)t[a].style="";else for(var a=0;a<t.length;a++)(l=t[a].querySelector(".gallery-item")).getAttribute("data-gallery-tag")!=e&&(t[a].style.display="none"),l.getAttribute("data-gallery-tag")==e&"none"==t[a].style.display&&(t[a].style="")}function addEventFilter(e){e.addEventListener("click",function(){var e=document.getElementsByClassName("nav-link active active-tag");e[0].className=e[0].className.replace("nav-link active active-tag","nav-link"),this.className+=" active active-tag",filterSelection(this.getAttribute("data-images-toggle"))})}function addEventItem(e,t){let l=document.querySelector(".modal"),a=e.querySelector(".lightboxImage");t.addEventListener("click",function(){a.src=t.src,l.removeAttribute("aria-hidden"),l.className+=" show",l.setAttribute("aria-modal","true"),l.style.display="block",l.setAttribute("role","dialog"),l.setAttribute("tabindex",t.getAttribute("index"))})}function setFilters(){let e=0,t=document.querySelector(".gallery");t.style="";let l=document.createElement("ul");l.className="my-4 tags-bar nav nav-pills";let a=document.getElementsByClassName("gallery-item"),i=document.createElement("li");i.className="nav-item",t.appendChild(l);let n=document.createElement("div");n.id="myAwesomeLightbox",n.className="modal fade",n.setAttribute("tabindex",-1),n.style.display="none",n.setAttribute("aria-hidden","true"),t.appendChild(n);let s=document.createElement("div");s.className="modal-dialog",s.setAttribute("role","document"),n.appendChild(s);let r=document.createElement("div");r.className="modal-content",s.appendChild(r);let d=document.createElement("div");d.className="modal-body",r.appendChild(d);let c=document.createElement("div");c.className="mg-prev",c.style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;",c.textContent="<",d.appendChild(c);let o=document.createElement("div");o.className="mg-next",o.style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}",o.textContent=">",d.appendChild(o);let m=document.createElement("img");m.className="lightboxImage img-fluid",m.setAttribute("alt","Contenu de l'image affich\xe9e dans la modale au clique"),d.appendChild(m),l.appendChild(i);let u=document.createElement("div");u.className="gallery-items-row row",t.appendChild(u);let g=document.getElementsByClassName("gallery-item");for(var p=0;p<g.length;p++){let b=document.createElement("div");b.className="item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4",u.appendChild(b),g[0].className="gallery-item img-fluid",g[0].setAttribute("index",p),addEventItem(d,g[0]),b.appendChild(g[0])}let v=document.getElementsByClassName("item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4");c.addEventListener("click",function(){for(let t=n.getAttribute("tabindex")-1;t>=0;t--)if("none"!=v[t].style.display){m.src=g[t].src,n.setAttribute("tabindex",g[t].getAttribute("index")),e=1;return}e=1}),o.addEventListener("click",function(){for(let t=n.getAttribute("tabindex");t<v.length;t++)if("none"!=v[t].style.display&t!=n.getAttribute("tabindex")){m.src=g[t].src,n.setAttribute("tabindex",g[t].getAttribute("index")),e=1;return}e=1}),n.addEventListener("click",function(){if(1==e){e=0;return}n.setAttribute("aria-hidden","true"),n.className="modal fade",n.removeAttribute("aria-modal"),n.style.display="none",n.removeAttribute("role")});let y=document.createElement("span");y.className="nav-link active active-tag",y.setAttribute("data-images-toggle","all"),y.textContent="Tous",addEventFilter(y),i.appendChild(y);let h=["Tous"],f;for(var p=0;p<a.length;p++)if(!0==checkData(h,f=a[p].getAttribute("data-gallery-tag"))){h.push(f);let E=document.createElement("li");E.className="nav-item active",l.appendChild(E);let A=document.createElement("span");A.className="nav-link",A.setAttribute("data-images-toggle",f),A.textContent=f,addEventFilter(A),E.appendChild(A)}}setFilters();