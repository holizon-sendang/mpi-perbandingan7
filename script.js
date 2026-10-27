function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=b; b=a%b; a=t; } return a||1; }
function fmt(n){ return n.toLocaleString('id-ID'); }
function rp(n){ return 'Rp'+fmt(n); }

/* ---------- Visualizer Apel & Jeruk ---------- */
var apelRange=document.getElementById('apelRange'), jerukRange=document.getElementById('jerukRange');
function renderDots(el,count,cls,label){
  el.innerHTML='';
  for(var i=0;i<count;i++){ var d=document.createElement('span'); d.className='dot '+cls; d.textContent=label; el.appendChild(d); }
}
function updateRatio(){
  var a=parseInt(apelRange.value), b=parseInt(jerukRange.value);
  document.getElementById('apelVal').textContent=a;
  document.getElementById('jerukVal').textContent=b;
  renderDots(document.getElementById('apelDots'),a,'dot-apel','A');
  renderDots(document.getElementById('jerukDots'),b,'dot-jeruk','J');
  var max=Math.max(a,b);
  document.getElementById('apelBar').style.width=(a/max*100)+'%';
  document.getElementById('jerukBar').style.width=(b/max*100)+'%';
  var g=gcd(a,b), sa=a/g, sb=b/g;
  var same=(g===1);
  document.getElementById('ratioBig').textContent = same ? (a+' : '+b+'  (sudah paling sederhana)') : (a+' : '+b+'  =  '+sa+' : '+sb);
  document.getElementById('ratioText').textContent = 'Sebagai pecahan: '+a+'/'+b+(same?'':' = '+sa+'/'+sb)+'. Artinya setiap '+sa+' apel, ada '+sb+' jeruk. FPB dari '+a+' dan '+b+' adalah '+g+'.';
}
apelRange.addEventListener('input',updateRatio);
jerukRange.addEventListener('input',updateRatio);
updateRatio();

/* ---------- Kalkulator Penyederhana ---------- */
function simplify(){
  var a=parseInt(document.getElementById('simpA').value), b=parseInt(document.getElementById('simpB').value);
  if(!a||!b||a<1||b<1){ document.getElementById('simpResult').textContent='Isi kedua bilangan dengan angka positif dulu ya'; return; }
  var g=gcd(a,b), sa=a/g, sb=b/g;
  document.getElementById('simpResult').textContent = a+' : '+b+'  →  '+sa+' : '+sb;
  document.getElementById('simpFpb').textContent = g===1 ? 'FPB-nya 1 — perbandingan ini sudah paling sederhana' : 'FPB dari '+a+' dan '+b+' adalah '+fmt(g);
  document.getElementById('simpSteps').innerHTML = '<strong>Langkah-langkahnya:</strong><ol>'+
    '<li>Cari FPB dari '+fmt(a)+' dan '+fmt(b)+' → <strong>'+fmt(g)+'</strong></li>'+
    '<li>Bagi bilangan pertama: '+fmt(a)+' ÷ '+fmt(g)+' = <strong>'+fmt(sa)+'</strong></li>'+
    '<li>Bagi bilangan kedua: '+fmt(b)+' ÷ '+fmt(g)+' = <strong>'+fmt(sb)+'</strong></li>'+
    '<li>Jadi bentuk sederhananya adalah <strong>'+sa+' : '+sb+'</strong></li></ol>';
}
document.getElementById('simpBtn').addEventListener('click',simplify);
document.getElementById('simpA').addEventListener('change',simplify);
document.getElementById('simpB').addEventListener('change',simplify);

