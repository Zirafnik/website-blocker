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
let websites = ['www.reddit.com', 'www.facebook.com'];
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
            let blockWebsite = redirectPath + "\t" + websites[i] + "\r\n";

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

/* TROUBLESHOOTING RESOURCES for PROBLEMS:

Script doesn't work on Firefox and some other modern browsers, because of DoH (DNS over HTTPS):
https://stackoverflow.com/questions/37452361/why-is-my-hosts-file-entry-being-ignored-by-the-browser

General:
https://newbedev.com/hosts-file-ignored-how-to-troubleshoot

Flushing the OS DNS cache didn't seem to work for all sites.
https://en.wikiversity.org/wiki/Computer_Networks/Ipconfig/DNS_Cache_Options#Activity_4_-_Purge_the_DNS_Resolver_Cache

Firefox holds its own DNS cache in memory, so you have to wait for it to clear after closing the tabs (about 3min).
- Disabling it in the 'about:config' by setting 'network.dns.offline-local' to 'false' and restarting Firefox, for immmediate and long-term effect didn't seem to work:
- last comment here: https://stackoverflow.com/questions/37452361/why-is-my-hosts-file-entry-being-ignored-by-the-browser
- https://superuser.com/questions/1433325/does-firefox-ignore-the-hosts-file-how-to-make-firefox-honor-the-hosts-file

- clearing the Firefox cache at 'about:networking#dns' didn't seem to work: https://support.mozilla.org/en-US/questions/1258756
*/