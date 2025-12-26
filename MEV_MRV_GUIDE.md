# Analisis Cientifico - MEV/MRV

## Conceptos Fundamentales

### Que es MEV, MRV y MAV?

Estos son conceptos cientificos desarrollados por el Dr. Mike Israetel y Renaissance Periodization para optimizar el entrenamiento basandose en ciencia.

---

## 1. MEV (Minimum Effective Volume)

### Definicion:
**El volumen MINIMO de entrenamiento semanal necesario para ver progreso/ganancia muscular.**

### Como Funciona:
- Si entrenas **MENOS** que tu MEV: No hay progreso
- Si entrenas **EN** tu MEV: Progreso minimo pero sostenible
- Si entrenas **SOBRE** tu MEV: Mejor progreso

### Valores Tipicos por Grupo Muscular (sets/semana):

| Grupo Muscular | MEV (sets/semana) |
|---|---|
| Pecho | 10-12 sets |
| Espalda | 12-14 sets |
| Hombros | 8-10 sets |
| Biceps | 6-8 sets |
| Triceps | 6-8 sets |
| Cuadriceps | 12-14 sets |
| Gluteos | 8-12 sets |
| Isquios | 8-10 sets |

### Ejemplo en GymMate:
```
Si tu MEV para pecho es 10 sets/semana:

Semana actual: 6 sets de pecho
[X] Por debajo del MEV
-> Sugerencia: "Aumenta volumen de pecho, solo has hecho 6 sets esta semana (MEV: 10)"

Semana actual: 15 sets de pecho
[OK] Sobre el MEV
-> Estas en zona de progreso optimo
```

---

## 2. MRV (Maximum Recoverable Volume)

### Definicion:
**El volumen MAXIMO de entrenamiento que puedes recuperar en una semana.**

### Como Funciona:
- Si entrenas **MENOS** que tu MRV: Estas bien, puedes progresar
- Si entrenas **EN** tu MRV: Estas en el limite, maximo esfuerzo
- Si entrenas **SOBRE** tu MRV: Sobreentrenamiento, fatiga excesiva

### Valores Tipicos por Grupo Muscular (sets/semana):

| Grupo Muscular | MRV (sets/semana) |
|---|---|
| Pecho | 20-22 sets |
| Espalda | 22-25 sets |
| Hombros | 20-22 sets |
| Biceps | 20-26 sets |
| Triceps | 18-24 sets |
| Cuadriceps | 20-24 sets |
| Gluteos | 18-22 sets |
| Isquios | 16-20 sets |

### Senales de que Superaste tu MRV:
- Fatiga extrema constante
- Dolor articular persistente
- Fuerza disminuyendo en lugar de aumentar
- Mal sueno
- Falta de motivacion

### Ejemplo en GymMate:
```
Si tu MRV para espalda es 22 sets/semana:

Semana actual: 28 sets de espalda
[X] Sobre el MRV
-> Sugerencia: "Estas haciendo 28 sets de espalda (MRV: 22). Reduce volumen para evitar sobreentrenamiento"

Semana actual: 18 sets de espalda
[OK] Dentro del rango
-> Volumen optimo
```

---

## 3. MAV (Maximum Adaptive Volume)

### Definicion:
**El volumen que maximiza las ganancias sin llegar a sobreentrenamiento.**

### Como Funciona:
- MAV esta **entre MEV y MRV**
- Es el "sweet spot" de volumen
- Varia por persona y musculo

### Formula Simple:
```
MAV = MEV + (MRV - MEV) x 0.6
```

### Ejemplo:
```
Pecho:
MEV = 10 sets
MRV = 22 sets
MAV = 10 + (22-10) x 0.6 = 10 + 7.2 = 17.2 sets/semana

-> Tu zona optima para pecho es ~17 sets/semana
```

---

## Implementacion en GymMate (TypeScript)

### Sistema de Tracking MEV/MRV:

```typescript
// src/utils/mevMrv.ts

interface MEVMRVRange {
  mev: number;
  mrv: number;
  mav: number;
}

export const MEV_MRV_RANGES: Record<string, MEVMRVRange> = {
  Pecho: { mev: 10, mrv: 22, mav: 17 },
  Espalda: { mev: 12, mrv: 24, mav: 19 },
  Hombros: { mev: 8, mrv: 20, mav: 15 },
  Biceps: { mev: 6, mrv: 22, mav: 15 },
  Triceps: { mev: 6, mrv: 20, mav: 14 },
  Piernas: { mev: 12, mrv: 22, mav: 18 },
  Gluteos: { mev: 8, mrv: 20, mav: 15 },
};

export type VolumeSuggestion = {
  muscle: string;
  sets: number;
  status: 'under_mev' | 'optimal' | 'near_mav' | 'near_mrv' | 'over_mrv';
  message: string;
};

export function analyzeMEVMRV(weeklySets: Record<string, number>): VolumeSuggestion[] {
  const suggestions: VolumeSuggestion[] = [];

  Object.entries(weeklySets).forEach(([muscle, sets]) => {
    const range = MEV_MRV_RANGES[muscle];
    if (!range) return;

    let status: VolumeSuggestion['status'];
    let message: string;

    if (sets < range.mev) {
      status = 'under_mev';
      message = `${muscle}: ${sets} sets/semana esta BAJO el MEV (${range.mev}). Aumenta volumen.`;
    } else if (sets > range.mrv) {
      status = 'over_mrv';
      message = `${muscle}: ${sets} sets/semana SUPERA el MRV (${range.mrv}). Reduce volumen.`;
    } else if (sets >= range.mav - 2 && sets <= range.mav + 2) {
      status = 'optimal';
      message = `${muscle}: ${sets} sets/semana esta en el MAV optimo (~${range.mav}).`;
    } else if (sets < range.mav) {
      status = 'near_mav';
      message = `${muscle}: ${sets} sets/semana. Puedes aumentar hacia MAV (${range.mav}).`;
    } else {
      status = 'near_mrv';
      message = `${muscle}: ${sets} sets/semana. Estas cerca del MRV, monitorea recuperacion.`;
    }

    suggestions.push({ muscle, sets, status, message });
  });

  return suggestions;
}
```

