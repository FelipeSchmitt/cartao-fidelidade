
    // Simula um banco de dados como um objeto
    const database = {
        "clients": [
            {
                "id": "124-537-835-230",
                "name": "Natália Miranda",
                "imageProfile": "natalia-miranda.png",
                "clientSince": "18/09/2023",
                "appointmentHistory": [
                    {"date": "29/04/2024", "time": "18:30"},
                    {"date": "16/03/2024", "time": "17:00"},
                    {"date": "01/02/2024", "time": "17:30"},
                    {"date": "03/01/2024", "time": "15:00"},
                    {"date": "28/11/2023", "time": "14:00"},
                    {"date": "23/10/2023", "time": "15:00"}
                ],
                "loyaltyCard": {
                    "totalCuts": 7,
                    "cutsNeeded": 10,
                    "cutsRemaining": 3
                }
            },
            {
                "id": "207-245-699-104",
                "name": "Capitão Nascimento",
                "imageProfile": "capitao-nascimento.png",
                "clientSince": "12/04/2023",
                "appointmentHistory": [
                    {"date": "01/05/2024", "time": "10:00"},
                    {"date": "12/02/2024", "time": "09:00"},
                    {"date": "30/12/2023", "time": "11:00"},
                    {"date": "05/11/2023", "time": "10:30"}
                ],
                "loyaltyCard": {
                    "totalCuts": 4,
                    "cutsNeeded": 10,
                    "cutsRemaining": 6
                }
            },
            {
                "id": "523-114-876-908",
                "name": "Sansão",
                "clientSince": "15/07/2023",
                "imageProfile": "sansao.png",
                "appointmentHistory": [
                    {"date": "22/04/2024", "time": "16:00"},
                    {"date": "18/03/2024", "time": "16:30"},
                    {"date": "24/01/2024", "time": "17:45"},
                    {"date": "20/12/2023", "time": "15:15"}
                ],
                "loyaltyCard": {
                    "totalCuts": 5,
                    "cutsNeeded": 8,
                    "cutsRemaining": 3
                }
            }
        ]
    };

    // Função para buscar o cliente
    function fetchClientById(clientId) {
        return database.clients.find(client => client.id === clientId);
    }

    // Atualiza a interface com os dados do cliente
    function updateClientInfo(client) {
        if (!client) {
            alert("Cliente não encontrado!");
            return;
        }

        // Atualiza os dados no HTML
        document.querySelector("#customer .name h1").innerText = client.name;
        document.querySelector("#customer .customer-since h2").innerText = `Cliente desde ${client.clientSince}`;
        
        const historyContainer = document.querySelector(".history-tickets .items");
        historyContainer.innerHTML = ""; // Limpa o histórico anterior

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
        console.log(`/public/images/users/${client.imageProfile}`)
        document.querySelector(".customer .image img").src=`/public/images/users/${client.imageProfile}`
        if(client.loyaltyCard.totalCuts < 10){
            document.querySelector(".cuts-remain .side-side #range").value=client.loyaltyCard.totalCuts;
        }
        if(client.loyaltyCard.cutsRemaining != 0){
            document.querySelector(".cuts-remain .remain").innerHTML = `<b>${client.loyaltyCard.cutsRemaining}</b> cortes restantes`
        }else{
            document.querySelector(".cuts-remain .remain").innerHTML = `<b>Resgate seu prêmio</b>`;
        }
        document.querySelector(".cuts-remain .side-side span").innerHTML= `${client.loyaltyCard.totalCuts} de ${client.loyaltyCard.cutsNeeded}`;


        // Atualiza os tickets acumulados
        const ticketsContainer = document.querySelector(".accumulated-cards .tickets-grid");
        ticketsContainer.innerHTML = ""; // Limpa os tickets anteriores

        // Adiciona os tickets de cortes utilizados
        for (let i = 0; i < client.loyaltyCard.totalCuts; i++) {
            const ticket = document.createElement("div");
            ticket.className = "ticket";
            ticket.innerHTML = `<img src="public/images/check.png" alt="check">`;
            ticketsContainer.appendChild(ticket);
        }

        // Calcula quantos cortes ainda estão restantes
        const cutsRemaining = client.loyaltyCard.cutsRemaining - 1 ;

        // Adiciona os tickets de cortes restantes (não utilizados)
        for (let i = 0; i < cutsRemaining; i++) {
            const ticket = document.createElement("div");
            ticket.className = "ticket";
            ticket.innerHTML = `<div></div>`; // Espaço vazio para tickets não usados
            ticketsContainer.appendChild(ticket);
        }

        // Adiciona o ícone de presente apenas se houver cortes restantes

        if (client.loyaltyCard.totalCuts < client.loyaltyCard.cutsNeeded) {
            const giftIcon = document.createElement("div");
            giftIcon.className = "ticket";
            giftIcon.innerHTML = `<img src="public/images/gift.png" alt="Gift Icon">`; // Substitua pelo caminho correto da imagem do ícone de presente
            ticketsContainer.appendChild(giftIcon);
        }
        




    }

    // Adiciona um evento ao input para capturar o ID
    document.querySelector(".insert-fidelity-card input").addEventListener("keyup", function(event) {
        if (event.key === "Enter") { // Verifica se a tecla Enter foi pressionada
            const clientId = this.value.trim();
            const client = fetchClientById(clientId);
            updateClientInfo(client);
        }
    });
