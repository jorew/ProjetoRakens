document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('btn-play-pause');
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationTimeEl = document.getElementById('duration-time');
    const vinyl = document.getElementById('vinyl');
    const trackTitle = document.getElementById('track-title');
    const volumeBar = document.getElementById('volume-bar');
  
    // Exemplo de playlist (Substitua pelos caminhos dos seus arquivos de áudio)
    const playlist = [
      { 
        title: "Nome da Sua Música - Artista Exemplo", 
        src: " " 
      },
      { 
        title: "Segunda Música - Outro Artista", 
        src: " " 
      }
    ];
  
    let currentTrackIndex = 0;
  
    // Carrega a música atual
    function loadTrack(index) {
      const track = playlist[index];
      audio.src = track.src;
      trackTitle.textContent = track.title;
    }
  
    // Formata o tempo em MM:SS
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  
    // Play / Pause
    function togglePlay() {
      if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸';
        vinyl.classList.add('playing');
      } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
        vinyl.classList.remove('playing');
      }
    }
  
    // Atualiza Barra de Progresso
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationTimeEl.textContent = formatTime(audio.duration);
      }
    });
  
    // Mudar tempo ao arrastar a barra
    progressBar.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
      }
    });
  
    // Trocar de música
    function changeTrack(direction) {
      currentTrackIndex = (currentTrackIndex + direction + playlist.length) % playlist.length;
      loadTrack(currentTrackIndex);
      audio.play();
      playPauseBtn.textContent = '⏸';
      vinyl.classList.add('playing');
    }
  
    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => changeTrack(-1));
    nextBtn.addEventListener('click', () => changeTrack(1));
  
    // Ajuste de Volume
    volumeBar.addEventListener('input', (e) => {
      audio.volume = e.target.value;
    });
  
    // Carrega a primeira faixa ao inicializar
    loadTrack(currentTrackIndex);
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Captura cliques nos links do menu
    document.querySelectorAll('a.nav-link').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault(); // Evita o reload da página
        const url = link.getAttribute('href');
  
        try {
          const response = await fetch(url);
          const htmlText = await response.text();
  
          // Extrai o novo #main-content do HTML recebido
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, 'text/html');
          const newContent = doc.getElementById('main-content').innerHTML;
  
          // Atualiza a tela e a URL do navegador
          document.getElementById('main-content').innerHTML = newContent;
          window.history.pushState({}, '', url);
  
        } catch (err) {
          window.location.href = url; // Fallback caso ocorra erro
        }
      });
    });
  
    // Mantém os botões do navegador (Voltar/Avançar) funcionando
    window.addEventListener('popstate', async () => {
      const response = await fetch(window.location.href);
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      document.getElementById('main-content').innerHTML = doc.getElementById('main-content').innerHTML;
    });
  });