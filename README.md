# SmartFitz

Local AI Job Application Analyzer powered by Tether's QVAC SDK.

SmartFitz compares a resume with a job description using an on-device QVAC model and produces a practical application analysis locally.

## App URL

http://localhost:3000

## Features

- Local AI processing with QVAC
- Browser interface
- Command Prompt interface
- Resume and job description comparison
- Skills and experience matching
- Resume improvement recommendations
- Practical next action
- Multiple CLI analyses in one session
- Type `exit` to stop the CLI
- No cloud AI API required

## QVAC

SmartFitz uses:

- `@qvac/sdk`
- `loadModel()`
- `completion()`
- `unloadModel()`
- Llama 3.2 1B Instruct Q4

## How It Works

Resume + Job Description  
→ SmartFitz  
→ QVAC local AI  
→ Application Analysis  
→ Recommendations

## Installation

```bash
git clone https://github.com/bakasiik/smartfitz-qvac.git
cd smartfitz-qvac
npm install