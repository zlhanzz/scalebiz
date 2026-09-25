import fs from 'node:fs';
import path from 'node:path';

const sourceFiles = {
  portrait: 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\7b3a35e4-167e-4bef-873c-489721e019b2\\developer_portrait_cutout_1790098020473.jpg',
  proptech: 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\7b3a35e4-167e-4bef-873c-489721e019b2\\proptech_preview_1790098117056.jpg',
  agri: 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\7b3a35e4-167e-4bef-873c-489721e019b2\\agri_finance_app_1790098214531.jpg',
  ai: 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\7b3a35e4-167e-4bef-873c-489721e019b2\\ai_career_finance_1790098241074.jpg',
};

const targetDir = path.resolve('public', 'images');
fs.mkdirSync(targetDir, { recursive: true });

fs.copyFileSync(sourceFiles.portrait, path.join(targetDir, 'developer-portrait.jpg'));
fs.copyFileSync(sourceFiles.proptech, path.join(targetDir, 'ruangsinggah-preview.jpg'));
fs.copyFileSync(sourceFiles.agri, path.join(targetDir, 'agri-finance-preview.jpg'));
fs.copyFileSync(sourceFiles.ai, path.join(targetDir, 'fincare-ai-preview.jpg'));

console.log('Successfully copied all assets to public/images/');
