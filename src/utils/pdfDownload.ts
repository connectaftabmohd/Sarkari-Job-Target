import { Article, StudyMaterialItem } from '../types/blog';

function triggerBlobDownload(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadArticleStudyNotes(article: Article): void {
  const sectionsHtml = article.sections
    .map(
      (sec) => `
      <section style="margin-bottom:24px;">
        <h2 style="color:#174EA6;font-size:18px;margin-bottom:8px;">${sec.heading}</h2>
        ${sec.paragraphs.map((p) => `<p style="line-height:1.8;margin:8px 0;">${p}</p>`).join('')}
        ${
          sec.bulletPoints
            ? `<ul style="line-height:1.8;padding-left:20px;">${sec.bulletPoints
                .map((b) => `<li>${b}</li>`)
                .join('')}</ul>`
            : ''
        }
        ${
          sec.infoBox
            ? `<div style="background:#F8FAFC;border:1px solid #CBD5E1;padding:12px 16px;border-radius:6px;margin:12px 0;">
                <strong>${sec.infoBox.title}:</strong> ${sec.infoBox.content}
              </div>`
            : ''
        }
        ${
          sec.table
            ? `<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
                <thead><tr>${sec.table.headers
                  .map(
                    (h) =>
                      `<th style="border:1px solid #CBD5E1;padding:8px;background:#F1F5F9;text-align:left;">${h}</th>`
                  )
                  .join('')}</tr></thead>
                <tbody>${sec.table.rows
                  .map(
                    (row) =>
                      `<tr>${row
                        .map((cell) => `<td style="border:1px solid #CBD5E1;padding:8px;">${cell}</td>`)
                        .join('')}</tr>`
                  )
                  .join('')}</tbody>
              </table>`
            : ''
        }
      </section>`
    )
    .join('');

  const mcqsHtml =
    article.mcqs.length > 0
      ? `<section style="margin-top:28px;border-top:1px solid #E2E8F0;padding-top:16px;">
          <h2 style="color:#174EA6;font-size:18px;">अभ्यास प्रश्न (MCQs)</h2>
          ${article.mcqs
            .map(
              (m, idx) => `
            <div style="margin:14px 0;">
              <p style="font-weight:600;">प्रश्न ${idx + 1}: ${m.question}</p>
              <p style="margin:4px 0;">सही उत्तर: <strong>${m.options[m.correctIndex]}</strong></p>
              <p style="color:#475569;font-size:14px;">व्याख्या: ${m.explanation}</p>
            </div>`
            )
            .join('')}
        </section>`
      : '';

  const html = `<!doctype html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <title>${article.title} – Sarkari Job Target Notes</title>
</head>
<body style="font-family:'Noto Sans Devanagari',sans-serif;max-width:750px;margin:32px auto;padding:0 20px;color:#0F172A;">
  <header style="border-bottom:2px solid #174EA6;padding-bottom:12px;margin-bottom:24px;">
    <div style="font-size:13px;color:#174EA6;font-weight:700;">Sarkari Job Target — अध्ययन नोट्स</div>
    <h1 style="font-size:24px;margin:8px 0;">${article.title}</h1>
    <div style="font-size:13px;color:#475569;">लेखक: ${article.author.name} · अद्यतन: ${article.updatedAtDisplay}</div>
  </header>
  ${sectionsHtml}
  ${mcqsHtml}
  <footer style="margin-top:32px;border-top:1px solid #E2E8F0;padding-top:12px;font-size:12px;color:#64748B;">
    स्रोत: Sarkari Job Target (sarkarijobtarget.in) · शैक्षणिक उपयोग के लिए
  </footer>
</body>
</html>`;

  triggerBlobDownload(`${article.slug}-study-notes.html`, html, 'text/html;charset=utf-8');
}

export function downloadStudyMaterialSheet(item: StudyMaterialItem): void {
  const html = `<!doctype html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <title>${item.title} – Sarkari Job Target</title>
</head>
<body style="font-family:'Noto Sans Devanagari',sans-serif;max-width:750px;margin:32px auto;padding:0 20px;color:#0F172A;">
  <header style="border-bottom:2px solid #174EA6;padding-bottom:12px;margin-bottom:20px;">
    <div style="font-size:13px;color:#174EA6;font-weight:700;">Sarkari Job Target — ${item.typeLabelHi}</div>
    <h1 style="font-size:22px;margin:8px 0;">${item.title}</h1>
    <div style="font-size:13px;color:#475569;">परीक्षा: ${item.examName} · विषय: ${item.subjectHi} · ${item.updatedDisplay}</div>
  </header>
  <p style="line-height:1.8;">${item.description}</p>
  <h2 style="color:#174EA6;font-size:17px;margin-top:20px;">मुख्य अध्ययन बिंदु</h2>
  <ul style="line-height:1.8;padding-left:20px;">
    ${item.summaryContent.map((point) => `<li style="margin-bottom:6px;">${point}</li>`).join('')}
  </ul>
  <footer style="margin-top:32px;border-top:1px solid #E2E8F0;padding-top:12px;font-size:12px;color:#64748B;">
    Sarkari Job Target (sarkarijobtarget.in)
  </footer>
</body>
</html>`;

  triggerBlobDownload(`${item.id}-${item.type}.html`, html, 'text/html;charset=utf-8');
}
