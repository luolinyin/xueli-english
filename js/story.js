/* ============ 故事演出 / 角色配音 / 场景插画 ============ */
(function () {
  'use strict';
  const A = window.App;
  const { esc, icon, TTS } = A;
  const DATA = window.STORY || { books: {}, idle: [] };
  const H = window.PageHelpers || {};

  // ---------- 进度 ----------
  function map() {
    A.state.story = A.state.story || {};
    return A.state.story;
  }
  function card(book) {
    const m = map();
    const k = A.bookKey(book);
    return m[k] || (m[k] = { intro: 0, beats: {}, finale: 0 });
  }
  function dataFor(book) { return DATA.books && DATA.books[A.bookKey(book)]; }
  function beatOf(book, mi) {
    const d = dataFor(book);
    return d && d.beats && d.beats[mi];
  }
  function seenBeat(book, mi) { return !!card(book).beats[mi]; }
  function seenIntro(book) { return !!card(book).intro; }
  function seenFinale(book) { return !!card(book).finale; }
  function mark(book, mi, opts = {}) {
    const st = card(book);
    if (opts.intro) st.intro = 1;
    if (opts.beat) st.beats[mi] = 1;
    if (opts.finale) st.finale = 1;
    A.save();
  }

  function chapter(book, mi) {
    const d = dataFor(book);
    const b = beatOf(book, mi);
    if (!d || !b) return null;
    return {
      n: mi + 1,
      total: book.modules.length,
      island: d.island,
      title: b.title,
      place: b.place,
      seen: seenBeat(book, mi),
      introSeen: seenIntro(book),
      finaleSeen: seenFinale(book)
    };
  }

  function clearFor(book, mi) {
    const b = beatOf(book, mi);
    return b && b.clear ? b.clear : null;
  }

  function finaleReady(book) {
    if (seenFinale(book)) return false;
    for (let i = 0; i < book.modules.length; i++) {
      if (!(A.state.levels || {})[A.modKey(book, i)]) return false;
    }
    return true;
  }

  // ---------- 角色 ----------
  function whoName(book, mi, who) {
    if (who === 'li') return '小梨';
    if (who === 'sp') return `${book.modules[mi] ? book.modules[mi].zh : '单词'}精灵`;
    if (who === 'all') return '单词精灵们';
    if (who === 'fog') return '迷雾怪';
    if (who === 'tree') return '雪梨树';
    return '旁白';
  }
  function moodOf(who) {
    if (who === 'li') return 'happy';
    if (who === 'fog') return 'think';
    return 'happy';
  }

  function fogSvg(size = 84) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="58" rx="15" ry="2.6" fill="#0F172A" opacity=".10"/>
      <circle cx="20" cy="39" r="11" fill="#CBD5E1"/>
      <circle cx="33" cy="31" r="16" fill="#E2E8F0"/>
      <circle cx="47" cy="39" r="10.5" fill="#CBD5E1"/>
      <rect x="13" y="33" width="38" height="17" rx="8.5" fill="#E2E8F0"/>
      <ellipse cx="26" cy="36" rx="2.2" ry="3.1" fill="#334155"/>
      <ellipse cx="38" cy="36" rx="2.2" ry="3.1" fill="#334155"/>
      <circle cx="26.8" cy="35.2" r=".7" fill="#fff"/>
      <circle cx="38.8" cy="35.2" r=".7" fill="#fff"/>
      <path d="M27 44.5q5-3.4 10 0" stroke="#475569" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  function treeSvg(size = 84) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="59" rx="16" ry="3" fill="#0F172A" opacity=".08"/>
      <path d="M30 59V36h5v23z" fill="#A16207"/>
      <path d="M32.5 45c-1.6-5.6-6-8.8-11-9.8" stroke="#A16207" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <circle cx="24" cy="27" r="13" fill="#34D399"/>
      <circle cx="39" cy="24" r="14" fill="#10B981"/>
      <circle cx="32" cy="34" r="12" fill="#059669"/>
      <circle cx="23" cy="25" r="5" fill="#6EE7B7" opacity=".55"/>
      <circle cx="24" cy="30" r="2.7" fill="#FBBF24"/>
      <circle cx="38" cy="27" r="2.7" fill="#FBBF24"/>
      <circle cx="32" cy="36" r="2.5" fill="#FBBF24"/>
      <path d="M24 27c0-1.6 1.1-2.6 2.4-2.6" stroke="#B45309" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M46 13l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="#FDE68A"/>
    </svg>`;
  }

  function portrait(book, mi, who, size = 84) {
    if (!H.mascot) return '';
    if (who === 'li') return H.mascot(moodOf(who), size);
    if (who === 'sp') return H.spriteOf(book, mi, size);
    if (who === 'all') {
      const n = book.modules.length;
      const group = [mi, (mi + 1) % n, (mi + 2) % n];
      return `<div class="story-cluster">${group.map(i => `<span>${H.spriteOf(book, i, Math.round(size * 0.46))}</span>`).join('')}</div>`;
    }
    if (who === 'fog') return fogSvg(size);
    if (who === 'tree') return treeSvg(size);
    return '';
  }

  // ---------- 场景插画 ----------
  let sceneSeq = 0;
  function sceneArt(book, mi, finale) {
    const gid = 'sc' + (++sceneSeq);
    const c = book.color || '#F59E0B';
    const night = !finale && mi === 3;
    const skyTop = night ? '#1E3A8A' : '#E0F2FE';
    const skyMid = night ? '#312E81' : '#FFF4E0';
    const skyBot = night ? '#4C1D95' : '#FFFBEB';
    const ground = night ? '#312E81' : '#FEF3C7';

    let motif = '';
    if (finale) {
      motif = `
        <g>
          <circle cx="195" cy="212" r="70" fill="#FDE68A" opacity=".22"/>
          <path d="M188 305V210h16v95z" fill="#92400E"/>
          <path d="M196 246c-10-20-28-28-46-30M196 258c12-20 30-26 48-28" stroke="#92400E" stroke-width="7" fill="none" stroke-linecap="round"/>
          <circle cx="150" cy="196" r="42" fill="#34D399"/>
          <circle cx="240" cy="188" r="46" fill="#10B981"/>
          <circle cx="196" cy="168" r="44" fill="#059669"/>
          <circle cx="174" cy="222" r="34" fill="#10B981" opacity=".85"/>
          <circle cx="226" cy="226" r="32" fill="#34D399" opacity=".8"/>
          <circle cx="166" cy="196" r="5" fill="#FBBF24"/>
          <circle cx="218" cy="184" r="5" fill="#FBBF24"/>
          <circle cx="238" cy="212" r="4.4" fill="#FBBF24"/>
          <circle cx="192" cy="232" r="4.4" fill="#FBBF24"/>
          ${[0, 1, 2, 3, 4, 5].map(i => {
            const x = 100 + i * 38;
            const col = A.BOOKS[i].color;
            return `<g transform="translate(${x} ${304 - (i % 2) * 7})">
              <ellipse cx="0" cy="9" rx="9" ry="2.4" fill="#0F172A" opacity=".08"/>
              <ellipse rx="9" ry="8.5" fill="${col}"/>
              <circle cx="-3" cy="-1" r="1.5" fill="#22303F"/><circle cx="3" cy="-1" r="1.5" fill="#22303F"/>
              <path d="M-2.6 3.6q2.6 2.4 5.2 0" stroke="#22303F" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            </g>`;
          }).join('')}
        </g>`;
    } else if (mi === 0) {
      motif = `
        <g>
          <path d="M96 268V195h10v73z" fill="#A16207"/>
          <circle cx="78" cy="184" r="26" fill="#34D399" opacity=".9"/>
          <circle cx="104" cy="174" r="30" fill="#10B981"/>
          <circle cx="96" cy="202" r="24" fill="#059669" opacity=".82"/>
          <circle cx="70" cy="210" r="3.2" fill="#FBBF24"/>
          <circle cx="110" cy="196" r="3.6" fill="#FBBF24"/>
          <circle cx="88" cy="188" r="2.6" fill="#FDE68A"/>
          <path d="M42 306q8-16 16 0M300 312q8-16 16 0" stroke="#65A30D" stroke-width="4" fill="none" stroke-linecap="round"/>
        </g>`;
    } else if (mi === 1) {
      motif = `
        <g>
          <path d="M0 286c70-18 118 8 160 34 44 26 100 34 230 18v42H0z" fill="#93C5FD" opacity=".75"/>
          <path d="M0 296c70-18 118 8 160 34" stroke="#60A5FA" stroke-width="3" fill="none" opacity=".8"/>
          <path d="M236 258c26-8 52-6 74 2" stroke="#A16207" stroke-width="8" fill="none" stroke-linecap="round"/>
          <path d="M240 262v20M304 264v20M252 262v14M292 263v14" stroke="#A16207" stroke-width="5" stroke-linecap="round"/>
        </g>`;
    } else if (mi === 2) {
      motif = `
        <g>
          <rect x="250" y="150" width="54" height="130" rx="10" fill="${c}" opacity=".55"/>
          <path d="M252 148h50l-9-34h-32z" fill="${c}" opacity=".85"/>
          <rect x="268" y="178" width="18" height="22" rx="9" fill="#FFF7ED" opacity=".9"/>
          <rect x="56" y="268" width="64" height="16" rx="5" fill="${c}" opacity=".35"/>
          <rect x="96" y="252" width="64" height="16" rx="5" fill="${c}" opacity=".45"/>
          <rect x="136" y="236" width="64" height="16" rx="5" fill="${c}" opacity=".55"/>
          <rect x="176" y="220" width="64" height="16" rx="5" fill="${c}" opacity=".7"/>
        </g>`;
    } else if (mi === 3) {
      motif = `
        <g fill="#FDE68A">
          <circle cx="52" cy="78" r="2.4"/><circle cx="118" cy="52" r="1.8"/><circle cx="172" cy="96" r="2.6"/>
          <circle cx="246" cy="58" r="2"/><circle cx="352" cy="116" r="2.2"/><circle cx="292" cy="152" r="1.6"/>
          <circle cx="88" cy="150" r="1.8"/><circle cx="330" cy="62" r="1.7"/><circle cx="210" cy="140" r="2.1"/>
        </g>
        <path d="M304 70a28 28 0 1 0 22 42 22 22 0 0 1-22-42z" fill="#FEF3C7"/>
        <circle cx="78" cy="290" r="3.2" fill="#FDE68A" opacity=".95"/>
        <circle cx="138" cy="268" r="2.4" fill="#FDE68A" opacity=".8"/>
        <circle cx="260" cy="286" r="2.8" fill="#FDE68A" opacity=".85"/>
        <circle cx="330" cy="264" r="2.2" fill="#FDE68A" opacity=".7"/>`;
    } else if (mi === 4) {
      motif = `
        <g>
          <ellipse cx="70" cy="290" rx="34" ry="14" fill="#94A3B8" opacity=".5"/>
          <ellipse cx="314" cy="300" rx="44" ry="16" fill="#94A3B8" opacity=".42"/>
          <path d="M64 278q10-16 26-9 8-15 26-8 12-12 26-2" stroke="#CBD5E1" stroke-width="16" fill="none" stroke-linecap="round" opacity=".8"/>
          <path d="M236 240q12-14 28-8 8-13 24-7 10-10 22-1" stroke="#E2E8F0" stroke-width="14" fill="none" stroke-linecap="round" opacity=".9"/>
          <circle cx="150" cy="248" r="9" fill="${c}" opacity=".35"/>
          <circle cx="178" cy="256" r="6" fill="${c}" opacity=".28"/>
          <circle cx="122" cy="258" r="7" fill="${c}" opacity=".3"/>
        </g>`;
    } else {
      motif = `
        <g>
          <path d="M196 306V178h14v128z" fill="#A16207"/>
          <path d="M203 214c-18-16-40-20-58-18M203 232c20-16 42-18 60-16" stroke="#A16207" stroke-width="7" fill="none" stroke-linecap="round"/>
          <circle cx="148" cy="192" r="38" fill="#34D399" opacity=".9"/>
          <circle cx="252" cy="182" r="42" fill="#10B981"/>
          <circle cx="201" cy="158" r="38" fill="#059669"/>
          <circle cx="184" cy="210" r="28" fill="#10B981" opacity=".75"/>
          <circle cx="168" cy="176" r="3.4" fill="#FBBF24"/>
          <circle cx="238" cy="196" r="3.8" fill="#FBBF24"/>
          <circle cx="210" cy="148" r="3" fill="#FDE68A"/>
          ${[0, 1, 2, 3].map(i => `<g><rect x="${72 + i * 58}" y="${92 + (i % 2) * 16}" width="14" height="18" rx="3" fill="#EF4444"/><circle cx="${79 + i * 58}" cy="${112 + (i % 2) * 16}" r="2" fill="#FDE68A"/></g>`).join('')}
        </g>`;
    }

    const tiles = [
      { x: 36, y: 104, r: -8, s: 'A' },
      { x: 316, y: 136, r: 7, s: 'B' },
      { x: 266, y: 70, r: -6, s: 'C' },
      { x: 52, y: 204, r: 5, s: 'hi' },
      { x: 326, y: 210, r: -9, s: 'go' }
    ].map(t => `<g transform="translate(${t.x} ${t.y}) rotate(${t.r})" opacity=".55">
        <rect width="${t.s.length > 1 ? 30 : 22}" height="24" rx="7" fill="#fff"/>
        <text x="${t.s.length > 1 ? 15 : 11}" y="17" text-anchor="middle" font-size="12" font-weight="700" fill="${c}" font-family="Arial, sans-serif">${t.s}</text>
      </g>`).join('');

    return `<svg class="scene-svg" viewBox="0 0 390 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="${gid}sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${skyTop}"/><stop offset=".62" stop-color="${skyMid}"/><stop offset="1" stop-color="${skyBot}"/>
        </linearGradient>
        <linearGradient id="${gid}hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c}" stop-opacity=".42"/><stop offset="1" stop-color="${c}" stop-opacity=".16"/>
        </linearGradient>
      </defs>
      <rect width="390" height="380" fill="url(#${gid}sky)"/>
      ${night ? '' : `<circle cx="316" cy="78" r="52" fill="#FDE68A" opacity=".16"/><circle cx="316" cy="78" r="32" fill="#FDE68A" opacity=".8"/>`}
      <g fill="#fff" opacity="${night ? '.12' : '.72'}">
        <ellipse cx="88" cy="76" rx="34" ry="13"/><ellipse cx="112" cy="70" rx="24" ry="11"/>
        <ellipse cx="262" cy="106" rx="28" ry="10"/><ellipse cx="284" cy="101" rx="19" ry="9"/>
      </g>
      <path d="M0 262c56-38 110-44 168-16 60 29 142 30 222-2v136H0z" fill="url(#${gid}hill)"/>
      <path d="M0 296c74-26 132-16 190 8 64 26 132 24 200 2v74H0z" fill="${ground}"/>
      <path d="M0 316h390v64H0z" fill="${night ? '#1E1B4B' : '#FDE9C8'}" opacity=".55"/>
      ${motif}
      ${tiles}
      <g class="scene-fog" fill="#fff" opacity="${night ? '.16' : '.5'}">
        <ellipse cx="70" cy="250" rx="56" ry="9"/><ellipse cx="300" cy="244" rx="64" ry="8"/>
        <ellipse cx="190" cy="276" rx="80" ry="8" opacity=".7"/>
      </g>
      <g fill="${night ? '#FDE68A' : '#fff'}" opacity="${night ? '.9' : '.65'}">
        <circle cx="44" cy="144" r="2"/><circle cx="352" cy="92" r="1.8"/><circle cx="230" cy="52" r="1.6"/>
      </g>
    </svg>`;
  }

  // ---------- 配音 ----------
  function speakLine(line) {
    if (!line || !line.t) return;
    TTS.sayMixed(line.t, line.who || 'li');
  }

  // ---------- 演出 ----------
  let live = null;

  function play(lines, opts = {}) {
    if (!lines || !lines.length) { opts.onDone && opts.onDone(); return; }
    if (live) live.close(true);
    const book = opts.book;
    const mi = Math.max(0, opts.mi || 0);
    const mask = document.createElement('div');
    mask.className = 'story-mask';
    mask.setAttribute('role', 'dialog');
    mask.setAttribute('aria-modal', 'true');
    mask.setAttribute('aria-label', opts.finale ? '篇章结局' : '故事剧情');
    mask.innerHTML = `<div class="story-panel">
      <div class="story-art">${sceneArt(book, mi, !!opts.finale)}</div>
      <div class="story-deco-wrap"><div class="story-deco" style="color:${book.color || '#F59E0B'}">${esc(opts.deco || (opts.finale ? '雪梨树' : (book.modules[mi] && book.modules[mi].zh) || ''))}</div></div>
      <div class="story-top">
        <div class="story-chap"><i>${esc(opts.kicker || '')}</i><b>${esc(opts.heading || (book.modules[mi] && book.modules[mi].zh) || '')}</b></div>
        <div class="story-tools">
          <button class="story-ico" data-act="mute" aria-label="配音开关">${icon(TTS.muted() ? 'volume-off' : 'volume', 'i-sm')}</button>
          <button class="story-skip" data-act="skip">跳过</button>
        </div>
      </div>
      <div class="story-stage">
        <div class="story-dialog">
          <div class="story-portrait" aria-hidden="true"></div>
          <div class="story-bubble">
            <div class="sb-head"><b class="sb-name"></b><button class="sb-say" data-act="say" aria-label="再听一次">${icon('volume', 'i-sm')}</button></div>
            <p class="sb-text" aria-live="polite"></p>
          </div>
        </div>
      </div>
      <div class="story-foot">
        <div class="story-dots" aria-hidden="true">${lines.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div>
        <button class="story-next" data-act="next"><span>继续</span>${icon('chevron', 'i-sm')}</button>
      </div>
    </div>`;
    document.body.appendChild(mask);

    const ctx = { i: 0, lines, mask, opts, book, mi, timer: null, closed: false };
    live = ctx;
    const $s = (s) => mask.querySelector(s);

    function render() {
      const line = ctx.lines[ctx.i];
      const who = line.who || 'li';
      const dialog = $s('.story-dialog');
      $s('.story-portrait').innerHTML = portrait(book, mi, who, 86);
      $s('.story-portrait').dataset.who = who;
      const bubble = $s('.story-bubble');
      bubble.dataset.who = who;
      $s('.sb-name').textContent = whoName(book, mi, who);
      $s('.sb-text').textContent = line.t;
      $s('.story-dots').innerHTML = ctx.lines.map((_, i) => `<i class="${i === ctx.i ? 'on' : (i < ctx.i ? 'done' : '')}"></i>`).join('');
      const last = ctx.i === ctx.lines.length - 1;
      $s('.story-next span').textContent = last ? (opts.finalLabel || '出发！') : '继续';
      $s('.story-next').classList.toggle('last', last);
      dialog.classList.remove('line-in');
      void dialog.offsetWidth;
      dialog.classList.add('line-in');
      const btn = $s('[data-act="mute"]');
      btn.innerHTML = icon(TTS.muted() ? 'volume-off' : 'volume', 'i-sm');
      TTS.preload(line.t, who);
      const nxt = ctx.lines[ctx.i + 1];
      if (nxt) TTS.preload(nxt.t, nxt.who || 'li');
      scheduleSpeak();
    }

    function scheduleSpeak() {
      clearTimeout(ctx.timer);
      if (TTS.muted()) return;
      ctx.timer = setTimeout(() => {
        if (!ctx.closed) speakLine(ctx.lines[ctx.i]);
      }, 140);
    }

    function next() {
      if (ctx.closed) return;
      clearTimeout(ctx.timer);
      TTS.stop();
      if (ctx.i < ctx.lines.length - 1) {
        ctx.i++;
        render();
      } else {
        close(false);
      }
    }

    function close(silent) {
      if (ctx.closed) return;
      ctx.closed = true;
      clearTimeout(ctx.timer);
      TTS.stop();
      mark(book, mi, { intro: opts.markIntro, beat: opts.markBeat, finale: opts.markFinale });
      mask.classList.add('out');
      A.preventBack = null;
      if (live === ctx) live = null;
      setTimeout(() => mask.remove(), 240);
      if (!silent && opts.onDone) setTimeout(() => opts.onDone(), 120);
    }

    mask.addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]');
      if (!act) { next(); return; }
      if (act.dataset.act === 'next') { next(); return; }
      if (act.dataset.act === 'skip') { close(false); return; }
      if (act.dataset.act === 'say') {
        e.stopPropagation();
        TTS.stop();
        speakLine(ctx.lines[ctx.i]);
        return;
      }
      if (act.dataset.act === 'mute') {
        e.stopPropagation();
        A.state.settings.voice = TTS.muted();
        A.save();
        act.innerHTML = icon(TTS.muted() ? 'volume-off' : 'volume', 'i-sm');
        if (TTS.muted()) TTS.stop();
        else speakLine(ctx.lines[ctx.i]);
      }
    });

    ctx.close = close;
    A.preventBack = () => close(false);
    render();
  }

  // 首次进某本书 / 某一关时先演剧情；看过就直接开始
  function gate(book, mi, done) {
    const d = dataFor(book);
    if (!d) { done(); return; }
    const st = card(book);
    const needIntro = !st.intro;
    const needBeat = !st.beats[mi];
    if (!needIntro && !needBeat) { done(); return; }
    const b = d.beats[mi];
    const lines = (needIntro ? d.intro : []).concat(b.lines);
    play(lines, {
      book, mi,
      kicker: needIntro ? `序章 · ${d.island}` : `第 ${mi + 1} 幕 · ${b.place}`,
      heading: needIntro ? d.island : b.title,
      markIntro: needIntro,
      markBeat: true,
      finalLabel: '出发！',
      onDone: done
    });
  }

  // 首页回顾当前这一幕
  function replay(book, mi) {
    const d = dataFor(book);
    const b = beatOf(book, mi);
    if (!d || !b) return;
    play(b.lines, {
      book, mi,
      kicker: `第 ${mi + 1} 幕 · ${b.place}`,
      heading: b.title,
      finalLabel: '知道啦'
    });
  }

  function playFinale(book, done) {
    const d = dataFor(book);
    if (!d) { done && done(); return; }
    play(d.finale, {
      book,
      mi: Math.max(0, book.modules.length - 1),
      finale: true,
      kicker: `${d.island} · 篇章结局`,
      heading: '雪梨树开花了',
      markFinale: true,
      finalLabel: '收下毕业果',
      onDone: done
    });
  }

  const ENCOURAGE = [
    '差一点点，再来一次，我等你。',
    '已经记住大半啦，再试一次就好。',
    '别急，先听一遍，再慢慢来。'
  ];
  function resultLine(book, mi, cleared) {
    if (cleared) return clearFor(book, mi);
    return { who: 'li', t: A.pick(ENCOURAGE) };
  }

  function idleSay() {
    const t = A.pick(DATA.idle || ['我们一起闯关吧！']);
    speakLine({ who: 'li', t });
    return t;
  }

  function stop() {
    if (live) {
      const m = live.mask;
      live.closed = true;
      clearTimeout(live.timer);
      live = null;
      m.remove();
      A.preventBack = null;
    }
    TTS.stop();
  }

  window.Story = {
    gate, replay, playFinale, resultLine, clearFor, chapter, finaleReady,
    speakLine, idleSay, stop,
    seenBeat, seenIntro, seenFinale,
    portrait, sceneArt, whoName
  };
})();
