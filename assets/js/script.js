async function fetchClientById(clientId) {
    const apiUrl = `http://localhost:3001/clients/${clientId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Cliente não encontrado');
        }

        const client = await response.json();
        return client;
    } catch (error) {
        console.error('Erro ao buscar o cliente:', error);
        return null;
    }
}

function updateClientInfo(client) {
    const customerGrid = document.querySelector(".container-large .customer-grid-cols-2");
    
    if (!client) {
        alert("Cliente não encontrado!");
        customerGrid.style.display = "none";
        return;
    }

    customerGrid.style.display = "grid";

    document.querySelector("#customer .name h1").innerText = client.name;
    document.querySelector("#customer .customer-since h2").innerText = `Cliente desde ${client.clientSince}`;

    const historyContainer = document.querySelector(".history-tickets .items");
    historyContainer.innerHTML = "";

    client.appointmentHistory.forEach(appointment => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
            <div class="time">
                <h3>${appointment.date}</h3>
                <h4>${appointment.time}</h4>
            </div>
            <div class="img-check">
                <img src="public/images/check-min.png" alt="check-ticket">
            </div>
        `;
        historyContainer.appendChild(item);
    });

    document.querySelector(".number-cuts").innerText = `${client.loyaltyCard.totalCuts} cortes`;
    document.querySelector("#user").innerText = `ID: ${client.id}`;
    document.querySelector(".customer .image img").src = `/public/images/users/${client.imageProfile}`;
    
    const cutsRemaining = client.loyaltyCard.cutsRemaining;
    document.querySelector(".cuts-remain .side-side #range").value = Math.min(client.loyaltyCard.totalCuts, 10);
    document.querySelector(".cuts-remain .remain").innerHTML = cutsRemaining > 0 ? 
        `<b>${cutsRemaining}</b> cortes restantes` : 
        `<b>Resgate seu prêmio</b>`;
    document.querySelector(".cuts-remain .side-side span").innerHTML = `${client.loyaltyCard.totalCuts} de ${client.loyaltyCard.cutsNeeded}`;

    const ticketsContainer = document.querySelector(".accumulated-cards .tickets-grid");
    ticketsContainer.innerHTML = "";

    for (let i = 0; i < client.loyaltyCard.totalCuts; i++) {
        const ticket = document.createElement("div");
        ticket.className = "ticket";
        ticket.innerHTML = `<img src="public/images/check.png" alt="check">`;
        ticketsContainer.appendChild(ticket);
    }

    for (let i = 0; i < cutsRemaining - 1; i++) {
        const ticket = document.createElement("div");
        ticket.className = "ticket";
        ticket.innerHTML = `<div></div>`;
        ticketsContainer.appendChild(ticket);
    }

    if (client.loyaltyCard.totalCuts < client.loyaltyCard.cutsNeeded) {
        const giftIcon = document.createElement("div");
        giftIcon.className = "ticket";
        giftIcon.innerHTML = `<img src="public/images/gift.png" alt="Gift Icon">`;
        ticketsContainer.appendChild(giftIcon);
    }
}

document.querySelector(".insert-fidelity-card input").addEventListener("keyup", async function(event) {
    if (event.key === "Enter") {
        const clientId = this.value.trim();
        const client = await fetchClientById(clientId);
        updateClientInfo(client);
    }
});
