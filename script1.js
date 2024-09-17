const semesterSubjects = {
    1: [
        ["HS2121", "Professional English and Functional Skills", 3],
        ["MA2122", "Calculus for Engineers", 3],
        ["PH2123", "Engineering Physics", 3],
        ["CY2124", "Engineering Chemistry", 3],
        ["GE2125", "Problem Solving and Python", 3],
        ["GE2181", "Problem Solving and Python Programming Laboratory", 2],
        ["BS2182", "Physics and Chemistry Laboratory", 2]
    ],
    2: [
        ["HS2221", "Communicative English", 2],
        ["MA2223", "Linear Algebra", 4],
        ["PH2221", "Quantum Physics", 3],
        ["GE2221", "Engineering Graphics", 4],
        ["EC2C22", "Digital Principles and Computer Organization", 4],
        ["CB2221", "Data Structures", 3],
        ["GE2281", "Engineering Practices Laboratory", 2],
        ["CB2281", "Data Structures Laboratory", 1.5],
        ["HS2281", "Communication and Soft Skill Laboratory", 1.5]
    ],
    3: [
        ["MA2322", "Probability and Statistics", 4],
        ["AD2311", "Object Oriented Programming", 3],
        ["AD2322", "Design and Analysis of Algorithms", 4],
        ["AD2313", "Fundamentals of Data Science", 4],
        ["AD2314", "Artificial Intelligence", 3],
        ["IT2C25", "Introduction to Operating Systems", 2],
        ["AD2381", "Artificial Intelligence Laboratory", 1.5],
        ["AD2382", "Data Science Laboratory", 1.5]
    ],
    4: [
        ["MA2C21", "Discrete Mathematics", 4],
        ["GE2421", "Environmental Science and Sustainability", 2],
        ["AD2C21", "Computer Networks", 4],
        ["CS2C12", "Database Management Systems", 3],
        ["AD2412", "Data Analytics", 3],
        ["AD2423", "Machine Learning", 3],
        ["AD2481", "Database Management Systems Laboratory", 1.5],
        ["AD2482", "Data Analytics Laboratory", 1.5],
        ["AD2483", "Machine Learning Laboratory", 1.5]
    ],
    5: [
        ["AD2511", "Distributed Computing", 3],
        ["AD2512", "Deep Learning", 3],
        ["AD2513", "Big Data Technologies", 3],
        ["AD2514", "Cloud Computing", 3],
        ["AD2515", "XML and Web Services", 3],
        ["SUBJCODE", "Professional Elective I", 3],
        ["SUBJCODE", "Mandatory Course I & MC", 3],
        ["AD258", "Deep Learning Laboratory", 1.5],
        ["AD2591", "Mini Project", 1.5]
    ],
    6: [
        ["CS2612", "Internet of Things", 4],
        ["AD2611", "Natural Language Processing", 3],
        ["SUBJCODE", "Professional Elective II", 3],
        ["SUBJCODE", "Professional Elective III", 3],
        ["SUBJCODE", "Open Elective I*", 3],
        ["SUBJCODE", "Open Elective II*", 3],
        ["SUBJCODE", "Mandatory Course II &", 0],
        ["AD2681", "Natural Language Processing Laboratory", 1.5]
    ]
};

const gradePoints = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'U': 0
};

function generateForms() {
    const numSemesters = parseInt(document.getElementById('numSemesters').value);
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; // Clear previous forms if any

    for (let i = 1; i <= numSemesters; i++) {
        const semesterDiv = document.createElement('div');
        semesterDiv.classList.add('semester-form');
        semesterDiv.innerHTML = `<h3>Semester ${i}</h3>
            <div id="subjects${i}" class="table-container"></div>`;
        formContainer.appendChild(semesterDiv);

        // Populate subjects for the selected semester
        populateSemester(i);
    }
}

function populateSemester(semester) {
    const subjects = semesterSubjects[semester];
    const subjectsContainer = document.getElementById(`subjects${semester}`);
    subjectsContainer.innerHTML = createTable(subjects, semester);
}

function createTable(subjects, semester) {
    let tableHTML = '<table><thead><tr><th>S. No.</th><th>Course Code</th><th>Course Title</th><th>Credits</th><th>Grade</th></tr></thead><tbody>';
    
    subjects.forEach((subject, index) => {
        tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${subject[0]}</td>
                <td>${subject[1]}</td>
                <td>${subject[2]}</td>
                <td>
                    <select id="grade${semester}-${index + 1}">
                        <option value="">Select grade</option>
                        <option value="O">O</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="U">U</option>
                    </select>
                </td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    return tableHTML;
}

function calculateGPA() {
    const numSemesters = parseInt(document.getElementById('numSemesters').value);
    let totalWeightedMarks = 0;
    let totalCredits = 0;
    let totalGPA = 0;
    let numGPAs = 0;
    
    let resultText = '';

    for (let i = 1; i <= numSemesters; i++) {
        const subjects = semesterSubjects[i];
        let semesterWeightedMarks = 0;
        let semesterCredits = 0;
        
        subjects.forEach((subject, index) => {
            const grade = document.getElementById(`grade${i}-${index + 1}`).value.toUpperCase();
            const credits = subject[2];
            const gradePoint = gradePoints[grade] || 0; // Default to 0 if grade is invalid
            
            semesterWeightedMarks += gradePoint * credits;
            semesterCredits += credits;
        });

        const semesterGPA = semesterCredits > 0 ? (semesterWeightedMarks / semesterCredits) : 0;
        resultText += `GPA for Semester ${i}: ${semesterGPA.toFixed(2)}\n`;

        totalWeightedMarks += semesterWeightedMarks;
        totalCredits += semesterCredits;
        totalGPA += semesterGPA;
        numGPAs += 1; // Count the semester GPA
    }
    
    const cpga = numGPAs > 0 ? (totalGPA / numGPAs) : 0;
    const overallGPA = totalCredits > 0 ? (totalWeightedMarks / totalCredits) : 0;

    resultText += `CPGA: ${cpga.toFixed(2)}\n`;
    resultText += `Overall GPA: ${overallGPA.toFixed(2)}`;

    document.getElementById('result').innerText = resultText;
}
