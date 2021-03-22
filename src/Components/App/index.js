import React, { Component } from "react";
import * as s from "./app.module.scss";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      inputs: [],
      buttons: [],
    };
    this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
  }

  closeModal(type, id) {
    console.log("ID", id);
    console.log("type", type);
    switch (type) {
      case "label": {
        let labelStates = this.state.labels;
        console.log(labelStates[id]);
        labelStates[id].showModal = false;
        console.log(labelStates);
        this.setState({ labels: labelStates });
        break;
      }
      case "input": {
        let inputStates = this.state.inputs;
        inputStates[id].showModal = false;
        this.setState({ inputs: inputStates });

        break;
      }
      case "button": {
        let buttonStates = this.state.buttons;
        buttonStates[id].showModal = false;
        this.setState({ buttons: buttonStates });
        break;
      }
    }
  }
  openModal(type, id) {
    console.log("ID", id);
    console.log("type", type);
    this.closeAllModals();

    switch (type) {
      case "label": {
        let labelStates = this.state.labels;
        labelStates[id].showModal = true;
        this.setState({ labels: labelStates });
        break;
      }
      case "input": {
        let inputStates = this.state.inputs;
        inputStates[id].showModal = true;
        this.setState({ inputs: inputStates });

        break;
      }
      case "button": {
        let buttonStates = this.state.buttons;
        console.log(buttonStates[id]);
        buttonStates[id].showModal = true;
        this.setState({ buttons: buttonStates });
        break;
      }
    }
  }
  closeAllModals() {
    let labelsArray = this.state.labels;
    let inputsArray = this.state.inputs;
    let buttonsArray = this.state.buttons;
    labelsArray.length > 0 &&
      labelsArray.forEach((label) => (label.showModal = false));

    inputsArray.length > 0 &&
      inputsArray.forEach((input) => (input.showModal = false));
    buttonsArray.length > 0 &&
      buttonsArray.forEach((button) => (button.showModal = false));
  }

  dragOver(ev) {
    ev.preventDefault();
  }

  endDrag(e, type) {
    console.log(e);
    console.log(type);

    switch (type) {
      case "label": {
        let stateArray = this.state.labels;

        stateArray.length > 0 &&
          stateArray.forEach((label) => (label.showModal = false));
        this.setState({ labels: stateArray });
        let styleObj = {
          x: e.clientX,
          y: e.clientY,
          id: this.state.labels.length,
          showModal: true,
        };

        let tempArr1 = this.state.labels;
        tempArr1.push(styleObj);
        this.setState({ labels: tempArr1 });
        break;
      }
      case "input": {
        let stateArray = this.state.inputs;

        stateArray.length > 0 &&
          stateArray.forEach((input) => (input.showModal = false));
        this.setState({ inputs: stateArray });
        let styleObj = {
          x: e.clientX,
          y: e.clientY,
          id: this.state.inputs.length,
          showModal: true,
        };
        let tempArr2 = this.state.inputs;
        tempArr2.push(styleObj);
        this.setState({ inputs: tempArr2 });
        break;
      }
      case "button": {
        let stateArray = this.state.buttons;

        stateArray.length > 0 &&
          stateArray.forEach((button) => (button.showModal = false));
        this.setState({ buttons: stateArray });

        let styleObj = {
          x: e.clientX,
          y: e.clientY,
          id: this.state.buttons.length,
          showModal: true,
        };
        let tempArr3 = this.state.buttons;
        tempArr3.push(styleObj);
        this.setState({ buttons: tempArr3 });
        break;
      }
    }
  }

  drop(ev, type) {
    const droppedItem = ev.dataTransfer.getData("drag-item");
    console.log(droppedItem);
    if (droppedItem) {
      console.log(droppedItem);
    }
  }

  render() {
    const { labels, inputs, buttons } = this.state;
    console.log(this.state);
    const renderLabels = (data) => {
      if (data.length > 0) {
        return data.map((label, i) => {
          return (
            <div key={i}>
              <Label
                data={label}
                closeModal={(type, id) => this.closeModal(type, id)}
                openModal={(type, id) => this.openModal(type, id)}
                closeAllModals={() => this.closeAllModals}
              />
              ;
            </div>
          );
        });
      }
    };
    const renderInputs = (data) => {
      if (data.length > 0) {
        return data.map((label, i) => {
          return (
            <div key={i}>
              <Input
                data={label}
                closeModal={(type, id) => this.closeModal(type, id)}
                openModal={(type, id) => this.openModal(type, id)}
                closeAllModals={() => this.closeAllModals}
              />
              ;
            </div>
          );
        });
      }
    };
    const renderButtons = (data) => {
      if (data.length > 0) {
        return data.map((label, i) => {
          return (
            <div key={i}>
              <Button
                data={label}
                closeModal={(type, id) => this.closeModal(type, id)}
                openModal={(type, id) => this.openModal(type, id)}
                closeAllModals={() => this.closeAllModals}
              />
              ;
            </div>
          );
        });
      }
    };
    return (
      <div className={s.container}>
        <div
          className={s.mainContainer}
          onDragOver={this.dragOver}
          onDrop={this.drop}
        >
          {renderLabels(labels)}
          {renderButtons(buttons)}
          {renderInputs(inputs)}
        </div>
        <div className={s.sideDrawer}>
          <div className={s.heading}>Side Drawer</div>
          <div className={s.blockContainer}>
            <div
              className={s.label}
              draggable
              onDragEnd={(e) => this.endDrag(e, "label")}
            >
              {" "}
              Label
            </div>
            <div
              className={s.input}
              draggable
              onDragEnd={(e) => this.endDrag(e, "input")}
            >
              Input
            </div>
            <div
              className={s.button}
              draggable
              onDragEnd={(e) => this.endDrag(e, "button")}
            >
              Button
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
