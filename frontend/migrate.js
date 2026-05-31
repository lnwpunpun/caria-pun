const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const hooksDir = path.join(__dirname, 'src', 'hooks');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Add "use client"; if it uses React hooks or specific libraries
  const needsUseClient = /use(State|Effect|Ref|Context|Memo|Callback|LayoutEffect|Scroll|Transform|InView|PersistFn|Mobile|Composition)/.test(content) || 
                         /framer-motion/.test(content) ||
                         /recharts/.test(content) ||
                         /lucide-react/.test(content) ||
                         /alert-dialog|accordion|avatar|carousel|chart|command|context-menu|dialog|drawer|dropdown-menu|hover-card|menubar|navigation-menu|popover|radio-group|resizable|scroll-area|select|sheet|slider|switch|tabs|tooltip|toggle/.test(filePath); // ui components that need client

  if (needsUseClient && !content.includes('"use client"') && !content.includes("'use client'")) {
    // Check if there are comments at the top, put "use client" after block comments if necessary, or just at the top
    if (content.startsWith('/*')) {
      const endComment = content.indexOf('*/') + 2;
      content = content.slice(0, endComment) + '\n"use client";\n' + content.slice(endComment);
    } else {
      content = '"use client";\n' + content;
    }
    changed = true;
  }

  // Fix imports from relative to @/components/ or @/hooks/
  // E.g. import { ... } from "../ui/button" -> "@/components/ui/button"
  // E.g. import { ... } from "./ui/button" -> "@/components/ui/button"
  // E.g. import { ... } from "../../hooks/useMobile" -> "@/hooks/useMobile"

  const importRegex = /from\s+['"]((?:\.\.\/|\.\/)[^'"]+)['"]/g;
  content = content.replace(importRegex, (match, p1) => {
    // Resolve path relative to current file
    const absoluteImportPath = path.resolve(path.dirname(filePath), p1);
    const relativeToSrc = path.relative(path.join(__dirname, 'src'), absoluteImportPath);
    
    // Replace Windows backslashes with forward slashes for import
    const newImport = `@/${relativeToSrc.replace(/\\/g, '/')}`;
    changed = true;
    return `from "${newImport}"`;
  });

  // also fix import ... from "@/lib/utils" which might be in the Vite repo as "@/lib/utils" already but let's make sure it's valid.

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(componentsDir);
walkDir(hooksDir);

console.log('Migration step completed.');
