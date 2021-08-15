//PROBLEM FIREFOX: https://stackoverflow.com/questions/37452361/why-is-my-hosts-file-entry-being-ignored-by-the-browser
//Doesn't work on Firefox and some other modern browsers, because of DoH (DNS over HTTPS);

const fs = require('fs');
const filePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
/*
WINDOWS:
    - File path: C:\Windows\System32\drivers\etc\hosts
    - Backslashes need to be escaped
    - const filePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
*/

/*
MAC/LINUX:
    - File path: /etc/hosts
    - const filePath = '/etc/hosts';
*/

const redirectPath = '127.0.0.1';
let websites = ['reddit.com', 'facebook.com'];
let originalContent;

//DELAY-TIME PROMPT
let delay;
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("For how many hours: ", function(hours) {
    delay = hours * 60 * 60 * 1000;
    rl.close();

    block();
    setTimeout(unblock, delay);
});


//FUNCTIONS
function block() {
	console.log('Blocking websites...');
		
    fs.readFile(filePath, (err, data) => {
        if (err) return console.log(err);
        
        let fileContents = data.toString();
        originalContent = fileContents;

        for(let i = 0; i < websites.length; i++) {
            let blockWebsite = "\n" + redirectPath + " " + websites[i];

            if (fileContents.indexOf(blockWebsite) < 0) {
                console.log(blockWebsite + ' is NOT included');

                fs.appendFile(filePath, blockWebsite, (err) => {
                    if (err) return console.log('Error: ', err);
                    console.log('File Updated Successfully');
                });
            } else {
                console.log(blockWebsite + ' is included');
            }
        }
        
    });
};

function unblock() {
    console.log('Unblocking websites...');

    fs.writeFile(filePath, originalContent, (err) => {
        if (err) return console.log('Error!', err);
    });
}