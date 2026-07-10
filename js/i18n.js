/**
 * BZLZHH Website — i18n
 * Supported: en, zh-CN
 *
 * Items that MUST stay in English under any locale (per site owner):
 *   "BZLZHH", "Hobbyist Software Developer", "Pure at heart. Free in code.",
 *   "C / C++", "OpenGL / ES", "Graphics", "Cross-platform Dev",
 *   "Android", "GNU/Linux"
 * They carry no data-i18n attributes and are never touched by the engine.
 */
const I18n = (() => {
  /* ── Translation dictionary ─────────────────────────────────────── */

  const translations = {
    'en': {
      'page.title': 'BZLZHH | Software Developer',

      'about.title': 'About Me',
      'about.desc': 'A hobbyist software developer who prefers C++, focused on FLOSS.',

      'projects.title': 'Projects',

      'projects.mobilegl.badge': 'Co-owner & Co-maintainer',
      'projects.mobilegl.desc': 'The most important project for me now. Aimed to provide a complete OpenGL implementation with a state management layer and multiple backends.',
      'projects.mobilegl.link': 'View Repository',

      'projects.nggl4es.badge': 'Owner',
      'projects.nggl4es.desc': 'Krypton Wrapper. Based on gl4es, with running Minecraft: Java Edition in mind.',
      'projects.nggl4es.link': 'View Repository',

      'projects.mobileglues.badge': 'Co-owner',
      'projects.mobileglues.desc': 'An OpenGL ES wrapper providing incomplete OpenGL implementation, with running Minecraft: Java Edition in mind.',
      'projects.mobileglues.link': 'View Repository',

      'projects.other.badge': '...',
      'projects.other.title': 'Other Works',
      'projects.other.desc': 'Personal projects, experiments, and forks of other repositories.',
      'projects.other.link': 'View on GitHub',

      'org.title': 'Organizations',
      'org.role': 'Co-owner & Developer',
      'org.link': 'Visit Org',
    },

    'zh-CN': {
      'page.title': 'BZLZHH | 软件开发者',

      'about.title': '关于我',
      'about.desc': '一名偏好 C++ 的软件开发者，专注于 FLOSS。',

      'projects.title': '项目',

      'projects.mobilegl.badge': '共同所有者 & 共同维护者',
      'projects.mobilegl.desc': '目前对我来说最重要的项目。旨在提供完整的 OpenGL 实现，具备状态管理层与多个渲染后端。',
      'projects.mobilegl.link': '查看仓库',

      'projects.nggl4es.badge': '所有者',
      'projects.nggl4es.desc': 'Krypton Wrapper。基于 gl4es，以运行 Minecraft: Java Edition 为目标。',
      'projects.nggl4es.link': '查看仓库',

      'projects.mobileglues.badge': '共同所有者',
      'projects.mobileglues.desc': '一个 OpenGL ES 封装，提供不完整的 OpenGL 实现，以运行 Minecraft: Java Edition 为目标。',
      'projects.mobileglues.link': '查看仓库',

      'projects.other.badge': '...',
      'projects.other.title': '其他作品',
      'projects.other.desc': '个人项目、实验和 Fork 的其他仓库。',
      'projects.other.link': '在 GitHub 上查看',

      'org.title': '组织',
      'org.role': '共同所有者 & 开发者',
      'org.link': '访问组织',
    }
  };

  /* ── Core ───────────────────────────────────────────────────────── */

  const supportedLocales = ['en', 'zh-CN'];
  const defaultLocale    = 'zh-CN';

  let currentLocale = defaultLocale;

  /** Resolve best locale: localStorage → browser → default */
  function detectLocale() {
    const stored = localStorage.getItem('locale');
    if (stored && supportedLocales.includes(stored)) return stored;

    const nav = navigator.language;
    if (nav && supportedLocales.includes(nav)) return nav;
    if (nav && nav.toLowerCase().startsWith('zh')) return 'zh-CN';

    return defaultLocale;
  }

  /** Look up a translation key; fall back to en, then raw key. */
  function t(key) {
    return translations[currentLocale]?.[key]
        || translations['en']?.[key]
        || key;
  }

  /** Walk the DOM and replace every translatable string. */
  function updatePage() {
    document.documentElement.lang = currentLocale;

    /* -- text content -- */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key  = el.getAttribute('data-i18n');
      const text = t(key);
      if (text) el.textContent = text;
    });

    /* -- title attribute (tooltips) -- */
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key  = el.getAttribute('data-i18n-title');
      const text = t(key);
      if (text) el.setAttribute('title', text);
    });

    /* -- placeholder attribute -- */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key  = el.getAttribute('data-i18n-placeholder');
      const text = t(key);
      if (text) el.setAttribute('placeholder', text);
    });

    /* -- <title> tag -- */
    document.title = t('page.title');

    /* -- language-switcher button labels -- */
    document.querySelectorAll('[data-locale-switcher]').forEach(el => {
      el.textContent = currentLocale === 'zh-CN' ? 'EN' : '中文';
    });

    /* Notify any interested scripts */
    document.dispatchEvent(new CustomEvent('localeChanged', {
      detail: { locale: currentLocale }
    }));
  }

  /** Switch to a specific locale (no-op if unsupported). */
  function setLocale(locale) {
    if (!supportedLocales.includes(locale)) return;
    currentLocale = locale;
    localStorage.setItem('locale', locale);
    updatePage();
  }

  /** Toggle between the two supported locales. */
  function toggleLocale() {
    setLocale(currentLocale === 'zh-CN' ? 'en' : 'zh-CN');
  }

  /** Bootstrap: detect locale & prime the page. */
  function init() {
    currentLocale = detectLocale();
    updatePage();
  }

  /* ── Public API ─────────────────────────────────────────────────── */

  return {
    init,
    setLocale,
    toggleLocale,
    get currentLocale() { return currentLocale; },
    get supportedLocales() { return [...supportedLocales]; },
    t
  };
})();

/* Auto-init after DOM is ready */
document.addEventListener('DOMContentLoaded', () => I18n.init());
