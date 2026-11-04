(function(){
"use strict";

const STORE = "uoe:v3";
const MIXED_SIZE = 20;
const VOCAB_SIZE = 24;

let state = {best:{}};
try{ const raw = localStorage.getItem(STORE); if(raw) state = Object.assign(state, JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(STORE, JSON.stringify(state)); }catch(e){} }

const $app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const norm = s => String(s).toLowerCase().replace(/[’‘`]/g,"'").replace(/[.,!?;:"]/g,"").replace(/\s+/g," ").trim();
const LETTERS = "ABCD";
const weekName = w => "Week of " + new Date(w.monday+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long"});
const exam = () => EXAMS.find(x=>x.id===view.exam);
const week = () => exam().weeks.find(w=>w.monday===view.week);
const VOCAB = {phrasal:"Phrasal verbs", colloc:"Collocations", fixed:"Fixed phrases"};

/* phrasal verbs & collocations → drill questions */
function vocabItems(sec){
  const E = sec.entries, out = [];
  const gap = (ex, key) => {
    const inner = ex.match(/\{([^}]+)\}/)[1];
    const re = new RegExp("\\b"+key.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");
    return ex.replace(/\{[^}]+\}/, inner.replace(re, "___"));
  };
  E.forEach(e=>{
    const others = shuffle(E.filter(x=>x!==e && x.m!==e.m));
    if(others.length>=3){
      out.push({type:"mc", q:`${e.term} =`, o:[e.m, ...others.slice(0,3).map(x=>x.m)], h:`Example: ${e.ex.replace(/[{}]/g,"")}`, e:`<b>${esc(e.term)}</b> = ${esc(e.m)}.`});
      out.push({type:"mc", q:`Which one means "${e.m}"?`, o:[e.term, ...shuffle(others).slice(0,3).map(x=>x.term)], h:"Think of an example sentence for each option.", e:`<b>${esc(e.term)}</b> = ${esc(e.m)}.`});
    }
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
  ({exams, weeks, week:weekView, grammar, explainList, explain, exerciseList, vocab, practice, result})[view.name]();
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
  }).join("")}</div>`;
  $app.querySelectorAll("[data-exam]").forEach(b=>b.onclick=()=>go({name:"weeks", exam:b.dataset.exam}));
}

/* 2 · week */
function weeks(){
  const x = exam();
  $app.innerHTML = `
  ${header()}
  <div class="unit-head"><span class="label">${esc(x.name)}</span><h2>Choose the week</h2></div>
  <div class="menu">${x.weeks.map(w=>`
    <button type="button" class="menu-btn" data-week="${w.monday}"><span class="t">${esc(weekName(w))}</span><span class="arr" aria-hidden="true">→</span></button>`).join("")}</div>`;
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
  <div class="top"><button type="button" class="back" id="back">← Stop</button><span class="label">${v.cleared} / ${v.total}</span></div>
  <span class="label">${esc(v.title)}</span>
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
}
function settle(it, ok){
  if(ok){ it.done = true; it.result = "ok"; }
  else if(it.tries===0){ it.tries = 1; }
  else { it.done = true; it.result = "bad"; }
  if(it.done && !view.seen.has(it.uid)){
    view.seen.add(it.uid);
    if(it.result==="ok" && it.tries===0) view.firstRight++;
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
  go({name:"result", exam:v.exam, week:v.week, pct, firstRight:v.firstRight, total:v.total, session:v});
}
function result(){
  const v = view, p = Math.round(v.pct*100), s = v.session;
  const msg = p>=80 ? "Well done. Do it again tomorrow to make it stick."
    : p>=50 ? "Getting there. Repeat it until you get 80% or more."
    : "Read the explanation again, then repeat the exercises.";
  $app.innerHTML = `
  <div class="top"><button type="button" class="back" id="back">← Back</button></div>
  <div class="result">
    <span class="label">${esc(s.title)} · right first time</span>
    <div class="num">${p}%</div>
    <p>${v.firstRight} of ${v.total} right on the first try.</p>
    <p>${msg}</p>
    <div class="actions" style="justify-content:flex-start">
      <button type="button" class="btn" id="again">Again</button>
      ${s.rules?`<button type="button" class="btn ghost" id="rules">Explanation</button>`:""}
    </div>
  </div>`;
  bindBack(s.back);
  document.getElementById("again").onclick=()=>{
    view = {exam:s.exam, week:s.week};
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
