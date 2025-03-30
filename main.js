import { games, servers } from './config.js';

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    card.innerHTML = `
        <h3 class="game-title">${game.title}</h3>
        <p>${game.description}</p>
        <a href="${game.link}" class="minecraft-button">
            <span class="button-content">Play Now</span>
        </a>
    `;
    
    return card;
}

function createServerCard(server) {
    const card = document.createElement('div');
    card.className = 'server-card';
    
    card.innerHTML = `
        <h3 class="server-name">${server.name}</h3>
        <div class="server-info">
            <div class="address-label">Eaglercraft Address:</div>
            <div class="server-address">${server.address}</div>
            <div class="address-label">Java Address:</div>
            <div class="server-address java-address">${server.javaAddress}</div>
        </div>
        <div class="server-version">Version: ${server.version}</div>
        <p class="server-description">${server.description}</p>
    `;
    
    return card;
}

function initializeGames() {
    const gameGrid = document.getElementById('gameGrid');
    games.forEach(game => {
        gameGrid.appendChild(createGameCard(game));
    });
}

function initializeServers() {
    const serverGrid = document.getElementById('serverGrid');
    const showMoreButton = document.getElementById('showMoreServers');
    let visibleServers = 6; // Initial number of visible servers

    function updateServerDisplay() {
        serverGrid.innerHTML = ''; // Clear current servers
        const serversToShow = servers.slice(0, visibleServers);
        serversToShow.forEach(server => {
            serverGrid.appendChild(createServerCard(server));
        });

        // Hide button if all servers are shown
        if (visibleServers >= servers.length) {
            showMoreButton.style.display = 'none';
        }
    }

    showMoreButton.addEventListener('click', () => {
        visibleServers += 6; // Show 6 more servers
        updateServerDisplay();
    });

    updateServerDisplay(); // Initial display
}

function setupFileRunner() {
    const fileInput = document.getElementById('fileInput');
    const selectedFileName = document.getElementById('selectedFileName');
    const runButton = document.getElementById('runButton');

    function showAd() {
        const adContainer = document.createElement('div');
        adContainer.className = 'ad-popup';
        adContainer.innerHTML = `
            <div class="ad-content">
                <h3>Check Out My Other Projects!</h3>
                <p>Visit my GitHub for more awesome projects:</p>
                <a href="https://github.com/WindowsXpguy" target="_blank" class="minecraft-button">
                    <span class="button-content">My GitHub</span>
                </a>
                <p>Featured Project:</p>
                <a href="https://github.com/WindowsXpguy/Chrome-exploits" target="_blank" class="minecraft-button">
                    <span class="button-content">Chrome Exploits</span>
                </a>
                <div class="timer">Closing in <span id="countdown">10</span>s</div>
                <button class="close-ad">Skip</button>
            </div>
        `;
        document.body.appendChild(adContainer);

        let timeLeft = 10;
        const countdownElement = adContainer.querySelector('#countdown');
        const closeButton = adContainer.querySelector('.close-ad');
        
        const timer = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft;
            
            if (timeLeft <= 5) {
                closeButton.classList.add('active');
                closeButton.addEventListener('click', () => {
                    clearInterval(timer);
                    document.body.removeChild(adContainer);
                    fileInput.click();
                });
            }
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                document.body.removeChild(adContainer);
                fileInput.click();
            }
        }, 1000);
    }

    const fileLabel = document.querySelector('.file-label');
    fileLabel.addEventListener('click', (e) => {
        e.preventDefault();
        showAd();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFileName.textContent = file.name;
            runButton.style.display = 'inline-block';
        }
    });

    runButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const htmlContent = e.target.result;
                const newWindow = window.open('about:blank', '_blank');
                if (newWindow) {
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                } else {
                    alert('Please allow pop-ups to run the HTML file.');
                }
            };
            reader.readAsText(file);
        }
    });
}

const ads = [
    {
        title: "Try EaglercraftX",
        description: "Play Minecraft 1.8.8 directly in your browser! No downloads needed.",
        link: "https://eaglercraft.net/",
        buttonText: "Play Now"
    },
    {
        title: "Check Out My GitHub",
        description: "Discover more awesome projects and tools!",
        link: "https://github.com/WindowsXpguy",
        buttonText: "Visit GitHub"
    },
    {
        title: "Chrome Exploits",
        description: "Interested in web security? Check out my Chrome exploits project!",
        link: "https://github.com/WindowsXpguy/Chrome-exploits",
        buttonText: "Learn More"
    },
    {
        title: "Download Eaglercraft 1.12",
        description: "Get the latest version of Eaglercraft for an enhanced experience!",
        link: "https://bafybeibvnsnqkki3ignwts6v65llluyl5cspcveuwc43oholesyswphfou.ipfs.dweb.link/?filename=Eaglercraft_1.12_WASM_Offline_Download.zip",
        buttonText: "Download Now"
    }
];

function showRotatingAd() {
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-popup';
    adContainer.innerHTML = `
        <div class="ad-content rotating-ad">
            <h3>${randomAd.title}</h3>
            <p>${randomAd.description}</p>
            <a href="${randomAd.link}" target="_blank" class="minecraft-button">
                <span class="button-content">${randomAd.buttonText}</span>
            </a>
            <div class="timer">Closing in <span id="countdown">5</span>s</div>
            <button class="close-ad active">Close</button>
        </div>
    `;
    
    document.body.appendChild(adContainer);

    let timeLeft = 5;
    const countdownElement = adContainer.querySelector('#countdown');
    const closeButton = adContainer.querySelector('.close-ad');
    
    closeButton.addEventListener('click', () => {
        document.body.removeChild(adContainer);
    });

    const timer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (document.body.contains(adContainer)) {
                document.body.removeChild(adContainer);
            }
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGames();
    initializeServers();
    setupFileRunner();
    
    // Start showing rotating ads every 15 seconds
    setInterval(showRotatingAd, 15000);
});