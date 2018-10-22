import { tag, WeElement } from 'omi'
@tag("todo-list")
class TodoList extends WeElement {
	static get data() {
		return { items: [] };
	}
    deleteItem = idx => {
		return (e) => {
		    e.stopPropagation();
            this.store.remove(idx);
        }
	}
	render(props) {
		return (
			<ul>
				{this.store.data.items.map((item, index) => (
					<li  data-key={item.id} key={item.id}>{item.text} <span onClick={this.deleteItem(index)}>{this.store.data.todoList.icon}</span></li>
				))}
			</ul>
		);
	}
}

@tag("todo-app")
class TodoApp extends WeElement {
	static get data() {
		return { items: [], text: "" };
	}

	render() {
		return (
			<div>
				<h3>TODO</h3>
				<todo-list />
				<form onSubmit={this.handleSubmit}>
					<input
						id="new-todo"
						onChange={this.handleChange}
						value={this.data.text}
					/>
					<button>Add #{this.store.data.items.length + 1}</button>
				</form>
			</div>
		);
	}

    handleChange = e => {
		this.store.data.text = e.target.value;
	};

	handleSubmit = e => {
		e.preventDefault();
		this.store.add();
	};
}
