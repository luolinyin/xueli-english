/* ============ 核心：状态 / 语音 / 复习算法 / 路由 ============ */
(function () {
  'use strict';

  const KEY = 'xueli_en_v2';
  const DAY = 86400000;

  // ---------- 工具 ----------
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const todayStr = (d = new Date()) => {
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  };
  const dayDiff = (a, b) => Math.round((new Date(b) - new Date(a)) / DAY);
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const par = (s) => { const [en, zh] = String(s).split('|'); return { en: (en || '').trim(), zh: (zh || '').trim() }; };
  const norm = (s) => String(s).toLowerCase().replace(/[.,!?;:'"’‘“”]/g, '').replace(/\s+/g, ' ').trim();

  // ---------- 图标 ----------
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M8 6h8"/>',
    pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5 17.5 10.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    volume: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    'volume-off': '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6M21 9l-5 6"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    x: '<path d="M5 5l14 14M19 5 5 19"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    back: '<path d="M15 19 8 12l7-7"/>',
    flame: '<path d="M12 22c4.4 0 7-2.9 7-6.6 0-4.6-4.2-6.4-4.2-10.4C14.8 3.4 13.4 2 12 2c0 3.4-3.2 4.6-3.2 8.2 0 2-1.2 2.6-2 1.8-.6-.6-1-1.6-1-2.6C4.6 12 5 22 12 22"/><path d="M12 22c-2 0-3.4-1.4-3.4-3.2 0-2.4 2.4-3 2.4-5.4 0 0 3.4 1.6 3.4 5.4 0 1.8-1 3.2-2.4 3.2"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9 6.6 19.8l1.1-6.1L3.2 9.4l6.1-.8z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    headphones: '<path d="M4 14a8 8 0 0 1 16 0"/><rect x="2.5" y="13.5" width="4.5" height="7" rx="2"/><rect x="17" y="13.5" width="4.5" height="7" rx="2"/>',
    mic: '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21M8.5 21h7"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H1a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 2.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 7 4.6h.1A1.7 1.7 0 0 0 8 3.1V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 13.9 4.6a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    cards: '<rect x="3" y="6" width="13" height="15" rx="2.5"/><path d="m9 3 10 2.5a2 2 0 0 1 1.5 2.4L18 21"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H4.5v1.5A3.5 3.5 0 0 0 8 10M16 5h3.5v1.5A3.5 3.5 0 0 1 16 10"/><path d="M12 13v4M8.5 21h7M10 17h4"/>',
    flame2: '<path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2.5-2-4-3.5-6.5-1.5 2.5-3.5 4-3.5 6.5z"/>',
    target2: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="5.5"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8"/><path d="M12 17h.01"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    lock: '<rect x="4.5" y="10" width="15" height="10.5" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    leaf: '<path d="M20 4c-9 0-16 4-16 11a5 5 0 0 0 5 5c7 0 11-7 11-16z"/><path d="M4 21c2-6 6-9 11-11"/>'
  };

  function icon(name, cls = 'i') {
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  }

  // ---------- 状态 ----------
  const DEFAULT_STATE = () => ({
    v: 2,
    settings: { accent: 'uk', rate: 0.85, autoSpeak: true, voice: true, dailyGoal: 10, name: '小学员' },
    learned: {},         // "g-t-mi-wi": 1
    srs: {},             // key: { lv, right, wrong, last, next, seen }
    stars: 0,
    quizzes: 0,
    best: {},            // moduleKey -> 0..3
    levels: {},          // moduleKey -> 0..3 闯关星数
    sprites: {},         // moduleKey -> 1 已收集精灵
    history: {},         // "2026-10-22": { words: n, quizzes: n, minutes: n }
    last: null,          // { g, t, mi, at }
    term: {},            // grade -> 1|2
    pg: 1,               // 练习页年级
    createdAt: Date.now()
  });

  let state;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    state = Object.assign(DEFAULT_STATE(), raw || {});
    state.settings = Object.assign(DEFAULT_STATE().settings, raw && raw.settings || {});
  } catch { state = DEFAULT_STATE(); }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }
  const today = () => state.history[todayStr()] || { words: 0, quizzes: 0, minutes: 0 };
  function touchToday(patch) {
    const k = todayStr();
    state.history[k] = Object.assign({ words: 0, quizzes: 0, minutes: 0 }, state.history[k] || {}, patch);
    save();
  }
  function streak() {
    let n = 0;
    const d = new Date();
    // 今天没学不算断，从昨天开始往前数
    const active = (k) => { const h = state.history[k]; return h && (h.words > 0 || h.quizzes > 0); };
    if (!active(todayStr(d))) d.setDate(d.getDate() - 1);
    while (active(todayStr(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function weekSeries() {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const h = state.history[todayStr(d)] || { words: 0 };
      out.push({ k: todayStr(d), label: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()], v: h.words || 0, today: i === 0 });
    }
    return out;
  }

  // ---------- 词表辅助 ----------
  const BOOKS = window.BOOKS;
  const WORDS = window.WORDS;
  const bookKey = (b) => `${b.grade}-${b.term}`;
  const modKey = (b, mi) => `${bookKey(b)}-${mi}`;
  const wordKey = (b, mi, wi) => `${modKey(b, mi)}-${wi}`;
  const getWord = (k) => {
    // 词库用 orange2 这类后缀区分同形词的释义与例句，展示/朗读时还原为标准拼写
    const w = WORDS[k];
    if (!w) return { en: k, ipa: '', pos: '', zh: '', exEn: '', exZh: '' };
    return { en: String(k).replace(/\d+$/, ''), ipa: w[0], pos: w[1], zh: w[2], exEn: w[3], exZh: w[4] };
  };
  const moduleWords = (b, mi) => b.modules[mi].words.map((k, wi) => Object.assign({ wi, key: wordKey(b, mi, wi), book: b, mi }, getWord(k)));
  const allModules = () => BOOKS.flatMap(b => b.modules.map((m, mi) => ({ b, m, mi })));
  function allWords(filter) {
    const out = [];
    BOOKS.forEach(b => b.modules.forEach((m, mi) => m.words.forEach((k, wi) => {
      if (filter && !filter(b, mi, wi)) return;
      out.push(Object.assign({ wi, key: wordKey(b, mi, wi), book: b, mi, moduleName: m.name }, getWord(k)));
    })));
    return out;
  }
  function allSentences() {
    const out = [];
    BOOKS.forEach(b => b.modules.forEach((m, mi) => m.sentences.forEach(s => out.push(Object.assign(par(s), { book: b, mi })))));
    return out;
  }
  function moduleStat(b, mi) {
    const total = b.modules[mi].words.length;
    let learned = 0, mastered = 0;
    for (let wi = 0; wi < total; wi++) {
      const k = wordKey(b, mi, wi);
      if (state.learned[k]) learned++;
      const s = state.srs[k];
      if (s && s.lv >= 5) mastered++;
    }
    return { total, learned, mastered, pct: Math.round(learned / total * 100) };
  }
  function bookStat(b) {
    let learned = 0, total = 0;
    b.modules.forEach((_, mi) => {
      const s = moduleStat(b, mi); learned += s.learned; total += s.total;
    });
    return { learned, total, pct: total ? Math.round(learned / total * 100) : 0 };
  }
  function gradeStat(g) {
    let learned = 0, total = 0;
    BOOKS.filter(b => b.grade === g).forEach(b => {
      const s = bookStat(b); learned += s.learned; total += s.total;
    });
    return { learned, total, pct: total ? Math.round(learned / total * 100) : 0 };
  }
  const totalWordsCount = () => BOOKS.reduce((n, b) => n + b.modules.reduce((m, x) => m + x.words.length, 0), 0);
  const totalLearnedCount = () => Object.keys(state.learned).length;
  const masteredCount = () => Object.values(state.srs).filter(s => s.lv >= 5).length;

  // ---------- 艾宾浩斯复习 ----------
  const INTERVALS = [0, 1, 2, 4, 7, 15, 30, 60]; // 天，层数即间隔索引
  const SRS_MAX = 7;
  function markWord(key, ok) {
    const s = state.srs[key] || (state.srs[key] = { lv: 0, right: 0, wrong: 0, last: 0, next: 0, seen: 0 });
    s.seen = (s.seen || 0) + 1;
    s.last = Date.now();
    if (ok) {
      s.right++; s.lv = clamp(s.lv + 1, 0, SRS_MAX);
      state.learned[key] = 1;
    } else {
      s.wrong++; s.lv = clamp(s.lv - 2, 0, SRS_MAX);
    }
    s.next = Date.now() + INTERVALS[s.lv] * DAY;
    save();
  }
  function dueWords(limit = 20) {
    const now = Date.now();
    const pool = allWords((b, mi, wi) => {
      const k = wordKey(b, mi, wi);
      return state.learned[k] || state.srs[k];
    });
    const due = pool.filter(w => {
      const s = state.srs[w.key];
      return s && s.next <= now;
    });
    return shuffle(due).slice(0, limit);
  }
  function weakWords(limit = 10) {
    const pool = allWords((b, mi, wi) => {
      const k = wordKey(b, mi, wi);
      return state.learned[k] || state.srs[k];
    });
    return pool
      .map(w => ({ w, s: state.srs[w.key] || { lv: 0, wrong: 0 } }))
      .filter(x => x.s.wrong > 0)
      .sort((a, b) => (b.s.wrong - a.s.wrong) || (a.s.lv - b.s.lv))
      .slice(0, limit).map(x => x.w);
  }
  function reviewCount() {
    return dueWords(999).length;
  }

  // ---------- 语音 ----------
  // 同一个浏览器的中文音色有限，用音高/语速区分角色，尽量选不同声线
  const VOICE_PROFILE = {
    li:   { pitch: 1.42, rate: 1.02, prefer: /xiaoyi|xiaoxiao|tingting|meijia|huihui|yaoyao|female|女/i },
    sp:   { pitch: 1.22, rate: 0.98, prefer: /xiaoxiao|xiaoyi|tingting|meijia|huihui|female|女/i },
    fog:  { pitch: 0.62, rate: 0.86, prefer: /yunxi|yunyang|kangkang|male|男/i },
    tree: { pitch: 0.82, rate: 0.90, prefer: /yunyang|yunxi|kangkang|male|男/i },
    all:  { pitch: 1.18, rate: 1.00, prefer: /xiaoxiao|xiaoyi|tingting|meijia|huihui|female|女/i }
  };
  let saySeq = 0;

  // 把「中文里夹英文单词」拆开，中文用中文音色、英文用英文音色
  function mixedUnits(text) {
    const out = [];
    const re = /[A-Za-z][A-Za-z'’\-]*(?:\s+[A-Za-z][A-Za-z'’\-]*)*/g;
    let last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) out.push({ zh: true, text: text.slice(last, m.index) });
      out.push({ zh: false, text: m[0] });
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push({ zh: true, text: text.slice(last) });
    return out.filter(x => /[A-Za-z\u4e00-\u9fa5]/.test(x.text)).map(x => ({ zh: x.zh, text: x.text.trim() })).filter(x => x.text);
  }

  // ---------- 离线语音包 ----------
  // 文本 -> FNV-1a 指纹；音频文件由 tools/audio-synth.py 预生成，清单在 audio/manifest.js
  function sayText(text) {
    return String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
  }
  function sayHash(text) {
    let h = 0x811c9dc5;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(36);
  }
  function accentKey() { return state.settings.accent === 'us' ? 'en-us' : 'en-uk'; }

  const AUDIO = {
    el: null,
    files: new Map(),
    preloads: [],
    manifestRef: null,
    ensureEl() {
      if (this.el) return this.el;
      const el = document.createElement('audio');
      el.preload = 'auto';
      el.setAttribute('playsinline', '');
      el.style.display = 'none';
      document.body.appendChild(el);
      this.el = el;
      return el;
    },
    filesFor(key) {
      const m = window.AUDIO_MANIFEST || null;
      if (m !== this.manifestRef) { this.files.clear(); this.manifestRef = m; }
      if (this.files.has(key)) return this.files.get(key);
      const arr = m && m.voices && m.voices[key];
      const set = arr ? new Set(arr) : null;
      this.files.set(key, set);
      return set;
    },
    url(text, key) {
      const t = sayText(text);
      if (!t) return null;
      const set = this.filesFor(key);
      if (!set) return null;
      const h = sayHash(t);
      if (!set.has(h)) return null;
      const base = (window.AUDIO_MANIFEST && window.AUDIO_MANIFEST.base) || 'audio/';
      const ext = (window.AUDIO_MANIFEST && window.AUDIO_MANIFEST.ext) || 'mp3';
      return base + key + '/' + h + '.' + ext;
    },
    has(text, key) { return !!this.url(text, key); },
    keyFor(text, opts) {
      if (opts && opts.who) return 'zh-' + (VOICE_PROFILE[opts.who] ? opts.who : 'li');
      return /[\u4e00-\u9fff]/.test(sayText(text)) ? 'zh-li' : accentKey();
    },
    preload(text, key) {
      const url = this.url(text, key);
      if (!url) return;
      if (this.preloads.some(a => a._packUrl === url)) return;
      const a = new Audio();
      a.preload = 'auto';
      a._packUrl = url;
      a.src = url;
      try { a.load(); } catch (e) { /* 忽略 */ }
      this.preloads.push(a);
      if (this.preloads.length > 4) {
        const old = this.preloads.shift();
        old.src = '';
      }
    },
    stop() {
      const el = this.el;
      if (!el) return;
      el.onended = null;
      el.onerror = null;
      try { el.pause(); } catch (e) { /* 忽略 */ }
    },
    play(text, key, opts, seq) {
      const url = this.url(text, key);
      if (!url) return false;
      const el = this.ensureEl();
      this.stop();
      let fellBack = false;
      const fallback = () => {
        if (fellBack) return;
        fellBack = true;
        el.onerror = null;
        if (opts.fallback) opts.fallback();
        else legacySpeak(text, opts, seq);
      };
      el.onended = () => { if (seq === saySeq && opts.onend) opts.onend(); };
      el.onerror = () => { if (seq === saySeq) fallback(); };
      el.src = url;
      el.playbackRate = clamp((opts.rate || state.settings.rate || 0.85) / 0.85, 0.55, 1.8);
      try { el.preservesPitch = true; } catch (e) { /* 老浏览器忽略 */ }
      try { el.currentTime = 0; } catch (e) { /* 忽略 */ }
      const p = el.play();
      if (p && p.catch) p.catch(() => { if (seq === saySeq) fallback(); });
      return true;
    }
  };

  function legacySpeak(text, opts = {}, seq) {
    if (!('speechSynthesis' in window)) {
      UI.toast('当前浏览器不支持发音');
      opts.onend && opts.onend();
      return null;
    }
    const zh = /[\u4e00-\u9fff]/.test(text);
    const u = new SpeechSynthesisUtterance(text);
    const v = zh ? TTS.zh('li') : TTS.pick();
    u.lang = v ? v.lang : (zh ? 'zh-CN' : (state.settings.accent === 'us' ? 'en-US' : 'en-GB'));
    if (v) u.voice = v;
    u.rate = opts.rate || state.settings.rate || 0.85;
    u.pitch = 1.05;
    u.onend = () => { if (seq === undefined || seq === saySeq) opts.onend && opts.onend(); };
    u.onerror = () => { if (seq === undefined || seq === saySeq) opts.onend && opts.onend(); };
    if (seq !== undefined && seq !== saySeq) return u;
    speechSynthesis.speak(u);
    return u;
  }

  function legacyMixed(text, who, opts = {}, seq) {
    if (!('speechSynthesis' in window)) { opts.onend && opts.onend(); return; }
    const units = mixedUnits(text);
    const p = VOICE_PROFILE[who] || VOICE_PROFILE.li;
    const zhV = TTS.zh(who);
    const enV = TTS.pick();
    const speakAt = (i) => {
      if (seq !== saySeq) return;
      if (i >= units.length) { opts.onend && opts.onend(); return; }
      const unit = units[i];
      const u = new SpeechSynthesisUtterance(unit.text);
      if (unit.zh) {
        u.lang = zhV ? zhV.lang : 'zh-CN';
        if (zhV) u.voice = zhV;
        u.rate = p.rate * (opts.rate || 1);
        u.pitch = p.pitch;
      } else {
        u.lang = enV ? enV.lang : (state.settings.accent === 'us' ? 'en-US' : 'en-GB');
        if (enV) u.voice = enV;
        u.rate = (state.settings.rate || 0.85) * (opts.rate || 1);
        u.pitch = 1.02;
      }
      u.onend = () => speakAt(i + 1);
      u.onerror = () => speakAt(i + 1);
      speechSynthesis.speak(u);
    };
    speakAt(0);
  }

  const TTS = {
    voices: [],
    ready: false,
    init() {
      if (!('speechSynthesis' in window)) return;
      const load = () => { this.voices = speechSynthesis.getVoices(); this.ready = true; };
      load();
      speechSynthesis.onvoiceschanged = load;
    },
    all() {
      return this.voices.length ? this.voices : (window.speechSynthesis ? speechSynthesis.getVoices() : []);
    },
    pick() {
      const vs = this.all();
      const want = state.settings.accent === 'us' ? /en-US/i : /en-GB/i;
      const other = state.settings.accent === 'us' ? /en-GB/i : /en-US/i;
      return vs.find(v => want.test(v.lang) && /female|Samantha|Serena|Libby|Hazel|Google|Microsoft/i.test(v.name))
        || vs.find(v => want.test(v.lang))
        || vs.find(v => other.test(v.lang))
        || vs.find(v => /^en/i.test(v.lang)) || null;
    },
    zh(who) {
      const vs = this.all().filter(v => /^zh|chinese|中文|普通话|普通話/i.test(`${v.lang || ''} ${v.name || ''}`));
      const p = VOICE_PROFILE[who] || VOICE_PROFILE.li;
      return vs.find(v => p.prefer.test(v.name || '')) || vs[0] || null;
    },
    muted() { return state.settings.voice === false; },
    hasAudio(text, opts) {
      const t = sayText(text);
      return !!t && AUDIO.has(t, AUDIO.keyFor(t, opts));
    },
    preload(text, who) {
      const t = sayText(text);
      if (!t) return;
      AUDIO.preload(t, who ? AUDIO.keyFor(t, { who }) : AUDIO.keyFor(t));
    },
    speak(text, opts = {}) {
      const t = sayText(text);
      if (!t) return null;
      const seq = ++saySeq;
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      AUDIO.stop();
      if (AUDIO.play(t, AUDIO.keyFor(t, opts), opts, seq)) return t;
      return legacySpeak(t, opts, seq);
    },
    // 剧情配音：优先整句离线音频，缺失时退回浏览器分角色朗读
    sayMixed(text, who = 'li', opts = {}) {
      const t = sayText(text);
      if (!t || this.muted()) { opts.onend && opts.onend(); return; }
      const seq = ++saySeq;
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      AUDIO.stop();
      const key = 'zh-' + (VOICE_PROFILE[who] ? who : 'li');
      if (AUDIO.play(t, key, Object.assign({}, opts, { fallback: () => legacyMixed(t, who, opts, seq) }), seq)) return;
      legacyMixed(t, who, opts, seq);
    },
    slow(text, onend) { return this.speak(text, { rate: 0.62, onend }); },
    spell(word, onend) {
      const letters = word.replace(/[^a-zA-Z]/g, '').toLowerCase().split('');
      if (letters.length > 14) return this.speak(word, { rate: 0.7, onend });
      const key = accentKey();
      const ok = AUDIO.has(word, key) && letters.every(l => AUDIO.has(l.toUpperCase(), key));
      if (!ok) return this.speak(`${word}. ${letters.join(', ')}, ${word}.`, { rate: 0.8, onend });
      const seq = ++saySeq;
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      AUDIO.stop();
      const parts = [word].concat(letters.map(l => l.toUpperCase()), [word]);
      const step = (i) => {
        if (seq !== saySeq) return;
        if (i >= parts.length) { onend && onend(); return; }
        AUDIO.play(parts[i], key, { rate: 0.9, onend: () => setTimeout(() => step(i + 1), 130) }, seq);
      };
      step(0);
    },
    stop() {
      saySeq++;
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      AUDIO.stop();
    }
  };
  TTS.init();

  // iOS/Safari 只允许用户手势解锁过的媒体元素后续自动播放：首次触摸时播一段静音
  (function primeAudio() {
    let primed = false;
    document.addEventListener('pointerdown', () => {
      if (primed) return;
      primed = true;
      const el = AUDIO.ensureEl();
      if (el && !el.paused) return;
      const vol = el.volume;
      el.volume = 0;
      el.src = 'audio/_silence.mp3';
      const restore = () => {
        if (!el.src.endsWith('_silence.mp3')) { el.volume = vol; return; }
        try { el.pause(); el.currentTime = 0; } catch (e) { /* 忽略 */ }
        el.volume = vol;
      };
      const p = el.play();
      if (p && p.then) p.then(restore, () => { el.volume = vol; });
      else restore();
    }, { capture: true, once: true, passive: true });
  })();

  // 语音识别（跟读评分），不支持时优雅降级
  const ASR = {
    ok() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); },
    rec: null,
    start(onResult, onEnd, onError) {
      const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Ctor) { onError && onError('unsupported'); return false; }
      this.stop();
      const rec = new Ctor();
      rec.lang = state.settings.accent === 'us' ? 'en-US' : 'en-GB';
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      rec.continuous = false;
      let got = false;
      rec.onresult = (e) => {
        got = true;
        const alts = [...e.results[0]].map(r => r.transcript);
        onResult(alts);
      };
      rec.onerror = (e) => {
        if (e.error === 'no-speech') onError && onError('no-speech');
        else if (e.error === 'not-allowed' || e.error === 'service-not-allowed') onError && onError('denied');
        else onError && onError(e.error);
      };
      rec.onend = () => { onEnd && onEnd(got); };
      this.rec = rec;
      try { rec.start(); return true; } catch (err) { onError && onError('start-fail'); return false; }
    },
    stop() { if (this.rec) { try { this.rec.stop(); } catch {} this.rec = null; } }
  };

  function similarity(a, b) {
    const x = norm(a), y = norm(b);
    if (!x || !y) return 0;
    if (x === y) return 1;
    const d = levenshtein(x, y);
    return 1 - d / Math.max(x.length, y.length);
  }
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }
  function diffWords(target, said) {
    const t = target.split(/\s+/), s = new Set(norm(said).split(' '));
    return t.map(w => ({ w, hit: s.has(norm(w)) }));
  }

  // ---------- 路由 ----------
  const routes = {};
  const stack = [];
  let current = null;
  const tabs = ['home', 'course', 'practice', 'me'];
  let preventBack = null;

  function go(route, opts = {}) {
    if (!opts.replace && current) stack.push(current);
    current = route;
    render();
  }
  function replace(route) { current = route; render(); }
  function reset(route) { stack.length = 0; current = route; render(); }
  function back() {
    TTS.stop(); ASR.stop();
    if (preventBack) { const f = preventBack; preventBack = null; f(); return; }
    const prev = stack.pop();
    if (prev) { current = prev; render(); }
    else replace({ name: 'home' });
  }
  // 把浏览器返回手势收进应用内
  history.pushState({ p: 0 }, '');
  window.addEventListener('popstate', () => {
    if (preventBack) { const f = preventBack; preventBack = null; history.pushState({ p: 0 }, ''); f(); return; }
    const inApp = stack.length > 0;
    back();
    if (inApp) history.pushState({ p: 0 }, '');
    else history.back();
  });

  function render() {
    const r = current || { name: 'home' };
    const fn = routes[r.name] || routes.home;
    $('#view').scrollTop = 0;
    UI.setTab(tabs.includes(r.name) ? r.name : null);
    UI.setTop(r.top || null);
    fn(r);
  }

  // ---------- UI 基础 ----------
  const UI = {
    setTop(cfg) {
      const bar = $('#topbar');
      if (!cfg) { bar.classList.add('hidden'); return; }
      bar.classList.remove('hidden');
      bar.innerHTML = `
        <button class="back" data-act="back" aria-label="返回">${icon('back')}</button>
        <div class="tt"><h1>${esc(cfg.title || '')}</h1>${cfg.sub ? `<div class="sub">${esc(cfg.sub)}</div>` : ''}</div>
        <div class="act">${(cfg.actions || []).map(a => `<button class="icon-btn ${a.brand ? 'brand' : ''}" data-act="${a.act}" aria-label="${esc(a.label || '')}">${icon(a.icon)}</button>`).join('')}</div>`;
      bar.querySelector('[data-act="back"]').onclick = () => back();
      (cfg.actions || []).forEach(a => {
        const el = bar.querySelector(`[data-act="${a.act}"]`);
        if (el && a.onClick) el.onclick = a.onClick;
      });
    },
    setTab(name) {
      const bar = $('#tabbar');
      bar.classList.toggle('hidden', !name);
      $$('button', bar).forEach(b => b.classList.toggle('on', b.dataset.tab === name));
    },
    toast(msg, ms = 1700) {
      let t = $('#toast');
      if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
      t.textContent = msg;
      requestAnimationFrame(() => t.classList.add('show'));
      clearTimeout(UI._tt);
      UI._tt = setTimeout(() => t.classList.remove('show'), ms);
    },
    confirm({ title, text, ok = '确定', cancel = '取消', danger = false }) {
      return new Promise(resolve => {
        const mask = document.createElement('div');
        mask.className = 'mask';
        mask.innerHTML = `<div class="sheet">
          <h3>${esc(title)}</h3><p>${esc(text || '')}</p>
          <div class="acts">
            <button class="btn ghost" data-v="0">${esc(cancel)}</button>
            <button class="btn ${danger ? '' : 'green'}" data-v="1" ${danger ? 'style="background:linear-gradient(135deg,#FB7185,#E11D48);box-shadow:none"' : ''}>${esc(ok)}</button>
          </div></div>`;
        document.body.appendChild(mask);
        const done = (v) => { mask.remove(); resolve(v); };
        mask.querySelector('[data-v="0"]').onclick = () => done(false);
        mask.querySelector('[data-v="1"]').onclick = () => done(true);
        mask.onclick = (e) => { if (e.target === mask) done(false); };
      });
    },
    pbar(pct, color) {
      return `<div class="pbar"><i style="width:${clamp(pct, 0, 100)}%${color ? ';background:' + color : ''}"></i></div>`;
    },
    speakBtn(text, cls = '', label = '播放发音') {
      return `<button class="speak-btn ${cls}" data-say="${esc(text)}" aria-label="${esc(label)}">${icon('volume')}</button>`;
    },
    empty(iconName, title, sub, actionHTML = '') {
      return `<div class="empty"><div class="ic">${icon(iconName, 'i-lg')}</div><b>${esc(title)}</b><span>${esc(sub)}</span>${actionHTML ? `<div style="margin-top:16px">${actionHTML}</div>` : ''}</div>`;
    }
  };

  // 全局朗读按钮
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say]');
    if (!b) return;
    e.stopPropagation();
    if (b.dataset.spell === '1') {
      b.classList.add('playing');
      TTS.spell(b.dataset.say, () => b.classList.remove('playing'));
    } else {
      b.classList.add('playing');
      TTS.speak(b.dataset.say, { rate: b.dataset.slow ? 0.6 : undefined, onend: () => b.classList.remove('playing') });
    }
  });

  // ---------- 导出 ----------
  window.App = {
    state, save, DEFAULT_STATE,
    BOOKS, WORDS, PHONICS: window.PHONICS,
    $, $$, esc, todayStr, dayDiff, shuffle, pick, clamp, par, norm, similarity, diffWords,
    icon, ICONS,
    bookKey, modKey, wordKey, getWord, moduleWords, allModules, allWords, allSentences,
    moduleStat, bookStat, gradeStat, totalWordsCount, totalLearnedCount, masteredCount,
    markWord, dueWords, weakWords, reviewCount, INTERVALS,
    touchToday, today, streak, weekSeries,
    TTS, ASR,
    go, replace, reset, back, routes, render,
    set preventBack(fn) { preventBack = fn; },
    get current() { return current; },
    set current(v) { current = v; },
    UI, KEY,
    checkin: function () {
      state.checkins = (state.checkins || 0) + 1;
      const h = today();
      state.history[todayStr()] = Object.assign({ words: 0, quizzes: 0, minutes: 0 }, h, { checkin: true });
      if (!state.lastCheckin || state.lastCheckin !== todayStr()) { state.stars += 1; state.lastCheckin = todayStr(); save(); return true; }
      save(); return false;
    },
    checkedToday: function () { return state.lastCheckin === todayStr(); }
  };
  // 兼容全局直接访问
  window.BOOKS = window.BOOKS; window.WORDS = window.WORDS; window.PHONICS = window.PHONICS;
})();
