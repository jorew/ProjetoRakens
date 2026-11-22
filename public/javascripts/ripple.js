document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('pointerdown', (evento) => {
    const circulo = document.createElement('span');
    circulo.classList.add('onda-clique');

    const tamanhoBase = 40;
    circulo.style.width = `${tamanhoBase}px`;
    circulo.style.height = `${tamanhoBase}px`;

    circulo.style.left = `${evento.clientX}px`;
    circulo.style.top = `${evento.clientY}px`;

    document.body.appendChild(circulo);

    circulo.addEventListener('animationend', () => {
      circulo.remove();
    });
  });
});
