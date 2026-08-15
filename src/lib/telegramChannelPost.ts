// Posts a branded announcement to the PastPaperZone Telegram channel.
// The announcement graphic is generated as a small raster "canvas" in the Worker,
// so every post gets a fresh subject/year/medium design instead of the static logo.

import { ALL_SUBJECTS } from "@/lib/subjects";
import { trackTelegramLinkDelivery } from "@/lib/telegramAnalytics";

const BASE_URL = "https://pastpaperzone.lk";

type Medium = "sinhala" | "english" | "tamil";
type DocType = "paper" | "marking";

const MEDIUM_LABEL: Record<Medium, string> = {
  sinhala: "Sinhala Medium",
  english: "English Medium",
  tamil: "Tamil Medium",
};

const SUBJECT_NAMES: Record<string, string> = {
  "ol-maths": "ගණිතය", "ol-science": "විද්‍යාව", "ol-sinhala": "සිංහල භාෂාව",
  "ol-english": "ඉංග්‍රීසි භාෂාව", "ol-history": "ඉතිහාසය", "ol-buddhism": "බුද්ධ ධර්මය",
  "ol-tamil": "දෙමළ භාෂාව", "ol-geography": "භූගෝල විද්‍යාව", "ol-civic": "පුරවැසි අධ්‍යාපනය",
  "ol-music": "සංගීතය", "ol-art": "කලාව", "ol-dancing": "නර්තනය", "ol-drama": "නාට්‍ය හා රංග කලාව",
  "ol-ict": "තොරතුරු හා සන්නිවේදන තාක්ෂණය", "ol-agriculture": "කෘෂිකර්මය", "ol-health": "සෞඛ්‍යය",
  "al-combined-maths": "සංයුක්ත ගණිතය", "al-physics": "භෞතික විද්‍යාව", "al-chemistry": "රසායන විද්‍යාව",
  "al-biology": "ජීව විද්‍යාව", "al-ict": "තොරතුරු තාක්ෂණය", "al-accounting": "ගණකාධිකරණය",
  "al-business": "ව්‍යාපාර අධ්‍යයනය", "al-econ": "ආර්ථික විද්‍යාව", "al-agro": "කෘෂි තාක්ෂණවේදය",
  "al-et": "ඉංජිනේරු තාක්ෂණවේදය", "al-bst": "ජෛව පද්ධති තාක්ෂණවේදය", "al-sft": "තාක්ෂණය සඳහා විද්‍යාව",
};

const SUBJECT_EN: Record<string, string> = {
  "ol-maths":"Mathematics","ol-science":"Science","ol-sinhala":"Sinhala Language",
  "ol-english":"English Language","ol-history":"History","ol-buddhism":"Buddhism",
  "ol-tamil":"Tamil Language","ol-geography":"Geography","ol-civic":"Civic Education",
  "ol-music":"Music","ol-art":"Art","ol-dancing":"Dancing","ol-drama":"Drama",
  "ol-ict":"ICT","ol-agriculture":"Agriculture","ol-health":"Health",
  "al-combined-maths":"Combined Mathematics","al-physics":"Physics","al-chemistry":"Chemistry",
  "al-biology":"Biology","al-ict":"ICT","al-accounting":"Accounting","al-business":"Business Studies",
  "al-econ":"Economics","al-agro":"Agro Technology","al-et":"Engineering Technology",
  "al-bst":"Bio Systems Technology","al-sft":"Science for Technology",
};

async function telegram(token: string, method: string, body: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json() as any;
  if (!response.ok || !data.ok) throw new Error(data.description || "Telegram API error");
  return data.result;
}

