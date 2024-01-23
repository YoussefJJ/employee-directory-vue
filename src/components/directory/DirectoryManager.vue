<template>
    <div v-bind="$attrs">
        <slot 
        name="categories" 
        :categories="categories" 
        :onselect="selectCategory"
        :ondelete="() => handleDeleteAction('category')" 
        :selected="selectedCategory">
        </slot>
        <slot 
        name="departments" 
        :departments="departments" 
        :onselect="selectDepartment"
        :category="selectedCategory"
        :ondelete="() => handleDeleteAction('department')" 
        :selected="selectedDepartment">
        </slot>
        <slot 
        name="employees" 
        :employees="employees" 
        :ondelete="() => handleDeleteAction('employee')" 
        :onselect="selectEmployee" 
        :category="selectedCategory"
        :department="selectedDepartment"
        :selected="selectedEmployee" 
        :onadd="handleEmployeeaddForm">
        </slot>
    </div>
    <Modal :id="'modal-1'" :modal-active="modals['modal-1']" @click-outside="toggleModal('modal-1')" @close="toggleModal('modal-1')">
        <template #header>
            <h2>
                Add a new Employee
            </h2>
        </template>
        <template #main>
            <form @submit.prevent="handleEmployeeAdd">
                <div class="input">
                    <Label for="empName">Employee Name</Label>
                    <Input ref="newEmpInputRef" v-model="newEmployeeName" name="empName" placeholder="Enter name..."/>
                </div>
            </form>
        </template>
        <template #footer>
            <div style="display: flex; justify-content: flex-end; align-items: center; width: 100%;">
                <Button style="margin: 0px;" @click.stop="handleEmployeeAdd" :disabled="newEmployeeName === ''">Save</Button>
            </div>
        </template>
    </Modal>
    <Modal :id="'modal-2'" :modal-active="modals['modal-2']" @click-outside="toggleModal('modal-2')" @close="toggleModal('modal-2')">
        <template #header>
            <h2>
                Delete {{ deletionAction.type }}?
            </h2>
        </template>
        <template #main>
            <p style="margin-bottom: 24px;">Are you sure you want to delete this item?</p>
            <p style="color: #fa502a; font-weight: 600;">DISCLAIMER: This action is irreversible</p>
        </template>
        <template #footer>
            <div style="display: flex; justify-content: flex-end; align-items: center; width: 100%;">
                <Button style="margin: 0px;" @click.stop="executeDelete">Confirm</Button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
    import { reactive, ref, watchEffect } from 'vue';
    import { useDirectory } from '@/hooks/useDirectory';
    import Modal from '@/components/shared/modal/Modal.vue';
    import Button from '../form/Button.vue';
    import Input from '../form/Input.vue';
    import Label from '../form/Label.vue';

    const { 
        selectedCategory,
        categories,
        selectCategory,
        selectedDepartment,
        selectDepartment,
        departments,
        employees,
        selectEmployee,
        selectedEmployee,
        addEmployee,
        deleteEmployee,
        deleteDepartment,
        deleteCategory
    } = useDirectory()

    
    const modals = reactive({
        "modal-1": false,
        "modal-2": false,
    })

    const newEmployeeName = ref('')
    const deletionAction = ref({
        type: '',
        callback: () => {}
    })

    const newEmpInputRef = ref(null)

    function toggleModal(modalId) {
        modals[modalId] = !modals[modalId]
    }

    const handleEmployeeaddForm = () => {
        toggleModal('modal-1')
    }

    const handleEmployeeAdd = () => {
        addEmployee(selectedCategory.value, selectedDepartment.value, newEmployeeName.value)
        toggleModal('modal-1')
    }

    const executeDelete = () => {
        deletionAction.value.callback()
        toggleModal('modal-2')
    }

    const handleDeleteAction = (type) => {
        if (type) {
            deletionAction.value.type = type[0].toUpperCase() + type.slice(1)
            switch (type) {
                case 'employee':
                    deletionAction.value.callback = () => deleteEmployee(selectedCategory.value, selectedDepartment.value, selectedEmployee.value)
                    break
                case 'category':
                    deletionAction.value.callback = () => deleteCategory(selectedCategory.value)
                    break
                case 'department':
                    deletionAction.value.callback = () => deleteDepartment(selectedCategory.value, selectedDepartment.value)
                    break
                default:
                    break
            }
        }
        toggleModal('modal-2')
    }

    watchEffect(() => {
        if (newEmpInputRef.value) {
            newEmpInputRef.value.ref.focus();
        }
    })

</script>

<style  scoped>
    .directory {
        margin: 12px 24px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 32px;
    }
    .directory-part h1 {
        margin: 12px 0px;
        text-align: center;
        color: #2d966e;
        font-size: 32px;
    }

    .input:focus-within label {
        color: white;
    }
</style>../../hooks/useDirectory