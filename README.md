# 💪 GymMate - App de Entrenamientos de Alonso

**Web interactiva para gestionar entrenamientos con seguimiento completo de volumen y progreso.**

---

## 🎯 Características Principales

✅ **5 Grupos de Entrenamiento Completos:**
- GRUPO 1: Piernas + Glúteos
- GRUPO 2: Upper Push
- GRUPO 3: Piernas Quad Dominante
- GRUPO 4: Espalda + Bíceps
- GRUPO 5: Hombro + Tríceps (aislamiento)

✅ **Cálculo Automático de Volumen:**
- Fórmula base: `volumen = sets × reps × peso`
- **Regla especial para mancuernas:** peso se multiplica por 2 automáticamente
- Ejemplo: 3 sets × 10 reps × 10kg (mancuerna) = **600 volumen**

✅ **Validación de Decimales:**
- Solo permite punto (.) para decimales
- Bloquea comas (,) con mensaje de error y animación

✅ **Barras de Progreso Dinámicas:**
- El músculo con mayor volumen del día = 100%
- Todas las demás barras escalan proporcionalmente
- Visualización clara del progreso por grupo muscular

✅ **Ejercicios Opcionales:**
- Hip Thrust ligero (disponible en todos los grupos)
- Abs en máquina (disponible en todos los grupos)

✅ **Guardado Local:**
- Los entrenamientos se guardan en localStorage
- Recuperación automática de sesiones del mismo día

✅ **Sistema de Animaciones:**
- Soporte para videos demostrativos (mp4)
- Soporte para animaciones Lottie
- Modal interactivo para visualización

---

## 🚀 Uso

1. **Abre `index.html` en tu navegador**

2. **Selecciona el grupo de entrenamiento del día**

3. **Ingresa los datos de cada ejercicio:**
   - Sets realizados
   - Reps por set
   - Peso utilizado (kg)

4. **El sistema calculará automáticamente:**
   - Volumen total por ejercicio
   - Volumen por grupo muscular
   - Volumen total del día
   - Barras de progreso dinámicas

5. **Marca ejercicios completados** con el checkbox

6. **Guarda tu entrenamiento** con el botón "Guardar"

---

## 📐 Reglas Matemáticas Críticas

### Ejercicios con Mancuernas
**Todos los ejercicios con mancuernas multiplican el peso × 2:**

```
Curl martillo: 3 sets × 10 reps × 10kg
= 3 × 10 × (10 × 2)
= 600 volumen
```

**Ejercicios afectados:**
- Elevación lateral
- Elevación frontal / Y-Raise
- Remo mancuerna
- Curl martillo
- Curl martillo cross-body

### Ejercicios con Barra o Máquinas
**No multiplican por 2:**

```
Press militar: 3 sets × 10 reps × 40kg
= 3 × 10 × 40
= 1200 volumen
```

---

## 🎨 Tecnologías

- **HTML5** - Estructura
- **JavaScript (Vanilla)** - Lógica y cálculos
- **Tailwind CSS** - Estilización moderna
- **Lottie** - Animaciones vectoriales (opcional)
- **localStorage** - Persistencia de datos

---

## 📱 Compatibilidad

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Navegadores móviles

---

## 🔧 Personalización

### Añadir Videos de Ejercicios

En el objeto `trainingGroups` de `index.html`, actualiza:

```javascript
{
    nombre: "Hip Thrust",
    esMancuerna: false,
    grupoMuscular: "Glúteos",
    animationType: "video",
    animationSrc: "ruta/al/video.mp4"  // ← Actualiza aquí
}
```

### Añadir Animaciones Lottie

```javascript
{
    nombre: "Press militar",
    animationType: "lottie",
    animationSrc: "ruta/al/archivo.json"  // ← Archivo Lottie
}
```

---

## 📊 Estructura de Datos (localStorage)

```json
{
  "date": "2025-12-01",
  "grupo": "GRUPO 4 - Espalda + Bíceps",
  "ejercicios": [
    {
      "nombre": "Curl martillo",
      "sets": 3,
      "reps": 10,
      "peso": 10,
      "esMancuerna": true,
      "grupoMuscular": "Bíceps",
      "volumen": 600,
      "completado": true
    }
  ],
  "volumenTotal": 1980,
  "volumenPorGrupo": {
    "Bíceps": 1488,
    "Espalda": 3160
  }
}
```

---

## 📝 Documento Madre

Esta implementación sigue fielmente el **Documento Madre Definitivo** que define:
- ✅ Todas las reglas matemáticas
- ✅ Estructura de grupos y ejercicios
- ✅ Comportamiento del UI
- ✅ Validaciones de input
- ✅ Sistema de barras dinámicas
- ✅ Persistencia de datos

---

## 👨‍💻 Desarrollado para Alonso

Sistema diseñado específicamente para el seguimiento de entrenamientos personalizados.

**Fecha de creación:** Diciembre 2025
**Versión:** 1.0.0

---

## 🆘 Soporte

Para cualquier problema o sugerencia, revisa el código JavaScript en `index.html` donde están todos los comentarios y documentación.

---

**¡Buen entrenamiento! 💪🔥**