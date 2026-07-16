export type Field = 'ict'|'ai'|'integrated';
export type Theme = 'light'|'dark';
export interface Choice { id:string; text:string; score:0|2|5|8|10; feedback:string }
export interface Question { id:string; level:number; field:Field; prompt:string; choices:Choice[]; explanation:string; tags:string[]; provisional:true; noSingleCorrect?:boolean }
export const PASSING_SCORE = 84;
export const DAILY_LIMIT = 5;
export function isPassing(score:number){ return score >= PASSING_SCORE; }
export function normalizeUsername(name:string){ return name.trim().normalize('NFKC').toLocaleLowerCase('ja-JP'); }
export function canChangeUsername(lastChanged:Date, now:Date){ return now.getTime()-lastChanged.getTime() >= 30*24*60*60*1000; }
export function tokyoDateKey(date:Date){ return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(date); }
export function remainingAttempts(used:number){ return Math.max(0, DAILY_LIMIT-used); }
export function nextCertificateNumber(level:number, year:number, series:string, seq:number){ return `L${level}-${year}-${series}-${String(seq).padStart(5,'0')}`; }
export function saveTheme(theme:Theme){ localStorage.setItem('theme', theme); document.documentElement.dataset.theme=theme; return theme; }
export function saveSound(on:boolean){ localStorage.setItem('sound', on?'on':'off'); return on; }
export function fieldCounts(questions:Question[]){ return questions.reduce<Record<Field,number>>((a,q)=>{a[q.field]++;return a},{ict:0,ai:0,integrated:0}); }
export function shuffle<T>(items:T[], random=Math.random){ return [...items].map(v=>({v,r:random()})).sort((a,b)=>a.r-b.r).map(x=>x.v); }
export function selectQuestions(bank:Question[], seen:Set<string>, random=Math.random){
  const quotas:Record<Field,number>={ict:3,ai:6,integrated:1};
  const selected:Question[]=[];
  (Object.keys(quotas) as Field[]).forEach(field=>{
    const pool=bank.filter(q=>q.field===field); const unseen=pool.filter(q=>!seen.has(q.id));
    selected.push(...shuffle(unseen.length>=quotas[field]?unseen:pool, random).slice(0, quotas[field]));
  });
  return shuffle(selected, random);
}
export function sanitizeForClient(q:Question){ return {id:q.id,level:q.level,field:q.field,prompt:q.prompt,choices:shuffle(q.choices).map(c=>({id:c.id,text:c.text})),tags:q.tags,provisional:q.provisional}; }
