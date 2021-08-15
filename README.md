# Website Blocker for Windows/Mac/Linux

## MOTIVATION:
- I created this script because I wanted to get rid of distracting non-productive pages when working (reddit, twitch, email...)
- Studies show that it takes 23-29min to get back on track when you get interrupted or distracted == a big loss of productivity
- I did not trust any of the available software for disabling access to websites (ColdTurkey, Firefox add-ons...): 
    * they prove to be notoriously hard to uninstall
    * and have shady tracking practices.

## HOW IT WORKS:
The script blocks all websites in the websites array for the specified delay, by including them in the 'hosts' file paired with the redirection path. After the delay is up, the unblock() function runs, which resets the hosts file to its original contents.

## FEATURES:
- Block-time prompt: hours (There was an option to create the script so it kept chosen websites blocked at certain hours of the day, but since my work schedule is not constant, I decided for a specified amount of time)
- Redirects blocked websites to a chosen IP (in my case the local host)
- Unblocks websites on its own, once the delay is up

## INSTRUCTIONS:
1. Needs Node.js to run: [Download Link](https://nodejs.org/en/download/)
2. Download the **blocker.js** file
3. Adjust any hard-coded variables: *filePath*, *redirectPath*, *websites*
4. (You should have admin rights for running the script and editing the `hosts` file.)
5. Run it in the terminal with `node blocker.js`
6. Prompt: input number of hours for the block

## PROBLEMS:
Unfortunately, this script doesn't work by default on Firefox and some other modern browsers, because of DoH (DNS over HTTPS). This feature is turned on by default as of recent updates and needs to be changed in browser settings by hand. It should be noted, that DoH was put in place to further protect users' privacy.

[DoH Mozilla](https://support.mozilla.org/en-US/kb/firefox-dns-over-https)

[DoH bugfix](https://stackoverflow.com/questions/37452361/why-is-my-hosts-file-entry-being-ignored-by-the-browser)