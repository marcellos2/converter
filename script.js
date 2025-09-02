// Carregar item do histórico
function loadHistoryItem(index) {
    try {
        if (index < 0 || index >= conversionHistory.length) {
            showNotification('Item do histórico não encontrado', true);
            return;
        }
        
        const conversion = conversionHistory[index];
        const categorySelect = document.getElementById('category');
        
        if (!categorySelect) return;
        
        categorySelect.value = conversion.category;
        currentCategory = conversion.category;
        
        populateUnitDropdowns();
        
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const fromValueInput = document.getElementById('fromValue');
        const precisionSelect = document.getElementById('precision');
        
        if (fromUnitSelect && toUnitSelect && fromValueInput && precisionSelect) {
            fromUnitSelect.value = conversion.fromUnit;
            toUnitSelect.value = conversion.toUnit;
            fromValueInput.value = conversion.fromValue;
            precisionSelect.value = conversion.precision;
            
            currentFromUnit = conversion.fromUnit;
            currentToUnit = conversion.toUnit;
            
            updateConversion();
            updateFormula();
            updateFavoritesButton();
            updateQuickResults();
        }
        
        toggleHistory();
        showNotification('Conversão carregada do histórico!');
    } catch (error) {
        console.error('Erro ao carregar item do histórico:', error);
        showNotification('Erro ao carregar do histórico', true);
    }
}

// Atualizar totais de conversões
function updateTotalConversions() {
    try {
        totalConversions = conversionHistory.length;
        const totalElement = document.getElementById('totalConversions');
        if (totalElement) {
            totalElement.textContent = totalConversions;
        }
    } catch (error) {
        console.error('Erro ao atualizar total de conversões:', error);
    }
}

// Atualizar resultados rápidos
function updateQuickResults() {
    try {
        const quickResults = document.getElementById('quickResults');
        const fromValueInput = document.getElementById('fromValue');
        
        if (!quickResults || !fromValueInput) return;
        
        const category = units[currentCategory];
        if (!category) return;
        
        quickResults.innerHTML = '';
        
        const fromValue = parseFloat(fromValueInput.value) || 1;
        if (fromValue === 0) return;
        
        // Obter até 6 unidades diferentes para mostrar
        const unitKeys = Object.keys(category.units);
        const quickUnits = unitKeys.filter(unit => unit !== currentToUnit).slice(0, 6);
        
        quickUnits.forEach(unit => {
            const result = convertUnit(fromValue, currentCategory, currentFromUnit, unit);
            if (result === null || !isFinite(result)) return;
            
            const precision = parseInt(document.getElementById('precision').value) || 6;
            
            const quickItem = document.createElement('div');
            quickItem.className = 'quick-item';
            quickItem.innerHTML = `
                <div class="quick-value">${formatNumber(result, precision)}</div>
                <div class="quick-unit">${category.units[unit].name}</div>
            `;
            
            quickItem.addEventListener('click', () => {
                try {
                    const toUnitSelect = document.getElementById('toUnit');
                    if (toUnitSelect) {
                        toUnitSelect.value = unit;
                        currentToUnit = unit;
                        updateConversion();
                        updateFormula();
                        updateFavoritesButton();
                        showNotification(`Unidade alterada para ${category.units[unit].name}`);
                    }
                } catch (error) {
                    console.error('Erro ao selecionar resultado rápido:', error);
                }
            });
            
            quickResults.appendChild(quickItem);
        });
    } catch (error) {
        console.error('Erro ao atualizar resultados rápidos:', error);
    }
}

// Copiar resultado
function copyResult() {
    try {
        const resultInput = document.getElementById('toValue');
        if (!resultInput || !resultInput.value) {
            showNotification('Nenhum resultado para copiar', true);
            return;
        }
        
        // Tentar usar a API moderna primeiro
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(resultInput.value).then(() => {
                showNotification('Resultado copiado para a área de transferência!');
            }).catch(() => {
                // Fallback para método antigo
                fallbackCopy(resultInput);
            });
        } else {
            // Fallback para método antigo
            fallbackCopy(resultInput);
        }
    } catch (error) {
        console.error('Erro ao copiar resultado:', error);
        showNotification('Erro ao copiar resultado', true);
    }
}

// Método fallback para copiar texto
function fallbackCopy(input) {
    try {
        input.select();
        input.setSelectionRange(0, 99999); // Para mobile
        const successful = document.execCommand('copy');
        
        if (successful) {
            showNotification('Resultado copiado para a área de transferência!');
        } else {
            showNotification('Erro ao copiar resultado', true);
        }
    } catch (error) {
        console.error('Erro no fallback de cópia:', error);
        showNotification('Erro ao copiar resultado', true);
    }
}

// Alternar painel de histórico
function toggleHistory() {
    try {
        const historyPanel = document.getElementById('historyPanel');
        const favoritesPanel = document.getElementById('favoritesPanel');
        
        if (!historyPanel) return;
        
        if (historyPanel.classList.contains('open')) {
            historyPanel.classList.remove('open');
        } else {
            historyPanel.classList.add('open');
            if (favoritesPanel) {
                favoritesPanel.classList.remove('open');
            }
            updateHistoryDisplay();
        }
    } catch (error) {
        console.error('Erro ao alternar histórico:', error);
    }
}

// Alternar painel de favoritos
function toggleFavorites() {
    try {
        const historyPanel = document.getElementById('historyPanel');
        const favoritesPanel = document.getElementById('favoritesPanel');
        
        if (!favoritesPanel) return;
        
        if (favoritesPanel.classList.contains('open')) {
            favoritesPanel.classList.remove('open');
        } else {
            favoritesPanel.classList.add('open');
            if (historyPanel) {
                historyPanel.classList.remove('open');
            }
            updateFavoritesDisplay();
        }
    } catch (error) {
        console.error('Erro ao alternar favoritos:', error);
    }
}

