# Calculadoras Fitness - Guia Completa

## 1. Calculadora de 1RM (One Rep Max)

### Que es el 1RM?

El peso maximo que puedes levantar en 1 sola repeticion con buena tecnica.

### Por que es importante?

- Medir fuerza absoluta
- Programar entrenamientos basados en % del 1RM
- Establecer metas de fuerza
- Comparar progreso en el tiempo

---

### Formulas Principales

#### 1. Formula de Epley (la mas usada)

```
1RM = Peso x (1 + Reps/30)

Ejemplo:
100kg x 5 reps
1RM = 100 x (1 + 5/30)
1RM = 100 x 1.167
1RM = 116.7 kg
```

#### 2. Formula de Brzycki

```
1RM = Peso x (36 / (37 - Reps))

Ejemplo:
100kg x 5 reps
1RM = 100 x (36 / 32)
1RM = 112.5 kg
```

#### 3. Formula de Lombardi

```
1RM = Peso x Reps^0.10

Ejemplo:
100kg x 5 reps
1RM = 100 x 5^0.10
1RM = 117.5 kg
```

### Tabla de Precision por Rango de Reps

| Reps | Mejor Formula | Margen Error |
|------|---------------|--------------|
| 1-3  | Test directo  | Muy preciso  |
| 4-6  | Epley         | ±3%          |
| 7-10 | Brzycki       | ±5%          |
| 11-15| Lombardi      | ±8%          |
| 16+  | No confiable  | ±15%+        |

---

### Implementacion en GymMate (TypeScript)

```typescript
// src/utils/calculations.ts

export function calculate1RM(exerciseName: string): OneRMResult | null {
  const history = getHistory();
  let bestPerformance: ExerciseData | null = null;
  let maxWeight = 0;

  history.forEach((session) => {
    const exercise = session.ejercicios?.find(
      (ej) => ej.nombre === exerciseName
    );
    if (exercise && exercise.peso > maxWeight) {
      maxWeight = exercise.peso;
      bestPerformance = exercise;
    }
  });

  if (!bestPerformance) return null;

  const peso = bestPerformance.peso;
  const reps = bestPerformance.reps;

  // Tres formulas de 1RM
  const epley = peso * (1 + reps / 30);
  const brzycki = peso * (36 / (37 - reps));
  const lombardi = peso * Math.pow(reps, 0.1);

  return {
    bestPerformance,
    epley: epley.toFixed(1),
    brzycki: brzycki.toFixed(1),
    lombardi: lombardi.toFixed(1),
    average: ((epley + brzycki + lombardi) / 3).toFixed(1),
  };
}
```

---

### Tabla de Porcentajes del 1RM

| % del 1RM | Reps Aproximadas | Uso Tipico |
|-----------|------------------|------------|
| 100%      | 1 rep            | Test de fuerza maxima |
| 95%       | 2 reps           | Fuerza pura |
| 90%       | 4 reps           | Fuerza pura |
| 85%       | 6 reps           | Fuerza-Hipertrofia |
| 80%       | 8 reps           | Hipertrofia |
| 75%       | 10 reps          | Hipertrofia |
| 70%       | 12 reps          | Hipertrofia |
| 65%       | 15 reps          | Resistencia muscular |

### Ejemplo de Programacion

```
Tu 1RM de Sentadilla = 140kg

Semana de Fuerza (5x3 al 85%):
- 140kg x 0.85 = 119kg
- Trabajas 5 series de 3 reps con 119kg

Semana de Hipertrofia (4x10 al 70%):
- 140kg x 0.70 = 98kg
- Trabajas 4 series de 10 reps con 98kg
```

---

## 2. Calculadora de Calorias

### TDEE (Total Daily Energy Expenditure)

```
TDEE = BMR x Factor de Actividad

BMR = Basal Metabolic Rate (metabolismo basal)
Factor = Nivel de ejercicio
```

---

### Paso 1: Calcular BMR (Mifflin-St Jeor)

**Hombres:**
```
BMR = (10 x peso_kg) + (6.25 x altura_cm) - (5 x edad) + 5

Ejemplo: Hombre de 80kg, 180cm, 30 anos
BMR = (10 x 80) + (6.25 x 180) - (5 x 30) + 5
BMR = 800 + 1125 - 150 + 5 = 1780 calorias
```

