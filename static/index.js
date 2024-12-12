// Variáveis globais
let clicks = 0;
let clicksPerClick = 1;
let autoClickerActive = false;
let autoClickerInterval;
let isMusicPlaying = false;
let upgradePrice = 10;
let probability = 0.3;
let autoClickerPrice = 50;
let accelerateLifePrice = 5000;
let camouflagePrice = 80;
let rapidEvolutionPrice = 100;
let clickSound = new Audio('./click.ogg');
let moscas = 0;
let moscasPerSpawn = 1;
let jumpMultiplier = 3; // Multiplicador para Pulo Múltiplo

// Variáveis para a barra de progresso
let touchTriggered = false;
const progressDuration = 10000; // Duração da barra de progresso (10s)
let researchStartTime;
let isResearchActive = false;
let remainingTime = progressDuration; // Tempo restante na pesquisa

// Elementos do DOM
const elements = {
    counter: document.getElementById('counter'),
    clickImage: document.getElementById('click-image'),
    upgrade1Button: document.getElementById('buy-upgrade-1'),
    autoClickerButton: document.getElementById('buy-auto-clicker'),
    accelerateLifeButton: document.getElementById('buy-ciclo-vida'),
    buyMoreFliesButton: document.getElementById('buy-mais-mosca'),
    progressBarAccelerateLife: document.getElementById('progress-bar'),
    progressBarMoreFlies: document.getElementById('progress-bar-mais-mosca'),
    musicButton: document.getElementById('toggle-music'),
    backgroundMusic: document.getElementById('background-music'),
    modal: document.getElementById("shop-modal"),
    openShopButton: document.getElementById('open-shop-button'),
    closeModalButton: document.querySelector('.close'),
    fliesDisplay: document.getElementById('display-number'),
    progressContainer: document.getElementById('progress-container'),
    progressContainerMoreFlies: document.getElementById('progress-container-mais-mosca'),
    sapofanfaraoupdatebutton: document.getElementById('buy-fanfarra'),
    sapocafe: document.getElementById('buy-sapo-cafe'),
    sapopulomultiplo: document.getElementById('buy-pulo-multiplo'),
};

// Função para tocar o som dos cliques
const playClickSound = () => {
    clickSound.play();
};

// Eventos de clique
document.addEventListener('click', playClickSound);
document.addEventListener('touchstart', playClickSound);

// Função de animação do sapo
const animateFrog = (timer) => {
    let angle = 0;
    const animation = setInterval(() => {
        clickImage.style.transform = `rotate(${angle}deg)`;
        angle = angle >= 20 ? angle - 20 : angle + 20;
    }, 100);

    setTimeout(() => {
        clearInterval(animation);
        clickImage.style.transform = `rotate(0deg)`;
    }, timer);
};

// Função para formatar o contador
const formatCounter = (count) => {
    if (count < 1000) return count.toString();
    const suffixes = ["", "K", "M", "B", "T", "Qd", "Qt"];
    const index = Math.floor(Math.log10(Math.abs(count)) / 3);
    if (index >= suffixes.length) {
        return (count / Math.pow(1000, suffixes.length - 1)).toFixed(2) + suffixes[suffixes.length - 1] + "+";
    }
    return (count / Math.pow(1000, index)).toFixed(2) + suffixes[index];
};

// Atualiza o contador de cliques
const updateCounter = () => {
    elements.counter.textContent = formatCounter(clicks);
    elements.fliesDisplay.textContent = moscas;
};

// Função para lidar com o clique ou toque
const handleClick = (event) => {
    if (touchTriggered && event.type === 'click') return;

    clicks += clicksPerClick;
    showClickAnimation(event);
    updateCounter();
    checkShopAvailability();

    if (event.type === 'touchstart') {
        touchTriggered = true;
        setTimeout(() => touchTriggered = false, 1000);
    }
};

// Exibe a animação de "+1"
const showClickAnimation = (event) => {
    const plusOne = document.createElement('div');
    plusOne.textContent = `+${clicksPerClick}`;
    plusOne.classList.add('plus-one');

    const { pageX: x, pageY: y } = event.touches ? event.touches[0] : event;
    plusOne.style.left = `${x}px`;
    plusOne.style.top = `${y}px`;
    document.body.appendChild(plusOne);

    setTimeout(() => plusOne.remove(), 1000);
};

// Checa se os itens da loja estão disponíveis para compra
const checkShopAvailability = () => {
    elements.upgrade1Button.disabled = clicks < upgradePrice;
    elements.autoClickerButton.disabled = clicks < autoClickerPrice;
    elements.accelerateLifeButton.disabled = clicks < accelerateLifePrice;
    elements.buyMoreFliesButton.disabled = clicks < 100000;
    elements.sapofanfaraoupdatebutton.disabled = moscas < 2;
    elements.sapocafe.disabled = moscas < 1;
    elements.sapopulomultiplo.disabled = moscas < 5;
};

