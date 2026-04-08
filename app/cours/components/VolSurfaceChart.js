// Composant interactif : nappe de volatilité 3D (skew actions typique)
// Three.js importé dynamiquement dans useEffect (browser-only)
// Rotation souris/touch — pas d'OrbitControls (import externe)

'use client';

import { useEffect, useRef } from 'react';

// Heatmap : bleu (vol basse) → cyan → vert → jaune → rouge (vol haute)
function heatColor(t) {
  let r, g, b;
  if (t < 0.25)      { r = 0;               g = t * 4;           b = 1; }
  else if (t < 0.5)  { r = 0;               g = 1;               b = 1 - (t - 0.25) * 4; }
  else if (t < 0.75) { r = (t - 0.5) * 4;  g = 1;               b = 0; }
  else               { r = 1;               g = 1 - (t - 0.75) * 4; b = 0; }
  return [r, g, b];
}

// Volatilité implicite approchée — skew indice actions prononcé
function sigmImpl(K, T) {
  const m = (100 - K) / 100;          // moneyness : >0 = put OTM, <0 = call OTM
  const atmVol = 0.18 + 0.03 * Math.log(1 + T);  // term structure ATM légèrement croissante
  const skew = 0.28 * Math.exp(-0.6 * T);         // skew qui s'écrase avec T
  const convexity = 0.60 * Math.exp(-0.6 * T);    // smile (convexité) qui s'écrase avec T
  return atmVol + skew * m + convexity * m * m;
}

// Axe 3D — segment coloré
function makeAxis(scene, THREE, from, to, color) {
  const geo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
  ]);
  const mat = new THREE.LineBasicMaterial({ color });
  const line = new THREE.Line(geo, mat);
  scene.add(line);
  return { geo, mat };
}

