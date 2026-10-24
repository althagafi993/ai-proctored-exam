function finishExam() {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.setFont("Helvetica", "bold");
doc.setFontSize(16);
doc.text("EduServices 2026 - AI Exam Proctoring Report", 105, 15, { align: "center" });

doc.setFontSize(12);
doc.text("Student Name: الطالب التجريبي", 14, 30);
doc.text("Suggested Score: 9 / 10", 14, 38);
doc.text("Exam Status: Completed with 1 recorded violation on Q1", 14, 46);

doc.line(14, 52, 196, 52);
doc.text("Teacher Actions / Decision Options:", 14, 62);
doc.setFontSize(10);
doc.text("[ ] Approve Score [ ] Exclude Question [ ] Reject Exam (Zero)", 14, 70);

doc.save("EduServices_Exam_Report.pdf");
alert("تم إنشاء التقرير بصيغة PDF بنجاح وإرساله لإيميل المعلم/ة!");
}