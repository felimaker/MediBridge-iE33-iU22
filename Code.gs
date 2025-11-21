/**
 * MediBridge Contact Form Handler
 * Google Apps Script para procesar formularios de contacto y enviar emails
 * Email destino: medibridgeusa@gmail.com
 */

function doPost(e) {
  try {
    // Parsear los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Validar que los datos existan
    if (!data.name || !data.issue) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Por favor completa todos los campos requeridos'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Email destino
    const toEmail = 'medibridgeusa@gmail.com';
    
    // Asunto del email
    const subject = `Nueva Solicitud de Soporte - ${data.model || 'Sistema Philips'}`;
    
    // Crear el cuerpo del email en HTML
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            background: #f8fafc;
            padding: 30px;
            border: 1px solid #e2e8f0;
          }
          .field {
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .field-label {
            font-weight: bold;
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }
          .field-value {
            color: #1e293b;
            font-size: 16px;
            margin-top: 5px;
          }
          .issue-box {
            background: #fff;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
          }
          .footer {
            background: #1e293b;
            color: #94a3b8;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            border-radius: 0 0 10px 10px;
          }
          .badge {
            display: inline-block;
            background: #3b82f6;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 10px;
          }
          .timestamp {
            color: #64748b;
            font-size: 14px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Nueva Solicitud de Soporte Técnico</h1>
          <div class="badge">MEDIBRIDGE SYSTEM</div>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Nombre del Cliente</div>
            <div class="field-value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Clínica / Hospital</div>
            <div class="field-value">${data.clinic || 'No especificado'}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Modelo del Sistema</div>
            <div class="field-value">${data.model || 'No especificado'}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Serie / Año</div>
            <div class="field-value">${data.series || 'Desconocido'}</div>
          </div>
          
          <div class="issue-box">
            <div class="field-label">Descripción del Problema</div>
            <div class="field-value" style="margin-top: 15px; white-space: pre-wrap;">${data.issue}</div>
          </div>
          
          <div class="timestamp">
            <strong>Fecha de Solicitud:</strong> ${new Date().toLocaleString('es-ES', { 
              dateStyle: 'full', 
              timeStyle: 'short',
              timeZone: 'America/New_York'
            })}
          </div>
        </div>
        
        <div class="footer">
          <p><strong>MediBridge Solutions</strong></p>
          <p>Sistema automático de notificaciones de contacto</p>
          <p>Este email fue generado automáticamente desde el formulario web</p>
        </div>
      </body>
      </html>
    `;
    
    // Crear versión de texto plano como fallback
    const plainBody = `
NUEVA SOLICITUD DE SOPORTE TÉCNICO - MEDIBRIDGE
================================================

Nombre del Cliente: ${data.name}
Clínica/Hospital: ${data.clinic || 'No especificado'}
Modelo del Sistema: ${data.model || 'No especificado'}
Serie/Año: ${data.series || 'Desconocido'}

DESCRIPCIÓN DEL PROBLEMA:
${data.issue}

------------------------------------------------
Fecha de Solicitud: ${new Date().toLocaleString('es-ES')}
------------------------------------------------

Este email fue generado automáticamente desde el formulario web de MediBridge.
    `;
    
    // Enviar el email
    GmailApp.sendEmail(toEmail, subject, plainBody, {
      htmlBody: htmlBody,
      name: 'MediBridge Contact System'
    });
    
    // Opcional: Guardar en una hoja de cálculo para registro
    saveToSpreadsheet(data);
    
    // Retornar respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Solicitud enviada exitosamente. Nos pondremos en contacto pronto.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Manejo de errores
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Hubo un error al enviar la solicitud. Por favor intenta nuevamente.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función para guardar datos en Google Sheets
 * Guarda automáticamente cada solicitud en la hoja de cálculo
 */
function saveToSpreadsheet(data) {
  try {
    // ID de tu hoja de cálculo de Google Sheets
    const SPREADSHEET_ID = '1kVhCypSQyg9A9Y_Sk0uaLeBpN_pL18L__JNgoJhpU4A';
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Contactos') || ss.insertSheet('Contactos');
    
    // Si la hoja está vacía, agregar encabezados con formato
    if (sheet.getLastRow() === 0) {
      const headers = ['Fecha', 'Hora', 'Nombre', 'Clínica', 'Modelo', 'Serie', 'Problema', 'Estado'];
      sheet.appendRow(headers);
      
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1e40af');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      
      // Ajustar ancho de columnas
      sheet.setColumnWidth(1, 120); // Fecha
      sheet.setColumnWidth(2, 100); // Hora
      sheet.setColumnWidth(3, 180); // Nombre
      sheet.setColumnWidth(4, 200); // Clínica
      sheet.setColumnWidth(5, 150); // Modelo
      sheet.setColumnWidth(6, 150); // Serie
      sheet.setColumnWidth(7, 400); // Problema
      sheet.setColumnWidth(8, 120); // Estado
      
      // Congelar fila de encabezados
      sheet.setFrozenRows(1);
    }
    
    // Obtener fecha y hora actual
    const now = new Date();
    const fecha = Utilities.formatDate(now, 'America/New_York', 'dd/MM/yyyy');
    const hora = Utilities.formatDate(now, 'America/New_York', 'HH:mm:ss');
    
    // Agregar la nueva fila
    const newRow = [
      fecha,
      hora,
      data.name,
      data.clinic || 'No especificado',
      data.model || 'No especificado',
      data.series || 'Desconocido',
      data.issue,
      'Nuevo'
    ];
    
    sheet.appendRow(newRow);
    
    // Formatear la nueva fila
    const lastRow = sheet.getLastRow();
    const rowRange = sheet.getRange(lastRow, 1, 1, newRow.length);
    
    // Alternar color de fondo para mejor lectura
    if (lastRow % 2 === 0) {
      rowRange.setBackground('#f8fafc');
    }
    
    // Formatear columna de estado
    const statusCell = sheet.getRange(lastRow, 8);
    statusCell.setBackground('#dbeafe');
    statusCell.setFontColor('#1e40af');
    statusCell.setFontWeight('bold');
    statusCell.setHorizontalAlignment('center');
    
    Logger.log('Datos guardados exitosamente en Spreadsheet');
    
  } catch (error) {
    Logger.log('Error guardando en Spreadsheet: ' + error.toString());
    // No lanzar error para que el email se envíe aunque falle el guardado
  }
}

/**
 * Función de prueba para verificar que el script funciona
 * Ejecuta esta función manualmente en el editor de Apps Script
 */
function testEmail() {
  const testData = {
    name: 'Dr. Test',
    clinic: 'Test Hospital',
    model: 'Philips iE33',
    series: 'F-Series (2011-12)',
    issue: 'Este es un mensaje de prueba del sistema de contacto.'
  };
  
  const testEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(testEvent);
  Logger.log(result.getContent());
}

/**
 * Manejar peticiones GET (opcional)
 * Útil para verificar que el endpoint está activo
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'active',
    service: 'MediBridge Contact Form API',
    version: '1.0',
    message: 'Use POST method to submit contact form data'
  })).setMimeType(ContentService.MimeType.JSON);
}
