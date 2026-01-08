const supa = window.supabase.createClient(
  "https://ervholljzloahibcjcnl.supabase.co",
  "sb_publishable_2D_wpVBMF4vQFUsCpxSa6g_TdUXPEYX"
);

document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supa.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Giriş başarısız");
  } else {
    window.location.href = "todo.html";
  }
};
