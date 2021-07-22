import { rock_paper_scissors } from "../../declarations/rock_paper_scissors";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with rock_paper_scissors actor, calling the greet method
  const result = await rock_paper_scissors.playMove({rock: null}, [name]);

  console.log(result);
});
