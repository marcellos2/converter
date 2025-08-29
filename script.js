// Definição de todas as unidades e suas conversões (mantendo o código original)
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
            grade: { name: "Grado (grad)", factor: Math.PI/200 },
            arcminute: { name: "Minuto de Arco (')", factor: Math.PI/10800 },
            arcsecond: { name: "Segundo de Arco (\")", factor: Math.PI/648000 },
            milliradian: { name: "Miliradiano (mrad)", factor: 0.001 },
            revolution: { name: "Revolução", factor: 2*Math.PI }
        }
    },

    data: {
        name: "Dados Digitais",
        base: "byte",
        units: {
            bit: { name: "Bit", factor: 0.125 },
            byte: { name: "Byte (B)", factor: 1 },
            kilobyte: { name: "Quilobyte (kB)", factor: 1000 },
            megabyte: { name: "Megabyte (MB)", factor: 1e6 },
            gigabyte: { name: "Gigabyte (GB)", factor: 1e9 },
            terabyte: { name: "Terabyte (TB)", factor: 1e12 },
            petabyte: { name: "Petabyte (PB)", factor: 1e15 },
            kibibyte: { name: "Kibibyte (KiB)", factor: 1024 },
            mebibyte: { name: "Mebibyte (MiB)", factor: 1048576 },
            gibibyte: { name: "Gibibyte (GiB)", factor: 1073741824 },
            tebibyte: { name: "Tebibyte (TiB)", factor: 1099511627776 }
        }
    },

    fuel_consumption: {
        name: "Consumo de Combustível",
        base: "liter_per_100km",
        units: {
            liter_per_100km: { name: "Litro/100km", factor: 1 },
            liter_per_km: { name: "Litro/km", factor: 0.01 },
            km_per_liter: { name: "km/Litro", factor: -1 },
            mile_per_gallon_us: { name: "MPG (US)", factor: -235.215 },
            mile_per_gallon_imp: { name: "MPG (Imperial)", factor: -282.481 },
            gallon_per_100_mile: { name: "Galão/100 milhas", factor: 2.35215 }
        },
        convert: function(value, from, to) {
            if (from === to) return value;
            
            let base_value;
            if (from === 'km_per_liter') {
                base_value = 100 / value;
            } else if (from === 'mile_per_gallon_us') {
                base_value = 235.215 / value;
            } else if (from === 'mile_per_gallon_imp') {
                base_value = 282.481 / value;
            } else {
                base_value = value * this.units[from].factor;
            }
            
            if (to === 'km_per_liter') {
                return 100 / base_value;
            } else if (to === 'mile_per_gallon_us') {
                return 235.215 / base_value;
            } else if (to === 'mile_per_gallon_imp') {
                return 282.481 / base_value;
            } else {
                return base_value / this.units[to].factor;
            }
        }
    }
};

// Elementos do DOM
const categorySelect = document.getElementById('category');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const fromValueInput = document.getElementById('fromValue');
const toValueInput = document.getElementById('toValue');
const swapButton = document.getElementById('swapButton');
const precisionSelect = document.getElementById('precision');
const formulaDisplay = document.getElementById('formula');
const quickResults = document.getElementById('quickResults');

// Inicialização com animações
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero elements
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('fade-in');
    }, 200);
    
    setTimeout(() => {
        document.querySelector('.converter-container').classList.add('fade-in');
    }, 400);
    
    populateUnits('length');
    setupEventListeners();
    createParticles();
});

function setupEventListeners() {
    categorySelect.addEventListener('change', function() {
        this.classList.add('loading');
        setTimeout(() => {
            populateUnits(this.value);
            this.classList.remove('loading');
        }, 300);
    });
    
    fromUnitSelect.addEventListener('change', updateConversion);
    toUnitSelect.addEventListener('change', updateConversion);
    fromValueInput.addEventListener('input', debounce(updateConversion, 300));
    precisionSelect.addEventListener('change', updateConversion);
    
    swapButton.addEventListener('click', swapUnits);
    
    toValueInput.addEventListener('input', function() {
        if (this.value !== '') {
            reverseConversion();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            swapUnits();
        }
        
        if (e.key === 'Escape') {
            fromValueInput.value = '';
            toValueInput.value = '';
            updateConversion();
        }
    });
}

function populateUnits(category) {
    const categoryData = units[category];
    if (!categoryData) return;
    
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    Object.keys(categoryData.units).forEach(unitKey => {
        const unit = categoryData.units[unitKey];
        
        const fromOption = new Option(unit.name, unitKey);
        const toOption = new Option(unit.name, unitKey);
        
        fromUnitSelect.add(fromOption);
        toUnitSelect.add(toOption);
    });
    
    fromUnitSelect.value = categoryData.base;
    const toKeys = Object.keys(categoryData.units);
    toUnitSelect.value = toKeys.find(key => key !== categoryData.base) || toKeys[1] || toKeys;
    
    updateConversion();
}

function updateConversion() {
    const category = categorySelect.value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const value = parseFloat(fromValueInput.value);
    
    if (isNaN(value) || value === '') {
        toValueInput.value = '';
        formulaDisplay.textContent = 'Digite um valor para visualizar o resultado';
        quickResults.innerHTML = '<div class="no-results">Aguardando entrada de dados...</div>';
        return;
    }
    
    const result = convertValue(category, value, fromUnit, toUnit);
    const precision = parseInt(precisionSelect.value);
    
    // Animate result
    toValueInput.style.transform = 'scale(1.05)';
    setTimeout(() => {
        toValueInput.style.transform = 'scale(1)';
    }, 200);
    
    toValueInput.value = formatResult(result, precision);
    updateFormula(category, fromUnit, toUnit, value);
    updateQuickConversions(category, value, fromUnit);
    
    addToHistory(category, value, fromUnit, result, toUnit);
}

