const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

//set prompt to null
  window.deferredPrompt = null;

//toggle classlist to hidden
  butInstall.classList.toggle('hidden', true)

});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