// Atualizar exibição de favoritos
function updateFavoritesDisplay() {
    try {
        const favoritesList = document.getElementById('favoritesList');
        if (!favoritesList) return;
        
        if (favorites.length === 0) {
            favoritesList.innerHTML = '<div class="no-favorites">Nenhuma conversão favorita</div>';
            return;
        }
        
        favoritesList.innerHTML = '';
        
        favorites.forEach((favoriteKey, index) => {
            const [categoryKey, fromUnitKey, toUnitKey] = favoriteKey.split(':');
            const category = units[categoryKey];
            
            if (!category || !category.units[fromUnitKey] || !category.units[toUnitKey]) {
                return;
            }
            
            const fromUnitName = category.units[fromUnitKey].name;
            const toUnitName = category.units[toUnitKey].name;
            
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            
            favoriteItem.innerHTML = `
                <div class="favorite-content">
                    <div class="favorite-title">${category.name}</div>
                    <div class="favorite-values">${fromUnitName} → ${toUnitName}</div>
                </div>
                <div class="favorite-actions">
                    <button class="favorite-action-btn" onclick="loadFavorite('${categoryKey}', '${fromUnitKey}', '${toUnitKey}')" title="Carregar esta conversão">
                        ↻
                    </button>
                    <button class="favorite-action-btn" onclick="removeFavorite(${index})" title="Remover dos favoritos">
                        ×
                    </button>
                </div>
            `;
            
            favoritesList.appendChild(favoriteItem);
        });
    } catch (error) {
        console.error('Erro ao atualizar favoritos:', error);
    }
}

// Carregar favorito
function loadFavorite(categoryKey, fromUnitKey, toUnitKey) {
    try {
        const categorySelect = document.getElementById('category');
        if (!categorySelect) return;
        
        categorySelect.value = categoryKey;
        currentCategory = categoryKey;
        
        populateUnitDropdowns();
        
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const fromValueInput = document.getElementById('fromValue');
        
        if (fromUnitSelect && toUnitSelect && fromValueInput) {
            fromUnitSelect.value = fromUnitKey;
            toUnitSelect.value = toUnitKey;
            fromValueInput.value = 1;
            
            currentFromUnit = fromUnitKey;
            currentToUnit = toUnitKey;
            
            updateConversion();
            updateFormula();
            updateFavoritesButton();
            updateQuickResults();
        }
        
        toggleFavorites();
        showNotification('Conversão favorita carregada!');
    } catch (error) {
        console.error('Erro ao carregar favorito:', error);
        showNotification('Erro ao carregar favorito', true);
    }
}

// Remover favorito
function removeFavorite(index) {
    try {
        if (index < 0 || index >= favorites.length) {
            showNotification('Favorito não encontrado', true);
            return;
        }
        
        favorites.splice(index, 1);
        saveUserData();
        updateFavoritesDisplay();
        updateFavoritesButton();
        showNotification('Favorito removido!');
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        showNotification('Erro ao remover favorito', true);
    }
}

