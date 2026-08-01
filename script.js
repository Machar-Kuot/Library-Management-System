// petals
  const petalField = document.getElementById('petals');
  const symbols = ['❀','✿','❁'];
  for(let i=0;i<16;i++){
    const p = document.createElement('div');
    p.className='petal';
    p.textContent = symbols[i % symbols.length];
    p.style.left = Math.random()*100 + 'vw';
    p.style.setProperty('--drift', (Math.random()*60-30)+'px');
    p.style.animationDuration = (10 + Math.random()*10) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    p.style.fontSize = (10 + Math.random()*10) + 'px';
    petalField.appendChild(p);
  }

  // envelope open
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  document.getElementById('envelopeWrap').addEventListener('click', () => {
    envelope.classList.add('open');
    letter.classList.add('show');
  });

  // polaroids with local photo upload (client-side only, nothing leaves the browser)
  const captions = [
    'us, on a good day',
    'that one place we loved',
    "silly one, don't judge",
    'my favorite'
  ];
  const scrapbook = document.getElementById('scrapbook');
  captions.forEach((cap, i) => {
    const fig = document.createElement('figure');
    fig.className = 'polaroid';
    fig.innerHTML = `
      <div class="tape"></div>
      <label class="photo-slot" id="slot-${i}">tap to add a photo</label>
      <input type="file" accept="image/*" id="file-${i}">
      <figcaption>${cap}</figcaption>
    `;
    scrapbook.appendChild(fig);
    const input = fig.querySelector('input');
    const slot = fig.querySelector('.photo-slot');
    slot.setAttribute('for', `file-${i}`);
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        slot.innerHTML = `<img src="${ev.target.result}" alt="${cap}">`;
      };
      reader.readAsDataURL(file);
    });
  });