/* ---------- Grafik helpers ---------- */
function drawLineChart(svgId, points, color, hlIndex, xLabel, yLabel){
  var svg=document.getElementById(svgId); if(!svg) return;
  var W=320,H=190,pl=38,pb=26,pt=12,pr=12;
  var maxX=Math.max.apply(null,points.map(function(p){return p[0]}));
  var maxY=Math.max.apply(null,points.map(function(p){return p[1]}));
  function X(v){return pl+(v/maxX)*(W-pl-pr);}
  function Y(v){return H-pb-(v/maxY)*(H-pt-pb);}
  var s='';
  s+='<line x1="'+pl+'" y1="'+(H-pb)+'" x2="'+(W-pr)+'" y2="'+(H-pb)+'" stroke="#9db3ab" stroke-width="1.5"/>';
  s+='<line x1="'+pl+'" y1="'+pt+'" x2="'+pl+'" y2="'+(H-pb)+'" stroke="#9db3ab" stroke-width="1.5"/>';
  var path=points.map(function(p,i){return (i===0?'M':'L')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1);}).join(' ');
  s+='<path d="'+path+'" fill="none" stroke="'+color+'" stroke-width="3" stroke-linecap="round"/>';
  points.forEach(function(p,i){
    var hl=i===hlIndex;
    s+='<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="'+(hl?6:3.5)+'" fill="'+(hl?'#E9A23B':color)+'" stroke="#fff" stroke-width="1.5"/>';
    if(hl){ s+='<text x="'+X(p[0])+'" y="'+(Y(p[1])-12)+'" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">'+p[0]+' → '+fmt(p[1])+'</text>'; }
  });
  s+='<text x="'+(W-pr)+'" y="'+(H-6)+'" text-anchor="end" font-size="10.5" fill="currentColor" opacity=".65">'+xLabel+'</text>';
  s+='<text x="6" y="'+(pt+4)+'" font-size="10.5" fill="currentColor" opacity=".65">'+yLabel+'</text>';
  svg.innerHTML=s;
}

/* ---------- Simulasi Senilai: Buku ---------- */
var HARGA_BUKU=6000;
var bukuRange=document.getElementById('bukuRange');
function updateBuku(){
  var n=parseInt(bukuRange.value);
  document.getElementById('bukuVal').textContent=n+' buku';
  document.getElementById('bukuTotal').textContent=rp(n*HARGA_BUKU);
  document.getElementById('bukuCalc').textContent=n+' × '+rp(HARGA_BUKU)+' = '+rp(n*HARGA_BUKU);
  var pts=[]; for(var i=0;i<=10;i++){ pts.push([i,i*HARGA_BUKU/1000]); }
  drawLineChart('senilaiChart',pts,'#0E7C6B',n,'Jumlah buku →','Harga (ribu Rp)');
  var tb=document.querySelector('#bukuTable tbody'); tb.innerHTML='';
  for(var j=1;j<=10;j++){
    var tr=document.createElement('tr'); if(j===n) tr.className='hl';
    tr.innerHTML='<td>'+j+' buku</td><td class="num">'+rp(j*HARGA_BUKU)+'</td>'; tb.appendChild(tr);
  }
}
bukuRange.addEventListener('input',updateBuku); updateBuku();

/* ---------- Simulasi Berbalik: Pekerja ---------- */
var TOTAL_KERJA=60;
var pekerjaRange=document.getElementById('pekerjaRange');
function updatePekerja(){
  var n=parseInt(pekerjaRange.value);
  var hari=TOTAL_KERJA/n;
  var hariTxt=(hari%1===0)?fmt(hari):hari.toFixed(1).replace('.',',');
  document.getElementById('pekerjaVal').textContent=n+' orang';
  document.getElementById('pekerjaHari').textContent=hariTxt+' hari';
  document.getElementById('pekerjaCalc').textContent='60 ÷ '+n+' pekerja = '+hariTxt+' hari · hasil kali selalu tetap: '+n+' × '+hariTxt+' = 60';
  var pts=[]; for(var i=2;i<=20;i++){ pts.push([i,TOTAL_KERJA/i]); }
  drawLineChart('berbalikChart',pts,'#E85D3F',n-2,'Jumlah pekerja →','Hari');
}
pekerjaRange.addEventListener('input',updatePekerja); updatePekerja();