// Minimal 5x7 bitmap font. It keeps graphic generation edge/Worker compatible.
const FONT: Record<string, string[]> = {
  "A":["01110","10001","10001","11111","10001","10001","10001"],"B":["11110","10001","10001","11110","10001","10001","11110"],
  "C":["01111","10000","10000","10000","10000","10000","01111"],"D":["11110","10001","10001","10001","10001","10001","11110"],
  "E":["11111","10000","10000","11110","10000","10000","11111"],"F":["11111","10000","10000","11110","10000","10000","10000"],
  "G":["01111","10000","10000","10111","10001","10001","01111"],"H":["10001","10001","10001","11111","10001","10001","10001"],
  "I":["11111","00100","00100","00100","00100","00100","11111"],"J":["00111","00010","00010","00010","10010","10010","01100"],
  "K":["10001","10010","10100","11000","10100","10010","10001"],"L":["10000","10000","10000","10000","10000","10000","11111"],
  "M":["10001","11011","10101","10101","10001","10001","10001"],"N":["10001","11001","10101","10011","10001","10001","10001"],
  "O":["01110","10001","10001","10001","10001","10001","01110"],"P":["11110","10001","10001","11110","10000","10000","10000"],
  "Q":["01110","10001","10001","10001","10101","10010","01101"],"R":["11110","10001","10001","11110","10100","10010","10001"],
  "S":["01111","10000","10000","01110","00001","00001","11110"],"T":["11111","00100","00100","00100","00100","00100","00100"],
  "U":["10001","10001","10001","10001","10001","10001","01110"],"V":["10001","10001","10001","10001","10001","01010","00100"],
  "W":["10001","10001","10001","10101","10101","10101","01010"],"X":["10001","10001","01010","00100","01010","10001","10001"],
  "Y":["10001","10001","01010","00100","00100","00100","00100"],"Z":["11111","00001","00010","00100","01000","10000","11111"],
  "0":["01110","10001","10011","10101","11001","10001","01110"],"1":["00100","01100","00100","00100","00100","00100","01110"],
  "2":["01110","10001","00001","00010","00100","01000","11111"],"3":["11110","00001","00001","01110","00001","00001","11110"],
  "4":["00010","00110","01010","10010","11111","00010","00010"],"5":["11111","10000","10000","11110","00001","00001","11110"],
  "6":["01110","10000","10000","11110","10001","10001","01110"],"7":["11111","00001","00010","00100","01000","01000","01000"],
  "8":["01110","10001","10001","01110","10001","10001","01110"],"9":["01110","10001","10001","01111","00001","00001","01110"],
  "/":["00001","00010","00100","01000","10000","00000","00000"],"-":["00000","00000","00000","11111","00000","00000","00000"],
  ".":["00000","00000","00000","00000","00000","00110","00110"]," ":["00000","00000","00000","00000","00000","00000","00000"],
};

function crc32(bytes: Uint8Array) {
  let c = 0xffffffff;
  for (const b of bytes) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}
