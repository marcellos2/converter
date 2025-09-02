// Definição de todas as unidades e suas conversões
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
            let celsius;
            switch(from) {
                case 'celsius': celsius = value; break;
                case 'fahrenheit': celsius = (value - 32) * 5/9; break;
                case 'kelvin': celsius = value - 273.15; break;
                case 'rankine': celsius = (value - 491.67) * 5/9; break;
                case 'reaumur': celsius = value * 5/4; break;
            }
            
            switch(to) {
                case 'celsius': return celsius;
                case 'fahrenheit': return celsius * 9/5 + 32;
                case 'kelvin': return celsius + 273.15;
                case 'rankine': return (celsius + 273.15) * 9/5;
                case 'reaumur': return celsius * 4/5;
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
            let baseValue;
            switch(from) {
                case 'liter_per_100km': baseValue = value; break;
                case 'km_per_liter': baseValue = 100 / value; break;
                case 'mile_per_gallon': baseValue = 235.215 / value; break;
                case 'mile_per_gallon_uk': baseValue = 282.481 / value; break;
            }
            
            switch(to) {
                case 'liter_per_100km': return baseValue;
                case 'km_per_liter': return 100 / baseValue;
                case 'mile_per_gallon': return 235.215 / baseValue;
                case 'mile_per_gallon_uk': return 282.481 / baseValue;
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
    initApp();
    setupEventListeners();
    loadUserData();
    updateTotalConversions();
    updateQuickResults();
});

// Inicializar a aplicação
function initApp() {
    populateCategoryDropdown();
    populateUnitDropdowns();
    updateConversion();
    setupPWA();
}

// Configurar os event listeners
function setupEventListeners() {
    document.getElementById('category').addEventListener('change', function() {
        currentCategory = this.value;
        populateUnitDropdowns();
        updateConversion();
        updateQuickResults();
    });

    document.getElementById('fromUnit').addEventListener('change', function() {
        currentFromUnit = this.value;
        updateConversion();
        updateFormula();
    });

    document.getElementById('toUnit').addEventListener('change', function() {
        currentToUnit = this.value;
        updateConversion();
        updateFormula();
    });

    document.getElementById('fromValue').addEventListener('input', function() {
        updateConversion();
        updateFormula();
    });

    document.getElementById('precision').addEventListener('change', updateConversion);
    document.getElementById('swapButton').addEventListener('click', swapUnits);
    document.getElementById('favoriteButton').addEventListener('click', toggleFavorite);
    document.getElementById('installPWA').addEventListener('click', installPWA);
}

// Popular o dropdown de categorias
function populateCategoryDropdown() {
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';
    
    for (const [key, category] of Object.entries(units)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    }
    
    categorySelect.value = currentCategory;
}

// Popular os dropdowns de unidades
function populateUnitDropdowns() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const category = units[currentCategory];
    
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
    currentFromUnit = category.base;
    currentToUnit = Object.keys(category.units)[1] || category.base;
    
    fromUnitSelect.value = currentFromUnit;
    toUnitSelect.value = currentToUnit;
}

// Atualizar a conversão
function updateConversion() {
    const fromValue = parseFloat(document.getElementById('fromValue').value) || 0;
    const precision = parseInt(document.getElementById('precision').value);
    
    const result = convertUnit(fromValue, currentCategory, currentFromUnit, currentToUnit);
    
    if (result !== null) {
        document.getElementById('toValue').value = result.toFixed(precision);
        updateCalculationSteps(fromValue, result);
        saveToHistory(fromValue, result);
        updateTotalConversions();
    }
}

// Converter unidades
function convertUnit(value, category, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    
    const categoryData = units[category];
    
    // Para categorias com função de conversão personalizada (temperatura, consumo de combustível)
    if (categoryData.convert && typeof categoryData.convert === 'function') {
        return categoryData.convert(value, fromUnit, toUnit);
    }
    
    // Para categorias com fatores de conversão
    const fromFactor = categoryData.units[fromUnit].factor;
    const toFactor = categoryData.units[toUnit].factor;
    
    // Converter para a unidade base primeiro
    const baseValue = value * fromFactor;
    
    // Converter da unidade base para a unidade de destino
    return baseValue / toFactor;
}

