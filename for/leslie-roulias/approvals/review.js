(function(){
var KEY='mil-review-leslie-2026-07';
var ORDER=window.REVIEW_ORDER||['fav-01','logo-01','logo-02','logo-03','brand-01','brand-03','copy-01','copy-02','copy-03','copy-04','acc-all'];
var HEADING=window.REVIEW_HEADING||'Review answers, Leslie Roulias';
var TITLES={
 'fav-01':'Favicon: use the C from your own logo',
 'logo-01':'Logo: tighten the word FINANCIAL',
 'logo-02':'Logo: simpler poppy for small sizes',
 'logo-03':'Logo: align the two lines on one edge',
 'brand-01':'Brand: coral stays an accent, never carries text',
 'brand-03':'Brand: real photography, daylight, no stock finance imagery',
 'copy-01':'Copy: fifteen years managing global portfolios and risk',
 'copy-02':'Copy: start now, so it compounds in your favor',
 'copy-03':'Copy: microfinance as pioneered by Dr. Yunus',
 'copy-04':'Copy: crises sentence, trusted with more responsibility',
 'acc-all':'Contrast: approve all five fixes as one pass',
 'acc-01b':'Contrast follow up: which coral on the navy sections'
};
var EMAIL='nicole@makeitland.studio';
var ASKS={booking:'The booking link',logofiles:'The editable logo files'};
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return{}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
var state=load();
function label(v){if(!v)return'Not answered yet.';if(v.choice==='approve')return'Approved'+(v.note?', with a note.':'.');if(v.choice==='hold')return'On hold'+(v.note?', with a note.':'.');return v.note?'Note saved, no decision yet.':'Not answered yet.'}
function answered(){var n=0;ORDER.forEach(function(id){var v=state[id];if(v&&(v.choice||(v.note||'').trim()))n++});return n}
function askLines(){
 var out=[];
 if(window.REVIEW_ORDER)return out;
 Object.keys(ASKS).forEach(function(k){
  var v=((state['ask-'+k]||{}).note||'').trim();
  if(v)out.push(ASKS[k]+': '+v.replace(/\s+/g,' '));
 });
 return out;
}
function transcript(){
 var lines=[HEADING,'Prepared by Make It Land Studio, July 2026','',answered()+' of '+ORDER.length+' answered','',''];
 ORDER.forEach(function(id,i){
  var v=state[id]||{};
  var d=v.choice==='approve'?'APPROVED':v.choice==='hold'?'ON HOLD':'no answer';
  lines.push((i+1)+'. '+TITLES[id]);
  lines.push('   '+d);
  if((v.note||'').trim())lines.push('   Note: '+v.note.trim().replace(/\s+/g,' '));
  lines.push('');
 });
 var a=askLines();
 if(a.length){lines.push('Answers to your questions','');a.forEach(function(l){lines.push('- '+l)});lines.push('')}
 return lines.join('\n');
}
document.querySelectorAll('.verdict').forEach(function(box){
  var id=box.getAttribute('data-id');
  var v=state[id]||{};
  var out=box.querySelector('.v-state');
  var ta=box.querySelector('textarea');
  if(ta&&v.note)ta.value=v.note;
  box.querySelectorAll('.v-btn').forEach(function(b){
    b.setAttribute('aria-pressed',String(v.choice===b.getAttribute('data-choice')));
    b.addEventListener('click',function(){
      var c=b.getAttribute('data-choice');
      var cur=state[id]||{};
      cur.choice=cur.choice===c?null:c;
      state[id]=cur;save(state);
      box.querySelectorAll('.v-btn').forEach(function(o){o.setAttribute('aria-pressed',String(cur.choice===o.getAttribute('data-choice')))});
      if(out)out.textContent=label(cur);
      sync();
    });
  });
  if(ta)ta.addEventListener('input',function(){var cur=state[id]||{};cur.note=ta.value;state[id]=cur;save(state);if(out)out.textContent=label(cur);sync()});
  if(out)out.textContent=label(v);
});
document.querySelectorAll('[data-ask]').forEach(function(el){
 var id='ask-'+el.getAttribute('data-ask');
 var v=state[id]||{};
 if(v.note)el.value=v.note;
 el.addEventListener('input',function(){var cur=state[id]||{};cur.note=el.value;state[id]=cur;save(state);sync()});
});
var send=document.querySelector('.send');
function mailHref(){
 var body=encodeURIComponent(transcript());
 var subj=encodeURIComponent(HEADING);
 return 'mailto:'+EMAIL+'?subject='+subj+'&body='+body;
}
function gmailHref(){
 var body=encodeURIComponent(transcript());
 var subj=encodeURIComponent(HEADING);
 return 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to='+encodeURIComponent(EMAIL)+'&su='+subj+'&body='+body;
}
function sync(){
 if(!send)return;
 var c=send.querySelector('.send-count');
 var n=answered();
 if(c)c.textContent=n===ORDER.length?'All '+ORDER.length+' answered.':n+' of '+ORDER.length+' answered so far.';
 var m=send.querySelector('[data-send="email"]');
 if(m)m.setAttribute('href',mailHref());
 var g=send.querySelector('[data-send="gmail"]');
 if(g)g.setAttribute('href',gmailHref());
}
if(send){
 var copy=send.querySelector('[data-send="copy"]');
 var mail=send.querySelector('[data-send="email"]');
 var say=send.querySelector('.send-said');
 function flash(msg){if(say)say.textContent=msg}
 if(copy)copy.addEventListener('click',function(){
  var text=transcript();
  function fallback(){
   var ta=document.createElement('textarea');
   ta.value=text;ta.setAttribute('readonly','');
   ta.style.position='fixed';ta.style.top='-1000px';
   document.body.appendChild(ta);ta.select();
   try{document.execCommand('copy');flash('Copied. Paste it into your reply.')}catch(e){flash('Could not copy automatically. Use the email button instead.')}
   document.body.removeChild(ta);
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
   navigator.clipboard.writeText(text).then(function(){flash('Copied. Paste it into your reply.')},fallback);
  }else fallback();
 });
 var gm=send.querySelector('[data-send="gmail"]');
 if(mail)mail.addEventListener('click',function(e){
  if(mailHref().length>1900){e.preventDefault();flash('Your notes are long enough that email would cut them off. Use Copy my answers instead.');return}
  flash('Opening your desktop email app. If nothing happens, this computer has no email app set up, so use Copy my answers.');
 });
 if(gm)gm.addEventListener('click',function(){flash('Opening Gmail in a new tab. Check the message looks right, then send it.')});
 sync();
}
})();
