/**
 * محرك توليد تقارير المعلم/ة باللغة العربية
 * EduServices 2026
 */

function finishExam() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // إعدادات العنوان الرئيسي للتقرير
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("EduServices 2026 - AI Exam Report", 105, 15, { align: "center" });

    doc.setFontSize(11);
    doc.text("--------------------------------------------------------------------------------------------------", 105, 22, { align: "center" });

    // بيانات الطالب والاختبار
    doc.setFontSize(12);
    doc.text("Exam Title: Remote AI Proctored Exam", 14, 32);
    doc.text("Student Name: Experimental Student", 14, 40);
    doc.text("Suggested Score: 8 / 10", 14, 48);

    doc.line(14, 54, 196, 54);

    // جدول تفاصيل المراقبة بالذكاء الاصطناعي لكل سؤال
    doc.setFontSize(12);
    doc.text("Detailed AI Violation Log Per Question:", 14, 62);

    let y = 72;
    const questionsLog = [
        { q: "Question 1", status: "Clean - No Violations Detected", score: "2/2" },
        { q: "Question 2", status: "VIOLATION: Mobile Phone Detected (2 times)", score: "0/2" },
        { q: "Question 3", status: "Clean - No Violations Detected", score: "2/2" },
        { q: "Question 4", status: "VIOLATION: Side Gaze / Looking away (1 time)", score: "2/2" }
    ];

    questionsLog.forEach((item) => {
        doc.setFontSize(10);
        doc.text(`* ${item.q} [Score Offered: ${item.score}]`, 16, y);
        doc.setFontSize(9);
        doc.text(`   Log Status: ${item.status}`, 20, y + 5);
        y += 14;
    });

    doc.line(14, y, 196, y);
    y += 10;

    // خيارات واتخاذ القرار للمعلم/ة
    doc.setFontSize(11);
    doc.text("Teacher Final Decision Options:", 14, y);
    doc.setFontSize(9);
    doc.text("[  ] Approve Full Grade", 16, y + 8);
    doc.text("[  ] Exclude Question Score(s) for Violations", 16, y + 15);
    doc.text("[  ] Reject Exam & Assign Zero (0)", 16, y + 22);

    // حفظ التقرير
    doc.save("EduServices_Exam_Report_Arabic.pdf");
    alert("تم تسليم الاختبار وتوليد تقرير المعلم/ة المعتمد بنجاح!");
}
