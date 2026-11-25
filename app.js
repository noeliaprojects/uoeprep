(function(){
"use strict";

const STORE = "uoe:v3";
const MIXED_SIZE = 20;
const VOCAB_SIZE = 24;

let state = {best:{}, coins:0, pets:{}, active:null, cards:{}, lastTest:{}, places:{garden:true}, place:"garden", days:{}, tickets:0, lastTicket:null, pending:null, photos:[], gc:{d:"",n:0}, best60:0};
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
const TIERS = ["Common","Special","Rare","Legendary","Epic"];
const PETS = [
  {id:"cat",e:"🐱",n:"Cat",t:0,p:20},{id:"dog",e:"🐶",n:"Dog",t:0,p:20},{id:"rabbit",e:"🐰",n:"Rabbit",t:0,p:20},
  {id:"hamster",e:"🐹",n:"Hamster",t:0,p:20},{id:"turtle",e:"🐢",n:"Turtle",t:0,p:20},{id:"chick",e:"🐥",n:"Chick",t:0,p:20},
  {id:"fox",e:"🦊",n:"Fox",t:1,p:60},{id:"panda",e:"🐼",n:"Panda",t:1,p:60},{id:"owl",e:"🦉",n:"Owl",t:1,p:60},
  {id:"koala",e:"🐨",n:"Koala",t:1,p:60},{id:"otter",e:"🦦",n:"Otter",t:1,p:60},{id:"sloth",e:"🦥",n:"Sloth",t:1,p:60},
  {id:"tiger",e:"🐯",n:"Tiger",t:2,p:150},{id:"octopus",e:"🐙",n:"Octopus",t:2,p:150},{id:"penguin",e:"🐧",n:"Penguin",t:2,p:150},
  {id:"flamingo",e:"🦩",n:"Flamingo",t:2,p:150},{id:"hedgehog",e:"🦔",n:"Hedgehog",t:2,p:150},{id:"dolphin",e:"🐬",n:"Dolphin",t:2,p:150},
  {id:"dragon",e:"🐉",n:"Dragon",t:3,p:400},{id:"unicorn",e:"🦄",n:"Unicorn",t:3,p:400},{id:"trex",e:"🦖",n:"T-Rex",t:3,p:400},{id:"whale",e:"🐋",n:"Blue whale",t:3,p:400},
  /* more pets */
  {id:"frog",e:"🐸",n:"Frog",t:0,p:20},{id:"pig",e:"🐷",n:"Pig",t:0,p:20},{id:"mouse",e:"🐭",n:"Mouse",t:0,p:20},
  {id:"duck",e:"🦆",n:"Duck",t:0,p:20},{id:"snail",e:"🐌",n:"Snail",t:0,p:20},{id:"bee",e:"🐝",n:"Bee",t:0,p:20},
  {id:"raccoon",e:"🦝",n:"Raccoon",t:1,p:60},{id:"kangaroo",e:"🦘",n:"Kangaroo",t:1,p:60},{id:"llama",e:"🦙",n:"Llama",t:1,p:60},
  {id:"wolf",e:"🐺",n:"Wolf",t:1,p:60},{id:"parrot",e:"🦜",n:"Parrot",t:1,p:60},{id:"zebra",e:"🦓",n:"Zebra",t:1,p:60},
  {id:"shark",e:"🦈",n:"Shark",t:2,p:150},{id:"lion",e:"🦁",n:"Lion",t:2,p:150},{id:"crocodile",e:"🐊",n:"Crocodile",t:2,p:150},
  {id:"eagle",e:"🦅",n:"Eagle",t:2,p:150},{id:"peacock",e:"🦚",n:"Peacock",t:2,p:150},{id:"giraffe",e:"🦒",n:"Giraffe",t:2,p:150},
  {id:"dino",e:"🦕",n:"Dino",t:3,p:400},{id:"sdragon",e:"🐲",n:"Baby dragon",t:3,p:400},
  /* characters */
  {id:"alien",e:"👽",n:"Alien",t:4,p:800},{id:"robot",e:"🤖",n:"Robot",t:4,p:800},{id:"ghost",e:"👻",n:"Ghost",t:4,p:800},
  {id:"wizard",e:"🧙",n:"Wizard",t:4,p:800},{id:"vampire",e:"🧛",n:"Vampire",t:4,p:800},{id:"genie",e:"🧞",n:"Genie",t:4,p:800}
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
  ({exams, weeks, week:weekView, grammar, explainList, explain, exerciseList, vocab, practice, result, pet, shop, myPets, flash, study, ftest, places, games, wsearch, hangman, anagram, memory, timer, scratch, photos})[view.name]();
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
    ${streak()?`<span class="streak-chip" aria-label="${streak()} days in a row">🔥 ${streak()}</span>`:""}
    ${state.tickets>0?`<span class="ticket" aria-label="Scratch card waiting">🎟️ ${state.tickets}</span>`:""}
    ${coinBadge()}
  </button>
  ${installHTML()}`;
  $app.querySelectorAll("[data-exam]").forEach(b=>b.onclick=()=>go({name:"weeks", exam:b.dataset.exam}));
  document.getElementById("petrow").onclick=()=>go({name:"pet"});
  bindInstall();
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
    ${sceneHTML(state.place, a.pet.e)}
    ${view.rename ? `<form class="write" id="rn" autocomplete="off">
        <input id="pname" type="text" maxlength="16" value="${esc(a.name)}" aria-label="Pet name">
        <button class="btn" type="submit">Save</button></form>`
      : `<h2>${esc(a.name)}</h2><button type="button" class="change" id="ren">Change name</button>`}
    <div class="pet-meta">${coinBadge()}</div>
  </div>
  <div class="streak-card">
    <div class="sc-flame" aria-hidden="true">🔥</div>
    <div class="sc-txt"><b>${streak()} ${streak()===1?"day":"days"} in a row</b>
      <span>Today: ${Math.min(todayCount(),GOAL)} / ${GOAL} answers right first time</span>
      <span class="sc-bar"><i style="width:${Math.min(100,Math.round(todayCount()/GOAL*100))}%"></i></span></div>
    <div class="sc-week" aria-hidden="true">${weekDots()}</div>
  </div>
  ${state.tickets>0?`<button type="button" class="menu-btn scratch-btn" id="scr"><span class="t">🎟️ Scratch card</span><span class="s">${state.tickets} waiting</span><span class="arr" aria-hidden="true">→</span></button>`:""}
  ${menu([
    {id:"play", t:`Play with ${a.name}`, s:words>=4?`${PET_SIZE} questions`:"Soon"},
    {id:"gamesb", t:"Games"},
    {id:"shopb", t:"Shop", s:"pets"},
    {id:"placesb", t:"Places", s:"where your pet lives"},
    {id:"mine", t:"My pets", s:`${Object.keys(state.pets).length}`}
  ].concat(state.photos.length?[{id:"photosb", t:"My photos", s:`${state.photos.length}`}]:[]))}
  <p class="note" style="margin-top:20px">Get ${GOAL} answers right first time every day. Every ${TICKET_EVERY} days in a row, you win a scratch card.</p>`;
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
  document.getElementById("gamesb").onclick=()=>go({name:"games"});
  document.getElementById("placesb").onclick=()=>go({name:"places"});
  const sc = document.getElementById("scr"); if(sc) sc.onclick=()=>go({name:"scratch"});
  const ph = document.getElementById("photosb"); if(ph) ph.onclick=()=>go({name:"photos"});
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
  ])}
  <button type="button" class="menu-btn flash" id="fl"><span class="t">Flashcards</span><span class="s">${learned(w)[0]} / ${learned(w)[1]} learned</span><span class="arr" aria-hidden="true">→</span></button>`;
  bindBack({name:"weeks", exam:view.exam});
  document.getElementById("g").onclick=()=>go(at({name:"grammar"}));
  document.getElementById("p").onclick=()=>go(at({name:"vocab", k:"phrasal"}));
  document.getElementById("c").onclick=()=>go(at({name:"vocab", k:"colloc"}));
  document.getElementById("f").onclick=()=>go(at({name:"vocab", k:"fixed"}));
  document.getElementById("fl").onclick=()=>go(at({name:"flash", f:"all"}));
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

/* ── flashcards ── */
const KIND = {phrasal:"Phrasal verb", colloc:"Collocation", fixed:"Fixed phrase"};
const FILTERS = [["all","All"],["phrasal","Phrasal verbs"],["colloc","Collocations"],["fixed","Fixed phrases"]];
const cardId = (w,k,term) => `${w.date}|${k}|${term}`;
function cardsOf(w, f){
  return ["phrasal","colloc","fixed"].filter(k=>f==="all"||f===k)
    .flatMap(k=>w[k].entries.map(e=>({k, e, id:cardId(w,k,e.term)})));
}
function learned(w){ const c = cardsOf(w,"all"); return [c.filter(x=>state.cards[x.id]===2).length, c.length]; }
function flash(){
  const w = week(), f = view.f || "all", cards = cardsOf(w,f);
  const known = cards.filter(c=>state.cards[c.id]===2).length;
  $app.innerHTML = `
  ${header(null, weekName(w))}
  <div class="unit-head"><h2>Flashcards</h2></div>
  <div class="chips tabs">${FILTERS.map(([k,t])=>`<button type="button" class="chip" data-f="${k}" aria-pressed="${f===k}">${t}</button>`).join("")}</div>
  <div class="flash-stat"><div class="bar amber"><i style="width:${cards.length?Math.round(known/cards.length*100):0}%"></i></div>
    <span class="label">${known} / ${cards.length} learned</span></div>
  <button type="button" class="big amber" id="study"><span class="t">Study</span><span class="s">Tap a card to see what it means</span></button>
  ${(w.tests||[]).length ? `<button type="button" class="big amber-ghost" id="test"><span class="t">Test me</span><span class="s">A short text with gaps · 🪙 for each right answer</span></button>` : ""}`;
  bindBack(at({name:"week"}));
  $app.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>go(at({name:"flash", f:b.dataset.f})));
  document.getElementById("study").onclick=()=>startStudy(w,f);
  const t = document.getElementById("test"); if(t) t.onclick=()=>startTest(w);
}
function startStudy(w,f){
  const cs = cardsOf(w,f);
  const order = [...shuffle(cs.filter(c=>state.cards[c.id]!==2)), ...shuffle(cs.filter(c=>state.cards[c.id]===2))];
  go(at({name:"study", f, queue:order, total:order.length, done:0, flipped:false}));
}
function study(){
  const v = view, w = week();
  if(!v.queue.length){
    const l = learned(w);
    $app.innerHTML = `
    ${header()}
    <div class="result">
      <span class="label">Flashcards</span>
      <div class="num amber-num">${l[0]} / ${l[1]}</div>
      <p>cards learned in this class.</p>
      <div class="actions" style="justify-content:flex-start">
        ${(w.tests||[]).length?`<button type="button" class="btn amber-btn" id="test">Test me</button>`:""}
        <button type="button" class="btn ghost" id="again">Study again</button>
      </div>
    </div>`;
    bindBack(at({name:"flash", f:v.f}));
    const t = document.getElementById("test"); if(t) t.onclick=()=>startTest(w);
    document.getElementById("again").onclick=()=>startStudy(w, v.f);
    return;
  }
  const c = v.queue[0];
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Stop</button><span class="label">${v.done} / ${v.total}</span></div>
  <div class="bar amber"><i style="width:${Math.round(v.done/v.total*100)}%"></i></div>
  <div class="fcard" id="card" role="button" tabindex="0" aria-label="Turn the card">
    <div class="fc-inner">
      <div class="fc-face fc-front"><span class="label">${KIND[c.k]}</span><div class="fc-term">${esc(c.e.term)}</div><span class="fc-tip">Tap to turn</span></div>
      <div class="fc-face fc-back"><div class="fc-term small">${esc(c.e.term)}</div><div class="fc-m">${esc(c.e.m)}</div><div class="fc-ex">${exHTML(c.e.ex)}</div></div>
    </div>
  </div>
  <div class="rate hide" id="rate">
    <button type="button" class="rate-btn again" data-r="0">Again</button>
    <button type="button" class="rate-btn almost" data-r="1">Almost</button>
    <button type="button" class="rate-btn know" data-r="2">I know it</button>
  </div>`;
  bindBack(at({name:"flash", f:v.f}));
  const card = document.getElementById("card"), rate = document.getElementById("rate");
  const turn = () => { card.classList.toggle("flipped"); rate.classList.remove("hide"); };
  card.onclick = turn;
  card.onkeydown = e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); turn(); } };
  rate.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{
    const r = +b.dataset.r; state.cards[c.id] = r; save();
    v.queue.shift();
    if(r===0) v.queue.splice(Math.min(3, v.queue.length), 0, c);
    else if(r===1) v.queue.push(c);
    else v.done++;
    study();
  });
}
function startTest(w){
  const ts = w.tests || []; if(!ts.length) return;
  let i = Math.floor(Math.random()*ts.length);
  if(ts.length>1 && i===state.lastTest[w.date]) i = (i+1) % ts.length;
  state.lastTest[w.date] = i; save();
  const t = ts[i];
  go(at({name:"ftest", t, round:0, earned:0, first:0,
    gaps: t.gaps.map(g=>({g, opts:shuffle(g.o.map((o,ix)=>({t:o, ok:ix===0}))), sel:null, status:null}))}));
}
function ftest(){
  const v = view, w = week(), t = v.t;
  const finished = v.round===2 || (v.round===1 && v.gaps.every(x=>x.status==="ok"));
  const body = esc(t.body).replace(/\[(\d)\]/g, (m,n)=>{
    const x = v.gaps[n-1], st = x.status ? " "+x.status : "";
    const word = x.sel===null ? "" : x.opts[x.sel].t;
    return `<span class="pgap${st}"><span class="num">${n}</span>${word?esc(word):"&nbsp;"}</span>`;
  });
  const lines = v.gaps.map((x,ix)=>{
    const ent = w[x.g.k].entries.find(e=>e.term===x.g.t);
    const chips = x.opts.map((o,oi)=>{
      let cls = "chip";
      if(x.status && x.sel===oi) cls += x.status==="ok" ? " ok" : " bad";
      if(finished && o.ok) cls = "chip ok";
      const lock = x.status==="ok" || finished;
      return `<button type="button" class="${cls}" data-g="${ix}" data-o="${oi}" aria-pressed="${x.sel===oi}" ${lock?"disabled":""}>${esc(o.t)}</button>`;
    }).join("");
    const exp = finished && ent ? `<p class="explain"><b>${esc(ent.term)}</b> = ${esc(ent.m)}.</p>` : "";
    return `<div class="gapline"><span class="gn">${ix+1}</span><div><div class="chips">${chips}</div>${exp}</div></div>`;
  }).join("");
  const n = v.gaps.length, okNow = v.gaps.filter(x=>x.status==="ok").length;
  let fb = "";
  if(v.round===1 && !finished) fb = `<div class="fb hint"><span class="k">${okNow} of ${n} correct</span>Change the gaps in red. Read the words before and after each gap.</div>`;
  if(finished) fb = `<div class="fb ${v.first>=n-1?"ok":"bad"}"><span class="k">First try: ${v.first} of ${n}</span>${v.first<n?"The ones you missed are back in your flashcards as \"Again\".":"All correct!"}</div>`;
  const filled = v.gaps.every(x=>x.sel!==null);
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Back</button>${coinBadge(v.tick)}</div>
  <div class="task">Choose the correct option for each gap.</div>
  <div class="passage"><h3>${esc(t.title)}</h3>${body}</div>
  <div aria-live="polite">${fb}</div>
  ${lines}
  ${finished && v.earned ? `<p class="earned">+${v.earned} 🪙</p>` : ""}
  <div class="actions">
    ${finished ? `<button type="button" class="btn ghost" id="cards">Flashcards</button><button type="button" class="btn amber-btn" id="another">Another text</button>`
               : `<button type="button" class="btn amber-btn" id="check" ${filled?"":"disabled"}>${v.round===0?"Check":"Check again"}</button>`}
  </div>`;
  v.tick = false;
  bindBack(at({name:"flash", f:"all"}));
  if(finished){
    document.getElementById("cards").onclick=()=>go(at({name:"flash", f:"all"}));
    document.getElementById("another").onclick=()=>startTest(w);
    return;
  }
  $app.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{
    const x = v.gaps[+b.dataset.g]; x.sel = +b.dataset.o; x.status = null; ftest();
  });
  document.getElementById("check").onclick=()=>{
    v.gaps.forEach(x=>{
      x.status = x.opts[x.sel].ok ? "ok" : "bad";
      if(x.status==="bad") state.cards[cardId(w, x.g.k, x.g.t)] = 0;
    });
    if(v.round===0){
      v.first = v.gaps.filter(x=>x.status==="ok").length;
      v.earned = v.first; state.coins += v.first; if(v.first) v.tick = true; countDay(v.first);
    }
    save(); v.round++; ftest();
  };
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
    if(it.result==="ok" && it.tries===0){ view.firstRight++; state.coins++; view.earned = (view.earned||0)+1; view.tick = true; countDay(1); save(); }
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

/* ── daily goal, streak, scratch cards ── */
const GOAL = 10;                 // answers right first time in a day
const TICKET_EVERY = 3;          // a scratch card every 3 days in a row
const GAME_CAP = 40;             // most coins a day from games
const PRIZE_PHOTOS = [];         // e.g. ["prizes/sunset.jpg", …]: teacher's photos
const dayKey = (d=new Date()) => d.toLocaleDateString("en-CA");
const todayCount = () => (state.days||{})[dayKey()] || 0;
function streak(){
  let d = new Date(), n = 0;
  if(((state.days||{})[dayKey(d)]||0) < GOAL) d.setDate(d.getDate()-1);
  while(((state.days||{})[dayKey(d)]||0) >= GOAL){ n++; d.setDate(d.getDate()-1); }
  return n;
}
function countDay(n){
  if(!n) return;
  state.days = state.days || {};
  const k = dayKey(), before = state.days[k] || 0;
  state.days[k] = before + n;
  if(before < GOAL && state.days[k] >= GOAL){
    const s = streak();
    let ticket = false;
    if(s % TICKET_EVERY === 0 && state.lastTicket !== k){ state.tickets = (state.tickets||0) + 1; state.lastTicket = k; ticket = true; }
    save();
    setTimeout(()=>celebrate(s, ticket), 350);
  }
}
function celebrate(s, ticket){
  const a = activePet();
  const box = document.createElement("div");
  box.className = "pop-wrap";
  box.innerHTML = `<div class="pop" role="dialog" aria-modal="true" aria-labelledby="pop-t">
    <div class="pop-pet" aria-hidden="true">${a ? a.pet.e : "🎉"}</div>
    <div class="pop-flame">🔥 <b>${s}</b></div>
    <h3 id="pop-t">${s===1 ? "1 day in a row!" : `${s} days in a row!`}</h3>
    <p>${a ? `${esc(a.name)} is proud of you. ` : ""}You reached today's goal.</p>
    ${ticket ? `<p class="pop-ticket">🎟️ You won a scratch card!</p>` : `<p class="pop-sub">${TICKET_EVERY - (s % TICKET_EVERY)} more ${TICKET_EVERY - (s % TICKET_EVERY)===1?"day":"days"} for a scratch card.</p>`}
    <button type="button" class="btn" id="pop-ok">${ticket ? "Scratch it later" : "Great!"}</button>
    ${ticket ? `<button type="button" class="btn amber-btn" id="pop-go">Scratch now</button>` : ""}
  </div>`;
  document.body.appendChild(box);
  const close = () => box.remove();
  box.querySelector("#pop-ok").onclick = close;
  box.onclick = e => { if(e.target===box) close(); };
  const g = box.querySelector("#pop-go"); if(g) g.onclick = () => { close(); go({name:"scratch"}); };
  box.querySelector("#pop-ok").focus();
}

/* ── places: scenes drawn in SVG so they look the same on every phone ── */
const PLACES = [
  {id:"garden", n:"Garden", p:0},
  {id:"beach", n:"Beach", p:120},
  {id:"forest", n:"Forest", p:150},
  {id:"snow", n:"Snowy mountains", p:150},
  {id:"desert", n:"Desert", p:200},
  {id:"city", n:"City at night", p:250},
  {id:"sea", n:"Under the sea", p:350},
  {id:"space", n:"Space", p:500}
];
function sceneSVG(id){
  const S = {
  garden:`<defs><linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd4f5"/><stop offset="1" stop-color="#dff1fb"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#g-sky)"/><circle cx="262" cy="42" r="20" fill="#ffd45c"/>
    <ellipse cx="70" cy="58" rx="30" ry="9" fill="#fff" opacity=".9"/><ellipse cx="150" cy="40" rx="22" ry="7" fill="#fff" opacity=".8"/>
    <path d="M0 140 Q80 110 160 135 T320 128 V200 H0Z" fill="#8fd07a"/><path d="M0 160 Q90 140 180 158 T320 150 V200 H0Z" fill="#6bbd5c"/>
    <g fill="#ff8fb1"><circle cx="40" cy="172" r="4"/><circle cx="270" cy="178" r="4"/><circle cx="230" cy="166" r="3"/></g><g fill="#fff3a6"><circle cx="70" cy="182" r="3"/><circle cx="292" cy="164" r="3"/></g>`,
  beach:`<defs><linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ec2f0"/><stop offset="1" stop-color="#c9ecfa"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#b-sky)"/><circle cx="60" cy="48" r="22" fill="#ffd45c"/>
    <rect y="108" width="320" height="40" fill="#2e9fd8"/><path d="M0 116 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#bfe8fb" stroke-width="3" fill="none"/>
    <path d="M0 140 Q160 125 320 140 V200 H0Z" fill="#f3d79a"/><path d="M0 150 Q160 138 320 152" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>
    <path d="M268 160 l4 -60" stroke="#8a5a2b" stroke-width="5"/><path d="M272 100 q-20 -6 -34 8 M272 100 q18 -10 34 2 M272 100 q-4 -18 -20 -22 M272 100 q12 -14 30 -12" stroke="#3aa35a" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  forest:`<defs><linearGradient id="f-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3d4"/><stop offset="1" stop-color="#eaf6ef"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#f-sky)"/>
    <g fill="#5d9c74"><path d="M30 140 l25 -70 l25 70Z"/><path d="M110 140 l22 -60 l22 60Z"/><path d="M230 140 l28 -78 l28 78Z"/></g>
    <g fill="#2f6e4c"><path d="M0 160 l30 -86 l30 86Z"/><path d="M70 160 l26 -74 l26 74Z"/><path d="M190 160 l30 -90 l30 90Z"/><path d="M262 160 l30 -80 l30 80Z"/></g>
    <rect y="150" width="320" height="50" fill="#6a8f3e"/><path d="M0 158 Q160 150 320 160" stroke="#83a952" stroke-width="6" fill="none"/>
    <g fill="#c0392b"><circle cx="150" cy="176" r="6"/></g><rect x="148" y="176" width="4" height="8" fill="#fff"/>`,
  snow:`<defs><linearGradient id="s-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8c8e8"/><stop offset="1" stop-color="#e6f0fa"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#s-sky)"/>
    <path d="M-10 150 L70 50 L150 150Z" fill="#8ea6c2"/><path d="M70 50 L48 78 L60 74 L70 84 L82 74 L94 80Z" fill="#fff"/>
    <path d="M110 150 L210 30 L310 150Z" fill="#7891b0"/><path d="M210 30 L182 64 L198 58 L210 70 L224 58 L240 66Z" fill="#fff"/>
    <path d="M0 145 Q160 128 320 145 V200 H0Z" fill="#f4f8fc"/>
    <g fill="#fff"><circle cx="30" cy="30" r="2.5"/><circle cx="120" cy="20" r="2"/><circle cx="160" cy="70" r="2.5"/><circle cx="280" cy="40" r="2"/><circle cx="250" cy="90" r="2.5"/><circle cx="20" cy="100" r="2"/></g>`,
  desert:`<defs><linearGradient id="d-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7a65e"/><stop offset="1" stop-color="#fde2b8"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#d-sky)"/><circle cx="240" cy="70" r="28" fill="#fff1c1"/>
    <path d="M0 140 Q90 105 180 138 T320 125 V200 H0Z" fill="#e8b86a"/><path d="M0 165 Q120 140 230 162 T320 158 V200 H0Z" fill="#d9a04f"/>
    <g fill="#4f8a4a"><rect x="58" y="110" width="10" height="50" rx="5"/><rect x="44" y="122" width="8" height="20" rx="4"/><rect x="44" y="136" width="18" height="7" rx="3.5"/><rect x="72" y="116" width="8" height="18" rx="4"/><rect x="64" y="128" width="16" height="7" rx="3.5"/></g>`,
  city:`<defs><linearGradient id="c-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151a3c"/><stop offset="1" stop-color="#3b3f78"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#c-sky)"/><circle cx="262" cy="40" r="16" fill="#f5eec9"/><circle cx="270" cy="35" r="14" fill="#1b2046"/>
    <g fill="#fff"><circle cx="40" cy="30" r="1.5"/><circle cx="90" cy="18" r="1.2"/><circle cx="140" cy="40" r="1.5"/><circle cx="200" cy="22" r="1.2"/><circle cx="300" cy="70" r="1.2"/><circle cx="20" cy="70" r="1.2"/></g>
    <g fill="#23284f"><rect x="0" y="90" width="50" height="110"/><rect x="56" y="60" width="44" height="140"/><rect x="106" y="100" width="40" height="100"/><rect x="152" y="70" width="52" height="130"/><rect x="210" y="96" width="44" height="104"/><rect x="260" y="80" width="60" height="120"/></g>
    <g fill="#ffd66b"><rect x="12" y="104" width="7" height="9"/><rect x="30" y="122" width="7" height="9"/><rect x="66" y="76" width="7" height="9"/><rect x="84" y="96" width="7" height="9"/><rect x="66" y="116" width="7" height="9"/><rect x="116" y="114" width="7" height="9"/><rect x="164" y="86" width="7" height="9"/><rect x="184" y="106" width="7" height="9"/><rect x="164" y="126" width="7" height="9"/><rect x="222" y="112" width="7" height="9"/><rect x="274" y="94" width="7" height="9"/><rect x="296" y="114" width="7" height="9"/></g>
    <rect y="170" width="320" height="30" fill="#14183a"/>`,
  sea:`<defs><linearGradient id="u-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fb3d9"/><stop offset="1" stop-color="#0d4f86"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#u-sky)"/>
    <g fill="#d7f3ff" opacity=".55"><circle cx="60" cy="60" r="5"/><circle cx="68" cy="40" r="3"/><circle cx="250" cy="80" r="6"/><circle cx="258" cy="56" r="3.5"/><circle cx="160" cy="30" r="3"/></g>
    <path d="M0 168 Q160 150 320 168 V200 H0Z" fill="#e3c88d"/>
    <g stroke="#2f9e6e" stroke-width="6" fill="none" stroke-linecap="round"><path d="M30 172 q-10 -20 0 -40 t0 -40"/><path d="M46 172 q10 -18 0 -34"/><path d="M284 170 q-10 -24 0 -48 t0 -30"/></g>
    <g fill="#ff8a7a"><path d="M220 176 l6 -14 l6 14 l-6 -4Z"/></g>`,
  space:`<rect width="320" height="200" fill="#0b0d24"/>
    <g fill="#fff"><circle cx="30" cy="30" r="1.5"/><circle cx="80" cy="70" r="1"/><circle cx="130" cy="20" r="1.5"/><circle cx="180" cy="60" r="1"/><circle cx="220" cy="30" r="1.2"/><circle cx="300" cy="50" r="1.5"/><circle cx="20" cy="110" r="1"/><circle cx="110" cy="100" r="1.2"/><circle cx="290" cy="120" r="1"/></g>
    <circle cx="250" cy="60" r="24" fill="#e0884f"/><ellipse cx="250" cy="60" rx="40" ry="9" fill="none" stroke="#f3c98a" stroke-width="4" transform="rotate(-15 250 60)"/>
    <circle cx="60" cy="50" r="10" fill="#8fb6ff"/>
    <path d="M0 160 Q160 140 320 160 V200 H0Z" fill="#8c8ca8"/><g fill="#6f6f8c"><ellipse cx="70" cy="178" rx="16" ry="5"/><ellipse cx="230" cy="172" rx="22" ry="6"/></g>`
  };
  return `<svg class="scene-svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${S[id]||S.garden}</svg>`;
}
function weekDots(){
  const out = [], d = new Date(); d.setDate(d.getDate()-6);
  for(let i=0;i<7;i++){ const k = dayKey(d), on = ((state.days||{})[k]||0) >= GOAL;
    out.push(`<span class="wd${on?" on":""}${i===6?" today":""}"><i>${d.toLocaleDateString("en-GB",{weekday:"narrow"})}</i></span>`); d.setDate(d.getDate()+1); }
  return out.join("");
}
function sceneHTML(id, emoji, cls){
  return `<div class="scene ${cls||""}">${sceneSVG(id)}${emoji?`<span class="scene-pet" aria-hidden="true">${emoji}</span>`:""}</div>`;
}
function places(){
  const a = activePet();
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Back</button>${coinBadge()}</div>
  <div class="unit-head"><h2>Places</h2></div>
  <p class="note">Choose where your pets live. Once you buy a place, it's yours.</p>
  <div class="place-grid">${PLACES.map(x=>{
    const owned = !!state.places[x.id], here = state.place===x.id, confirm = view.confirm===x.id, can = state.coins>=x.p;
    const label = here ? "You live here" : owned ? "Move here" : confirm ? `Buy for 🪙 ${x.p}?` : `🪙 ${x.p}`;
    return `<button type="button" class="place-card${here?" here":""}${confirm?" confirm":""}" data-place="${x.id}" ${!owned && !can ? "disabled" : ""}>
      ${sceneHTML(x.id, here && a ? a.pet.e : "", "small")}
      <span class="t">${x.n}</span><span class="s">${label}</span></button>`;
  }).join("")}</div>`;
  bindBack({name:"pet"});
  $app.querySelectorAll("[data-place]").forEach(b=>b.onclick=()=>{
    const x = PLACES.find(p=>p.id===b.dataset.place);
    if(state.places[x.id]){ state.place = x.id; save(); go({name:"places"}); return; }
    if(view.confirm!==x.id){ go({name:"places", confirm:x.id}); return; }
    if(state.coins < x.p) return;
    state.coins -= x.p; state.places[x.id] = true; state.place = x.id; save(); go({name:"places"});
  });
}

/* ── scratch card ── */
function rollPrize(){
  const notOwned = PLACES.filter(p=>!state.places[p.id] && p.p<=250);
  const r = Math.random();
  if(PRIZE_PHOTOS.length && r < 0.30) return {t:"photo", src:PRIZE_PHOTOS[Math.floor(Math.random()*PRIZE_PHOTOS.length)]};
  if(notOwned.length && r < 0.42) return {t:"place", id:notOwned[Math.floor(Math.random()*notOwned.length)].id};
  const c = Math.random();
  return {t:"coins", n: c<0.55 ? 10 : c<0.85 ? 25 : 50};
}
function prizeHTML(p){
  if(p.t==="coins") return `<div class="prize"><div class="prize-big">🪙</div><b>${p.n} coins</b></div>`;
  if(p.t==="place"){ const x = PLACES.find(q=>q.id===p.id); return `<div class="prize">${sceneHTML(p.id,"","small")}<b>A new place: ${x.n}</b></div>`; }
  return `<div class="prize prize-photo"><img src="${esc(p.src)}" alt="Your prize photo"></div>`;
}
function claimPrize(p){
  if(p.t==="coins") state.coins += p.n;
  if(p.t==="place") state.places[p.id] = true;
  if(p.t==="photo" && !state.photos.includes(p.src)) state.photos.push(p.src);
  state.tickets = Math.max(0, (state.tickets||0) - 1);
  state.pending = null; save();
}
function scratch(){
  if(!state.tickets && !view.done){ go({name:"pet"}); return; }
  if(!state.pending && !view.done){ state.pending = rollPrize(); save(); }
  const p = view.done || state.pending;
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Back</button>${coinBadge()}</div>
  <div class="unit-head"><h2>Scratch card</h2></div>
  <p class="note">${view.done ? "It's yours!" : "Scratch the silver part with your finger."}</p>
  <div class="scratch-box" id="sbox">
    ${prizeHTML(p)}
    ${view.done ? "" : `<canvas id="scv" aria-label="Scratch area"></canvas>`}
  </div>
  <div class="actions">${view.done ? (state.tickets>0 ? `<button type="button" class="btn amber-btn" id="next">Next card (${state.tickets})</button>` : `<button type="button" class="btn" id="fin">Done</button>`) : ""}</div>`;
  bindBack({name:"pet"});
  if(view.done){
    const n = document.getElementById("next"); if(n) n.onclick = () => go({name:"scratch"});
    const f = document.getElementById("fin"); if(f) f.onclick = () => go({name:"pet"});
    return;
  }
  const box = document.getElementById("sbox"), cv = document.getElementById("scv");
  const w = box.clientWidth, h = box.clientHeight, dpr = window.devicePixelRatio || 1;
  cv.width = w*dpr; cv.height = h*dpr;
  const ctx = cv.getContext("2d"); ctx.scale(dpr,dpr);
  const gr = ctx.createLinearGradient(0,0,w,h); gr.addColorStop(0,"#c9ccd3"); gr.addColorStop(.5,"#eef0f3"); gr.addColorStop(1,"#b6bac3");
  ctx.fillStyle = gr; ctx.fillRect(0,0,w,h);
  ctx.fillStyle = "#7d828d"; ctx.font = "700 20px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillText("SCRATCH HERE", w/2, h/2+7);
  ctx.globalCompositeOperation = "destination-out";
  let drawing = false, moves = 0, last = null, finished = false;
  const pos = e => { const r = cv.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; };
  const stroke = (a,b) => { ctx.lineWidth = 34; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); };
  const cleared = () => { const d = ctx.getImageData(0,0,cv.width,cv.height).data; let n=0,t=0; for(let i=3;i<d.length;i+=64){ t++; if(d[i]===0) n++; } return n/t; };
  const finish = () => { if(finished) return; finished = true; cv.style.transition="opacity .4s"; cv.style.opacity="0"; claimPrize(p); setTimeout(()=>go({name:"scratch", done:p}), 450); };
  cv.addEventListener("pointerdown", e => { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); stroke(last,last); });
  cv.addEventListener("pointermove", e => { if(!drawing) return; const p2 = pos(e); stroke(last,p2); last = p2; if(++moves % 8 === 0 && cleared() > .5) finish(); });
  const up = () => { drawing = false; if(cleared() > .5) finish(); };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
}
function photos(){
  $app.innerHTML = `${header()}<div class="unit-head"><h2>My photos</h2></div>
  <div class="photo-grid">${state.photos.map(src=>`<img src="${esc(src)}" alt="Prize photo" loading="lazy">`).join("")}</div>`;
  bindBack({name:"pet"});
}

