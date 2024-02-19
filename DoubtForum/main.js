window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		const solutionButton = document.createElement('button');
        const solutionPanel = document.createElement('div');
        const closeButton = document.createElement('button');

        solutionButton.classList.add('solution');
        solutionPanel.classList.add('solution-panel');
        closeButton.classList.add('close-button');

        solutionButton.innerHTML = 'Solution';
        solutionPanel.innerHTML = '<textarea placeholder="Add notes..."></textarea><button>Add Note</button><div class="notes-container"></div>';
        closeButton.innerHTML = 'Close';

        solutionButton.addEventListener('click', () => {
            solutionPanel.style.display = 'block';
            DisplayNotes();
        });

        solutionPanel.querySelector('button').addEventListener('click', () => {
            const noteTextarea = solutionPanel.querySelector('textarea');
            const note = noteTextarea.value.trim();

            if (note !== '') {
                if (!todo.notes) {
                    todo.notes = [];
                }
                todo.notes.push(note);
                localStorage.setItem('todos', JSON.stringify(todos));
                noteTextarea.value = '';
                DisplayNotes();
            }
        });

        closeButton.addEventListener('click', () => {
            solutionPanel.style.display = 'none';
        });

        function DisplayNotes() {
            const notesContainer = solutionPanel.querySelector('.notes-container');
            notesContainer.innerHTML = '';

            if (todo.notes && todo.notes.length > 0) {
                todo.notes.forEach(note => {
                    const noteItem = document.createElement('div');
                    noteItem.classList.add('note-item');
                    noteItem.textContent = note;
                    notesContainer.appendChild(noteItem);
                });
            }
        }

        solutionPanel.appendChild(closeButton);
        actions.appendChild(solutionButton);
        actions.appendChild(solutionPanel);

		
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}