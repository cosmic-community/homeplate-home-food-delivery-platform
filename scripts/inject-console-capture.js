const fs = require('fs');
const path = require('path');
const glob = require('glob');

function injectConsoleScript() {
  // Find all HTML files in build output
  const htmlFiles = glob.sync('out/**/*.html', { cwd: process.cwd() });
  
  if (htmlFiles.length === 0) {
    console.log('No HTML files found in build output');
    return;
  }

  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  htmlFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if script is already injected
    if (content.includes('dashboard-console-capture.js')) {
      return;
    }
    
    // Inject script tag before closing head tag
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${scriptTag}\n</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Injected console capture script into ${file}`);
    }
  });
  
  console.log(`Console capture script injection complete for ${htmlFiles.length} files`);
}

injectConsoleScript();