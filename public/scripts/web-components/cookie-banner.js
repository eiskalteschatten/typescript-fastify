class CookieBanner extends HTMLDialogElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const hasClosedCookieBanner = !!localStorage.getItem('allCookiesAccepted');

    if (!hasClosedCookieBanner) {
      this.showModal();
    }

    const onlyNecessaryButton = document.getElementById('cookieBannerOnlyNecessaryButton');
    const acceptAllButton = document.getElementById('cookieBannerAcceptAllButton');

    onlyNecessaryButton?.addEventListener('click', () => this.acceptOnlyNecessaryCookies());
    acceptAllButton?.addEventListener('click', () => this.acceptAllCookies());
  }

  acceptOnlyNecessaryCookies() {
    localStorage.setItem('allCookiesAccepted', 'false');
    this.close();
  }

  acceptAllCookies() {
    localStorage.setItem('allCookiesAccepted', 'true');
    this.close();
  }
}

customElements.define('cookie-banner', CookieBanner, { extends: 'dialog' });
