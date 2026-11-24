import * as THREE from "three";
import { approach, clampUnit, signaturePose } from "../../lib/signature-motion";

interface Callbacks { ready: () => void; fail: () => void; }

/** The original signature is a procedural sculpture, not a product model.
 * This module is loaded only after an explicit request on eligible desktop.
 * Every allocated geometry/material and event subscription is owned here. */
export function mountSignature3D(host: HTMLDivElement, callbacks: Callbacks): () => void {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  const context = canvas.getContext("webgl2", { alpha: false, antialias: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: true });
  if (!context) { callbacks.fail(); return () => undefined; }

  const geometry = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e0dbcf");
  const camera = new THREE.OrthographicCamera(-3.4, 3.4, 2.9, -2.9, 0.1, 40);
  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const hero = host.closest<HTMLElement>('[data-motion-section="hero"]');
  const viewport = host.parentElement ?? host;
  let renderer: THREE.WebGLRenderer | undefined;
  let frame = 0;
  let disposed = false;
  let visible = false;
  let firstFrame = true;
  let lastTime = 0;
  let top = 0;
  let span = 1;
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let progress = 0;
  let pointerBounds: DOMRect | null = null;
  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;

  const ownGeometry = <T extends THREE.BufferGeometry>(value: T): T => { geometry.add(value); return value; };
  const ownMaterial = <T extends THREE.Material>(value: T): T => { materials.add(value); return value; };
  const box = ownGeometry(new THREE.BoxGeometry(1, 1, 1));
  function surface(color: string, metalness = 0.12, roughness = 0.55) {
    return ownMaterial(new THREE.MeshStandardMaterial({ color, metalness, roughness }));
  }
  function block(parent: THREE.Group, material: THREE.Material, width: number, height: number, depth: number, px = 0, py = 0, pz = 0) {
    const item = new THREE.Mesh(box, material);
    item.scale.set(width, height, depth);
    item.position.set(px, py, pz);
    parent.add(item);
    return item;
  }
  function line(parent: THREE.Group, color: string, points: readonly [number, number][], opacity = 0.8) {
    const g = ownGeometry(new THREE.BufferGeometry().setFromPoints(points.map(([a, b]) => new THREE.Vector3(a, 0.119, b))));
    const m = ownMaterial(new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
    parent.add(new THREE.Line(g, m));
  }
  function outline(parent: THREE.Group, radius: number, color: string) {
    line(parent, color, [[-radius,-radius],[radius,-radius],[radius,radius],[-radius,radius],[-radius,-radius]], 0.72);
  }
  function plate(color: string, edge: string) {
    const group = new THREE.Group();
    sculpture.add(group);
    const shape = new THREE.Shape();
    shape.moveTo(-1.72,-1.72); shape.lineTo(1.72,-1.72); shape.lineTo(1.72,1.72); shape.lineTo(-1.72,1.72); shape.closePath();
    const body = ownGeometry(new THREE.ExtrudeGeometry(shape, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.045, bevelSize: 0.045, bevelSegments: 2, steps: 1, curveSegments: 1 }));
    body.rotateX(-Math.PI / 2);
    body.translate(0,-0.08,0);
    group.add(new THREE.Mesh(body, [surface(color,0.22,0.43), surface(edge,0.28,0.48)]));
    outline(group,1.53,"#e4e4d7");
    const bolt = ownGeometry(new THREE.CylinderGeometry(.045,.045,.025,12));
    const boltMaterial = surface("#aeb9b7",0.35,0.4);
    for (const bx of [-1.58,1.58]) for (const bz of [-1.58,1.58]) {
      const pin = new THREE.Mesh(bolt,boltMaterial); pin.position.set(bx,.133,bz); group.add(pin);
    }
    return group;
  }
  const data = plate("#365764", "#1e3542");
  const logic = plate("#b65c40", "#783c2d");
  const ui = plate("#b9c7c9", "#6e8287");
  const dark = surface("#263d48");
  const paper = surface("#f1eee4",0.02,0.65);
  const steel = surface("#91a6a9");
  const rust = surface("#c26b49");
  for (const r of [1.20,.88,.55]) outline(data,r,"#a7c0c1");
  block(data,dark,.8,.05,.8,0,.155,0);
  for (const sign of [-1,1]) {
    line(logic,"#ffdbb5",[[-1.35,sign*.75],[-.85,sign*.75],[-.55,sign*.42],[.55,sign*.42],[.85,sign*.75],[1.35,sign*.75]]);
  }
  block(logic,dark,.95,.08,.95,0,.16,0);
  block(logic,rust,.65,.035,.65,0,.215,0);
  block(ui,dark,2.56,.045,2.56,0,.15,0);
  block(ui,paper,2.35,.04,2.35,0,.19,0);
  block(ui,dark,2.12,.025,.32,0,.222,-.84);
  block(ui,steel,1.20,.025,1.35,-.46,.222,.19);
  block(ui,rust,.72,.025,.61,.60,.222,-.18);
  block(ui,steel,.72,.025,.53,.60,.222,.47);
  for (let i=0;i<4;i++) block(ui,dark,.85-i*.12,.014,.04,-.48-i*.055,.241,-.25+i*.19);
  scene.add(new THREE.HemisphereLight("#fff8e9","#728188",2.1));
  const key = new THREE.DirectionalLight("#fff4dc",3.0); key.position.set(-4,7,5); scene.add(key);
  const rim = new THREE.DirectionalLight("#d1eaff",1.8); rim.position.set(5,3,-4); scene.add(rim);
  // A small procedural contact shadow, without a shadow-map render pass.
  const shadow = new THREE.Mesh(ownGeometry(new THREE.PlaneGeometry(6,6)),ownMaterial(new THREE.ShaderMaterial({ transparent:true, depthWrite:false, vertexShader:"varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}", fragmentShader:"varying vec2 vUv; void main(){float a=1.-smoothstep(.06,.49,length(vUv-.5));gl_FragColor=vec4(.14,.16,.16,.18*a);}" })));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -2.03; scene.add(shadow);

  function cancelFrame() { if (frame) window.cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
  function requestFrame() {
    if (!disposed && visible && !document.hidden && !frame) frame = window.requestAnimationFrame(tick);
  }
  function measure() {
    if (!renderer || disposed) return;
    const bounds = viewport.getBoundingClientRect();
    if (bounds.width < 1 || bounds.height < 1) return;
    const heroBounds = hero?.getBoundingClientRect();
    top = heroBounds ? heroBounds.top + window.scrollY : 0;
    span = Math.max(1,(heroBounds?.height ?? bounds.height) - window.innerHeight * .32);
    const ratio = bounds.width / bounds.height;
    const halfHeight = Math.max(2.95,3.25/ratio);
    camera.left = -halfHeight * ratio; camera.right = halfHeight * ratio;
    camera.top = halfHeight; camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.5));
    renderer.setSize(bounds.width,bounds.height,false);
    pointerBounds = null; requestFrame();
  }
  function tick(now: number) {
    frame = 0;
    if (disposed || !renderer || !visible || document.hidden) { lastTime = 0; return; }
    const desired = clampUnit((window.scrollY - top) / span);
    const dt = lastTime ? Math.min(.05,(now-lastTime)/1000) : 0;
    lastTime = now;
    progress = firstFrame ? desired : approach(progress,desired,dt);
    x = approach(x,targetX,dt); y = approach(y,targetY,dt);
    const pose = signaturePose(progress,x,y);
    ui.position.y = pose.separation;
    data.position.y = -pose.separation;
    logic.position.x = pose.middleOffset;
    sculpture.rotation.set(pose.rotationX,pose.rotationY,0);
    const orbit = 0.71 + progress * 0.16;
    camera.position.set(Math.sin(orbit) * 8.3, 4.7 - progress * 0.75, Math.cos(orbit) * 8.3);
    camera.lookAt(0,0,0); camera.zoom = pose.cameraScale; camera.updateProjectionMatrix();
    try {
      renderer.render(scene,camera);
      if (firstFrame) { firstFrame = false; callbacks.ready(); }
    } catch { callbacks.fail(); return; }
    if (Math.abs(progress-desired)+Math.abs(x-targetX)+Math.abs(y-targetY) > .002) requestFrame();
    else lastTime = 0;
  }
  function pointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    pointerBounds ??= viewport.getBoundingClientRect();
    if (!pointerBounds.width || !pointerBounds.height) return;
    targetX = clampUnit((event.clientX-pointerBounds.left)/pointerBounds.width)*2-1;
    targetY = clampUnit((event.clientY-pointerBounds.top)/pointerBounds.height)*2-1;
    requestFrame();
  }
  function pointerLeave() { targetX = 0; targetY = 0; pointerBounds = null; requestFrame(); }
  function visibilityChange() { if (document.hidden) cancelFrame(); else requestFrame(); }
  function contextLost(event: Event) { event.preventDefault(); cancelFrame(); callbacks.fail(); }
  function cleanup() {
    if (disposed) return; disposed = true; cancelFrame();
    resizeObserver?.disconnect(); intersectionObserver?.disconnect();
    window.removeEventListener("scroll",onScroll); window.removeEventListener("resize",measure);
    document.removeEventListener("visibilitychange",visibilityChange);
    viewport.removeEventListener("pointermove",pointerMove); viewport.removeEventListener("pointerleave",pointerLeave);
    canvas.removeEventListener("webglcontextlost",contextLost);
    geometry.forEach((item)=>item.dispose()); materials.forEach((item)=>item.dispose());
    renderer?.dispose(); renderer?.forceContextLoss(); canvas.remove();
  }
  function onScroll() { pointerBounds = null; requestFrame(); }
  try {
    renderer = new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:false});
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    host.appendChild(canvas);
    canvas.addEventListener("webglcontextlost",contextLost);
    viewport.addEventListener("pointermove",pointerMove,{passive:true}); viewport.addEventListener("pointerleave",pointerLeave);
    window.addEventListener("scroll",onScroll,{passive:true}); window.addEventListener("resize",measure,{passive:true});
    document.addEventListener("visibilitychange",visibilityChange);
    resizeObserver = new ResizeObserver(measure); resizeObserver.observe(viewport); if(hero) resizeObserver.observe(hero);
    intersectionObserver = new IntersectionObserver(([entry])=>{
      visible = Boolean(entry?.isIntersecting); if(visible) requestFrame(); else cancelFrame();
    },{threshold:0.01});
    intersectionObserver.observe(viewport);
    measure();
  } catch { cleanup(); callbacks.fail(); }
  return cleanup;
}
