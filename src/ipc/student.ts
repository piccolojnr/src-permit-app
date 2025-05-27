import { StudentData, StudentService } from '../components/lib/services/student.service';
import { ipcMain } from 'electron';

// Create student
ipcMain.handle('student:create', async (_, studentData: StudentData) => await StudentService.createStudent(studentData))

// Get student by ID
ipcMain.handle('student:get-by-id', async (_, studentId: number) => await StudentService.getStudentById(studentId));

// Update student
ipcMain.handle('student:update', async (_, studentId: number, studentData: Partial<StudentData>) => await StudentService.updateStudent(studentId, studentData));

// Delete student
ipcMain.handle('student:delete', async (_, studentId: number) => await StudentService.deleteStudent(studentId));

// Get all students with pagination and search
ipcMain.handle('student:get-all', async (_, params: { page?: number; pageSize?: number; search?: string }) => await StudentService.getStudents(params));

// Import students from file content
ipcMain.handle('student:import', async (_, fileContent: string) => await StudentService.importStudents(fileContent));