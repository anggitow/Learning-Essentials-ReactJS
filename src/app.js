const root = document.getElementById("root");

function App() {
  const [activity, setActivity] = React.useState("");
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!activity) return setMessage("Harap isi aktivitas");

    setMessage("");

    if (edit.id) {
      const updatedTodo = { ...edit, activity };
      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id == edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        activity,
        done: false,
      },
    ]);
    setActivity("");
  };

  const removeHandler = (todoId) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(filteredTodos);

    if (edit.id) cancelEditHandler();
  };

  const editHandler = (todo) => {
    setActivity(todo.activity);
    setEdit(todo);
  };

  const cancelEditHandler = () => {
    setActivity("");
    setEdit({});
  };

  const doneHandler = (todo) => {
    const updatedTodo = { ...todo, done: todo.done ? false : true };
    const editTodoIndex = todos.findIndex((currentTodo) => {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  };

  return (
    <>
      <h2>Simple Todo List</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={activity}
          placeholder="Nama Aktivitas"
          onChange={(event) => {
            setActivity(event.target.value);
          }}
        />
        <button type="submit">{edit.id ? "Simpan" : "Tambah"}</button>
        {edit.id && <button onClick={cancelEditHandler}>Batal</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  id={todo.id}
                  type="checkbox"
                  checked={todo.do}
                  onChange={() => {
                    doneHandler(todo);
                  }}
                />
                <label htmlFor={todo.id}>
                  {todo.activity} ({todo.done ? "Selesai" : "Belum Selesai"})
                </label>
                <button
                  onClick={() => {
                    editHandler(todo);
                  }}
                >
                  Ubah
                </button>
                <button
                  onClick={() => {
                    removeHandler(todo.id);
                  }}
                >
                  Hapus
                </button>{" "}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>Todos masih kosong</i>
        </p>
      )}
    </>
  );
}

ReactDOM.render(<App />, root);
