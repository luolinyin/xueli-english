/* ============ 练习中心 / 答题引擎 / 跟读评分 / 结果 ============ */
(function () {
  'use strict';
  const A = window.App;
  const { $, $$, esc, icon, UI, TTS, ASR } = A;
  const GRADE_CN = ['一', '二', '三', '四', '五', '六'];
  const gName = (g) => `${GRADE_CN[g - 1]}年级`;

  const ALLW = A.allWords();
  const ALLS = A.allSentences();
  const BY_GRADE = {};
  ALLW.forEach(w => { (BY_GRADE[w.book.grade] = BY_GRADE[w.book.grade] || []).push(w); });

  const TAG = {
    info: '新词学习', listen: '听音选词', spell: '单词拼写', dict: '听写单词',
    order: '连词成句', pron: '跟读评分'
  };
  function tagOf(ex) {
    if (ex.type === 'mcq') return ex.mode === 'zh2en' ? '中译英' : '词义理解';
    return TAG[ex.type] || '练习';
  }

  // ---------- 出题 ----------
  function pickDistract(target, field, n) {
    const used = new Set([String(target[field])]);
    const out = [];
    const take = (pool) => {
      for (const w of pool) {
        if (w.key === target.key) continue;
        const v = w[field];
        if (!v || used.has(String(v))) continue;
        used.add(String(v));
        out.push(v);
        if (out.length >= n) return true;
      }
      return false;
    };
    if (take(A.shuffle(BY_GRADE[target.book.grade] || []))) return out;
    take(A.shuffle(ALLW));
    return out;
  }

  function wordEx(w, kind) {
    if (kind === 'zh2en') {
      return {
        type: 'mcq', mode: 'zh2en', word: w, wordKey: w.key,
        opts: A.shuffle([w.en, ...pickDistract(w, 'en', 2)]), answer: w.en, done: false
      };
    }
    if (kind === 'listen') {
      return {
        type: 'listen', word: w, wordKey: w.key,
        opts: A.shuffle([w.en, ...pickDistract(w, 'en', 2)]), answer: w.en, done: false
      };
    }
    if (kind === 'spell') {
      const chars = w.en.replace(/[^A-Za-z]/g, '').toLowerCase().split('');
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const extras = A.shuffle(alphabet.filter(c => !chars.includes(c))).slice(0, 3);
      const bank = A.shuffle(
        chars.map((ch, i) => ({ ch, id: 't' + i }))
          .concat(extras.map((ch, i) => ({ ch, id: 'x' + i })))
      );
      return { type: 'spell', word: w, wordKey: w.key, answer: w.en, chars, bank, filled: [], hinted: false, done: false };
    }
    if (kind === 'dict') {
      return { type: 'dict', word: w, wordKey: w.key, answer: w.en, user: '', done: false };
    }
    return {
      type: 'mcq', mode: 'en2zh', word: w, wordKey: w.key,
      opts: A.shuffle([w.zh, ...pickDistract(w, 'zh', 2)]), answer: w.zh, done: false
    };
  }

  function orderEx(s) {
    const tokens = s.en.split(/\s+/).filter(Boolean);
    let pool = A.shuffle(tokens);
    if (pool.length > 1 && pool.join(' ') === tokens.join(' ')) pool = pool.slice().reverse();
    return { type: 'order', sentence: s, answer: s.en, tokens, pool, picked: [], done: false };
  }

  function pronEx(text, zh, wordKey) {
    return { type: 'pron', text, zh: zh || '', wordKey: wordKey || '', preview: null, done: false, ok: false, score: 0, said: '' };
  }

  function infoEx(w) {
    return { type: 'info', word: w, wordKey: w.key, done: false };
  }

  function sentencesOfModule(book, mi) {
    return book.modules[mi].sentences.map(s => Object.assign(A.par(s), { book, mi }));
  }

  // ---------- 会话 ----------
  let S = null;

  function launch(exs, title, opts = {}) {
    if (!exs.length) { UI.toast('暂时没有可练习的内容'); return; }
    S = {
      exs, title, i: 0, correct: 0, startAt: Date.now(), combo: 0, maxCombo: 0,
      meta: opts.meta || {}, restart: opts.restart || null, finished: false
    };
    if (opts.replace) A.replace({ name: 'session' });
    else A.go({ name: 'session' });
  }

  function nextNewWords(limit) {
    const fresh = ALLW.filter(w => !A.state.learned[w.key]);
    const last = A.state.last;
    const lastBook = last ? A.BOOKS.find(b => A.bookKey(b) === last.book) : null;
    if (!lastBook) return fresh.slice(0, limit);
    const sameMod = fresh.filter(w => w.book === lastBook && w.mi === last.mi);
    const sameBook = fresh.filter(w => w.book === lastBook && w.mi !== last.mi);
    const rest = fresh.filter(w => w.book !== lastBook);
    return sameMod.concat(sameBook, rest).slice(0, limit);
  }

  function recordWord(ex, ok) {
    if (!ex.wordKey) return;
    const was = !!A.state.learned[ex.wordKey];
    A.markWord(ex.wordKey, ok);
    if (ok && !was) A.touchToday({ words: (A.today().words || 0) + 1 });
  }

  function noteAnswer(ok) {
    if (!S) return;
    if (ok) {
      S.combo = (S.combo || 0) + 1;
      S.maxCombo = Math.max(S.maxCombo || 0, S.combo);
    } else {
      S.combo = 0;
    }
  }

  function startDaily(opts = {}) {
    const due = A.dueWords(3);
    const news = nextNewWords(5);
    const words = [];
    const seen = new Set();
    news.concat(due).forEach(w => {
      if (seen.has(w.key)) return;
      seen.add(w.key);
      words.push(w);
    });
    if (!words.length) {
      UI.toast('今天的新词都学完啦，去做个闯关吧');
      A.go({ name: 'practice' });
      return;
    }
    const exs = [];
    words.filter(w => !A.state.learned[w.key]).slice(0, 3).forEach(w => exs.push(infoEx(w)));
    const kinds = ['en2zh', 'listen', 'spell', 'zh2en', 'dict', 'en2zh', 'spell', 'listen'];
    words.slice(0, 8).forEach((w, i) => exs.push(wordEx(w, kinds[i % kinds.length])));
    launch(exs, '今日新词', {
      replace: opts.replace,
      restart: () => startDaily({ replace: true }),
      meta: { kind: 'daily' }
    });
  }

  function startReview(opts = {}) {
    const due = A.dueWords(10);
    if (!due.length) { UI.toast('暂时没有到期复习的单词，先去学新词吧'); return; }
    const kinds = ['en2zh', 'listen', 'zh2en', 'spell', 'dict'];
    const exs = due.map((w, i) => wordEx(w, kinds[i % kinds.length]));
    launch(exs, '复习巩固', {
      replace: opts.replace,
      restart: () => startReview({ replace: true }),
      meta: { kind: 'review' }
    });
  }

  function startWeak(opts = {}) {
    const weak = A.weakWords(10);
    if (!weak.length) { UI.toast('还没有待加强的单词，先多学几个吧'); return; }
    const kinds = ['en2zh', 'spell', 'zh2en', 'listen'];
    const exs = weak.map((w, i) => wordEx(w, kinds[i % kinds.length]));
    launch(exs, '错词强化', {
      replace: opts.replace,
      restart: () => startWeak({ replace: true }),
      meta: { kind: 'weak' }
    });
  }

  function startLevel(book, mi, opts = {}) {
    const begin = () => {
      const m = book.modules[mi];
      const words = A.moduleWords(book, mi);
      const sents = sentencesOfModule(book, mi).filter(s => s.en.split(/\s+/).length >= 2);
      const picked = A.shuffle(words).slice(0, 6);
      const fresh = picked.filter(w => !A.state.learned[w.key]);
      const exs = [];
      fresh.slice(0, 2).forEach(w => exs.push(infoEx(w)));
      const kinds = ['listen', 'en2zh', 'spell', 'zh2en', 'dict', 'listen'];
      picked.forEach((w, i) => exs.push(wordEx(w, kinds[i % kinds.length])));
      if (sents.length) exs.push(orderEx(A.pick(sents)));
      launch(exs, `第 ${mi + 1} 关 · ${m.zh}`, {
        replace: opts.replace,
        restart: () => startLevel(book, mi, { replace: true }),
        meta: { kind: 'level', modKey: A.modKey(book, mi), book: A.bookKey(book), mi, retry: true }
      });
    };
    if (!opts.skipStory && window.Story) window.Story.gate(book, mi, begin);
    else begin();
  }

  function testExercises(book, mi) {
    const words = A.shuffle(A.moduleWords(book, mi));
    const sents = A.shuffle(sentencesOfModule(book, mi).filter(s => s.en.split(/\s+/).length >= 2));
    const kinds = ['en2zh', 'listen', 'spell', 'zh2en', 'dict', 'listen'];
    const exs = [];
    words.slice(0, 6).forEach((w, i) => exs.push(wordEx(w, kinds[i % kinds.length])));
    sents.slice(0, 4).forEach(s => exs.push(orderEx(s)));
    if (exs.length < 10) {
      words.slice(6, 6 + (10 - exs.length)).forEach((w, i) => exs.push(wordEx(w, kinds[(i + 2) % kinds.length])));
    }
    return A.shuffle(exs);
  }

  function startModule(book, mi, mode, opts = {}) {
    mode = mode || 'learn';
    const m = book.modules[mi];
    const words = A.moduleWords(book, mi);
    const sents = sentencesOfModule(book, mi).filter(s => s.en.split(/\s+/).length >= 2);
    const modKey = A.modKey(book, mi);
    const baseTitle = `${m.name} · ${m.zh}`;
    const restart = (m) => () => startModule(book, mi, m, { replace: true });

    if (mode === 'test') {
      const exs = testExercises(book, mi);
      launch(exs, `综合测试 · ${baseTitle}`, {
        replace: opts.replace,
        restart: restart('test'),
        meta: { kind: 'test', modKey, book: A.bookKey(book), mi }
      });
      return;
    }
    if (mode === 'learn') {
      const ordered = words.slice().sort((a, b) => (A.state.learned[a.key] ? 1 : 0) - (A.state.learned[b.key] ? 1 : 0));
      const fresh = ordered.filter(w => !A.state.learned[w.key]);
      const exs = fresh.slice(0, 3).map(infoEx);
      const kinds = ['en2zh', 'listen', 'spell', 'zh2en', 'dict', 'en2zh', 'spell', 'listen'];
      ordered.slice(0, 8).forEach((w, i) => exs.push(wordEx(w, kinds[i % kinds.length])));
      launch(exs, `模块学习 · ${baseTitle}`, {
        replace: opts.replace,
        restart: restart('learn'),
        meta: { kind: 'learn', modKey, book: A.bookKey(book), mi }
      });
      return;
    }
    if (mode === 'listen' || mode === 'spell') {
      const exs = A.shuffle(words).slice(0, 8).map(w => wordEx(w, mode));
      launch(exs, `${mode === 'listen' ? '听音选词' : '单词拼写'} · ${baseTitle}`, {
        replace: opts.replace,
        restart: restart(mode),
        meta: { kind: 'drill', modKey }
      });
      return;
    }
    if (mode === 'order') {
      const exs = A.shuffle(sents).slice(0, 6).map(orderEx);
      launch(exs, `连词成句 · ${baseTitle}`, {
        replace: opts.replace,
        restart: restart('order'),
        meta: { kind: 'drill', modKey }
      });
      return;
    }
    if (mode === 'pron') {
      if (!ASR.ok()) {
        UI.toast('当前浏览器不支持语音识别，建议用 Chrome / Edge 打开');
        return;
      }
      const exs = A.shuffle(sents).slice(0, 5).map(s => pronEx(s.en, s.zh));
      launch(exs, `跟读评分 · ${baseTitle}`, {
        replace: opts.replace,
        restart: restart('pron'),
        meta: { kind: 'drill', modKey }
      });
    }
  }

  function startGradeDrill(grade, type, opts = {}) {
    const words = BY_GRADE[grade] || [];
    const sents = ALLS.filter(s => s.book.grade === grade && s.en.split(/\s+/).length >= 2);
    let exs = [];
    let label = '';
    if (type === 'listen' || type === 'spell') {
      exs = A.shuffle(words).slice(0, 8).map(w => wordEx(w, type));
      label = type === 'listen' ? '听音选词' : '单词拼写';
    } else if (type === 'order') {
      exs = A.shuffle(sents).slice(0, 6).map(orderEx);
      label = '连词成句';
    } else if (type === 'pron') {
      if (!ASR.ok()) { UI.toast('当前浏览器不支持语音识别，建议用 Chrome / Edge 打开'); return; }
      exs = A.shuffle(sents).slice(0, 5).map(s => pronEx(s.en, s.zh));
      label = '跟读评分';
    }
    launch(exs, `${gName(grade)} · ${label}`, {
      replace: opts.replace,
      restart: () => startGradeDrill(grade, type, { replace: true }),
      meta: { kind: 'grade-drill', grade, drill: type }
    });
  }

  function startGradeRandom(grade, opts = {}) {
    const words = A.shuffle(BY_GRADE[grade] || []).slice(0, 6);
    const sents = A.shuffle(ALLS.filter(s => s.book.grade === grade && s.en.split(/\s+/).length >= 2)).slice(0, 4);
    const kinds = ['en2zh', 'listen', 'spell', 'zh2en', 'dict', 'listen'];
    const exs = words.map((w, i) => wordEx(w, kinds[i % kinds.length])).concat(sents.map(orderEx));
    launch(A.shuffle(exs), `${gName(grade)} · 随机闯关`, {
      replace: opts.replace,
      restart: () => startGradeRandom(grade, { replace: true }),
      meta: { kind: 'random', grade }
    });
  }

  // ---------- 会话页面 ----------
  function next() {
    if (!S) return;
    S.i++;
    if (S.i >= S.exs.length) finish();
    else A.render();
  }

  function leaveSession() {
    if (!S || S.finished) { A.back(); return; }
    UI.confirm({ title: '退出练习？', text: '当前答题进度不会保存，确定退出吗？', ok: '退出', danger: true })
      .then(ok => { if (ok) A.back(); });
  }

  function scheduleAutoPlay(ex) {
    if (ex.done) return;
    let text = null;
    if (ex.type === 'listen' || ex.type === 'spell' || ex.type === 'dict') text = ex.word.en;
    else if (ex.type === 'info' && A.state.settings.autoSpeak) text = ex.word.en;
    if (!text) return;
    setTimeout(() => {
      if (S && S.exs[S.i] === ex && !ex.done && A.current && A.current.name === 'session') TTS.speak(text);
    }, 240);
  }

  A.routes.session = () => {
    if (!S) { A.replace({ name: 'home' }); return; }
    if (S.i >= S.exs.length) { finish(); return; }
    A.UI.setTop(null);
    A.UI.setTab(null);
    const ex = S.exs[S.i];
    const pct = Math.round((S.i + 1) / S.exs.length * 100);
    const isLevel = S.meta.kind === 'level';
    const titleHTML = isLevel
      ? `<div class="sess-level">
          <span class="sl-m">${window.PageHelpers.mascot(S.combo >= 2 ? 'cheer' : 'happy', 34)}</span>
          <span class="sl-t">${esc(S.title)}</span>
          ${S.combo >= 2 ? `<span class="combo">连对 ${S.combo}</span>` : ''}
        </div>`
      : `<div class="sess-title">${esc(S.title)}${S.title.includes(tagOf(ex)) ? '' : ' · ' + esc(tagOf(ex))}</div>`;
    $('#view').innerHTML = `<div class="page no-tab session-page">
      <div class="qhead">
        <button class="close" id="quit" aria-label="退出练习">${icon('x', 'i-sm')}</button>
        <div class="pbar"><i style="width:${pct}%;background:var(--brand)"></i></div>
        <span class="cnt">${S.i + 1}/${S.exs.length}</span>
      </div>
      ${titleHTML}
      <div id="qbody"></div>
    </div>`;
    const body = $('#qbody');
    if (ex.type === 'info') renderInfo(body, ex);
    else if (ex.type === 'pron') renderPronQ(body, ex);
    else if (ex.type === 'order') renderOrder(body, ex);
    else if (ex.type === 'spell') renderSpell(body, ex);
    else if (ex.type === 'dict') renderDict(body, ex);
    else renderChoice(body, ex);
    $('#quit').onclick = leaveSession;
    scheduleAutoPlay(ex);
  };

  function bindNext() {
    const b = $('#nextQ');
    if (b) b.onclick = next;
  }

  function wordDetail(w) {
    return `<div class="info-ex">
      <div style="display:flex;align-items:center;gap:8px">
        <b style="font-size:16px">${esc(w.en)}</b>
        <span style="color:var(--ink-3);font-size:12px">${esc(w.ipa)}</span>
        ${UI.speakBtn(w.en, 'sm')}
      </div>
      <div class="z">${esc(w.pos)} ${esc(w.zh)}</div>
      <div style="margin-top:4px">${esc(w.exEn)}</div>
      <div class="z">${esc(w.exZh)}</div>
    </div>`;
  }

  function renderInfo(body, ex) {
    const w = ex.word;
    body.innerHTML = `<div class="stem-card">
      <div class="tag">新词 · NEW WORD</div>
      <div class="stem">${esc(w.en)}</div>
      <div class="ipa">${esc(w.ipa)}</div>
      <div style="font-size:20px;font-weight:700;color:var(--brand-deep);margin-top:8px">${esc(w.zh)}</div>
      <div style="font-size:12px;color:var(--ink-3);margin-top:2px">${esc(w.pos)}</div>
      <div class="speak-actions">
        <button class="speak-btn" data-say="${esc(w.en)}">${icon('volume')}</button>
        <button class="speak-btn" data-say="${esc(w.en)}" data-slow="1">${icon('headphones')}</button>
        <button class="speak-btn" data-say="${esc(w.en)}" data-spell="1">${icon('keyboard')}</button>
      </div>
      <div class="info-ex">${esc(w.exEn)}<div class="z">${esc(w.exZh)}</div></div>
      <button class="btn green block" id="nextQ">记住了，去练习</button>
    </div>`;
    bindNext();
  }

  function renderChoice(body, ex) {
    const done = ex.done;
    let stem = '';
    if (ex.type === 'listen') {
      stem = `<div class="tag">听音选词 · LISTENING</div>
        <button class="speak-btn" data-say="${esc(ex.word.en)}" style="width:76px;height:76px;margin:18px auto 10px">${icon('volume')}</button>
        <div class="tip">点击喇叭可以重听，选择你听到的单词</div>`;
    } else if (ex.mode === 'zh2en') {
      stem = `<div class="tag">中译英 · TRANSLATE</div>
        <div class="stem zh">${esc(ex.word.zh)}</div>
        <div class="tip">${esc(ex.word.pos)} · 选择对应的英文单词</div>`;
    } else {
      stem = `<div class="tag">词义理解 · MEANING</div>
        <div class="stem">${esc(ex.word.en)}</div>
        <div class="ipa">${esc(ex.word.ipa)}</div>
        <button class="speak-btn" data-say="${esc(ex.word.en)}" style="margin:12px auto 0">${icon('volume')}</button>`;
    }
    const opts = ex.opts.map((o, i) => {
      let cls = '';
      if (done) {
        if (o === ex.answer) cls = 'right';
        else if (o === ex.user) cls = 'wrong';
      } else if (ex.tried === o) {
        cls = 'tried';
      }
      const dis = done || ex.tried === o;
      return `<button class="opt ${cls}" data-i="${i}" ${dis ? 'disabled' : ''}>
        <span class="k">${'ABC'[i]}</span><span>${esc(o)}</span></button>`;
    }).join('');
    let fb = '<div class="hint-line">选择一个答案</div>';
    if (done) {
      fb = `<div class="feedback ${ex.ok ? 'ok' : 'bad'}">${icon(ex.ok ? 'check' : 'x', 'i-sm')}
        ${ex.ok ? '答对啦！' : `正确答案：${esc(ex.answer)}`}</div>
        ${!ex.ok ? wordDetail(ex.word) : ''}
        <div class="fabbar"><button class="btn green block" id="nextQ">继续 ${icon('arrow', 'i-sm')}</button></div>`;
    } else if (ex.tried) {
      fb = `<div class="feedback retry">${icon('refresh', 'i-sm')} 差一点，再试一次！</div>`;
    }
    body.innerHTML = `<div class="stem-card">${stem}</div>
      <div class="card" style="margin-top:12px"><div class="opt-list">${opts}</div>${fb}</div>`;
    $$('.opt', body).forEach(b => b.onclick = () => {
      if (ex.done) return;
      const i = +b.dataset.i;
      const val = ex.opts[i];
      const ok = val === ex.answer;
      if (!ok && S.meta.retry && !ex.tried) {
        ex.tried = val;
        ex.user = val;
        noteAnswer(false);
        A.render();
        return;
      }
      ex.user = val;
      ex.ok = ok;
      ex.done = true;
      if (ok) S.correct++;
      noteAnswer(ok);
      if (ex.wordKey) recordWord(ex, ok);
      A.render();
    });
    bindNext();
  }

  function renderSpell(body, ex) {
    const userStr = ex.filled.map(i => ex.bank[i].ch).join('');
    const slots = ex.chars.map((ch, i) => {
      const bi = ex.filled[i];
      const val = bi != null ? ex.bank[bi].ch : '';
      let cls = bi != null ? 'filled' : '';
      if (ex.done) cls = (userStr[i] || '').toLowerCase() === ch ? 'ok' : 'err';
      return `<button class="slot ${cls}" data-slot="${i}" ${ex.done ? 'disabled' : ''}>${esc(val)}</button>`;
    }).join('');
    const bank = ex.bank.map((b, i) => {
      const used = ex.filled.includes(i);
      return `<button data-bank="${i}" class="${used ? 'used' : ''}" ${ex.done || used ? 'disabled' : ''}>${esc(b.ch)}</button>`;
    }).join('');
    let fb = `<div class="hint-line">看中文拼出英文 · 点空格可撤回
      ${!ex.done ? `<button id="spellClear" style="border:none;background:none;color:var(--brand-deep);font-weight:700;font-size:11.5px;cursor:pointer">清空</button>` : ''}</div>`;
    if (ex.done) {
      fb = `<div class="feedback ${ex.ok ? 'ok' : 'bad'}">${icon(ex.ok ? 'check' : 'x', 'i-sm')}
        ${ex.ok ? '拼对啦！' : `正确拼写：${esc(ex.answer)}`}</div>
        <div class="fabbar"><button class="btn green block" id="nextQ">继续 ${icon('arrow', 'i-sm')}</button></div>`;
    } else if (ex.tried) {
      fb = `<div class="feedback retry">${icon('refresh', 'i-sm')} 差一点，再拼一次！</div>`;
    }
    body.innerHTML = `<div class="stem-card">
      <div class="tag">单词拼写 · SPELLING</div>
      <div class="stem zh">${esc(ex.word.zh)}</div>
      <div class="tip">${esc(ex.word.pos)} · ${ex.chars.length} 个字母</div>
      <button class="speak-btn" data-say="${esc(ex.word.en)}" style="margin:14px auto 0">${icon('volume')}</button>
      <div class="letters">${slots}</div>
      <div class="bank">${bank}</div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="btn-row" style="margin-top:0">
        <button class="btn ghost" id="spellHint" ${ex.done ? 'disabled' : ''}>提示首字母</button>
        <button class="btn green" id="spellCheck" ${ex.done || ex.filled.length < ex.chars.length ? 'disabled' : ''}>检查</button>
      </div>
      ${fb}
    </div>`;
    const clear = $('#spellClear');
    if (clear) clear.onclick = () => { ex.filled = []; A.render(); };
    $$('[data-bank]', body).forEach(b => b.onclick = () => {
      if (ex.done) return;
      if (ex.filled.length >= ex.chars.length) { UI.toast('字母已经填满，点空格可撤回'); return; }
      ex.filled.push(+b.dataset.bank);
      A.render();
    });
    $$('[data-slot]', body).forEach(b => b.onclick = () => {
      if (ex.done) return;
      const i = +b.dataset.slot;
      if (i < ex.filled.length) { ex.filled.splice(i, 1); A.render(); }
    });
    $('#spellHint').onclick = () => {
      if (ex.done || ex.filled.length >= ex.chars.length) return;
      const need = ex.chars[ex.filled.length];
      const idx = ex.bank.findIndex((b, i) => b.ch === need && !ex.filled.includes(i));
      if (idx < 0) { UI.toast('这个字母已经在上面啦'); return; }
      ex.filled.push(idx);
      ex.hinted = true;
      A.render();
    };
    $('#spellCheck').onclick = () => {
      if (ex.done || ex.filled.length < ex.chars.length) return;
      const user = ex.filled.map(i => ex.bank[i].ch).join('');
      const ok = user.toLowerCase() === ex.chars.join('');
      if (!ok && S.meta.retry && !ex.tried) {
        ex.tried = true;
        ex.user = user;
        ex.filled = [];
        noteAnswer(false);
        UI.toast('差一点，再拼一次');
        A.render();
        return;
      }
      ex.user = user;
      ex.ok = ok;
      ex.done = true;
      if (ok) S.correct++;
      noteAnswer(ok);
      recordWord(ex, ok);
      A.render();
    };
    bindNext();
  }

  function renderDict(body, ex) {
    let fb = '<div class="hint-line">听发音，输入完整英文单词</div>';
    if (ex.done) {
      fb = `<div class="feedback ${ex.ok ? 'ok' : 'bad'}">${icon(ex.ok ? 'check' : 'x', 'i-sm')}
        ${ex.ok ? '听写正确！' : `正确答案：${esc(ex.answer)}`}</div>
        ${!ex.ok ? wordDetail(ex.word) : ''}
        <div class="fabbar"><button class="btn green block" id="nextQ">继续 ${icon('arrow', 'i-sm')}</button></div>`;
    } else if (ex.tried) {
      fb = `<div class="feedback retry">${icon('refresh', 'i-sm')} 再听一遍，重新拼一次！</div>`;
    }
    body.innerHTML = `<div class="stem-card">
      <div class="tag">听写单词 · DICTATION</div>
      <div class="stem zh">${esc(ex.word.zh)}</div>
      <div class="tip">${esc(ex.word.pos)}</div>
      <button class="speak-btn" data-say="${esc(ex.word.en)}" style="margin:16px auto 0;width:56px;height:56px">${icon('volume')}</button>
    </div>
    <div class="card" style="margin-top:12px">
      <input class="dict-input" id="dictInput" placeholder="在这里输入英文" autocomplete="off"
        autocapitalize="none" spellcheck="false" value="${esc(ex.user || '')}" ${ex.done ? 'disabled' : ''}>
      ${ex.done ? '' : `<button class="btn green block" id="dictCheck" style="margin-top:14px" ${ex.user && ex.user.trim() ? '' : 'disabled'}>检查</button>`}
      ${fb}
    </div>`;
    const inp = $('#dictInput');
    if (inp && !ex.done) {
      if (ex.tried) setTimeout(() => inp.focus(), 40);
      inp.addEventListener('input', () => {
        ex.user = inp.value;
        const b = $('#dictCheck');
        if (b) b.disabled = !inp.value.trim();
      });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkDict(ex); });
      $('#dictCheck').onclick = () => checkDict(ex);
    }
    bindNext();
  }

  function checkDict(ex) {
    if (ex.done) return;
    const val = (ex.user || '').trim();
    if (!val) return;
    const ok = A.norm(val) === A.norm(ex.answer);
    if (!ok && S.meta.retry && !ex.tried) {
      ex.tried = true;
      ex.user = val;
      noteAnswer(false);
      A.render();
      return;
    }
    ex.done = true;
    ex.ok = ok;
    if (ok) S.correct++;
    noteAnswer(ok);
    recordWord(ex, ok);
    A.render();
  }

  function renderOrder(body, ex) {
    const picked = ex.picked.map(i => ex.pool[i]);
    const used = new Set(ex.picked);
    const builder = ex.picked.length
      ? ex.picked.map((pi, pos) => `<button class="chip in-builder" data-unpick="${pos}" ${ex.done ? 'disabled' : ''}>${esc(ex.pool[pi])}</button>`).join('')
      : '<span style="font-size:12px;color:var(--ink-3);padding:6px">按顺序点击下方单词</span>';
    const pool = ex.pool.map((t, i) => used.has(i) ? '' :
      `<button class="chip" data-pick="${i}" ${ex.done ? 'disabled' : ''}>${esc(t)}</button>`).join('');
    let fb = '<div class="hint-line">连词成句，注意语序</div>';
    if (ex.done) {
      fb = `<div class="feedback ${ex.ok ? 'ok' : 'bad'}">${icon(ex.ok ? 'check' : 'x', 'i-sm')}
        ${ex.ok ? '句子排对啦！' : '正确的句子是：'}
        ${!ex.ok ? `<div class="info-ex">${esc(ex.answer)}<div class="z">${esc(ex.sentence.zh)}</div>
          <div style="margin-top:6px">${UI.speakBtn(ex.answer, 'sm')}</div></div>` : ''}
        <div class="fabbar"><button class="btn green block" id="nextQ">继续 ${icon('arrow', 'i-sm')}</button></div>`;
    } else if (ex.tried) {
      fb = `<div class="feedback retry">${icon('refresh', 'i-sm')} 语序还差一点，再排一次！</div>`;
    }
    body.innerHTML = `<div class="stem-card">
      <div class="tag">连词成句 · SENTENCE</div>
      <div class="stem zh" style="font-size:20px">${esc(ex.sentence.zh)}</div>
      <div class="tip">把下面的单词排成正确的句子</div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="builder">${builder}</div>
      <div class="words-pool">${pool}</div>
      ${ex.done ? '' : `<div class="btn-row"><button class="btn ghost" id="orderClear">清空</button>
        <button class="btn green" id="orderCheck" ${ex.picked.length === ex.tokens.length ? '' : 'disabled'}>检查</button></div>`}
      ${fb}
    </div>`;
    $$('[data-pick]', body).forEach(b => b.onclick = () => {
      if (ex.done) return;
      ex.picked.push(+b.dataset.pick);
      A.render();
    });
    $$('[data-unpick]', body).forEach(b => b.onclick = () => {
      if (ex.done) return;
      ex.picked.splice(+b.dataset.unpick, 1);
      A.render();
    });
    const clr = $('#orderClear');
    if (clr) clr.onclick = () => { ex.picked = []; A.render(); };
    const chk = $('#orderCheck');
    if (chk) chk.onclick = () => {
      if (ex.done || ex.picked.length !== ex.tokens.length) return;
      const user = ex.picked.map(i => ex.pool[i]).join(' ');
      const ok = A.norm(user) === A.norm(ex.answer);
      if (!ok && S.meta.retry && !ex.tried) {
        ex.tried = true;
        ex.user = user;
        ex.picked = [];
        noteAnswer(false);
        UI.toast('语序还差一点，再排一次');
        A.render();
        return;
      }
      ex.user = user;
      ex.ok = ok;
      ex.done = true;
      if (ok) S.correct++;
      noteAnswer(ok);
      if (ok) TTS.speak(ex.answer);
      A.render();
    };
    bindNext();
  }

  function ring110(pct, color) {
    const r = 45, c = 2 * Math.PI * r;
    return `<svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="#F3EDE0" stroke-width="9"/>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="${color || 'var(--brand)'}" stroke-width="9" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.max(0, Math.min(100, pct)) / 100)}"/>
    </svg>`;
  }

  function pronResultHTML(p, text) {
    const score = p.score == null ? 0 : p.score;
    const color = score >= 80 ? 'var(--leaf)' : score >= 60 ? 'var(--brand)' : 'var(--rose)';
    const diff = A.diffWords(text, p.said || '');
    const msg = score >= 80 ? '发音很棒！' : score >= 60 ? '不错，每个单词再读清楚一点' : '再听一遍原音，放慢速度试试';
    return `<div class="score-ring">${ring110(score, color)}<div class="num">${score}<small>分</small></div></div>
      <div class="word-diff">${diff.map(d => `<span class="${d.hit ? 'hit' : 'miss'}">${esc(d.w)}</span>`).join('')}</div>
      <div class="pron-transcript">识别结果：<b>${esc(p.said || '（未识别到内容）')}</b></div>
      <div class="feedback ${score >= 60 ? 'ok' : 'bad'}">${icon(score >= 60 ? 'check' : 'refresh', 'i-sm')} ${msg}</div>`;
  }

  function renderPronQ(body, ex) {
    const can = ASR.ok();
    const p = ex.preview || (ex.done ? { score: ex.score, said: ex.said } : null);
    let inner = '';
    if (p) inner = pronResultHTML(p, ex.text);
    else if (can) inner = `<button class="mic" id="mic">${icon('mic', 'i-lg')}</button>
      <div class="pron-hint" id="pronHint">点击麦克风，读出上面的内容</div>`;
    else inner = `<div class="roleplay" style="margin-top:16px;text-align:left">${icon('mic')}
      <div>当前浏览器不支持语音识别，建议使用 Chrome / Edge；也可以先听原音跟读。</div></div>
      <button class="btn ghost block" id="pronSkip" style="margin-top:14px">跳过本题</button>`;
    let actions = '';
    if (p && !ex.done) {
      actions = `<div class="btn-row"><button class="btn ghost" id="pronRetry">再读一次</button>
        <button class="btn green" id="pronNext">继续</button></div>`;
    } else if (ex.done) {
      actions = `<div class="feedback ${ex.ok ? 'ok' : 'bad'}" style="margin-top:12px">${icon(ex.ok ? 'check' : 'x', 'i-sm')}
        ${ex.ok ? '本题完成' : '本题还需要多练几遍'}</div>
        <div class="fabbar"><button class="btn green block" id="nextQ">继续 ${icon('arrow', 'i-sm')}</button></div>`;
    }
    body.innerHTML = `<div class="stem-card pron-card">
      <div class="tag">跟读评分 · SPEAK</div>
      <div class="stem" style="font-size:24px">${esc(ex.text)}</div>
      ${ex.zh ? `<div class="zh" style="font-size:13px;color:var(--ink-3);margin-top:6px">${esc(ex.zh)}</div>` : ''}
      <div class="speak-actions">
        <button class="speak-btn" data-say="${esc(ex.text)}">${icon('volume')}</button>
        <button class="speak-btn" data-say="${esc(ex.text)}" data-slow="1">${icon('headphones')}</button>
      </div>
      ${inner}
    </div>${actions}
    <div class="hint-line">评分来自浏览器语音识别，仅供练习参考</div>`;
    const mic = $('#mic');
    if (mic) mic.onclick = () => startSessionMic(ex);
    const skip = $('#pronSkip');
    if (skip) skip.onclick = () => {
      ex.preview = { score: 0, said: '' };
      finalizePron(ex);
    };
    const retry = $('#pronRetry');
    if (retry) retry.onclick = () => { ex.preview = null; A.render(); };
    const pn = $('#pronNext');
    if (pn) pn.onclick = () => finalizePron(ex);
    bindNext();
  }

  function startSessionMic(ex) {
    if (ex.recording) return;
    if (!ASR.ok()) { UI.toast('当前浏览器不支持语音识别'); return; }
    ex.recording = true;
    const mic = $('#mic');
    if (mic) mic.classList.add('rec');
    const hint = $('#pronHint');
    if (hint) hint.textContent = '正在听，请朗读…';
    TTS.stop();
    ASR.start(
      (alts) => {
        let best = { s: -1, t: alts[0] || '' };
        alts.forEach(t => {
          const s = A.similarity(ex.text, t);
          if (s > best.s) best = { s, t };
        });
        ex.preview = { score: Math.max(0, Math.round(best.s * 100)), said: best.t };
      },
      (got) => {
        ex.recording = false;
        const m = $('#mic');
        if (m) m.classList.remove('rec');
        const alive = A.current && A.current.name === 'session' && S && S.exs[S.i] === ex;
        if (!alive) return;
        if (got && ex.preview) A.render();
        else if (hint) hint.textContent = '没有听到声音，请再试一次';
      },
      (err) => {
        ex.recording = false;
        const m = $('#mic');
        if (m) m.classList.remove('rec');
        UI.toast(err === 'denied' ? '麦克风权限被拒绝，请在浏览器设置中允许' : '语音识别失败，请再试一次');
      }
    );
  }

  function finalizePron(ex) {
    if (!ex.preview || ex.done) return;
    ex.score = ex.preview.score;
    ex.said = ex.preview.said;
    const ok = ex.score >= 60;
    if (!ok && S.meta.retry && !ex.tried) {
      ex.tried = true;
      ex.preview = null;
      noteAnswer(false);
      UI.toast('再读一次，小梨在听');
      A.render();
      return;
    }
    ex.ok = ok;
    ex.done = true;
    if (ok) S.correct++;
    noteAnswer(ok);
    A.render();
  }

  // ---------- 结果 ----------
  function describeWrong(ex) {
    if (ex.type === 'mcq') {
      return {
        tag: tagOf(ex),
        q: ex.mode === 'en2zh' ? ex.word.en : ex.word.zh,
        a: ex.answer,
        sub: ex.word.ipa,
        word: ex.word
      };
    }
    if (ex.type === 'listen' || ex.type === 'spell' || ex.type === 'dict') {
      return { tag: tagOf(ex), q: ex.word.zh, a: ex.word.en, sub: ex.word.ipa, word: ex.word };
    }
    if (ex.type === 'order') {
      return { tag: '连词成句', q: ex.sentence.zh, a: ex.answer, sub: '', word: null };
    }
    if (ex.type === 'pron') {
      return { tag: '跟读评分', q: ex.text, a: `得分 ${ex.score || 0} 分`, sub: '再听原音，放慢速度跟读', word: null };
    }
    return { tag: tagOf(ex), q: '', a: '', sub: '', word: null };
  }

  function finish() {
    if (!S || S.finished) return;
    S.finished = true;
    const graded = S.exs.filter(e => e.type !== 'info');
    const total = graded.length;
    const correct = graded.filter(e => e.ok).length;
    const pct = total ? Math.round(correct / total * 100) : 100;
    const stars = pct === 100 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;
    const secs = Math.max(1, Math.round((Date.now() - S.startAt) / 1000));
    const mins = Math.max(1, Math.round(secs / 60));

    A.state.quizzes = (A.state.quizzes || 0) + 1;
    A.state.stars = (A.state.stars || 0) + stars;
    A.touchToday({ quizzes: (A.today().quizzes || 0) + 1, minutes: (A.today().minutes || 0) + mins });
    let bestNew = false;
    if (S.meta.kind === 'test' && S.meta.modKey) {
      const prev = A.state.best[S.meta.modKey] || 0;
      if (stars > prev) { A.state.best[S.meta.modKey] = stars; bestNew = true; }
    }

    const isLevel = S.meta.kind === 'level';
    A.state.levels = A.state.levels || {};
    A.state.sprites = A.state.sprites || {};
    let cleared = false, spriteNew = false, next = null;
    if (isLevel) {
      const key = S.meta.modKey;
      if (stars > (A.state.levels[key] || 0)) A.state.levels[key] = stars;
      cleared = (A.state.levels[key] || 0) > 0;
      if (cleared && !A.state.sprites[key]) { A.state.sprites[key] = 1; spriteNew = true; }
      const b = A.BOOKS.find(x => A.bookKey(x) === S.meta.book);
      if (b && S.meta.mi + 1 < b.modules.length) next = { book: S.meta.book, mi: S.meta.mi + 1 };
    }
    A.save();

    const wrong = graded.filter(e => !e.ok).map(describeWrong);
    const result = {
      title: S.title, pct, correct, total, stars, secs, wrong, bestNew,
      kind: S.meta.kind || '', restart: S.restart,
      level: isLevel, cleared, spriteNew, next, maxCombo: S.maxCombo || 0,
      spriteKey: isLevel ? S.meta.modKey : null, book: S.meta.book, mi: S.meta.mi
    };
    S = null;
    A.replace({ name: 'result', result });
  }

  function confettiHTML() {
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#F43F5E', '#8B5CF6'];
    let out = '';
    for (let i = 0; i < 18; i++) {
      out += `<i style="left:${(i * 5.5 + 3) % 98}%;background:${colors[i % colors.length]};animation-delay:${(i % 9) * 0.08}s"></i>`;
    }
    return `<div class="confetti" aria-hidden="true">${out}</div>`;
  }

  A.routes.result = (r) => {
    const d = r.result;
    if (!d) { A.replace({ name: 'home' }); return; }
    A.UI.setTop({ title: d.level ? (d.cleared ? '过关啦' : '闯关结果') : '练习结果', sub: d.title });
    const color = d.pct >= 80 ? 'var(--leaf)' : d.pct >= 50 ? 'var(--brand)' : 'var(--rose)';
    const title = d.level
      ? (d.cleared ? (d.stars === 3 ? '完美通关！' : '过关啦！') : '差一点点，再来一次')
      : (d.pct === 100 ? '全部答对，太棒了！' : d.pct >= 70 ? '完成得不错！' : d.pct >= 40 ? '继续加油！' : '再练一练会更好');
    const secText = d.secs >= 60 ? `${Math.floor(d.secs / 60)}:${String(d.secs % 60).padStart(2, '0')}` : `${d.secs} 秒`;
    const sub = d.level
      ? (d.cleared ? (d.next ? '下一关已经解锁' : '这本书的关卡全部通关啦') : '再得一颗星就能过关')
      : (d.bestNew ? '刷新了本模块最佳成绩' : d.kind === 'test' ? '多练几次，向三星发起挑战' : '每天进步一点点');
    const lb = d.spriteKey ? A.BOOKS.find(x => A.bookKey(x) === d.book) : null;
    const spriteHTML = d.spriteNew && lb ? `<div class="sp-reward">
        <div class="sp-reward-art">${window.PageHelpers.spriteOf(lb, d.mi, 76)}</div>
        <div class="sp-reward-t"><b>新伙伴加入！</b><span>${esc(window.PageHelpers.spriteName(lb, d.mi))} 已收入图鉴</span></div>
      </div>` : '';
    const storyBook = d.level && window.Story ? A.BOOKS.find(x => A.bookKey(x) === d.book) : null;
    const sayLine = storyBook ? window.Story.resultLine(storyBook, d.mi, d.cleared) : null;
    const finaleReady = storyBook && d.cleared && !d.next && window.Story.finaleReady(storyBook);
    const sayHTML = sayLine ? `<div class="result-say" id="resultSay">
        <div class="rs-art">${window.PageHelpers.mascot(d.cleared ? 'cheer' : 'oops', 44)}</div>
        <div class="rs-b"><span>小梨</span><p>${esc(sayLine.t)}</p></div>
        <button class="sb-say" data-act="say-line" aria-label="听小梨说">${icon('volume', 'i-sm')}</button>
      </div>` : '';
    const wrongHTML = d.wrong.length
      ? `<div class="wrong-list"><h3>需要再练一练（${d.wrong.length}）</h3>
          ${d.wrong.map(x => `<div class="wrong-item">
            <div class="row"><span class="badge amber">${esc(x.tag)}</span>
              ${x.word ? `<button class="speak-btn sm" data-say="${esc(x.word.en)}">${icon('volume', 'i-sm')}</button>` : ''}
            </div>
            <div class="a">${esc(x.a)}</div>
            <div class="q">${esc(x.q)}</div>
            ${x.sub ? `<div class="z">${esc(x.sub)}</div>` : ''}
          </div>`).join('')}</div>`
      : `<div class="feedback ok" style="margin-top:16px">${icon('check', 'i-sm')} 没有错题，继续保持！</div>`;
    $('#view').innerHTML = `<div class="page no-tab">
      <div class="result">
        ${d.level && d.cleared ? confettiHTML() : ''}
        <div class="ring">${window.PageHelpers.ringSvg(d.pct, color)}<div class="num"><b>${d.pct}</b><span>分</span></div></div>
        <div class="starline">${'★'.repeat(d.stars)}${'☆'.repeat(3 - d.stars)}</div>
        <h2>${title}</h2>
        <p>${esc(d.title)} · ${sub}</p>
        ${sayHTML}
        ${spriteHTML}
        <div class="stat3">
          <div><b>${d.correct}/${d.total}</b><span>答对题数</span></div>
          <div><b>${secText}</b><span>用时</span></div>
          <div><b>${d.level ? d.maxCombo : '+' + d.stars}</b><span>${d.level ? '最高连对' : '获得星星'}</span></div>
        </div>
        <div class="btn-row">
          ${d.level && d.cleared && d.next ? '<button class="btn green" id="nextLv">下一关</button>' : ''}
          ${d.restart && (!d.level || !d.cleared || !d.next) ? `<button class="btn ${d.level ? 'green' : 'ghost'}" id="again">${d.level ? (d.cleared ? '再玩一次' : '再试一次') : '再练一次'}</button>` : ''}
          <button class="btn ${d.level ? 'ghost' : 'green'}" id="done">${d.level ? '回地图' : '返回'}</button>
        </div>
        ${wrongHTML}
        <p class="hint-line">${d.level ? '闯关进度仅保存在本机浏览器' : '练习结果仅保存在本机浏览器'}</p>
      </div>
    </div>`;
    const again = $('#again');
    if (again) again.onclick = () => { if (d.restart) d.restart(); };
    const nextLv = $('#nextLv');
    if (nextLv) nextLv.onclick = () => {
      const nb = A.BOOKS.find(x => A.bookKey(x) === d.next.book);
      if (nb) window.Session.startLevel(nb, d.next.mi, { replace: true });
    };
    $('#done').onclick = () => d.level ? A.reset({ name: 'home' }) : A.back();
    const sayBtn = $('#resultSay .sb-say');
    if (sayBtn) sayBtn.onclick = () => window.Story.speakLine(sayLine);
    if (sayLine && !finaleReady) {
      setTimeout(() => {
        if (A.current && A.current.name === 'result') window.Story.speakLine(sayLine);
      }, 520);
    }
    if (finaleReady) {
      setTimeout(() => {
        if (A.current && A.current.name === 'result') window.Story.playFinale(storyBook);
      }, 850);
    }
  };

  // ---------- 练习中心 ----------
  A.routes.practice = () => {
    const g = A.state.pg || 1;
    const books = A.BOOKS.filter(b => b.grade === g);
    const due = A.reviewCount();
    const weak = A.weakWords(3);
    const gWords = (BY_GRADE[g] || []).length;
    const gSents = ALLS.filter(s => s.book.grade === g).length;
    $('#view').innerHTML = `<div class="page">
      <div class="hero" style="background:linear-gradient(135deg,#34D399,#0D9488 55%,#0F766E);box-shadow:0 12px 32px rgba(13,148,136,.25)">
        <div class="brandrow">
          <div class="pear" style="color:#0D9488">${icon('target', 'i-lg')}</div>
          <div><b style="font-size:19px">练习中心</b><small>专项练习 · 随机闯关 · 错词强化</small></div>
        </div>
        <div class="goal">
          <div class="row"><span>今天有</span><b>${due}</b><span>个单词待复习</span></div>
          <button class="btn block" id="goReview" style="margin-top:12px;background:#fff;color:#0F766E;box-shadow:none;padding:10px">
            ${due ? '去复习这些单词' : '暂无待复习单词'}
          </button>
        </div>
      </div>

      <div class="card tap" id="randomCard" style="margin-top:12px;display:flex;align-items:center;gap:12px;background:linear-gradient(120deg,#fff,#ECFDF5);border-color:#A7F3D0">
        <div style="width:48px;height:48px;border-radius:15px;background:var(--leaf-soft);color:#047857;display:grid;place-items:center">${icon('quiz', 'i-lg')}</div>
        <div style="flex:1;min-width:0"><b style="font-size:15px">随机闯关</b>
          <div style="font-size:12px;color:var(--ink-3);margin-top:2px">${gName(g)} · 10 道混合题 · 单词 + 句子</div></div>
        <span class="badge green">开始</span>
      </div>

      <div class="sec"><span class="bar"></span>专项练习<span class="more">${gName(g)} · ${gWords} 词 / ${gSents} 句</span></div>
      <div class="qgrid">
        <button class="qbtn" data-drill="listen"><span class="ico" style="background:var(--sky-soft);color:#1D4ED8">${icon('headphones')}</span>听音选词</button>
        <button class="qbtn" data-drill="spell"><span class="ico" style="background:var(--violet-soft);color:#6D28D9">${icon('keyboard')}</span>单词拼写</button>
        <button class="qbtn" data-drill="order"><span class="ico" style="background:var(--brand-soft);color:var(--brand-deep)">${icon('layers')}</span>连词成句</button>
        <button class="qbtn" data-drill="pron"><span class="ico" style="background:var(--leaf-soft);color:#047857">${icon('mic')}</span>跟读评分</button>
      </div>

      <div class="sec"><span class="bar"></span>选择年级<span class="more">已选 ${gName(g)}</span></div>
      <div class="seg" id="pgSeg">
        ${[1, 2, 3, 4, 5, 6].map(x => `<button class="${x === g ? 'on' : ''}" data-g="${x}">${GRADE_CN[x - 1]}</button>`).join('')}
      </div>

      <div class="sec"><span class="bar"></span>教材模块<span class="more">点击进入模块</span></div>
      ${books.map(b => `<div class="card">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span class="badge" style="background:${b.color}22;color:${b.color}">${b.level}</span>
          <b style="font-size:14.5px">${esc(b.title)}</b>
          <span style="margin-left:auto;font-size:11.5px;color:var(--ink-3)">${b.modules.length} 个模块</span>
        </div>
        ${b.modules.map((m, mi) => {
          const st = A.moduleStat(b, mi);
          return `<div class="mod tap" data-book="${A.bookKey(b)}" data-mi="${mi}" style="padding:10px 0;border-top:1px solid var(--line-2);margin-top:6px">
            <div class="num" style="width:34px;height:34px;font-size:11px;background:${b.color}">M${mi + 1}</div>
            <div class="t"><b style="font-size:13.5px">${esc(m.name)}</b><span>${esc(m.zh)} · ${st.total} 词 · ${st.pct}%</span></div>
            <span class="arrow">${icon('chevron', 'i-sm')}</span>
          </div>`;
        }).join('')}
      </div>`).join('')}

      ${weak.length ? `<div class="sec"><span class="bar"></span>错词本<span class="more" id="weakAll">强化练习 ${icon('chevron', 'i-sm')}</span></div>
      <div class="card" style="padding:4px 14px">
        ${weak.map(w => `<div class="word-row" style="padding:9px 0" data-word="${w.key}">
          <button class="speak-btn sm" data-say="${esc(w.en)}">${icon('volume', 'i-sm')}</button>
          <div class="w"><div class="en">${esc(w.en)} <span class="ipa">${esc(w.ipa)}</span></div><div class="zh">${esc(w.zh)}</div></div>
          <span class="learn-state">待加强</span>
        </div>`).join('')}
      </div>` : ''}
      <p class="foot-note">练习会记录到学习报告，错题会自动加入复习计划</p>
    </div>`;

    $('#goReview').onclick = () => { if (A.reviewCount()) startReview(); else UI.toast('暂无待复习单词'); };
    $('#randomCard').onclick = () => startGradeRandom(g);
    $$('[data-drill]').forEach(b => b.onclick = () => startGradeDrill(g, b.dataset.drill));
    $$('#pgSeg button').forEach(b => b.onclick = () => {
      A.state.pg = +b.dataset.g;
      A.save();
      A.render();
    });
    $$('.mod').forEach(el => el.onclick = () => {
      const b = A.BOOKS.find(x => A.bookKey(x) === el.dataset.book);
      A.go({ name: 'module', book: b, mi: +el.dataset.mi });
    });
    $$('[data-word]').forEach(el => el.onclick = () => window.PageHelpers.openWordByKey(el.dataset.word));
    const wa = $('#weakAll');
    if (wa) wa.onclick = () => startWeak();
  };

  // ---------- 独立跟读页 ----------
  A.routes.pron = (r) => {
    A.UI.setTop({ title: '跟读评分', sub: r.wordKey ? '单词跟读' : '句子跟读' });
    const p = r.p || null;
    const can = ASR.ok();
    const word = r.wordKey ? A.getWord(r.wordKey) : null;
    let inner = '';
    if (p) inner = pronResultHTML(p, r.text);
    else if (can) inner = `<button class="mic" id="mic">${icon('mic', 'i-lg')}</button>
      <div class="pron-hint" id="pronHint">点击麦克风，读出上面的内容</div>`;
    else inner = `<div class="roleplay" style="margin-top:16px;text-align:left">${icon('mic')}
      <div>当前浏览器不支持语音识别，建议使用 Chrome / Edge；也可以先听原音跟读。</div></div>`;
    $('#view').innerHTML = `<div class="page no-tab">
      <div class="stem-card pron-card">
        <div class="tag">跟读评分 · SPEAK</div>
        <div class="stem" style="font-size:${String(r.text).length > 24 ? 21 : 26}px">${esc(r.text)}</div>
        ${r.zh ? `<div class="zh" style="font-size:13px;color:var(--ink-3);margin-top:6px">${esc(r.zh)}</div>` : ''}
        <div class="speak-actions">
          <button class="speak-btn" data-say="${esc(r.text)}">${icon('volume')}</button>
          <button class="speak-btn" data-say="${esc(r.text)}" data-slow="1">${icon('headphones')}</button>
          <button class="speak-btn" data-say="${esc(r.text)}" data-spell="1">${icon('keyboard')}</button>
        </div>
        ${inner}
      </div>
      ${p ? `<div class="btn-row">
        <button class="btn ghost" id="retry">再读一次</button>
        ${r.wordKey ? `<button class="btn green" id="mark">${A.state.learned[r.wordKey] ? '再复习一次' : '标记已学'}</button>` : ''}
      </div>` : ''}
      <p class="hint-line">评分来自浏览器语音识别，仅供练习参考</p>
    </div>`;
    const mic = $('#mic');
    if (mic) mic.onclick = () => startStandaloneMic(r);
    const retry = $('#retry');
    if (retry) retry.onclick = () => { r.p = null; A.render(); };
    const mark = $('#mark');
    if (mark) mark.onclick = () => {
      const was = !!A.state.learned[r.wordKey];
      A.markWord(r.wordKey, true);
      if (!was) A.touchToday({ words: (A.today().words || 0) + 1 });
      A.save();
      UI.toast(was ? '复习进度已更新' : '已加入复习计划');
      A.render();
    };
    setTimeout(() => {
      if (A.state.settings.autoSpeak && A.current && A.current.name === 'pron') TTS.speak(r.text);
    }, 200);
  };

  function startStandaloneMic(r) {
    if (r._rec) return;
    if (!ASR.ok()) { UI.toast('当前浏览器不支持语音识别'); return; }
    r._rec = true;
    const mic = $('#mic');
    if (mic) mic.classList.add('rec');
    const hint = $('#pronHint');
    if (hint) hint.textContent = '正在听，请朗读…';
    TTS.stop();
    ASR.start(
      (alts) => {
        let best = { s: -1, t: alts[0] || '' };
        alts.forEach(t => {
          const s = A.similarity(r.text, t);
          if (s > best.s) best = { s, t };
        });
        r.p = { score: Math.max(0, Math.round(best.s * 100)), said: best.t };
      },
      (got) => {
        r._rec = false;
        const m = $('#mic');
        if (m) m.classList.remove('rec');
        if (A.current && A.current.name === 'pron') {
          if (got && r.p) A.render();
          else if (hint) hint.textContent = '没有听到声音，请再试一次';
        }
      },
      (err) => {
        r._rec = false;
        const m = $('#mic');
        if (m) m.classList.remove('rec');
        UI.toast(err === 'denied' ? '麦克风权限被拒绝，请在浏览器设置中允许' : '语音识别失败，请再试一次');
      }
    );
  }

  window.Session = {
    startDaily, startReview, startWeak, startLevel, startModule, startGradeDrill, startGradeRandom, launch
  };
})();
