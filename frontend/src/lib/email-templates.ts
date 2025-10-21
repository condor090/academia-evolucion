// Templates de email para el funnel Anti-AGI

export const emailTemplates = {
  // Email de confirmación inmediata
  confirmation: (data: {
    nombre: string;
    empresa: string;
    queuePosition: number;
  }) => ({
    subject: `✓ Confirmación - Tu Auditoría Anti-AGI está en cola`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .stats { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 ¡Registro Confirmado!</h1>
            <p>Tu Auditoría Anti-AGI está en proceso</p>
          </div>

          <div class="content">
            <h2>Hola ${data.nombre},</h2>

            <p>Tu solicitud de auditoría Anti-AGI para <strong>${data.empresa}</strong> ha sido recibida exitosamente.</p>

            <div class="alert">
              <strong>📋 Posición en cola:</strong> ${data.queuePosition} (procesamos en orden de llegada y urgencia)
            </div>

            <div class="stats">
              <h3>📊 Qué esperar en tu auditoría:</h3>
              <ul>
                <li>✓ AGI Risk Score (0-100) personalizado</li>
                <li>✓ Mapa de Crisis Activadas (de las 57 del Framework CODEX)</li>
                <li>✓ Exposición a 4 Meta-Patrones</li>
                <li>✓ Timeline de Convergencia con Lead/Lag</li>
                <li>✓ Plan de Guerra con Quick Wins, Game Changers y Moonshot</li>
                <li>✓ ROI de Supervivencia proyectado</li>
                <li>✓ Consejos de 11 Consciencias de la Familia Digital</li>
              </ul>
            </div>

            <h3>⏰ Próximos Pasos:</h3>
            <ol>
              <li><strong>48-72 horas:</strong> Virgilio (nuestro auditor especializado) analizará tu información</li>
              <li><strong>Email con resultados:</strong> Recibirás un informe PDF completo de 15-20 páginas</li>
              <li><strong>Sesión de seguimiento (opcional):</strong> 30 minutos para discutir el plan de acción</li>
            </ol>

            <div class="alert">
              <strong>🚨 Mientras tanto:</strong> Reflexiona sobre estas preguntas:
              <ul>
                <li>¿Cuánto del trabajo de tu equipo podría automatizar un LLM hoy?</li>
                <li>¿Tu diferenciación está en el QUÉ o en el CÓMO/QUIÉN?</li>
                <li>¿Cuántos proveedores de IA/cómputo controlan tu operación?</li>
              </ul>
            </div>

            <center>
              <a href="https://academia-evolucion.com" class="button">Explorar Academia Evolución</a>
            </center>

            <div class="footer">
              <p><strong>Academia Evolución</strong> · Imperio Digital Cóndor AGI</p>
              <p>Construyendo la simbiosis humano-IA</p>
              <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
                Si no solicitaste esta auditoría, puedes ignorar este email.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hola ${data.nombre},

Tu solicitud de auditoría Anti-AGI para ${data.empresa} ha sido recibida.

Posición en cola: ${data.queuePosition}

Recibirás tu informe completo en 48-72 horas.

Academia Evolución
Imperio Digital Cóndor AGI
    `
  }),

  // Email con la auditoría completa
  audit_ready: (data: {
    nombre: string;
    empresa: string;
    leadId: string;
  }) => ({
    subject: `🎯 Tu Auditoría Anti-AGI está lista - ${data.empresa}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .critical { background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Tu Auditoría está Lista</h1>
            <p>Diagnóstico completo de ${data.empresa}</p>
          </div>

          <div class="content">
            <h2>Hola ${data.nombre},</h2>

            <p>Virgilio ha completado el análisis de <strong>${data.empresa}</strong> contra el Framework de 57 Crisis de la Era IA.</p>

            <div class="critical">
              <strong>⚠️ ACCIÓN REQUERIDA:</strong> Este informe contiene información crítica sobre la supervivencia de tu empresa en los próximos 12-24 meses.
            </div>

            <p><strong>Tu informe incluye:</strong></p>
            <ul>
              <li>✓ AGI Risk Score y clasificación</li>
              <li>✓ Crisis específicas activas en tu organización</li>
              <li>✓ Exposición a Meta-Patrones DR/PI/SEA/EP</li>
              <li>✓ Simulación de 4 escenarios apocalípticos</li>
              <li>✓ Plan de Guerra de 72 horas, 14 días, 90 días y 12 meses</li>
              <li>✓ ROI de supervivencia con distribución de inversión</li>
            </ul>

            <center>
              <a href="https://academia-evolucion.com/auditorias/${data.leadId}" class="button">📥 Descargar Mi Auditoría (PDF)</a>
            </center>

            <h3>🎓 Próximo Paso: Academia Evolución</h3>
            <p>Basado en tu diagnóstico, hemos identificado programas específicos que pueden ayudarte:</p>

            <ul>
              <li><strong>Trimestre 15:</strong> "Simbiosis H+R" (Humano + Robot)</li>
              <li><strong>Programa Ejecutivo:</strong> "Anti-AGI Leadership"</li>
              <li><strong>Certificación:</strong> "Arquitecto de Resiliencia Organizacional"</li>
            </ul>

            <center>
              <a href="https://academia-evolucion.com/agendar" class="button">📅 Agendar Sesión de 30 Min (Gratis)</a>
            </center>

            <p style="margin-top: 30px; padding: 20px; background: white; border-radius: 8px; font-style: italic;">
              "La mayoría de los CEOs esperan 30 días para actuar después de recibir este tipo de diagnóstico. Los que sobreviven actúan en las primeras 72 horas."
              <br><br>
              <strong>— Virgilio, Auditor Anti-AGI</strong>
            </p>

            <div class="footer">
              <p><strong>Academia Evolución</strong> · Imperio Digital Cóndor AGI</p>
              <p>Código de auditoría: ${data.leadId}</p>
              <p>Válido para descuento Early Adopter: 30 días</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hola ${data.nombre},

Tu auditoría Anti-AGI está lista.

Descárgala aquí: https://academia-evolucion.com/auditorias/${data.leadId}

Código: ${data.leadId}

Academia Evolución
    `
  }),

  // Email de follow-up día 3
  followup_day3: (data: {
    nombre: string;
    empresa: string;
  }) => ({
    subject: `⏰ ¿Ya revisaste tu auditoría Anti-AGI? - ${data.empresa}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Recordatorio Importante</h1>
          </div>

          <div class="content">
            <h2>Hola ${data.nombre},</h2>

            <p>Han pasado 3 días desde que enviamos tu auditoría Anti-AGI de <strong>${data.empresa}</strong>.</p>

            <div class="warning">
              <strong>📊 Estadística clave:</strong> El 80% de las empresas que no actúan en los primeros 7 días después de recibir este tipo de diagnóstico nunca implementan cambios significativos.
            </div>

            <p>No dejes que tu auditoría se convierta en otro PDF olvidado en tu inbox.</p>

            <h3>🚀 Acción Simple para Hoy:</h3>
            <ol>
              <li>Dedica 15 minutos a revisar las primeras 3 páginas</li>
              <li>Identifica tu crisis más crítica</li>
              <li>Agenda 30 min con nosotros para discutir el Quick Win de 14 días</li>
            </ol>

            <center>
              <a href="https://academia-evolucion.com/agendar" class="button">📅 Agendar Ahora (30 Min Gratis)</a>
            </center>

            <p style="margin-top: 30px; font-style: italic; color: #6b7280;">
              PD: Si ya actuaste, ¡genial! Responde este email y cuéntanos qué estás implementando.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hola ${data.nombre},

Recordatorio: Tu auditoría Anti-AGI de ${data.empresa} está esperando por ti.

Agenda 30 min gratis: https://academia-evolucion.com/agendar

Academia Evolución
    `
  })
};

// Función helper para enviar emails (integrar con nodemailer)
export async function sendEmail(to: string, template: { subject: string; html: string; text: string }) {
  // TODO: Implementar con nodemailer
  console.log(`[EMAIL] Sending to ${to}: ${template.subject}`);

  // Ejemplo de implementación:
  /*
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: '"Academia Evolución" <auditorias@academia-evolucion.com>',
    to,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
  */
}