/* ── games ── */
function gameEntries(){
  const seen = new Set(), out = [];
  EXAMS.forEach(x=>x.weeks.forEach(w=>["phrasal","colloc","fixed"].forEach(k=>(w[k]?w[k].entries:[]).forEach(e=>{
    const phrase = e.term.replace(/\(.*?\)/g,"").replace(/…/g," ").replace(/\b(someone's|someone|something)\b/g,"").replace(/^(be|the)\s+/,"").replace(/\s+/g," ").trim();
    if(phrase && !seen.has(phrase)){ seen.add(phrase); out.push({term:phrase, m:e.m, k}); }
  }))));
  return out;
}
const lettersOf = t => t.toUpperCase().replace(/[^A-Z]/g,"");
function giveGameCoins(n){
  const d = dayKey(); if(state.gc.d!==d) state.gc = {d, n:0};
  const g = Math.max(0, Math.min(n, GAME_CAP - state.gc.n));
  state.gc.n += g; state.coins += g; save();
  return {got:g, capped:g<n};
}
function coinsLine(r){
  if(r.got) return `<p class="earned">+${r.got} 🪙</p>`;
  return r.capped ? `<p class="earned">You've reached today's coin limit for games. Keep playing for fun!</p>` : "";
}
function games(){
  const ok = gameEntries().length >= 8;
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Back</button>${coinBadge()}</div>
  <div class="unit-head"><h2>Games</h2></div>
  ${ok ? menu([
    {id:"g1", t:"Word search", s:"find the expression"},
    {id:"g2", t:"Hangman", s:"guess the letters"},
    {id:"g3", t:"Anagrams", s:"put the letters in order"},
    {id:"g4", t:"Memory", s:"match the pairs"},
    {id:"g5", t:"60 seconds", s:state.best60?`best: ${state.best60}`:"as many as you can"}
  ]) : `<p class="note">The games open when there's more vocabulary in your classes.</p>`}
  <p class="note" style="margin-top:20px">Words from all your classes. You can win up to ${GAME_CAP} coins a day with games.</p>`;
  bindBack({name:"pet"});
  if(!ok) return;
  document.getElementById("g1").onclick=()=>startWordSearch();
  document.getElementById("g2").onclick=()=>startHangman();
  document.getElementById("g3").onclick=()=>startAnagram();
  document.getElementById("g4").onclick=()=>startMemory();
  document.getElementById("g5").onclick=()=>startTimer();
}

/* word search: definitions as clues, expressions hidden in a 10×10 grid */
const WS = 10;
function startWordSearch(){
  const pool = shuffle(gameEntries().filter(e=>{ const n = lettersOf(e.term).length; return n>=4 && n<=WS; }));
  const grid = Array.from({length:WS},()=>Array(WS).fill(""));
  const dirs = [[0,1],[1,0],[1,1]];
  const words = [];
  for(const e of pool){
    if(words.length>=7) break;
    const L = lettersOf(e.term);
    if(words.some(w=>w.L===L)) continue;
    for(let tries=0; tries<80; tries++){
      const [dr,dc] = dirs[Math.floor(Math.random()*dirs.length)];
      const r0 = Math.floor(Math.random()*(WS - dr*(L.length-1))), c0 = Math.floor(Math.random()*(WS - dc*(L.length-1)));
      let fits = true;
      for(let i=0;i<L.length;i++){ const ch = grid[r0+dr*i][c0+dc*i]; if(ch && ch!==L[i]){ fits=false; break; } }
      if(!fits) continue;
      const cells = [];
      for(let i=0;i<L.length;i++){ grid[r0+dr*i][c0+dc*i] = L[i]; cells.push((r0+dr*i)*WS + c0+dc*i); }
      words.push({e, L, cells, found:false}); break;
    }
  }
  const AZ = "AEIOURSTLNMDCPBGHFKWY";
  for(let r=0;r<WS;r++) for(let c=0;c<WS;c++) if(!grid[r][c]) grid[r][c] = AZ[Math.floor(Math.random()*AZ.length)];
  go({name:"wsearch", grid, words, sel:null, start:Date.now(), found:0, over:false});
}
function wsearch(){
  const v = view, flat = v.grid.flat();
  const foundCells = new Map(); v.words.forEach((w,i)=>{ if(w.found || v.over) w.cells.forEach(c=>foundCells.set(c, w.found ? i : -1)); });
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Games</button><span class="topr"><span class="label">${v.found} / ${v.words.length}</span>${coinBadge()}</span></div>
  <div class="ws-grid" style="--n:${WS}">${flat.map((ch,i)=>{
    const f = foundCells.has(i) ? (foundCells.get(i)>=0 ? ` f${foundCells.get(i)%6}` : " miss") : "";
    return `<button type="button" class="ws-cell${f}${v.sel===i?" sel":""}" data-i="${i}" aria-label="${ch}">${ch}</button>`;
  }).join("")}</div>
  <p class="task">Tap the first letter, then the last letter of the expression.</p>
  <ol class="ws-clues">${v.words.map((w,i)=>`<li class="${w.found?"done f"+(i%6):""}"><span>${esc(w.e.m)}</span> <span class="n">(${w.L.length})</span>${w.found||v.over?` <b>${esc(w.e.term)}</b>`:""}</li>`).join("")}</ol>
  ${v.over ? `${v.res?coinsLine(v.res):""}<div class="actions"><button type="button" class="btn" id="again">New puzzle</button></div>`
           : `<div class="actions"><button type="button" class="btn ghost" id="giveup">Show the answers</button></div>`}`;
  bindBack({name:"games"});
  if(v.over){ document.getElementById("again").onclick = startWordSearch; return; }
  document.getElementById("giveup").onclick = () => { v.over = true; v.res = giveGameCoins(v.found); wsearch(); };
  $app.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{
    const i = +b.dataset.i;
    if(v.sel===null){ v.sel = i; wsearch(); return; }
    const a = v.sel; v.sel = null;
    const hit = v.words.find(w=>!w.found && ((w.cells[0]===a && w.cells[w.cells.length-1]===i) || (w.cells[0]===i && w.cells[w.cells.length-1]===a)));
    if(hit){ hit.found = true; v.found++; }
    if(v.found===v.words.length){ v.over = true; v.res = giveGameCoins(v.found + 3); }
    wsearch();
  });
}

/* hangman with hearts instead of a drawing */
function startHangman(){
  const pool = gameEntries().filter(e=>lettersOf(e.term).length>=4 && lettersOf(e.term).length<=14);
  const e = pool[Math.floor(Math.random()*pool.length)];
  go({name:"hangman", e, guessed:[], lives:6, over:false});
}
function hangman(){
  const v = view, word = v.e.term.toUpperCase();
  const solved = [...lettersOf(word)].every(ch=>v.guessed.includes(ch));
  if(!v.over && (solved || v.lives<=0)){ v.over = true; v.won = solved; v.res = solved ? giveGameCoins(2) : null; }
  const shown = [...word].map(ch=>/[A-Z]/.test(ch) ? `<span class="hm-l${v.guessed.includes(ch)||v.over?" on":""}${v.over&&!v.guessed.includes(ch)?" miss":""}">${v.guessed.includes(ch)||v.over?ch:"&nbsp;"}</span>` : (ch===" " ? `<span class="hm-gap"></span>` : `<span class="hm-p">${esc(ch)}</span>`)).join("");
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Games</button>${coinBadge()}</div>
  <div class="hm-lives" aria-label="${v.lives} lives left">${"❤️".repeat(Math.max(0,v.lives))}${"🤍".repeat(6-Math.max(0,v.lives))}</div>
  <p class="task">${esc(KIND[v.e.k])} · it means: <b>${esc(v.e.m)}</b></p>
  <div class="hm-word">${shown}</div>
  ${v.over ? `<div class="fb ${v.won?"ok":"bad"}"><span class="k">${v.won?"Well done!":"Not this time"}</span>${esc(v.e.term)} = ${esc(v.e.m)}.</div>${v.res?coinsLine(v.res):""}
    <div class="actions"><button type="button" class="btn" id="again">Next word</button></div>`
  : `<div class="kb">${[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(ch=>{
      const used = v.guessed.includes(ch), bad = used && !word.includes(ch);
      return `<button type="button" class="key${used?(bad?" bad":" ok"):""}" data-k="${ch}" ${used?"disabled":""}>${ch}</button>`;
    }).join("")}</div>`}`;
  bindBack({name:"games"});
  if(v.over){ document.getElementById("again").onclick = startHangman; return; }
  $app.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{
    const ch = b.dataset.k; v.guessed.push(ch); if(!word.includes(ch)) v.lives--; hangman();
  });
}

/* anagrams: tap the letters in order */
function startAnagram(){
  const pool = gameEntries().filter(e=>{ const n = lettersOf(e.term).length; return n>=4 && n<=12; });
  const e = pool[Math.floor(Math.random()*pool.length)];
  const L = lettersOf(e.term);
  let tiles; do { tiles = shuffle([...L].map((ch,i)=>({ch, i}))); } while(L.length>3 && tiles.map(t=>t.ch).join("")===L);
  go({name:"anagram", e, L, tiles, picked:[], hinted:false, over:false, wrong:false});
}
function anagram(){
  const v = view, words = v.e.term.toUpperCase().split(" ").map(w=>lettersOf(w).length).filter(Boolean);
  let k = 0;
  const slots = words.map(n=>`<span class="an-word">${Array.from({length:n},()=>{ const t = v.picked[k++]; return `<span class="an-slot${t!==undefined?" on":""}${v.over?" ok":""}${v.wrong?" bad":""}">${t!==undefined?v.tiles[t].ch:""}</span>`; }).join("")}</span>`).join("");
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Games</button>${coinBadge()}</div>
  <p class="task">${esc(KIND[v.e.k])} · it means: <b>${esc(v.e.m)}</b></p>
  <div class="an-slots">${slots}</div>
  ${v.over ? `<div class="fb ok"><span class="k">${v.hinted?"Done":"Well done!"}</span>${esc(v.e.term)} = ${esc(v.e.m)}.</div>${v.res?coinsLine(v.res):""}
     <div class="actions"><button type="button" class="btn" id="again">Next word</button></div>`
  : `<div class="an-tiles">${v.tiles.map((t,i)=>`<button type="button" class="an-tile" data-t="${i}" ${v.picked.includes(i)?"disabled":""}>${t.ch}</button>`).join("")}</div>
     ${v.wrong?`<p class="explain">Not quite. Remove some letters and try again.</p>`:""}
     <div class="actions"><button type="button" class="btn ghost" id="undo">Undo</button><button type="button" class="btn ghost" id="hint">Hint</button><button type="button" class="btn ghost" id="show">Show answer</button></div>`}`;
  bindBack({name:"games"});
  if(v.over){ document.getElementById("again").onclick = startAnagram; return; }
  $app.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{
    v.picked.push(+b.dataset.t); v.wrong = false;
    if(v.picked.length===v.L.length){
      const got = v.picked.map(i=>v.tiles[i].ch).join("");
      if(got===v.L){ v.over = true; v.res = v.hinted ? null : giveGameCoins(2); } else v.wrong = true;
    }
    anagram();
  });
  document.getElementById("undo").onclick = () => { v.picked.pop(); v.wrong = false; anagram(); };
  document.getElementById("hint").onclick = () => {
    v.hinted = true;
    let n = 0; while(n<v.picked.length && v.tiles[v.picked[n]].ch===v.L[n]) n++;
    v.picked = v.picked.slice(0,n);
    if(n<v.L.length){ const t = v.tiles.findIndex((x,i)=>x.ch===v.L[n] && !v.picked.includes(i)); v.picked.push(t); }
    v.wrong = false;
    if(v.picked.length===v.L.length) v.over = true;
    anagram();
  };
  document.getElementById("show").onclick = () => { v.hinted = true; v.picked = []; [...v.L].forEach(ch=>{ v.picked.push(v.tiles.findIndex((x,i)=>x.ch===ch && !v.picked.includes(i))); }); v.over = true; anagram(); };
}

