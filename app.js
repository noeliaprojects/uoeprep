(function(){
"use strict";

const STORE = "uoe:v3";
const MIXED_SIZE = 20;
const VOCAB_SIZE = 24;

let state = {best:{}, coins:0, pets:{}, active:null, cards:{}, lastTest:{}, places:{garden:true}, place:"garden", days:{}, tickets:0, lastTicket:null, pending:null, photos:[], postcards:[], gc:{d:"",n:0}, best60:0};
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
  ({exams, weeks, week:weekView, grammar, explainList, explain, exerciseList, vocab, practice, result, pet, shop, myPets, flash, study, ftest, places, games, wsearch, hangman, anagram, memory, timer, scratch, photos, postcards, postcardView})[view.name]();
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
      <span>Today: ${Math.min(todayCount(),GOAL)} / ${GOAL} right answers</span>
      <span class="sc-bar"><i style="width:${Math.min(100,Math.round(todayCount()/GOAL*100))}%"></i></span></div>
    <div class="sc-week" aria-hidden="true">${weekDots()}</div>
  </div>
  ${state.tickets>0?`<button type="button" class="menu-btn scratch-btn" id="scr"><span class="t">🎟️ Scratch card</span><span class="s">${state.tickets} waiting</span><span class="arr" aria-hidden="true">→</span></button>`:""}
  ${menu([
    {id:"gamesb", t:"Games", s:`play with ${a.name}`},
    {id:"shopb", t:"Shop", s:"pets & places"},
    {id:"mine", t:"My pets", s:`${Object.keys(state.pets).length}`}
  ].concat((state.postcards||[]).length?[{id:"pcb", t:"My postcards", s:`${new Set(state.postcards.map(c=>c.id)).size} / ${POSTCARDS.length}`}]:[])
   .concat(state.photos.length?[{id:"photosb", t:"My photos", s:`${state.photos.length}`}]:[]))}
  <p class="note" style="margin-top:20px">Get ${GOAL} right answers a day. Every ${TICKET_EVERY} days in a row, you win a scratch card.</p>`;
  bindBack({name:"exams"});
  if(view.rename){
    const inp = document.getElementById("pname"); inp.focus(); inp.select();
    document.getElementById("rn").onsubmit = e => {
      e.preventDefault(); const n = inp.value.trim().slice(0,16);
      if(n){ state.pets[state.active] = n; save(); } go({name:"pet"});
    };
  } else document.getElementById("ren").onclick=()=>go({name:"pet", rename:true});
  document.getElementById("shopb").onclick=()=>go({name:"shop"});
  document.getElementById("mine").onclick=()=>go({name:"myPets"});
  document.getElementById("gamesb").onclick=()=>go({name:"games"});
  const sc = document.getElementById("scr"); if(sc) sc.onclick=()=>go({name:"scratch"});
  const ph = document.getElementById("photosb"); if(ph) ph.onclick=()=>go({name:"photos"});
  const pcb = document.getElementById("pcb"); if(pcb) pcb.onclick=()=>go({name:"postcards"});
}
function shopTabs(on){
  return `<div class="top"><button type="button" class="back" id="back">← Back</button>${coinBadge()}</div>
  <div class="unit-head shop-head"><h2>Shop</h2><div class="level" role="group" aria-label="Shop section">
    <button type="button" data-tab="pets" aria-pressed="${on==="pets"}">Pets</button><button type="button" data-tab="places" aria-pressed="${on==="places"}">Places</button></div></div>`;
}
function bindTabs(){ $app.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>go({name:"shop", tab:b.dataset.tab})); }
function shop(){
  if(view.tab==="places"){ places(); return; }
  $app.innerHTML = `
  ${shopTabs("pets")}
  ${TIERS.map((tn,t)=>`
    <div class="section"><span class="label">${tn} · 🪙 ${PETS.find(x=>x.t===t).p}</span>
    <div class="pet-grid">${PETS.filter(x=>x.t===t).map(x=>{
      const owned = state.pets[x.id]!==undefined;
      const can = state.coins >= x.p;
      const confirm = view.confirm===x.id;
      return `<div class="pw"><button type="button" class="pet-card${owned?" owned":""}${confirm?" confirm":""}" data-buy="${x.id}" ${owned||!can?"disabled":""}>
        <span class="pe" aria-hidden="true">${x.e}</span><span class="t">${x.n}</span>
        <span class="s">${owned?"Owned":confirm?`Buy for 🪙 ${x.p}?`:`🪙 ${x.p}`}</span></button>${spkHTML(x, owned||can)}</div>`;
    }).join("")}</div></div>`).join("")}`;
  bindBack({name:"pet"}); bindSpk(); bindTabs();
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
  <div class="pet-grid">${ids.map(id=>{ const x = petById(id); return `<div class="pw">
    <button type="button" class="pet-card${id===state.active?" active":""}" data-pick="${id}"><span class="pe" aria-hidden="true">${x.e}</span>
    <span class="t">${esc(state.pets[id])}</span><span class="s">${id===state.active?"With you now":"Choose"}</span></button>${spkHTML(x, true)}</div>`; }).join("")}</div>`;
  bindBack({name:"pet"}); bindSpk();
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
      v.earned = v.first; state.coins += v.first; if(v.first) v.tick = true;
    }
    const fresh = v.gaps.filter(x=>x.status==="ok" && !x.counted); fresh.forEach(x=>x.counted = true); countDay(fresh.length);
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
    if(it.result==="ok" && it.tries===0){ view.firstRight++; state.coins++; view.earned = (view.earned||0)+1; view.tick = true; }
    if(it.result==="ok"){ countDay(1); save(); }
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
const GOAL = 10;                 // right answers in a day, not in a row
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
  ${shopTabs("places")}
  <p class="note">Choose where your pets live. Once you buy a place, it's yours.</p>
  <div class="place-grid">${PLACES.map(x=>{
    const owned = !!state.places[x.id], here = state.place===x.id, confirm = view.confirm===x.id, can = state.coins>=x.p;
    const label = here ? "You live here" : owned ? "Move here" : confirm ? `Buy for 🪙 ${x.p}?` : `🪙 ${x.p}`;
    return `<button type="button" class="place-card${here?" here":""}${confirm?" confirm":""}" data-place="${x.id}" ${!owned && !can ? "disabled" : ""}>
      ${sceneHTML(x.id, here && a ? a.pet.e : "", "small")}
      <span class="t">${x.n}</span><span class="s">${label}</span></button>`;
  }).join("")}</div>`;
  bindBack({name:"pet"}); bindTabs();
  $app.querySelectorAll("[data-place]").forEach(b=>b.onclick=()=>{
    const x = PLACES.find(p=>p.id===b.dataset.place);
    if(state.places[x.id]){ state.place = x.id; save(); go({name:"shop", tab:"places"}); return; }
    if(view.confirm!==x.id){ go({name:"shop", tab:"places", confirm:x.id}); return; }
    if(state.coins < x.p) return;
    state.coins -= x.p; state.places[x.id] = true; state.place = x.id; save(); go({name:"shop", tab:"places"});
  });
}

/* ── scratch card ── */
function rollPrize(){
  const notOwned = PLACES.filter(p=>!state.places[p.id] && p.p<=250);
  const r = Math.random();
  if(PRIZE_PHOTOS.length && r < 0.30) return {t:"photo", src:PRIZE_PHOTOS[Math.floor(Math.random()*PRIZE_PHOTOS.length)]};
  const a = activePet(), seen = new Set((state.postcards||[]).map(c=>c.id)), fresh = POSTCARDS.filter(p=>!seen.has(p.id));
  if(a && r < (fresh.length ? 0.70 : 0.55)){
    const id = pick(fresh.length ? fresh : POSTCARDS).id;
    return {t:"postcard", id, pet:a.pet.id, m:writePostcard(id, a.pet.id, a.name)};
  }
  if(notOwned.length && r < 0.82) return {t:"place", id:notOwned[Math.floor(Math.random()*notOwned.length)].id};
  const c = Math.random();
  return {t:"coins", n: c<0.55 ? 10 : c<0.85 ? 25 : 50};
}
function prizeHTML(p){
  if(p.t==="coins") return `<div class="prize"><div class="prize-big">🪙</div><b>${p.n} coins</b></div>`;
  if(p.t==="postcard"){ const pet = petById(p.pet); return `<div class="prize prize-pc">${postcardFront(p.id, pet?pet.e:"")}</div>`; }
  if(p.t==="place"){ const x = PLACES.find(q=>q.id===p.id); return `<div class="prize">${sceneHTML(p.id,"","small")}<b>A new place: ${x.n}</b></div>`; }
  return `<div class="prize prize-photo"><img src="${esc(p.src)}" alt="Your prize photo"></div>`;
}
function claimPrize(p){
  if(p.t==="coins") state.coins += p.n;
  if(p.t==="place") state.places[p.id] = true;
  if(p.t==="photo" && !state.photos.includes(p.src)) state.photos.push(p.src);
  if(p.t==="postcard"){ state.postcards = state.postcards || []; state.postcards.push({id:p.id, pet:p.pet, m:p.m, d:dayKey()}); }
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
  <p class="note">${view.done ? (p.t==="postcard" ? `${esc(p.m.name)} sent you a postcard! Tap it to read the message.` : "It's yours!") : "Scratch the silver part with your finger."}</p>
  ${view.done && p.t==="postcard" ? postcardFlip(p) : `<div class="scratch-box" id="sbox">
    ${prizeHTML(p)}
    ${view.done ? "" : `<canvas id="scv" aria-label="Scratch area"></canvas>`}
  </div>`}
  <div class="actions">${view.done ? (state.tickets>0 ? `<button type="button" class="btn amber-btn" id="next">Next card (${state.tickets})</button>` : `<button type="button" class="btn" id="fin">Done</button>`) : ""}</div>`;
  bindBack({name:"pet"});
  if(view.done){
    bindFlips();
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
  ${menu([{id:"g0", t:`Play with ${activePet()?activePet().name:"your pet"}`, s:petPool().length>=4?`${PET_SIZE} questions`:"soon"}])}
  <div class="games-gap"></div>
  ${ok ? menu([
    {id:"g1", t:"Word search", s:"find the expression"},
    {id:"g2", t:"Hangman", s:"guess the letters"},
    {id:"g3", t:"Anagrams", s:"put the letters in order"},
    {id:"g4", t:"Memory", s:"match the pairs"},
    {id:"g5", t:"60 seconds", s:state.best60?`best: ${state.best60}`:"as many as you can"}
  ]) : `<p class="note">The games open when there's more vocabulary in your classes.</p>`}
  <p class="note" style="margin-top:20px">Words from all your classes. You can win up to ${GAME_CAP} coins a day with games.</p>`;
  bindBack({name:"pet"});
  document.getElementById("g0").onclick=()=>{ if(petPool().length>=4) startPetQuiz(); };
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
function hangmanSVG(miss, lost, anim){
  const parts = [
    `<circle cx="112" cy="46" r="13"/>`,
    `<path d="M112 59 V100"/>`,
    `<path d="M112 70 L96 88"/>`,
    `<path d="M112 70 L128 88"/>`,
    `<path d="M112 100 L98 124"/>`,
    `<path d="M112 100 L126 124"/>`
  ];
  return `<div class="hm-draw" role="img" aria-label="${miss} of 6 mistakes"><svg viewBox="0 0 160 140" aria-hidden="true">
    <g class="hm-gallows"><path d="M14 134 H82 M34 134 V8 H112 V33 M34 30 L56 8"/></g>
    <g class="hm-man${lost?" lost":""}${anim?" anim":""}">${parts.slice(0,miss).join("")}</g></svg>
    <span class="hm-count">${6-miss} ${6-miss===1?"try":"tries"} left</span></div>`;
}
function hangman(){
  const v = view, word = v.e.term.toUpperCase();
  const solved = [...lettersOf(word)].every(ch=>v.guessed.includes(ch));
  if(!v.over && (solved || v.lives<=0)){ v.over = true; v.won = solved; v.res = solved ? giveGameCoins(2) : null; }
  const shown = [...word].map(ch=>/[A-Z]/.test(ch) ? `<span class="hm-l${v.guessed.includes(ch)||v.over?" on":""}${v.over&&!v.guessed.includes(ch)?" miss":""}">${v.guessed.includes(ch)||v.over?ch:"&nbsp;"}</span>` : (ch===" " ? `<span class="hm-gap"></span>` : `<span class="hm-p">${esc(ch)}</span>`)).join("");
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Games</button>${coinBadge()}</div>
  ${hangmanSVG(6-Math.max(0,v.lives), v.over && !v.won, v.anim)}
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
    const ch = b.dataset.k; v.guessed.push(ch); v.anim = !word.includes(ch); if(v.anim) v.lives--; hangman();
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


/* ── postcards: the pet travels to famous places (drawn, same look on every phone) ── */
const POSTCARDS = [
  {id:"barcelona", n:"Barcelona", c:"Spain"},
  {id:"granada", n:"Granada", c:"Spain"},
  {id:"seville", n:"Seville", c:"Spain"},
  {id:"madrid", n:"Madrid", c:"Spain"},
  {id:"tenerife", n:"Tenerife", c:"Spain"},
  {id:"paris", n:"Paris", c:"France"},
  {id:"giza", n:"Giza", c:"Egypt"},
  {id:"london", n:"London", c:"United Kingdom"},
  {id:"newyork", n:"New York", c:"USA"},
  {id:"rome", n:"Rome", c:"Italy"},
  {id:"agra", n:"Agra", c:"India"},
  {id:"wall", n:"The Great Wall", c:"China"},
  {id:"fuji", n:"Mount Fuji", c:"Japan"},
  {id:"sydney", n:"Sydney", c:"Australia"},
  {id:"pisa", n:"Pisa", c:"Italy"},
  {id:"rio", n:"Rio de Janeiro", c:"Brazil"},
  {id:"machu", n:"Machu Picchu", c:"Peru"},
  {id:"moai", n:"Easter Island", c:"Chile"},
  {id:"athens", n:"Athens", c:"Greece"},
  {id:"amsterdam", n:"Amsterdam", c:"Netherlands"},
  {id:"santorini", n:"Santorini", c:"Greece"},
  {id:"chichen", n:"Chichén Itzá", c:"Mexico"},
  {id:"salem", n:"Salem", c:"Massachusetts, USA"}
];
function postcardSVG(id){
  const P = {
  salem:`<defs><linearGradient id="pc-sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1f4a"/><stop offset="1" stop-color="#7a4f8c"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-sl)"/><circle cx="262" cy="42" r="22" fill="#fff2c4"/><circle cx="272" cy="34" r="19" fill="#33255a"/>
    <g fill="#fff" opacity=".8"><circle cx="40" cy="24" r="1.4"/><circle cx="96" cy="40" r="1.2"/><circle cx="150" cy="18" r="1.5"/><circle cx="210" cy="30" r="1.1"/><circle cx="300" cy="80" r="1.2"/></g>
    <path d="M196 60 q6 -6 12 0 q6 -6 12 0 q-6 -2 -12 4 q-6 -6 -12 -4Z M226 74 q4 -4 8 0 q4 -4 8 0 q-4 -1 -8 3 q-4 -4 -8 -3Z" fill="#1a1230"/>
    <path d="M150 166 V96 L186 66 L222 96 V166Z" fill="#251a3d"/><path d="M142 98 L186 60 L230 98 L222 98 L186 68 L150 98Z" fill="#1a1230"/>
    <rect x="200" y="58" width="10" height="22" fill="#251a3d"/>
    <g fill="#ffc94a"><rect x="164" y="108" width="12" height="14"/><rect x="196" y="108" width="12" height="14"/><path d="M180 166 V142 Q186 134 192 142 V166Z"/><circle cx="186" cy="88" r="5"/></g>
    <path d="M0 168 Q160 156 320 170 V200 H0Z" fill="#3d3354"/>
    <g fill="#8e88a3">${[[30,150],[64,156],[250,152],[290,158]].map(([x,y])=>`<path d="M${x-9} ${y+16} V${y+6} Q${x-9} ${y-4} ${x} ${y-4} Q${x+9} ${y-4} ${x+9} ${y+6} V${y+16}Z"/>`).join("")}</g>
    <g fill="#6b6582"><rect x="29" y="152" width="2" height="8"/><rect x="26" y="155" width="8" height="2"/></g>
    <g fill="#e2742c"><ellipse cx="216" cy="176" rx="10" ry="8"/><ellipse cx="234" cy="180" rx="7" ry="6"/></g><g fill="#2a1a10"><path d="M211 174 l3 -3 l3 3Z M219 174 l3 -3 l3 3Z"/><rect x="212" y="178" width="8" height="2"/></g>
    <g transform="translate(268 108)"><path d="M-8 26 L-10 58 M8 26 L10 58" stroke="#4a5a3a" stroke-width="7" stroke-linecap="round"/>
      <rect x="-12" y="0" width="24" height="30" rx="4" fill="#5b4a7a"/><path d="M-12 8 L-34 8 M12 8 L-10 14" stroke="#8fbf6a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="0" cy="-10" r="12" fill="#8fbf6a"/><circle cx="-4" cy="-12" r="2.5" fill="#fff"/><circle cx="5" cy="-11" r="1.8" fill="#fff"/><path d="M-5 -3 l3 -2 l3 2 l3 -2" stroke="#2c3a20" stroke-width="1.6" fill="none"/></g>`,
  barcelona:`<defs><linearGradient id="pc-bc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc79a"/><stop offset="1" stop-color="#fff0dc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-bc)"/><circle cx="62" cy="50" r="20" fill="#fff6d0"/>
    <g fill="#c99460">${[[168,82,11],[196,46,13],[228,30,15],[260,44,13],[290,80,11]].map(([x,t,w])=>`<path d="M${x-w} 176 L${x-w*.55} ${t+22} Q${x} ${t-8} ${x+w*.55} ${t+22} L${x+w} 176Z"/>`).join("")}</g>
    <g fill="#e9b949">${[[168,82],[196,46],[228,30],[260,44],[290,80]].map(([x,t])=>`<circle cx="${x}" cy="${t+4}" r="4"/>`).join("")}</g>
    <g fill="#8a5d34">${[[168,82],[196,46],[228,30],[260,44],[290,80]].map(([x,t])=>[0,1,2,3].map(i=>`<rect x="${x-1.5}" y="${t+36+i*24}" width="3" height="12" rx="1.5"/>`).join("")).join("")}</g>
    <path d="M150 176 V140 Q228 118 306 140 V176Z" fill="#b5804f"/><path d="M212 176 V150 Q228 138 244 150 V176Z" fill="#6d4a2a"/>
    <path d="M0 172 Q160 164 320 174 V200 H0Z" fill="#d9bd8f"/>`,
  granada:`<defs><linearGradient id="pc-gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd0f0"/><stop offset="1" stop-color="#eef7fc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-gr)"/>
    <path d="M0 112 L60 62 L110 96 L172 44 L236 100 L280 70 L320 92 V200 H0Z" fill="#a9bccf"/>
    <path d="M48 72 L60 62 L74 72 L66 70 L60 76Z M158 56 L172 44 L188 58 L178 55 L172 62Z M270 78 L280 70 L292 79 L284 77Z" fill="#fff"/>
    <path d="M0 176 Q90 120 320 136 V200 H0Z" fill="#7da35d"/>
    <rect x="80" y="120" width="210" height="30" fill="#c8714a"/>
    <g fill="#b5603c"><rect x="96" y="96" width="30" height="44"/><rect x="172" y="84" width="42" height="56"/><rect x="250" y="100" width="28" height="40"/></g>
    <g fill="#c8714a">${[96,104,112,120,172,181,190,199,208,250,258,266].map(x=>`<rect x="${x}" y="${x<150?90:x<240?78:94}" width="5" height="7"/>`).join("")}</g>
    <g fill="#7a3d22"><rect x="186" y="104" width="6" height="12" rx="3"/><rect x="196" y="104" width="6" height="12" rx="3"/><rect x="108" y="112" width="5" height="10" rx="2.5"/></g>
    <g fill="#2f5d37"><ellipse cx="60" cy="150" rx="6" ry="22"/><ellipse cx="300" cy="150" rx="6" ry="20"/><ellipse cx="44" cy="158" rx="5" ry="16"/></g>
    <path d="M0 178 Q160 168 320 180 V200 H0Z" fill="#6b9450"/>`,
  seville:`<defs><linearGradient id="pc-sv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc4ee"/><stop offset="1" stop-color="#e6f5fc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-sv)"/><circle cx="270" cy="40" r="18" fill="#ffe27a"/>
    <rect x="196" y="74" width="44" height="104" fill="#d7a066"/>
    <g fill="#b77f47">${[0,1,2,3].map(i=>`<rect x="212" y="${86+i*22}" width="12" height="14" rx="6"/>`).join("")}</g>
    <rect x="200" y="48" width="36" height="28" fill="#f0dfb8"/><g fill="#d9bb7f"><rect x="206" y="54" width="7" height="16" rx="3.5"/><rect x="223" y="54" width="7" height="16" rx="3.5"/></g>
    <rect x="206" y="32" width="24" height="18" fill="#eedcb1"/><rect x="211" y="20" width="14" height="14" fill="#e6cf9c"/>
    <path d="M218 6 V22" stroke="#9c7a3e" stroke-width="3"/><circle cx="218" cy="8" r="3" fill="#c9a04a"/>
    <path d="M0 170 Q160 164 320 172 V200 H0Z" fill="#e8d2a4"/>
    <g>${[[52,150],[110,156],[290,154]].map(([x,y])=>`<rect x="${x-2}" y="${y}" width="4" height="22" fill="#7a5238"/><circle cx="${x}" cy="${y-6}" r="18" fill="#4f8f3f"/><g fill="#f39a1e"><circle cx="${x-8}" cy="${y-8}" r="3"/><circle cx="${x+6}" cy="${y-12}" r="3"/><circle cx="${x+2}" cy="${y}" r="3"/><circle cx="${x-4}" cy="${y-18}" r="3"/></g>`).join("")}</g>`,
  madrid:`<defs><linearGradient id="pc-md" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd2f2"/><stop offset="1" stop-color="#eef8fd"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-md)"/><ellipse cx="80" cy="40" rx="30" ry="9" fill="#fff" opacity=".9"/>
    <rect x="96" y="92" width="200" height="84" fill="#e6dfcc"/><rect x="90" y="84" width="212" height="10" fill="#d4cab1"/>
    <rect x="160" y="58" width="72" height="28" fill="#ddd4bd"/><path d="M156 58 H236 L230 50 H162Z" fill="#cfc4a8"/>
    <g fill="#8fbede"><path d="M178 176 V130 Q196 108 214 130 V176Z"/><path d="M124 176 V136 Q140 118 156 136 V176Z"/><path d="M236 176 V136 Q252 118 268 136 V176Z"/><rect x="102" y="124" width="14" height="52"/><rect x="276" y="124" width="14" height="52"/></g>
    <g fill="#cfc4a8">${[120,160,172,220,232,272].map(x=>`<rect x="${x}" y="98" width="5" height="78"/>`).join("")}</g>
    <path d="M0 174 Q160 168 320 176 V200 H0Z" fill="#9cbf6e"/>
    <g fill="#5d9a48"><circle cx="40" cy="146" r="22"/><circle cx="300" cy="150" r="18"/></g>`,
  tenerife:`<defs><linearGradient id="pc-tf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#70c0ec"/><stop offset="1" stop-color="#e4f4fc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-tf)"/>
    <path d="M40 160 L170 46 L300 160Z" fill="#8a6650"/><path d="M170 46 L300 160 L232 160Z" fill="#735440"/>
    <path d="M150 64 L170 46 L192 66 L182 62 L174 70 L166 62 L158 68Z" fill="#fff"/>
    <rect y="150" width="320" height="50" fill="#2b7fb8"/><path d="M0 162 q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#8ccbec" stroke-width="2" fill="none"/>
    <path d="M150 200 Q190 170 320 176 V200Z" fill="#2e2a28"/>
    <path d="M286 182 Q280 150 292 118" stroke="#7a5a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g fill="#3f8f45"><path d="M292 118 Q270 108 254 120 Q274 114 292 120Z"/><path d="M292 118 Q314 106 320 122 Q308 114 292 120Z"/><path d="M292 118 Q284 96 268 92 Q286 100 291 120Z"/><path d="M292 118 Q304 96 318 96 Q302 104 293 120Z"/></g>`,
  rio:`<defs><linearGradient id="pc-ri" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffae86"/><stop offset="1" stop-color="#ffe6cf"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-ri)"/>
    <path d="M140 172 Q190 92 236 70 Q262 80 320 168Z" fill="#4c7a4c"/>
    <g fill="#f4f1ea"><rect x="233" y="34" width="7" height="36" rx="2"/><rect x="216" y="40" width="41" height="5" rx="2.5"/><circle cx="236.5" cy="30" r="5"/><path d="M231 50 L242 50 L244 70 L229 70Z"/></g>
    <rect y="160" width="320" height="40" fill="#3a83b8"/>
    <path d="M10 166 Q18 108 48 104 Q74 108 84 166Z" fill="#5b7e58"/>
    <path d="M0 188 Q120 176 200 190 Q260 200 320 186 V200 H0Z" fill="#f2d9a2"/>`,
  machu:`<defs><linearGradient id="pc-mp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe2f2"/><stop offset="1" stop-color="#f3fafc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-mp)"/>
    <path d="M180 150 Q210 30 244 36 Q270 52 300 150Z" fill="#3f7c49"/><path d="M0 140 Q60 96 120 130 Z" fill="#6c9a72"/>
    <ellipse cx="90" cy="70" rx="40" ry="10" fill="#fff" opacity=".85"/><ellipse cx="260" cy="96" rx="36" ry="8" fill="#fff" opacity=".8"/>
    <g fill="#86b86d" stroke="#5f8f4f" stroke-width="2">${[0,1,2,3].map(i=>`<path d="M${0+i*10} ${150+i*12} H${320-i*6} V${162+i*12} H${0+i*10}Z"/>`).join("")}</g>
    <g fill="#a9a398">${[[60,132,26,16],[96,128,30,20],[136,134,22,14],[250,136,28,14]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"/><path d="M${x-2} ${y} L${x+w/2} ${y-10} L${x+w+2} ${y}Z" fill="#8c8578"/>`).join("")}</g>
    <g fill="#5f594f"><rect x="106" y="136" width="6" height="12"/><rect x="70" y="138" width="5" height="10"/></g>`,
  moai:`<defs><linearGradient id="pc-mo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf8e"/><stop offset="1" stop-color="#fff1dc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-mo)"/><circle cx="250" cy="120" r="26" fill="#ffe7a8"/>
    <rect y="128" width="320" height="30" fill="#3d86bd"/>
    <path d="M0 150 Q160 138 320 152 V200 H0Z" fill="#7aa85c"/>
    <rect x="40" y="168" width="250" height="12" fill="#8a7f72"/>
    ${[[80,1],[140,0],[200,1],[256,0]].map(([x,hat])=>`<path d="M${x-15} 170 L${x-15} 106 Q${x-15} 86 ${x} 86 Q${x+15} 86 ${x+15} 106 L${x+15} 170Z" fill="#6f625a"/>
      <rect x="${x-14}" y="104" width="28" height="6" fill="#574c45"/><path d="M${x} 108 L${x+5} 128 L${x-5} 128Z" fill="#5b5049"/><rect x="${x-8}" y="136" width="16" height="3" fill="#574c45"/>
      ${hat?`<ellipse cx="${x}" cy="86" rx="13" ry="7" fill="#a5523a"/>`:""}`).join("")}`,
  athens:`<defs><linearGradient id="pc-at" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ccff2"/><stop offset="1" stop-color="#eef8fd"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-at)"/><circle cx="56" cy="44" r="18" fill="#ffe27a"/>
    <path d="M0 178 Q70 122 160 128 Q250 122 320 164 V200 H0Z" fill="#b59a6b"/>
    <rect x="104" y="124" width="192" height="6" fill="#e6ddc6"/><rect x="98" y="130" width="204" height="6" fill="#ddd3b9"/>
    <g fill="#f0e9d6">${Array.from({length:9},(_,i)=>`<rect x="${112+i*21}" y="92" width="9" height="32"/>`).join("")}</g>
    <rect x="106" y="82" width="188" height="11" fill="#e6ddc6"/><path d="M104 82 L200 62 L296 82Z" fill="#ece4cf"/>
    <g fill="#6e8f4a"><circle cx="40" cy="160" r="14"/><circle cx="300" cy="166" r="12"/></g>`,
  amsterdam:`<defs><linearGradient id="pc-am" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6d3ea"/><stop offset="1" stop-color="#eef4f9"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-am)"/><ellipse cx="240" cy="36" rx="34" ry="10" fill="#fff" opacity=".9"/>
    ${[["#8b3a2e",70],["#3d5a6e",54],["#c9a46a",64],["#6b4a3a",48],["#2f5a4c",60],["#a8432f",56],["#4e6a80",66]].map(([c,t],i)=>{ const x = 6+i*44;
      return `<path d="M${x} 158 V${t+14} H${x+6} V${t+6} H${x+12} V${t} H${x+28} V${t+6} H${x+34} V${t+14} H${x+40} V158Z" fill="${c}"/>
      <g fill="#f4efe3">${[0,1,2].map(r=>`<rect x="${x+8}" y="${t+24+r*22}" width="8" height="12"/><rect x="${x+24}" y="${t+24+r*22}" width="8" height="12"/>`).join("")}</g>
      <rect x="${x+16}" y="${t+3}" width="8" height="8" fill="#f4efe3"/>`; }).join("")}
    <rect y="158" width="320" height="42" fill="#4a7ea3"/><g stroke="#8db4cf" stroke-width="2">${[20,80,150,220,280].map(x=>`<path d="M${x} 170 H${x+26} M${x+10} 184 H${x+40}"/>`).join("")}</g>
    <path d="M190 166 H250 L242 176 H198Z" fill="#7a4b2a"/>`,
  santorini:`<defs><linearGradient id="pc-sa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb88f"/><stop offset="1" stop-color="#ffe9d4"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-sa)"/><circle cx="70" cy="96" r="22" fill="#ffd56b"/>
    <rect y="110" width="320" height="90" fill="#2a76b6"/><path d="M0 124 q20 -4 40 0 t40 0 t40 0 t40 0" stroke="#7fb6e0" stroke-width="2" fill="none"/>
    <path d="M130 200 L150 120 Q200 80 320 76 V200Z" fill="#9b6b52"/>
    <g fill="#fdfdfb">${[[160,112,30,22],[196,100,26,24],[226,92,34,22],[268,86,30,24],[176,136,32,22],[214,124,30,24],[250,116,34,24],[290,112,30,26],[200,150,30,22],[240,144,34,22],[282,140,38,24]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join("")}</g>
    <g fill="#1f5fbf"><path d="M196 100 Q209 82 222 100Z"/><path d="M250 116 Q267 96 284 116Z"/><path d="M240 144 Q257 126 274 144Z"/></g>
    <g fill="#3a6fb0">${[[166,118],[204,106],[234,98],[276,92],[184,142],[222,130],[296,118],[208,156],[290,146]].map(([x,y])=>`<rect x="${x}" y="${y}" width="6" height="9" rx="3"/>`).join("")}</g>`,
  chichen:`<defs><linearGradient id="pc-ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd0f2"/><stop offset="1" stop-color="#eaf7fd"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-ch)"/><ellipse cx="70" cy="40" rx="30" ry="9" fill="#fff" opacity=".9"/>
    <path d="M0 150 Q40 128 80 146 Q120 126 160 148 Q210 124 250 146 Q290 128 320 144 V200 H0Z" fill="#4f8f45"/>
    <g fill="#c2a97c">${Array.from({length:8},(_,i)=>{ const w = 220-i*20, y = 170-i*11; return `<rect x="${160-w/2}" y="${y-11}" width="${w}" height="11"/>`; }).join("")}</g>
    <g fill="#a88f63">${Array.from({length:8},(_,i)=>{ const w = 220-i*20, y = 170-i*11; return `<rect x="${160+w/2-w*.18}" y="${y-11}" width="${w*.18}" height="11"/>`; }).join("")}</g>
    <path d="M148 170 L152 82 H168 L172 170Z" fill="#9c8358"/><g stroke="#c2a97c" stroke-width="1.5">${Array.from({length:12},(_,i)=>`<path d="M${149+i*.3} ${166-i*7} H${171-i*.3}"/>`).join("")}</g>
    <rect x="138" y="62" width="44" height="22" fill="#b89d70"/><rect x="152" y="70" width="16" height="14" fill="#6e5a3a"/><rect x="134" y="58" width="52" height="6" fill="#a88f63"/>`,
  paris:`<defs><linearGradient id="pc-p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb38a"/><stop offset="1" stop-color="#ffe6cc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-p)"/><circle cx="110" cy="70" r="24" fill="#fff3c4" opacity=".9"/>
    <path d="M0 172 Q160 160 320 172 V200 H0Z" fill="#8cc07a"/>
    <g fill="#5b4636"><path d="M232 26 L236 26 L238 62 L246 104 L256 142 L276 182 L260 182 Q234 150 210 182 L194 182 L214 142 L224 104 L230 62Z"/>
    <rect x="219" y="100" width="30" height="6" rx="2"/><rect x="208" y="138" width="52" height="7" rx="2"/><rect x="233" y="14" width="2" height="14"/></g>
    <g stroke="#ffe6cc" stroke-width="1.2" opacity=".55"><path d="M227 70 L241 92 M241 70 L227 92 M222 110 L246 134 M246 110 L222 134"/></g>`,
  giza:`<defs><linearGradient id="pc-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c85f"/><stop offset="1" stop-color="#fdf0c8"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-g)"/><circle cx="90" cy="54" r="22" fill="#fff6d6"/>
    <path d="M150 172 L214 84 L280 172Z" fill="#e2b468"/><path d="M214 84 L280 172 L236 172Z" fill="#c8954a"/>
    <path d="M250 172 L290 118 L330 172Z" fill="#dcaa5e"/><path d="M290 118 L330 172 L304 172Z" fill="#c08a44"/>
    <path d="M118 172 L146 134 L176 172Z" fill="#e6bb72"/><path d="M146 134 L176 172 L158 172Z" fill="#cc9a50"/>
    <path d="M0 168 Q160 158 320 170 V200 H0Z" fill="#e9c98a"/>`,
  london:`<defs><linearGradient id="pc-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c6e3"/><stop offset="1" stop-color="#e4edf6"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-l)"/><ellipse cx="80" cy="44" rx="34" ry="10" fill="#fff" opacity=".85"/>
    <rect x="150" y="118" width="80" height="60" fill="#c9a66b"/><g fill="#a8854d"><rect x="158" y="128" width="6" height="16"/><rect x="172" y="128" width="6" height="16"/><rect x="186" y="128" width="6" height="16"/><rect x="200" y="128" width="6" height="16"/><rect x="214" y="128" width="6" height="16"/></g>
    <rect x="228" y="60" width="34" height="118" fill="#d4b06f"/><rect x="226" y="66" width="38" height="44" fill="#c9a160"/>
    <circle cx="245" cy="88" r="14" fill="#fffbe9" stroke="#7a5a2a" stroke-width="2"/><path d="M245 88 L245 79 M245 88 L252 92" stroke="#3b2a12" stroke-width="2" stroke-linecap="round"/>
    <path d="M226 60 L245 22 L264 60Z" fill="#5d6b74"/><rect x="243" y="12" width="4" height="12" fill="#5d6b74"/>
    <g fill="#b89150"><rect x="234" y="118" width="5" height="14"/><rect x="251" y="118" width="5" height="14"/><rect x="234" y="142" width="5" height="14"/><rect x="251" y="142" width="5" height="14"/></g>
    <rect y="176" width="320" height="24" fill="#5f7d95"/><path d="M0 184 q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#9fb9cc" stroke-width="2" fill="none"/>`,
  newyork:`<defs><linearGradient id="pc-n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc3ea"/><stop offset="1" stop-color="#d8eefa"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-n)"/>
    <g fill="#9fb4c6"><rect x="10" y="120" width="18" height="50"/><rect x="32" y="104" width="14" height="66"/><rect x="50" y="126" width="20" height="44"/><rect x="74" y="96" width="12" height="74"/><rect x="78" y="86" width="4" height="12"/></g>
    <rect y="160" width="320" height="40" fill="#3b86b8"/>
    <path d="M206 170 L214 132 L262 132 L270 170Z" fill="#a98f6d"/><rect x="218" y="122" width="40" height="12" fill="#bba37f"/>
    <path d="M224 122 L230 70 Q238 60 246 70 L252 122Z" fill="#6fb39c"/>
    <circle cx="238" cy="62" r="9" fill="#78bda6"/>
    <g stroke="#6fb39c" stroke-width="3" stroke-linecap="round"><path d="M238 52 L238 44 M232 54 L227 47 M244 54 L249 47 M229 58 L222 55 M247 58 L254 55"/></g>
    <path d="M246 80 L262 40" stroke="#6fb39c" stroke-width="7" stroke-linecap="round"/>
    <path d="M258 40 L266 40 L264 34 Q262 26 262 22 Q258 28 258 34Z" fill="#f7b733"/><path d="M261 37 Q259 31 262 26 Q264 32 263 37Z" fill="#fff1a8"/>
    <rect x="224" y="86" width="8" height="18" rx="3" fill="#5ea58c" transform="rotate(-18 228 95)"/>`,
  rome:`<defs><linearGradient id="pc-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ed0f0"/><stop offset="1" stop-color="#e5f5fc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-r)"/><circle cx="70" cy="46" r="18" fill="#ffd65c"/>
    <path d="M140 172 L140 86 Q226 66 312 86 L312 108 L290 108 L290 128 L312 128 L312 172Z" fill="#dca86b"/>
    <path d="M140 86 Q226 66 312 86 L312 92 Q226 74 140 92Z" fill="#c8925a"/>
    <g fill="#9a6a3c">${Array.from({length:8},(_,i)=>`<rect x="${150+i*20}" y="98" width="10" height="16" rx="5"/>`).join("")}
    ${Array.from({length:8},(_,i)=>`<rect x="${150+i*20}" y="122" width="10" height="18" rx="5"/>`).join("")}
    ${Array.from({length:8},(_,i)=>`<rect x="${150+i*20}" y="148" width="10" height="20" rx="5"/>`).join("")}</g>
    <path d="M0 170 Q160 162 320 172 V200 H0Z" fill="#c9b48e"/>`,
  agra:`<defs><linearGradient id="pc-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7b3e6"/><stop offset="1" stop-color="#f6e7f0"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-a)"/>
    <g fill="#fbf8f3"><rect x="150" y="104" width="132" height="54"/><path d="M178 104 Q216 34 254 104Z"/><rect x="214" y="44" width="4" height="12"/>
    <path d="M160 104 Q170 88 180 104Z"/><path d="M252 104 Q262 88 272 104Z"/>
    <rect x="140" y="80" width="6" height="78"/><rect x="286" y="80" width="6" height="78"/><circle cx="143" cy="80" r="5"/><circle cx="289" cy="80" r="5"/></g>
    <g fill="#e4dbcf"><rect x="202" y="118" width="28" height="40" rx="14"/><rect x="164" y="124" width="16" height="24" rx="8"/><rect x="252" y="124" width="16" height="24" rx="8"/></g>
    <rect y="158" width="320" height="42" fill="#9cc58a"/><rect x="196" y="160" width="40" height="40" fill="#8cc4e6"/>
    <path d="M206 166 Q216 180 226 166" stroke="#fbf8f3" stroke-width="2" fill="none" opacity=".7"/>`,
  wall:`<defs><linearGradient id="pc-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8dff0"/><stop offset="1" stop-color="#eef8fb"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-w)"/>
    <path d="M0 130 L60 70 L120 120 L190 50 L260 118 L320 80 V200 H0Z" fill="#7fae74"/><path d="M0 160 L80 110 L150 150 L230 96 L320 140 V200 H0Z" fill="#5f9658"/>
    <path d="M0 168 L70 128 L120 150 L190 104 L250 132 L320 100" stroke="#c4a67c" stroke-width="12" fill="none" stroke-linejoin="round"/>
    <path d="M0 162 L70 122 L120 144 L190 98 L250 126 L320 94" stroke="#9c8058" stroke-width="3" stroke-dasharray="5 4" fill="none"/>
    <g fill="#b39467"><rect x="62" y="108" width="18" height="22"/><rect x="182" y="82" width="18" height="24"/><rect x="242" y="112" width="16" height="22"/></g>
    <g fill="#8a6f48"><rect x="68" y="116" width="6" height="8"/><rect x="188" y="90" width="6" height="8"/><rect x="247" y="120" width="6" height="7"/></g>`,
  fuji:`<defs><linearGradient id="pc-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd0f0"/><stop offset="1" stop-color="#eaf6fc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-f)"/><circle cx="66" cy="44" r="18" fill="#ff7a59"/>
    <path d="M110 170 L210 50 L310 170Z" fill="#6f8fb4"/><path d="M210 50 L180 86 L194 80 L204 90 L216 80 L228 88 L240 86Z" fill="#fff"/>
    <rect y="160" width="320" height="40" fill="#8cc27a"/>
    <g fill="#d6453d"><rect x="260" y="112" width="6" height="56"/><rect x="292" y="112" width="6" height="56"/><rect x="250" y="104" width="58" height="7" rx="2"/><rect x="256" y="120" width="46" height="5"/></g>
    <g fill="#ffb3c7"><circle cx="30" cy="118" r="10"/><circle cx="46" cy="108" r="12"/><circle cx="20" cy="104" r="9"/><circle cx="40" cy="126" r="9"/></g><rect x="33" y="124" width="4" height="40" fill="#7a5238"/>`,
  sydney:`<defs><linearGradient id="pc-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb8e8"/><stop offset="1" stop-color="#d6eef9"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-s)"/>
    <path d="M0 120 Q70 60 140 120" stroke="#6b7a86" stroke-width="6" fill="none"/><path d="M0 120 H140" stroke="#6b7a86" stroke-width="4"/>
    <g stroke="#6b7a86" stroke-width="2"><path d="M30 98 V120 M50 86 V120 M70 82 V120 M90 86 V120 M110 98 V120"/></g>
    <rect y="146" width="320" height="54" fill="#2f7fb5"/>
    <rect x="150" y="136" width="160" height="14" fill="#e8d9bf"/>
    <g fill="#fdfcf8" stroke="#d8d2c4" stroke-width="1.5"><path d="M160 138 Q170 92 214 78 Q196 104 200 138Z"/><path d="M196 138 Q206 90 250 74 Q232 104 236 138Z"/><path d="M232 138 Q244 96 286 88 Q270 110 274 138Z"/><path d="M270 138 Q280 112 306 108 Q296 122 300 138Z"/></g>
    <path d="M0 160 q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#8cc7e8" stroke-width="2" fill="none"/>`,
  pisa:`<defs><linearGradient id="pc-i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93cdee"/><stop offset="1" stop-color="#e9f6fc"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#pc-i)"/><ellipse cx="80" cy="50" rx="30" ry="9" fill="#fff" opacity=".9"/>
    <path d="M0 166 Q160 156 320 166 V200 H0Z" fill="#8cc07a"/>
    <g transform="rotate(8 236 168)">
      <rect x="212" y="40" width="48" height="128" fill="#f3ede1"/><rect x="216" y="28" width="40" height="14" fill="#ece4d4"/>
      <g fill="#cfc4ae">${Array.from({length:6},(_,r)=>Array.from({length:4},(_,c)=>`<rect x="${217+c*11}" y="${48+r*20}" width="6" height="12" rx="3"/>`).join("")).join("")}</g>
      <g stroke="#ddd3bf" stroke-width="2">${Array.from({length:6},(_,r)=>`<path d="M212 ${64+r*20} H260"/>`).join("")}</g>
    </g>`
  };
  return `<svg class="scene-svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${P[id]||""}</svg>`;
}
const PC_FLAG = {paris:"🇫🇷", giza:"🇪🇬", london:"🇬🇧", newyork:"🇺🇸", rome:"🇮🇹", agra:"🇮🇳", wall:"🇨🇳", fuji:"🇯🇵", sydney:"🇦🇺", pisa:"🇮🇹",
  barcelona:"🇪🇸", granada:"🇪🇸", seville:"🇪🇸", madrid:"🇪🇸", tenerife:"🇪🇸", rio:"🇧🇷", machu:"🇵🇪", moai:"🇨🇱", athens:"🇬🇷", amsterdam:"🇳🇱", santorini:"🇬🇷", chichen:"🇲🇽", salem:"🇺🇸"};
