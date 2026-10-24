/**
 * محرك إنشاء تقارير PDF باللغة العربية المعتمد لـ EduServices 2026
 */

function finishExam() {
    const element = document.getElementById('report-template');
    element.classList.remove('hidden'); // إظهار القالب لحظياً للتصوير

    const opt = {
        margin:       10,
        filename:     'تقرير_اختبار_EduServices_2026.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // توليد التقرير وتحميله
    html2pdf().set(opt).from(element).save().then(() => {
        element.classList.add('hidden'); // إعادة إخفاء القالب
        alert("تم تسليم الاختبار وتوليد التقرير المعتمد باللغة العربية بنجاح!");
    });
}
