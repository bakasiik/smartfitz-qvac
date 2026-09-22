import {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0
} from "@qvac/sdk";

let modelId = null;

export async function analyzeApplication(resume, jobDescription) {
  if (!modelId) {
    console.log("Loading QVAC local model...");

    modelId = await loadModel({
      modelSrc: LLAMA_3_2_1B_INST_Q4_0,
      onProgress: (progress) => {
        console.log(
          `QVAC model download: ${progress.percentage.toFixed(0)}%`
        );
      }
    });

    console.log("QVAC model loaded.");
  }

  const prompt = `
Compare the RESUME with the JOB DESCRIPTION.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Rules:
- Use only information explicitly present in the resume.
- Never invent skills or experience.
- A job requirement not found in the resume is "Not mentioned in resume."
- Do not assume related skills are the same.
- Keep answers short.

Use exactly this format:

MATCH SUMMARY
Overall compatibility: [brief assessment]
Strong matches:
- [matching requirement]
- [matching requirement]

Gaps:
- [missing requirement]
- [missing requirement]

SKILLS MATCH
Found in both:
- [skill]
- [skill]

Not mentioned in resume:
- [missing skill]
- [missing skill]

EXPERIENCE MATCH
Relevant:
- [relevant resume experience]
- [relevant resume experience]

Not demonstrated:
- [missing experience]

RECOMMENDATIONS
- [specific recommendation]
- [specific recommendation]

NEXT ACTION
[one practical next step]

If there are no items in a section, write:
- None identified.

Do not invent information.
Do not return JSON.
Do not repeat these instructions.
`;

  const result = completion({
    modelId,
    history: [
      {
        role: "user",
        content: prompt
      }
    ],
    stream: true,
    maxTokens: 1200
  });

  let output = "";

  for await (const token of result.tokenStream) {
    if (typeof token === "string") {
      output += token;
    }
  }

  return output.trim();
}

export async function closeModel() {
  if (modelId) {
    await unloadModel({ modelId });
    modelId = null;
  }
}
