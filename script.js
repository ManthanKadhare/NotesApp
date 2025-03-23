// Display Notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(note, index) {
        html += `
            <div class="noteCard">
                <h3>${note.title}</h3>
                <textarea class="noteContent">${note.text}</textarea>
                <button class="saveBtn" onclick="saveEdit(${index})">Save</button>
                <button class="deleteBtn" onclick="deleteNote(${index})">Delete</button>
                <button class="downloadBtn" onclick="downloadNote(${index})">Download</button>
            </div>
        `;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No notes yet! Add a note to get started.`;
    }
}

// Add New Note
document.getElementById("addNote").addEventListener("click", function () {
    let noteTitle = document.getElementById("noteTitle").value.trim();
    let noteText = document.getElementById("noteText").value.trim();

    if (noteTitle === "" || noteText === "") {
        alert("Title and Note cannot be empty!");
        return;
    }

    let notes = localStorage.getItem("notes");
    let notesObj = notes === null ? [] : JSON.parse(notes);

    let newNote = {
        title: noteTitle,
        text: noteText
    };
    
    notesObj.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
    showNotes();
});

// Save Edited Note
function saveEdit(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let editedNote = document.getElementsByClassName("noteContent")[index].value;

    notes[index].text = editedNote;
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Delete Note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Download Note
function downloadNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let noteTitle = notes[index].title;
    let noteContent = notes[index].text;

    const blob = new Blob([noteContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${noteTitle}.txt`;
    a.click();

    URL.revokeObjectURL(url);
}

// Search Notes
document.getElementById("searchNote").addEventListener("input", function() {
    let searchText = document.getElementById("searchNote").value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");

    Array.from(noteCards).forEach(function(element) {
        let cardTitle = element.getElementsByTagName("h3")[0].innerText.toLowerCase();
        let cardText = element.getElementsByTagName("textarea")[0].value.toLowerCase();
        if (cardTitle.includes(searchText) || cardText.includes(searchText)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

// Dark/Light Mode Toggle
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelectorAll("textarea, input").forEach(el => el.classList.toggle("dark-mode"));
});

// Display notes on page load
showNotes();