// Definir modo de exibição
function setDisplayMode(mode) {
    try {
        currentDisplayMode = mode;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const selectedButton = document.querySelector(`.mode-btn[data-mode="${mode}"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
        }
        
        const calculatorPanel = document.querySelector('.calculator-panel');
        if (calculatorPanel) {
            if (mode === 'scientific') {
                calculatorPanel.style.display = 'block';
            } else {
                calculatorPanel.style.display = 'none';
            }
        }
        
        saveUserData();
        showNotification(`Modo ${mode === 'scientific' ? 'científico' : 'padrão'} ativado`);
    } catch (error) {
        console.error('Erro ao definir modo de exibição:', error);
    }
}

// Funções da calculadora
function appendToCalc(value) {
    try {
        const display = document.getElementById('calcDisplay');
        if (display) {
            display.value += value;
        }
    } catch (error) {
        console.error('Erro ao adicionar à calculadora:', error);
    }
}

function appendFunction(func) {
    try {
        const display = document.getElementById('calcDisplay');
        if (display) {
            display.value += func;
        }
    } catch (error) {
        console.error('Erro ao adicionar função:', error);
    }
}

function clearCalc() {
    try {
        const display = document.getElementById('calcDisplay');
        if (display) {
            display.value = '';
        }
    } catch (error) {
        console.error('Erro ao limpar calculadora:', error);
    }
}

function deleteLast() {
    try {
        const display = document.getElementById('calcDisplay');
        if (display) {
            display.value = display.value.slice(0, -1);
        }
    } catch (error) {
        console.error('Erro ao deletar último caractere:', error);
    }
}

function calculate() {
    try {
        const display = document.getElementById('calcDisplay');
        if (!display) return;
        
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        
        // Validar expressão básica para segurança
        if (!/^[0-9+\-*/.()Math.sincotagloqrtpowPIE\s]*$/.test(expression)) {
            display.value = 'Erro: Expressão inválida';
            return;
        }
        
        // Avaliar a expressão com segurança
        try {
            const result = Function('"use strict"; return (' + expression + ')')();
            
            if (isNaN(result) || !isFinite(result)) {
                display.value = 'Erro';
            } else {
                display.value = result.toString();
            }
        } catch (evalError) {
            display.value = 'Erro';
        }
    } catch (error) {
        console.error('Erro no cálculo:', error);
        const display = document.getElementById('calcDisplay');
        if (display) {
            display.value = 'Erro';
        }
    }
}

// Salvar dados do usuário no localStorage
function saveUserData() {
    try {
        const userData = {
            history: conversionHistory.slice(0, 50), // Limitar tamanho
            favorites: favorites,
            totalConversions: totalConversions,
            displayMode: currentDisplayMode,
            lastCategory: currentCategory,
            timestamp: Date.now()
        };
        
        localStorage.setItem('converterData', JSON.stringify(userData));
    } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
        // Se localStorage estiver cheio ou indisponível
        showNotification('Erro ao salvar configurações', true);
    }
}

// Carregar dados do usuário do localStorage
function loadUserData() {
    try {
        const savedData = localStorage.getItem('converterData');
        
        if (savedData) {
            const userData = JSON.parse(savedData);
            
            // Validar dados carregados
            if (userData.history && Array.isArray(userData.history)) {
                conversionHistory = userData.history.filter(item => 
                    item && typeof item === 'object' && item.timestamp
                );
            }
            
            if (userData.favorites && Array.isArray(userData.favorites)) {
                favorites = userData.favorites.filter(item => 
                    typeof item === 'string' && item.includes(':')
                );
            }
            
            if (userData.totalConversions && typeof userData.totalConversions === 'number') {
                totalConversions = userData.totalConversions;
            }
            
            if (userData.displayMode && typeof userData.displayMode === 'string') {
                currentDisplayMode = userData.displayMode;
                setDisplayMode(currentDisplayMode);
            }
            
            if (userData.lastCategory && units[userData.lastCategory]) {
                currentCategory = userData.lastCategory;
                const categorySelect = document.getElementById('category');
                if (categorySelect) {
                    categorySelect.value = currentCategory;
                }
            }
            
            // Atualizar displays
            updateHistoryDisplay();
            updateFavoritesDisplay();
            updateFavoritesButton();
            updateTotalConversions();
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Se houver erro na estrutura dos dados, limpar localStorage
        localStorage.removeItem('converterData');
    }
}

// Mostrar notificação
function showNotification(message, isError = false) {
    try {
        // Remover notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = 'notification' + (isError ? ' error' : '');
        notification.textContent = message;
        
        // Adicionar ao corpo
        document.body.appendChild(notification);
        
        // Mostrar notificação com animação
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    } catch (error) {
        console.error('Erro ao mostrar notificação:', error);
    }
}

// Configurar PWA (Progressive Web App)
function setupPWA() {
    try {
        // Registrar service worker se disponível
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
        
        // Evento para instalação do PWA
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Mostrar botão de instalação
            const installButton = document.getElementById('installButton');
            if (installButton) {
                installButton.style.display = 'block';
            }
        });
        
        // Verificar se já está instalado
        window.addEventListener('appinstalled', () => {
            console.log('PWA foi instalado');
            const installButton = document.getElementById('installButton');
            if (installButton) {
                installButton.style.display = 'none';
            }
            showNotification('Aplicação instalada com sucesso!');
        });
    } catch (error) {
        console.error('Erro na configuração PWA:', error);
    }
}

// Instalar PWA
function installPWA() {
    try {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    const installButton = document.getElementById('installButton');
                    if (installButton) {
                        installButton.style.display = 'none';
                    }
                    showNotification('Instalação iniciada!');
                } else {
                    console.log('User dismissed the install prompt');
                    showNotification('Instalação cancelada');
                }
                deferredPrompt = null;
            });
        } else {
            showNotification('Instalação não disponível no momento', true);
        }
    } catch (error) {
        console.error('Erro ao instalar PWA:', error);
        showNotification('Erro na instalação', true);
    }
}

// Detectar se a aplicação está sendo executada como PWA
function isPWA() {
    return window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
}

// Função de utilidade para debug
function debugInfo() {
    console.log('Estado atual da aplicação:', {
        currentCategory,
        currentFromUnit,
        currentToUnit,
        currentDisplayMode,
        totalConversions,
        historyCount: conversionHistory.length,
        favoritesCount: favorites.length,
        isPWA: isPWA()
    });
}

// Adicionar listener para debug (apenas em desenvolvimento)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugConverter = debugInfo;
}

// Tratamento de erros global
window.addEventListener('error', function(event) {
    console.error('Erro global capturado:', event.error);
    showNotification('Ocorreu um erro inesperado', true);
});

// Tratamento de promessas rejeitadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejeitada:', event.reason);
    showNotification('Erro de processamento', true);
});

// Inicialização de emergência caso algo falhe
setTimeout(() => {
    if (!document.getElementById('fromUnit').innerHTML) {
        console.warn('Inicialização parece ter falhado, tentando novamente...');
        try {
            populateUnitDropdowns();
            updateConversion();
        } catch (error) {
            console.error('Falha na inicialização de emergência:', error);
        }
    }
}, 2000);// Definição de todas as unidades e suas conversões
const units = {
    length: {
        name: "Comprimento",
        base: "meter",
        units: {
            nanometer: { name: "Nanômetro (nm)", factor: 1e-9 },
            micrometer: { name: "Micrômetro (μm)", factor: 1e-6 },
            millimeter: { name: "Milímetro (mm)", factor: 0.001 },
            centimeter: { name: "Centímetro (cm)", factor: 0.01 },
            decimeter: { name: "Decímetro (dm)", factor: 0.1 },
            meter: { name: "Metro (m)", factor: 1 },
            dekameter: { name: "Decâmetro (dam)", factor: 10 },
            hectometer: { name: "Hectômetro (hm)", factor: 100 },
            kilometer: { name: "Quilômetro (km)", factor: 1000 },
            inch: { name: "Polegada (in)", factor: 0.0254 },
            foot: { name: "Pé (ft)", factor: 0.3048 },
            yard: { name: "Jarda (yd)", factor: 0.9144 },
            mile: { name: "Milha (mi)", factor: 1609.344 },
            nautical_mile: { name: "Milha Náutica", factor: 1852 },
            astronomical_unit: { name: "Unidade Astronômica (AU)", factor: 149597870700 },
            light_year: { name: "Ano-luz", factor: 9460730472580800 },
            parsec: { name: "Parsec (pc)", factor: 3.0857e16 }
        }
    },

    area: {
        name: "Área",
        base: "square_meter",
        units: {
            square_millimeter: { name: "Milímetro² (mm²)", factor: 1e-6 },
            square_centimeter: { name: "Centímetro² (cm²)", factor: 1e-4 },
            square_meter: { name: "Metro² (m²)", factor: 1 },
            hectare: { name: "Hectare (ha)", factor: 10000 },
            square_kilometer: { name: "Quilômetro² (km²)", factor: 1e6 },
            square_inch: { name: "Polegada² (in²)", factor: 0.00064516 },
            square_foot: { name: "Pé² (ft²)", factor: 0.092903 },
            square_yard: { name: "Jarda² (yd²)", factor: 0.836127 },
            acre: { name: "Acre", factor: 4046.86 },
            square_mile: { name: "Milha² (mi²)", factor: 2590000 }
        }
    },

    volume: {
        name: "Volume",
        base: "liter",
        units: {
            milliliter: { name: "Mililitro (ml)", factor: 0.001 },
            centiliter: { name: "Centilitro (cl)", factor: 0.01 },
            deciliter: { name: "Decilitro (dl)", factor: 0.1 },
            liter: { name: "Litro (l)", factor: 1 },
            cubic_centimeter: { name: "Centímetro³ (cm³)", factor: 0.001 },
            cubic_meter: { name: "Metro³ (m³)", factor: 1000 },
            fluid_ounce: { name: "Onça Fluida (fl oz)", factor: 0.0295735 },
            cup: { name: "Xícara (cup)", factor: 0.236588 },
            pint: { name: "Pinta (pt)", factor: 0.473176 },
            quart: { name: "Quarto (qt)", factor: 0.946353 },
            gallon: { name: "Galão (gal)", factor: 3.78541 },
            teaspoon: { name: "Colher de Chá", factor: 0.00492892 },
            tablespoon: { name: "Colher de Sopa", factor: 0.0147868 },
            barrel: { name: "Barril", factor: 158.987 }
        }
    },

    mass: {
        name: "Massa",
        base: "kilogram",
        units: {
            microgram: { name: "Micrograma (μg)", factor: 1e-9 },
            milligram: { name: "Miligrama (mg)", factor: 1e-6 },
            gram: { name: "Grama (g)", factor: 0.001 },
            kilogram: { name: "Quilograma (kg)", factor: 1 },
            metric_ton: { name: "Tonelada Métrica (t)", factor: 1000 },
            ounce: { name: "Onça (oz)", factor: 0.0283495 },
            pound: { name: "Libra (lb)", factor: 0.453592 },
            stone: { name: "Stone", factor: 6.35029 },
            short_ton: { name: "Tonelada Curta", factor: 907.185 },
            long_ton: { name: "Tonelada Longa", factor: 1016.05 },
            carat: { name: "Quilate", factor: 0.0002 },
            atomic_mass: { name: "Unidade de Massa Atômica", factor: 1.66054e-27 }
        }
    },

    temperature: {
        name: "Temperatura",
        base: "celsius",
        units: {
            celsius: { name: "Celsius (°C)" },
            fahrenheit: { name: "Fahrenheit (°F)" },
            kelvin: { name: "Kelvin (K)" },
            rankine: { name: "Rankine (°R)" },
            reaumur: { name: "Réaumur (°Ré)" }
        },
        convert: function(value, from, to) {
            if (from === to) return value;
            
            let celsius;
            switch(from) {
                case 'celsius': celsius = value; break;
                case 'fahrenheit': celsius = (value - 32) * 5/9; break;
                case 'kelvin': celsius = value - 273.15; break;
                case 'rankine': celsius = (value - 491.67) * 5/9; break;
                case 'reaumur': celsius = value * 5/4; break;
                default: return value;
            }
            
            switch(to) {
                case 'celsius': return celsius;
                case 'fahrenheit': return celsius * 9/5 + 32;
                case 'kelvin': return celsius + 273.15;
                case 'rankine': return (celsius + 273.15) * 9/5;
                case 'reaumur': return celsius * 4/5;
                default: return celsius;
            }
        }
    },

    time: {
        name: "Tempo",
        base: "second",
        units: {
            nanosecond: { name: "Nanossegundo (ns)", factor: 1e-9 },
            microsecond: { name: "Microssegundo (μs)", factor: 1e-6 },
            millisecond: { name: "Milissegundo (ms)", factor: 0.001 },
            second: { name: "Segundo (s)", factor: 1 },
            minute: { name: "Minuto (min)", factor: 60 },
            hour: { name: "Hora (h)", factor: 3600 },
            day: { name: "Dia", factor: 86400 },
            week: { name: "Semana", factor: 604800 },
            month: { name: "Mês", factor: 2629746 },
            year: { name: "Ano", factor: 31556952 },
            decade: { name: "Década", factor: 315569520 },
            century: { name: "Século", factor: 3155695200 }
        }
    },

    speed: {
        name: "Velocidade",
        base: "meter_per_second",
        units: {
            meter_per_second: { name: "Metro por Segundo (m/s)", factor: 1 },
            kilometer_per_hour: { name: "Quilômetro por Hora (km/h)", factor: 0.277778 },
            mile_per_hour: { name: "Milha por Hora (mph)", factor: 0.44704 },
            foot_per_second: { name: "Pé por Segundo (ft/s)", factor: 0.3048 },
            knot: { name: "Nó (kn)", factor: 0.514444 },
            mach: { name: "Mach", factor: 343 },
            speed_of_light: { name: "Velocidade da Luz", factor: 299792458 }
        }
    },

    acceleration: {
        name: "Aceleração",
        base: "meter_per_second_squared",
        units: {
            meter_per_second_squared: { name: "m/s²", factor: 1 },
            foot_per_second_squared: { name: "ft/s²", factor: 0.3048 },
            gal: { name: "Gal", factor: 0.01 },
            gravity: { name: "Gravidade (g)", factor: 9.80665 }
        }
    },

    force: {
        name: "Força",
        base: "newton",
        units: {
            newton: { name: "Newton (N)", factor: 1 },
            kilonewton: { name: "Quilonewton (kN)", factor: 1000 },
            dyne: { name: "Dina (dyn)", factor: 1e-5 },
            kilogram_force: { name: "Quilograma-força (kgf)", factor: 9.80665 },
            pound_force: { name: "Libra-força (lbf)", factor: 4.44822 },
            ounce_force: { name: "Onça-força (ozf)", factor: 0.278014 }
        }
    },

    pressure: {
        name: "Pressão",
        base: "pascal",
        units: {
            pascal: { name: "Pascal (Pa)", factor: 1 },
            kilopascal: { name: "Quilopascal (kPa)", factor: 1000 },
            megapascal: { name: "Megapascal (MPa)", factor: 1e6 },
            bar: { name: "Bar", factor: 1e5 },
            millibar: { name: "Milibar (mbar)", factor: 100 },
            atmosphere: { name: "Atmosfera (atm)", factor: 101325 },
            torr: { name: "Torr", factor: 133.322 },
            mmhg: { name: "mmHg", factor: 133.322 },
            psi: { name: "PSI", factor: 6894.76 }
        }
    },

    energy: {
        name: "Energia",
        base: "joule",
        units: {
            joule: { name: "Joule (J)", factor: 1 },
            kilojoule: { name: "Quilojoule (kJ)", factor: 1000 },
            calorie: { name: "Caloria (cal)", factor: 4.184 },
            kilocalorie: { name: "Quilocaloria (kcal)", factor: 4184 },
            watt_hour: { name: "Watt-hora (Wh)", factor: 3600 },
            kilowatt_hour: { name: "Quilowatt-hora (kWh)", factor: 3.6e6 },
            btu: { name: "BTU", factor: 1055.06 },
            erg: { name: "Erg", factor: 1e-7 },
            electron_volt: { name: "Elétron-volt (eV)", factor: 1.60218e-19 }
        }
    },

    power: {
        name: "Potência",
        base: "watt",
        units: {
            watt: { name: "Watt (W)", factor: 1 },
            kilowatt: { name: "Quilowatt (kW)", factor: 1000 },
            megawatt: { name: "Megawatt (MW)", factor: 1e6 },
            horsepower: { name: "Cavalo-vapor (hp)", factor: 745.7 },
            metric_horsepower: { name: "CV Métrico", factor: 735.5 },
            btu_per_hour: { name: "BTU/h", factor: 0.293071 }
        }
    },

    frequency: {
        name: "Frequência",
        base: "hertz",
        units: {
            hertz: { name: "Hertz (Hz)", factor: 1 },
            kilohertz: { name: "Quilohertz (kHz)", factor: 1000 },
            megahertz: { name: "Megahertz (MHz)", factor: 1e6 },
            gigahertz: { name: "Gigahertz (GHz)", factor: 1e9 },
            terahertz: { name: "Terahertz (THz)", factor: 1e12 },
            rpm: { name: "RPM", factor: 1/60 }
        }
    },

    electric_current: {
        name: "Corrente Elétrica",
        base: "ampere",
        units: {
            ampere: { name: "Ampère (A)", factor: 1 },
            milliampere: { name: "Miliampère (mA)", factor: 0.001 },
            microampere: { name: "Microampère (μA)", factor: 1e-6 },
            nanoampere: { name: "Nanoampère (nA)", factor: 1e-9 },
            kiloampere: { name: "Quiloampère (kA)", factor: 1000 }
        }
    },

    electric_voltage: {
        name: "Tensão Elétrica",
        base: "volt",
        units: {
            volt: { name: "Volt (V)", factor: 1 },
            millivolt: { name: "Milivolt (mV)", factor: 0.001 },
            microvolt: { name: "Microvolt (μV)", factor: 1e-6 },
            kilovolt: { name: "Quilovolt (kV)", factor: 1000 },
            megavolt: { name: "Megavolt (MV)", factor: 1e6 }
        }
    },

    electric_resistance: {
        name: "Resistência Elétrica",
        base: "ohm",
        units: {
            ohm: { name: "Ohm (Ω)", factor: 1 },
            milliohm: { name: "Miliohm (mΩ)", factor: 0.001 },
            microohm: { name: "Microohm (μΩ)", factor: 1e-6 },
            kiloohm: { name: "Quiloohm (kΩ)", factor: 1000 },
            megaohm: { name: "Megaohm (MΩ)", factor: 1e6 }
        }
    },

    electric_capacitance: {
        name: "Capacitância",
        base: "farad",
        units: {
            farad: { name: "Farad (F)", factor: 1 },
            millifarad: { name: "Milifarad (mF)", factor: 0.001 },
            microfarad: { name: "Microfarad (μF)", factor: 1e-6 },
            nanofarad: { name: "Nanofarad (nF)", factor: 1e-9 },
            picofarad: { name: "Picofarad (pF)", factor: 1e-12 }
        }
    },

    magnetic_field: {
        name: "Campo Magnético",
        base: "tesla",
        units: {
            tesla: { name: "Tesla (T)", factor: 1 },
            millitesla: { name: "Militesla (mT)", factor: 0.001 },
            microtesla: { name: "Microtesla (μT)", factor: 1e-6 },
            gauss: { name: "Gauss (G)", factor: 1e-4 },
            milligauss: { name: "Miligauss (mG)", factor: 1e-7 }
        }
    },

    luminous_intensity: {
        name: "Intensidade Luminosa",
        base: "candela",
        units: {
            candela: { name: "Candela (cd)", factor: 1 },
            millicandela: { name: "Milicandela (mcd)", factor: 0.001 },
            kilocandela: { name: "Quilocandela (kcd)", factor: 1000 },
            lumen: { name: "Lúmen (lm)", factor: 1 },
            lux: { name: "Lux (lx)", factor: 1 }
        }
    },

    angle: {
        name: "Ângulo",
        base: "radian",
        units: {
            radian: { name: "Radiano (rad)", factor: 1 },
            degree: { name: "Grau (°)", factor: Math.PI/180 },
            gradian: { name: "Gradiano (gon)", factor: Math.PI/200 },
            arcminute: { name: "Minuto de Arco (')", factor: Math.PI/10800 },
            arcsecond: { name: "Segundo de Arco (\")", factor: Math.PI/648000 },
            revolution: { name: "Revolução (rev)", factor: 2*Math.PI }
        }
    },

    data: {
        name: "Dados Digitais",
        base: "byte",
        units: {
            bit: { name: "Bit (b)", factor: 0.125 },
            byte: { name: "Byte (B)", factor: 1 },
            kilobyte: { name: "Kilobyte (KB)", factor: 1024 },
            megabyte: { name: "Megabyte (MB)", factor: 1048576 },
            gigabyte: { name: "Gigabyte (GB)", factor: 1073741824 },
            terabyte: { name: "Terabyte (TB)", factor: 1099511627776 },
            petabyte: { name: "Petabyte (PB)", factor: 1125899906842624 },
            kibibyte: { name: "Kibibyte (KiB)", factor: 1024 },
            mebibyte: { name: "Mebibyte (MiB)", factor: 1048576 },
            gibibyte: { name: "Gibibyte (GiB)", factor: 1073741824 },
            tebibyte: { name: "Tebibyte (TiB)", factor: 1099511627776 },
            pebibyte: { name: "Pebibyte (PiB)", factor: 1125899906842624 }
        }
    },

    fuel_consumption: {
        name: "Consumo de Combustível",
        base: "liter_per_100km",
        units: {
            liter_per_100km: { name: "L/100km", factor: 1 },
            km_per_liter: { name: "km/L", factor: 100 },
            mile_per_gallon: { name: "mpg (US)", factor: 235.215 },
            mile_per_gallon_uk: { name: "mpg (UK)", factor: 282.481 }
        },
        convert: function(value, from, to) {
            if (from === to || value === 0) return value;
            
            let baseValue;
            switch(from) {
                case 'liter_per_100km': baseValue = value; break;
                case 'km_per_liter': baseValue = 100 / value; break;
                case 'mile_per_gallon': baseValue = 235.215 / value; break;
                case 'mile_per_gallon_uk': baseValue = 282.481 / value; break;
                default: return value;
            }
            
            switch(to) {
                case 'liter_per_100km': return baseValue;
                case 'km_per_liter': return 100 / baseValue;
                case 'mile_per_gallon': return 235.215 / baseValue;
                case 'mile_per_gallon_uk': return 282.481 / baseValue;
                default: return baseValue;
            }
        }
    }
};

// Variáveis globais
let currentCategory = 'length';
let currentFromUnit = 'meter';
let currentToUnit = 'kilometer';
let currentDisplayMode = 'standard';
let conversionHistory = [];
let favorites = [];
let totalConversions = 0;
let deferredPrompt;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    try {
        initApp();
        setupEventListeners();
        loadUserData();
        updateTotalConversions();
        updateQuickResults();
    } catch (error) {
        console.error('Erro na inicialização:', error);
        showNotification('Erro ao inicializar aplicação', true);
    }
});

// Inicializar a aplicação
function initApp() {
    populateUnitDropdowns();
    updateConversion();
    setupPWA();
    updateFormula();
}

// Configurar os event listeners
function setupEventListeners() {
    // Event listener para mudança de categoria
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            currentCategory = this.value;
            populateUnitDropdowns();
            updateConversion();
            updateFormula();
            updateQuickResults();
            updateFavoritesButton();
        });
    }

    // Event listener para mudança da unidade "de"
    const fromUnitSelect = document.getElementById('fromUnit');
    if (fromUnitSelect) {
        fromUnitSelect.addEventListener('change', function() {
            currentFromUnit = this.value;
            updateConversion();
            updateFormula();
            updateFavoritesButton();
        });
    }

    // Event listener para mudança da unidade "para"
    const toUnitSelect = document.getElementById('toUnit');
    if (toUnitSelect) {
        toUnitSelect.addEventListener('change', function() {
            currentToUnit = this.value;
            updateConversion();
            updateFormula();
            updateQuickResults();
            updateFavoritesButton();
        });
    }

    // Event listener para mudança do valor
    const fromValueInput = document.getElementById('fromValue');
    if (fromValueInput) {
        fromValueInput.addEventListener('input', function() {
            updateConversion();
            updateFormula();
        });
    }

    // Event listener para mudança da precisão
    const precisionSelect = document.getElementById('precision');
    if (precisionSelect) {
        precisionSelect.addEventListener('change', updateConversion);
    }

    // Event listeners para botões
    const swapButton = document.getElementById('swapButton');
    if (swapButton) {
        swapButton.addEventListener('click', swapUnits);
    }

    const favoriteButton = document.getElementById('favoriteButton');
    if (favoriteButton) {
        favoriteButton.addEventListener('click', toggleFavorite);
    }

    const installButton = document.getElementById('installPWA');
    if (installButton) {
        installButton.addEventListener('click', installPWA);
    }
}

// Popular os dropdowns de unidades
function populateUnitDropdowns() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const category = units[currentCategory];
    
    if (!fromUnitSelect || !toUnitSelect || !category) {
        console.error('Elementos não encontrados ou categoria inválida');
        return;
    }
    
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    for (const [key, unit] of Object.entries(category.units)) {
        const fromOption = document.createElement('option');
        fromOption.value = key;
        fromOption.textContent = unit.name;
        fromUnitSelect.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = key;
        toOption.textContent = unit.name;
        toUnitSelect.appendChild(toOption);
    }
    
    // Definir unidades padrão para a categoria
    const unitKeys = Object.keys(category.units);
    currentFromUnit = category.base || unitKeys[0];
    currentToUnit = unitKeys.find(key => key !== currentFromUnit) || unitKeys[1] || currentFromUnit;
    
    fromUnitSelect.value = currentFromUnit;
    toUnitSelect.value = currentToUnit;
}

// Atualizar a conversão
function updateConversion() {
    try {
        const fromValueInput = document.getElementById('fromValue');
        const toValueInput = document.getElementById('toValue');
        const precisionSelect = document.getElementById('precision');
        
        if (!fromValueInput || !toValueInput || !precisionSelect) {
            console.error('Elementos de entrada não encontrados');
            return;
        }

        const fromValue = parseFloat(fromValueInput.value) || 0;
        const precision = parseInt(precisionSelect.value) || 6;
        
        const result = convertUnit(fromValue, currentCategory, currentFromUnit, currentToUnit);
        
        if (result !== null && isFinite(result)) {
            toValueInput.value = formatNumber(result, precision);
            updateCalculationSteps(fromValue, result);
            
            // Salvar no histórico apenas se o valor for válido e não zero
            if (fromValue !== 0) {
                saveToHistory(fromValue, result);
                updateTotalConversions();
            }
        } else {
            toValueInput.value = 'Erro';
        }
    } catch (error) {
        console.error('Erro na conversão:', error);
        document.getElementById('toValue').value = 'Erro';
    }
}

// Converter unidades
function convertUnit(value, category, fromUnit, toUnit) {
    try {
        if (fromUnit === toUnit || value === 0) return value;
        if (!units[category]) return null;
        
        const categoryData = units[category];
        
        // Para categorias com função de conversão personalizada
        if (categoryData.convert && typeof categoryData.convert === 'function') {
            return categoryData.convert(value, fromUnit, toUnit);
        }
        
        // Para categorias com fatores de conversão
        const fromUnitData = categoryData.units[fromUnit];
        const toUnitData = categoryData.units[toUnit];
        
        if (!fromUnitData || !toUnitData) {
            console.error('Unidades não encontradas:', fromUnit, toUnit);
            return null;
        }
        
        const fromFactor = fromUnitData.factor;
        const toFactor = toUnitData.factor;
        
        // Converter para a unidade base primeiro
        const baseValue = value * fromFactor;
        
        // Converter da unidade base para a unidade de destino
        return baseValue / toFactor;
    } catch (error) {
        console.error('Erro na conversão de unidades:', error);
        return null;
    }
}

// Formatar número para exibição
function formatNumber(value, precision) {
    if (!isFinite(value)) return 'Erro';
    
    // Se o número é muito pequeno, usar notação científica
    if (Math.abs(value) < Math.pow(10, -precision) && value !== 0) {
        return value.toExponential(precision);
    }
    
    // Se o número é muito grande, usar notação científica
    if (Math.abs(value) > Math.pow(10, precision + 6)) {
        return value.toExponential(precision);
    }
    
    return value.toFixed(precision);
}

// Atualizar a fórmula de conversão
function updateFormula() {
    try {
        const fromValueInput = document.getElementById('fromValue');
        const formulaElement = document.getElementById('formula');
        
        if (!fromValueInput || !formulaElement) return;
        
        const fromValue = parseFloat(fromValueInput.value) || 1;
        const result = convertUnit(fromValue, currentCategory, currentFromUnit, currentToUnit);
        const precision = parseInt(document.getElementById('precision').value) || 6;
        
        if (!units[currentCategory] || !units[currentCategory].units[currentFromUnit] || !units[currentCategory].units[currentToUnit]) {
            formulaElement.innerHTML = 'Erro: unidades não encontradas';
            return;
        }
        
        const fromUnitName = units[currentCategory].units[currentFromUnit].name;
        const toUnitName = units[currentCategory].units[currentToUnit].name;
        
        if (currentCategory === 'temperature' || currentCategory === 'fuel_consumption') {
            formulaElement.innerHTML = `
                <div class="formula-text">
                    ${fromValue} ${fromUnitName} = ${formatNumber(result, precision)} ${toUnitName}
                </div>
                <div class="formula-note">
                    A conversão de ${units[currentCategory].name.toLowerCase()} usa fórmulas específicas para cada escala.
                </div>
            `;
        } else {
            const fromFactor = units[currentCategory].units[currentFromUnit].factor;
            const toFactor = units[currentCategory].units[currentToUnit].factor;
            const baseUnit = units[currentCategory].base;
            
            formulaElement.innerHTML = `
                <div class="formula-text">
                    ${fromValue} ${fromUnitName} → ${formatNumber(result, precision)} ${toUnitName}
                </div>
                <div class="formula-equation">
                    ${fromValue} × ${fromFactor} ÷ ${toFactor} = ${formatNumber(result, precision)}
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao atualizar fórmula:', error);
        const formulaElement = document.getElementById('formula');
        if (formulaElement) {
            formulaElement.innerHTML = 'Erro ao calcular fórmula';
        }
    }
}

// Atualizar os passos do cálculo
function updateCalculationSteps(fromValue, result) {
    try {
        const stepsElement = document.getElementById('calculationSteps');
        if (!stepsElement) return;
        
        const precision = parseInt(document.getElementById('precision').value) || 6;
        const fromUnitName = units[currentCategory].units[currentFromUnit].name;
        const toUnitName = units[currentCategory].units[currentToUnit].name;
        
        if (currentCategory === 'temperature' || currentCategory === 'fuel_consumption') {
            stepsElement.innerHTML = `
                <div class="step">1. Valor original: ${fromValue} ${fromUnitName}</div>
                <div class="step">2. Aplicada fórmula específica da categoria</div>
                <div class="step">3. Resultado: ${formatNumber(result, precision)} ${toUnitName}</div>
            `;
        } else {
            const fromFactor = units[currentCategory].units[currentFromUnit].factor;
            const toFactor = units[currentCategory].units[currentToUnit].factor;
            const baseValue = fromValue * fromFactor;
            
            stepsElement.innerHTML = `
                <div class="step">1. Converter para unidade base: ${fromValue} × ${fromFactor} = ${baseValue}</div>
                <div class="step">2. Converter para unidade destino: ${baseValue} ÷ ${toFactor} = ${formatNumber(result, precision)}</div>
                <div class="step">3. Resultado final: ${formatNumber(result, precision)} ${toUnitName}</div>
            `;
        }
    } catch (error) {
        console.error('Erro ao atualizar passos:', error);
    }
}

// Trocar as unidades
function swapUnits() {
    try {
        // Trocar as unidades
        [currentFromUnit, currentToUnit] = [currentToUnit, currentFromUnit];
        
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const fromValueInput = document.getElementById('fromValue');
        const toValueInput = document.getElementById('toValue');
        
        if (!fromUnitSelect || !toUnitSelect || !fromValueInput || !toValueInput) {
            console.error('Elementos não encontrados para troca');
            return;
        }
        
        fromUnitSelect.value = currentFromUnit;
        toUnitSelect.value = currentToUnit;
        
        // Trocar os valores
        const fromValue = fromValueInput.value;
        const toValue = toValueInput.value;
        
        fromValueInput.value = toValue || '';
        
        updateConversion();
        updateFormula();
        updateFavoritesButton();
        
        showNotification('Unidades trocadas com sucesso!');
    } catch (error) {
        console.error('Erro ao trocar unidades:', error);
        showNotification('Erro ao trocar unidades', true);
    }
}

// Adicionar/remover dos favoritos
function toggleFavorite() {
    try {
        const conversionKey = `${currentCategory}:${currentFromUnit}:${currentToUnit}`;
        const index = favorites.indexOf(conversionKey);
        const favoriteButton = document.getElementById('favoriteButton');
        
        if (!favoriteButton) return;
        
        if (index === -1) {
            favorites.push(conversionKey);
            favoriteButton.classList.add('active');
            showNotification('Conversão adicionada aos favoritos!');
        } else {
            favorites.splice(index, 1);
            favoriteButton.classList.remove('active');
            showNotification('Conversão removida dos favoritos!');
        }
        
        saveUserData();
        updateFavoritesDisplay();
    } catch (error) {
        console.error('Erro ao alternar favorito:', error);
        showNotification('Erro ao gerenciar favoritos', true);
    }
}

// Atualizar o botão de favoritos
function updateFavoritesButton() {
    try {
        const conversionKey = `${currentCategory}:${currentFromUnit}:${currentToUnit}`;
        const favoriteButton = document.getElementById('favoriteButton');
        
        if (!favoriteButton) return;
        
        if (favorites.includes(conversionKey)) {
            favoriteButton.classList.add('active');
        } else {
            favoriteButton.classList.remove('active');
        }
    } catch (error) {
        console.error('Erro ao atualizar botão de favoritos:', error);
    }
}

// Salvar no histórico
function saveToHistory(fromValue, result) {
    try {
        if (fromValue === 0 || !isFinite(result)) return;
        
        const conversion = {
            timestamp: new Date(),
            category: currentCategory,
            fromUnit: currentFromUnit,
            toUnit: currentToUnit,
            fromValue: fromValue,
            result: result,
            precision: parseInt(document.getElementById('precision').value) || 6
        };
        
        // Evitar duplicatas recentes
        const isDuplicate = conversionHistory.some(item => 
            item.category === conversion.category &&
            item.fromUnit === conversion.fromUnit &&
            item.toUnit === conversion.toUnit &&
            Math.abs(item.fromValue - conversion.fromValue) < 0.001 &&
            (Date.now() - item.timestamp.getTime()) < 5000 // 5 segundos
        );
        
        if (!isDuplicate) {
            conversionHistory.unshift(conversion);
            
            // Manter apenas os últimos 50 registros
            if (conversionHistory.length > 50) {
                conversionHistory = conversionHistory.slice(0, 50);
            }
            
            saveUserData();
        }
    } catch (error) {
        console.error('Erro ao salvar no histórico:', error);
    }
}

// Limpar o histórico
function clearHistory() {
    try {
        conversionHistory = [];
        saveUserData();
        updateHistoryDisplay();
        updateTotalConversions();
        showNotification('Histórico limpo!');
    } catch (error) {
        console.error('Erro ao limpar histórico:', error);
        showNotification('Erro ao limpar histórico', true);
    }
}

// Atualizar a exibição do histórico
function updateHistoryDisplay() {
    try {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;
        
        if (conversionHistory.length === 0) {
            historyList.innerHTML = '<div class="no-history">Nenhuma conversão realizada ainda</div>';
            return;
        }
        
        historyList.innerHTML = '';
        
        conversionHistory.forEach((conversion, index) => {
            const categoryData = units[conversion.category];
            if (!categoryData) return;
            
            const fromUnitData = categoryData.units[conversion.fromUnit];
            const toUnitData = categoryData.units[conversion.toUnit];
            
            if (!fromUnitData || !toUnitData) return;
            
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            historyItem.innerHTML = `
                <div class="history-content">
                    <div class="history-values">
                        ${conversion.fromValue} ${fromUnitData.name} → ${formatNumber(conversion.result, conversion.precision)} ${toUnitData.name}
                    </div>
                    <div class="history-meta">
                        ${conversion.timestamp.toLocaleString('pt-BR')}
                    </div>
                </div>
                <div class="history-actions">
                    <button class="history-action-btn" onclick="loadHistoryItem(${index})" title="Carregar esta conversão">
                        ↻
                    </button>
                </div>
            `;
            
            historyList.appendChild(historyItem);
        });
    } catch (error) {
        console.error('Erro ao atualizar histórico:', error);
    }
}