function postcardFront(id, emoji, small){
  const x = POSTCARDS.find(p=>p.id===id);
  return `<div class="scene${small?" small":""}">${postcardSVG(id)}${emoji?`<span class="scene-pet pc-pet" aria-hidden="true">${emoji}</span>`:""}
    <span class="pc-hello">Hello from ${esc(x.n)}!</span></div>`;
}
/* a postcard that turns over when tapped: picture on the front, the pet's message on the back */
const cpHTML = t => esc(t).replace(/\[\[(.+?)\]\]/g, '<span class="pc-cp">$1</span>');
function postcardFlip(card){
  const pet = petById(card.pet), m = card.m, x = POSTCARDS.find(p=>p.id===card.id);
  return `<div class="pc-flip" role="button" tabindex="0" aria-label="Turn the postcard over"><div class="pc-in">
    <div class="pc-face pc-front">${postcardFront(card.id, pet?pet.e:"")}<span class="pc-tap">Tap to turn over ↻</span></div>
    <div class="pc-face pc-back">
      <div class="pc-stamp" aria-hidden="true"><span>${PC_FLAG[card.id]||"✉️"}</span><i>${esc(x.c)}</i></div>
      <div class="pc-msg"><p class="pc-g">${cpHTML(m.g)}</p><p>${cpHTML(m.body)}</p><p>${cpHTML(m.c)}</p>
      <p class="pc-sign">${esc(m.s)}<br><b>${esc(m.name)}</b> ${pet?pet.e:""}</p></div>
    </div></div></div>`;
}
function bindFlips(){
  $app.querySelectorAll(".pc-flip").forEach(f=>{
    const t = () => f.classList.toggle("on");
    f.onclick = t; f.onkeydown = e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); t(); } };
  });
}
function postcards(){
  const have = state.postcards || [], seen = new Set(have.map(c=>c.id));
  $app.innerHTML = `${header()}
  <div class="unit-head"><span class="label">${seen.size} / ${POSTCARDS.length} places</span><h2>My postcards</h2></div>
  <p class="note">Your pets travel the world and write to you. Win postcards with scratch cards.</p>
  <div class="pc-grid">${have.map((c,i)=>({c,i})).reverse().map(({c,i})=>{ const pet = petById(c.pet);
      return `<button type="button" class="pc-item" data-i="${i}">${postcardFront(c.id, pet?pet.e:"", true)}<span class="pc-cap">From ${esc(c.m.name)}</span></button>`; }).join("")}
    ${POSTCARDS.filter(p=>!seen.has(p.id)).map(()=>`<div class="pc-item locked"><div class="scene small"><span class="pc-q">?</span></div><span class="pc-cap">Not yet</span></div>`).join("")}</div>`;
  bindBack({name:"pet"});
  $app.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>go({name:"postcardView", i:+b.dataset.i}));
}
function postcardView(){
  const c = (state.postcards||[])[view.i]; if(!c){ go({name:"postcards"}); return; }
  $app.innerHTML = `${header()}${postcardFlip(c)}`;
  bindBack({name:"postcards"}); bindFlips();
}

