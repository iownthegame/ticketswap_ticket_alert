console.log("This is a popup!")

const soundMp3 = "notification_sound.mp3"
const refreshSecMin = 60 // 9
const refreshSecMax = 60 // 12

document.addEventListener("DOMContentLoaded", function () {
  const startRefreshButton = document.getElementById("startRefresh");
  const stopRefreshButton = document.getElementById("stopRefresh");
  
  startRefreshButton.addEventListener("click", function () {
    /*chrome.runtime.sendMessage({ message: "start_refresh" }, function (response) {
      console.log("Received response in popup.js:", response);
        startRefreshButton.disabled = true
        stopRefreshButton.disabled = false
        sessionStorage.setItem("intervalId", intervalId.toString());
    });*/  

    console.log(`start refreshing page every ${refreshSecMin}-${refreshSecMax} secs`)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      if (tab) {
        var intervalId = setInterval(function () {
          const url = new URL(tab.url);
          // Modify the search parameters here
          url.searchParams.set("a", generateRandomString(10));
          // chrome.tabs.reload(tab.id);
          chrome.tabs.update(tab.id, { url: url.toString() });
          console.log("refreshed the page!", url.pathname + url.search)
          checkPage();
        }, randomInteger(refreshSecMin * 1000, refreshSecMax * 1000)); 

        startRefreshButton.disabled = true
        stopRefreshButton.disabled = false
        // Store the interval ID to clear the interval later
        sessionStorage.setItem("intervalId", intervalId.toString());
      }
    });
  });


  stopRefreshButton.addEventListener("click", function () {
    let intervalId = sessionStorage.getItem("intervalId")
    if (intervalId) {
      clearInterval(intervalId)
      console.log("clearInterval", intervalId)
      
      startRefreshButton.disabled = false
      stopRefreshButton.disabled = true
      
      sessionStorage.removeItem("intervalId");
    }
  })

  document.getElementById("testNotification").addEventListener("click", function () {
          	let title =  "Ticket Alert (TEST)"
          	let message = "0 available tickets found from ticketswap!"
		sendNotification(title, message);
  })
});




function checkPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      if (tab) {
	chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: () => {
              const elements = [...document.getElementsByTagName('h2')];
              const targetElement = elements.find(element => element.innerText.trim() === 'Tickets');
              if (targetElement && targetElement.nextElementSibling) {
                return targetElement.nextElementSibling.innerHTML;
              }
              return null;
            },
          },
          function (results) {
            const nextElementHTML = results[0].result;
            if (nextElementHTML) {
              // console.log("Next Element HTML:", nextElementHTML);
              /* 0<!-- --> <!-- -->available<!-- --> <!-- -->• <!-- -->65<!-- --> <!-- -->sold<!-- --> <!-- -->• <!-- -->859<!-- --> <!-- -->wanted */
              // Perform actions here if the next element is found
	      let availableTickets = parseInt(nextElementHTML.split("<!-- --> <!-- -->")[0]);
              console.log("availableTickets", availableTickets, new Date().toJSON().slice(0,19))
              if (availableTickets > 0) {
          	let title =  "Ticket Alert"
           	let message = availableTickets + " available tickets found from ticketswap!"
		sendNotification(title, message)
              }
            } else {
              console.log("Next Element not found in DOM content.");
              // Perform other actions here if the next element is not found
            }
          }
        );	
      }
    });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function sendNotification(title, message) {
                chrome.notifications.create(`notification-${Date.now()}`, {
          	  type: "basic",
          	  iconUrl: "./icon.png",
		  title: title, 
		  message: message,
                });
		
		const audio = new Audio(soundMp3);
		audio.play();
}
