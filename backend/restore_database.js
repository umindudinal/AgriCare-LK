const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 AgriCare LK Database Restore Script...');
console.log('Connecting to SQL Server (.\\SQLEXPRESS) and restoring database...');

const sqlFilePath = path.join(__dirname, '..', 'setup_database.sql');

try {
    const cmd = `sqlcmd -S ".\\SQLEXPRESS" -E -i "${sqlFilePath}" -u`;
    const output = execSync(cmd, { encoding: 'utf-8' });
    console.log(output);
    console.log('✅ Database restore completed successfully!');
} catch (error) {
    console.error('❌ Database restore failed:', error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    process.exit(1);
}
