# 📐 CALCULADORAS FITNESS - Guía Completa

## 🎯 **1. Calculadora de 1RM (One Rep Max)**

### ¿Qué es el 1RM?
**El peso máximo que puedes levantar en 1 sola repetición con buena técnica.**

### ¿Por qué es importante?
- Medir fuerza absoluta
- Programar entrenamientos basados en % del 1RM
- Establecer metas de fuerza
- Comparar progreso en el tiempo

---

### **Fórmulas Principales**

#### **1. Fórmula de Epley** (la más usada)
```
1RM = Peso × (1 + Reps/30)

Ejemplo:
100kg × 5 reps
1RM = 100 × (1 + 5/30)
1RM = 100 × (1 + 0.167)
1RM = 100 × 1.167
1RM = 116.7 kg
```

#### **2. Fórmula de Brzycki**
```
1RM = Peso × (36 / (37 - Reps))

Ejemplo:
100kg × 5 reps
1RM = 100 × (36 / (37 - 5))
1RM = 100 × (36 / 32)
1RM = 112.5 kg
```

#### **3. Fórmula de Lombardi**
```
1RM = Peso × Reps^0.10

Ejemplo:
100kg × 5 reps
1RM = 100 × 5^0.10
1RM = 100 × 1.175
1RM = 117.5 kg
```

### **Tabla de Precisión por Rango de Reps:**

| Reps | Mejor Fórmula | Margen Error |
|---|---|---|
| 1-3 | Test directo | Muy preciso |
| 4-6 | Epley | ±3% |
| 7-10 | Brzycki | ±5% |
| 11-15 | Lombardi | ±8% |
| 16+ | No confiable | ±15%+ |

---

### **Implementación en GymMate:**

```javascript
function calculate1RM(peso, reps) {
    if (reps === 1) {
        return peso; // Ya es tu 1RM
    }

    // Usar Epley como default
    const epley = peso * (1 + reps / 30);

    // Calcular otras fórmulas para comparación
    const brzycki = peso * (36 / (37 - reps));
    const lombardi = peso * Math.pow(reps, 0.10);

    // Promedio de las 3 fórmulas
    const average = (epley + brzycki + lombardi) / 3;

    return {
        epley: epley.toFixed(1),
        brzycki: brzycki.toFixed(1),
        lombardi: lombardi.toFixed(1),
        promedio: average.toFixed(1),
        confianza: reps <= 6 ? 'Alta' : reps <= 10 ? 'Media' : 'Baja'
    };
}
```

---

### **Tabla de Porcentajes del 1RM:**

| % del 1RM | Reps Aproximadas | Uso Típico |
|---|---|---|
| 100% | 1 rep | Test de fuerza máxima |
| 95% | 2 reps | Fuerza pura |
| 90% | 4 reps | Fuerza pura |
| 85% | 6 reps | Fuerza-Hipertrofia |
| 80% | 8 reps | Hipertrofia |
| 75% | 10 reps | Hipertrofia |
| 70% | 12 reps | Hipertrofia |
| 65% | 15 reps | Resistencia muscular |
| 60% | 18 reps | Resistencia |

### Ejemplo de Programación:
```
Tu 1RM de Sentadilla = 140kg

Semana de Fuerza (5×3 al 85%):
→ 140kg × 0.85 = 119kg
→ Trabajas 5 series de 3 reps con 119kg

Semana de Hipertrofia (4×10 al 70%):
→ 140kg × 0.70 = 98kg
→ Trabajas 4 series de 10 reps con 98kg
```

---

## 🍔 **2. Calculadora de Calorías**

### **TDEE (Total Daily Energy Expenditure)**

Formula completa:
```
TDEE = BMR × Factor de Actividad

Donde:
BMR = Basal Metabolic Rate (metabolismo basal)
Factor de Actividad = Nivel de ejercicio
```

---

### **Paso 1: Calcular BMR**

#### **Fórmula de Mifflin-St Jeor (más precisa):**

**Hombres:**
```
BMR = (10 × peso_kg) + (6.25 × altura_cm) - (5 × edad) + 5

Ejemplo:
Hombre de 80kg, 180cm, 30 años
BMR = (10 × 80) + (6.25 × 180) - (5 × 30) + 5
BMR = 800 + 1125 - 150 + 5
BMR = 1780 calorías
```

**Mujeres:**
```
BMR = (10 × peso_kg) + (6.25 × altura_cm) - (5 × edad) - 161

Ejemplo:
Mujer de 65kg, 165cm, 28 años
BMR = (10 × 65) + (6.25 × 165) - (5 × 28) - 161
BMR = 650 + 1031.25 - 140 - 161
BMR = 1380 calorías
```

---

### **Paso 2: Aplicar Factor de Actividad**

| Nivel Actividad | Factor | Descripción |
|---|---|---|
| Sedentario | 1.2 | Poco o ningún ejercicio |
| Ligera | 1.375 | 1-3 días/semana |
| Moderada | 1.55 | 3-5 días/semana (GymMate user típico) |
| Intensa | 1.725 | 6-7 días/semana |
| Muy Intensa | 1.9 | 2 veces al día, atleta |

