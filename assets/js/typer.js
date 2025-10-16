class Typer {
  constructor(target, options = {}) {
    if (!target) {
      throw new Error('Typer requires a valid target element.');
    }

    const defaults = {
      text: '',
      typingDelay: 24,
      chunkSize: 2,
      prefersReducedMotion: false,
      onComplete: () => {},
    };

    this.settings = { ...defaults, ...options };
    this.target = target;
    this.text = this.settings.text ?? '';
    this.typingDelay = Math.max(8, Number(this.settings.typingDelay) || defaults.typingDelay);
    this.chunkSize = Math.max(1, Number(this.settings.chunkSize) || defaults.chunkSize);
    this.onComplete = typeof this.settings.onComplete === 'function' ? this.settings.onComplete : defaults.onComplete;
    this.prefersReducedMotion =
      this.settings.prefersReducedMotion ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.index = 0;
    this.frameId = null;
    this.lastTimestamp = 0;
    this.isRunning = false;
    this.autoScrollEnabled = true;
    this.isProgrammaticScroll = false;
    this.autoScrollThreshold = 16;

    this.caret = document.createElement('span');
    this.caret.className = 'terminal__caret';

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.step = this.step.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.markLastBlock = this.markLastBlock.bind(this);
    this.cleanupListeners = this.cleanupListeners.bind(this);
    this.positionCaret = this.positionCaret.bind(this);
    this.findCaretAnchor = this.findCaretAnchor.bind(this);

    this.init();
  }

  init() {
    this.target.innerHTML = '';
    this.target.setAttribute('aria-live', 'polite');

    this.contentWrapper = document.createElement('div');
    this.contentWrapper.className = 'terminal__content';
    this.target.appendChild(this.contentWrapper);
    this.contentWrapper.appendChild(this.caret);
    this.target.addEventListener('scroll', this.handleScroll, { passive: true });

    if (this.prefersReducedMotion) {
      this.contentWrapper.innerHTML = this.text;
      this.markLastBlock();
      this.positionCaret();
      this.caret.classList.add('is-complete');
      this.scrollToBottom();
      this.onComplete();
      return;
    }

    this.isRunning = true;
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.frameId = requestAnimationFrame(this.step);
  }

  step(timestamp) {
    if (!this.isRunning) {
      return;
    }

    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }

    if (timestamp - this.lastTimestamp >= this.typingDelay) {
      this.index = Math.min(this.text.length, this.index + this.chunkSize);
      this.contentWrapper.innerHTML = this.text.slice(0, this.index);
      this.markLastBlock();

      this.lastTimestamp = timestamp;

      this.positionCaret();
      this.caret.classList.remove('is-complete');
      this.scrollToBottom();

      if (this.index >= this.text.length) {
        this.finish();
        return;
      }
    }

    this.frameId = requestAnimationFrame(this.step);
  }

  finish() {
    this.isRunning = false;
    cancelAnimationFrame(this.frameId);
    this.caret.classList.add('is-complete');
    this.positionCaret();
    this.scrollToBottom();
    this.cleanupListeners();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.onComplete();
  }

  handleVisibilityChange() {
    if (document.hidden || this.isRunning || this.index >= this.text.length) {
      return;
    }

    this.isRunning = true;
    this.lastTimestamp = 0;
    this.frameId = requestAnimationFrame(this.step);
  }

  destroy() {
    this.isRunning = false;
    cancelAnimationFrame(this.frameId);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.cleanupListeners();
    if (this.contentWrapper) {
      this.contentWrapper.innerHTML = this.text;
      this.markLastBlock();
    } else {
      this.target.innerHTML = this.text;
    }
    this.positionCaret();
    this.caret.classList.add('is-complete');
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (!this.autoScrollEnabled) {
      return;
    }

    this.isProgrammaticScroll = true;
    this.target.scrollTop = this.target.scrollHeight;
    requestAnimationFrame(() => {
      this.isProgrammaticScroll = false;
    });
  }

  handleScroll() {
    if (this.isProgrammaticScroll) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = this.target;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    const isNearBottom = distanceFromBottom <= this.autoScrollThreshold;
    this.autoScrollEnabled = isNearBottom;
  }

  cleanupListeners() {
    this.target.removeEventListener('scroll', this.handleScroll);
  }

  markLastBlock() {
    if (!this.contentWrapper) {
      return;
    }

    const children = Array.from(this.contentWrapper.children).filter(
      (child) => child !== this.caret
    );

    children.forEach((child) => {
      child.classList?.remove('terminal-last');
    });

    const lastChild = children[children.length - 1];
    if (lastChild && lastChild.classList) {
      lastChild.classList.add('terminal-last');
    }
  }

  positionCaret() {
    if (!this.contentWrapper) {
      return;
    }

    const anchor = this.findCaretAnchor();
    if (!anchor) {
      this.contentWrapper.appendChild(this.caret);
      return;
    }

    if (anchor.contains(this.caret)) {
      return;
    }

    anchor.appendChild(this.caret);
  }

  findCaretAnchor() {
    if (!this.contentWrapper) {
      return null;
    }

    const nodes = Array.from(this.contentWrapper.childNodes).filter((node) => node !== this.caret);
    if (!nodes.length) {
      return this.contentWrapper;
    }

    let current = nodes[nodes.length - 1];

    while (current) {
      if (current === this.caret) {
        return this.contentWrapper;
      }

      if (current.nodeType === Node.TEXT_NODE) {
        return current.parentElement || this.contentWrapper;
      }

      if (current.nodeType === Node.ELEMENT_NODE) {
        const children = Array.from(current.childNodes).filter((node) => node !== this.caret);
        if (children.length === 0) {
          return current;
        }
        current = children[children.length - 1];
        continue;
      }

      return this.contentWrapper;
    }

    return this.contentWrapper;
  }
}

export { Typer };
