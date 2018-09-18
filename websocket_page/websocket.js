const API_ADDRESS = 'http://localhost:3001'
const webSocket = new WebSocket('ws://localhost:3002')

const addTerm = (title, meaning) => {
  let row = document.createElement('tr')
  let titleTd = document.createElement('td')
  let meaningTd = document.createElement('td')

  titleTd.appendChild(document.createTextNode(title))
  meaningTd.appendChild(document.createTextNode(meaning))
  row.appendChild(titleTd)
  row.appendChild(meaningTd)

  document.querySelector('#glossary-table > tbody').appendChild(row)
}

const wsAddTermHandler = (data) => {
  addTerm(data.term, data.meaning)
}

webSocket.onmessage = (payload) => {
  const wsClientEvent = JSON.parse(payload.data)
  console.log('WebSocket Event Received')
  console.log(wsClientEvent)

  const data = wsClientEvent.payload
  switch (wsClientEvent.eventType) {
    case 'addTerm':
    wsAddTermHandler(data)
      break;
    default:
      break;
  }
}

const fetchAndDisplayTerms = async () => {
  const resp = await fetch(`${API_ADDRESS}/glossary`)
  if (resp.status === 200) {
    const bodyJson = await resp.json()
    bodyJson.data.forEach(v => {
      addTerm(v.term, v.meaning)
    });
  }
}

const pageLoaded = (e) => {
  fetchAndDisplayTerms()
}

window.addEventListener('load', pageLoaded)
