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

  // ============================================================
  // PUT YOUR PHOTOS HERE.
  // 1. Put your image files in the SAME folder as this script.js
  // 2. Set "src" to the exact filename (e.g. "photo1.jpg")
  // 3. Leave src as "" to keep the tap-to-upload placeholder instead
  // ============================================================
  const photos = [
  { src: 'Us.jpg', caption: 'us, on a good day' },
  { src: 'Pl.jpg', caption: 'that one place we loved' },
  { src: 'Silly.jpg', caption: "silly Me, don't judge" },
  { src: 'Favourite.jpg', caption: 'my favorite' }
];

  const scrapbook = document.getElementById('scrapbook');
  photos.forEach((photo, i) => {
    const fig = document.createElement('figure');
    fig.className = 'polaroid';

    const slotContent = photo.src
      ? `<div class="photo-slot" id="slot-${i}"><img src="${photo.src}" alt="${photo.caption}"></div>`
      : `<label class="photo-slot" id="slot-${i}" for="file-${i}">tap to add a photo</label><input type="file" accept="image/*" id="file-${i}">`;

    fig.innerHTML = `
      <div class="tape"></div>
      ${slotContent}
      <figcaption>${photo.caption}</figcaption>
    `;
    scrapbook.appendChild(fig);

    // only wire up the upload fallback if no permanent photo was set
    if(!photo.src){
      const input = fig.querySelector('input');
      const slot = fig.querySelector('.photo-slot');
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          slot.outerHTML = `<div class="photo-slot"><img src="${ev.target.result}" alt="${photo.caption}"></div>`;
        };
        reader.readAsDataURL(file);
      });
    }
  });
