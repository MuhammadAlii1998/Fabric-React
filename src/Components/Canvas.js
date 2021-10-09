import React, { useState, useEffect } from "react";
// import { fabric } from "fabric";
// import "fabric-history";
import { fabric } from "fabric";
import "fabric-history";

const Canvas = () => {
  let [canvas] = useState(null);
  let [sizeOptions] = useState(10);
  let [familyOptions] = useState("georgia");
  let [optionsData] = useState("noselected");
  let [image] = useState("");
  // let [activeObject] = useState(null);
  let [strokeOptions] = useState(1);
  let [imageSelected, setimageSelected] = useState(false);
  let [shapeSelected, setshapeSelected] = useState(false);
  let [underLineSelected] = useState(false);
  let [boldSelected] = useState(false);
  let [italicSelected] = useState(false);
  let [isDrawingModeOn] = useState(false);
  let [brushWidth, setbrushWidth] = useState(1);
  // let [fontWeight] = useState("normal");
  // let [brushWidth,  setBrushWidth] = useState(1);

  useEffect(() => {
    canvas = new fabric.Canvas("c-id", {
      width: 900,
      height: 500,
      backgroundColor: "white",
      // backgroundColor: "blue",
    });
    canvas.renderAll();
  }, []);

  function changeBrushWidth() {
    canvas.freeDrawingBrush.width = brushWidth;
  }
  function changeBrushColor(e) {
    canvas.freeDrawingBrush.color = e.target.value;
    canvas.renderAll();
  }
  function textArea() {
    let text = new fabric.Textbox("Text", {
      left: 100,
      top: 100,
    });
    text.set({ fill: "#000" });
    canvas.add(text);
  }
  function imageIsSelected() {
    if (
      (imageSelected === false && shapeSelected === false) ||
      (imageSelected === false && shapeSelected === true)
    ) {
      // imageSelected = true;
      setimageSelected(true);
      // shapeSelected = false;
      setshapeSelected(false);
      // } else imageSelected = false;
    } else setimageSelected(false);
  }
  function shapeIsSelected() {
    if (
      (shapeSelected === false && imageSelected === false) ||
      (shapeSelected === false && imageSelected === true)
    ) {
      // shapeSelected = true;
      setshapeSelected(true);
      // imageSelected = false;
      setimageSelected(false);
      // } else shapeSelected = false;
    } else setshapeSelected(false);
  }
  function changeColor(e) {
    canvas.getActiveObject().set("fill", e.target.value);
    canvas.renderAll();
  }
  function drawingMode() {
    if (isDrawingModeOn === false) {
      canvas.isDrawingMode = true;
      isDrawingModeOn = true;
    } else {
      canvas.isDrawingMode = false;
      isDrawingModeOn = false;
    }
    canvas.renderAll();
  }
  function changeStrokeWidth() {
    let factor = parseInt(strokeOptions);
    canvas.getActiveObject().set({ strokeWidth: factor });
    canvas.renderAll();
  }
  function doBold() {
    if (String(boldSelected) === "false") {
      canvas.getActiveObject().set("fontWeight", "bold");
      boldSelected = true;
    } else {
      canvas.getActiveObject().set("fontWeight", "normal");
      boldSelected = false;
    }

    canvas.renderAll();
  }
  function doItalic() {
    if (String(italicSelected) === "false") {
      canvas.getActiveObject().set("fontWeight", "italic");
      italicSelected = true;
    } else {
      canvas.getActiveObject().set("fontWeight", "normal");
      italicSelected = false;
    }
    canvas.renderAll();
  }
  function doUnderline() {
    if (String(underLineSelected) === "false") {
      canvas.getActiveObject().set({ underline: true });
      underLineSelected = true;
    } else {
      canvas.getActiveObject().set({ underline: false });
      underLineSelected = false;
    }
    canvas.renderAll();
  }
  function stroke(e) {
    canvas.getActiveObject().set({ stroke: e.target.value });
    canvas.renderAll();
  }
  function click() {
    if (optionsData === "rectangle") {
      drawRectangle();
    } else if (optionsData === "circle") {
      drawCircle();
    } else if (optionsData === "triangle") {
      drawTriangle();
    }
    setshapeSelected(false);
  }
  function onFileChange() {
    const reader = new FileReader();
    const dataElement = document.getElementById("uploadImage");
    const file = dataElement.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      fabric.Image.fromURL(reader.result, (img) => {
        // console.log("Image is ", img);
        canvas.add(img);
      });
    });
    setimageSelected(false);
  }
  function changeSize() {
    canvas.getActiveObject().set("fontSize", sizeOptions);
    canvas.renderAll();
  }
  function changeStyle() {
    canvas.getActiveObject().set("fontFamily", familyOptions);
    canvas.renderAll();
  }
  function clearCanvas() {
    canvas.clear();
  }
  function redo() {
    canvas.redo();
  }
  function undo() {
    canvas.undo();
  }
  function drawRectangle() {
    let rect = new fabric.Rect({
      left: 50,
      top: 100,
      width: 40,
      height: 20,
    });
    canvas.add(rect);
    shapeSelected = false;
  }
  function drawCircle() {
    let circle = new fabric.Circle({
      left: 50,
      top: 150,
      radius: 20,
    });
    circle.set({ fill: "#ff0" });
    canvas.add(circle);
  }
  function drawTriangle() {
    let tri = new fabric.Triangle({
      left: 100,
      top: 200,
      width: 30,
      height: 20,
    });
    tri.set({ fill: "#ffa500" });
    canvas.add(tri);
  }

  return (
    <div>
      <div>
        <div id="top-nav-bar">
          <div id="coreOptions">
            <div id="coreFeaturesTitle">
              <label>Core Features</label>
            </div>
            <div id="textButton">
              <button
                // @click="textArea"
                onClick={textArea}
              >
                Text
              </button>
            </div>
            <div id="imageButton">
              <button
                // @click="imageIsSelected"
                onClick={imageIsSelected}
              >
                Image
              </button>
            </div>
            <div id="shapeButton">
              <button
                // @click="shapeIsSelected"
                onClick={shapeIsSelected}
              >
                Shape
              </button>
            </div>
            <div id="drawingMode">
              <button
                // @click="drawingMode"
                onClick={drawingMode}
              >
                Drawing Mode
              </button>
            </div>
          </div>
          <div id="textProperties">
            <div id="textPropertiesTitle">
              <label>Text Properties</label>
            </div>
            <div id="textPropertiesInner">
              <div id="style">
                <select
                  // @change="changeStyle()"
                  onClick={changeStyle}
                  name="fontStyle"
                  id="fontSize"
                  v-model="familyOptions"
                >
                  <option value="serif">Serif</option>

                  <option value="sans-serif">Sans-serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="cursive">Cursive</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="ui-monospace">UI-monospace</option>
                  <option value="times-new-roman">Times New Roman</option>
                  <option value="georgia">Georgia</option>
                  <option value="garamond">Garamond</option>
                  <option value="copperplate">Copperplate</option>
                  <option value="papyrus">Papyrus</option>
                </select>
              </div>
              <div id="color">
                <p>
                  <label>
                    <input
                      type="color"
                      // @input="changeColor($event)"
                      onInput={(e) => {
                        changeColor(e);
                      }}
                      border="none"
                    />
                  </label>
                </p>
              </div>
              <div id="size">
                <select
                  // @change="changeSize()"
                  onChange={changeSize}
                  name="fontSize"
                  id="fontSize"
                  v-model="sizeOptions"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                  <option value="110">110</option>
                </select>
              </div>
              <div id="bold">
                <button
                  // @click="doBold()"
                  onClick={doBold}
                >
                  <b>Bold</b>
                </button>
              </div>
              <div id="italic">
                <button
                  // @click="doItalic()"
                  onClick={doItalic}
                >
                  <i>Italic</i>
                </button>
              </div>
              <div id="underline">
                <button
                  // @click="doUnderline()"
                  onClick={doUnderline}
                >
                  <u>Underline</u>
                </button>
              </div>
            </div>
          </div>
          <div id="shapeProperties">
            <div id="borderPropertiesTitle">
              <label>Border</label>
            </div>
            <div id="changeStrokeWidth">
              <select
                // @change="changeStrokeWidth()"
                onChange={changeStrokeWidth}
                name="StrokeSize"
                id="StrokeSize"
                v-model="strokeOptions"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </div>
            <div id="strokeColor">
              <p>
                <label>
                  <input
                    type="color"
                    // @input="stroke($event)"
                    onInput={(e) => {
                      stroke(e);
                    }}
                  />
                </label>
              </p>
            </div>
          </div>
          <div id="brushProperties">
            <div id="brushPropertiesTitle">
              <label>Brush</label>
            </div>
            <div>
              <div id="brushWidth">
                <select
                  // @change="changeBrushWidth()"
                  onChange={(e) => {
                    setbrushWidth(e.target.value);
                    changeBrushWidth();
                  }}
                  name="BrushWidth"
                  id="BrushWidth"
                  // v-model="brushWidth"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
              </div>
              <div id="brushColor">
                <p>
                  <label>
                    <input
                      type="color"
                      // @input="changeBrushColor($event)"
                      onInput={(e) => {
                        changeBrushColor(e);
                      }}
                    />
                  </label>
                </p>
              </div>
            </div>
          </div>
          <div id="canvasProperties">
            <div id="canvasPropertiesTitle">
              <label>Canvas Properties</label>
            </div>
            <div>
              <div id="undo">
                <button
                  // @click="undo()"
                  onClick={undo}
                >
                  Undo
                </button>
              </div>
              <div id="redo">
                <button
                  // @click="redo()"
                  onClick={redo}
                >
                  Redo
                </button>
              </div>
              <div id="clearCanvas">
                <button
                  // @click="clearCanvas()"
                  onClick={clearCanvas}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div id="childObject">
            {imageSelected ? (
              <div id="img" v-if="String(imageSelected) === 'true'">
                <div id="childObjectTitle">
                  <label> Image </label>
                </div>
                <div>
                  <input id="uploadImage" type="file" accept="image/*" />
                </div>
                <div id="uploadButton">
                  <center>
                    <button
                      // @click="onFileChange()"
                      onClick={onFileChange}
                    >
                      Upload
                    </button>
                  </center>
                </div>
              </div>
            ) : (
              ""
            )}
            {shapeSelected ? (
              <div id="showShapes" v-if="String(shapeSelected) === 'true'">
                <div id="childObjectTitle">
                  <label> Shape </label>
                </div>
                <div id="shapesDropdown">
                  <select
                    id="shapes"
                    name="shapes"
                    // @change="click"
                    onChange={click}
                    // v-model="optionsData"
                  >
                    <option value="noselected">No shape selected</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          {/* <div id="properties">
        <h1>Its properties Section</h1>
        <button 
        // @click="shapeProperties"
        >Click me</button><br />
        <div>
          <label> Size :</label><label>{{ sizeOptions }}</label
          ><br />
          <label> Family :</label><label>{{ familyOptions }}</label
          ><br />
          <label> Color :</label><label>{{ fill }}</label> <br /><label>
            Style :</label
          ><label>{{ fontWeight }}</label
          ><br />
        </div>
      </div> */}
          <div>
            <center>
              <canvas id="c-id"> </canvas>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
