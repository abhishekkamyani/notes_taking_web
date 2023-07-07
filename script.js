const cardContainer = document.getElementById('cards-container');

const addNote = (text = '') => {
    const card = document.createElement('div');
    card.classList.add('card', 'border-dark', 'position-relative');
    card.innerHTML = `
    <span class="deleteNotes position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                        <i class="bi bi-trash"></i>
                    </span>
                    <span class="editNotes position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        <i class="bi bi-pen"></i>
                    </span>
                    <div class="savedNotes w-100 h-100 bg-light overflow-auto p-2"></div>
                    <textarea name="textNotes" class="textNotes overflow-auto p-2 d-none" cols="30" rows="10"></textarea>
                    `;
    cardContainer.prepend(card);
    const textNote = document.querySelector('.textNotes');
    const div = document.querySelector('.savedNotes');
    const textarea = div.nextElementSibling;
    const editNote = document.querySelector(`.editNotes`);
    const  editNotei = editNote.children[0];

    // if data is present in localStorage
    if(text != ''){
        div.innerText = text;
        textarea.value = text;
    }
    else{
        div.classList.toggle('d-none');
        textarea.classList.toggle('d-none');
        textNote.focus();
        editNotei.classList.toggle('bi-pen');
        editNotei.classList.toggle('bi-cloud-download');
    }
    

    // edit btn
    editNote.addEventListener('click', (e) => {
        div.classList.toggle('d-none');
        const edited = textarea.classList.toggle('d-none');
        // if any changes occured in text
        if(edited){
            div.innerText = textarea.value;
            update();
        }
        editNotei.classList.toggle('bi-pen');
        editNotei.classList.toggle('bi-cloud-download');
    });

    // delete note btn
    const deleteNote = document.querySelector('.deleteNotes');
    deleteNote.addEventListener('click', (e) => {
        const currentCard = deleteNote.parentElement;
        currentCard.style.transform = 'scale(-0.1)';
        setTimeout(() => {
            currentCard.remove();
            update();
        }, 800);
    });
}

// add a new note
addBtn.addEventListener('click',() =>{
    addNote();
});

function update() {
    const textareas = document.getElementsByTagName('textarea');
    const notes = [];
    for (const textarea of textareas) {
        if(textarea.value != ''){
            console.log(textarea.value);
            notes.unshift(textarea.value);
        }
    }
    localStorage.setItem('notes', JSON.stringify(notes));
}


// delete all notes
deleteBtn.addEventListener('click', (e) => {
    cardContainer.innerHTML = '';
    localStorage.clear();
});

// get all saved data when refreshing the page
const reloadNotes = () => {
    const storage = JSON.parse(localStorage.getItem('notes'));
    if(storage){
        storage.forEach(value => {
            addNote(value);
        });
    }
}
reloadNotes();