function u32(n: number) {
  return new Uint8Array([(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255]);
}
function chunk(type: string, data: Uint8Array) {
  const t = new TextEncoder().encode(type);
  const all = new Uint8Array(t.length + data.length);
  all.set(t); all.set(data, t.length);
  const out = new Uint8Array(12 + data.length);
  out.set(u32(data.length), 0); out.set(all, 4); out.set(u32(crc32(all)), 8 + data.length);
  return out;
}
function rect(px: Uint8Array, w: number, x: number, y: number, rw: number, rh: number, rgba: [number,number,number,number]) {
  for (let yy=Math.max(0,y); yy<Math.min(y+rh, Math.floor(px.length/(w*4))); yy++)
    for (let xx=Math.max(0,x); xx<Math.min(x+rw,w); xx++) {
      const i=(yy*w+xx)*4; px[i]=rgba[0]; px[i+1]=rgba[1]; px[i+2]=rgba[2]; px[i+3]=rgba[3];
    }
}
function text(px: Uint8Array,w:number,value:string,x:number,y:number,scale:number,rgba:[number,number,number,number]) {
  let cx=x;
  for (const ch of value.toUpperCase()) {
    const glyph=FONT[ch] || FONT[" "];
    for(let gy=0;gy<7;gy++) for(let gx=0;gx<5;gx++)
      if(glyph[gy][gx]==="1") rect(px,w,cx+gx*scale,y+gy*scale,scale,scale,rgba);
    cx += 6*scale;
  }
}
async function createCanvasGraphic(subject:string, year:string, medium:string, level:string, docType:string) {
  const w=1200,h=630;
  const px=new Uint8Array(w*h*4);
  // Branded dark canvas with a warm accent bar.
  rect(px,w,0,0,w,h,[11,15,26,255]);
  rect(px,w,0,0,w,20,[245,158,11,255]);
  rect(px,w,0,h-18,w,18,[245,158,11,255]);
  rect(px,w,70,80,1060,470,[20,27,45,255]);
  rect(px,w,70,80,14,470,[245,158,11,255]);
  text(px,w,"PASTPAPERZONE",120,125,7,[255,255,255,255]);
  text(px,w,`${level} ${year}`,120,230,8,[245,158,11,255]);
  text(px,w,subject.slice(0,24),120,330,6,[255,255,255,255]);
  text(px,w,medium,120,405,5,[203,213,225,255]);
  text(px,w,docType==="marking"?"MARKING SCHEME":"QUESTION PAPER",120,475,4,[203,213,225,255]);
  text(px,w,"PASTPAPERZONE.LK",810,530,3,[245,158,11,255]);

  // PNG rows: filter byte + RGBA pixels.
  const raw=new Uint8Array(h*(1+w*4));
  for(let y=0;y<h;y++){ raw[y*(1+w*4)]=0; raw.set(px.subarray(y*w*4,(y+1)*w*4),y*(1+w*4)+1); }
  const cs=new CompressionStream("deflate");
  const writer=cs.writable.getWriter(); writer.write(raw); writer.close();
  const compressed=new Uint8Array(await new Response(cs.readable).arrayBuffer());
  const ihdr=new Uint8Array(13); new DataView(ihdr.buffer).setUint32(0,w); new DataView(ihdr.buffer).setUint32(4,h);
  ihdr[8]=8; ihdr[9]=6; // RGBA
  const sig=new Uint8Array([137,80,78,71,13,10,26,10]);
  const iend=chunk("IEND",new Uint8Array());
  const idat=chunk("IDAT",compressed);
  const ih=chunk("IHDR",ihdr);
  const png=new Uint8Array(sig.length+ih.length+idat.length+iend.length);
  let off=0; for(const part of [sig,ih,idat,iend]){png.set(part,off);off+=part.length;}
  return png;
}

export async function notifyChannelNewPaper(params: {subjectId:string;year:string;medium:Medium;docType:DocType}) {
  const token=process.env.TELEGRAM_BOT_TOKEN;
  const channelId=process.env.TELEGRAM_CHANNEL_ID;
  if(!token || !channelId) return;

  const {subjectId,year,medium,docType}=params;
  const subject=ALL_SUBJECTS.find(item=>item.id===subjectId);
  const level=subject?.level==="AL"?"A/L":"O/L";
  const subjectName=SUBJECT_NAMES[subjectId]||subjectId;
  const subjectEnglish=SUBJECT_EN[subjectId]||subjectName;
  const docLabel=docType==="marking"?"Marking Scheme":"Past Paper";
  const docLabelSi=docType==="marking"?"පිළිතුරු පත්‍රය":"ප්‍රශ්න පත්‍රය";
  const paperPageUrl=`${BASE_URL}/si/papers/${subject?.level.toLowerCase()||"ol"}/${subjectId}/${year}/${medium}${docType==="marking"?"?type=marking":""}`;
  const discussionLink=process.env.TELEGRAM_DISCUSSION_INVITE_LINK||BASE_URL;
  const caption=`📝 *${year} ${level}*\n*${subjectName}*\n\n${MEDIUM_LABEL[medium]}\n🗂️ ${docLabelSi} (${docLabel})\n\nGCE ${level} ${subjectEnglish} ${docLabel} ${year} — ${MEDIUM_LABEL[medium]}\n\nDownload now →`;
  const replyMarkup={inline_keyboard:[
    [{text:"📥 Download Now",url:paperPageUrl}],
    [{text:"💬 Join Discussion Group",url:discussionLink}],
    [{text:"🔗 Visit Site",url:BASE_URL}],
  ]};

  try {
    const graphic=await createCanvasGraphic(subjectEnglish,year,MEDIUM_LABEL[medium],level,docType);
    // Telegram accepts multipart uploads; this avoids depending on SVG/remote image conversion.
    const form=new FormData();
    form.append("chat_id",channelId);
    form.append("photo",new Blob([graphic],{type:"image/png"}),`ppz-${subjectId}-${year}-${medium}.png`);
    form.append("caption",caption);
    form.append("parse_mode","Markdown");
    form.append("reply_markup",JSON.stringify(replyMarkup));
    const response=await fetch(`https://api.telegram.org/bot${token}/sendPhoto`,{method:"POST",body:form});
    const data=await response.json() as any;
    if(!response.ok || !data.ok) throw new Error(data.description||"Telegram sendPhoto failed");
    await trackTelegramLinkDelivery({subjectId,year,medium,docType,chatType:"channel"});
  } catch(error) {
    console.error("Branded channel photo failed:",error);
    await telegram(token,"sendMessage",{chat_id:channelId,text:caption,parse_mode:"Markdown",disable_web_page_preview:true,reply_markup:replyMarkup});
    await trackTelegramLinkDelivery({subjectId,year,medium,docType,chatType:"channel"});
  }
}
