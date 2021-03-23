import React, { Component } from "react";
import * as s from "./app.module.scss";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
import * as ls from "local-storage";
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
        let index = labelStates.findIndex((p) => p.id === id);

        labelStates[index].showModal = false;
        this.setState({ labels: labelStates });
        ls.set("labels", this.state.labels);
        break;
      }
      case "input": {
        let inputStates = this.state.inputs;
        let index = inputStates.findIndex((p) => p.id === id);

        inputStates[index].showModal = false;
        this.setState({ inputs: inputStates });
        ls.set("inputs", this.state.inputs);

        break;
      }
      case "button": {
        let buttonStates = this.state.buttons;
        let index = buttonStates.findIndex((p) => p.id === id);

        buttonStates[index].showModal = false;
        this.setState({ buttons: buttonStates });
        ls.set("buttons", this.state.buttons);

        break;
      }
      default: {
        console.log("Default");
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
        const index = labelStates.findIndex((p) => p.id === id);
        console.log(index);
        labelStates[index].showModal = true;
        this.setState({ labels: labelStates });
        ls.set("labels", this.state.labels);

        break;
      }
      case "input": {
        let inputStates = this.state.inputs;
        const index = inputStates.findIndex((p) => p.id === id);

        inputStates[index].showModal = true;
        this.setState({ inputs: inputStates });
        ls.set("inputs", this.state.inputs);

        break;
      }
      case "button": {
        let buttonStates = this.state.buttons;
        const index = buttonStates.findIndex((p) => p.id === id);

        buttonStates[index].showModal = true;
        this.setState({ buttons: buttonStates });
        ls.set("buttons", this.state.buttons);

        break;
      }
      default: {
        console.log("Default");
      }
    }
  }
  closeAllModals() {
    console.log("HI");
    let labelsArray = this.state.labels;
    let inputsArray = this.state.inputs;
    let buttonsArray = this.state.buttons;
    labelsArray.length > 0 &&
      labelsArray.forEach((label) => (label.showModal = false));

    inputsArray.length > 0 &&
      inputsArray.forEach((input) => (input.showModal = false));
    buttonsArray.length > 0 &&
      buttonsArray.forEach((button) => (button.showModal = false));

    this.setState({
      labels: labelsArray,
      inputs: inputsArray,
      buttons: buttonsArray,
    });
    ls.set("labels", this.state.labels);
    ls.set("inputs", this.state.inputs);
    ls.set("buttons", this.state.buttons);
  }

  dragOver(ev) {
    ev.preventDefault();
  }

  deleteItem(type, id) {
    switch (type) {
      case "label": {
        let stateArray = this.state.labels;
        const index = stateArray.findIndex((p) => p.id === id);
        stateArray.splice(index, 1);
        this.setState({ labels: stateArray });

        ls.set("labels", this.state.labels);

        break;
      }
      case "input": {
        let stateArray = this.state.inputs;
        const index = stateArray.findIndex((p) => p.id === id);
        stateArray.splice(index, 1);
        this.setState({ inputs: stateArray });
        ls.set("inputs", this.state.inputs);

        break;
      }
      case "button": {
        let stateArray = this.state.buttons;
        const index = stateArray.findIndex((p) => p.id === id);
        stateArray.splice(index, 1);
        this.setState({ buttons: stateArray });
        ls.set("buttons", this.state.buttons);

        break;
      }
      default: {
        console.log("Default");
      }
    }
  }

  endDrag(e, type) {
    console.log(e);
    console.log(type);

    switch (type) {
      case "label": {
        let stateArray = this.state.labels;

        stateArray &&
          stateArray.length > 0 &&
          stateArray.forEach((label) => (label.showModal = false));
        this.setState({ labels: stateArray });
        let styleObj = {
          x: e.clientX,
          y: e.clientY,
          id:
            stateArray.length > 0
              ? this.state.labels[this.state.labels.length - 1].id + 1
              : 0,
          showModal: true,
        };

        let tempArr1 = this.state.labels;
        tempArr1.push(styleObj);
        this.setState({ labels: tempArr1 });
        ls.set("labels", this.state.labels);

        break;
      }
      case "input": {
        let stateArray = this.state.inputs;

        stateArray &&
          stateArray.length > 0 &&
          stateArray.forEach((input) => (input.showModal = false));
        this.setState({ inputs: stateArray });
        let styleObj = {
          x: e.clientX,
          y: e.clientY,
          id:
            stateArray.length > 0
              ? this.state.inputs[this.state.inputs.length - 1].id + 1
              : 0,
          showModal: true,
        };
        let tempArr2 = this.state.inputs;
        tempArr2.push(styleObj);
        this.setState({ inputs: tempArr2 });
        ls.set("inputs", this.state.inputs);

        break;
      }
      case "button": {
        let stateArray = this.state.buttons;

        stateArray &&
          stateArray.length > 0 &&
          stateArray.forEach((button) => (button.showModal = false));
        this.setState({ buttons: stateArray });

        let styleObj = {
          x: e.clientX,
          y: e.clientY,
          id:
            stateArray.length > 0
              ? this.state.buttons[this.state.buttons.length - 1].id + 1
              : 0,
          showModal: true,
        };
        let tempArr3 = this.state.buttons;
        tempArr3.push(styleObj);
        this.setState({ buttons: tempArr3 });
        ls.set("buttons", this.state.buttons);

        break;
      }
      default: {
        console.log("Default");
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

  componentDidMount() {
    const labels = ls.get("labels") || [];
    const buttons = ls.get("buttons") || [];
    const inputs = ls.get("inputs") || [];

    console.log("LABELS", labels);
    console.log("BUTTONS", buttons);
    console.log("INPUTS", inputs);
    this.setState({ labels: labels, buttons: buttons, inputs: inputs });
  }

  render() {
    const { labels, inputs, buttons } = this.state;
    console.log(this.state);
    const renderLabels = (data) => {
      if (data && data.length > 0) {
        return data.map((label, i) => {
          return (
            <div key={i}>
              <Label
                data={label}
                closeModal={(type, id) => this.closeModal(type, id)}
                openModal={(type, id) => this.openModal(type, id)}
                closeAllModals={() => this.closeAllModals}
                deleteItem={(type, id) => this.deleteItem(type, id)}
              />
              ;
            </div>
          );
        });
      }
    };
    const renderInputs = (data) => {
      if (data && data.length > 0) {
        return data.map((label, i) => {
          return (
            <div key={i}>
              <Input
                data={label}
                closeModal={(type, id) => this.closeModal(type, id)}
                openModal={(type, id) => this.openModal(type, id)}
                closeAllModals={() => this.closeAllModals}
                deleteItem={(type, id) => this.deleteItem(type, id)}
              />
              ;
            </div>
          );
        });
      }
    };
    const renderButtons = (data) => {
      if (data && data.length > 0) {
        return data.map((label, i) => {
          return (
            <div key={i}>
              <Button
                data={label}
                closeModal={(type, id) => this.closeModal(type, id)}
                openModal={(type, id) => this.openModal(type, id)}
                closeAllModals={() => this.closeAllModals}
                deleteItem={(type, id) => this.deleteItem(type, id)}
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
