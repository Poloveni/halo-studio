import {galleryItems} from './content.js';

// Chaque comportement s’attache à sa section ; une section absente est ignorée.
const root = document.documentElement;
const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
let paused = mediaQuery.matches;
const toggle = document.querySelector('.motion-toggle');
const video = document.querySelector('.hero-video');
const hero = document.querySelector('.hero');
const story = document.querySelector('[data-story]');
const chapters = [...document.querySelectorAll('[data-chapter]')];
const storyCount = document.querySelector('.story-count');
let frame = 0;
let heroVisible = true;
const clamp = (n,min,max) => Math.min(max,Math.max(min,n));

function updateScroll(){
  frame = 0;
  if(paused) return;
  if(hero){
    const rect=hero.getBoundingClientRect();
    if(rect.bottom>0) hero.style.setProperty('--hero-shift',`${clamp(-rect.top*.13,0,140)}px`);
  }
  if(!story) return;
  const box=story.getBoundingClientRect();
  const progress=clamp(-box.top / Math.max(1,box.height-innerHeight),0,1);
  story.style.setProperty('--progress',progress);
  story.style.setProperty('--story-scale',(1.06+Math.sin(progress*Math.PI)*.12).toFixed(3));
  story.style.setProperty('--story-brightness',(.72+Math.sin(progress*Math.PI)*.38).toFixed(3));
  story.style.setProperty('--word-shift',`${(progress-.5)*-100}px`);
  const current=Math.min(2,Math.floor(progress*3));
  chapters.forEach((chapter,i)=>{
    chapter.classList.toggle('is-active',i===current);
    chapter.setAttribute('aria-hidden',String(i!==current));
  });
  if(storyCount) storyCount.textContent=`0${current+1} / 03`;
}
function queueScroll(){if(!frame&&!paused)frame=requestAnimationFrame(updateScroll);}

async function syncVideo(){
  if(!video) return;
  if(paused || !heroVisible || document.hidden){video.pause();return;}
  if(!video.getAttribute('src')){video.src=video.dataset.src;video.load();}
  try { await video.play(); } catch { /* Le visuel fixe reste disponible si la lecture est bloquée. */ }
}
function setPaused(value){
  paused=value;
  root.dataset.motion=paused?'paused':'playing';
  if(toggle){
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.setAttribute('aria-label',paused?'Activer les animations':'Mettre les animations en pause');
    toggle.querySelector('.motion-label').textContent=paused?'Animer':'Pause';
    toggle.querySelector('.motion-icon').textContent=paused?'▷':'Ⅱ';
  }
  if(paused){
    if(frame)cancelAnimationFrame(frame); frame=0;
    hero?.style.setProperty('--hero-shift','0px');
    chapters.forEach(chapter=>chapter.removeAttribute('aria-hidden'));
  } else queueScroll();
  syncVideo();
}

if('IntersectionObserver' in window){
  root.classList.add('motion-ready');
  const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');reveals.unobserve(entry.target);}
  }),{threshold:.1,rootMargin:'0px 0px -25px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>reveals.observe(el));
  if(hero){const heroObserver=new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncVideo();});heroObserver.observe(hero);}
}
video?.addEventListener('playing',()=>video.classList.add('is-playing'));
video?.addEventListener('error',()=>video.classList.remove('is-playing'));
toggle?.addEventListener('click',()=>setPaused(!paused));
mediaQuery.addEventListener('change',event=>setPaused(event.matches));
addEventListener('scroll',queueScroll,{passive:true});
addEventListener('resize',queueScroll,{passive:true});
document.addEventListener('visibilitychange',syncVideo);
setPaused(paused);

const slider=document.querySelector('#light-intensity');
const value=document.querySelector('#light-value');
const lab=document.querySelector('.light-lab');
function updateLight(){
  const amount=Number(slider.value);
  lab.style.setProperty('--light',String(.2+amount/100));
  lab.style.setProperty('--range-fill',`${(amount-10)/90*100}%`);
  value.textContent=`${amount} %`;
  slider.setAttribute('aria-valuetext',`${amount} pour cent`);
}
if(slider&&value&&lab){slider.addEventListener('input',updateLight);updateLight();}

const lightbox=document.querySelector('.lightbox');
if(lightbox){
  const image=lightbox.querySelector('img');
  document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{
    const item=galleryItems[Number(button.dataset.gallery)];
    if(!item)return;
    image.src=item.src;image.alt=item.alt;
    image.style.objectPosition=item.position;image.style.objectFit=item.size;
    lightbox.querySelector('h2').textContent=item.title;
    lightbox.querySelector('p').textContent=item.caption;
    lightbox.showModal();
    document.body.classList.add('modal-open');
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});
  lightbox.addEventListener('close',()=>document.body.classList.remove('modal-open'));
}
