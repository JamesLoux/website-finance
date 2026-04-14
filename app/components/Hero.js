'use client'

import Link from "next/link";
import { useEffect, useRef } from "react";

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function boxMuller() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}

const STEP = 2.4;
const FADE_IN_FRAMES = 40;
const FADE_OUT_FRAMES = 150;

function initTrajectory(canvasWidth, canvasHeight, stagger = false) {
  const isBlue = Math.random() < 0.7;
  const color = isBlue ? '#2563eb' : '#94a3b8';
  const baseOpacity = isBlue
    ? randomBetween(0.12, 0.18)
    : randomBetween(0.20, 0.41);
  const sigma = randomBetween(4.5, 10);
  const drift = randomBetween(-0.9, 0.9);
  const startY = randomBetween(canvasHeight * 0.15, canvasHeight * 0.85);

  // Pre-fill a random portion of the canvas so trajectories don't all start together
  const preCount = stagger
    ? Math.floor(randomBetween(0, (canvasWidth / STEP) * 1.3))
    : 0;

  const ys = [startY];
  for (let i = 1; i <= preCount; i++) {
    ys.push(ys[ys.length - 1] + drift + sigma * boxMuller());
  }

  return {
    color,
    baseOpacity,
    sigma,
    drift,
    ys,                                           // y values, newest at end
    headX: preCount * STEP,                       // x of the last point
    frame: stagger ? FADE_IN_FRAMES : 0,
    phase: stagger ? 'active' : 'fadein',
  };
}

export default function Hero() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let trajectories = Array.from({ length: 5 }, () =>
      initTrajectory(canvas.width, canvas.height, true)
    );

    function drawGrid() {
      const w = canvas.width;
      const h = canvas.height;

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(37,99,235,0.045)';
      ctx.beginPath();
      for (let x = 0; x <= w; x += 20) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y <= h; y += 20) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(37,99,235,0.10)';
      ctx.beginPath();
      for (let x = 0; x <= w; x += 100) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y <= h; y += 100) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();
    }

    function getOpacity(traj) {
      if (traj.phase === 'fadein')
        return traj.baseOpacity * (traj.frame / FADE_IN_FRAMES);
      if (traj.phase === 'fadeout')
        return traj.baseOpacity * Math.max(0, 1 - traj.frame / FADE_OUT_FRAMES);
      return traj.baseOpacity;
    }

    function drawTrajectory(traj) {
      const opacity = getOpacity(traj);
      if (opacity <= 0 || traj.ys.length < 2) return;

      const n = traj.ys.length;
      ctx.save();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = hexToRgba(traj.color, opacity);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const x = traj.headX - (n - 1 - i) * STEP;
        const y = traj.ys[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }

    function tick() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      drawGrid();

      trajectories = trajectories.map(traj => {
        let { ys, headX, frame, phase, activeFrames, sigma, drift, lifetime } = traj;

        // Each frame: extend the path one step to the right (except during fadeout)
        const isFading = phase === 'fadeout' || phase === 'fadeout-fast';
        if (!isFading) {
          const newY = ys[ys.length - 1] + drift + sigma * boxMuller();
          ys = [...ys, newY];
          headX += STEP;
        }

        // Prune points that have scrolled off the left edge
        while (ys.length > 1 && headX - (ys.length - 1) * STEP < -50) {
          ys = ys.slice(1);
        }

        frame++;

        if (phase === 'fadein' && frame >= FADE_IN_FRAMES) {
          phase = 'active';
          frame = 0;
        }

        if (phase === 'active') {
          if (headX >= w + 60) {
            phase = 'fadeout';
            frame = 0;
          }
        }

        // Fadeout complete → respawn
        if (phase === 'fadeout' && frame >= FADE_OUT_FRAMES) {
          return initTrajectory(w, h, false);
        }

        const updated = { ...traj, ys, headX, frame, phase };
        drawTrajectory(updated);
        return updated;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="bg-white py-24 px-6" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Canvas d'animation — derrière le contenu */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Contenu Hero — au-dessus du canvas */}
      <div className="max-w-5xl mx-auto text-center" style={{ position: 'relative', zIndex: 2 }}>

        {/* Étiquette de contexte */}
        <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1 rounded-full mb-6 tracking-wide uppercase">
          Finance de marché
        </span>

        {/* Titre principal du site */}
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6 text-center">
          Finance according to James
        </h1>

        {/* Description d'accueil */}
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Bienvenue en salle des marchés ! J&apos;ai décidé de réunir tout mon savoir sur ce sujet
          passionnant dans un seul endroit. De nombreux concepts seront expliqués avec rigueur
          et pédagogie !
        </p>

        {/* Appel à l'action — renvoie vers la page des cours */}
        <div className="mt-10">
          <Link
            href="/cours"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explorer les cours
          </Link>
        </div>

      </div>
    </section>
  );
}
