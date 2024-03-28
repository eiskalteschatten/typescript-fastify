class MobileMenuButton extends HTMLElement {
  mobileMenuId = 'mobileMenu';
  mobileMenuOpenClass = 'open';
  buttonAnimationClass = 'animate';

  connectedCallback() {
    this.showContent();
    this.onclick = this.toggleMenuIsOpen;
  }

  showContent() {
    this.innerHTML = !document.getElementById(this.mobileMenuId)?.classList.contains(this.mobileMenuOpenClass)
      ? '<span class="material-icons">menu</span>'
      : '<span class="material-icons">close</span>';
  }

  toggleMenuIsOpen() {
    this.classList.add(this.buttonAnimationClass);
    const mobileMenu = document.getElementById(this.mobileMenuId);

    if (mobileMenu?.classList.contains(this.mobileMenuOpenClass)) {
      mobileMenu.classList.remove(this.mobileMenuOpenClass);
      document.body.classList.remove('mobile-menu-open');
    }
    else if (mobileMenu) {
      mobileMenu.classList.add(this.mobileMenuOpenClass);
      document.body.classList.add('mobile-menu-open');
    }

    this.showContent();

    setTimeout(() => this.classList.remove(this.buttonAnimationClass), 500);
  }
}

customElements.define('mobile-menu-button', MobileMenuButton);
