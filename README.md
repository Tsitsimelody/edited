### JS Task

-   Thought process, i went through a lot of back and forth on how to simulate server events as it was highlighted in the instructions to LISTEN and REACT to events so nded up using web workers which ru on a seperate thread in the browser. Second to that i struggled trying to figure out at what number of each metric equals to what mood but because of the time constraint i didnt put much thought into it so the numbers are pretty arbitraty.

## What would i change

-   if i had more time on the web worker i would find a better way of sending the event other than setInterval but it was the first solution that came to mind
-   Theres a bit of duplication esp with the `(num) => num + 1`. I would clean that up
-   calculationg the overall mood doesnt make sence as i just added all the numbers i would find a better way of doing this
-   needs an overall structure and code cleanup
