import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src/pages');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Match `metaDescription.setAttribute("content", "ANYTHING");` 
    const newContent = content.replace(/metaDescription\.setAttribute\("content",\s*".*?"\);/g, 'metaDescription.setAttribute("content", "Aindhin is an online learning platform in India offering skill-based and career-oriented courses.");');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log('Updated ' + file);
    }
});
