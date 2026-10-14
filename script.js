
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

/* ===== FUTURISTIC INTRO CONTROLLER ===== */
(() => {
  const intro = document.getElementById("intro");
  if (!intro) return;

  const skipButton = document.getElementById("skip");
  const progressBar = document.getElementById("intro-progress-bar");
  const loadingText = document.getElementById("intro-loading-text");
  const particleCanvas = document.getElementById("intro-particles");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const SESSION_KEY = "tcshsIntroSeen";
  const DURATION = reducedMotion ? 700 : 4700;
  let finished = false;
  let frameId = 0;
  let resizeHandler = null;

  // Don't replay the intro on every page reload in the same tab session.
  try {
    if (sessionStorage.getItem(SESSION_KEY) === "yes") {
      intro.classList.add("gone");
      return;
    }
  } catch (error) {
    // Continue normally if browser storage is unavailable.
  }

  function finishIntro() {
    if (finished) return;
    finished = true;

    try {
      sessionStorage.setItem(SESSION_KEY, "yes");
    } catch (error) {
      // The intro still works without session storage.
    }

    intro.classList.add("gone");

    if (frameId) cancelAnimationFrame(frameId);
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
    }

    // Remove the overlay after its fade-out animation.
    window.setTimeout(() => {
      if (intro.classList.contains("gone")) {
        intro.style.display = "none";
      }
    }, 950);
  }

  // Skip button: don't let the click trigger unrelated page actions.
  if (skipButton) {
    skipButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      finishIntro();
    });
  }

  // Escape provides a keyboard-accessible skip option.
  function handleEscape(event) {
    if (event.key === "Escape" && !finished) {
      finishIntro();
    }
  }

  document.addEventListener("keydown", handleEscape);

  if (reducedMotion) {
    if (progressBar) progressBar.style.width = "100%";
    if (loadingText) loadingText.textContent = "READY";
    window.setTimeout(finishIntro, DURATION);
    return;
  }

  // Animated progress indicator and changing status text.
  const startTime = performance.now();
  const messages = [
    "INITIALIZING DISCOVERY",
    "CONNECTING KNOWLEDGE",
    "PREPARING YOUR EXPERIENCE",
    "SYSTEM READY"
  ];

  function animateProgress(now) {
    if (finished) return;

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 2);

    if (progressBar) {
      progressBar.style.width = `${eased * 100}%`;
    }

    if (loadingText) {
      const messageIndex = Math.min(
        Math.floor(progress * messages.length),
        messages.length - 1
      );
      loadingText.textContent = messages[messageIndex];
    }

    if (progress >= 1) {
      finishIntro();
      return;
    }

    frameId = requestAnimationFrame(animateProgress);
  }

  // Lightweight floating particles in the intro only.
  if (particleCanvas) {
    const ctx = particleCanvas.getContext("2d");

    if (ctx) {
      let width = 0;
      let height = 0;
      let particles = [];

      function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        particleCanvas.width = Math.round(width * dpr);
        particleCanvas.height = Math.round(height * dpr);
        particleCanvas.style.width = `${width}px`;
        particleCanvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.min(
          65,
          Math.max(24, Math.floor(width / 17))
        );

        particles = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.7 + 0.4,
          speed: Math.random() * 0.32 + 0.08,
          alpha: Math.random() * 0.55 + 0.2
        }));
      }

      function drawParticles() {
        if (finished) return;

        ctx.clearRect(0, 0, width, height);

        for (const particle of particles) {
          particle.y -= particle.speed;

          if (particle.y < -5) {
            particle.y = height + 5;
            particle.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = `rgba(103, 232, 249, ${particle.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#38bdf8";
          ctx.fill();
        }

        ctx.shadowBlur = 0;
        frameId = requestAnimationFrame(drawParticles);
      }

      resizeHandler = resizeCanvas;
      resizeCanvas();
      drawParticles();
    }
  }

  // Start the progress animation. The intro fades away at completion.
  frameId = requestAnimationFrame(animateProgress);
})();
const cv=$('#cv'),cx=cv.getContext('2d');let P=[],run=0;
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
function burst(x,y,a,n=14){for(let i=0;i<n;i++){const t=Math.random()*6.28,s=2+Math.random()*7;P.push({x,y,vx:Math.cos(t)*s,vy:Math.sin(t)*s-3,l:60+Math.random()*30,c:a[i%a.length]})}if(!run){run=1;lp()}}
function lp(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.2;p.l--;cx.globalAlpha=Math.min(1,p.l/30);cx.font='24px serif';cx.fillText(p.c,p.x,p.y)});P.length?requestAnimationFrame(lp):run=0}
const SC=['⚛','🧪','∑','π','🔬','⚡','🧬','Δ','E=mc²'];

function go(id){$$('.v').forEach(v=>v.classList.toggle('on',v.id==id));$$('nav [data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go==id));scrollTo(0,0)}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g)go(g.dataset.go);const t=e.target.closest('[data-t]');if(t)document.documentElement.dataset.theme=t.dataset.t});
const ST=['House Quiz','House Spinner','Club Member','Campus Explorer','Strand Explorer','History Reader','Quote Collector','Secret Finder'],got=new Set();
function stamp(){}
function modal(h){$('#mc').innerHTML=h+'<p><button class="btn" id="mx">Close</button></p>';$('#md').classList.add('on');$('#mx').onclick=()=>$('#md').classList.remove('on')}
function pass(){modal('<h2>🎫 Explorer Passport</h2><div id="pg"><i style="width:'+got.size/8*100+'%"></i></div>'+ST.map(s=>'<p>'+(got.has(s)?'✅':'⬜')+' '+s+'</p>').join(''))}

const LF = {
  '🎉 Events': ['Olympiad', 'PaScilubong', 'Intramurals', 'Buwan ng Wika', 'Christmas Party'],
  '🧑‍🎓 Students': ['Student Council', 'Honor Students', 'Class Pictures', 'Campus Life', 'Friends'],
  '🏆 Competitions': ['Quiz Bee', 'Dance Contest', 'Bidyokasiya ', 'Sineliksik', 'Dokyuwento '],
  '🔬 Class & Labs': ['Science Lab', 'Research Day', 'Computer Lab', 'Clubs', 'Group Work'],
  '🏅 House Games': ['Handasa', 'Techne', 'Manthanein', 'Scire', 'Houses ']
};

const LP = {
  '🎉 Events0': 'foundation-day.jpg',
  '🎉 Events1': 'science-fair.jpg',
  '🎉 Events2': 'intramurals.jpg',
  '🎉 Events3': 'buwan-ng-wika.jpg',
  '🎉 Events4': 'christmas-party.jpg',

  '🧑‍🎓 Students0': 'student-council.jpg',
  '🧑‍🎓 Students1': 'honor-students.jpg',
  '🧑‍🎓 Students2': 'class-pictures.jpg',
  '🧑‍🎓 Students3': 'campus-life.jpg',
  '🧑‍🎓 Students4': 'friends.jpg',

  '🏆 Competitions0': 'quiz-bee.jpg',
  '🏆 Competitions1': 'robotics-contest.jpg',
  '🏆 Competitions2': 'math-olympiad.jpg',
  '🏆 Competitions3': 'debate.jpg',
  '🏆 Competitions4': 'sports-meet.jpg',

  '🔬 Class & Labs0': 'science-lab.jpg',
  '🔬 Class & Labs1': 'research-day.jpg',
  '🔬 Class & Labs2': 'computer-lab.jpg',
  '🔬 Class & Labs3': 'field-trip.jpg',
  '🔬 Class & Labs4': 'group-work.jpg',

  '🏅 House Games0': 'handasa.jpg',
  '🏅 House Games1': 'techne.jpg',
  '🏅 House Games2': 'manthanein.jpg',
  '🏅 House Games3': 'scire.jpg',
  '🏅 House Games4': 'opening-parade.jpg'
};
function life(k){$$('#tl button').forEach(b=>b.classList.toggle('on',b.dataset.k==k));$('#lp').innerHTML=LF[k].map((c,i)=>'<label class="'+(LP[k+i]?'':'e')+'" style="'+(LP[k+i]?'background-image:url('+LP[k+i]+');border-style:solid':'')+'"><input type="file" accept="image/*"><span>'+c+'</span></label>').join('');$$('#lp label').forEach((l,i)=>{const id=k+i;l.onclick=e=>{if(LP[id]){e.preventDefault();modal('<img src="'+LP[id]+'" style="max-width:100%;max-height:70vh;border-radius:16px"><h3>'+LF[k][i]+'</h3>')}};l.querySelector('input').onchange=ev=>{const f=ev.target.files[0];if(f){const r=new FileReader();r.onload=()=>{LP[id]=r.result;life(k)};r.readAsDataURL(f)}}})}
$('#tl').innerHTML=Object.keys(LF).map(k=>'<button data-k="'+k+'">'+k+'</button>').join('');
$$('#tl button').forEach(b=>b.onclick=()=>{life(b.dataset.k);stamp('Campus Explorer')});life('🎉 Events');
const CL=[['🎤','Toastmasters'],['♟️','Chess Club'],['🤖','Robotics'],['🧪','Science Club'],['🎨','Artist Circle'],['🎭','Performing Arts'],['✝️','Campus Ministry'],['🎸','Troubadours']];
$('#cl').innerHTML=CL.map(c=>'<button class="card c club"><div class="big">'+c[0]+'</div><b>'+c[1]+'</b><br><small>Tap to join</small></button>').join('');
$$('.club').forEach(b=>b.onclick=()=>{b.classList.toggle('j');b.querySelector('small').textContent=b.classList.contains('j')?'Joined ✔':'Tap to join';stamp('Club Member')});
$$('.fp').forEach(f=>f.onclick=()=>{f.classList.toggle('f');stamp('Strand Explorer')});

const H=[
  ['HANDASA','#e0a800','⚡','ENGINEERING',
   'Inspired by the Arabic word for engineering and geometry.',
   ' Handasa represents the art of designing, building, and creating practical solutions through innovation and precision.'],

  ['TECHNE','#e03a3a','🔥','TECHNOLOGY',
   'Derived from the Greek word technē, meaning art, craft, or skill.',
   'Techne represents human ingenuity and the application of knowledge to create useful tools, techniques, and innovations.'],

  ['MANTHANEIN','#1d5fd6','💧','MATHEMATICS',
   'Inspired by the Sanskrit word manthana, meaning reflection, contemplation, or deep thought.',
   'Manthanein symbolizes logical reasoning, intellectual curiosity, and the pursuit of understanding.'],

  ['SCIRE','#1fa64a','🌿','SCIENCE',
   'Derived from the Latin word scire, meaning “to know,” ',
   'Scire embodies curiosity, discovery, and the continuous pursuit of knowledge through observation and investigation.']
];

$('#hg').innerHTML=H.map((h,i)=>'<div class="card c h" style="--c:'+h[1]+'" data-e="'+h[2]+'" data-i="'+i+'"><h3>'+h[0]+'</h3><small>'+h[2]+' '+h[3]+'</small><p>'+h[4]+'</p></div>').join('');
$$('.h').forEach(c=>c.onclick=e=>{
  const h=H[c.dataset.i];
  modal('<h1 style="color:'+h[1]+'">'+h[0]+'</h1><h3>'+h[2]+' '+h[3]+'</h3><p>'+h[5]+'</p><p>'+h[4]+'</p>')
});
function quiz(el,Q,done){let qi=0,s=[0,0,0,0];(function r(){if(qi>=Q.length)return done(s);const q=Q[qi];el.innerHTML='<p><b>'+(qi+1)+'/'+Q.length+' · '+q[0]+'</b></p>';q.slice(1).forEach(o=>{const b=document.createElement('button');b.className='o';b.textContent=o[0];b.onclick=ev=>{s[o[1]]++;qi++;r()};el.appendChild(b)})})()}
const HQ=[["What do you love to do most?",["Build and fix things",0],["Create and design",1],["Read and research",2],["Explore nature",3]],["When a group has a problem, you…",["Plan and organize",0],["Lead boldly",1],["Analyze first",2],["Keep everyone calm",3]],["Which school project sounds most fun?",["Designing a bridge",0],["Making a short film",1],["Researching a mystery",2],["Studying an ecosystem",3]]];
function hq(){quiz($('#qa'),HQ,s=>{const w=s.indexOf(Math.max(...s)),h=H[w];$('#qa').innerHTML='<p style="font-size:20px">You are <b style="color:'+h[1]+'">'+h[0]+'</b>! '+h[2]+' '+h[3]+'</p><button class="btn" id="rq">Retake</button>';$('#rq').onclick=hq;burst(innerWidth/2,innerHeight/2,['🎉','✨',h[2]],40);stamp('House Quiz')})}hq();

/* ===== EDIT HERE: WINS (hall of achievements) =====
   cat   = category tab name
   title = what we won
   note  = year / event
   img   = photo path or link (leave '' to show an upload box) */
const WINS=[
 {cat:'NSEF',title:'1 Minute Science Video News Challenge: 1st Place',note:'National Science and Engineering Fair, 2026',img:'nsef.jpg'},
 {cat:'Research',title:'National Materials Science and Engineering Summit: 2nd Place',note:'National, 2025',img:'nstf.jpg'},
 {cat:'Sports',title:'Chess: 1st Place',note:'Division Cluster Meet, 2025',img:'chess.jpg'},
 {cat:'Math',title:'PAMES- Casio: Gold Medal',note:'Division, 2026',img:'math.jpg'},
 {cat:'Journalism',title:'Official School Publication: 2nd Place',note:'DSPC, 2025',img:'dspc.jpg'},
 {cat:'RFOT',title:'Best Cinematography',note:'RFOT, 2026',img:'rfot.jpg'}
];
let wcat='All';
function wins(){
 const cats=['All',...new Set(WINS.map(w=>w.cat))];
 $('#wt').innerHTML=cats.map(c=>'<button data-c="'+c+'" class="'+(c==wcat?'on':'')+'">'+c+'</button>').join('');
 $$('#wt button').forEach(b=>b.onclick=()=>{wcat=b.dataset.c;wins()});
 const list=WINS.filter(w=>wcat=='All'||w.cat==wcat);
 $('#wg').innerHTML=list.map((w,i)=>'<div class="wc"><label class="ph" style="'+(w.img?'background-image:url('+JSON.stringify(w.img).replace(/"/g,"'")+')':'')+'">'+(w.img?'':'📷')+'<em>'+w.cat+'</em><input type="file" accept="image/*"></label><div class="in"><b>🏆 '+w.title+'</b><small>'+(w.note||'')+'</small></div></div>').join('');
 $$('#wg .ph').forEach((l,i)=>{const w=list[i];
  if(w.img){const im=new Image();im.onerror=()=>{w.img='';wins()};im.src=w.img}
  l.onclick=e=>{if(w.img){e.preventDefault();modal('<img src="'+w.img+'" style="max-width:100%;max-height:70vh;border-radius:16px"><h3>'+w.title+'</h3><p>'+(w.note||'')+'</p>')}};
  l.querySelector('input').onchange=ev=>{const f=ev.target.files[0];if(f){const r=new FileReader();r.onload=()=>{w.img=r.result;wins()};r.readAsDataURL(f)}}})}
wins();
$$('.at button').forEach(b=>b.onclick=()=>{$$('.at button').forEach(x=>x.classList.toggle('on',x==b));$$('.ap').forEach(p=>p.classList.toggle('on',p.id==b.dataset.at))});
$('#cp').onclick=()=>{try{navigator.clipboard.writeText('Toledo City, Cebu, Philippines')}catch(e){}$('#cp small').textContent='Copied ✔'};
$('#sd').onclick=()=>{location.href='mailto:tcshs@example.com?subject='+encodeURIComponent('Inquiry from '+$('#nm').value)+'&body='+encodeURIComponent($('#ms').value)};
$('#sx').onclick=()=>{stamp('Secret Finder');modal('<h1>EUREKA!</h1><h3>You found the SECRET! 🎉</h3><p>Put your special message here.</p>');let k=0;const m=setInterval(()=>{burst(Math.random()*innerWidth,Math.random()*innerHeight*.7,SC,25);if(++k>14)clearInterval(m)},250)};
$('#sy').onclick=()=>{stamp('History Reader');burst(innerWidth/2,innerHeight/2,['📜','🏫','⭐','✨'],40);const Y = [
  ['ESTABLISHMENT',
   'Opened in 1996 with an initial batch of 25 first-year students.'],

  ['INITIAL STATUS',
   ' It was originally annexed to Bato National High School, which served as the lead school under the Division of Toledo City.'],

  ['LOCATION SIGNIFICANCE',
   ' The school sits in Barangay Ilihan, a name derived from "Alihan" (meaning to barricade). During World War II, Filipino guerrillas used stone barricades and foxholes in the area as a shield and hiding place against Japanese forces.'],

  ['NATIONALIZATION PROPOSALS',
   ' Legislative measures (such as House Bill No. 9312 filed in Congress) have pushed to convert TCSHS into a fully designated Toledo City National Science High School to expand government support and accommodate growing student demand.']
];modal('<h1 style="font-size:clamp(34px,9vw,70px)">📜 Our History</h1><p></p>'+Y.map(y=>'<details style="background:#fff;color:#0a2a6b;text-align:left"><summary>'+y[0]+'</summary>'+y[1]+'</details>').join(''))};
let lt=0,lm;$('#nv b').addEventListener('click',()=>{lt++;clearTimeout(lm);lm=setTimeout(()=>lt=0,2000);if(lt>=5){lt=0;overload()}});
function overload(){stamp('Secret Finder');const mn=$('main');mn.classList.add('sk');setTimeout(()=>mn.classList.remove('sk'),1500);let k=0;const m=setInterval(()=>{burst(Math.random()*innerWidth,Math.random()*innerHeight*.8,['🎆','💥','⭐','✨','⚛','🚀','🏆'],30);if(++k>25)clearInterval(m)},180);setTimeout(()=>modal('<h1>SCIENCE OVERLOAD!</h1><h3>You unlocked the hidden power of the TCSHS logo ⚛️🎆</h3><p>You are a true Explorer!</p>'),1200)}
const QS=["Curiosity brought you here. Courage will keep you going.","You don't have to be the smartest in the room. Just never stop asking why.","Every experiment fails a few times before it works. So will you, and that's the point.","Science High is challenging, but you won't be alone. Your House, friends and teachers have your back.","Dream big, work hard, stay kind. The world needs scientists who care.","Welcome to the flight of your life. Fasten your seatbelt, Sci-Highian!","Your future self is already proud of you for trying.","Mistakes are just data. Keep collecting."];let qx=0;
function quote(){stamp('Quote Collector');const sh=()=>{$('#qq').textContent='\u201c'+QS[qx%QS.length]+'\u201d'};qx=Math.random()*QS.length|0;modal('<h2>💌 For our incoming Sci-Highians</h2><p id="qq" style="font-size:clamp(20px,4vw,30px);font-family:Georgia,serif;max-width:620px;margin:20px auto"></p><p><button class="btn" id="qn">Next quote ➜</button> <button class="btn o" id="qp" style="color:#fff!important">Apply now ✈</button></p>');sh();$('#qn').onclick=()=>{qx++;sh()};$('#qp').onclick=()=>{$('#md').classList.remove('on');go('apply')}}
$$('.qb').forEach(b=>b.onclick=quote);

/* ===================================
   NEW ADD-ONS — KEEP EXISTING CODE
=================================== */

// Back-to-top button
const backTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backTopButton.classList.add('show');
    } else {
        backTopButton.classList.remove('show');
    }
});

backTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Random science facts
const scienceFacts = [
    '🧬 DNA carries the genetic instructions for living organisms.',
    '🌌 Light from the Sun takes about 8 minutes to reach Earth.',
    '⚡ Lightning can heat the surrounding air to extremely high temperatures.',
    '🌊 Most of Earth’s surface is covered by water.',
    '🪐 Saturn is famous for its spectacular ring system.',
    '🔬 Cells are the basic structural units of living organisms.',
    '🌱 Plants use photosynthesis to convert light energy into chemical energy.',
    '🚀 In space, astronauts can experience microgravity.'
];

let factIndex = -1;

document.getElementById('science-fact-btn').addEventListener('click', () => {
    factIndex = (factIndex + 1) % scienceFacts.length;

    const fact = scienceFacts[factIndex];

    if (typeof modal === 'function') {
        modal(
            '<h2>🧪 Science Fact</h2>' +
            '<p style="font-size:18px;line-height:1.7">' +
            fact +
            '</p>' +
            '<p style="opacity:.7"></p>'
        );
    } else {
        alert(fact);
    }
});

