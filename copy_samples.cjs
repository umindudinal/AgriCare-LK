const fs = require('fs');
const path = require('path');

const sampleDir = path.join(__dirname, 'agri_care_lk_web_app', 'public', 'samples');
if (!fs.existsSync(sampleDir)) {
    fs.mkdirSync(sampleDir, { recursive: true });
}

function copySamples(datasetDir, prefix) {
    const fullDatasetDir = path.join(__dirname, datasetDir);
    if (!fs.existsSync(fullDatasetDir)) return;
    
    const dirs = fs.readdirSync(fullDatasetDir, { withFileTypes: true })
        .filter(d => d.isDirectory());

    dirs.forEach(dir => {
        const subDir = path.join(fullDatasetDir, dir.name);
        const files = fs.readdirSync(subDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
        if (files.length > 0) {
            const cleanName = dir.name.replace(/^[A-Za-z]+___?/, '').replace(/\s+/g, '_').toLowerCase();
            const src = path.join(subDir, files[0]);
            const dest = path.join(sampleDir, `${prefix}_${cleanName}.jpg`);
            fs.copyFileSync(src, dest);
            console.log(`Copied ${files[0]} -> ${prefix}_${cleanName}.jpg`);
        }
    });
}

copySamples('Tomato_Dataset', 'tomato');
copySamples('Chili_Dataset', 'chili');
copySamples('Brinjal_Dataset', 'brinjal');

console.log('All sample images copied successfully.');
