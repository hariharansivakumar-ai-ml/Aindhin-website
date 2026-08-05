const fs = require('fs');
const path = require('path');

const dir = 'd:/Aindhin Updated/Aindhin/aindhin_website/Aindhin-Website/src';

function walk(currentDir) {
    fs.readdirSync(currentDir).forEach(file => {
        const filePath = path.join(currentDir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
        } else if (filePath.endsWith('.jsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Replace href={USER_APP_URL}
            if (content.includes('href={USER_APP_URL}')) {
                content = content.replace(/href=\{USER_APP_URL\}/g, 'href={`${USER_APP_URL}/signin`}');
                modified = true;
            }

            // Replace href={`${USER_APP_URL}/course...`}
            if (content.includes('href={`${USER_APP_URL}/course')) {
                content = content.replace(/href=\{`\$\{USER_APP_URL\}\/course[^`]*`\}/g, 'href={`${USER_APP_URL}/signin`}');
                modified = true;
            }

            // Replace externalLink: `${USER_APP_URL}/course...`
            if (content.includes('externalLink: `${USER_APP_URL}/course')) {
                content = content.replace(/externalLink:\s*`\$\{USER_APP_URL\}\/course[^`]*`/g, 'externalLink: `${USER_APP_URL}/signin`');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Modified: ' + filePath);
            }
        }
    });
}

walk(dir);
console.log('Done.');
