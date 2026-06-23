function doPost(e) {
  const notifyEmail = "sangwon1564@naver.com";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("응답")
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet("응답");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["접수시각", "참석", "이름", "먹고 싶은 메뉴", "건의사항", "개인링크이름", "브라우저시각"]);
  }

  const data = JSON.parse(e.postData.contents || "{}");
  const subject = "[집들이 참석 응답] " + (data.name || "이름 미입력");
  const body = [
    "집들이 초대장 응답이 도착했습니다.",
    "",
    "참석: " + (data.attending || ""),
    "이름: " + (data.name || ""),
    "메뉴 추천: " + (data.wantedMenu || ""),
    "건의사항: " + (data.note || ""),
    "개인링크이름: " + (data.guest || ""),
    "브라우저시각: " + (data.submittedAt || ""),
    "접수시각: " + new Date()
  ].join("\n");

  MailApp.sendEmail({
    to: notifyEmail,
    subject: subject,
    body: body
  });

  sheet.appendRow([
    new Date(),
    data.attending || "",
    data.name || "",
    data.wantedMenu || "",
    data.note || "",
    data.guest || "",
    data.submittedAt || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
