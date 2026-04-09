<template>
  <div class="grades-container">
    <!-- Student View -->
    <div v-if="userRole === 'student'">
      <h1>My Grades</h1>
      <table v-if="studentGrades.length">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="g in studentGrades" :key="g.course_id">
            <td>{{ g.course_id }}</td>
            <td>{{ g.course_name }}</td>
            <td>{{ g.score }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty-msg">No grades yet.</p>
    </div>

    <!-- Teacher View -->
    <div v-else-if="userRole === 'teacher'">
      <h1>My Courses</h1>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Semester</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in teacherCourses" :key="course.course_id">
            <td>{{ course.course_id }}</td>
            <td>{{ course.course_name }}</td>
            <td>{{ course.semester }}</td>
            <td>{{ course.capacity }}</td>
            <td>
              <button @click="viewStudents(course.course_id)">View Students</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showStudentsModal" class="modal">
        <div class="modal-content">
          <h3>Students</h3>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in enrolledStudents" :key="student.student_id">
                <td>{{ student.student_id }}</td>
                <td>{{ student.student_name }}</td>
                <td>{{ student.score }}</td>
                <td>
                  <button @click="editScore(student.student_id, student.grade_id)">Edit Score</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="closeModal">Close</button>
        </div>
      </div>

      <div v-if="showEditScoreModal" class="modal">
        <div class="modal-content">
          <h3>Edit Score</h3>
          <form @submit.prevent="updateScore">
            <label>
              Score:
              <input v-model="editedScore" type="number" step="0.01" required>
            </label>
            <button type="submit">Save</button>
            <button type="button" @click="closeEditScoreModal">Cancel</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-else>
      <p>Loading...</p>
    </div>

    <button @click="goBack" class="back-button">Back</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { reqMe, reqGradeList, reqCourseList, reqTeacherCourses, reqEnrolledStudents, reqUpdateGrade, reqCreateGrade } from '../api/all';

const router = useRouter();
const userRole = ref('');

// Student state
const studentGrades = ref([]);

// Teacher state
const teacherCourses = ref([]);
const enrolledStudents = ref([]);
const showStudentsModal = ref(false);
const showEditScoreModal = ref(false);
const editedStudentId = ref('');
const editedScore = ref(0);
const editedGradeId = ref('');

onMounted(async () => {
  try {
    const meRes = await reqMe();
    userRole.value = meRes.data.is_teacher ? 'teacher' : 'student';

    if (userRole.value === 'student') {
      // Fetch student's own grades + course list for names
      const [gradeRes, courseRes] = await Promise.all([reqGradeList(), reqCourseList()]);
      const courseMap = {};
      courseRes.data.forEach(c => { courseMap[c.course_id] = c.course_name; });
      studentGrades.value = gradeRes.data.map(g => ({
        ...g,
        course_name: courseMap[g.course_id] || g.course_id
      }));
    } else {
      const response = await reqTeacherCourses();
      teacherCourses.value = response.data;
    }
  } catch (error) {
    console.error('Error loading grade page:', error);
  }
});

// Teacher methods
const viewStudents = async (courseId) => {
  try {
    const response = await reqEnrolledStudents(courseId);
    enrolledStudents.value = response.data.map(student => ({
      student_id: student.student_id,
      student_name: student.student_name,
      score: student.score,
      course_id: courseId,
      grade_id: student.grade_id
    }));
    showStudentsModal.value = true;
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
  }
};

const closeModal = () => { showStudentsModal.value = false; };

const editScore = (studentId, gradeId) => {
  const student = enrolledStudents.value.find(s => s.student_id === studentId);
  if (student) {
    editedStudentId.value = studentId;
    editedScore.value = student.score;
    editedGradeId.value = gradeId;
    showEditScoreModal.value = true;
  }
};

const closeEditScoreModal = () => {
  showEditScoreModal.value = false;
  editedStudentId.value = '';
  editedScore.value = 0;
};

const updateScore = async () => {
  try {
    const studentId = editedStudentId.value;
    const student = enrolledStudents.value.find(s => s.student_id === studentId);
    const courseId = student.course_id;
    const data = { course_id: courseId, student_id: studentId, score: editedScore.value };

    if (student.grade_id) {
      await reqUpdateGrade(data, student.grade_id);
    } else {
      await reqCreateGrade(data);
    }
    if (student) { student.score = editedScore.value; }
    closeEditScoreModal();
  } catch (error) {
    console.error('Error updating score:', error);
  }
};

const goBack = () => router.push({ name: 'my' });
</script>

<style scoped>
.grades-container {
  display: flex;
  flex-direction: column;
  background-color: #111;
  gap: 20px;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #111;
}

thead th {
  border-top: 1px solid #fff;
  border-bottom: none;
  background-color: #111;
}

tbody td {
  border: none;
}

tbody tr:nth-child(odd) { background-color: #111; }
tbody tr:nth-child(even) { background-color: #111; }

.empty-msg {
  color: #888;
  text-align: center;
  margin-top: 20px;
}

.modal-content {
  background-color: #111;
  padding: 20px;
  border-radius: 4px;
  z-index: 1000;
}

.back-button {
  margin-top: 20px;
  padding: 8px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  align-self: flex-start;
}

.back-button:hover {
  background-color: #333;
}
</style>
