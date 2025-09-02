// Definição de todas as unidades e suas conversões com lógica de cálculo corrigida
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
            square_foot: { name: "Pé² (ft²)", factor: 0.09290304 },
            square_yard: { name: "Jarda² (yd²)", factor: 0.83612736 },
            acre: { name: "Acre", factor: 4046.8564224 },
            square_mile: { name: "Milha² (mi²)", factor: 2589988.110336 }
        }
    },

    volume: {
        name: "Volume",
        base: "liter",
        units: {
            milliliter: { name: "Mililitro (ml)", factor: 0.001 },
            cubic_centimeter: { name: "Centímetro³ (cm³)", factor: 0.001 },
            centiliter: { name: "Centilitro (cl)", factor: 0.01 },
            deciliter: { name: "Decilitro (dl)", factor: 0.1 },
            liter: { name: "Litro (l)", factor: 1 },
            cubic_meter: { name: "Metro³ (m³)", factor: 1000 },
            teaspoon: { name: "Colher de Chá (US)", factor: 0.00492892 },
            tablespoon: { name: "Colher de Sopa (US)", factor: 0.0147868 },
            fluid_ounce: { name: "Onça Fluida (fl oz, US)", factor: 0.0295735 },
            cup: { name: "Xícara (cup, US)", factor: 0.24 }, // Padrão legal US
            pint: { name: "Pinta (pt, US)", factor: 0.473176 },
            quart: { name: "Quarto (qt, US)", factor: 0.946353 },
            gallon: { name: "Galão (gal, US)", factor: 3.78541 },
            barrel: { name: "Barril (petróleo)", factor: 158.987 }
        }
    },

    mass: {
        name: "Massa",
        base: "kilogram",
        units: {
            microgram: { name: "Micrograma (μg)", factor: 1e-9 },
            milligram: { name: "Miligrama (mg)", factor: 1e-6 },
            carat: { name: "Quilate", factor: 0.0002 },
            gram: { name: "Grama (g)", factor: 0.001 },
            kilogram: { name: "Quilograma (kg)", factor: 1 },
            metric_ton: { name: "Tonelada (t)", factor: 1000 },
            ounce: { name: "Onça (oz)", factor: 0.0283495231 },
            pound: { name: "Libra (lb)", factor: 0.45359237 },
            stone: { name: "Stone (st)", factor: 6.35029318 },
            short_ton: { name: "Tonelada Curta (US)", factor: 907.18474 },
            long_ton: { name: "Tonelada Longa (UK)", factor: 1016.0469088 },
            atomic_mass: { name: "Unidade de Massa Atômica (u)", factor: 1.660539e-27 }
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
            // Primeiro, converte o valor de entrada para Celsius
            switch(from) {
                case 'celsius': celsius = value; break;
                case 'fahrenheit': celsius = (value - 32) * 5/9; break;
                case 'kelvin': celsius = value - 273.15; break;
                case 'rankine': celsius = (value - 491.67) * 5/9; break;
                case 'reaumur': celsius = value * 1.25; break; // Corrigido para 5/4 = 1.25
                default: return null;
            }
            
            // Depois, converte de Celsius para a unidade de destino
            switch(to) {
                case 'celsius': return celsius;
                case 'fahrenheit': return celsius * 9/5 + 32;
                case 'kelvin': return celsius + 273.15;
                case 'rankine': return (celsius + 273.15) * 9/5;
                case 'reaumur': return celsius * 0.8; // Corrigido para 4/5 = 0.8
                default: return null;
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
            month: { name: "Mês (médio)", factor: 2629746 }, // (365.2425/12) * 86400
            year: { name: "Ano (gregoriano)", factor: 31556952 }, // 365.2425 * 86400
            decade: { name: "Década", factor: 315569520 },
            century: { name: "Século", factor: 3155695200 }
        }
    },

    speed: {
        name: "Velocidade",
        base: "meter_per_second",
        units: {
            meter_per_second: { name: "Metro por Segundo (m/s)", factor: 1 },
            kilometer_per_hour: { name: "Quilômetro por Hora (km/h)", factor: 1/3.6 }, // CORRIGIDO: Mais preciso
            mile_per_hour: { name: "Milha por Hora (mph)", factor: 0.44704 },
            foot_per_second: { name: "Pé por Segundo (ft/s)", factor: 0.3048 },
            knot: { name: "Nó (kn)", factor: 0.514444 },
            mach: { name: "Mach (a 20°C no ar seco)", factor: 343 },
            speed_of_light: { name: "Velocidade da Luz (vácuo)", factor: 299792458 }
        }
    },
    
    // CORRIGIDO: Categoria de dados digitais refeita para precisão
    data: {
        name: "Dados Digitais",
        base: "byte",
        units: {
            bit: { name: "Bit (b)", factor: 0.125 },
            byte: { name: "Byte (B)", factor: 1 },
            kilobyte: { name: "Kilobyte (kB)", factor: 1e3 },      // Base 10
            megabyte: { name: "Megabyte (MB)", factor: 1e6 },      // Base 10
            gigabyte: { name: "Gigabyte (GB)", factor: 1e9 },      // Base 10
            terabyte: { name: "Terabyte (TB)", factor: 1e12 },     // Base 10
            petabyte: { name: "Petabyte (PB)", factor: 1e15 },     // Base 10
            kibibyte: { name: "Kibibyte (KiB)", factor: 1024 },    // Base 2
            mebibyte: { name: "Mebibyte (MiB)", factor: 1048576 }, // Base 2
            gibibyte: { name: "Gibibyte (GiB)", factor: 1073741824 },// Base 2
            tebibyte: { name: "Tebibyte (TiB)", factor: 1099511627776 },// Base 2
            pebibyte: { name: "Pebibyte (PiB)", factor: 1125899906842624 }// Base 2
        }
    },

    // CORRIGIDO: Categoria refeita para apenas Intensidade Luminosa
    luminous_intensity: {
        name: "Intensidade Luminosa",
        base: "candela",
        units: {
            candela: { name: "Candela (cd)", factor: 1 },
            millicandela: { name: "Milicandela (mcd)", factor: 0.001 }
        }
    },
    
    // NOVO: Categoria para Fluxo Luminoso
    luminous_flux: {
        name: "Fluxo Luminoso",
        base: "lumen",
        units: {
            lumen: { name: "Lúmen (lm)", factor: 1 }
        }
    },

    // NOVO: Categoria para Iluminância
    illuminance: {
        name: "Iluminância",
        base: "lux",
        units: {
            lux: { name: "Lux (lx)", factor: 1 }, // lm/m²
            foot_candle: { name: "Foot-candle (fc)", factor: 10.764 } // lm/ft²
        }
    },

    fuel_consumption: {
        name: "Consumo de Combustível",
        base: "liter_per_100km",
        units: {
            liter_per_100km: { name: "Litros por 100km (L/100km)" },
            km_per_liter: { name: "Quilômetros por Litro (km/L)" },
            mile_per_gallon: { name: "Milhas por Galão (mpg, US)" },
            mile_per_gallon_uk: { name: "Milhas por Galão (mpg, UK)" }
        },
        convert: function(value, from, to) {
            if (value === 0) return 0;
            let baseValue; // Valor em L/100km
            
            // Converte tudo para a base (L/100km)
            switch(from) {
                case 'liter_per_100km': baseValue = value; break;
                case 'km_per_liter': baseValue = 100 / value; break;
                case 'mile_per_gallon': baseValue = 235.214583 / value; break;
                case 'mile_per_gallon_uk': baseValue = 282.480936 / value; break;
                default: return null;
            }
            
            // Converte da base para a unidade de destino
            switch(to) {
                case 'liter_per_100km': return baseValue;
                case 'km_per_liter': return 100 / baseValue;
                case 'mile_per_gallon': return 235.214583 / baseValue;
                case 'mile_per_gallon_uk': return 282.480936 / baseValue;
                default: return null;
            }
        }
    },
    
    // Demais categorias sem alterações lógicas críticas
    acceleration: {
        name: "Aceleração",
        base: "meter_per_second_squared",
        units: {
            meter_per_second_squared: { name: "m/s²", factor: 1 },
            foot_per_second_squared: { name: "ft/s²", factor: 0.3048 },
            gal: { name: "Gal (cm/s²)", factor: 0.01 },
            gravity: { name: "Aceleração da Gravidade (g)", factor: 9.80665 }
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
            pound_force: { name: "Libra-força (lbf)", factor: 4.4482216153 }
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
            atmosphere: { name: "Atmosfera Padrão (atm)", factor: 101325 },
            torr: { name: "Torr (mmHg)", factor: 133.322368 },
            psi: { name: "Libra por Polegada² (psi)", factor: 6894.75729 }
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
            btu: { name: "BTU (unidade térmica britânica)", factor: 1055.05585 },
            electron_volt: { name: "Elétron-volt (eV)", factor: 1.602176634e-19 }
        }
    },

    power: {
        name: "Potência",
        base: "watt",
        units: {
            watt: { name: "Watt (W)", factor: 1 },
            kilowatt: { name: "Quilowatt (kW)", factor: 1000 },
            megawatt: { name: "Megawatt (MW)", factor: 1e6 },
            horsepower: { name: "Cavalo-vapor (hp, mecânico)", factor: 745.699872 },
            metric_horsepower: { name: "Cavalo-vapor (CV, métrico)", factor: 735.49875 },
            btu_per_hour: { name: "BTU por Hora (BTU/h)", factor: 0.29307107 }
        }
    },

    frequency: {
        name: "Frequência",
        base: "hertz",
        units: {
            hertz: { name: "Hertz (Hz)", factor: 1 },
            kilohertz: { name: "Quilohertz (kHz)", factor: 1e3 },
            megahertz: { name: "Megahertz (MHz)", factor: 1e6 },
            gigahertz: { name: "Gigahertz (GHz)", factor: 1e9 },
            terahertz: { name: "Terahertz (THz)", factor: 1e12 },
            rpm: { name: "Rotações por Minuto (rpm)", factor: 1/60 }
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
    
    electric_current: {
        name: "Corrente Elétrica",
        base: "ampere",
        units: {
            ampere: { name: "Ampère (A)", factor: 1 },
            milliampere: { name: "Miliampère (mA)", factor: 0.001 },
            microampere: { name: "Microampère (μA)", factor: 1e-6 }
        }
    },

    electric_voltage: {
        name: "Tensão Elétrica",
        base: "volt",
        units: {
            volt: { name: "Volt (V)", factor: 1 },
            millivolt: { name: "Milivolt (mV)", factor: 0.001 },
            kilovolt: { name: "Quilovolt (kV)", factor: 1000 }
        }
    },

    electric_resistance: {
        name: "Resistência Elétrica",
        base: "ohm",
        units: {
            ohm: { name: "Ohm (Ω)", factor: 1 },
            kiloohm: { name: "Quiloohm (kΩ)", factor: 1000 },
            megaohm: { name: "Megaohm (MΩ)", factor: 1e6 }
        }
    }
};

// O restante do seu código permanece o mesmo
// ... (todas as suas funções como initApp, setupEventListeners, etc.) ...
// [COLE O RESTANTE DO SEU CÓDIGO A PARTIR DAQUI]

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
    // document.getElementById('installPWA').addEventListener('click', installPWA); // Exemplo, pode não existir no seu HTML
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
    let toUnitKeys = Object.keys(category.units);
    // Tenta pegar a segunda unidade da lista como padrão, se não, usa a base
    currentToUnit = toUnitKeys.length > 1 ? toUnitKeys[1] : category.base;
    
    fromUnitSelect.value = currentFromUnit;
    toUnitSelect.value = currentToUnit;
}

// Atualizar a conversão
function updateConversion() {
    const fromValueElement = document.getElementById('fromValue');
    const toValueElement = document.getElementById('toValue');
    const precisionElement = document.getElementById('precision');

    if (!fromValueElement || !toValueElement || !precisionElement) return;

    const fromValue = parseFloat(fromValueElement.value) || 0;
    const precision = parseInt(precisionElement.value);
    
    const result = convertUnit(fromValue, currentCategory, currentFromUnit, currentToUnit);
    
    if (result !== null && isFinite(result)) {
        toValueElement.value = result.toFixed(precision);
        
        // As funções abaixo dependem de outros elementos do seu HTML
        if (document.getElementById('calculationSteps')) {
            updateCalculationSteps(fromValue, result);
        }
        saveToHistory(fromValue, result);
        updateTotalConversions();
    } else {
        toValueElement.value = 'Erro';
    }
}

// Converter unidades
function convertUnit(value, category, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    
    const categoryData = units[category];
    if (!categoryData) return null;

    // Para categorias com função de conversão personalizada (temperatura, consumo de combustível)
    if (categoryData.convert && typeof categoryData.convert === 'function') {
        return categoryData.convert(value, fromUnit, toUnit);
    }
    
    const fromUnitData = categoryData.units[fromUnit];
    const toUnitData = categoryData.units[toUnit];
    
    if (!fromUnitData || !toUnitData) return null;

    // Para categorias com fatores de conversão
    const fromFactor = fromUnitData.factor;
    const toFactor = toUnitData.factor;
    
    if (fromFactor === undefined || toFactor === undefined) return null;
    
    // Converter para a unidade base primeiro
    const baseValue = value * fromFactor;
    
    // Converter da unidade base para a unidade de destino
    return baseValue / toFactor;
}

// O resto das suas funções...
// ... (updateFormula, updateCalculationSteps, swapUnits, etc.)
