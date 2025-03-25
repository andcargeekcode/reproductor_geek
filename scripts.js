// Lista de canciones
const songs = [
    { title: "Canción 1", artist: "Artista 1", src: "recursos/Alcolirykoz _ Laberinto ELC - Los Legendarios (Prod. El Arkeólogo)(MP3_160K).mp3", cover: "recursos/andres.jpg" },
    { title: "Canción 2", artist: "Artista 2", src: "recursos/song2.mp3", cover: "recursos/cover2.jpg" }
];

// Variables
let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio(songs[currentSongIndex].src);
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist");

// Función para actualizar la información de la canción
function updateSongInfo() {
    songTitle.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].artist;
    audio.src = songs[currentSongIndex].src;
    document.querySelector(".card img").src = songs[currentSongIndex].cover;
}

// Función para reproducir o pausar
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = "▶️"; // Icono de play
    } else {
        audio.play();
        playPauseBtn.innerHTML = "⏸️"; // Icono de pausa
    }
    isPlaying = !isPlaying;
}

// Función para cambiar de canción
function changeSong(next = true) {
    if (next) {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    updateSongInfo();
    if (isPlaying) audio.play();
}

// Actualizar barra de progreso
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

// Permitir adelantar desde la barra de progreso
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Event Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", () => changeSong(false));
nextBtn.addEventListener("click", () => changeSong(true));

// Inicializar con la primera canción
updateSongInfo();
