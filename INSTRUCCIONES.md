# 📧 MediBridge - Instrucciones de Configuración del Formulario de Contacto

## 🚀 Configuración de Google Apps Script (Paso a Paso)

### **PASO 1: Crear el Google Apps Script**

1. Ve a [Google Apps Script](https://script.google.com/)
2. Haz clic en **"Nuevo proyecto"**
3. Elimina todo el código que aparece por defecto
4. Copia **TODO** el contenido del archivo `Code.gs` que está en este repositorio
5. Pega el código en el editor de Google Apps Script
6. Cambia el nombre del proyecto (arriba a la izquierda) a: `MediBridge Contact Form`

---

### **PASO 2: Configurar el Email de Destino**

El email de destino ya está configurado en el código:
```javascript
const toEmail = 'medibridgeusa@gmail.com';
```

✅ **No necesitas cambiar nada aquí**, los emails se enviarán automáticamente a `medibridgeusa@gmail.com`

---

### **PASO 3: Implementar como Web App**

1. En Google Apps Script, haz clic en el botón **"Implementar"** (Deploy) → **"Nueva implementación"**
2. Haz clic en el ícono de ⚙️ junto a "Seleccionar tipo"
3. Selecciona **"Aplicación web"**
4. Configura los siguientes parámetros:
   - **Descripción**: `MediBridge Contact Form API v1`
   - **Ejecutar como**: `Yo (tu email)`
   - **Quién tiene acceso**: `Cualquier usuario` ⚠️ **MUY IMPORTANTE**
5. Haz clic en **"Implementar"**
6. Autoriza los permisos cuando te lo pida:
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado" → "Ir a MediBridge Contact Form (no seguro)"
   - Haz clic en "Permitir"

---

### **PASO 4: Copiar la URL del Web App**

Después de implementar, verás una pantalla con:
- **URL de la aplicación web**: `https://script.google.com/macros/s/XXXXXX/exec`

📋 **COPIA ESTA URL** - la necesitarás en el siguiente paso

---

### **PASO 5: Configurar el HTML**

1. Abre el archivo `index.html`
2. Busca esta línea (está cerca del final del archivo, en la sección JavaScript):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';
   ```
3. Reemplázala con tu URL copiada:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXX/exec';
   ```

---

### **PASO 6: Probar el Formulario**

1. Guarda el archivo `index.html`
2. Ábrelo en tu navegador
3. Ve a la sección de "Contact" (Contacto)
4. Llena el formulario con datos de prueba
5. Haz clic en "Submit Support Request"
6. Deberías ver una notificación verde de éxito
7. **Revisa tu email** `medibridgeusa@gmail.com` - deberías recibir el mensaje

---

## 🎯 Características del Sistema

### ✅ Lo que hace el sistema:

- ✉️ **Envía emails automáticos** a `medibridgeusa@gmail.com`
- 🎨 **Emails con diseño profesional** en HTML
- 📱 **Notificaciones visuales** en la página cuando se envía el formulario
- 🔒 **Seguro y confiable** usando Google Apps Script
- 📊 **Opción de guardar en Google Sheets** (ver código comentado)

### 📧 Formato del Email que recibirás:

```
Asunto: 🔧 Nueva Solicitud de Soporte - Philips iE33

Contenido:
- Nombre del Cliente
- Clínica/Hospital
- Modelo del Sistema
- Serie/Año
- Descripción completa del problema
- Fecha y hora de la solicitud
```

---

## 🧪 Función de Prueba

Puedes probar el envío de emails **SIN usar el formulario web**:

1. En Google Apps Script, selecciona la función `testEmail` en el menú desplegable
2. Haz clic en ▶️ "Ejecutar"
3. Revisa tu email - deberías recibir un email de prueba

---

## 📊 (Opcional) Guardar en Google Sheets

Si quieres guardar TODAS las solicitudes en una hoja de cálculo:

1. Crea una nueva Google Sheet
2. Copia el ID de la hoja (está en la URL):
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
   ```
3. En el archivo `Code.gs`, busca esta línea:
   ```javascript
   // const SPREADSHEET_ID = 'TU_SPREADSHEET_ID_AQUI';
   ```
4. Reemplázala con:
   ```javascript
   const SPREADSHEET_ID = 'TU_ID_COPIADO';
   ```
5. Descomenta el código de la función `saveToSpreadsheet`

---

## 🔄 Actualizar el Script

Si haces cambios en el código de Google Apps Script:

1. Guarda los cambios (Ctrl+S o Cmd+S)
2. Ve a **"Implementar"** → **"Administrar implementaciones"**
3. Haz clic en el ícono de lápiz ✏️
4. Cambia la versión a **"Nueva versión"**
5. Haz clic en **"Implementar"**

⚠️ **La URL NO cambia**, no necesitas actualizar el HTML

---

## 🆘 Solución de Problemas

### ❌ "No recibo los emails"
- Verifica que la URL en `index.html` sea correcta
- Revisa la carpeta de SPAM en `medibridgeusa@gmail.com`
- Ejecuta la función `testEmail` en Google Apps Script para verificar

### ❌ "Error al enviar el formulario"
- Asegúrate de haber configurado "Quién tiene acceso: Cualquier usuario"
- Verifica que hayas autorizado todos los permisos
- Abre la consola del navegador (F12) para ver errores

### ❌ "La notificación no aparece"
- Esto es normal con `mode: 'no-cors'`
- Si el email llega, el sistema está funcionando correctamente

---

## 📞 Información de Contacto

- **Email de destino**: medibridgeusa@gmail.com
- **Proyecto**: MediBridge iE33/iU22 Ultrasound Support

---

## ✅ Checklist Final

- [ ] Crear proyecto en Google Apps Script
- [ ] Copiar código de `Code.gs`
- [ ] Implementar como Web App (acceso: Cualquier usuario)
- [ ] Autorizar permisos
- [ ] Copiar URL de implementación
- [ ] Pegar URL en `index.html`
- [ ] Probar con datos de prueba
- [ ] Verificar email recibido en medibridgeusa@gmail.com

---

**¡Listo! Tu formulario de contacto está completamente funcional y enviará emails automáticamente.** 🎉