function reverseConversion() {
    const category = categorySelect.value;
    const fromUnit = toUnitSelect.value;
    const toUnit = fromUnitSelect.value;
    const value = parseFloat(toValueInput.value);
    
    if (isNaN(value) || value === '') {
        fromValueInput.value = '';
        return;
    }
    
    const result = convertValue(category, value, fromUnit, toUnit);
    const precision = parseInt(precisionSelect.value);
    
    fromValueInput.value = formatResult(result, precision);
}

function convertValue(category, value, fromUnit, toUnit) {
    const categoryData = units[category];
    
    if (categoryData.convert) {
        return categoryData.convert(value, fromUnit, toUnit);
    }
    
    const fromFactor = categoryData.units[fromUnit].factor;
    const toFactor = categoryData.units[toUnit].factor;
    
    const baseValue = value * fromFactor;
    return baseValue / toFactor;
}

function formatResult(value, precision) {
    if (value === Infinity || value === -Infinity) {
        return 'Infinito';
    }
    if (isNaN(value)) {
        return 'Inválido';
    }
    
    if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
        return value.toExponential(precision);
    }
    
    return value.toFixed(precision);
}

function updateFormula(category, fromUnit, toUnit, value) {
    const categoryData = units[category];
    const fromUnitData = categoryData.units[fromUnit];
    const toUnitData = categoryData.units[toUnit];
    
    let formulaText;
    
    if (category === 'temperature') {
        formulaText = getTemperatureFormula(fromUnit, toUnit);
    } else if (category === 'fuel_consumption' && (fromUnit.includes('per_gallon') || toUnit.includes('per_gallon') || fromUnit === 'km_per_liter' || toUnit === 'km_per_liter')) {
        formulaText = 'Conversão especial para eficiência de combustível';
    } else {
        const factor = fromUnitData.factor / toUnitData.factor;
        formulaText = `${fromUnitData.name} × ${factor.toExponential(6)} = ${toUnitData.name}`;
    }
    
    formulaDisplay.innerHTML = formulaText;
}

function getTemperatureFormula(from, to) {
    const formulas = {
        'celsius_fahrenheit': '°F = (°C × 9/5) + 32',
        'fahrenheit_celsius': '°C = (°F - 32) × 5/9',
        'celsius_kelvin': 'K = °C + 273.15',
        'kelvin_celsius': '°C = K - 273.15',
        'celsius_rankine': '°R = (°C + 273.15) × 9/5',
        'rankine_celsius': '°C = (°R × 5/9) - 273.15',
        'celsius_reaumur': '°Ré = °C × 4/5',
        'reaumur_celsius': '°C = °Ré × 5/4'
    };
    
    const key = `${from}_${to}`;
    return formulas[key] || `Conversão de ${from} para ${to}`;
}

function updateQuickConversions(category, value, fromUnit) {
    const categoryData = units[category];
    const commonUnits = getCommonUnits(category, fromUnit);
    
    quickResults.innerHTML = '';
    
    commonUnits.forEach((unitKey, index) => {
        if (unitKey !== fromUnit) {
            const result = convertValue(category, value, fromUnit, unitKey);
            const precision = Math.abs(result) < 1000 ? 4 : 2;
            
            const quickDiv = document.createElement('div');
            quickDiv.className = 'quick-result';
            quickDiv.style.animationDelay = `${index * 0.1}s`;
            quickDiv.innerHTML = `
                <div class="quick-value">${formatResult(result, precision)}</div>
                <div class="quick-unit">${categoryData.units[unitKey].name}</div>
            `;
            
            quickDiv.addEventListener('click', () => {
                copyToClipboard(formatResult(result, precision));
                showNotification('Valor copiado!');
            });
            
            quickResults.appendChild(quickDiv);
        }
    });
}

function getCommonUnits(category, currentUnit) {
    const common = {
        length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard'],
        area: ['square_meter', 'square_kilometer', 'hectare', 'square_foot', 'acre'],
        volume: ['liter', 'milliliter', 'cubic_meter', 'gallon', 'cup'],
        mass: ['kilogram', 'gram', 'pound', 'ounce', 'metric_ton'],
        temperature: ['celsius', 'fahrenheit', 'kelvin'],
        time: ['second', 'minute', 'hour', 'day', 'year'],
        speed: ['meter_per_second', 'kilometer_per_hour', 'mile_per_hour', 'knot'],
        power: ['watt', 'kilowatt', 'horsepower'],
        energy: ['joule', 'kilowatt_hour', 'calorie', 'kilocalorie'],
        data: ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte']
    };
    
    return common[category] || Object.keys(units[category].units).slice(0, 6);
}

function swapUnits() {
    const fromValue = fromUnitSelect.value;
    const toValue = toUnitSelect.value;
    
    // Animate swap
    swapButton.style.transform = 'scale(0.8) rotate(180deg)';
    setTimeout(() => {
        swapButton.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
    
    fromUnitSelect.value = toValue;
    toUnitSelect.value = fromValue;
    
    const fromInputValue = fromValueInput.value;
    const toInputValue = toValueInput.value;
    
    fromValueInput.value = toInputValue;
    toValueInput.value = fromInputValue;
    
    updateConversion();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles-background');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 71, 87, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// History functionality
let conversionHistory = [];

function addToHistory(category, fromValue, fromUnit, toValue, toUnit) {
    const entry = {
        timestamp: new Date(),
        category,
        fromValue,
        fromUnit,
        toValue,
        toUnit
    };
    
    conversionHistory.unshift(entry);
    if (conversionHistory.length > 10) {
        conversionHistory.pop();
    }
}