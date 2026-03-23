// ============================================================
//  ROBOTICS ASSIGNMENT — Part 2: Blockly Custom Block
//  Block Name: open_gate_with_speed
//  Purpose: Controls servo motor speed for Smart Gate
// ============================================================


// ────────────────────────────────────────────────────────────
//  PART A: JSON Block Definition
//  Paste this into the Blockly Developer Tools "Block Exporter"
//  or load it via Blockly.defineBlocksWithJsonArray([...])
// ────────────────────────────────────────────────────────────

const BLOCK_DEFINITION = {
  "type": "open_gate_with_speed",
  "message0": "Open Gate with Speed %1",
  "args0": [
    {
      "type": "field_number",
      "name": "SPEED",
      "value": 5,
      "min": 1,
      "max": 10,
      "precision": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Opens the gate servo to 90° at the given speed (1=slowest, 10=fastest).",
  "helpUrl": ""
};


// ────────────────────────────────────────────────────────────
//  PART B: JavaScript Code Generator
//  Generates servo.write() code with speed-based delay
// ────────────────────────────────────────────────────────────

// Register the block definition with Blockly
Blockly.defineBlocksWithJsonArray([BLOCK_DEFINITION]);

// Attach the JavaScript generator
javascript.javascriptGenerator.forBlock['open_gate_with_speed'] = function(block, generator) {

  // Read the SPEED field value (1–10)
  const speed = block.getFieldValue('SPEED');

  // Map speed (1–10) to a delay in milliseconds
  // Speed 1  → 900ms delay (slowest, smooth open)
  // Speed 10 → 0ms delay   (fastest, instant open)
  const delayMs = (10 - speed) * 100;

  // Map speed to servo step size (degrees per step)
  // Speed 1  → 1° per step   (very smooth)
  // Speed 10 → 10° per step  (fast sweep)
  const step = Math.max(1, speed);

  // Generate code: sweep servo from 0° to 90° in increments
  let code = `// Open gate with speed ${speed}\n`;
  code += `var targetAngle = 90;\n`;
  code += `var stepSize = ${step};\n`;
  code += `var delayMs = ${delayMs};\n`;
  code += `\n`;
  code += `for (var angle = 0; angle <= targetAngle; angle += stepSize) {\n`;
  code += `  servo.write(angle);\n`;
  code += `  delay(delayMs);\n`;
  code += `}\n`;
  code += `servo.write(90); // Ensure fully open\n`;
  code += `\n`;

  return code;
};


// ────────────────────────────────────────────────────────────
//  PART C: Example Generated Output (speed = 5)
// ────────────────────────────────────────────────────────────

/*
  When user sets SPEED = 5, the generator outputs:

  // Open gate with speed 5
  var targetAngle = 90;
  var stepSize = 5;
  var delayMs = 500;

  for (var angle = 0; angle <= targetAngle; angle += stepSize) {
    servo.write(angle);
    delay(500);
  }
  servo.write(90); // Ensure fully open

  — For Arduino/ESP32, the servo.write() maps to:
    #include <Servo.h>
    Servo myServo;
    myServo.attach(9);
    myServo.write(angle);
*/


// ────────────────────────────────────────────────────────────
//  PART D: Toolbox XML Snippet (add to your Blockly toolbox)
// ────────────────────────────────────────────────────────────

const TOOLBOX_XML = `
<block type="open_gate_with_speed">
  <field name="SPEED">5</field>
</block>
`;


// ────────────────────────────────────────────────────────────
//  PART E: Full Self-Contained Blockly Page (Demo)
//  Open in browser — no server needed
// ────────────────────────────────────────────────────────────

/*
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Smart Gate — Blockly Demo</title>
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
  </head>
  <body>
    <div id="blocklyDiv" style="height:400px; width:700px;"></div>
    <pre id="output" style="background:#1e1e1e; color:#4ec9b0; padding:16px; margin-top:10px;"></pre>
    <button onclick="generateCode()">Generate Code</button>

    <script>
      // Define block
      Blockly.defineBlocksWithJsonArray([BLOCK_DEFINITION]);   // paste definition above

      // Generator (paste generator code above)

      // Inject Blockly
      const workspace = Blockly.inject('blocklyDiv', {
        toolbox: `<xml><block type="open_gate_with_speed"><field name="SPEED">5</field></block></xml>`
      });

      function generateCode() {
        const code = javascript.javascriptGenerator.workspaceToCode(workspace);
        document.getElementById('output').textContent = code;
      }
    </script>
  </body>
  </html>
*/
