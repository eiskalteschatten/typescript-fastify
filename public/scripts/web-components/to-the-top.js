class ToTheTop extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '&#9650;';
    this.onclick = this.handleClick;
    window.addEventListener('scroll', this.showHideButton);
    this.classList.add('js-track-click-event');
  }

  handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showHideButton() {
    const component = document.querySelector('to-the-top');

    if (window.scrollY >= 300) {
      component?.classList.add('show');
    }
    else {
      component?.classList.remove('show');
    }
  }
}

customElements.define('to-the-top', ToTheTop);
