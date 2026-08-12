# Simplificar la animación del título de Inicio

## Objetivo
Hacer que “BIENVENIDO A NUNCA JAMÁS” aparezca siempre nítido y completo, sin posibilidad de quedarse bloqueado en un estado borroso.

## Cambios
- Sustituir la animación actual del título por una única aparición por opacidad, con un pequeño retraso tras el logo.
- Eliminar del título cualquier `blur`, desplazamiento, escala y estado complejo de Motion.
- Mantener las dos líneas, tamaños, tipografía y color crema actuales sin cambiar el diseño.
- Respetar `prefers-reduced-motion`, mostrando el título directamente cuando las animaciones estén reducidas.
- Corregir el marcado no determinista de `SplitText` que actualmente provoca una diferencia de hidratación entre servidor y navegador en los títulos internos, sin alterar su aspecto.

## Verificación
- Abrir Inicio desde una carga limpia y comprobar que el título pasa únicamente de invisible a visible y termina totalmente nítido.
- Comprobar también la recarga, la navegación entre páginas y las vistas móvil y escritorio.
- Confirmar que no quedan errores de hidratación en la consola.