**Mujeres:**
```
BMR = (10 x peso_kg) + (6.25 x altura_cm) - (5 x edad) - 161

Ejemplo: Mujer de 65kg, 165cm, 28 anos
BMR = (10 x 65) + (6.25 x 165) - (5 x 28) - 161
BMR = 650 + 1031.25 - 140 - 161 = 1380 calorias
```

---

### Paso 2: Factor de Actividad

| Nivel Actividad | Factor | Descripcion |
|-----------------|--------|-------------|
| Sedentario      | 1.2    | Poco o ningun ejercicio |
| Ligera          | 1.375  | 1-3 dias/semana |
| Moderada        | 1.55   | 3-5 dias/semana |
| Intensa         | 1.725  | 6-7 dias/semana |
| Muy Intensa     | 1.9    | 2 veces al dia, atleta |

### Ejemplo Completo

```
Hombre de 80kg, 180cm, 30 anos
Entrena 4 dias/semana (Moderada)

BMR = 1780 calorias
TDEE = 1780 x 1.55 = 2759 calorias/dia

- Necesita 2759 cal/dia para MANTENER peso
```

---

### Paso 3: Ajustar segun Objetivo

| Objetivo | Ajuste | Calorias Finales |
|----------|--------|------------------|
| Perder Grasa | TDEE - 20% | 2759 - 552 = 2207 cal |
| Perder Grasa Rapido | TDEE - 30% | 2759 - 828 = 1931 cal |
| Mantener | TDEE + 0% | 2759 cal |
| Ganar Musculo (lean) | TDEE + 10% | 2759 + 276 = 3035 cal |
| Ganar Peso Rapido | TDEE + 20% | 2759 + 552 = 3311 cal |

---

### Implementacion en GymMate

```typescript
// src/utils/calculations.ts

export function calculateCalories(
  age: number,
  gender: 'male' | 'female',
  weight: number,
  height: number,
  activityLevel: number
): CaloriesResult {
  let bmr: number;

  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = bmr * activityLevel;
  const deficit = tdee * 0.8;
  const surplus = tdee * 1.2;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    deficit: Math.round(deficit),
    maintenance: Math.round(tdee),
    surplus: Math.round(surplus),
  };
}
```

---

## 3. Calculadora de Peso Progresivo

### Sobrecarga Progresiva (ACSM/NSCA Guidelines)

Para ganar fuerza/musculo debes incrementar progresivamente:
1. Peso
2. Reps
3. Sets
4. Rango de movimiento

---

### Incrementos Sugeridos

**Tren Inferior (Sentadilla, Peso Muerto, Hip Thrust):**
- Conservador: +2.5% del peso actual
- Moderado: +7.5%
- Agresivo: +10%

**Tren Superior (Press, Remo, Curl):**
- Conservador: +2.5%
- Moderado: +5%
- Agresivo: +7.5%

---

### Implementacion en GymMate

```typescript
// src/utils/calculations.ts

export function calculateProgressive(
  exerciseName: string
): ProgressiveResult | null {
  const prs = getPRs();
  const exercisePR = prs[exerciseName];

  if (!exercisePR) return null;

  const currentWeight = exercisePR.peso;
  const isLowerBody = LOWER_BODY_KEYWORDS.some((keyword) =>
    exerciseName.toLowerCase().includes(keyword)
  );

  let conservative: number, moderate: number, aggressive: number;

  if (isLowerBody) {
    conservative = currentWeight * 1.025;
    moderate = currentWeight * 1.075;
    aggressive = currentWeight * 1.1;
  } else {
    conservative = currentWeight * 1.025;
    moderate = currentWeight * 1.05;
    aggressive = currentWeight * 1.075;
  }

  // Redondear a multiplos de 2.5kg
  const roundTo2_5 = (w: number) => Math.ceil(w / 2.5) * 2.5;

  return {
    current: currentWeight,
    conservative: roundTo2_5(conservative).toFixed(1),
    moderate: roundTo2_5(moderate).toFixed(1),
    aggressive: roundTo2_5(aggressive).toFixed(1),
    exerciseType: isLowerBody ? 'Tren Inferior' : 'Tren Superior',
  };
}
```

---

## Resumen de Calculadoras

| Calculadora | Input | Output | Uso |
|-------------|-------|--------|-----|
| 1RM | Peso + Reps | 1RM estimado + tabla % | Programar entrenos |
| Calorias | Peso/Altura/Edad/Actividad | TDEE + ajustes | Nutricion |
| Progresiva | Peso actual del PR | Siguientes pesos | Progresion |

---

**Version:** 3.1.0
**Ultima actualizacion:** Diciembre 2025
