import { analyzeApplication, closeModel } from "./src/qvac.js";

const resume = `
John Doe
JavaScript Developer

Skills:
JavaScript, Node.js, HTML, CSS, Git

Experience:
Built web applications using JavaScript and Node.js.
Created REST APIs and worked with Git.
`;

const jobDescription = `
We are looking for a Junior JavaScript Developer.

Requirements:
- JavaScript
- Node.js
- HTML and CSS
- Git
- REST API experience
- React is a plus
`;

try {
  console.log("\n=== SMARTFITZ QVAC TEST ===\n");

  const result = await analyzeApplication(resume, jobDescription);

  console.log("\n\n=== AI ANALYSIS ===\n");
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error("\nQVAC test failed:");
  console.error(error);
} finally {
  await closeModel();
}