// Atualizar a fórmula de conversão
function updateFormula() {
    const fromValue = parseFloat(document.getElementById('fromValue').value) || 1;
    const result = convertUnit(fromValue, currentCategory, currentFromUnit, currentToUnit);
    const precision = parseInt(document.getElementById('precision').value);
    
    const formulaElement = document.getElementById('formula');
    
    if (currentCategory === 'temperature') {
        formulaElement.innerHTML = `
            <div class="formula-text">
                ${fromValue} ${units[currentCategory].units[currentFromUnit].name} = ${result.toFixed(precision)} ${units[currentCategory].units[currentToUnit].name}
            </div>
            <div class="formula-note">
                A conversão de temperatura usa fórmulas específicas para cada escala.
            </div>
        `;
    } else if (currentCategory === 'fuel_consumption') {
        formulaElement.innerHTML = `
            <div class="formula-text">
                ${fromValue} ${units[currentCategory].units[currentFromUnit].name} = ${result.toFixed(precision)} ${units[currentCategory].units[currentToUnit].name}
            </div>
            <div class="formula-note">
                A conversão de consumo de combustível usa fórmulas específicas para cada unidade.
            </div>
        `;
    } else {
        const fromFactor = units[currentCategory].units[currentFromUnit].factor;
        const toFactor = units[currentCategory].units[currentToUnit].factor;
        const baseUnit = units[currentCategory].base;
        
        formulaElement.innerHTML = `
            <div class="formula-text">
                ${fromValue} ${units[currentCategory].units[currentFromUnit].name} × (${fromFactor} ${baseUnit}/${currentFromUnit}) ÷ (${toFactor} ${baseUnit}/${currentToUnit}) = ${result.toFixed(precision)} ${units[currentCategory].units[currentToUnit].name}
            </div>
            <div class="formula-equation">
                ${fromValue} × ${fromFactor} ÷ ${toFactor} = ${result.toFixed(precision)}
            </div>
        `;
    }
}

// Atualizar os passos do cálculo
function updateCalculationSteps(fromValue, result) {
    const stepsElement = document.getElementById('calculationSteps');
    const precision = parseInt(document.getElementById('precision').value);
    
    if (currentCategory === 'temperature' || currentCategory === 'fuel_consumption') {
        stepsElement.innerHTML = `
            <div class="step">1. Valor original: ${fromValue} ${units[currentCategory].units[currentFromUnit].name}</div>
            <div class="step">2. Aplicada fórmula específica da categoria</div>
            <div class="step">3. Resultado: ${result.toFixed(precision)} ${units[currentCategory].units[currentToUnit].name}</div>
        `;
    } else {
        const fromFactor = units[currentCategory].units[currentFromUnit].factor;
        const toFactor = units[currentCategory].units[currentToUnit].factor;
        const baseValue = fromValue * fromFactor;
        
        stepsElement.innerHTML = `
            <div class="step">1. Converter para unidade base: ${fromValue} × ${fromFactor} = ${baseValue}</div>
            <div class="step">2. Converter para unidade destino: ${baseValue} ÷ ${toFactor} = ${result.toFixed(precision)}</div>
            <div class="step">3. Resultado final: ${result.toFixed(precision)} ${units[currentCategory].units[currentToUnit].name}</div>
        `;
    }
}

// Trocar as unidades
function swapUnits() {
    [currentFromUnit, currentToUnit] = [currentToUnit, currentFromUnit];
    
    document.getElementById('fromUnit').value = currentFromUnit;
    document.getElementById('toUnit').value = currentToUnit;
    
    const fromValue = document.getElementById('fromValue').value;
    const result = document.getElementById('toValue').value;
    
    document.getElementById('fromValue').value = result;
    document.getElementById('toValue').value = fromValue;
    
    updateConversion();
    updateFormula();
}

// Adicionar/remover dos favoritos
function toggleFavorite() {
    const conversionKey = `${currentCategory}:${currentFromUnit}:${currentToUnit}`;
    const index = favorites.indexOf(conversionKey);
    
    if (index === -1) {
        favorites.push(conversionKey);
        document.getElementById('favoriteButton').classList.add('active');
        showNotification('Conversão adicionada aos favoritos!');
    } else {
        favorites.splice(index, 1);
        document.getElementById('favoriteButton').classList.remove('active');
        showNotification('Conversão removida dos favoritos!');
    }
    
    saveUserData();
    updateFavoritesButton();
}