// Funções de compra
const buyUpgrade = () => {
    if (clicks >= upgradePrice) {
        clicks -= upgradePrice;
        clicksPerClick += 1;
        upgradePrice = Math.floor(upgradePrice * 1.5);
        elements.upgrade1Button.textContent = `Comprar por ${formatCounter(upgradePrice)} cliques`;
        updateCounter();
        checkShopAvailability();
    }
};

const buyAutoClicker = () => {
    if (clicks >= autoClickerPrice) {
        clicks -= autoClickerPrice;
        autoClickerActive = true;
        autoClickerPrice = Math.floor(autoClickerPrice * 1.5);
        elements.autoClickerButton.textContent = `Comprar por ${formatCounter(autoClickerPrice)} cliques`;
        updateCounter();
        checkShopAvailability();

        autoClickerInterval = setInterval(() => {
            clicks += 1;
            updateCounter();
        }, 1000);
    }
};

const buyJumpUpgrade = () => {
    if (moscas >= 5) {
        moscas -= 5;
        clicksPerClick *= 2;
        updateCounter();
        checkShopAvailability();
    }
};

const buyCoffeeFrog = () => {
    if (moscas >= 1) {
        moscas -= 1;
        clicksPerClick *= 3;
        setTimeout(() => {
            clicksPerClick /= 3;
        }, 6000);
        updateCounter();
        checkShopAvailability();
    }
};

const buyCamouflage = () => {
    if (clicks >= camouflagePrice) {
        clicks -= camouflagePrice;
        camouflagePrice = Math.floor(camouflagePrice * 1.5);
        updateCounter();
        checkShopAvailability();
    }
};

const buyBoastfulFrog = () => {
    if (moscas >= 2) {
        moscas -= 2;
        clicksPerClick *= 4;
        animateFrog(20000);
        setTimeout(() => {
            clicksPerClick /= 4;
        }, 20000);
        updateCounter();
        checkShopAvailability();
    }
};

const buyRapidEvolution = () => {
    if (clicks >= rapidEvolutionPrice) {
        clicks -= rapidEvolutionPrice;
        rapidEvolutionPrice = Math.floor(rapidEvolutionPrice * 1.5);
        updateCounter();
        checkShopAvailability();
    }
};

// Função para iniciar a barra de progresso
const startProgressBar = (duration, progressBar) => {
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = '100%';

    if (!isResearchActive) {
        researchStartTime = Date.now();
        isResearchActive = true;
    }

    const elapsedTime = Date.now() - researchStartTime;
    remainingTime = Math.max(duration - elapsedTime, 0);

    if (remainingTime > 0) {
        progressBar.style.transition = 'none';
        progressBar.style.width = `${(elapsedTime / duration) * 100}%`;

        setTimeout(() => {
            progressBar.style.transition = `width ${remainingTime}ms linear`;
            progressBar.style.width = '100%';
        }, 10);

        setTimeout(() => {
            isResearchActive = false;
            progressBar.style.display = 'none';
        }, remainingTime);
    }
};

// Função para comprar Acelerar Vida
const buyAccelerateLife = () => {
    if (clicks >= accelerateLifePrice && !isResearchActive) {
        clicks -= accelerateLifePrice;
        elements.accelerateLifeButton.style.display = "none";
        elements.progressContainer.style.display = "block";
        startProgressBar(progressDuration, elements.progressBarAccelerateLife);
        updateCounter();
        checkShopAvailability();
        setTimeout(() => {
            document.getElementById("CicloVidaUpdate").style.display = "none";
            probability += 0.3;
        }, progressDuration);
        
    }
};

// Função para comprar Mais Moscas
const buyMoreFlies = () => {
    if (clicks >= 10000 && !isResearchActive) {
        clicks -= 10000;
        elements.buyMoreFliesButton.style.display = "none";
        elements.progressContainerMoreFlies.style.display = "block";
        startProgressBar(60000, elements.progressBarMoreFlies);
        updateCounter();
        checkShopAvailability();
        setTimeout(() => {
            elements.buyMoreFliesButton.style.display = "block";
            elements.progressContainerMoreFlies.style.display = "none";
            moscasPerSpawn += 1;
        }, 60000);
    }
};

// Função para alternar a música de fundo
document.addEventListener('DOMContentLoaded', () => {
    const musicIcon = document.getElementById('music-icon');

    elements.musicButton.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying; // Alterna o estado da música
        if (isMusicPlaying) {
            elements.backgroundMusic.play().catch(error => {
                console.log('Reprodução bloqueada até interação do usuário: ', error);
            });
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        } else {
            elements.backgroundMusic.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        }
    });
});


