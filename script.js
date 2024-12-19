const beats = document.querySelectorAll('.beat');
let sequence = new Array(64).fill(false);
let playing = false;
let interval;
let tempo = 120; // Default BPM
let soundUrl = document.getElementById('soundSelect').value;

beats.forEach(beat => {
    beat.addEventListener('click', () => {
        const index = beat.dataset.index;
        sequence[index] = !sequence[index];
        beat.classList.toggle('active');
    });
});

document.getElementById('play').addEventListener('click', () => {
    if (playing) return; // Prevent multiple plays
    playing = true;
    playSequence();
    document.getElementById('play').disabled = true;
    document.getElementById('stop').disabled = false;
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(interval);
    playing = false;
    document.getElementById('play').disabled = false;
    document.getElementById('stop').disabled = true;
});

document.getElementById('tempo').addEventListener('input', (event) => {
    tempo = event.target.value;
    if (playing) {
        clearInterval(interval);
        playSequence();
    }
});

document.getElementById('soundSelect').addEventListener('change', (event) => {
    soundUrl = event.target.value;
});

function playSequence() {
    let index = 0;
    const beatDuration = (60 / tempo) * 1000; // Calculate beat duration in milliseconds
    interval = setInterval(() => {
        if (sequence[index]) {
            const audio = new Audio(soundUrl);
            audio.play();
        }
        index = (index + 1) % 64;
    }, beatDuration);
}
