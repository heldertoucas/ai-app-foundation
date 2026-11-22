
    function duToggleProjection() {
      document.body.classList.toggle('projection-mode');
      const isProj = document.body.classList.contains('projection-mode');
      const label = document.querySelector('.projection-label');
      if (label) {
        label.textContent = isProj ? 'Sair da Sala' : 'Modo Sala';
      }
    }
  