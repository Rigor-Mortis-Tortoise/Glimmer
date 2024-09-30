// external js: packery.pkgd.js, draggabilly.pkgd.js


var pckry = new Packery( '.grid', {
    itemSelector: '.grid-item',
    columnWidth: 250,
    gutter: 10
  });
  
  pckry.getItemElements().forEach( function( itemElem ) {
    var draggie = new Draggabilly( itemElem );
    pckry.bindDraggabillyEvents( draggie );
  });

// Function to open the modal
function openModal() {
  document.getElementById('noteModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
  document.getElementById('noteModal').style.display = 'none';
}


// Function to submit the note
function submitNote() {
  var title = document.getElementById('noteTitle').value;
  var body = document.getElementById('noteBody').value;
  var color = document.querySelector('input[name="noteColor"]:checked').value;
  addItem(title, body, color);
  closeModal();
}

// Modified addItem function to include color
function addItem(title, body, colorClass) {
  var newItem = document.createElement('div');
  newItem.classList.add('grid-item', colorClass);

  var newTitle = document.createElement('h2');
  newTitle.textContent = title;

  var newBody = document.createElement('p');
  newBody.textContent = body;

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.classList.add('delete-button');
  deleteButton.onclick = function() {
    newItem.remove();
    pckry.remove(newItem);
    pckry.layout();
    saveNotes();
  };

  newItem.appendChild(newTitle);
  newItem.appendChild(newBody);
  newItem.appendChild(deleteButton);

  var grid = document.querySelector('.grid');
  grid.appendChild(newItem);

  var draggie = new Draggabilly(newItem);
  pckry.appended(newItem);
  pckry.bindDraggabillyEvents(draggie);

  saveNotes();
}

// Function to save notes to local storage
function saveNotes() {
  var notes = [];
  document.querySelectorAll('.grid-item').forEach(function(item) {
      var title = item.querySelector('h2').textContent;
      var body = item.querySelector('p').textContent;
      var colorClass = item.classList[1]; // Assuming the color class is the second class
      notes.push({ title: title, body: body, colorClass: colorClass });
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotes() {
  var notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(function(note) {
      addItem(note.title, note.body, note.colorClass);
  });
}



// Load notes when the page loads
window.onload = loadNotes;
