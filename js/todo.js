document.addEventListener("DOMContentLoaded", async function () {

  const supabase = window.supabase.createClient(
    "https://ervholljzloahibcjcnl.supabase.co",
    "sb_publishable_2D_wpVBMF4vQFUsCpxSa6g_TdUXPEYX"
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("logoutBtn").onclick = async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  };

  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");
  const emptyState = document.getElementById("emptyState");

  const activeCountEl = document.getElementById("activeCount");
  const completedCountEl = document.getElementById("completedCount");
  const totalCountEl = document.getElementById("totalCount");

  let todos = [];
  let currentFilter = "all";

  document.querySelectorAll(".filters button").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTodos();
    };
  });

  function renderTodos() {
    todoList.innerHTML = "";

    let active = 0;
    let completed = 0;

    const filtered = todos.filter(t => {
      if (currentFilter === "active") return !t.completed;
      if (currentFilter === "completed") return t.completed;
      return true;
    });

    filtered.forEach(todo => {
      if (todo.completed) completed++;
      else active++;

      const li = document.createElement("li");
      if (todo.completed) li.classList.add("completed");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      checkbox.onchange = async () => {
        todo.completed = checkbox.checked;
        renderTodos();
        await supabase.from("todos")
          .update({ completed: todo.completed })
          .eq("id", todo.id);
      };

      const text = document.createElement("div");
      text.className = "todo-text";

      const title = document.createElement("div");
      title.className = "todo-title";
      title.textContent = todo.title;

      const date = document.createElement("div");
      date.className = "todo-date";
      date.textContent = new Date(todo.created_at).toLocaleDateString("tr-TR");

      text.append(title, date);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Sil";
      delBtn.onclick = async () => {
        todos = todos.filter(t => t.id !== todo.id);
        renderTodos();
        await supabase.from("todos")
          .update({ deleted: true })
          .eq("id", todo.id);
      };

      const actions = document.createElement("div");
      actions.className = "actions";
      actions.appendChild(delBtn);

      li.append(checkbox, text, actions);
      todoList.appendChild(li);
    });

    emptyState.style.display = filtered.length === 0 ? "block" : "none";

    activeCountEl.textContent = active;
    completedCountEl.textContent = completed;
    totalCountEl.textContent = todos.length;
  }

  addTodoBtn.onclick = async () => {
    const title = todoInput.value.trim();
    if (!title) return;

    todoInput.value = "";

    const temp = {
      id: Date.now(),
      title,
      completed: false,
      created_at: new Date().toISOString()
    };

    todos.unshift(temp);
    renderTodos();

    const { data } = await supabase.from("todos")
      .insert({ title, user_id: user.id, completed: false, deleted: false })
      .select()
      .single();

    temp.id = data.id;
    temp.created_at = data.created_at;
  };

  async function loadTodos() {
    const { data } = await supabase.from("todos")
      .select("*")
      .eq("user_id", user.id)
      .eq("deleted", false)
      .order("created_at", { ascending: false });

    todos = data || [];
    renderTodos();
  }

  loadTodos();
});
