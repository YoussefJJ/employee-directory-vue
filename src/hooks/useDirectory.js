import { ref, computed, toValue, watch, reactive } from "vue";
import { useFetch } from "./useFetch";

export const useDirectory = () => {
    const { error, data, loading } = useFetch('data.json')
    
    const directoryData = ref(data.value)

    const selectedCategory = ref(null)
    const selectedDepartment = ref(null)
    const selectedEmployee = ref(null)


    const categories = computed(() => directoryData.value ? directoryData.value.map(items => items.categoryName) : [])
    const departments = computed(() => directoryData.value ? directoryData.value.find(item => item.categoryName === selectedCategory.value)?.departments.map(dep => dep.departmentName) : [])
    const employees = computed(() => directoryData.value ? directoryData.value.find(item => item.categoryName === selectedCategory.value)?.departments
    .find(dep => dep.departmentName === selectedDepartment.value)?.employees : [])

    function addEmployee(cat, dep, employeeName) {
        if (directoryData.value) {
            directoryData.value.find(item => item.categoryName === cat)?.departments.find(item => item.departmentName === dep)?.employees.push(employeeName)
        }
    }

    function selectCategory(catName) {
        selectedCategory.value = toValue(catName)
    }

    function selectDepartment(depName) {
        selectedDepartment.value = toValue(depName)
    }

    function selectEmployee(empName) {
        selectedEmployee.value = empName
    }

    function deleteEmployee(cat, dep, empName) {
        const employeesList = directoryData.value.find(item => item.categoryName === cat)?.departments.find(item => item.departmentName === dep)?.employees
        if (employeesList) {
            employeesList.splice(employeesList.indexOf(empName), 1)
            selectedEmployee.value = null
        }
    }

    function deleteCategory(cat) {
        const categoryToDelete = directoryData.value.find(item => item.categoryName === cat)
        if (categoryToDelete) {
            directoryData.value.splice(directoryData.value.indexOf(categoryToDelete), 1)
            selectedCategory.value = null
        }
    }

    function deleteDepartment(cat, depName) {
        const departmentList = directoryData.value.find(item => item.categoryName === cat)?.departments
        const departmentToDelete = departmentList.find(item => item.departmentName === depName)
        if (departmentList && departmentToDelete) {
            departmentList.splice(departmentList.indexOf(departmentToDelete), 1)
            selectedDepartment.value = null
        }
    }

    watch(data, () => {
        if (data.value) {
            directoryData.value = [...data.value]
        }
    })

    watch(selectedCategory, () => {
        selectedDepartment.value = null
    })

    watch(selectedDepartment, () => {
        selectedEmployee.value = null
    })

    return {
        addEmployee,
        selectCategory,
        selectDepartment,
        selectEmployee,
        selectedCategory,
        selectedDepartment,
        selectedEmployee,
        deleteEmployee,
        deleteDepartment,
        deleteCategory,
        categories,
        departments,
        employees
    }
}