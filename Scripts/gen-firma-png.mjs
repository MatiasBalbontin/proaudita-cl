import { chromium } from 'file:///C:/Users/matia/AppData/Roaming/npm/node_modules/playwright/index.mjs'
import { writeFileSync, unlinkSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const FIRMA_DIR = 'file:///D:/proaudita.cl/public/firma'

const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>body{margin:0;padding:0;background:white;}</style>
</head><body>
<table cellpadding="0" cellspacing="0" border="0" style="width:540px;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td height="30" style="padding:0 0 12px;vertical-align:bottom;height:30px;overflow:hidden;line-height:0;font-size:0;">
      <img src="${FIRMA_DIR}/proaudita-gradient.png" width="126" height="30" alt="Proaudita" style="display:block;border:0;width:126px;height:30px;">
    </td>
  </tr>
  <tr>
    <td height="4" style="padding:0;line-height:0;font-size:0;height:4px;overflow:hidden;">
      <img src="${FIRMA_DIR}/rule-h.png" width="540" height="4" alt="" style="display:block;border:0;width:540px;height:4px;">
    </td>
  </tr>
</table>
</body></html>`

const __dir = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dir, '..', 'assets', 'email-signature', 'firma-zoho-header.png')
const tmpHtml = path.join(__dir, '..', 'assets', 'email-signature', '_firma-tmp.html')

writeFileSync(tmpHtml, html, 'utf-8')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 600, height: 400 })
await page.goto('file:///' + tmpHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle' })

const el = await page.$('table')
await el.screenshot({ path: outPath, omitBackground: false })

await browser.close()
try { unlinkSync(tmpHtml) } catch {}
console.log('OK:', outPath)
