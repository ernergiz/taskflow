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

  const deletedList = document.getElementById("deletedList");
  const emptyText = document.getElementById("emptyText");
  const deleteAllBtn = document.getElementById("deleteAllBtn");

  deleteAllBtn.onclick = async () => {
    if (!confirm("TÜM silinen görevler kalıcı olarak silinsin mi?")) return;

    await supabase
      .from("todos")
      .delete()
      .eq("user_id", user.id)
      .eq("deleted", true);

    loadDeletedTodos();
  };

  async function loadDeletedTodos() {
    const { data } = await supabase
      .from("todos")
      .select("id, title")
      .eq("user_id", user.id)
      .eq("deleted", true)
      .order("created_at", { ascending: false });

    deletedList.innerHTML = "";

    if (!data || data.length === 0) {
      emptyText.style.display = "block";
      deleteAllBtn.style.display = "none";
      return;
    }

    emptyText.style.display = "none";
    deleteAllBtn.style.display = "block";

    data.forEach(todo => {
      const li = document.createElement("li");

      const title = document.createElement("span");
      title.textContent = todo.title;

      const actions = document.createElement("div");
      actions.className = "actions";

      const restoreBtn = document.createElement("button");
      restoreBtn.textContent = "Geri Yükle";
      restoreBtn.className = "restore-btn";
      restoreBtn.onclick = async () => {
        await supabase
          .from("todos")
          .update({ deleted: false })
          .eq("id", todo.id);

        loadDeletedTodos();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Kalıcı Sil";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = async () => {
        if (!confirm(`"${todo.title}" kalıcı silinsin mi?`)) return;

        await supabase
          .from("todos")
          .delete()
          .eq("id", todo.id);

        loadDeletedTodos();
      };

      actions.append(restoreBtn, deleteBtn);
      li.append(title, actions);
      deletedList.appendChild(li);
    });
  }

  loadDeletedTodos();
});