/* ---------- Kalkulator Skala ---------- */
var skalaMode=document.getElementById('skalaMode');
function updateSkalaFields(){
  var m=skalaMode.value;
  document.getElementById('fieldPeta').style.display=(m==='peta')?'none':'block';
  document.getElementById('fieldSebenarnya').style.display=(m==='sebenarnya')?'none':'block';
  document.getElementById('fieldSkala').style.display=(m==='skala')?'none':'block';
  hitungSkala();
}
function numVal(id){ var v=parseFloat(document.getElementById(id).value); return isNaN(v)?0:v; }
function hitungSkala(){
  var m=skalaMode.value;
  var label=document.getElementById('skalaResLabel'), res=document.getElementById('skalaResult'), exp=document.getElementById('skalaExplain');
  if(m==='sebenarnya'){
    var jp=numVal('inPeta'), sk=numVal('inSkala');
    if(jp<=0||sk<=0){ res.textContent='—'; exp.textContent='Isi jarak di peta dan skala dulu ya.'; return; }
    var cm=jp*sk, km=cm/100000;
    label.textContent='JARAK SEBENARNYA';
    res.textContent=(km%1===0?fmt(km):km.toLocaleString('id-ID',{maximumFractionDigits:2}))+' km';
    exp.textContent=jp+' cm × '+fmt(sk)+' = '+fmt(cm)+' cm = '+(km%1===0?fmt(km):km)+' km';
  } else if(m==='peta'){
    var jsKm=numVal('inSebenarnya'), sk2=numVal('inSkala');
    if(jsKm<=0||sk2<=0){ res.textContent='—'; exp.textContent='Isi jarak sebenarnya dan skala dulu ya.'; return; }
    var cm2=jsKm*100000, jp2=cm2/sk2;
    label.textContent='JARAK DI PETA';
    res.textContent=(jp2%1===0?fmt(jp2):jp2.toLocaleString('id-ID',{maximumFractionDigits:2}))+' cm';
    exp.textContent=jsKm+' km = '+fmt(cm2)+' cm, lalu ÷ '+fmt(sk2)+' = '+(jp2%1===0?fmt(jp2):jp2)+' cm';
  } else {
    var jp3=numVal('inPeta'), jsKm3=numVal('inSebenarnya');
    if(jp3<=0||jsKm3<=0){ res.textContent='—'; exp.textContent='Isi jarak di peta dan jarak sebenarnya dulu ya.'; return; }
    var cm3=jsKm3*100000, sk3=Math.round(cm3/jp3);
    label.textContent='SKALANYA';
    res.textContent='1 : '+fmt(sk3);
    exp.textContent=jsKm3+' km = '+fmt(cm3)+' cm, lalu '+fmt(cm3)+' ÷ '+jp3+' cm = '+fmt(sk3)+' → skala 1 : '+fmt(sk3);
  }
}
skalaMode.addEventListener('change',updateSkalaFields);
['inPeta','inSebenarnya','inSkala'].forEach(function(id){ document.getElementById(id).addEventListener('input',hitungSkala); });
updateSkalaFields();

/* ---------- Tabs contoh soal ---------- */
document.querySelectorAll('.tab-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active')});
    document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('active')});
    btn.classList.add('active');
    document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
  });
});