// Atualizar o botão de favoritos
function updateFavoritesButton() {
    const conversionKey = `${currentCategory}:${currentFromUnit}:${currentToUnit}`;
    const favoriteButton = document.getElementById('favoriteButton');
    
    if (favorites.includes(conversionKey)) {
        favoriteButton.classList.add('active');
    } else {
        favoriteButton.classList.remove('active');
    }
}

// Salvar no histórico
function saveToHistory(fromValue, result) {
    if (fromValue === 0) return;
    
    const conversion = {
        timestamp: new Date(),
        category: currentCategory,
        fromUnit: currentFromUnit,
        toUnit: currentToUnit,
        fromValue: fromValue,
        result: result,
        precision: parseInt(document.getElementById('precision').value)
    };
    
    conversionHistory.unshift(conversion);
    
    if (conversionHistory.length > 50) {
        conversionHistory = conversionHistory.slice(0, 50);
    }
    
    saveUserData();
    updateHistoryDisplay();
}

// Limpar o histórico
function clearHistory() {
    conversionHistory = [];
    saveUserData();
    updateHistoryDisplay();
    showNotification('Histórico limpo!');
}

// Atualizar a exibição do histórico
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<div class="no-history">Nenhuma conversão realizada ainda</div>';
        return;
    }
    
    historyList.innerHTML = '';
    
    conversionHistory.forEach((conversion, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const fromUnitName = units[conversion.category].units[conversion.fromUnit].name;
        const toUnitName = units[conversion.category].units[conversion.toUnit].name;
        
        historyItem.innerHTML = `
            <div class="history-content">
                <div class="history-values">
                    ${conversion.fromValue} ${fromUnitName} → ${conversion.result.toFixed(conversion.precision)} ${toUnitName}
                </div>
                <div class="history-meta">
                    ${conversion.timestamp.toLocaleString()}
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
}

// Carregar item do histórico
function loadHistoryItem(index) {
    const conversion = conversionHistory[index];
    
    document.getElementById('category').value = conversion.category;
    currentCategory = conversion.category;
    
    populateUnitDropdowns();
    
    document.getElementById('fromUnit').value = conversion.fromUnit;
    document.getElementById('toUnit').value = conversion.toUnit;
    document.getElementById('fromValue').value = conversion.fromValue;
    document.getElementById('precision').value = conversion.precision;
    
    currentFromUnit = conversion.fromUnit;
    currentToUnit = conversion.toUnit;
    
    updateConversion();
    updateFormula();
    updateFavoritesButton();
    
    toggleHistory();
    showNotification('Conversão carregada do histórico!');
}

// Atualizar totais de conversões
function updateTotalConversions() {
    totalConversions = conversionHistory.length;
    document.getElementById('totalConversions').textContent = totalConversions;
}

// Atualizar resultados rápidos
function updateQuickResults() {
    const quickResults = document.getElementById('quickResults');
    const category = units[currentCategory];
    const baseUnit = category.base;
    
    quickResults.innerHTML = '';
    
    // Obter até 5 unidades para mostrar como conversões rápidas
    const unitKeys = Object.keys(category.units);
    const quickUnits = unitKeys.filter(unit => unit !== currentToUnit).slice(0, 5);
    
    quickUnits.forEach(unit => {
        const fromValue = parseFloat(document.getElementById('fromValue').value) || 1;
        const result = convertUnit(fromValue, currentCategory, currentFromUnit, unit);
        const precision = parseInt(document.getElementById('precision').value);
        
        const quickItem = document.createElement('div');
        quickItem.className = 'quick-item';
        quickItem.innerHTML = `
            <div class="quick-value">${result.toFixed(precision)}</div>
            <div class="quick-unit">${category.units[unit].name}</div>
        `;
        
        quickItem.addEventListener('click', () => {
            document.getElementById('toUnit').value = unit;
            currentToUnit = unit;
            updateConversion();
            updateFormula();
            updateFavoritesButton();
        });
        
        quickResults.appendChild(quickItem);
    });
}

// Copiar resultado
function copyResult() {
    const resultInput = document.getElementById('toValue');
    resultInput.select();
    document.execCommand('copy');
    
    showNotification('Resultado copiado para a área de transferência!');
}

// Alternar painel de histórico
function toggleHistory() {
    const historyPanel = document.getElementById('historyPanel');
    const favoritesPanel = document.getElementById('favoritesPanel');
    
    if (historyPanel.classList.contains('open')) {
        historyPanel.classList.remove('open');
    } else {
        historyPanel.classList.add('open');
        favoritesPanel.classList.remove('open');
        updateHistoryDisplay();
    }
}

// Alternar painel de favoritos
function toggleFavorites() {
    const historyPanel = document.getElementById('historyPanel');
    const favoritesPanel = document.getElementById('favoritesPanel');
    
    if (favoritesPanel.classList.contains('open')) {
        favoritesPanel.classList.remove('open');
    } else {
        favoritesPanel.classList.add('open');
        historyPanel.classList.remove('open');
        updateFavoritesDisplay();
    }
}

// Atualizar exibição de favoritos
function updateFavoritesDisplay() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<div class="no-favorites">Nenhuma conversão favorita</div>';
        return;
    }
    
    favoritesList.innerHTML = '';
    
    favorites.forEach((favoriteKey, index) => {
        const [categoryKey, fromUnitKey, toUnitKey] = favoriteKey.split(':');
        const category = units[categoryKey];
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
}

// Carregar favorito
function loadFavorite(categoryKey, fromUnitKey, toUnitKey) {
    document.getElementById('category').value = categoryKey;
    currentCategory = categoryKey;
    
    populateUnitDropdowns();
    
    document.getElementById('fromUnit').value = fromUnitKey;
    document.getElementById('toUnit').value = toUnitKey;
    document.getElementById('fromValue').value = 1;
    
    currentFromUnit = fromUnitKey;
    currentToUnit = toUnitKey;
    
    updateConversion();
    updateFormula();
    updateFavoritesButton();
    
    toggleFavorites();
    showNotification('Conversão favorita carregada!');
}

// Remover favorito
function removeFavorite(index) {
    favorites.splice(index, 1);
    saveUserData();
    updateFavoritesDisplay();
    updateFavoritesButton();
    showNotification('Favorito removido!');
}

// Definir modo de exibição
function setDisplayMode(mode) {
    currentDisplayMode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.mode-btn[data-mode="${mode}"]`).classList.add('active');
    
    if (mode === 'scientific') {
        document.querySelector('.calculator-panel').style.display = 'block';
    } else {
        document.querySelector('.calculator-panel').style.display = 'none';
    }
}

