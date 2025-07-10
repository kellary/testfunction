const feedInner = document.getElementById("feedInner");
let messages = [];
const maxVisible = 7;

function removeNotification(elem) {
  elem.classList.add("fade-out");
  setTimeout(() => {
    feedInner.removeChild(elem);
    messages = messages.filter(m => m !== elem);
  }, 0);
}

function createNotification(company, drivers) {
  const wrapper = document.createElement("div");
  wrapper.className = "notification";
  wrapper.innerHTML = `<b>${company}</b><br>` + drivers.map(d => `
    • ${d.name} – PRE-EMPLOYMENT – ${d.date}<br>
    ${d.time}: <span style="color:#00ffc3;">${d.status}</span> → 
    <span style="color:#72d0ff;">${d.location}</span>
  `).join("<br>");

  feedInner.appendChild(wrapper);
  messages.push(wrapper);

  if (messages.length > maxVisible) {
    const oldest = messages.shift();
    removeNotification(oldest);
  }

}

const generateDataSet = () => {
  const companies = [
    "Apex Movers", "Orion Freightways", "BlueLine Logistics", "Quantum Haul", "Echo Transport",
    "Pinnacle Carriers", "Atlas Hauling", "Skyway Express", "Nova Freight", "Titan Transport"
  ];
  const firstNames = ["Jordan", "Riley", "Cameron", "Jamie", "Hayden", "Alex", "Taylor"];
  const lastNames = ["Hayes", "Cooper", "Henderson", "Parker", "Walker", "Morris", "Bailey"];

  const statusChain = [
    { status: "COMPLETED", location: "AT LAB" },
    { status: "AT LAB", location: "RESULTS" },
  ];

  const dataSet = [];

  for (let i = 0; i < 100; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const drivers = [];
    const driverCount = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < driverCount; j++) {
      const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      const now = new Date(Date.now() + ((i * 3 + j) * 60000));

      const chain = statusChain[Math.floor(Math.random() * statusChain.length)];

      drivers.push({
        name,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: chain.status,
        location: chain.location
      });
    }

    dataSet.push({ company, drivers });
  }

  return dataSet;
};


const dataSet = generateDataSet();

let i = 0;
setInterval(() => {
  const data = dataSet[i % dataSet.length];
  createNotification(data.company, data.drivers);
  i++;
}, 2350);
