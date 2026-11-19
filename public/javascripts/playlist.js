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
  
    const playlist = [
      { 
        title: "Deus Me Fez Assim - Jorew Mário", 
        src: "/playlist/Deus-me-fez-assim.mp3" 
      }
    ];
  
    let currentTrackIndex = 0;
  
    function loadTrack(index) {
      const track = playlist[index];
      audio.src = track.src;
      trackTitle.textContent = track.title;
    }
  
    function formatTime(seconds) {
      if (isNaN(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  
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
  
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationTimeEl.textContent = formatTime(audio.duration);
      }
    });
  
    progressBar.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
      }
    });
  
    function changeTrack(direction) {
      currentTrackIndex = (currentTrackIndex + direction + playlist.length) % playlist.length;
      loadTrack(currentTrackIndex);
      audio.play();
      playPauseBtn.textContent = '⏸';
      vinyl.classList.add('playing');
    }
  
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => changeTrack(-1));
    nextBtn.addEventListener('click', () => changeTrack(1));
  
    volumeBar.addEventListener('input', (e) => {
      audio.volume = e.target.value;
    });
  
    loadTrack(currentTrackIndex);
  
    // =====================================================================
    // FUNÇÃO QUE TROCA DE PÁGINA AUTOMATICAMENTE SEM PARAR O TOCA-DISCOS
    // =====================================================================
    async function navegarSemPararMusica(url, atualizarHistorico = true) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao carregar página');
        
        const htmlText = await response.text();
        const doc = new DOMParser().parseFromString(htmlText, 'text/html');
  
        const footerAtual = document.getElementById('container_footer');
  
        // 1. Remove tudo do <body> atual, EXCETO o toca-discos (#container_footer) e scripts
        Array.from(document.body.childNodes).forEach(node => {
          if (node !== footerAtual && node.tagName !== 'SCRIPT') {
            document.body.removeChild(node);
          }
        });
  
        // 2. Insere todo o conteúdo da nova página ANTES do toca-discos
        Array.from(doc.body.childNodes).forEach(node => {
          if (node.id !== 'container_footer' && node.tagName !== 'SCRIPT') {
            document.body.insertBefore(node.cloneNode(true), footerAtual);
          }
        });
  
        // 3. Atualiza o CSS da página caso a nova view use um stylesheet diferente
        const novoCss = doc.querySelector('link[rel="stylesheet"]');
        const cssAtual = document.querySelector('link[rel="stylesheet"]');
        if (novoCss && cssAtual && novoCss.href !== cssAtual.href) {
          cssAtual.href = novoCss.href;
        }
  
        // 4. Atualiza título da aba e URL do navegador
        document.title = doc.title;
        if (atualizarHistorico) {
          window.history.pushState({}, '', url);
        }
        window.scrollTo(0, 0);
  
      } catch (erro) {
        console.error('Falha na navegação fluida:', erro);
        window.location.href = url; // Se der erro de rede, navega normalmente
      }
    }
  
    // Intercepta cliques em qualquer link interno do site
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
  
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
      }
  
      e.preventDefault();
      navegarSemPararMusica(href, true);
    });
  
    // Faz os botões Voltar e Avançar do navegador funcionarem sem parar a música
    window.addEventListener('popstate', () => {
      navegarSemPararMusica(window.location.href, false);
    });
  });