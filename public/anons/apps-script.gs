/**
 * Бэкенд формы записи на анонс (AI + 1С).
 * Принимает POST с полями name и comment и дописывает строку в Google-таблицу.
 *
 * УСТАНОВКА (один раз):
 *  1. Открыть нужную Google-таблицу → Расширения → Apps Script.
 *  2. Вставить этот код, сохранить.
 *  3. Развернуть: «Развёртывание» → «Новое развёртывание» → тип «Веб-приложение».
 *       - Запуск от имени: Я (Me)
 *       - У кого есть доступ: ВСЕ (Anyone)   ← без этого будет 401
 *  4. Скопировать URL вида .../exec и вставить в index.html в const ENDPOINT.
 *
 * ВАЖНО: после любой правки кода нужно «Управление развёртываниями» →
 * редактировать существующее → «Новая версия». Если делать «Новое развёртывание»,
 * меняется URL — тогда обновите ENDPOINT в index.html.
 */

// Название листа, куда писать. Оставьте пустым '' чтобы писать в активный (первый) лист.
var SHEET_NAME = 'Записи';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];

    // Если листа нет — создаём с заголовками.
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME || 'Записи');
      sheet.appendRow(['Дата', 'Имя', 'Комментарий']);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата', 'Имя', 'Комментарий']);
    }

    var p = (e && e.parameter) ? e.parameter : {};
    var name = (p.name || '').toString().trim();
    var comment = (p.comment || '').toString().trim();

    if (!name) {
      return json_({ ok: false, error: 'empty name' });
    }

    sheet.appendRow([new Date(), name, comment]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// GET — чтобы можно было открыть URL в браузере и убедиться, что деплой жив.
function doGet() {
  return json_({ ok: true, status: 'alive' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