### Ejemplo Completo:
```
Hombre de 80kg, 180cm, 30 años
Entrena 4 días/semana (Moderada)

BMR = 1780 calorías
TDEE = 1780 × 1.55 = 2759 calorías/día

→ Necesita 2759 cal/día para MANTENER peso
```

---

### **Paso 3: Ajustar según Objetivo**

| Objetivo | Ajuste | Calorías Finales |
|---|---|---|
| **Perder Grasa** | TDEE - 20% | 2759 - 552 = **2207 cal** |
| **Perder Grasa Rápido** | TDEE - 30% | 2759 - 828 = **1931 cal** |
| **Mantener** | TDEE + 0% | **2759 cal** |
| **Ganar Músculo (lean bulk)** | TDEE + 10% | 2759 + 276 = **3035 cal** |
| **Ganar Peso Rápido** | TDEE + 20% | 2759 + 552 = **3311 cal** |

---

### **Macros (Proteína/Carbos/Grasas)**

#### **Proteína:**
```
Objetivo General: 1.6-2.2g por kg de peso corporal

Ejemplo para 80kg:
Mínimo = 80 × 1.6 = 128g proteína/día
Óptimo = 80 × 2.0 = 160g proteína/día
Máximo = 80 × 2.2 = 176g proteína/día
```

#### **Grasas:**
```
Mínimo saludable: 0.8g por kg
Óptimo: 1.0g por kg

Ejemplo para 80kg:
Grasas = 80 × 1.0 = 80g/día
```

#### **Carbohidratos:**
```
Llenan el resto de calorías

Si tu meta es 2759 cal:
Proteína: 160g × 4 cal/g = 640 cal
Grasas: 80g × 9 cal/g = 720 cal
Total usado: 1360 cal
Carbos disponibles: 2759 - 1360 = 1399 cal
Carbos en gramos: 1399 / 4 = 349g
```

---

### **Implementación en GymMate:**

```javascript
function calculateCalories(peso, altura, edad, sexo, actividadLevel, objetivo) {
    // 1. Calcular BMR
    let bmr;
    if (sexo === 'hombre') {
        bmr = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    } else {
        bmr = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    }

    // 2. Factor de actividad
    const factores = {
        'sedentario': 1.2,
        'ligero': 1.375,
        'moderado': 1.55,
        'intenso': 1.725,
        'muy_intenso': 1.9
    };

    const tdee = bmr * factores[actividadLevel];

    // 3. Ajustar por objetivo
    const ajustes = {
        'perder_grasa': 0.8,
        'perder_rapido': 0.7,
        'mantener': 1.0,
        'ganar_musculo': 1.1,
        'ganar_rapido': 1.2
    };

    const caloriasObjetivo = tdee * ajustes[objetivo];

    // 4. Calcular macros
    const proteina = peso * 2.0; // g
    const grasas = peso * 1.0; // g
    const carbos = (caloriasObjetivo - (proteina * 4) - (grasas * 9)) / 4; // g

    return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        objetivo: Math.round(caloriasObjetivo),
        macros: {
            proteina: Math.round(proteina),
            carbos: Math.round(carbos),
            grasas: Math.round(grasas)
        }
    };
}
```

---

## 📈 **3. Calculadora de Peso Progresivo**

### **Concepto: Sobrecarga Progresiva**

Para ganar fuerza/músculo debes:
1. Incrementar peso
2. Incrementar reps
3. Incrementar sets
4. Mejorar técnica/rango de movimiento

---

### **Métodos de Progresión:**

#### **1. Progresión Lineal Simple**
```
Semana 1: 100kg × 3×8
Semana 2: 102.5kg × 3×8 (+2.5kg)
Semana 3: 105kg × 3×8 (+2.5kg)
Semana 4: 107.5kg × 3×8 (+2.5kg)
```

**Incrementos sugeridos:**
- Ejercicios de pierna: +5kg por semana
- Press/Row: +2.5kg por semana
- Aislados (curl, lateral): +1-2kg cada 2 semanas

---

#### **2. Progresión Doble (Reps primero)**
```
Semana 1: 100kg × 3×8 (24 reps totales)
Semana 2: 100kg × 3×9 (27 reps totales)
Semana 3: 100kg × 3×10 (30 reps totales)
Semana 4: 102.5kg × 3×8 (INCREMENTO DE PESO, resetear reps)
```

**Ventaja:** Más seguro, construyes base técnica

---

#### **3. Sistema de Rangos**
```
Objetivo: 3×8-12 reps

Semana 1: 100kg × 3×8 (límite inferior)
Semana 2: 100kg × 3×9
Semana 3: 100kg × 3×10
Semana 4: 100kg × 3×11
Semana 5: 100kg × 3×12 (límite superior alcanzado)
Semana 6: 105kg × 3×8 (incrementar peso, volver a límite inferior)
```

---

### **Calculadora de Incrementos:**

