/* ============ 我的 / 学习设置 / 学习报告 ============ */
(function () {
  'use strict';
  const A = window.App;
  const { $, $$, esc, icon, UI } = A;
  const H = window.PageHelpers;
  const GRADE_CN = H.GRADE_CN;
  const gradeName = H.gradeName;
  const gradeColor = H.gradeColor;

  function accuracy() {
    let right = 0, wrong = 0;
    Object.values(A.state.srs).forEach(s => { right += s.right || 0; wrong += s.wrong || 0; });
    const n = right + wrong;
    return n ? Math.round(right / n * 100) : null;
  }
  function levelOf(n) { return Math.max(1, Math.min(30, Math.floor(n / 30) + 1)); }

  function ringMini(pct, color) {
    const r = 45, c = 2 * Math.PI * r;
    return `<svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="#F3EDE0" stroke-width="9"/>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="${color || 'var(--brand)'}" stroke-width="9" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.max(0, Math.min(100, pct)) / 100)}"/>
    </svg>`;
  }

  function chartHTML(series) {
    const max = Math.max(10, ...series.map(d => d.v));
    const total = series.reduce((n, d) => n + d.v, 0);
    return `<div class="chart-wrap">
      <div class="chart">
        ${series.map(d => `<div class="col ${d.today ? 'today' : ''}">
          <b>${d.v || ''}</b>
          <i style="height:${Math.max(3, Math.round(d.v / max * 78))}px"></i>
          <span>${d.label}</span>
        </div>`).join('')}
      </div>
      ${total === 0 ? `<div class="chart-empty">${icon('chart', 'i-sm')} 暂无学习记录<small>完成一次练习后显示学习趋势</small></div>` : ''}
    </div>
    <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--ink-3);margin-top:10px">
      <span>近 7 天</span><span>共学习 <b style="color:var(--ink)">${total}</b> 词</span>
    </div>`;
  }

  function heatHTML() {
    const cells = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = A.todayStr(d);
      const v = (A.state.history[k] && A.state.history[k].words) || 0;
      const lv = v >= 10 ? 4 : v >= 7 ? 3 : v >= 4 ? 2 : v >= 1 ? 1 : 0;
      cells.push(`<i class="l${lv}${i === 0 ? ' today' : ''}" title="${k} · ${v} 词"></i>`);
    }
    return `<div class="heat">${cells.join('')}</div>
      <div class="heat-legend"><span>少</span><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><span>多</span></div>`;
  }

  function gradeRows() {
    return [1, 2, 3, 4, 5, 6].map(g => {
      const p = A.gradeStat(g);
      const color = gradeColor(g);
      return `<div class="grade-row" data-grade="${g}">
        <div class="gn" style="background:${color}">${GRADE_CN[g - 1]}</div>
        <div class="gt">
          <b>${gradeName(g)} <span>${p.learned} / ${p.total} 词</span></b>
          <div style="margin-top:6px">${UI.pbar(p.pct, color)}</div>
        </div>
        <span style="font-size:12px;font-weight:700;color:var(--leaf)">${p.pct}%</span>
      </div>`;
    }).join('');
  }

  function goGrade(scope) {
    $$('.grade-row', scope).forEach(el => el.onclick = () => A.go({ name: 'grade', grade: +el.dataset.grade }));
  }

  // ---------- 我的 ----------
  A.routes.me = () => {
    const s = A.state;
    const t = A.today();
    const series = A.weekSeries();
    const learned = A.totalLearnedCount();
    const total = A.totalWordsCount();
    const mastered = A.masteredCount();
    const due = A.reviewCount();
    const checked = A.checkedToday();
    const acc = accuracy();
    const name = s.settings.name || '小学员';
    $('#view').innerHTML = `<div class="page">
      <div class="profile">
        <div class="row">
          <div class="avatar" style="color:#B45309">${icon('leaf', 'i-lg')}</div>
          <div style="flex:1;min-width:0">
            <div class="name">${esc(name)}</div>
            <div class="desc">${learned ? `今天已学 ${t.words || 0} 词 · ${acc == null ? '开始第一次练习吧' : '练习正确率 ' + acc + '%'}` : '从今天开始，每天学一点英语'}</div>
          </div>
          <span class="badge amber">Lv.${levelOf(learned)}</span>
        </div>
        <div class="chips">
          <div><b>${A.streak()}</b><span>连续天数</span></div>
          <div><b>${learned}</b><span>已学单词</span></div>
          <div><b>${s.stars || 0}</b><span>获得星星</span></div>
        </div>
      </div>

      <div class="card setting" style="margin-top:12px">
        <div class="ic" style="background:var(--brand-soft);color:var(--brand-deep)">${icon('calendar')}</div>
        <div class="t">每日打卡<span>${checked ? '今天已打卡，明天继续保持' : '打卡可获得 1 颗星星'}</span></div>
        <button class="btn ${checked ? 'ghost' : 'green'}" id="checkin" style="padding:8px 14px;font-size:13px" ${checked ? 'disabled' : ''}>${checked ? '已打卡' : '打卡 +1★'}</button>
      </div>

      <div class="sec"><span class="bar"></span>学习数据</div>
      <div class="stats">
        <div class="card stat-card">
          <div class="top"><span style="font-size:12px;color:var(--ink-3);font-weight:600">已学单词</span>
            <div class="ic" style="background:var(--brand-soft);color:var(--brand-deep)">${icon('book', 'i-sm')}</div></div>
          <b>${learned}</b><span>共 ${total} 词 · ${total ? Math.round(learned / total * 100) : 0}%</span>
        </div>
        <div class="card stat-card">
          <div class="top"><span style="font-size:12px;color:var(--ink-3);font-weight:600">已掌握</span>
            <div class="ic" style="background:var(--leaf-soft);color:#047857">${icon('check', 'i-sm')}</div></div>
          <b>${mastered}</b><span>复习到第 5 层以上</span>
        </div>
        <div class="card stat-card">
          <div class="top"><span style="font-size:12px;color:var(--ink-3);font-weight:600">完成练习</span>
            <div class="ic" style="background:var(--violet-soft);color:#6D28D9">${icon('target', 'i-sm')}</div></div>
          <b>${s.quizzes || 0}</b><span>累计获得 ${s.stars || 0} 颗星</span>
        </div>
        <div class="card stat-card">
          <div class="top"><span style="font-size:12px;color:var(--ink-3);font-weight:600">待复习</span>
            <div class="ic" style="background:var(--sky-soft);color:#1D4ED8">${icon('refresh', 'i-sm')}</div></div>
          <b>${due}</b><span>艾宾浩斯复习计划</span>
        </div>
      </div>

      <div class="sec"><span class="bar"></span>本周学习<span class="more">近 7 天</span></div>
      <div class="card">${chartHTML(series)}</div>

      <div class="sec"><span class="bar"></span>年级进度<span class="more">点击进入</span></div>
      <div class="card" style="padding:4px 14px">${gradeRows()}</div>

      <div class="sec"><span class="bar"></span>学习足迹<span class="more">近 28 天</span></div>
      <div class="card">${heatHTML()}</div>

      <div class="sec"><span class="bar"></span>更多</div>
      <div class="card" style="padding:4px 14px">
        <div class="setting tap" data-go="report">
          <div class="ic" style="background:var(--sky-soft);color:#1D4ED8">${icon('chart', 'i-sm')}</div>
          <div class="t">学习报告<span>正确率、年级进度与学习建议</span></div>
          <span class="arrow">${icon('chevron', 'i-sm')}</span>
        </div>
        <div class="setting tap" data-go="settings" style="border-top:1px solid var(--line-2)">
          <div class="ic" style="background:var(--brand-soft);color:var(--brand-deep)">${icon('settings', 'i-sm')}</div>
          <div class="t">学习设置<span>口音、语速、每日目标</span></div>
          <span class="arrow">${icon('chevron', 'i-sm')}</span>
        </div>
        <div class="setting tap" data-go="phonics" style="border-top:1px solid var(--line-2)">
          <div class="ic" style="background:var(--leaf-soft);color:#047857">${icon('sparkle', 'i-sm')}</div>
          <div class="t">自然拼读<span>26 字母 · 字母组合 · 歌谣</span></div>
          <span class="arrow">${icon('chevron', 'i-sm')}</span>
        </div>
      </div>

      <p class="foot-note">雪梨英语 · 广州版小学英语学习工具<br>非商用学习项目 · 发音由浏览器语音合成提供</p>
    </div>`;

    $('#checkin').onclick = () => {
      if (A.checkedToday()) { UI.toast('今天已经打过卡啦'); return; }
      A.checkin();
      UI.toast('打卡成功，星星 +1');
      A.render();
    };
    $$('[data-go]').forEach(el => el.onclick = () => A.go({ name: el.dataset.go }));
    goGrade($('#view'));
  };

  // ---------- 设置 ----------
  A.routes.settings = () => {
    const st = A.state.settings;
    const rate = Number(st.rate) || 0.85;
    A.UI.setTop({ title: '学习设置', sub: '发音 · 学习目标 · 数据' });
    $('#view').innerHTML = `<div class="page no-tab">
      <div class="sec" style="margin-top:0"><span class="bar"></span>发音设置</div>
      <div class="card" style="padding:4px 14px">
        <div class="setting">
          <div class="ic" style="background:var(--sky-soft);color:#1D4ED8">${icon('volume', 'i-sm')}</div>
          <div class="t">发音口音<span>英式或美式</span></div>
          <select class="select" id="accent">
            <option value="uk" ${st.accent === 'uk' ? 'selected' : ''}>英式 UK</option>
            <option value="us" ${st.accent === 'us' ? 'selected' : ''}>美式 US</option>
          </select>
        </div>
        <div class="setting" style="border-top:1px solid var(--line-2)">
          <div class="ic" style="background:var(--brand-soft);color:var(--brand-deep)">${icon('clock', 'i-sm')}</div>
          <div class="t">朗读语速<span>单词发音速度</span></div>
          <input type="range" id="rate" min="0.6" max="1" step="0.05" value="${rate}">
          <b id="rateVal" style="font-size:12px;color:var(--ink-3);width:40px;text-align:right">${rate.toFixed(2)}x</b>
        </div>
        <div class="setting" style="border-top:1px solid var(--line-2)">
          <div class="ic" style="background:var(--leaf-soft);color:#047857">${icon('volume', 'i-sm')}</div>
          <div class="t">自动发音<span>进入单词页自动朗读</span></div>
          <button class="switch ${st.autoSpeak ? 'on' : ''}" id="autoSpeak" aria-label="自动发音"></button>
        </div>
        <div class="setting" style="border-top:1px solid var(--line-2)">
          <div class="ic" style="background:var(--violet-soft);color:#6D28D9">${icon('play', 'i-sm')}</div>
          <div class="t">小梨配音<span>剧情与过关对白自动朗读</span></div>
          <button class="switch ${st.voice !== false ? 'on' : ''}" id="storyVoice" aria-label="小梨配音"></button>
        </div>
      </div>
      <p class="hint-line" style="text-align:left;padding:0 4px">单词、例句与剧情使用离线语音包；未收录的句子自动回退到浏览器语音。</p>

      <div class="sec"><span class="bar"></span>学习目标</div>
      <div class="card" style="padding:4px 14px">
        <div class="setting">
          <div class="ic" style="background:var(--violet-soft);color:#6D28D9">${icon('target', 'i-sm')}</div>
          <div class="t">每日单词目标<span>首页进度按此计算</span></div>
          <select class="select" id="goal">
            ${[5, 10, 15, 20].map(n => `<option value="${n}" ${Number(st.dailyGoal) === n ? 'selected' : ''}>${n} 词</option>`).join('')}
          </select>
        </div>
        <div class="setting" style="border-top:1px solid var(--line-2)">
          <div class="ic" style="background:var(--leaf-soft);color:#047857">${icon('user', 'i-sm')}</div>
          <div class="t">昵称<span>显示在个人中心</span></div>
          <input class="dict-input" id="name" style="width:112px;padding:8px 10px;font-size:14px;text-align:left" maxlength="10" value="${esc(st.name || '小学员')}">
        </div>
      </div>

      <div class="sec"><span class="bar"></span>数据管理</div>
      <div class="card">
        <div style="font-size:12.5px;color:var(--ink-2);line-height:1.8">学习进度保存在当前浏览器，不会上传到服务器。清除后单词进度、复习计划、星星和打卡记录都会重置。</div>
        <button class="btn danger-ghost block" id="reset" style="margin-top:14px">清除全部学习数据</button>
      </div>

      <div class="sec"><span class="bar"></span>关于</div>
      <div class="card">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:42px;height:42px;border-radius:14px;background:var(--brand-soft);color:var(--brand-deep);display:grid;place-items:center">${icon('leaf', 'i-lg')}</div>
          <div><b style="font-size:15px">雪梨英语</b><div style="font-size:11.5px;color:var(--ink-3);margin-top:2px">广州版小学英语 · 1–6 年级</div></div>
          <span class="badge amber" style="margin-left:auto">v2.0</span>
        </div>
        <div style="font-size:12px;color:var(--ink-3);line-height:1.8;margin-top:12px">
          课程内容参考广州教科版教材主题编排，仅供学习交流使用，不用于商业用途。<br>
          发音与语音识别能力由浏览器提供，不同设备的音色和评分会有差异。
        </div>
      </div>
      <p class="foot-note">坚持每天 10 分钟，比一次学很多更有效</p>
    </div>`;

    $('#accent').onchange = (e) => {
      A.state.settings.accent = e.target.value;
      A.save();
      UI.toast(e.target.value === 'us' ? '已切换为美式发音' : '已切换为英式发音');
      A.TTS.speak('Hello! Nice to meet you.');
    };
    const rateInput = $('#rate');
    rateInput.oninput = () => {
      A.state.settings.rate = +rateInput.value;
      $('#rateVal').textContent = Number(rateInput.value).toFixed(2) + 'x';
    };
    rateInput.onchange = () => {
      A.save();
      A.TTS.speak('Let us learn English together.');
    };
    $('#autoSpeak').onclick = () => {
      A.state.settings.autoSpeak = !A.state.settings.autoSpeak;
      A.save();
      A.render();
      if (A.state.settings.autoSpeak) A.TTS.speak('Auto speak is on.');
    };
    $('#storyVoice').onclick = () => {
      A.state.settings.voice = A.state.settings.voice === false;
      A.save();
      A.render();
      if (A.state.settings.voice !== false && window.Story) {
        window.Story.speakLine({ who: 'li', t: '我的声音回来啦，我们继续闯关吧！' });
      } else {
        A.TTS.stop();
      }
    };
    $('#goal').onchange = (e) => {
      A.state.settings.dailyGoal = +e.target.value;
      A.save();
      UI.toast('每日目标已设为 ' + e.target.value + ' 词');
    };
    $('#name').onchange = (e) => {
      const v = e.target.value.trim().slice(0, 10);
      A.state.settings.name = v || '小学员';
      e.target.value = A.state.settings.name;
      A.save();
      UI.toast('昵称已保存');
    };
    $('#reset').onclick = () => {
      UI.confirm({
        title: '清除全部学习数据？',
        text: '单词进度、复习计划、星星、打卡与练习记录都会清空，且无法恢复。',
        ok: '确认清除',
        danger: true
      }).then(ok => {
        if (!ok) return;
        try { localStorage.removeItem(A.KEY); } catch {}
        const fresh = A.DEFAULT_STATE();
        Object.keys(A.state).forEach(k => { delete A.state[k]; });
        Object.assign(A.state, fresh);
        A.save();
        UI.toast('学习数据已清除');
        A.reset({ name: 'home' });
      });
    };
  };

  // ---------- 学习报告 ----------
  A.routes.report = () => {
    const learned = A.totalLearnedCount();
    const total = A.totalWordsCount();
    const mastered = A.masteredCount();
    const due = A.reviewCount();
    const acc = accuracy();
    const overall = total ? Math.round(learned / total * 100) : 0;
    const series = A.weekSeries();
    const weak = A.weakWords(4);
    const quizzes = A.state.quizzes || 0;
    const streak = A.streak();
    const tips = [];
    if (due > 0) tips.push(`有 ${due} 个单词到了复习时间，先复习再学新词，记忆会更牢。`);
    if (weak.length) tips.push(`「${weak[0].en}」等单词错误较多，可以进入错词强化再练一遍。`);
    if (!learned) tips.push('从一年级上册开始，先认识身边的单词，每天 5–10 个就很好。');
    else if (acc != null && acc >= 85) tips.push('练习正确率很高，可以挑战模块综合测试，争取拿到 3 星。');
    else tips.push('每天 10 分钟，坚持比一次学很多更有效。');
    if (streak >= 3) tips.push(`已经连续学习 ${streak} 天，保持这个节奏！`);

    A.UI.setTop({
      title: '学习报告', sub: '最近 7 天学习情况',
      actions: [{ icon: 'target', act: 'practice', label: '去练习', brand: true, onClick: () => A.go({ name: 'practice' }) }]
    });
    $('#view').innerHTML = `<div class="page no-tab">
      <div class="card" style="display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,#FFF9EC,#fff)">
        <div class="score-ring" style="margin:0;flex-shrink:0">${ringMini(overall)}<div class="num">${overall}<small>%</small></div></div>
        <div style="flex:1;min-width:0">
          <b style="font-size:16px">总体学习进度</b>
          <div style="font-size:12px;color:var(--ink-3);margin-top:6px">已学 ${learned} / ${total} 个单词</div>
          <div style="font-size:12px;color:var(--ink-3);margin-top:2px">掌握 ${mastered} 词 · ${acc == null ? '尚未开始练习' : '正确率 ' + acc + '%'}</div>
          <div style="margin-top:10px">${UI.pbar(overall, 'var(--brand)')}</div>
        </div>
      </div>

      <div class="stats" style="margin-top:10px">
        <div class="card stat-card"><div class="top"><span style="font-size:12px;color:var(--ink-3);font-weight:600">完成练习</span>
          <div class="ic" style="background:var(--violet-soft);color:#6D28D9">${icon('target', 'i-sm')}</div></div>
          <b>${quizzes}</b><span>累计获得 ${A.state.stars || 0} 颗星</span></div>
        <div class="card stat-card"><div class="top"><span style="font-size:12px;color:var(--ink-3);font-weight:600">待复习</span>
          <div class="ic" style="background:var(--sky-soft);color:#1D4ED8">${icon('refresh', 'i-sm')}</div></div>
          <b>${due}</b><span>${due ? '建议今天完成复习' : '复习计划已清空'}</span></div>
      </div>

      <div class="sec"><span class="bar"></span>学习趋势<span class="more">近 7 天</span></div>
      <div class="card">${chartHTML(series)}</div>

      <div class="sec"><span class="bar"></span>年级掌握情况</div>
      <div class="card" style="padding:4px 14px">${gradeRows()}</div>

      <div class="sec"><span class="bar"></span>需要加强<span class="more">${weak.length ? '从错得最多的开始' : ''}</span></div>
      ${weak.length ? `<div class="card" style="padding:4px 14px">
        ${weak.map(w => `<div class="word-row" style="padding:9px 0" data-word="${w.key}">
          <button class="speak-btn sm" data-say="${esc(w.en)}">${icon('volume', 'i-sm')}</button>
          <div class="w"><div class="en">${esc(w.en)} <span class="ipa">${esc(w.ipa)}</span></div><div class="zh">${esc(w.zh)}</div></div>
          <span class="learn-state">待加强</span>
        </div>`).join('')}
      </div>` : `<div class="feedback ok">${icon('check', 'i-sm')} 目前没有明显薄弱的单词</div>`}

      <div class="sec"><span class="bar"></span>学习建议</div>
      <div class="card">
        ${tips.map((t, i) => `<div style="display:flex;gap:9px;align-items:flex-start;${i ? 'margin-top:12px;padding-top:12px;border-top:1px solid var(--line-2)' : ''}">
          <div style="width:24px;height:24px;border-radius:8px;background:var(--brand-soft);color:var(--brand-deep);display:grid;place-items:center;flex-shrink:0">${icon('sparkle', 'i-sm')}</div>
          <div style="font-size:13px;line-height:1.7;color:var(--ink-2)">${esc(t)}</div>
        </div>`).join('')}
      </div>

      <div class="btn-row">
        <button class="btn ghost" id="toReview">去复习 ${due ? '(' + due + ')' : ''}</button>
        <button class="btn green" id="toPractice">去练习</button>
      </div>
      <p class="foot-note">报告数据来自本机学习记录 · 每日 0 点更新日期</p>
    </div>`;

    goGrade($('#view'));
    $$('[data-word]').forEach(el => el.onclick = () => H.openWordByKey(el.dataset.word));
    $('#toReview').onclick = () => { if (A.reviewCount()) window.Session.startReview(); else UI.toast('暂无待复习单词'); };
    $('#toPractice').onclick = () => A.go({ name: 'practice' });
  };
})();
