/* ============ 学习页：首页 / 课程 / 模块 / 单词 / 单词卡 / 拼读 ============ */
(function () {
  'use strict';
  const A = window.App;
  const { $, $$, esc, icon, UI, par, TTS } = A;
  const GRADE_CN = ['一', '二', '三', '四', '五', '六'];
  const gradeName = (g) => `${GRADE_CN[g - 1]}年级`;
  const gradeColor = (g) => A.BOOKS.find(b => b.grade === g).color;
  const POS_CN = { 'n.': '名词', 'v.': '动词', 'adj.': '形容词', 'adv.': '副词', 'pron.': '代词', 'prep.': '介词', 'conj.': '连词', 'num.': '数词', 'int.': '感叹词', 'modal v.': '情态动词', 'det.': '限定词' };

  // ---------- 小梨 / 单词精灵 ----------
  const SPRITE_TOTAL = () => A.BOOKS.reduce((n, b) => n + b.modules.length, 0);
  const spriteCount = () => Object.keys(A.state.sprites || {}).length;
  const levelStars = (b, mi) => (A.state.levels || {})[A.modKey(b, mi)] || 0;
  const isCleared = (b, mi) => levelStars(b, mi) > 0;
  const isUnlocked = (b, mi) => mi === 0 || isCleared(b, mi - 1) || A.moduleStat(b, mi).learned > 0;
  const spriteName = (b, mi) => `${b.modules[mi].zh}精灵`;

  function currentLevel(b) {
    for (let mi = 0; mi < b.modules.length; mi++) {
      if (isUnlocked(b, mi) && !isCleared(b, mi)) return mi;
    }
    return b.modules.length - 1;
  }

  function advBook() {
    const last = A.state.last;
    const b = last && A.BOOKS.find(x => A.bookKey(x) === last.book);
    return b || A.BOOKS[0];
  }

  function mascot(mood = 'happy', size = 72) {
    const eye = mood === 'cheer'
      ? '<path d="M24 34q3-4 6 0M34 34q3-4 6 0" stroke="#6B4410" stroke-width="2" fill="none" stroke-linecap="round"/>'
      : '<circle cx="27" cy="33" r="2.3" fill="#4A2E08"/><circle cx="37" cy="33" r="2.3" fill="#4A2E08"/><circle cx="27.8" cy="32.2" r=".8" fill="#fff"/><circle cx="37.8" cy="32.2" r=".8" fill="#fff"/>';
    const mouth = mood === 'oops'
      ? '<ellipse cx="32" cy="40.5" rx="2.4" ry="2.8" fill="#7C3A00"/>'
      : mood === 'think'
        ? '<path d="M28.5 40.5h7" stroke="#7C3A00" stroke-width="1.8" stroke-linecap="round"/>'
        : '<path d="M27.5 38.8q4.5 4.6 9 0" stroke="#7C3A00" stroke-width="1.9" fill="none" stroke-linecap="round"/>';
    const arms = mood === 'cheer'
      ? '<path d="M18.5 35l-5.5-6M45.5 35l5.5-6" stroke="#E08A00" stroke-width="2.6" stroke-linecap="round"/>'
      : '<path d="M18.5 40l-5 3.5M45.5 40l5 3.5" stroke="#E08A00" stroke-width="2.6" stroke-linecap="round"/>';
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="59" rx="14" ry="3" fill="#7C2D12" opacity=".1"/>
      <path d="M32 13c-7.2 0-11.5 4.7-11.5 10.3 0 3 1 5.2 1 8.2 0 12 4.4 20.5 10.5 20.5S42.5 43.5 42.5 31.5c0-3 1-5.2 1-8.2C43.5 17.7 39.2 13 32 13z" fill="#FFC53D" stroke="#E08A00" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="M27 19.5c-2 2-3 4.2-3 7" stroke="#FFE9A8" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M32 13c1.2-5.2 5.2-8.4 10.6-8.6-.8 5.4-4.4 8.6-10.6 8.6z" fill="#34D399" stroke="#059669" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M32 13v-3" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      ${arms}
      <ellipse cx="23.5" cy="38" rx="3.2" ry="2.1" fill="#FB7185" opacity=".4"/>
      <ellipse cx="40.5" cy="38" rx="3.2" ry="2.1" fill="#FB7185" opacity=".4"/>
      ${eye}
      ${mouth}
    </svg>`;
  }

  function spriteOf(b, mi, size = 54) {
    const c = b.color;
    const v = mi % 3;
    const ears = v === 0
      ? `<path d="M19 24 16 13l11 5z" fill="${c}"/><path d="M45 24l3-11-11 5z" fill="${c}"/>`
      : v === 1
        ? `<rect x="20" y="7" width="7.5" height="16" rx="3.75" fill="${c}"/><rect x="36.5" y="7" width="7.5" height="16" rx="3.75" fill="${c}"/>`
        : `<path d="M32 20V9" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><circle cx="32" cy="7" r="3.4" fill="${c}"/>`;
    const feet = `<ellipse cx="24" cy="55" rx="5.6" ry="3.4" fill="${c}"/><ellipse cx="40" cy="55" rx="5.6" ry="3.4" fill="${c}"/>`;
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="59.5" rx="11" ry="2.4" fill="#22303F" opacity=".1"/>
      ${ears}${feet}
      <ellipse cx="32" cy="36.5" rx="18" ry="17" fill="${c}"/>
      <ellipse cx="32" cy="45" rx="9.5" ry="6.5" fill="#fff" opacity=".24"/>
      <ellipse cx="23" cy="32" rx="2.6" ry="3.6" fill="#22303F"/>
      <ellipse cx="41" cy="32" rx="2.6" ry="3.6" fill="#22303F"/>
      <circle cx="23.9" cy="30.6" r=".9" fill="#fff"/>
      <circle cx="41.9" cy="30.6" r=".9" fill="#fff"/>
      <path d="M27.5 40.5q4.5 4 9 0" stroke="#22303F" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="19.5" cy="38.5" rx="3" ry="1.8" fill="#FB7185" opacity=".5"/>
      <ellipse cx="44.5" cy="38.5" rx="3" ry="1.8" fill="#FB7185" opacity=".5"/>
    </svg>`;
  }

  // ---------- 首页 ----------
  A.routes.home = () => {
    const book = advBook();
    const mi = currentLevel(book);
    const m = book.modules[mi];
    const clearedN = book.modules.filter((_, i) => isCleared(book, i)).length;
    const allDone = clearedN === book.modules.length;
    const st = A.streak();
    const due = A.reviewCount();
    const got = spriteCount();
    const totalSp = SPRITE_TOTAL();
    const learned = A.totalLearnedCount();

    const todaySents = A.allSentences();
    const now = new Date();
    const dayStart = Date.UTC(now.getFullYear(), 0, 1);
    const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const dailyIndex = Math.floor(todayUTC / 86400000);
    const dayOfYear = Math.round((todayUTC - dayStart) / 86400000) + 1;
    const daily = todaySents[dailyIndex % todaySents.length];

    const bubble = allDone
      ? '这本书的关卡全部通关啦，要不要挑战满星？'
      : learned === 0
        ? '今天先认识 6 个单词朋友，3 分钟就够啦。'
        : `第 ${mi + 1} 关「${m.zh}」在等你，${m.words.length} 个单词，约 3 分钟。`;
    const chap = window.Story ? window.Story.chapter(book, mi) : null;
    const finaleReady = window.Story ? window.Story.finaleReady(book) : false;

    $('#view').innerHTML = `<div class="page adv-page">
      <div class="adv-hero">
        <div class="adv-copy">
          <div class="adv-hi">Hi，我是小梨</div>
          <p class="adv-say">${esc(bubble)}</p>
          <button class="adv-hear" data-act="hear">${icon('volume', 'i-sm')} 听小梨说</button>
          <div class="adv-chips">
            <span>${icon('flame', 'i-sm')} 连续 <b>${st}</b> 天</span>
            <span>${icon('sparkle', 'i-sm')} 精灵 <b>${got}</b>/${totalSp}</span>
          </div>
        </div>
        <div class="adv-mascot" role="button" tabindex="0" aria-label="和小梨说话">${mascot(allDone ? 'cheer' : 'happy', 92)}</div>
      </div>

      <button class="adv-cta" data-act="start">
        <span class="pla">${icon('play', 'i-lg')}</span>
        <span class="tx">
          <b>${allDone ? '再挑战一次' : `开始第 ${mi + 1} 关`}</b>
          <em>${esc(m.name)} · ${esc(m.zh)} · ${m.words.length} 词</em>
        </span>
        <span class="go">${icon('chevron', 'i-sm')}</span>
      </button>

      ${chap ? `<button class="adv-story" data-act="${finaleReady ? 'finale' : 'story'}">
        <span class="as-ico">${icon('book', 'i-sm')}</span>
        <span class="as-t">
          <b>${finaleReady ? '篇章结局 · 雪梨树开花了' : `第 ${mi + 1} 幕 · ${esc(chap.title)}`}</b>
          <em>${finaleReady ? '六只精灵都到齐了' : `${chap.seen ? '故事回顾' : '新剧情'} · ${esc(chap.place)}`}</em>
        </span>
        <span class="as-go">${icon('play', 'i-sm')}</span>
      </button>` : ''}

      <div class="card adv-map">
        <div class="map-head">
          <div><b>${esc(book.title)}</b><span>冒险地图 · 已通关 ${clearedN}/${book.modules.length}</span></div>
          <button data-act="course">换教材 ${icon('chevron', 'i-sm')}</button>
        </div>
        <div class="map-list">
          ${book.modules.map((mm, i) => {
            const done = isCleared(book, i);
            const unlocked = isUnlocked(book, i);
            const stars = levelStars(book, i);
            const isCur = i === mi && !done;
            return `<button class="lv ${done ? 'done' : ''} ${isCur ? 'cur' : ''} ${unlocked ? '' : 'locked'}" data-lv="${i}">
              <span class="dot">${done ? icon('star', 'i-sm') : unlocked ? `<b>${i + 1}</b>` : icon('lock', 'i-sm')}</span>
              <span class="body"><b>${esc(mm.zh)}</b><em>${esc(mm.name)} · ${mm.words.length} 词</em></span>
              <span class="right">${done ? `<i class="star3">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</i>` : isCur ? '<i class="go-pill">开始</i>' : unlocked ? '' : '<i class="lock-tip">未解锁</i>'}</span>
            </button>`;
          }).join('')}
        </div>
      </div>

      <div class="adv-tools">
        <button data-act="review"><span class="ti" style="background:var(--sky-soft);color:#1D4ED8">${icon('refresh')}</span><b>复习小站</b><em>${due ? due + ' 个待复习' : '暂无任务'}</em></button>
        <button data-act="sprites"><span class="ti" style="background:var(--violet-soft);color:#6D28D9">${icon('sparkle')}</span><b>精灵图鉴</b><em>${got} / ${totalSp}</em></button>
        <button data-act="report"><span class="ti" style="background:var(--leaf-soft);color:#047857">${icon('chart')}</span><b>家长报告</b><em>看学习数据</em></button>
      </div>

      <div class="sec"><span class="bar"></span>小梨今日一句<span class="more">Day ${dayOfYear}</span></div>
      <div class="card daily-card">
        <div class="row">
          <div class="txt">
            <div class="quote">DAILY SENTENCE</div>
            <div class="en">${esc(daily.en)}</div>
            <div class="zh">${esc(daily.zh)}</div>
          </div>
          <button class="speak-btn" data-say="${esc(daily.en)}">${icon('volume')}</button>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
          <span class="badge amber">${esc(daily.book.title)}</span>
          <button class="badge sky" style="border:none;cursor:pointer" data-act="go-sent" data-book="${A.bookKey(daily.book)}" data-mi="${daily.mi}">去看看 ${icon('chevron', 'i-sm')}</button>
        </div>
      </div>
      <p class="adv-foot">非商用学习工具 · 参考广州教科版主题编排</p>
    </div>`;

    $('[data-act="start"]').onclick = () => window.Session.startLevel(book, mi);
    $('[data-act="course"]').onclick = () => A.go({ name: 'course' });
    $('[data-act="sprites"]').onclick = () => A.go({ name: 'sprites' });
    $('[data-act="report"]').onclick = () => A.go({ name: 'report' });
    const hearBtn = $('[data-act="hear"]');
    if (hearBtn) hearBtn.onclick = () => window.Story.speakLine({ who: 'li', t: $('.adv-say').textContent });
    const storyBtn = $('[data-act="story"]');
    if (storyBtn) storyBtn.onclick = () => window.Story.replay(book, mi);
    const finaleBtn = $('[data-act="finale"]');
    if (finaleBtn) finaleBtn.onclick = () => window.Story.playFinale(book, () => A.render());
    const mascotEl = $('.adv-mascot');
    if (mascotEl) {
      const sayIdle = () => {
        const t = window.Story.idleSay();
        $('.adv-say').textContent = t;
      };
      mascotEl.onclick = sayIdle;
      mascotEl.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sayIdle(); }
      };
    }
    $('[data-act="review"]').onclick = () => {
      if (A.reviewCount()) window.Session.startReview();
      else UI.toast('今天没有要复习的单词，去闯一关吧');
    };
    $('[data-act="go-sent"]').onclick = (e) => {
      const el = e.currentTarget;
      const b = A.BOOKS.find(x => A.bookKey(x) === el.dataset.book);
      A.go({ name: 'module', book: b, mi: +el.dataset.mi, tab: 'sents' });
    };
    $$('[data-lv]', $('#view')).forEach(el => el.onclick = () => {
      const i = +el.dataset.lv;
      if (!isUnlocked(book, i)) { UI.toast('先通关上一关，就能解锁啦'); return; }
      window.Session.startLevel(book, i);
    });
  };

  // 从 wordKey 找到上下文并打开单词详情
  function openWordByKey(key) {
    const parts = key.split('-');
    const b = A.BOOKS.find(x => A.bookKey(x) === `${parts[0]}-${parts[1]}`);
    if (!b) return;
    A.go({ name: 'word', book: b, mi: +parts[2], wi: +parts[3] });
  }

  // ---------- 课程 ----------
  A.routes.course = () => {
    const g = A.state.cg || 1;
    const books = A.BOOKS.filter(b => b.grade === g);
    $('#view').innerHTML = `<div class="page">
      <div class="card tap" data-act="phonics" style="display:flex;align-items:center;gap:12px;background:linear-gradient(120deg,#ECFDF5,#fff);border-color:#A7F3D0">
        <div class="resume" style="padding:0;border:none;background:none;flex:1">
          <div class="ico" style="background:var(--leaf-soft);color:#047857">${icon('sparkle')}</div>
          <div class="t"><b>自然拼读 Phonics</b><span>26 字母 · 24 个字母组合 · 英文儿歌</span></div>
        </div>
        <span class="arrow">${icon('chevron')}</span>
      </div>
      <div class="sec"><span class="bar"></span>教材同步<span class="more">参考广州教科版</span></div>
      <div class="seg" id="gradeSeg" style="margin-bottom:12px">
        ${[1, 2, 3, 4, 5, 6].map(x => `<button class="${x === g ? 'on' : ''}" data-g="${x}">${GRADE_CN[x - 1]}</button>`).join('')}
      </div>
      ${books.map(b => {
        const p = A.bookStat(b);
        return `<div class="card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <span class="badge" style="background:${b.color}22;color:${b.color}">${b.level}</span>
            <b style="font-size:15px">${esc(b.title)}</b>
            <span style="margin-left:auto;font-size:12px;color:var(--ink-3)">${b.modules.length} 个模块</span>
          </div>
          ${UI.pbar(p.pct, b.color)}
          <div style="font-size:11.5px;color:var(--ink-3);margin-top:6px">已学 ${p.learned} / ${p.total} 词</div>
          ${b.modules.map((m, mi) => {
            const st = A.moduleStat(b, mi);
            return `<div class="mod tap" data-book="${A.bookKey(b)}" data-mi="${mi}" style="padding:11px 0;border-top:1px solid var(--line-2);margin-top:8px">
              <div class="num" style="width:36px;height:36px;font-size:12px;background:${b.color}">M${mi + 1}</div>
              <div class="t"><b style="font-size:14px">${esc(m.name)}</b><span>${esc(m.zh)} · ${st.total} 词 · ${m.sentences.length} 句</span>${UI.pbar(st.pct, b.color)}</div>
              <div class="right"><div class="pct">${st.pct}%</div></div>
            </div>`;
          }).join('')}
        </div>`;
      }).join('')}
    </div>`;
    $$('#gradeSeg button').forEach(b => b.onclick = () => { A.state.cg = +b.dataset.g; A.save(); A.render(); });
    $$('.mod').forEach(el => el.onclick = () => {
      const b = A.BOOKS.find(x => A.bookKey(x) === el.dataset.book);
      A.go({ name: 'module', book: b, mi: +el.dataset.mi });
    });
    $('[data-act="phonics"]').onclick = () => A.go({ name: 'phonics' });
  };

  // ---------- 年级 ----------
  A.routes.grade = (r) => {
    const g = r.grade;
    const term = A.state.term[g] || 1;
    const book = A.BOOKS.find(b => b.grade === g && b.term === term);
    const p = A.gradeStat(g);
    $('#view').innerHTML = `<div class="page">`;
    A.UI.setTop({ title: gradeName(g), sub: `已学 ${p.learned} / ${p.total} 词 · ${p.pct}%` });
    $('#view').innerHTML = `<div class="page">
      <div class="card" style="background:linear-gradient(135deg,${book.color},${book.color}cc);border:none;color:#fff;box-shadow:0 8px 24px ${book.color}44">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,.25);display:grid;place-items:center">${icon('trophy', 'i-lg')}</div>
          <div style="flex:1"><b style="font-size:17px">${esc(book.title)}</b><div style="font-size:12px;opacity:.9;margin-top:2px">${book.modules.length} 个模块 · 句型 ${book.modules.reduce((n, m) => n + m.sentences.length, 0)} 句 · 对话 ${book.modules.length} 段</div></div>
        </div>
        <div style="margin-top:12px">${UI.pbar(p.pct)}</div>
      </div>
      <div class="seg" style="margin-top:14px">
        <button class="${term === 1 ? 'on' : ''}" data-t="1">上册</button>
        <button class="${term === 2 ? 'on' : ''}" data-t="2">下册</button>
      </div>
      <div class="sec" style="margin-top:6px"><span class="bar"></span>学习模块</div>
      ${book.modules.map((m, mi) => {
        const st = A.moduleStat(book, mi);
        const best = A.state.best[A.modKey(book, mi)];
        return `<div class="card tap mod" data-mi="${mi}">
          <div class="num" style="background:${book.color}">M${mi + 1}</div>
          <div class="t"><b>${esc(m.name)}</b><span>${esc(m.zh)} · ${st.total} 词</span>${UI.pbar(st.pct, book.color)}</div>
          <div class="right">${best != null ? `<div class="stars">${'★'.repeat(best)}${'☆'.repeat(3 - best)}</div>` : ''}<div class="pct">${st.pct}%</div></div>
        </div>`;
      }).join('')}
    </div>`;
    $$('.seg button').forEach(b => b.onclick = () => { A.state.term[g] = +b.dataset.t; A.save(); A.render(); });
    $$('.mod').forEach(el => el.onclick = () => { A.state.last = { book: A.bookKey(book), mi: +el.dataset.mi }; A.save(); A.go({ name: 'module', book, mi: +el.dataset.mi }); });
  };

  // ---------- 模块 ----------
  A.routes.module = (r) => {
    const { book, mi } = r;
    const m = book.modules[mi];
    const tab = r.tab || 'words';
    if (!r.keepScroll) { A.state.last = { book: A.bookKey(book), mi }; A.save(); }
    A.UI.setTop({ title: `Module ${mi + 1} · ${m.name}`, sub: `${book.title} · ${m.zh}` });
    const st = A.moduleStat(book, mi);
    const words = A.moduleWords(book, mi);
    $('#view').innerHTML = `<div class="page">
      <div class="card mod-head" style="display:flex;align-items:center;gap:12px">
        <div class="resume" style="flex:1;padding:0;border:none;background:none">
          <div class="ico" style="background:${book.color}22;color:${book.color}">${icon('book')}</div>
          <div class="t"><b>${esc(m.name)}</b><span>${st.learned}/${st.total} 词已学 · ${st.mastered} 词已掌握</span></div>
        </div>
        <div class="head-pbar" style="width:64px">${UI.pbar(st.pct, book.color)}</div>
      </div>
      <div class="mtabs">
        <button class="${tab === 'words' ? 'on' : ''}" data-tab="words">单词 ${m.words.length}</button>
        <button class="${tab === 'sents' ? 'on' : ''}" data-tab="sents">句型 ${m.sentences.length}</button>
        <button class="${tab === 'dlg' ? 'on' : ''}" data-tab="dlg">对话 ${m.dialogue.length}</button>
        <button class="${tab === 'grammar' ? 'on' : ''}" data-tab="grammar">语法</button>
        <button class="${tab === 'test' ? 'on' : ''}" data-tab="test">测试</button>
      </div>
      <div id="tabBody"></div>
      ${['words', 'sents'].includes(tab) ? `<div class="fabbar"><div class="btn-row" style="margin-top:0">
        <button class="btn ghost" data-act="cards">${icon('cards')} 单词卡</button>
        <button class="btn green" data-act="learn-mod">${icon('target')} 开始学习</button>
      </div></div>` : ''}
    </div>`;

    $$('.mtabs button').forEach(b => b.onclick = () => {
      const rc = A.current; rc.tab = b.dataset.tab; rc.keepScroll = true; A.render();
    });

    const body = $('#tabBody');
    if (tab === 'words') {
      body.innerHTML = `<div style="font-size:12px;color:var(--ink-3);margin-bottom:8px;display:flex;align-items:center;gap:6px">${icon('volume', 'i-sm')} 点喇叭听发音，点右侧圆圈标记「已学」</div>
        <div class="card" style="padding:4px 14px">${words.map(w => {
          const s = A.state.srs[w.key];
          const lv = s ? s.lv : -1;
          const learned = !!A.state.learned[w.key];
          return `<div class="word-row tap" data-wi="${w.wi}" style="border-bottom:1px solid var(--line-2)">
            <button class="speak-btn sm" data-say="${esc(w.en)}">${icon('volume', 'i-sm')}</button>
            <div class="w"><div class="en">${esc(w.en)} <span class="ipa">${esc(w.ipa)}</span></div>
              <div class="zh"><em>${esc(w.pos)}</em>${esc(w.zh)}</div></div>
            ${learned ? `<span class="learn-state ${lv >= 5 ? 'm' : ''}">${lv >= 5 ? '已掌握' : '学习中'}</span>` : ''}
            <button class="chk ${learned ? 'on' : ''}" data-chk="${w.wi}" aria-label="标记已学">${icon('check', 'i-sm')}</button>
          </div>`;
        }).join('')}</div>`;
      $$('.chk', body).forEach(b => b.onclick = (e) => {
        e.stopPropagation();
        const w = words[+b.dataset.chk];
        if (A.state.learned[w.key]) {
          delete A.state.learned[w.key];
          delete A.state.srs[w.key];
        } else {
          A.markWord(w.key, true);
          A.touchToday({ words: (A.today().words || 0) + 1 });
        }
        A.save(); A.render();
      });
      $$('.word-row', body).forEach(row => row.onclick = () => A.go({ name: 'word', book, mi, wi: +row.dataset.wi }));
    } else if (tab === 'sents') {
      body.innerHTML = `<div style="font-size:12px;color:var(--ink-3);margin-bottom:8px">句型跟读：点喇叭听，跟着读一遍。</div>` +
        m.sentences.map(s => {
          const p = par(s);
          return `<div class="card" style="padding:13px 14px">
            <div style="display:flex;gap:10px;align-items:flex-start">
              <div style="flex:1"><div style="font-size:15.5px;font-weight:650;line-height:1.5">${esc(p.en)}</div>
              <div style="font-size:12.5px;color:var(--ink-3);margin-top:4px">${esc(p.zh)}</div></div>
              <button class="speak-btn" data-say="${esc(p.en)}">${icon('volume')}</button>
            </div>
            <div style="margin-top:8px;display:flex;gap:8px">
              <button class="badge amber" style="border:none;cursor:pointer" data-pron="${esc(p.en)}">${icon('mic', 'i-sm')} 跟读评分</button>
              <button class="badge sky" style="border:none;cursor:pointer" data-say="${esc(p.en)}" data-slow="1">${icon('headphones', 'i-sm')} 慢速</button>
            </div>
          </div>`;
        }).join('');
      $$('[data-pron]', body).forEach(b => b.onclick = () => A.go({ name: 'pron', text: b.dataset.pron, zh: '', back: A.current }));
    } else if (tab === 'dlg') {
      const colors = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'];
      body.innerHTML = `<div class="card dlg">${m.dialogue.map((d, i) => {
        const right = i % 2 === 1;
        return `<div class="line ${right ? 'right' : ''}">
          <div class="ava" style="background:${colors[(right ? 1 : 0)]}">${esc(d[0].slice(0, 1))}</div>
          <div class="bubble">
            <div class="en">${esc(d[1])}</div>
            <div class="zh">${esc(d[2])}</div>
          </div>
          <button class="speak-btn sm play" data-say="${esc(d[1])}">${icon('volume', 'i-sm')}</button>
        </div>`;
      }).join('')}</div>
      <div class="roleplay" style="margin-top:12px">${icon('mic')}<div style="flex:1">角色扮演：先听整段，再选一个角色跟读。点句子旁喇叭即可逐句播放。</div></div>
      <div class="btn-row"><button class="btn ghost" id="playAll">${icon('headphones')} 整段播放</button><button class="btn green" id="playRole">${icon('mic')} 我来演</button></div>`;
      $('#playAll').onclick = () => {
        let i = 0;
        const next = () => {
          if (i >= m.dialogue.length) return;
          TTS.speak(m.dialogue[i][1], { onend: () => { i++; setTimeout(next, 200); } });
        };
        next();
      };
      $('#playRole').onclick = () => A.go({ name: 'pron', text: m.dialogue.slice(0, 2).map(d => d[1]).join(' '), zh: '角色扮演', back: A.current });
    } else if (tab === 'grammar') {
      const gm = m.grammar;
      body.innerHTML = `<div class="card">
        <div class="gm-title">${icon('sparkle', 'i')} ${esc(gm.title)}</div>
        <div class="gm-note">${esc(gm.note)}</div>
        ${gm.examples.map(e => { const p = par(e); return `<div class="gm-ex"><div class="t">${esc(p.en)}</div><div class="z">${esc(p.zh)}</div>
          <button style="margin-top:6px" class="badge amber" data-say="${esc(p.en)}">${icon('volume', 'i-sm')} 朗读</button></div>`; }).join('')}
      </div>
      <div class="card quiz-mini">
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ink-3);margin-bottom:10px">${icon('quiz', 'i-sm')} 语法小测</div>
        <div class="q">${esc(gm.quiz[0].q)}</div>
        <div class="opt-list">${gm.quiz[0].opts.map((o, i) => `<button class="opt" data-v="${esc(o)}"><span class="k">${'ABC'[i]}</span><span>${esc(o)}</span></button>`).join('')}</div>
        <div id="gmFb"></div>
      </div>`;
      $$('.opt', body).forEach(b => b.onclick = () => {
        if (body.dataset.done) return;
        body.dataset.done = '1';
        const ok = b.dataset.v === gm.quiz[0].a;
        $$('.opt', body).forEach(x => {
          x.disabled = true;
          if (x.dataset.v === gm.quiz[0].a) x.classList.add('right');
          else if (x === b) x.classList.add('wrong');
        });
        $('#gmFb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}">${ok ? '回答正确！' : '再想想，正确答案是 ' + gm.quiz[0].a}</div>`;
        if (ok) A.touchToday({ points: (A.today().points || 0) + 1 });
      });
    } else {
      const types = [
        { k: 'listen', t: '听音选词', d: '听发音，选择正确单词', ic: 'headphones', c: 'sky' },
        { k: 'spell', t: '单词拼写', d: '看中文，拼出英文', ic: 'keyboard', c: 'amber' },
        { k: 'order', t: '句子排序', d: '连词成句，练语序', ic: 'layers', c: 'violet' },
        { k: 'pron', t: '跟读评分', d: '开口读，检测发音', ic: 'mic', c: 'green' }
      ];
      body.innerHTML = `<div class="qgrid" style="grid-template-columns:repeat(2,1fr)">
        ${types.map(x => `<button class="qbtn" data-q="${x.k}" style="padding:16px 8px">${icon(x.ic, 'i-lg')}<b style="font-size:13px">${x.t}</b><span style="font-size:11px;color:var(--ink-3);font-weight:400">${x.d}</span></button>`).join('')}
      </div>
      <div class="card" style="margin-top:12px">
        <div class="gm-title" style="font-size:14px">${icon('trophy')} 模块综合测试</div>
        <div class="gm-note" style="margin-top:6px">10 题综合本模块单词与句型，答对 70% 得 2 星，全对得 3 星。</div>
        <button class="btn green block" id="goTest" style="margin-top:12px">开始测试</button>
      </div>
      <div class="card" style="margin-top:10px">
        <div style="display:flex;align-items:center;gap:8px"><b style="font-size:14px">本模块掌握情况</b><span class="badge green" style="margin-left:auto">${st.pct}%</span></div>
        <div style="margin-top:10px">${UI.pbar(st.pct, book.color)}</div>
        <div style="display:flex;gap:16px;margin-top:10px;font-size:12px;color:var(--ink-3)">
          <span>已学 <b style="color:var(--ink)">${st.learned}</b></span>
          <span>已掌握 <b style="color:var(--leaf)">${st.mastered}</b></span>
          <span>待学 <b style="color:var(--ink)">${st.total - st.learned}</b></span>
        </div>
      </div>`;
      $$('[data-q]', body).forEach(b => b.onclick = () => window.Session.startModule(book, mi, b.dataset.q));
      $('#goTest').onclick = () => window.Session.startModule(book, mi, 'test');
    }

    const cardBtn = $('[data-act="cards"]');
    if (cardBtn) cardBtn.onclick = () => A.go({ name: 'cards', book, mi, idx: 0 });
    const learnBtn = $('[data-act="learn-mod"]');
    if (learnBtn) learnBtn.onclick = () => window.Session.startModule(book, mi, 'learn');
  };

  // ---------- 单词详情 ----------
  A.routes.word = (r) => {
    const { book, mi } = r;
    const list = A.moduleWords(book, mi);
    const wi = r.wi;
    const w = list[wi];
    const s = A.state.srs[w.key];
    const learned = !!A.state.learned[w.key];
    const lv = s ? s.lv : 0;
    const levelText = !learned ? '未学习' : lv >= 5 ? '已掌握' : '学习中';
    A.UI.setTop({ title: w.en, sub: `${book.title} · M${mi + 1} ${book.modules[mi].name}` });
    $('#view').innerHTML = `<div class="page no-tab">
      <div class="card" style="text-align:center;padding:26px 18px;background:linear-gradient(160deg,#FFF9EC,#fff)">
        <div style="display:flex;justify-content:center;gap:6px;margin-bottom:10px">
          <span class="badge ${learned ? 'green' : 'amber'}">${levelText}</span>
          <span class="badge sky">${esc(w.pos)}</span>
          ${s ? `<span class="badge violet">复习第 ${s.seen} 次</span>` : ''}
        </div>
        <div style="font-size:38px;font-weight:800;line-height:1.25;word-break:break-word">${esc(w.en)}</div>
        <div style="font-size:15px;color:var(--ink-3);margin-top:4px">${esc(w.ipa)}</div>
        <div style="font-size:20px;font-weight:700;color:var(--brand-deep);margin-top:8px">${esc(w.zh)}</div>
        <div style="display:flex;justify-content:center;gap:10px;margin-top:18px">
          <button class="speak-btn" data-say="${esc(w.en)}" style="width:52px;height:52px">${icon('volume')}</button>
          <button class="speak-btn" data-say="${esc(w.en)}" data-slow="1" style="width:52px;height:52px">${icon('headphones')}</button>
          <button class="speak-btn" data-say="${esc(w.en)}" data-spell="1" style="width:52px;height:52px">${icon('keyboard')}</button>
        </div>
        <div style="font-size:10.5px;color:var(--ink-3);margin-top:8px">正常 · 慢速 · 字母拼读</div>
      </div>

      <div class="sec"><span class="bar"></span>例句</div>
      <div class="card">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div style="flex:1">
            <div style="font-size:15.5px;font-weight:600;line-height:1.6">${esc(w.exEn)}</div>
            <div style="font-size:12.5px;color:var(--ink-3);margin-top:5px">${esc(w.exZh)}</div>
          </div>
          <button class="speak-btn" data-say="${esc(w.exEn)}">${icon('volume')}</button>
        </div>
      </div>

      <div class="sec"><span class="bar"></span>发音与跟读</div>
      <div class="card" style="display:flex;align-items:center;gap:12px">
        <div style="flex:1"><b style="font-size:14px">跟读评分</b><div style="font-size:12px;color:var(--ink-3);margin-top:2px">${ASRSupported() ? '点麦克风，读出单词，查看匹配度' : '当前浏览器暂不支持语音识别，可用拼写练习代替'}</div></div>
        <button class="btn ${ASRSupported() ? 'green' : 'ghost'}" id="goPron" style="padding:10px 14px;font-size:13px">${icon('mic', 'i-sm')} 跟读</button>
      </div>

      <div class="sec"><span class="bar"></span>掌握度</div>
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:var(--ink-3)">
          <span>艾宾浩斯记忆曲线（第 ${clampLevel(lv)} / 7 层）</span>
          <span>${s && s.next ? nextText(s.next) : '未开始'}</span>
        </div>
        <div style="display:flex;gap:4px;margin-top:10px">${Array.from({ length: 7 }, (_, i) => `<i style="flex:1;height:7px;border-radius:4px;background:${i < lv ? 'var(--leaf)' : '#F3EDE0'}"></i>`).join('')}</div>
        <div style="display:flex;gap:6px;margin-top:12px">
          <span class="badge sky">间隔：${A.INTERVALS.slice(1, 8).join(' / ')} 天</span>
        </div>
      </div>

      <div class="btn-row" style="margin-top:18px">
        <button class="btn ${learned ? 'ghost' : 'green'}" id="markOk">${learned ? '再复习一次' : '标记已学'}</button>
        <button class="btn" id="markNo" style="background:linear-gradient(135deg,#FB7185,#E11D48);box-shadow:none">还不熟</button>
      </div>
      <div class="btn-row">
        <button class="btn ghost" id="prevW" ${wi === 0 ? 'disabled' : ''}>${icon('back', 'i-sm')} 上一个</button>
        <button class="btn ghost" id="nextW" ${wi === list.length - 1 ? 'disabled' : ''}>下一个 ${icon('chevron', 'i-sm')}</button>
      </div>
    </div>`;
    $('#markOk').onclick = () => {
      const was = !!A.state.learned[w.key];
      A.markWord(w.key, true);
      if (!was) A.touchToday({ words: (A.today().words || 0) + 1 });
      A.save(); UI.toast(was ? '复习进度已更新' : '已加入复习计划'); A.render();
    };
    $('#markNo').onclick = () => { A.markWord(w.key, false); A.save(); UI.toast('已加入待加强'); A.render(); };
    $('#prevW').onclick = () => { const rc = A.current; rc.wi = wi - 1; A.render(); };
    $('#nextW').onclick = () => { const rc = A.current; rc.wi = wi + 1; A.render(); };
    $('#goPron').onclick = () => A.go({ name: 'pron', text: w.en, zh: w.zh, wordKey: w.key, back: A.current });
    if (A.state.settings.autoSpeak) setTimeout(() => TTS.speak(w.en), 180);
  };
  function clampLevel(lv) { return Math.max(0, Math.min(lv, 7)); }
  function nextText(ts) {
    const d = Math.ceil((ts - Date.now()) / 86400000);
    return d > 0 ? `${d} 天后复习` : '今天待复习';
  }
  function ASRSupported() { return A.ASR.ok(); }

  // ---------- 单词卡 ----------
  A.routes.cards = (r) => {
    const { book, mi } = r;
    const list = A.moduleWords(book, mi);
    const idx = r.idx || 0;
    A.UI.setTop({ title: '单词卡', sub: `${book.title} · M${mi + 1} ${book.modules[mi].name}` });
    if (idx >= list.length) {
      const st = A.moduleStat(book, mi);
      $('#view').innerHTML = `<div class="page no-tab"><div class="result">
        <div class="ring">${ringSvg(100)}<div class="num"><b style="color:var(--leaf)">✓</b><span>本组完成</span></div></div>
        <h2>单词卡过完啦</h2><p>${esc(book.title)} · M${mi + 1}，已学 ${st.learned}/${st.total} 词</p>
        <div class="btn-row"><button class="btn ghost" id="again">再来一遍</button><button class="btn green" id="toQuiz">去闯关</button></div>
      </div></div>`;
      $('#again').onclick = () => { A.current.idx = 0; A.render(); };
      $('#toQuiz').onclick = () => window.Session.startModule(book, mi, 'learn');
      return;
    }
    const w = list[idx];
    const learned = !!A.state.learned[w.key];
    $('#view').innerHTML = `<div class="page no-tab">
      <div class="flash-wrap">
        <div style="width:100%;display:flex;align-items:center;gap:10px">
          <div class="pbar" style="flex:1"><i style="width:${((idx + 1) / list.length) * 100}%;background:var(--brand)"></i></div>
          <span style="font-size:12px;color:var(--ink-3);font-weight:600">${idx + 1}/${list.length}</span>
        </div>
        <div class="flash" id="flash">
          <div class="inner">
            <div class="face front">
              <span class="badge sky" style="position:absolute;top:20px;left:22px">${esc(w.pos)}</span>
              <div class="en">${esc(w.en)}</div>
              <div class="ipa">${esc(w.ipa)}</div>
              <button class="speak-btn" data-say="${esc(w.en)}" style="width:54px;height:54px">${icon('volume')}</button>
              <div class="hint">轻点卡片翻面 →</div>
            </div>
            <div class="face back">
              <div class="en" style="font-size:26px">${esc(w.en)}</div>
              <div class="zh">${esc(w.zh)}</div>
              <div class="ex">${esc(w.exEn)}<div class="z">${esc(w.exZh)}</div></div>
              <div style="display:flex;gap:10px;margin-top:8px">
                <button class="speak-btn sm" data-say="${esc(w.en)}">${icon('volume', 'i-sm')}</button>
                <button class="speak-btn sm" data-say="${esc(w.en)}" data-spell="1">${icon('keyboard', 'i-sm')}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-row" style="width:100%;margin-top:0">
          <button class="btn ghost" id="againBtn">${icon('refresh', 'i-sm')} 还不熟</button>
          <button class="btn green" id="knowBtn">${icon('check', 'i-sm')} ${learned ? '再复习一次' : '认识了'}</button>
        </div>
      </div>
    </div>`;
    const flash = $('#flash');
    flash.onclick = (e) => { if (!e.target.closest('[data-say]')) flash.classList.toggle('flip'); };
    setTimeout(() => TTS.speak(w.en), 160);
    $('#knowBtn').onclick = () => {
      const was = !!A.state.learned[w.key];
      A.markWord(w.key, true);
      if (!was) A.touchToday({ words: (A.today().words || 0) + 1 });
      A.save(); A.current.idx = idx + 1; A.render();
    };
    $('#againBtn').onclick = () => { A.markWord(w.key, false); A.save(); A.current.idx = idx + 1; A.render(); };
  };

  function ringSvg(pct, color = 'var(--brand)') {
    const r = 62, c = 2 * Math.PI * r;
    return `<svg width="150" height="150" viewBox="0 0 150 150"><circle cx="75" cy="75" r="${r}" fill="none" stroke="#F3EDE0" stroke-width="11"/><circle cx="75" cy="75" r="${r}" fill="none" stroke="${color}" stroke-width="11" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/></svg>`;
  }
  window.PageHelpers = { ringSvg, GRADE_CN, gradeName, gradeColor, POS_CN, ASRSupported, openWordByKey, mascot, spriteOf, spriteName };

  // ---------- 精灵图鉴 ----------
  A.routes.sprites = () => {
    const got = spriteCount();
    const total = SPRITE_TOTAL();
    A.UI.setTop({ title: '精灵图鉴', sub: `已收集 ${got} / ${total}` });
    $('#view').innerHTML = `<div class="page sp-page no-tab">
      <div class="sp-hero">
        <div class="sp-hero-art">${mascot('cheer', 74)}</div>
        <div><b>单词精灵图鉴</b><p>每通关一关，就会遇见一只新的单词精灵。</p></div>
      </div>
      ${A.BOOKS.map(b => {
        const owned = b.modules.filter((_, mi) => (A.state.sprites || {})[A.modKey(b, mi)]).length;
        return `<div class="sp-book">
          <div class="sp-bh">
            <span class="dot" style="background:${b.color}"></span>
            <b>${esc(b.title)}</b>
            <em>${owned}/${b.modules.length}</em>
          </div>
          <div class="sp-grid">
            ${b.modules.map((mm, mi) => {
              const has = !!(A.state.sprites || {})[A.modKey(b, mi)];
              return `<button class="sp-cell ${has ? '' : 'lock'}" data-b="${A.bookKey(b)}" data-mi="${mi}" aria-label="${has ? esc(spriteName(b, mi)) : '未解锁'}">
                ${has ? spriteOf(b, mi, 52) : '<span class="sp-unknown">?</span>'}
                <em>${has ? esc(mm.zh) : '？？？'}</em>
              </button>`;
            }).join('')}
          </div>
        </div>`;
      }).join('')}
      <p class="adv-foot">继续闯关，集齐 ${total} 只单词精灵</p>
    </div>`;
    $$('.sp-cell').forEach(el => el.onclick = () => {
      const b = A.BOOKS.find(x => A.bookKey(x) === el.dataset.b);
      const mi = +el.dataset.mi;
      if (!(A.state.sprites || {})[A.modKey(b, mi)]) { UI.toast('通关这一关，就能遇见它'); return; }
      spriteSheet(b, mi);
    });
  };

  function spriteSheet(b, mi) {
    const mask = document.createElement('div');
    mask.className = 'mask';
    mask.innerHTML = `<div class="sheet sp-sheet">
      <div class="sp-sheet-art">${spriteOf(b, mi, 112)}</div>
      <h3>${esc(spriteName(b, mi))}</h3>
      <p>${esc(b.title)} · ${esc(b.modules[mi].name)} ${esc(b.modules[mi].zh)}</p>
      <div class="acts">
        <button class="btn ghost" data-v="0">关闭</button>
        <button class="btn green" data-v="1">去这一关</button>
      </div>
    </div>`;
    document.body.appendChild(mask);
    mask.querySelector('[data-v="0"]').onclick = () => mask.remove();
    mask.querySelector('[data-v="1"]').onclick = () => { mask.remove(); window.Session.startLevel(b, mi); };
    mask.onclick = (e) => { if (e.target === mask) mask.remove(); };
  }

  // ---------- 自然拼读 ----------
  A.routes.phonics = (r) => {
    const tab = r.tab || 'letters';
    A.UI.setTop({ title: '自然拼读', sub: 'Phonics · 见词能读，听音能写' });
    const P = window.PHONICS;
    $('#view').innerHTML = `<div class="page">
      <div class="seg">
        <button class="${tab === 'letters' ? 'on' : ''}" data-t="letters">26 字母</button>
        <button class="${tab === 'blends' ? 'on' : ''}" data-t="blends">字母组合</button>
        <button class="${tab === 'rhymes' ? 'on' : ''}" data-t="rhymes">英文歌谣</button>
      </div>
      <div id="phBody" style="margin-top:14px"></div>
    </div>`;
    $$('.seg button').forEach(b => b.onclick = () => { const rc = A.current; rc.tab = b.dataset.t; A.render(); });
    const body = $('#phBody');
    if (tab === 'letters') {
      body.innerHTML = `<div class="qgrid" style="grid-template-columns:repeat(3,1fr);gap:10px">
        ${P.letters.map(x => `<div class="card tap" data-letter="${esc(x.l)}" style="padding:12px 6px;text-align:center;margin:0">
          <div style="font-size:30px;font-weight:800;line-height:1.1;color:var(--ink)">${x.l}${x.l.toLowerCase()}</div>
          <div style="font-size:13px;color:var(--brand-deep);font-weight:700;margin-top:2px">${x.sound}</div>
          <div style="font-size:11.5px;color:var(--ink-3);margin-top:4px">${esc(x.word)}</div>
        </div>`).join('')}
      </div>
      <div class="sec"><span class="bar"></span>字母发音表<span class="more">点击卡片听发音</span></div>
      <div class="card" style="padding:4px 14px">
        ${P.letters.map(x => `<div class="word-row tap" data-letter="${esc(x.l)}" style="border-bottom:1px solid var(--line-2);padding:9px 0">
          <button class="speak-btn sm" data-say="${esc(x.word)}">${icon('volume', 'i-sm')}</button>
          <div class="w"><div class="en">${x.l} ${x.name} <span class="ipa">${x.sound}</span></div><div class="zh">${esc(x.word)} · ${esc(x.zh)}</div></div>
          <span class="badge amber">${esc(x.word.slice(0, 3))}</span>
        </div>`).join('')}
      </div>`;
      $$('[data-letter]', body).forEach(el => el.onclick = (e) => {
        if (e.target.closest('[data-say]')) return;
        openLetter(el.dataset.letter);
      });
    } else if (tab === 'blends') {
      body.innerHTML = P.blends.map(x => `<div class="card" style="display:flex;align-items:center;gap:12px">
        <div style="width:52px;height:52px;border-radius:16px;background:var(--leaf-soft);color:#047857;display:grid;place-items:center;font-size:19px;font-weight:800;flex-shrink:0">${x.l}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;color:var(--ink-3);font-weight:600">${x.sound}</div>
          <div style="font-size:14.5px;font-weight:650;margin-top:1px">${x.words.map(w => `<span style="margin-right:10px">${esc(w)}</span>`).join('')}</div>
          <div style="font-size:11.5px;color:var(--ink-3);margin-top:2px">${esc(x.rule)}</div>
        </div>
        <button class="speak-btn" data-say="${esc(x.words.join(', '))}">${icon('volume')}</button>
      </div>`).join('');
    } else {
      body.innerHTML = P.rhymes.map((x, i) => `<div class="card">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:34px;height:34px;border-radius:11px;background:var(--violet-soft);color:#6D28D9;display:grid;place-items:center;font-weight:800;font-size:13px">${i + 1}</div>
          <b style="font-size:14.5px;flex:1">${esc(x.title)}</b>
          <button class="speak-btn sm" data-say="${esc(x.lines.join(' '))}">${icon('volume', 'i-sm')}</button>
        </div>
        <div style="margin-top:10px;font-size:14px;line-height:1.9;color:var(--ink-2)">${x.lines.map(l => `<div>${esc(l)}</div>`).join('')}</div>
        <div style="font-size:11.5px;color:var(--ink-3);margin-top:8px">${esc(x.zh)}</div>
      </div>`).join('');
    }
  };

  function openLetter(l) {
    const x = window.PHONICS.letters.find(y => y.l === l);
    A.UI.setTop({ title: `${x.l} ${x.name}`, sub: `发音 ${x.sound}` });
    A.go({ name: 'letter', letter: l });
  }
  A.routes.letter = (r) => {
    const x = window.PHONICS.letters.find(y => y.l === r.letter);
    A.UI.setTop({ title: `${x.l} ${x.name}`, sub: `发音 ${x.sound}` });
    $('#view').innerHTML = `<div class="page no-tab">
      <div class="card" style="text-align:center;padding:28px 18px">
        <div style="font-size:64px;font-weight:800;line-height:1.1">${x.l}${x.l.toLowerCase()}</div>
        <div style="font-size:20px;color:var(--brand-deep);font-weight:700;margin-top:4px">${x.sound}</div>
        <div style="font-size:13px;color:var(--ink-3);margin-top:6px">字母名：${x.name}</div>
        <button class="btn block" id="playLetter" style="margin-top:18px">${icon('volume')} 听字母发音</button>
      </div>
      <div class="sec"><span class="bar"></span>例词</div>
      <div class="card" style="text-align:center;padding:24px">
        <div style="font-size:30px;font-weight:800">${esc(x.word)}</div>
        <div style="font-size:13px;color:var(--ink-3);margin-top:4px">${esc(x.zh)}</div>
        <button class="speak-btn" data-say="${esc(x.word)}" style="margin:14px auto 0;width:52px;height:52px">${icon('volume')}</button>
      </div>
      <div class="card" style="display:flex;gap:10px;align-items:flex-start">
        <div style="width:28px;height:28px;border-radius:9px;background:var(--brand-soft);color:var(--brand-deep);display:grid;place-items:center;flex-shrink:0">${icon('sparkle', 'i-sm')}</div>
        <div><b style="font-size:13.5px">发音小提示</b><div style="font-size:13px;color:var(--ink-2);margin-top:4px;line-height:1.7">${esc(x.tip)}</div></div>
      </div>
      <div class="btn-row"><button class="btn ghost" id="prevL">上一个</button><button class="btn ghost" id="nextL">下一个</button></div>
    </div>`;
    $('#playLetter').onclick = () => {
      const b = $('#playLetter'); b.classList.add('playing');
      A.TTS.speak(`${x.l}. ${x.word}.`, { onend: () => b.classList.remove('playing') });
    };
    const idx = window.PHONICS.letters.findIndex(y => y.l === x.l);
    $('#prevL').onclick = () => { const p = window.PHONICS.letters[(idx + 25) % 26]; A.current.letter = p.l; A.render(); };
    $('#nextL').onclick = () => { const n = window.PHONICS.letters[(idx + 1) % 26]; A.current.letter = n.l; A.render(); };
  };
})();
