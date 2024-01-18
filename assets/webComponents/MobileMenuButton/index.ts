import './MobileMenuButton.scss';

class MobileMenuButton extends HTMLElement {
  private sidebarMenuId = 'sidebarNav';
  private mobileMenuOpenClass = 'open';
  private buttonAnimationClass = 'animate';

  connectedCallback(): void {
    this.showContent();
    this.onclick = this.toggleMenuIsOpen;
  }

  private showContent(): void {
    this.innerHTML = !document.getElementById(this.sidebarMenuId)?.classList.contains(this.mobileMenuOpenClass)
      ? '<span class="material-icons">menu</span>'
      : '<span class="material-icons">close</span>';
  }

  private toggleMenuIsOpen(): void {
    this.classList.add(this.buttonAnimationClass);
    const mobileMenu = document.getElementById(this.sidebarMenuId);

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
