function mountRack(products) {
 const rack=document.querySelector('#rack');
 rack.innerHTML='<div class="photo-rail" role="slider" tabindex="0" aria-label="Deslizar os cabides pela arara" aria-valuemin="1" aria-valuenow="1"><span class="rail-body"></span><span class="rail-cap start"></span><span class="rail-cap end"></span></div><div class="photo-viewport"><div class="photo-row"></div></div>';
 const rail=rack.querySelector('.photo-rail'),view=rack.querySelector('.photo-viewport'),row=rack.querySelector('.photo-row'),prev=document.querySelector('#prev'),next=document.querySelector('#next'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let starts=[],count=0,selectedId=null,drag=null,dragged=false,swayTimer;
 const behavior=()=>reduced.matches?'instant':'smooth';
 const page=()=>Math.max(0,Math.min(starts.length-1,Math.round(view.scrollLeft/view.clientWidth)));
 function select(p){document.querySelector('#selected-name').textContent=p.name;const link=document.querySelector('#detail-link');link.hidden=false;link.href='produto.html?id='+encodeURIComponent(p.id)}
 function update(){const current=page(),first=(starts[current]||0)+1,last=Math.min(products.length,first+count-1);document.querySelector('#counter').textContent=String(first).padStart(2,'0')+' — '+String(last).padStart(2,'0')+' / '+products.length;prev.disabled=current===0;next.disabled=current===starts.length-1;rail.setAttribute('aria-valuenow',current+1);rail.setAttribute('aria-valuetext','Peças '+first+' a '+last+' de '+products.length);row.querySelectorAll('.rack-page').forEach((g,i)=>{g.inert=i!==current;g.setAttribute('aria-hidden',String(i!==current))})}
 function sway(){row.classList.add('moving');clearTimeout(swayTimer);swayTimer=setTimeout(()=>row.classList.remove('moving'),750)}
 function go(target){view.scrollTo({left:Math.max(0,Math.min(starts.length-1,target))*view.clientWidth,behavior:behavior()});sway()}
 function makePiece(p,index,groupIndex){
  const b=document.createElement('button');b.className='photo-piece'+(p.name.startsWith('Baby')?' babylook':'');b.style.setProperty('--layer',index+1);b.dataset.id=p.id;b.setAttribute('aria-label',p.name+' — '+money(p.price));b.setAttribute('aria-pressed',String(selectedId===p.id));b.classList.toggle('active',selectedId===p.id);
  const shell=document.createElement('span');shell.className='garment-shell';const image=document.createElement('img');image.src=p.mockup||p.image;image.alt=p.name;image.decoding='async';image.loading=groupIndex<2?'eager':'lazy';image.draggable=false;shell.append(image);b.append(shell);
  b.addEventListener('pointerenter',()=>{if(!drag&&matchMedia('(hover:hover)').matches)select(p)});b.addEventListener('focus',()=>select(p));b.onclick=()=>{if(dragged)return;if(selectedId===p.id){location.href='produto.html?id='+encodeURIComponent(p.id);return}selectedId=p.id;row.querySelectorAll('.photo-piece').forEach(x=>{const active=x.dataset.id===selectedId;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});select(p)};return b;
 }
 let oldWidth=0;
 function layout(){
  const width=view.clientWidth;if(!width||width===oldWidth)return;
  const firstIndex=starts[Math.max(0,Math.min(starts.length-1,Math.round(view.scrollLeft/(oldWidth||width))))]||0;oldWidth=width;
  const nextCount=Math.min(products.length,width>=1000?5:width>=700?4:width>=480?3:2);
  rack.style.setProperty('--garment-size',Math.min(285,(width-24)/nextCount-24)+'px');rack.style.setProperty('--rack-count',nextCount);
  if(nextCount!==count){count=nextCount;
   // Overlap the last group so every resting position contains complete pieces.
   starts=Array.from({length:Math.ceil(products.length/count)},(_,i)=>Math.min(i*count,products.length-count));row.replaceChildren();
   starts.forEach((start,groupIndex)=>{const group=document.createElement('div');group.className='rack-page';group.setAttribute('role','group');group.setAttribute('aria-label','Peças '+(start+1)+' a '+(start+count));products.slice(start,start+count).forEach((p,i)=>group.append(makePiece(p,i,groupIndex)));row.append(group)});rail.setAttribute('aria-valuemax',starts.length);
  }
  view.scrollTo({left:Math.min(starts.length-1,Math.floor(firstIndex/count))*width,behavior:'instant'});update();
 }
 prev.onclick=()=>go(page()-1);next.onclick=()=>go(page()+1);
 rail.addEventListener('keydown',e=>{const targets={ArrowRight:page()+1,ArrowLeft:page()-1,Home:0,End:starts.length-1};if(e.key in targets){e.preventDefault();go(targets[e.key])}});
 view.addEventListener('scroll',()=>{update();sway()},{passive:true});
 for(const target of [rail,view]){
  target.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,left:view.scrollLeft,page:page(),id:e.pointerId,target};dragged=false});
  target.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const distance=e.clientX-drag.x;if(Math.abs(distance)<=7&&!dragged)return;if(!dragged){dragged=true;target.setPointerCapture(e.pointerId);rack.classList.add('dragging')}view.scrollLeft=drag.left-distance;sway();e.preventDefault()});
  const end=e=>{if(!drag||drag.id!==e.pointerId)return;const distance=drag.x-e.clientX,destination=e.type==='pointercancel'?drag.page:Math.abs(distance)>Math.min(70,view.clientWidth*.18)?drag.page+Math.sign(distance):drag.page;if(target.hasPointerCapture(e.pointerId))target.releasePointerCapture(e.pointerId);drag=null;rack.classList.remove('dragging');if(dragged)go(destination);setTimeout(()=>dragged=false,100)};target.addEventListener('pointerup',end);target.addEventListener('pointercancel',end);
 }
 new ResizeObserver(layout).observe(view);layout();
}