/* ── postcard messages: every pet has its own voice and catchphrase (Animal Crossing style) ── */
const PET_VOICE = {
  cat:["grumpy","meh-ow"], dog:["sporty","woof woof"], rabbit:["sweet","hop hop"], hamster:["foodie","nom nom"],
  turtle:["chill","dude"], chick:["peppy","cheep cheep"], fox:["fancy","foxy"], panda:["lazy","bamboo"],
  owl:["smart","hoot hoot"], koala:["lazy","gumleaf"], otter:["chill","splish"], sloth:["lazy","sloooow"],
  tiger:["sporty","rawr"], octopus:["pirate","arrr"], penguin:["peppy","waddle waddle"], flamingo:["drama","pink-tastic"],
  hedgehog:["shy","prickle"], dolphin:["chill","squeak"], dragon:["mighty","flame on"], unicorn:["peppy","sparkle"],
  trex:["mighty","STOMP"], whale:["mighty","big splash"], frog:["chill","ribbit"], pig:["foodie","oink"],
  mouse:["shy","squeaky"], duck:["peppy","quack"], snail:["shy","um"], bee:["peppy","buzz buzz"],
  raccoon:["foodie","scram"], kangaroo:["sporty","boing"], llama:["drama","llama-zing"], wolf:["grumpy","awoo"],
  parrot:["pirate","squawk"], zebra:["sporty","stripes"], shark:["pirate","chomp"], lion:["mighty","ROAR"],
  crocodile:["grumpy","snap snap"], eagle:["sporty","soar"], peacock:["drama","fabulous"], giraffe:["fancy","lofty"],
  dino:["mighty","dino-mite"], sdragon:["mighty","puff puff"], alien:["mystic","zorp"], robot:["smart","beep boop"],
  ghost:["mystic","boo"], wizard:["mystic","abracadabra"], vampire:["drama","mwahaha"], genie:["mystic","poof"]
};
const VOICES = {
  shy:{
    g:["Um... hi.","H-hello...","Oh! Hi there...","Hi... it's me.","Psst. Hello.","Hello (waves quietly)."],
    o:["I'm in {p}... I hope that's OK, {cp}.","I was a bit scared, but I came to {p}!","Um, greetings from {p}, {c}.","I'm hiding behind a tree in {p}, {cp}.","There are lots of people in {p}. I'm very small.","I finally got brave and went to {p}!","I'm writing this very quietly from {p}.","So... {p}. I'm here. Wow, {cp}."],
    r:["I hid at first, then I peeked. It was beautiful.","Someone said hello and I blushed, {cp}.","I was nervous, but it was worth it.","I said 'hi' to a stranger. Big step for me!","I watched quietly from a corner.","I felt very brave, {cp}.","I made one tiny friend. That's enough.","I was excited, but in a quiet way."],
    c:["You're braver than you think.","It's OK to make mistakes. I make lots, {cp}.","Thank you for practising. It helps me travel.","Maybe... study a little today?","I'll be back soon... if that's OK.","You did great. I'm a bit shy to say it.","Don't be scared of grammar, {cp}.","Small steps are still steps."],
    s:["Shyly yours,","Um, love,","Quietly,","Your shy friend,","Bye bye (waves),","Softly,"]},
  foodie:{
    g:["Yum, hello!","Hi, hungry friend!","Hello from the dinner table!","Bon appétit!","Hi! I'm eating.","Mmm, hello!"],
    o:["I'm in {p} and I've already had two lunches, {cp}.","I came to {p} to taste everything!","Greetings from {p}, {c}! The food is amazing.","You worked hard, so I'm eating my way across {p}.","{p} smells delicious, {cp}.","I followed a nice smell and ended up in {p}.","Hello from {p}! My bag is full of snacks.","I'm in {p}, and my tummy is very happy, {cp}."],
    r:["Then I had dessert. Twice.","I asked for the recipe, {cp}.","I gave it ten out of ten spoons.","My tummy says thank you!","I took more photos of food than of buildings.","I licked the plate. Don't tell anyone, {cp}.","I tried something new and loved it!","Then I needed a little snack."],
    c:["Eat well and study well!","Words are like snacks: try a new one every day, {cp}.","I'll bring you something tasty.","Brain food: ten right answers a day!","Keep practising. I'll keep eating.","Save room for dessert, {cp}!","Learning is delicious. Well, almost.","See you at snack time!"],
    s:["Yummy hugs,","Full and happy,","Your hungry friend,","Bon appétit,","Crumbs and love,","Burp, sorry. Love,"]},
  pirate:{
    g:["Ahoy, matey!","Ahoy there!","Avast, friend!","Yo ho ho!","Ahoy, captain!","Hello, me hearty!"],
    o:["I sailed all the way to {p}, {cp}!","Land ho! I've reached {p}!","Greetings from {p}, {c}! The treasure hunt begins.","Your hard work filled my sails. Now I'm in {p}!","I dropped anchor in {p}, {cp}.","{p} is the finest port in the world!","Ahoy from {p}! I'm looking for treasure.","Me ship brought me to {p}, {cp}!"],
    r:["I didn't find gold, but I found fun!","I marked it on my map with a big X, {cp}.","Best adventure on the seven seas!","I lost my hat in the wind. Again.","I danced a pirate jig, {cp}!","Shiver me timbers, it was grand!","The real treasure was the friends I made.","I shouted 'Arrr!' and everyone laughed."],
    c:["Keep studying, matey! Words are treasure.","Don't walk the plank: do your homework, {cp}!","Every right answer is a gold coin!","Hoist the sails and practise today!","I'll bring back treasure for you.","Keep your English shipshape!","Fair winds and good grammar, {cp}!","See you on the next tide!"],
    s:["Yo ho ho,","Your pirate pal,","Arrr,","Captain","Fair winds,","Ahoy for now,"]},
  drama:{
    g:["Darling, darling, DARLING!","Oh, my goodness!","Stop everything!","You will NOT believe this!","Hello, my audience!","Gasp! Hello!"],
    o:["I'm in {p} and I'm SO emotional, {cp}!","{p}! The most beautiful place in the whole universe!","After a long, LONG journey, I'm in {p}, {c}.","I've arrived in {p}. Cue the music, {cp}!","{p} has changed my life. Again.","Picture this: me, in {p}, in the sunshine.","I'm in {p} and nothing will ever be the same, {cp}!","I cried when I saw {p}. Happy tears!"],
    r:["It was the BEST moment of my life. So far.","I gave a little speech. Nobody asked, {cp}.","I fainted. Well, almost.","Everyone clapped. Probably for someone else.","I sang a song about it, {cp}.","I will never, ever forget it!","Then I struck a pose for the cameras.","Too much beauty! I need to sit down."],
    c:["You are the star of your own show!","Practise your lines... I mean, your English, {cp}!","The show must go on: study today!","I'll tell you EVERYTHING when I'm back.","You're fabulous. Never forget it, {cp}.","Curtain down. See you soon!","Take a bow, you're doing brilliantly!","Ten right answers? Standing ovation!"],
    s:["Dramatically yours,","Forever and ever,","Your star,","Bravo,","With all my heart,","The end. Love,"]},
  chill:{
    g:["Hey, dude!","Yo, what's up?","Hey hey, buddy.","Aloha!","Sup, friend?","Hey there, legend."],
    o:["I'm chilling in {p}, {cp}.","Just floated into {p}. No rush.","Good vibes from {p}, {c}!","You did the work, so I'm relaxing in {p}. Thanks, {cp}.","{p} is super chill, dude.","Rolled into {p} today. Totally awesome.","Greetings from {p}. Life is good, {cp}.","Took the slow road to {p}. Worth it."],
    r:["Total good vibes, {cp}.","I just went with the flow.","No stress, just sunshine.","That was rad, dude.","I sat back and enjoyed the view.","Everything was smooth, {cp}.","Ten out of ten vibes.","I made friends with everyone. Easy."],
    c:["Stay cool and keep practising.","No stress, just a bit of English every day, {cp}.","Ride the wave, dude!","You've got this. Totally.","Keep calm and learn phrasal verbs.","Catch you later, {cp}!","Mistakes are cool. They help you learn.","Hang loose and do your homework!"],
    s:["Peace out,","Stay chill,","Good vibes,","Later, dude,","Aloha,","Chillin',"]},
  peppy:{
    g:["Hiiii!","Hey hey hey!","Guess what?!","Hello, best friend!","OMG, hi!","Yoo-hoo!"],
    o:["I'm in {p} and it's AMAZING, {cp}!","Surprise! I packed my bag and flew to {p}!","You studied so hard that I got a holiday in {p}! Thank you, {cp}!","Hello from {p}! I can't stop jumping!","I'm writing this from {p}, {c}! Can you believe it?","Big news: I'm on holiday in {p}, {cp}!","{p} is even better than in the photos!","I made it to {p}! Woo-hoo!"],
    r:["It was the best day EVER!","I screamed with joy, {cp}!","I took about a million photos!","Everyone here smiled at me!","I did a little dance right there!","My heart is so full, {cp}!","I want to come back every year!","I told everyone about you!"],
    c:["Keep it up, you're a star!","Study lots so we can travel again!","I miss you already, {cp}!","See you super soon!","Ten more right answers and I'll pack my bag again!","You're the best friend in the world!","Don't forget to practise today!","Big hugs from far away!"],
    s:["Love,","Hugs and kisses,","Your happy friend,","XOXO,","Lots of love,","Your biggest fan,"]},
  lazy:{
    g:["Heyyy...","Oh, hi.","Hello there, friend.","Mmm, hi.","Hey, buddy.","Yawn... hi!"],
    o:["So... I'm in {p}. It took ages to get here, {cp}.","I woke up and, guess what, I was in {p}.","Hi from {p}, {c}. Nice place for a nap.","I'm on holiday in {p}. Very relaxing, {cp}.","You worked hard, so I'm resting in {p} for both of us.","Greetings from {p}. I'm lying down as I write this.","{p} is great. Well, the food is great.","I came to {p} mainly for the snacks, {cp}."],
    r:["Then I had a long nap.","After that, I needed a snack. Or three.","It made me sleepy, {cp}.","I watched it all from a comfy chair.","I almost fell asleep, but it was cool.","Best. Nap. Ever.","I didn't run once. Proud of me?","I'll tell you more after my siesta, {cp}."],
    c:["Take a break too, OK? After your homework.","Don't study too hard... but study a bit.","Save me a cushion for when I'm back.","See you whenever I wake up.","Bring snacks next time, {cp}.","Keep going, slowly but surely.","I'm proud of you. Now, nap time.","Ten right answers a day keeps me travelling."],
    s:["Sleepy hugs,","Yawn,","Chilled out,","Your relaxed friend,","Zzz,","Cosy love,"]},
  grumpy:{
    g:["Hmph. Hello.","Well, here's your postcard.","Fine. Hi.","Listen up.","Hello, I suppose.","Ugh, hi."],
    o:["I'm in {p}. Don't get excited, {cp}.","You made me go to {p}. Happy now?","So I'm in {p}, {c}. It's... OK.","Someone sent me to {p}. Apparently that was you.","I didn't want to go to {p}. I'm a bit glad I did.","Greetings from {p}. Too many tourists, {cp}.","{p}. Hot. Busy. Fine, it's nice.","I'm writing from {p} because you made me. Kind of."],
    r:["OK, I'll admit it. It was pretty great.","Fine, I smiled once. Only once, {cp}.","Not bad. Not bad at all.","I pretended to be bored. I wasn't.","Somebody stepped on my tail. Twice.","The queue was terrible, {cp}.","Don't tell anyone, but I loved it.","I've seen better. Actually, no, I haven't."],
    c:["Keep studying. Don't make me come back early.","Your English is getting better. I noticed.","Don't forget your homework, {cp}.","I'll be back. Have my bed ready.","Fine, I miss you. A tiny bit.","Good job this week. There, I said it.","No mistakes tomorrow, OK?","Next time, send me somewhere quiet."],
    s:["Grumpily yours,","Whatever,","Regards,","From your favourite grump,","Yours (sigh),","Bye,"]},
  sporty:{
    g:["Yo, champ!","Hey, team!","What's up, coach?","Ready? Go!","Hey, superstar!","High five!"],
    o:["I ran all the way to {p}, {cp}!","Day one in {p}: already did 100 push-ups!","Greetings from {p}, {c}! Perfect for training!","I'm in {p} and I've already explored half the city!","You scored, so I got a trip to {p}, {cp}!","Made it to {p}! Personal best!","{p} is the perfect place for a morning jog!","Training camp in {p}? Yes, please, {cp}!"],
    r:["I got to the top first, of course!","My legs are tired, but my heart is happy!","I raced a local and won, {cp}!","I stretched, I ran, I conquered!","Ten out of ten, would run here again!","Then I did it all again, just for fun!","I warmed up, then I went for it!","Pure energy, {cp}!"],
    c:["Your turn: ten right answers, go!","Keep training your English every day!","No pain, no gain, champ!","Stay strong and keep practising!","Let's beat your record next week!","Practice makes perfect, {cp}!","I believe in you, team!","Warm up your brain and go for it!"],
    s:["Go team,","Your coach,","Sporty hugs,","Your training buddy,","Keep moving,","Champion regards,"]},
  fancy:{
    g:["Darling!","Bonjour, my dear!","Hello, gorgeous!","Dearest friend,","Ah, there you are!","Greetings, darling!"],
    o:["I'm in {p}, darling. Naturally, {cp}.","{p} was simply waiting for someone like me.","Greetings from fabulous {p}, {c}!","I've arrived in {p}. Everyone is staring. I understand, {cp}.","You did so well that I'm in {p}, looking stunning.","A little trip to {p}. One must travel in style.","{p} is almost as elegant as me, {cp}.","Writing from a very chic café in {p}."],
    r:["I posed for photos all afternoon.","Absolutely divine, {cp}.","I wore my best outfit, of course.","People asked for my autograph. Twice.","So glamorous, I almost fainted.","I had tea with a view. Very sophisticated.","Simply magnificent, darling.","I looked fabulous in every photo, {cp}."],
    c:["Do keep studying, darling. It suits you.","Your English is getting so elegant!","Practise a little every day, like a star.","I'll bring you a souvenir. Something shiny.","Stay fabulous, {cp}!","Remember: grammar is the new black.","Kisses on both cheeks!","Until next time, my dear."],
    s:["With style,","Kisses,","Fabulously yours,","Ciao,","Elegantly,","Mwah,"]},
  sweet:{
    g:["Hi, sweetie!","Hello, dear friend!","Hi there!","Hello, you!","Dear friend,","Hi hi!"],
    o:["I'm in {p} and I thought about you, {cp}.","Thank you for studying so much! It brought me to {p}.","Hello from {p}, {c}! It's lovely here.","I'm having a cosy little trip to {p}.","I wish you were here in {p} with me, {cp}.","{p} is beautiful, and the people are so kind.","I found a quiet spot in {p} to write to you.","Look where I am! {p}!"],
    r:["It made me smile all day, {cp}.","I made a new friend there!","I picked a little flower for you.","It was so pretty I wanted to cry a little.","I bought you a tiny present.","Everything was so peaceful.","I thought: my friend would love this!","It was a lovely, lovely day, {cp}."],
    c:["I'm so proud of you!","Don't worry about mistakes. We all make them.","Keep practising, little by little.","Take care of yourself, OK?","I can't wait to see you again, {cp}.","You're doing great. Really!","Have a sweet day!","Remember to smile today."],
    s:["With love,","Big hugs,","Your friend forever,","Love you lots,","Warmly,","Sweet dreams,"]},
  smart:{
    g:["Greetings!","Hello, fellow genius!","Dear student,","Salutations!","Hello, brilliant friend!","Hi! Fun fact incoming."],
    o:["I'm in {p}, {c}. I've been taking notes, {cp}.","Hello from {p}. I've already visited three museums.","Interesting news: I'm in {p}!","Your excellent results paid for my research trip to {p}.","I'm studying {p} very carefully, {cp}.","Arrived in {p}. Time to learn some local words!","{p} is fascinating. I've filled half a notebook.","Writing to you from {p}, with my glasses on, {cp}."],
    r:["I learned five new facts before lunch.","I counted everything. It was very satisfying, {cp}.","I asked the guide twelve questions.","My brain is so happy right now.","I wrote a short report about it. You're welcome.","My research says this place is awesome.","I took notes on every detail, {cp}.","It was even more interesting than a grammar book!"],
    c:["Remember: practice beats talent!","Study smart, not just hard, {cp}.","Review your mistakes. That's where you learn.","Every new word is a new adventure!","Your brain is a muscle. Use it today!","I'll quiz you when I get back.","Keep learning, curious friend!","Knowledge is the best souvenir, {cp}."],
    s:["Scientifically yours,","Best regards,","Your study buddy,","Cleverly,","Yours in learning,","Kind regards,"]},
  mighty:{
    g:["BEHOLD!","Hear me, friend!","ROAR! Hello!","Greetings, brave one!","Hello, tiny human!","Attention, please!"],
    o:["I have arrived in {p}, {cp}!","The great land of {p} welcomes me!","From mighty {p}, {c}, I send my greetings!","I flew across the sea to reach {p}!","Thanks to your hard work, I now rule {p}. Sort of, {cp}.","{p} trembled when I arrived. In a good way.","Legends will speak of my trip to {p}!","I stomped all the way to {p}, {cp}!"],
    r:["The ground shook with my happiness!","Everyone ran. Then they asked for selfies.","It was EPIC, {cp}!","I tried to be small. I failed.","I roared with joy. Car alarms went off.","It was a legendary day!","I accidentally knocked over a sign. Sorry!","Even I was impressed, {cp}!"],
    c:["Study bravely, my friend!","Your English grows stronger every day!","Ten right answers is nothing for a hero like you!","Go forth and practise, {cp}!","Fear no grammar!","Keep your fire burning!","I shall return. With stories!","Be mighty today!"],
    s:["Mightily yours,","ROAR,","Your legendary friend,","With great power,","Epically,","Fiercely,"]},
  mystic:{
    g:["Psst...","Greetings from beyond!","Hello, mortal!","Oooh, hello!","Hey, earthling!","Hello from the shadows!"],
    o:["I magically appeared in {p}, {cp}.","I floated all the way to {p}. Nobody saw me.","Greetings from mysterious {p}, {c}!","My powers brought me to {p}. Your hard work helped, {cp}.","I've landed in {p}. The locals seem friendly.","{p} at night is my favourite thing.","I wished to see {p}, and here I am!","Hello from {p}. I'm invisible right now, {cp}."],
    r:["Nobody noticed me. Perfect.","I scared a pigeon. Just a little, {cp}.","It was magical, in every sense.","I may have cast a tiny spell on it.","The moon looked amazing from there.","Very mysterious. Very cool, {cp}.","I appeared in a tourist's photo by accident!","I made it sparkle. You're welcome."],
    c:["Use your powers wisely: do your homework!","I see a great future for you, {cp}.","Practise today and something magical will happen.","Keep studying, and I'll keep travelling.","Your English is getting spookily good!","I'll appear again soon. Watch out!","Don't forget: words are spells!","Until we meet again, {cp}..."],
    s:["Mysteriously yours,","Boo,","Magically,","From the other side,","Spookily,","Until next moon,"]}
};
const PC_LINES = {
  salem:["Salem is famous for its witches. I saw three on brooms!","A zombie asked me for directions. I ran!","Here it's Halloween all year round.","I visited a haunted house. Something said 'BOO'!","A black cat followed me through the graveyard.","I bought a tiny witch hat as a souvenir.","The zombie in the cemetery was very slow. Lucky me!","I carved a pumpkin with a scary face."],
  barcelona:["I saw the Sagrada Família. They started building it in 1882!","The towers look like giant sandcastles.","I walked down La Rambla and saw human statues.","I ate patatas bravas. A bit spicy!","I sat on the colourful bench in Park Güell.","I swam in the Mediterranean Sea.","I learned to say 'bon dia' in Catalan.","I watched people build a human tower!"],
  granada:["I visited the Alhambra, a palace on a hill.","The walls inside are covered in beautiful patterns.","I saw snowy mountains and palm trees on the same day!","Every drink came with free tapas. Amazing!","I walked through gardens full of fountains.","I watched the sunset from the San Nicolás viewpoint.","I got lost in the little white streets of the Albaicín.","I heard flamenco guitar in a cave."],
  seville:["I climbed the Giralda tower. No stairs, just ramps!","It was SO hot. Like an oven!","I saw a flamenco show. The dancers were so fast!","Orange trees grow on every street.","I rode in a horse carriage past the cathedral.","I visited the Plaza de España. It's huge!","I ate gazpacho, a cold tomato soup.","I took a boat on the Guadalquivir river."],
  madrid:["I saw the Puerta de Alcalá, a giant stone gate.","I rowed a boat in Retiro Park.","I ate churros with hot chocolate. Heaven!","I visited the Prado Museum. So many paintings!","I ate a squid sandwich in Plaza Mayor.","I stood on Kilometre Zero, the centre of Spain.","Dinner here is at ten o'clock at night!","I saw the Royal Palace. It has over 3,000 rooms!"],
  tenerife:["I saw Mount Teide, the highest mountain in Spain.","Teide is a volcano! Don't worry, it's sleeping.","I took a cable car up the mountain.","The beach had black sand!","I saw whales and dolphins from a boat.","It's warm here even in winter.","At night, I saw millions of stars.","I ate wrinkly potatoes with spicy sauce."],
  rio:["I saw the giant Christ the Redeemer statue.","I took a cable car up Sugarloaf Mountain.","I played football on Copacabana beach.","I danced samba in the street!","The statue's arms are 28 metres wide!","I drank fresh coconut water.","I saw tiny monkeys in the trees.","I said 'obrigado' to everyone."],
  machu:["I saw Machu Picchu, an old Inca city in the mountains.","It's 2,430 metres high. I was out of breath!","A llama walked right past me!","The clouds were below me. So cool!","I walked on stone steps built hundreds of years ago.","I took a train through the jungle to get here.","The stone walls fit together with no cement!","I watched the sunrise over the ruins."],
  moai:["I saw the moai, giant stone heads!","There are almost 1,000 moai on the island.","Some moai wear stone hats. Fancy!","The island is in the middle of the Pacific Ocean.","I sat next to a moai. It didn't talk much.","I swam at a beach with white sand and palm trees.","I watched the sunrise behind fifteen moai.","Nobody knows exactly how they moved them!"],
  athens:["I climbed up to the Parthenon on the Acropolis.","It's almost 2,500 years old!","I counted the columns. There are lots!","I ate a gyros. Delicious!","The first Olympic Games were in Greece.","A friendly cat followed me everywhere.","I saw the guards. Their shoes have pompoms!","I said 'yassas' to say hello."],
  amsterdam:["I saw tall, thin houses next to the canals.","There are more bikes than people here!","I took a boat trip on the canals.","I saw a field full of tulips.","I ate stroopwafels, waffles with caramel inside.","Some houses lean forward. It's on purpose!","I visited an old windmill.","I almost got hit by a bike. Twice!"],
  santorini:["I saw white houses with blue roofs.","The sunset in Oia was the best ever.","The island is part of an old volcano!","I walked up hundreds of steps from the port.","I swam at a beach with red sand.","I ate fresh tomatoes and feta cheese.","Everything was white and blue, like the Greek flag.","I took about a thousand photos."],
  chichen:["I saw the great pyramid of Chichén Itzá.","The Maya built it more than 1,000 years ago.","If you clap in front of it, the echo sounds like a bird!","The pyramid has 365 steps, one for every day of the year.","It was hot, so I swam in a cenote, a natural pool.","I ate tacos. Then more tacos.","I heard howler monkeys in the jungle.","I learned a few words in the Maya language."],
  paris:["I climbed the Eiffel Tower. So many steps!","I ate three croissants for breakfast.","I saw the Mona Lisa. She's smaller than I thought.","I took a boat ride on the river Seine.","A painter in Montmartre drew my portrait.","At night, the tower sparkled like a giant diamond.","I tried to say 'merci' with a French accent.","I sat in a café and watched people go by."],
  giza:["I saw the Great Pyramid. It's over 4,500 years old!","I rode a camel. It wasn't very polite.","I said hello to the Sphinx. It didn't answer.","The sand was so hot I danced across it.","I watched the sunset over the pyramids.","I went inside a pyramid. It was dark and narrow!","I found sand in my ears for days.","I tried to count the stones. I gave up at 312."],
  london:["I heard Big Ben ring. BONG!","It rained, then it was sunny, then it rained again.","I rode on a red double-decker bus, upstairs!","I waved at the guards. They didn't move at all.","I drank a cup of tea with milk. Very British.","I took the Tube and got a bit lost.","I walked across Tower Bridge.","I said 'cheers' to everyone."],
  newyork:["I visited the Statue of Liberty. She's huge!","I ate a hot dog in Central Park.","The buildings were so tall my neck hurt.","I saw the bright lights of Times Square.","Yellow taxis were everywhere, honking!","I took the ferry and the wind messed up my hair.","I ate a slice of pizza as big as my head.","Nobody sleeps in this city, so neither did I."],
  rome:["I visited the Colosseum. Gladiators fought here!","I threw a coin into the Trevi Fountain.","I ate gelato. Then more gelato.","I pretended to be an emperor for an afternoon.","Pasta for lunch, pizza for dinner. Perfect.","There were old ruins on every corner.","I counted the cats near the Colosseum. So many!","I learned to say 'ciao' with my hands."],
  agra:["I saw the Taj Mahal at sunrise. Wow.","It's made of white marble and it glows pink in the morning.","I saw its reflection in the long pool.","I tried a spicy curry. My mouth is still on fire!","Someone took my photo pretending to hold the dome.","A monkey stole my snack!","An emperor built it for his wife, a long time ago.","I ate sweets called jalebi. So sticky!"],
  wall:["I walked on the Great Wall of China!","The wall is thousands of kilometres long.","There were so many steps! Up, down, up again.","I ate dumplings for lunch. Delicious!","I watched the wall disappear into the mountains.","I tried to use chopsticks. It took a while.","I stopped in a watchtower for a rest.","I shouted 'hello' and heard an echo."],
  fuji:["I saw Mount Fuji with snow on top.","Cherry blossoms fell on my head like pink snow.","I ate sushi. Then ramen. Then more sushi.","I walked through a big red gate called a torii.","The trains here are super fast and always on time.","I bowed to say hello. Everyone bowed back!","I tried green tea ice cream.","I bought a little lucky cat that waves. For you!"],
  sydney:["I saw the Opera House. It looks like big white sails.","I walked across the Harbour Bridge.","I went surfing at Bondi Beach. I fell off a lot.","I met a kangaroo. It boxed me. Gently.","It's summer in December here!","A koala was sleeping in a tree. Lucky koala.","I saw dolphins from the ferry!","I said 'G'day, mate!' to everyone."],
  pisa:["I saw the Leaning Tower. It really leans!","I took the classic photo holding up the tower.","I climbed to the top. The floor felt wonky!","I ate the best pizza of my life.","The tower has been leaning for more than 800 years.","I tilted my head so the tower looked straight.","I drank a tiny, strong Italian coffee.","I bought a mini tower as a souvenir."]
};
const pick = a => a[Math.floor(Math.random()*a.length)];
function writePostcard(placeId, petId, petName){
  const [vk, cp] = PET_VOICE[petId] || ["sweet","yay"];
  const V = VOICES[vk], P = POSTCARDS.find(x=>x.id===placeId);
  const lines = shuffle(PC_LINES[placeId]).slice(0,2);
  let used = false;
  const fill = s => s.replace(/\{p\}/g, P.n).replace(/\{c\}/g, P.c).replace(/,? \{cp\}/g, m => {
    if(used) return ""; used = true; return m.replace("{cp}", `[[${cp}]]`);
  });
  const g = fill(pick(V.g)), o = fill(pick(V.o)), l1 = lines[0];
  let r = fill(pick(V.r));
  const l2 = lines[1], c = fill(pick(V.c));
  if(!used) r = r.replace(/([.!?]+)$/, `, [[${cp}]]$1`);
  return {g, body:`${o} ${l1} ${r} ${l2}`, c, s:pick(V.s), name:petName};
}