/* memory: expression ↔ meaning */
function startMemory(){
  const pick = shuffle(gameEntries()).slice(0,6);
  const cards = shuffle(pick.flatMap((e,i)=>[{p:i, txt:e.term, kind:"t"},{p:i, txt:e.m, kind:"m"}]));
  go({name:"memory", cards, open:[], matched:[], moves:0, lock:false, over:false});
}
function memory(){
  const v = view;
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Games</button><span class="topr"><span class="label">${v.moves} moves</span>${coinBadge()}</span></div>
  <p class="task">Find the pairs: an expression and what it means.</p>
  <div class="mem-grid">${v.cards.map((c,i)=>{
    const up = v.open.includes(i) || v.matched.includes(c.p);
    return `<button type="button" class="mem${up?" up":""}${v.matched.includes(c.p)?" done":""}${c.kind==="t"?" term":""}" data-c="${i}" ${up?"disabled":""}>
      <span class="mem-in">${up?esc(c.txt):""}</span></button>`;
  }).join("")}</div>
  ${v.over ? `<div class="fb ok"><span class="k">All pairs found</span>${v.moves} moves.</div>${v.res?coinsLine(v.res):""}<div class="actions"><button type="button" class="btn" id="again">Play again</button></div>` : ""}`;
  bindBack({name:"games"});
  if(v.over){ document.getElementById("again").onclick = startMemory; return; }
  $app.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{
    if(v.lock) return;
    const i = +b.dataset.c; v.open.push(i);
    if(v.open.length===2){
      v.moves++;
      const [a,c] = v.open.map(j=>v.cards[j]);
      if(a.p===c.p){ v.matched.push(a.p); v.open = []; if(v.matched.length===6){ v.over = true; v.res = giveGameCoins(6); } memory(); }
      else { v.lock = true; memory(); setTimeout(()=>{ v.open = []; v.lock = false; if(view===v) memory(); }, 1100); }
      return;
    }
    memory();
  });
}

/* 60 seconds: as many sentence gaps as you can */
function startTimer(){
  const pool = shuffle(petPool()).map(prep);
  go({name:"timer", pool, i:0, score:0, end:Date.now()+60000, over:false, flash:null});
}
function timer(){
  const v = view;
  const left = Math.max(0, Math.ceil((v.end - Date.now())/1000));
  if(!v.over && left<=0){ v.over = true; v.res = giveGameCoins(v.score); if(v.score>(state.best60||0)){ state.best60 = v.score; v.record = true; save(); } }
  if(v.over){
    clearInterval(v.tickId);
    $app.innerHTML = `
    <div class="top"><button type="button" class="back" id="back">← Games</button>${coinBadge()}</div>
    <div class="result"><span class="label">60 seconds</span><div class="num">${v.score}</div>
    <p>${v.record?"New personal best!":`Your best: ${state.best60}`}</p>${v.res?coinsLine(v.res):""}
    <div class="actions" style="justify-content:flex-start"><button type="button" class="btn" id="again">Play again</button></div></div>`;
    bindBack({name:"games"});
    document.getElementById("again").onclick = startTimer;
    return;
  }
  const it = v.pool[v.i % v.pool.length];
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Stop</button><span class="topr"><span class="label">✓ ${v.score}</span><span class="t60${left<=10?" low":""}" id="t60">${left}s</span></span></div>
  <div class="bar amber"><i style="width:${left/60*100}%"></i></div>
  <p class="q">${esc(it.q).replace("___",'<span class="gap">&nbsp;</span>')}</p>
  <div class="opts">${it.opts.map((o,ix)=>`<button type="button" class="opt${v.flash&&v.flash.ix===ix?(v.flash.ok?" right":" wrong"):""}" data-o="${ix}"><span class="b">${LETTERS[ix]}</span><span>${esc(o.t)}</span></button>`).join("")}</div>`;
  bindBack({name:"games"});
  document.getElementById("back").addEventListener("click", ()=>clearInterval(v.tickId));
  if(!v.tickId) v.tickId = setInterval(()=>{ if(view!==v){ clearInterval(v.tickId); return; } const l = Math.max(0, Math.ceil((v.end-Date.now())/1000)); const el = document.getElementById("t60"); if(el){ el.textContent = l+"s"; el.classList.toggle("low", l<=10); } if(l<=0) timer(); }, 250);
  if(v.flash) return;
  $app.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{
    const ix = +b.dataset.o, ok = it.opts[ix].ok;
    if(ok) v.score++;
    v.flash = {ix, ok}; timer();
    setTimeout(()=>{ if(view!==v || v.over) return; v.flash = null; v.i++; timer(); }, ok ? 250 : 600);
  });
}

/* ── install as an app ── */
let installEvt = null;
const isStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if(view.name==="exams") render(); });
window.addEventListener("appinstalled", () => { installEvt = null; if(view.name==="exams") render(); });
function installHTML(){
  if(isStandalone()) return "";
  if(installEvt) return `<button type="button" class="install" id="inst"><span aria-hidden="true">📲</span> Install the app on your phone</button>`;
  if(isIOS()) return `<p class="install-tip">📲 To install it: tap <b>Share</b> <span aria-hidden="true">⎋</span>, then <b>Add to Home Screen</b>.</p>`;
  return "";
}
function bindInstall(){
  const b = document.getElementById("inst");
  if(b) b.onclick = async () => { if(!installEvt) return; installEvt.prompt(); try{ await installEvt.userChoice; }catch(e){} installEvt = null; render(); };
}

/* open straight on the only exam / week when there's just one */
render();

if("serviceWorker" in navigator && location.protocol==="https:" && /github\.io$/.test(location.hostname)){
  try{ navigator.serviceWorker.register("sw.js").catch(()=>{}); }catch(e){}
}
})();
