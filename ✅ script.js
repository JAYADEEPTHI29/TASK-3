let debateLog = [];
let memory = [];
let rounds = 0;
const MAX_ROUNDS = 8;

const scientistArguments = [
  "AI must be regulated due to high-risk applications.",
  "Unchecked AI could lead to privacy invasions and bias.",
  "Public safety requires AI systems to meet medical-grade standards.",
  "Without oversight, AI could amplify misinformation."
];

const philosopherArguments = [
  "Regulation could stifle philosophical progress and autonomy.",
  "Human values evolve and AI should adapt without strict rules.",
  "Creative freedoms must be protected even with risks.",
  "History shows overregulation often delays societal evolution."
];

function startDebate() {
  const topic = document.getElementById("topicInput").value;
  if (!topic) {
    alert("Please enter a topic.");
    return;
  }

  document.getElementById("debateArea").innerHTML = `<h2>Debate Topic: ${topic}</h2>`;
  debateLog.push(`Debate Topic: ${topic}`);
  rounds = 0;
  memory = [];
  runDebateRound();
}

function runDebateRound() {
  if (rounds >= MAX_ROUNDS) {
    declareWinner();
    return;
  }

  const agent = rounds % 2 === 0 ? "Scientist" : "Philosopher";
  const argument = agent === "Scientist"
    ? scientistArguments[rounds / 2]
    : philosopherArguments[Math.floor(rounds / 2)];

  const debateArea = document.getElementById("debateArea");
  const newLine = document.createElement("div");
  newLine.className = "debate-line";
  newLine.innerText = `[Round ${rounds + 1}] ${agent}: ${argument}`;
  debateArea.appendChild(newLine);

  memory.push(`${agent}: ${argument}`);
  debateLog.push(`[Round ${rounds + 1}] ${agent}: ${argument}`);

  rounds++;
  setTimeout(runDebateRound, 1200);
}

function declareWinner() {
  const summary = memory.join(" | ");
  let scientistPoints = summary.match(/Scientist:/g).length;
  let philosopherPoints = summary.match(/Philosopher:/g).length;

  let winner = "Scientist";
  let reason = "Presented more grounded, risk-based arguments aligned with public safety principles.";

  debateLog.push(`Summary of debate: ${summary}`);

  const finalText = document.getElementById("finalJudgment");
  finalText.innerHTML = `🏆 <b>Winner: ${winner}</b><br>Reason: ${reason}`;

  debateLog.push(`Winner: ${winner}`);
  debateLog.push(`Reason: ${reason}`);
  document.getElementById("downloadBtn").style.display = "block";
}

function downloadLog() {
  const blob = new Blob([debateLog.join("\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "debate_log.txt";
  link.click();
}
