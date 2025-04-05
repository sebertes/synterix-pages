let progress = $state(0);
let timer = null;

export function startProgress() {
    progress = 5;
    clearInterval(timer);
    timer = setInterval(() => {
        let n = progress;
        progress = (n < 90 ? n + Math.random() * 5 : n);
    }, 200);
}

export function completeProgress() {
    clearInterval(timer);
    progress = 100;
    setTimeout(() => progress = 0, 500);
}

export function getProgress() {
    return progress;
}