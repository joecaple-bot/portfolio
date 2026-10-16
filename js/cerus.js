const asset = name => `assets/cerus/${name}.webp`;
const ambience=document.querySelector('#cb-ambience');
const soundToggle=document.querySelector('#cb-audio-toggle');
const soundStatus=document.querySelector('#cb-audio-status');
const volumeControl=document.querySelector('#cb-volume');
ambience.volume=.05;
let soundEnabled=false;
function syncSound(){soundToggle.setAttribute('aria-pressed',String(!ambience.paused));soundToggle.textContent=ambience.paused?'Enable ambience':'Mute ambience';soundStatus.textContent=ambience.paused?'Sound off':'Ambience playing quietly'}
soundToggle.addEventListener('click',async()=>{
  if(!ambience.paused){soundEnabled=false;ambience.pause();return}
  try{await ambience.play();soundEnabled=true}catch{soundEnabled=false;soundStatus.textContent='Audio could not start. Try enabling ambience again.'}
});
ambience.addEventListener('play',syncSound);
ambience.addEventListener('pause',syncSound);
ambience.addEventListener('error',()=>{soundEnabled=false;syncSound();soundStatus.textContent='Soundtrack unavailable.'});
volumeControl.addEventListener('input',()=>{ambience.volume=Number(volumeControl.value)/100});
document.addEventListener('visibilitychange',()=>{if(document.hidden)ambience.pause();else if(soundEnabled)ambience.play().catch(()=>{soundEnabled=false;syncSound()})});
const full = name => `assets/cerus/${name}-full.webp`;
const fieldPasses=[['Neutral clay','clay'],['Lit clay','lit-clay'],['Final composite','field'],['UV checker','uv']];
const fieldControls=document.querySelector('#field-controls');
fieldPasses.forEach(([label,id],i)=>{
  const button=document.createElement('button');
  button.type='button';button.textContent=label;button.setAttribute('aria-pressed',String(i===0));
  button.addEventListener('click',()=>{
    fieldControls.querySelectorAll('button').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    document.querySelector('#field-image').src=asset(id);
    document.querySelector('#field-image').alt=label+' / field character';
    document.querySelector('#field-link').href=full(id);
    document.querySelector('#field-caption').textContent=label+' / field character';
  });fieldControls.append(button);
});
document.querySelector('[data-comparison]').addEventListener('input',e=>document.querySelector('.cb-compare').style.setProperty('--split',e.target.value+'%'));
const dialog=document.querySelector('#cb-lightbox'),links=[...document.querySelectorAll('[data-lightbox]')];let active=0,trigger;
function show(index){active=(index+links.length)%links.length;const link=links[active];document.querySelector('#cb-full').src=link.href;document.querySelector('#cb-full').alt=link.querySelector('img').alt;document.querySelector('#cb-full-caption').textContent=link.querySelector('img').alt;document.querySelector('#cb-original').href=link.href}
links.forEach((link,i)=>link.addEventListener('click',e=>{e.preventDefault();trigger=link;show(i);dialog.showModal()}));document.querySelector('#cb-close').onclick=()=>dialog.close();document.querySelector('#cb-prev').onclick=()=>show(active-1);document.querySelector('#cb-next').onclick=()=>show(active+1);dialog.addEventListener('close',()=>trigger?.focus());dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(active+1);if(e.key==='ArrowLeft')show(active-1)});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('cb-in');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.cb-section').forEach(s=>observer.observe(s));let ticking=false;addEventListener('scroll',()=>{if(reduced.matches||ticking)return;ticking=true;requestAnimationFrame(()=>{document.querySelector('.cb-hero>img').style.transform=`translateY(${Math.min(scrollY*.08,65)}px) scale(1.06)`;ticking=false})},{passive:true});
