const addBtn = document.querySelector('.add');

const notes = JSON.parse(localStorage.getItem('notes'));
startPage()
if (notes.length !== 0) {
   notes.forEach(note => {
      console.log(note)
      addNote(note)
   })
}

addBtn.addEventListener('click', () => {
   addNote()
});

function addNote(data = {}) {
   const note = document.createElement('div');
   note.classList.add('note');

   note.innerHTML = `
    <div class="note__tools">
     <div class="note__date">
        <div class="create__date">
          <p>Create: </p>
          <p><span class="localDate create__localDate">${data.createLocalDate || new Date().toLocaleDateString()}</span> / 
          <span class="localTime create__localTime">${data.createLocalTime || new Date().toLocaleTimeString()}</span></p>
        </div>
         <div class="edit__date">
          <p>Last edit: </p>
          <p><span class="localDate edit-localDate">${data.editLocalDate || new Date().toLocaleDateString()}</span> / 
          <span class="localTime edit-localTime">${data.editLocalTime || new Date().toLocaleTimeString()}</span></p>
        </div>
    </div>
    <div class="tools__btn">
       <button class="note__edit"><i class="fas fa-edit"></i></button>
      <button class="note__delete"><i class="fas fa-trash"></i></button>
    </div>
    </div>
    <div class="note__main"></div>
    <textarea class="note__textarea hidden"></textarea>`;
   document.body.append(note);

   const editBtn = note.querySelector('.note__edit');
   const deleteBtn = note.querySelector('.note__delete');
   const mainEl = note.querySelector('.note__main');
   const textareaEl = note.querySelector('.note__textarea');
   const editLocalDate = note.querySelector('.edit-localDate');
   const editLocalTime = note.querySelector('.edit-localTime');

   textareaEl.value = data.textareaEl || '';
   mainEl.innerHTML = marked(textareaEl.value);

   editBtn.addEventListener('click', () => {
      textareaEl.classList.toggle('hidden');
      mainEl.classList.toggle('hidden');

      editLocalDate.innerHTML = `${new Date().toLocaleDateString()}`;
      editLocalTime.innerHTML = `${new Date().toLocaleTimeString()}`;
   });

   deleteBtn.addEventListener('click', () => {
      note.remove();
      addToLocalStorage()
   })

   textareaEl.addEventListener('input', (e) => {
      const {value} = e.target;
      mainEl.innerHTML = marked(value);
      addToLocalStorage()
   });
}

function addToLocalStorage() {
   const notes = document.querySelectorAll('.note');
   const noteData = [];

   notes.forEach(note => {
      const createLocalDate = note.querySelector('.create__localDate').innerText;
      const createLocalTime = note.querySelector('.create__localTime').innerText;
      const editLocalDate = note.querySelector('.edit-localDate').innerText;
      const editLocalTime = note.querySelector('.edit-localTime').innerText;
      const textareaEl = note.querySelector('.note__textarea').value;

      noteData.push({
         createLocalDate,
         createLocalTime,
         editLocalDate,
         editLocalTime,
         textareaEl
      });
   });
   localStorage.setItem('notes', JSON.stringify(noteData));
}

function startPage() {
   localStorage.setItem('notes', JSON.stringify([{textareaEl: "# JavaScript The Best Programing Language in the world"}, {textareaEl: "# [Fallow me ♥](https://github.com/muborizMirzoev)"}]));
}



