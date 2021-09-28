// To unblock all websites (according to the backup 'hosts' file, saved somewhere else), if you happen to stop the blocker.js script before it unblocks the websites. (ex. OS restart...)

const fs = require('fs');
const filePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
const backupPath = 'C:\\Users\\David\\Desktop\\Coding\\hosts';

function unblock() {
    console.log('==================================');
    console.log('Unblocking websites...');

    let backupText = fs.readFileSync(backupPath);
    
    fs.writeFile(filePath, backupText, (err) => {
        if (err) return console.log('Error!', err);
    });
}

unblock();