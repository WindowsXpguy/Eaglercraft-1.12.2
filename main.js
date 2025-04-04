function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
}

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

function showMathVerification(callback) {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    
    let correctAnswer;
    switch(operation) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
    }

    const adContainer = document.createElement('div');
    adContainer.className = 'ad-popup';
    adContainer.innerHTML = `
        <div class="ad-content">
            <h3>Verify You're Human</h3>
            <p>Please solve this math problem:</p>
            <p class="math-question">${num1} ${operation} ${num2} = ?</p>
            <input type="number" id="mathAnswer" class="minecraft-input" placeholder="Enter your answer">
            <button class="minecraft-button" id="checkAnswer">
                <span class="button-content">Submit Answer</span>
            </button>
        </div>
    `;
    document.body.appendChild(adContainer);

    const checkButton = adContainer.querySelector('#checkAnswer');
    const answerInput = adContainer.querySelector('#mathAnswer');

    checkButton.addEventListener('click', () => {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === correctAnswer) {
            document.body.removeChild(adContainer);
            callback();
        } else {
            alert('Incorrect answer. Please try again!');
            answerInput.value = '';
        }
    });
}

function setupFileRunner() {
    const fileInput = document.getElementById('fileInput');
    const selectedFileName = document.getElementById('selectedFileName');
    const runButton = document.getElementById('runButton');
    let lastRunTime = 0;
    const cooldownTime = 20 * 60 * 1000; // 20 minutes in milliseconds

    function showIframeContainer(htmlContent) {
        const container = document.createElement('div');
        container.className = 'iframe-container';
        container.innerHTML = `
            <div class="iframe-content">
                <h3>Running HTML File</h3>
                <div class="timer">Time remaining: <span id="iframe-countdown">16:00</span></div>
                <div class="preview-area">
                    <div class="fullscreen-controls">
                        <button id="fullscreenButton" class="minecraft-button">
                            <span class="button-content">Toggle Fullscreen</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        const previewArea = container.querySelector('.preview-area');
        const countdownElement = container.querySelector('#iframe-countdown');
        const fullscreenButton = container.querySelector('#fullscreenButton');
        
        // Create sandbox iframe
        const iframe = document.createElement('iframe');
        iframe.sandbox = 'allow-scripts allow-same-origin';
        iframe.srcdoc = htmlContent;
        previewArea.appendChild(iframe);

        // Fullscreen handling
        fullscreenButton.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                iframe.requestFullscreen().catch(err => {
                    console.error('Error attempting to enable fullscreen:', err);
                });
            }
        });

        let timeLeft = 16 * 60; // 16 minutes in seconds
        const timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                document.body.removeChild(container);
                alert('Preview time expired. Please wait 20 minutes before trying again.');
                lastRunTime = Date.now();
            }
        }, 1000);
    }

    const fileLabel = document.querySelector('.file-label');
    fileLabel.addEventListener('click', (e) => {
        e.preventDefault();
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
                    showMathVerification(() => fileInput.click());
                });
            }
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                document.body.removeChild(adContainer);
                showMathVerification(() => fileInput.click());
            }
        }, 1000);
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFileName.textContent = file.name;
            runButton.style.display = 'inline-block';
        }
    });

    runButton.addEventListener('click', () => {
        const currentTime = Date.now();
        if (currentTime - lastRunTime < cooldownTime) {
            const waitMinutes = Math.ceil((cooldownTime - (currentTime - lastRunTime)) / 60000);
            alert(`Please wait ${waitMinutes} minutes before trying again.`);
            return;
        }

        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const htmlContent = e.target.result;
                showMathVerification(() => showIframeContainer(htmlContent));
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
    setInterval(showRotatingAd, 15000);
});