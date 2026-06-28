import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    let W = canvas.offsetWidth  || window.innerWidth
    let H = canvas.offsetHeight || window.innerHeight

    // ── Renderer ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Scene & Camera ──────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 0, 6)

    // Horizontal FOV on portrait mobile is ~24° → visible x range ≈ ±1.28 at z=6.
    // Shift the icosahedron toward center so it stays within the frustum.
    const computeOffset = (aspect) => {
      if (aspect < 0.9) return new THREE.Vector3(0,   -1.0, 0) // portrait: drop behind text block
      if (aspect < 1.2) return new THREE.Vector3(0.9, -0.7, 0) // square tablet: drop + slight right
      return                   new THREE.Vector3(1.8,  0.1, 0) // landscape: sphere right, text left (unchanged)
    }
    const OFFSET = computeOffset(W / H)

    // ── Outer icosahedron ────────────────────────────────────────────────
    const icoGeo  = new THREE.IcosahedronGeometry(2, 1)
    const edgeGeo = new THREE.EdgesGeometry(icoGeo)
    const mat     = new THREE.LineBasicMaterial({ color: 0xC8963F, transparent: true, opacity: 0.11 })
    const ico     = new THREE.LineSegments(edgeGeo, mat)
    ico.position.copy(OFFSET)
    scene.add(ico)

    // ── Inner icosahedron (counter-rotates) ──────────────────────────────
    const innerGeo  = new THREE.IcosahedronGeometry(1.1, 1)
    const innerEdge = new THREE.EdgesGeometry(innerGeo)
    const innerMat  = new THREE.LineBasicMaterial({ color: 0xC8963F, transparent: true, opacity: 0.05 })
    const innerIco  = new THREE.LineSegments(innerEdge, innerMat)
    innerIco.position.copy(OFFSET)
    scene.add(innerIco)

    // ── Invisible hit sphere for drag raycasting ──────────────────────────
    const hitMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    hitMesh.position.copy(OFFSET)
    scene.add(hitMesh)

    // ── Raycaster ────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse     = new THREE.Vector2()

    const toNDC = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x =  ((clientX - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((clientY - rect.top)  / rect.height) * 2 + 1
    }

    const hitsIco = (clientX, clientY) => {
      toNDC(clientX, clientY)
      raycaster.setFromCamera(mouse, camera)
      return raycaster.intersectObject(hitMesh).length > 0
    }

    // ── Scroll-driven story: icosahedron brightens & swells, stays at peak ─
    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    })
    .to([mat, innerMat], { opacity: (i) => (i === 0 ? 0.22 : 0.10), duration: 1 }, 0)
    .to(ico.scale,       { x: 1.25, y: 1.25, z: 1.25, duration: 1 }, 0)
    .to(innerIco.scale,  { x: 1.15, y: 1.15, z: 1.15, duration: 1 }, 0)

    // ── Drag ─────────────────────────────────────────────────────────────
    let isDragging = false, lastX = 0, lastY = 0
    let velX = 0, velY = 0, autoRotate = true

    const onMouseDown = (e) => {
      if (!hitsIco(e.clientX, e.clientY)) return
      e.preventDefault()
      isDragging = true; autoRotate = false
      lastX = e.clientX; lastY = e.clientY; velX = 0; velY = 0
      document.body.style.cursor     = 'grabbing'
      document.body.style.userSelect = 'none'
    }
    const onMouseMove = (e) => {
      if (!isDragging) {
        document.body.style.cursor = hitsIco(e.clientX, e.clientY) ? 'grab' : ''
        return
      }
      e.preventDefault()
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      ico.rotation.y      += dx * 0.008
      ico.rotation.x      += dy * 0.008
      innerIco.rotation.y -= dx * 0.006
      innerIco.rotation.x -= dy * 0.006
      velX = dx; velY = dy
      lastX = e.clientX; lastY = e.clientY
    }
    const onMouseUp = () => {
      if (!isDragging) return
      isDragging = false
      document.body.style.cursor = document.body.style.userSelect = ''
    }

    // ── Touch drag ───────────────────────────────────────────────────────
    const onTouchStart = (e) => {
      const t = e.touches[0]
      if (!hitsIco(t.clientX, t.clientY)) return
      e.preventDefault()
      isDragging = true; autoRotate = false
      lastX = t.clientX; lastY = t.clientY; velX = 0; velY = 0
    }
    const onTouchMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const t = e.touches[0]
      const dx = t.clientX - lastX
      const dy = t.clientY - lastY
      ico.rotation.y      += dx * 0.008
      ico.rotation.x      += dy * 0.008
      innerIco.rotation.y -= dx * 0.006
      innerIco.rotation.x -= dy * 0.006
      velX = dx; velY = dy
      lastX = t.clientX; lastY = t.clientY
    }
    const onTouchEnd = () => { isDragging = false }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })
    window.addEventListener('touchend',   onTouchEnd)

    // ── Animation loop ────────────────────────────────────────────────────
    let animId
    const tick = () => {
      if (!isDragging) {
        velX *= 0.90; velY *= 0.90
        ico.rotation.y      += velX * 0.006
        ico.rotation.x      += velY * 0.006
        innerIco.rotation.y -= velX * 0.005
        if (Math.abs(velX) < 0.01 && Math.abs(velY) < 0.01) autoRotate = true
        if (autoRotate) {
          ico.rotation.y      += 0.0025
          ico.rotation.x      += 0.001
          innerIco.rotation.y -= 0.004
          innerIco.rotation.z += 0.0015
        }
      }
      renderer.render(scene, camera)
      animId = requestAnimationFrame(tick)
    }
    tick()

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      W = canvas.offsetWidth  || window.innerWidth
      H = canvas.offsetHeight || window.innerHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
      const newOffset = computeOffset(W / H)
      ico.position.copy(newOffset)
      innerIco.position.copy(newOffset)
      hitMesh.position.copy(newOffset)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
      window.removeEventListener('resize',    onResize)
      document.body.style.cursor = document.body.style.userSelect = ''
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
      renderer.dispose()
      icoGeo.dispose(); edgeGeo.dispose(); mat.dispose()
      innerGeo.dispose(); innerEdge.dispose(); innerMat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
