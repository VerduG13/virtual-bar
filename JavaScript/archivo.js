// Datos completos de cócteles
const cocktails = [
  {
    name: 'Mojito',
    ingredients: [
      { name: 'Ron blanco', qty: 50, unit: 'ml' },
      { name: 'Azúcar', qty: 1, unit: 'cucharada' },
      { name: 'Jugo de medio limón', qty: 1, unit: 'unidad' },
      { name: 'Hojas de menta', qty: 6, unit: 'hojas' },
      { name: 'Agua con gas', qty: null, unit: '' },
      { name: 'Hielo', qty: null, unit: '' }
    ]
  },
  {
    name: 'Margarita',
    ingredients: [
      { name: 'Tequila', qty: 50, unit: 'ml' },
      { name: 'Triple sec', qty: 25, unit: 'ml' },
      { name: 'Jugo de limón', qty: 25, unit: 'ml' },
      { name: 'Sal para el borde', qty: null, unit: '' },
      { name: 'Hielo', qty: null, unit: '' }
    ]
  },
  {
    name: 'Caipirinha',
    ingredients: [
      { name: 'Cachaça', qty: 50, unit: 'ml' },
      { name: 'Limón', qty: 1, unit: 'unidad' },
      { name: 'Azúcar', qty: 2, unit: 'cucharaditas' },
      { name: 'Hielo', qty: null, unit: '' }
    ]
  },
  {
    name: 'Piña Colada',
    ingredients: [
      { name: 'Ron blanco', qty: 50, unit: 'ml' },
      { name: 'Crema de coco', qty: 30, unit: 'ml' },
      { name: 'Jugo de piña', qty: 90, unit: 'ml' },
      { name: 'Hielo', qty: null, unit: '' }
    ]
  },
  {
    name: 'Daiquiri de fresa',
    ingredients: [
      { name: 'Ron blanco', qty: 50, unit: 'ml' },
      { name: 'Jugo de limón', qty: 25, unit: 'ml' },
      { name: 'Jarabe simple', qty: 25, unit: 'ml' },
      { name: 'Fresas frescas', qty: 4, unit: 'unidades' },
      { name: 'Hielo', qty: null, unit: '' }
    ]
  },
  {
    name: 'Tequila Sunrise',
    ingredients: [
      { name: 'Tequila', qty: 50, unit: 'ml' },
      { name: 'Jugo de naranja', qty: 100, unit: 'ml' },
      { name: 'Granadina', qty: 15, unit: 'ml' },
      { name: 'Hielo', qty: null, unit: '' }
    ]
  }
];

// Formulario exp
function abrirFormulario() {
  const audio = document.getElementById('brindis-sound');
  if (audio) audio.play();
  window.open('https://forms.office.com/r/gBwab6EJ3V', '_blank');
}

// Edad
function verificarEdad() {
  if (localStorage.getItem('esMayor') === 'true') return true;
  const esMayor = confirm("¿Eres mayor de edad?");
  if (!esMayor) {
    document.body.innerHTML = `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        height:100vh;
        font-family:Arial,sans-serif;
        text-align:center;
        padding:1rem;">
        <h1>Acceso denegado</h1>
        <p>Este sitio está <strong>recomendado solo para adultos</strong>.</p>
      </div>`;
    return false;
  }
  localStorage.setItem('esMayor','true');
  return true;
}

// animación
function fadeInCocteles() {
  const cards = document.querySelectorAll('.coctel');
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      let opacity = 0;
      let y = 20;
      const anim = setInterval(() => {
        opacity += 0.02;
        y -= 0.4;
        card.style.opacity = opacity;
        card.style.transform = `translateY(${y}px)`;
        if (opacity >= 1) {
          clearInterval(anim);
          card.style.opacity = 1;
          card.style.transform = 'translateY(0)';
        }
      }, 16);
    }, i * 200);
  });
}

// pulso del botón
function pulseButton(btn) {
  let scale = 1;
  let growing = true;
  const anim = setInterval(() => {
    if (growing) {
      scale += 0.02;
      if (scale >= 1.2) growing = false;
    } else {
      scale -= 0.02;
      if (scale <= 1) {
        clearInterval(anim);
        btn.style.transform = 'scale(1)';
        return;
      }
    }
    btn.style.transform = `scale(${scale})`;
  }, 16);
}

// cálculo por personas
function calcularIngredientes(idx) {
  let personas = parseInt(
    prompt(`¿Para cuántas personas deseas preparar ${cocktails[idx].name}?`, "1"),
    10
  );
  if (isNaN(personas) || personas < 1) {
    alert("Por favor ingresa un número válido de personas.");
    return;
  }

  // simulación de carga con while
  let i = 0;
  while (i < cocktails[idx].ingredients.length) {
    console.log(`Cargando ingrediente ${i + 1} de ${cocktails[idx].ingredients.length}`);
    i++;
  }

  // construcción de resultado con for + break
  let resultados = "";
  for (let j = 0; j < cocktails[idx].ingredients.length; j++) {
    if (j === 5) break;
    const ing = cocktails[idx].ingredients[j];
    const total = ing.qty !== null ? ing.qty * personas : "al gusto";
    resultados += `• ${ing.name}: ${total} ${ing.unit}\n`;
  }

  alert(`Ingredientes para ${personas} personas de ${cocktails[idx].name}:\n\n${resultados}`);
}

window.onload = () => {
  if (!verificarEdad()) return;
  fadeInCocteles();

  document.querySelectorAll('.calcular-btn').forEach(btn => {
    const idx = parseInt(btn.dataset.index, 10);
    btn.addEventListener('click', () => {
      pulseButton(btn);
      calcularIngredientes(idx);
    });
  });

  const respBtn = document.getElementById('btnResponder');
  if (respBtn) {
    respBtn.addEventListener('click', abrirFormulario);
  }
};