```javascript
function calcularProgresivoWeight(pesoActual, repsActual, objetivo, ejercicio) {
    const incrementos = {
        'sentadilla': 5,
        'peso_muerto': 5,
        'press_banca': 2.5,
        'press_militar': 2.5,
        'remo': 2.5,
        'curl': 1,
        'lateral_raise': 1
    };

    const incremento = incrementos[ejercicio] || 2.5;

    // Si ya alcanzó el límite superior de reps
    if (repsActual >= objetivo.max) {
        return {
            accion: 'incrementar_peso',
            nuevoPeso: pesoActual + incremento,
            nuevasReps: objetivo.min,
            mensaje: `¡Progresión! Incrementa a ${(pesoActual + incremento)}kg y vuelve a ${objetivo.min} reps`
        };
    }

    // Si está dentro del rango, aumentar reps
    if (repsActual < objetivo.max) {
        return {
            accion: 'incrementar_reps',
            nuevoPeso: pesoActual,
            nuevasReps: repsActual + 1,
            mensaje: `Mantén ${pesoActual}kg pero aumenta a ${repsActual + 1} reps`
        };
    }
}
```

---

### **Regla de 2:1 (Rep Progression)**
```
Cuando puedes hacer +2 reps más del objetivo en todas las series
→ Incrementa peso

Ejemplo:
Objetivo: 3×10
Logras: 3×12
→ Sube peso y vuelve a 3×10
```

---

### **Tabla de Progresión Típica (12 semanas):**

| Semana | Peso | Sets×Reps | Volumen |
|---|---|---|---|
| 1 | 100kg | 3×8 | 2400 |
| 2 | 100kg | 3×9 | 2700 |
| 3 | 100kg | 3×10 | 3000 |
| 4 | 102.5kg | 3×8 | 2460 |
| 5 | 102.5kg | 3×9 | 2767.5 |
| 6 | 102.5kg | 3×10 | 3075 |
| 7 | 105kg | 3×8 | 2520 |
| 8 | 105kg | 3×9 | 2835 |
| 9 | 105kg | 3×10 | 3150 |
| 10 | 107.5kg | 3×8 | 2580 |
| 11 | 107.5kg | 3×9 | 2902.5 |
| 12 | 107.5kg | 3×10 | 3225 |

**Resultado:** +7.5kg en 12 semanas (+7.5% fuerza)

---

## 🚀 **Implementación UI en GymMate**

### **Panel de Calculadoras:**

```html
<!-- Calculadora 1RM -->
<div class="calculator-card">
    <h3>📊 Calculadora de 1RM</h3>
    <input type="number" id="calc-peso" placeholder="Peso (kg)">
    <input type="number" id="calc-reps" placeholder="Reps">
    <button onclick="calcular1RM()">Calcular</button>

    <div id="resultado-1rm">
        <p>Tu 1RM estimado: <strong>125kg</strong></p>
        <table>
            <tr><td>95% (2 reps)</td><td>119kg</td></tr>
            <tr><td>90% (4 reps)</td><td>113kg</td></tr>
            <tr><td>85% (6 reps)</td><td>106kg</td></tr>
            <tr><td>80% (8 reps)</td><td>100kg</td></tr>
        </table>
    </div>
</div>

<!-- Calculadora Calorías -->
<div class="calculator-card">
    <h3>🍔 Calculadora de Calorías</h3>
    <input type="number" placeholder="Peso (kg)">
    <input type="number" placeholder="Altura (cm)">
    <input type="number" placeholder="Edad">
    <select>
        <option>Hombre</option>
        <option>Mujer</option>
    </select>
    <select>
        <option>Sedentario</option>
        <option>Moderado</option>
        <option>Muy Activo</option>
    </select>
    <button>Calcular</button>

    <div id="resultado-calorias">
        <p>TDEE: <strong>2759 cal/día</strong></p>
        <p>Para perder grasa: 2207 cal/día</p>
        <p>Macros: 160g P / 349g C / 80g F</p>
    </div>
</div>

<!-- Calculadora Progresiva -->
<div class="calculator-card">
    <h3>📈 Próxima Progresión</h3>
    <select id="ejercicio">
        <option>Sentadilla</option>
        <option>Press Banca</option>
        <option>Peso Muerto</option>
    </select>
    <input type="number" placeholder="Peso actual">
    <input type="number" placeholder="Reps actuales">
    <button>Calcular Progresión</button>

    <div id="resultado-progresion">
        <p>✅ Próxima sesión: <strong>102.5kg × 3×8</strong></p>
        <p>Meta para incremento: Lograr 3×10</p>
    </div>
</div>
```

---

## 📊 **Resumen de Todas las Calculadoras**

| Calculadora | Input | Output | Uso |
|---|---|---|---|
| **1RM** | Peso + Reps | 1RM estimado + tabla % | Programar entrenos |
| **Calorías** | Peso/Altura/Edad/Actividad | TDEE + Macros | Nutrición |
| **Progresiva** | Peso actual + Reps | Próximo peso/reps | Progresión |

---

**¡Con estas 3 calculadoras tendrías un sistema completo para optimizar entrenamiento y nutrición!** 🚀