// Função para abrir/fechar a loja
const toggleShop = () => {
    elements.modal.style.display = elements.modal.style.display === "none" || !elements.modal.style.display ? "block" : "none";
};

function openTab(evt, tabName) {
    // Esconder todas as abas
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";  
    }

    // Remover a classe "active" de todos os botões de aba
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar a aba atual e adicionar uma classe "active" ao botão que abriu a aba
    document.getElementById(tabName).style.display = "block";  
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function() {
    // Defina a função openTab aqui
    function openTab(evt, tabName) {
        let tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";  
        }

        let tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(tabName).style.display = "block";  
        evt.currentTarget.className += " active";
    }
});

const createFly = () => {
    const fly = document.createElement('div'); 
    fly.classList.add('fly');
    document.body.appendChild(fly);
    
    // Adiciona o evento de clique à nova mosca
    fly.addEventListener('click', () => {
        moscas += 1;
        updateCounter();
        fly.remove(); // Remove a mosca clicada
    });

    return fly;
};

const getRandomPosition = () => {
    const x = window.innerWidth - 50; // Largura da janela - largura da mosca
    const y = window.innerHeight - 50; // Altura da janela - altura da mosca
    return {
        x: Math.random() * x,
        y: Math.random() * y,
    };
};


const showFly = () => {
    const fly = createFly(); // Cria uma nova mosca
    const { x, y } = getRandomPosition();

    fly.style.position = 'absolute'; // Define a posição como absoluta para que possa ser movida
    fly.style.left = `${x}px`;
    fly.style.top = `${y}px`;
    fly.style.display = 'block'; // Mostra a mosca

    let angle = 0;
    const animation = setInterval(() => {
        angle += 5; // Aumenta o ângulo para simular rotação
        fly.style.transform = `rotate(${angle}deg)`; // Corrige a interpolação de strings

        const newPos = getRandomPosition();
        fly.style.left = `${newPos.x}px`; // Corrige a interpolação de strings
        fly.style.top = `${newPos.y}px`; // Corrige a interpolação de strings
    }, 200); // Atualiza a posição a cada 200ms

    // Remove a mosca após 5 segundos
    setTimeout(() => {
        clearInterval(animation);
        fly.remove(); // Remove a mosca da tela
    }, 5000);
};


const createMultipleFlies = (numFlies) => {
    for (let i = 0; i < numFlies; i++) {
        showFly(); 
    }
};

const TrySpawnMosca = () => {
    // Gerar um número de moscas baseado na probabilidade
    const randomValue = Math.random(); // Gera um número aleatório entre 0 e 1
    if (randomValue < probability) { // Verifica se o número aleatório é menor que a probabilidade
        const numFliesToSpawn = Math.floor(moscasPerSpawn * Math.random() * 5) + 1; // Gera de 1 a moscasPerSpawn * 5
        createMultipleFlies(numFliesToSpawn); // Cria as moscas
    }
};


// Exibe o pop-up quando a página é carregada
window.onload = function() {
    document.getElementById('tutorialPopup').style.display = 'flex';
  }
  
  // Função para fechar o pop-up
  function closePopup() {
    document.getElementById('tutorialPopup').style.display = 'none';
  }
  

// Controla o evento de spawn das moscas
setInterval(TrySpawnMosca, 180000);

const chatWindow = document.getElementById('chat-window');
const openChatButton = document.getElementById('open-chat-button');
const chatMessages = document.getElementById('chat-messages');
const chatInputBox = document.getElementById('chat-input-box');
const sendChatButton = document.getElementById('send-chat-button');

document.getElementById("open-chat-button").addEventListener("click", function() {
    window.location.href = "/home/mei/sapoPlus/html.html";
});


// Eventos
elements.upgrade1Button.addEventListener('click', buyUpgrade);
elements.autoClickerButton.addEventListener('click', buyAutoClicker);
elements.accelerateLifeButton.addEventListener('click', buyAccelerateLife);
elements.buyMoreFliesButton.addEventListener('click', buyMoreFlies);
elements.sapofanfaraoupdatebutton.addEventListener('click', buyBoastfulFrog);
elements.openShopButton.addEventListener('click', toggleShop);
elements.closeModalButton.addEventListener('click', toggleShop);
elements.sapocafe.addEventListener('click', buyCoffeeFrog);
elements.sapopulomultiplo.addEventListener('click', buyJumpUpgrade)
document.getElementById('click-image').addEventListener('click', handleClick);
