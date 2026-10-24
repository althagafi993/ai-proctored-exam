function toggleStartBtn() {
const checkbox = document.getElementById('agree-check');
const btn = document.getElementById('start-exam-btn');
if (checkbox.checked) {
btn.disabled = false;
btn.classList.remove('opacity-50', 'cursor-not-allowed');
} else {
btn.disabled = true;
btn.classList.add('opacity-50', 'cursor-not-allowed');
}
}

let violationsLog = {};
let currentQuestion = 1;

async function initializeExam() {
document.getElementById('consent-modal').style.display = 'none';
const video = document.getElementById('webcam');
const statusText = document.getElementById('ai-status');

try {
const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
video.srcObject = stream;

const objectModel = await cocoSsd.load();
const faceModel = await blazeface.load();

statusText.innerText = "المراقبة الذكية نشطة 🟢";
statusText.className = "inline-block px-2 py-1 rounded bg-green-100 text-green-800 font-semibold text-xs";

setInterval(async () => {
const predictions = await objectModel.detect(video);
let alertTriggered = false;

predictions.forEach(pred => {
if ((pred.class === 'cell phone' || pred.class === 'book' || pred.class === 'paper') && pred.score > 0.5) {
logViolation(currentQuestion, pred.class);
alertTriggered = true;
}
});

const faces = await faceModel.estimateFaces(video, false);
const alertBox = document.getElementById('violation-alert');
if (alertTriggered || faces.length > 1 || faces.length === 0) {
alertBox.classList.remove('hidden');
setTimeout(() => alertBox.classList.add('hidden'), 2500);
}
}, 2000);
} catch (err) {
statusText.innerText = "خطأ في تشغيل الكاميرا ❌";
statusText.className = "inline-block px-2 py-1 rounded bg-red-100 text-red-800 font-semibold text-xs";
}
}

function logViolation(qIndex, type) {
const key = Q${qIndex};
if (!violationsLog[key]) violationsLog[key] = { mobile: 0, book: 0, faces: 0 };
if (type === 'cell phone') violationsLog[key].mobile++;
else violationsLog[key].book++;
}