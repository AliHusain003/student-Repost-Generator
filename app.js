function ShowData() {
    // Input validation
    const requiredFields = ['sname', 'sclass', 'sroll', 'maths', 'english', 'hindi', 'computer', 'science'];
    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            alert(`Please fill in ${field.previousElementSibling.textContent}`);
            isValid = false;
            return;
        }
        
        // Validate marks are between 0-100
        if (['maths', 'english', 'hindi', 'computer', 'science'].includes(fieldId)) {
            const marks = parseInt(field.value);
            if (isNaN(marks) || marks < 0 || marks > 100) {
                alert(`${field.previousElementSibling.textContent} must be between 0-100`);
                isValid = false;
                return;
            }
        }
    });

    if (!isValid) return;

    // Get form values
    const name = document.getElementById("sname").value.trim();
    const stdclass = document.getElementById("sclass").value.trim();
    const roll = document.getElementById("sroll").value.trim();

    const maths = parseInt(document.getElementById("maths").value);
    const english = parseInt(document.getElementById("english").value);
    const hindi = parseInt(document.getElementById("hindi").value);
    const computer = parseInt(document.getElementById("computer").value);
    const science = parseInt(document.getElementById("science").value);

    // Student constructor function
    function Student(name, roll, stdclass, marks) {
        this.name = name;
        this.roll = roll;
        this.stdclass = stdclass;
        this.marks = marks;

        this.getTotal = function() {
            return Object.values(this.marks).reduce((sum, mark) => sum + mark, 0);
        };

        this.getPercentage = function() {
            return (this.getTotal() / (Object.keys(this.marks).length * 100)) * 100;
        };

        this.getGrade = function() {
            const percent = this.getPercentage();
            if (percent >= 90) return "A+";
            if (percent >= 75) return "A";
            if (percent >= 60) return "B";
            if (percent >= 36) return "C";
            return "Fail";
        };
    }

    // Create student object
    const student = new Student(name, roll, stdclass, {
        maths, english, hindi, computer, science
    });

    // Generate report card
    const output = `
        <div class="report-header">
            <h2>Student Report Card</h2>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        <table>
            <tr>
                <th>Name:</th>
                <td>${student.name}</td>
            </tr>
            <tr>
                <th>Roll No.:</th>
                <td>${student.roll}</td>
            </tr>
            <tr>
                <th>Class:</th>
                <td>${student.stdclass}</td>
            </tr>
            <tr>
                <th>Total Marks:</th>
                <td>${student.getTotal()} out of 500</td>
            </tr>
            <tr>
                <th>Percentage:</th>
                <td>${student.getPercentage().toFixed(2)}%</td>
            </tr>
            <tr>
                <th>Grade:</th>
                <td>${student.getGrade()}</td>
            </tr>
        </table>
        <div class="subject-marks">
            <h3>Subject-wise Marks</h3>
            <table>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                </tr>
                ${Object.entries(student.marks).map(([subject, mark]) => `
                    <tr>
                        <td>${subject.charAt(0).toUpperCase() + subject.slice(1)}</td>
                        <td>${mark}/100</td>
                    </tr>
                `).join('')}
            </table>
        </div>
        <div class="print-actions">
            <button onclick="window.print()">Print Report Card</button>
        </div>
    `;

    document.getElementById("showdata").innerHTML = output;
    document.getElementById("reportCard").style.display = "block";
    
    // Scroll to report card
    document.getElementById("reportCard").scrollIntoView({ behavior: 'smooth' });
}