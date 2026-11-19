import React, {useEffect, useMemo, useState} from 'react';

const SUBJECT = "How's your experience with the serum so far?";
const PREHEADER = "We'd love to hear how it's been fitting into your routine.";
const CTA = 'https://47skin.com/products/anti-blemish-scar-repair-serum';
const messages = [
 {id:'campaign',sender:'The 47 Skin team',subject:SUBJECT,preview:PREHEADER,time:'10:24 AM',unread:true},
 {id:'m1',sender:'Sunday Pages',subject:'This week in design',preview:'New stories and pieces to explore.',time:'9:10 AM',unread:true},
 {id:'m2',sender:'Northside Books',subject:'Your weekend reading list',preview:'New books for your saved shelf.',time:'Yesterday'},
 {id:'m3',sender:'City Guide',subject:'This week around town',preview:'Museums, exhibitions and neighbourhood finds.',time:'Wed'},
 {id:'m4',sender:'The Sunday Edit',subject:'A little inspiration',preview:'Things to read and discover.',time:'Tue'},
 {id:'m5',sender:'Home Journal',subject:'A fresh perspective',preview:'Spaces and stories worth saving.',time:'Mon'},
 {id:'m6',sender:'Parcel Desk',subject:'Your delivery preferences',preview:'Your saved settings are available.',time:'Nov 12'}
];
const iconPaths = {
 menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
 search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
 inbox:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 13h5l2 3h4l2-3h5"/></>,
 star:<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2l-5-4.9 6.9-1z"/>,
 clock:<><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
 send:<><path d="m3 11 18-8-8 18-2.7-7.3L3 11zM10.3 13.7 21 3"/></>,
 draft:<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
 back:<path d="m13 5-7 7 7 7M6 12h15"/>,
 refresh:<><path d="M20 7v5h-5"/><path d="M20 12a8 8 0 1 0-2 5.5"/></>,
 close:<path d="M5 5l14 14M19 5 5 19"/>,
 chevron:<path d="m7 10 5 5 5-5"/>,
 arrow:<path d="M5 12h14m-6-6 6 6-6 6"/>,
 check:<path d="m4 12 5 5L20 6"/>
};
function Icon({name,size=19,fill='none'}){return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>}
function MailLogo(){return <div className="mail-logo"><span className="mail-mark">M</span><span className="mail-word">Mail</span><small>portfolio experience</small></div>}
const folders=[['Inbox','inbox'],['Starred','star'],['Snoozed','clock'],['Sent','send'],['Drafts','draft']];
function Campaign(){return <article className="feedback-email" aria-label="47 Skin feedback email">
  <div className="feedback-masthead"><span className="feedback-logo"><b>47</b><span>SKIN</span></span><span className="feedback-edition">A NOTE FROM THE 47 SKIN TEAM</span></div>
  <div className="feedback-hero"><img src="/assets/editorial-feedback-portrait.png" alt="Conceptual editorial portrait showing natural skin texture in a softly lit bathroom"/><div className="feedback-hero-overlay"><span className="feedback-small-line"/></div></div>
  <div className="feedback-letter">
   <p>Hello,</p>
   <p>It's been a little while since you started using the Anti-Blemish &amp; Scar Repair Serum, and we'd love to know how things are going.</p>
   <div className="feedback-question"><span className="feedback-rule"/><p>How has it been fitting into your routine? Have you noticed any changes? Is there anything you're unsure about?</p></div>
   <p>Whatever your experience has been so far, we'd genuinely like to hear about it. Whether you've been pleased with the serum, have mixed feelings or haven't seen the changes you expected, your honest feedback matters to us.</p>
   <p>And if you have any questions or need a little help with the product, our team is here to help.</p>
   <div className="feedback-action"><a href={CTA} target="_blank" rel="noopener noreferrer" className="feedback-cta">Share Your Experience <Icon name="arrow" size={19}/></a></div>
   <p className="feedback-signoff">Warmly,<br/><br/>The 47 Skin team</p>
  </div>
  <div className="feedback-product"><span className="feedback-product-rule"/><img src="/assets/authentic-serum-reference.png" alt="Authentic reference photograph of two amber 47 Skin Anti-Blemish & Scar Repair Serum bottles"/><span className="feedback-product-rule"/></div>
  <footer className="feedback-footer"><strong>47 SKIN</strong><span>Speculative portfolio concept · Not an email sent by 47 Skin</span></footer>
 </article>}
