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
      { title: "Música Demonstrativa 1 - Nome Completo Longo da Faixa para Testar o Marquee", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { title: "Música Demonstrativa 2 - Segunda Faixa da Sua Playlist", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
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