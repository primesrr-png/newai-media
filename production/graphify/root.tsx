import React from 'react';
import {AbsoluteFill, Audio, staticFile, Composition, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const lime = '#d6ff46';
const scenes = [
 {eyebrow:'ЗНАКОМО?',title:'CODEX СНОВА',accent:'ЧИТАЕТ ВСЁ?',tab:'Проект / контекст',label:'01 / ПРОБЛЕМА',heading:'Новый чат. Тот же проект.',text:'Файлы, функции, зависимости… Как быстро найти нужные связи?',chips:['Где логика?','Что с чем связано?']},
 {eyebrow:'НАХОДКА С GITHUB',title:'GRAPHIFY',accent:'КАРТА ДЛЯ ИИ',tab:'github.com / Graphify-Labs / graphify',label:'02 / ИНСТРУМЕНТ',heading:'148 000+ звёзд',text:'Строит граф связей кода и документов. ИИ может запрашивать нужный контекст.',chips:['Файлы → функции','Функции → связи']},
 {eyebrow:'КАК ЭТО УСТРОЕНО',title:'ВМЕСТО ХАОСА —',accent:'СВЯЗИ ПРОЕКТА',tab:'Graphify / схема принципа работы',label:'03 / СХЕМА',heading:'Код → карта → запрос',text:'Парсинг кода выполняется локально. Для документов может потребоваться модель.',chips:['Codex','Claude Code','Cursor']},
 {eyebrow:'СОХРАНИ НАХОДКУ',title:'НЕ ВОЛШЕБНАЯ',accent:'ПАМЯТЬ',tab:'Graphify / полезно знать',label:'04 / НЮАНС',heading:'Карту нужно обновлять',text:'Проект меняется — контекст тоже. Звёзды показывают интерес, а не обещают результат.',chips:['Обновление графа','Запрос контекста']},
 {eyebrow:'ССЫЛКА И ПОДРОБНОСТИ',title:'ЗАБИРАЙ',accent:'В TELEGRAM',tab:'t.me / NewAI_pro',label:'05 / ПРОДОЛЖЕНИЕ',heading:'@NewAI_pro',text:'Что умеет Graphify и где посмотреть установку. Подпишись на полезные ИИ-находки.',chips:['Сохрани','Отправь коллеге']},
];

const MacNews: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const index = Math.min(4, Math.floor(frame / 150));
  const local = frame % 150;
  const s = scenes[index];
  const enter = spring({frame:local,fps,config:{damping:22,stiffness:130}});
  const opacity = interpolate(local,[0,8,142,149],[0,1,1,.3],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{background:'#101413',color:'#f8faf0',fontFamily:'Arial, sans-serif',padding:'140px 66px',overflow:'hidden'}}>
    <Audio src={staticFile('bed.wav')} volume={0.7}/><div style={{position:'absolute',width:800,height:800,borderRadius:'50%',background:'#b2d832',filter:'blur(230px)',opacity:.12,left:280,top:480}}/>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:25,letterSpacing:4,color:'#a3aa9f'}}><b style={{color:lime}}>NEW AI</b><span>НАХОДКИ · ИНСТРУМЕНТЫ</span></div>
    <div style={{opacity,transform:`translateY(${(1-enter)*35}px)`}}>
      <div style={{fontSize:23,letterSpacing:3,color:'#9fa993',marginTop:95,marginBottom:25}}>{s.eyebrow}</div>
      <div style={{fontSize:63,fontWeight:900,lineHeight:1.12,letterSpacing:-2}}>{s.title}<br/><span style={{color:lime}}>{s.accent}</span></div>
      <div style={{marginTop:75,border:'2px solid #455044',borderRadius:28,background:'#1a211d',boxShadow:'0 45px 100px #0009',transform:`perspective(1800px) rotateX(${(1-enter)*7}deg) scale(${.96+enter*.04})`}}>
        <div style={{height:76,display:'flex',alignItems:'center',gap:12,padding:'0 24px',borderBottom:'1px solid #3c463e',background:'#28302a',borderRadius:'26px 26px 0 0'}}>
          {['#ff6259','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:18,height:18,borderRadius:'50%',background:c}}/>)}
          <span style={{marginLeft:22,fontSize:19,color:'#b6c0b4'}}>{s.tab}</span>
        </div>
        <div style={{padding:'56px 42px 65px'}}>
          <div style={{fontSize:22,letterSpacing:3,color:lime}}>{s.label}</div>
          <div style={{width:110,height:110,background:lime,borderRadius:28,marginTop:45,display:'flex',alignItems:'center',justifyContent:'center',fontSize:60,fontWeight:900,color:'#15200c'}}>✦</div>
          <h2 style={{fontSize:52,lineHeight:1.12,margin:'34px 0 24px',letterSpacing:-1}}>{s.heading}</h2>
          <div style={{fontSize:31,lineHeight:1.5,color:'#b7c1b3',minHeight:100}}>{s.text}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:12,marginTop:40}}>{s.chips.map((chip,i)=><div key={chip} style={{padding:'17px 20px',borderRadius:15,border:'1px solid #56674a',fontSize:25,color:local>18+i*7?lime:'#67705f'}}>{chip}</div>)}</div>
        </div>
      </div>
    </div>
    <div style={{position:'absolute',bottom:190,left:66,right:66,display:'flex',justifyContent:'space-between',fontSize:25,color:'#aab49e'}}><span>@newai_pro</span><span>GITHUB · ОБЗОР ПРОЕКТА</span></div>
    <div style={{position:'absolute',bottom:155,left:66,width:948,height:5,background:'#354030'}}><div style={{width:`${frame/749*100}%`,height:'100%',background:lime}}/></div>
  </AbsoluteFill>;
};

export const Root: React.FC = () => <Composition id="MacNews" component={MacNews} durationInFrames={750} fps={30} width={1080} height={1920}/>;
