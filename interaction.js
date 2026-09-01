'use strict';
/* v19 interaction policy: rapid repeats are questioned, never silently overruled. */
recordNow=async function(){
  const now=Date.now(),prev=events[events.length-1];
  if(prev&&now-prev.t<2000){
    const ok=await confirmSheet('连续记录？','距离上一支不足 2 秒。若这不是误触，可以继续记录。','仍然记录');
    if(!ok)return;
  }
  const ev=await addEvent(now);
  renderToday();
  const n=$('#todayNum');n.classList.remove('pop');void n.offsetWidth;n.classList.add('pop');
  puff();
  const sm=$('#stampSmoke');sm.classList.add('hot');setTimeout(()=>sm.classList.remove('hot'),1200);
  showUndo(ev);
};
