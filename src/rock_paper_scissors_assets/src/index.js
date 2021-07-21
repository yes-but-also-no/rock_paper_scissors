import { rock_paper_scissors } from "../../declarations/rock_paper_scissors";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with rock_paper_scissors actor, calling the greet method
  const greeting = await rock_paper_scissors.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
