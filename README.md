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
- Shows until what time the websites are blocked
- Redirects blocked websites to a chosen IP (in my case the local host)
- Unblocks websites on its own, once the delay is up

## INSTRUCTIONS:
1. Needs Node.js to run: [Download Link](https://nodejs.org/en/download/)
2. Download the **blocker.js** file
3. Adjust any hard-coded variables: *filePath*, *redirectPath*, *websites*
4. (You should have admin rights for running the script and editing the `hosts` file.)
5. Run it in the terminal with `node blocker.js`
6. Prompt: input number of hours for the block

## unblocker.js
If you happen to stop the `blocker.js` script before it unblocks the websites (ex. OS restart), run the `unblocker.js` script. It unblocks all the websites according to the backup `hosts` file saved elsewhere.

## PROBLEMS:
Unfortunately, this script doesn't work by default on Firefox and some other modern browsers in the US, because of DoH (DNS over HTTPS). This feature is turned on by default in recent updates and needs to be changed in browser settings by hand. It should be noted, that DoH was put in place to further protect users' privacy.

[DoH Mozilla](https://support.mozilla.org/en-US/kb/firefox-dns-over-https)

[DoH bugfix](https://stackoverflow.com/questions/37452361/why-is-my-hosts-file-entry-being-ignored-by-the-browser)

Additionally, Firefox seems to hold its own DNS cache in memory, so if you have the sites open in browser you will be able to continue using them. I haven't found an easy solution to this problem: neither clearing the Firefox DNS cache nor disabling the features in 'about:config' didn't seem to work.

**At the moment, the best solution is just to close the tabs and after about 3min, they will become unavailable.**

For further troubleshooting check the comment at the bottom of the `blocker.js` file, where I go into further detail with links to the forums.