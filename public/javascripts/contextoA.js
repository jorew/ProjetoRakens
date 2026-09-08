const texto = document.getElementById('p-cont');
const conteudo = texto.textContent;
texto.textContent = '';

document.addEventListener("DOMContentLoaded", () => {
    const historia = document.getElementById("p-cont");

    if (historia) {
        historia.style.color = "yellow";
    }
});


let i = 0;

function escrever() {
  if (i < conteudo.length) {
    texto.textContent += conteudo[i];
    i++;

    setTimeout(escrever, 50);
  }
}

escrever();

console.log('Sucesso na animação!!!');
