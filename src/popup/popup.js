import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    return (
        <div>
            <h1>Hello,</h1>
            <p>This is our React Popup Application !</p>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

let port;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs[0])
    chrome.tabs.sendMessage(tabs[0].id, {action: "some-action"}, function(response) {
        console.log(response)
    });
});


function initBackgroundLongLivedConnection() {
    port = chrome.extension.connect({
        name: "Sample Communication"
    });

    port.postMessage({action: "initPopup"});

    // GET MESSAGE FROM BACKGROUND
    port.onMessage.addListener(function(msg) {
        console.log(msg);
    });
}

initBackgroundLongLivedConnection();