import React, { useEffect, useRef, useState } from 'react';
import './FallingText.css';

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Build the text spans
  useEffect(() => {
    if (!textRef.current) return;
    const words = String(text).split(' ');
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // Trigger logic
  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Physics effect (dynamic import for Matter.js)
  useEffect(() => {
    if (!effectStarted) return;
    let MatterMod = null;
    let engine, render, runner;

    let cancelled = false;

    (async () => {
      try {
        const mod = await import(/* @vite-ignore */ 'matter-js');
        if (cancelled) return;
        MatterMod = mod.default ?? mod;
        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = MatterMod;

        const containerRect = containerRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = Math.max(containerRect.height, 120);
        if (width <= 0 || height <= 0) return;

        engine = Engine.create();
        engine.world.gravity.y = gravity;

        render = Render.create({
          element: canvasContainerRef.current,
          engine,
          options: { width, height, background: backgroundColor, wireframes }
        });

        const boundaryOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
        const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

        const wordSpans = textRef.current.querySelectorAll('.word');
        const wordBodies = [...wordSpans].map((elem) => {
          const rect = elem.getBoundingClientRect();
          const x = rect.left - containerRect.left + rect.width / 2;
          const y = rect.top - containerRect.top + rect.height / 2;
          const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            render: { fillStyle: 'transparent' },
            restitution: 0.8,
            frictionAir: 0.01,
            friction: 0.2,
          });
          Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
          return { elem, body };
        });

        wordBodies.forEach(({ elem, body }) => {
          elem.style.position = 'absolute';
          elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
          elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
          elem.style.transform = 'none';
        });

        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
        });
        render.mouse = mouse;

        World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map((wb) => wb.body)]);

        runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        const updateLoop = () => {
          if (!engine) return;
          wordBodies.forEach(({ body, elem }) => {
            const { x, y } = body.position;
            elem.style.left = `${x}px`;
            elem.style.top = `${y}px`;
            elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
          });
          Engine.update(engine);
          requestAnimationFrame(updateLoop);
        };
        updateLoop();
      } catch (e) {
        // If Matter isn't available, fail gracefully: leave static text.
        // console.warn('Matter.js failed to load or run:', e);
      }
    })();

    return () => {
      cancelled = true;
      try {
        if (render) {
          render.stop && render.stop();
          if (render.canvas && canvasContainerRef.current) {
            canvasContainerRef.current.removeChild(render.canvas);
          }
        }
        if (runner && MatterMod?.Runner) {
          MatterMod.Runner.stop(runner);
        }
        if (MatterMod?.World && MatterMod?.Engine && engine) {
          MatterMod.World.clear(engine.world);
          MatterMod.Engine.clear(engine);
        }
      } catch {}
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
