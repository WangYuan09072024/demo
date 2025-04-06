let myScore = 0;
let isPaused = false;
let currentAnswer = 0;
let currentQuestion = '';
let timeLeft = 10;
let timer;

function startMatch() {
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("status").textContent = "Match started!";
  generateQuestion();
}

function generateQuestion() {
  if (isPaused) return;

  let nums = [];
  let ops = ['+', '-', '*', '/'];
  let numCount = Math.min(2 + Math.floor(myScore / 3), 4);

  for (let i = 0; i < numCount; i++) {
    nums.push(Math.floor(Math.random() * 20) + 1);
  }

  let expr = "";
  for (let i = 0; i < nums.length; i++) {
    expr += nums[i];
    if (i < nums.length - 1) {
      expr += " " + ops[Math.floor(Math.random() * ops.length)] + " ";
    }
  }

  currentAnswer = Math.round(eval(expr));
  currentQuestion = expr;
  document.getElementById("question").textContent = expr + " = ?";
  document.getElementById("question").style.visibility = "visible";
  startTimer();
}

function submitAnswer() {
  if (isPaused) return;

  const input = document.getElementById("answer").value.trim();
  const guess = parseFloat(input);

  clearInterval(timer);

  if (guess === currentAnswer) {
    myScore++;
    document.getElementById("feedback").textContent = "✅ Correct!";
  } else {
    myScore = 0;
    document.getElementById("feedback").textContent = `❌ Wrong! Back to level 1. Answer was ${currentAnswer}`;
  }

  document.getElementById("myScore").textContent = myScore;
  document.getElementById("answer").value = "";
  timeLeft = 10;
  setTimeout(generateQuestion, 1000);
}

function togglePause() {
  isPaused = !isPaused;
  document.getElementById("pauseBtn").textContent = isPaused ? "▶️ Resume" : "⏸️ Pause";
  document.getElementById("question").style.visibility = isPaused ? "hidden" : "visible";
  if (isPaused) {
    clearInterval(timer);
  } else {
    startTimer();
  }
}

function startTimer() {
  document.getElementById("timer").textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    if (isPaused) return;

    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      myScore = 0;
      document.getElementById("feedback").textContent = `⏰ Time's up! Back to level 1. Answer was ${currentAnswer}`;
      document.getElementById("myScore").textContent = myScore;
      document.getElementById("answer").value = "";
      timeLeft = 10;
      setTimeout(generateQuestion, 1000);
    }
  }, 1000);
}

document.getElementById("answer").addEventListener("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ") {
    submitAnswer();
  }
});
