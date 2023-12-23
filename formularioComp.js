class FormularioContext {
    #inputs = [];
    #table = document.createElement("table");
    #thead = document.createElement("thead");
    #tbody = document.createElement("tbody");
    #tfoot = document.createElement("tfoot");
  
    // Constantes
    #ERROR_STYLE = "color: red; display: block;margin:0;";
    #REQUIRED_FIELD_ERROR = "Error: Este campo es obligatorio";
    #SUBMIT_BUTTON_TEXT = "Enviar";
    #SUBMIT_BUTTON_CLASS = "btnForm";
  
    constructor(elementContainer, title, campos, id, columnas, ruta) {
      this.elementContainer = elementContainer;
      this.title = title;
      this.campos = campos;
      this.id = id;
      this.columnas = columnas;
      this.fetch = ruta;
      this.#table.id = this.id;
      this.widthTable = Math.max(...campos.map(campo => campo.reduce((ac, current) => ac + current.colspan, 0)));
      this.#table.style.width = `100%`;
    }
  
    head() {
      this.#table.appendChild(this.#thead);
      const headRow = this.#thead.insertRow();
      const cell = headRow.insertCell(0);
      cell.colSpan = this.widthTable;
      cell.align = "center";
      cell.insertAdjacentText("afterbegin", this.title);
    }
  
    body() {
      this.#table.appendChild(this.#tbody);
  
      this.campos.forEach(campo => {
        const labelRow = this.#tbody.insertRow();
        const inputRow = this.#tbody.insertRow();
  
        campo.forEach((campo2, index2) => {
          const labelCell = labelRow.insertCell(index2);
          const inputCell = inputRow.insertCell(index2);
          this.setupLabelCell(labelCell, campo2);
          this.createInputCell(inputCell, campo2);
        });
      });
    }
  
    setupLabelCell(labelCell, campo) {
      labelCell.colSpan = campo.colspan;
      labelCell.insertAdjacentText("afterbegin", campo.label);
    }
  
    createInputCell(inputCell, campo2) {
      const inputElement = document.createElement("input");
      const paragraph = document.createElement("p");
      inputElement.style.width = campo2.inputwidth;
      inputCell.colSpan = campo2.colspan;
      inputCell.vAlign = "top";
      inputCell.appendChild(inputElement);
      inputCell.appendChild(paragraph);
  
      switch (campo2.type) {
        case 'number':
          inputElement.addEventListener('keydown', (e) => {
            const patron = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
            return patron.test(e.key);
          });
          break;
      }
  
      this.#inputs.push({ elemento: inputElement, obligatorio: campo2.obligatorio, label: campo2.label, p: paragraph });
    }
  
    errorLabel(errorMsg, input) {
      input.elemento.style.borderColor = "red";
      input.p.innerHTML = errorMsg;
      input.p.style = this.#ERROR_STYLE;
    }
  
    submit() {
      let error = 0;
  
      this.#inputs.forEach(input => {
        if (input.obligatorio && input.elemento.value === '') {
          this.errorLabel(`${this.#REQUIRED_FIELD_ERROR}`, input);
          error++;
        } else {
          input.elemento.style.borderColor = "";
          input.p.style.display = "none";
        }
      });
  
      if (error === 0) {
        alert("¡Todo está bien!");
      }
    }
  
    foot() {
      this.#table.appendChild(this.#tfoot);
      const row = this.#tfoot.insertRow();
      const cell = row.insertCell(0);
      cell.colSpan = this.widthTable;
      cell.align = "center";
  
      const submitButton = document.createElement("button");
      submitButton.classList.add(this.#SUBMIT_BUTTON_CLASS);
      submitButton.textContent = this.#SUBMIT_BUTTON_TEXT;
      submitButton.addEventListener("click", () => this.submit());
  
      cell.appendChild(submitButton);
    }
  
    drawTableForm() {
      this.elementContainer.innerHTML = '';
      this.head();
      this.body();
      this.foot();
      this.elementContainer.appendChild(this.#table);
    }
  }
  
const draw = new FormularioContext(
    contenedorTable,
    'prueba',
    [[{label:'nombre',inputwidth:'98%',colspan:2,obligatorio:true, type:'text'},{label:'nombre',colspan:1,obligatorio:true, type:'text'},{label:'escrito',colspan:1,obligatorio:true},{label:'asd',colspan:1,obligatorio:true}],[{label:'edad',colspan:1,obligatorio:true,type:'number'},{label:'prueba',colspan:1,obligatorio:true}]]
    ,'formAlumnos','100%','xd');
draw.drawTableForm();