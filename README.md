# 🚦 Smart Gate — Site Management Dashboard

A virtual Smart Gate system built as part of the **Robotics Assignment** for the Junior Software Engineer (Python + AIML) role. The gate automatically opens when a vehicle is detected, stays open for 5 seconds, and closes only when the path is clear.

---

## 🔗 Live Demo

👉 [https://harshit8204.github.io/smart-gate-assignment/](https://harshit8204.github.io/smart-gate-assignment/)

---

## 📋 Assignment Overview

This project covers all 3 parts of the Robotics Assignment:

| Part | Skill | Deliverable |
|------|-------|-------------|
| Part 1 | Hardware Logic & Simulation | ESP32 + HC-SR04 + Servo on Wokwi |
| Part 2 | Visual Logic & JS Integration | Custom Blockly block (`open_gate_with_speed`) |
| Part 3 | Web Interface (Frontend) | Live Site Management Dashboard |

---

## 🌐 Part 3: Web Interface

### Features
- **Live Gate Feed** — animated gate that opens and closes in real time
- **Vehicle Simulation** — simulates HC-SR04 ultrasonic sensor detection (distance < 50 cm)
- **5-Second Auto-Close Timer** — countdown ring visible during open state
- **Sensor Readings Panel** — shows distance (cm), servo angle, and LED status
- **Activity Log** — timestamped log of all gate events
- **KPI Dashboard** — gate status, vehicle count, distance, and uptime
- **Vehicle Activity Chart** — bar chart of last 8 trigger events

### Tech Stack
- Pure HTML, CSS, JavaScript (no frameworks, no backend)
- Tailwind-inspired custom CSS with dark theme
- SVG animations for gate and sensor visualization

---

## ⚙️ Part 2: Blockly Custom Block

File: `blockly_open_gate_block.js`

Defines a custom Blockly block called **`open_gate_with_speed`** that:
- Takes a **speed input (1–10)**
- Generates JavaScript code to sweep a servo motor from 0° to 90°
- Speed 1 = slowest (smooth open), Speed 10 = fastest (instant open)

### Generated Code Example (speed = 5)
```javascript
var targetAngle = 90;
var stepSize = 5;
var delayMs = 500;

for (var angle = 0; angle <= targetAngle; angle += stepSize) {
  servo.write(angle);
  delay(500);
}
servo.write(90); // Ensure fully open
```

---

## 🔧 Part 1: Hardware Simulation (Wokwi)

**Platform:** [Wokwi.com](https://wokwi.com)

**Components:**
- ESP32 / Arduino Uno
- HC-SR04 Ultrasonic Distance Sensor
- Servo Motor (gate)
- LED (blinks while gate is in motion)

**Logic:**
1. HC-SR04 measures distance continuously
2. If distance < 50 cm → vehicle detected → gate opens (servo to 90°), LED blinks
3. Gate stays open for 5 seconds
4. If path is clear → gate closes (servo to 0°), LED off

---

## 📁 Repository Structure

```
smart-gate-assignment/
├── index.html                  # Smart Gate Dashboard (Part 3)
├── blockly_open_gate_block.js  # Custom Blockly block (Part 2)
└── README.md                   # This file
```

---

## 👤 Author

**Harshit Pal**
GitHub: [@harshit8204](https://github.com/harshit8204)
