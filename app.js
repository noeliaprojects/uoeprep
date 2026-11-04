(function(){
"use strict";

const STORE = "uoe:v3";
const MIXED_SIZE = 20;
const VOCAB_SIZE = 24;

let state = {best:{}, coins:0, pets:{}, active:null};
try{ const raw = localStorage.getItem(STORE); if(raw) state = Object.assign(state, JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(STORE, JSON.stringify(state)); }catch(e){} }

const $app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const norm = s => String(s).toLowerCase().replace(/[’‘`]/g,"'").replace(/[.,!?;:"]/g,"").replace(/\s+/g," ").trim();
const LETTERS = "ABCD";
const weekName = w => new Date(w.date+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
const exam = () => EXAMS.find(x=>x.id===view.exam);
const week = () => exam().weeks.find(w=>w.date===view.week);
const VOCAB = {phrasal:"Phrasal verbs", colloc:"Collocations", fixed:"Fixed phrases"};

/* ── coins & pets ── */
const PET_SIZE = 10;
const TIERS = ["Common","Special","Rare","Legendary"];
const PETS = [
  {id:"cat",e:"🐱",n:"Cat",t:0,p:20},{id:"dog",e:"🐶",n:"Dog",t:0,p:20},{id:"rabbit",e:"🐰",n:"Rabbit",t:0,p:20},
  {id:"hamster",e:"🐹",n:"Hamster",t:0,p:20},{id:"turtle",e:"🐢",n:"Turtle",t:0,p:20},{id:"chick",e:"🐥",n:"Chick",t:0,p:20},
  {id:"fox",e:"🦊",n:"Fox",t:1,p:60},{id:"panda",e:"🐼",n:"Panda",t:1,p:60},{id:"owl",e:"🦉",n:"Owl",t:1,p:60},
  {id:"koala",e:"🐨",n:"Koala",t:1,p:60},{id:"otter",e:"🦦",n:"Otter",t:1,p:60},{id:"sloth",e:"🦥",n:"Sloth",t:1,p:60},
  {id:"tiger",e:"🐯",n:"Tiger",t:2,p:150},{id:"octopus",e:"🐙",n:"Octopus",t:2,p:150},{id:"penguin",e:"🐧",n:"Penguin",t:2,p:150},
  {id:"flamingo",e:"🦩",n:"Flamingo",t:2,p:150},{id:"hedgehog",e:"🦔",n:"Hedgehog",t:2,p:150},{id:"dolphin",e:"🐬",n:"Dolphin",t:2,p:150},
  {id:"dragon",e:"🐉",n:"Dragon",t:3,p:400},{id:"unicorn",e:"🦄",n:"Unicorn",t:3,p:400},{id:"trex",e:"🦖",n:"T-Rex",t:3,p:400},{id:"whale",e:"🐋",n:"Blue whale",t:3,p:400}
];
const petById = id => PETS.find(x=>x.id===id);
const activePet = () => state.active && state.pets[state.active]!==undefined ? {pet:petById(state.active), name:state.pets[state.active]} : null;
const coinBadge = (tick) => `<span class="coin${tick?" tick":""}" id="coins" aria-label="${state.coins} coins">🪙 ${state.coins}</span>`;

/* phrasal verbs & collocations → drill questions */
function vocabItems(sec){
  const E = sec.entries, out = [];
  const gap = (ex, key) => {
    const inner = ex.match(/\{([^}]+)\}/)[1];
    const re = new RegExp("\\b"+key.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");
    return ex.replace(/\{[^}]+\}/, inner.replace(re, "___"));
  };
  E.forEach(e=>{
    [e.ex, e.ex2].filter(Boolean).forEach(ex=>out.push({type:"mc", q:gap(ex,e.key), o:[e.key, ...e.alt], h:`It means: ${e.m}.`, e:`<b>${esc(e.term)}</b> = ${esc(e.m)}.`}));
  });
  return out.concat(sec.items||[]);
}
/* each round: up to 10 "complete the sentence" questions + the rest from the other types */
function vocabSession(sec){
  const fill = shuffle(sec.items||[]).slice(0, 10);
  const rest = shuffle(vocabItems({entries:sec.entries, items:[]})).slice(0, VOCAB_SIZE - fill.length);
  return shuffle(fill.concat(rest));
}
function exHTML(ex){ return esc(ex).replace(/\{([^}]+)\}/, "<b>$1</b>"); }

/* ── router ── */
let view = {name:"exams"};
function go(v){ view = v; render(); window.scrollTo(0,0); }
function render(){
  ({exams, weeks, week:weekView, grammar, explainList, explain, exerciseList, vocab, practice, result, pet, shop, myPets})[view.name]();
}
function header(backTo, crumb){
  return `<div class="top"><button type="button" class="back" id="back">← Back</button>${crumb?`<span class="label crumb">${esc(crumb)}</span>`:""}</div>`;
}
function bindBack(to){ document.getElementById("back").onclick=()=>go(to); }
function at(extra){ return Object.assign({exam:view.exam, week:view.week}, extra); }
function bestTag(key){ const b = state.best[key]; return b===undefined ? "" : `<span class="score">${Math.round(b*100)}%</span>`; }
function menu(items){
  return `<div class="menu">${items.map(i=>`
    <button type="button" class="menu-btn" id="${i.id}"><span class="t">${esc(i.t)}</span>${i.s?`<span class="s">${esc(i.s)}</span>`:""}${i.right||'<span class="arr" aria-hidden="true">→</span>'}</button>`).join("")}</div>`;
}

/* 1 · exam */
function exams(){
  $app.innerHTML = `
  <div class="top"><div class="brand"><span class="label">Use of English</span><h1>Choose your exam</h1></div></div>
  <div class="menu">${EXAMS.map(x=>{
    const ok = x.weeks.length>0;
    return `<button type="button" class="menu-btn" data-exam="${x.id}" ${ok?"":"disabled"}>
      <span class="t">${esc(x.name)}</span>${ok?'<span class="arr" aria-hidden="true">→</span>':'<span class="soon">Coming soon</span>'}</button>`;
  }).join("")}</div>
  <button type="button" class="pet-row" id="petrow">
    <span class="pe" aria-hidden="true">${activePet()?activePet().pet.e:"🥚"}</span>
    <span class="t">${activePet()?esc(activePet().name):"Get your free pet"}</span>
    ${coinBadge()}
  </button>`;
  $app.querySelectorAll("[data-exam]").forEach(b=>b.onclick=()=>go({name:"weeks", exam:b.dataset.exam}));
  document.getElementById("petrow").onclick=()=>go({name:"pet"});
}

/* ── pet area ── */
function pet(){
  const a = activePet();
  if(!a){
    const commons = PETS.filter(x=>x.t===0);
    $app.innerHTML = `
    ${header()}
    <div class="unit-head"><span class="label">Your pet</span><h2>Choose your first pet</h2></div>
    <p class="note">It's free. You earn coins with every answer you get right first time, and you can buy more pets in the shop.</p>
    <div class="pet-grid">${commons.map(x=>`
      <button type="button" class="pet-card" data-adopt="${x.id}"><span class="pe" aria-hidden="true">${x.e}</span><span class="t">${x.n}</span></button>`).join("")}</div>`;
    bindBack({name:"exams"});
    $app.querySelectorAll("[data-adopt]").forEach(b=>b.onclick=()=>{
      const x = petById(b.dataset.adopt); state.pets[x.id] = x.n; state.active = x.id; save(); go({name:"pet", rename:true});
    });
    return;
  }
  const words = petPool().length;
  $app.innerHTML = `
  ${header(null)}
  <div class="pet-home">
    <div class="pet-big" aria-hidden="true">${a.pet.e}</div>
    ${view.rename ? `<form class="write" id="rn" autocomplete="off">
        <input id="pname" type="text" maxlength="16" value="${esc(a.name)}" aria-label="Pet name">
        <button class="btn" type="submit">Save</button></form>`
      : `<h2>${esc(a.name)}</h2><button type="button" class="change" id="ren">Change name</button>`}
    ${coinBadge()}
  </div>
  ${menu([
    {id:"play", t:`Play with ${a.name}`, s:words>=4?`${PET_SIZE} questions`:"Soon"},
    {id:"shopb", t:"Shop"},
    {id:"mine", t:"My pets", s:`${Object.keys(state.pets).length}`}
  ])}
  <p class="note" style="margin-top:20px">${esc(a.name)} asks you about phrasal verbs, collocations and fixed phrases from your classes.</p>`;
  bindBack({name:"exams"});
  if(view.rename){
    const inp = document.getElementById("pname"); inp.focus(); inp.select();
    document.getElementById("rn").onsubmit = e => {
      e.preventDefault(); const n = inp.value.trim().slice(0,16);
      if(n){ state.pets[state.active] = n; save(); } go({name:"pet"});
    };
  } else document.getElementById("ren").onclick=()=>go({name:"pet", rename:true});
  document.getElementById("play").onclick=startPetQuiz;
  document.getElementById("shopb").onclick=()=>go({name:"shop"});
  document.getElementById("mine").onclick=()=>go({name:"myPets"});
}
function shop(){
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Back</button>${coinBadge()}</div>
  <div class="unit-head"><h2>Shop</h2></div>
  ${TIERS.map((tn,t)=>`
    <div class="section"><span class="label">${tn} · 🪙 ${PETS.find(x=>x.t===t).p}</span>
    <div class="pet-grid">${PETS.filter(x=>x.t===t).map(x=>{
      const owned = state.pets[x.id]!==undefined;
      const can = state.coins >= x.p;
      const confirm = view.confirm===x.id;
      return `<button type="button" class="pet-card${owned?" owned":""}${confirm?" confirm":""}" data-buy="${x.id}" ${owned||!can?"disabled":""}>
        <span class="pe" aria-hidden="true">${x.e}</span><span class="t">${x.n}</span>
        <span class="s">${owned?"Owned":confirm?`Buy for 🪙 ${x.p}?`:`🪙 ${x.p}`}</span></button>`;
    }).join("")}</div></div>`).join("")}`;
  bindBack({name:"pet"});
  $app.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>{
    const x = petById(b.dataset.buy);
    if(view.confirm!==x.id){ go({name:"shop", confirm:x.id}); return; }
    if(state.coins < x.p || state.pets[x.id]!==undefined) return;
    state.coins -= x.p; state.pets[x.id] = x.n; state.active = x.id; save();
    go({name:"pet", rename:true});
  });
}
function myPets(){
  const ids = Object.keys(state.pets);
  $app.innerHTML = `
  ${header()}
  <div class="unit-head"><h2>My pets</h2></div>
  <div class="pet-grid">${ids.map(id=>{ const x = petById(id); return `
    <button type="button" class="pet-card${id===state.active?" active":""}" data-pick="${id}"><span class="pe" aria-hidden="true">${x.e}</span>
    <span class="t">${esc(state.pets[id])}</span><span class="s">${id===state.active?"With you now":"Choose"}</span></button>`; }).join("")}</div>`;
  bindBack({name:"pet"});
  $app.querySelectorAll("[data-pick]").forEach(b=>b.onclick=()=>{ state.active = b.dataset.pick; save(); go({name:"pet"}); });
}
/* every phrasal verb, collocation and fixed phrase from the published classes */
function petPool(){
  const out = [];
  ["phrasal","colloc","fixed"].forEach(k=>{
    const seen = new Set(), entries = [];
    EXAMS.forEach(x=>x.weeks.forEach(w=>(w[k]?w[k].entries:[]).forEach(e=>{ if(!seen.has(e.term)){ seen.add(e.term); entries.push(e); } })));
    const items = [];
    EXAMS.forEach(x=>x.weeks.forEach(w=>(w[k]?w[k].items:[]).forEach(it=>items.push(it))));
    vocabItems({entries, items}).forEach(it=>out.push(it));
  });
  return out;
}
function startPetQuiz(){
  const a = activePet(); if(!a) return;
  const pool = petPool(); if(pool.length<4) return;
  startSession({key:"pet", title:`${a.name} asks`, back:{name:"pet"}, petQuiz:true, petEmoji:a.pet.e, items:shuffle(pool).slice(0, PET_SIZE)});
}

/* 2 · week */
function weeks(){
  const x = exam();
  $app.innerHTML = `
  ${header()}
  <div class="unit-head"><span class="label">${esc(x.name)}</span><h2>Choose the class</h2></div>
  <div class="menu">${x.weeks.map(w=>`
    <button type="button" class="menu-btn" data-week="${w.date}"><span class="t">${esc(weekName(w))}</span><span class="arr" aria-hidden="true">→</span></button>`).join("")}</div>`;
  bindBack({name:"exams"});
  $app.querySelectorAll("[data-week]").forEach(b=>b.onclick=()=>go({name:"week", exam:x.id, week:b.dataset.week}));
}

/* 3 · grammar / phrasal verbs / collocations */
function weekView(){
  const w = week();
  $app.innerHTML = `
  ${header(null, exam().name)}
  <div class="unit-head"><h2>${esc(weekName(w))}</h2></div>
  ${menu([
    {id:"g", t:"Grammar", s:`${w.grammar.length} topics`},
    {id:"p", t:"Phrasal verbs", s:`${w.phrasal.entries.length} phrasal verbs`},
    {id:"c", t:"Collocations", s:`${w.colloc.entries.length} collocations`},
    {id:"f", t:"Fixed phrases", s:`${w.fixed.entries.length} phrases`}
  ])}`;
  bindBack({name:"weeks", exam:view.exam});
  document.getElementById("g").onclick=()=>go(at({name:"grammar"}));
  document.getElementById("p").onclick=()=>go(at({name:"vocab", k:"phrasal"}));
  document.getElementById("c").onclick=()=>go(at({name:"vocab", k:"colloc"}));
  document.getElementById("f").onclick=()=>go(at({name:"vocab", k:"fixed"}));
}

/* grammar: explanation or exercises */
function grammar(){
  $app.innerHTML = `
  ${header(null, weekName(week()))}
  <div class="unit-head"><h2>Grammar</h2></div>
  ${menu([{id:"ex", t:"Explanation"}, {id:"pr", t:"Exercises"}])}`;
  bindBack(at({name:"week"}));
  document.getElementById("ex").onclick=()=>go(at({name:"explainList"}));
  document.getElementById("pr").onclick=()=>go(at({name:"exerciseList"}));
}
function explainList(){
  const w = week();
  $app.innerHTML = `
  ${header(null, "Grammar")}
  <div class="unit-head"><h2>Explanation</h2></div>
  <div class="menu">${w.grammar.map(u=>`
    <button type="button" class="menu-btn" data-u="${u.id}"><span class="t">${esc(u.title)}</span><span class="arr" aria-hidden="true">→</span></button>`).join("")}</div>`;
  bindBack(at({name:"grammar"}));
  $app.querySelectorAll("[data-u]").forEach(b=>b.onclick=()=>go(at({name:"explain", u:b.dataset.u})));
}
function explain(){
  const w = week(), u = w.grammar.find(x=>x.id===view.u);
  $app.innerHTML = `
  ${header(null, "Explanation")}
  <div class="unit-head"><h2>${esc(u.title)}</h2></div>
  <div class="explain-body">${u.explain}</div>
  <button type="button" class="btn wide" id="go">Practise this</button>`;
  bindBack(at({name:"explainList"}));
  document.getElementById("go").onclick=()=>startGrammar(u, at({name:"explain", u:u.id}));
}
function exerciseList(){
  const w = week();
  const keyMix = `${view.exam}:${view.week}:g:mixed`;
  $app.innerHTML = `
  ${header(null, "Grammar")}
  <div class="unit-head"><h2>Exercises</h2></div>
  <button type="button" class="big" id="mix"><span class="t">All grammar mixed</span>
    <span class="s">${MIXED_SIZE} questions from every topic</span>${state.best[keyMix]!==undefined?`<span class="s"> · best ${Math.round(state.best[keyMix]*100)}%</span>`:""}</button>
  <div class="menu" style="margin-top:12px">${w.grammar.map(u=>`
    <button type="button" class="menu-btn" data-u="${u.id}"><span class="t">${esc(u.title)}</span>
    ${bestTag(`${view.exam}:${view.week}:g:${u.id}`) || `<span class="s">${u.items.length} questions</span>`}</button>`).join("")}</div>`;
  bindBack(at({name:"grammar"}));
  document.getElementById("mix").onclick=()=>{
    const pool = shuffle(w.grammar.flatMap(u=>u.items.map(it=>Object.assign({topic:u.title}, it)))).slice(0, MIXED_SIZE);
    startSession({key:keyMix, title:"All grammar mixed", back:at({name:"exerciseList"}), items:pool, showTopic:true});
  };
  $app.querySelectorAll("[data-u]").forEach(b=>b.onclick=()=>startGrammar(w.grammar.find(x=>x.id===b.dataset.u), at({name:"exerciseList"})));
}
function startGrammar(u, back){
  startSession({key:`${view.exam}:${view.week}:g:${u.id}`, title:u.title, back, items:shuffle(u.items), rules:true});
}

/* phrasal verbs / collocations: list + exercises */
function vocab(){
  const sec = week()[view.k], key = `${view.exam}:${view.week}:${view.k}`;
  $app.innerHTML = `
  ${header(null, weekName(week()))}
  <div class="unit-head"><h2>${VOCAB[view.k]}</h2></div>
  <button type="button" class="big" id="drill"><span class="t">Exercises</span>
    <span class="s">${Math.min(VOCAB_SIZE, vocabItems(sec).length)} questions, different each time${state.best[key]!==undefined?` · best ${Math.round(state.best[key]*100)}%`:""}</span></button>
  <div class="list" style="margin-top:16px">${sec.entries.slice().sort((x,y)=>x.term.replace(/^(be|the) /,"").localeCompare(y.term.replace(/^(be|the) /,""))).map(e=>`
    <div class="entry">
      <div class="et"><b>${esc(e.term)}</b></div>
      <div class="em">${esc(e.m)}</div>
      <div class="ex">${exHTML(e.ex)}</div>
    </div>`).join("")}</div>`;
  bindBack(at({name:"week"}));
  document.getElementById("drill").onclick=()=>startSession({key, title:VOCAB[view.k], back:at({name:"vocab", k:view.k}), vocabK:view.k, items:vocabSession(sec)});
}

/* ── drill session ── */
function prep(it){
  const o = Object.assign({}, it, {tries:0, done:false, picked:[], typed:"", correct:false});
  if(it.type==="mc") o.opts = shuffle(it.o.map((t,ix)=>({t, ok:ix===0})));
  return o;
}
function startSession(cfg){
  const items = cfg.items.map((it,ix)=>Object.assign({uid:ix, need:1, missed:false}, it));
  go(Object.assign({name:"practice", exam:view.exam, week:view.week}, cfg, {
    src: items, queue: items.map(prep), total: items.length, cleared: 0, firstRight: 0, seen: new Set()
  }));
}
function practice(){
  const v = view, it = v.queue[0];
  const pct = Math.round(v.cleared / v.total * 100);
  const okAns = it.type==="mc" ? it.opts.find(o=>o.ok).t : it.a[0];
  const fill = it.done ? (it.type==="open" && it.correct ? it.typed : okAns) : "";
  const q = it.q.includes("___")
    ? esc(it.q).replace("___", `<span class="gap ${it.done&&it.result==="ok"?"ok":""}">${fill?esc(fill):"&nbsp;"}</span>`)
    : esc(it.q);

  let body;
  if(it.type==="mc"){
    body = `<div class="opts">${it.opts.map((o,ix)=>{
      let cls = "opt";
      if(it.picked.includes(ix) && !o.ok) cls += " wrong";
      if(it.done && o.ok) cls += " right";
      const dis = it.done || it.picked.includes(ix);
      return `<button type="button" class="${cls}" data-opt="${ix}" ${dis?"disabled":""}><span class="b">${LETTERS[ix]}</span><span>${esc(o.t)}</span></button>`;
    }).join("")}</div>`;
  } else {
    const cls = it.done ? (it.correct ? "right" : "wrong") : (it.tries ? "wrong" : "");
    body = `<form class="write" id="wf" autocomplete="off">
      <input id="ans" type="text" autocapitalize="off" spellcheck="false" aria-label="Your answer"
        class="${cls}" value="${esc(it.done ? it.typed : "")}" ${it.done?"disabled":""} placeholder="one word">
      <button class="btn" type="submit" ${it.done?"disabled":""}>Check</button></form>`;
  }
  const topic = v.showTopic && it.topic ? `<br><span class="explain">${esc(it.topic)}</span>` : "";
  let fb = "";
  if(it.done && it.result==="ok" && it.tries===0) fb = `<div class="fb ok"><span class="k">Correct</span>${it.e}${topic}</div>`;
  else if(it.done && it.result==="ok") fb = `<div class="fb hint"><span class="k">Right on the second try · it will come back</span>${it.e}${topic}</div>`;
  else if(it.done) fb = `<div class="fb bad"><span class="k">Answer: ${esc(it.type==="mc"?okAns:it.a.join(" / "))} · it will come back</span>${it.e}${topic}</div>`;
  else if(it.tries===1) fb = `<div class="fb hint"><span class="k">Not yet · hint</span>${esc(it.h)}</div>`;

  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Stop</button><span class="topr"><span class="label">${v.cleared} / ${v.total}</span>${coinBadge(v.tick)}</span></div>
  <span class="label">${v.petEmoji?`<span class="petask" aria-hidden="true">${v.petEmoji}</span> `:""}${esc(v.title)}</span>
  <div class="bar"><i style="width:${pct}%"></i></div>
  ${it.again?`<div class="task"><span class="lvltag again">again</span></div>`:""}
  <p class="q">${q}</p>
  ${body}
  <div aria-live="polite">${fb}</div>
  ${it.done ? `<div class="next"><button type="button" class="btn" id="next">Next</button></div>`:""}`;

  document.getElementById("back").onclick=()=>go(v.back);
  if(it.type==="mc"){
    $app.querySelectorAll("[data-opt]").forEach(b=>b.onclick=()=>{
      const ix = +b.dataset.opt; if(it.done || it.picked.includes(ix)) return;
      it.picked.push(ix); settle(it, it.opts[ix].ok); practice();
    });
  } else if(!it.done){
    const inp = document.getElementById("ans");
    if(!matchMedia("(hover: none)").matches) inp.focus();
    document.getElementById("wf").onsubmit = e => {
      e.preventDefault();
      const val = norm(inp.value); if(!val) return;
      it.typed = inp.value.trim();
      it.correct = it.a.some(a=>norm(a)===val);
      if(!it.correct && it.tries===0 && val.includes(" ")){ it.tries=1; it.h = "Write only ONE word."; practice(); return; }
      settle(it, it.correct); practice();
    };
  }
  const nx = document.getElementById("next");
  if(nx){ nx.onclick = nextItem; nx.focus({preventScroll:true}); }
  v.tick = false;
}
function settle(it, ok){
  if(ok){ it.done = true; it.result = "ok"; }
  else if(it.tries===0){ it.tries = 1; }
  else { it.done = true; it.result = "bad"; }
  if(it.done && !view.seen.has(it.uid)){
    view.seen.add(it.uid);
    if(it.result==="ok" && it.tries===0){ view.firstRight++; state.coins++; view.earned = (view.earned||0)+1; view.tick = true; save(); }
  }
}
function nextItem(){
  const v = view, it = v.queue.shift();
  const src = v.src[it.uid];
  if(it.result==="ok" && it.tries===0){
    src.need--;
    if(src.need<=0) v.cleared++;
    else { const again = prep(src); again.again = true; v.queue.splice(Math.min(6, v.queue.length), 0, again); }
  } else {
    src.need = 2;
    const again = prep(src); again.again = true;
    v.queue.splice(Math.min(3, v.queue.length), 0, again);
  }
  if(v.queue.length){ practice(); window.scrollTo(0,0); return; }
  const pct = v.firstRight / v.total;
  const prev = state.best[v.key]; if(prev===undefined || pct>prev){ state.best[v.key]=pct; save(); }
  go({name:"result", exam:v.exam, week:v.week, pct, firstRight:v.firstRight, total:v.total, earned:v.earned||0, session:v});
}
function result(){
  const v = view, p = Math.round(v.pct*100), s = v.session;
  const msg = s.petQuiz ? "Play again whenever you like: the words come from all your classes." : p>=80 ? "Well done. Do it again tomorrow to make it stick."
    : p>=50 ? "Getting there. Repeat it until you get 80% or more."
    : "Read the explanation again, then repeat the exercises.";
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Back</button></div>
  <div class="result">
    <span class="label">${esc(s.title)} · right first time</span>
    <div class="num">${p}%</div>
    <p>${v.firstRight} of ${v.total} right on the first try.</p>
    <p>${msg}</p>
    ${v.earned?`<p class="earned">+${v.earned} 🪙</p>`:""}
    <div class="actions" style="justify-content:flex-start">
      <button type="button" class="btn" id="again">Again</button>
      ${s.rules?`<button type="button" class="btn ghost" id="rules">Explanation</button>`:""}
    </div>
  </div>`;
  bindBack(s.back);
  document.getElementById("again").onclick=()=>{
    view = {exam:s.exam, week:s.week};
    if(s.petQuiz){ startPetQuiz(); return; }
    const items = s.vocabK ? vocabSession(week()[s.vocabK]) : shuffle(s.src.map(({uid,need,missed,...it})=>it));
    startSession({key:s.key, title:s.title, back:s.back, showTopic:s.showTopic, rules:s.rules, vocabK:s.vocabK, items});
  };
  const r = document.getElementById("rules");
  if(r) r.onclick=()=>{ const u = week().grammar.find(x=>x.title===s.title); go({name:"explain", exam:s.exam, week:s.week, u:u.id}); };
}

/* open straight on the only exam / week when there's just one */
render();

if("serviceWorker" in navigator && location.protocol==="https:" && /github\.io$/.test(location.hostname)){
  try{ navigator.serviceWorker.register("sw.js").catch(()=>{}); }catch(e){}
}
})();
