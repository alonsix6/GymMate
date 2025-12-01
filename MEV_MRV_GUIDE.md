# 🧪 ANÁLISIS CIENTÍFICO - MEV/MRV

## 📚 Conceptos Fundamentales

### ¿Qué es MEV, MRV y MAV?

Estos son conceptos científicos desarrollados por el Dr. Mike Israetel y Renaissance Periodization para optimizar el entrenamiento basándose en ciencia.

---

## 📊 **1. MEV (Minimum Effective Volume)**

### Definición:
**El volumen MÍNIMO de entrenamiento semanal necesario para ver progreso/ganancia muscular.**

### Cómo Funciona:
- Si entrenas **MENOS** que tu MEV → No hay progreso
- Si entrenas **EN** tu MEV → Progreso mínimo pero sostenible
- Si entrenas **SOBRE** tu MEV → Mejor progreso

### Valores Típicos por Grupo Muscular (sets/semana):

| Grupo Muscular | MEV (sets/semana) |
|---|---|
| Pecho | 10-12 sets |
| Espalda | 12-14 sets |
| Hombros | 8-10 sets |
| Bíceps | 6-8 sets |
| Tríceps | 6-8 sets |
| Cuádriceps | 12-14 sets |
| Glúteos | 8-12 sets |
| Isquios | 8-10 sets |

### Ejemplo en GymMate:
```
Si tu MEV para pecho es 10 sets/semana:

Semana actual: 6 sets de pecho
❌ Por debajo del MEV
→ Sugerencia IA: "Aumenta volumen de pecho, solo has hecho 6 sets esta semana (MEV: 10)"

Semana actual: 15 sets de pecho
✅ Sobre el MEV
→ Estás en zona de progreso óptimo
```

---

## 🎯 **2. MRV (Maximum Recoverable Volume)**

### Definición:
**El volumen MÁXIMO de entrenamiento que puedes recuperar en una semana.**

### Cómo Funciona:
- Si entrenas **MENOS** que tu MRV → Estás bien, puedes progresar
- Si entrenas **EN** tu MRV → Estás en el límite, máximo esfuerzo
- Si entrenas **SOBRE** tu MRV → Sobreentrenamiento, fatiga excesiva

### Valores Típicos por Grupo Muscular (sets/semana):

| Grupo Muscular | MRV (sets/semana) |
|---|---|
| Pecho | 20-22 sets |
| Espalda | 22-25 sets |
| Hombros | 20-22 sets |
| Bíceps | 20-26 sets |
| Tríceps | 18-24 sets |
| Cuádriceps | 20-24 sets |
| Glúteos | 18-22 sets |
| Isquios | 16-20 sets |

### Señales de que Superaste tu MRV:
- ⚠️ Fatiga extrema constante
- ⚠️ Dolor articular persistente
- ⚠️ Fuerza disminuyendo en lugar de aumentar
- ⚠️ Mal sueño
- ⚠️ Falta de motivación

### Ejemplo en GymMate:
```
Si tu MRV para espalda es 22 sets/semana:

Semana actual: 28 sets de espalda
❌ Sobre el MRV
→ Sugerencia IA: "Estás haciendo 28 sets de espalda (MRV: 22). Reduce volumen para evitar sobreentrenamiento"

Semana actual: 18 sets de espalda
✅ Dentro del rango
→ Volumen óptimo
```

---

## 🚀 **3. MAV (Maximum Adaptive Volume)**

### Definición:
**El volumen que maximiza las ganancias sin llegar a sobreentrenamiento.**

### Cómo Funciona:
- MAV está **entre MEV y MRV**
- Es el "sweet spot" de volumen
- Varía por persona y músculo

### Fórmula Simple:
```
MAV ≈ MEV + (MRV - MEV) × 0.6
```

### Ejemplo:
```
Pecho:
MEV = 10 sets
MRV = 22 sets
MAV = 10 + (22-10) × 0.6 = 10 + 7.2 = 17.2 sets/semana

→ Tu zona óptima para pecho es ~17 sets/semana
```

---

## 🔬 **Cómo Implementarlo en GymMate**

### **Sistema de Tracking MEV/MRV:**

```javascript
const mevMrvRanges = {
    "Pecho": { mev: 10, mrv: 22, mav: 17 },
    "Espalda": { mev: 12, mrv: 24, mav: 19 },
    "Hombros": { mev: 8, mrv: 20, mav: 15 },
    "Bíceps": { mev: 6, mrv: 22, mav: 15 },
    "Tríceps": { mev: 6, mrv: 20, mav: 14 },
    "Piernas": { mev: 12, mrv: 22, mav: 18 },
    "Glúteos": { mev: 8, mrv: 20, mav: 15 }
};

function analyzeMEVMRV() {
    const history = getLast7Days();
    const weeklySets = calculateWeeklySets(history);

    Object.entries(weeklySets).forEach(([muscle, sets]) => {
        const range = mevMrvRanges[muscle];

        if (sets < range.mev) {
            return `⚠️ ${muscle}: ${sets} sets/semana está BAJO el MEV (${range.mev}). Aumenta volumen.`;
        } else if (sets > range.mrv) {
            return `🛑 ${muscle}: ${sets} sets/semana SUPERA el MRV (${range.mrv}). Reduce volumen.`;
        } else if (sets >= range.mav - 2 && sets <= range.mav + 2) {
            return `✅ ${muscle}: ${sets} sets/semana está en el MAV óptimo (~${range.mav}).`;
        } else if (sets < range.mav) {
            return `💪 ${muscle}: ${sets} sets/semana. Puedes aumentar hacia MAV (${range.mav}).`;
        } else {
            return `⚖️ ${muscle}: ${sets} sets/semana. Estás cerca del MRV, monitorea recuperación.`;
        }
    });
}
```