/* ── animal sounds: tap a card to turn it over, tap the speaker to hear it in English ── */
const SOUNDS = {
  cat:["Meow!","A cat meows."], dog:["Woof woof!","A dog barks."], rabbit:["Sniff sniff!","A rabbit sniffs."], hamster:["Squeak!","A hamster squeaks."],
  turtle:["Hisss!","A turtle hisses."], chick:["Cheep cheep!","A chick cheeps."], fox:["Yip yip!","A fox yelps."], panda:["Baa-aa!","A panda bleats."],
  owl:["Hoot hoot!","An owl hoots."], koala:["Grr-rumph!","A koala bellows."], otter:["Squeak squeak!","An otter squeaks."], sloth:["Eeeeee!","A sloth squeals."],
  tiger:["Grrrr!","A tiger growls."], octopus:["Blub blub!","An octopus is silent!"], penguin:["Honk honk!","A penguin honks."], flamingo:["Honk!","A flamingo honks."],
  hedgehog:["Snuffle snuffle!","A hedgehog snuffles."], dolphin:["Click click!","A dolphin clicks."], dragon:["Roooar!","A dragon roars."], unicorn:["Neigh!","A unicorn neighs."],
  trex:["ROAR!","A T-Rex roars."], whale:["Ooooo-oooo!","A whale sings."], frog:["Ribbit!","A frog croaks."], pig:["Oink oink!","A pig grunts."],
  mouse:["Eek eek!","A mouse squeaks."], duck:["Quack quack!","A duck quacks."], snail:["Shhh...","A snail is silent!"], bee:["Buzzzz!","A bee buzzes."],
  raccoon:["Chitter chitter!","A raccoon chitters."], kangaroo:["Cluck cluck!","A kangaroo clucks."], llama:["Hmmmm!","A llama hums."], wolf:["Awoooo!","A wolf howls."],
  parrot:["Squawk! Hello!","A parrot squawks."], zebra:["Bark bark!","A zebra barks. Really!"], shark:["Chomp!","A shark is silent!"], lion:["ROAR!","A lion roars."],
  crocodile:["Snap snap!","A crocodile snaps."], eagle:["Screeech!","An eagle screeches."], peacock:["Ee-ow!","A peacock screams."], giraffe:["Hmmm!","A giraffe hums."],
  dino:["Rumble rumble!","A dino rumbles."], sdragon:["Puff puff!","A baby dragon puffs."], alien:["Zorp zorp!","An alien zorps."], robot:["Beep boop!","A robot beeps."],
  ghost:["Boooo!","A ghost boos."], wizard:["Abracadabra!","A wizard casts a spell."], vampire:["Bleh bleh!","A vampire says bleh."], genie:["Poof!","A genie appears."]
};
const SOUND_FILES = [];          // ids with a real recording in sounds/<id>.mp3
let sndPlaying = null;
/* the speaker only shows on pets you own or can afford */
function spkHTML(x, open){
  return open && SOUND_FILES.includes(x.id) ? `<button type="button" class="spk-mini" data-say="${x.id}" aria-label="Listen to the ${esc(x.n)}">🔊</button>` : "";
}
function bindSpk(){
  $app.querySelectorAll("[data-say]").forEach(b=>b.onclick = e => {
    e.stopPropagation(); playSound(b.dataset.say);
    const w = b.closest(".pw"), old = w.querySelector(".say"); if(old) old.remove();
    const t = SOUNDS[b.dataset.say]; if(!t) return;
    const bub = document.createElement("span"); bub.className = "say"; bub.textContent = t[0]; w.appendChild(bub);
    setTimeout(()=>bub.remove(), 1600);
  });
}
function playSound(id){
  if(sndPlaying){ sndPlaying.pause(); sndPlaying.currentTime = 0; }
  sndPlaying = new Audio(`sounds/${id}.mp3`); sndPlaying.play().catch(()=>{});
}
/* teacher's test link: ?rasca-noelia gives 3 scratch cards (and a pet if there isn't one) */
if(/[?&]rasca-noelia\b/.test(location.search)){
  if(!state.active){ state.pets.cat = "Mochi"; state.active = "cat"; }
  state.tickets = (state.tickets||0) + 3; save();
  history.replaceState(null, "", location.pathname);
  view = {name:"pet"};
}
/* open straight on the only exam / week when there's just one */
render();

if("serviceWorker" in navigator && location.protocol==="https:" && /github\.io$/.test(location.hostname)){
  try{ navigator.serviceWorker.register("sw.js").catch(()=>{}); }catch(e){}
}
})();
