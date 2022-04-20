const root = document.getElementById("root");

function App() {
  const [activity, setActivity] = React.useState("");
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const submitHandler = event => {
    event.preventDefault();
    if (!activity) return setMessage("Harap isi aktivitas");
    setMessage("");

    if (edit.id) {
      const updatedTodo = { ...edit,
        activity
      };
      const editTodoIndex = todos.findIndex(todo => {
        return todo.id == edit.id;
      });
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);
      return cancelEditHandler();
    }

    setTodos([...todos, {
      id: Date.now(),
      activity,
      done: false
    }]);
    setActivity("");
  };

  const removeHandler = todoId => {
    const filteredTodos = todos.filter(todo => {
      return todo.id !== todoId;
    });
    setTodos(filteredTodos);
    if (edit.id) cancelEditHandler();
  };

  const editHandler = todo => {
    setActivity(todo.activity);
    setEdit(todo);
  };

  const cancelEditHandler = () => {
    setActivity("");
    setEdit({});
  };

  const doneHandler = todo => {
    const updatedTodo = { ...todo,
      done: todo.done ? false : true
    };
    const editTodoIndex = todos.findIndex(currentTodo => {
      return currentTodo.id == todo.id;
    });
    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Simple Todo List"), message && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "red"
    }
  }, message), /*#__PURE__*/React.createElement("form", {
    onSubmit: submitHandler
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: activity,
    placeholder: "Nama Aktivitas",
    onChange: event => {
      setActivity(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? "Simpan" : "Tambah"), edit.id && /*#__PURE__*/React.createElement("button", {
    onClick: cancelEditHandler
  }, "Batal")), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map(todo => {
    return /*#__PURE__*/React.createElement("li", {
      key: todo.id
    }, /*#__PURE__*/React.createElement("input", {
      id: todo.id,
      type: "checkbox",
      checked: todo.do,
      onChange: () => {
        doneHandler(todo);
      }
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: todo.id
    }, todo.activity, " (", todo.done ? "Selesai" : "Belum Selesai", ")"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        editHandler(todo);
      }
    }, "Ubah"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        removeHandler(todo.id);
      }
    }, "Hapus"), " ");
  })) : /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("i", null, "Todos masih kosong")));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);