# Ticketswap available ticket alert 
An alerting tool (chrome extension ver.) that monitors a ticketswap event page, it checks the avaiable ticket amount, it sends a chrome notification if it finds available tickets.

## User Guide
### Download the extension code

### Install the chrome extension
Visit [chrome://extensions](chrome://extensions), follow the [steps](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) here to load the unpacked extension.

### Open a ticketswap event page
- Open the page in a new tab, follow the [step](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#pin) here to pin the extension.
  Click on the extension, you should be able to see the extension menu.

  <img width="134" alt="image" src="https://github.com/iownthegame/ticketswap_ticket_alert/assets/1487369/d267a42f-4c09-4095-b5b7-d51338fe68f9">

- Try clicking on "Notification Test", you should be able to see a chrome extension with a sound.

  <img width="349" alt="image" src="https://github.com/iownthegame/ticketswap_ticket_alert/assets/1487369/b781c450-aff1-4cfa-bd92-8c4bf3eca0ce">

- Try clicking on "Start Refresh", and then double click on the blank area of the extension menu, and click on "inspect", you should be able to see some logging.

  <img width="1139" alt="Screenshot 2023-10-15 at 00 01 50" src="https://github.com/iownthegame/ticketswap_ticket_alert/assets/1487369/9b8e17db-bf2a-477e-9325-3410e97b4df3">


## Troubleshooting
### Notification doesn't show up
Check your Chrome notification settings
  
  <img width="719" alt="image" src="https://github.com/iownthegame/ticketswap_ticket_alert/assets/1487369/64edf74e-4e19-4b04-b153-c600aea15a56">

### Event page doesn't refresh
Create a separate chrome window for the alert tool. Keep the event page tab active. Keep the extension menu open.
  
  ![ticketswap_extension_screenshot](https://github.com/iownthegame/ticketswap_ticket_alert/assets/1487369/6e577fa1-fb66-43d1-abaf-1d3008cfa5ae)