// Funções da calculadora
function appendToCalc(value) {
    const display = document.getElementById('calcDisplay');
    display.value += value;
}

function appendFunction(func) {
    const display = document.getElementById('calcDisplay');
    display.value += func;
}

function clearCalc() {
    document.getElementById('calcDisplay').value = '';
}

function deleteLast() {
    const display = document.getElementById('calcDisplay');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('calcDisplay');
    try {
        // Substituir operadores visuais por operadores JavaScript
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        
        // Avaliar a expressão com segurança
        const result = Function('"use strict"; return (' + expression + ')')();
        
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Erro';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Erro';
    }
}

// Salvar dados do usuário
function saveUserData() {
    const userData = {
        history: conversionHistory,
        favorites: favorites,
        totalConversions: totalConversions
    };
    
    localStorage.setItem('converterData', JSON.stringify(userData));
}

// Carregar dados do usuário
function loadUserData() {
    const savedData = localStorage.getItem('converterData');
    
    if (savedData) {
        const userData = JSON.parse(savedData);
        conversionHistory = userData.history || [];
        favorites = userData.favorites || [];
        totalConversions = userData.totalConversions || 0;
        
        updateHistoryDisplay();
        updateFavoritesDisplay();
        updateFavoritesButton();
        updateTotalConversions();
    }
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Adicionar ao corpo
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Configurar PWA
function setupPWA() {
    // Registrar service worker
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
}

// Instalar PWA
function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                document.getElementById('installButton').style.display = 'none';
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Verificar se o app está instalado
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    document.getElementById('installButton').style.display = 'none';
});