document.querySelector("#submitBtn").addEventListener("click", async (ev) => {
  ev.preventDefault();
  const form = new FormData();
  form.append("name", document.querySelector("#name").value);
  form.append("email", document.querySelector("#email").value);
  form.append("password", document.querySelector("#password").value);
  form.append("passwordConfirm", document.querySelector("#password2").value);

  const result = await fetch(`http://127.0.0.1:3000/signup`, {
    method: "POST",
    body: form,
  });

  const resJson = await result.json();
});
