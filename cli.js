import readline from "node:readline";
import { analyzeApplication, closeModel } from "./src/qvac.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

console.log("");
console.log("======================================");
console.log("           SMARTFITZ CLI");
console.log("   Local AI Job Application Analyzer");
console.log("          Powered by QVAC");
console.log("======================================");
console.log("");
console.log("Type 'exit' at any prompt to quit.");
console.log("");

async function run() {
  try {
    while (true) {
      const resume = await question("Paste resume:\n> ");

      if (resume.trim().toLowerCase() === "exit") {
        break;
      }

      if (!resume.trim()) {
        console.log("\nPlease enter a resume.\n");
        continue;
      }

      const jobDescription = await question(
        "\nPaste job description:\n> "
      );

      if (jobDescription.trim().toLowerCase() === "exit") {
        break;
      }

      if (!jobDescription.trim()) {
        console.log("\nPlease enter a job description.\n");
        continue;
      }

      console.log("\nAnalyzing application with QVAC locally...");
      console.log("");

      const result = await analyzeApplication(
        resume,
        jobDescription
      );

      console.log("======================================");
      console.log("             AI ANALYSIS");
      console.log("======================================");
      console.log("");
      console.log(result);
      console.log("");
      console.log("======================================");
      console.log("");
      console.log("Ready for another application.");
      console.log("");
    }
  } catch (error) {
    console.error("\nAnalysis failed:");
    console.error(error);
  } finally {
    rl.close();
    await closeModel();
    console.log("\nSmartFitz stopped.");
  }
}

run();
