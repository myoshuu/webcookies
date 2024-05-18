document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");

  window.addEventListener("load", () => {
    loading.style.display = "none";
    content.style.display = "block";
    document.body.style.overflow = "auto";
  });

  document.body.style.overflow = "hidden";
});
