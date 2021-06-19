const addNoteButton = document.querySelector("#outerAddNoteButton");
const notesCollection = document.querySelector("#notesCollection");

function createNotes(text=""){
    const notes = document.createElement("div");
    notes.classList.add("notes");
    notes.innerHTML =`<div class="icons">
                            <i class="fas fa-pen-fancy iconButtons"></i>
                            <i class="fas fa-copy iconButtons"></i>
                            <i class="fas fa-trash iconButtons"></i>
                      </div>
                      <div class="noteTextHtml"></div>
                      <textarea class="noteTextArea hidden"></textarea>`;
    notesCollection.appendChild(notes);

    const editNote = notes.querySelector(".fa-pen-fancy");
    const copyNote = notes.querySelector(".fa-copy");
    const deleteNote = notes.querySelector(".fa-trash");
    const noteTextHtml = notes.querySelector(".noteTextHtml");
    const noteTextArea = notes.querySelector(".noteTextArea");

    noteTextHtml.textContent = text;
    noteTextArea.value = text;
    if(!text){
        noteTextHtml.classList.toggle("visibility");
        noteTextArea.classList.toggle("hidden");
    }

    editNote.addEventListener("click", () =>{
        noteTextHtml.textContent = noteTextArea.value;
        noteTextHtml.classList.toggle("visibility");
        noteTextArea.classList.toggle("hidden");
        updateStorageData();
    });

    noteTextArea.addEventListener("change", () =>{
        noteTextHtml.textContent = noteTextArea.value;
        updateStorageData();
    });

    copyNote.addEventListener("click", () =>{
        if(noteTextArea.classList.contains("hidden")){
            noteTextHtml.classList.toggle("visibility");
            noteTextArea.classList.toggle("hidden");
        }
        noteTextArea.select();
        noteTextArea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(noteTextArea.value);
    });

    deleteNote.addEventListener("click", () =>{
        notes.remove();
        updateStorageData();
    });
}

function updateStorageData(){
    const noteTextAreaCollection = notesCollection.querySelectorAll(".noteTextArea");
    const textAreaValue = [];
    noteTextAreaCollection.forEach(element => {
        textAreaValue.push(element.value);
    });
    localStorage.setItem("storageTextAreaValue", JSON.stringify(textAreaValue));
    console.log("it is working");
}

const storageTextAreaValue = JSON.parse(localStorage.getItem("storageTextAreaValue"));

if(storageTextAreaValue){
    storageTextAreaValue.forEach(element => {
        createNotes(element);
    });
}

addNoteButton.addEventListener("click", () => createNotes());

