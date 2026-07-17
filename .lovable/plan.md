
## Álbum Revi Live con las 9 fotos nuevas

Se suben las 9 fotos aportadas (`P1420434`, `P1420451`, `P1420496`, `P1420549`, `P1420603`, `P1420619-2`, `P1420631`, `P1420671`, `P1420677`, `P1420679-2`) al CDN vía `lovable-assets` en `src/assets/galeria/revi/` y se generan sus pointers `.asset.json`. No se copian los binarios al repo.

## Cambios en `src/routes/galeria.tsx`

1. Imports de los 9 nuevos pointers como `rv434`, `rv451`, `rv496`, `rv549`, `rv603`, `rv619`, `rv631`, `rv671`, `rv677`, `rv679`.

2. Entradas en el mapa `FOCUS` con `object-position` calibrado a la cara del sujeto (regla de encuadre por caras):
   - `rv603` (Ridru guitarra, retrato vertical → marco horizontal): `40% 32%`
   - `rv549` (trío Gaia+Manu+Héctor, panorámica): `50% 55%`
   - `rv496` (Héctor perfil bajo azul): `35% 32%`
   - `rv451` (Manu retrato cercano): `45% 40%`
   - `rv434` (Héctor bajo, luz azul): `45% 32%`
   - `rv679` (Gaia + Manu al micro): `55% 45%`
   - `rv677` (Manu cantando con guitarra): `55% 38%`
   - `rv671` (Gaia riendo + Manu detrás): `45% 55%`
   - `rv631` (Rick a la batería, mira abajo): `55% 30%`
   - `rv619` (Rick sonriendo con arcoíris): `50% 42%`

3. **Portada Revi Live**: se mantiene `bandaCompleta` (sin cambios en `concerts[0].cover`).

4. **Fotos del álbum Revi Live**: se sustituyen las 2 fotos actuales por las 9 nuevas más `bandaCompleta` y `conPublico` como cierre grupal (10 en total), con `alt` descriptivo por foto.

5. **Favoritos**:
   - Se mantiene `bandaCompleta` como foto grupal favorita (no se toca).
   - Se añade `rv549` como nueva favorita de esta tanda: el trío Gaia con el micro en alto, Manu sonriendo con guitarra y Héctor tocando — el plano con más energía, con tres caras visibles y bien iluminadas, ideal para el carrusel horizontal.

## Verificación

Playwright + captura de la tira de favoritas y de la portada/lightbox de Revi Live para confirmar que las caras quedan bien encuadradas en los tres marcos (favoritos 288×192/384×256, portada 4/5, lightbox 16/10 y 16/9).

## Fuera de alcance

- No se cambia la portada de Revi Live ni la foto grupal favorita existente.
- No se tocan Cadillac Solitario ni Mangafest Sevilla.
