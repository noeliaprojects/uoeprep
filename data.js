const CLASS_2026_11_11 = {
  date: "2026-11-11",
  grammar: [
    { id:"embed", title:"Question words inside a sentence",
      explain:`
<section><h3>What is it?</h3>
<p>A question inside another sentence.</p>
<p>After the question word: normal order, subject + verb.</p>
<p class="exs">Where <b>is</b> the station? → Do you know where the station <b>is</b>?</p></section>
<section><h3>No do / does / did</h3>
<p class="exs">What <b>does</b> he want? → I don't know what he <b>wants</b>.</p>
<p class="exs no">I don't know what does he want. ✗</p></section>
<section><h3>Question words</h3>
<dl class="pairs">
<dt>how</dt><dd>the way<i>Scientists study <b>how</b> birds fly.</i></dd>
<dt>what</dt><dd>the thing<i>Tell me <b>what</b> you need.</i></dd>
<dt>which</dt><dd>one of a group<i>I can't decide <b>which</b> dress to buy.</i></dd>
<dt>why</dt><dd>the reason<i>Nobody knows <b>why</b> she left.</i></dd>
<dt>where / when</dt><dd>place / time<i>I forgot <b>when</b> the film starts.</i></dd>
<dt>whether / if</dt><dd>yes / no questions<i>I wonder <b>whether</b> it will rain.</i></dd>
</dl></section>
<section><h3>After prepositions</h3>
<p>A question word can come after a preposition.</p>
<p class="exs">It depends <b>on how</b> much it costs.</p>
<p class="exs">We talked <b>about what</b> to do.</p></section>
<section><h3>what, not that</h3>
<p><b>what</b> = the thing that.</p>
<p class="exs">That's exactly <b>what</b> I wanted. ✓</p>
<p class="exs no">That's exactly that I wanted. ✗</p></section>`,
      items:[
        {"type":"mc","q":"Do you know where the station ___?","o":["is","is it","does it","are"],"h":"After 'where': subject + verb.","e":"where the station <b>is</b>."},
        {"type":"mc","q":"Can you tell me what time the film ___?","o":["starts","does start","does it start","start"],"h":"No do / does in the middle of a sentence.","e":"what time the film <b>starts</b>."},
        {"type":"mc","q":"I don't understand ___ this machine works.","o":["how","what","which","that"],"h":"The way it works.","e":"<b>how</b> = the way."},
        {"type":"mc","q":"Nobody knows ___ she left so suddenly.","o":["why","what","which","whose"],"h":"The reason.","e":"<b>why</b> = the reason."},
        {"type":"mc","q":"I can't decide ___ of these two jackets to buy.","o":["which","what","how","why"],"h":"One of a group.","e":"<b>which</b> = one of a group."},
        {"type":"mc","q":"Tell me ___ you need and I'll get it.","o":["what","which","that","how"],"h":"The thing that you need.","e":"<b>what</b> = the thing that."},
        {"type":"mc","q":"I wonder ___ it will rain tomorrow.","o":["whether","what","which","that"],"h":"A yes/no question inside a sentence.","e":"<b>whether</b> (or if)."},
        {"type":"mc","q":"That's exactly ___ I wanted for my birthday!","o":["what","that","which","how"],"h":"The thing that I wanted.","e":"<b>what</b> I wanted."},
        {"type":"mc","q":"The price depends on ___ many people come.","o":["how","what","which","whether"],"h":"___ many …?","e":"depends on <b>how</b> many."},
        {"type":"mc","q":"We talked about ___ to do at the weekend.","o":["what","which","that","why"],"h":"The thing to do.","e":"about <b>what</b> to do."},
        {"type":"mc","q":"Which sentence is correct?","o":["I don't know where she lives.","I don't know where does she live.","I don't know where she does live.","I don't know where lives she."],"h":"Normal order after the question word.","e":"where <b>she lives</b>."},
        {"type":"mc","q":"Could you tell me ___ the bank opens?","o":["when","which","what","whose"],"h":"The time.","e":"<b>when</b> the bank opens."},
        {"type":"mc","q":"Scientists are studying ___ dolphins communicate.","o":["how","what","which","whose"],"h":"The way.","e":"<b>how</b> dolphins communicate."},
        {"type":"mc","q":"I asked him ___ he was coming to the party.","o":["whether","what","which","that"],"h":"A yes/no question inside a sentence.","e":"<b>whether</b> he was coming."},
        {"type":"mc","q":"Do you remember ___ we parked the car?","o":["where","which","what","whose"],"h":"The place.","e":"<b>where</b> we parked."},
        {"type":"mc","q":"It's hard to say ___ team will win.","o":["which","how","why","whether"],"h":"One of a group.","e":"<b>which</b> team."}
      ]},
    { id:"pperf", title:"Present perfect or past simple",
      explain:`
<section><h3>Present perfect</h3>
<p>have / has + past participle</p>
<dl class="pairs">
<dt>experience</dt><dd><i>I <b>have been</b> to Japan.</i></dd>
<dt>past → now</dt><dd><i>She <b>has lived</b> here for ten years.</i></dd>
<dt>result now</dt><dd><i>I<b>'ve lost</b> my keys. (I can't find them now.)</i></dd>
<dt>change</dt><dd><i>The city <b>has changed</b> a lot.</i></dd>
</dl></section>
<section><h3>Past simple</h3>
<p>A finished time in the past.</p>
<p class="exs">I <b>went</b> to Japan <b>in 2019</b>.</p>
<p class="exs">She <b>moved</b> here <b>ten years ago</b>.</p></section>
<section><h3>Time words</h3>
<dl class="pairs">
<dt>present perfect</dt><dd>for · since · ever · never · already · yet · just · so far</dd>
<dt>past simple</dt><dd>yesterday · ago · last week · in 2020 · when I was a child</dd>
</dl></section>
<section><h3>for or since?</h3>
<dl class="pairs">
<dt>for</dt><dd>a period<i>for three years</i></dd>
<dt>since</dt><dd>a starting point<i>since 2020 · since Monday</i></dd>
</dl></section>
<section><h3>Passive</h3>
<p class="exs">The bridge <b>has been closed</b> since Monday.</p></section>`,
      items:[
        {"type":"mc","q":"I ___ to London three times.","o":["have been","was going","am","had go"],"h":"An experience in your life.","e":"I <b>have been</b> to London."},
        {"type":"mc","q":"We ___ to Paris last summer.","o":["went","have gone","have been","go"],"h":"'last summer' = finished time.","e":"<b>went</b> + finished time."},
        {"type":"mc","q":"She ___ in Madrid since 2018.","o":["has lived","lived","lives","is living"],"h":"From the past until now.","e":"<b>has lived</b> … since."},
        {"type":"mc","q":"I've known him ___ ten years.","o":["for","since","during","ago"],"h":"A period of time.","e":"<b>for</b> + period."},
        {"type":"mc","q":"They've been married ___ 2015.","o":["since","for","from","ago"],"h":"A starting point.","e":"<b>since</b> + starting point."},
        {"type":"mc","q":"Have you ___ eaten sushi?","o":["ever","since","ago","last"],"h":"At any time in your life.","e":"Have you <b>ever</b>…?"},
        {"type":"mc","q":"I haven't finished my homework ___.","o":["yet","already","ever","still"],"h":"Negative, at the end of the sentence.","e":"haven't … <b>yet</b>."},
        {"type":"mc","q":"He ___ his leg when he was skiing.","o":["broke","has broken","breaks","has broke"],"h":"A finished moment in the past.","e":"<b>broke</b> (when he was skiing)."},
        {"type":"mc","q":"Look! Somebody ___ my bike.","o":["has stolen","have stolen","stealing","has stole"],"h":"A past action with a result now.","e":"<b>has stolen</b>."},
        {"type":"mc","q":"The town ___ a lot since I was a child.","o":["has changed","changed","changes","is changing"],"h":"Look at 'since'.","e":"<b>has changed</b> … since."},
        {"type":"mc","q":"When ___ you start learning English?","o":["did","have","has","do"],"h":"'When' asks about a finished time.","e":"When <b>did</b> you…?"},
        {"type":"mc","q":"I ___ just finished my essay.","o":["have","did","was","am"],"h":"just + present perfect.","e":"I <b>have</b> just finished."},
        {"type":"mc","q":"The museum ___ closed since last month.","o":["has been","was","is","had"],"h":"Passive, from the past until now.","e":"<b>has been</b> closed since…"},
        {"type":"mc","q":"So far, we ___ 200 tickets.","o":["have sold","sold","sell","are selling"],"h":"'So far' = until now.","e":"So far … <b>have sold</b>."},
        {"type":"mc","q":"She left the company two years ___.","o":["ago","since","for","already"],"h":"Past simple + time.","e":"two years <b>ago</b>."},
        {"type":"mc","q":"How long ___ you had this phone?","o":["have","did","do","are"],"h":"From the past until now.","e":"How long <b>have</b> you had…?"}
      ]},
    { id:"ability", title:"Ability: can, could, be able to",
      explain:`
<section><h3>can / could</h3>
<dl class="pairs">
<dt>can</dt><dd>ability now<i>She <b>can</b> speak four languages.</i></dd>
<dt>could</dt><dd>general ability in the past<i>I <b>could</b> swim when I was five.</i></dd>
</dl></section>
<section><h3>be able to</h3>
<p>Use it when <b>can</b> is not possible.</p>
<dl class="pairs">
<dt>future</dt><dd><i>I'll <b>be able to</b> help you tomorrow.</i></dd>
<dt>present perfect</dt><dd><i>I haven't <b>been able to</b> sleep.</i></dd>
<dt>after modals</dt><dd><i>You might <b>be able to</b> get a ticket.</i></dd>
<dt>after to</dt><dd><i>I'd like <b>to be able to</b> cook.</i></dd>
</dl></section>
<section><h3>One success in the past</h3>
<p>Use <b>was able to</b> or <b>managed to</b>, not <b>could</b>.</p>
<p class="exs">The fire spread fast, but everyone <b>managed to</b> escape. ✓</p>
<p class="exs no">…but everyone could escape. ✗</p>
<p>Negative: <b>couldn't</b> is fine.</p>
<p class="exs">I <b>couldn't</b> find my keys.</p></section>
<section><h3>Other ways</h3>
<dl class="pairs">
<dt>succeed in</dt><dd>+ -ing<i>She <b>succeeded in</b> passing.</i></dd>
<dt>be capable of</dt><dd>+ -ing<i>He's <b>capable of</b> winning.</i></dd>
</dl></section>`,
      items:[
        {"type":"mc","q":"I'm sorry, I ___ come to your party on Saturday.","o":["can't","couldn't","am not able","haven't been able"],"h":"Now you know you aren't free.","e":"I <b>can't</b> come."},
        {"type":"mc","q":"When I was six, I ___ ride a bike.","o":["could","can","am able","managed"],"h":"General ability in the past.","e":"<b>could</b> = general past ability."},
        {"type":"mc","q":"Don't worry. I'll ___ to help you tomorrow.","o":["be able","can","could","able"],"h":"Future: will + ?","e":"will <b>be able to</b>."},
        {"type":"mc","q":"I haven't ___ to sleep well this week.","o":["been able","could","can","be able"],"h":"Present perfect.","e":"haven't <b>been able to</b>."},
        {"type":"mc","q":"The fire spread quickly, but everyone ___ to escape.","o":["managed","could","can","succeeded"],"h":"One specific success in the past + to.","e":"<b>managed to</b> escape."},
        {"type":"mc","q":"She ___ in passing her driving test at the first attempt.","o":["succeeded","managed","could","was able"],"h":"Look at 'in' + -ing.","e":"<b>succeeded in</b> + -ing."},
        {"type":"mc","q":"You might ___ to get a cheap ticket online.","o":["be able","can","could","able"],"h":"After a modal.","e":"might <b>be able to</b>."},
        {"type":"mc","q":"I'd love to ___ able to play the piano.","o":["be","been","being","am"],"h":"to + infinitive.","e":"to <b>be</b> able to."},
        {"type":"mc","q":"Sorry, I ___ find your house. I got lost.","o":["couldn't","can't","wasn't able","haven't"],"h":"Negative, past.","e":"<b>couldn't</b> find."},
        {"type":"mc","q":"Is your brother ___ of running a marathon?","o":["capable","able","can","could"],"h":"Look at 'of' + -ing.","e":"<b>capable of</b> + -ing."},
        {"type":"mc","q":"If you practise every day, you ___ be able to speak fluently.","o":["will","can","are","have"],"h":"Future result.","e":"you <b>will</b> be able to."},
        {"type":"mc","q":"Will you be able ___ me at the airport?","o":["to meet","meet","meeting","met"],"h":"able + ?","e":"able <b>to</b> + verb."},
        {"type":"mc","q":"After hours of searching, we ___ to find the cat.","o":["were able","could","can","are able"],"h":"One success in the past + to.","e":"<b>were able to</b> find."},
        {"type":"mc","q":"My grandmother ___ read without glasses until she was 80.","o":["could","can","managed","succeeded"],"h":"General ability in the past.","e":"<b>could</b> read."},
        {"type":"mc","q":"Which sentence is correct?","o":["I've been able to finish the book.","I've could finish the book.","I've can finish the book.","I've be able to finish the book."],"h":"Present perfect of 'be able to'.","e":"have <b>been able to</b>."},
        {"type":"mc","q":"Not everyone is ___ to afford a car.","o":["able","capable","can","possible"],"h":"be ___ to + verb.","e":"be <b>able</b> to."}
      ]},
    { id:"purpose", title:"Linkers: purpose and result",
      explain:`
<section><h3>Purpose: why?</h3>
<dl class="pairs">
<dt>to + verb</dt><dd><i>I went out <b>to</b> buy bread.</i></dd>
<dt>in order to</dt><dd>more formal<i>We left early <b>in order to</b> avoid traffic.</i></dd>
<dt>so as not to</dt><dd><i>I whispered <b>so as not to</b> wake the baby.</i></dd>
<dt>so that</dt><dd>+ clause<i>I'll write it down <b>so that</b> I don't forget.</i></dd>
</dl>
<p><b>To</b> can also start a sentence.</p>
<p class="exs"><b>To</b> improve your English, read every day.</p></section>
<section><h3>Careful</h3>
<p class="exs no">I went out for buy bread. ✗</p>
<p class="exs">I went out <b>to</b> buy bread. ✓</p>
<p class="exs">I went out <b>for</b> some bread. ✓ (for + noun)</p></section>
<section><h3>Result</h3>
<dl class="pairs">
<dt>so</dt><dd><i>It was late, <b>so</b> we took a taxi.</i></dd>
<dt>As a result,</dt><dd>new sentence<i>The road was closed. <b>As a result,</b> we were late.</i></dd>
<dt>therefore</dt><dd>formal<i>He was ill and <b>therefore</b> missed the exam.</i></dd>
<dt>so … that</dt><dd><i>It was <b>so</b> cold <b>that</b> the lake froze.</i></dd>
<dt>such … that</dt><dd><i>It was <b>such</b> a long film <b>that</b> I fell asleep.</i></dd>
</dl></section>`,
      items:[
        {"type":"mc","q":"I went to the shop ___ buy some milk.","o":["to","for","so","that"],"h":"Purpose + verb.","e":"<b>to</b> + verb."},
        {"type":"mc","q":"We left early in order ___ miss the train.","o":["not to","to not","don't","no"],"h":"Negative of 'in order to'.","e":"in order <b>not to</b>."},
        {"type":"mc","q":"I'll write it down so ___ I don't forget.","o":["that","as","to","for"],"h":"so ___ + clause.","e":"so <b>that</b> + clause."},
        {"type":"mc","q":"She whispered so as ___ to wake the baby.","o":["not","no","don't","nothing"],"h":"Negative of 'so as to'.","e":"so as <b>not</b> to."},
        {"type":"mc","q":"___ improve your English, try to read every day.","o":["To","For","So","That"],"h":"Purpose at the start of the sentence.","e":"<b>To</b> improve…"},
        {"type":"mc","q":"The road was closed. As a ___, we were late.","o":["result","reason","cause","effect"],"h":"As a ___ = because of this.","e":"As a <b>result</b>."},
        {"type":"mc","q":"It was late, ___ we took a taxi home.","o":["so","because","although","for"],"h":"Result.","e":"…, <b>so</b> we took a taxi."},
        {"type":"mc","q":"He didn't study. ___, he failed the exam.","o":["As a result","Because","Although","In order to"],"h":"Result, new sentence + comma.","e":"<b>As a result,</b>"},
        {"type":"mc","q":"It was ___ cold that the lake froze.","o":["so","such","too","very"],"h":"Adjective + that.","e":"<b>so</b> + adjective + that."},
        {"type":"mc","q":"It was ___ a boring film that I fell asleep.","o":["such","so","too","very"],"h":"a + adjective + noun + that.","e":"<b>such</b> a + adjective + noun."},
        {"type":"mc","q":"I'm saving money ___ that I can travel next summer.","o":["so","such","in order","for"],"h":"___ that + clause.","e":"<b>so</b> that."},
        {"type":"mc","q":"They moved to the city ___ find work.","o":["to","for","so","that"],"h":"Purpose + verb.","e":"<b>to</b> + verb."},
        {"type":"mc","q":"He was injured and ___ couldn't play in the final.","o":["therefore","because","although","so that"],"h":"Formal result.","e":"and <b>therefore</b>."},
        {"type":"mc","q":"Which sentence is correct?","o":["I came here to study English.","I came here for study English.","I came here for to study English.","I came here so study English."],"h":"Purpose + verb.","e":"<b>to</b> study."},
        {"type":"mc","q":"We took a map ___ that we wouldn't get lost.","o":["so","such","to","for"],"h":"___ that + clause.","e":"<b>so</b> that."},
        {"type":"mc","q":"She called the shop ___ check the opening times.","o":["to","for","so","that"],"h":"Purpose + verb.","e":"<b>to</b> check."}
      ]},
    { id:"link2", title:"Linkers: contrast and condition",
      explain:`
<section><h3>Contrast + clause</h3>
<p>although · though · even though · while · whereas</p>
<p class="exs"><b>Although</b> it was late, we kept working.</p>
<p class="exs"><b>While</b> the job is well paid, it's very stressful.</p>
<p><b>while / whereas</b> can also compare two things:</p>
<p class="exs">I like the sea, <b>whereas</b> my sister prefers the mountains.</p></section>
<section><h3>Contrast + noun / -ing</h3>
<p>despite · in spite of</p>
<p class="exs"><b>Despite</b> the rain, we went out.</p>
<p class="exs"><b>In spite of</b> feeling tired, she finished the race.</p></section>
<section><h3>whether … or</h3>
<p>Two possibilities. It doesn't matter which one.</p>
<p class="exs"><b>Whether</b> you take the bus <b>or</b> the train, it takes an hour.</p></section>
<section><h3>Condition</h3>
<dl class="pairs">
<dt>if</dt><dd><i><b>If</b> it rains, we'll stay in.</i></dd>
<dt>unless</dt><dd>= if not<i><b>Unless</b> you hurry, you'll be late.</i></dd>
<dt>as long as / provided</dt><dd>= only if<i>You can go <b>as long as</b> you're back by 10.</i></dd>
<dt>without</dt><dd>+ noun / -ing<i><b>Without</b> your help, I couldn't do it.</i></dd>
<dt>otherwise</dt><dd>= if not<i>Hurry up, <b>otherwise</b> we'll miss the train.</i></dd>
</dl></section>
<section><h3>Adding information</h3>
<p>Moreover, · Furthermore, · In addition, · What's more,</p>
<p>New sentence + comma.</p></section>`,
      items:[
        {"type":"mc","q":"___ it was raining, we went for a walk.","o":["Although","Despite","However","Unless"],"h":"A clause follows (it was raining).","e":"<b>Although</b> + clause."},
        {"type":"mc","q":"___ the cold weather, the children played outside.","o":["Despite","Although","Even though","Unless"],"h":"A noun follows (the cold weather).","e":"<b>Despite</b> + noun."},
        {"type":"mc","q":"My brother loves football, ___ I prefer tennis.","o":["whereas","despite","unless","otherwise"],"h":"You're comparing two people.","e":"<b>whereas</b> compares two things."},
        {"type":"mc","q":"___ you like it or not, you have to do your homework.","o":["Whether","If","Unless","Although"],"h":"Look at 'or not'.","e":"<b>Whether</b> … or not."},
        {"type":"mc","q":"You won't pass ___ you study harder.","o":["unless","if","whether","despite"],"h":"= if you don't study harder.","e":"<b>unless</b> = if not."},
        {"type":"mc","q":"___ a map, we would have got lost.","o":["Without","Unless","Despite","Although"],"h":"A noun follows, and it's a condition.","e":"<b>Without</b> + noun."},
        {"type":"mc","q":"You can borrow my car as long ___ you drive carefully.","o":["as","so","that","like"],"h":"as long ___ = only if.","e":"as long <b>as</b>."},
        {"type":"mc","q":"Take an umbrella, ___ you'll get wet.","o":["otherwise","unless","whereas","despite"],"h":"= if you don't.","e":"<b>otherwise</b> = if not."},
        {"type":"mc","q":"___ the hotel was cheap, it was very comfortable.","o":["Even though","Despite","In spite of","However"],"h":"A clause follows.","e":"<b>Even though</b> + clause."},
        {"type":"mc","q":"The app is free. ___, it has no adverts.","o":["Moreover","Although","Whereas","Unless"],"h":"A new sentence that adds a positive point.","e":"<b>Moreover,</b> = and also."},
        {"type":"mc","q":"We'll play tennis tomorrow ___ it rains. If it rains, we'll go to the cinema.","o":["unless","if","whether","provided"],"h":"= if it doesn't rain.","e":"<b>unless</b> = if not."},
        {"type":"mc","q":"___ he's only 12, he plays the piano like a professional.","o":["Although","Despite","Whether","Unless"],"h":"A clause follows, contrast.","e":"<b>Although</b> + clause."},
        {"type":"mc","q":"___ you go by car or by train, the journey takes three hours.","o":["Whether","Either","If","Although"],"h":"Two possibilities, it doesn't matter which.","e":"<b>Whether</b> … or."},
        {"type":"mc","q":"In spite ___ the noise, I slept well.","o":["of","to","from","for"],"h":"In spite ___ + noun.","e":"In spite <b>of</b>."},
        {"type":"mc","q":"___ studying hard, she didn't get the grade she wanted.","o":["Despite","Although","Even though","Unless"],"h":"-ing follows.","e":"<b>Despite</b> + -ing."},
        {"type":"mc","q":"___ water, plants can't survive.","o":["Without","Unless","Despite","Otherwise"],"h":"A noun follows, and it's a condition.","e":"<b>Without</b> + noun."}
      ]},
    { id:"art", title:"Articles and possessives",
      explain:`
<section><h3>a / an</h3>
<p>One thing, mentioned for the first time, or a job.</p>
<p class="exs"><b>a</b> book · <b>an</b> apple · She's <b>a</b> nurse.</p>
<p><b>an</b> before a vowel SOUND:</p>
<p class="exs"><b>an</b> hour · <b>a</b> university</p></section>
<section><h3>the</h3>
<dl class="pairs">
<dt>already known</dt><dd><i>I bought a book. <b>The</b> book is great.</i></dd>
<dt>only one</dt><dd><i><b>the</b> sun · <b>the</b> internet</i></dd>
<dt>superlatives</dt><dd><i><b>the</b> best · <b>the</b> first</i></dd>
</dl></section>
<section><h3>No article</h3>
<p>General ideas: plural or uncountable nouns.</p>
<p class="exs">I love <b>music</b>. · <b>Dogs</b> are loyal.</p></section>
<section><h3>its or it's?</h3>
<dl class="pairs">
<dt>its</dt><dd>possessive<i>The company changed <b>its</b> name.</i></dd>
<dt>it's</dt><dd>= it is / it has<i><b>It's</b> raining.</i></dd>
</dl></section>
<section><h3>their / there / they're</h3>
<dl class="pairs">
<dt>their</dt><dd>possessive<i>They sold <b>their</b> car.</i></dd>
<dt>there</dt><dd>place · there is / are<i><b>There</b> are two cafés.</i></dd>
<dt>they're</dt><dd>= they are<i><b>They're</b> late.</i></dd>
</dl></section>`,
      items:[
        {"type":"mc","q":"The company has changed ___ logo.","o":["its","it's","his","it"],"h":"Possessive of 'it'.","e":"<b>its</b> = possessive."},
        {"type":"mc","q":"___ raining again. Take an umbrella.","o":["It's","Its","It","Is"],"h":"= It is.","e":"<b>It's</b> = it is."},
        {"type":"mc","q":"My parents sold ___ house last year.","o":["their","there","they're","its"],"h":"Possessive of 'they'.","e":"<b>their</b> = possessive."},
        {"type":"mc","q":"___ are three restaurants in my street.","o":["There","Their","They're","It"],"h":"There is / there are.","e":"<b>There</b> are."},
        {"type":"mc","q":"Where are the kids? ___ in the garden.","o":["They're","Their","There","Its"],"h":"= They are.","e":"<b>They're</b> = they are."},
        {"type":"mc","q":"She's ___ engineer.","o":["an","a","the","one"],"h":"A job, and a vowel sound.","e":"<b>an</b> engineer."},
        {"type":"mc","q":"I waited for ___ hour.","o":["an","a","any","some"],"h":"'hour' starts with a vowel SOUND.","e":"<b>an</b> hour."},
        {"type":"mc","q":"Which sentence is correct?","o":["I love music.","I love the musics.","I love a music.","I love musics."],"h":"General idea, uncountable.","e":"No article: I love <b>music</b>."},
        {"type":"mc","q":"It's ___ best pizza I've ever had.","o":["the","a","an","one"],"h":"Superlative.","e":"<b>the</b> best."},
        {"type":"mc","q":"We bought a car and a bike. ___ car is red.","o":["The","A","An","Its"],"h":"Already mentioned.","e":"<b>The</b> car (we know which one)."},
        {"type":"mc","q":"Every animal needs ___ own space.","o":["its","it's","his","our"],"h":"Possessive of 'it'.","e":"<b>its</b> own."},
        {"type":"mc","q":"Is ___ a bank near here?","o":["there","their","they're","it"],"h":"Is there…?","e":"Is <b>there</b>…?"},
        {"type":"mc","q":"My cousins are coming. ___ staying for a week.","o":["They're","Their","There","They"],"h":"= They are.","e":"<b>They're</b> staying."},
        {"type":"mc","q":"___ sun rises in the east.","o":["The","A","An","One"],"h":"There's only one.","e":"<b>The</b> sun."},
        {"type":"mc","q":"She's studying at ___ university in Madrid.","o":["a","an","any","some"],"h":"'university' starts with a 'y' sound.","e":"<b>a</b> university."},
        {"type":"mc","q":"The dog wagged ___ tail.","o":["its","it's","it","there"],"h":"Possessive of 'it'.","e":"<b>its</b> tail."}
      ]}
  ],
  phrasal: {
    entries:[
      {"term":"tap into","key":"into","m":"use something to get a benefit from it","ex":"Brands try to {tap into} our emotions.","ex2":"The app {taps into} people's love of games.","alt":["up","off","over"]},
      {"term":"end up","key":"up","m":"finally be in a place or situation","ex":"Most of the rubbish {ends up} in the sea.","ex2":"We {ended up} staying until midnight.","alt":["out","off","over"]},
      {"term":"break down","key":"down","m":"separate into small parts; decompose","ex":"Food waste {breaks down} quickly.","ex2":"Some materials take years to {break down}.","alt":["off","over","in"]},
      {"term":"switch to","key":"to","m":"change to something different","ex":"Many people have {switched to} electric cars.","ex2":"I {switched to} a cheaper phone plan.","alt":["into","on","for"]},
      {"term":"throw away","key":"away","m":"put in the rubbish","ex":"Don't {throw away} plastic bottles.","ex2":"We {throw away} too much food.","alt":["off","up","over"]},
      {"term":"get rid of","key":"rid","m":"remove something you don't want","ex":"I want to {get rid of} my old clothes.","ex2":"How can we {get rid of} the smell?","alt":["out","off","away"]},
      {"term":"cut back on","key":"back","m":"use or spend less","ex":"The office is {cutting back on} paper.","ex2":"We should {cut back on} plastic.","alt":["up","off","over"]},
      {"term":"pick up","key":"up","m":"learn without studying formally","ex":"She {picked up} Italian while living in Rome.","ex2":"Children {pick up} languages quickly.","alt":["on","out","off"]},
      {"term":"give off","key":"off","m":"produce a smell, heat, light or gas","ex":"Burning plastic {gives off} toxic gas.","ex2":"The lamp {gives off} a soft light.","alt":["up","away","over"]},
      {"term":"phase out","key":"out","m":"stop using something gradually","ex":"The government will {phase out} plastic bags.","ex2":"Old trains are being {phased out}.","alt":["off","down","away"]},
      {"term":"use up","key":"up","m":"use all of something","ex":"We've {used up} all the milk.","ex2":"Don't {use up} all the hot water!","alt":["out","off","over"]},
      {"term":"bring about","key":"about","m":"make something happen","ex":"The internet has {brought about} huge changes.","ex2":"The new law could {bring about} real change.","alt":["over","off","along"]},
      {"term":"sign up","key":"up","m":"register for something","ex":"I've {signed up} for a yoga class.","ex2":"Hundreds of people {signed up} to volunteer.","alt":["in","off","over"]},
      {"term":"go beyond","key":"beyond","m":"be more than","ex":"The film {goes beyond} simple entertainment.","ex2":"Her talent {goes beyond} music.","alt":["after","through","across"]},
      {"term":"look forward to","key":"forward","m":"be happy about something in the future","ex":"I'm {looking forward to} the holidays.","ex2":"We {look forward to} hearing from you.","alt":["ahead","front","before"]},
      {"term":"back up","key":"up","m":"make a copy of files","ex":"Always {back up} your photos.","ex2":"I {backed up} my laptop before the update.","alt":["on","off","down"]}
    ],
    items:[
      {"type":"mc","q":"Advertisers try to ___ our deepest fears.","o":["tap into","give off","phase out","back up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>tap into</b> = use to get a benefit."},
      {"type":"mc","q":"A lot of plastic ___ in the oceans.","o":["ends up","signs up","picks up","backs up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>end up</b> = finally be somewhere."},
      {"type":"mc","q":"Bananas ___ quickly in compost.","o":["break down","sign up","look forward to","back up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>break down</b> = decompose."},
      {"type":"mc","q":"We've ___ a renewable energy supplier.","o":["switched to","given off","thrown away","used up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>switch to</b> = change to."},
      {"type":"mc","q":"Please don't ___ the receipt. I might need it.","o":["throw away","tap into","sign up","bring about"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>throw away</b>."},
      {"type":"mc","q":"I need to ___ some old furniture before we move.","o":["get rid of","go beyond","tap into","switch to"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>get rid of</b> = remove."},
      {"type":"mc","q":"The school is trying to ___ printing to save paper.","o":["cut back on","go beyond","give off","sign up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>cut back on</b> = do less."},
      {"type":"mc","q":"He ___ a bit of Greek during his holiday.","o":["picked up","phased out","backed up","gave off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>pick up</b> = learn informally."},
      {"type":"mc","q":"This candle ___ a lovely smell.","o":["gives off","picks up","signs up","uses up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>give off</b> a smell."},
      {"type":"mc","q":"Supermarkets are going to ___ single-use bags.","o":["phase out","pick up","look forward to","tap into"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>phase out</b> = stop gradually."},
      {"type":"mc","q":"Who ___ all the printer paper?","o":["used up","signed up","went beyond","tapped into"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>use up</b> = use all."},
      {"type":"mc","q":"Social media has ___ big changes in how we shop.","o":["brought about","backed up","signed up","picked up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>bring about</b> = make happen."},
      {"type":"mc","q":"Have you ___ for the school trip yet?","o":["signed up","used up","given off","brought about"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>sign up</b> = register."},
      {"type":"mc","q":"Her kindness ___ what anyone expected.","o":["went beyond","ended up","signed up","gave off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>go beyond</b> = be more than."},
      {"type":"mc","q":"I'm really ___ the summer holidays!","o":["looking forward to","giving off","backing up","ending up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>look forward to</b>."},
      {"type":"mc","q":"Remember to ___ your files before updating your laptop.","o":["back up","give off","phase out","end up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>back up</b> = make a copy."}
    ]
  },
  colloc: {
    entries:[
      {"term":"take time","key":"take","m":"need a long time","ex":"It can {take years} to learn a language.","ex2":"Good things {take time}.","alt":["last","spend","pass"]},
      {"term":"pose a threat","key":"pose","m":"be a danger","ex":"Pollution can {pose a threat} to wildlife.","ex2":"These dogs don't {pose a serious threat}.","alt":["put","make","give"]},
      {"term":"raise concerns","key":"raise","m":"make people worried","ex":"Social media can {raise concerns} about privacy.","ex2":"The new rules will {raise concerns} among teachers.","alt":["rise","lift","grow"]},
      {"term":"introduce a ban","key":"ban","m":"start a law that stops something","ex":"Many countries have {introduced a ban} on plastic bags.","ex2":"The city wants to {introduce a ban} on cars in the centre.","alt":["stop","block","end"]},
      {"term":"draw attention to","key":"attention","m":"make people notice","ex":"The campaign {draws attention to} climate change.","ex2":"She tried not to {draw attention to} herself.","alt":["notice","look","eyes"]},
      {"term":"play a role","key":"role","m":"be an important part of something","ex":"Sleep {plays an important role} in learning.","ex2":"Technology will {play a big role} in the future.","alt":["game","act","function"]},
      {"term":"make a difference","key":"difference","m":"have a good effect","ex":"Small changes can {make a difference}.","ex2":"Volunteers {make a real difference}.","alt":["effect","different","differ"]},
      {"term":"run the risk","key":"risk","m":"be in a situation where something bad can happen","ex":"If you don't book, you {run the risk} of not getting a seat.","ex2":"Drivers who use their phones {run a huge risk}.","alt":["danger","threat","chance"]},
      {"term":"pay the price","key":"price","m":"suffer because of something you did","ex":"If you don't sleep, you'll {pay the price} tomorrow.","ex2":"The planet is {paying the price} for our habits.","alt":["money","fee","value"]},
      {"term":"cause damage","key":"damage","m":"harm something","ex":"The storm {caused serious damage}.","ex2":"Plastic can {cause damage} to marine life.","alt":["hurt","wound","broken"]},
      {"term":"gain insight","key":"insight","m":"understand something better","ex":"Diaries help historians {gain insight} into the past.","ex2":"Travelling helped me {gain insight} into other cultures.","alt":["view","vision","sight"]},
      {"term":"reach a conclusion","key":"conclusion","m":"decide after thinking","ex":"After a long meeting, we {reached a conclusion}.","ex2":"It's too early to {reach a conclusion}.","alt":["final","finish","closing"]},
      {"term":"keep track of","key":"track","m":"know what is happening","ex":"This app helps you {keep track of} your spending.","ex2":"It's hard to {keep track of} all my passwords.","alt":["trace","record","follow"]},
      {"term":"set an example","key":"example","m":"behave in a way that others should copy","ex":"Teachers should {set a good example}.","ex2":"She {sets an example} for her younger sisters.","alt":["model","sample","idea"]},
      {"term":"save money","key":"money","m":"spend less","ex":"Reusable bags help you {save money}.","ex2":"We cook at home to {save money}.","alt":["price","cost","pay"]},
      {"term":"make an impulsive decision","key":"impulsive","m":"decide quickly without thinking","ex":"Don't {make impulsive decisions} when you're angry.","ex2":"Tired shoppers often {make impulsive} choices.","alt":["impulse","impulsively","impulsion"]}
    ],
    items:[
      {"type":"mc","q":"It can ___ to see results when you start exercising.","o":["take time","pose a threat","set an example","run the risk"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>take time</b>."},
      {"type":"mc","q":"Rising sea levels ___ to coastal cities.","o":["pose a threat","take time","keep track","save money"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>pose a threat</b> to."},
      {"type":"mc","q":"The plan to close the library has ___ among local people.","o":["raised concerns","made a difference","kept track","set an example"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>raise concerns</b>."},
      {"type":"mc","q":"The government plans to ___ on fireworks.","o":["introduce a ban","draw attention","pay the price","gain insight"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>introduce a ban</b> on."},
      {"type":"mc","q":"Celebrities can help ___ important issues.","o":["draw attention to","take time","save money","set an example"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>draw attention to</b>."},
      {"type":"mc","q":"Parents ___ in children's education.","o":["play an important role","reach a conclusion","cause damage","save money"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>play a role</b> in."},
      {"type":"mc","q":"Even small donations can ___.","o":["make a difference","pose a threat","reach a conclusion","take time"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>make a difference</b>."},
      {"type":"mc","q":"If you leave your bike unlocked, you ___ of it being stolen.","o":["run the risk","pay the price","set an example","gain insight"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>run the risk</b> of."},
      {"type":"mc","q":"He didn't train, and he ___ in the final.","o":["paid the price","set an example","kept track","drew attention"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>pay the price</b>."},
      {"type":"mc","q":"The flood ___ to hundreds of homes.","o":["caused serious damage","made a difference","played a role","gained insight"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>cause damage</b> to."},
      {"type":"mc","q":"Interviews help researchers ___ into people's habits.","o":["gain insight","save money","pay the price","introduce a ban"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>gain insight</b> into."},
      {"type":"mc","q":"After weeks of tests, the scientists ___.","o":["reached a conclusion","posed a threat","introduced a ban","kept track"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>reach a conclusion</b>."},
      {"type":"mc","q":"I use a notebook to ___ my homework.","o":["keep track of","draw attention to","run the risk of","pose a threat to"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>keep track of</b>."},
      {"type":"mc","q":"Older students should ___ for the younger ones.","o":["set a good example","cause damage","pose a threat","take time"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>set an example</b>."},
      {"type":"mc","q":"Buying second-hand clothes is a great way to ___.","o":["save money","pose a threat","reach a conclusion","introduce a ban"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>save money</b>."},
      {"type":"mc","q":"When you're tired, it's easy to ___ and buy things you don't need.","o":["make impulsive decisions","set an example","keep track","gain insight"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>make impulsive decisions</b>."}
    ]
  },
  fixed: {
    entries:[
      {"term":"mistake … for","key":"for","m":"think one thing is another","ex":"People often {mistake him for} his brother.","ex2":"Sorry, I {mistook you for} someone else.","alt":["as","by","with"]},
      {"term":"on a large scale","key":"on","m":"big, involving a lot of people or things","ex":"Recycling only works {on a large scale}.","ex2":"The company produces cars {on a large scale}.","alt":["in","by","with"]},
      {"term":"as a result","key":"As","m":"because of this","ex":"{As a result}, the match was cancelled.","ex2":"{As a result}, prices went up.","alt":["So","For","By"]},
      {"term":"between … and","key":"between","m":"connecting two things","ex":"There's a big difference {between} cats and dogs.","ex2":"You can choose {between} tea and coffee.","alt":["among","from","of"]},
      {"term":"based on","key":"on","m":"using something as the starting point","ex":"The film is {based on} a true story.","ex2":"Decisions should be {based on} facts.","alt":["in","of","at"]},
      {"term":"rather than","key":"rather","m":"instead of","ex":"Let's walk {rather than} take the bus.","ex2":"I prefer to read {rather than} watch TV.","alt":["better","instead","more"]},
      {"term":"in response to","key":"response","m":"as a reaction to","ex":"{In response to} complaints, the shop changed its rules.","ex2":"The bank wrote to me {in response to} my email.","alt":["respond","return","replying"]},
      {"term":"in terms of","key":"terms","m":"when you talk about this aspect","ex":"{In terms of} price, this phone is the best.","ex2":"The city is great {in terms of} transport.","alt":["term","words","ways"]},
      {"term":"at the expense of","key":"expense","m":"causing damage to something else","ex":"They built the hotel {at the expense of} the forest.","ex2":"Don't study {at the expense of} your sleep.","alt":["spend","expensive","paying"]},
      {"term":"on behalf of","key":"behalf","m":"representing someone","ex":"I'm writing {on behalf of} my company.","ex2":"She accepted the prize {on behalf of} the team.","alt":["half","side","place"]},
      {"term":"in the long run","key":"run","m":"after a long time","ex":"Exercise saves you money {in the long run}.","ex2":"{In the long run}, the plan will work.","alt":["time","way","road"]},
      {"term":"by far","key":"far","m":"by a large amount","ex":"She's {by far} the best player.","ex2":"This is {by far} the cheapest option.","alt":["much","long","most"]},
      {"term":"in danger of","key":"danger","m":"at risk of","ex":"The bridge is {in danger of} falling down.","ex2":"Many species are {in danger of} disappearing.","alt":["risk","threat","fear"]},
      {"term":"for the sake of","key":"sake","m":"to help someone or something","ex":"They stayed together {for the sake of} the children.","ex2":"Let's use less plastic {for the sake of} the planet.","alt":["help","aim","reason"]},
      {"term":"in the end","key":"end","m":"finally","ex":"{In the end}, we decided to stay at home.","ex2":"We argued for hours, but {in the end} we agreed.","alt":["finish","last","final"]},
      {"term":"at the same time","key":"same","m":"together; also","ex":"I can't study and listen to music {at the same time}.","ex2":"It's exciting and scary {at the same time}.","alt":["equal","similar","one"]}
    ],
    items:[
      {"type":"mc","q":"From far away, I mistook the rock ___ a seal.","o":["for","as","with","by"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>mistake</b> something <b>for</b> something else."},
      {"type":"mc","q":"Solar panels are now produced ___.","o":["on a large scale","by far","rather than","on behalf of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>on a large scale</b>."},
      {"type":"mc","q":"It rained all week. ___, the festival was cancelled.","o":["As a result","Rather than","In terms of","By far"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>As a result,</b>"},
      {"type":"mc","q":"What's the difference ___ a crocodile and an alligator?","o":["between","among","from","of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"difference <b>between</b> … and …"},
      {"type":"mc","q":"The series is ___ a famous novel.","o":["based on","rather than","by far","in terms of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>based on</b>."},
      {"type":"mc","q":"I'd prefer to cycle ___ drive.","o":["rather than","based on","in terms of","by far"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>rather than</b> = instead of."},
      {"type":"mc","q":"___ the protests, the company changed its plans.","o":["In response to","By far","Rather than","At the same time"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in response to</b>."},
      {"type":"mc","q":"___ size, it's the biggest city in Europe.","o":["In terms of","Rather than","In the end","By far"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in terms of</b>."},
      {"type":"mc","q":"The new road was built ___ a beautiful park.","o":["at the expense of","in terms of","on behalf of","rather than"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at the expense of</b>."},
      {"type":"mc","q":"I'm calling ___ my mother, who can't come.","o":["on behalf of","at the expense of","in terms of","in danger of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>on behalf of</b>."},
      {"type":"mc","q":"Buying good shoes is cheaper ___.","o":["in the long run","at the same time","on behalf of","in danger of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in the long run</b>."},
      {"type":"mc","q":"This is ___ the best book I've read this year.","o":["by far","in the end","rather than","in terms of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>by far</b> + superlative."},
      {"type":"mc","q":"The old tower is ___ collapsing.","o":["in danger of","on behalf of","in terms of","rather than"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in danger of</b> + -ing."},
      {"type":"mc","q":"Please slow down, ___ everyone's safety.","o":["for the sake of","in danger of","by far","in the end"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>for the sake of</b>."},
      {"type":"mc","q":"We waited for an hour, but ___ the bus never came.","o":["in the end","by far","rather than","in terms of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in the end</b> = finally."},
      {"type":"mc","q":"You can't text and drive ___.","o":["at the same time","in the long run","by far","on behalf of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at the same time</b>."}
    ]
  }
};

const CLASS_2026_11_04 = {
  date: "2026-11-04",
  grammar: [
    { id:"rel", title:"Relative clauses",
      explain:`
<section><h3>Defining</h3>
<p>Says WHICH person or thing.</p>
<p class="exs">The girl <b>who sits next to me</b> is Italian.</p>
<ul><li>No commas.</li><li>You can use <b>that</b>.</li><li>Object? You can drop the pronoun:<br><i>The film (that) we saw was great.</i></li></ul></section>
<section><h3>Non-defining</h3>
<p>Extra information.</p>
<p class="exs">My sister, <b>who lives in Paris</b>, is a nurse.</p>
<ul><li>Always between commas.</li><li>Never <b>that</b>.</li><li>Never drop the pronoun.</li></ul></section>
<section><h3>Which pronoun?</h3>
<dl class="pairs">
<dt>who</dt><dd>people<i>the man who called</i></dd>
<dt>which</dt><dd>things, animals<i>the bike which I bought</i></dd>
<dt>that</dt><dd>people or things · defining only<i>the book that you lent me</i></dd>
<dt>whose</dt><dd>possession<i>the girl whose phone was stolen</i></dd>
<dt>where</dt><dd>places<i>the town where I grew up</i></dd>
<dt>when</dt><dd>times<i>the day when we met</i></dd>
<dt>whom</dt><dd>people after a preposition<i>the people to whom I spoke</i></dd>
</dl></section>
<section><h3>which = the whole idea</h3>
<p>It can refer to everything before it.</p>
<p class="exs">He failed the exam, <b>which</b> surprised everyone.</p>
<p>Always after a comma.</p></section>
<section><h3>With prepositions</h3>
<p class="exs">the house (which) I live <b>in</b> → informal</p>
<p class="exs">the house <b>in which</b> I live → formal</p>
<p class="exs">30 students, <b>most of whom</b> were Italian</p></section>`,
      items:[
        {"type":"mc","q":"The woman ___ helped me was really kind.","o":["who","which","whose","where"],"h":"A person.","e":"<b>who</b> for people."},
        {"type":"mc","q":"This is the restaurant ___ we had our first date.","o":["where","which","who","whose"],"h":"A place + full clause.","e":"<b>where</b>."},
        {"type":"mc","q":"I have a friend ___ father is a famous chef.","o":["whose","who","who's","which"],"h":"The father belongs to the friend.","e":"<b>whose</b> father."},
        {"type":"mc","q":"My bike, ___ I bought second-hand, is very fast.","o":["which","that","what","who"],"h":"Commas + thing.","e":"Non-defining → <b>which</b>."},
        {"type":"mc","q":"He forgot to call his mum, ___ upset her a lot.","o":["which","that","what","it"],"h":"The relative refers to the whole first idea.","e":"Whole-clause <b>which</b>."},
        {"type":"mc","q":"The bus broke down, ___ meant we arrived two hours late.","o":["which","that","what","so"],"h":"Comma + refers to the whole event.","e":"<b>which</b> meant…"},
        {"type":"mc","q":"She has written four novels, two of ___ have won prizes.","o":["which","them","that","whom"],"h":"Preposition + ? for things.","e":"two of <b>which</b>."},
        {"type":"mc","q":"I'll never forget the day ___ I passed my driving test.","o":["when","which","where","whose"],"h":"Time.","e":"the day <b>when</b>."},
        {"type":"mc","q":"The people ___ we spoke to were very helpful.","o":["who","whose","which","what"],"h":"People, defining clause.","e":"<b>who</b> (also: that, whom)."},
        {"type":"mc","q":"The library has thousands of books, most of ___ are in English.","o":["which","whom","them","that"],"h":"most of + ? for things.","e":"most of <b>which</b>."},
        {"type":"mc","q":"The man ___ lives next door is a firefighter.","o":["who","which","whose","where"],"h":"A person, no commas.","e":"<b>who / that</b>."},
        {"type":"mc","q":"That's the shop ___ I bought my trainers.","o":["where","which","who","whose"],"h":"A place.","e":"<b>where</b>."},
        {"type":"mc","q":"I met a girl ___ brother plays for Barcelona.","o":["whose","who","who's","which"],"h":"Possession.","e":"<b>whose</b>."},
        {"type":"mc","q":"Our flight was cancelled, ___ was really annoying.","o":["which","that","what","who"],"h":"Refers to the whole previous idea.","e":"<b>which</b>."},
        {"type":"mc","q":"Paris, ___ is the capital of France, is visited by millions.","o":["which","that","what","where"],"h":"Commas + thing.","e":"<b>which</b> (never 'that' with commas)."},
        {"type":"mc","q":"The phone takes only an hour to charge, ___ is very convenient.","o":["which","that","what","it"],"h":"Comment on the whole idea.","e":"<b>which</b>."},
        {"type":"mc","q":"There were 30 students, most of ___ came from Italy.","o":["whom","who","them","which"],"h":"Preposition + people.","e":"most of <b>whom</b>."},
        {"type":"mc","q":"2020 was the year in ___ everything changed.","o":["which","that","when","what"],"h":"Preposition + ? (thing).","e":"in <b>which</b>."},
        {"type":"mc","q":"She missed the last bus, ___ meant she had to walk home.","o":["which","that","what","so"],"h":"A relative that refers to the whole first part of the sentence.","e":"<b>which</b> = the fact that she missed the bus."},
        {"type":"mc","q":"The concert was cancelled, ___ disappointed thousands of fans.","o":["which","that","what","it"],"h":"After a comma, referring to the whole event.","e":"<b>which</b>. <i>That</i> can't follow a comma."}
      ]},
    { id:"inv", title:"Inversion: Not only, Never, Hardly…",
      explain:`
<section><h3>What is it?</h3>
<p>Some negative words can go at the START of a sentence.</p>
<p>Then the word order changes, like in a question.</p>
<p class="exs">I have <b>never</b> seen this. → <b>Never have I</b> seen this.</p></section>
<section><h3>Auxiliary + subject</h3>
<dl class="pairs">
<dt>be</dt><dd><i>Not only <b>is it</b> cheap, it's also fast.</i></dd>
<dt>have</dt><dd><i>Never <b>have I</b> felt so tired.</i></dd>
<dt>modal</dt><dd><i>Under no circumstances <b>should you</b> open it.</i></dd>
<dt>no auxiliary?</dt><dd>use do / does / did<i>Not only <b>does she</b> sing, she also dances.</i></dd>
</dl></section>
<section><h3>Common starters</h3>
<dl class="pairs">
<dt>Not only … but also</dt><dd><i>Not only <b>did</b> she win, but she also broke the record.</i></dd>
<dt>Never / Rarely / Seldom</dt><dd><i>Rarely <b>do</b> we eat out.</i></dd>
<dt>Hardly … when</dt><dd><i>Hardly <b>had</b> I sat down when the phone rang.</i></dd>
<dt>No sooner … than</dt><dd><i>No sooner <b>had</b> we left than it started to rain.</i></dd>
<dt>Little</dt><dd><i>Little <b>did</b> he know the truth.</i></dd>
<dt>Only then / Only when</dt><dd><i>Only then <b>did</b> I understand.</i></dd>
<dt>Under no circumstances</dt><dd><i>…<b>should</b> you share your password.</i></dd>
</dl></section>
<section><h3>Careful</h3>
<p>If the word is NOT at the start, there's no inversion.</p>
<p class="exs">She <b>not only</b> sings, she also dances. ✓</p>
<p class="exs no">Not only she sings, she also dances. ✗</p></section>`,
      items:[
        {"type":"mc","q":"Not only ___ she speak French, but she also speaks Arabic.","o":["does","is","has","do"],"h":"'speak' has no auxiliary. Which one do we add?","e":"Not only <b>does</b> she speak… (do/does/did when there's no auxiliary)."},
        {"type":"mc","q":"Never ___ I seen such a beautiful beach.","o":["have","do","am","was"],"h":"'seen' is a past participle.","e":"Never <b>have</b> I seen… (present perfect)."},
        {"type":"mc","q":"Rarely ___ we go to the cinema these days.","o":["do","are","have","did"],"h":"Present simple, 'these days'.","e":"Rarely <b>do</b> we go…"},
        {"type":"mc","q":"Hardly had we arrived ___ it started to rain.","o":["when","than","then","that"],"h":"Hardly … ?","e":"Hardly … <b>when</b>."},
        {"type":"mc","q":"No sooner had the film started ___ the lights went out.","o":["than","when","then","that"],"h":"No sooner … ?","e":"No sooner … <b>than</b>."},
        {"type":"mc","q":"Little ___ he know that his life was about to change.","o":["did","does","had","was"],"h":"Past simple + 'know'.","e":"Little <b>did</b> he know…"},
        {"type":"mc","q":"Under no circumstances ___ leave the building during the exam.","o":["should you","you should","do","you"],"h":"Inversion: auxiliary first, then subject.","e":"Under no circumstances <b>should you</b> leave…"},
        {"type":"mc","q":"Only then ___ I realise how lucky I was.","o":["did","I did","had","was"],"h":"Past simple + 'realise'.","e":"Only then <b>did</b> I realise…"},
        {"type":"mc","q":"Not only ___ the hotel expensive, but it was also dirty.","o":["was","did","had","were"],"h":"The verb is 'be', past, singular.","e":"Not only <b>was</b> the hotel expensive…"},
        {"type":"mc","q":"Seldom ___ you find a restaurant this good.","o":["do","are","is","does"],"h":"Present simple + 'you'.","e":"Seldom <b>do</b> you find…"},
        {"type":"mc","q":"Not only did he forget my birthday, ___ he also forgot our anniversary.","o":["but","and","so","or"],"h":"Not only … ___ also.","e":"Not only … <b>but</b> also."},
        {"type":"mc","q":"Never before ___ so many people come to the festival.","o":["have","has","are","is"],"h":"Present perfect, plural subject.","e":"Never before <b>have</b> so many people come…"},
        {"type":"mc","q":"___ had I closed my eyes when the baby started crying.","o":["Hardly","No sooner","Only","Never"],"h":"Look at 'when' later in the sentence.","e":"<b>Hardly</b> … when. (No sooner goes with than.)"},
        {"type":"mc","q":"Which sentence is correct?","o":["Not only does music relax you, it also helps you focus.","Not only music relaxes you, it also helps you focus.","Not only music does relax you, it also helps you focus.","Not only relaxes music you, it also helps you focus."],"h":"After 'Not only' at the start: auxiliary + subject + verb.","e":"Not only <b>does music relax</b> you…"},
        {"type":"mc","q":"It ___ only saves money, but it also saves time.","o":["not","does","is","so"],"h":"'Not only' in the middle of the sentence.","e":"It <b>not only</b> saves money… (no inversion here)."},
        {"type":"mc","q":"Only when you have finished ___ go out.","o":["can you","you can","are you","you are"],"h":"Only when … → inversion in the main part.","e":"Only when you have finished <b>can you</b> go out."}
      ]},
    { id:"comp", title:"Comparatives and superlatives",
      explain:`
<section><h3>Short adjectives</h3>
<dl class="pairs">
<dt>-er / -est</dt><dd><i>cheap → cheap<b>er</b> → the cheap<b>est</b></i></dd>
<dt>-y → -ier / -iest</dt><dd><i>easy → eas<b>ier</b> → the eas<b>iest</b></i></dd>
</dl></section>
<section><h3>Long adjectives</h3>
<dl class="pairs">
<dt>more / most</dt><dd><i><b>more</b> relaxed · the <b>most</b> interesting</i></dd>
<dt>less / least</dt><dd><i><b>less</b> expensive · the <b>least</b> popular</i></dd>
</dl>
<p>With a noun: a + more + adjective + noun.</p>
<p class="exs">a <b>more</b> relaxed lifestyle</p></section>
<section><h3>Irregular</h3>
<dl class="pairs">
<dt>good</dt><dd>better · the best</dd>
<dt>bad</dt><dd>worse · the worst</dd>
<dt>far</dt><dd>further · the furthest</dd>
</dl></section>
<section><h3>Comparing</h3>
<dl class="pairs">
<dt>than</dt><dd><i>older <b>than</b> me</i></dd>
<dt>as … as</dt><dd><i>not <b>as</b> tall <b>as</b> you</i></dd>
<dt>much / far / even</dt><dd>+ comparative<i><b>much</b> easier · <b>even</b> worse</i></dd>
<dt>the …, the …</dt><dd><i><b>The more</b> you read, <b>the better</b> you write.</i></dd>
</dl></section>
<section><h3>the first / last / only + to</h3>
<p class="exs">She was <b>the first to</b> arrive.</p>
<p class="exs">He was <b>the only</b> one <b>to</b> pass.</p></section>`,
      items:[
        {"type":"mc","q":"This exercise is ___ than the last one.","o":["easier","more easy","easiest","the easiest"],"h":"Short adjective ending in -y + than.","e":"easy → <b>easier</b> than."},
        {"type":"mc","q":"It's the ___ film I've ever seen.","o":["worst","worse","baddest","most bad"],"h":"Superlative of 'bad'.","e":"bad → worse → <b>the worst</b>."},
        {"type":"mc","q":"Living in a village is ___ stressful than living in a city.","o":["less","least","fewer","little"],"h":"Comparative with 'than', the opposite of 'more'.","e":"<b>less</b> + adjective + than."},
        {"type":"mc","q":"She's ___ hard-working student in the class.","o":["the most","more","the more","most"],"h":"Superlative of a long adjective.","e":"<b>the most</b> hard-working."},
        {"type":"mc","q":"My new laptop is ___ faster than my old one.","o":["much","very","more","most"],"h":"Which word goes before a comparative?","e":"<b>much</b> faster. Not <i>very</i>."},
        {"type":"mc","q":"He isn't as tall ___ his brother.","o":["as","than","like","so"],"h":"as … ?","e":"as tall <b>as</b>."},
        {"type":"mc","q":"The ___ you practise, the better you get.","o":["more","most","much","many"],"h":"the …, the … ","e":"<b>The more</b> …, the better …"},
        {"type":"mc","q":"Moving to the countryside gave them a ___ relaxed lifestyle.","o":["more","much","many","as"],"h":"a + comparative + adjective + noun.","e":"a <b>more</b> relaxed lifestyle."},
        {"type":"mc","q":"Mount Everest is the ___ mountain in the world.","o":["highest","higher","most high","more high"],"h":"Superlative of a short adjective.","e":"<b>the highest</b>."},
        {"type":"mc","q":"Ana was the first ___ finish the race.","o":["to","that","for","of"],"h":"the first + ? + verb.","e":"the first <b>to</b> finish."},
        {"type":"mc","q":"Could you speak a bit ___, please? I can't hear you.","o":["louder","loud","loudest","most loud"],"h":"Comparative: more loud?","e":"<b>louder</b>."},
        {"type":"mc","q":"The weather today is ___ worse than yesterday.","o":["even","very","more","most"],"h":"Which word makes a comparative stronger?","e":"<b>even</b> worse."},
        {"type":"mc","q":"This is ___ expensive hotel in town.","o":["the most","the more","most","more"],"h":"Superlative of a long adjective.","e":"<b>the most</b> expensive."},
        {"type":"mc","q":"Our house is ___ from the station than yours.","o":["further","furthest","far","farest"],"h":"Comparative of 'far'.","e":"far → <b>further</b>."},
        {"type":"mc","q":"The older he gets, ___ he becomes.","o":["the wiser","wiser","the wisest","more wise"],"h":"the …, the …","e":"The older …, <b>the wiser</b> …"},
        {"type":"mc","q":"She was the only person ___ remember my name.","o":["to","for","of","at"],"h":"the only + ? + verb.","e":"the only person <b>to</b> remember."}
      ]},
    { id:"ing", title:"-ing forms",
      explain:`
<section><h3>-ing as a noun</h3>
<p>The -ing form can be the subject of a sentence.</p>
<p class="exs"><b>Reading</b> before bed helps you relax.</p>
<p class="exs"><b>Swimming</b> is good for your back.</p></section>
<section><h3>After prepositions</h3>
<p>After a preposition → always -ing.</p>
<p class="exs">by <b>reading</b> · before <b>leaving</b> · without <b>saying</b> goodbye</p>
<p class="exs">interested in <b>learning</b> · good at <b>drawing</b></p></section>
<section><h3>After some verbs</h3>
<dl class="pairs">
<dt>+ -ing</dt><dd>enjoy, avoid, finish, mind, suggest, keep, consider, risk</dd>
<dt>+ to</dt><dd>want, decide, hope, plan, agree, refuse, promise, manage</dd>
</dl>
<p class="exs">I enjoy <b>cooking</b>. · I decided <b>to cook</b> dinner.</p></section>
<section><h3>-ing for a result</h3>
<p>After a comma, -ing can show the result of the first part.</p>
<p class="exs">The bus broke down, <b>leaving</b> us in the middle of nowhere.</p></section>
<section><h3>make it + adjective + to</h3>
<p class="exs">The noise <b>makes it</b> hard <b>to</b> sleep.</p></section>`,
      items:[
        {"type":"mc","q":"___ in the sea is my favourite thing about summer.","o":["Swimming","Swim","To swimming","Swam"],"h":"The subject of the sentence is an activity.","e":"<b>Swimming</b> is… (-ing as a noun)."},
        {"type":"mc","q":"You can improve your English by ___ films in English.","o":["watching","watch","to watch","watched"],"h":"After a preposition (by).","e":"by <b>watching</b>."},
        {"type":"mc","q":"She left without ___ goodbye.","o":["saying","say","to say","said"],"h":"After a preposition (without).","e":"without <b>saying</b>."},
        {"type":"mc","q":"I'm really interested in ___ Japanese.","o":["learning","learn","to learn","learnt"],"h":"interested in + ?","e":"interested in <b>learning</b>."},
        {"type":"mc","q":"We enjoy ___ to new places.","o":["travelling","to travel","travel","travelled"],"h":"enjoy + ?","e":"enjoy + <b>-ing</b>."},
        {"type":"mc","q":"He decided ___ his job and travel the world.","o":["to leave","leaving","leave","left"],"h":"decide + ?","e":"decide + <b>to</b>."},
        {"type":"mc","q":"The factory closed, ___ hundreds of people without work.","o":["leaving","left","leaves","to leave"],"h":"After a comma, a result of the first part.","e":"…, <b>leaving</b> hundreds of people… (result)."},
        {"type":"mc","q":"Do you mind ___ the window?","o":["opening","to open","open","opened"],"h":"mind + ?","e":"mind + <b>-ing</b>."},
        {"type":"mc","q":"The loud music made ___ impossible to concentrate.","o":["it","that","this","there"],"h":"make ___ + adjective + to.","e":"made <b>it</b> impossible to…"},
        {"type":"mc","q":"Would you consider ___ abroad?","o":["working","to work","work","worked"],"h":"consider + ?","e":"consider + <b>-ing</b>."},
        {"type":"mc","q":"Before ___ the house, check that the windows are closed.","o":["leaving","leave","to leave","left"],"h":"After a preposition (before).","e":"before <b>leaving</b>."},
        {"type":"mc","q":"She managed ___ the exam even though she was ill.","o":["to pass","passing","pass","passed"],"h":"manage + ?","e":"manage + <b>to</b>."},
        {"type":"mc","q":"___ too much sugar is bad for your teeth.","o":["Eating","Eat","Eaten","To eating"],"h":"The subject of the sentence is an activity.","e":"<b>Eating</b> too much sugar is…"},
        {"type":"mc","q":"He's very good at ___ people laugh.","o":["making","make","to make","made"],"h":"good at + ?","e":"good at <b>making</b>."},
        {"type":"mc","q":"It snowed all night, ___ the roads dangerous.","o":["making","made","makes","to make"],"h":"After a comma, a result of the first part.","e":"…, <b>making</b> the roads dangerous."},
        {"type":"mc","q":"They suggested ___ a taxi to the airport.","o":["taking","to take","take","took"],"h":"suggest + ?","e":"suggest + <b>-ing</b>."}
      ]},
    { id:"link2", title:"Linkers: contrast and condition",
      explain:`
<section><h3>Contrast + clause</h3>
<p>although · though · even though · while · whereas</p>
<p class="exs"><b>Although</b> it was late, we kept working.</p>
<p class="exs"><b>While</b> the job is well paid, it's very stressful.</p>
<p><b>while / whereas</b> can also compare two things:</p>
<p class="exs">I like the sea, <b>whereas</b> my sister prefers the mountains.</p></section>
<section><h3>Contrast + noun / -ing</h3>
<p>despite · in spite of</p>
<p class="exs"><b>Despite</b> the rain, we went out.</p>
<p class="exs"><b>In spite of</b> feeling tired, she finished the race.</p></section>
<section><h3>whether … or</h3>
<p>Two possibilities. It doesn't matter which one.</p>
<p class="exs"><b>Whether</b> you take the bus <b>or</b> the train, it takes an hour.</p></section>
<section><h3>Condition</h3>
<dl class="pairs">
<dt>if</dt><dd><i><b>If</b> it rains, we'll stay in.</i></dd>
<dt>unless</dt><dd>= if not<i><b>Unless</b> you hurry, you'll be late.</i></dd>
<dt>as long as / provided</dt><dd>= only if<i>You can go <b>as long as</b> you're back by 10.</i></dd>
<dt>without</dt><dd>+ noun / -ing<i><b>Without</b> your help, I couldn't do it.</i></dd>
<dt>otherwise</dt><dd>= if not<i>Hurry up, <b>otherwise</b> we'll miss the train.</i></dd>
</dl></section>
<section><h3>Adding information</h3>
<p>Moreover, · Furthermore, · In addition, · What's more,</p>
<p>New sentence + comma.</p></section>`,
      items:[
        {"type":"mc","q":"___ it was raining, we went for a walk.","o":["Although","Despite","However","Unless"],"h":"A clause follows (it was raining).","e":"<b>Although</b> + clause."},
        {"type":"mc","q":"___ the cold weather, the children played outside.","o":["Despite","Although","Even though","Unless"],"h":"A noun follows (the cold weather).","e":"<b>Despite</b> + noun."},
        {"type":"mc","q":"My brother loves football, ___ I prefer tennis.","o":["whereas","despite","unless","otherwise"],"h":"You're comparing two people.","e":"<b>whereas</b> compares two things."},
        {"type":"mc","q":"___ you like it or not, you have to do your homework.","o":["Whether","If","Unless","Although"],"h":"Look at 'or not'.","e":"<b>Whether</b> … or not."},
        {"type":"mc","q":"You won't pass ___ you study harder.","o":["unless","if","whether","despite"],"h":"= if you don't study harder.","e":"<b>unless</b> = if not."},
        {"type":"mc","q":"___ a map, we would have got lost.","o":["Without","Unless","Despite","Although"],"h":"A noun follows, and it's a condition.","e":"<b>Without</b> + noun."},
        {"type":"mc","q":"You can borrow my car as long ___ you drive carefully.","o":["as","so","that","like"],"h":"as long ___ = only if.","e":"as long <b>as</b>."},
        {"type":"mc","q":"Take an umbrella, ___ you'll get wet.","o":["otherwise","unless","whereas","despite"],"h":"= if you don't.","e":"<b>otherwise</b> = if not."},
        {"type":"mc","q":"___ the hotel was cheap, it was very comfortable.","o":["Even though","Despite","In spite of","However"],"h":"A clause follows.","e":"<b>Even though</b> + clause."},
        {"type":"mc","q":"The app is free. ___, it has no adverts.","o":["Moreover","Although","Whereas","Unless"],"h":"A new sentence that adds a positive point.","e":"<b>Moreover,</b> = and also."},
        {"type":"mc","q":"We'll play tennis tomorrow ___ it rains. If it rains, we'll go to the cinema.","o":["unless","if","whether","provided"],"h":"= if it doesn't rain.","e":"<b>unless</b> = if not."},
        {"type":"mc","q":"___ he's only 12, he plays the piano like a professional.","o":["Although","Despite","Whether","Unless"],"h":"A clause follows, contrast.","e":"<b>Although</b> + clause."},
        {"type":"mc","q":"___ you go by car or by train, the journey takes three hours.","o":["Whether","Either","If","Although"],"h":"Two possibilities, it doesn't matter which.","e":"<b>Whether</b> … or."},
        {"type":"mc","q":"In spite ___ the noise, I slept well.","o":["of","to","from","for"],"h":"In spite ___ + noun.","e":"In spite <b>of</b>."},
        {"type":"mc","q":"___ studying hard, she didn't get the grade she wanted.","o":["Despite","Although","Even though","Unless"],"h":"-ing follows.","e":"<b>Despite</b> + -ing."},
        {"type":"mc","q":"___ water, plants can't survive.","o":["Without","Unless","Despite","Otherwise"],"h":"A noun follows, and it's a condition.","e":"<b>Without</b> + noun."}
      ]},
    { id:"modal", title:"Modals: obligation and advice",
      explain:`
<section><h3>Obligation</h3>
<dl class="pairs">
<dt>must</dt><dd>the speaker thinks it's necessary<i>I <b>must</b> call my mum.</i></dd>
<dt>have to</dt><dd>a rule or a situation<i>We <b>have to</b> wear a uniform.</i></dd>
<dt>need to</dt><dd>it's necessary<i>You <b>need to</b> book in advance.</i></dd>
</dl></section>
<section><h3>Advice</h3>
<dl class="pairs">
<dt>should / ought to</dt><dd><i>You <b>should</b> see a doctor.</i></dd>
<dt>had better</dt><dd>strong advice<i>You'<b>d better</b> hurry.</i></dd>
</dl></section>
<section><h3>Negative: careful!</h3>
<dl class="pairs">
<dt>mustn't</dt><dd>it's not allowed<i>You <b>mustn't</b> smoke here.</i></dd>
<dt>don't have to</dt><dd>it isn't necessary<i>You <b>don't have to</b> come.</i></dd>
<dt>needn't</dt><dd>it isn't necessary<i>You <b>needn't</b> worry.</i></dd>
</dl></section>
<section><h3>Past</h3>
<dl class="pairs">
<dt>had to</dt><dd><i>I <b>had to</b> work late yesterday.</i></dd>
<dt>didn't have to</dt><dd><i>We <b>didn't have to</b> pay.</i></dd>
<dt>should have</dt><dd>+ past participle: criticism<i>You <b>should have</b> told me.</i></dd>
</dl>
<p><b>must</b> has no past form. Use <b>had to</b>.</p></section>`,
      items:[
        {"type":"mc","q":"You ___ smoke in the hospital. It's forbidden.","o":["mustn't","don't have to","needn't","don't need to"],"h":"It's not allowed.","e":"<b>mustn't</b> = it's not allowed."},
        {"type":"mc","q":"You ___ bring food. Lunch is included.","o":["don't have to","mustn't","haven't to","aren't to"],"h":"It isn't necessary.","e":"<b>don't have to</b> = not necessary."},
        {"type":"mc","q":"Yesterday I ___ get up at 5 a.m. to catch my flight.","o":["had to","must","have to","musted"],"h":"Past obligation.","e":"<b>had to</b> (must has no past)."},
        {"type":"mc","q":"You look tired. You ___ go to bed earlier.","o":["should","must to","ought","have"],"h":"Advice.","e":"<b>should</b> + verb."},
        {"type":"mc","q":"In my school, we ___ wear a uniform. It's the rule.","o":["have to","has to","must to","need"],"h":"A rule, with 'we'.","e":"we <b>have to</b>."},
        {"type":"mc","q":"You ___ worry. Everything is under control.","o":["needn't","don't need","haven't to","mustn't to"],"h":"It isn't necessary.","e":"<b>needn't</b> + verb."},
        {"type":"mc","q":"You ___ told me it was your birthday! I would have bought you a present.","o":["should have","should","must","had to"],"h":"Criticism about the past.","e":"<b>should have</b> + past participle."},
        {"type":"mc","q":"We'd ___ leave now or we'll miss the bus.","o":["better","best","should","must"],"h":"Strong advice: We'd ___ …","e":"We'd <b>better</b> leave."},
        {"type":"mc","q":"Do I ___ to book a table, or can we just go?","o":["need","must","should","ought"],"h":"Which one is followed by 'to'?","e":"<b>need to</b>."},
        {"type":"mc","q":"Students ___ to switch off their phones during exams.","o":["have","must","should","need to"],"h":"Which one is followed by 'to'?","e":"<b>have to</b>."},
        {"type":"mc","q":"She ___ to work at the weekend last month because they were very busy.","o":["had","must","has","have"],"h":"Past, + to.","e":"<b>had to</b>."},
        {"type":"mc","q":"You ought ___ apologise to her.","o":["to","for","that","at"],"h":"ought + ?","e":"ought <b>to</b>."},
        {"type":"mc","q":"Drivers ___ stop at a red light. It's the law.","o":["have to","don't have to","needn't","ought"],"h":"A rule.","e":"<b>have to</b>."},
        {"type":"mc","q":"We ___ pay to visit the museum. It was free!","o":["didn't have to","mustn't","hadn't to","needn't to"],"h":"Past, not necessary.","e":"<b>didn't have to</b>."},
        {"type":"mc","q":"Which sentence means 'It's not necessary'?","o":["You don't have to come.","You mustn't come.","You shouldn't come.","You can't come."],"h":"Careful with mustn't!","e":"<b>don't have to</b> = not necessary. <i>mustn't</i> = not allowed."},
        {"type":"mc","q":"You'd ___ see a doctor about that cough.","o":["better","rather","best","should"],"h":"Strong advice: You'd ___ …","e":"You'd <b>better</b> see a doctor."}
      ]}
  ],
  phrasal: {
    entries:[
      {"term":"dive into","key":"into","m":"start doing something with a lot of energy","ex":"She {dived into} her new project.","ex2":"As soon as he got home, he {dived into} the new novel.","alt":["up","off","over"]},
      {"term":"turn to","key":"to","m":"go to someone or something for help","ex":"When she feels sad, she {turns to} music.","ex2":"Many people {turn to} their friends for advice.","alt":["into","up","over"]},
      {"term":"drive up","key":"up","m":"make prices go higher","ex":"The new airport has {driven up} house prices.","ex2":"Tourism is {driving up} the cost of living.","alt":["out","off","over"]},
      {"term":"price out","key":"out","m":"make something too expensive for someone","ex":"High rents are {pricing young people out} of the city.","ex2":"Many families have been {priced out} of the area.","alt":["off","up","away"]},
      {"term":"take up","key":"up","m":"start a new hobby","ex":"I've {taken up} yoga.","ex2":"He {took up} the guitar at 40.","alt":["on","in","over"]},
      {"term":"look up","key":"up","m":"find information in a book or online","ex":"If you don't know a word, {look it up}.","ex2":"I {looked up} the bus times online.","alt":["after","off","down"]},
      {"term":"come up with","key":"up","m":"think of an idea","ex":"She {came up with} a brilliant plan.","ex2":"We need to {come up with} a name for the band.","alt":["over","across","in"]},
      {"term":"put up with","key":"up","m":"accept something annoying","ex":"I can't {put up with} this noise any more.","ex2":"How do you {put up with} your noisy neighbours?","alt":["off","on","out"]},
      {"term":"break down","key":"down","m":"stop working (a machine or car)","ex":"Our car {broke down} on the motorway.","ex2":"The washing machine has {broken down} again.","alt":["up","off","out"]},
      {"term":"set up","key":"up","m":"start a business or organisation","ex":"She {set up} her own company at 25.","ex2":"They want to {set up} a reading club.","alt":["off","out","on"]},
      {"term":"carry out","key":"out","m":"do a task, a study or an experiment","ex":"Scientists {carried out} a study on sleep.","ex2":"The police will {carry out} an investigation.","alt":["on","off","over"]},
      {"term":"cut down on","key":"down","m":"do or use less of something","ex":"I'm trying to {cut down on} sugar.","ex2":"You should {cut down on} screen time.","alt":["up","off","over"]},
      {"term":"find out","key":"out","m":"discover information","ex":"I {found out} the truth yesterday.","ex2":"Can you {find out} what time the film starts?","alt":["up","off","over"]},
      {"term":"end up","key":"up","m":"finally be somewhere without planning it","ex":"We got lost and {ended up} in a tiny village.","ex2":"If you don't study, you'll {end up} failing.","alt":["out","off","over"]},
      {"term":"figure out","key":"out","m":"understand or solve something","ex":"I can't {figure out} how this app works.","ex2":"She finally {figured out} the answer.","alt":["up","off","over"]},
      {"term":"get on with","key":"on","m":"have a good relationship with someone","ex":"I {get on well with} my sister.","ex2":"Do you {get on with} your neighbours?","alt":["up","off","over"]}
    ],
    items:[
      {"type":"mc","q":"When I'm stressed, I ___ music to relax.","o":["turn to","end up","find out","break down"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>turn to</b> = go to for help."},
      {"type":"mc","q":"As soon as the book arrived, she ___ it.","o":["dived into","put up with","broke down","set up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>dive into</b> = start with energy."},
      {"type":"mc","q":"The new shopping centre has ___ local rents.","o":["driven up","figured out","come up with","ended up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>drive up</b> prices = make them higher."},
      {"type":"mc","q":"Young families are being ___ of the city centre.","o":["priced out","figured out","found out","set up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>price out</b> = make too expensive."},
      {"type":"mc","q":"My dad has ___ running. He goes every morning.","o":["taken up","put up with","broken down","cut down on"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>take up</b> = start a hobby."},
      {"type":"mc","q":"If you don't know a word, ___ in the dictionary.","o":["look it up","set it up","take it up","break it down"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>look up</b> = find information."},
      {"type":"mc","q":"We need to ___ an idea for the school project.","o":["come up with","put up with","cut down on","turn to"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>come up with</b> = think of."},
      {"type":"mc","q":"I can't ___ my brother's music any more. It's too loud!","o":["put up with","come up with","cut down on","dive into"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>put up with</b> = accept something annoying."},
      {"type":"mc","q":"Our bus ___ on the way to the airport.","o":["broke down","set up","took up","found out"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>break down</b> = stop working."},
      {"type":"mc","q":"My aunt ___ her own bakery last year.","o":["set up","broke down","found out","turned to"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>set up</b> = start a business."},
      {"type":"mc","q":"The students ___ a survey about reading habits.","o":["carried out","priced out","broke down","put up with"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>carry out</b> = do a task or study."},
      {"type":"mc","q":"I'm trying to ___ coffee. I drink too much.","o":["cut down on","come up with","put up with","dive into"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>cut down on</b> = use less."},
      {"type":"mc","q":"How did you ___ about the surprise party?","o":["find out","take up","set up","end up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>find out</b> = discover."},
      {"type":"mc","q":"We took the wrong train and ___ in Valencia.","o":["ended up","found out","set up","turned to"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>end up</b> = finally be somewhere."},
      {"type":"mc","q":"Can you help me ___ how to use this printer?","o":["figure out","put up with","end up","break down"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>figure out</b> = understand."},
      {"type":"mc","q":"Do you ___ well with your classmates?","o":["get on","set up","take up","end up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>get on (well) with</b> = have a good relationship."}
    ]
  },
  colloc: {
    entries:[
      {"term":"take action","key":"action","m":"do something to solve a problem","ex":"We need to {take action} before it's too late.","ex2":"The police {took action} quickly.","alt":["act","activity","acting"]},
      {"term":"have an impact on","key":"impact","m":"affect something strongly","ex":"Social media {has a big impact on} teenagers.","ex2":"The new law will {have an impact on} small shops.","alt":["affect","strike","hit"]},
      {"term":"broaden your horizons","key":"horizons","m":"learn about new things and ideas","ex":"Travelling {broadens your horizons}.","ex2":"Learning a language can {broaden your horizons}.","alt":["limits","borders","edges"]},
      {"term":"gain perspective","key":"perspective","m":"see a situation more clearly","ex":"A holiday can help you {gain perspective}.","ex2":"Talking to friends helped me {gain a new perspective}.","alt":["vision","sight","look"]},
      {"term":"make a habit of","key":"habit","m":"start doing something regularly","ex":"I've {made a habit of} walking to work.","ex2":"Don't {make a habit of} arriving late!","alt":["manner","use","way"]},
      {"term":"make an effort","key":"effort","m":"try hard","ex":"Please {make an effort} to arrive on time.","ex2":"She {made a real effort} with her homework.","alt":["try","work","force"]},
      {"term":"keep a promise","key":"promise","m":"do what you said you would do","ex":"It's important to {keep a promise}.","ex2":"She didn't {keep her promise}.","alt":["deal","offer","speech"]},
      {"term":"save time","key":"time","m":"use less time","ex":"Online shopping {saves time}.","ex2":"We took a taxi to {save time}.","alt":["moment","clock","period"]},
      {"term":"raise awareness","key":"awareness","m":"make people know about a problem","ex":"The campaign aims to {raise awareness} of plastic pollution.","ex2":"They organised a concert to {raise awareness} about mental health.","alt":["knowledge","notice","news"]},
      {"term":"meet a deadline","key":"deadline","m":"finish something on time","ex":"We worked all night to {meet the deadline}.","ex2":"If you don't {meet the deadline}, you'll lose points.","alt":["date","limit","end"]},
      {"term":"break a habit","key":"break","m":"stop doing something you always do","ex":"It's hard to {break a habit}.","ex2":"I want to {break the habit} of checking my phone.","alt":["cut","lose","split"]},
      {"term":"solve a problem","key":"solve","m":"find an answer to a problem","ex":"Can you help me {solve this problem}?","ex2":"We need to {solve the problem} quickly.","alt":["answer","repair","respond"]},
      {"term":"reach an agreement","key":"agreement","m":"agree after a discussion","ex":"After hours of talks, they {reached an agreement}.","ex2":"Both sides hope to {reach an agreement} soon.","alt":["agree","agreeing","accept"]},
      {"term":"do your best","key":"best","m":"try as hard as you can","ex":"Don't worry, just {do your best}.","ex2":"I {did my best} in the exam.","alt":["better","most","good"]},
      {"term":"boost the economy","key":"boost","m":"make the economy stronger","ex":"Tourism can {boost the economy}.","ex2":"The government wants to {boost the economy}.","alt":["rise","raise","increase"]},
      {"term":"create jobs","key":"jobs","m":"give people new work","ex":"The new factory will {create 200 jobs}.","ex2":"Tourism {creates jobs} for local people.","alt":["works","employs","labours"]}
    ],
    items:[
      {"type":"mc","q":"If we don't ___ soon, the river will be completely polluted.","o":["take action","keep a promise","do our best","save time"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>take action</b> = do something to solve a problem."},
      {"type":"mc","q":"Mobile phones have ___ the way we communicate.","o":["had a huge impact on","made an effort","met a deadline","saved time"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>have an impact on</b> = affect strongly."},
      {"type":"mc","q":"Living abroad really ___. You learn so much.","o":["broadens your horizons","meets a deadline","solves a problem","keeps a promise"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>broaden your horizons</b>."},
      {"type":"mc","q":"Taking a break from work helped him ___.","o":["gain perspective","reach an agreement","raise awareness","create jobs"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>gain perspective</b> = see things more clearly."},
      {"type":"mc","q":"She has ___ reading for 20 minutes every night.","o":["made a habit of","kept a promise","met a deadline","broken a habit"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>make a habit of</b> + -ing."},
      {"type":"mc","q":"If you want to improve, you have to ___.","o":["make an effort","create jobs","boost the economy","reach an agreement"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>make an effort</b> = try hard."},
      {"type":"mc","q":"You said you would help me. Please ___.","o":["keep your promise","save time","raise awareness","meet the deadline"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>keep a promise</b>."},
      {"type":"mc","q":"Let's take the motorway to ___.","o":["save time","raise awareness","reach an agreement","broaden your horizons"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>save time</b>."},
      {"type":"mc","q":"The charity runs a campaign to ___ of homelessness.","o":["raise awareness","make a habit","gain perspective","do your best"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>raise awareness</b> of."},
      {"type":"mc","q":"I finished the essay at midnight, just in time to ___.","o":["meet the deadline","break a habit","keep a promise","boost the economy"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>meet a deadline</b>."},
      {"type":"mc","q":"Biting your nails is a bad habit. It's difficult to ___.","o":["break the habit","meet the deadline","create jobs","reach an agreement"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>break a habit</b> = stop doing it."},
      {"type":"mc","q":"The engineer worked all day to ___ with the heating.","o":["solve the problem","reach an agreement","raise awareness","keep a promise"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>solve a problem</b>."},
      {"type":"mc","q":"After a long discussion, the two companies ___.","o":["reached an agreement","broke a habit","created jobs","boosted the economy"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>reach an agreement</b>."},
      {"type":"mc","q":"Don't worry about the result. Just ___.","o":["do your best","save time","create jobs","meet a deadline"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>do your best</b>."},
      {"type":"mc","q":"The new stadium will ___ for 300 local people.","o":["create jobs","boost the economy","raise awareness","solve a problem"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>create jobs</b> for."},
      {"type":"mc","q":"Lower taxes can help to ___.","o":["boost the economy","keep a promise","meet a deadline","break a habit"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>boost the economy</b>."}
    ]
  },
  fixed: {
    entries:[
      {"term":"cope with","key":"with","m":"deal successfully with a difficult situation","ex":"She {copes with} stress by doing yoga.","ex2":"How do you {cope with} so much homework?","alt":["to","for","at"]},
      {"term":"lead to","key":"to","m":"cause","ex":"Too much screen time can {lead to} sleep problems.","ex2":"The mistake {led to} a serious accident.","alt":["in","at","for"]},
      {"term":"demand for","key":"for","m":"how much people want something","ex":"There is a high {demand for} electric cars.","ex2":"The {demand for} tickets was huge.","alt":["of","on","to"]},
      {"term":"rely on","key":"on","m":"need and trust someone or something","ex":"You can always {rely on} me.","ex2":"Many people {rely on} their phones.","alt":["in","to","at"]},
      {"term":"in common","key":"common","m":"shared interests or qualities","ex":"My sister and I have a lot {in common}.","ex2":"We don't have much {in common}.","alt":["same","similar","equal"]},
      {"term":"on average","key":"on","m":"usually; the normal amount","ex":"People check their phones 90 times a day {on average}.","ex2":"The journey takes two hours {on average}.","alt":["in","at","by"]},
      {"term":"at risk","key":"at","m":"in danger","ex":"These animals are {at risk} of disappearing.","ex2":"Children who don't sleep enough are {at risk}.","alt":["in","on","under"]},
      {"term":"in addition to","key":"addition","m":"as well as","ex":"{In addition to} English, she speaks Italian.","ex2":"{In addition to} the price, you pay a tax.","alt":["add","adding","plus"]},
      {"term":"according to","key":"According","m":"as said by","ex":"{According to} the news, it will snow.","ex2":"{According to} my teacher, the test is easy.","alt":["Regarding","Depending","Following"]},
      {"term":"instead of","key":"instead","m":"in the place of","ex":"Let's walk {instead of} taking the bus.","ex2":"I had tea {instead of} coffee.","alt":["rather","except","besides"]},
      {"term":"in favour of","key":"favour","m":"supporting an idea","ex":"Most students are {in favour of} longer holidays.","ex2":"I'm not {in favour of} the new rules.","alt":["support","agree","side"]},
      {"term":"on time","key":"on","m":"at the correct time","ex":"The train arrived {on time}.","ex2":"Please hand in your homework {on time}.","alt":["at","by","with"]},
      {"term":"at first","key":"at","m":"at the beginning","ex":"I didn't like the city {at first}.","ex2":"It was difficult {at first}, but it got easier.","alt":["in","on","by"]},
      {"term":"for instance","key":"for","m":"for example","ex":"Some fruits, {for instance} oranges, have a lot of vitamin C.","ex2":"There are many ways to save money: cooking at home, {for instance}.","alt":["in","by","as"]},
      {"term":"out of date","key":"out","m":"old; not modern or not valid","ex":"This map is {out of date}.","ex2":"Your passport is {out of date}.","alt":["off","over","past"]},
      {"term":"by chance","key":"by","m":"without planning it","ex":"We met {by chance} at the station.","ex2":"I found the café {by chance}.","alt":["in","on","with"]}
    ],
    items:[
      {"type":"mc","q":"She ___ stress by going for long walks.","o":["copes with","leads to","relies on","depends on"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>cope with</b> a difficult situation."},
      {"type":"mc","q":"Eating too much sugar can ___ health problems.","o":["lead to","cope with","rely on","be in favour of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>lead to</b> = cause."},
      {"type":"mc","q":"There's a growing ___ online classes.","o":["demand for","instead of","according to","in favour of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>demand for</b>."},
      {"type":"mc","q":"My best friend and I have a lot ___.","o":["in common","on average","at risk","by chance"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in common</b>."},
      {"type":"mc","q":"___, teenagers sleep seven hours a night.","o":["On average","In common","At risk","Out of date"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>on average</b>."},
      {"type":"mc","q":"Polar bears are ___ because the ice is melting.","o":["at risk","in common","on time","by chance"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at risk</b> = in danger."},
      {"type":"mc","q":"___ the main course, there's a dessert and coffee.","o":["In addition to","According to","In common","On average"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in addition to</b> = as well as."},
      {"type":"mc","q":"___ the weather forecast, it's going to be sunny.","o":["According to","In addition to","Instead of","In favour of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>according to</b>."},
      {"type":"mc","q":"Why don't we cycle ___ taking the car?","o":["instead of","according to","in addition to","out of date"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>instead of</b> + -ing."},
      {"type":"mc","q":"Most parents are ___ the new school timetable.","o":["in favour of","instead of","according to","out of date"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in favour of</b> = supporting."},
      {"type":"mc","q":"The plane landed ___, at exactly 6 o'clock.","o":["on time","at first","by chance","at risk"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>on time</b>."},
      {"type":"mc","q":"___ I found the work hard, but now I enjoy it.","o":["At first","On time","By chance","For instance"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at first</b> = at the beginning."},
      {"type":"mc","q":"Some sports, ___ tennis, can be played all year.","o":["for instance","at first","by chance","on average"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>for instance</b> = for example."},
      {"type":"mc","q":"Don't use that guidebook. It's ___.","o":["out of date","on time","in common","by chance"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>out of date</b> = old."},
      {"type":"mc","q":"We didn't plan it. We met ___ in a café.","o":["by chance","on time","at first","on average"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>by chance</b>."},
      {"type":"mc","q":"You can always ___ me. I'll never let you down.","o":["rely on","cope with","lead to","demand for"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>rely on</b>."}
    ]
  }
};

const CLASS_2026_10_28 = {
  date: "2026-10-28",
  grammar: [
    { id:"rel", title:"Relative clauses",
      explain:`
<section><h3>Defining</h3>
<p>Says WHICH person or thing.</p>
<p class="exs">The girl <b>who sits next to me</b> is Italian.</p>
<ul><li>No commas.</li><li>You can use <b>that</b>.</li><li>Object? You can drop the pronoun:<br><i>The film (that) we saw was great.</i></li></ul></section>
<section><h3>Non-defining</h3>
<p>Extra information.</p>
<p class="exs">My sister, <b>who lives in Paris</b>, is a nurse.</p>
<ul><li>Always between commas.</li><li>Never <b>that</b>.</li><li>Never drop the pronoun.</li></ul></section>
<section><h3>Which pronoun?</h3>
<dl class="pairs">
<dt>who</dt><dd>people<i>the man who called</i></dd>
<dt>which</dt><dd>things, animals<i>the bike which I bought</i></dd>
<dt>that</dt><dd>people or things · defining only<i>the book that you lent me</i></dd>
<dt>whose</dt><dd>possession<i>the girl whose phone was stolen</i></dd>
<dt>where</dt><dd>places<i>the town where I grew up</i></dd>
<dt>when</dt><dd>times<i>the day when we met</i></dd>
<dt>whom</dt><dd>people after a preposition<i>the people to whom I spoke</i></dd>
</dl></section>
<section><h3>which = the whole idea</h3>
<p>It can refer to everything before it.</p>
<p class="exs">He failed the exam, <b>which</b> surprised everyone.</p>
<p>Always after a comma.</p></section>
<section><h3>With prepositions</h3>
<p class="exs">the house (which) I live <b>in</b> → informal</p>
<p class="exs">the house <b>in which</b> I live → formal</p>
<p class="exs">30 students, <b>most of whom</b> were Italian</p></section>`,
      items:[
        {"type":"mc","q":"The woman ___ helped me was really kind.","o":["who","which","whose","where"],"h":"A person.","e":"<b>who</b> for people."},
        {"type":"mc","q":"This is the restaurant ___ we had our first date.","o":["where","which","who","whose"],"h":"A place + full clause.","e":"<b>where</b>."},
        {"type":"mc","q":"I have a friend ___ father is a famous chef.","o":["whose","who","who's","which"],"h":"The father belongs to the friend.","e":"<b>whose</b> father."},
        {"type":"mc","q":"My bike, ___ I bought second-hand, is very fast.","o":["which","that","what","who"],"h":"Commas + thing.","e":"Non-defining → <b>which</b>."},
        {"type":"mc","q":"He forgot to call his mum, ___ upset her a lot.","o":["which","that","what","it"],"h":"The relative refers to the whole first idea.","e":"Whole-clause <b>which</b>."},
        {"type":"mc","q":"The bus broke down, ___ meant we arrived two hours late.","o":["which","that","what","so"],"h":"Comma + refers to the whole event.","e":"<b>which</b> meant…"},
        {"type":"mc","q":"She has written four novels, two of ___ have won prizes.","o":["which","them","that","whom"],"h":"Preposition + ? for things.","e":"two of <b>which</b>."},
        {"type":"mc","q":"I'll never forget the day ___ I passed my driving test.","o":["when","which","where","whose"],"h":"Time.","e":"the day <b>when</b>."},
        {"type":"mc","q":"The people ___ we spoke to were very helpful.","o":["who","whose","which","what"],"h":"People, defining clause.","e":"<b>who</b> (also: that, whom)."},
        {"type":"mc","q":"The library has thousands of books, most of ___ are in English.","o":["which","whom","them","that"],"h":"most of + ? for things.","e":"most of <b>which</b>."},
        {"type":"mc","q":"The man ___ lives next door is a firefighter.","o":["who","which","whose","where"],"h":"A person, no commas.","e":"<b>who / that</b>."},
        {"type":"mc","q":"That's the shop ___ I bought my trainers.","o":["where","which","who","whose"],"h":"A place.","e":"<b>where</b>."},
        {"type":"mc","q":"I met a girl ___ brother plays for Barcelona.","o":["whose","who","who's","which"],"h":"Possession.","e":"<b>whose</b>."},
        {"type":"mc","q":"Our flight was cancelled, ___ was really annoying.","o":["which","that","what","who"],"h":"Refers to the whole previous idea.","e":"<b>which</b>."},
        {"type":"mc","q":"Paris, ___ is the capital of France, is visited by millions.","o":["which","that","what","where"],"h":"Commas + thing.","e":"<b>which</b> (never 'that' with commas)."},
        {"type":"mc","q":"The phone takes only an hour to charge, ___ is very convenient.","o":["which","that","what","it"],"h":"Comment on the whole idea.","e":"<b>which</b>."},
        {"type":"mc","q":"There were 30 students, most of ___ came from Italy.","o":["whom","who","them","which"],"h":"Preposition + people.","e":"most of <b>whom</b>."},
        {"type":"mc","q":"2020 was the year in ___ everything changed.","o":["which","that","when","what"],"h":"Preposition + ? (thing).","e":"in <b>which</b>."},
        {"type":"mc","q":"She missed the last bus, ___ meant she had to walk home.","o":["which","that","what","so"],"h":"A relative that refers to the whole first part of the sentence.","e":"<b>which</b> = the fact that she missed the bus."},
        {"type":"mc","q":"The concert was cancelled, ___ disappointed thousands of fans.","o":["which","that","what","it"],"h":"After a comma, referring to the whole event.","e":"<b>which</b>. <i>That</i> can't follow a comma."}
      ]},
    { id:"part", title:"Reduced relative clauses",
      explain:`
<section><h3>What are they?</h3>
<p>Short relative clauses.</p>
<p>We remove <b>who / which / that + be</b>.</p></section>
<section><h3>Active → -ing</h3>
<p class="exs">the man <s>who is</s> <b>standing</b> there</p>
<p class="exs">anyone <s>who wants</s> <b>wanting</b> to join</p></section>
<section><h3>Passive → past participle</h3>
<p class="exs">the photos <s>that were</s> <b>taken</b> in Rome</p>
<p class="exs">the money <s>which was</s> <b>raised</b></p></section>
<section><h3>Learn these</h3>
<dl class="pairs">
<dt>left</dt><dd>= remaining<i>There's no milk left.</i></dd>
<dt>involved</dt><dd><i>the people involved</i></dd>
<dt>mentioned</dt><dd><i>the problems mentioned</i></dd>
</dl></section>
<section><h3>first / last / only + to</h3>
<p class="exs">She was the first person <b>to arrive</b>.</p></section>
<section><h3>Careful</h3>
<p class="exs no">The girl stayed at home is my sister. ✗</p>
<p class="exs">The girl <b>who stayed</b> at home is my sister. ✓</p></section>`,
      items:[
        {"type":"mc","q":"The girl ___ in the corner is my sister.","o":["standing","stood","stands","is standing"],"h":"Active, shortened.","e":"girl <b>standing</b>."},
        {"type":"mc","q":"I love the photos ___ at your wedding.","o":["taken","taking","took","take"],"h":"The photos were taken.","e":"photos <b>taken</b> – passive."},
        {"type":"mc","q":"There's only one sandwich ___ – do you want it?","o":["left","remained","stayed","kept"],"h":"= remaining.","e":"one sandwich <b>left</b>."},
        {"type":"mc","q":"Anyone ___ to join the club should email the teacher.","o":["wanting","wanted","wants","want"],"h":"Active: people who want.","e":"anyone <b>wanting</b> = anyone who wants."},
        {"type":"mc","q":"The car ___ outside belongs to my neighbour.","o":["parked","parking","park","is parked"],"h":"The car was parked (by someone).","e":"car <b>parked</b> outside."},
        {"type":"mc","q":"There are only two teams ___ in the competition now.","o":["left","remained","stayed","kept"],"h":"Only one of these works as a participle with this meaning.","e":"two teams <b>left</b> = remaining."},
        {"type":"mc","q":"The problems ___ in the report are quite serious.","o":["mentioned","mentioning","mention","mentions"],"h":"The problems were mentioned.","e":"problems <b>mentioned</b>."},
        {"type":"mc","q":"All the people ___ in the accident were taken to hospital.","o":["involved","involving","involve","involves"],"h":"Fixed: people ___ (= who were part of it).","e":"people <b>involved</b>."},
        {"type":"mc","q":"The bridge ___ the two towns was opened in 1995.","o":["connecting","connected","connects","is connecting"],"h":"The bridge connects them (active).","e":"bridge <b>connecting</b>."},
        {"type":"mc","q":"Students ___ to take part in the trip must pay by Friday.","o":["hoping","hoped","hope","are hoping"],"h":"Active: students who hope.","e":"students <b>hoping</b>."},
        {"type":"mc","q":"Is there any coffee ___ or did you drink it all?","o":["left","remained","stayed","kept"],"h":"= remaining.","e":"any coffee <b>left</b>."},
        {"type":"mc","q":"The man ___ to my mum is my teacher.","o":["talking","talked","talks","is talking"],"h":"Active, -ing form of 'talk'.","e":"<b>talking</b>."},
        {"type":"mc","q":"The dress ___ by the singer was sold for €10,000.","o":["worn","wearing","wore","wears"],"h":"Passive: past participle of 'wear'.","e":"<b>worn</b>."},
        {"type":"mc","q":"The books ___ on the table are mine.","o":["lying","lain","lie","lay"],"h":"Active, -ing form of 'lie'.","e":"<b>lying</b>."},
        {"type":"mc","q":"Only three teams are ___ in the competition now.","o":["left","remained","stayed","kept"],"h":"= still remaining.","e":"<b>left</b>."},
        {"type":"mc","q":"The money ___ from the concert will go to charity.","o":["raised","raising","rose","raises"],"h":"The money was raised.","e":"<b>raised</b>."},
        {"type":"mc","q":"The workers ___ in the project had to stay late.","o":["involved","involving","involve","involves"],"h":"People who were part of it.","e":"<b>involved</b>."},
        {"type":"mc","q":"Visitors ___ the museum must leave their bags at reception.","o":["entering","entered","enter","enters"],"h":"Active: visitors who enter.","e":"<b>entering</b>."},
        {"type":"mc","q":"There were only three cakes ___ when we arrived.","o":["left","remained","stayed","kept"],"h":"Which word can mean 'remaining' after a noun?","e":"three cakes <b>left</b>."},
        {"type":"mc","q":"All the food ___ after the party went to a local charity.","o":["left","remained","stayed","kept"],"h":"The food that was still there.","e":"the food <b>left</b> (also: remaining)."}
      ]},
    { id:"pass", title:"The passive",
      explain:`
<section><h3>When?</h3>
<ul><li>The action is more important than the person.</li><li>We don't know who did it.</li></ul></section>
<section><h3>be + past participle</h3>
<dl class="pairs">
<dt>present</dt><dd>is / are <b>made</b></dd>
<dt>present cont.</dt><dd>is / are <b>being made</b></dd>
<dt>past</dt><dd>was / were <b>made</b></dd>
<dt>past cont.</dt><dd>was / were <b>being made</b></dd>
<dt>present perfect</dt><dd>has / have <b>been made</b></dd>
<dt>past perfect</dt><dd>had <b>been made</b></dd>
<dt>future</dt><dd>will <b>be made</b></dd>
<dt>modals</dt><dd>can / must <b>be made</b></dd>
</dl>
<p>Who did it? Add <b>by</b>.</p>
<p class="exs">The book was written <b>by</b> a teenager.</p></section>
<section><h3>It is said that…</h3>
<p>With: say, believe, think, expect, know.</p>
<p class="exs"><b>It is said that</b> he is rich.</p>
<p class="exs"><b>He is said to be</b> rich. → now</p>
<p class="exs"><b>He is said to have earned</b> millions. → past</p></section>
<section><h3>have something done</h3>
<p>Someone else does it for you.</p>
<p class="exs">I <b>had my hair cut</b>.</p></section>
<section><h3>Fixed passives</h3>
<ul><li>be born</li><li>be made of</li><li>be supposed to</li><li>be knocked out of (a competition)</li></ul></section>`,
      items:[
        {"type":"mc","q":"English ___ spoken all over the world.","o":["is","are","has","does"],"h":"Singular subject, present.","e":"<b>is</b> spoken."},
        {"type":"mc","q":"The castle was ___ in the 12th century.","o":["built","build","building","builded"],"h":"Past participle.","e":"was <b>built</b>."},
        {"type":"mc","q":"The results will ___ announced on Friday.","o":["be","been","being","is"],"h":"will + ?","e":"will <b>be</b> announced."},
        {"type":"mc","q":"It is ___ that the new park will open in May.","o":["expected","expecting","expect","expects"],"h":"It is + past participle + that.","e":"It is <b>expected</b> that."},
        {"type":"mc","q":"My bike has ___ stolen!","o":["been","be","being","was"],"h":"has + ? + past participle.","e":"has <b>been</b> stolen."},
        {"type":"mc","q":"It is widely ___ that exercise improves your mood.","o":["believed","believing","belief","believe"],"h":"Reporting verb in the passive.","e":"It is widely <b>believed</b>."},
        {"type":"mc","q":"Spain were ___ out of the tournament in the semi-final.","o":["knocked","beaten","lost","pushed"],"h":"Fixed phrase: be ___ out of a competition.","e":"be <b>knocked out of</b> = be eliminated."},
        {"type":"mc","q":"The singer is thought ___ millions from her last tour.","o":["to have earned","to earn","earning","that she earned"],"h":"is thought + to + PAST action.","e":"is thought <b>to have earned</b> – past."},
        {"type":"mc","q":"Students ___ supposed to switch off their phones in class.","o":["are","have","do","get"],"h":"be supposed to.","e":"are <b>supposed</b> to."},
        {"type":"mc","q":"The road ___ repaired since last winter.","o":["hasn't been","wasn't","isn't being","didn't"],"h":"'since' → present perfect.","e":"<b>hasn't been</b> repaired since…"},
        {"type":"mc","q":"This cake ___ made by my grandmother yesterday.","o":["was","has","is","did"],"h":"Past passive.","e":"<b>was</b> made."},
        {"type":"mc","q":"Cars ___ made in this factory since 1970.","o":["have been","were","are","had"],"h":"since → present perfect: ___ been made.","e":"<b>have</b> been made."},
        {"type":"mc","q":"The winner will ___ given a prize of €500.","o":["be","been","being","is"],"h":"will + ?","e":"will <b>be</b> given."},
        {"type":"mc","q":"It ___ said that the house is haunted.","o":["is","has","does","says"],"h":"Impersonal passive, present.","e":"It <b>is</b> said that."},
        {"type":"mc","q":"The roads are ___ cleaned right now, so you can't park here.","o":["being","been","be","having"],"h":"Continuous passive.","e":"are <b>being</b> cleaned."},
        {"type":"mc","q":"It ___ predicted that prices will rise next year.","o":["is","has","does","are"],"h":"It ___ predicted that…","e":"It <b>is</b> predicted (also: was / has been)."},
        {"type":"mc","q":"The actor is believed ___ be living in Australia now.","o":["to","that","for","of"],"h":"is believed + ? + infinitive.","e":"is believed <b>to</b> be."},
        {"type":"mc","q":"Our school team was knocked ___ of the cup in the first round.","o":["out","off","down","over"],"h":"be knocked ___ of.","e":"knocked <b>out</b> of."},
        {"type":"mc","q":"It ___ expected that the new metro line will open next spring.","o":["is","has","does","was being"],"h":"It + be + past participle + that.","e":"It <b>is</b> expected that."},
        {"type":"mc","q":"It is ___ that the castle was built by the Romans.","o":["believed","believing","believe","belief"],"h":"Past participle of the verb in brackets.","e":"It is <b>believed</b> that."},
        {"type":"mc","q":"Our team was ___ out of the cup by a much smaller club.","o":["knocked","hit","banned","taken"],"h":"be ___ out of a competition = be eliminated.","e":"be <b>knocked out</b> of."}
      ]},
    { id:"link", title:"Linkers",
      explain:`
<section><h3>First: what comes after?</h3>
<dl class="pairs">
<dt>clause</dt><dd>subject + verb<i>because <b>it was</b> raining</i></dd>
<dt>noun / -ing</dt><dd><i>because of <b>the rain</b></i></dd>
</dl></section>
<section><h3>Cause</h3>
<dl class="pairs">
<dt>+ clause</dt><dd>because · as · since</dd>
<dt>+ noun</dt><dd>because of · due to · owing to</dd>
</dl>
<p class="exs">We stayed in <b>because</b> it was raining.</p>
<p class="exs">The match was cancelled <b>due to</b> the rain.</p>
<p><b>thanks to</b> = because of, but positive.</p></section>
<section><h3>Contrast</h3>
<dl class="pairs">
<dt>+ clause</dt><dd>although · though · even though</dd>
<dt>+ noun</dt><dd>despite · in spite of</dd>
</dl>
<p class="exs"><b>Although</b> it was cold, we swam.</p>
<p class="exs"><b>Despite</b> the cold, we swam.</p></section>
<section><h3>Two sentences</h3>
<p><b>However, · Nevertheless, · On the other hand,</b></p>
<p>New sentence + comma.</p>
<p class="exs">It was cheap. <b>However,</b> it broke in a week.</p></section>
<section><h3>Result</h3>
<p>so · therefore · as a result</p>
<p class="exs">It was <b>so</b> cold <b>that</b> we stayed in.</p></section>
<section><h3>Purpose</h3>
<dl class="pairs">
<dt>+ verb</dt><dd>to · in order to<i>I left early <b>to</b> catch the bus.</i></dd>
<dt>+ clause</dt><dd>so that<i>I left early <b>so that</b> I could catch the bus.</i></dd>
</dl></section>`,
      items:[
        {"type":"mc","q":"We couldn't play tennis ___ the rain.","o":["because of","because","although","so"],"h":"'the rain' = noun.","e":"<b>because of</b> + noun."},
        {"type":"mc","q":"I went to bed early ___ I was very tired.","o":["because","because of","due to","despite"],"h":"Subject + verb after the gap.","e":"<b>because</b> + clause."},
        {"type":"mc","q":"___ it was expensive, they bought the car.","o":["Although","Despite","Because of","However"],"h":"Contrast + clause.","e":"<b>Although</b> + clause."},
        {"type":"mc","q":"___ the cold, the children played outside all afternoon.","o":["Despite","Although","Because","Even though"],"h":"Contrast + noun.","e":"<b>Despite</b> + noun."},
        {"type":"mc","q":"The museum is closed ___ repairs to the roof.","o":["due to","because","since","although"],"h":"'repairs' = noun.","e":"<b>due to</b> + noun."},
        {"type":"mc","q":"___ to the volunteers, the festival was a huge success.","o":["Thanks","Due","Owing","Because"],"h":"Positive result, and the gap is followed by 'to'.","e":"<b>Thanks to</b> – positive cause."},
        {"type":"mc","q":"The train was delayed ___ a technical problem.","o":["owing to","because","even though","so that"],"h":"'a technical problem' = noun.","e":"<b>owing to</b> + noun."},
        {"type":"mc","q":"In ___ of the noise, I managed to sleep.","o":["spite","despite","although","even"],"h":"In ___ of = despite.","e":"In <b>spite</b> of."},
        {"type":"mc","q":"The hotel was lovely. ___, the food was disappointing.","o":["However","Although","Despite","Because"],"h":"New sentence, contrast, followed by a comma.","e":"<b>However,</b> + new sentence."},
        {"type":"mc","q":"___ he had trained hard, he didn't win the race.","o":["Even though","In spite of","Due to","Because of"],"h":"Clause after the gap.","e":"<b>Even though</b> + clause."},
        {"type":"mc","q":"I didn't go to school yesterday ___ I had a fever.","o":["because","because of","due to","despite"],"h":"Cause + clause.","e":"<b>because / as / since</b>."},
        {"type":"mc","q":"The match was cancelled because ___ the snow.","o":["of","to","for","from"],"h":"because ___ + noun.","e":"because <b>of</b>."},
        {"type":"mc","q":"___ she studied a lot, she failed the exam.","o":["Although","Despite","However","Because of"],"h":"Contrast + clause (one word).","e":"<b>Although / Though</b>."},
        {"type":"mc","q":"The flight was delayed due ___ bad weather.","o":["to","of","for","by"],"h":"due ___ + noun.","e":"due <b>to</b>."},
        {"type":"mc","q":"We enjoyed the trip ___ the long queues.","o":["despite","although","even though","however"],"h":"Contrast + noun (one word).","e":"<b>despite</b>."},
        {"type":"mc","q":"The concert was cancelled ___ to the singer's illness.","o":["due","because","since","thanks"],"h":"Cause + to + noun (negative).","e":"<b>due / owing</b> to."},
        {"type":"mc","q":"In spite ___ feeling nervous, she gave a brilliant speech.","o":["of","to","for","from"],"h":"In spite ___ + -ing.","e":"In spite <b>of</b>."},
        {"type":"mc","q":"The phone is cheap. ___, the battery doesn't last long.","o":["However","Although","Despite","Even though"],"h":"New sentence, contrast, comma.","e":"<b>However</b>,"},
        {"type":"mc","q":"The road was closed ___ to a serious accident.","o":["due","because","since","thanks"],"h":"Which word goes with 'to + noun' for a negative cause?","e":"<b>due to</b> + noun. <i>Thanks to</i> is for positive results."},
        {"type":"mc","q":"The match was postponed ___ to heavy snow.","o":["owing","because","since","despite"],"h":"One word before 'to' that means 'because of'.","e":"<b>due / owing</b> to."}
      ]},
    { id:"deg", title:"Degree words: enough, too, so, such",
      explain:`
<section><h3>Before an adjective</h3>
<p class="scale">a bit → fairly → quite → very → extremely</p>
<p class="exs"><b>fairly</b> easy · <b>reasonably</b> fit</p>
<p>Strong adjectives → <b>absolutely</b></p>
<p class="exs"><b>absolutely</b> amazing ✓ · very amazing ✗</p></section>
<section><h3>Before a comparative</h3>
<p>much · far · a lot · a bit</p>
<p class="exs"><b>much</b> cheaper ✓ · very cheaper ✗</p></section>
<section><h3>Before a number</h3>
<p>about · around · roughly · nearly · over</p>
<p class="exs"><b>about</b> 20 km</p></section>
<section><h3>enough</h3>
<dl class="pairs">
<dt>adjective + enough</dt><dd><i>old <b>enough</b></i></dd>
<dt>enough + noun</dt><dd><i><b>enough</b> time</i></dd>
</dl></section>
<section><h3>too</h3>
<dl class="pairs">
<dt>too + adjective</dt><dd><i><b>too</b> hot to drink</i></dd>
<dt>too much</dt><dd>+ uncountable<i>too much sugar</i></dd>
<dt>too many</dt><dd>+ countable<i>too many people</i></dd>
</dl></section>
<section><h3>so / such</h3>
<dl class="pairs">
<dt>so</dt><dd>+ adjective<i><b>so</b> tired</i></dd>
<dt>such a</dt><dd>+ adjective + noun<i><b>such a</b> long day</i></dd>
</dl>
<p class="exs">It was <b>so</b> cold <b>that</b> we stayed in.</p></section>`,
      items:[
        {"type":"mc","q":"Is the water warm ___ to swim in?","o":["enough","too","so","very"],"h":"Position: after the adjective.","e":"warm <b>enough</b> to swim."},
        {"type":"mc","q":"The bag weighs ___ 15 kilos.","o":["about","fairly","quite","enough"],"h":"There's a number.","e":"<b>about</b> 15 kilos."},
        {"type":"mc","q":"It was ___ cold that we stayed inside all day.","o":["so","such","too","enough"],"h":"Adjective alone + that.","e":"<b>so</b> cold that…"},
        {"type":"mc","q":"We had ___ a great time at the party!","o":["such","so","too","very"],"h":"a + adjective + noun.","e":"<b>such</b> a great time."},
        {"type":"mc","q":"He's ___ young to watch that film – it's for over-18s.","o":["too","enough","such","so"],"h":"There's a problem: he can't watch it.","e":"<b>too</b> young to…"},
        {"type":"mc","q":"You don't need to be a professional, but you must be ___ good at swimming.","o":["reasonably","approximately","enough","about"],"h":"Degree adverb before an adjective.","e":"<b>reasonably</b> good = fairly good."},
        {"type":"mc","q":"There weren't ___ chairs for everyone, so some people stood.","o":["enough","too","so","such"],"h":"Before a noun.","e":"<b>enough</b> + noun."},
        {"type":"mc","q":"The castle is ___ 800 years old.","o":["roughly","fairly","rather","pretty"],"h":"Number again.","e":"<b>roughly</b> = about, with numbers."},
        {"type":"mc","q":"The exam was ___ easier than I expected.","o":["much","very","so","too"],"h":"Which word can go before a comparative (-er)?","e":"<b>much / far / a lot</b> + comparative. Not <i>very</i>."},
        {"type":"mc","q":"The instructions were ___ complicated that nobody understood them.","o":["so","such","too","enough"],"h":"Adjective + that, no noun.","e":"<b>so</b> complicated that."},
        {"type":"mc","q":"I can't reach the top shelf. I'm not tall ___.","o":["enough","too","so","such"],"h":"Adjective + ?","e":"tall <b>enough</b>."},
        {"type":"mc","q":"It was ___ a long journey that the children fell asleep.","o":["such","so","too","very"],"h":"a + adjective + noun + that.","e":"<b>such</b> a long journey."},
        {"type":"mc","q":"This coffee is ___ strong for me – can I have some milk?","o":["too","enough","such","so much"],"h":"More than I like.","e":"<b>too</b> strong."},
        {"type":"mc","q":"The concert was ___ loud that my ears hurt.","o":["so","such","too","enough"],"h":"Adjective + that.","e":"<b>so</b> loud that."},
        {"type":"mc","q":"Have we got ___ time to visit the museum before lunch?","o":["enough","too","so","such"],"h":"Before a noun.","e":"<b>enough</b> time."},
        {"type":"mc","q":"The hotel was ___ cheaper than the one we stayed in last year.","o":["much","very","so","too"],"h":"An intensifier before a comparative.","e":"<b>much / far</b> cheaper."},
        {"type":"mc","q":"The new stadium can hold ___ 60,000 people.","o":["about","fairly","quite","enough"],"h":"A word that goes before a number.","e":"<b>about / around / approximately</b> 60,000."},
        {"type":"mc","q":"She was ___ tired to finish her homework, so she went to bed.","o":["too","so","such","enough"],"h":"too + adj + to.","e":"<b>too</b> tired to."},
        {"type":"mc","q":"You don't need to be an expert, but you should be ___ confident with computers.","o":["fairly","about","enough","approximately"],"h":"A degree word before an adjective.","e":"<b>fairly</b> confident. <i>About</i> goes with numbers; <i>enough</i> goes after."},
        {"type":"mc","q":"The bridge is ___ 300 metres long.","o":["roughly","fairly","reasonably","enough"],"h":"There's a number.","e":"<b>roughly</b> = about, with numbers."},
        {"type":"mc","q":"He isn't old ___ to drive yet.","o":["enough","too","so","such"],"h":"Adjective + ?","e":"old <b>enough</b>."}
      ]}
  ],
  phrasal: {
    entries:[
      {"term":"turn up","key":"up","m":"arrive, often late or unexpectedly","ex":"Only six people {turned up} to the meeting.","ex2":"Hundreds of fans {turned up} at the airport to see the band.","alt":["over","into","across"]},
      {"term":"turn back","key":"back","m":"return the way you came","ex":"It started snowing, so the climbers {turned back}.","ex2":"We had to {turn back} because the path was flooded.","alt":["up","over","into"]},
      {"term":"turn out (to be)","key":"out","m":"prove to be, in the end","ex":"The quiz {turned out} to be harder than we thought.","ex2":"The new teacher {turned out} to be really friendly.","alt":["up","over","down"]},
      {"term":"turn down","key":"down","m":"refuse an offer","ex":"She {turned down} the job because the pay was low.","ex2":"He {turned down} the invitation because he was busy.","alt":["up","off","out"]},
      {"term":"be knocked out (of)","key":"out","m":"be eliminated from a competition","ex":"Our team {was knocked out} in the first round.","ex2":"Italy {were knocked out} of the World Cup by a small team.","alt":["off","down","over"]},
      {"term":"carry on","key":"on","m":"continue","ex":"The rain stopped, so we {carried on} playing.","ex2":"Don't stop. {Carry on} reading until the end of the page.","alt":["out","off","over"]},
      {"term":"turn into","key":"into","m":"change and become something different","ex":"The small café {turned into} a famous restaurant.","ex2":"In winter the lake {turns into} an ice rink.","alt":["out","up","over"]},
      {"term":"take over","key":"over","m":"take control of something","ex":"A big company {took over} the local supermarket.","ex2":"When the coach got ill, his assistant {took over}.","alt":["up","off","in"]},
      {"term":"set off","key":"off","m":"start a journey","ex":"We {set off} at 6 a.m. to avoid the traffic.","ex2":"They {set off} for the mountains after breakfast.","alt":["up","down","over"]},
      {"term":"give up","key":"up","m":"stop doing something / stop trying","ex":"He {gave up} sugar for a month.","ex2":"Don't {give up}! You're nearly there.","alt":["off","over","down"]},
      {"term":"put off","key":"off","m":"postpone; do it later","ex":"They {put off} the meeting until Friday.","ex2":"Stop {putting off} your homework!","alt":["up","over","in"]},
      {"term":"run out of","key":"out","m":"have no more of something","ex":"We've {run out of} milk.","ex2":"The car {ran out of} petrol on the motorway.","alt":["off","over","down"]},
      {"term":"look into","key":"into","m":"investigate","ex":"The police are {looking into} the robbery.","ex2":"The school will {look into} the complaint.","alt":["after","up","out"]},
      {"term":"come across","key":"across","m":"find by chance","ex":"I {came across} some old photos in the attic.","ex2":"She {came across} a great café near the station.","alt":["over","up","out"]},
      {"term":"call off","key":"off","m":"cancel","ex":"The concert was {called off} because of the storm.","ex2":"They {called off} the wedding.","alt":["out","up","on"]},
      {"term":"get over","key":"over","m":"recover from something","ex":"It took her weeks to {get over} the flu.","ex2":"He still hasn't {got over} the break-up.","alt":["off","out","up"]}
    ],
    items:[
      {"type":"mc","q":"Guess who ___ up at my door last night? My cousin from Canada!","o":["turned","put","gave","took"],"h":"A phrasal verb meaning 'arrived'.","e":"<b>turn up</b> = arrive, often unexpectedly."},
      {"type":"mc","q":"We had to turn ___ halfway because the road was blocked.","o":["back","out","up","down"],"h":"They returned the way they came.","e":"<b>turn back</b> = go back."},
      {"type":"mc","q":"The forecast was wrong: the day turned ___ sunny and warm.","o":["out","up","back","on"],"h":"In the end, it proved to be…","e":"<b>turn out</b> + adjective = prove to be, often a surprise."},
      {"type":"mc","q":"Don't wait for me. ___ with the game and I'll join you later.","o":["Carry on","Set off","Turn into","Take over"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>carry on</b> = continue."},
      {"type":"mc","q":"If it rains, they'll ___ the match.","o":["call off","come across","get over","turn up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>call off</b> = cancel."},
      {"type":"mc","q":"It took me two weeks to ___ my cold.","o":["get over","give up","look into","set off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>get over</b> = recover from."},
      {"type":"mc","q":"I hope more people ___ tonight than last week.","o":["turn up","turn down","take over","put off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>turn up</b> = arrive, come."},
      {"type":"mc","q":"We need to ___ at 5 a.m. tomorrow. The flight is at 7.","o":["set off","give up","look into","get over"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>set off</b> = start a journey."},
      {"type":"mc","q":"My brother is trying to ___ chocolate for a month.","o":["give up","put off","call off","come across"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>give up</b> = stop doing something."},
      {"type":"mc","q":"Can we ___ the meeting until next week?","o":["put off","get over","turn into","come across"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>put off</b> = postpone."},
      {"type":"mc","q":"The manager promised to ___ the problem.","o":["look into","turn down","carry on","set off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>look into</b> = investigate."},
      {"type":"mc","q":"We're going to ___ milk soon. Can you buy some?","o":["run out of","look into","get over","turn into"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>run out of</b> = have no more."},
      {"type":"mc","q":"If you heat ice, it will ___ water.","o":["turn into","turn out","take over","set off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>turn into</b> = become."},
      {"type":"mc","q":"Who will ___ the shop when the owner retires?","o":["take over","turn up","set off","come across"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>take over</b> = take control of."},
      {"type":"mc","q":"Why did you ___ the job offer? It sounded great!","o":["turn down","turn up","carry on","set off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>turn down</b> = refuse."},
      {"type":"mc","q":"If you ___ my glasses while you're tidying, tell me.","o":["come across","look into","take over","turn down"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>come across</b> = find by chance."},
      {"type":"mc","q":"The weather was terrible, so the climbers decided to ___.","o":["turn back","turn into","look into","come across"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>turn back</b> = go back the way you came."},
      {"type":"mc","q":"The rumour might ___ to be true.","o":["turn out","turn up","take over","set off"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>turn out</b> to be = prove to be."},
      {"type":"mc","q":"If they lose this game, they'll be ___ of the tournament.","o":["knocked out","turned down","set off","given up"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>be knocked out of</b> = be eliminated."}
    ]
  },
  colloc: {
    entries:[
      {"term":"have a go (at)","key":"have","m":"try something","ex":"I'd never skied before, but I decided to {have a go}.","ex2":"Can I {have a go} on your skateboard?","alt":["make","do","take"]},
      {"term":"give something a go","key":"give","m":"try something","ex":"The app is free, so why not {give it a go}?","ex2":"I'd never cooked fish before, but I decided to {give it a go}.","alt":["make","do","put"]},
      {"term":"be in place","key":"in","m":"be ready and organised","ex":"All the security measures {are in place} for the match.","ex2":"New rules {are in place} to protect the beach.","alt":["at","on","by"]},
      {"term":"the appeal of","key":"appeal","m":"what makes something attractive","ex":"I don't understand {the appeal of} horror films.","ex2":"The main {appeal of} the job is the flexible hours.","alt":["attract","attractive","appealing"]},
      {"term":"make a decision","key":"make","m":"decide","ex":"We need to {make a decision} by Monday.","ex2":"It was hard to {make a decision} about which university to choose.","alt":["do","have","put"]},
      {"term":"take part in","key":"part","m":"participate","ex":"Over 300 runners {took part in} the race.","ex2":"Everyone has to {take part in} the debate.","alt":["place","piece","side"]},
      {"term":"pay attention (to)","key":"attention","m":"listen or watch carefully","ex":"Please {pay attention} – this is important.","ex2":"He never {pays attention to} the instructions.","alt":["care","interest","notice"]},
      {"term":"make progress","key":"progress","m":"get better, advance","ex":"You're {making great progress} with your English.","ex2":"The team {made good progress} this season.","alt":["advance","growth","development"]},
      {"term":"do research","key":"research","m":"study something to find information","ex":"Scientists are {doing research} on sleep.","ex2":"I {did some research} before buying a laptop.","alt":["search","investigate","experiment"]},
      {"term":"take place","key":"place","m":"happen (an organised event)","ex":"The festival {takes place} every August.","ex2":"The final will {take place} in Madrid.","alt":["part","stage","event"]},
      {"term":"set a record","key":"record","m":"achieve the best result ever","ex":"She {set a new world record} in the 400 m.","ex2":"The film {set a record} for ticket sales.","alt":["score","prize","goal"]},
      {"term":"take advantage of","key":"advantage","m":"use an opportunity","ex":"{Take advantage of} the sunny weather and go out!","ex2":"Students can {take advantage of} free museum entry.","alt":["benefit","profit","use"]},
      {"term":"heavy traffic","key":"heavy","m":"a lot of cars on the road","ex":"We were late because of {heavy traffic}.","ex2":"There's always {heavy traffic} on Friday afternoons.","alt":["strong","big","hard"]},
      {"term":"catch a cold","key":"cold","m":"become ill with a cold","ex":"Wear a coat or you'll {catch a cold}.","ex2":"I {caught a cold} on holiday.","alt":["ill","sick","temperature"]}
    ],
    items:[
      {"type":"mc","q":"Cheap flights have increased the ___ of short city breaks.","o":["appeal","delight","bonus","profit"],"h":"What makes them attractive to people.","e":"the <b>appeal</b> of."},
      {"type":"mc","q":"I've never tried surfing, but I'd love to ___ it a go.","o":["give","make","do","take"],"h":"___ it a go = try it.","e":"<b>give</b> it a go (also: have a go)."},
      {"type":"mc","q":"Why don't you have a ___ at the crossword? It's fun.","o":["go","play","test","game"],"h":"have a ___ = try.","e":"have a <b>go</b>."},
      {"type":"mc","q":"You should ___ at the guitar. It's easier than it looks.","o":["have a go","make progress","take part","do research"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>have a go</b> (at) = try."},
      {"type":"mc","q":"The new app is free, so why not ___?","o":["give it a go","make a decision","pay attention","catch a cold"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>give it a go</b> = try it."},
      {"type":"mc","q":"All the safety measures ___ before the concert starts.","o":["are in place","take part","make progress","set a record"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>be in place</b> = be ready and organised."},
      {"type":"mc","q":"For many tourists, ___ Rome is its history.","o":["the appeal of","the progress of","the research of","the place of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>the appeal of</b> = what makes it attractive."},
      {"type":"mc","q":"We have to ___ before Friday: Paris or Rome?","o":["make a decision","catch a cold","do research","take place"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>make a decision</b> = decide."},
      {"type":"mc","q":"Twenty schools will ___ in the competition.","o":["take part","take place","make progress","pay attention"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>take part</b> in = participate. <i>Take place</i> is for events, not people."},
      {"type":"mc","q":"Please ___ to the safety instructions.","o":["pay attention","take advantage","make a decision","do research"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>pay attention</b> to."},
      {"type":"mc","q":"Your writing is much better. You're really ___!","o":["making progress","taking place","catching a cold","taking part"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>make progress</b> = get better."},
      {"type":"mc","q":"Before writing the essay, you need to ___ on the topic.","o":["do research","take place","catch a cold","set a record"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>do research</b> = look for information."},
      {"type":"mc","q":"The wedding will ___ in a small village.","o":["take place","take part","make progress","do research"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>take place</b> = happen."},
      {"type":"mc","q":"The swimmer hopes to ___ at the Olympics.","o":["set a record","take place","catch a cold","pay attention"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>set a record</b> = get the best result ever."},
      {"type":"mc","q":"You should ___ the free classes while they're available.","o":["take advantage of","pay attention","make progress","catch a cold"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>take advantage of</b> = use an opportunity."},
      {"type":"mc","q":"It took us two hours because of the ___ on the motorway.","o":["heavy traffic","strong traffic","big traffic","hard traffic"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>heavy</b> traffic."},
      {"type":"mc","q":"Take a coat or you'll ___.","o":["catch a cold","take place","set a record","make progress"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>catch a cold</b> = get ill with a cold."}
    ]
  },
  fixed: {
    entries:[
      {"term":"at a speed of","key":"at","m":"travelling this fast","ex":"The train travels {at a speed of} 300 km/h.","ex2":"The storm was moving {at a speed of} 60 km/h.","alt":["in","on","by"]},
      {"term":"serve as","key":"as","m":"be used for a different purpose","ex":"The old church now {serves as} a library.","ex2":"During the festival, the car park {serves as} a campsite.","alt":["like","for","to"]},
      {"term":"at a rate of","key":"at","m":"how fast something changes","ex":"Prices are rising {at a rate of} 3% a year.","ex2":"The ice is melting {at a rate of} 10 cm a day.","alt":["in","on","by"]},
      {"term":"at a temperature of","key":"at","m":"how hot or cold","ex":"Water boils {at a temperature of} 100°C.","ex2":"Keep the medicine {at a temperature of} under 25°C.","alt":["in","on","by"]},
      {"term":"act as","key":"as","m":"do a job or role for a short time","ex":"Her brother {acted as} translator at the meeting.","ex2":"During the trip, Laura {acted as} our guide.","alt":["like","for","of"]},
      {"term":"be responsible for","key":"for","m":"be in charge of / be the cause of","ex":"Who {is responsible for} the website?","ex2":"The storm {was responsible for} the damage.","alt":["of","with","on"]},
      {"term":"depend on","key":"on","m":"be decided by","ex":"It {depends on} the weather.","ex2":"Our plans {depend on} the price of the tickets.","alt":["of","from","in"]},
      {"term":"consist of","key":"of","m":"be made of","ex":"The team {consists of} eleven players.","ex2":"Breakfast {consisted of} bread and fruit.","alt":["on","by","with"]},
      {"term":"be keen on","key":"on","m":"like, be interested in","ex":"I'm not very {keen on} horror films.","ex2":"She's really {keen on} photography.","alt":["in","of","at"]},
      {"term":"be proud of","key":"of","m":"feel pleased about","ex":"Her parents are very {proud of} her.","ex2":"You should be {proud of} your work.","alt":["on","with","at"]},
      {"term":"be aware of","key":"of","m":"know about","ex":"Are you {aware of} the new rules?","ex2":"He wasn't {aware of} the problem.","alt":["on","with","for"]},
      {"term":"succeed in","key":"in","m":"manage to do","ex":"She {succeeded in} passing the exam.","ex2":"They finally {succeeded in} finding the cat.","alt":["on","at","to"]},
      {"term":"insist on","key":"on","m":"say firmly that you will do something","ex":"He {insisted on} paying for dinner.","ex2":"My mum {insists on} a family lunch every Sunday.","alt":["in","to","for"]},
      {"term":"in charge of","key":"charge","m":"the person who leads or controls something","ex":"Who's {in charge of} the music for the party?","ex2":"She's {in charge of} a team of ten people.","alt":["head","lead","power"]},
      {"term":"by mistake","key":"by","m":"without wanting to","ex":"I took your umbrella {by mistake}.","ex2":"He sent the email to the whole class {by mistake}.","alt":["in","with","for"]},
      {"term":"on purpose","key":"on","m":"because you wanted to","ex":"She broke the vase {on purpose}.","ex2":"I didn't do it {on purpose}, I promise!","alt":["by","in","at"]},
      {"term":"in advance","key":"in","m":"before the time","ex":"Book your tickets {in advance}.","ex2":"You must pay two weeks {in advance}.","alt":["at","on","by"]},
      {"term":"at least","key":"least","m":"not less than","ex":"It takes {at least} an hour to get there.","ex2":"You should sleep {at least} eight hours.","alt":["less","little","last"]}
    ],
    items:[
      {"type":"mc","q":"I'm not very keen ___ horror films.","o":["on","in","of","with"],"h":"keen + ?","e":"keen <b>on</b>."},
      {"type":"mc","q":"Her parents are really proud ___ her.","o":["of","for","about","on"],"h":"proud + ?","e":"proud <b>of</b>."},
      {"type":"mc","q":"My new phone is very similar ___ my old one.","o":["to","with","as","of"],"h":"similar + ?","e":"similar <b>to</b>. (But: the same <i>as</i>.)"},
      {"type":"mc","q":"He apologised ___ being late.","o":["for","of","about","to"],"h":"apologise ___ something.","e":"apologise <b>for</b> + -ing / noun."},
      {"type":"mc","q":"The plane was flying ___ a height of 10,000 metres.","o":["at","in","on","by"],"h":"Same preposition as 'speed' and 'rate'.","e":"<b>at</b> a height of."},
      {"type":"mc","q":"Were you aware ___ the changes to the timetable?","o":["of","about","on","with"],"h":"aware + ?","e":"aware <b>of</b>."},
      {"type":"mc","q":"The old factory now functions ___ an art gallery.","o":["as","like","for","to"],"h":"A role or use, not a comparison.","e":"function / serve <b>as</b>. <i>Like</i> = similar to, not a role."},
      {"type":"mc","q":"She insisted ___ paying for dinner.","o":["on","in","to","for"],"h":"insist + ? + -ing","e":"insist <b>on</b> + -ing."},
      {"type":"mc","q":"Prices have risen ___ a rate of 4% this year.","o":["at","by","with","on"],"h":"rate = same family as speed.","e":"<b>at</b> a rate of. (Careful: risen <i>by</i> 4% is also English, but 'a rate of' needs <i>at</i>.)"},
      {"type":"mc","q":"The success of the event will depend largely ___ the weather.","o":["on","of","from","at"],"h":"An adverb in the middle doesn't change the preposition.","e":"depend (largely) <b>on</b>."},
      {"type":"mc","q":"My brother works ___ a nurse at the local hospital.","o":["as","like","for","of"],"h":"His job or role.","e":"work <b>as</b>."},
      {"type":"mc","q":"Who is responsible ___ booking the hotel?","o":["for","of","to","with"],"h":"responsible + ?","e":"responsible <b>for</b>."},
      {"type":"mc","q":"The meal consisted ___ three courses.","o":["of","in","on","by"],"h":"consist + ?","e":"consist <b>of</b>."},
      {"type":"mc","q":"Store the cheese ___ a temperature below 5°C.","o":["at","in","on","by"],"h":"temperature = speed = rate.","e":"<b>at</b> a temperature of."},
      {"type":"mc","q":"Whether we go camping depends ___ how much money we save.","o":["on","of","from","in"],"h":"depend + ?","e":"depend <b>on/upon</b>."},
      {"type":"mc","q":"She finally succeeded ___ getting a place at university.","o":["in","on","at","to"],"h":"succeed + ? + -ing","e":"succeed <b>in</b> + -ing."},
      {"type":"mc","q":"This small room acts ___ both an office and a guest bedroom.","o":["as","like","for","of"],"h":"A function or role.","e":"act <b>as</b>."},
      {"type":"mc","q":"The town is best known ___ its colourful festival.","o":["for","as","of","with"],"h":"known + ? + the reason it is famous.","e":"known <b>for</b> (a reason). Known <i>as</i> = a name or role."},
      {"type":"mc","q":"Most cyclists were riding ___ an average speed of 40 km/h.","o":["at","in","on","by"],"h":"The preposition that goes with speed and rate.","e":"<b>at</b> a speed of."},
      {"type":"mc","q":"Water freezes ___ a temperature of 0°C.","o":["at","in","on","by"],"h":"Same preposition as with speed.","e":"<b>at</b> a temperature of."},
      {"type":"mc","q":"In July, the school gym serves ___ a summer camp.","o":["as","like","for","to"],"h":"It has this function or role.","e":"serve <b>as</b>."},
      {"type":"mc","q":"The car was travelling ___ 140 km/h.","o":["at a speed of","in charge of","in advance","on purpose"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at a speed of</b>."},
      {"type":"mc","q":"This old school now ___ a museum.","o":["serves as","depends on","insists on","succeeds in"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>serve as</b> = be used as."},
      {"type":"mc","q":"The number of cyclists is growing ___ 5% a year.","o":["at a rate of","at a temperature of","in advance","on purpose"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at a rate of</b> = how fast something changes."},
      {"type":"mc","q":"Chocolate melts ___ about 35°C.","o":["at a temperature of","at a rate of","at a speed of","in charge of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at a temperature of</b>."},
      {"type":"mc","q":"When the teacher was ill, Marta ___ class leader.","o":["acted as","depended on","insisted on","consisted of"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>act as</b> = do a role for a short time."},
      {"type":"mc","q":"Who ___ cleaning the kitchen this week?","o":["is responsible for","depends on","consists of","succeeds in"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>be responsible for</b>."},
      {"type":"mc","q":"Whether we go to the beach ___ the weather.","o":["depends on","consists of","insists on","succeeds in"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>depend on</b> = be decided by."},
      {"type":"mc","q":"The exam ___ three parts.","o":["consists of","serves as","insists on","acts as"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>consist of</b> = be made of."},
      {"type":"mc","q":"My dad isn't very ___ football.","o":["keen on","in charge of","at least","in advance"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>keen on</b> = interested in."},
      {"type":"mc","q":"You should be ___ yourself. You worked so hard!","o":["proud of","in charge of","by mistake","in advance"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>proud of</b>."},
      {"type":"mc","q":"Are you ___ the risks of this sport?","o":["aware of","in charge of","by mistake","at least"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>aware of</b> = know about."},
      {"type":"mc","q":"After three attempts, she ___ passing her driving test.","o":["succeeded in","consisted of","depended on","served as"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>succeed in</b> + -ing."},
      {"type":"mc","q":"My grandmother always ___ cooking for everyone.","o":["insists on","consists of","depends on","serves as"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>insist on</b> + -ing."},
      {"type":"mc","q":"Who's ___ the sports club?","o":["in charge of","by mistake","on purpose","in advance"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in charge of</b> = leading, controlling."},
      {"type":"mc","q":"Sorry, I deleted your photo ___.","o":["by mistake","in advance","in charge of","at least"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>by mistake</b> = without wanting to."},
      {"type":"mc","q":"He didn't trip. He fell ___ to make us laugh.","o":["on purpose","by mistake","in advance","at least"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>on purpose</b> = because you wanted to."},
      {"type":"mc","q":"Tickets sell out fast, so buy them ___.","o":["in advance","on purpose","by mistake","at least"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>in advance</b> = before the time."},
      {"type":"mc","q":"You need to practise for ___ 20 minutes a day.","o":["at least","in advance","on purpose","by mistake"],"h":"Read the whole sentence. Which expression makes sense here?","e":"<b>at least</b> = not less than."}
    ]
  }
};

const EXAMS = [
  { id:"linguaskill", name:"Linguaskill", weeks:[ CLASS_2026_11_11, CLASS_2026_11_04, CLASS_2026_10_28 ] },
  { id:"first", name:"B2 First", weeks:[] },
  { id:"advanced", name:"C1 Advanced", weeks:[] },
  { id:"proficiency", name:"C2 Proficiency", weeks:[] }
];