// Label sprite 3D via canvas 2D
function makeLabel(scene, THREE, text, position, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.font = 'bold 36px Arial';
  ctx.fillText(text, 10, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.position.set(...position);
  sprite.scale.set(0.6, 0.15, 1);
  scene.add(sprite);
  return { tex, mat };
}

export default function VolSurfaceChart() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let disposeAll = null;

    import('three').then((THREE) => {
      if (cancelled) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const W = container.clientWidth || 640;
      const H = 420;

      // ── Renderer ──────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xffffff);

      // ── Scene & Camera ────────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);

      // ── Grille de la nappe ────────────────────────────────────────
      const nK = 20, nT = 15;
      const kMin = 70, kMax = 130;
      const tMin = 1 / 12, tMax = 2;

      // Calcul des bornes de vol pour normalisation
      let volMin = Infinity, volMax = -Infinity;
      for (let iy = 0; iy < nT; iy++) {
        for (let ix = 0; ix < nK; ix++) {
          const K = kMin + (kMax - kMin) * ix / (nK - 1);
          const T = tMin + (tMax - tMin) * iy / (nT - 1);
          const v = sigmImpl(K, T);
          if (v < volMin) volMin = v;
          if (v > volMax) volMax = v;
        }
      }

      // PlaneGeometry(2, 2, nK-1, nT-1) → nK×nT vertices dans le plan xy
      // Après rotateX(-π/2) : x = axe K, z = axe T, y = 0 (puis déformé = vol)
      const geo = new THREE.PlaneGeometry(2, 2, nK - 1, nT - 1);
      geo.rotateX(-Math.PI / 2);

      const pos = geo.attributes.position;
      const colorArr = [];

      for (let iy = 0; iy < nT; iy++) {
        for (let ix = 0; ix < nK; ix++) {
          const idx = iy * nK + ix;
          const K = kMin + (kMax - kMin) * ix / (nK - 1);
          const T = tMin + (tMax - tMin) * iy / (nT - 1);
          const vol = sigmImpl(K, T);
          const t = (vol - volMin) / (volMax - volMin);
          pos.setY(idx, t * 0.8);
          colorArr.push(...heatColor(t));
        }
      }

      geo.setAttribute('color', new THREE.Float32BufferAttribute(colorArr, 3));
      geo.computeVertexNormals();

      // Matériau principal (vertex colors)
      const mat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      });

      // Wireframe fin par-dessus
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });

      const mesh = new THREE.Mesh(geo, mat);
      const wire = new THREE.Mesh(geo, wireMat);

      // Centrer verticalement : la vol oscille entre 0 et 0.8 → décaler de -0.4
      mesh.position.y = -0.4;
      wire.position.y = -0.4;

      scene.add(mesh);
      scene.add(wire);

      // ── Axes 3D ───────────────────────────────────────────────────
      const axisK = makeAxis(scene, THREE, [-1.1, -0.4, -1.1], [1.1, -0.4, -1.1], 0xe53e3e);
      const axisT = makeAxis(scene, THREE, [-1.1, -0.4, -1.1], [-1.1, -0.4, 1.1], 0x38a169);
      const axisV = makeAxis(scene, THREE, [-1.1, -0.4, -1.1], [-1.1,  0.5, -1.1], 0x2563eb);

      // ── Labels sprites ────────────────────────────────────────────
      const labelK = makeLabel(scene, THREE, 'Strike K →',   [ 1.3, -0.4, -1.1], '#e53e3e');
      const labelT = makeLabel(scene, THREE, 'Maturité T →', [-1.1, -0.4,  1.4], '#38a169');
      const labelV = makeLabel(scene, THREE, 'σ impl ↑',     [-1.1,  0.65,-1.1], '#2563eb');

      // ── Caméra : position initiale ────────────────────────────────
      const RADIUS = 3.8;
      const MIN_ELEV = 0.09; // ~5°
      const MAX_ELEV = 1.48; // ~85°
      let azimuth = Math.PI / 5;
      let elevation = 0.55;

      function updateCamera() {
        camera.position.x = RADIUS * Math.cos(elevation) * Math.sin(azimuth);
        camera.position.y = RADIUS * Math.sin(elevation);
        camera.position.z = RADIUS * Math.cos(elevation) * Math.cos(azimuth);
        camera.lookAt(0, 0, 0);
      }
      updateCamera();

      // ── Boucle de rendu ───────────────────────────────────────────
      let animId;
      function animate() {
        animId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      // ── Contrôles souris ──────────────────────────────────────────
      let isDragging = false;
      let prevX = 0, prevY = 0;

      function onMouseDown(e) {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
        canvas.style.cursor = 'grabbing';
      }
      function onMouseMove(e) {
        if (!isDragging) return;
        azimuth   -= (e.clientX - prevX) * 0.01;
        elevation  = Math.max(MIN_ELEV, Math.min(MAX_ELEV, elevation - (e.clientY - prevY) * 0.01));
        prevX = e.clientX;
        prevY = e.clientY;
        updateCamera();
      }
      function onMouseUp() {
        isDragging = false;
        canvas.style.cursor = 'grab';
      }

      // ── Contrôles touch ───────────────────────────────────────────
      let isTouching = false;
      let prevTX = 0, prevTY = 0;

      function onTouchStart(e) {
        if (e.touches.length === 1) {
          isTouching = true;
          prevTX = e.touches[0].clientX;
          prevTY = e.touches[0].clientY;
        }
      }
      function onTouchMove(e) {
        if (!isTouching || e.touches.length !== 1) return;
        azimuth   -= (e.touches[0].clientX - prevTX) * 0.01;
        elevation  = Math.max(MIN_ELEV, Math.min(MAX_ELEV, elevation - (e.touches[0].clientY - prevTY) * 0.01));
        prevTX = e.touches[0].clientX;
        prevTY = e.touches[0].clientY;
        updateCamera();
        e.preventDefault();
      }
      function onTouchEnd() { isTouching = false; }

      canvas.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('touchstart', onTouchStart, { passive: true });
      canvas.addEventListener('touchmove', onTouchMove, { passive: false });
      canvas.addEventListener('touchend', onTouchEnd);

      // ── Cleanup ───────────────────────────────────────────────────
      disposeAll = () => {
        cancelAnimationFrame(animId);
        canvas.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('touchstart', onTouchStart);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('touchend', onTouchEnd);
        geo.dispose();
        mat.dispose();
        wireMat.dispose();
        axisK.geo.dispose(); axisK.mat.dispose();
        axisT.geo.dispose(); axisT.mat.dispose();
        axisV.geo.dispose(); axisV.mat.dispose();
        labelK.tex.dispose(); labelK.mat.dispose();
        labelT.tex.dispose(); labelT.mat.dispose();
        labelV.tex.dispose(); labelV.mat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      if (disposeAll) disposeAll();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white border border-gray-300 rounded-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', cursor: 'grab' }}
      />
    </div>
  );
}