---

## 📈 **Visualización en GymMate**

### **Dashboard de MEV/MRV:**

```
🔵 Pecho: ████████████░░░░░░░░ 15/22 sets (68% del MRV)
   MEV ▼            MAV ▼        MRV ▼
   10               17            22

✅ Estás en zona óptima (MAV)

🟢 Espalda: ███████████████░░░░░ 19/24 sets (79% del MRV)
   MEV ▼            MAV ▼        MRV ▼
   12               19            24

✅ Perfecto, en el MAV

🔴 Hombros: ██████████████████████ 24/20 sets (120% del MRV!)
   MEV ▼            MAV ▼        MRV ▼
   8                15            20

❌ SOBRE MRV - Reduce volumen de hombros
```

---

## 🎯 **Casos de Uso Reales**

### **Escenario 1: Principiante**
```
Usuario nuevo, primer mes:

Pecho: 8 sets/semana
→ Por debajo de MEV (10)
→ Sugerencia: "Añade 1-2 sets más de pecho para alcanzar MEV"
```

### **Escenario 2: Intermedio Progresando**
```
Usuario con 6 meses:

Espalda: 18 sets/semana
→ En zona MAV (19)
→ Sugerencia: "Volumen óptimo para espalda, mantén este rango"
```

### **Escenario 3: Avanzado Sobre-entrenando**
```
Usuario competitivo:

Piernas: 26 sets/semana
→ Sobre MRV (22)
→ Sugerencia: "Has superado el MRV de piernas. Semana de deload recomendada (-50% volumen)"
```

---

## 📊 **Gráfico de Zona Óptima**

```
Volumen
  ▲
  │                    ZONA DE
  │                 SOBREENTRENAMIENTO
  │ MRV ┼─────────────────────────────
  │     │         ZONA          │
  │ MAV ┼      ALTA GANANCIA     │
  │     │     (Sweet Spot)      │
  │ MEV ┼─────────────────────────────
  │     │    ZONA DE PROGRESO   │
  │     │       MÍNIMO          │
  │  0  ┼─────────────────────────────
  └──────────────────────────────────► Tiempo

  Debajo de MEV = Sin progreso
  Entre MEV-MAV = Progreso bueno
  En MAV = Progreso óptimo
  Entre MAV-MRV = Progreso bueno pero alta fatiga
  Sobre MRV = Sobreentrenamiento
```

---

## 🔬 **Individualización**

### **¡IMPORTANTE!**
Los rangos MEV/MRV son **puntos de partida**, no verdades absolutas.

### Factores que Afectan tu MEV/MRV:
1. **Genética** - Algunos recuperan mejor
2. **Experiencia** - Principiantes necesitan menos
3. **Edad** - +40 años = MRV más bajo
4. **Sueño** - Mal sueño = menor MRV
5. **Estrés** - Alto estrés = menor MRV
6. **Nutrición** - Déficit calórico = menor MRV
7. **Calidad de entreno** - Técnica pobre = puedes hacer más sets

### Cómo Encontrar TU MEV/MRV:

**Semana 1-2:** Empieza con MEV
**Semana 3-4:** Aumenta +2 sets
**Semana 5-6:** Aumenta +2 sets más
**Semana 7:** Si sientes fatiga extrema, estás cerca del MRV

```
Ejemplo:
Pecho Semana 1: 10 sets (MEV)
Pecho Semana 3: 12 sets (+2)
Pecho Semana 5: 14 sets (+2)
Pecho Semana 7: 16 sets (+2)
Pecho Semana 8: Fatiga excesiva → MRV ≈ 16 sets para ti
```

---

## 🎓 **Resumen Ejecutivo**

| Concepto | Definición | Acción |
|---|---|---|
| **MEV** | Mínimo para progresar | No entrenes menos de esto |
| **MAV** | Óptimo para ganancias | Intenta estar aquí |
| **MRV** | Máximo recuperable | No excedas esto |

### **Regla de Oro:**
```
Empieza en MEV → Aumenta gradualmente →
Para cuando llegues cerca del MRV →
Semana de deload → Repite
```

---

## 🚀 **Implementación Futura en GymMate**

### Features a Añadir:
1. ✅ Input de MEV/MRV personalizado por usuario
2. ✅ Contador automático de sets semanales
3. ✅ Alertas cuando te acercas al MRV
4. ✅ Sugerencias de deload cuando excedes MRV
5. ✅ Gráficos de progresión MEV → MAV → MRV
6. ✅ Análisis de fatiga acumulada

---

**Bibliografía:**
- Dr. Mike Israetel - Renaissance Periodization
- Scientific Principles of Strength Training
- The Muscle & Strength Pyramid - Eric Helms