export default function App(){
 const [opened,setOpened]=useState(false);
 const [read,setRead]=useState(false);
 const [starred,setStarred]=useState(false);
 const [folder,setFolder]=useState('Inbox');
 const [query,setQuery]=useState('');
 const [navOpen,setNavOpen]=useState(false);
 const [notice,setNotice]=useState('');
 const visible=useMemo(()=>{const f=folder==='Inbox'?messages:folder==='Starred'&&starred?[messages[0]]:[];return f.filter(m=>`${m.sender} ${m.subject} ${m.preview}`.toLowerCase().includes(query.toLowerCase().trim()))},[folder,starred,query]);
 function open(){setOpened(true);setRead(true);setNavOpen(false);document.querySelector('.main-panel')?.scrollTo(0,0)}
 function back(){setOpened(false);document.querySelector('.main-panel')?.scrollTo(0,0)}
 function chooseFolder(f){setFolder(f);setOpened(false);setNavOpen(false);setQuery('')}
 useEffect(()=>{function key(e){if(e.key==='Escape'){if(opened)back();else setNavOpen(false)}}window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[opened]);
 useEffect(()=>{document.title=(opened?SUBJECT:'Inbox')+' | 47 Skin portfolio'},[opened]);
 return <div className="app-frame">
  <header className="app-header"><button className="circle-button menu-button" aria-label="Toggle navigation" onClick={()=>setNavOpen(!navOpen)}><Icon name="menu"/></button><MailLogo/><div className="searchbox"><Icon name="search" size={21}/><input value={query} onChange={e=>{setQuery(e.target.value);if(opened)back();if(folder!=='Inbox')setFolder('Inbox')}} placeholder="Search mail" aria-label="Search mail"/>{query&&<button className="plain-icon" onClick={()=>setQuery('')} aria-label="Clear search"><Icon name="close" size={17}/></button>}</div><span className="demo-mode">DEMO INBOX</span><span className="profile" aria-label="Fictional profile">P</span></header>
  <div className="app-workspace"><aside className={'side-panel '+(navOpen?'nav-open':'')}><div className="sidebar-title">MAILBOX</div><nav aria-label="Mail folders">{folders.map(([name,icon])=><button key={name} className={'folder-link '+(folder===name?'folder-current':'')} onClick={()=>chooseFolder(name)}><Icon name={icon}/>{name}{name==='Inbox'&&<b>1</b>}{name==='Starred'&&starred&&<b>1</b>}</button>)}</nav><div className="side-bottom">PORTFOLIO PREVIEW<br/><span>Fictional inbox · no real emails</span></div></aside>{navOpen&&<button className="overlay" aria-label="Close navigation" onClick={()=>setNavOpen(false)}/>}
  <main className="main-panel" aria-label={opened?'Open message':'Inbox'}>
   {opened?<><div className="mail-toolbar"><button className="circle-button" onClick={back} aria-label="Back to inbox"><Icon name="back" size={22}/></button><span className="toolbar-rule"/><span className="toolbar-subject">Inbox / Open message</span><span className="toolbar-spacer"/><button className="subtle-action" onClick={back}>Back to inbox</button></div><section className="message-reading"><h1 className="message-title">{SUBJECT}</h1><div className="message-meta"><span className="sender-avatar">47</span><div className="sender-info"><strong>The 47 Skin team</strong><span>to you · sample email · no real delivery</span></div><span className="sample-date">Preview · no delivery date</span><button className={'star-button '+(starred?'star-active':'')} aria-label={starred?'Unstar message':'Star message'} onClick={()=>setStarred(!starred)}><Icon name="star" fill={starred?'currentColor':'none'}/></button></div><Campaign/><div className="bottom-return"><button onClick={back}><Icon name="back" size={18}/> Return to inbox</button></div></section></>:
   <><div className="mail-toolbar"><span className="toolbar-subject">{folder}</span><span className="toolbar-spacer"/><button className="circle-button" title="Reset inbox" aria-label="Reset inbox" onClick={()=>{setFolder('Inbox');setQuery('');setNotice('Inbox refreshed')}}><Icon name="refresh"/></button><span className="count">{visible.length} messages</span></div><div className="tabs"><div className="tab-active"><Icon name="inbox"/> Primary</div></div><div className="message-list" role="list" aria-label="Email list">{visible.map(m=><div key={m.id} className={'mail-row '+(m.unread&&(m.id!=='campaign'||!read)?'unread ':'')+(m.id==='campaign'?'campaign-row':'')} role="listitem"><button className={'star-button '+(m.id==='campaign'&&starred?'star-active':'')} disabled={m.id!=='campaign'} onClick={()=>setStarred(!starred)} aria-label={m.id==='campaign'?'Toggle star on 47 Skin message':'Sample message star unavailable'}><Icon name="star" fill={m.id==='campaign'&&starred?'currentColor':'none'}/></button>{m.id==='campaign'?<button className="mail-row-content" onClick={open}><span className="from">{m.sender}</span><span className="mail-details"><strong>{m.subject}</strong><span> — {m.preview}</span></span><time>{m.time}</time></button>:<div className="mail-row-content static-row" aria-label="Sample email not openable"><span className="from">{m.sender}</span><span className="mail-details"><strong>{m.subject}</strong><span> — {m.preview}</span></span><time>{m.time}</time></div>}</div>)}</div>{!visible.length&&<div className="empty"><h2>Nothing here yet</h2><p>Only the demonstration inbox includes messages.</p><button onClick={()=>chooseFolder('Inbox')}>Go to Inbox</button></div>}<div className="inbox-footnote">A portfolio simulation. Select the 47 Skin message to view the designed email.</div>{notice&&<div className="announce" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="Dismiss"><Icon name="close" size={14}/></button></div>}</>}
  </main></div>
 </div>
}