---

## Visualizacion en GymMate

### Dashboard de MEV/MRV (ejemplo de UI):

```
Pecho: [================----] 15/22 sets (68% del MRV)
   MEV |            MAV |        MRV |
   10               17            22

[OK] Estas en zona optima (MAV)

Espalda: [===================-] 19/24 sets (79% del MRV)
   MEV |            MAV |        MRV |
   12               19            24

[OK] Perfecto, en el MAV

Hombros: [======================] 24/20 sets (120% del MRV!)
   MEV |            MAV |        MRV |
   8                15            20

[X] SOBRE MRV - Reduce volumen de hombros
```

---

## Casos de Uso Reales

### Escenario 1: Principiante
```
Usuario nuevo, primer mes:

Pecho: 8 sets/semana
-> Por debajo de MEV (10)
-> Sugerencia: "Anade 1-2 sets mas de pecho para alcanzar MEV"
```

### Escenario 2: Intermedio Progresando
```
Usuario con 6 meses:

Espalda: 18 sets/semana
-> En zona MAV (19)
-> Sugerencia: "Volumen optimo para espalda, manten este rango"
```

### Escenario 3: Avanzado Sobre-entrenando
```
Usuario competitivo:

Piernas: 26 sets/semana
-> Sobre MRV (22)
-> Sugerencia: "Has superado el MRV de piernas. Semana de deload recomendada (-50% volumen)"
```

---

## Grafico de Zona Optima

```
Volumen
  |
  |                    ZONA DE
  |                 SOBREENTRENAMIENTO
  | MRV +------------------------------
  |     |         ZONA          |
  | MAV +      ALTA GANANCIA     |
  |     |     (Sweet Spot)      |
  | MEV +------------------------------
  |     |    ZONA DE PROGRESO   |
  |     |       MINIMO          |
  |  0  +------------------------------
  +------------------------------------> Tiempo

  Debajo de MEV = Sin progreso
  Entre MEV-MAV = Progreso bueno
  En MAV = Progreso optimo
  Entre MAV-MRV = Progreso bueno pero alta fatiga
  Sobre MRV = Sobreentrenamiento
```

---

## Individualizacion

### IMPORTANTE
Los rangos MEV/MRV son **puntos de partida**, no verdades absolutas.

### Factores que Afectan tu MEV/MRV:
1. **Genetica** - Algunos recuperan mejor
2. **Experiencia** - Principiantes necesitan menos
3. **Edad** - +40 anos = MRV mas bajo
4. **Sueno** - Mal sueno = menor MRV
5. **Estres** - Alto estres = menor MRV
6. **Nutricion** - Deficit calorico = menor MRV
7. **Calidad de entreno** - Tecnica pobre = puedes hacer mas sets

### Como Encontrar TU MEV/MRV:

**Semana 1-2:** Empieza con MEV
**Semana 3-4:** Aumenta +2 sets
**Semana 5-6:** Aumenta +2 sets mas
**Semana 7:** Si sientes fatiga extrema, estas cerca del MRV

```
Ejemplo:
Pecho Semana 1: 10 sets (MEV)
Pecho Semana 3: 12 sets (+2)
Pecho Semana 5: 14 sets (+2)
Pecho Semana 7: 16 sets (+2)
Pecho Semana 8: Fatiga excesiva -> MRV = 16 sets para ti
```

---

## Resumen Ejecutivo

| Concepto | Definicion | Accion |
|---|---|---|
| **MEV** | Minimo para progresar | No entrenes menos de esto |
| **MAV** | Optimo para ganancias | Intenta estar aqui |
| **MRV** | Maximo recuperable | No excedas esto |

### Regla de Oro:
```
Empieza en MEV -> Aumenta gradualmente ->
Para cuando llegues cerca del MRV ->
Semana de deload -> Repite
```

---

## Implementacion Futura en GymMate

### Features a Anadir:
1. Input de MEV/MRV personalizado por usuario
2. Contador automatico de sets semanales
3. Alertas cuando te acercas al MRV
4. Sugerencias de deload cuando excedes MRV
5. Graficos de progresion MEV -> MAV -> MRV
6. Analisis de fatiga acumulada

---

## Bibliografia

- Dr. Mike Israetel - Renaissance Periodization
- Scientific Principles of Strength Training
- The Muscle & Strength Pyramid - Eric Helms

---

**Version:** 3.1.0
**Ultima actualizacion:** Diciembre 2025