/* ---------- KUIS ---------- */
var QUESTIONS=[
 {q:'Di keranjang ada 12 apel dan 8 jeruk. Bentuk paling sederhana dari perbandingan apel : jeruk adalah…',opts:['12 : 8','6 : 4','3 : 2','2 : 3'],ans:2,exp:'Bagi keduanya dengan FPB-nya, yaitu 4. 12 ÷ 4 = 3 dan 8 ÷ 4 = 2. Jadi 3 : 2. Hati-hati, urutan tidak boleh tertukar: apel dulu, baru jeruk.'},
 {q:'Perbandingan uang Rina : Sinta adalah 4 : 7. Selisih uang mereka Rp30.000. Berapa uang Sinta?',opts:['Rp40.000','Rp70.000','Rp75.000','Rp110.000'],ans:1,exp:'Selisih bagian = 7 − 4 = 3 bagian = Rp30.000, jadi 1 bagian = Rp10.000. Uang Sinta = 7 × Rp10.000 = Rp70.000.'},
 {q:'Harga 5 buku adalah Rp35.000. Dengan harga satuan yang sama, harga 8 buku adalah…',opts:['Rp48.000','Rp52.000','Rp56.000','Rp64.000'],ans:2,exp:'Ini perbandingan senilai. Harga 1 buku = 35.000 ÷ 5 = Rp7.000. Maka 8 buku = 8 × 7.000 = Rp56.000.'},
 {q:'Sebuah proyek selesai dalam 12 hari oleh 10 pekerja. Jika pekerjanya menjadi 15 orang (kecepatan kerja sama), proyek selesai dalam…',opts:['18 hari','8 hari','10 hari','6 hari'],ans:1,exp:'Ini perbandingan berbalik nilai: pekerja bertambah, waktu berkurang. Total kerja = 10 × 12 = 120. Lama hari = 120 ÷ 15 = 8 hari.'},
 {q:'Skala peta 1 : 500.000. Jika jarak dua kota di peta 4 cm, jarak sebenarnya adalah…',opts:['2 km','20 km','50 km','200 km'],ans:1,exp:'Jarak sebenarnya = 4 × 500.000 = 2.000.000 cm. Ubah ke km: 2.000.000 ÷ 100.000 = 20 km.'},
 {q:'Resep kue membutuhkan 2 gelas tepung untuk 12 kue. Untuk membuat 30 kue, tepung yang dibutuhkan adalah…',opts:['3 gelas','4 gelas','5 gelas','6 gelas'],ans:2,exp:'Perbandingan senilai: 30 kue adalah 30 ÷ 12 = 2,5 kali lipatnya. Tepung = 2 × 2,5 = 5 gelas.'},
 {q:'Sebuah mobil menempuh perjalanan dalam 4 jam dengan kecepatan 60 km/jam. Jika kecepatannya 80 km/jam, waktu tempuhnya menjadi…',opts:['3 jam','3,5 jam','5 jam','5,5 jam'],ans:0,exp:'Kecepatan naik, waktu turun → berbalik nilai. Jarak tetap = 60 × 4 = 240 km. Waktu = 240 ÷ 80 = 3 jam.'},
 {q:'Perbandingan umur Ayah : Anak adalah 7 : 2. Jika umur Ayah 42 tahun, umur Anak adalah…',opts:['10 tahun','12 tahun','14 tahun','21 tahun'],ans:1,exp:'7 bagian = 42 tahun, jadi 1 bagian = 6 tahun. Umur Anak = 2 × 6 = 12 tahun.'}
];
var qi=0, score=0, answered=false;
var quizBody=document.getElementById('quizBody');
function renderQuiz(){
  answered=false;
  document.getElementById('quizProgressText').textContent='Soal '+(qi+1)+' dari '+QUESTIONS.length;
  document.getElementById('quizScorePill').textContent='Skor: '+score+' / '+QUESTIONS.length;
  document.getElementById('quizProgressFill').style.width=(qi/QUESTIONS.length*100)+'%';
  var item=QUESTIONS[qi];
  var html='<p style="font-size:17.5px;font-weight:700;margin:0 0 16px">'+item.q+'</p>';
  item.opts.forEach(function(o,i){
    html+='<button class="opt-btn" data-i="'+i+'"><span class="letter">'+'ABCD'[i]+'</span><span>'+o+'</span></button>';
  });
  html+='<div class="feedback" id="quizFeedback"></div>';
  html+='<div id="quizNext" style="margin-top:14px"></div>';
  quizBody.innerHTML=html;
  quizBody.querySelectorAll('.opt-btn').forEach(function(btn){
    btn.addEventListener('click',function(){ answerQuiz(parseInt(btn.getAttribute('data-i')),btn); });
  });
}
function answerQuiz(i,btn){
  if(answered) return; answered=true;
  var item=QUESTIONS[qi];
  var fb=document.getElementById('quizFeedback');
  var correct=i===item.ans;
  if(correct) score++;
  quizBody.querySelectorAll('.opt-btn').forEach(function(b){
    b.disabled=true;
    var bi=parseInt(b.getAttribute('data-i'));
    if(bi===item.ans) b.classList.add('correct');
    else if(bi===i) b.classList.add('wrong');
  });
  fb.className='feedback show '+(correct?'ok':'no');
  fb.innerHTML=(correct?'<strong>Benar! 🎉</strong> ':'<strong>Belum tepat.</strong> Jawaban yang benar: <strong>'+item.opts[item.ans]+'</strong>. ')+item.exp;
  document.getElementById('quizScorePill').textContent='Skor: '+score+' / '+QUESTIONS.length;
  document.getElementById('quizProgressFill').style.width=((qi+1)/QUESTIONS.length*100)+'%';
  var last=qi===QUESTIONS.length-1;
  document.getElementById('quizNext').innerHTML='<button class="btn '+(last?'btn-amber':'btn-primary')+'" id="nextBtn" style="width:100%;justify-content:center">'+(last?'Lihat Hasil Akhir':'Soal Berikutnya →')+'</button>';
  document.getElementById('nextBtn').addEventListener('click',function(){
    if(last){ renderResult(); } else { qi++; renderQuiz(); }
  });
}
function renderResult(){
  document.getElementById('quizProgressText').textContent='Kuis selesai!';
  var pct=Math.round(score/QUESTIONS.length*100);
  var msg, sub;
  if(pct===100){ msg='Sempurna! 🏆'; sub='Kamu sudah menguasai perbandingan. Siap naik ke materi berikutnya!'; }
  else if(pct>=75){ msg='Hebat!'; sub='Sedikit lagi sempurna. Cek kembali soal yang tadi salah, lalu coba lagi.'; }
  else if(pct>=50){ msg='Bagus, terus berlatih!'; sub='Dasarnya sudah dapat. Ulangi simulasi senilai vs berbalik nilai, itu yang paling sering tertukar.'; }
  else { msg='Tidak apa-apa, ayo ulangi materinya'; sub='Geser-geser lagi Laboratorium Apel & Jeruk dan kedua simulasi di atas, lalu coba kuisnya sekali lagi.'; }
  quizBody.innerHTML='<div style="text-align:center;padding:10px 0 4px">'+
    '<div class="score-ring" style="--p:'+pct+'%"><div class="score-ring-inner"><div><div style="font-size:30px;font-weight:800;line-height:1">'+score+'/'+QUESTIONS.length+'</div><div style="font-size:12.5px;color:var(--muted)">'+pct+' poin</div></div></div></div>'+
    '<h3 style="font-size:24px;margin:18px 0 6px">'+msg+'</h3><p style="color:var(--muted);max-width:46ch;margin:0 auto 20px">'+sub+'</p>'+
    '<button class="btn btn-primary" id="retryBtn">↺ Ulangi Kuis</button> &nbsp;<a class="btn btn-ghost" href="#rangkuman">Lihat Rangkuman</a></div>';
  document.getElementById('retryBtn').addEventListener('click',function(){ qi=0; score=0; renderQuiz(); });
}
renderQuiz();

/* ---------- Nav aktif ---------- */
var navMap={konsep:0,sederhanakan:1,senilai:2,skala:3,contoh:4,kuis:5};
var links=document.querySelectorAll('#navLinks a');
var obs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      links.forEach(function(l){l.classList.remove('active')});
      var idx=navMap[e.target.id]; if(idx!==undefined && links[idx]) links[idx].classList.add('active');
    }
  });
},{rootMargin:'-35% 0px -55% 0px'});
['konsep','sederhanakan','senilai','skala','contoh','kuis'].forEach(function(id){ var el=document.getElementById(id); if(el) obs.observe(el); });
